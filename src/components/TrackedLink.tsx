"use client";

import {
  captureMarketingEvent,
  getTargetKind,
  type MarketingEventName,
  type MarketingEventProperties,
} from "@/lib/analytics";
import { Link } from "@/i18n/navigation";
import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ComponentProps,
  type MouseEventHandler,
} from "react";

type IntlLinkProps = ComponentProps<typeof Link>;

/**
 * `href` is widened to `string` on purpose. Most call sites pass either an
 * absolute app URL (`https://create.scooli.app/sign-up`) or a bare hash
 * (`#como-funciona`), neither of which is a key in the `pathnames` map — and
 * next-intl leaves both untouched at runtime. Internal routes should still be
 * written as their Portuguese pathname key (`/precos`), which is what gets
 * translated to `/en/pricing`.
 */
type TrackedLinkProps = Omit<IntlLinkProps, "href"> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof IntlLinkProps> & {
    href: IntlLinkProps["href"] | string;
    eventName?: MarketingEventName;
    eventProperties?: MarketingEventProperties;
  };

/**
 * The value reported to analytics. Dynamic routes arrive as
 * `{pathname: "/ferramentas/[slug]", params: {slug}}`; we compile them back to
 * the flat path so the event stream stays comparable with what was tracked
 * before the site became multilingual.
 */
function resolveTrackedHref(href: TrackedLinkProps["href"]): string {
  if (typeof href === "string") {
    return href;
  }

  const target = href as {
    pathname?: string;
    params?: Record<string, string | number | Array<string | number>>;
  };
  let pathname = target.pathname ?? "";

  if (target.params) {
    for (const [key, value] of Object.entries(target.params)) {
      pathname = pathname.replace(
        `[${key}]`,
        Array.isArray(value) ? value.map(String).join("/") : String(value),
      );
    }
  }

  return pathname;
}

export const TrackedLink = forwardRef<HTMLAnchorElement, TrackedLinkProps>(
  function TrackedLink(
    { eventName, eventProperties, href, onClick, ...props },
    ref
  ) {
    const resolvedHref = resolveTrackedHref(href);

    const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
      onClick?.(event);

      if (event.defaultPrevented || !eventName) {
        return;
      }

      const resolvedProperties: MarketingEventProperties = {
        ...eventProperties,
      };

      if (eventName === "marketing_cta_clicked") {
        resolvedProperties.target_url ??= resolvedHref;
        resolvedProperties.target_kind ??= getTargetKind(resolvedHref);
      }

      if (eventName === "marketing_navigation_clicked") {
        resolvedProperties.target_path ??= resolvedHref;
      }

      captureMarketingEvent(eventName, resolvedProperties);
    };

    return (
      <Link
        ref={ref}
        href={href as IntlLinkProps["href"]}
        onClick={handleClick}
        {...props}
      />
    );
  }
);
