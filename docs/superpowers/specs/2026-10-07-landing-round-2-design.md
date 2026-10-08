# Landing redesign, round 2 — design

Date: 2026-10-07 · Branch: `feat/landing-redesign` (no new branches, no commits by the agent)
Follows: `2026-10-05-landing-redesign-design.md`

## Intent

Miguel reviewed the redesigned landing ("no geral está tudo muito bem") and asked for a second round:
tighter Portuguese, smoother product films, a stronger argument against generic chat AI, a lighter
resources grid, trust as a real selling point, a pricing and schools story that sells the
institutional plan, a calendar booking option wherever people ask to talk to us, and three company
pages (investors, roadmap, a stronger team page).

Success = every item below shipped in PT and EN, `tsc`, `eslint` and `next build` clean, and each
changed section checked visually (desktop + phone) with screenshots.

## Rules that apply throughout

- PT copy is 100% European Portuguese (pt-PT, AO90). EN copy is market-agnostic (no Portugal,
  Portuguese curricula or legislation, including SEO metadata) and is adapted, not translated.
- No invented numbers or testimonials. Public numbers: 500+ teachers, 900+ documents.
- Only claim what exists. Institutional features that exist today in the web app (`/school`):
  school workspace with seats and invitations, admin dashboard (active seats, active teachers,
  AI requests, documents, shared resources), per-teacher activity, internal school library
  (internal shares), usage page. Class State / "operating system for teaching" is described only
  as *in development*.
- Never use the phrase "para quem usa todas as semanas" (or any wording that limits the paid plan
  to heavy users) anywhere on the site.

## 1. European Portuguese sweep

Scope: `messages/pt-PT.json`, `src/components/marketing/content/pt-PT.ts`, PT strings in
`src/lib/seo.ts`, `src/app/llms.txt`, OG text, and any hard-coded PT strings in components.
Look for (non-exhaustive, judge in context): você/vocês, equipe, usuário, arquivo, tela, registro,
contato, planejamento, cadastro, baixar (download), celular, time (team), ônibus-style accents,
gerunds where pt-PT uses "a + infinitivo" ("estamos trabalhando" → "estamos a trabalhar"),
"fazer o upload", "na hora de", "legal" (cool), "a gente", clitic placement typical of PT-BR
("me envie" → "envie-me"), "seu/sua" used as "you" where pt-PT prefers the formal third person
consistently. Keep the site's register: formal "o professor / a sua", no "tu".

## 2. Homepage

### 2.1 Hero
Remove the note under the CTAs (`home.hero.note`: "Grátis para começar, sem cartão." / EN
equivalent). Nothing else changes.

### 2.2 How it works — smooth playback
Causes of the stutter: (a) one `<video>` keyed by `src` is destroyed and recreated at every step,
so the next clip starts loading only when its turn comes and the poster flashes; (b) the source
screencast has uneven frame timing, most visible in the sped-up segments.

Fix:
- `HowItWorksSteps` renders the three clips stacked in the same frame, all `preload="auto"` once
  the section nears the viewport; only the active one plays; switching crossfades opacity
  (~400 ms) and resets the incoming clip to 0. Phone/desktop cut choice unchanged.
- Re-encode `step-{1,2,3}{,-mobile}.mp4` (PT + EN) from the existing recordings with constant
  frame pacing: decimate duplicate frames, then resample to a steady 30 fps (frame blending in
  sped-up segments). Same crops and durations as today (`_screenshots/README.md`).

### 2.3 Chat comparison
- Kicker/title: PT kicker "Porquê a Scooli", title "O que a Scooli faz diferente." EN kicker
  "Why Scooli", title "What Scooli does differently."
- Chat side ("Num chat de IA"): points about the teacher's lost time and friction, e.g.
  explaining the class and level again in every conversation; copy, paste and reformat in Word,
  one document at a time; check by hand that it matches the curriculum (PT: Aprendizagens
  Essenciais; EN: "your curriculum"); next week starts from zero — the chat doesn't remember what
  each class already did.
- Scooli side: 4 differentiators, each with an icon, a short bold line and one supporting line,
  set larger than the chat side so they carry the visual weight. Keep the lesson-plan crop.

### 2.4 Resources
- Replace the document screenshots with one icon per resource (lucide, consistent stroke, in a
  soft tile) plus title and a one-line description. Cards become shorter; the grid stays 3×2.
