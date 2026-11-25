import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { toInternalSlug, toPublicSlug } from "./i18n/localeSlugs";
import { isLocalized } from "./i18n/localizationStatus";
import { LOCALE_PREFIX, locales, pathnames, routing, type Locale } from "./i18n/routing";
import type { PathnameKey } from "./i18n/urls";

const CANONICAL_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.scooli.app";

const canonicalUrl = new URL(CANONICAL_SITE_URL);
const canonicalHost = canonicalUrl.host.toLowerCase();
const apexHost = canonicalHost.startsWith("www.")
  ? canonicalHost.slice(4)
  : canonicalHost;
const redirectableHosts = new Set([canonicalHost, apexHost]);

const intlMiddleware = createMiddleware(routing);

/** Prefixed locales by their URL prefix (`/en` → en, `/br` → pt-BR). */
const LOCALE_BY_PREFIX = new Map(
  locales.filter((locale) => LOCALE_PREFIX[locale]).map((locale) => [LOCALE_PREFIX[locale], locale]),
);

/** Slugged route segments in any locale's spelling, so old links in the wrong spelling still land. */
const SLUG_ROUTE_BY_SEGMENT: Record<string, "/ferramentas/[slug]" | "/comparar/[slug]"> = {
  ferramentas: "/ferramentas/[slug]",
  tools: "/ferramentas/[slug]",
  comparar: "/comparar/[slug]",
  compare: "/comparar/[slug]",
};

/** The template a locale uses for an internal pathname key. */
const templateFor = (key: PathnameKey, locale: Locale): string => {
  const config = pathnames[key];
  return typeof config === "string" ? config : config[locale];
};

/** The internal pathname key whose `locale` template matches `path` (the part after the prefix). */
function matchPathnameKey(path: string, locale: Locale): PathnameKey | undefined {
  return (Object.keys(pathnames) as PathnameKey[]).find((key) =>
    new RegExp(`^${templateFor(key, locale).replace(/\[[^\]]+\]/g, "[^/]+")}/?$`).test(path),
  );
}

/**
 * Paths locale routing must not touch: API routes, Next internals, the PostHog
 * proxy rewrites, the social share image (`/og`, which takes the locale as a
 * query parameter), and anything with a file extension (sitemap.xml, robots.txt,
 * images). Host canonicalization still applies to all of them, which is why this
 * is a check inside the handler rather than a `config.matcher` — a matcher would
 * narrow canonicalization too, and that is what fixed the Search Console issue.
 */
const SKIP_LOCALE_ROUTING = /^\/(?:api|_next|_vercel|ingest|_ph|og)(?:\/|$)|\.[^/]+$/;

export function middleware(request: NextRequest) {
  const requestHost = request.nextUrl.host.toLowerCase();

  // Canonical host first. Redirecting before locale routing means the locale
  // rewrite only ever happens on the final host, so we never chain a rewrite
  // into a redirect and lose the locale prefix on the way.
  //
  // Only normalize between the apex and canonical host so preview URLs and
  // other environments keep working as-is.
  if (requestHost !== canonicalHost && redirectableHosts.has(requestHost)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.protocol = canonicalUrl.protocol;
    redirectUrl.hostname = canonicalUrl.hostname;
    redirectUrl.port = canonicalUrl.port;

    return NextResponse.redirect(redirectUrl, 308);
  }

  if (SKIP_LOCALE_ROUTING.test(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const pathname = request.nextUrl.pathname;
  const brPrefix = LOCALE_PREFIX["pt-BR"];

  // pt-BR is published page by page. A page whose copy is not written yet sends
  // the reader to the /br home rather than render pt-PT copy under /br, and the
  // pt-PT spelling of a page Brazil spells differently (`/br/contacto`) goes to
  // the Brazilian one in one permanent hop.
  if (pathname === brPrefix || pathname.startsWith(`${brPrefix}/`)) {
    const rest = pathname.slice(brPrefix.length) || "/";
    const brKey = matchPathnameKey(rest, "pt-BR");
    const key = brKey ?? matchPathnameKey(rest, "pt-PT");
    if (key && !isLocalized(key, "pt-BR")) {
      return NextResponse.redirect(new URL(brPrefix, request.url), 307);
    }
    // shortcut: only static routes are re-spelled; no pt-BR dynamic template differs from pt-PT today.
    if (key && !brKey && !key.includes("[")) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = `${brPrefix}${templateFor(key, "pt-BR")}`;
      return NextResponse.redirect(redirectUrl, 301);
    }
  }

  // Tool and comparison pages have per-locale slugs (see `i18n/localeSlugs.ts`).
  // The internal slug, or a segment in another locale's spelling, redirects to
  // the locale's public URL; the public one is served by rewriting to the
  // internal slug before locale routing runs.
  //
  // A segment in the wrong spelling (`/en/ferramentas/plano-de-aula`) is caught
  // here too and sent to the final URL in one permanent hop. Left to next-intl it
  // got a temporary 307 to `/en/tools/plano-de-aula` and then a second redirect.
  const slugMatch = /^(\/[^/]+)\/(tools|compare|ferramentas|comparar)(?:\/([^/]+))?\/?$/.exec(pathname);
  const slugLocale = slugMatch && LOCALE_BY_PREFIX.get(slugMatch[1]);
  if (slugMatch && slugLocale) {
    const [, prefix, rawSegment, slug] = slugMatch;
    const routePath = SLUG_ROUTE_BY_SEGMENT[rawSegment];
    const segment = templateFor(routePath, slugLocale).split("/")[1];
    if (!slug) {
      if (segment !== rawSegment) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = `${prefix}/${segment}`;
        return NextResponse.redirect(redirectUrl, 301);
      }
      return intlMiddleware(request);
    }
    const internal = toInternalSlug(slugLocale, routePath, slug);
    const publicSlug = toPublicSlug(slugLocale, routePath, internal);
    if (publicSlug !== slug || segment !== rawSegment) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = `${prefix}/${segment}/${publicSlug}`;
      return NextResponse.redirect(redirectUrl, 301);
    }
    if (internal !== slug) {
      const rewritten = request.nextUrl.clone();
      rewritten.pathname = `${prefix}/${segment}/${internal}`;
      return intlMiddleware(new NextRequest(rewritten, request));
    }
  }

  // Portuguese stays at "/" with no prefix; other locales get their prefix (`/en`, `/br`).
  return intlMiddleware(request);
}

/**
 * Excludes only compiled/binary asset requests and internal path prefixes —
 * pages, API routes, sitemap.xml, robots.txt, manifest.json, /og, etc. all
 * still invoke this middleware unconditionally, so host canonicalization
 * keeps applying to every URL type that matters for SEO (see
 * SKIP_LOCALE_ROUTING above for why that has to stay a runtime check rather
 * than live in this matcher). This exact pattern already ran in production
 * on main for about a week with no Search Console regression before this
 * branch was restored, which is what makes it safe to reapply here — without
 * it, middleware runs (and burns Fluid Active CPU) on every JS/CSS chunk,
 * image, and video range request too.
 */
export const config = {
  matcher: [
    "/((?!_next/|_vercel/|_ph/|ingest/|.*\\.(?:js|css|map|png|jpe?g|gif|webp|avif|svg|ico|mp4|webm|woff2?|ttf)$).*)",
  ],
};
