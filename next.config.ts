import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/**
 * Security headers for every response. The CSP is deliberately narrow: it
 * blocks clickjacking, <base> hijacking and plugins without restricting
 * scripts, so PostHog, Speed Insights and the booking embed keep working. A
 * script-src policy would need per-request nonces, which forces every page to
 * render dynamically.
 */
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: "base-uri 'self'; object-src 'none'; frame-ancestors 'self'; upgrade-insecure-requests",
  },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // Vercel's default HSTS, plus includeSubDomains.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: true,
  },

  async redirects() {
    return [
      // The community library page was folded into the teachers page.
      { source: "/biblioteca", destination: "/professores#biblioteca", permanent: true },
      { source: "/en/library", destination: "/en/teachers#biblioteca", permanent: true },
      // Teachers looking for the app on the marketing domain.
      { source: "/dashboard", destination: "https://create.scooli.app/dashboard", permanent: true },
      // Old slugs for the AI-for-teachers page. Search Console still shows them
      // with clicks, and they 404 since the slugs were consolidated.
      { source: "/ia-professores", destination: "/ia-para-professores", permanent: true },
      { source: "/ia-for-professores", destination: "/ia-para-professores", permanent: true },
      { source: "/ia-for-teachers", destination: "/en/ai-for-teachers", permanent: true },
      { source: "/en/ia-for-teachers", destination: "/en/ai-for-teachers", permanent: true },
      // Portuguese has no locale prefix; an old `/pt/...` URL is still indexed.
      { source: "/pt", destination: "/", permanent: true },
      { source: "/pt/:path*", destination: "/:path*", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // PostHog static assets are versioned (?v=x.x.x) — safe to cache for 1 year
        source: "/ingest/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Product films and captures. Not fingerprinted, so a day (and a week of
        // stale-while-revalidate) instead of `immutable`: a re-encoded film still
        // reaches visitors within a day.
        source: "/app/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/_ph/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/_ph/static/:path*",
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/_ph/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
      {
        source: "/ingest/static/:path*",
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
    ];
  },
};

export default withNextIntl(nextConfig);
