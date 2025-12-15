import { LegalLayout } from "@/components/LegalLayout";
import { Button } from "@/components/ui/button";
import { getLegalContent } from "@/lib/legal";
import { getBreadcrumbSchema, getWebPageSchema, SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import ReactMarkdown from "react-markdown";

const pageUrl = `${SITE_URL}/terms`;

export const metadata: Metadata = {
  title: "Termos de Utilização",
  description:
    "Termos de Utilização da Scooli. Regras e condições para utilização da plataforma de IA para professores. Inclui informações sobre propriedade intelectual, responsabilidades e direitos dos utilizadores.",
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
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Breadcrumb schema for this page
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

export default async function TermsPage() {
  const { content, title, description, updated } = await getLegalContent(
    "termos-de-utilizacao"
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
          className="mt-8 flex flex-wrap gap-3 border-t border-[color:var(--scooli-border)] pt-6"
          aria-label="Páginas relacionadas"
        >
          <Button asChild variant="outline" className="rounded-xl">
            <Link href="/privacy">Política de Privacidade</Link>
          </Button>
          <Button asChild className="rounded-xl">
            <Link href="/cancelar-subscricao">Cancelar Subscrição</Link>
          </Button>
        </nav>
      </LegalLayout>
    </>
  );
}

