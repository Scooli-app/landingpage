/**
 * SEO & AEO (Answer Engine Optimization) utilities for Scooli
 *
 * This module provides schema generators and SEO utilities
 * to improve discoverability in search engines and AI answer engines.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.scooli.app";

export const SITE_NAME = "Scooli";
export const SITE_LOCALE = "pt_PT";
export const SITE_LANGUAGE = "pt-PT";

// Pricing constants (in cents and euros)
export const PRICING = {
  free: {
    credits: 100,
    price: 0,
  },
  pro_monthly: {
    price: 9.99,
    priceCents: 999,
    period: "month",
  },
  pro_annual: {
    price: 95.9,
    priceCents: 9590,
    period: "year",
    savings: "20%",
  },
} as const;

// Core brand keywords for SEO
export const BRAND_KEYWORDS = [
  "Scooli",
  "IA para professores",
  "inteligência artificial educação",
  "plano de aula",
  "apresentações escolares",
  "testes escolares",
  "quizzes educativos",
  "edtech Portugal",
  "currículo português",
  "aprendizagens essenciais",
  "recursos educativos",
  "biblioteca comunitária",
  "ferramentas para professores",
  "gerador de apresentações",
  "gerador de planos de aula",
  "gerador de testes",
  "ensino básico",
  "ensino secundário",
  "educação Portugal",
  "RGPD educação",
  "Scooli Pro preço",
  "ferramenta IA professores grátis",
] as const;

// Organization Schema - Used across all pages
export function getOrganizationSchema() {
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
    description:
      "Plataforma portuguesa com IA que ajuda professores a criar apresentações, planos de aula, testes e quizzes alinhados ao currículo.",
    foundingDate: "2024",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "info@scooli.app",
      availableLanguage: ["Portuguese"],
      areaServed: "PT",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "PT",
    },
    sameAs: [SITE_URL],
  };
}

// Website Schema with search potential action
export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Scooli - Ferramentas de IA para professores portugueses criarem apresentações, planos de aula, testes e quizzes.",
    inLanguage: SITE_LANGUAGE,
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// SoftwareApplication Schema - Critical for app discovery
export function getSoftwareApplicationSchema() {
  const priceValidUntil = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#app`,
    name: SITE_NAME,
    description:
      "Plataforma de inteligência artificial para professores portugueses. Gera apresentações, planos de aula, testes e quizzes alinhados às aprendizagens essenciais.",
    url: SITE_URL,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    offers: [
      {
        "@type": "Offer",
        name: "Pacote de Boas-vindas",
        description: `${PRICING.free.credits} créditos gratuitos para novos utilizadores`,
        price: "0",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Scooli Pro Mensal",
        description:
          "Geração ilimitada, modelos avançados e suporte prioritário",
        price: PRICING.pro_monthly.price.toString(),
        priceCurrency: "EUR",
        priceValidUntil,
        availability: "https://schema.org/InStock",
        billingIncrement: "P1M",
      },
      {
        "@type": "Offer",
        name: "Scooli Pro Anual",
        description: `Geração ilimitada com ${PRICING.pro_annual.savings} de desconto`,
        price: PRICING.pro_annual.price.toString(),
        priceCurrency: "EUR",
        priceValidUntil,
        availability: "https://schema.org/InStock",
        billingIncrement: "P1Y",
      },
    ],
    featureList: [
      "Geração de apresentações com IA",
      "Criação de planos de aula",
      "Geração de testes e quizzes",
      "Alinhamento com aprendizagens essenciais",
      "Biblioteca comunitária",
      "Upload e transformação de documentos",
      "Templates personalizáveis",
      "Conformidade RGPD",
    ],
    screenshot: `${SITE_URL}/opengraph-image`,
    author: {
      "@id": `${SITE_URL}/#organization`,
    },
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "teacher",
      audienceType: "Professores",
    },
    inLanguage: SITE_LANGUAGE,
    isAccessibleForFree: true,
    countriesSupported: "PT",
  };
}

// Product Schema for pricing pages - helps with rich results
export function getProductSchema() {
  const priceValidUntil = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE_URL}/#product`,
    name: "Scooli Pro",
    description:
      "Plano premium da Scooli com geração ilimitada de recursos educativos, modelos de IA avançados e suporte prioritário para professores.",
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    offers: [
      {
        "@type": "Offer",
        name: "Scooli Pro Mensal",
        price: PRICING.pro_monthly.price.toString(),
        priceCurrency: "EUR",
        priceValidUntil,
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/#precos`,
        seller: {
          "@id": `${SITE_URL}/#organization`,
        },
      },
      {
        "@type": "Offer",
        name: "Scooli Pro Anual",
        price: PRICING.pro_annual.price.toString(),
        priceCurrency: "EUR",
        priceValidUntil,
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/#precos`,
        seller: {
          "@id": `${SITE_URL}/#organization`,
        },
      },
    ],
    category: "Educational Software",
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "teacher",
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
}

export function getWebPageSchema(options: WebPageSchemaOptions) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${options.url}/#webpage`,
    name: options.title,
    description: options.description,
    url: options.url,
    inLanguage: SITE_LANGUAGE,
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
  steps: HowToStep[]
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
export function getServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/#service`,
    name: "Scooli - Geração de Recursos Educativos com IA",
    description:
      "Serviço de geração automática de apresentações, planos de aula, testes e quizzes para professores portugueses, utilizando inteligência artificial alinhada ao currículo nacional.",
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
    serviceType: "Educational Technology Service",
    areaServed: {
      "@type": "Country",
      name: "Portugal",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Planos Scooli",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Pacote de Boas-vindas",
            description: `${PRICING.free.credits} créditos gratuitos para experimentar a plataforma`,
          },
          price: "0",
          priceCurrency: "EUR",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Scooli Pro",
            description:
              "Geração ilimitada de recursos com modelos de IA avançados",
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

// Educational features list for SEO content
export const EDUCATIONAL_FEATURES = {
  presentations: {
    title: "Gerador de Apresentações com IA",
    description:
      "Crie apresentações profissionais para aulas em segundos. Slides claros, com sugestões de imagens e ritmo de aula adequado ao nível de ensino.",
    keywords: [
      "apresentações escolares",
      "slides para aulas",
      "PowerPoint educativo",
    ],
  },
  lessonPlans: {
    title: "Gerador de Planos de Aula",
    description:
      "Planificações completas com objetivos, metodologias e avaliação alinhados às aprendizagens essenciais portuguesas.",
    keywords: ["plano de aula", "planificação", "objetivos de aprendizagem"],
  },
  tests: {
    title: "Gerador de Testes e Quizzes",
    description:
      "Crie testes, fichas de trabalho e quizzes com itens diversificados e rubricas de correção automáticas.",
    keywords: ["testes escolares", "fichas de trabalho", "quizzes educativos"],
  },
  community: {
    title: "Biblioteca Comunitária",
    description:
      "Partilhe e aceda a recursos criados por professores portugueses. Ganhe créditos contribuindo para a comunidade.",
    keywords: [
      "recursos educativos",
      "partilha de materiais",
      "comunidade de professores",
    ],
  },
} as const;

// Generate all homepage schemas
export function getHomePageSchemas() {
  return [
    getOrganizationSchema(),
    getWebsiteSchema(),
    getSoftwareApplicationSchema(),
    getProductSchema(),
    getServiceSchema(),
  ];
}

// Utility to inject schema into head
export function schemaToScript(schema: object): string {
  return JSON.stringify(schema);
}
