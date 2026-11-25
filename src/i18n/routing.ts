import { defineRouting } from "next-intl/routing";

/**
 * The frontend's locale registry. Mirrors SupportedLocale in the backend
 * (services/.../locale/SupportedLocale.java) — the two must agree, because a locale
 * chosen here is persisted and later read back by the email and generation layers.
 *
 * Adding a language: one entry in `locales`, one `messages/{locale}.json`, and one column
 * in `pathnames` for every route below.
 */
export const locales = ["pt-PT", "pt-BR", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt-PT";

/**
 * URL prefix per locale. Brazilian Portuguese lives under `/br`, not `/pt-BR`: shorter,
 * and what a Brazilian reader expects to see. pt-PT has none (see `localePrefix` below).
 */
export const LOCALE_PREFIX: Record<Locale, string> = { "pt-PT": "", "pt-BR": "/br", en: "/en" };

/**
 * Per-locale URL slugs.
 *
 * English pages get native English slugs rather than translated Portuguese ones. `/precos`
 * spelled in English is `/pricing`, not `/precos` with English copy — a translated slug ranks
 * badly and reads as a machine translation to anyone who sees the URL.
 *
 * The Portuguese slugs are the ones already indexed, so they are unchanged. Nothing that
 * currently ranks moves. Brazilian Portuguese shares them, except where the Brazilian
 * spelling differs (`/contato`); its tool and comparison slugs are in `localeSlugs.ts`.
 */
export const pathnames = {
  "/": "/",
  "/precos": { "pt-PT": "/precos", "pt-BR": "/precos", en: "/pricing" },
  "/ferramentas": { "pt-PT": "/ferramentas", "pt-BR": "/ferramentas", en: "/tools" },
  "/ferramentas/[slug]": { "pt-PT": "/ferramentas/[slug]", "pt-BR": "/ferramentas/[slug]", en: "/tools/[slug]" },
  "/professores": { "pt-PT": "/professores", "pt-BR": "/professores", en: "/teachers" },
  "/escolas": { "pt-PT": "/escolas", "pt-BR": "/escolas", en: "/schools" },
  "/ia-para-professores": { "pt-PT": "/ia-para-professores", "pt-BR": "/ia-para-professores", en: "/ai-for-teachers" },
  "/comparar/[slug]": { "pt-PT": "/comparar/[slug]", "pt-BR": "/comparar/[slug]", en: "/compare/[slug]" },
  "/sobre": { "pt-PT": "/sobre", "pt-BR": "/sobre", en: "/about" },
  "/contacto": { "pt-PT": "/contacto", "pt-BR": "/contato", en: "/contact" },
  "/confianca": { "pt-PT": "/confianca", "pt-BR": "/confianca", en: "/trust" },
  "/investidores": { "pt-PT": "/investidores", "pt-BR": "/investidores", en: "/investors" },
  "/roadmap": "/roadmap",
  "/recomendar-instituicao": {
    "pt-PT": "/recomendar-instituicao",
    "pt-BR": "/recomendar-instituicao",
    en: "/recommend-your-school",
  },
  "/privacy": "/privacy",
  "/terms": "/terms",
} as const;

export const routing = defineRouting({
  locales,
  defaultLocale,
  pathnames,
  // Portuguese stays at the root with no prefix, so every URL that is currently indexed
  // keeps working untouched. English lives under /en, Brazilian Portuguese under /br.
  localePrefix: {
    mode: "as-needed",
    prefixes: { "pt-BR": LOCALE_PREFIX["pt-BR"], en: LOCALE_PREFIX.en },
  },
  // Never redirect on Accept-Language. It breaks hreflang crawling, and it strands
  // Portuguese teachers whose browsers are set to English — which is most of them.
  // Locale is offered, not imposed; the choice is persisted in a cookie.
  localeDetection: false,
  // hreflang is emitted in the page head and the sitemap; the middleware's Link
  // header would repeat it with the internal tool slugs.
  alternateLinks: false,
});
