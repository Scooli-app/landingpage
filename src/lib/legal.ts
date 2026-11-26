import type { Locale } from "@/i18n/routing";

/** The Portuguese legal text is binding; only the English translation carries the disclaimer. */
export const SHOWS_LEGAL_DISCLAIMER: Record<Locale, boolean> = { "pt-PT": false, "pt-BR": false, en: true };
