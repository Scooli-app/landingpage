import { isLocalized } from "./localizationStatus";
import { LOCALE_PREFIX, defaultLocale, locales, pathnames, type Locale } from "./routing";
import { toPublicSlug } from "./localeSlugs";

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
      resolved = resolved.replace(`[${key}]`, toPublicSlug(locale, path, value));
    }
  }

  // pt-PT has no prefix, so every currently indexed URL keeps working.
  const prefix = LOCALE_PREFIX[locale];
  if (!prefix) {
    return resolved;
  }

  return resolved === "/" ? prefix : `${prefix}${resolved}`;
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
 * The canonical URL for a page. For a localized page that is the page itself;
 * for one not yet localized in `locale` it is the pt-PT URL (see
 * `localizationStatus.ts`).
 */
export function canonicalUrl(
  siteUrl: string,
  path: string,
  locale: Locale,
  params?: Record<string, string>,
): string {
  const canonicalLocale = isLocalized(path, locale) ? locale : defaultLocale;
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

  for (const locale of locales) {
    if (isLocalized(path, locale)) {
      languages[locale] = localizedUrl(siteUrl, path, locale, params);
    }
  }

  languages["x-default"] = localizedUrl(siteUrl, path, defaultLocale, params);

  return languages;
}
