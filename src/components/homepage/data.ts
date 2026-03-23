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
};

export const painPoints: InfoItem[] = [
  {
    title: "Planear demora demasiado",
    description:
      "Entre objetivos, atividades e avaliação, a primeira versão de uma aula rouba tempo que faz falta noutro lado.",
    icon: Clock3,
  },
  {
    title: "Há trabalho que se repete",
    description:
      "As mesmas estruturas de fichas, testes e planificações acabam por ser refeitas vezes sem conta.",
    icon: FileText,
  },
  {
    title: "Adaptar materiais pesa",
    description:
      "Mudar dificuldade, linguagem ou ritmo para outra turma ainda é um processo demasiado manual.",
    icon: SlidersHorizontal,
  },
  {
    title: "Nem sempre há um bom ponto de partida",
    description:
      "Quando não existe um recurso pronto a usar, começar do zero atrasa tudo o resto.",
    icon: FolderSearch,
  },
];

export const benefits: InfoItem[] = [
  {
    title: "Mais rapidez no arranque",
    description:
      "Começas com um rascunho útil em segundos, em vez de começares com uma folha em branco.",
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
      "Podes ajustar linguagem, dificuldade e formato para diferentes turmas ou necessidades.",
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
    title: "Introduzir pedido ou carregar material",
    description:
      "Escolhe o tipo de recurso, dá contexto à turma ou parte de um documento que já tens.",
    icon: Upload,
  },
  {
    title: "Gerar com IA",
    description:
      "Recebes um primeiro rascunho estruturado com base no tema, ano e objetivo da aula.",
    icon: Bot,
  },
  {
    title: "Editar e exportar",
    description:
      "Ajustas o que for preciso, validas o conteúdo e ficas com o material pronto a usar.",
    icon: Download,
  },
];

export const outputs: OutputItem[] = [
  {
    label: "Planificação",
    title: "Planificação clara e pronta a orientar a aula",
    description:
      "Objetivos, materiais, sequência e avaliação reunidos num documento simples de seguir.",
    kind: "plan",
  },
  {
    label: "Ficha de trabalho",
    title: "Ficha organizada para imprimir ou adaptar",
    description:
      "Instruções claras, exercícios bem distribuídos e espaço para resposta sem ruído visual.",
    kind: "worksheet",
  },
  {
    label: "Teste",
    title: "Teste com estrutura, cotação e critérios",
    description:
      "Questões equilibradas e critérios de correção visíveis para ganhares tempo na preparação.",
    kind: "test",
  },
];

export const editorBenefits: InfoItem[] = [
  {
    title: "Editar linha a linha",
    description:
      "Nada fica fechado. Podes reescrever, cortar, trocar exemplos e afinar o texto ao teu estilo.",
    icon: CheckCheck,
  },
  {
    title: "Adaptar para níveis diferentes",
    description:
      "Pede uma versão mais simples, uma extensão ou novos exercícios sem perder o documento base.",
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
  "Pesquisa por disciplina, ano e tipo de recurso",
  "Duplicar um material da comunidade e adaptar em minutos",
  "Guardar os teus favoritos para reutilizar depois",
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
    quote: "Poupei horas todas as semanas a preparar aulas.",
    role: "Professora do 2.º ciclo",
  },
  {
    quote: "Deixei de começar cada ficha do zero.",
    role: "Docente de Português",
  },
  {
    quote: "Adaptei materiais para níveis diferentes muito mais depressa.",
    role: "Professora do ensino básico",
  },
];

export const libraryTitleIcon = LibraryBig;
