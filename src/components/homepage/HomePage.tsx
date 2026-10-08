import { Footer } from "@/components/Footer";
import { MarketingNav } from "@/components/MarketingNav";
import { AudiencesSection } from "./AudiencesSection";
import { ChatComparisonSection } from "./ChatComparisonSection";
import { ClassStateSection } from "./ClassStateSection";
import { FinalCtaSection } from "./FinalCtaSection";
import { HeroSection } from "./HeroSection";
import { HowItWorksSection } from "./HowItWorksSection";
import { ProofSection } from "./ProofSection";
import { ResourcesSection } from "./ResourcesSection";
import { TrustSection } from "./TrustSection";
import { YearSection } from "./YearSection";

/**
 * The class's week first (hero, numbers, the state of each class), then one
 * document in seconds (how it works), then trust early (what the teacher and
 * the school are told about data and review), then the year, the resources and
 * the answer to "I already use a chat". Then who it is for, and the close.
 */
export function HomePage() {
  return (
    <>
      <MarketingNav />
      <main id="main-content" tabIndex={-1} className="overflow-x-clip">
        <HeroSection />
        <ProofSection />
        <ClassStateSection />
        <HowItWorksSection />
        <TrustSection />
        <YearSection />
        <ResourcesSection />
        <ChatComparisonSection />
        <AudiencesSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </>
  );
}
