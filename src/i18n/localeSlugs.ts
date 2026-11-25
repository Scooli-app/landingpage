import type { Locale } from "./routing";

/**
 * Per-locale URL slugs for the tool and comparison pages.
 *
 * The routes and every message key use the pt-PT slug (`plano-de-aula`), which
 * stays the internal identifier. Only the *public* URL differs per locale:
 * `/en/tools/lesson-plan-generator`, `/br/ferramentas/gerador-de-provas`.
 * `localizedPathname` writes it, the middleware serves it (rewriting to the
 * internal slug) and redirects the internal spelling to it. A slug missing from
 * a locale's table is the same as the internal one. Pure data, so the
 * middleware can import it.
 */
type SlugPath = "/ferramentas/[slug]" | "/comparar/[slug]";

export const LOCALE_SLUGS: Partial<Record<Locale, Record<SlugPath, Record<string, string>>>> = {
  en: {
    "/ferramentas/[slug]": {
      "plano-de-aula": "lesson-plan-generator",
      "fichas-de-trabalho": "worksheet-generator",
      "gerador-de-testes": "test-generator",
      quizzes: "quiz-generator",
      planificacoes: "unit-and-year-plans",
      "sequencias-de-aulas": "teaching-plans",
      apresentacoes: "slide-decks",
      "adaptacao-de-materiais": "material-adaptation",
      "carregar-documentos": "upload-documents",
    },
    "/comparar/[slug]": {
      "canva-para-educacao": "canva-for-education",
      "magicschool-ai": "magicschool-ai",
      teachy: "teachy",
      "chatgpt-gemini-perplexity": "chatgpt-gemini-perplexity",
    },
  },
  // The Brazilian school vocabulary: "prova", "atividade", "planejamento".
  "pt-BR": {
    "/ferramentas/[slug]": {
      "gerador-de-testes": "gerador-de-provas",
      "fichas-de-trabalho": "atividades",
      planificacoes: "planejamentos",
      "sequencias-de-aulas": "sequencias-didaticas",
      "adaptacao-de-materiais": "adaptacao-de-materiais",
    },
    "/comparar/[slug]": {},
  },
};

const slugTable = (locale: Locale, path: string) =>
  LOCALE_SLUGS[locale]?.[path as SlugPath];

export const toPublicSlug = (locale: Locale, path: string, internalSlug: string) =>
  slugTable(locale, path)?.[internalSlug] ?? internalSlug;

export const toInternalSlug = (locale: Locale, path: string, publicSlug: string) =>
  Object.entries(slugTable(locale, path) ?? {}).find(([, slug]) => slug === publicSlug)?.[0] ??
  publicSlug;
