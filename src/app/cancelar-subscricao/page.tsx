import { EmailContact } from "@/components/EmailContact";
import { LegalLayout } from "@/components/LegalLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getLegalContent } from "@/lib/legal";
import { getBreadcrumbSchema, getWebPageSchema, SITE_URL } from "@/lib/seo";
import { CreditCard } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import ReactMarkdown from "react-markdown";

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

export default async function CancelPage() {
  const { content, title, description, updated } = await getLegalContent(
    "cancelar-subscricao"
  );

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

      <LegalLayout title={title} description={description} updated={updated}>
        <article
          className="prose prose-slate max-w-none"
          itemScope
          itemType="https://schema.org/WebPage"
        >
          <ReactMarkdown>{content}</ReactMarkdown>
        </article>
        <Card className="mt-8 rounded-2xl border-[color:var(--scooli-border)] bg-gradient-to-br from-[color:var(--scooli-accent)] to-white">
          <CardContent className="space-y-4 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--scooli-primary)]">
                <CreditCard className="h-5 w-5 text-white" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[color:var(--scooli-ink)]">
                  Portal de faturação
                </p>
                <p className="text-sm text-[color:var(--scooli-muted)]">
                  Em breve disponível
                </p>
              </div>
            </div>
            <p className="text-[color:var(--scooli-muted)]">
              Em breve terá um portal self-service para cancelar, alterar método
              de pagamento ou transferir faturas.
            </p>
            <Button disabled className="w-full rounded-xl">
              Abrir portal (brevemente)
            </Button>
            <nav
              className="flex flex-wrap items-center gap-3 pt-2"
              aria-label="Ações disponíveis"
            >
              <EmailContact
                showIcon
                className="flex-1 justify-center rounded-xl border border-[color:var(--scooli-border)]"
              />
              <Button asChild className="flex-1 rounded-xl">
                <Link href="/terms">Ver Termos</Link>
              </Button>
            </nav>
          </CardContent>
        </Card>
      </LegalLayout>
    </>
  );
}
