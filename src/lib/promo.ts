const PROMO_ENDS_AT = process.env.NEXT_PUBLIC_PROMO_ENDS_AT;

export function isPromoActive(): boolean {
  if (!PROMO_ENDS_AT) {
    return false;
  }
  const endsAt = new Date(PROMO_ENDS_AT);
  return !Number.isNaN(endsAt.getTime()) && new Date() < endsAt;
}

export const PROMO_PLAN_CODES = {
  monthly: "pro_monthly_promo",
  annual: "pro_annual_promo",
} as const;

// Mirrors the real Stripe promo prices - these plan codes are excluded from
// the public /subscriptions/plans listing (checkout-only via direct link),
// so there's no live source to fetch this display data from.
export const PROMO_PRICE_CENTS = {
  monthly: 299,
  annual: 2870,
} as const;
