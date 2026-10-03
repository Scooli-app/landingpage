import { toolSlugs } from "@/components/marketing/data";
import { defaultLocale, locales } from "@/i18n/routing";
import { hreflangAlternates, isFullyLocalized, localizedUrl } from "@/i18n/urls";
import { SITE_URL } from "@/lib/seo";
import type { MetadataRoute } from "next";

type RouteConfig = {
  /** Internal pathname key from `src/i18n/routing.ts`. */
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
  params?: Record<string, string>;
};

const staticRouteConfigs: RouteConfig[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/professores", changeFrequency: "weekly", priority: 0.9 },
  { path: "/ia-para-professores", changeFrequency: "weekly", priority: 0.95 },
  { path: "/escolas", changeFrequency: "weekly", priority: 0.85 },
  { path: "/recomendar-instituicao", changeFrequency: "weekly", priority: 0.8 },
  { path: "/biblioteca", changeFrequency: "weekly", priority: 0.9 },
  { path: "/ferramentas", changeFrequency: "weekly", priority: 0.85 },
  { path: "/precos", changeFrequency: "weekly", priority: 0.8 },
  { path: "/confianca", changeFrequency: "weekly", priority: 0.8 },
  { path: "/sobre", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contacto", changeFrequency: "monthly", priority: 0.7 },
  { path: "/privacy", changeFrequency: "monthly", priority: 0.7 },
  { path: "/terms", changeFrequency: "monthly", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(
    process.env.VERCEL_GIT_COMMIT_DATE ??
      process.env.BUILD_DATE ??
      "2026-03-27T00:00:00.000Z",
  );

  const toolRouteConfigs: RouteConfig[] = toolSlugs.map((slug) => ({
    path: "/ferramentas/[slug]",
    params: { slug },
    changeFrequency: "weekly",
    priority: slug === "fichas-de-trabalho" ? 0.9 : 0.8,
  }));

  // Routes are listed once per locale they actually exist in, each carrying the
  // full hreflang set. Previously the sitemap claimed a single `pt-PT`
  // alternate for every URL, which left the English pages unlisted entirely.
  // A route whose copy is still only Portuguese is listed once — submitting an
  // English URL that canonicalises elsewhere just burns crawl budget.
  return [...staticRouteConfigs, ...toolRouteConfigs].flatMap((route) => {
    const routeLocales = isFullyLocalized(route.path)
      ? locales
      : [defaultLocale];

    return routeLocales.map((locale) => ({
      url: localizedUrl(SITE_URL, route.path, locale, route.params),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: hreflangAlternates(SITE_URL, route.path, route.params),
      },
    }));
  });
}
