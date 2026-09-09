import { ContactSection } from "@/components/ContactSection";
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
    title: "Contacto",
    description:
      "Fale com a equipa da Scooli para tirar dúvidas, pedir informações ou discutir um piloto para a sua escola.",
    path: "/contacto",
    locale,
  });
}

export default function ContactPage() {
  return (
    <PublicSiteShell>
      <ContactSection />
    </PublicSiteShell>
  );
}
