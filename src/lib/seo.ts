import type { Metadata } from "next";
import { defaultLocale, type Locale } from "@/i18n/routing";
import { canonicalUrl, hreflangAlternates, localizedUrl } from "@/i18n/urls";
/**
 * SEO & AEO (Answer Engine Optimization) utilities for Scooli
 *
 * This module provides schema generators and SEO utilities
 * to improve discoverability in search engines and AI answer engines.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.scooli.app";

export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ||
  "https://create.scooli.app";

/**
 * The app's sign-up page, carrying the language this visitor is reading the
 * site in.
 *
 * The app cannot work it out for itself. This site and the app live on
 * different hosts, so the `NEXT_LOCALE` cookie does not cross, and the only
 * thing left to fall back on is the browser's language — which would sign a
 * Portuguese teacher whose browser is set to English up into an English app,
 * with English emails, the opposite of what they were just reading. Passed for
 * every locale, Portuguese included, so the default is stated rather than
 * guessed.
 *
 * Sign-up only: an existing account already has its own saved preference, so
 * sign-in links stay bare.
 */
export function appSignUpUrl(locale: Locale): string {
  return `${APP_URL}/sign-up?locale=${encodeURIComponent(locale)}`;
}

/**
 * Sign-up that lands straight in the lesson-plan form with the visitor's topic
 * filled in (the form reads `?topic=`), so the first thing after the account
 * exists is the document they asked for.
 */
export function appSignUpWithTopicUrl(locale: Locale, topic: string): string {
  const trimmed = topic.trim();
  if (!trimmed) {return appSignUpUrl(locale);}
  const target = `${APP_URL}/lesson-plan?topic=${encodeURIComponent(trimmed)}`;
  return `${appSignUpUrl(locale)}&redirect_url=${encodeURIComponent(target)}`;
}

export const SITE_NAME = "Scooli";

/**
 * Portuguese remains the site's primary language: it is the default locale, the
 * `x-default` target and the language of the structured data describing the
 * organisation. `SITE_LOCALE`/`SITE_LANGUAGE` are those defaults — anything
 * rendered per page must use the request locale instead, via
 * `openGraphLocale()` / `getPageMetadata({ locale })`.
 */
export const SITE_LOCALE = "pt_PT";
export const SITE_LANGUAGE = "pt-PT";

/** BCP-47 locale to the underscored form Open Graph expects. */
export function openGraphLocale(locale: Locale) {
  return locale.replace("-", "_");
}

export const SHARE_IMAGE_SIZE = { width: 1200, height: 630 } as const;

/**
 * The social share card for a locale, rendered by `src/app/og/route.tsx`.
 * Portuguese keeps the bare URL so the default card has one stable address.
 */
export function shareImageUrl(locale: Locale = defaultLocale) {
  return locale === defaultLocale
    ? `${SITE_URL}/og`
    : `${SITE_URL}/og?locale=${locale}`;
}

