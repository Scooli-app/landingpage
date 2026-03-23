import { ToolLandingPage } from "@/components/marketing/ToolLandingPage";
import { toolPages } from "@/components/marketing/data";
import { getPageMetadata } from "@/lib/seo";
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
      description: "Página de ferramenta da Scooli.",
      path: `/ferramentas/${slug}`,
    });
  }

  return getPageMetadata({
    title: `Scooli | ${tool.shortTitle}`,
    description: tool.description,
    path: `/ferramentas/${tool.slug}`,
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

  return <ToolLandingPage tool={tool} />;
}