import {
  Bot,
  CheckCheck,
  Clock3,
  Download,
  FileText,
  FolderSearch,
  LibraryBig,
  PencilLine,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Upload,
  WandSparkles,
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
      "Entre objetivos, atividades e avaliação, a preparação estende-se muito para lá do horário e rouba tempo ao que realmente importa.",
    icon: Clock3,
  },
  {
    title: "Repete o mesmo trabalho semana após semana",
    description:
      "Fichas, testes e planificações acabam por recomeçar quase do zero, mesmo quando a estrutura já é conhecida.",
    icon: FileText,
  },
  {
    title: "Adaptar materiais para cada turma demora demasiado",
    description:
      "Mudar dificuldade, linguagem ou ritmo continua a exigir trabalho manual demais sempre que a turma muda.",
    icon: SlidersHorizontal,
  },
  {
    title: "Quando falta uma boa base, tudo atrasa",
    description:
      "Quando não existe um recurso pronto a adaptar, o tempo de preparação dispara e acumula-se para a aula seguinte.",
    icon: FolderSearch,
  },
];

export const benefits: InfoItem[] = [
  {
    title: "Mais rapidez no arranque",
    description:
      "Parta de uma base útil em segundos, em vez de começar com uma folha em branco.",
    icon: Sparkles,
  },
  {
    title: "Menos tarefas repetidas",
    description:
      "A Scooli monta a estrutura, sugere perguntas e organiza o documento sem trabalho mecânico.",
    icon: Bot,
  },
  {
    title: "Adaptação sem refazer tudo",
    description:
      "Ajuste linguagem, dificuldade e formato para diferentes turmas ou necessidades.",
    icon: WandSparkles,
  },
  {
    title: "Fluxo simples do início ao fim",
    description:
      "Pedir, editar e exportar acontece no mesmo sítio, sem saltar entre ferramentas.",
    icon: PencilLine,
  },
];

export const steps: StepItem[] = [
  {
    title: "Indique o contexto",
    description:
      "Tema, ano e tipo de recurso. Ou carregue um documento já existente.",
    icon: Upload,
  },
  {
    title: "Receba o recurso completo",
    description:
      "Uma planificação, ficha ou teste já estruturado e pronto a editar.",
    icon: Bot,
  },
  {
    title: "Edite e exporte",
    description:
      "Ajuste o que precisar, valide o conteúdo e exporte quando estiver pronto.",
    icon: Download,
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
      "Questões equilibradas e critérios de correção visíveis para ganhares tempo na preparação.",
    kind: "test",
  },
];

export const editorBenefits: InfoItem[] = [
  {
    title: "Editar linha a linha",
    description:
      "Nada fica fechado. Reescreva, corte, troque exemplos e afine o texto ao seu gosto.",
    icon: CheckCheck,
  },
  {
    title: "Adaptar para níveis diferentes",
    description:
      "Peça uma versão mais simples, uma extensão ou novos exercícios sem perder o documento base.",
    icon: SlidersHorizontal,
  },
  {
    title: "Manter o controlo do resultado",
    description:
      "A IA sugere, mas a decisão final continua sempre do lado do professor.",
    icon: ShieldCheck,
  },
];

export const libraryBenefits = [
  "Encontrar recursos por disciplina, ano e tipo de material",
  "Duplicar um material já criado e adaptá-lo em minutos",
  "Guardar boas bases para reutilizar sempre que precisar",
];

export const libraryCards = [
  {
    title: "Ficha de leitura orientada",
    meta: "Português · 2.º ciclo · Ficha",
    tags: ["Compreensão", "Editável", "45 min"],
  },
  {
    title: "Planificação semanal: frações",
    meta: "Matemática · 5.º ano · Planificação",
    tags: ["Aprendizagens", "Blocos de aula", "Avaliação"],
  },
  {
    title: "Teste diagnóstico: sistema digestivo",
    meta: "Ciências · 6.º ano · Teste",
    tags: ["Cotação", "Critérios", "Duplicar"],
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

export const libraryTitleIcon = LibraryBig;
