# Landing round 2 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the second review round of the Scooli landing: pt-PT copy sweep, smoother how-it-works films, a sharper chat comparison, icon-based resources, a prominent trust band with a GDPR seal, a booking calendar in every contact dialog, a pricing page and schools page that sell the institutional plan, and new investors (with an emailed pitch deck) and roadmap pages plus a stronger team page.

**Architecture:** Next 16 App Router + next-intl (`messages/{pt-PT,en}.json`, localized `pathnames` in `src/i18n/routing.ts`), Tailwind 4 tokens from `globals.css`, site primitives in `src/components/site/primitives.tsx` and `src/components/marketing/shared.tsx`. One new server route (`src/app/api/pitch-deck/route.ts`) calls the Resend REST API with `fetch`. Media pipeline in `C:\PROJECTS\Scooli\_screenshots` (see its README).

**Tech Stack:** Next 16, React 19, TypeScript, Tailwind 4, next-intl, lucide-react, zod, ffmpeg, Playwright over CDP (port 9333), local Postgres in docker `scooli-db`.

**Spec:** `docs/superpowers/specs/2026-10-07-landing-round-2-design.md`

## Global Constraints

- No branches, worktrees, commits, merges or pushes. Miguel commits. (Replace every "commit" step with "leave the change uncommitted".)
- No TDD for visual/UI work: verify with screenshots (desktop 1440, phone 390, PT and EN). There is no test runner in `landingpage/`.
- PT copy: European Portuguese only (AO90, formal "o professor / a sua", "a + infinitivo", no PT-BR words).
- EN copy: market-agnostic (no Portugal, Portuguese curricula or legislation, including SEO) and adapted, not translated. Single exception: EN team bios may name companies and Portugal.
- Public numbers only: 500+ teachers, 900+ documents (`PUBLIC_IMPACT_METRICS` in `src/lib/seo.ts`).
- Never write "para quem usa todas as semanas" or any phrase tying the paid plan to usage frequency.
- Class State / "operating system for teaching" only as *in development*.
- Booking URL: `https://calendar.google.com/calendar/appointments/schedules/AcZssZ0r8xxB0JHTg6DyEvN9hunryCYwHj-KrdaPQFJFNYg_jFm_ntsMXR2CoEJVNYNCSZICTBbSXbqQ?gv=true` (public short link `https://calendar.app.google/iqyCb3azHXdKa2j88`).
- Pitch deck email: from and reply-to `Miguel Rodrigues <miguel@scooli.app>`, BCC miguel@scooli.app, plain text, attachment `Scooli Pitch Deck EN.pdf` for both locales.
- Every task ends with `npx tsc --noEmit` and `npm run lint` clean in `landingpage/`.

## Review Focus

- Contact dialog on a phone (390 px): the iframe must not overflow or trap scrolling; the form must still be reachable via the segmented control.
- Google booking iframe blocked (privacy extensions, offline): the dialog still offers the "open in a new window" link and the form.
- Pitch deck route without `RESEND_API_KEY`, with a bad email, with the honeypot filled, or spammed: 503 / 400 / silent 200 / 429 respectively, and the form shows a sensible message for each.
- How-it-works on slow networks: switching steps never shows a blank or a poster flash; the pause button pauses whichever clip is active.
- Homepage order change: in-page anchors (`/#como-funciona`) and section ids still resolve.

---

### Task 1: European Portuguese sweep

**Files:**
- Modify: `messages/pt-PT.json`, `src/components/marketing/content/pt-PT.ts`, PT strings in `src/lib/seo.ts`, `src/app/llms.txt/route.ts` (if it has PT copy), `src/app/og/*` (PT text)

- [ ] **Step 1: Find candidates**

Run from `landingpage/`:
```bash
grep -rnoiE "\b(você|vocês|equipe|usuári[oa]s?|arquivos?|telas?|registro|contato|planejament\w*|cadastr\w*|baixar|celular|a gente|legal|ônibus|time de)\b|\b\w+(ando|endo|indo)\b" messages/pt-PT.json src/components/marketing/content/pt-PT.ts src/lib/seo.ts src/app/llms.txt src/app/og
```
Gerund hits need judging in context ("quando" etc. are false positives; "estamos trabalhando" is a real hit). Also read `messages/pt-PT.json` top to bottom once for PT-BR clitic placement ("me envie", "se adapta" at sentence start → "adapta-se") and PT-BR phrasing ("na hora de", "fazer o upload").

- [ ] **Step 2: Fix each hit in place** keeping meaning and register (e.g. "contato" → "contacto", "registro" → "registo", "a gerar" not "gerando", "Envie-nos" not "Nos envie").

