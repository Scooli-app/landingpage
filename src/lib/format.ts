import type { Locale } from "@/i18n/routing";

/** Decimal separator per locale. */
const DECIMAL_SEPARATOR: Record<Locale, string> = { "pt-PT": ",", "pt-BR": ",", en: "." };

/**
 * Portuguese (Portugal and Brazil) writes €6,99 and English €6.99 — the
 * convention used across the pricing page, the promo bar and the homepage.
 * Pro is priced in euros for every locale.
 */
export function formatEuro(locale: string, cents: number): string {
  const value = (cents / 100).toFixed(2);
  return `€${value.replace(".", DECIMAL_SEPARATOR[locale as Locale] ?? ",")}`;
}
