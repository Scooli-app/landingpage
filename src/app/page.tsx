import { HomePageClient } from "@/components/HomePageClient";
import { getHowToSchema, SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Scooli | Crie planificações, fichas e testes em minutos",
  description:
    "Crie planificações, fichas de trabalho e testes com IA, edite tudo ao seu ritmo e exporte materiais prontos a usar. A Scooli foi pensada para professores em Portugal.",
  keywords: [
    "Scooli",
    "plataforma de IA para professores",
    "inteligência artificial para professores",
    "inteligência artificial para educação",
    "ferramentas de IA para educação",
    "ferramentas para professores",
    "software para professores",
    "planificação de aulas",
    "planificações com IA",
    "criar planificações",
    "gerador de planificações",
    "planificar aulas",
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
    title: "Scooli | Crie planificações, fichas e testes em minutos",
    description:
      "A Scooli ajuda professores em Portugal a gerar materiais prontos a editar, adaptar à turma e exportar sem começar do zero.",
    url: SITE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scooli | IA prática para professores",
    description:
      "Planificações, fichas e testes com IA, feitos para poupar tempo e manter o professor no controlo.",
  },
};

const howToSchema = getHowToSchema(
  "Como usar a Scooli para criar materiais de aula",
  "Guia simples para gerar, editar e exportar planificações, fichas e testes com a Scooli.",
  [
    {
      name: "Criar conta gratuita",
      text: "Regista-te na Scooli e começa a explorar a plataforma com o plano gratuito.",
    },
    {
      name: "Escolher o tipo de recurso",
      text: "Seleciona se queres criar uma planificação, uma ficha de trabalho ou um teste.",
    },
    {
      name: "Dar contexto ou carregar material",
      text: "Indica o tema, o ano e o objetivo da aula, ou parte de um documento que já tens.",
    },
    {
      name: "Gerar com IA",
      text: "Recebe uma primeira versão em segundos para começares com uma base pronta a editar.",
    },
    {
      name: "Editar e exportar",
      text: "Ajusta o conteúdo, valida antes de usar e exporta o material final quando estiver pronto.",
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