- [ ] **Step 3: Verify**: rerun the grep (only false positives left), `npx tsc --noEmit`, `npm run lint`.

### Task 2: Hero note and homepage order

**Files:**
- Modify: `src/components/homepage/HeroSection.tsx` (remove the `<p className="mt-3 text-sm text-faint">{t("note")}</p>` line)
- Modify: `messages/pt-PT.json`, `messages/en.json` (delete `home.hero.note`)
- Modify: `src/components/homepage/HomePage.tsx`

- [ ] **Step 1:** Remove the note line and the `note` keys.
- [ ] **Step 2:** Reorder `HomePage`:

```tsx
        <HeroSection />
        <ProofSection />
        <HowItWorksSection />
        <YearSection />
        <ResourcesSection />
        <ChatComparisonSection />
        <TrustSection />
        <AudiencesSection />
        <FinalCtaSection />
```
and update its doc comment: product first (how it works, the year, the resources), then the two objections back to back (a generic chat; data and safety), then who it is for and the close.

- [ ] **Step 3:** `tsc` + `lint`; screenshot the homepage top (desktop, PT) to confirm the note is gone and the CTA spacing still looks right (`mt-10 md:mt-12` above the film may need to become `mt-12 md:mt-14`).

### Task 3: Smooth how-it-works films

**Files:**
- Modify: `src/components/homepage/HowItWorksSteps.tsx`
- Regenerate: `public/app/{pt,en}/step-{1,2,3}.mp4`, `step-{1,2,3}-mobile.mp4`, posters unchanged
- Possibly modify: `C:\PROJECTS\Scooli\_screenshots\render.py` (add an output frame-pacing option) and its README

- [ ] **Step 1: Measure the stutter.** For each `step-*.mp4` count duplicated frames:
```bash
ffmpeg -i public/app/pt/step-2.mp4 -vf mpdecimate -loglevel debug -f null - 2>&1 | grep -c " drop "
```
A high drop count = uneven source pacing.

- [ ] **Step 2: Re-render with steady pacing.** Re-run the README commands for the step clips (PT `film/hero-pt`, EN equivalent) with the output filter chain `mpdecimate,setpts=N/FRAME_RATE/TB` removed in favour of `fps=30` after a `minterpolate=fps=30:mi_mode=blend` on sped-up segments. If `render.py` builds the filter graph, add a `--smooth` flag that appends `,minterpolate=fps=30:mi_mode=blend` to the final video filter and document it in the README table. Keep crops, durations and CRF the same; keep file sizes within ~1.5× of today's.

- [ ] **Step 3: Stack the clips in the player.** Replace the single keyed `<video>` with one `<video>` per step, absolutely stacked, all mounted once the section is near the viewport:

```tsx
const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
// ...
useEffect(() => {
  videoRefs.current.forEach((player, index) => {
    if (!player) {return;}
    player.muted = true;
    if (index === active && inView && !paused) {
      void player.play().catch(() => {});
    } else {
      player.pause();
      if (index !== active) {player.currentTime = 0;}
    }
  });
}, [active, inView, paused, isPhone]);
// ...
{steps.map((step, index) => {
  const clip = (isPhone && step.film.mobile) || step.film;
  return (
    <video
      key={`${index}-${clip.src}`}
      ref={(node) => { videoRefs.current[index] = node; }}
      className={cn(
        "absolute inset-0 size-full object-cover transition-opacity duration-500",
        index === active ? "opacity-100" : "opacity-0",
      )}
      poster={clip.poster}
      muted
      playsInline
      preload="auto"
      disablePictureInPicture
      aria-hidden={index !== active}
      aria-label={index === active ? step.imageAlt : undefined}
      onEnded={() => setActive((current) => (current + 1) % steps.length)}
    >
      <source src={clip.src} type="video/mp4" />
    </video>
  );
})}
```
Mount the videos when the panel is within `rootMargin: "300px"` (separate `nearView` state from the 0.35-threshold `inView` used for play/pause). The frame's aspect ratio comes from the active clip (all clips share one size per breakpoint).

- [ ] **Step 4: Verify** in the browser (PT, desktop and phone): let it run through 1→2→3→1; take screenshots at each switch ±200 ms (via `javascript_tool` reading `currentTime` and opacity) — no blank frame, no poster flash. Pause button stops the active clip. `tsc` + `lint`.

### Task 4: Chat comparison — "O que a Scooli faz diferente"

**Files:**
- Modify: `src/components/homepage/ChatComparisonSection.tsx`
- Modify: `home.chatComparison` in both message files

