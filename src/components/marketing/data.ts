import {
  BookOpenCheck,
  Building2,
  FileCheck2,
  FileSearch,
  FileText,
  GraduationCap,
  LibraryBig,
  LockKeyhole,
  MapPinned,
  NotebookPen,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Upload,
  Users,
  WandSparkles,
  type LucideIcon,
} from "lucide-react";
import { PUBLIC_IMPACT_METRICS } from "@/lib/seo";

export type MarketingCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type ToolFaq = {
  question: string;
  answer: string;
};

export type ToolContentSection = {
  title: string;
  description: string;
  bullets?: string[];
};

export type ToolRelatedLink = {
  label: string;
  href: string;
};

export type ToolHowToStep = {
  name: string;
  text: string;
};

export type ToolPageData = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  hero: string;
  useCases: string[];
  outputs: string[];
  benefits: string[];
  contentSections: ToolContentSection[];
  faq: ToolFaq[];
  relatedLinks: ToolRelatedLink[];
  howToSteps: ToolHowToStep[];
  seoKeywords: string[];
};

export const teacherStats = [
  {
    value: "7,4 h/semana",
    label: "em preparação de aulas por docentes a tempo inteiro em Portugal",
    source: "TALIS 2024 · Portugal",
  },
  {
    value: "6,9 h/semana",
    label: "em correção e avaliação do trabalho dos alunos",
    source: "TALIS 2024 · Portugal",
  },
  {
    value: "77%",
    label: "identificam o excesso de correções como fonte de stress",
    source: "TALIS 2024 · Portugal",
  },
];

export const impactStats = [
  {
    value: `${PUBLIC_IMPACT_METRICS.generatedDocuments.minValue}+`,
    label: PUBLIC_IMPACT_METRICS.generatedDocuments.label,
  },
  {
    value: `${PUBLIC_IMPACT_METRICS.weeklyHoursSaved.minValue}h+`,
    label: PUBLIC_IMPACT_METRICS.weeklyHoursSaved.label,
  },
  {
    value: `${PUBLIC_IMPACT_METRICS.adaptedMaterials.minValue}+`,
    label: PUBLIC_IMPACT_METRICS.adaptedMaterials.label,
  },
  {
    value: `${PUBLIC_IMPACT_METRICS.activeTeachers.minValue}+`,
    label: PUBLIC_IMPACT_METRICS.activeTeachers.label,
  },
];

export const trustCards: MarketingCard[] = [
  {
    title: "Professor no controlo",
    description: "A Scooli ajuda a arrancar mais depressa, mas o professor revê, edita e decide sempre o que segue para a aula.",
    icon: ShieldCheck,
  },
  {
    title: "RGPD-ready",
    description: "A plataforma foi pensada para contexto educativo e explica privacidade, revisão humana e boas práticas em linguagem simples.",
    icon: LockKeyhole,
  },
  {
    title: "Sem treino com dados dos utilizadores",
    description: "Os materiais e pedidos feitos na Scooli não são usados para treinar modelos de IA.",
    icon: ShieldCheck,
  },
];

export const teacherPageCards: MarketingCard[] = [
  {
    title: "Preparar a aula com menos atrito",
    description: "Parta de um pedido simples e receba uma base editável para a aula, ficha ou teste que precisa de fechar.",
    icon: NotebookPen,
  },
  {
    title: "Adaptar materiais sem refazer tudo",
    description: "Ajuste dificuldade, linguagem, extensão e formato para turmas diferentes sem partir sempre do zero.",
    icon: SlidersHorizontal,
  },
  {
    title: "Reutilizar boas ideias",
    description: "A biblioteca comunitária ajuda a descobrir materiais que pode duplicar e adaptar ao seu contexto.",
    icon: LibraryBig,
  },
];

