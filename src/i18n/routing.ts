import { defineRouting } from "next-intl/routing";

/**
 * The frontend's locale registry. Mirrors SupportedLocale in the backend
 * (services/.../locale/SupportedLocale.java) — the two must agree, because a locale
 * chosen here is persisted and later read back by the email and generation layers.
 *
 * Adding a language: one entry in `locales`, one `messages/{locale}.json`, and one column
 * in `pathnames` for every route below.
 */
export const locales = ["pt-PT", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt-PT";

/**
 * Per-locale URL slugs.
 *
 * English pages get native English slugs rather than translated Portuguese ones. `/precos`
 * spelled in English is `/pricing`, not `/precos` with English copy — a translated slug ranks
 * badly and reads as a machine translation to anyone who sees the URL.
 *
 * The Portuguese slugs are the ones already indexed, so they are unchanged. Nothing that
 * currently ranks moves.
 */
export const pathnames = {
  "/": "/",
  "/precos": { "pt-PT": "/precos", en: "/pricing" },
  "/ferramentas": { "pt-PT": "/ferramentas", en: "/tools" },
  "/ferramentas/[slug]": { "pt-PT": "/ferramentas/[slug]", en: "/tools/[slug]" },
  "/biblioteca": { "pt-PT": "/biblioteca", en: "/library" },
  "/professores": { "pt-PT": "/professores", en: "/teachers" },
  "/escolas": { "pt-PT": "/escolas", en: "/schools" },
  "/ia-para-professores": { "pt-PT": "/ia-para-professores", en: "/ai-for-teachers" },
  "/sobre": { "pt-PT": "/sobre", en: "/about" },
  "/contacto": { "pt-PT": "/contacto", en: "/contact" },
  "/confianca": { "pt-PT": "/confianca", en: "/trust" },
  "/recomendar-instituicao": {
    "pt-PT": "/recomendar-instituicao",
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
  // keeps working untouched. English lives under /en.
  localePrefix: "as-needed",
  // Never redirect on Accept-Language. It breaks hreflang crawling, and it strands
  // Portuguese teachers whose browsers are set to English — which is most of them.
  // Locale is offered, not imposed; the choice is persisted in a cookie.
  localeDetection: false,
});
