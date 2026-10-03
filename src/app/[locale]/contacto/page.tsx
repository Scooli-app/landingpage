import { ContactSection } from "@/components/ContactSection";
import { PublicSiteShell } from "@/components/marketing/shared";
import type { Locale } from "@/i18n/routing";
import { getPageMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.meta" });

  return getPageMetadata({
    title: t("title"),
    description: t("description"),
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
