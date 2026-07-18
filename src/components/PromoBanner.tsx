"use client";

import { TrackedLink } from "@/components/TrackedLink";
import { APP_URL } from "@/lib/seo";
import { isPromoActive } from "@/lib/promo";
import { X } from "lucide-react";
import { useState } from "react";

// Time-limited promo: Pro at a discounted price, kept forever by anyone who
// subscribes before NEXT_PUBLIC_PROMO_ENDS_AT. Not advertised externally
// (no social posts), but shown here, on the pricing page, and in the web-app.
export function PromoBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || !isPromoActive()) {
    return null;
  }

  const monthlyHref = `${APP_URL}/checkout?plan=pro_monthly_promo`;
  const annualHref = `${APP_URL}/checkout?plan=pro_annual_promo`;

  return (
    <div className="relative z-50 flex flex-col items-center justify-center gap-2 bg-[color:var(--scooli-primary)] px-4 py-2.5 text-center text-sm font-medium text-white sm:flex-row sm:gap-4">
      <span>
        Por tempo limitado: Scooli Pro a partir de{" "}
        <strong className="font-bold">2,99€/mês</strong> - fica com este preço
        para sempre.
      </span>
      <div className="flex items-center gap-3">
        <TrackedLink
          href={monthlyHref}
          eventName="marketing_plan_selected"
          eventProperties={{
            plan_code: "pro_monthly_promo",
            billing_period: "month",
            price_cents: 299,
            placement: "promo_banner",
            target_url: monthlyHref,
          }}
          className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-[color:var(--scooli-primary)] transition-opacity hover:opacity-90"
        >
          Mensal 2,99€
        </TrackedLink>
        <TrackedLink
          href={annualHref}
          eventName="marketing_plan_selected"
          eventProperties={{
            plan_code: "pro_annual_promo",
            billing_period: "year",
            price_cents: 2870,
            placement: "promo_banner",
            target_url: annualHref,
          }}
          className="rounded-full border border-white/70 px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/10"
        >
          Anual 28,70€
        </TrackedLink>
      </div>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Fechar"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 transition-colors hover:text-white sm:static sm:translate-y-0"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
