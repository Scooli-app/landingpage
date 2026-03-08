import { HomePageClient } from "@/components/HomePageClient";
import { getHowToSchema, SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Scooli | IA que devolve tempo aos professores portugueses",
  description:
    "A Scooli é a plataforma de IA para professores em Portugal: crie planos de aula, testes, fichas, quizzes e apresentações em segundos, com conteúdos alinhados às Aprendizagens Essenciais e acesso a uma biblioteca comunitária de recursos partilhados por professores.",
  keywords: [
    "Scooli",
    "plataforma de IA para professores",
    "inteligência artificial para professores",
    "inteligência artificial para educação",
    "ferramentas de IA para educação",
    "site para professores",
    "ferramentas para professores",
    "software para professores",
    "site para fazer plano de aula",
    "fazer plano de aula online",
    "criar plano de aula",
    "gerador de plano de aula",
    "gerador de planos de aula",
    "planificação de aulas",
    "planeamento de aulas",
    "planeamento de aula com IA",
    "planejamento de aula com IA",
    "site para planejamento de aula",
    "planos de aula prontos",
    "criar testes online",
    "fazer testes online",
    "gerador de testes",
    "gerador de testes com IA",
    "testes para professores",
    "criar fichas de trabalho",
    "fazer fichas de trabalho",
    "fichas de trabalho com IA",
    "fichas para imprimir",
    "criar quizzes",
    "gerador de quizzes",
    "quizzes educativos",
    "quiz para sala de aula",
    "criar apresentações para aulas",
    "gerador de apresentações",
    "apresentações escolares com IA",
    "slides para aulas",
    "criar materiais pedagógicos",
    "gerar materiais pedagógicos",
    "recursos educativos com IA",
    "recursos para professores",
    "conteúdos pedagógicos",
    "adaptação de conteúdos pedagógicos",
    "diferenciação pedagógica",
    "educação inclusiva",
    "necessidades educativas especiais",
    "editor de materiais pedagógicos",
    "editar materiais educativos",
    "biblioteca comunitária de professores",
    "biblioteca de recursos educativos",
    "partilha de recursos educativos",
    "comunidade de professores",
    "aprendizagens essenciais",
    "currículo português",
    "ensino básico",
    "ensino secundário",
    "educação em Portugal",
    "edtech Portugal",
    "plataforma educativa Portugal",
  ],

  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Scooli | IA que devolve tempo aos professores portugueses",
    description:
      "Gere apresentações, planos de aula, testes e quizzes alinhados às aprendizagens essenciais em segundos. Plataforma portuguesa com IA para docentes.",
    url: SITE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scooli | Site para fazer plano de aula com IA",
    description:
      "Site para fazer plano de aula online, testes e fichas com IA, pensado para professores.",
  },
};

const howToSchema = getHowToSchema(
  "Como usar a Scooli para criar recursos educativos",
  "Guia passo a passo para criar apresentações, planos de aula e testes com a Scooli.",
  [
    {
      name: "Criar conta gratuita",
      text: "Registe-se na Scooli e tenha acesso a 20 gerações por mês no plano gratuito.",
    },
    {
      name: "Escolher tipo de recurso",
      text: "Selecione o tipo de conteúdo que pretende criar: apresentação, plano de aula, teste, quiz ou ficha de trabalho.",
    },
    {
      name: "Definir parâmetros",
      text: "Indique a matéria, nível de ensino, objetivos de aprendizagem e outros parâmetros relevantes.",
    },
    {
      name: "Gerar com IA",
      text: "A IA da Scooli gera automaticamente o conteúdo alinhado às aprendizagens essenciais portuguesas.",
    },
    {
      name: "Personalizar e guardar",
      text: "Reveja, edite conforme necessário e guarde o recurso na sua biblioteca pessoal ou partilhe com a comunidade.",
    },
  ],
);

export default function Home() {
  return (
    <>
      <Script
        id="howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
        strategy="afterInteractive"
      />

      <HomePageClient />
    </>
  );
}