export function getPageMetadata({
  title,
  description,
  path,
  keywords,
  locale = defaultLocale,
  params,
}: {
  title: string;
  description: string;
  /**
   * The *internal* pathname key from `src/i18n/routing.ts` — always the
   * Portuguese spelling (`/precos`, `/ferramentas/[slug]`). The English URL is
   * derived from it, so callers never hardcode `/en/...`.
   */
  path: string;
  keywords?: readonly string[];
  locale?: Locale;
  /** Values for dynamic segments, e.g. `{ slug: "fichas-de-trabalho" }`. */
  params?: Record<string, string>;
}): Metadata {
  const url = path ? localizedUrl(SITE_URL, path, locale, params) : SITE_URL;

  return {
    title,
    description,
    keywords: keywords ? [...keywords] : undefined,
    alternates: {
      // Self-referencing canonical for translated pages, so the Portuguese and
      // English versions are understood as translations rather than as
      // duplicates competing with each other. Pages whose body copy is still
      // only Portuguese canonicalise back to the Portuguese URL — see
      // `localizedPaths` in `src/i18n/urls.ts`.
      canonical: path ? canonicalUrl(SITE_URL, path, locale, params) : SITE_URL,
      languages: hreflangAlternates(SITE_URL, path, params),
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      locale: openGraphLocale(locale),
      siteName: SITE_NAME,
      images: [
        {
          url: shareImageUrl(locale),
          ...SHARE_IMAGE_SIZE,
          alt: `${SITE_NAME} - ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImageUrl(locale)],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// Pricing constants (in cents and euros)
export const PRICING = {
  free: {
    generationsPerMonth: 20,
    price: 0,
  },
  pro_monthly: {
    price: 6.99,
    priceCents: 699,
    period: "month",
  },
  pro_annual: {
    price: 67.1,
    priceCents: 6710,
    period: "year",
    savings: "20%",
  },
} as const;

// Public impact metrics. Conservative floors confirmed by the team on
// 2026-10-05; the UI presents them as "X+". Every page and schema reads from
// here, so this is the one place to update them.
export const PUBLIC_IMPACT_METRICS = {
  activeTeachers: {
    minValue: 500,
  },
  generatedDocuments: {
    minValue: 900,
    interactionType: "https://schema.org/CreateAction",
  },
} as const;

/**
 * Root-level fallback keywords; every localized page overrides these with its
 * own list. English is market-agnostic (see CLAUDE.md), so it carries no
 * Portugal- or curriculum-specific terms.
 */
const BRAND_KEYWORDS_PT = [
  "Scooli",
  "IA para professores",
  "inteligência artificial na educação",
  "planificação de aulas",
  "planos de aula",
  "fichas de trabalho",
  "gerador de fichas de trabalho",
  "fichas para imprimir",
  "apresentações escolares",
  "testes escolares",
  "quizzes educativos",
  "adaptação de materiais",
  "currículo português",
  "aprendizagens essenciais",
  "alinhamento curricular",
  "plataforma para professores em portugal",
  "recursos educativos",
  "biblioteca comunitária",
  "ferramentas para professores",
  "gerador de planificações",
  "gerador de testes",
  "ensino básico",
  "ensino secundário",
  "RGPD educação",
] as const;

const BRAND_KEYWORDS_EN = [
  "Scooli",
  "AI for teachers",
  "AI in education",
  "lesson planning",
  "lesson plan generator",
  "worksheet generator",
  "printable worksheets",
  "test generator",
  "quiz generator",
  "slides for lessons",
  "teaching resources",
  "material adaptation",
  "tools for teachers",
  "teacher workload",
] as const;

export function brandKeywords(locale: Locale): readonly string[] {
  return locale === "en" ? BRAND_KEYWORDS_EN : BRAND_KEYWORDS_PT;
}

/**
 * Locale-specific wording for the structured data below. The organisation's
 * factual details (address, contact) are the same in every language; what it
 * says about itself follows the page language, and the English version makes
 * no market claims.
 */
const schemaCopy = {
  "pt-PT": {
    organization:
      "Plataforma portuguesa com IA que ajuda professores a preparar aulas em menos tempo: planos de aula, fichas, testes, quizzes, planificações e apresentações alinhados com as Aprendizagens Essenciais.",
    website:
      "Scooli - IA para professores: planos de aula, fichas, testes, quizzes, planificações e apresentações alinhados com as Aprendizagens Essenciais.",
    application:
      "Plataforma de inteligência artificial para professores em Portugal. Acompanha o professor ao longo do ano letivo e cria planos de aula, fichas, testes, quizzes, planificações e apresentações alinhados com as Aprendizagens Essenciais.",
    service:
      "Serviço de criação de recursos educativos com IA para professores em Portugal: planos de aula, fichas, testes, quizzes, planificações e apresentações alinhados com as Aprendizagens Essenciais.",
    serviceName: "Scooli - Recursos educativos com IA",
    product:
      "Plano premium da Scooli com geração ilimitada de recursos educativos, modelos de IA avançados e suporte prioritário para professores.",
    audience: "Professores",
    offers: {
      free: "Plano Gratuito",
      freeDescription: `${PRICING.free.generationsPerMonth} créditos por mês`,
      monthly: "Scooli Pro Mensal",
      monthlyDescription: "Geração ilimitada, modelos avançados e suporte prioritário",
      annual: "Scooli Pro Anual",
      annualDescription: `Geração ilimitada com ${PRICING.pro_annual.savings} de desconto`,
      pro: "Scooli Pro",
      catalog: "Planos Scooli",
    },
    features: [
      "Planos de aula",
      "Fichas de trabalho",
      "Testes e quizzes",
      "Planificações anuais e de unidade",
      "Apresentações",
      "Calendário de aulas ao longo do ano",
      "Conteúdos alinhados com as Aprendizagens Essenciais",
      "Adaptação de materiais",
      "Biblioteca comunitária",
      "RGPD",
    ],
  },
  en: {
    organization:
      "AI platform that helps teachers prepare lessons in less time: lesson plans, worksheets, tests, quizzes, yearly plans and slide decks, structured and ready to edit.",
    website:
      "Scooli - AI for teachers: lesson plans, worksheets, tests, quizzes, yearly plans and slide decks, ready to edit.",
    application:
      "AI platform for teachers. It stays with the teacher through the school year and creates lesson plans, worksheets, tests, quizzes, yearly plans and slide decks the teacher reviews and edits.",
    service:
      "AI service that creates teaching resources: lesson plans, worksheets, tests, quizzes, yearly plans and slide decks, structured and editable.",
    serviceName: "Scooli - AI teaching resources",
    product:
      "Scooli's premium plan, with unlimited resource generation, advanced AI models and priority support for teachers.",
    audience: "Teachers",
    offers: {
      free: "Free plan",
      freeDescription: `${PRICING.free.generationsPerMonth} credits per month`,
      monthly: "Scooli Pro Monthly",
      monthlyDescription: "Unlimited generation, advanced models and priority support",
      annual: "Scooli Pro Annual",
      annualDescription: `Unlimited generation with ${PRICING.pro_annual.savings} off`,
      pro: "Scooli Pro",
      catalog: "Scooli plans",
    },
    features: [
      "Lesson plans",
      "Worksheets",
      "Tests and quizzes",
      "Yearly and unit plans",
      "Slide decks",
      "Lesson calendar for the school year",
      "Material adaptation",
      "Shared library",
      "GDPR",
    ],
  },
} as const;

/**
 * The [locale] segment can carry anything (`/nao-existe` renders the page
 * alongside the layout's notFound()), so never index the copy blindly.
 */
function copyFor(locale: string) {
  return locale === "en" ? schemaCopy.en : schemaCopy["pt-PT"];
}

// Organization Schema - Used across all pages
export function getOrganizationSchema(locale: Locale = defaultLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/scooli.svg`,
      width: 512,
      height: 512,
    },
    description: copyFor(locale).organization,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "info@scooli.app",
      availableLanguage: ["Portuguese", "English"],
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "PT",
    },
    sameAs: [SITE_URL],
  };
}

export function getWebsiteSchema(locale: Locale = defaultLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: copyFor(locale).website,
    inLanguage: locale,
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

// SoftwareApplication Schema - Critical for app discovery
export function getSoftwareApplicationSchema(locale: Locale = defaultLocale) {
  const copy = copyFor(locale);
  const priceValidUntil = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#app`,
    name: SITE_NAME,
    description: copy.application,
    url: localizedUrl(SITE_URL, "/", locale),
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    offers: [
      {
        "@type": "Offer",
        name: copy.offers.free,
        description: copy.offers.freeDescription,
        price: "0",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: copy.offers.monthly,
        description: copy.offers.monthlyDescription,
        price: PRICING.pro_monthly.price.toString(),
        priceCurrency: "EUR",
        priceValidUntil,
        availability: "https://schema.org/InStock",
        billingIncrement: "P1M",
      },
      {
        "@type": "Offer",
        name: copy.offers.annual,
        description: copy.offers.annualDescription,
        price: PRICING.pro_annual.price.toString(),
        priceCurrency: "EUR",
        priceValidUntil,
        availability: "https://schema.org/InStock",
        billingIncrement: "P1Y",
      },
    ],
    featureList: [...copy.features],
    screenshot: shareImageUrl(locale),
    author: {
      "@id": `${SITE_URL}/#organization`,
    },
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
    interactionStatistic: [
      {
        "@type": "InteractionCounter",
        interactionType: PUBLIC_IMPACT_METRICS.generatedDocuments.interactionType,
        userInteractionCount: PUBLIC_IMPACT_METRICS.generatedDocuments.minValue,
      },
    ],
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "teacher",
      audienceType: copy.audience,
    },
    inLanguage: locale,
    isAccessibleForFree: true,
  };
}

