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

export const impactStats = [
  {
    value: "1000+",
    label: "documentos gerados",
  },
  {
    value: "7h+",
    label: "poupadas por semana",
  },
  {
    value: "400+",
    label: "materiais adaptados",
  },
  {
    value: "300+",
    label: "professores ativos",
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
    description: "Partes de um pedido simples e recebes uma base editável para a aula, ficha ou teste que precisas de fechar.",
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
  },
  {
    slug: "fichas-de-trabalho",
    title: "Fichas de trabalho com IA para usar e adaptar",
    shortTitle: "Fichas de trabalho",
    description: "Cria fichas com exercícios claros, instruções simples e versões por nível sem começar sempre de uma folha em branco.",
    hero: "Monta fichas de trabalho prontas a rever, imprimir ou adaptar.",
    useCases: ["Consolidação", "Trabalho de casa", "Apoio a diferentes ritmos"],
    outputs: ["Exercícios diferenciados", "Instruções claras", "Versões por nível"],
  },
  {
    slug: "planificacoes",
    title: "Planificações com IA para preparar aulas com mais rapidez",
    shortTitle: "Planificações",
    description: "Organiza objetivos, sequência da aula, materiais e avaliação num documento claro e editável.",
    hero: "Passa de uma ideia solta para uma planificação editável em poucos minutos.",
    useCases: ["Aula individual", "Sequência semanal", "Preparação de unidade"],
    outputs: ["Objetivos e competências", "Sequência da aula", "Avaliação e materiais"],
  },
  {
    slug: "quizzes",
    title: "Quizzes com IA para revisão e participação em aula",
    shortTitle: "Quizzes",
    description: "Cria quizzes rápidos para rever conteúdos, testar compreensão e dinamizar o ritmo da aula.",
    hero: "Prepara quizzes rápidos para rever matéria sem perder tempo na montagem.",
    useCases: ["Revisão no fim da aula", "Aquecimento", "Diagnóstico rápido"],
    outputs: ["Perguntas rápidas", "Escolha múltipla", "Versão curta"],
  },
  {
    slug: "apresentacoes",
    title: "Apresentações com IA para introduzir e explicar conteúdos",
    shortTitle: "Apresentações",
    description: "Estrutura apresentações com tópicos, exemplos e ritmo de aula, prontas para afinar e completar.",
    hero: "Monta a base de uma apresentação em minutos e refina apenas o essencial.",
    useCases: ["Introdução de tema", "Aula expositiva", "Síntese de unidade"],
    outputs: ["Estrutura de slides", "Tópicos principais", "Exemplos visuais"],
  },
  {
    slug: "adaptacao-de-materiais",
    title: "Adaptação de materiais com IA para níveis diferentes",
    shortTitle: "Adaptação de materiais",
    description: "Parte de um material base e gera versões mais simples, mais curtas ou com apoio adicional sem refazer o trabalho.",
    hero: "Adapta um material à turma certa sem começar tudo de novo.",
    useCases: ["Simplificar linguagem", "Reduzir extensão", "Criar apoio adicional"],
    outputs: ["Versão simplificada", "Versão resumida", "Apoio adicional"],
  },
  {
    slug: "carregar-documentos",
    title: "Carregar documentos e transformar materiais com IA",
    shortTitle: "Carregar documentos",
    description: "Parte de um documento teu e transforma-o em fichas, testes ou versões adaptadas com menos trabalho manual.",
    hero: "Usa documentos que já tens e transforma-os em novos recursos mais depressa.",
    useCases: ["Aproveitar materiais antigos", "Adaptar um teste", "Criar ficha a partir de texto"],
    outputs: ["Ficha a partir de documento", "Teste a partir de texto", "Nova versão adaptada"],
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
