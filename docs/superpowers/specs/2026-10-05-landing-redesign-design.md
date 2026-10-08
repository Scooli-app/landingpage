# Redesign da landing page Scooli — design

Data: 2026-10-05 · Branch: `feat/landing-redesign` (criada a partir de `origin/main`) · Estado: aprovado no brainstorming; o Miguel pediu implementação direta ("implementa tudo, depois iteramos").

Mockups de referência (não versionados, em `.superpowers/`): `.superpowers/brainstorm/1324-1791219179/content/homepage-v2.html` (homepage aprovada) e `promo-violet-v2.html` (barra B2).

## 1. Objetivo e critérios de sucesso

Redesenhar o site inteiro (14 páginas) com um aspeto **clean, minimalista, profissional e de confiança, que não pareça gerado por IA**, ao nível dos SaaS de topo (Linear, Notion, Stripe, Attio, Vercel).

A mensagem tem de ficar clara nos primeiros segundos, por esta ordem de relevância:
1. A Scooli **poupa tempo na preparação de aulas**.
2. **Acompanha o professor ao longo do ano letivo**.
3. **Cria recursos**: planos de aula, fichas, testes, quizzes, planificações e apresentações (por esta ordem).

Critérios verificáveis:
- Todas as páginas usam só os tokens e componentes da secção 4; nenhuma usa `--scooli-*` antigos, `rounded-[28px]`, gradientes ou sombras grandes.
- `npm run lint`, `npm run type-check` e `npm run build` passam sem erros.
- Screenshots desktop (1440) e mobile (390) de todas as páginas sem sobreposições nem overflow horizontal.
- Copy EN cumpre as regras do `CLAUDE.md` (agnóstica ao mercado, incluindo SEO; nunca inventa funcionalidades).
- Eventos de analytics existentes continuam a disparar (mesmos `eventName` e `cta_id`/`placement` onde a ação existe).

## 2. Decisões do brainstorming

| Tema | Decisão |
|---|---|
| Público da homepage | Dupla, com escolha clara: professores (self-serve) e escolas (demo/piloto) |
| Cor | Monocromático quente; violeta `#6753FF` reservado a **ações** (botões primários, links) e à barra de promo |
| Botão primário | Violeta, texto branco; hover `#4E3BC0` |
| Tipografia | Newsreader (títulos) + Geist (texto/UI) + Geist Mono (metadados) |
| Palavra destacada nos títulos | Itálico **a tinta** (não violeta) |
| Hero | Centrado, dois CTAs, **vídeo demo** numa moldura de janela |
| Estrutura da homepage | 8 secções (ver 6) — padrão dos SaaS de topo; sem preços completos nem FAQ na homepage |
| Promo "Regresso às Aulas" | Barra no topo, variante **B2** (violeta lavado), sem popup |
| Nav | Ferramentas (menu com "Como funciona" + 6 recursos) · Professores · Escolas · Preços |
| Seletor de língua | Mantém o ícone `Languages` (Lucide) e o comportamento atual |
| Slogan do footer | "Menos tempo a preparar, mais tempo a ensinar." / EN "Less time preparing, more time teaching." |
| Modo escuro | Não (só claro) |
| Copy PT | Fala de Portugal (AE, DL 54/2018, DL 55/2018) |
| Copy EN | Agnóstica ao mercado em tudo, SEO incluído; adaptada, não traduzida |

## 3. Arquitetura de informação

Tráfego dos últimos 90 dias (PostHog, visitantes únicos) usado para decidir.

