import { SITE_URL } from "@/lib/seo";
import type { MetadataRoute } from "next";

/**
 * Robots.txt configuration optimized for SEO and AEO (Answer Engine Optimization)
 *
 * This configuration:
 * - Allows all major search engine crawlers
 * - Explicitly allows AI/LLM crawlers for AEO (GPTBot, Google-Extended, etc.)
 * - Blocks sensitive paths (API, admin, internal Next.js routes)
 * - Points to sitemap for better crawl efficiency
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Main rule for all standard crawlers
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/", "/*.json$", "/private/"],
      },
      // Google Search crawler - full access
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      // Bing crawler - full access
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      // Google Extended (AI features like Bard/SGE) - ALLOW for AEO
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      // OpenAI's GPTBot - ALLOW for ChatGPT search features (AEO)
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      // OpenAI's ChatGPT-User - ALLOW for ChatGPT browsing
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      // Anthropic's AI crawler - ALLOW for Claude search features
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      // Anthropic's Claude-Web - ALLOW for Claude browsing
      {
        userAgent: "Claude-Web",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      // Common Crawl (used by many AI training datasets) - ALLOW
      {
        userAgent: "CCBot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      // Perplexity AI crawler - ALLOW for Perplexity search
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      // Meta AI crawler - ALLOW
      {
        userAgent: "FacebookBot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      // Apple's Applebot (Siri, Spotlight) - ALLOW
      {
        userAgent: "Applebot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      // DuckDuckGo crawler - ALLOW
      {
        userAgent: "DuckDuckBot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      // Yandex crawler - ALLOW
      {
        userAgent: "Yandex",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