export const schoolPageCards: MarketingCard[] = [
  {
    title: "Conversa inicial com contexto",
    description: "Começamos por perceber objetivos, anos, disciplinas e quem vai testar a Scooli na primeira fase.",
    icon: Building2,
  },
  {
    title: "Piloto com equipa pequena",
    description: "O caminho recomendado é testar com um grupo reduzido de docentes antes de alargar a utilização.",
    icon: GraduationCap,
  },
  {
    title: "Adoção responsável desde o início",
    description: "Privacidade, revisão humana e controlo do professor entram logo na conversa, sem ficarem escondidos para mais tarde.",
    icon: ShieldCheck,
  },
];

export const aboutPrinciples: MarketingCard[] = [
  {
    title: "Dar tempo de volta aos professores",
    description: "A prioridade é reduzir o trabalho repetitivo para que sobre mais tempo para ensinar, acompanhar alunos e ajustar o que importa.",
    icon: Sparkles,
  },
  {
    title: "Manter o professor no centro",
    description: "A ferramenta ajuda a produzir materiais e versões, mas a decisão final continua sempre do lado do docente.",
    icon: Users,
  },
  {
    title: "Construir para Portugal",
    description: "A linguagem, os exemplos e o posicionamento são pensados para a realidade das escolas e dos professores em Portugal.",
    icon: MapPinned,
  },
];

export const libraryPageCards = [
  {
    title: "Ficha de trabalho sobre frações",
    meta: "Matemática · 5.º ano · Editável",
    tags: ["Ficha", "45 min", "Duplicar"],
  },
  {
    title: "Planificação semanal de Português",
    meta: "Português · 2.º ciclo · Com objetivos",
    tags: ["Planificação", "Aprendizagens", "Ajustável"],
  },
  {
    title: "Teste diagnóstico de Ciências",
    meta: "Ciências · 6.º ano · Com critérios",
    tags: ["Teste", "Cotação", "Preview"],
  },
  {
    title: "Apresentação sobre o ciclo da água",
    meta: "Estudo do Meio · 1.º ciclo · Apresentação",
    tags: ["Slides", "Explicação", "Adaptar"],
  },
  {
    title: "Quiz rápido de revisão",
    meta: "História · 8.º ano · Quiz",
    tags: ["Revisão", "5 minutos", "Partilhar"],
  },
  {
    title: "Guião de leitura orientada",
    meta: "Português · 7.º ano · Guião",
    tags: ["Leitura", "Apoio", "Biblioteca"],
  },
];

