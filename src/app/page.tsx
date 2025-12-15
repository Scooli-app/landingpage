import { CommunitySection } from "@/components/CommunitySection";
import { FeatureGrid } from "@/components/FeatureGrid";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { MarketingNav } from "@/components/MarketingNav";
// import { PricingSection } from "@/components/PricingSection";
import { ScrollShowcase } from "@/components/ScrollShowcase";
import { FaqSection } from "@/components/FaqSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <MarketingNav />
      <main className="space-y-0">
        <Hero />
        <ScrollShowcase />
        <FeatureGrid />
        <CommunitySection />
        {/* <PricingSection /> */}
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