// MerchantReturnPolicy schema for digital products
function getMerchantReturnPolicy() {
  return {
    "@type": "MerchantReturnPolicy",
    "@id": `${SITE_URL}/#return-policy`,
    applicableCountry: "PT",
    returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
    merchantReturnDays: 0,
    returnMethod: "https://schema.org/ReturnByMail",
    returnFees: "https://schema.org/FreeReturn",
  };
}

// ShippingDetails schema for digital products (immediate delivery)
function getShippingDetails() {
  return {
    "@type": "OfferShippingDetails",
    shippingRate: {
      "@type": "MonetaryAmount",
      value: "0",
      currency: "EUR",
    },
    shippingDestination: {
      "@type": "DefinedRegion",
      addressCountry: "PT",
    },
    deliveryTime: {
      "@type": "ShippingDeliveryTime",
      handlingTime: {
        "@type": "QuantitativeValue",
        minValue: 0,
        maxValue: 0,
        unitCode: "h",
      },
      transitTime: {
        "@type": "QuantitativeValue",
        minValue: 0,
        maxValue: 0,
        unitCode: "h",
      },
    },
  };
}

/**
 * Product schema for the Pro plan on the pricing page. It carries no review or
 * aggregate rating markup: Scooli has no published reviews to mark up yet, and
 * Google requires ratings to reflect real, visible reviews.
 */
