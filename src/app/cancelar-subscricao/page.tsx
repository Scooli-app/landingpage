import { CancelSubscription } from "@/components/CancelSubscription";
import { Container } from "@/components/Container";
import { getBreadcrumbSchema, getWebPageSchema, SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";
import Script from "next/script";

const pageUrl = `${SITE_URL}/cancelar-subscricao`;

export const metadata: Metadata = {
  title: "Cancelar Subscrição",
  description:
    "Instruções claras e simples para cancelar a sua subscrição Scooli Pro. Processo transparente, sem complicações. Pode cancelar a qualquer momento sem penalizações.",
  alternates: {
    canonical: pageUrl,
    languages: {
      "pt-PT": pageUrl,
      "x-default": pageUrl,
    },
  },
  openGraph: {
    title: "Cancelar Subscrição | Scooli",
    description:
      "Instruções para cancelar a sua subscrição Scooli Pro. Processo simples e transparente.",
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
  { name: "Cancelar Subscrição", url: pageUrl },
];

const breadcrumbSchema = getBreadcrumbSchema(breadcrumbItems);

const webPageSchema = getWebPageSchema({
  title: "Cancelar Subscrição - Scooli",
  description:
    "Instruções para cancelar a subscrição Scooli Pro de forma simples e transparente.",
  url: pageUrl,
  breadcrumb: breadcrumbItems,
});

export default function CancelPage() {
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
          <CancelSubscription />
        </Container>
      </section>
    </>
  );
}
