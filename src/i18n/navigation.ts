import { createNavigation } from "next-intl/navigation";
import { useLocale } from "next-intl";
import { createElement, forwardRef, type ComponentProps } from "react";
import { routing, type Locale } from "./routing";
import { toPublicSlug } from "./localeSlugs";

/**
 * Locale-aware navigation primitives.
 *
 * Every internal link in the marketing site must go through these rather than
 * `next/link`, because other locales live on different slugs (`/precos` is
 * `/en/pricing`, not `/en/precos`). `Link` resolves the slug from the
 * `pathnames` map in `routing.ts` and adds the `/en` or `/br` prefix when needed;
 * external URLs (the app on create.scooli.app) and bare hash links pass
 * through untouched.
 */
const navigation = createNavigation(routing);

export const { getPathname, redirect, permanentRedirect, usePathname, useRouter } = navigation;

const BaseLink = navigation.Link;

/**
 * `Link` plus the per-locale slugs: a link to `/ferramentas/[slug]` in English
 * points at `/en/tools/lesson-plan-generator`, not at the internal pt-PT slug
 * (see `localeSlugs.ts`). Same for `/comparar/[slug]` and for pt-BR.
 */
export const Link = forwardRef<HTMLAnchorElement, ComponentProps<typeof BaseLink>>(
  function Link(props, ref) {
    const currentLocale = useLocale();
    const target = (props.locale ?? currentLocale) as Locale;
    const href = props.href as unknown;

    if (
      typeof href === "object" &&
      href !== null &&
      ["/ferramentas/[slug]", "/comparar/[slug]"].includes((href as { pathname?: string }).pathname ?? "")
    ) {
      const original = href as { pathname: string; params: { slug: string } };
      const mapped = {
        ...original,
        params: { ...original.params, slug: toPublicSlug(target, original.pathname, original.params.slug) },
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
