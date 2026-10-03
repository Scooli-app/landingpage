"use client";

import { TrackedLink } from "@/components/TrackedLink";
import { captureMarketingEvent } from "@/lib/analytics";
import { APP_URL } from "@/lib/seo";
import { PROMO_PLAN_CODES, PROMO_PRICE_CENTS, isPromoActive } from "@/lib/promo";
import { X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

/**
 * Portuguese writes €4,99 and English €4.99 — matches the formatting already
 * used for the pricing teaser and full pricing page.
 */
function formatEuro(locale: string, cents: number): string {
  const value = (cents / 100).toFixed(2);
  return locale === "en" ? `€${value}` : `€${value.replace(".", ",")}`;
}

// Time-limited "Regresso às Aulas 2026" promo. Rendered site-wide from the root
// layout while NEXT_PUBLIC_PROMO_ENDS_AT is in the future. Dismissal is
// persisted per-device in localStorage (promo-id-scoped key) so closing it once
// keeps it closed - same contract as PromoModal. The homepage also shows a
// one-off PromoModal; the two are independent so the banner stays as the
// ambient reminder for anyone who dismissed (or never saw) the modal. Clicking
// a CTA also dismisses it - someone on their way to checkout doesn't need the
// reminder when they come back.
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

  return (
    <div className="relative z-50 flex flex-col items-center justify-center gap-2 bg-[color:var(--scooli-primary)] px-4 py-2.5 text-center text-sm font-medium text-white sm:flex-row sm:gap-4">
      <span>
        {t.rich("message", {
          price: monthlyPrice,
          strong: (chunks) => <strong className="font-bold">{chunks}</strong>,
        })}
      </span>
      <div className="flex items-center gap-3">
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
          className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-[color:var(--scooli-primary)] transition-opacity hover:opacity-90"
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
          className="rounded-full border border-white/70 px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/10"
        >
          {t("annualCta", { price: annualPrice })}
        </TrackedLink>
      </div>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label={t("closeAriaLabel")}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 transition-colors hover:text-white sm:static sm:translate-y-0"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