| Página | Decisão |
|---|---|
| `/` | Redesenhar (secção 6) |
| `/professores` | Manter; **absorve `/biblioteca`** (secção "Biblioteca comunitária") |
| `/escolas` | Manter |
| `/recomendar-instituicao` | Manter como página própria |
| `/ferramentas` + `/ferramentas/[slug]` (9) | Manter; template único; ordem do menu/listagens: plano-de-aula, fichas-de-trabalho, gerador-de-testes, quizzes, planificacoes, apresentacoes, depois sequencias-de-aulas, adaptacao-de-materiais, carregar-documentos |
| `/ia-para-professores` | Manter (melhor página SEO) |
| `/precos` | Manter; **recebe o FAQ** |
| `/sobre`, `/contacto`, `/confianca` | Manter |
| `/privacy`, `/terms` | Manter, só layout |
| `/biblioteca` | **Remover**; redirect 301 → `/professores#biblioteca` (EN `/en/library` → `/en/teachers#library`) |
| `www.scooli.app/dashboard` | Redirect → `https://create.scooli.app/dashboard` (21 visitantes/90 dias a procurar a app) |

## 4. Sistema de design

### Tokens (CSS custom properties + `@theme` do Tailwind v4)

| Token | Valor | Uso |
|---|---|---|
| `--ink` | `#111111` | Títulos |
| `--text` | `#2F3437` | Texto corrido |
| `--muted` | `#787774` | Texto secundário |
| `--faint` | `#A3A29E` | Metadados, notas |
| `--line` | `#EAEAEA` | Divisórias em fundo branco |
| `--line-strong` | `#E0DFDA` | Bordas de cartões e divisórias em fundo pedra |
| `--canvas` | `#FFFFFF` | Fundo base |
| `--stone` | `#F0EFEB` | Secções alternadas |
| `--stone-soft` | `#F7F6F3` | Interior de pré-visualizações, hovers |
| `--violet` | `#6753FF` | Botão primário |
| `--violet-ink` | `#4E3BC0` | Links, hover do primário, texto sobre lavado |
| `--violet-wash` | `#F3F2FF` | Barra de promo, etiquetas |
| Pastéis | verde `#EDF3EC/#346538`, azul `#E1F3FE/#1F6C9F`, amarelo `#FBF3DB/#956400`, vermelho `#FDEBEC/#9F2F2D` | Só em etiquetas (tipos de documento, DL) |

Regras: nada de secções inteiras a violeta, gradientes, glassmorphism (exceto o blur discreto da nav) nem sombras para além de `0 1px 2px rgba(0,0,0,.03)` e da sombra única das molduras de janela.

### Tipografia
- Títulos: Newsreader 500, `letter-spacing` −0.025 a −0.035em, `line-height` 1.02–1.1. Hero `clamp(44px, 6.2vw, 78px)`; h2 `clamp(34px, 4vw, 50px)`.
- Texto: Geist 400/500/600, corpo 17px/1.6; secundário 14–15.5px.
- Metadados/kickers: Geist Mono 12px, maiúsculas, `letter-spacing` .06em.
- Carregadas com `next/font/google` (`Newsreader` com itálico, `Geist`, `Geist_Mono`); saem Fraunces e Manrope.

### Forma, espaço e movimento
- Raios: botões 6px, cartões/molduras 12px, pills só em etiquetas.
- Contentor 1200px com 24px de margem; títulos de secção até 720px; secções com 128px de padding vertical (88px em mobile).
- Movimento: fade + `translateY(12px)` ao entrar no ecrã, 600ms `cubic-bezier(0.16,1,0.3,1)`, com `IntersectionObserver`; desligado com `prefers-reduced-motion`. **Saem GSAP e Lenis** (smooth scroll).
- Ícones: Lucide, traço 1.5, monocromáticos; usados com parcimónia (nunca um ícone decorativo em cada cartão).
- Imagens: só screenshots/vídeo reais da app em moldura de janela (barra com 3 pontos cinzentos).

### Componentes base
`Button` (variantes `primary`, `secondary`, `link`; tamanhos `sm`, `md`), `Kicker`, `SectionHeader` (kicker + h2 + descrição; alinhado à esquerda ou centrado), `Section` (fundo `canvas` ou `stone`), `WindowFrame`, `Card`, `Tag` (pastéis), `Reveal` (wrapper de animação), `DividerGrid` (colunas separadas por linhas, usado em "ao longo do ano", "porquê", "confiança"), FAQ sem caixas (linhas + "+").

