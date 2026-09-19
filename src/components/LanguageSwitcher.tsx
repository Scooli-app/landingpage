"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { locales } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import type { ComponentProps } from "react";

/**
 * Locale picker.
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
  const activeLocale = useLocale();
  const pathname = usePathname();
  const params = useParams();

  // `params` carries the dynamic segments of the current route (plus a `locale`
  // entry, which the pathname template simply does not reference). Next.js
  // types it as a loose record, so it cannot line up with next-intl's
  // per-route `StrictParams` — this is the documented switcher pattern.
  const href = { pathname, params } as unknown as ComponentProps<typeof Link>["href"];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border border-[color:var(--scooli-border)] bg-white p-0.5",
        className,
      )}
      role="group"
      aria-label={t("label")}
    >
      {locales.map((locale) => {
        const isActive = locale === activeLocale;

        return (
          <Link
            key={locale}
            href={href}
            locale={locale}
            hrefLang={locale}
            aria-current={isActive ? "true" : undefined}
            aria-label={t("switchTo", { language: t(locale) })}
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--scooli-primary)]",
              isActive
                ? "bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]"
                : "text-[color:var(--scooli-muted)] hover:text-[color:var(--scooli-ink)]",
            )}
          >
            {locale === "pt-PT" ? "PT" : "EN"}
          </Link>
        );
      })}
    </div>
  );
}
