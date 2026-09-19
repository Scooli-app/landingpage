import {
  BookOpenCheck,
  Building2,
  CalendarDays,
  FileCheck2,
  FileSearch,
  FileText,
  GraduationCap,
  LibraryBig,
  ListOrdered,
  LockKeyhole,
  MapPinned,
  NotebookPen,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Upload,
  Users,
  WandSparkles,
  type LucideIcon,
} from "lucide-react";
import { PUBLIC_IMPACT_METRICS } from "@/lib/seo";
import { routing, type Locale } from "@/i18n/routing";
import type { MarketingHref } from "@/i18n/navigation";
import { marketingContentEn } from "./content/en";
import { marketingContentPtPT } from "./content/pt-PT";

/**
 * Marketing copy lives in `./content/{locale}.ts`, not here.
 *
 * This module keeps only what is *structural* and therefore locale-independent:
 * slugs, icons, layout choices and the ordering of things. Everything a reader
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

export type MarketingCard = MarketingCardContent & {
  icon: LucideIcon;
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

export type LibraryCardContent = {
  title: string;
  meta: string;
  tags: string[];
};

export type MarketingContent = {
  teacherStats: StatContent[];
  impactStatLabels: {
    generatedDocuments: string;
    weeklyHoursSaved: string;
    adaptedMaterials: string;
    activeTeachers: string;
  };
  trustCards: MarketingCardContent[];
  teacherPageCards: MarketingCardContent[];
  schoolPageCards: MarketingCardContent[];
  aboutPrinciples: MarketingCardContent[];
  libraryPageCards: LibraryCardContent[];
  toolPages: ToolPageContent[];
};

// ─── Structure ────────────────────────────────────────────────────────────────

/**
 * Canonical tool order. The URL slug is deliberately the same in every locale:
 * `pathnames` translates the `/ferramentas` segment to `/tools`, but the slug
 * itself is the data key that `generateStaticParams` and `toolCardIcons` use.
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

export const toolCardIcons: Record<string, LucideIcon> = {
  "gerador-de-testes": FileCheck2,
  "fichas-de-trabalho": FileText,
  planificacoes: CalendarDays,
  "plano-de-aula": NotebookPen,
  "sequencias-de-aulas": ListOrdered,
  quizzes: BookOpenCheck,
  apresentacoes: FileSearch,
  "adaptacao-de-materiais": WandSparkles,
  "carregar-documentos": Upload,
};

const trustCardIcons: LucideIcon[] = [ShieldCheck, LockKeyhole, ShieldCheck];
const teacherPageCardIcons: LucideIcon[] = [NotebookPen, SlidersHorizontal, LibraryBig];
const schoolPageCardIcons: LucideIcon[] = [Building2, GraduationCap, ShieldCheck];
const aboutPrincipleIcons: LucideIcon[] = [Sparkles, Users, MapPinned];

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

function withIcons(
  cards: MarketingCardContent[],
  icons: LucideIcon[],
): MarketingCard[] {
  return cards.map((card, index) => ({
    ...card,
    icon: icons[index] ?? icons[icons.length - 1],
  }));
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

export function getTeacherStats(locale: string) {
  return getMarketingContent(locale).teacherStats;
}

export function getImpactStats(locale: string): StatContent[] {
  const labels = getMarketingContent(locale).impactStatLabels;

  return [
    {
      value: `${PUBLIC_IMPACT_METRICS.generatedDocuments.minValue}+`,
      label: labels.generatedDocuments,
    },
    {
      value: `${PUBLIC_IMPACT_METRICS.weeklyHoursSaved.minValue}h+`,
      label: labels.weeklyHoursSaved,
    },
    {
      value: `${PUBLIC_IMPACT_METRICS.adaptedMaterials.minValue}+`,
      label: labels.adaptedMaterials,
    },
    {
      value: `${PUBLIC_IMPACT_METRICS.activeTeachers.minValue}+`,
      label: labels.activeTeachers,
    },
  ];
}

export function getTrustCards(locale: string): MarketingCard[] {
  return withIcons(getMarketingContent(locale).trustCards, trustCardIcons);
}

export function getTeacherPageCards(locale: string): MarketingCard[] {
  return withIcons(getMarketingContent(locale).teacherPageCards, teacherPageCardIcons);
}

export function getSchoolPageCards(locale: string): MarketingCard[] {
  return withIcons(getMarketingContent(locale).schoolPageCards, schoolPageCardIcons);
}

export function getAboutPrinciples(locale: string): MarketingCard[] {
  return withIcons(getMarketingContent(locale).aboutPrinciples, aboutPrincipleIcons);
}

export function getLibraryPageCards(locale: string): LibraryCardContent[] {
  return getMarketingContent(locale).libraryPageCards;
}
