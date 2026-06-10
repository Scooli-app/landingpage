import {
  BookOpenCheck,
  Bot,
  Clock3,
  Download,
  LibraryBig,
  ShieldCheck,
  SlidersHorizontal,
  Upload,
  type LucideIcon,
} from "lucide-react";

export type InfoItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type StepItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type OutputKind = "plan" | "worksheet" | "test";

export type OutputItem = {
  label: string;
  title: string;
  description: string;
  kind: OutputKind;
};

export type QuoteItem = {
  quote: string;
  role: string;
  rating: number;
};

export const painPoints: InfoItem[] = [
  {
    title: "Perde horas todas as semanas a preparar aulas",
    description:
      "Planificações, fichas e testes consomem noites e fins de semana — em média, 7,4 horas semanais só de preparação (TALIS 2024 · Portugal).",
    icon: Clock3,
  },
  {
    title: "O ChatGPT não conhece o currículo português",
    description:
      "Aprendizagens Essenciais, DL 54/2018, DL 55/2018: nada disto entra na resposta. Corrigir demora tanto como fazer do zero.",
    icon: Bot,
  },
  {
    title: "Adaptar para turmas diferentes continua a ser manual",
    description:
      "Níveis, ritmos e NEEs: cada versão é refeita à mão, semana após semana.",
    icon: SlidersHorizontal,
  },
];

export const beforeAfter = {
  before: [
    "Página em branco no Word — ou prompt no ChatGPT",
    "Texto solto num chat, sem referência às AE nem aos DL 54/2018 e 55/2018",
    "Correção manual, reformatação e alinhamento curricular",
    "Na semana seguinte, tudo outra vez",
  ],
  after: [
    "Indica o tema, o ano e o tipo de recurso",
    "Documento completo, alinhado com as AE à partida",
    "Edita apenas o que quer mudar — o resto chega pronto",
    "Fica guardado na sua biblioteca para reutilizar e adaptar",
  ],
};

export const steps: StepItem[] = [
  {
    title: "Indique o tema, o ano e o tipo de recurso",
    description:
      "Planificação, ficha ou teste. Pode também partir de um documento que já tem.",
    icon: Upload,
  },
  {
    title: "Receba o documento completo e alinhado com as AE",
    description:
      "Estrutura, conteúdos e critérios já organizados — uma base pronta, não uma página em branco.",
    icon: Bot,
  },
  {
    title: "Edite, adapte e exporte quando estiver pronto",
    description:
      "Ajuste ao seu estilo e à sua turma. O professor decide sempre o resultado final.",
    icon: Download,
  },
];

export const valueProps: InfoItem[] = [
  {
    title: "Alinhada com o currículo português",
    description:
      "Aprendizagens Essenciais, DL 54/2018 e DL 55/2018: cada documento parte dos referenciais oficiais — não de um modelo genérico que é preciso vigiar.",
    icon: BookOpenCheck,
  },
  {
    title: "Adapta para turmas e níveis diferentes",
    description:
      "Versões mais simples, mais curtas ou com apoio para NEEs — adaptação alinhada com o DL 54/2018, sem começar de novo.",
    icon: SlidersHorizontal,
  },
  {
    title: "Professor no controlo",
    description:
      "A IA propõe a estrutura; o professor revê, corta, melhora e decide o que entra na aula. Sempre.",
    icon: ShieldCheck,
  },
  {
    title: "Biblioteca comunitária",
    description:
      "Encontre, duplique e adapte materiais criados por outros professores portugueses.",
    icon: LibraryBig,
  },
];

export const outputs: OutputItem[] = [
  {
    label: "Planificação",
    title: "Planificação clara para usar já na próxima aula",
    description:
      "Objetivos, materiais, sequência e avaliação reunidos num documento simples de seguir.",
    kind: "plan",
  },
  {
    label: "Ficha de trabalho",
    title: "Ficha pronta a imprimir, adaptar e usar",
    description:
      "Instruções claras, exercícios bem distribuídos e espaço para resposta sem ruído visual.",
    kind: "worksheet",
  },
  {
    label: "Teste",
    title: "Teste completo com cotação e critérios",
    description:
      "Questões equilibradas e critérios de correção visíveis para ganhar tempo na preparação.",
    kind: "test",
  },
];

export const socialProof: QuoteItem[] = [
  {
    quote: "Poupei várias horas por semana na preparação das aulas.",
    role: "Professora do 2.º ciclo",
    rating: 5,
  },
  {
    quote: "Deixei de refazer quase do zero cada ficha que preparava.",
    role: "Docente de Português",
    rating: 4,
  },
  {
    quote:
      "Passei a adaptar materiais para níveis diferentes muito mais depressa.",
    role: "Professora do ensino básico",
    rating: 4.7,
  },
];