### Checklist anti-"gerado por IA"
- Sem gradientes, glows, blobs, emojis, ícones-em-círculo em todos os cartões, badges com ✨.
- Sem frases-cliché ("eleve", "revolucione", "desbloqueie", "sem esforço", "seamless").
- Só números, testemunhos e funcionalidades verificáveis; tudo o que não está confirmado fica fora ou marcado no código como `TODO(content)`.
- Hierarquia por tipografia e espaço, não por cor.

## 5. Moldura global

- **Barra de promo (B2):** fundo `--violet-wash`, texto `--violet-ink`, borda inferior `#E2DFFF`. Mantém a lógica atual (`isPromoActive`, dismiss em `localStorage`, eventos `marketing_promo_banner_*`, os dois links de checkout mensal/anual com `marketing_plan_selected`). Os CTAs passam a links sublinhados. **`PromoModal` deixa de ser usado** (componente e mensagens removidos).
- **Nav:** fixa, fundo branco a 88% com blur, borda inferior de 1px. Logo · **Ferramentas ▾** · Professores · Escolas · Preços · (espaço) · seletor de língua · Entrar · **Começar grátis**. Menu Ferramentas (Radix `DropdownMenu`/`NavigationMenu`, acessível por teclado): à esquerda o bloco "Como funciona" (link para `/#como-funciona`), à direita os 6 recursos com uma linha de descrição, e "Todas as ferramentas". Mobile: botão menu → painel de ecrã inteiro com os links, a lista de ferramentas e os dois CTAs (Começar grátis, Pedir demonstração).
- **Footer:** logo + slogan; colunas Produto (Como funciona, Professores, Escolas, Preços), Ferramentas (6 recursos), Empresa (Sobre, Confiança, Contacto, Recomendar a Scooli), Recursos (IA para professores, Todas as ferramentas, Privacidade, Termos). Linha final: © ano, seletor de língua, redes sociais (Instagram, Facebook — os links existentes), email de contacto.

## 6. Homepage

Ordem: promo · nav · 8 secções · footer.

| # | Secção | Fundo | Conteúdo |
|---|---|---|---|
| 1 | Hero | canvas | H1, subtítulo, CTAs, nota, vídeo demo em moldura |
| 2 | Prova | canvas, linhas em cima/baixo | 500+ professores · 900+ documentos · 6 tipos de recurso |
| 3 | Como funciona (`#como-funciona`) | canvas | 3 passos clicáveis (tabs) + imagem do passo ativo |
| 4 | Ao longo do ano | stone | 3 colunas (planificação → calendário → planos da semana) + screenshot do calendário |
| 5 | Recursos | canvas | Grelha 3×2 com os 6 recursos (link para a página da ferramenta) + faixa "porquê" com 3 diferenciais |
| 6 | Professores \| Escolas | stone | Dois painéis + linha "Recomende-nos" |
| 7 | Confiança | canvas | 4 colunas + link `/confianca` |
| 8 | CTA final | canvas, linha em cima | H2 + 2 CTAs |

