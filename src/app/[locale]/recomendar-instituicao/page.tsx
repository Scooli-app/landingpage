import { InstitutionRecommendationPage } from "@/components/InstitutionRecommendationPage";
import type { Locale } from "@/i18n/routing";
import { getPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return getPageMetadata({
    title: "Recomendar a Scooli a uma instituição",
    description:
      "Sugira a Scooli à direção da sua escola, instituição ou agrupamento. Partilhe o contexto e a nossa equipa prepara o próximo contacto.",
    path: "/recomendar-instituicao",
    locale,
  });
}

export default function RecommendInstitutionPage() {
  return <InstitutionRecommendationPage />;
}