export const toolPages: ToolPageData[] = [
  {
    slug: "gerador-de-testes",
    title: "Gerador de testes com IA para professores",
    shortTitle: "Gerador de testes",
    description: "Cria testes com perguntas diversificadas, cotação e critérios, partindo de um pedido simples ou de um documento teu.",
    hero: "Cria testes estruturados em minutos e ajusta o nível antes de imprimir ou exportar.",
    useCases: ["Teste diagnóstico", "Avaliação intermédia", "Versão adaptada para outra turma"],
    outputs: ["Perguntas de escolha múltipla", "Perguntas de resposta curta", "Critérios de correção"],
    benefits: [
      "Montar um teste completo sem partir de um documento vazio",
      "Misturar tipos de pergunta e critérios de correção no mesmo fluxo",
      "Ajustar dificuldade, extensão e linguagem antes de usar",
    ],
    contentSections: [
      {
        title: "O que pode incluir num teste criado na Scooli",
        description:
          "A ferramenta ajuda-te a chegar mais depressa a uma estrutura equilibrada, pronta para rever e adaptar ao objetivo da avaliação.",
        bullets: [
          "Perguntas de escolha múltipla, resposta curta e desenvolvimento",
          "Cotação por item e critérios de correção visíveis",
          "Versões diferentes para outras turmas ou momentos de avaliação",
        ],
      },
      {
        title: "Quando faz mais diferença usar o gerador de testes",
        description:
          "É especialmente útil quando tens pouco tempo para preparar uma avaliação, mas não queres abdicar de controlo sobre a qualidade final.",
        bullets: [
          "Preparar um teste diagnóstico no arranque de uma unidade",
          "Fechar uma avaliação intermédia sem repetir sempre a mesma estrutura",
          "Adaptar um teste já existente para outro nível ou outra turma",
        ],
      },
    ],
    faq: [
      {
        question: "Posso criar testes com tipos de pergunta diferentes?",
        answer:
          "Sim. Podes pedir perguntas de escolha múltipla, resposta curta, desenvolvimento ou uma combinação adequada ao tipo de avaliação que queres preparar.",
      },
      {
        question: "O teste fica editável antes de imprimir?",
        answer:
          "Sim. A Scooli gera uma base editável para reveres, reorganizares, ajustares a cotação e mudares o texto antes de usares o teste com alunos.",
      },
      {
        question: "Posso adaptar um teste para outra turma?",
        answer:
          "Sim. Podes pedir uma versão mais simples, mais curta ou com outro nível de dificuldade sem reconstruir tudo de novo.",
      },
    ],
    relatedLinks: [
      { label: "Ver fichas de trabalho", href: "/ferramentas/fichas-de-trabalho" },
      { label: "Transformar documentos teus", href: "/ferramentas/carregar-documentos" },
      { label: "Explorar o percurso para professores", href: "/professores" },
    ],
    howToSteps: [
      {
        name: "Indicar o tema e o ano",
        text: "Define o conteúdo, o ano e o tipo de avaliação que queres preparar.",
      },
      {
        name: "Pedir a estrutura do teste",
        text: "Escolhe o formato das perguntas, a dificuldade e o comprimento pretendido.",
      },
      {
        name: "Gerar com IA",
        text: "Recebe um teste com perguntas, cotação e critérios de correção numa base editável.",
      },
      {
        name: "Rever e exportar",
        text: "Ajusta o que precisares e exporta o teste quando estiver pronto a usar.",
      },
    ],
    seoKeywords: [
      "gerador de testes com IA",
      "criar testes com IA",
      "fazer testes para alunos",
      "testes para imprimir",
      "perguntas de escolha múltipla",
      "critérios de correção",
      "testes para professores",
    ],
  },
  {
    slug: "fichas-de-trabalho",
    title: "Gerador de fichas de trabalho com IA para professores",
    shortTitle: "Fichas de trabalho",
    description: "Cria fichas de trabalho com exercícios, instruções claras e versões por nível para rever, imprimir e adaptar à turma.",
    hero: "Cria fichas de trabalho em minutos e adapta-as à turma antes de imprimir.",
    useCases: ["Consolidação", "Trabalho de casa", "Apoio a diferentes ritmos"],
    outputs: ["Exercícios diferenciados", "Instruções claras", "Versões por nível"],
    benefits: [
      "Ganhar tempo na estrutura, nos exercícios e na organização da ficha",
      "Gerar versões mais simples ou mais exigentes sem refazer o documento",
      "Ficar com uma ficha editável pronta para imprimir, exportar ou adaptar",
    ],
    contentSections: [
      {
        title: "O que pode sair numa ficha de trabalho criada na Scooli",
        description:
          "A Scooli ajuda-te a montar fichas de trabalho com estrutura clara, linguagem ajustada e exercícios pensados para serem usados logo depois de uma revisão rápida.",
        bullets: [
          "Instruções simples e fáceis de seguir",
          "Exercícios alinhados com o objetivo da aula",
          "Espaço para resposta e organização visual limpa",
        ],
      },
      {
        title: "Como adaptar fichas de trabalho a ritmos diferentes",
        description:
          "Quando precisas de diferenciar trabalho para a turma, podes partir de uma base comum e pedir versões com outra dificuldade, extensão ou apoio adicional.",
        bullets: [
          "Versão mais simples com linguagem mais acessível",
          "Versão mais curta para apoio ou reforço",
          "Versão com mais desafio para alunos que avançam mais depressa",
        ],
      },
    ],
    faq: [
      {
        question: "Posso criar fichas de trabalho prontas a imprimir?",
        answer:
          "Sim. A Scooli gera uma ficha organizada e editável, que podes rever, ajustar e depois imprimir ou exportar no formato que precisares.",
      },
      {
        question: "Posso criar versões diferentes da mesma ficha?",
        answer:
          "Sim. Podes partir da mesma base e pedir versões por nível, linguagem mais simples, menos itens ou mais apoio para a turma que tens à frente.",
      },
      {
        question: "Posso usar um texto ou documento meu para gerar a ficha?",
        answer:
          "Sim. Se já tens um texto, uma ficha antiga ou outro material, podes usá-lo como base e transformar esse conteúdo numa nova ficha de trabalho.",
      },
    ],
    relatedLinks: [
      { label: "Adaptar materiais por nível", href: "/ferramentas/adaptacao-de-materiais" },
      { label: "Partir de um documento teu", href: "/ferramentas/carregar-documentos" },
      { label: "Explorar a biblioteca comunitária", href: "/biblioteca" },
    ],
    howToSteps: [
      {
        name: "Descrever a ficha que precisas",
        text: "Indica o tema, o ano, o objetivo da aula e o tipo de exercício que queres incluir.",
      },
      {
        name: "Gerar a ficha de trabalho",
        text: "Recebe uma ficha com instruções, exercícios e uma estrutura pronta para rever.",
      },
      {
        name: "Adaptar à tua turma",
        text: "Pede versões mais simples, mais curtas ou com apoio adicional sem refazer tudo.",
      },
      {
        name: "Rever, imprimir ou exportar",
        text: "Faz os últimos ajustes e leva a ficha para a aula no formato que preferires.",
      },
    ],
    seoKeywords: [
      "gerador de fichas de trabalho",
      "fichas de trabalho com IA",
      "criar fichas de trabalho",
      "fichas para imprimir",
      "fichas de trabalho para professores",
      "fichas diferenciadas",
      "exercícios para imprimir",
    ],
  },
  {
    slug: "planificacoes",
    title: "Planificações com IA para preparar aulas com mais rapidez",
    shortTitle: "Planificações",
    description: "Organiza objetivos, sequência da aula, materiais e avaliação num documento claro e editável.",
    hero: "Passa de uma ideia solta para uma planificação editável em poucos minutos.",
    useCases: ["Aula individual", "Sequência semanal", "Preparação de unidade"],
    outputs: ["Objetivos e competências", "Sequência da aula", "Avaliação e materiais"],
    benefits: [
      "Organizar a aula com objetivos, etapas e avaliação no mesmo documento",
      "Chegar mais depressa a uma planificação clara e editável",
      "Ajustar a estrutura à turma, ao tempo disponível e ao teu estilo de trabalho",
    ],
    contentSections: [
      {
        title: "O que inclui uma planificação criada na Scooli",
        description:
          "A base gerada ajuda-te a estruturar o essencial da aula para que passes mais tempo a melhorar decisões pedagógicas e menos tempo a montar o documento.",
        bullets: [
          "Objetivos, competências e sequência das atividades",
          "Materiais e momentos de avaliação no mesmo plano",
          "Organização pensada para rever e adaptar rapidamente",
        ],
      },
      {
        title: "Quando usar planificações com IA faz mais sentido",
        description:
          "A ferramenta é útil tanto para preparar uma aula isolada como para organizar uma semana ou unidade quando o tempo de preparação está apertado.",
        bullets: [
          "Planificar uma aula de raiz mais depressa",
          "Fechar uma sequência semanal com coerência entre aulas",
          "Preparar uma unidade com objetivos e avaliação alinhados",
        ],
      },
    ],
    faq: [
      {
        question: "A Scooli ajuda a criar planificações completas?",
        answer:
          "Sim. Podes gerar uma base com objetivos, sequência da aula, materiais e momentos de avaliação para depois ajustares ao teu contexto.",
      },
      {
        question: "Posso adaptar a planificação ao tempo disponível?",
        answer:
          "Sim. Podes pedir uma versão mais curta, reorganizar etapas ou adaptar o ritmo da aula antes de a usares.",
      },
      {
        question: "As planificações ficam editáveis?",
        answer:
          "Sim. O resultado é sempre editável, para poderes rever linguagem, atividades, objetivos e materiais antes de levar a aula para a sala.",
      },
    ],
    relatedLinks: [
      { label: "Gerar fichas de trabalho", href: "/ferramentas/fichas-de-trabalho" },
      { label: "Criar apresentações para a aula", href: "/ferramentas/apresentacoes" },
      { label: "Ver o percurso para professores", href: "/professores" },
    ],
    howToSteps: [
      {
        name: "Definir o tema da aula",
        text: "Indica o ano, o tema e o objetivo principal da aula ou da sequência que queres planificar.",
      },
      {
        name: "Escolher o formato",
        text: "Pede uma planificação para uma aula, uma semana ou uma unidade, consoante o que precisas.",
      },
      {
        name: "Gerar a estrutura da planificação",
        text: "Recebe um documento com objetivos, etapas, materiais e avaliação.",
      },
      {
        name: "Afinar antes de usar",
        text: "Edita o plano, ajusta o tempo e exporta quando estiver alinhado com a tua aula.",
      },
    ],
    seoKeywords: [
      "planificações com IA",
      "gerador de planificações",
      "planificação de aulas",
      "criar planificações",
      "preparar aulas com IA",
      "objetivos e avaliação",
      "planificar aulas",
    ],
  },
  {
    slug: "quizzes",
    title: "Quizzes com IA para revisão e participação em aula",
    shortTitle: "Quizzes",
    description: "Cria quizzes rápidos para rever conteúdos, testar compreensão e dinamizar o ritmo da aula.",
    hero: "Prepara quizzes rápidos para rever matéria sem perder tempo na montagem.",
    useCases: ["Revisão no fim da aula", "Aquecimento", "Diagnóstico rápido"],
    outputs: ["Perguntas rápidas", "Escolha múltipla", "Versão curta"],
    benefits: [
      "Preparar momentos curtos de revisão sem perder tempo a montar perguntas",
      "Dinamizar a participação da turma com um formato rápido e simples",
      "Ajustar o nível e o número de itens conforme o tempo da aula",
    ],
    contentSections: [
      {
        title: "Como usar quizzes na rotina da aula",
        description:
          "Os quizzes funcionam bem em momentos curtos, quando queres verificar compreensão, rever matéria ou arrancar a aula com foco.",
        bullets: [
          "Revisão rápida no fim da aula",
          "Aquecimento no início da sessão seguinte",
          "Diagnóstico simples antes de avançar para novo conteúdo",
        ],
      },
      {
        title: "O que consegues ajustar num quiz gerado pela Scooli",
        description:
          "A base pode ser afinada ao tempo que tens, ao ritmo da turma e ao tipo de resposta que queres pedir aos alunos.",
        bullets: [
          "Número de perguntas e tempo total",
          "Perguntas mais simples ou mais desafiantes",
          "Formato curto para uso imediato em aula",
        ],
      },
    ],
    faq: [
      {
        question: "Os quizzes servem para revisão rápida em aula?",
        answer:
          "Sim. A Scooli ajuda a gerar quizzes curtos, fáceis de ajustar ao tempo disponível e adequados a momentos de revisão ou diagnóstico.",
      },
      {
        question: "Posso alterar o número de perguntas?",
        answer:
          "Sim. Podes pedir um quiz mais curto, aumentar o número de itens ou adaptar o formato consoante a dinâmica da aula.",
      },
      {
        question: "Os quizzes ficam editáveis?",
        answer:
          "Sim. O conteúdo pode ser revisto e ajustado antes de o usares com a turma.",
      },
    ],
    relatedLinks: [
      { label: "Criar testes completos", href: "/ferramentas/gerador-de-testes" },
      { label: "Ver apresentações para a aula", href: "/ferramentas/apresentacoes" },
      { label: "Explorar recursos na biblioteca", href: "/biblioteca" },
    ],
    howToSteps: [
      {
        name: "Escolher o tema a rever",
        text: "Indica o conteúdo, o ano e o momento da aula em que queres usar o quiz.",
      },
      {
        name: "Definir o formato do quiz",
        text: "Pede um conjunto curto de perguntas adequado ao tempo disponível.",
      },
      {
        name: "Gerar com IA",
        text: "Recebe um quiz com perguntas prontas para rever e ajustar.",
      },
      {
        name: "Editar e usar em aula",
        text: "Afina o nível, muda o número de itens e usa o quiz quando estiver alinhado com a turma.",
      },
    ],
    seoKeywords: [
      "quizzes com IA",
      "gerador de quizzes",
      "quiz para aula",
      "quiz educativo",
      "revisão rápida em aula",
      "perguntas para revisão",
      "quizzes para professores",
    ],
  },
  {
    slug: "apresentacoes",
    title: "Apresentações com IA para introduzir e explicar conteúdos",
    shortTitle: "Apresentações",
    description: "Estrutura apresentações com tópicos, exemplos e ritmo de aula, prontas para afinar e completar.",
    hero: "Monta a base de uma apresentação em minutos e refina apenas o essencial.",
    useCases: ["Introdução de tema", "Aula expositiva", "Síntese de unidade"],
    outputs: ["Estrutura de slides", "Tópicos principais", "Exemplos visuais"],
    benefits: [
      "Organizar slides e tópicos principais sem perder tempo na estrutura inicial",
      "Chegar mais depressa a uma apresentação coerente com o ritmo da aula",
      "Editar exemplos, linguagem e ordem dos slides antes de apresentar",
    ],
    contentSections: [
      {
        title: "O que pode incluir uma apresentação criada na Scooli",
        description:
          "A ferramenta ajuda-te a estruturar a sequência da explicação para que tenhas uma base clara antes de afinar conteúdo, exemplos e tom da aula.",
        bullets: [
          "Tópicos principais por slide",
          "Exemplos para apoiar a explicação",
          "Ritmo de apresentação pensado para contexto de sala de aula",
        ],
      },
      {
        title: "Quando faz sentido usar apresentações com IA",
        description:
          "Funciona bem quando precisas de introduzir um tema, apoiar uma aula expositiva ou fechar uma unidade com uma síntese clara.",
        bullets: [
          "Introdução de conteúdos novos",
          "Aula expositiva com sequência já organizada",
          "Síntese final antes de revisão ou avaliação",
        ],
      },
    ],
    faq: [
      {
        question: "A Scooli ajuda a criar a estrutura dos slides?",
        answer:
          "Sim. Podes gerar uma base com tópicos, sequência lógica e exemplos para depois afinares a apresentação ao teu estilo de aula.",
      },
      {
        question: "Posso adaptar a linguagem da apresentação?",
        answer:
          "Sim. Podes simplificar texto, mudar o foco dos slides ou reorganizar a explicação antes de usares a apresentação.",
      },
      {
        question: "As apresentações ficam prontas a completar?",
        answer:
          "Sim. Recebes uma base organizada para editares, acrescentares o que fizer falta e usares como apoio em aula.",
      },
    ],
    relatedLinks: [
      { label: "Criar planificações para a mesma aula", href: "/ferramentas/planificacoes" },
      { label: "Gerar quizzes de revisão", href: "/ferramentas/quizzes" },
      { label: "Ver o percurso para professores", href: "/professores" },
    ],
    howToSteps: [
      {
        name: "Definir o tema e o ano",
        text: "Indica o conteúdo, o ano e o objetivo da apresentação que queres preparar.",
      },
      {
        name: "Pedir a estrutura dos slides",
        text: "Escolhe o foco da aula e o tipo de explicação que precisas de montar.",
      },
      {
        name: "Gerar a apresentação",
        text: "Recebe uma sequência de slides com tópicos e exemplos base.",
      },
      {
        name: "Afinar antes da aula",
        text: "Edita linguagem, ordem e exemplos para deixares a apresentação pronta a usar.",
      },
    ],
    seoKeywords: [
      "apresentações com IA",
      "gerador de apresentações",
      "slides para aulas",
      "criar apresentações para aulas",
      "apresentação escolar",
      "slides educativos",
      "apresentações para professores",
    ],
  },
  {
    slug: "adaptacao-de-materiais",
    title: "Adaptação de materiais com IA para níveis diferentes",
    shortTitle: "Adaptação de materiais",
    description: "Parte de um material base e gera versões mais simples, mais curtas ou com apoio adicional sem refazer o trabalho.",
    hero: "Adapta um material à turma certa sem começar tudo de novo.",
    useCases: ["Simplificar linguagem", "Reduzir extensão", "Criar apoio adicional"],
    outputs: ["Versão simplificada", "Versão resumida", "Apoio adicional"],
    benefits: [
      "Diferenciar materiais sem duplicar o tempo de preparação",
      "Gerar versões mais simples, mais curtas ou com apoio adicional",
      "Manter uma base comum e adaptá-la a ritmos diferentes",
    ],
    contentSections: [
      {
        title: "Como a adaptação de materiais ajuda no dia a dia",
        description:
          "Quando tens turmas com ritmos diferentes, esta ferramenta permite ajustar o mesmo material com menos esforço manual e mais consistência entre versões.",
        bullets: [
          "Simplificar linguagem sem perder o objetivo do exercício",
          "Reduzir extensão para apoio ou reforço",
          "Adicionar pistas e mediação quando a turma precisa",
        ],
      },
      {
        title: "Que tipo de versões podes criar",
        description:
          "A Scooli ajuda-te a partir de um material base e a gerar novas versões para contextos diferentes, mantendo o professor no controlo do resultado final.",
        bullets: [
          "Versão simplificada",
          "Versão mais curta ou resumida",
          "Versão com apoio adicional e instruções mais guiadas",
        ],
      },
    ],
    faq: [
      {
        question: "Posso adaptar um material para alunos com ritmos diferentes?",
        answer:
          "Sim. Podes gerar versões mais simples, mais curtas ou com mais apoio a partir do mesmo material base.",
      },
      {
        question: "A adaptação mantém o conteúdo principal?",
        answer:
          "Essa é a ideia. A Scooli ajuda a preservar o objetivo do material enquanto ajusta linguagem, extensão ou apoio conforme a necessidade.",
      },
      {
        question: "Posso rever tudo antes de usar?",
        answer:
          "Sim. O professor revê, edita e decide sempre a versão final antes de a levar para a aula.",
      },
    ],
    relatedLinks: [
      { label: "Criar fichas de trabalho", href: "/ferramentas/fichas-de-trabalho" },
      { label: "Partir de um documento teu", href: "/ferramentas/carregar-documentos" },
      { label: "Ler a página de confiança", href: "/confianca" },
    ],
    howToSteps: [
      {
        name: "Escolher o material base",
        text: "Parte de um exercício, ficha, texto ou documento que já tens preparado.",
      },
      {
        name: "Indicar o tipo de adaptação",
        text: "Pede simplificação, redução, apoio adicional ou outra mudança adequada à turma.",
      },
      {
        name: "Gerar a nova versão",
        text: "Recebe uma versão adaptada com a mesma base, mas ajustada ao nível pretendido.",
      },
      {
        name: "Rever antes de usar",
        text: "Confirma a linguagem, os objetivos e o formato final antes de aplicar o material em aula.",
      },
    ],
    seoKeywords: [
      "adaptação de materiais com IA",
      "adaptar materiais para alunos",
      "diferenciação pedagógica",
      "simplificar textos escolares",
      "adaptar fichas por nível",
      "materiais adaptados",
      "apoio adicional em materiais",
    ],
  },
  {
    slug: "carregar-documentos",
    title: "Carregar documentos e transformar materiais com IA",
    shortTitle: "Carregar documentos",
    description: "Parte de um documento teu e transforma-o em fichas, testes ou versões adaptadas com menos trabalho manual.",
    hero: "Usa documentos que já tens e transforma-os em novos recursos mais depressa.",
    useCases: ["Aproveitar materiais antigos", "Adaptar um teste", "Criar ficha a partir de texto"],
    outputs: ["Ficha a partir de documento", "Teste a partir de texto", "Nova versão adaptada"],
    benefits: [
      "Aproveitar materiais antigos sem copiar e colar tudo de novo",
      "Transformar um documento base em ficha, teste ou nova versão adaptada",
      "Reduzir trabalho manual quando já tens conteúdo preparado",
    ],
    contentSections: [
      {
        title: "Quando vale a pena começar por um documento teu",
        description:
          "Se já tens textos, fichas antigas, testes ou materiais próprios, esta ferramenta ajuda-te a reutilizar esse trabalho em vez de começares de novo.",
        bullets: [
          "Aproveitar uma ficha antiga como base",
          "Transformar um texto num novo conjunto de exercícios",
          "Adaptar um teste que já usaste noutro ano ou turma",
        ],
      },
      {
        title: "O que podes gerar a partir de um documento",
        description:
          "A Scooli lê o teu ponto de partida e ajuda-te a transformá-lo num novo recurso, mantendo o processo mais rápido e controlado.",
        bullets: [
          "Ficha de trabalho a partir de texto",
          "Teste a partir de material já existente",
          "Nova versão adaptada para outro contexto",
        ],
      },
    ],
    faq: [
      {
        question: "Posso usar materiais que já preparei?",
        answer:
          "Sim. Esta ferramenta existe precisamente para te ajudar a aproveitar documentos teus e transformá-los em novos recursos com menos trabalho manual.",
      },
      {
        question: "Que tipo de recurso posso gerar a partir de um documento?",
        answer:
          "Podes transformar um documento numa ficha de trabalho, num teste ou numa versão adaptada do material original.",
      },
      {
        question: "O resultado final continua editável?",
        answer:
          "Sim. Mesmo quando partes de um documento teu, a nova versão continua editável para reveres tudo antes de usar.",
      },
    ],
    relatedLinks: [
      { label: "Gerar fichas de trabalho", href: "/ferramentas/fichas-de-trabalho" },
      { label: "Adaptar materiais por nível", href: "/ferramentas/adaptacao-de-materiais" },
      { label: "Explorar todas as ferramentas", href: "/ferramentas" },
    ],
    howToSteps: [
      {
        name: "Escolher o documento base",
        text: "Parte de um material teu que queiras reaproveitar ou transformar.",
      },
      {
        name: "Indicar o novo formato",
        text: "Explica se queres gerar uma ficha, um teste ou uma versão adaptada do conteúdo.",
      },
      {
        name: "Gerar com IA",
        text: "Recebe um novo recurso construído a partir do documento que carregaste.",
      },
      {
        name: "Editar e validar",
        text: "Revê a nova versão, faz ajustes e usa o material quando estiver pronto.",
      },
    ],
    seoKeywords: [
      "carregar documentos com IA",
      "transformar documentos em fichas",
      "usar material próprio com IA",
      "adaptar documento do professor",
      "gerar ficha a partir de texto",
      "gerar teste a partir de documento",
      "reutilizar materiais escolares",
    ],
  },
];

export const toolCardIcons: Record<string, LucideIcon> = {
  "gerador-de-testes": FileCheck2,
  "fichas-de-trabalho": FileText,
  planificacoes: NotebookPen,
  quizzes: BookOpenCheck,
  apresentacoes: FileSearch,
  "adaptacao-de-materiais": WandSparkles,
  "carregar-documentos": Upload,
};
