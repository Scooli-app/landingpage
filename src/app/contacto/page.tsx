import { ContactSection } from "@/components/ContactSection";
import { PublicSiteShell } from "@/components/marketing/shared";
import { getPageMetadata } from "@/lib/seo";

export const metadata = getPageMetadata({
  title: "Contacto",
  description:
    "Fala com a equipa da Scooli para tirar dúvidas, pedir informações ou discutir um piloto para a tua escola.",
  path: "/contacto",
});

export default function ContactPage() {
  return (
    <PublicSiteShell>
      <ContactSection />
    </PublicSiteShell>
  );
}
