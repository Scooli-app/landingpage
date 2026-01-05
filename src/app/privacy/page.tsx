import { Container } from "@/components/Container";
import { PrivacyPolicy } from "@/components/PrivacyPolicy";
import { getBreadcrumbSchema, getWebPageSchema, SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";
import Script from "next/script";

const pageUrl = `${SITE_URL}/privacy`;

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Política de Privacidade da Scooli. Saiba como tratamos e protegemos os dados pessoais de professores e visitantes em conformidade com o RGPD. Transparência total sobre cookies, direitos dos utilizadores e segurança de dados.",
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
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Breadcrumb schema for this page
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
      {/* Structured Data for SEO */}
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
          <PrivacyPolicy />
        </Container>
      </section>
    </>
  );
}