- [ ] **Step 1: Copy.** PT:
```json
"kicker": "Porquê a Scooli",
"title": "O que a Scooli faz diferente.",
"description": "Se hoje prepara aulas num chat de IA, conhece o resto do trabalho: explicar, copiar, formatar, confirmar. A Scooli faz essa parte por si.",
"chat": { "label": "Num chat de IA", "points": [
  "Explica a turma, o ano e o nível em cada conversa",
  "Copia, cola e formata no Word, um documento de cada vez",
  "Confirma à mão se bate certo com as Aprendizagens Essenciais",
  "Na semana seguinte começa do zero: o chat não sabe o que já deu"
]},
"scooli": { "label": "Na Scooli", "points": [
  { "title": "Conhece cada turma", "text": "Parte da sua planificação e do calendário de cada turma." },
  { "title": "Alinhada com o currículo", "text": "Segue as Aprendizagens Essenciais do ano e da disciplina." },
  { "title": "Documentos prontos a usar", "text": "No seu modelo, com exportação para Word e PDF." },
  { "title": "Semana após semana", "text": "Prepara a semana seguinte sem recomeçar do zero." }
]}
```
EN (market-agnostic): kicker "Why Scooli", title "What Scooli does differently.", description "If you plan lessons in an AI chat today, you know the rest of the job: explain, copy, format, double-check. Scooli does that part for you." Chat points: "Re-explain the class, grade and level in every conversation" / "Copy, paste and reformat in Word, one document at a time" / "Check by hand that it matches your curriculum" / "Start from zero next week: the chat doesn't know what you've taught". Scooli points: "Knows each class" — "Starts from your scheme of work and each class's calendar."; "Built around the curriculum" — "Follows the learning goals of each grade and subject." (only true statement: generation uses the year/subject the teacher sets; do not claim specific foreign curricula); "Ready-to-use documents" — "In your template, exported to Word and PDF."; "Week after week" — "Prepares next week without starting over." Keep `chat.prompt`, `chat.answer`, `scooli.imageAlt`.

- [ ] **Step 2: Layout.** Scooli card points become a 2×2 grid of items, each `icon (size-5, text-violet) + title (17px semibold) + text (15px subtle)`; icons: `Users`, `BookOpenCheck`, `FileCheck2`, `CalendarRange`. Chat points stay small (14.5px, `Minus`, white/55). Update `scooliPoints` type to `{ title: string; text: string }[]`.

- [ ] **Step 3:** screenshot desktop + phone PT/EN; `tsc` + `lint`.

### Task 5: Resources with icons

**Files:**
- Modify: `src/components/homepage/ResourcesSection.tsx` (keep `ResourcePreview` export untouched for /ferramentas)
- Modify: `home.resources` in both message files (add `description` and per-item `description`)

- [ ] **Step 1: Icon map** (lucide): `plano-de-aula` → `NotebookPen`, `fichas-de-trabalho` → `FileText`, `gerador-de-testes` → `ClipboardCheck`, `quizzes` → `ListChecks`, `planificacoes` → `CalendarRange`, `apresentacoes` → `Presentation`. Confirm the six slugs from `NAV_TOOL_SLUGS` in `src/components/site/nav-data.ts` and map whichever exist.

- [ ] **Step 2: Card.** `TrackedLink` card: `rounded-xl border border-line-strong bg-white p-6`, icon in a `size-11 rounded-lg bg-stone-soft grid place-items-center` tile (`size-5 text-ink strokeWidth 1.75`), then title (17px semibold) with the → arrow, then a one-line description (15px subtle).

- [ ] **Step 3: Copy.** PT title "Os recursos da semana, prontos a usar.", description "Cada recurso adapta-se à turma, ao nível e ao tempo de aula." Item descriptions, one line each (e.g. Plano de aula: "Objetivos, atividades e avaliação para cada aula."). EN title "This week's resources, ready to use.", description "Each one fits the class, the level and the lesson length."

- [ ] **Step 4:** screenshots; `tsc` + `lint`.

### Task 6: Trust band with the GDPR seal

**Files:**
- Create: `src/components/site/GdprSeal.tsx`
- Modify: `src/components/homepage/TrustSection.tsx`, `src/app/[locale]/confianca/page.tsx` (seal in the hero), `home.trust` and `trust` in both message files

- [ ] **Step 1: Seal.** The common badge: blue disc, ring of 12 yellow stars, "GDPR" in the centre.

