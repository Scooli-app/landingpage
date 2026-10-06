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
 * The homepage argues three things, in this order: Scooli saves preparation
 * time (hero, how it works), stays with the teacher all year (year), and
 * creates the week's resources (resources). The dark band answers the real
 * alternative, a generic AI chat. Then who it is for, trust, and the close.
 */
export function HomePage() {
  return (
    <>
      <MarketingNav />
      <main id="main-content" tabIndex={-1} className="overflow-x-clip">
        <HeroSection />
        <ProofSection />
        <HowItWorksSection />
        <ChatComparisonSection />
        <YearSection />
        <ResourcesSection />
        <AudiencesSection />
        <TrustSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </>
  );
}