### Copy PT
1. **H1:** "Prepare as aulas da semana *em minutos*." · **Sub:** "A Scooli acompanha-o **ao longo de todo o ano letivo** e cria planos de aula, fichas, testes, quizzes, planificações e apresentações alinhados com as Aprendizagens Essenciais." · CTAs "Começar grátis" / "Pedir demonstração" · Nota "Grátis para começar, sem cartão."
2. "{activeTeachers}+ professores na Scooli" · "{generatedDocuments}+ documentos criados" · "“Poupei várias horas por semana na preparação das aulas.” — Professora do 2.º ciclo"
3. Kicker "Como funciona" · H2 "Do tema ao documento, em três passos." · "O tempo que gastava a começar do zero passa a ser tempo para rever e ajustar à sua turma." · Passos: "Diga o que vai ensinar" (Ano, disciplina, tema e tipo de recurso. Se quiser, junte as suas próprias fontes.) · "Receba o recurso completo" (Estruturado por secções e com as Aprendizagens Essenciais do ano e da disciplina.) · "Reveja, ajuste e exporte" (Edite no editor ou peça alterações à IA. Exporte quando estiver pronto.)
4. Kicker "Ao longo do ano" · H2 "Acompanha-o do primeiro ao último dia de aulas." · "A Scooli não serve só para um documento de cada vez. Organiza o ano e prepara cada semana a partir do que já planeou." · "Setembro — Planificação anual: Crie a planificação do ano ou importe a que já tem." · "Cada semana — Calendário de aulas: As aulas ficam distribuídas no calendário, por disciplina." · "Cada aula — Planos de aula da semana: Gere os planos de aula da semana de uma vez e ajuste o que precisar."
5. Kicker "Recursos" · H2 "Os recursos da sua semana, prontos a editar." · "Seis tipos de recurso, todos estruturados e alinhados com o currículo." · Planos de aula (Objetivos, atividades, recursos e avaliação para a aula de amanhã.) · Fichas de trabalho (Exercícios sobre o tema da aula, prontos a imprimir.) · Testes (Grupos de perguntas e cotações, prontos a aplicar.) · Quizzes (Perguntas rápidas para rever a matéria em aula.) · Planificações (Anual, semestral ou de unidade, com as AE e a calendarização.) · Apresentações (Slides a partir do tema, para projetar e editar.) · Faixa "Feita para a escola portuguesa.": AE · DL 55/2018 "Alinhada com o currículo" · DL 54/2018 "Adaptada a cada aluno" · Editor "IA dentro do documento".
6. H2 "Para quem prepara as aulas. E para quem lidera a escola." · Professores: "Recupere as horas da preparação." / "Comece grátis e use a Scooli nas suas aulas reais antes de decidir." / "Grátis com créditos todos os meses · Pro a {proMonthly}/mês" / 3 pontos / CTA + "Ver preços". Escolas: "Uma base comum para toda a escola." / "Começamos com um piloto acompanhado, com um grupo de docentes, e avaliamos juntos antes de alargar." / "Piloto com a equipa Scooli · Plano à medida da instituição" / 3 pontos / "Pedir demonstração" + "Como trabalhamos com escolas". Linha: "É professor e gostava de ver a Scooli na sua escola? Recomende-nos à direção →"
7. H2 "A decisão final é sempre do professor." · "A Scooli prepara a base. O professor revê, ajusta e decide o que entra na aula." · Tudo é editável · Os seus dados não treinam IA · RGPD · Honestos sobre a IA · "Como tratamos privacidade e IA →"
8. H2 "A próxima aula pode começar com uma base pronta." · "Crie o primeiro plano de aula, ficha ou teste em minutos."

