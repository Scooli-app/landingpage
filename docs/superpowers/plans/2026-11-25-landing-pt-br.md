# Landing page pt-BR Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Brazilian Portuguese (`pt-BR`, served at `/br`) as a third language of the Scooli landing page, adapted to Brazil, in two shippable steps, plus pt-BR confirmation emails in chalkboard.

**Architecture:** pt-BR becomes a third next-intl locale with a custom `/br` prefix and its own column in `pathnames`. A pure "localization status" module lists the pages whose pt-BR copy isn't done yet. The middleware redirects those to `/br`, and hreflang, the sitemap and the switcher leave them out. Copy lives in a full `messages/pt-BR.json` (not an overlay of pt-PT, so no Portuguese copy can leak through), `content/pt-BR.ts` and pt-BR entries in `comparisons.ts`. A copy-guard script fails the build on Portugal-only terms.

**Tech Stack:** Next.js 16, next-intl 4, TypeScript, Tailwind (landingpage). Quarkus/Java 21, MJML (chalkboard emails).

**Spec:** `docs/superpowers/specs/2026-11-25-landing-pt-br-design.md`

## Global Constraints

- Locale tag is exactly `pt-BR`, and the URL prefix is exactly `/br`. pt-PT stays unprefixed at `/`, and English stays at `/en`. No currently indexed URL changes.
- `localeDetection: false` stays. There are no automatic redirects on browser language or IP.
- Pro price shown in euros: €6.99/month, €67.10/year, written `€6,99` in pt-BR (same as pt-PT). The school plan is "Sob consulta".
- Privacy claim on `/br`: "Em conformidade com a LGPD" (GDPR and EU hosting can be added as extra).
- Banned on any `/br` page: Aprendizagens Essenciais, DL 54/2018, DL 55/2018, RGPD as the only privacy claim, agrupamento(s), "1.º/2.º/3.º ciclo", "ficha(s)", "teste(s)" in the assessment sense, "ano letivo", "equipa", "contacto", "telemóvel", "registo", "tu"-form verbs, Portuguese teacher names in media, technical/vocational courses, Educação Infantil.
- About Teachy, write only "na documentação pública não encontramos", never "a Teachy não tem". No price, quality or BNCC-error claims about Teachy.
- Never claim Brazilian clients or networks, inflated numbers, or that the direção invites its own teachers.
- Language names are written in their own language: "Português (Portugal)", "Português (Brasil)", "English". Short codes: PT / BR / EN.
- `landingpage` `main` is production, and its working tree has someone else's uncommitted work. Do all landing work in a worktree branched from `origin/main` (`superpowers:using-git-worktrees`), never in the main checkout. Same for chalkboard (branch from `origin/main`).
- Workspace rules (`C:\PROJECTS\Scooli\CLAUDE.md`): lint and build clean at the end of each task. No TDD for visual/UI work: verify with Playwright screenshots. Selectable cards are clickable over their whole area.
- Every task: `npm run lint`, `npm run type-check` and `npm run build` pass in `landingpage` (chalkboard: `./mvnw -q -pl services test -Dtest=EmailServiceTest`).

## Review Focus

1. **A `/br` URL for a page that isn't done yet** (typed, shared, or reached through the switcher) must land on `/br`, never render pt-PT copy. Test: route table in Task 1, step 2.
2. **The old Portuguese slug under `/br`** (`/br/contacto`, `/br/ferramentas/gerador-de-testes` once BR slugs differ) must 301 to the pt-BR slug. A trailing slash or uppercase prefix (`/BR/precos`) must behave like the canonical URL or 404, never render pt-PT. Test: route table in Task 1.
3. **A visitor with a `NEXT_LOCALE=pt-BR` cookie or from Brazil on a pt-PT page** gets the banner, not a redirect. Dismissing it keeps it dismissed across pages, and a broken `localStorage` (private mode) must not crash the page. Test: Task 3, step 5.
4. **Sign-up from `/br`** opens the app in pt-BR (`?locale=pt-BR`), and the contact and recommendation forms send `locale: "pt-BR"`, so the reply email is the Brazilian one. Test: Task 3, step 6 and Task 7.
5. **Portugal-only words hiding in less-visited copy** (alt text, aria labels, meta descriptions, JSON-LD, OG text, error messages, empty states). Test: the copy guard in Task 4 scans the whole pt-BR file, not only visible strings.

