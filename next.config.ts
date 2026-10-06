import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

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
    ];
  },

  async headers() {
    return [
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
