import { defaultLocale, pathnames, type Locale } from "./routing";
import type { PathnameKey } from "./urls";

/**
 * Pages whose copy is not yet written for a locale. Pure data, so the
 * middleware can import it.
 *
 * Under `/br` these redirect to `/br` rather than render: a Brazilian page with
 * pt-PT copy would read as a mistake and get indexed as Brazilian. For every
 * locale they stay out of the sitemap and hreflang, and their canonical points
 * at the pt-PT URL.
 *
 * **Remove a path from its list the moment its copy is written** — that is the
 * whole mechanism, there is nothing else to switch on. One list of exceptions,
 * not an allowlist that has to be kept in sync with `pathnames`.
 */
export const NOT_YET_LOCALIZED: Partial<Record<Locale, readonly PathnameKey[]>> = {
  "pt-BR": [],
};

/** Whether `path` (an internal pathname key) has its copy written in `locale`. pt-PT is the source copy, so always. */
export function isLocalized(path: string, locale: Locale): boolean {
  if (locale === defaultLocale) {
    return true;
  }
  return (
    Object.prototype.hasOwnProperty.call(pathnames, path) &&
    !(NOT_YET_LOCALIZED[locale] as readonly string[] | undefined)?.includes(path)
  );
}

/**
 * `isLocalized` for a link target (`"/sobre"`, `"/#como-funciona"` or
 * `{ pathname: "/ferramentas/[slug]", … }`). Links to pages not yet localized
 * are hidden rather than left to redirect.
 */
export function isHrefLocalized(href: string | { pathname: string }, locale: Locale): boolean {
  return isLocalized(typeof href === "string" ? href.split("#")[0] || "/" : href.pathname, locale);
}
