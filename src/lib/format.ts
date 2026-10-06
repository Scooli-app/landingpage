/**
 * Portuguese writes €6,99 and English €6.99 — the convention used across the
 * pricing page, the promo bar and the homepage.
 */
export function formatEuro(locale: string, cents: number): string {
  const value = (cents / 100).toFixed(2);
  return locale === "en" ? `€${value}` : `€${value.replace(".", ",")}`;
}
