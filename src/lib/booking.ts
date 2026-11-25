import type { Locale } from "@/i18n/routing";

/**
 * The Google Calendar appointment schedule for demos and calls, per locale
 * (pt-PT short link: https://calendar.app.google/iqyCb3azHXdKa2j88). `?gv=true`
 * is Google's embeddable view of the same page.
 */
const PT_BOOKING_PAGE_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0r8xxB0JHTg6DyEvN9hunryCYwHj-KrdaPQFJFNYg_jFm_ntsMXR2CoEJVNYNCSZICTBbSXbqQ";

export const BOOKING_PAGE_URL: Record<Locale, string> = {
  "pt-PT": PT_BOOKING_PAGE_URL,
  // Placeholder: the Portuguese schedule until Miguel supplies the Brazilian Google Calendar booking page.
  // `hl` at least puts Google's own UI (labels, time zone name) in Brazilian Portuguese.
  "pt-BR": `${PT_BOOKING_PAGE_URL}?hl=pt-BR`,
  en: PT_BOOKING_PAGE_URL,
};

export const bookingEmbedUrl = (locale: Locale) =>
  `${BOOKING_PAGE_URL[locale]}${BOOKING_PAGE_URL[locale].includes("?") ? "&" : "?"}gv=true`;