---

## Step 1: what a director sees (landing PR "feat(i18n): pt-BR site, step 1" + chalkboard PR)

### Task 1: Locale registry, `/br` routing and the localization status

**Files:**
- Modify: `src/i18n/routing.ts` (locales, `pathnames`, `localePrefix`)
- Create: `src/i18n/localizationStatus.ts`
- Modify: `src/i18n/toolSlugs.ts` → rename to `src/i18n/localeSlugs.ts`, generalised per locale
- Modify: `src/i18n/urls.ts`, `src/i18n/navigation.ts`, `src/middleware.ts`
- Create: `messages/pt-BR.json` (scaffold: copy of `pt-PT.json`, rewritten in Tasks 4–5)
- Modify: `messages/*.json` → `languageSwitcher` gets keys `"pt-PT": "Português (Portugal)"`, `"pt-BR": "Português (Brasil)"`, `"en": "English"` in all three files

**Interfaces:**
- Produces:
  - `locales = ["pt-PT", "pt-BR", "en"] as const` (`routing.ts`).
  - `LOCALE_PREFIX: Record<Locale, string> = { "pt-PT": "", "pt-BR": "/br", en: "/en" }`, also fed to next-intl as `localePrefix: { mode: "as-needed", prefixes: { "pt-BR": "/br", en: "/en" } }`.
  - `pathnames` pt-BR column: same as pt-PT except `"/contacto": "/contato"`. Dynamic tool/comparison slugs come from `localeSlugs.ts`.
  - `localeSlugs.ts`: `LOCALE_SLUGS: Partial<Record<Locale, Record<"/ferramentas/[slug]" | "/comparar/[slug]", Record<string, string>>>>`, plus `toPublicSlug(locale, path, internalSlug)` and `toInternalSlug(locale, path, publicSlug)`. `en` holds today's tables. pt-BR proposal (confirm in Task 9 against Brazilian search terms; change only there): `gerador-de-testes → gerador-de-provas`, `fichas-de-trabalho → atividades`, `planificacoes → planejamentos`, `sequencias-de-aulas → sequencias-didaticas`, `adaptacao-de-materiais → adaptacao-de-materiais`. All other slugs are unchanged.
  - `localizationStatus.ts` (pure data, importable by middleware): `NOT_YET_LOCALIZED: Partial<Record<Locale, readonly PathnameKey[]>>`, step-1 value `{ "pt-BR": ["/professores", "/ia-para-professores", "/ferramentas", "/ferramentas/[slug]", "/comparar/[slug]", "/roadmap", "/investidores"] }`, plus `isLocalized(path: string, locale: Locale): boolean`.
  - `urls.ts`: `isFullyLocalized(path)` is replaced by `isLocalized(path, locale)`. `localizedPathname` uses `LOCALE_PREFIX` and `toPublicSlug`. `canonicalUrl` falls back to pt-PT when `!isLocalized(path, locale)`. `hreflangAlternates` emits each locale where `isLocalized`, plus `x-default` → pt-PT.

