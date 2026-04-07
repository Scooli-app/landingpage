import { Footer } from "@/components/Footer";
import { MarketingNav } from "@/components/MarketingNav";
import { CommunityLibrarySection, LandingFinalCtaSection, SocialProofSection } from "@/components/homepage/CommunitySocialFinalSections";
import { HeroSection } from "@/components/homepage/HeroSection";
import { HowItWorksSection } from "@/components/homepage/HowItWorksSection";
import { EditorSection, RealOutputsSection } from "@/components/homepage/OutputsEditorSections";
import { BeforeAfterSection, ImpactSection, ProblemSection, SolutionSection } from "@/components/homepage/ProblemSolutionSections";

export function HomePageClient() {
  return (
    <div className="min-h-screen bg-transparent text-[color:var(--scooli-ink)]">
      <header role="banner">
        <MarketingNav />
      </header>

      <main id="main-content" role="main" tabIndex={-1} className="overflow-hidden">
        <HeroSection />
        <ImpactSection />
        <ProblemSection />
        <BeforeAfterSection />
        <SolutionSection />
        <HowItWorksSection />
        <RealOutputsSection />
        <EditorSection />
        <CommunityLibrarySection />
        <SocialProofSection />
        <LandingFinalCtaSection />
      </main>

      <Footer />
    </div>
  );
}
