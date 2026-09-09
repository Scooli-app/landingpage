import { ToolLandingPage } from "@/components/marketing/ToolLandingPage";
import { StructuredData } from "@/components/StructuredData";
import { getToolPage, toolSlugs } from "@/components/marketing/data";
import { localizedUrl } from "@/i18n/urls";
import type { Locale } from "@/i18n/routing";
import {
  getBreadcrumbSchema,
  getFAQPageSchema,
  getHowToSchema,
  getPageMetadata,
  getWebPageSchema,
  SITE_URL,
} from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

type ToolPageParams = { locale: Locale; slug: string };

export async function generateStaticParams() {
  return toolSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ToolPageParams>;
}) {
  const { locale, slug } = await params;
  const tool = getToolPage(locale, slug);
  const t = await getTranslations({ locale, namespace: "tools.index" });

  if (!tool) {
    return getPageMetadata({
      title: t("metaTitle"),
      description: t("metaDescription"),
      path: "/ferramentas/[slug]",
      params: { slug },
      locale,
    });
  }

  return getPageMetadata({
    title: tool.title,
    description: tool.description,
    path: "/ferramentas/[slug]",
    params: { slug: tool.slug },
    keywords: tool.seoKeywords,
    locale,
  });
}

export default async function ToolPage({
  params,
}: {
  params: Promise<ToolPageParams>;
}) {
  const { locale, slug } = await params;
  const tool = getToolPage(locale, slug);
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tDetail = await getTranslations({ locale, namespace: "tools.detail" });

  if (!tool) {
    notFound();
  }

  const url = localizedUrl(SITE_URL, "/ferramentas/[slug]", locale, {
    slug: tool.slug,
  });
  const breadcrumbItems = [
    { name: "Scooli", url: localizedUrl(SITE_URL, "/", locale) },
    { name: tNav("tools"), url: localizedUrl(SITE_URL, "/ferramentas", locale) },
    { name: tool.shortTitle, url },
  ];

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbItems);
  const webPageSchema = getWebPageSchema({
    title: tool.title,
    description: tool.description,
    url,
    breadcrumb: breadcrumbItems,
    locale,
  });
  const faqSchema = getFAQPageSchema(tool.faq);
  const howToSchema = getHowToSchema(
    tDetail("howToName", { tool: tool.shortTitle.toLowerCase() }),
    tool.description,
    tool.howToSteps,
  );

  return (
    <>
      <StructuredData
        id={`${tool.slug}-breadcrumb-schema`}
        data={breadcrumbSchema}
      />
      <StructuredData
        id={`${tool.slug}-webpage-schema`}
        data={webPageSchema}
      />
      <StructuredData
        id={`${tool.slug}-faq-schema`}
        data={faqSchema}
      />
      <StructuredData
        id={`${tool.slug}-howto-schema`}
        data={howToSchema}
      />

      <ToolLandingPage tool={tool} />
    </>
  );
}