- [ ] **Step 1: Write the route table** as `scripts/check-routes.mjs`. Against `BASE` (default `http://localhost:3000`) it fetches with `redirect: "manual"` and asserts status and `location`. Cases:
  - `/` → 200
  - `/precos` → 200
  - `/en/pricing` → 200
  - `/br` → 200
  - `/br/precos` → 200
  - `/br/escolas` → 200
  - `/br/contato` → 200
  - `/br/contacto` → 301 to `/br/contato`
  - `/br/professores` → 307 to `/br`
  - `/br/ferramentas` → 307 to `/br`
  - `/br/ferramentas/plano-de-aula` → 307 to `/br`
  - `/br/comparar/teachy` → 307 to `/br`
  - `/en/tools/lesson-plan-generator` → 200
  - `/en/ferramentas/plano-de-aula` → 301 to `/en/tools/lesson-plan-generator`
  - `/pt-BR/precos` → 404 or redirect to `/br/precos`, never a 200
  - `/BR/precos` → not a 200 with pt-PT copy

  It also asserts that the `/br/precos` HTML contains `<html lang="pt-BR"` and that `/precos` contains `hreflang="pt-BR"` pointing at `https://www.scooli.app/br/precos`. Add `"check:routes": "node scripts/check-routes.mjs"` to `package.json`.
- [ ] **Step 2: Run it against the dev server and watch it fail.** Run `npm run dev`, then `npm run check:routes`. Expected: FAIL on every `/br` case.
- [ ] **Step 3: Implement** the Interfaces above. The middleware generalises today's `/en` slug block to "a prefixed locale + `ferramentas|comparar|tools|compare` segment", using `toPublicSlug`/`toInternalSlug`. Before handing to `intlMiddleware`, a `/br/...` path whose internal pathname key is in `NOT_YET_LOCALIZED["pt-BR"]` returns `NextResponse.redirect(new URL("/br", request.url), 307)`. A `/br` path that uses the pt-PT spelling of a page whose pt-BR slug differs (`/br/contacto`) 301s to the pt-BR spelling. Copy `messages/pt-PT.json` to `messages/pt-BR.json` as a scaffold.
- [ ] **Step 4: Run** `npm run check:routes`. Expected: all PASS. Then run `npm run lint && npm run type-check && npm run build`. Expected: clean.
- [ ] **Step 5: Commit:** `feat(i18n): add pt-BR locale under /br with per-locale localization status`

### Task 2: Every two-language branch handles pt-BR

**Files:** `src/app/[locale]/layout.tsx:65,146`, `src/app/[locale]/page.tsx:113,162`, `src/app/[locale]/ferramentas/page.tsx:52`, `src/components/Footer.tsx:150`, `src/components/PrivacyPolicy.tsx:41`, `src/components/TermsOfUse.tsx:58`, `src/lib/format.ts:7`, `src/lib/seo.ts:240,328,802`, `src/lib/app-media.ts`, `src/app/sitemap.ts`, `src/app/og/route.tsx`

**Interfaces:**
- Consumes: `locales`, `isLocalized`, `localizedUrl` (Task 1).
- Produces:
  - `MARKET: Record<Locale, { geoRegion?: "PT" | "BR"; placename?: string; areaServed?: string }>` in `src/lib/seo.ts`, with `pt-PT → PT/Portugal`, `pt-BR → BR/Brasil` and `en → {}`.
  - `brandKeywords` and `copyFor` return pt-BR entries (`BRAND_KEYWORDS_BR`, `schemaCopy["pt-BR"]`).
  - Media dir `"br"` for pt-BR. `appMedia("pt-BR")` returns the `br` set (Task 6). Until Task 6 it points at `pt`, behind a `// TODO(Task 6)` that Task 6 deletes.
  - `formatEuro(locale, cents)` returns `€6,99` for both `pt-*` locales.
  - The comparison footer label comes from a per-locale lookup (`label: Record<Locale, string>` on `comparisonLinks`) instead of `labelEn`.

