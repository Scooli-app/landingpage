"use client";

import { FaqSection } from "@/components/FaqSection";
import { FeatureGrid } from "@/components/FeatureGrid";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { MarketingNav } from "@/components/MarketingNav";
import { PricingSection } from "@/components/PricingSection";
import { ScrollShowcase } from "@/components/ScrollShowcase";
import { PlansProvider } from "@/contexts/PlansContext";

export function HomePageClient() {
  return (
    <PlansProvider>
      <div className="min-h-screen bg-white">
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

          {/* Pricing section - only renders if plans are available */}
          <PricingSection />

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
    </PlansProvider>
  );
}

