"use client";

import { PricingSection } from "@/components/PricingSection";
import { PlansProvider } from "@/contexts/PlansContext";

export function PricingPageClient() {
  return (
    <PlansProvider>
      <PricingSection />
    </PlansProvider>
  );
}
