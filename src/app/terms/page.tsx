import { Container } from "@/components/Container";
import { StructuredData } from "@/components/StructuredData";
import { TermsOfUse } from "@/components/TermsOfUse";
import { getBreadcrumbSchema, getWebPageSchema, SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";

const pageUrl = `${SITE_URL}/terms`;

export const metadata: Metadata = {
  title: "Termos de Utilização",
  description:
    "Termos de utilização da Scooli para professores e escolas, com regras, responsabilidades e condições de uso da plataforma.",
  alternates: {
    canonical: pageUrl,
    languages: {
      "pt-PT": pageUrl,
      "x-default": pageUrl,
    },
  },
  openGraph: {
    title: "Termos de Utilização | Scooli",
    description:
      "Regras e condições de utilização do website e serviço Scooli para professores.",
    url: pageUrl,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Termos de Utilização da Scooli",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Termos de Utilização | Scooli",
    description:
      "Regras e condições de utilização da plataforma Scooli para professores e escolas.",
    images: [`${SITE_URL}/twitter-image`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const breadcrumbItems = [
  { name: "Scooli", url: SITE_URL },
  { name: "Termos de Utilização", url: pageUrl },
];

const breadcrumbSchema = getBreadcrumbSchema(breadcrumbItems);

const webPageSchema = getWebPageSchema({
  title: "Termos de Utilização - Scooli",
  description:
    "Termos e condições de utilização da plataforma Scooli para professores.",
  url: pageUrl,
  breadcrumb: breadcrumbItems,
});

export default function TermsPage() {
  return (
    <>
      <StructuredData id="breadcrumb-schema" data={breadcrumbSchema} />
      <StructuredData id="webpage-schema" data={webPageSchema} />

      <section className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 md:py-16">
        <Container>
          <TermsOfUse />
        </Container>
      </section>
    </>
  );
}
