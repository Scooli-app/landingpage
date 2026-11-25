# Landing page in Brazilian Portuguese (pt-BR): design

Date: 2026-11-25. Status: draft for approval.

## Intent and why

Scooli is talking to Brazilian school directors. When a director opens the website, every page they reach should read as built for a Brazilian school: Brazilian Portuguese, BNCC, Brazilian school terms, Brazilian screenshots. One stray page about Aprendizagens Essenciais or "agrupamentos" tells them the product is Portuguese with a Brazil sticker on it.

The app already supports this: web-app `main` ships Português (Brasil) as an interface language (#352), and Brazilian teachers get the BNCC curriculum, Brazilian years and subjects, the February–December calendar with bimestres, and Brazilian holidays (SamePage decisions 2026-11-23 to 11-25). The landing page is the missing piece.

## Goals

- A third site language, `pt-BR`, covering every page the pt-PT site has, with copy adapted to Brazil (not a word-for-word translation of pt-PT).
- A director clicking anywhere on `/br` stays on Brazilian pages.
- Sign-up from `/br` lands the visitor in the app in pt-BR.
- Google can index the Brazilian pages as pt-BR, separate from pt-PT and English.

## Non-goals

- Prices in reais. Pro stays €6.99/month (€67.10/year) in euros on the Brazilian site; BRL prices would need Stripe and app checkout work and are a separate project.
- Changes to the app or curricula. The one backend change in scope is the pt-BR contact emails (see Leads below).
- Brazilian technical/vocational education (hidden for BR teachers in the app; the site must not mention it for Brazil).
- Rewriting the pt-PT or English copy.

## Anti-goals (failure even if it "works")

- Any page reachable from `/br` showing Portuguese-only references: Aprendizagens Essenciais, DL 54/2018 or 55/2018, RGPD as the only privacy claim, agrupamentos, 1.º/2.º/3.º ciclo, "fichas", "testes", "ano letivo" in the PT sense, Portuguese teacher names in screenshots.
- European Portuguese grammar or vocabulary in the pt-BR copy (tu/você mix, "equipa", "contacto", "telemóvel", "registo"). The copy should read as written by a Brazilian.
- Claims that aren't true for Brazilian users (features or curricula the BR app path doesn't have).
- Automatic redirects based on browser language or IP. They break hreflang crawling and would strand Portuguese visitors (the reason `localeDetection: false` exists today).

## Constraints

- Stack: Next.js + next-intl, locale registry in `src/i18n/routing.ts`, copy in `messages/{locale}.json` (~2,100 lines each) plus `src/components/marketing/content/{locale}.ts` (tool pages) and `src/components/marketing/comparisons.ts`.
- `routing.ts` says the locale list mirrors the backend `SupportedLocale` and the web-app registry. Both now include pt-BR (web-app `main` has `messages/pt-BR.json`). The landing must use the same tag, `pt-BR`, because the `NEXT_LOCALE` cookie on `.scooli.app` and the `?locale=` sign-up parameter hand the choice to the app.
- The code assumes two languages in 13 places across 9 files (`locale === "en" ? … : <Portuguese>`): `[locale]/layout.tsx`, `[locale]/page.tsx`, `ferramentas/page.tsx`, `Footer.tsx`, `PrivacyPolicy.tsx`, `TermsOfUse.tsx`, `i18n/urls.ts`, `lib/format.ts`, `lib/seo.ts`. Left alone, pt-BR silently falls into the pt-PT branch (for example `geo.region: PT` / `geo.placename: Portugal` in the layout). Each one must handle pt-BR explicitly.
- `landingpage` `main` is production. Delivery goes through PRs.
- Copy rules in the workspace `CLAUDE.md` apply. A pt-BR rule is added (see below).

## Approaches considered

1. **Full pt-BR site language, delivered in two steps (chosen).** A third next-intl locale with its own copy, URLs, hreflang, sitemap entries and media. Step 1 covers the pages directors see; step 2 the rest. It reuses the machinery English already uses, so there's nothing new to maintain, and it's the only option where a director can't click into a Portuguese page.
2. **Director pages only.** Same mechanism, but tool, comparison and legal pages are never adapted. Cheaper, but the site stays partial for good. Rejected: the point is that everything is tailored.
3. **A separate Brazil page or domain.** Fastest, but it's a second site to keep in sync, and the first click from it lands on Portuguese pages. Rejected: works against the goal.

## Decisions made with Miguel