export function getProductSchema(locale: Locale = defaultLocale) {
  const copy = copyFor(locale);
  const pricingUrl = localizedUrl(SITE_URL, "/precos", locale);
  const priceValidUntil = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const returnPolicy = getMerchantReturnPolicy();
  const shippingDetails = getShippingDetails();

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE_URL}/#product`,
    name: "Scooli Pro",
    description: copy.product,
    image: shareImageUrl(locale),
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    offers: [
      {
        "@type": "Offer",
        name: copy.offers.monthly,
        price: PRICING.pro_monthly.price.toString(),
        priceCurrency: "EUR",
        priceValidUntil,
        availability: "https://schema.org/InStock",
        url: pricingUrl,
        seller: {
          "@id": `${SITE_URL}/#organization`,
        },
        hasMerchantReturnPolicy: returnPolicy,
        shippingDetails: shippingDetails,
      },
      {
        "@type": "Offer",
        name: copy.offers.annual,
        price: PRICING.pro_annual.price.toString(),
        priceCurrency: "EUR",
        priceValidUntil,
        availability: "https://schema.org/InStock",
        url: pricingUrl,
        seller: {
          "@id": `${SITE_URL}/#organization`,
        },
        hasMerchantReturnPolicy: returnPolicy,
        shippingDetails: shippingDetails,
      },
    ],
    category: "Educational Software",
    // Use standard Audience type for Product schema (EducationalAudience is not valid here)
    audience: {
      "@type": "Audience",
      audienceType: copy.audience,
    },
  };
}

// FAQ Schema Generator - Critical for AEO
export interface FAQItem {
  question: string;
  answer: string;
}

export function getFAQPageSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// Breadcrumb Schema Generator
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// WebPage Schema for individual pages
export interface WebPageSchemaOptions {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  breadcrumb?: BreadcrumbItem[];
  /** The language this page is actually written in; defaults to Portuguese. */
  locale?: Locale;
}

export function getWebPageSchema(options: WebPageSchemaOptions) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${options.url}/#webpage`,
    name: options.title,
    description: options.description,
    url: options.url,
    inLanguage: options.locale ?? SITE_LANGUAGE,
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    about: {
      "@id": `${SITE_URL}/#organization`,
    },
  };

  if (options.datePublished) {
    schema.datePublished = options.datePublished;
  }

  if (options.dateModified) {
    schema.dateModified = options.dateModified;
  }

  if (options.breadcrumb) {
    schema.breadcrumb = getBreadcrumbSchema(options.breadcrumb);
  }

  return schema;
}

// HowTo Schema for feature explanations
export interface HowToStep {
  name: string;
  text: string;
}

export function getHowToSchema(
  name: string,
  description: string,
  steps: HowToStep[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

// Service Schema for better AEO
export function getServiceSchema(locale: Locale = defaultLocale) {
  const copy = copyFor(locale);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/#service`,
    name: copy.serviceName,
    description: copy.service,
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
    serviceType: "Educational Technology Service",
    // The English site is market-agnostic, so only Portuguese names a country.
    ...(locale === "en"
      ? {}
      : { areaServed: { "@type": "Country", name: "Portugal" } }),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: copy.offers.catalog,
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: copy.offers.free,
            description: copy.offers.freeDescription,
          },
          price: "0",
          priceCurrency: "EUR",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: copy.offers.pro,
            description: copy.offers.monthlyDescription,
          },
          price: PRICING.pro_monthly.price.toString(),
          priceCurrency: "EUR",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: PRICING.pro_monthly.price.toString(),
            priceCurrency: "EUR",
            billingDuration: "P1M",
          },
        },
      ],
    },
  };
}

/** Rendered in the <head> of every page, in the page's language. */
export function getGlobalSchemas(locale: Locale = defaultLocale) {
  return [getOrganizationSchema(locale), getWebsiteSchema(locale)];
}

export function getHomePageSchemas(locale: Locale = defaultLocale) {
  return [getSoftwareApplicationSchema(locale), getServiceSchema(locale)];
}
