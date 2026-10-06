/**
 * The six resources, in the order the site argues for them (nav menu, footer,
 * homepage resources grid). Slugs are the `/ferramentas/[slug]` keys from
 * `marketing/data.ts`.
 *
 * Kept out of the client nav module so server components can import it as a
 * real value rather than a client reference.
 */
export const NAV_TOOL_SLUGS = [
  "plano-de-aula",
  "fichas-de-trabalho",
  "gerador-de-testes",
  "quizzes",
  "planificacoes",
  "apresentacoes",
] as const;

export type NavToolSlug = (typeof NAV_TOOL_SLUGS)[number];
