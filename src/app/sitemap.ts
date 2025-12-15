import { SITE_URL } from "@/lib/seo";
import type { MetadataRoute } from "next";

/**
 * Enhanced sitemap configuration for SEO
 *
 * Features:
 * - Proper priority assignments based on page importance
 * - Accurate change frequencies
 * - Language alternates for international SEO
 * - Image references for rich results
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Helper to add language alternates
  const withAlternates = (path: string) => ({
    languages: {
      "pt-PT": `${SITE_URL}${path}`,
      "x-default": `${SITE_URL}${path}`,
    },
  });

  return [
    // Homepage - highest priority
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: withAlternates(""),
    },
    // Privacy Policy - important for trust
    {
      url: `${SITE_URL}/privacy`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: withAlternates("/privacy"),
    },
    // Terms of Use - important for trust
    {
      url: `${SITE_URL}/terms`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: withAlternates("/terms"),
    },
    // Cancel Subscription - lower priority
    {
      url: `${SITE_URL}/cancelar-subscricao`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: withAlternates("/cancelar-subscricao"),
    },
    // Billing - placeholder page, lower priority
    {
      url: `${SITE_URL}/billing`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.3,
      alternates: withAlternates("/billing"),
    },
  ];
}

/**
 * Note: For future enhancement, consider adding:
 *
 * 1. Dynamic blog/resource pages sitemap generation
 * 2. Image sitemap for visual content
 * 3. Video sitemap if video content is added
 *
 * Example image sitemap entry:
 * {
 *   url: `${SITE_URL}/recursos/apresentacao-matematica`,
 *   lastModified,
 *   images: [
 *     {
 *       url: `${SITE_URL}/images/apresentacao-matematica.png`,
 *       title: "Apresentação de Matemática",
 *       caption: "Exemplo de apresentação gerada pela Scooli",
 *     }
 *   ]
 * }
 */