- **Approach:** full pt-BR, two steps (above).
- **Pricing:** show Pro in euros (€6.99/month, €67.10/year, same as pt-PT). The school plan stays "Sob consulta", priced by number of teachers, with a "Fale com a equipe" CTA.
- **Data protection:** Scooli is LGPD compliant. Brazilian copy says "Em conformidade com a LGPD" and can also mention GDPR and EU hosting as an extra guarantee. The privacy policy and terms get Brazilian versions that cite LGPD.
- **Legal texts:** Claude writes the pt-BR privacy policy and terms, adapted from the pt-PT versions for LGPD. They cover the data protection officer (encarregado) and contact, using the privacy contact already in the current policy unless Miguel names someone else, the legal basis for international transfer to the EU, and Brazilian consumer law and courts for Brazilian users. Miguel reviews them in the PR.
- **Brazil in production:** live (backend 1.11.x, web-app `main`, BNCC curricula). `/br` doesn't wait on anything and is indexable from step 1.
- **Leads:** in scope. pt-BR contact confirmation and notification emails are added to chalkboard (`emails/mjml/pt-BR/` + `html/pt-BR/`), and the landing sends `locale: "pt-BR"`. The booking embed uses a Brazilian Google Calendar appointment page; Miguel creates it in Google Calendar (pt-BR text, Brasília time zone) and gives the URL, with the pt-PT page as a fallback until then.
- **Teachy page (step 2), from research on 2026-11-25:** Teachy is the Brazilian incumbent. It has a BNCC-coded calendar and year planner per class, attaching your own material, a school offer with a "Smart Calendar", leadership visibility, student performance by skill, auto-grading and messages to families, an R$40M Series A and the Nero.AI acquisition (June 2026). Calendar, BNCC and own material are shared ground, not differences. The page leads with:
  1. **A direção vê o cumprimento do planejamento, turma a turma** — "Saiba, em cada turma, quanto do currículo previsto já foi dado e o que ficou para trás, sem pedir relatórios aos professores." Live in the app: "Cumprimento dos planejamentos", % of the planned curriculum to date, classes behind, "Ainda a dar", "Onde a escola precisa de reforço", assessment calendar, substitutions. Coverage depends on teacher check-ins, so say so where precision matters.
  2. **O plano acompanha o que aconteceu na sala** — the year plan becomes each turma's calendar by bimestre. Check-ins (Ministrada / com dificuldades / Ficou pela metade / Não houve aula) move the following lessons.
  3. Proof point: each lesson linked to real BNCC habilidades (plus the state curriculum where loaded), which is what makes "what's left" measurable. Presented as how it works, not as superiority.
  4. Secondary: the school's rules and textbook entered once and applied to every teacher's documents.

  About Teachy, write only "na documentação pública não encontramos", never "a Teachy não tem". Don't touch price (Teachy has a free tier and about R$30–40/month Premium, and Khanmigo is free in Brazil), quality or BNCC-error claims (no evidence found), anything saying Teachy lacks a calendar, planning or own-material upload, or student data, auto-grading and family messaging (Teachy's ground). Attribute Teachy's user numbers to their source (they conflict: 6M on teachy.ai vs 1M registered / 300k active in Brazil Journal 2024). Sources: teachy.ai/schools, teachy.ai/tool/school-calendar-planner, teachy.com.br/pt-BR/ferramentas/lesson-plan-generator, teachy.com.br/teachers, Brazil Journal 2024, TI Inside 2026, Revista Educação 2024 (re-check), MEC/CNE AI guidelines (Parecer CNE/CP 15/2026) for "o professor decide". The old Teachy help-center pricing link in `comparisons.ts` now 404s and gets replaced for every locale.
- **Escolas page (step 1):** the pt-BR `/escolas` page leads with the same message as angle 1 (cumprimento do planejamento turma a turma), with angle 2 as the next section.

## Design

### URLs and routing

- Prefix `/br` (custom next-intl prefix: `localePrefix: { mode: "as-needed", prefixes: { "pt-BR": "/br" } }`). pt-PT stays at the root and English at `/en`. Nothing currently indexed moves.
- Every entry in `pathnames` gets a `pt-BR` column. Slugs use Brazilian wording where it differs: `/br/precos`, `/br/escolas`, `/br/professores`, `/br/ia-para-professores`, `/br/sobre`, `/br/contato` (not "contacto"), `/br/confianca`, `/br/ferramentas/...`, `/br/comparar/...`. Tool slugs follow Brazilian search terms (for example `gerador-de-provas` instead of `gerador-de-testes`, `atividades` or `listas-de-exercicios` instead of `fichas-de-trabalho`). The slug tables in `toolSlugs.ts` and the middleware generalise from "English slugs" to "per-locale slugs".
- No automatic redirect. A visitor from Brazil (Vercel geo header) who lands on a pt-PT page sees a small dismissible banner offering the Brazilian site. Visitors with a `NEXT_LOCALE` cookie of `pt-BR` get the same offer.

### Language switcher and handoff to the app

- The switcher lists "Português (Portugal)", "Português (Brasil)" and "English" (names in their own language, as in the app). Short labels: PT / BR / EN.
- Sign-up and login links from `/br` carry `?locale=pt-BR` and set `NEXT_LOCALE=pt-BR`, so the app opens in pt-BR.

