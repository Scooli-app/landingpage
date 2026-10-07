import { Footer } from "@/components/Footer";
import { MarketingNav } from "@/components/MarketingNav";
import { AudiencesSection } from "./AudiencesSection";
import { ChatComparisonSection } from "./ChatComparisonSection";
import { FinalCtaSection } from "./FinalCtaSection";
import { HeroSection } from "./HeroSection";
import { HowItWorksSection } from "./HowItWorksSection";
import { ProofSection } from "./ProofSection";
import { ResourcesSection } from "./ResourcesSection";
import { TrustSection } from "./TrustSection";
import { YearSection } from "./YearSection";

/**
 * Product first: Scooli saves preparation time (hero, how it works), stays
 * with the teacher all year (year) and creates the week's resources
 * (resources). Then the two objections back to back: a generic AI chat (the
 * dark band) and data and safety (trust). Then who it is for, and the close.
 */
export function HomePage() {
  return (
    <>
      <MarketingNav />
      <main id="main-content" tabIndex={-1} className="overflow-x-clip">
        <HeroSection />
        <ProofSection />
        <HowItWorksSection />
        <YearSection />
        <ResourcesSection />
        <ChatComparisonSection />
        <TrustSection />
        <AudiencesSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </>
  );
}
