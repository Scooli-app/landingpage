import { AboutPage as AboutContent } from "@/components/AboutPage";
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
  const t = await getTranslations({ locale, namespace: "about.meta" });

  return getPageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/sobre",
    locale,
  });
}

export default function AboutPage() {
  return (
    <PublicSiteShell>
      <AboutContent />
    </PublicSiteShell>
  );
}
