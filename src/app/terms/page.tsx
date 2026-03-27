import { Container } from "@/components/Container";
import { TermsOfUse } from "@/components/TermsOfUse";
import { getBreadcrumbSchema, getWebPageSchema, SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";
import Script from "next/script";

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
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
        strategy="afterInteractive"
      />
      <Script
        id="webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
        strategy="afterInteractive"
      />

      <section className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 md:py-16">
        <Container>
          <TermsOfUse />
        </Container>
      </section>
    </>
  );
}