- Title PT: "Os recursos da semana, prontos a usar." with a supporting line saying they adapt to
  each class. EN: "This week's resources, ready to use."
- `ResourcePreview` is still used on /ferramentas; it stays there unchanged.

### 2.5 Trust — more weight, moved up
- New homepage order: Hero → Proof → How it works → Year → Resources → Chat comparison → **Trust**
  → Audiences → Final CTA. Product first, then the two objections (vs ChatGPT, then data/safety)
  back to back, then who it is for.
- Trust becomes its own band (stone background) with:
  - the common "GDPR" seal used by large SaaS companies (blue disc, ring of 12 yellow EU stars,
    "GDPR" in the centre), drawn as an inline SVG, captioned "Em conformidade com o RGPD" /
    "GDPR compliant" (Miguel, 2026-10-07: "Adiciona o selo comum que está nas várias empresas
    grandes");
  - the four guarantees (editable output, your data doesn't train AI, GDPR + encryption,
    honest about AI) as larger items with icons;
  - a "policy" row: links to Privacy Policy, Terms, /confianca, and the "Pedir documentação"
    button (opens the contact dialog).
- The same seal is shown on /confianca's hero.

## 3. Booking calendar in the contact dialog

- Google Calendar appointment schedule (from `https://calendar.app.google/iqyCb3azHXdKa2j88`),
  embedded as `https://calendar.google.com/calendar/appointments/schedules/AcZssZ0r8xxB0JHTg6DyEvN9hunryCYwHj-KrdaPQFJFNYg_jFm_ntsMXR2CoEJVNYNCSZICTBbSXbqQ?gv=true`
  in an iframe (`loading="lazy"`, titled), URL kept in one constant.
- `ContactModal` becomes wide on desktop (two columns: booking calendar left, "Prefere
  escrever?" form right). On phones a two-option segmented control switches between "Marcar
  reunião" and "Enviar mensagem" (booking first). An "Abrir numa nova janela" link under the
  iframe is the fallback if the embed fails.
- Used by every `InstitutionalContactButton` (book demo, talk to the team, request docs), the
  enterprise plan card, and the /contacto page (calendar beside the existing form).
- Analytics: fire `marketing_cta_clicked` with `cta_id: "booking_open_new_tab"` on the fallback
  link; the iframe itself can't be tracked.

## 4. Pricing page

- Hero PT: title "Preços simples, do professor à escola inteira." description "Comece grátis.
  Passe a Pro quando quiser. Para a escola, um plano institucional." EN: "Simple pricing, from one
  teacher to the whole school." / "Start free. Go Pro whenever you like. For schools, an
  institutional plan."
- Pro plan descriptions (monthly and annual) rewritten without usage-frequency framing (e.g.
  monthly: "Tudo o que a Scooli faz, sem limites de criação."; annual: "O mesmo plano Pro, pago
  uma vez por ano, com {savings} de desconto." using the percentage the toggle already computes).
- Free plan description: no "antes de avançar" gatekeeping tone.
- Enterprise card: features reworded around value (school dashboard, central seats and invites,
  internal library, onboarding and training, privacy documentation, one invoice).
- New section after the plans: "Porquê o plano institucional" — a two-column comparison
  "Várias licenças Pro" vs "Plano institucional", rows only for real differences: who manages
  accounts (each teacher vs central seats and invitations), visibility (none vs dashboard with
  per-teacher activity), sharing (public community library vs internal school library), billing
  (one subscription per teacher vs one invoice for the school), onboarding (self-serve vs
  implementation and training), privacy (public policy vs documentation and answers for the
  DPO), trial (free plan vs pilot with a small team). CTA: "Falar com a equipa" (booking dialog).

## 5. Schools page

Rebuilt around the value of the institutional plan:
1. Hero: "A Scooli para a escola inteira." + description; CTA book a demo (booking dialog);
   aside: a real capture of the `/school` admin dashboard (local DB, fictional school, teachers
   with Portuguese names, plausible activity), PT and EN captures.
2. "O que a escola ganha" — 6 benefits with icons (central management, visibility of use,
   internal library, consistent preparation across a department, onboarding and training,
   privacy documentation for the DPO).
3. Pilot path (existing three steps, kept).
4. Common questions / blockers (existing list, reworded as Q&A where useful).
5. Recommend-your-school callout (kept) and final CTA banner.

## 6. New pages

Routes: `/investidores` (EN `/investors`), `/roadmap` (EN `/roadmap`). Both added to
`pathnames`, sitemap, footer "Empresa" column, metadata via `getPageMetadata`.

### 6.1 Investors
No fundraising language (no round or amount). Investors can request the pitch deck: see 6.4. Sections: hero (the vision: an
operating system for everyday teaching, starting with preparation); the problem (teachers lose
evenings to repetitive preparation; generic chat AI doesn't know the class or the curriculum);
what exists today (the product, linked to the homepage film); traction (500+ teachers, 900+
documents only); where it goes (Class State, in development, linking to /roadmap); why this team
(short, links to /sobre); contact for investors (booking dialog + email). PT may say Portugal is
the first market; EN stays market-agnostic per the copy rules (no country claims).

### 6.2 Roadmap
Three columns — "Disponível", "Em construção", "A seguir" — no dates.
- Available: lesson plans, worksheets, tests, quizzes, presentations, planificações, adapting
  materials, uploading documents, the class calendar with "Gerar semana", community library,
  school workspace.
- In development: per-class memory (what was taught, what's mastered, what's next).
- Next: plans that adapt to how each class is going; an assistant that prepares the week
  proactively. Wording kept modest; nothing presented as available.
Footer note: suggestions welcome (contact).

### 6.3 Team page (/sobre) — stronger narrative
Structure as a story: (1) what we saw — teachers' evenings lost to preparation; (2) why us —
three founders' background: Miguel (Körber, Infios), Pedro (Porto Editora, Talkdesk), Hugo
(Corticeira Amorim, the world's largest cork company); Sílvia, a 1.º ciclo teacher, as
pedagogical advisor; (3) what we built; (4) where we're going (link to /roadmap); (5) the people
(portraits with one-line backgrounds); (6) metrics and CTA. Exception to the EN copy rule,
approved by Miguel (2026-10-07): the EN team bios may name the companies and Portugal (e.g.
"Porto Editora, Portugal's largest school publisher"). The rest of the EN page stays
market-agnostic.

### 6.4 Pitch deck request (investors page)
- A small form (name, email, fund/company, optional note, honeypot field) on /investidores.
- `POST /api/pitch-deck` (Node runtime) validates with zod, rate-limits per IP (in-memory, best
  effort) and sends one email through the Resend REST API (`fetch`, no SDK): from Miguel's
  address on scooli.app, reply-to Miguel, to the requester, Miguel in BCC (so he knows who asked),
  the deck PDF attached.
- Email: plain text only (no HTML, no images, no tracking) — a short personal note signed by
  Miguel, in the page's language.
- Attachment: `Scooli Pitch Deck EN.pdf` (Desktop/Scooli/Pitch Deck, 2026-10-01) for both locales, copied as `private/scooli-pitch-deck.pdf`.
- The PDF is not in `public/` (no public URL): it lives in `landingpage/private/` and is read at
  request time; `outputFileTracingIncludes` ships it with the route.
- Env: `RESEND_API_KEY` (and optional `PITCH_DECK_FROM`), set by Miguel in Vercel and
  `.env.local`. Without the key the route returns 503 and the form shows a fallback "write to us"
  message.
- Analytics: `marketing_pitch_deck_requested` on success.

## 7. Footer

"Empresa" column: Sobre, Investidores, Roadmap, Confiança, Contacto, Recomendar a Scooli.

## Verification

- `npx tsc --noEmit`, `npm run lint`, `npm run build` in `landingpage/`.
- Screenshots (Playwright/in-app browser), desktop 1440 and phone 390, PT and EN, of: homepage
  (how it works switching, comparison, resources, trust), pricing, schools, investors, roadmap,
  about, contact dialog (both layouts).
- Check the how-it-works switch frame by frame for flashes; check the iframe loads.

## Out of scope

Hero film changes; app (web-app) changes; new captures other than the school dashboard; any
fundraising content.

## Estado (2026-10-07)

Implemented in full. tsc + eslint clean (2 pre-existing warnings), `next build` passes (54 pages). Checked in the browser at 1440 and 375, PT and EN.
Deviations: the pitch-deck route sends Miguel a separate plain notification (name, email, fund, note) instead of a BCC copy; the EN school-dashboard capture relabels the PT UI with the app's own English strings because the app's EN UI stalls on /school locally. Pending outside the code: `RESEND_API_KEY` in Vercel and `.env.local`.
