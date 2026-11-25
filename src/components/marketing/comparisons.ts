import type { Locale } from "@/i18n/routing";
import type { ToolFaq } from "./data";

/**
 * "Scooli vs X" comparison pages, in European and Brazilian Portuguese and English. Comparison
 * content is the best-evidenced AEO/GEO format (about a third of AI-answer
 * citations), so each page has the same shape: an upfront verdict, a table, the
 * reasons to pick Scooli, a FAQ and the sources.
 *
 * Rules for this file:
 * - Every statement about a competitor must be backed by an entry in `sources`
 *   (their own documentation or independent reviews). Where we could not find
 *   something in their public pages we say so ("not documented in the pages we
 *   reviewed"), never that it does not exist.
 * - The pages argue for Scooli: the competitor column states plainly what they
 *   do, the Scooli column what Scooli does for the same job. No section is
 *   given to the competitor's strengths.
 * - English is market-agnostic (see CLAUDE.md): no Portugal, no Portuguese
 *   curriculum or legislation, and no claim that Scooli supports another
 *   country's curriculum. English pages lean on what is true anywhere: the
 *   teacher's own yearly plan, each class's calendar, the week prepared in one click.
 */

export type ComparisonRow = {
  aspect: string;
  scooli: string;
  competitor: string;
};

export type ComparisonSource = {
  label: string;
  url: string;
};

export type ComparisonPageContent = {
  slug: string;
  /** The competitor's own name, used in headings and schema. */
  competitorName: string;
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  title: string;
  description: string;
  /** The upfront, quotable answer: who should choose what, before the table. */
  verdict: string;
  tableTitle: string;
  tableDescription: string;
  rows: ComparisonRow[];
  reasonsTitle: string;
  reasons: { title: string; description: string }[];
  faq: ToolFaq[];
  ctaTitle: string;
  ctaDescription: string;
  sources: ComparisonSource[];
};

export const comparisonSlugs = [
  "canva-para-educacao",
  "magicschool-ai",
  "teachy",
  "chatgpt-gemini-perplexity",
] as const;
export type ComparisonSlug = (typeof comparisonSlugs)[number];

