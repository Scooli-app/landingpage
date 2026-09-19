import { defaultLocale, locales, pathnames, type Locale } from "./routing";

/**
 * Pure URL helpers over the `pathnames` map.
 *
 * next-intl's `getPathname` does the same job, but it lives in
 * `next-intl/navigation`, which drags the navigation runtime into whatever
 * imports it — including `src/lib/seo.ts`, which client components import for
 * `APP_URL` and `PRICING`. These functions only read the routing config, so
 * they are safe to use from metadata, the sitemap and route handlers alike.
 */

export type PathnameKey = keyof typeof pathnames;

/**
 * Pages whose *body copy* is fully translated, not just their nav and footer.
 *
 * Only these get an `hreflang` entry per locale and an English URL in the
 * sitemap. Everywhere else the English route still renders (the nav, footer and
 * language switcher work), but its canonical points at the Portuguese URL, so
 * Google is not invited to index a page that is mostly Portuguese under an
 * English hreflang claim.
 *
 * **Add a path here the moment its copy is translated** — that is the whole
 * mechanism, there is nothing else to switch on.
 */
/**
 * Paths whose English version is not ready, and which must therefore keep
 * canonicalising to the Portuguese URL instead of being indexed as English.
 *
 * Derived by exclusion from `pathnames` on purpose. This was previously a
 * hand-written allowlist of the three paths that happened to be localized first,
 * and it silently stopped matching reality as the rest were translated: every
 * newly localized page kept pointing its canonical at the Portuguese URL, so the
 * English version would never have been indexed. Two lists that have to agree is
 * the bug. One list plus explicit exceptions cannot drift.
 *
 * Empty today — every route in `pathnames` has authored English copy.
 */
const notYetLocalized = new Set<string>([]);

export function isFullyLocalized(path: string) {
  return (
    Object.prototype.hasOwnProperty.call(pathnames, path) &&
    !notYetLocalized.has(path)
  );
}

function isPathnameKey(path: string): path is PathnameKey {
  return Object.prototype.hasOwnProperty.call(pathnames, path);
}

/**
 * Resolve an internal pathname key (always the Portuguese spelling, e.g.
 * `/precos`) to the path a reader in `locale` actually sees (`/en/pricing`).
 *
 * Unknown paths pass through unchanged but still get the locale prefix, which
 * matches how next-intl's `Link` behaves.
 */
export function localizedPathname(
  path: string,
  locale: Locale,
  params?: Record<string, string>,
): string {
  let resolved = path;

  if (isPathnameKey(path)) {
    const config = pathnames[path];
    resolved = typeof config === "string" ? config : config[locale];
  }

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      resolved = resolved.replace(`[${key}]`, value);
    }
  }

  // `localePrefix: "as-needed"` — Portuguese stays at the root so every
  // currently indexed URL keeps working.
  if (locale === defaultLocale) {
    return resolved;
  }

  return resolved === "/" ? `/${locale}` : `/${locale}${resolved}`;
}

/** Absolute URL for an internal pathname key in a given locale. */
export function localizedUrl(
  siteUrl: string,
  path: string,
  locale: Locale,
  params?: Record<string, string>,
): string {
  const localized = localizedPathname(path, locale, params);
  return localized === "/" ? siteUrl : `${siteUrl}${localized}`;
}

/**
 * The canonical URL for a page. For a translated page that is the page itself;
 * for one that only exists in Portuguese it is the Portuguese URL, whichever
 * locale the reader arrived in.
 */
export function canonicalUrl(
  siteUrl: string,
  path: string,
  locale: Locale,
  params?: Record<string, string>,
): string {
  const canonicalLocale = isFullyLocalized(path) ? locale : defaultLocale;
  return localizedUrl(siteUrl, path, canonicalLocale, params);
}

/**
 * The hreflang set for one page: one entry per locale that actually has this
 * page in its language, plus `x-default` pointing at the Portuguese URL
 * (Portugal is the primary market and the default locale, so it is the
 * sensible fallback for unmatched languages).
 */
export function hreflangAlternates(
  siteUrl: string,
  path: string,
  params?: Record<string, string>,
): Record<string, string> {
  const languages: Record<string, string> = {};
  const translated = isFullyLocalized(path);

  for (const locale of locales) {
    if (translated || locale === defaultLocale) {
      languages[locale] = localizedUrl(siteUrl, path, locale, params);
    }
  }

  languages["x-default"] = localizedUrl(siteUrl, path, defaultLocale, params);

  return languages;
}
