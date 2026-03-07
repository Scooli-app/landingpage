"use client";

import { CommunitySection } from "@/components/CommunitySection";
import { ContactSection } from "@/components/ContactSection";
import { FaqSection } from "@/components/FaqSection";
import { FeatureGrid } from "@/components/FeatureGrid";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { MarketingNav } from "@/components/MarketingNav";
import { PricingSection } from "@/components/PricingSection";
import { ProblemSolutionSection } from "@/components/ProblemSolutionSection";
import { ScrollShowcase } from "@/components/ScrollShowcase";
import { PlansProvider } from "@/contexts/PlansContext";

export function HomePageClient() {
  return (
    <PlansProvider>
      <div className="min-h-screen bg-white">
        <header role="banner">
          <MarketingNav />
        </header>

        <main role="main" id="main-content">
          <article aria-label="Introdução à Scooli">
            <Hero />
          </article>

          <section aria-label="Desafio e solução">
            <ProblemSolutionSection />
          </section>

          <article aria-label="Funcionalidades principais">
            <FeatureGrid />
          </article>

          <section aria-label="Biblioteca comunitária">
            <CommunitySection />
          </section>

          <section aria-label="Como funciona e capturas do produto">
            <ScrollShowcase />
          </section>

          <PricingSection />

          <FaqSection />

          <ContactSection />

          <aside aria-label="Chamada para ação">
            <FinalCta />
          </aside>
        </main>

        <Footer />
      </div>
    </PlansProvider>
  );
}
