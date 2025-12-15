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
        description: "100 créditos gratuitos para novos utilizadores",
        price: "0",
        priceCurrency: "EUR",
      },
      {
        "@type": "Offer",
        name: "Scooli Pro",
        description:
          "Geração ilimitada, modelos avançados e suporte prioritário",
        price: "7.99",
        priceCurrency: "EUR",
        priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        availability: "https://schema.org/PreOrder",
      },
    ],
    featureList: [
      "Geração de apresentações com IA",
      "Criação de planos de aula",
      "Geração de testes e quizzes",
      "Alinhamento com aprendizagens essenciais",
      "Biblioteca comunitária",
      "Upload e transformação de documentos",
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
  ];
}

// Utility to inject schema into head
export function schemaToScript(schema: object): string {
  return JSON.stringify(schema);
}
