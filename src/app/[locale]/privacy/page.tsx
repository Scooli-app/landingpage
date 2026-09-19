import { Container } from "@/components/Container";
import { PrivacyPolicy } from "@/components/PrivacyPolicy";
import { StructuredData } from "@/components/StructuredData";
import { getBreadcrumbSchema, getWebPageSchema, SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";

const pageUrl = `${SITE_URL}/privacy`;

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Política de Privacidade da Scooli, com informação clara sobre tratamento de dados, RGPD, segurança e direitos dos utilizadores.",
  alternates: {
    canonical: pageUrl,
    languages: {
      "pt-PT": pageUrl,
      "x-default": pageUrl,
    },
  },
  openGraph: {
    title: "Política de Privacidade | Scooli",
    description:
      "Como a Scooli trata e protege os dados pessoais de professores e visitantes, em conformidade com o RGPD.",
    url: pageUrl,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Política de Privacidade da Scooli",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Política de Privacidade | Scooli",
    description:
      "Como a Scooli trata e protege os dados pessoais de professores e visitantes, em conformidade com o RGPD.",
    images: [`${SITE_URL}/twitter-image`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const breadcrumbItems = [
  { name: "Scooli", url: SITE_URL },
  { name: "Política de Privacidade", url: pageUrl },
];

const breadcrumbSchema = getBreadcrumbSchema(breadcrumbItems);

const webPageSchema = getWebPageSchema({
  title: "Política de Privacidade - Scooli",
  description:
    "Política de Privacidade da Scooli. Como tratamos e protegemos dados pessoais em conformidade com o RGPD.",
  url: pageUrl,
  breadcrumb: breadcrumbItems,
});

export default function PrivacyPage() {
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
