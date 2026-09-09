import { AboutPageClient } from "@/components/AboutPageClient";
import { PublicSiteShell } from "@/components/marketing/shared";
import type { Locale } from "@/i18n/routing";
import { getPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return getPageMetadata({
    title: "Sobre nós",
    description:
      "Conheça a história da Scooli, a missão que nos move e a equipa que está a construir o produto para os professores portugueses.",
    path: "/sobre",
    locale,
  });
}

export default function AboutPage() {
  return (
    <PublicSiteShell>
      <AboutPageClient />
    </PublicSiteShell>
  );
}
