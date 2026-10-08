/**
 * English URL slugs for the tool pages.
 *
 * The routes and every message key use the Portuguese slug (`plano-de-aula`),
 * which stays the internal identifier. Only the *public* English URL differs:
 * `/en/tools/lesson-plan-generator`. `localizedPathname` writes it, the
 * middleware serves it (rewriting to the internal slug) and redirects the old
 * `/en/tools/plano-de-aula` to it. Pure data, so the middleware can import it.
 */
export const EN_TOOL_SLUGS: Record<string, string> = {
  "plano-de-aula": "lesson-plan-generator",
  "fichas-de-trabalho": "worksheet-generator",
  "gerador-de-testes": "test-generator",
  quizzes: "quiz-generator",
  planificacoes: "unit-and-year-plans",
  "sequencias-de-aulas": "teaching-plans",
  apresentacoes: "slide-decks",
  "adaptacao-de-materiais": "material-adaptation",
  "carregar-documentos": "upload-documents",
};

export const EN_COMPARISON_SLUGS: Record<string, string> = {
  "canva-para-educacao": "canva-for-education",
  "magicschool-ai": "magicschool-ai",
  teachy: "teachy",
  "chatgpt-gemini-perplexity": "chatgpt-gemini-perplexity",
};

/** Dynamic routes whose English URL carries an English slug. */
export const EN_SLUGS_BY_PATH: Record<string, Record<string, string>> = {
  "/ferramentas/[slug]": EN_TOOL_SLUGS,
  "/comparar/[slug]": EN_COMPARISON_SLUGS,
};

/** The English URL segment that replaces each Portuguese one (`/en/tools/...`, `/en/compare/...`). */
export const EN_SEGMENT_TO_PATH: Record<string, string> = {
  tools: "/ferramentas/[slug]",
  compare: "/comparar/[slug]",
};

export const toEnglishSlug = (path: string, slug: string) => EN_SLUGS_BY_PATH[path]?.[slug] ?? slug;
export const toInternalSlug = (path: string, slug: string) => {
  const table = EN_SLUGS_BY_PATH[path];
  return table ? (Object.entries(table).find(([, en]) => en === slug)?.[0] ?? slug) : slug;
};

