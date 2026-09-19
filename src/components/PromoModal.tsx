"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { captureMarketingEvent } from "@/lib/analytics";
import { PROMO_PLAN_CODES, PROMO_PRICE_CENTS, isPromoActive } from "@/lib/promo";
import { APP_URL } from "@/lib/seo";
import { ArrowRight, PartyPopper, Sparkles, Tag } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// "Regresso às Aulas 2026" announcement modal for the marketing site. Shown
// once per device: once dismissed (X, overlay, Esc, "Talvez mais tarde", or by
// clicking through to checkout) a localStorage flag keeps it from reappearing.
// The flag is scoped to this promo's id so a future promo gets a fresh modal.
// Only renders while NEXT_PUBLIC_PROMO_ENDS_AT is in the future (isPromoActive).
const DISMISSED_KEY = "scooli_promo_rega2026_dismissed";
const OPEN_DELAY_MS = 1200;

function wasDismissed(): boolean {
  try {
    return localStorage.getItem(DISMISSED_KEY) === "true";
  } catch {
    return false;
  }
}

function markDismissed(): void {
  try {
    localStorage.setItem(DISMISSED_KEY, "true");
  } catch {
    // localStorage unavailable (private browsing edge case) — non-fatal
  }
}

export function PromoModal() {
  const [open, setOpen] = useState(false);
  const convertingRef = useRef(false);

  useEffect(() => {
    if (!isPromoActive() || wasDismissed()) {
      return;
    }
    const timer = window.setTimeout(() => setOpen(true), OPEN_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (open) {
      captureMarketingEvent("marketing_promo_modal_viewed");
    }
  }, [open]);

  // Every close persists the dismiss flag. Only a non-conversion close fires the
  // dismissed event; goToCheckout sets convertingRef first so it is skipped.
  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      markDismissed();
      if (!convertingRef.current) {
        captureMarketingEvent("marketing_promo_modal_dismissed");
      }
    }
    setOpen(nextOpen);
  };

  const goToCheckout = (
    planCode: string,
    billingPeriod: "month" | "year",
    priceCents: number,
  ) => {
    convertingRef.current = true;
    const targetUrl = `${APP_URL}/checkout?plan=${planCode}`;
    captureMarketingEvent("marketing_plan_selected", {
      plan_code: planCode,
      billing_period: billingPeriod,
      price_cents: priceCents,
      placement: "promo_modal",
      target_url: targetUrl,
    });
    markDismissed();
    setOpen(false);
    window.location.href = targetUrl;
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md border-slate-200 bg-white p-0 text-center">
        <div className="bg-gradient-to-b from-[color:var(--scooli-primary)]/10 to-transparent px-8 pb-6 pt-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[color:var(--scooli-primary)]/20 bg-[color:var(--scooli-primary)]/15">
            <PartyPopper className="h-7 w-7 text-[color:var(--scooli-primary)]" />
          </div>

          <DialogHeader className="items-center text-center sm:text-center">
            <DialogTitle className="text-2xl font-bold text-slate-900">
              Regresso às Aulas 2026
            </DialogTitle>
            <DialogDescription className="text-slate-500">
              Scooli Pro por apenas 4,99€/mês se ativar durante a promoção — e
              fica com este preço para sempre.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="space-y-3 px-6 pb-2">
          <div className="flex items-center gap-4 rounded-xl border border-slate-200/70 bg-slate-50 p-3 text-left">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[color:var(--scooli-primary)] shadow-sm">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Gerações ilimitadas
              </p>
              <p className="text-xs text-slate-500">
                Acesso a todas as funcionalidades Pro
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-xl border border-slate-200/70 bg-slate-50 p-3 text-left">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500 shadow-sm">
              <Tag className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Preço bloqueado para sempre
              </p>
              <p className="text-xs text-slate-500">
                Sem aumentos depois de a promoção terminar
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6 pt-2">
          <Button
            onClick={() =>
              goToCheckout(PROMO_PLAN_CODES.monthly, "month", PROMO_PRICE_CENTS.monthly)
            }
            className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#6753FF] to-[#4E3BC0] font-bold text-white shadow-md transition-all hover:shadow-lg hover:shadow-[#6753FF]/25"
          >
            Ativar por 4,99€/mês
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <button
            type="button"
            onClick={() =>
              goToCheckout(PROMO_PLAN_CODES.annual, "year", PROMO_PRICE_CENTS.annual)
            }
            className="mt-3 w-full py-1 text-sm font-medium text-[color:var(--scooli-primary)] transition-colors hover:text-[#4E3BC0]"
          >
            Prefiro o anual por 47,90€
          </button>
          <button
            type="button"
            onClick={() => handleOpenChange(false)}
            className="mt-1 w-full py-1 text-sm text-slate-500 transition-colors hover:text-slate-700"
          >
            Talvez mais tarde
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
