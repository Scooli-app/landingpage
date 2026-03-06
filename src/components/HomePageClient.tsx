"use client";

import { CommunitySection } from "@/components/CommunitySection";
import { ContactSection } from "@/components/ContactSection";
import { FaqSection } from "@/components/FaqSection";
import { FeatureGrid } from "@/components/FeatureGrid";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { MarketingNav } from "@/components/MarketingNav";
import { ProblemSection } from "@/components/ProblemSection";
import { ScrollShowcase } from "@/components/ScrollShowcase";
import { SolutionSection } from "@/components/SolutionSection";

export function HomePageClient() {
  return (
    <div className="min-h-screen bg-white">
      <header role="banner">
        <MarketingNav />
      </header>

      <main role="main" id="main-content">
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <FeatureGrid />
        <CommunitySection />
        <HowItWorks />
        <ScrollShowcase />
        <ContactSection />
        <FaqSection />
        <FinalCta />
      </main>

      <Footer />
    </div>
  );
}
