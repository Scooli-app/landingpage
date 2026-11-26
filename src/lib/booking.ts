import type { Locale } from "@/i18n/routing";

/**
 * The Google Calendar appointment schedule for demos and calls, per locale
 * (short links: pt-PT https://calendar.app.google/iqyCb3azHXdKa2j88,
 * pt-BR https://calendar.app.google/9VijnN1gWwemQnRK7). `?gv=true`
 * is Google's embeddable view of the same page.
 */
const PT_BOOKING_PAGE_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0r8xxB0JHTg6DyEvN9hunryCYwHj-KrdaPQFJFNYg_jFm_ntsMXR2CoEJVNYNCSZICTBbSXbqQ";

export const BOOKING_PAGE_URL: Record<Locale, string> = {
  "pt-PT": PT_BOOKING_PAGE_URL,
  // `hl` puts Google's own labels in Brazilian Portuguese.
  "pt-BR":
    "https://calendar.google.com/calendar/appointments/schedules/AcZssZ1mmS3vxuP1MKZ3VKr4MUIl-0mVPcqO2Bxh0TjY5pD09tkVXk4xt7NLNP36X2Gk14byK4_vg_Li?hl=pt-BR",
  en: PT_BOOKING_PAGE_URL,
};

export const bookingEmbedUrl = (locale: Locale) =>
  `${BOOKING_PAGE_URL[locale]}${BOOKING_PAGE_URL[locale].includes("?") ? "&" : "?"}gv=true`;