const sources = {
  canva: [
    { label: "Canva for Education — eligibility and pricing", url: "https://www.canva.com/education/teachers/" },
    { label: "Canva Help — Learn Grid, curriculum coverage", url: "https://www.canva.com/en_gb/help/using-learn-grid/" },
    { label: "Canva — AI Lesson Plan Generator", url: "https://www.canva.com/features/ai-lesson-plan-generator/" },
    { label: "Canva Newsroom — 100 million milestone", url: "https://www.canva.com/newsroom/news/100-million-education-milestone/" },
    { label: "Chalkie.ai — comparison of AI lesson planning tools", url: "https://chalkie.ai/en/blog/compare-ai-lesson-planning-tools" },
  ],
  magicschool: [
    { label: "MagicSchool AI — pricing", url: "https://www.magicschool.ai/pricing" },
    { label: "MagicSchool AI — standards-aligned curriculum", url: "https://www.magicschool.ai/blog-posts/standards-aligned-curriculum" },
    { label: "MagicSchool AI — FAQ (supported languages)", url: "https://www.magicschool.ai/faq" },
    { label: "EdTech Institute — MagicSchool AI review (2026)", url: "https://edtechinstitute.com/2026/01/31/magicschool-ai-review-is-it-worth-it/" },
  ],
  // Teachy's Help Center (helpcenter.teachy.ai) went offline in 2026; these are its live product pages.
  teachy: [
    { label: "Teachy — for schools", url: "https://teachy.ai/en/schools" },
    { label: "Teachy — Lesson plan generator (BNCC alignment)", url: "https://www.teachy.com.br/pt-BR/ferramentas/gerador-plano-aula" },
    { label: "Teachy — School calendar planner", url: "https://www.teachy.com.br/pt-BR/ferramentas/planejamento-calendario-escolar" },
    { label: "Revista Educação — Teachy profile (2024)", url: "https://revistaeducacao.com.br/2024/06/21/plataforma-teachy/" },
  ],
  chat: [
    { label: "CITE Journal — UMass Amherst study of AI-generated lesson plans", url: "https://citejournal.org/volume-25/issue-3-25/social-studies/civic-education-in-the-age-of-ai-should-we-trust-ai-generated-lesson-plans" },
    { label: "EdWeek — Why AI May Not Be Ready to Write Your Lesson Plans", url: "https://www.edweek.org/technology/why-ai-may-not-be-ready-to-write-your-lesson-plans/2025/06" },
    { label: "PLOS ONE — ChatGPT hallucination in a science lesson plan", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11182495" },
    { label: "Chalkbeat — Common Sense Media study on bias in AI teacher assistants", url: "https://www.chalkbeat.org/2025/08/06/ai-teacher-assistants-promote-racial-bias-study-finds" },
    { label: "K-12 Dive — Beware hallucinations in AI lesson planning", url: "https://www.k12dive.com/news/using-ai-lesson-planning-beware-hallucinations/726660" },
  ],
} satisfies Record<string, ComparisonSource[]>;

const ptSourcesExtra = {
  dge: { label: "DGE — Aprendizagens Essenciais", url: "https://www.dge.mec.pt/aprendizagens-essenciais" },
  observador: {
    label: "Observador — 2 em cada 3 professores portugueses usaram IA (2025)",
    url: "https://observador.pt/2025/05/30/embargo-ate-8h-estudo-neste-ano-letivo-dois-em-cada-tres-professores-recorreram-a-inteligencia-artificial",
  },
};

const ptPT: Record<ComparisonSlug, ComparisonPageContent> = {
  "canva-para-educacao": {
    slug: "canva-para-educacao",
    competitorName: "Canva para Educação",
    metaTitle: "Scooli vs Canva para Educação: qual escolher?",
    metaDescription:
      "O Canva desenha materiais; a Scooli prepara o ano letivo: planificação, calendário de cada turma e a semana pronta num clique.",
    kicker: "Comparação",
    title: "Scooli vs Canva para Educação",
    description:
      "O Canva desenha materiais bonitos. A Scooli parte da sua planificação, organiza as aulas de cada turma num calendário e prepara a semana num clique.",
    verdict:
      "O Canva para Educação é uma ferramenta de design, ótima para posters, infográficos e apresentações. A Scooli resolve outro problema, o de preparar o ano letivo: parte da sua planificação e das Aprendizagens Essenciais, organiza as aulas de cada turma num calendário e prepara a semana inteira com planos de aula, fichas e testes prontos a editar. Usar as duas faz sentido: a Scooli para o conteúdo e o planeamento, o Canva para o acabamento visual.",
    tableTitle: "Lado a lado",
    tableDescription:
      "O que cada uma faz pelo mesmo trabalho: preparar as aulas de uma turma ao longo do ano.",
    rows: [
      {
        aspect: "Ponto de partida",
        scooli: "A sua planificação anual e o calendário de cada turma",
        competitor: "Um pedido de cada vez, ou um modelo de design",
      },
      {
        aspect: "Currículo português",
        scooli: "Aprendizagens Essenciais e DL 55/2018 integrados em cada planificação e plano de aula",
        competitor: "Mapeamento curricular documentado para 4 países (EUA, Austrália, Indonésia, México); sem referência a Portugal",
      },
      {
        aspect: "Preparar a semana",
        scooli: "«Gerar semana»: um plano de aula para cada aula do calendário, num clique",
        competitor: "Gerador de plano de aula por pedido; avaliações independentes descrevem as sugestões como ideias de texto gerais",
      },
      {
        aspect: "O documento pedagógico",
        scooli: "Objetivos, sequência, materiais e avaliação, no modelo do professor, com exportação para Word e PDF",
        competitor: "Foco no design visual: templates, imagens e apresentações",
      },
    ],
    reasonsTitle: "Porque os professores escolhem a Scooli",
    reasons: [
      {
        title: "Parte da sua planificação",
        description: "As aulas de cada turma ficam no calendário a partir do que o professor planeou para o ano.",
      },
      {
        title: "Calendário de cada turma",
        description: "A planificação vira calendário e cada semana fica preparada num clique.",
      },
      {
        title: "Feita para o ensino português",
        description: "Aprendizagens Essenciais, DL 54/2018 e 55/2018 e português europeu, desde o primeiro pedido.",
      },
    ],
    faq: [
      {
        question: "O Canva para Educação substitui a Scooli?",
        answer:
          "Não para o mesmo trabalho. O Canva ajuda a desenhar o documento; a Scooli prepara o conteúdo pedagógico e o planeamento alinhados com as Aprendizagens Essenciais. Muitos professores usam as duas: a Scooli para o conteúdo, o Canva para o acabamento visual.",
      },
      {
        question: "O Canva tem alinhamento com o currículo português?",
        answer:
          "Com base na documentação pública do Canva, o mapeamento curricular por código de standard (\"Learn Grid\") está disponível para os Estados Unidos, a Austrália, a Indonésia e o México. Não encontrámos referência às Aprendizagens Essenciais nem aos Decretos-Lei 54/2018 e 55/2018 nas páginas do Canva para Educação.",
      },
      {
        question: "O que faz a Scooli que um gerador de planos de aula não faz?",
        answer:
          "A Scooli não gera planos soltos: mantém o calendário de cada turma a partir da sua planificação e prepara a semana inteira a partir daí.",
      },
      {
        question: "Posso usar o Canva e a Scooli ao mesmo tempo?",
        answer:
          "Sim. São complementares: gere o plano de aula ou a planificação na Scooli e desenhe o material visual final no Canva.",
      },
    ],
    ctaTitle: "Experimente a Scooli com as suas turmas",
    ctaDescription: "Comece grátis e veja a próxima semana de uma turma preparada num clique.",
    sources: [...sources.canva, ptSourcesExtra.dge],
  },
  "magicschool-ai": {
    slug: "magicschool-ai",
    competitorName: "MagicSchool AI",
    metaTitle: "Scooli vs MagicSchool AI: qual escolher em Portugal?",
    metaDescription:
      "O MagicSchool é um catálogo de 80+ ferramentas pensado para os EUA. A Scooli conhece o currículo português, parte da sua planificação e prepara a semana. Com fontes citadas.",
    kicker: "Comparação",
    title: "Scooli vs MagicSchool AI",
    description:
      "O MagicSchool AI é um catálogo de mais de 80 ferramentas de IA para professores. A Scooli é uma só: a que parte da sua planificação e prepara o ano letivo consigo.",
    verdict:
      "O MagicSchool AI foi construído para professores dos EUA: o alinhamento curricular assenta nos standards estaduais americanos e no Common Core, e não encontrámos referência ao currículo português nem a escolas portuguesas como clientes. A Scooli foi construída para o ensino português e para um trabalho diferente do de um catálogo: partir da planificação, organizar o calendário de cada turma e preparar a semana, com a direção a ver o estado do currículo de toda a escola.",
    tableTitle: "Lado a lado",
    tableDescription: "Factos verificáveis, com fonte, sobre o mesmo trabalho: preparar as aulas ao longo do ano.",
    rows: [
      {
        aspect: "Ponto de partida",
        scooli: "A planificação e o calendário de cada turma",
        competitor: "Uma ferramenta de cada vez, num catálogo de 80+ para professores",
      },
      {
        aspect: "Currículo português",
        scooli: "Aprendizagens Essenciais e DL 54/2018 e 55/2018 integrados em cada pedido",
        competitor: "Alinhamento centrado em standards dos EUA (Common Core, standards estaduais); nenhuma referência ao currículo português",
      },
      {
        aspect: "Visão da escola",
        scooli: "Painel com o currículo cumprido por turma, lugares geridos e biblioteca interna",
        competitor: "Plano Enterprise com SSO e integração com SIS, pensado para distritos escolares dos EUA",
      },
      {
        aspect: "Português europeu",
        scooli: "Nativo, da interface ao conteúdo gerado",
        competitor: "Listado entre 98 línguas de tradução; não confirmado como língua de interface",
      },
    ],
    reasonsTitle: "Porque os professores escolhem a Scooli",
    reasons: [
      {
        title: "Um fluxo, não um catálogo",
        description: "Planificação, calendário e semana preparada no mesmo sítio, sem escolher entre dezenas de ferramentas.",
      },
      {
        title: "O currículo certo",
        description: "As Aprendizagens Essenciais e a legislação portuguesa entram desde o primeiro pedido, sem traduzir standards de outro país.",
      },
      {
        title: "A escola a ver o currículo",
        description: "Os pilotos começam com uma equipa pequena e a direção acompanha o estado de todas as turmas num só painel.",
      },
    ],
    faq: [
      {
        question: "O MagicSchool AI funciona com o currículo português?",
        answer:
          "Com base na documentação pública consultada, o alinhamento curricular do MagicSchool é construído à volta de standards estaduais dos EUA e do Common Core. Não encontrámos referência às Aprendizagens Essenciais nem aos Decretos-Lei 54/2018 ou 55/2018.",
      },
      {
        question: "O MagicSchool AI está disponível em português?",
        answer:
          "O MagicSchool lista o português europeu entre 98 línguas suportadas para tradução de conteúdo (atualização de março de 2026), mas a documentação consultada não confirma se é também língua de interface do produto.",
      },
      {
        question: "Existem escolas portuguesas a usar o MagicSchool AI?",
        answer:
          "Não encontrámos casos de estudo institucionais em Portugal ou na União Europeia; os logótipos de clientes publicados são distritos escolares dos EUA.",
      },
      {
        question: "Preciso de 80 ferramentas?",
        answer:
          "O trabalho de um professor repete-se todas as semanas: planear, preparar, ajustar. A Scooli concentra-se nesse ciclo, em vez de oferecer um catálogo.",
      },
    ],
    ctaTitle: "Experimente a Scooli com as suas turmas",
    ctaDescription: "Veja as Aprendizagens Essenciais e o calendário da turma na sua primeira semana.",
    sources: [...sources.magicschool, ptSourcesExtra.dge],
  },
  teachy: {
    slug: "teachy",
    competitorName: "Teachy",
    metaTitle: "Scooli vs Teachy: qual escolher em Portugal?",
    metaDescription:
      "A Teachy segue o currículo brasileiro; a Scooli segue o português e organiza o ano de cada turma num calendário. Comparação com todas as fontes citadas.",
    kicker: "Comparação",
    title: "Scooli vs Teachy",
    description:
      "A Teachy planeia e gera materiais com base no currículo brasileiro. A Scooli parte da sua planificação e do currículo português, e organiza o ano de cada turma num calendário.",
    verdict:
      "A Teachy está construída e documentada em torno da BNCC brasileira. Não encontrámos variante em português europeu nem página para Portugal, e conteúdo sobre temas portugueses aparece com códigos curriculares brasileiros. A Scooli foi feita para o professor português: as Aprendizagens Essenciais e o DL 55/2018 entram desde o primeiro pedido, e o calendário de cada turma mantém o ano letivo no sítio certo.",
    tableTitle: "Lado a lado",
    tableDescription: "Factos verificáveis, com fonte oficial sempre que existe, incluindo as páginas da própria Teachy.",
    rows: [
      {
        aspect: "Currículo",
        scooli: "Aprendizagens Essenciais (Portugal) integradas em cada planificação e plano de aula",
        competitor: "Alinhamento declarado à BNCC (Brasil); nenhuma referência às Aprendizagens Essenciais",
      },
      {
        aspect: "Idioma",
        scooli: "Português europeu nativo, da interface ao conteúdo gerado",
        competitor: "Apenas português do Brasil (pt-BR); sem variante para Portugal",
      },
      {
        aspect: "Ponto de partida",
        scooli: "A planificação anual e o calendário de cada turma",
        competitor: "Planeamento por turma com as habilidades da BNCC, e materiais gerados a partir de cada aula",
      },
      {
        aspect: "Preparar a semana",
        scooli: "«Gerar semana»: um plano de aula para cada aula do calendário, num clique",
        competitor: "Calendário por turma em semanas, bimestres (o calendário brasileiro) ou o ano inteiro",
      },
      {
        aspect: "Presença em Portugal",
        scooli: "Produto construído desde a fundação para o ensino português",
        competitor: "Sem página, locale ou presença institucional específica para Portugal",
      },
    ],
    reasonsTitle: "Porque os professores escolhem a Scooli",
    reasons: [
      {
        title: "O currículo que ensina",
        description: "Sem códigos curriculares de outro país a traduzir: tudo parte das Aprendizagens Essenciais.",
      },
      {
        title: "O ano inteiro, num clique por semana",
        description: "A planificação vira calendário, e cada semana é preparada num clique.",
      },
      {
        title: "Português europeu a sério",
        description: "Linguagem, exemplos e formato dos documentos pensados para as escolas portuguesas.",
      },
    ],
    faq: [
      {
        question: "A Teachy funciona com o currículo português?",
        answer:
          "Com base na documentação pública da Teachy, o alinhamento curricular declarado é à BNCC brasileira. Não encontrámos referência às Aprendizagens Essenciais nem aos Decretos-Lei 54/2018 ou 55/2018, e mesmo conteúdo sobre temas portugueses aparece com códigos BNCC.",
      },
      {
        question: "A Teachy está disponível em português europeu?",
        answer:
          "Não encontrámos uma variante pt-PT. A Teachy opera em português do Brasil (pt-BR) em teachy.com.br, e teachy.ai oferece cerca de 20 idiomas, nenhum deles para Portugal.",
      },
      {
        question: "Existem escolas portuguesas a usar a Teachy?",
        answer: "Não encontrámos presença institucional, parceria ou landing page específica para Portugal no site oficial da Teachy.",
      },
      {
        question: "Já uso a Teachy. Vale a pena experimentar a Scooli?",
        answer:
          "Pode experimentar com uma turma e comparar: a Scooli começa na sua planificação, prepara a semana num clique e usa as Aprendizagens Essenciais sem conversão de códigos.",
      },
    ],
    ctaTitle: "Experimente a Scooli com as suas turmas",
    ctaDescription: "Comece grátis, sem traduzir códigos curriculares de outro país.",
    sources: [...sources.teachy, ptSourcesExtra.dge],
  },
  "chatgpt-gemini-perplexity": {
    slug: "chatgpt-gemini-perplexity",
    competitorName: "ChatGPT, Gemini e Perplexity",
    metaTitle: "Scooli vs ChatGPT, Gemini e Perplexity para planos de aula",
    metaDescription:
      "Um chat dá-lhe texto e cada conversa parte do zero. A Scooli conhece o currículo, parte da sua planificação e prepara a semana. Com fontes citadas.",
    kicker: "Comparação",
    title: "Scooli vs ChatGPT, Gemini e Perplexity",
    description:
      "Dois em cada três professores portugueses já usaram IA para preparar aulas. Um chat dá-lhe texto; a Scooli dá-lhe a aula, o calendário e a semana preparada.",
    verdict:
      "O ChatGPT, o Gemini e o Perplexity são ótimos a conversar, mas cada conversa parte do zero: não conhecem a turma, o currículo português nem o que já foi dado, e a investigação documenta alinhamentos curriculares superficiais e fontes inventadas. A Scooli faz o contrário: parte da sua planificação, mantém o calendário de cada turma, prepara a semana inteira em documentos estruturados no seu modelo e deixa a revisão ao professor.",
    tableTitle: "Lado a lado",
    tableDescription: "Não é sobre uma empresa: é sobre o que acontece quando se usa um chat genérico para o trabalho de preparar o ano letivo.",
    rows: [
      {
        aspect: "Currículo português",
        scooli: "Aprendizagens Essenciais e DL 55/2018 integrados em cada pedido",
        competitor: "Depende do que o professor escrever e verificar no pedido, sessão a sessão",
      },
      {
        aspect: "O seu plano e calendário",
        scooli: "A planificação e o calendário de cada turma ficam guardados na Scooli",
        competitor: "Sem memória persistente na versão gratuita: cada conversa parte do zero",
      },
      {
        aspect: "Preparar a semana",
        scooli: "«Gerar semana»: um plano de aula para cada aula do calendário, num clique",
        competitor: "Uma aula de cada vez, escrita em cada conversa",
      },
      {
        aspect: "Qualidade pedagógica",
        scooli: "Estrutura de objetivos, sequência e avaliação formativa em cada documento",
        competitor: "Estudo da UMass Amherst (310 planos): só 2–4% das atividades pedem análise ou avaliação; cerca de 45% ficam no nível de \"recordar\"",
      },
      {
        aspect: "Factos inventados",
        scooli: "Documentos gerados a partir de regras curriculares explícitas e revistos pelo professor",
        competitor: "Caso documentado: o ChatGPT inventou um livro infantil inexistente ao gerar material \"alinhado\" a um standard",
      },
      {
        aspect: "O resultado",
        scooli: "Documentos estruturados no modelo do professor, prontos a exportar para Word e PDF",
        competitor: "Texto de chat para copiar, colar e formatar",
      },
    ],
    reasonsTitle: "Porque os professores escolhem a Scooli",
    reasons: [
      {
        title: "Não recomeça do zero",
        description: "A planificação e o calendário ficam na Scooli, por isso cada semana nasce do que planeou.",
      },
      {
        title: "Menos trabalho depois",
        description: "O resultado já vem estruturado e alinhado, em vez de texto para reformatar e verificar à mão.",
      },
      {
        title: "O professor decide",
        description: "Tudo é editável e a revisão humana faz parte do fluxo, com os dados fora do treino de modelos.",
      },
    ],
    faq: [
      {
        question: "Porque não usar apenas o ChatGPT para gerar planos de aula?",
        answer:
          "Pode, e muitos professores já o fazem. A investigação mostra que o alinhamento curricular num chat genérico depende de o professor escrever e verificar tudo, sessão a sessão. Um estudo da UMass Amherst com 310 planos gerados por ChatGPT, Gemini e Copilot encontrou que a maioria das atividades fica no nível mais básico de pensamento.",
      },
      {
        question: "O ChatGPT pode inventar informação num plano de aula?",
        answer:
          "Sim, está documentado. Um estudo de caso publicado na PLOS ONE encontrou o ChatGPT a inventar um livro infantil inexistente ao pedir material de leitura alinhado a um standard. Obriga a verificar cada resultado à mão.",
      },
      {
        question: "Quantos professores portugueses já usam IA para preparar aulas?",
        answer:
          "Um estudo de 2025 da Fundação Semapa com a Nova SBE e a Universidade do Minho, com cerca de 2.000 professores de mais de 300 escolas, encontrou que dois em cada três (67%) já tinham usado ferramentas de IA nesse ano letivo, sobretudo para preparar aulas.",
      },
      {
        question: "Posso continuar a usar o ChatGPT para brainstorming?",
        answer:
          "Sim, e os investigadores até o recomendam para isso. A Scooli existe para a parte seguinte: transformar a ideia em planificação, aulas e materiais alinhados, e manter o calendário de cada turma.",
      },
    ],
    ctaTitle: "Experimente a Scooli com as suas turmas",
    ctaDescription: "Veja a diferença entre pedir alinhamento curricular e tê-lo desde o primeiro pedido.",
    sources: [...sources.chat, ptSourcesExtra.observador],
  },
};

const en: Record<ComparisonSlug, ComparisonPageContent> = {
  "canva-para-educacao": {
    slug: "canva-para-educacao",
    competitorName: "Canva for Education",
    metaTitle: "Scooli vs Canva for Education: which to choose?",
    metaDescription:
      "Canva designs materials; Scooli prepares the school year: your plan, a calendar for every class and the week ready in one click. Sources cited.",
    kicker: "Comparison",
    title: "Scooli vs Canva for Education",
    description:
      "Canva designs beautiful materials. Scooli starts from your yearly plan, lays out each class's lessons in a calendar and prepares the week in one click.",
    verdict:
      "Canva for Education is a design tool, great for posters, infographics and slides. Scooli solves a different problem, preparing the school year: it starts from your yearly plan, lays out each class's lessons in a calendar and prepares the whole week with lesson plans, worksheets and tests ready to edit. Using both makes sense: Scooli for the content and the planning, Canva for the visual finish.",
    tableTitle: "Side by side",
    tableDescription: "What each one does for the same job: preparing a class's lessons across the year.",
    rows: [
      {
        aspect: "Starting point",
        scooli: "Your yearly plan and each class's calendar",
        competitor: "One request at a time, or a design template",
      },
      {
        aspect: "Curriculum",
        scooli: "Works from the plan you set for each class and subject",
        competitor: "Automatic curriculum mapping documented for four countries (US, Australia, Indonesia, Mexico)",
      },
      {
        aspect: "Preparing the week",
        scooli: "\"Generate week\": a lesson plan for every lesson in the calendar, in one click",
        competitor: "A lesson plan generator, one request at a time; independent reviews describe the output as general text ideas",
      },
      {
        aspect: "The teaching document",
        scooli: "Objectives, sequence, materials and assessment in the teacher's template, exported to Word and PDF",
        competitor: "Focused on visual design: templates, images and presentations",
      },
    ],
    reasonsTitle: "Why teachers choose Scooli",
    reasons: [
      { title: "It starts from your plan", description: "Each class's lessons land in the calendar from what you planned for the year." },
      { title: "A calendar for every class", description: "The plan becomes a calendar and each week is prepared in one click." },
      { title: "Ready to teach from", description: "Structured documents in your template, editable, with the final say always yours." },
    ],
    faq: [
      {
        question: "Does Canva for Education replace Scooli?",
        answer:
          "Not for the same job. Canva helps you design the document; Scooli prepares the teaching content and the planning. Many teachers use both: Scooli for the content, Canva for the visual finish.",
      },
      {
        question: "Does Canva map to my curriculum?",
        answer:
          "Based on Canva's public documentation, curriculum mapping by standard code (\"Learn Grid\") is available for the United States, Australia, Indonesia and Mexico.",
      },
      {
        question: "What does Scooli do that a lesson plan generator doesn't?",
        answer:
          "Scooli doesn't generate stand-alone plans: it keeps each class's calendar and state, and prepares the whole week from there. What was taught and what's left feed the next lesson.",
      },
      {
        question: "Can I use Canva and Scooli together?",
        answer: "Yes. They're complementary: generate the lesson plan or yearly plan in Scooli and design the final visual material in Canva.",
      },
    ],
    ctaTitle: "Try Scooli with your classes",
    ctaDescription: "Start free and see a class's next week prepared in one click.",
    sources: sources.canva,
  },
  "magicschool-ai": {
    slug: "magicschool-ai",
    competitorName: "MagicSchool AI",
    metaTitle: "Scooli vs MagicSchool AI: which to choose?",
    metaDescription:
      "MagicSchool is a catalogue of 80+ tools. Scooli prepares the week from your yearly plan. Sources cited.",
    kicker: "Comparison",
    title: "Scooli vs MagicSchool AI",
    description:
      "MagicSchool AI is a catalogue of more than 80 AI tools for teachers. Scooli is one: the one that starts from your plan and prepares the school year with you.",
    verdict:
      "MagicSchool AI is built for US teachers: its curriculum alignment rests on US state standards and the Common Core, and every customer logo it publishes is a US school district. Scooli does a different job from a catalogue: it starts from your yearly plan, lays out each class's calendar and prepares the week, with school leaders seeing the state of the curriculum across the whole school.",
    tableTitle: "Side by side",
    tableDescription: "Verifiable facts, with sources, about the same job: preparing lessons across the year.",
    rows: [
      {
        aspect: "Starting point",
        scooli: "Your yearly plan and each class's calendar",
        competitor: "One tool at a time, from a catalogue of 80+ for teachers",
      },
      {
        aspect: "Curriculum",
        scooli: "Works from the plan you set for each class and subject",
        competitor: "Alignment built around US state standards and the Common Core",
      },
      {
        aspect: "The school's view",
        scooli: "A dashboard with the curriculum covered in every class, managed seats and an internal library",
        competitor: "An Enterprise plan with SSO and SIS integration, designed for US school districts",
      },
      {
        aspect: "Preparing the week",
        scooli: "\"Generate week\": a lesson plan for every lesson in the calendar, in one click",
        competitor: "Generation tool by tool; independent reviews call the output a solid starting point that needs careful fact-checking",
      },
    ],
    reasonsTitle: "Why teachers choose Scooli",
    reasons: [
      { title: "One flow, not a catalogue", description: "Plan, calendar and prepared week in one place, without choosing between dozens of tools." },
      { title: "Your plan, not a standards database", description: "Each lesson starts from the plan you set for the class." },
      { title: "School leaders see the curriculum", description: "Pilots start with a small team, and leadership follows the curriculum of every class in one dashboard." },
    ],
    faq: [
      {
        question: "Does MagicSchool AI follow my own yearly plan?",
        answer:
          "Based on the public documentation we reviewed, MagicSchool's curriculum alignment is built around US state standards and the Common Core, with tools you run one at a time.",
      },
      {
        question: "Which customers does MagicSchool list?",
        answer: "The customer logos and case studies it publishes are US school districts.",
      },
      {
        question: "Do I need 80 tools?",
        answer:
          "A teacher's work repeats every week: plan, prepare, adjust. Scooli concentrates on that loop instead of offering a catalogue.",
      },
      {
        question: "Can a school try Scooli before deciding?",
        answer: "Yes. Schools start with a supported pilot with a small team, and review usage together before rolling out.",
      },
    ],
    ctaTitle: "Try Scooli with your classes",
    ctaDescription: "Start free and see your first week prepared from your own plan.",
    sources: sources.magicschool,
  },
  teachy: {
    slug: "teachy",
    competitorName: "Teachy",
    metaTitle: "Scooli vs Teachy: which to choose?",
    metaDescription:
      "Both plan by class on a calendar. In Scooli the plan follows what happened in each lesson, and school leaders see how much of the plan every class has covered. Sources cited.",
    kicker: "Comparison",
    title: "Scooli vs Teachy",
    description:
      "Both turn a plan into each class's calendar. In Scooli, a quick check-in after each lesson keeps the plan in step with the classroom, and school leaders see coverage class by class, built from those check-ins.",
    verdict:
      "Teachy is a platform built and documented around Brazil's BNCC, with per-class planning on a calendar and an offer for schools that lists curriculum coverage by class. Scooli starts from the same place, each class's plan on a calendar, and builds coverage from a check-in after each lesson: the teacher records in seconds how it went, the following lessons move with it, and from those check-ins school leaders see how much of the planned curriculum each class has covered and what fell behind, without asking teachers for reports.",
    tableTitle: "Side by side",
    tableDescription:
      "Verifiable facts, with official sources wherever they exist, including Teachy's own pages. Where we could not find something in Teachy's public pages, we say so.",
    rows: [
      {
        aspect: "After each lesson",
        scooli: "A check-in in seconds: taught, taught with difficulties, half done or no class. The following lessons move, and the teacher decides any change to the plan",
        competitor:
          "The schools offer lists a Smart Calendar to follow teachers on every lesson; to change class days, the teacher reopens the plan, edits the days and generates it again. We did not find a per-lesson check-in that moves the following lessons in the public pages we reviewed",
      },
      {
        aspect: "Curriculum coverage",
        scooli: "For school leaders, the share of the planned curriculum covered to date in every class, the classes behind and what is left, from what teachers record",
        competitor: "The schools page lists curriculum coverage and performance by class for leadership; we did not find how coverage is measured",
      },
      {
        aspect: "The class calendar",
        scooli: "Your yearly plan becomes each class's calendar, and each week is prepared in one click",
        competitor: "A plan per class for weeks, terms or the whole year, with a BNCC skill on each lesson",
      },
      {
        aspect: "The school's own material",
        scooli: "The school's rules and support material are set once and apply to every teacher's documents",
        competitor: "Teachers can upload their own files (PDFs, documents, slides) when generating a lesson plan",
      },
    ],
    reasonsTitle: "Why choose Scooli",
    reasons: [
      { title: "The plan follows the classroom", description: "A quick check-in after each lesson moves the next ones. Scooli suggests the change; the teacher decides." },
      { title: "Coverage in view", description: "School leaders see, class by class, what has been taught and what is behind, during the term rather than at the end of the year." },
      { title: "Set up once for the school", description: "The school's rules and support material reach every teacher's documents without repeating them in each request." },
    ],
    faq: [
      {
        question: "Which curriculum does Teachy align to?",
        answer: "Based on Teachy's public pages, the declared alignment is to Brazil's BNCC; its English pages refer to \"your curriculum\" without naming one.",
      },
      {
        question: "What languages does Teachy support?",
        answer: "Teachy operates in Brazilian Portuguese (pt-BR) at teachy.com.br, and teachy.ai offers about 20 languages.",
      },
      {
        question: "How does Scooli measure what each class has covered?",
        answer:
          "From the teachers' check-ins: each lesson is linked to what the plan sets out to teach, and each check-in updates what has been taught and what is left. The figures show what teachers record in class, not what students learned.",
      },
      {
        question: "Can a school try Scooli before deciding?",
        answer: "Yes. Schools start with a supported pilot with a small team, and review usage together before rolling out.",
      },
    ],
    ctaTitle: "Try Scooli with your classes",
    ctaDescription: "Start free and see a week prepared from your own plan.",
    sources: sources.teachy,
  },
  "chatgpt-gemini-perplexity": {
    slug: "chatgpt-gemini-perplexity",
    competitorName: "ChatGPT, Gemini and Perplexity",
    metaTitle: "Scooli vs ChatGPT, Gemini and Perplexity for lesson plans",
    metaDescription:
      "A chat gives you text and every conversation starts from zero. Scooli prepares the week from your plan. Sources cited.",
    kicker: "Comparison",
    title: "Scooli vs ChatGPT, Gemini and Perplexity",
    description:
      "Most teachers have tried a chatbot for lesson planning. A chat gives you text; Scooli gives you the lesson, the calendar and the prepared week.",
    verdict:
      "ChatGPT, Gemini and Perplexity are great at conversation, but every conversation starts from zero: they don't know your class or what you've already taught, and research documents shallow curriculum alignment and invented sources. Scooli does the opposite: it starts from your yearly plan, keeps each class's calendar, prepares the whole week in structured documents in your template and leaves the review to the teacher.",
    tableTitle: "Side by side",
    tableDescription: "Not about one company: about what happens when a general chat does the job of preparing the school year.",
    rows: [
      {
        aspect: "Your plan",
        scooli: "Starts from your yearly plan for each class",
        competitor: "Depends on what you write, and check, in every request",
      },
      {
        aspect: "Your plan and calendar",
        scooli: "Your yearly plan and each class's calendar stay in Scooli",
        competitor: "No persistent memory on the free versions: every conversation starts from zero",
      },
      {
        aspect: "Preparing the week",
        scooli: "\"Generate week\": a lesson plan for every lesson in the calendar, in one click",
        competitor: "One lesson at a time, written in each conversation",
      },
      {
        aspect: "Pedagogical quality",
        scooli: "Objectives, sequence and formative assessment structured in every document",
        competitor: "UMass Amherst study (310 plans): only 2–4% of activities ask students to analyse or evaluate; about 45% stay at \"remember\"",
      },
      {
        aspect: "Invented facts",
        scooli: "Documents generated from explicit rules and reviewed by the teacher",
        competitor: "Documented case: ChatGPT invented a children's book that doesn't exist when generating \"aligned\" material",
      },
      {
        aspect: "The result",
        scooli: "Structured documents in the teacher's template, ready to export to Word and PDF",
        competitor: "Chat text to copy, paste and format",
      },
    ],
    reasonsTitle: "Why teachers choose Scooli",
    reasons: [
      { title: "It doesn't start from zero", description: "Your plan and each class's calendar stay in Scooli, so every week starts from what you planned." },
      { title: "Less work afterwards", description: "The result arrives structured, instead of text to reformat and check by hand." },
      { title: "The teacher decides", description: "Everything is editable and human review is part of the flow, with your data kept out of model training." },
    ],
    faq: [
      {
        question: "Why not just use ChatGPT to generate lesson plans?",
        answer:
          "You can, and many teachers do. Research shows that curriculum alignment in a general chat depends on the teacher writing and checking everything, session by session. A UMass Amherst study of 310 lesson plans generated by ChatGPT, Gemini and Copilot found most activities stay at the most basic level of thinking.",
      },
      {
        question: "Can ChatGPT invent information in a lesson plan?",
        answer:
          "Yes, it's documented. A PLOS ONE case study found ChatGPT inventing a children's book that doesn't exist when asked for reading material aligned to a standard. It means checking every result by hand.",
      },
      {
        question: "Can I still use ChatGPT for brainstorming?",
        answer:
          "Yes, and the researchers even recommend it for that. Scooli is for the next step: turning the idea into a plan, lessons and materials, and keeping each class's calendar.",
      },
      {
        question: "Does Scooli use my requests to train AI models?",
        answer: "No. Requests and materials created in Scooli are not used to train AI models.",
      },
    ],
    ctaTitle: "Try Scooli with your classes",
    ctaDescription: "See the difference between asking for a plan and having one that starts from yours.",
    sources: sources.chat,
  },
};

// Brazilian sources: Teachy's own pt-BR pages (it is the Brazilian incumbent), the
// CNE AI guidelines and the TIC Educação survey.
const brSourcesExtra = {
  teachySchools: { label: "Teachy — para escolas", url: "https://www.teachy.com.br/pt-BR/schools" },
  teachyCalendar: {
    label: "Teachy — planejamento e calendário escolar",
    url: "https://www.teachy.com.br/pt-BR/ferramentas/planejamento-calendario-escolar",
  },
  teachyLessonPlan: {
    label: "Teachy — gerador de plano de aula (BNCC)",
    url: "https://www.teachy.com.br/pt-BR/ferramentas/gerador-plano-aula",
  },
  teachyProfile: {
    label: "Revista Educação — perfil da Teachy (2024)",
    url: "https://revistaeducacao.com.br/2024/06/21/plataforma-teachy/",
  },
  cne: {
    label: "Resolução CNE/CP nº 1/2026 — Diretrizes para a utilização da IA na educação brasileira",
    url: "https://abmes.org.br/arquivos/legislacoes/legislacoes-2026-11-12-369a065e.pdf",
  },
  cetic: {
    label: "Cetic.br — TIC Educação 2024, resumo executivo",
    url: "https://www.cetic.br/media/docs/publicacoes/2/pt/20251027172336/tic_educacao_2024_resumo_executivo.pdf",
  },
};

/**
 * Brazil. Teachy is the Brazilian incumbent and shares the ground of a BNCC plan,
 * a calendar per turma and the teacher's own material, so its page leads with what
 * follows the plan: the check-in after each lesson and the direção seeing the
 * cumprimento do planejamento turma a turma. About Teachy we only write what its
 * public pages say, or "na documentação pública não encontramos"; no price,
 * quality or student-data claims.
 */
const ptBR: Record<ComparisonSlug, ComparisonPageContent> = {
  "canva-para-educacao": {
    slug: "canva-para-educacao",
    competitorName: "Canva para Educação",
    metaTitle: "Scooli vs Canva para Educação: qual escolher?",
    metaDescription:
      "O Canva desenha materiais; a Scooli prepara o ano letivo de cada turma: planejamento, calendário por bimestre e a semana preparada em um clique.",
    kicker: "Comparação",
    title: "Scooli vs Canva para Educação",
    description:
      "O Canva desenha materiais bonitos. A Scooli parte do seu planejamento, organiza as aulas de cada turma em um calendário por bimestre e prepara a semana em um clique.",
    verdict:
      "O Canva para Educação é uma ferramenta de design, ótima para cartazes, infográficos e apresentações. A Scooli resolve outro problema, o de preparar o ano letivo: parte do seu planejamento e das habilidades da BNCC, organiza as aulas de cada turma por bimestre e prepara a semana inteira com planos de aula, listas de exercícios e provas para editar. Usar as duas faz sentido: a Scooli para o conteúdo e o planejamento, o Canva para o acabamento visual.",
    tableTitle: "Lado a lado",
    tableDescription: "O que cada uma faz pelo mesmo trabalho: preparar as aulas de uma turma ao longo do ano.",
    rows: [
      {
        aspect: "Ponto de partida",
        scooli: "O seu planejamento anual e o calendário de cada turma",
        competitor: "Um pedido de cada vez, ou um modelo de design",
      },
      {
        aspect: "BNCC",
        scooli: "Habilidades da BNCC ligadas a cada aula do planejamento e a cada plano de aula",
        competitor:
          "Mapeamento curricular documentado para 4 países (EUA, Austrália, Indonésia e México); na documentação pública não encontramos a BNCC",
      },
      {
        aspect: "Preparar a semana",
        scooli: "“Gerar semana”: um plano de aula para cada aula do calendário, em um clique",
        competitor:
          "Gerador de plano de aula por pedido; avaliações independentes descrevem as sugestões como ideias de texto gerais",
      },
      {
        aspect: "O documento pedagógico",
        scooli: "Objetivos, sequência, materiais e avaliação, no modelo do professor, com exportação para Word e PDF",
        competitor: "Foco no design visual: modelos, imagens e apresentações",
      },
    ],
    reasonsTitle: "Por que escolher a Scooli",
    reasons: [
      {
        title: "Parte do seu planejamento",
        description: "As aulas de cada turma entram no calendário a partir do que o professor planejou para o ano.",
      },
      {
        title: "Calendário por bimestre",
        description: "O planejamento vira o calendário da turma, com os feriados brasileiros, e cada semana é preparada em um clique.",
      },
      {
        title: "A BNCC desde o primeiro pedido",
        description: "Cada aula parte das habilidades da BNCC do ano e da disciplina, em português do Brasil.",
      },
    ],
    faq: [
      {
        question: "O Canva para Educação substitui a Scooli?",
        answer:
          "Não para o mesmo trabalho. O Canva ajuda a desenhar o documento; a Scooli prepara o conteúdo pedagógico e o planejamento, ligados às habilidades da BNCC. Dá para usar as duas: a Scooli para o conteúdo, o Canva para o acabamento visual.",
      },
      {
        question: "O Canva tem alinhamento com a BNCC?",
        answer:
          "Segundo a documentação pública do Canva, o mapeamento curricular por código (“Learn Grid”) está disponível para os Estados Unidos, a Austrália, a Indonésia e o México. Nas páginas do Canva para Educação, não encontramos referência à BNCC.",
      },
      {
        question: "O que a Scooli faz que um gerador de planos de aula não faz?",
        answer:
          "A Scooli não gera planos soltos: mantém o calendário de cada turma a partir do seu planejamento e prepara a semana inteira a partir daí.",
      },
      {
        question: "Posso usar o Canva e a Scooli ao mesmo tempo?",
        answer:
          "Sim. São complementares: gere o plano de aula ou o planejamento na Scooli e desenhe o material visual final no Canva.",
      },
    ],
    ctaTitle: "Experimente a Scooli com as suas turmas",
    ctaDescription: "Comece grátis e veja a próxima semana de uma turma preparada em um clique.",
    sources: sources.canva,
  },
  "magicschool-ai": {
    slug: "magicschool-ai",
    competitorName: "MagicSchool AI",
    metaTitle: "Scooli vs MagicSchool AI: qual escolher no Brasil?",
    metaDescription:
      "O MagicSchool é um catálogo de 80+ ferramentas pensado para os EUA. A Scooli parte do seu planejamento, liga cada aula à BNCC e prepara a semana. Com fontes.",
    kicker: "Comparação",
    title: "Scooli vs MagicSchool AI",
    description:
      "O MagicSchool AI é um catálogo de mais de 80 ferramentas de IA para professores. A Scooli é uma só: a que parte do seu planejamento e prepara o ano letivo com você.",
    verdict:
      "O MagicSchool AI foi construído para professores dos EUA: o alinhamento curricular se apoia nos padrões estaduais americanos e no Common Core, e os logotipos de clientes publicados são de distritos escolares dos EUA. Na documentação pública não encontramos referência à BNCC. A Scooli faz um trabalho diferente do de um catálogo: parte do planejamento, liga cada aula às habilidades da BNCC, organiza o calendário de cada turma por bimestre e prepara a semana, com a direção vendo o cumprimento do planejamento de todas as turmas.",
    tableTitle: "Lado a lado",
    tableDescription: "Fatos verificáveis, com fonte, sobre o mesmo trabalho: preparar as aulas ao longo do ano.",
    rows: [
      {
        aspect: "Ponto de partida",
        scooli: "O planejamento e o calendário de cada turma",
        competitor: "Uma ferramenta de cada vez, em um catálogo de 80+ para professores",
      },
      {
        aspect: "BNCC",
        scooli: "Habilidades da BNCC ligadas a cada aula do planejamento",
        competitor:
          "Alinhamento centrado nos padrões dos EUA (Common Core, padrões estaduais); na documentação pública não encontramos a BNCC",
      },
      {
        aspect: "Visão da escola",
        scooli: "Painel da direção com o cumprimento do planejamento de cada turma, vagas da escola e biblioteca interna",
        competitor: "Plano Enterprise com SSO e integração com SIS, pensado para distritos escolares dos EUA",
      },
      {
        aspect: "Português do Brasil",
        scooli: "Nativo, da interface ao conteúdo gerado",
        competitor: "Listado entre 98 idiomas de tradução; a documentação consultada não confirma se é idioma da interface",
      },
    ],
    reasonsTitle: "Por que escolher a Scooli",
    reasons: [
      {
        title: "Um fluxo, não um catálogo",
        description: "Planejamento, calendário e semana preparada no mesmo lugar, sem escolher entre dezenas de ferramentas.",
      },
      {
        title: "A BNCC desde o primeiro pedido",
        description: "As habilidades da BNCC entram em cada aula, sem traduzir padrões curriculares de outro país.",
      },
      {
        title: "A direção vê o planejamento",
        description:
          "Os pilotos começam com um grupo pequeno de professores, e a direção acompanha o cumprimento do planejamento de todas as turmas em um só painel.",
      },
    ],
    faq: [
      {
        question: "O MagicSchool AI funciona com a BNCC?",
        answer:
          "Segundo a documentação pública consultada, o alinhamento curricular do MagicSchool é construído em torno dos padrões estaduais dos EUA e do Common Core. Não encontramos referência à BNCC.",
      },
      {
        question: "O MagicSchool AI está disponível em português do Brasil?",
        answer:
          "O MagicSchool lista o português do Brasil entre 98 idiomas de tradução de conteúdo (atualização de março de 2026), mas a documentação consultada não confirma se ele também é idioma da interface.",
      },
      {
        question: "Existem escolas brasileiras usando o MagicSchool AI?",
        answer:
          "Não encontramos casos de estudo institucionais no Brasil; os logotipos de clientes publicados são de distritos escolares dos EUA.",
      },
      {
        question: "Preciso de 80 ferramentas?",
        answer:
          "O trabalho do professor se repete toda semana: planejar, preparar, ajustar. A Scooli se concentra nesse ciclo, em vez de oferecer um catálogo.",
      },
    ],
    ctaTitle: "Experimente a Scooli com as suas turmas",
    ctaDescription: "Veja as habilidades da BNCC e o calendário da turma na sua primeira semana.",
    sources: sources.magicschool,
  },
  teachy: {
    slug: "teachy",
    competitorName: "Teachy",
    metaTitle: "Scooli vs Teachy: o que muda para a sua escola",
    metaDescription:
      "Na Scooli, o plano acompanha o que aconteceu em cada aula e a direção vê o cumprimento do planejamento, turma a turma. Comparação com a Teachy, com fontes.",
    kicker: "Comparação",
    title: "Scooli vs Teachy",
    description:
      "As duas planejam com a BNCC e organizam as aulas de cada turma em um calendário. Na Scooli, um registro rápido depois de cada aula mantém o plano em dia com a sala, e é a partir desses registros que a direção vê o cumprimento do planejamento, turma a turma.",
    verdict:
      "A Teachy é uma plataforma brasileira de IA para professores e escolas, com planejamento alinhado à BNCC, calendário por turma e uma oferta para escolas que cita cobertura curricular por turma. A Scooli parte do mesmo ponto, o planejamento de cada turma ligado às habilidades da BNCC. Na Scooli, o cumprimento vem do registro de cada aula: o professor registra em segundos como a aula foi, as aulas seguintes se ajustam ao que aconteceu na sala e, a partir desses registros, a direção sabe, em cada turma, quanto do currículo previsto já foi dado e o que ficou para trás, sem pedir relatórios aos professores.",
    tableTitle: "Lado a lado",
    tableDescription:
      "Fatos verificáveis, com fonte nas páginas da própria Teachy. Quando não encontramos algo na documentação pública, dizemos isso, em vez de afirmar que não existe.",
    rows: [
      {
        aspect: "Cumprimento do planejamento",
        scooli:
          "Painel da direção com a porcentagem do currículo previsto até hoje em cada turma, as turmas atrasadas e o que ainda falta dar, a partir do que os professores registram em aula",
        competitor:
          "A página para escolas cita cobertura curricular e desempenho por turma para coordenação e direção; na documentação pública não encontramos como a cobertura é calculada",
      },
      {
        aspect: "Depois de cada aula",
        scooli:
          "Registro em segundos: ministrada, com dificuldades, ficou pela metade ou não houve aula. As aulas seguintes se movem, a Scooli propõe o ajuste ao plano e o professor decide",
        competitor:
          "A oferta para escolas cita um Calendário Inteligente para acompanhar os professores em cada aula; para mudar os dias de aula, o professor reabre o planejamento, altera os dias e gera de novo. Na documentação pública não encontramos um registro de cada aula que mova as seguintes",
      },
      {
        aspect: "BNCC",
        scooli:
          "Cada aula ligada às habilidades da BNCC do ano e da disciplina (e ao currículo do estado, quando disponível), o que permite medir o que falta dar",
        competitor: "Planejamento alinhado à BNCC, com a habilidade correspondente em cada aula",
      },
      {
        aspect: "Calendário da turma",
        scooli: "O planejamento vira o calendário de aulas de cada turma, bimestre a bimestre, com os feriados brasileiros",
        competitor:
          "Planejamento por turma em semanas, bimestres ou o ano letivo inteiro, com feriados e eventos informados pelo professor",
      },
      {
        aspect: "Regras e materiais da escola",
        scooli:
          "As regras da escola e o material de apoio, como o livro didático adotado, entram uma vez e valem nos documentos de todos os professores",
        competitor:
          "Envio de arquivos próprios (PDF, documentos, slides) no gerador de plano de aula, e planejamentos alinhados ao currículo da escola",
      },
    ],
    reasonsTitle: "Por que escolher a Scooli",
    reasons: [
      {
        title: "O cumprimento à vista",
        description:
          "A direção sabe, em cada turma, quanto do currículo previsto já foi dado e o que ficou para trás, durante o bimestre e não no fim do ano.",
      },
      {
        title: "O plano acompanha a sala",
        description: "Um registro rápido depois de cada aula move as aulas seguintes. A Scooli propõe o ajuste; o professor decide.",
      },
      {
        title: "A escola configura uma vez",
        description:
          "As regras e o material de apoio da escola entram nos documentos de todos os professores, sem repetir em cada pedido.",
      },
    ],
    faq: [
      {
        question: "Qual é a diferença entre a Scooli e a Teachy?",
        answer:
          "As duas planejam com a BNCC e organizam as aulas por turma. Na Scooli, o professor registra como cada aula foi, as aulas seguintes se ajustam ao que aconteceu e a direção vê o cumprimento do planejamento, turma a turma, a partir desses registros. Na documentação pública da Teachy, não encontramos um registro de cada aula com esse papel.",
      },
      {
        question: "Como a Scooli calcula o cumprimento do planejamento?",
        answer:
          "A partir dos registros dos professores. Cada aula está ligada às habilidades da BNCC, e cada registro (ministrada, com dificuldades, ficou pela metade ou não houve aula) atualiza o que já foi dado e o que falta. Os números mostram o que os professores registram em aula, não o que os alunos aprenderam.",
      },
      {
        question: "Quem decide o que muda no plano?",
        answer:
          "O professor. A Scooli propõe o ajuste e prepara a base, e tudo é editável. As diretrizes do CNE para o uso de IA na educação (Resolução CNE/CP nº 1/2026) colocam o planejamento das atividades e os objetivos de aprendizagem sob a regência humana, e é assim que a Scooli funciona.",
      },
      {
        question: "Já usamos a Teachy. Faz sentido conhecer a Scooli?",
        answer:
          "Faz, se a escola quer acompanhar o cumprimento do planejamento turma a turma ao longo do bimestre. Começamos com um piloto com um grupo pequeno de professores, e a escola avalia o painel da direção antes de decidir.",
      },
    ],
    ctaTitle: "Veja o cumprimento do planejamento na sua escola",
    ctaDescription: "Comece com um piloto com um grupo pequeno de professores e acompanhe as turmas no painel da direção.",
    sources: [
      brSourcesExtra.teachySchools,
      brSourcesExtra.teachyCalendar,
      brSourcesExtra.teachyLessonPlan,
      brSourcesExtra.teachyProfile,
      brSourcesExtra.cne,
    ],
  },
  "chatgpt-gemini-perplexity": {
    slug: "chatgpt-gemini-perplexity",
    competitorName: "ChatGPT, Gemini e Perplexity",
    metaTitle: "Scooli vs ChatGPT, Gemini e Perplexity para planos de aula",
    metaDescription:
      "Um chat devolve texto e não guarda o calendário da turma. A Scooli parte do seu planejamento, liga cada aula à BNCC e prepara a semana. Com fontes.",
    kicker: "Comparação",
    title: "Scooli vs ChatGPT, Gemini e Perplexity",
    description:
      "Segundo a TIC Educação 2024, 43% dos professores no Brasil já usavam IA generativa para preparar conteúdos didáticos. Um chat devolve texto; a Scooli devolve a aula, o calendário e a semana preparada.",
    verdict:
      "O ChatGPT, o Gemini e o Perplexity são ótimos para conversar, mas não guardam o planejamento nem o calendário da turma: não sabem quais habilidades da BNCC estão previstas nem o que já foi dado, e a pesquisa documenta alinhamento curricular superficial e fontes inventadas. A Scooli faz o contrário: parte do seu planejamento, mantém o calendário de cada turma, prepara a semana inteira em documentos estruturados no seu modelo e deixa a revisão com o professor.",
    tableTitle: "Lado a lado",
    tableDescription:
      "Não é sobre uma empresa: é sobre o que acontece quando um chat genérico faz o trabalho de preparar o ano letivo.",
    rows: [
      {
        aspect: "BNCC",
        scooli: "Habilidades da BNCC ligadas a cada aula do planejamento",
        competitor: "Depende do que o professor escrever e conferir no pedido, sessão a sessão",
      },
      {
        aspect: "Seu planejamento e calendário",
        scooli: "O planejamento e o calendário de cada turma ficam guardados na Scooli",
        competitor:
          "Não guarda o planejamento nem o calendário da turma: o contexto depende do que o professor contar em cada conversa",
      },
      {
        aspect: "Preparar a semana",
        scooli: "“Gerar semana”: um plano de aula para cada aula do calendário, em um clique",
        competitor: "Uma aula de cada vez, escrita em cada conversa",
      },
      {
        aspect: "Qualidade pedagógica",
        scooli: "Objetivos, sequência e avaliação formativa estruturados em cada documento",
        competitor:
          "Estudo da UMass Amherst (310 planos): só 2–4% das atividades pedem análise ou avaliação; cerca de 45% ficam no nível de “lembrar”",
      },
      {
        aspect: "Fatos inventados",
        scooli: "Documentos gerados a partir de regras curriculares explícitas e revisados pelo professor",
        competitor:
          "Caso documentado: o ChatGPT inventou um livro infantil que não existe ao gerar material “alinhado” a um padrão curricular",
      },
      {
        aspect: "O resultado",
        scooli: "Documentos estruturados no modelo do professor, prontos para exportar para Word e PDF",
        competitor: "Texto de chat para copiar, colar e formatar",
      },
    ],
    reasonsTitle: "Por que escolher a Scooli",
    reasons: [
      {
        title: "Não recomeça do zero",
        description: "O planejamento e o calendário ficam na Scooli, então cada semana nasce do que você planejou.",
      },
      {
        title: "Menos trabalho depois",
        description: "O resultado já vem estruturado e ligado à BNCC, em vez de texto para reformatar e conferir à mão.",
      },
      {
        title: "O professor decide",
        description: "Tudo é editável e a revisão humana faz parte do fluxo, com os dados fora do treino de modelos.",
      },
    ],
    faq: [
      {
        question: "Por que não usar só o ChatGPT para gerar planos de aula?",
        answer:
          "Dá para usar, e muitos professores já usam. A pesquisa mostra que o alinhamento curricular em um chat genérico depende de o professor escrever e conferir tudo, sessão a sessão. Um estudo da UMass Amherst com 310 planos gerados por ChatGPT, Gemini e Copilot concluiu que a maioria das atividades fica no nível mais básico de pensamento.",
      },
      {
        question: "O ChatGPT pode inventar informação em um plano de aula?",
        answer:
          "Sim, está documentado. Um estudo de caso publicado na PLOS ONE mostrou o ChatGPT inventando um livro infantil que não existe ao pedir material de leitura alinhado a um padrão curricular. Isso obriga a conferir cada resultado à mão.",
      },
      {
        question: "Quantos professores brasileiros já usam IA para preparar aulas?",
        answer:
          "Segundo a pesquisa TIC Educação 2024, do Cetic.br, 43% dos professores usavam IA generativa para preparar conteúdos didáticos.",
      },
      {
        question: "Posso continuar usando o ChatGPT para ter ideias?",
        answer:
          "Sim, e os pesquisadores até recomendam isso. A Scooli existe para a etapa seguinte: transformar a ideia em planejamento, aulas e materiais ligados à BNCC, e manter o calendário de cada turma.",
      },
    ],
    ctaTitle: "Experimente a Scooli com as suas turmas",
    ctaDescription: "Veja a diferença entre pedir alinhamento à BNCC e tê-lo desde o primeiro pedido.",
    sources: [...sources.chat, brSourcesExtra.cetic],
  },
};

const content: Record<Locale, Record<ComparisonSlug, ComparisonPageContent>> = {
  "pt-PT": ptPT,
  "pt-BR": ptBR,
  en,
};

export function getComparisonPages(locale: Locale = "pt-PT"): ComparisonPageContent[] {
  return comparisonSlugs.map((slug) => content[locale][slug]);
}

/** `slug` is the internal (Portuguese) slug; other locales' public slugs only exist in the URL (see `i18n/localeSlugs.ts`). */
export function getComparisonPage(slug: string, locale: Locale = "pt-PT"): ComparisonPageContent | undefined {
  return (comparisonSlugs as readonly string[]).includes(slug)
    ? content[locale][slug as ComparisonSlug]
    : undefined;
}