- [ ] **Step 1: Find every two-language branch.** Run `grep -rn 'locale === "en"\|locale !== "en"\|=== "pt-PT"\|!== "pt-PT"\|isEnglish' src`. Expected: the 13 sites listed above.
- [ ] **Step 2: Rewrite each** to use a `Record<Locale, …>` lookup or `MARKET`, so a missing locale is a type error rather than a silent fall-through to Portugal. Layout: `siteLanguage = locale`, and the geo meta comes from `MARKET[locale]`. `PrivacyPolicy`/`TermsOfUse`: whatever `isEnglish` switches (dates, entity wording) gets a pt-BR value.
- [ ] **Step 3: Verify.**
  - Re-run the step-1 grep. Expected: no output.
  - `curl -s localhost:3000/br | grep -o 'geo.region" content="[A-Z]*'` gives `BR`.
  - The `/br` JSON-LD has `areaServed` Brasil, `inLanguage` pt-BR and `priceCurrency` EUR.
  - `/sitemap.xml` lists `/br`, `/br/precos`, `/br/escolas`, `/br/contato`, `/br/confianca`, `/br/sobre`, `/br/recomendar-instituicao`, `/br/privacy` and `/br/terms`, and no step-2 `/br` URL.
  - `/og?locale=pt-BR` returns 200.
  - `npm run check:routes`, lint, type-check and build all pass.
- [ ] **Step 4: Commit:** `refactor(i18n): make locale branches exhaustive for pt-BR`

### Task 3: Switcher, Brazil banner and handoff to the app

**Files:**
- Modify: `src/components/LanguageSwitcher.tsx`, `src/middleware.ts`, `src/components/ContactModal.tsx:155`, `src/components/ContactSection.tsx:110`, `src/components/InstitutionRecommendationPage.tsx:196`
- Create: `src/components/BrazilSiteBanner.tsx` (mounted in `src/app/[locale]/layout.tsx`)
- Modify: `messages/*.json`: new namespace `brazilBanner` (`text`, `cta`, `dismiss`), present in pt-PT only. The banner renders only on pt-PT pages.

**Interfaces:**
- Consumes: `isLocalized(path, locale)` (Task 1).
- Produces:
  - Middleware sets the cookie `scooli_country=<ISO>` (path `/`, 30 days, not httpOnly) from the `x-vercel-ip-country` header when that header is present.
  - `BrazilSiteBanner` (client) shows on pt-PT pages when `scooli_country === "BR"` or `NEXT_LOCALE === "pt-BR"`, unless `localStorage["scooli_br_banner_dismissed"] === "1"`. All storage access is wrapped in try/catch. Its CTA links to the same page under `/br` when `isLocalized(path, "pt-BR")`, else to `/br`.

- [ ] **Step 1: Switcher.** `LOCALE_CODES` becomes `{ "pt-PT": "PT", "pt-BR": "BR", en: "EN" }`. For a target locale where `!isLocalized(pathname, locale)`, the item links to `"/"` in that locale instead of the current page.
- [ ] **Step 2: Contact forms.** All three `fetch(\`${API_URL}/contact\`)` bodies add `locale` (the current next-intl locale).
- [ ] **Step 3: Banner and middleware cookie** as in Interfaces. Copy (pt-PT namespace, aimed at a Brazilian reader): text "Está no Brasil? Temos uma versão do site feita para escolas brasileiras.", CTA "Ver versão Brasil", dismiss "Fechar".
- [ ] **Step 4: Verify with Playwright** on the dev server:
  - From `/br/precos`, switching to PT goes to `/precos`.
  - From `/professores`, switching to BR goes to `/br`.
  - From `/escolas`, switching to BR goes to `/br/escolas`.
  - Sign-up links on `/br` contain `locale=pt-BR`.
- [ ] **Step 5: Verify the banner:**
  - With the cookie `scooli_country=BR` on `/precos`, the banner is visible.
  - After dismissing and reloading `/sobre`, it's hidden.
  - With `localStorage` throwing (stub `Storage.prototype.getItem` to throw), the page renders and the banner shows.
  - On `/br`, there's no banner.
- [ ] **Step 6: Verify the contact payload.** Submit the `/br/contato` form with the network panel open. The request body has `"locale":"pt-BR"`. Point `NEXT_PUBLIC_API_URL` at local chalkboard or a stub, never production.
- [ ] **Step 7:** Lint, type-check, build and `check:routes` pass. **Commit:** `feat(i18n): pt-BR in the switcher, Brazil banner and locale handoff to app and contact`

### Task 4: pt-BR copy for shared UI and the director pages

