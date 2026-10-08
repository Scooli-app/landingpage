"use client";

import { TrackedLink } from "@/components/TrackedLink";
import { BOOKING_EMBED_URL, BOOKING_PAGE_URL } from "@/lib/booking";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

/**
 * Google's booking page for a call with the team, embedded. The link below it
 * opens the same page in a new tab, for when the embed is blocked (privacy
 * extensions, third-party cookies) or too cramped.
 */
export function BookingEmbed({ source, className }: { source: string; className?: string }) {
  const t = useTranslations("booking");
  // Google's page takes a few seconds; until it paints, say so instead of
  // showing an empty box.
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={className}>
      <div className="relative h-[560px] overflow-hidden rounded-lg border border-line bg-stone-soft md:h-[620px]">
        {!loaded && (
          <p className="absolute inset-0 grid place-items-center text-[14px] text-subtle">{t("loading")}</p>
        )}
        <iframe
          src={BOOKING_EMBED_URL}
          title={t("iframeTitle")}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={cn(
            "relative size-full bg-white transition-opacity duration-300",
            loaded ? "opacity-100" : "opacity-0",
          )}
        />
      </div>
      <TrackedLink
        href={BOOKING_PAGE_URL}
        target="_blank"
        rel="noreferrer"
        eventName="marketing_cta_clicked"
        eventProperties={{ cta_id: "booking_open_new_tab", placement: source }}
        className="mt-3 inline-flex items-center gap-1 text-[14px] font-medium text-violet-ink hover:underline"
      >
        {t("openInNewTab")}
        <ArrowUpRight aria-hidden className="size-3.5" />
      </TrackedLink>
    </div>
  );
}
