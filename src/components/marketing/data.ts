import { PUBLIC_IMPACT_METRICS } from "@/lib/seo";
import { routing, type Locale } from "@/i18n/routing";
import type { MarketingHref } from "@/i18n/navigation";
import { marketingContentEn } from "./content/en";
import { marketingContentPtPT } from "./content/pt-PT";

/**
 * Marketing copy lives in `./content/{locale}.ts`, not here.
 *
 * This module keeps only what is *structural* and therefore locale-independent:
 * slugs, layout choices and the ordering of things. Everything a reader
 * can see is a per-locale content module, and the two are zipped together at
 * render time by the `get*` functions below.
 *
 * Why a TS content module rather than `messages/{locale}.json`: this copy is
 * deeply nested arrays of records (nine tool pages, each with FAQs, how-to
 * steps, content sections and keyword lists). next-intl's message format has no
 * good representation for "an array of objects of unknown length" — you end up
 * with `tools.planificacoes.faq.0.question` keys that nothing can type-check and
 * that silently go missing when one locale has three FAQs and the other four.
 * A typed module gives a compile error instead, and keeps the copy next to the
 * types that describe it. Page chrome (headings, labels, CTA text) does live in
 * the JSON catalogues, where flat keys are the right shape.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type MarketingCardContent = {
  title: string;
  description: string;
};

export type ToolFaq = {
  question: string;
  answer: string;
};

export type ToolContentSection = {
  title: string;
  description: string;
  bullets?: string[];
};

export type ToolRelatedLink = {
  label: string;
  href: MarketingHref;
};

export type ToolHowToStep = {
  name: string;
  text: string;
};

export type ToolLayout = "planning" | "assessment";

export type ToolPageContent = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  hero: string;
  useCases: string[];
  outputs: string[];
  benefits: string[];
  contentSections: ToolContentSection[];
  faq: ToolFaq[];
  relatedLinks: ToolRelatedLink[];
  howToSteps: ToolHowToStep[];
  seoKeywords: string[];
};

export type ToolPageData = ToolPageContent & {
  layout?: ToolLayout;
};

export type StatContent = {
  value: string;
  label: string;
  source?: string;
};

export type MarketingContent = {
  impactStatLabels: {
    activeTeachers: string;
    generatedDocuments: string;
  };
  trustCards: MarketingCardContent[];
  schoolPageCards: MarketingCardContent[];
  toolPages: ToolPageContent[];
};

// ─── Structure ────────────────────────────────────────────────────────────────

/**
 * Canonical tool order. The URL slug is deliberately the same in every locale:
 * `pathnames` translates the `/ferramentas` segment to `/tools`, but the slug
 * itself is the data key that `generateStaticParams` uses.
 */
export const toolSlugs = [
  "planificacoes",
  "plano-de-aula",
  "sequencias-de-aulas",
  "gerador-de-testes",
  "fichas-de-trabalho",
  "quizzes",
  "apresentacoes",
  "adaptacao-de-materiais",
  "carregar-documentos",
] as const;

export type ToolSlug = (typeof toolSlugs)[number];

export const toolLayouts: Partial<Record<string, ToolLayout>> = {
  planificacoes: "planning",
  "plano-de-aula": "planning",
  "sequencias-de-aulas": "planning",
  "gerador-de-testes": "assessment",
  quizzes: "assessment",
};

// ─── Content lookup ───────────────────────────────────────────────────────────

const contentByLocale: Record<Locale, MarketingContent> = {
  "pt-PT": marketingContentPtPT,
  en: marketingContentEn,
};

function resolveLocale(locale: string): Locale {
  return (routing.locales as readonly string[]).includes(locale)
    ? (locale as Locale)
    : routing.defaultLocale;
}

export function getMarketingContent(locale: string): MarketingContent {
  return contentByLocale[resolveLocale(locale)];
}

// ─── Accessors ────────────────────────────────────────────────────────────────

export function getToolPages(locale: string): ToolPageData[] {
  return getMarketingContent(locale).toolPages.map((tool) => ({
    ...tool,
    layout: toolLayouts[tool.slug],
  }));
}

export function getToolPage(locale: string, slug: string): ToolPageData | undefined {
  return getToolPages(locale).find((tool) => tool.slug === slug);
}

export function getImpactStats(locale: string): StatContent[] {
  const labels = getMarketingContent(locale).impactStatLabels;

  return [
    {
      value: `${PUBLIC_IMPACT_METRICS.activeTeachers.minValue}+`,
      label: labels.activeTeachers,
    },
    {
      value: `${PUBLIC_IMPACT_METRICS.generatedDocuments.minValue}+`,
      label: labels.generatedDocuments,
    },
  ];
}

export function getTrustCards(locale: string): MarketingCardContent[] {
  return getMarketingContent(locale).trustCards;
}

export function getSchoolPageCards(locale: string): MarketingCardContent[] {
  return getMarketingContent(locale).schoolPageCards;
}