### Copy

- New `messages/pt-BR.json`, `content/pt-BR.ts` and pt-BR entries in `comparisons.ts`, adapted from pt-PT with Brazil's references:
  - Curriculum: BNCC (with BNCC Computação), habilidades and their codes (EF06MA…), anos iniciais/finais do ensino fundamental, ensino médio.
  - School year: February to December, 4 bimestres, Brazilian holidays.
  - School vocabulary: provas, atividades, listas de exercícios, plano de aula, planejamento (anual, bimestral), turma, coordenação pedagógica, direção, rede de ensino (municipal/estadual), secretaria de educação.
  - Inclusion: Brazilian framing (educação inclusiva, AEE, PEI) instead of DL 54/2018.
  - Privacy: LGPD (plus GDPR as an extra).
  - Comparisons: the Teachy page matters most, since Teachy is Brazilian.
- Only claim what the BR app path does today. Where pt-PT copy describes something only PT users have, the pt-BR copy drops or reworks it.
- SEO metadata, structured data (`inLanguage: pt-BR`, `areaServed: BR`, price in EUR), OG/share text, `llms.txt` and `pricing.md` get pt-BR versions.
- Team and advisor content stays as is (the team is Portuguese and that's true). The pt-BR versions of the about and investor pages present it to a Brazilian reader.

### Media

- A third set of app screenshots and videos in `public/app/br/`, recorded from the local app in pt-BR with a Brazilian demo teacher (Brazilian names, BNCC habilidades, bimestres, a Brazilian school). The `videos/scooli-demo-brasil` film can be reused where a film fits. Fabricated local demo data is fine. No inflated public numbers.

### SEO plumbing

- `hreflang` alternates list pt-PT, pt-BR and en, with `x-default` unchanged (pt-PT root).
- The sitemap lists `/br` URLs only for pages whose pt-BR copy is done. During step 1, step-2 pages stay out of the sitemap, aren't linked from the BR nav or footer, and canonicalise to their pt-PT URL (the `notYetLocalized` mechanism in `i18n/urls.ts`, made per-locale).
- Layout meta per locale: `geo.region: BR` for pt-BR, nothing Portugal-specific.

### Copy rule in the workspace CLAUDE.md

A pt-BR section is added next to the existing pt-PT and English rules: Brazilian copy is for the Brazilian market, cites BNCC and Brazilian legislation and terms, uses "você" and Brazilian vocabulary, never mentions Portuguese curricula or laws, and adapts the message rather than translating it.

## Delivery in two steps

**Step 1: what a director sees.** The locale plumbing (routing, `/br` prefix, slugs, the 13 two-language branches, switcher, app handoff, hreflang, sitemap, banner) plus pt-BR copy and media for home, escolas, precos, contato, confianca, sobre, recomendar-instituicao, privacy and terms, and the shared nav, footer, contact modal, booking and not-found. Privacy and terms are in step 1 because the contact forms' consent links, the pricing fair-use link and the footer all point at them.

While step 1 is live and step 2 isn't (builder's calls, noted here):
- A `/br` URL for a step-2 page redirects (307, temporary) to `/br`. It never renders pt-PT copy under `/br`, so `messages/pt-BR.json` only needs the step-1 namespaces plus shared ones.
- The language switcher offers BR only on pages that have pt-BR copy. Elsewhere, choosing BR goes to `/br`.
- Step-2 pages aren't in the BR nav, footer or sitemap.

**Step 2: everything else.** professores, ia-para-professores, all tool pages, all comparison pages (Teachy first), roadmap, investidores. Then every page is in the BR nav and sitemap and the temporary redirects go away.

### Truth checks for step-1 claims (builder's call)

Every product claim on the step-1 pages (for example the direction view of curriculum state across turmas, early detection of classes falling behind, the school library, invites) is checked against the BR path in web-app and chalkboard `main` before it goes into pt-BR copy. Anything not true for Brazilian teachers is dropped or reworded. Service promises (pilot, implementation, teacher training) stay as they are for Portugal, delivered remotely.

- The pedagogical advisor note (Sílvia Valério, 1.º ciclo, Aprendizagens Essenciais) is hidden on `/br`. It's true for Portugal and not for BNCC.
- The contact form sends `locale: "pt-BR"` to the backend `/contact` endpoint, which answers with the new pt-BR emails.

Each step ships as its own PR, with lint and build passing and Playwright screenshots of every pt-BR page at the six device sizes, light and dark.

## Left to the builder

- Exact pt-BR slugs for tools and comparisons, checked against Brazilian search terms.
- Banner placement and wording.
- How the per-locale "not yet localized" exception is structured in code.
- Which screenshots to re-record first, and how to stage the local BR demo data.
- How the PRs split inside each step.
