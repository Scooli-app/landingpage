import { HomePageClient } from "@/components/HomePageClient";
import { StructuredData } from "@/components/StructuredData";
import { getHomePageSchemas, getHowToSchema, SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scooli | Crie planificações, fichas e testes em minutos",
  description:
    "Scooli é uma plataforma de IA para professores em Portugal. Crie planificações, fichas, testes, quizzes e apresentações de acordo com as Aprendizagens Essenciais, adapte materiais e exporte tudo sem começar do zero.",
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
    "alinhamento curricular",
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
      "Scooli é uma plataforma de IA para professores em Portugal. Gere materiais editáveis de acordo com as Aprendizagens Essenciais, adapte-os à turma e exporte tudo sem começar do zero.",
    url: SITE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scooli | IA prática para professores",
    description:
      "Plataforma de IA para professores em Portugal, com planificações, fichas, testes e adaptações segundo as Aprendizagens Essenciais.",
  },
};

const howToSchema = getHowToSchema(
  "Como usar a Scooli para criar materiais de aula",
  "Guia simples para gerar, editar e exportar planificações, fichas e testes com a Scooli.",
  [
    {
      name: "Criar conta gratuita",
      text: "Registe-se na Scooli e comece a explorar a plataforma com o plano gratuito.",
    },
    {
      name: "Escolher o tipo de recurso",
      text: "Selecione se quer criar uma planificação, uma ficha de trabalho ou um teste.",
    },
    {
      name: "Dar contexto ou carregar material",
      text: "Indique o tema, o ano, o objetivo da aula e, quando fizer sentido, as Aprendizagens Essenciais ou parte de um documento que já tem.",
    },
    {
      name: "Gerar com IA",
      text: "Receba uma primeira versão em segundos para começar com uma base pronta a editar.",
    },
    {
      name: "Editar e exportar",
      text: "Ajuste o conteúdo, valide antes de usar e exporte o material final quando estiver pronto.",
    },
  ],
);

const homeSchemas = getHomePageSchemas();

export default function Home() {
  return (
    <>
      {homeSchemas.map((schema, index) => (
        <StructuredData
          key={`home-schema-${index}`}
          id={`home-schema-${index}`}
          data={schema}
        />
      ))}
      <StructuredData id="howto-schema" data={howToSchema} />

      <HomePageClient />
    </>
  );
}
