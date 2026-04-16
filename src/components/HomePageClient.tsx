import { Footer } from "@/components/Footer";
import { MarketingNav } from "@/components/MarketingNav";
import { LandingFinalCtaSection, SocialProofSection } from "@/components/homepage/CommunitySocialFinalSections";
import { CorePillarsSection } from "@/components/homepage/CorePillarsSection";
import { HeroSection } from "@/components/homepage/HeroSection";
import { HowItWorksSection } from "@/components/homepage/HowItWorksSection";
import { RealOutputsSection } from "@/components/homepage/OutputsEditorSections";

export function HomePageClient() {
  return (
    <div className="min-h-screen bg-transparent text-[color:var(--scooli-ink)]">
      <header role="banner">
        <MarketingNav />
      </header>

      <main id="main-content" role="main" tabIndex={-1} className="overflow-x-hidden">
        <HeroSection />
        <CorePillarsSection />
        <HowItWorksSection />
        <RealOutputsSection />
        <SocialProofSection />
        <LandingFinalCtaSection />
      </main>

      <Footer />
    </div>
  );
}
