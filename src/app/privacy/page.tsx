import { EmailContact } from "@/components/EmailContact";
import { LegalLayout } from "@/components/LegalLayout";
import { Button } from "@/components/ui/button";
import { getLegalContent } from "@/lib/legal";
import { getBreadcrumbSchema, getWebPageSchema, SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import ReactMarkdown from "react-markdown";

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

export default async function PrivacyPage() {
  const { content, title, description, updated } = await getLegalContent(
    "politica-de-privacidade"
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
        <nav
          className="mt-8 flex flex-wrap items-center gap-3 border-t border-[color:var(--scooli-border)] pt-6"
          aria-label="Páginas relacionadas"
        >
          <Button asChild className="rounded-xl">
            <Link href="/terms">Ver Termos de Utilização</Link>
          </Button>
          <EmailContact
            showIcon
            className="rounded-xl border border-[color:var(--scooli-border)]"
          />
        </nav>
      </LegalLayout>
    </>
  );
}

