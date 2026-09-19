import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";

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

/**
 * Paths locale routing must not touch: API routes, Next internals, the PostHog
 * proxy rewrites, and anything with a file extension (sitemap.xml, robots.txt,
 * images). Host canonicalization still applies to all of them, which is why this
 * is a check inside the handler rather than a `config.matcher` — a matcher would
 * narrow canonicalization too, and that is what fixed the Search Console issue.
 */
const SKIP_LOCALE_ROUTING = /^\/(?:api|_next|_vercel|ingest|_ph)(?:\/|$)|\.[^/]+$/;

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

  // Portuguese stays at "/" with no prefix; other locales get "/{locale}/".
  return intlMiddleware(request);
}