### Copy EN (adaptada, agnóstica ao mercado)
1. **H1:** "Plan the week's lessons *in minutes*." · **Sub:** "Scooli stays with you **through the whole school year** and creates lesson plans, worksheets, tests, quizzes, yearly plans and slide decks you can review, edit and export." · "Start free" / "Book a demo" · "Free to start, no card required."
2. "{n}+ teachers on Scooli" · "{n}+ documents created" · quote translated, attributed to "Teacher, primary school".
3. "From topic to finished resource in three steps." · "The time you spent starting from scratch becomes time to review and adapt for your class." · "Tell Scooli what you're teaching" (Grade, subject, topic and resource type. Add your own sources if you like.) · "Get a complete resource" (Organised into clear sections, ready to review.) · "Review, adjust and export" (Edit it yourself or ask the AI for changes. Export when it's ready.)
4. "With you from the first day of school to the last." · "Scooli isn't just for one document at a time. It organises the year and prepares each week from what you've already planned." · Start of the year / Yearly plan · Every week / Lesson calendar · Every lesson / This week's lesson plans.
5. "This week's resources, ready to edit." · "Six types of resource, all structured and editable." · Faixa "Built for how teachers actually work.": "Documents, not chat" · "Adapted for every learner" · "AI inside the document".
6. "For the people who plan the lessons. And the people who lead the school." · Teachers: "Win back your planning hours." · Schools: "One shared foundation for the whole school."
7. "The teacher always has the final say." · Everything is editable · Your data doesn't train AI · GDPR · Honest about AI.
8. "Your next lesson can start from a ready-made base." · "Create your first lesson plan, worksheet or test in minutes."

## 7. Templates das restantes páginas

Todas usam a mesma moldura e um destes templates, construídos sobre os componentes base:

- **Página de público** (`/professores`, `/escolas`): hero alinhado à esquerda (kicker, H1, descrição, 2 CTAs) com imagem real à direita · secções alternadas canvas/stone com `SectionHeader` + `DividerGrid`/cartões · CTA final. `/professores` segue a mesma ordem de mensagem (tempo → ano → recursos) e inclui a secção `#biblioteca` (conteúdo atual de `/biblioteca`). `/escolas` mantém "como trabalhamos", "o que costuma travar" e a recomendação.
- **Página de ferramenta** (`/ferramentas/[slug]`) e índice `/ferramentas`: hero com pré-visualização do recurso, secções de "o que inclui", "como funciona", FAQ, links para ferramentas relacionadas. O índice é uma grelha de cartões (mesmo componente dos recursos da homepage).
- **Guia SEO** (`/ia-para-professores`): layout de artigo (coluna de texto até 720px, índice lateral em desktop), mantendo todo o structured data (FAQ, HowTo, WebPage, Breadcrumb).
- **Página simples** (`/sobre`, `/contacto`, `/confianca`, `/recomendar-instituicao`, `/precos`): hero compacto + conteúdo em colunas/linhas; formulários com inputs de 6px de raio, bordas `--line-strong`, foco com anel violeta. `/precos` termina com o FAQ (sem caixas).
- **Legal** (`/privacy`, `/terms`): coluna de leitura até 720px, tipografia de artigo.
- **404**: H1 + link para a homepage + links principais.

Copy das restantes páginas: PT mantém o conteúdo atual, revisto para tirar clichés e encurtar onde o novo layout pede; EN reescrita para cumprir o `CLAUDE.md` (sem Portugal/AE/DL, incluindo meta tags e structured data).

## 8. i18n e SEO

- Mensagens continuam em `messages/{pt-PT,en}.json`; namespaces da homepage são substituídos (`home.*`), `promoModal` e `library` removidos (conteúdo de `library` passa para `teachers.library`).
- `/biblioteca` sai de `pathnames`, do sitemap, da nav e do footer; redirects em `next.config.ts` (`redirects()`): `/biblioteca` → `/professores#biblioteca`, `/en/library` → `/en/teachers#library`, `/dashboard` → `https://create.scooli.app/dashboard` (todos permanentes).
- `layout.tsx`: meta `geo.region`/`geo.placename` só em pt-PT; `themeColor` passa a `#FFFFFF`.
- `getGlobalSchemas`/`getSoftwareApplicationSchema`/`getServiceSchema` passam a receber o locale; em EN, descrições agnósticas ao mercado e sem `countriesSupported`/`areaServed: PT`. Os dados factuais da organização (morada) mantêm-se.
- `BRAND_KEYWORDS` dividido por locale (EN sem "Portugal").
- `PUBLIC_IMPACT_METRICS`: remove `weeklyHoursSaved` da UI (sem fonte); números continuam a vir daqui (um sítio para atualizar).

## 9. Arquitetura técnica

- **Tokens:** `globals.css` define as variáveis da secção 4 e um bloco `@theme` (cores `ink`, `text`, `muted`, `faint`, `line`, `line-strong`, `stone`, `stone-soft`, `violet`, `violet-ink`, `violet-wash`; fontes `display`, `sans`, `mono`). As variáveis `--scooli-*` antigas são removidas no fim (fase 5), depois de migrar todos os usos.
- **Componentes novos** em `src/components/site/`: `primitives.tsx` (Kicker, SectionHeader, Section, WindowFrame, Card, Tag, DividerGrid), `Reveal.tsx`. `ui/button.tsx` ganha as variantes novas. `marketing/shared.tsx` (PageHero, PageCtaBanner, InfoCard, StatCard, SurfacePanel, Checklist) é reescrito sobre estes primitivos, o que migra as páginas interiores de uma vez.
- **Homepage:** `src/components/homepage/` passa a ter um ficheiro por secção nova (`HeroSection`, `ProofSection`, `HowItWorksSection`, `YearSection`, `ResourcesSection`, `AudiencesSection`, `TrustSection`, `FinalCtaSection`) e os antigos são apagados.
- **Removidos:** `SmoothScrollProvider`, `useScrollReveal` (GSAP), `PromoModal`, `HeroVideo` antigo se não reaproveitável, secções antigas da homepage, `biblioteca/page.tsx`; dependências `gsap` e `lenis` (e `framer-motion` se deixar de ter usos).
- **Analytics:** mantêm-se `marketing_cta_clicked`, `marketing_navigation_clicked`, `marketing_plan_selected`, `marketing_promo_banner_*`, scroll depth; `cta_id` novos seguem o padrão `home_<secção>_<ação>`.
- **Vídeo:** `<video autoplay muted loop playsinline preload="metadata" poster>` com `public/videos/demo.mp4` + poster `public/videos/demo-poster.jpg`; até existir a demo nova usa-se `test-creation.mp4`.

## 10. Conteúdos que dependem do Miguel

Marcados no código com `TODO(content)`:
1. **Vídeo demo novo** (30–45 s, app atual, sem badge de dev): tema → recurso → editar → calendário.
2. **Screenshots novas e limpas** da app (dashboard, editor de planificação, calendário, biblioteca, 6 recursos), 2× resolução, sem o badge "N" do Next.
3. **Números** de professores e documentos confirmados.
4. **2–3 testemunhos** com nome e escola (idealmente foto).

## 11. Verificação

Por fase: `npm run lint`, `npm run type-check`; no fim `npm run build`. Verificação visual com o servidor `landingpage` (porta 3005, `.claude/launch.json`) em 1440 e 390 de largura, PT e EN, para todas as páginas; navegação por teclado no menu Ferramentas e no menu mobile; consola sem erros.

## Estado (2026-10-05)

Implementado: fases 1–5. `npm run lint`, `npm run type-check` e `npm run build` passam; as 24 rotas principais (PT e EN) respondem 200, sem overflow horizontal a 390px e 1440px.

Decisões tomadas durante a implementação:
- Números confirmados pelo Miguel: **500+ professores, 900+ documentos** (`PUBLIC_IMPACT_METRICS` só tem estes dois).
- **Não há testemunhos publicados**: saíram as citações da homepage, de `/precos` e de `/ia-para-professores`, e o markup `AggregateRating`/`Review` do schema Product. A faixa de prova mostra 500+ · 900+ · 6 tipos de recurso.
- Copy EN agnóstica ao mercado em mensagens, conteúdo das ferramentas, structured data (descrições por locale, sem `areaServed`/`countriesSupported` em EN), keywords e imagem de partilha. Mantêm-se só referências factuais: o nome da língua, o aviso de que os documentos legais estão em português e o texto legal em PT.
- `llms.txt` continua a descrever factualmente o alinhamento com o currículo português (não é copy de marketing EN).

Pendente (conteúdo, do lado do Miguel): testemunhos reais com autorização, se vierem a existir.

## Estado (2026-10-06): visuais reais da app

Todos os visuais vêm da app real (build local, conta de testes), em PT para o site PT e em EN para o site EN; o registo está em `src/lib/app-media.ts` e os ficheiros em `public/app/{pt,en}/`. As imagens antigas de `public/screenshots/` e `public/videos/` saíram.
- **Hero:** filme cinematográfico (HyperFrames, `videos/scooli-hero-film`, 23 s, sem som, em loop): o ano → uma semana → "Gerar semana" → o plano de uma aula → os materiais → as semanas seguintes → slogan. Todas as superfícies são capturas reais. AV1 + H.264 a 1600×800; no telemóvel fica a gravação vertical. Título: "O ano letivo inteiro, preparado *semana a semana*." Toca mesmo com "reduzir movimento", com botão de pausa.
- **Como funciona:** três clips (um por passo, fluxo de um documento), lista de passos ao lado de um player grande; cada clip passa ao seguinte quando acaba; cortes verticais no telemóvel.
- **Faixa escura "Porque não basta um chat":** resposta de um chat de IA (desenhada, sem marca) ao lado de um documento real da Scooli; responde à objeção ChatGPT.
- **Ao longo do ano:** vista mensal do calendário (segunda a quinta no telemóvel).
- **Faixa de números:** só 500+ professores e 900+ documentos (saiu "6 tipos de recurso"); logótipos e citações entram quando houver, com autorização.
- **Para quem é:** cada cartão com o que esse público vê na app (painel do professor; biblioteca partilhada).
- **Confiança:** factos que a política de privacidade e /confianca já afirmam (sem treino de IA com dados, RGPD, SSL/TLS, acesso restrito) e "Pedir documentação" para direções/EPD.
- **CTA final:** a caixa "O que vai ensinar?" da app; leva ao registo e depois ao formulário de plano de aula com o tema preenchido (`appSignUpWithTopicUrl`).
- **Recursos** (homepage, `/ferramentas`, páginas de ferramenta): recortes em formato página de documentos reais gerados; apresentações com dois slides sobrepostos.
- **`/professores`:** clip da geração no hero; biblioteca comunitária com recursos de demonstração (professores fictícios com nomes portugueses, contagens de reutilização modestas, sem número total de recursos).

Edições feitas só para as capturas (a app não foi alterada): gerúndios PT-BR → PT-PT no texto gerado, um chip de exemplo EN que referia os Descobrimentos, as etiquetas PT da biblioteca EN, uma pergunta discutível no teste EN, e as linhas "in Portugal"/"Aprendizagens Essenciais" no cabeçalho da biblioteca EN.

Os scripts de captura estão em `C:\PROJECTS\Scooli\_screenshots\` (fora do repo): ver o `README.md` dessa pasta.

## 12. Fases de implementação

1. **Fundação:** fontes, tokens, `@theme`, primitivos, `Button`, `Reveal`; remover Lenis/GSAP/PromoModal do layout.
2. **Moldura:** `PromoBanner` (B2), `MarketingNav` (menu Ferramentas, mobile), `Footer`, `LanguageSwitcher` restyle.
3. **Homepage:** 8 secções + mensagens PT/EN + vídeo; apagar secções antigas.
4. **Páginas interiores:** reescrever `marketing/shared.tsx`; adaptar professores (+biblioteca), escolas, ferramentas (índice + template), ia-para-professores, preços (+FAQ), sobre, contacto, confiança, recomendar-instituição, legal, 404; copy EN agnóstica.
5. **SEO e limpeza:** redirects, sitemap, schemas por locale, meta geo, keywords; remover `--scooli-*`, componentes e dependências mortas; build final e screenshots.
