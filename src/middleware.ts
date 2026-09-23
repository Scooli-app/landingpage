import { NextResponse, type NextRequest } from "next/server";

const CANONICAL_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.scooli.app";

const canonicalUrl = new URL(CANONICAL_SITE_URL);
const canonicalHost = canonicalUrl.host.toLowerCase();
const apexHost = canonicalHost.startsWith("www.")
  ? canonicalHost.slice(4)
  : canonicalHost;
const redirectableHosts = new Set([canonicalHost, apexHost]);

export function middleware(request: NextRequest) {
  const requestHost = request.nextUrl.host.toLowerCase();

  // Only normalize between the apex and canonical host so preview URLs and
  // other environments keep working as-is.
  if (
    requestHost === canonicalHost ||
    !redirectableHosts.has(requestHost)
  ) {
    return NextResponse.next();
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.protocol = canonicalUrl.protocol;
  redirectUrl.hostname = canonicalUrl.hostname;
  redirectUrl.port = canonicalUrl.port;

  return NextResponse.redirect(redirectUrl, 308);
}

// Without a matcher this runs on every request (JS/CSS chunks, images, video
// range requests, PostHog proxy calls), which burns Fluid Active CPU. Only
// page navigations need the apex -> www redirect.
export const config = {
  matcher: [
    "/((?!_next/|_vercel/|_ph/|ingest/|.*\\.(?:js|css|map|png|jpe?g|gif|webp|avif|svg|ico|mp4|webm|woff2?|ttf)$).*)",
  ],
};
