import type { Locale } from "@/i18n/routing";

/**
 * When each page's content last changed in a way a reader would notice, per
 * locale. Feeds the sitemap `lastmod` and the WebPage `dateModified`.
 *
 * Maintained by hand on purpose: a build date would mark every page as modified
 * on every deploy, and Google learns to ignore a `lastmod` that always changes.
 * **Update the date of a page when you change its copy.** The legal pages
 * carry the date printed on the page itself.
 */
const DEFAULT_UPDATED: Record<Locale, string> = {
  "pt-PT": "2026-10-07",
  en: "2026-10-07",
  "pt-BR": "2026-11-25",
};

const PT_EN_UPDATED: Record<string, string> = {
  "/privacy": "2025-07-15",
  "/terms": "2026-01-05",
  "/comparar/[slug]": "2026-11-25",
};

const PAGE_UPDATED: Record<Locale, Record<string, string>> = {
  "pt-PT": PT_EN_UPDATED,
  en: PT_EN_UPDATED,
  "pt-BR": {
    "/privacy": "2026-11-25",
    "/terms": "2026-11-25",
  },
};

export function pageUpdated(path: string, locale: Locale): string {
  return PAGE_UPDATED[locale][path] ?? DEFAULT_UPDATED[locale];
}
