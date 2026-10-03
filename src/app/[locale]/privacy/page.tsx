import { Container } from "@/components/Container";
import { PrivacyPolicy } from "@/components/PrivacyPolicy";
import { StructuredData } from "@/components/StructuredData";
import type { Locale } from "@/i18n/routing";
import { localizedUrl } from "@/i18n/urls";
import { getBreadcrumbSchema, getPageMetadata, getWebPageSchema, SITE_URL } from "@/lib/seo";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacyPolicy.meta" });

  return getPageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/privacy",
    locale,
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacyPolicy.meta" });
  const pageUrl = localizedUrl(SITE_URL, "/privacy", locale);

  const breadcrumbItems = [
    { name: t("breadcrumbHome"), url: SITE_URL },
    { name: t("breadcrumbPage"), url: pageUrl },
  ];

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbItems);

  const webPageSchema = getWebPageSchema({
    title: t("webPageTitle"),
    description: t("description"),
    url: pageUrl,
    breadcrumb: breadcrumbItems,
    locale,
  });

  return (
    <>
      <StructuredData id="breadcrumb-schema" data={breadcrumbSchema} />
      <StructuredData id="webpage-schema" data={webPageSchema} />

      <section className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 md:py-16">
        <Container>
          <PrivacyPolicy />
        </Container>
      </section>
    </>
  );
}
