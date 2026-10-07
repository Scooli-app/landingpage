import { ImpactStats } from "@/components/ImpactStats";

/**
 * Plain numbers straight under the hero. Only figures the team has confirmed:
 * there are no published testimonials or customer logos yet, so neither is here.
 * Shared with /escolas via `ImpactStats` so school leaders see the same proof.
 */
export function ProofSection() {
  return <ImpactStats className="mt-16 md:mt-20" bordered={false} />;
}
