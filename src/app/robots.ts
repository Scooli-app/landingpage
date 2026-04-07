import { SITE_URL } from "@/lib/seo";
import type { MetadataRoute } from "next";

/**
 * Robots configuration for search visibility and AI discovery.
 *
 * OpenAI currently separates:
 * - OAI-SearchBot: search inclusion and citation in ChatGPT Search
 * - ChatGPT-User: user-triggered browsing / agent fetches
 * - GPTBot: model-training crawler
 */
export default function robots(): MetadataRoute.Robots {
  const sharedDisallow = ["/api/", "/admin/"];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [...sharedDisallow, "/*.json$", "/private/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: sharedDisallow,
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: sharedDisallow,
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: sharedDisallow,
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: sharedDisallow,
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: sharedDisallow,
      },
      {
        userAgent: "GPTBot",
        disallow: "/",
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: sharedDisallow,
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
        disallow: sharedDisallow,
      },
      {
        userAgent: "CCBot",
        allow: "/",
        disallow: sharedDisallow,
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: sharedDisallow,
      },
      {
        userAgent: "FacebookBot",
        allow: "/",
        disallow: sharedDisallow,
      },
      {
        userAgent: "Applebot",
        allow: "/",
        disallow: sharedDisallow,
      },
      {
        userAgent: "DuckDuckBot",
        allow: "/",
        disallow: sharedDisallow,
      },
      {
        userAgent: "Yandex",
        allow: "/",
        disallow: sharedDisallow,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
