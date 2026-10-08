import { PageSchemas } from "@/components/marketing/PageSchemas";
import { ContactSection } from "@/components/ContactSection";
import { PublicSiteShell } from "@/components/marketing/shared";
import type { Locale } from "@/i18n/routing";
import { getPageMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";

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

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tPageMeta = await getTranslations({ locale, namespace: "contact.meta" });

  return (
    <PublicSiteShell>
      <PageSchemas
        id="contacto"
        path="/contacto"
        locale={locale}
        title={tPageMeta("title")}
        description={tPageMeta("description")}
        type="ContactPage"
      />
      <ContactSection />
    </PublicSiteShell>
  );
}
