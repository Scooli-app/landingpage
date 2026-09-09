import { createNavigation } from "next-intl/navigation";
import type { ComponentProps } from "react";
import { routing } from "./routing";

/**
 * Locale-aware navigation primitives.
 *
 * Every internal link in the marketing site must go through these rather than
 * `next/link`, because the English pages live on different slugs (`/precos` is
 * `/en/pricing`, not `/en/precos`). `Link` resolves the slug from the
 * `pathnames` map in `routing.ts` and adds the `/en` prefix when needed;
 * external URLs (the app on create.scooli.app) and bare hash links pass
 * through untouched.
 */
export const { Link, getPathname, redirect, permanentRedirect, usePathname, useRouter } =
  createNavigation(routing);

/**
 * The href shape accepted by the locale-aware `Link`. Exported so that data
 * modules can describe a link target once and have it resolve per locale.
 */
export type MarketingHref = ComponentProps<typeof Link>["href"];

/**
 * Tool detail pages are a dynamic route, so their href has to be described as
 * a template plus params — `"/ferramentas/fichas-de-trabalho"` as a plain
 * string is not in the `pathnames` map and would be left unlocalised.
 */
export function toolHref(slug: string) {
  return { pathname: "/ferramentas/[slug]", params: { slug } } as const;
}
