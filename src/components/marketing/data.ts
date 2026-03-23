import {
  BookOpenCheck,
  Building2,
  FileCheck2,
  FileSearch,
  FileText,
  FolderSearch,
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

export type MarketingCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type ToolPageData = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  hero: string;
  useCases: string[];
  outputs: string[];
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

export const trustCards: MarketingCard[] = [
  {
    title: "Professor no controlo",
    description: "A IA ajuda a arrancar mais depressa, mas o conteúdo deve ser sempre revisto antes de ser usado em aula.",
    icon: ShieldCheck,
  },
  {
    title: "Privacidade clara",
    description: "A página de confiança reúne orientações, limites e pontos que a escola precisa de perceber sem mergulhar logo no texto legal.",
    icon: LockKeyhole,
  },
  {
    title: "Pensado para o contexto português",
    description: "A comunicação e os exemplos partem do trabalho real dos professores em Portugal e não de um discurso genérico de IA.",
    icon: MapPinned,
  },
];

export const teacherPageCards: MarketingCard[] = [
  {
    title: "Preparar a aula com menos atrito",
    description: "Partes de um pedido simples e recebes um rascunho editável para a aula, ficha ou teste que precisas de fechar.",
    icon: NotebookPen,
  },
  {
    title: "Adaptar materiais sem refazer tudo",
    description: "Ajusta dificuldade, linguagem, extensão e formato para turmas diferentes sem partir sempre do zero.",
    icon: SlidersHorizontal,
  },
  {
    title: "Reutilizar boas ideias",
    description: "A biblioteca comunitária ajuda-te a descobrir materiais que podes duplicar e adaptar ao teu contexto.",
    icon: LibraryBig,
  },
];

export const schoolPageCards: MarketingCard[] = [
  {
    title: "Onboarding e formação",
    description: "Placeholder para o percurso de adoção, formação inicial e apoio à equipa docente.",
    icon: GraduationCap,
  },
  {
    title: "Controlo e confiança",
    description: "Placeholder para documentação institucional, regras de uso e orientação para adoção responsável.",
    icon: ShieldCheck,
  },
  {
    title: "Implementação faseada",
    description: "Placeholder para piloto, acompanhamento e expansão por departamentos ou ciclos.",
    icon: Building2,
  },
];

export const aboutPrinciples: MarketingCard[] = [
  {
    title: "Dar tempo de volta aos professores",
    description: "A prioridade é reduzir o trabalho repetitivo para que sobre mais tempo para ensinar, acompanhar e ajustar.",
    icon: Sparkles,
  },
  {
    title: "Manter o professor no centro",
    description: "A ferramenta ajuda a produzir rascunhos e versões, mas a decisão final continua sempre do lado do docente.",
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
    meta: "Estudo do Meio · 1.º ciclo · Placeholder",
    tags: ["Slides", "Visual", "Placeholder"],
  },
  {
    title: "Quiz rápido de revisão",
    meta: "História · 8.º ano · Placeholder",
    tags: ["Quiz", "Revisão", "Partilhar"],
  },
  {
    title: "Guião de leitura orientada",
    meta: "Português · 7.º ano · Placeholder",
    tags: ["Leitura", "Guião", "Biblioteca"],
  },
];

export const toolPages: ToolPageData[] = [
  {
    slug: "gerador-de-testes",
    title: "Gerador de testes com IA para professores",
    shortTitle: "Gerador de testes",
    description: "Crie testes com estrutura, cotação e critérios, partindo de um pedido simples e ajustando tudo antes de usar.",
    hero: "Crie testes em minutos e ajuste o nível antes de os levar para a aula.",
    useCases: ["Teste diagnóstico", "Teste intermédio", "Versão simplificada para outra turma"],
    outputs: ["Escolha múltipla", "Resposta curta", "Critérios de correção"],
  },
  {
    slug: "fichas-de-trabalho",
    title: "Fichas de trabalho com IA para usar e adaptar",
    shortTitle: "Fichas de trabalho",
    description: "Monte fichas com exercícios, instruções claras e espaço para resposta, sem começar sempre de uma folha em branco.",
    hero: "Crie fichas de trabalho prontas a imprimir ou adaptar.",
    useCases: ["Consolidação", "Trabalho de casa", "Apoio a diferentes ritmos"],
    outputs: ["Exercícios", "Instruções", "Versões alternativas"],
  },
  {
    slug: "planificacoes",
    title: "Planificações com IA para preparar aulas com mais rapidez",
    shortTitle: "Planificações",
    description: "Organize objetivos, sequência da aula, materiais e avaliação num rascunho claro e editável.",
    hero: "Passe de uma ideia solta para uma planificação clara em poucos minutos.",
    useCases: ["Aula isolada", "Bloco semanal", "Preparação de unidade"],
    outputs: ["Objetivos", "Sequência", "Avaliação"],
  },
  {
    slug: "quizzes",
    title: "Quizzes com IA para revisão e participação em aula",
    shortTitle: "Quizzes",
    description: "Crie quizzes rápidos para rever conteúdos, testar compreensão e dinamizar o ritmo da aula.",
    hero: "Prepare quizzes rápidos para rever matéria sem perder tempo na montagem.",
    useCases: ["Revisão no fim da aula", "Aquecimento", "Diagnóstico rápido"],
    outputs: ["Perguntas curtas", "Escolha múltipla", "Versão curta"],
  },
  {
    slug: "apresentacoes",
    title: "Apresentações com IA para introduzir e explicar conteúdos",
    shortTitle: "Apresentações",
    description: "Estruture apresentações com tópicos, exemplos e ritmo de aula, prontas para afinar e completar.",
    hero: "Monte a base de uma apresentação em minutos e refine apenas o essencial.",
    useCases: ["Introdução de tema", "Aula expositiva", "Síntese de unidade"],
    outputs: ["Sequência de slides", "Tópicos principais", "Sugestões visuais"],
  },
  {
    slug: "adaptacao-de-materiais",
    title: "Adaptação de materiais com IA para níveis diferentes",
    shortTitle: "Adaptação de materiais",
    description: "Pegue num material base e gere versões mais simples, mais curtas ou com apoio adicional sem refazer o trabalho.",
    hero: "Adapte um material à turma certa sem começar tudo de novo.",
    useCases: ["Simplificar linguagem", "Reduzir extensão", "Criar apoio adicional"],
    outputs: ["Versão simplificada", "Versão curta", "Versão reforçada"],
  },
  {
    slug: "carregar-documentos",
    title: "Carregar documentos e transformar materiais com IA",
    shortTitle: "Carregar documentos",
    description: "Parta de um documento seu e transforme-o em fichas, testes ou versões adaptadas com menos trabalho manual.",
    hero: "Use documentos que já tem e transforme-os em novos recursos mais depressa.",
    useCases: ["Aproveitar materiais antigos", "Adaptar um teste", "Criar ficha a partir de texto"],
    outputs: ["Conversão de formato", "Reescrita", "Novo rascunho"],
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

export const supportCards: MarketingCard[] = [
  {
    title: "Página em construção com conteúdo real",
    description: "Os blocos assinalados como placeholder já têm estrutura pronta para receber casos reais, screenshots e documentação final.",
    icon: FolderSearch,
  },
  {
    title: "Navegação preparada para crescer",
    description: "As novas páginas públicas ajudam a separar homepage, conteúdo institucional, discovery da biblioteca e páginas SEO de intenção.",
    icon: Users,
  },
];
