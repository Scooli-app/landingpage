import { AboutPageClient } from "@/components/AboutPageClient";
import { PublicSiteShell } from "@/components/marketing/shared";
import { getPageMetadata } from "@/lib/seo";

export const metadata = getPageMetadata({
  title: "Sobre nós",
  description:
    "Conheça a história da Scooli, a missão que nos move e a equipa que está a construir o produto para os professores portugueses.",
  path: "/sobre",
});

export default function AboutPage() {
  return (
    <PublicSiteShell>
      <AboutPageClient />
    </PublicSiteShell>
  );
}
