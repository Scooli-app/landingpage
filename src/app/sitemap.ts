import { toolPages } from "@/components/marketing/data";
import { SITE_URL } from "@/lib/seo";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const withAlternates = (path: string) => ({
    languages: {
      "pt-PT": `${SITE_URL}${path}`,
      "x-default": `${SITE_URL}${path}`,
    },
  });

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: withAlternates(""),
    },
    {
      url: `${SITE_URL}/professores`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: withAlternates("/professores"),
    },
    {
      url: `${SITE_URL}/escolas`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.85,
      alternates: withAlternates("/escolas"),
    },
    {
      url: `${SITE_URL}/biblioteca`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: withAlternates("/biblioteca"),
    },
    {
      url: `${SITE_URL}/ferramentas`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.85,
      alternates: withAlternates("/ferramentas"),
    },
    {
      url: `${SITE_URL}/precos`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: withAlternates("/precos"),
    },
    {
      url: `${SITE_URL}/confianca`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: withAlternates("/confianca"),
    },
    {
      url: `${SITE_URL}/sobre`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: withAlternates("/sobre"),
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: withAlternates("/privacy"),
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: withAlternates("/terms"),
    },
  ];

  const toolRoutes: MetadataRoute.Sitemap = toolPages.map((tool) => ({
    url: `${SITE_URL}/ferramentas/${tool.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.75,
    alternates: withAlternates(`/ferramentas/${tool.slug}`),
  }));

  return [...staticRoutes, ...toolRoutes];
}