```tsx
/** The common "GDPR" badge (EU blue, ring of 12 stars). Decorative; the caption carries the claim. */
export function GdprSeal({ className }: { className?: string }) {
  const stars = Array.from({ length: 12 }, (_, index) => {
    const angle = (index / 12) * Math.PI * 2 - Math.PI / 2;
    return { x: 50 + Math.cos(angle) * 34, y: 50 + Math.sin(angle) * 34 };
  });
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <circle cx="50" cy="50" r="48" fill="#003399" />
      <circle cx="50" cy="50" r="44" fill="none" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="1" />
      {stars.map((star, index) => (
        <path
          key={index}
          transform={`translate(${star.x} ${star.y}) scale(0.38)`}
          d="M0,-10 L2.35,-3.24 L9.51,-3.09 L3.8,1.24 L5.88,8.09 L0,4 L-5.88,8.09 L-3.8,1.24 L-9.51,-3.09 L-2.35,-3.24 Z"
          fill="#FFCC00"
        />
      ))}
      <text x="50" y="56" textAnchor="middle" fontFamily="var(--font-geist), system-ui, sans-serif" fontWeight="700" fontSize="17" fill="#ffffff" letterSpacing="0.5">GDPR</text>
    </svg>
  );
}
```
(Check the actual font CSS variable name in `src/app/[locale]/layout.tsx` / `globals.css` and use it.)

