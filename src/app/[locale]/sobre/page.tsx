import { PageSchemas } from "@/components/marketing/PageSchemas";
import { AboutPage as AboutContent } from "@/components/AboutPage";
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
  const t = await getTranslations({ locale, namespace: "about.meta" });

  return getPageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/sobre",
    locale,
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tPageMeta = await getTranslations({ locale, namespace: "about.meta" });

  return (
    <PublicSiteShell>
      <PageSchemas
        id="sobre"
        path="/sobre"
        locale={locale}
        title={tPageMeta("title")}
        description={tPageMeta("description")}
        type="AboutPage"
        people
      />
      <AboutContent />
    </PublicSiteShell>
  );
}
