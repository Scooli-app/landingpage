import { InstitutionRecommendationPage } from "@/components/InstitutionRecommendationPage";
import { getPageMetadata } from "@/lib/seo";

export const metadata = getPageMetadata({
  title: "Recomendar a Scooli a uma instituição",
  description:
    "Sugira a Scooli à direção da sua escola, instituição ou agrupamento. Partilhe o contexto e a nossa equipa prepara o próximo contacto.",
  path: "/recomendar-instituicao",
});

export default function RecommendInstitutionPage() {
  return <InstitutionRecommendationPage />;
}
