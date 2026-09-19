import { ToolLandingPage } from "@/components/marketing/ToolLandingPage";
import { StructuredData } from "@/components/StructuredData";
import { toolPages } from "@/components/marketing/data";
import {
  getBreadcrumbSchema,
  getFAQPageSchema,
  getHowToSchema,
  getPageMetadata,
  getWebPageSchema,
  SITE_URL,
} from "@/lib/seo";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return toolPages.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = toolPages.find((entry) => entry.slug === slug);

  if (!tool) {
    return getPageMetadata({
      title: "Ferramenta Scooli",
      description: "Ferramenta da Scooli para criar materiais educativos com IA.",
      path: `/ferramentas/${slug}`,
    });
  }

  return getPageMetadata({
    title: tool.title,
    description: tool.description,
    path: `/ferramentas/${tool.slug}`,
    keywords: tool.seoKeywords,
  });
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = toolPages.find((entry) => entry.slug === slug);

  if (!tool) {
    notFound();
  }

  const url = `${SITE_URL}/ferramentas/${tool.slug}`;
  const breadcrumbItems = [
    { name: "Scooli", url: SITE_URL },
    { name: "Ferramentas", url: `${SITE_URL}/ferramentas` },
    { name: tool.shortTitle, url },
  ];

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbItems);
  const webPageSchema = getWebPageSchema({
    title: tool.title,
    description: tool.description,
    url,
    breadcrumb: breadcrumbItems,
  });
  const faqSchema = getFAQPageSchema(tool.faq);
  const howToSchema = getHowToSchema(
    `Como usar ${tool.shortTitle.toLowerCase()} na Scooli`,
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
