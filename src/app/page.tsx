import { CommunitySection } from "@/components/CommunitySection";
import { FeatureGrid } from "@/components/FeatureGrid";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { MarketingNav } from "@/components/MarketingNav";
import { ScrollShowcase } from "@/components/ScrollShowcase";
import { FaqSection } from "@/components/FaqSection";
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
    title: "Scooli | IA que devolve tempo aos professores portugueses",
    description:
      "Gere apresentações, planos de aula, testes e quizzes alinhados às aprendizagens essenciais em segundos. Plataforma portuguesa com IA para docentes.",
    url: SITE_URL,
  },
};

// HowTo schema for better SEO - explains how to use Scooli
const howToSchema = getHowToSchema(
  "Como usar a Scooli para criar recursos educativos",
  "Guia passo a passo para criar apresentações, planos de aula e testes com a Scooli.",
  [
    {
      name: "Criar conta gratuita",
      text: "Registe-se na Scooli e receba 100 créditos gratuitos para começar a criar recursos educativos.",
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
  ]
);

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* HowTo Schema for SEO */}
      <Script
        id="howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
        strategy="afterInteractive"
      />

      {/* Semantic header with navigation */}
      <header role="banner">
        <MarketingNav />
      </header>

      {/* Main content area with semantic article structure */}
      <main role="main" id="main-content">
        {/* Hero section - primary landing content */}
        <article aria-label="Introdução à Scooli">
          <Hero />
        </article>

        {/* Product showcase */}
        <section aria-label="Demonstração do produto">
          <ScrollShowcase />
        </section>

        {/* Features grid */}
        <article aria-label="Funcionalidades principais">
          <FeatureGrid />
        </article>

        {/* Community ecosystem */}
        <article aria-label="Ecossistema comunitário">
          <CommunitySection />
        </article>

        {/* FAQ section with schema */}
        <FaqSection />

        {/* Final call to action */}
        <aside aria-label="Chamada para ação">
          <FinalCta />
        </aside>
      </main>

      {/* Footer with navigation and legal links */}
      <Footer />
    </div>
  );
}