**Files:**
- Create: `scripts/check-pt-br-copy.mjs`, plus the `package.json` script `"check:pt-br"`
- Modify: `messages/pt-BR.json`: namespaces `common`, `nav`, `footer`, `siteMeta`, `shareImage`, `promoBanner`, `booking`, `notFound`, `contactModal`, `contactForm`, `emailContact`, `institutionalContactButton`, `home`, `classState`, `schools`, `pricingSection`, `pricingPage`, `contact`, `trust`, `about`, `recommendInstitution`, `languageSwitcher`
- Modify: `src/components/homepage/TrustSection.tsx:48`, `src/app/[locale]/escolas/page.tsx:134` (hide `AdvisorNote` when `locale === "pt-BR"`)
- Modify: `C:\PROJECTS\Scooli\CLAUDE.md`: add a "pt-BR copy" bullet set under "Landing page copy (i18n)" (spec, section "Copy rule")

**Interfaces:**
- Produces: `check-pt-br-copy.mjs` exits 1 if `messages/pt-BR.json` (every string, including meta, alt and aria) or `src/components/marketing/content/pt-BR.ts` (once it exists) matches any banned term from Global Constraints, as a case-insensitive word-boundary regex. It also exits 1 if any step-1 namespace in pt-BR.json still equals its pt-PT value verbatim (leftover scaffold). Allowed exceptions are listed inline (for example "GDPR" next to LGPD).

- [ ] **Step 1: Write the guard script.**
- [ ] **Step 2: Run** `npm run check:pt-br`. Expected: FAIL, listing the scaffold namespaces and the banned terms.
- [ ] **Step 3: Truth-check the claims.** For each product claim in the step-1 pt-PT namespaces, check it against web-app `origin/main` (BR path, `messages/pt-BR.json`, `src/app/(main)/school/`) and chalkboard `origin/main`. Write a short "kept / reworded / dropped" list into the PR description.
- [ ] **Step 4: Write the pt-BR copy** per the spec, section "Copy":
  - BNCC/habilidades, bimestres, provas/atividades/planejamento, rede de ensino, LGPD, "você".
  - `/escolas` leads with "A direção vê o cumprimento do planejamento, turma a turma", with "O plano acompanha o que aconteceu na sala" next.
  - Pricing: `€6,99`/mês, `€67,10`/ano, school plan "Sob consulta", CTA "Fale com a equipe".
  - Keep keys and ICU placeholders identical to pt-PT.
- [ ] **Step 5: Hide `AdvisorNote`** on pt-BR in both places. Add the CLAUDE.md pt-BR rule.
- [ ] **Step 6: Run** `npm run check:pt-br`. Expected: PASS for the step-1 namespaces. Then run lint, type-check and build.
- [ ] **Step 7: Read every step-1 `/br` page in the browser** and fix anything that reads as European Portuguese. **Commit:** `feat(i18n): pt-BR copy for shared UI and director pages`

### Task 5: pt-BR privacy policy and terms (LGPD)

**Files:** `messages/pt-BR.json` (namespaces `privacyPolicy` and `termsOfUse`), `src/components/PrivacyPolicy.tsx` and `TermsOfUse.tsx` if a section needs a pt-BR-only block

- [ ] **Step 1: Adapt both texts** from pt-PT for LGPD (Lei 13.709/2018):
  - Legal bases per art. 7.
  - Data subject rights per art. 18.
  - Encarregado: the privacy contact already in the pt-PT policy, named as such.
  - International transfer to the EU per art. 33.
  - ANPD as the authority.
  - Terms: Brazilian consumer users keep the protections of the Código de Defesa do Consumidor, with jurisdiction per CDC rules.

  Mark the PR "legal text: Miguel reviews before merge".
- [ ] **Step 2: Verify** that `check:pt-br` passes, `/br/privacy` and `/br/terms` render, and the consent links in the `/br` contact forms point to `/br/privacy`. **Commit:** `feat(i18n): pt-BR privacy policy and terms under LGPD`

### Task 6: Brazilian media and booking page

