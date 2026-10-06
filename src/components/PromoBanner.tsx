"use client";

import { TrackedLink } from "@/components/TrackedLink";
import { captureMarketingEvent } from "@/lib/analytics";
import { formatEuro } from "@/lib/format";
import { APP_URL } from "@/lib/seo";
import { PROMO_PLAN_CODES, PROMO_PRICE_CENTS, isPromoActive } from "@/lib/promo";
import { X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

// Time-limited "Regresso às Aulas 2026" promo. Rendered site-wide from the root
// layout while NEXT_PUBLIC_PROMO_ENDS_AT is in the future. It is the only promo
// surface (there is no popup). Dismissal is persisted per-device in
// localStorage (promo-id-scoped key) so closing it once keeps it closed.
// Clicking a CTA also dismisses it - someone on their way to checkout doesn't
// need the reminder when they come back.
const DISMISSED_KEY = "scooli_promo_rega2026_banner_dismissed";

function wasDismissed(): boolean {
  try {
    return localStorage.getItem(DISMISSED_KEY) === "true";
  } catch {
    return false;
  }
}

function persistDismiss(): void {
  try {
    localStorage.setItem(DISMISSED_KEY, "true");
  } catch {
    // localStorage unavailable (private browsing edge case) - non-fatal, the
    // banner just reappears on the next load
  }
}

export function PromoBanner() {
  const t = useTranslations("promoBanner");
  const locale = useLocale();
  // Start hidden and reveal after mount: reading localStorage during render
  // would desync the SSR and client markup.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isPromoActive() && !wasDismissed()) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (visible) {
      captureMarketingEvent("marketing_promo_banner_viewed");
    }
  }, [visible]);

  if (!visible) {
    return null;
  }

  const handleDismiss = () => {
    persistDismiss();
    captureMarketingEvent("marketing_promo_banner_dismissed");
    setVisible(false);
  };

  const monthlyHref = `${APP_URL}/checkout?plan=${PROMO_PLAN_CODES.monthly}`;
  const annualHref = `${APP_URL}/checkout?plan=${PROMO_PLAN_CODES.annual}`;
  const monthlyPrice = formatEuro(locale, PROMO_PRICE_CENTS.monthly);
  const annualPrice = formatEuro(locale, PROMO_PRICE_CENTS.annual);

  const ctaClass =
    "font-medium underline decoration-violet-ink/40 underline-offset-[3px] transition-colors hover:decoration-violet-ink";

  return (
    <div className="relative z-50 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 border-b border-violet-line bg-violet-wash px-10 py-2.5 text-center text-sm text-violet-ink">
      <span>
        {t.rich("message", {
          price: monthlyPrice,
          strong: (chunks) => <strong className="font-semibold">{chunks}</strong>,
        })}
      </span>
      <div className="flex items-center gap-4">
        <TrackedLink
          href={monthlyHref}
          onClick={persistDismiss}
          eventName="marketing_plan_selected"
          eventProperties={{
            plan_code: PROMO_PLAN_CODES.monthly,
            billing_period: "month",
            price_cents: PROMO_PRICE_CENTS.monthly,
            placement: "promo_banner",
            target_url: monthlyHref,
          }}
          className={ctaClass}
        >
          {t("monthlyCta", { price: monthlyPrice })}
        </TrackedLink>
        <TrackedLink
          href={annualHref}
          onClick={persistDismiss}
          eventName="marketing_plan_selected"
          eventProperties={{
            plan_code: PROMO_PLAN_CODES.annual,
            billing_period: "year",
            price_cents: PROMO_PRICE_CENTS.annual,
            placement: "promo_banner",
            target_url: annualHref,
          }}
          className={ctaClass}
        >
          {t("annualCta", { price: annualPrice })}
        </TrackedLink>
      </div>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label={t("closeAriaLabel")}
        className="absolute right-3 top-1/2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-violet-ink/70 transition-colors hover:bg-white/60 hover:text-violet-ink"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
