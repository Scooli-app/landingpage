import { InstitutionRecommendationPage } from "@/components/InstitutionRecommendationPage";
import type { Locale } from "@/i18n/routing";
import { getPageMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "recommendInstitution.meta" });

  return getPageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/recomendar-instituicao",
    locale,
  });
}

export default function RecommendInstitutionPage() {
  return <InstitutionRecommendationPage />;
}
