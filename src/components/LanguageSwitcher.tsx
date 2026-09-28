"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import type { ComponentProps } from "react";

const LOCALE_CODES: Record<Locale, string> = {
  "pt-PT": "PT",
  en: "EN",
};

/**
 * Locale picker: a dropdown, not a flag or a side-by-side toggle. The trigger
 * shows only the active locale's code so it stays compact in the nav; the
 * full language name only appears once the menu is open.
 *
 * `usePathname()` from next-intl gives the *internal* pathname template
 * (`/ferramentas/[slug]`), not the localized URL, so switching language keeps
 * the reader on the same page rather than dumping them on the homepage. The
 * route params come from Next.js and fill the template back in.
 *
 * The choice is persisted by next-intl's `NEXT_LOCALE` cookie, which `Link`
 * writes when a `locale` prop is present. Nothing here reads `Accept-Language`:
 * `localeDetection` is off in `routing.ts` and must stay off.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations("languageSwitcher");
  const activeLocale = useLocale() as Locale;
  const pathname = usePathname();
  const params = useParams();

  // `params` carries the dynamic segments of the current route (plus a `locale`
  // entry, which the pathname template simply does not reference). Next.js
  // types it as a loose record, so it cannot line up with next-intl's
  // per-route `StrictParams` — this is the documented switcher pattern.
  const href = { pathname, params } as unknown as ComponentProps<typeof Link>["href"];

  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>
        <button
          type="button"
          aria-label={t("label")}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border border-[color:var(--scooli-border)] bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-[color:var(--scooli-ink)] transition hover:bg-[color:var(--scooli-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--scooli-primary)] data-[state=open]:bg-[color:var(--scooli-accent)]",
            className,
          )}
        >
          <Languages className="h-4 w-4" aria-hidden="true" />
          {LOCALE_CODES[activeLocale]}
        </button>
      </DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          align="end"
          sideOffset={8}
          className="z-50 min-w-[9rem] overflow-hidden rounded-2xl border border-[color:var(--scooli-border)] bg-white p-1 shadow-[var(--shadow-soft)]"
        >
          {locales.map((locale) => {
            const isActive = locale === activeLocale;

            return (
              <DropdownMenuPrimitive.Item key={locale} asChild>
                <Link
                  href={href}
                  locale={locale}
                  hrefLang={locale}
                  aria-current={isActive ? "true" : undefined}
                  aria-label={t("switchTo", { language: t(locale) })}
                  className={cn(
                    "flex cursor-pointer select-none items-center justify-between rounded-xl px-3 py-2 text-sm font-medium outline-none transition",
                    isActive
                      ? "bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]"
                      : "text-[color:var(--scooli-ink)] hover:bg-[color:var(--scooli-accent)]",
                  )}
                >
                  {t(locale)}
                  {isActive && <Check className="h-4 w-4" aria-hidden="true" />}
                </Link>
              </DropdownMenuPrimitive.Item>
            );
          })}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}