- [ ] **Step 2: Band layout.** `TrustSection` becomes `<section className="bg-stone-soft py-20 md:py-28">`:
  - Left column: kicker, title ("A decisão final é sempre do professor." stays), seal (`size-24`) with caption "Em conformidade com o RGPD" / "GDPR compliant", short text.
  - Right column: the four guarantees as a 2×2 grid, each with an icon (editable → `PencilLine`, doesn't train AI → `Ban`, GDPR + encryption → `Lock`, honest about AI → `Eye`), title 17px semibold, description.
  - Bottom row across the band (`border-t border-line-strong pt-8 mt-12`): "Políticas" label + links "Política de privacidade" (`/privacy`), "Termos de utilização" (`/terms`), "Confiança e IA" (`/confianca`), and the `InstitutionalContactButton` "Pedir documentação".
- [ ] **Step 3: /confianca hero:** add the seal + caption next to the checklist; change `trust.summaryPoints[0]` "RGPD-ready" → "Em conformidade com o RGPD" (EN "GDPR compliant").
- [ ] **Step 4:** screenshots of the band and /confianca (PT/EN, desktop/phone); `tsc` + `lint`.

### Task 7: Booking calendar in the contact dialog and /contacto

**Files:**
- Create: `src/lib/booking.ts`, `src/components/BookingEmbed.tsx`
- Modify: `src/components/ContactModal.tsx`, `src/components/ContactSection.tsx` (the /contacto page body), `src/lib/analytics.ts` (nothing new if `marketing_cta_clicked` is reused), `contactModal` keys in both message files

- [ ] **Step 1: Constant.**
```ts
/** Google Calendar appointment schedule for demos and calls (short link: calendar.app.google/iqyCb3azHXdKa2j88). */
export const BOOKING_PAGE_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0r8xxB0JHTg6DyEvN9hunryCYwHj-KrdaPQFJFNYg_jFm_ntsMXR2CoEJVNYNCSZICTBbSXbqQ";
export const BOOKING_EMBED_URL = `${BOOKING_PAGE_URL}?gv=true`;
```

- [ ] **Step 2: `BookingEmbed`** (client): iframe `src={BOOKING_EMBED_URL}`, `title={t("bookingTitle")}`, `loading="lazy"`, `className="h-[600px] w-full rounded-lg border border-line bg-white"`; below it a `TrackedLink` "Abrir numa nova janela ↗" to `BOOKING_PAGE_URL` (`target="_blank" rel="noreferrer"`, `eventName="marketing_cta_clicked"`, `eventProperties={{ cta_id: "booking_open_new_tab", placement: source }}`).

- [ ] **Step 3: Dialog layout.** `DialogContent` → `max-w-[calc(100%-2rem)] sm:max-w-5xl max-h-[90dvh] overflow-y-auto`. Body: on `md+` a grid `md:grid-cols-[1.25fr_1fr] gap-8` (left: "Marcar reunião" heading + `BookingEmbed`; right: "Prefere escrever?" heading + the existing form). Below `md`: a two-button segmented control (`role="tablist"`, "Marcar reunião" / "Enviar mensagem", booking selected by default) showing one panel at a time. Keep title/description props. Copy keys: `contactModal.bookingHeading` ("Marcar reunião" / "Book a call"), `contactModal.writeHeading` ("Prefere escrever?" / "Rather write?"), `contactModal.bookingTitle` (iframe title), `contactModal.openInNewTab` ("Abrir numa nova janela" / "Open in a new window").

- [ ] **Step 4: /contacto.** Read `src/components/ContactSection.tsx`, then put `BookingEmbed` beside the existing form on desktop (same two-column grid), stacked on phones with booking first.

- [ ] **Step 5: Verify:** open the dialog from the hero "Pedir demonstração" (PT, EN), desktop and phone: iframe loads the schedule, no horizontal scroll, segmented control works, form still submits validation errors as before. `tsc` + `lint`.

### Task 8: Pricing page

**Files:**
- Modify: `pricingPage.hero`, `pricingSection.free.description`, `pricingSection.pro.descriptionMonthly/descriptionAnnual`, `pricingSection.enterprise` in both message files
- Create: `src/components/marketing/InstitutionalComparison.tsx`
- Modify: `src/app/[locale]/precos/page.tsx` (insert the comparison after `<PricingPageClient />`)

- [ ] **Step 1: Copy.** PT hero title "Preços simples, do professor à escola inteira.", description "Comece grátis. Passe a Pro quando quiser. Para a escola, um plano institucional." Free description "Para conhecer a Scooli e criar os primeiros materiais." Pro monthly "Tudo o que a Scooli faz, sem limites de criação." Pro annual "O mesmo plano Pro, pago uma vez por ano, com {savings} de desconto." — pass `savings` from `ProPlanCard` (`t("descriptionAnnual", { savings: savingsPercent })`). Enterprise description "Para escolas e agrupamentos que querem a Scooli para toda a equipa, com gestão central e acompanhamento." features: "Painel da escola com a atividade de cada professor", "Lugares e convites geridos num só sítio", "Biblioteca interna para partilhar materiais entre colegas", "Implementação e formação da equipa", "Documentação de privacidade para o encarregado de proteção de dados", "Uma fatura para a escola". EN equivalents, market-agnostic ("data protection officer").
- [ ] **Step 2: Grep** `grep -rn "todas as semanas\|every week" messages src` and rewrite any hit that ties the paid plan to usage frequency.
- [ ] **Step 3: `InstitutionalComparison`.** Section with `SectionHeader` (kicker "Para escolas", title "Porquê o plano institucional", description "Várias licenças Pro dão a Scooli a cada professor. O plano institucional dá-a à escola."), then a table (`<table>` with `<th scope="row">`) of 7 rows × 2 columns ("Várias licenças Pro" | "Plano institucional"): contas (cada professor gere a sua | lugares e convites centralizados), visibilidade (sem visão de conjunto | painel com a atividade de cada professor), partilha (biblioteca comunitária pública | biblioteca interna da escola), faturação (uma subscrição por professor | uma fatura para a escola), arranque (por conta própria | implementação e formação), privacidade (política pública | documentação e respostas para o EPD), experimentar (plano gratuito | piloto com uma equipa pequena). Institutional column highlighted (`bg-white border-2 border-ink` header cell, `Check` icons). Below: `InstitutionalContactButton source="pricing_institutional_comparison" label={tCommon("talkToTeam")}` (add `common.talkToTeam` if missing: "Falar com a equipa" / "Talk to our team"). On phones, render each row as a stacked card (label, then two lines) instead of a wide table.
- [ ] **Step 4:** screenshots PT/EN desktop/phone; `tsc` + `lint`.

### Task 9: School dashboard capture

**Files:**
- Create: `C:\PROJECTS\Scooli\_screenshots\seed-school.sql`, `seed-school-cleanup.sql`, `school-shot.mjs`
- Create: `public/app/{pt,en}/school-dashboard.png`
- Modify: `src/lib/app-media.ts` (add `schoolDashboard: ImageAsset`), `_screenshots/README.md`

- [ ] **Step 1: Inspect the schema** in the local DB for organizations, memberships, seats and usage:
```bash
docker exec scooli-db psql -U scooli -d scooli -c "\dt" | grep -iE "organi|member|seat|workspace|usage|shared"
```
Then read the backend query behind `fetchOrganizationDashboard` (`web-app/src/store/workspace/workspaceSlice.ts` → the chalkboard endpoint) to know which tables/columns feed each number.

- [ ] **Step 2: Seed** a fictional school "Agrupamento de Escolas da Ribeira" (EN capture: "Riverside School") whose admin is Miguel's local user, with ~12 teachers with Portuguese names (Ana Ferreira, Rita Carvalho, João Matos, Inês Lopes, Pedro Antunes, Catarina Sousa, Marta Ribeiro, Tiago Pereira, Sofia Marques, Ricardo Almeida, Beatriz Costa, Nuno Correia — reuse the `demo_*` users from `seed-library.sql` where possible), plausible monthly activity (usage events, documents across types, a few internal shares). All local; cleanup script reverses it.
- [ ] **Step 3: Capture** `/school` with the CDP pipeline (`cdpShot`, 1440 wide, 2x), PT and `UI_LANG=en`, cropping to the stats + activity cards. Save to `public/app/{pt,en}/school-dashboard.png`; record dimensions in `app-media.ts`.
- [ ] **Step 4:** Open the PNGs and check: no real user data, no Portuguese strings in the EN capture (hide or relabel via `page.evaluate` as `library-shot.mjs` does), numbers plausible and modest.

### Task 10: Schools page rebuild

**Files:**
- Modify: `src/app/[locale]/escolas/page.tsx`, `schools` in both message files, possibly `src/components/marketing/data.ts` (`getSchoolPageCards`)

- [ ] **Step 1: Copy.** PT hero eyebrow "Para escolas", title "A Scooli para a escola inteira.", description "Um plano para toda a equipa: cada professor prepara as aulas na Scooli e a direção acompanha a utilização num só painel." `benefits` (6 items `{title, description}`): Gestão central (lugares e convites num só sítio), Visão de conjunto (painel com a atividade de cada professor), Biblioteca da escola (materiais partilhados só entre colegas), Preparação consistente (o departamento parte das mesmas planificações), Implementação e formação (acompanhamos o arranque com a equipa), Privacidade documentada (documentação e respostas para o EPD). Keep `preview.items` (pilot steps), `blockers`, `recommend`, `finalCta` (reworded to the plan's value). EN equivalents.
- [ ] **Step 2: Layout.** Hero aside = `WindowFrame` with `schoolDashboard` image (from Task 9). Then "O que a escola ganha" — 3×2 grid of icon items (`Users`, `BarChart3`, `Library`, `Layers`, `GraduationCap`, `ShieldCheck`). Then the pilot steps (move the existing `PilotSteps` card here as a section "Como começar"), blockers, recommend callout, final banner. All "book demo" buttons already use `InstitutionalContactButton` → booking dialog from Task 7.
- [ ] **Step 3:** screenshots; `tsc` + `lint`.

### Task 11: New routes, footer and sitemap

**Files:**
- Modify: `src/i18n/routing.ts`, `src/components/Footer.tsx`, `src/app/sitemap.ts`, `footer.links` in both message files

- [ ] **Step 1:** add to `pathnames`:
```ts
  "/investidores": { "pt-PT": "/investidores", en: "/investors" },
  "/roadmap": "/roadmap",
```
- [ ] **Step 2:** `companyLinks` → about, investors (`/investidores`), roadmap (`/roadmap`), trust, contact, recommend; labels `footer.links.investors` ("Investidores" / "Investors"), `footer.links.roadmap` ("Roadmap" / "Roadmap").
- [ ] **Step 3:** sitemap entries `{ path: "/investidores", changeFrequency: "monthly", priority: 0.5 }`, `{ path: "/roadmap", changeFrequency: "monthly", priority: 0.6 }`. Check `isFullyLocalized` in `src/i18n/urls.ts` handles the new keys.
(Pages are created in Tasks 12–14; run `tsc` after those.)

### Task 12: Investors page and pitch deck email

**Files:**
- Create: `src/app/[locale]/investidores/page.tsx`, `src/components/investors/PitchDeckForm.tsx`, `src/app/api/pitch-deck/route.ts`, `src/lib/pitchDeckEmail.ts`, `private/scooli-pitch-deck.pdf`
- Modify: `next.config.ts` (`outputFileTracingIncludes`), `src/lib/analytics.ts` (add `"marketing_pitch_deck_requested"` and `"marketing_pitch_deck_failed"` to `MarketingEventName`), `investors` namespace in both message files, `.env.local` (add commented `# RESEND_API_KEY=` line only)

- [ ] **Step 1: Deck file.**
```bash
mkdir -p private && cp "/c/Users/Miguel Rodrigues/Desktop/Scooli/Pitch Deck/Scooli Pitch Deck EN.pdf" private/scooli-pitch-deck.pdf
```
`next.config.ts`:
```ts
  outputFileTracingIncludes: {
    "/api/pitch-deck": ["./private/scooli-pitch-deck.pdf"],
  },
```

- [ ] **Step 2: Email body** (`src/lib/pitchDeckEmail.ts`), plain text, per locale:
```ts
import type { Locale } from "@/i18n/routing";

export function pitchDeckEmail(locale: Locale, name: string) {
  const first = name.trim().split(/\s+/)[0];
  if (locale === "en") {
    return {
      subject: "Scooli — pitch deck",
      text: `Hi ${first},\n\nThanks for your interest in Scooli. Our pitch deck is attached.\n\nIf you'd like to talk, just reply to this email or book a time here: https://calendar.app.google/iqyCb3azHXdKa2j88\n\nBest,\nMiguel Rodrigues\nCo-founder, Scooli\nscooli.app`,
    };
  }
  return {
    subject: "Scooli — pitch deck",
    text: `Olá ${first},\n\nObrigado pelo interesse na Scooli. Segue em anexo o nosso pitch deck.\n\nSe quiser conversar, basta responder a este email ou marcar uma reunião aqui: https://calendar.app.google/iqyCb3azHXdKa2j88\n\nCumprimentos,\nMiguel Rodrigues\nCo-fundador, Scooli\nscooli.app`,
  };
}
```

- [ ] **Step 3: Route** (`src/app/api/pitch-deck/route.ts`):
```ts
import { readFile } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import { locales, type Locale } from "@/i18n/routing";
import { pitchDeckEmail } from "@/lib/pitchDeckEmail";

