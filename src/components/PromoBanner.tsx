"use client";

import { TrackedLink } from "@/components/TrackedLink";
import { captureMarketingEvent } from "@/lib/analytics";
import { APP_URL } from "@/lib/seo";
import { PROMO_PLAN_CODES, PROMO_PRICE_CENTS, isPromoActive } from "@/lib/promo";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

// Time-limited promo: Pro at a discounted price, kept forever by anyone who
// subscribes before NEXT_PUBLIC_PROMO_ENDS_AT. Not advertised externally
// (no social posts), but shown here, on the pricing page, and in the web-app.
export function PromoBanner() {
  const [dismissed, setDismissed] = useState(false);
  const shouldShow = !dismissed && isPromoActive();

  useEffect(() => {
    if (shouldShow) {
      captureMarketingEvent("marketing_promo_banner_viewed");
    }
  }, [shouldShow]);

  if (!shouldShow) {
    return null;
  }

  const handleDismiss = () => {
    captureMarketingEvent("marketing_promo_banner_dismissed");
    setDismissed(true);
  };

  const monthlyHref = `${APP_URL}/checkout?plan=${PROMO_PLAN_CODES.monthly}`;
  const annualHref = `${APP_URL}/checkout?plan=${PROMO_PLAN_CODES.annual}`;

  return (
    <div className="relative z-50 flex flex-col items-center justify-center gap-2 bg-[color:var(--scooli-primary)] px-4 py-2.5 text-center text-sm font-medium text-white sm:flex-row sm:gap-4">
      <span>
        Regresso às Aulas 2026: Scooli Pro a partir de{" "}
        <strong className="font-bold">4,99€/mês</strong> - fica com este preço
        para sempre.
      </span>
      <div className="flex items-center gap-3">
        <TrackedLink
          href={monthlyHref}
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
          Mensal 4,99€
        </TrackedLink>
        <TrackedLink
          href={annualHref}
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
          Anual 47,90€
        </TrackedLink>
      </div>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Fechar"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 transition-colors hover:text-white sm:static sm:translate-y-0"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