**Files:**
- Create: `public/app/br/*` (the same 29 file names as `public/app/pt`)
- Modify: `src/lib/app-media.ts` (`media["pt-BR"] = forLocale("br", …)`, `FILM_DURATIONS_SECONDS["pt-BR"]`, `FILM_UPLOAD_DATES["pt-BR"]`)
- Modify: `src/lib/booking.ts` (`BOOKING_PAGE_URL: Record<Locale, string>`; pt-BR defaults to the current URL until Miguel supplies the Brazilian page)
- Modify: `src/components/BookingEmbed.tsx` (or wherever `BOOKING_*` is read)

- [ ] **Step 1: Record the set** with the `_screenshots/` scripts (`README.md` there) against a local app in pt-BR. Use a Brazilian demo teacher and school (Brazilian names, a 6º ano Matemática turma with BNCC habilidades, bimestres, Brazilian holidays). `_screenshots/demo-brasil/` and `videos/scooli-demo-brasil` hold earlier BR state and footage. Films go through the existing HyperFrames pipeline (`videos/scooli-hero-film`, `videos/scooli-mobile-films`) with the BR recordings. Fabricated local data is fine. No public numbers.
- [ ] **Step 2: Measure the durations.** Run `ffprobe -v error -show_entries format=duration -of csv=p=0 public/app/br/{hero,step-1,step-2,step-3}.mp4` and put the values into `FILM_DURATIONS_SECONDS["pt-BR"]`. Delete the Task 2 `TODO(Task 6)`.
- [ ] **Step 3: Verify.** On `/br` and `/br/escolas`, every media request is under `/app/br/` (read the network requests), and no frame shows Aprendizagens Essenciais or Portuguese names (check the screenshots). Then lint and build. **Commit:** `feat(i18n): Brazilian app media and per-locale booking page`

### Task 7: chalkboard pt-BR confirmation emails

**Files** (chalkboard, branch from `origin/main`):
- Create: `services/src/main/resources/emails/mjml/pt-BR/contact-confirmation.mjml` and `mjml/pt-BR/institution-recommendation-confirmation.mjml` (and `mjml/pt-BR/components/` if the pt-PT ones include locale components)
- Create: compiled `emails/html/pt-BR/` for both
- Create: `services/src/main/resources/emails/subjects_pt-BR.properties` with only the `contact.confirmation` and `institution.confirmation` keys (other keys fall back to pt-PT through `fallbackChain()`)
- Test: `services/src/test/java/com/scooli/chalkboard/services/email/EmailServiceTest.java`

**Interfaces:**
- Consumes: `SupportedLocale.PT_BR`, `EmailRecipient.of(email, locale)`, `EmailService.sendContactConfirmation(...)` (all on `origin/main`).

- [ ] **Step 1: Write failing tests**, in the style of the existing `EmailServiceTest` cases:
  - `sendContactConfirmation_ptBR_usesBrazilianTemplateAndSubject`: subject == "Recebemos sua mensagem - Equipe Scooli", body contains "Equipe Scooli" and not "Equipa".
  - The same for institution recommendation: subject == "Recebemos sua recomendação — Equipe Scooli".
- [ ] **Step 2: Run** `./mvnw -q -pl services test -Dtest=EmailServiceTest`. Expected: FAIL (pt-PT subject returned).
- [ ] **Step 3: Write the MJML** (adapted from pt-PT, "você", Brazilian wording) and the properties file. Compile per `emails/README.md`: `npx mjml chalkboard/services/src/main/resources/emails/mjml/pt-BR/*.mjml -o chalkboard/services/src/main/resources/emails/html/pt-BR/`.
- [ ] **Step 4: Run the tests.** Expected: PASS. **Commit:** `feat(emails): pt-BR contact and recommendation confirmations`

### Task 8: Step 1 verification and PRs

