import { Footer } from "@/components/Footer";
import { MarketingNav } from "@/components/MarketingNav";
import { LandingFinalCtaSection, SocialProofSection } from "@/components/homepage/CommunitySocialFinalSections";
import { HeroSection } from "@/components/homepage/HeroSection";
import { HowItWorksSection } from "@/components/homepage/HowItWorksSection";
import { RealOutputsSection } from "@/components/homepage/OutputsEditorSections";
import { PricingTeaserSection } from "@/components/homepage/PricingTeaserSection";
import { ProblemSolutionSection } from "@/components/homepage/ProblemSolutionSection";
import { ValuePropsSection } from "@/components/homepage/ValuePropsSection";
import { WeeklyHabitSection } from "@/components/homepage/WeeklyHabitSection";

export function HomePageClient() {
  return (
    <div className="min-h-screen bg-transparent text-[color:var(--scooli-ink)]">
      <header role="banner">
        <MarketingNav />
      </header>

      <main id="main-content" role="main" tabIndex={-1} className="overflow-x-hidden">
        <HeroSection />
        <ProblemSolutionSection />
        <HowItWorksSection />
        <RealOutputsSection />
        <ValuePropsSection />
        <SocialProofSection />
        <WeeklyHabitSection />
        <PricingTeaserSection />
        <LandingFinalCtaSection />
      </main>

      <Footer />
    </div>
  );
}
