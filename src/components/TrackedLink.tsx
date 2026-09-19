"use client";

import {
  captureMarketingEvent,
  getTargetKind,
  resolveHrefValue,
  type MarketingEventName,
  type MarketingEventProperties,
} from "@/lib/analytics";
import Link, { type LinkProps } from "next/link";
import {
  forwardRef,
  type AnchorHTMLAttributes,
  type MouseEventHandler,
} from "react";

type TrackedLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    eventName?: MarketingEventName;
    eventProperties?: MarketingEventProperties;
  };

export const TrackedLink = forwardRef<HTMLAnchorElement, TrackedLinkProps>(
  function TrackedLink(
    { eventName, eventProperties, href, onClick, ...props },
    ref
  ) {
    const resolvedHref = resolveHrefValue(href);

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
        href={href}
        onClick={handleClick}
        {...props}
      />
    );
  }
);
