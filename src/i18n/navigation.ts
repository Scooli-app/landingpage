import { createNavigation } from "next-intl/navigation";
import { useLocale } from "next-intl";
import { createElement, forwardRef, type ComponentProps } from "react";
import { routing } from "./routing";
import { toEnglishSlug } from "./toolSlugs";

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
const navigation = createNavigation(routing);

export const { getPathname, redirect, permanentRedirect, usePathname, useRouter } = navigation;

const BaseLink = navigation.Link;

/**
 * `Link` plus the English slugs: a link to `/ferramentas/[slug]` in English
 * points at `/en/tools/lesson-plan-generator`, not at the internal Portuguese
 * slug (see `toolSlugs.ts`). Same for `/comparar/[slug]`.
 */
export const Link = forwardRef<HTMLAnchorElement, ComponentProps<typeof BaseLink>>(
  function Link(props, ref) {
    const currentLocale = useLocale();
    const target = props.locale ?? currentLocale;
    const href = props.href as unknown;

    if (
      target === "en" &&
      typeof href === "object" &&
      href !== null &&
      ["/ferramentas/[slug]", "/comparar/[slug]"].includes((href as { pathname?: string }).pathname ?? "")
    ) {
      const original = href as { pathname: string; params: { slug: string } };
      const mapped = {
        ...original,
        params: { ...original.params, slug: toEnglishSlug(original.pathname, original.params.slug) },
      };
      return createElement(BaseLink, { ...props, href: mapped as never, ref });
    }

    return createElement(BaseLink, { ...props, ref });
  },
) as typeof BaseLink;

/**
 * The href shape accepted by the locale-aware `Link`. Exported so that data
 * modules can describe a link target once and have it resolve per locale.
 */
export type MarketingHref = ComponentProps<typeof BaseLink>["href"];

/**
 * Tool detail pages are a dynamic route, so their href has to be described as
 * a template plus params — `"/ferramentas/fichas-de-trabalho"` as a plain
 * string is not in the `pathnames` map and would be left unlocalised.
 */
export function toolHref(slug: string) {
  return { pathname: "/ferramentas/[slug]", params: { slug } } as const;
}
