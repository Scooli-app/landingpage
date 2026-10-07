import { ComparisonPage } from "@/components/marketing/ComparisonPage";
import { StructuredData } from "@/components/StructuredData";
import { comparisonSlugs, getComparisonPage } from "@/components/marketing/comparisons";
import { localizedUrl } from "@/i18n/urls";
import type { Locale } from "@/i18n/routing";
import {
  getBreadcrumbSchema,
  getFAQPageSchema,
  getPageMetadata,
  getWebPageSchema,
  SITE_URL,
} from "@/lib/seo";
import { notFound } from "next/navigation";

type ComparisonPageParams = { locale: Locale; slug: string };

/**
 * "Scooli vs X" comparison pages — PT-PT only (see `comparisons.ts` header).
 * Content is a TS module rather than `messages/pt-PT.json` for the same
 * reason tool pages are: nested arrays of records (rows, FAQs, sources) that
 * next-intl's flat message format can't express without untyped numeric keys.
 */

export async function generateStaticParams() {
  return comparisonSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ComparisonPageParams>;
}) {
  const { locale, slug } = await params;
  const content = getComparisonPage(slug);

  if (!content) {
    return getPageMetadata({
      title: "Scooli",
      description: "Scooli",
      path: "/comparar/[slug]",
      params: { slug },
      locale,
    });
  }

  return getPageMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: "/comparar/[slug]",
    params: { slug: content.slug },
    locale,
  });
}

export default async function ComparisonRoute({
  params,
}: {
  params: Promise<ComparisonPageParams>;
}) {
  const { locale, slug } = await params;
  const content = getComparisonPage(slug);

  if (!content) {
    notFound();
  }

  const url = localizedUrl(SITE_URL, "/comparar/[slug]", locale, { slug: content.slug });
  const breadcrumbItems = [
    { name: "Scooli", url: localizedUrl(SITE_URL, "/", locale) },
    { name: content.title, url },
  ];

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbItems);
  const webPageSchema = getWebPageSchema({
    title: content.metaTitle,
    description: content.metaDescription,
    url,
    breadcrumb: breadcrumbItems,
    locale,
  });
  const faqSchema = getFAQPageSchema(content.faq);

  return (
    <>
      <StructuredData id={`${content.slug}-breadcrumb-schema`} data={breadcrumbSchema} />
      <StructuredData id={`${content.slug}-webpage-schema`} data={webPageSchema} />
      <StructuredData id={`${content.slug}-faq-schema`} data={faqSchema} />

      <ComparisonPage content={content} />
    </>
  );
}
