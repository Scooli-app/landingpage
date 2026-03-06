import { HomePageClient } from "@/components/HomePageClient";
import { getHowToSchema, SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";
import Script from "next/script";

// Enhanced homepage metadata for SEO
export const metadata: Metadata = {
  alternates: {
    canonical: SITE_URL,
  },
  // Add specific homepage OG tags
  openGraph: {
    title: "Scooli | Poupe horas a criar materiais pedagógicos",
    description:
      "Crie testes, fichas e planos de aula em segundos, em conformidade com as Aprendizagens Essenciais. Biblioteca comunitária feita por professores e acesso antecipado antes da Education Summit.",
    url: SITE_URL,
  },
};

// HowTo schema for better SEO - explains how to use Scooli
const howToSchema = getHowToSchema(
  "Como usar a Scooli para criar recursos educativos",
  "Guia rápido para criar materiais pedagógicos com a Scooli.",
  [
    {
      name: "Escolher tipo de material",
      text: "Selecione se quer criar um teste, ficha de trabalho, plano de aula ou apresentação.",
    },
    {
      name: "Descrever pedido",
      text: "Indique disciplina, tema e nível de ensino para adaptar o resultado ao seu contexto.",
    },
    {
      name: "Gerar com IA",
      text: "A Scooli cria um primeiro rascunho em segundos, alinhado com as Aprendizagens Essenciais.",
    },
    {
      name: "Editar e adaptar",
      text: "Revise o conteúdo no editor e adapte-o à turma antes de exportar ou partilhar.",
    },
  ]
);

export default function Home() {
  return (
    <>
      {/* HowTo Schema for SEO */}
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
