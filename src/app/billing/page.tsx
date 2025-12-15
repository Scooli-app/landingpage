import { Container } from "@/components/Container";
import { EmailContact } from "@/components/EmailContact";
import { Button } from "@/components/ui/button";
import { getBreadcrumbSchema, SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const pageUrl = `${SITE_URL}/billing`;

export const metadata: Metadata = {
  title: "Portal de Faturação",
  description:
    "Portal de faturação self-service da Scooli. Gestão de recibos, métodos de pagamento e subscrições para professores. Em breve disponível.",
  alternates: {
    canonical: pageUrl,
    languages: {
      "pt-PT": pageUrl,
      "x-default": pageUrl,
    },
  },
  openGraph: {
    title: "Portal de Faturação | Scooli",
    description:
      "Gestão de faturação e subscrições da Scooli. Em breve disponível.",
    url: pageUrl,
    type: "website",
  },
  robots: {
    index: false, // Don't index placeholder page
    follow: true,
  },
};

// Breadcrumb schema for this page
const breadcrumbItems = [
  { name: "Scooli", url: SITE_URL },
  { name: "Portal de Faturação", url: pageUrl },
];

const breadcrumbSchema = getBreadcrumbSchema(breadcrumbItems);

export default function BillingPlaceholder() {
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

      <main role="main" id="main-content">
        <section className="py-16 md:py-20" aria-labelledby="billing-heading">
          <Container className="max-w-3xl space-y-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-[color:var(--scooli-muted)]">
              Brevemente
            </p>
            <h1
              id="billing-heading"
              className="text-3xl font-bold text-[color:var(--scooli-ink)] md:text-4xl"
            >
              Portal de faturação
            </h1>
            <p className="text-[color:var(--scooli-muted)]">
              Estamos a preparar um portal de faturação self-service para gerir
              recibos, métodos de pagamento e subscrições. Receberá acesso assim
              que estiver disponível.
            </p>
            <nav
              className="flex flex-wrap items-center gap-3"
              aria-label="Ações disponíveis"
            >
              <Button asChild className="rounded-xl">
                <Link href="/#waitlist">Ser notificado</Link>
              </Button>
              <EmailContact
                showIcon
                className="rounded-xl border border-[color:var(--scooli-border)]"
              />
            </nav>
          </Container>
        </section>
      </main>
    </>
  );
}
