import {
  BookOpenCheck,
  Building2,
  CalendarDays,
  FileCheck2,
  FileSearch,
  FileText,
  GraduationCap,
  LibraryBig,
  ListOrdered,
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
  layout?: "planning" | "assessment";
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
    slug: "planificacoes",
    title: "Planificações com IA alinhadas com as Aprendizagens Essenciais",
    shortTitle: "Planificações",
    description: "Crie planificações de unidades, períodos e anos com as Aprendizagens Essenciais e o DL 55/2018 integrados desde o início.",
    hero: "O início do ano letivo que custava dias inteiros de planificação — agora demora minutos.",
    useCases: ["Planificação anual", "Planificação de unidade didática", "Planificação por período"],
    outputs: ["Sequência de aulas com descritores AE", "Referência ao DL 55/2018 e flexibilidade curricular", "Instrumentos e momentos de avaliação"],
    benefits: [
      "Ter as AE e descritores do Perfil do Aluno referenciados sem procurar manualmente",
      "Gerar uma planificação completa de unidade em minutos, não em horas",
      "Ajustar objetivos, sequência e avaliação antes de entregar",
    ],
    contentSections: [
      {
        title: "O que inclui uma planificação criada na Scooli",
        description: "A base gerada parte das Aprendizagens Essenciais e do DL 55/2018 para que não tenha de os procurar por conta própria antes de começar.",
        bullets: [
          "AE e descritores do Perfil do Aluno referenciados e contextualizados",
          "Sequência de aulas com objetivos encadeados",
          "Momentos de avaliação formativa e sumativa distribuídos ao longo da unidade",
        ],
      },
      {
        title: "Como a Scooli apoia a flexibilidade curricular",
        description: "O DL 55/2018 introduziu a possibilidade de adaptar a sequência e os recursos curriculares. A Scooli ajuda a documentar essas opções de forma clara e editável.",
        bullets: [
          "Documentar opções de gestão curricular em linha com o DL 55/2018",
          "Ajustar a sequência de conteúdos ao contexto da turma",
          "Gerar alternativas quando o plano muda a meio do período",
        ],
      },
    ],
    faq: [
      {
        question: "As planificações incluem as Aprendizagens Essenciais referenciadas?",
        answer: "Sim. A Scooli integra as AE e os descritores do Perfil do Aluno para que não tenha de os consultar separadamente. O resultado é editável para ajustar ao seu contexto.",
      },
      {
        question: "A Scooli conhece o DL 55/2018 e a flexibilidade curricular?",
        answer: "Sim. O DL 55/2018 é um dos documentos que a Scooli tem em conta para ajudar a documentar opções de gestão curricular de forma alinhada com a legislação vigente.",
      },
      {
        question: "Posso gerar uma planificação anual completa?",
        answer: "Sim. Pode pedir uma planificação anual, por período ou de unidade — a Scooli gera a estrutura e os objetivos, que ficam editáveis para afinar ao seu contexto.",
      },
    ],
    relatedLinks: [
      { label: "Ver planos letivos", href: "/ferramentas/sequencias-de-aulas" },
      { label: "Criar planos de aula", href: "/ferramentas/plano-de-aula" },
      { label: "Gerar fichas de trabalho", href: "/ferramentas/fichas-de-trabalho" },
    ],
    howToSteps: [
      {
        name: "Definir o âmbito",
        text: "Indica a disciplina, o ano, o período ou a unidade que quer planificar.",
      },
      {
        name: "Indicar o contexto da turma",
        text: "Partilha informação relevante sobre o grupo — ritmo, necessidades específicas ou prioridades curriculares.",
      },
      {
        name: "Gerar a planificação",
        text: "Recebe uma planificação com objetivos, AE referenciadas, sequência e avaliação integrada.",
      },
      {
        name: "Afinar e entregar",
        text: "Edita a planificação, ajusta o que precisar e exporta quando estiver pronta a usar.",
      },
    ],
    seoKeywords: [
      "planificações com IA",
      "planificação anual com IA",
      "planificação AE professores",
      "DL 55/2018 planificação",
      "planificação por período",
      "planificação unidade didática",
      "preparar planificações Portugal",
    ],
    layout: "planning",
  },
  {
    slug: "plano-de-aula",
    title: "Plano de aula com IA para professores — preparação em minutos",
    shortTitle: "Plano de aula",
    description: "Gere um plano de aula com objetivos, sequência de atividades, materiais e avaliação — tudo editável e pronto a usar.",
    hero: "Prepare uma aula completa em minutos e afine antes de entrar na sala.",
    useCases: ["Aula nova de raiz", "Adaptar para outra turma", "Substituição de última hora"],
    outputs: ["Objetivos e competências", "Sequência de atividades com duração", "Materiais e avaliação formativa"],
    benefits: [
      "Ter a estrutura completa de uma aula sem partir de um documento vazio",
      "Adaptar o mesmo plano para turmas com ritmos diferentes",
      "Editar objetivos, atividades e materiais antes de usar na sala",
    ],
    contentSections: [
      {
        title: "O que inclui um plano de aula gerado na Scooli",
        description: "A base cobre os elementos essenciais de um plano de 45 a 90 minutos, para que passe mais tempo a afinar decisões pedagógicas e menos a montar o documento.",
        bullets: [
          "Objetivo da aula alinhado com as Aprendizagens Essenciais",
          "Sequência de atividades com duração estimada por momento",
          "Materiais, recursos necessários e momento de avaliação formativa",
        ],
      },
      {
        title: "Quando o plano de aula faz mais diferença",
        description: "É útil tanto quando está a preparar uma aula nova como quando precisa de adaptar um plano já existente para uma turma diferente ou uma aula mais curta.",
        bullets: [
          "Preparar uma aula de raiz para uma turma nova",
          "Adaptar rapidamente para turma com necessidades educativas diferentes",
          "Fechar a preparação de última hora com uma base sólida",
        ],
      },
    ],
    faq: [
      {
        question: "O plano de aula inclui os objetivos alinhados com as AE?",
        answer: "Sim. A Scooli parte das Aprendizagens Essenciais da disciplina e ano que indicar para gerar objetivos contextualizados ao que está a ensinar.",
      },
      {
        question: "Posso adaptar o plano para uma aula mais curta ou mais longa?",
        answer: "Sim. Pode pedir uma versão de 45, 50 ou 90 minutos e a Scooli ajusta a sequência de atividades ao tempo disponível.",
      },
      {
        question: "O plano fica editável antes de usar?",
        answer: "Sim. Recebe um documento editável para rever objetivos, atividades, materiais e tempo antes de levar a aula para a sala.",
      },
    ],
    relatedLinks: [
      { label: "Ver planificações de unidade", href: "/ferramentas/planificacoes" },
      { label: "Ver planos letivos", href: "/ferramentas/sequencias-de-aulas" },
      { label: "Gerar fichas de trabalho", href: "/ferramentas/fichas-de-trabalho" },
    ],
    howToSteps: [
      {
        name: "Indicar o tema e o ano",
        text: "Define o conteúdo, a disciplina, o ano e a duração da aula que quer preparar.",
      },
      {
        name: "Escolher o foco da aula",
        text: "Indica se é uma aula de introdução, prática, revisão ou avaliação.",
      },
      {
        name: "Gerar o plano de aula",
        text: "Recebe um plano com objetivos, atividades, materiais e avaliação numa base editável.",
      },
      {
        name: "Afinar e usar",
        text: "Edita o que precisar e leva o plano para a sala quando estiver alinhado com a aula.",
      },
    ],
    seoKeywords: [
      "plano de aula com IA",
      "criar plano de aula",
      "planear aula professores",
      "plano de aula editável",
      "preparar aula com IA",
      "objetivos de aula AE",
      "plano de aula Portugal",
    ],
    layout: "planning",
  },
  {
    slug: "sequencias-de-aulas",
    title: "Planos letivos com IA — organize o ano letivo sessão a sessão",
    shortTitle: "Planos letivos",
    description: "Defina a disciplina, o período e o horário. A Scooli distribui as aulas pelo calendário — com o tópico de cada sessão sugerido — e gera o plano de aula quando precisar.",
    hero: "Distribua os tópicos pelas aulas do período — e gere o plano de cada sessão quando chegar a hora.",
    useCases: ["Organizar o período completo", "Distribuir o programa pelo ano", "Preparar a estrutura antes de começar"],
    outputs: ["Aulas distribuídas pelo horário com tópico por sessão", "Distribuição do programa no tempo", "Plano de aula gerado a partir de qualquer sessão"],
    benefits: [
      "Ver a distribuição do programa ao longo do período num só lugar",
      "Gerar o plano de aula de qualquer sessão a partir da estrutura já definida",
      "Reorganizar rapidamente quando uma aula é perdida ou o ritmo da turma muda",
    ],
    contentSections: [
      {
        title: "Como a Scooli distribui as aulas pelo período",
        description: "A Scooli usa o horário semanal e as datas de início e fim do período para preencher automaticamente as aulas. Em cada sessão, sugere o tópico a abordar com base nas AE e no programa.",
        bullets: [
          "Aulas criadas automaticamente a partir do horário semanal e das datas",
          "Tópico de cada sessão sugerido com base nas Aprendizagens Essenciais",
          "Visualização do período completo num só ecrã",
        ],
      },
      {
        title: "Gerar o plano de aula de qualquer sessão",
        description: "Quando chegar o momento de preparar uma aula, parte diretamente dessa sessão no plano letivo e gera o plano de aula — já com o tópico e o contexto definidos, sem ter de repetir a informação.",
        bullets: [
          "Plano de aula gerado a partir da sessão, com o contexto já preenchido",
          "Possibilidade de gerar ficha, quiz ou apresentação para a mesma sessão",
          "A geração é sempre uma ação do professor — a Scooli não gera automaticamente",
        ],
      },
    ],
    faq: [
      {
        question: "O plano letivo cria os planos de aula automaticamente?",
        answer: "Não. O plano letivo organiza as aulas com os tópicos de cada sessão. A partir de qualquer aula pode gerar o plano individual quando precisar — a geração é sempre uma decisão do professor.",
      },
      {
        question: "Existe um limite de aulas ou de período?",
        answer: "Não. O plano letivo escala do bloco de uma semana ao ano letivo completo. A Scooli preenche as aulas com base no horário e nas datas definidas, sem limite de sessões.",
      },
      {
        question: "Posso reorganizar os tópicos a meio do período?",
        answer: "Sim. As aulas e os tópicos são editáveis a qualquer momento. Se uma sessão for perdida ou a turma precisar de mais tempo num tema, pode reorganizar sem perder o resto da estrutura.",
      },
    ],
    relatedLinks: [
      { label: "Ver planificações por unidade", href: "/ferramentas/planificacoes" },
      { label: "Criar plano de aula individual", href: "/ferramentas/plano-de-aula" },
      { label: "Ver percurso para professores", href: "/professores" },
    ],
    howToSteps: [
      {
        name: "Indicar a disciplina e o período",
        text: "Define a disciplina, o ano, a data de início e fim e o horário semanal.",
      },
      {
        name: "Rever as aulas distribuídas",
        text: "A Scooli distribui as aulas pelo período com um tópico sugerido em cada sessão. Ajusta conforme o programa.",
      },
      {
        name: "Gerar planos de aula à medida",
        text: "Quando precisar, parte de qualquer sessão e gera o plano de aula com o contexto já preenchido.",
      },
      {
        name: "Adaptar quando o plano muda",
        text: "Se uma aula for perdida ou a turma mudar de ritmo, reorganiza as sessões sem recomeçar do zero.",
      },
    ],
    seoKeywords: [
      "planos letivos com IA",
      "organizar aulas por período",
      "distribuição do programa escolar",
      "plano letivo IA professores",
      "plano letivo por horário",
      "planear ano letivo",
      "planeamento letivo Portugal",
    ],
    layout: "planning",
  },
  {
    slug: "gerador-de-testes",
    title: "Gerador de testes com IA para professores",
    shortTitle: "Gerador de testes",
    description: "Crie testes com perguntas diversificadas, cotação e critérios, partindo de um pedido simples ou de um documento seu.",
    hero: "Crie testes estruturados em minutos e ajuste o nível antes de imprimir ou exportar.",
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
          "A ferramenta ajuda a chegar mais depressa a uma estrutura equilibrada, pronta para rever e adaptar ao objetivo da avaliação.",
        bullets: [
          "Perguntas de escolha múltipla, resposta curta e desenvolvimento",
          "Cotação por item e critérios de correção visíveis",
          "Versões diferentes para outras turmas ou momentos de avaliação",
        ],
      },
      {
        title: "Quando faz mais diferença usar o gerador de testes",
        description:
          "É especialmente útil quando há pouco tempo para preparar uma avaliação, mas não se quer abdicar de controlo sobre a qualidade final.",
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
          "Sim. Pode pedir perguntas de escolha múltipla, resposta curta, desenvolvimento ou uma combinação adequada ao tipo de avaliação que quer preparar.",
      },
      {
        question: "O teste fica editável antes de imprimir?",
        answer:
          "Sim. A Scooli gera uma base editável para rever, reorganizar, ajustar a cotação e mudar o texto antes de usar o teste com alunos.",
      },
      {
        question: "Posso adaptar um teste para outra turma?",
        answer:
          "Sim. Pode pedir uma versão mais simples, mais curta ou com outro nível de dificuldade sem reconstruir tudo de novo.",
      },
    ],
    relatedLinks: [
      { label: "Ver fichas de trabalho", href: "/ferramentas/fichas-de-trabalho" },
      { label: "Transformar documentos seus", href: "/ferramentas/carregar-documentos" },
      { label: "Explorar o percurso para professores", href: "/professores" },
    ],
    howToSteps: [
      {
        name: "Indicar o tema e o ano",
        text: "Define o conteúdo, o ano e o tipo de avaliação que quer preparar.",
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
        text: "Ajusta o que precisar e exporta o teste quando estiver pronto a usar.",
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
    layout: "assessment",
  },
  {
    slug: "fichas-de-trabalho",
    title: "Gerador de fichas de trabalho com IA para professores",
    shortTitle: "Fichas de trabalho",
    description: "Crie fichas de trabalho com exercícios, instruções claras e versões por nível para rever, imprimir e adaptar à turma.",
    hero: "Crie fichas de trabalho em minutos e adapte-as à turma antes de imprimir.",
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
          "A Scooli ajuda a montar fichas de trabalho com estrutura clara, linguagem ajustada e exercícios pensados para serem usados logo depois de uma revisão rápida.",
        bullets: [
          "Instruções simples e fáceis de seguir",
          "Exercícios alinhados com o objetivo da aula",
          "Espaço para resposta e organização visual limpa",
        ],
      },
      {
        title: "Como adaptar fichas de trabalho a ritmos diferentes",
        description:
          "Quando é preciso diferenciar trabalho para a turma, pode partir de uma base comum e pedir versões com outra dificuldade, extensão ou apoio adicional.",
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
          "Sim. A Scooli gera uma ficha organizada e editável, que pode rever, ajustar e depois imprimir ou exportar no formato que precisar.",
      },
      {
        question: "Posso criar versões diferentes da mesma ficha?",
        answer:
          "Sim. Pode partir da mesma base e pedir versões por nível, linguagem mais simples, menos itens ou mais apoio para a turma que tem à frente.",
      },
      {
        question: "Posso usar um texto ou documento meu para gerar a ficha?",
        answer:
          "Sim. Se já tem um texto, uma ficha antiga ou outro material, pode usá-lo como base e transformar esse conteúdo numa nova ficha de trabalho.",
      },
    ],
    relatedLinks: [
      { label: "Adaptar materiais por nível", href: "/ferramentas/adaptacao-de-materiais" },
      { label: "Partir de um documento seu", href: "/ferramentas/carregar-documentos" },
      { label: "Explorar a biblioteca comunitária", href: "/biblioteca" },
    ],
    howToSteps: [
      {
        name: "Descrever a ficha que precisa",
        text: "Indica o tema, o ano, o objetivo da aula e o tipo de exercício que quer incluir.",
      },
      {
        name: "Gerar a ficha de trabalho",
        text: "Recebe uma ficha com instruções, exercícios e uma estrutura pronta para rever.",
      },
      {
        name: "Adaptar à sua turma",
        text: "Pede versões mais simples, mais curtas ou com apoio adicional sem refazer tudo.",
      },
      {
        name: "Rever, imprimir ou exportar",
        text: "Faz os últimos ajustes e leva a ficha para a aula no formato que preferir.",
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
    slug: "quizzes",
    title: "Quizzes com IA para revisão e participação em aula",
    shortTitle: "Quizzes",
    description: "Crie quizzes rápidos para rever conteúdos, testar compreensão e dinamizar o ritmo da aula.",
    hero: "Prepare quizzes rápidos para rever matéria sem perder tempo na montagem.",
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
          "Os quizzes funcionam bem em momentos curtos, quando se quer verificar compreensão, rever matéria ou arrancar a aula com foco.",
        bullets: [
          "Revisão rápida no fim da aula",
          "Aquecimento no início da sessão seguinte",
          "Diagnóstico simples antes de avançar para novo conteúdo",
        ],
      },
      {
        title: "O que se consegue ajustar num quiz gerado pela Scooli",
        description:
          "A base pode ser afinada ao tempo disponível, ao ritmo da turma e ao tipo de resposta que se quer pedir aos alunos.",
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
          "Sim. Pode pedir um quiz mais curto, aumentar o número de itens ou adaptar o formato consoante a dinâmica da aula.",
      },
      {
        question: "Os quizzes ficam editáveis?",
        answer:
          "Sim. O conteúdo pode ser revisto e ajustado antes de usar com a turma.",
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
        text: "Indica o conteúdo, o ano e o momento da aula em que quer usar o quiz.",
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
    layout: "assessment",
  },
  {
    slug: "apresentacoes",
    title: "Apresentações com IA para introduzir e explicar conteúdos",
    shortTitle: "Apresentações",
    description: "Estruture apresentações com tópicos, exemplos e ritmo de aula, prontas para afinar e completar.",
    hero: "Monte a base de uma apresentação em minutos e refine apenas o essencial.",
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
          "A ferramenta ajuda a estruturar a sequência da explicação para que se tenha uma base clara antes de afinar conteúdo, exemplos e tom da aula.",
        bullets: [
          "Tópicos principais por slide",
          "Exemplos para apoiar a explicação",
          "Ritmo de apresentação pensado para contexto de sala de aula",
        ],
      },
      {
        title: "Quando faz sentido usar apresentações com IA",
        description:
          "Funciona bem quando é preciso introduzir um tema, apoiar uma aula expositiva ou fechar uma unidade com uma síntese clara.",
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
          "Sim. Pode gerar uma base com tópicos, sequência lógica e exemplos para depois afinar a apresentação ao seu estilo de aula.",
      },
      {
        question: "Posso adaptar a linguagem da apresentação?",
        answer:
          "Sim. Pode simplificar texto, mudar o foco dos slides ou reorganizar a explicação antes de usar a apresentação.",
      },
      {
        question: "As apresentações ficam prontas a completar?",
        answer:
          "Sim. Recebe uma base organizada para editar, acrescentar o que fizer falta e usar como apoio em aula.",
      },
    ],
    relatedLinks: [
      { label: "Criar planos de aula", href: "/ferramentas/plano-de-aula" },
      { label: "Gerar quizzes de revisão", href: "/ferramentas/quizzes" },
      { label: "Ver o percurso para professores", href: "/professores" },
    ],
    howToSteps: [
      {
        name: "Definir o tema e o ano",
        text: "Indica o conteúdo, o ano e o objetivo da apresentação que quer preparar.",
      },
      {
        name: "Pedir a estrutura dos slides",
        text: "Escolhe o foco da aula e o tipo de explicação que precisa de montar.",
      },
      {
        name: "Gerar a apresentação",
        text: "Recebe uma sequência de slides com tópicos e exemplos base.",
      },
      {
        name: "Afinar antes da aula",
        text: "Edita linguagem, ordem e exemplos para deixar a apresentação pronta a usar.",
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
    description: "Parta de um material base e gere versões mais simples, mais curtas ou com apoio adicional sem refazer o trabalho.",
    hero: "Adapte um material à turma certa sem começar tudo de novo.",
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
          "Quando há turmas com ritmos diferentes, esta ferramenta permite ajustar o mesmo material com menos esforço manual e mais consistência entre versões.",
        bullets: [
          "Simplificar linguagem sem perder o objetivo do exercício",
          "Reduzir extensão para apoio ou reforço",
          "Adicionar pistas e mediação quando a turma precisa",
        ],
      },
      {
        title: "Que tipo de versões se pode criar",
        description:
          "A Scooli ajuda a partir de um material base e a gerar novas versões para contextos diferentes, mantendo o professor no controlo do resultado final.",
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
          "Sim. Pode gerar versões mais simples, mais curtas ou com mais apoio a partir do mesmo material base.",
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
      { label: "Partir de um documento seu", href: "/ferramentas/carregar-documentos" },
      { label: "Ler a página de confiança", href: "/confianca" },
    ],
    howToSteps: [
      {
        name: "Escolher o material base",
        text: "Parte de um exercício, ficha, texto ou documento que já tem preparado.",
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
    description: "Parta de um documento seu e transforme-o em fichas, testes ou versões adaptadas com menos trabalho manual.",
    hero: "Use documentos que já tem e transforme-os em novos recursos mais depressa.",
    useCases: ["Aproveitar materiais antigos", "Adaptar um teste", "Criar ficha a partir de texto"],
    outputs: ["Ficha a partir de documento", "Teste a partir de texto", "Nova versão adaptada"],
    benefits: [
      "Aproveitar materiais antigos sem copiar e colar tudo de novo",
      "Transformar um documento base em ficha, teste ou nova versão adaptada",
      "Reduzir trabalho manual quando já tem conteúdo preparado",
    ],
    contentSections: [
      {
        title: "Quando vale a pena começar por um documento seu",
        description:
          "Se já tem textos, fichas antigas, testes ou materiais próprios, esta ferramenta ajuda a reutilizar esse trabalho em vez de começar de novo.",
        bullets: [
          "Aproveitar uma ficha antiga como base",
          "Transformar um texto num novo conjunto de exercícios",
          "Adaptar um teste que já usou noutro ano ou turma",
        ],
      },
      {
        title: "O que pode gerar a partir de um documento",
        description:
          "A Scooli lê o ponto de partida e ajuda a transformá-lo num novo recurso, mantendo o processo mais rápido e controlado.",
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
          "Sim. Esta ferramenta existe precisamente para ajudar a aproveitar documentos seus e transformá-los em novos recursos com menos trabalho manual.",
      },
      {
        question: "Que tipo de recurso posso gerar a partir de um documento?",
        answer:
          "Pode transformar um documento numa ficha de trabalho, num teste ou numa versão adaptada do material original.",
      },
      {
        question: "O resultado final continua editável?",
        answer:
          "Sim. Mesmo quando parte de um documento seu, a nova versão continua editável para rever tudo antes de usar.",
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
        text: "Parte de um material seu que queira reaproveitar ou transformar.",
      },
      {
        name: "Indicar o novo formato",
        text: "Explica se quer gerar uma ficha, um teste ou uma versão adaptada do conteúdo.",
      },
      {
        name: "Gerar com IA",
        text: "Recebe um novo recurso construído a partir do documento que carregou.",
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
  planificacoes: CalendarDays,
  "plano-de-aula": NotebookPen,
  "sequencias-de-aulas": ListOrdered,
  quizzes: BookOpenCheck,
  apresentacoes: FileSearch,
  "adaptacao-de-materiais": WandSparkles,
  "carregar-documentos": Upload,
};
