/**
 * When each page's content last changed in a way a reader would notice. Feeds
 * the sitemap `lastmod` and the WebPage `dateModified`.
 *
 * Maintained by hand on purpose: a build date would mark every page as modified
 * on every deploy, and Google learns to ignore a `lastmod` that always changes.
 * **Update the date of a page when you change its copy.** The legal pages
 * carry the date printed on the page itself.
 */
const DEFAULT_UPDATED = "2026-10-07";

const PAGE_UPDATED: Record<string, string> = {
  "/privacy": "2025-07-15",
  "/terms": "2026-01-05",
  "/comparar/[slug]": "2026-10-07",
};

export function pageUpdated(path: string): string {
  return PAGE_UPDATED[path] ?? DEFAULT_UPDATED;
}