export const runtime = "nodejs";

const FROM = "Miguel Rodrigues <miguel@scooli.app>";
const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  company: z.string().trim().max(160).optional().default(""),
  note: z.string().trim().max(2000).optional().default(""),
  website: z.string().max(0).optional(), // honeypot: must stay empty
  locale: z.enum(locales),
});

// Best effort: per-instance memory, enough to stop a burst from one client.
const recent = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((time) => now - time < 60 * 60 * 1000);
  hits.push(now);
  recent.set(ip, hits);
  return hits.length > 5;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (body && typeof body.website === "string" && body.website.length > 0) {
    return Response.json({ ok: true }); // bot: pretend success
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {return Response.json({ error: "invalid" }, { status: 400 });}

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {return Response.json({ error: "rate_limited" }, { status: 429 });}

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {return Response.json({ error: "unavailable" }, { status: 503 });}

  const { name, email, company, note, locale } = parsed.data;
  const deck = await readFile(path.join(process.cwd(), "private", "scooli-pitch-deck.pdf"));
  const { subject, text } = pitchDeckEmail(locale as Locale, name);

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [email],
      bcc: ["miguel@scooli.app"],
      reply_to: "miguel@scooli.app",
      subject,
      text,
      headers: { "X-Scooli-Request": `${name} <${email}>${company ? ` · ${company}` : ""}${note ? ` · ${note.slice(0, 200)}` : ""}` },
      attachments: [{ filename: "Scooli Pitch Deck.pdf", content: deck.toString("base64") }],
    }),
  });
  if (!response.ok) {return Response.json({ error: "send_failed" }, { status: 502 });}
  return Response.json({ ok: true });
}
```
(BCC copy shows who asked via the To line; company and note travel in a header. If Miguel wants them visible, a second short internal email can follow — out of scope.) Check `z.enum(locales)` compiles with the readonly tuple; otherwise `z.enum(["pt-PT", "en"])`.

- [ ] **Step 4: Form** (`PitchDeckForm.tsx`, client): fields name, email, company ("Fundo ou empresa"), note (optional), hidden honeypot `website` (`tabIndex={-1} autoComplete="off" className="sr-only"`, `aria-hidden`). Submit → `fetch("/api/pitch-deck", …)`. States: success "Enviado. Verifique o seu email." / 400 field errors / 429 "Já recebemos vários pedidos deste endereço. Tente mais tarde." / 503 or 502 "Não foi possível enviar agora. Escreva-nos para miguel@scooli.app." Use the inputs and classes from `src/components/ui/input.tsx` like `ContactModal`. Track `marketing_pitch_deck_requested` / `marketing_pitch_deck_failed` with `captureMarketingEvent`.

- [ ] **Step 5: Page.** `PageHero` (eyebrow "Investidores", title PT "Estamos a construir o sistema operativo do ensino.", description "Começámos pela preparação de aulas: a Scooli organiza o ano de cada turma e prepara cada semana com o professor."), then sections: O problema (two short paragraphs), O que existe hoje (link to homepage film + 3 bullets of shipped product), Tração (`StatCard` ×2 from `PUBLIC_IMPACT_METRICS`), Para onde vamos (memória por turma, em construção → link `/roadmap`), A equipa (one paragraph + link `/sobre`), Contacto (two columns: `PitchDeckForm` "Pedir o pitch deck" | `InstitutionalContactButton` labelled "Marcar uma conversa" with investor title/description). PT may say Portugal is the first market; EN must not name countries. `generateMetadata` via `getPageMetadata({ path: "/investidores" })`.

- [ ] **Step 6: Verify.** Without the key: submit → 503 message. `curl -s -X POST localhost:3000/api/pitch-deck -H "content-type: application/json" -d '{"name":"x","email":"bad","locale":"en"}'` → 400; same with `"website":"x"` → 200 `{ok:true}`; 6 valid requests in a row → the 6th returns 429 (the rate limiter runs before the key check, so this works without a key; the first five return 503). Do not send real emails without Miguel's go-ahead. Screenshots of the page. `tsc` + `lint`.

### Task 13: Roadmap page

**Files:**
- Create: `src/app/[locale]/roadmap/page.tsx`
- Modify: `roadmap` namespace in both message files

- [ ] **Step 1: Copy** (`roadmap.columns`: `available`, `building`, `next`, each `{ title, items: { title, description }[] }`). Available: Planos de aula; Fichas de trabalho; Testes e quizzes; Apresentações; Planificações; Adaptação de materiais; Carregar documentos; Calendário das turmas com «Gerar semana»; Biblioteca comunitária; Espaço da escola (painel, lugares, biblioteca interna). Building: Memória por turma (o que já foi dado, o que foi consolidado, o que vem a seguir). Next: Planos que se ajustam ao andamento de cada turma; Um assistente que prepara a semana por iniciativa própria. Hero: eyebrow "Roadmap", title "Para onde vai a Scooli.", description "O que já pode usar, o que estamos a construir e o que vem a seguir. Sem datas: preferimos lançar quando estiver bem feito." Footer line: "Tem uma sugestão? Fale connosco." → `/contacto`. EN market-agnostic.
- [ ] **Step 2: Layout.** Three columns on `lg` (stacked on phones), each with a status pill (`Tag` tones: green / violet / neutral), items as `border-b border-line py-4` rows (title 16px semibold, description 15px subtle). The "Em construção" column gets a subtle highlight (`bg-white border border-line-strong rounded-xl`).
- [ ] **Step 3:** screenshots; `tsc` + `lint`.

### Task 14: Team page narrative

**Files:**
- Modify: `src/components/AboutPage.tsx`, `about` namespace in both message files

- [ ] **Step 1: Copy.**
  - Hero: "Estamos a devolver tempo a quem ensina." + one line.
  - Story chapters (4): "O que víamos" (serões de planificações e fichas); "Porque nós" (Miguel: engenharia de software na Körber e na Infios; Pedro: Porto Editora, a maior editora escolar portuguesa, e Talkdesk; Hugo: Corticeira Amorim, a maior corticeira do mundo; Sílvia: professora do 1.º ciclo, advisor pedagógica); "O que construímos" (o calendário de cada turma, a semana preparada num clique, os recursos); "Para onde vamos" (memória por turma, em construção → link roadmap).
  - Team member bios: role + one line background each, e.g. Pedro "Co-fundador · CTO" / "Antes: Porto Editora e Talkdesk." (confirm Miguel's and Pedro's role titles against the current `about.team.members`; keep "Co-Fundador · Engenheiro de Software & IA" unless the existing copy says CEO/CTO).
  - EN: bios may name the companies and Portugal ("Porto Editora, Portugal's largest school publisher"); the rest stays market-agnostic.
- [ ] **Step 2: Layout.** Hero → story as a vertical timeline (sticky portrait pair stays) → "Porque nós" rendered as a band of 4 cards (portrait, name, role, "Antes: …") → metrics → mission (shortened to 3 points) → CTA with links to `/roadmap` and `/investidores`. Add a `background` field to `about.team.members` and render it.
- [ ] **Step 3:** screenshots; `tsc` + `lint`.

### Task 15: Final verification

- [ ] `npx tsc --noEmit`, `npm run lint`, `npm run build` in `landingpage/` (stop nothing the user runs; build to a separate `distDir` if the dev server is up, as in the web-app verification memory).
- [ ] Screenshot set (desktop 1440 + phone 390, PT + EN): homepage full, pricing, schools, investors, roadmap, about, /confianca, contact dialog (both layouts), /contacto.
- [ ] Re-run the Task 1 grep on the final PT copy.
- [ ] Update `docs/superpowers/specs/2026-10-05-landing-redesign-design.md` "Estado" with this round, and `_screenshots/README.md` with `school-shot.mjs` and the `--smooth` render flag.
- [ ] Report to Miguel: what changed, `RESEND_API_KEY` must be set in Vercel (and `.env.local` to test), and that `miguel@scooli.app` must be a sender allowed on the verified `scooli.app` domain in Resend.