- [ ] **Step 1: Run the checks** in the landing worktree: `npm run lint && npm run type-check && npm run build && npm run check:pt-br && npm run check:routes` (the last against `npm start`). Expected: all pass.
- [ ] **Step 2: Take Playwright screenshots** of every step-1 `/br` page at the six device sizes, in light and dark (see the memory note "Web-app local verification" for the headless sweep). Check them for overflow, missing copy keys (`MISSING_MESSAGE` in the server log) and European Portuguese.
- [ ] **Step 3: Open the landing PR** (step-1 checklist, the truth-check list, "legal text: Miguel reviews before merge") and the chalkboard PR. Merge order: chalkboard first, then landing. Announce merges (landing `main` = production).
- [ ] **Step 4: After merge:** update `scooli-map` (the landing feature file gets pt-BR; stamp, index, check, push to `scooli-map` `main`). Record in SamePage: pt-BR landing at `/br`, euros, LGPD claim, Teachy angle.

## Step 2: everything else (landing PR "feat(i18n): pt-BR site, step 2")

### Task 9: Teacher, AI, tools, roadmap and investor pages

**Files:** `messages/pt-BR.json` (namespaces `teachers`, `aiForTeachers`, `tools`, `roadmap`, `investors`, `advisorNote` if used), create `src/components/marketing/content/pt-BR.ts`, wire it wherever `content/pt-PT.ts` and `content/en.ts` are selected, and `src/i18n/localeSlugs.ts` (final pt-BR tool slugs)

- [ ] **Step 1: Confirm the pt-BR tool slugs** against Brazilian search terms (web search for volume and wording: "gerador de provas", "atividades", "planejamento anual"). Freeze them in `localeSlugs.ts`, and add the old-slug → new-slug 301 cases to `check-routes.mjs`.
- [ ] **Step 2: Extend the copy guard** to require the step-2 namespaces and `content/pt-BR.ts`. Run it. Expected: FAIL.
- [ ] **Step 3: Write the copy** (same rules as Task 4, truth-checked the same way). The investors page keeps the global framing (Portugal is the first market, Brazil is next, no client claims).
- [ ] **Step 4: Run** `check:pt-br`, lint and build. Expected: pass. **Commit:** `feat(i18n): pt-BR teacher, AI, tool, roadmap and investor pages`

### Task 10: Comparisons (Teachy first), llms.txt and pricing.md

**Files:** `src/components/marketing/comparisons.ts`, `src/app/llms.txt/route.ts`, `src/app/pricing.md/route.ts`

- [ ] **Step 1: Write the pt-BR comparison entries.** Teachy follows the spec's four angles (direção vê o cumprimento do planejamento turma a turma; o plano acompanha a sala; BNCC habilidades as how it works; the school's rules entered once), within the wording limits in Global Constraints. Its sources are the spec list. Canva, MagicSchool and ChatGPT/Gemini/Perplexity are adapted for Brazil.
- [ ] **Step 2: Replace the dead Teachy pricing source** (`helpcenter.teachy.ai/pt-BR/articles/9500483-nossos-planos`, 404) in every locale's source list. Remove the claim it backed, or find a live official source.
- [ ] **Step 3: llms.txt and pricing.md.** `llms.txt` gains a "Brazilian site" section listing the `/br` URLs. `pricing.md` serves pt-BR when it gets `?locale=pt-BR` (or the route's existing locale mechanism).
- [ ] **Step 4: Verify.**
  - `curl -I` each Teachy source URL: all 200.
  - `/br/comparar/teachy` renders after Task 11.
  - Lint and build pass.
  - **Commit:** `feat(i18n): pt-BR comparisons with the Teachy angle; fix dead Teachy source`

### Task 11: Open every pt-BR page and ship

- [ ] **Step 1:** Set `NOT_YET_LOCALIZED["pt-BR"] = []`. Update `check-routes.mjs`: the former 307 cases now expect 200 at their pt-BR slugs.
- [ ] **Step 2:** Run the full Task 8 checks (routes, guard, lint, type-check, build, 6-size light/dark screenshots of every `/br` page). The sitemap now lists every `/br` URL.
- [ ] **Step 3:** Open the PR, merge after approval, update `scooli-map`, and record in SamePage that the BR site is complete.
