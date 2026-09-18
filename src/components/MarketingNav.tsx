"use client";

import { Container } from "@/components/Container";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { TrackedLink } from "@/components/TrackedLink";
import { usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { APP_URL, appSignUpUrl } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * `href` is the internal (Portuguese) pathname key — `TrackedLink` resolves it
 * to the English slug when the reader is on `/en`. `labelKey` points at the
 * `nav` namespace so the visible text follows the locale too.
 */
const links = [
  { labelKey: "howItWorks", href: "/#como-funciona" },
  { labelKey: "tools", href: "/ferramentas" },
  { labelKey: "library", href: "/biblioteca" },
  { labelKey: "pricing", href: "/precos" },
  { labelKey: "about", href: "/sobre" },
] as const;

export function MarketingNav() {
  const locale = useLocale() as Locale;
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  // next-intl's `usePathname` returns the internal pathname, so the active-link
  // check works identically on `/precos` and on `/en/pricing`.
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isLinkActive = (href: string) => {
    if (href.includes("#")) {
      return false;
    }
    return href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <nav
      aria-label={t("ariaLabel")}
      className={cn(
        "sticky top-0 z-50 border-b border-transparent backdrop-blur-xl transition-all duration-200",
        scrolled && "border-[color:var(--scooli-border)] bg-white/92 shadow-[0_10px_30px_-24px_rgba(19,35,58,0.35)]",
        !scrolled && "bg-white/75"
      )}
    >
      <Container className="flex items-center justify-between gap-4 py-4">
        <TrackedLink
          href="/"
          eventName="marketing_navigation_clicked"
          eventProperties={{
            location: "header_logo",
            link_label: "home_logo",
          }}
          className="rounded-full px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--scooli-primary)]"
          aria-label={t("backToHome")}
        >
          <Image src="/scooli.svg" alt={t("logoAlt")} width={86} height={28} priority />
        </TrackedLink>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const isActive = isLinkActive(link.href);
            const label = t(link.labelKey);

            return (
              <TrackedLink
                key={link.href}
                href={link.href}
                eventName="marketing_navigation_clicked"
                eventProperties={{
                  location: "header_desktop_nav",
                  link_label: link.labelKey,
                }}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "rounded-full px-3 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--scooli-primary)]",
                  isActive
                    ? "bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]"
                    : "text-[color:var(--scooli-muted)] hover:bg-[color:var(--scooli-accent)] hover:text-[color:var(--scooli-ink)]"
                )}
              >
                {label}
              </TrackedLink>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <TrackedLink
            href={`${APP_URL}/sign-in`}
            eventName="marketing_cta_clicked"
            eventProperties={{
              cta_id: "header_sign_in",
              placement: "header_desktop",
            }}
            className="rounded-full px-4 py-2 text-sm font-semibold text-[color:var(--scooli-ink)] transition hover:bg-[color:var(--scooli-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--scooli-primary)]"
          >
            {tCommon("signIn")}
          </TrackedLink>
          <TrackedLink
            href={appSignUpUrl(locale)}
            eventName="marketing_cta_clicked"
            eventProperties={{
              cta_id: "header_start_free",
              placement: "header_desktop",
            }}
            className="rounded-full bg-[color:var(--scooli-primary)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[color:var(--scooli-primary-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--scooli-primary)]"
          >
            {tCommon("startFree")}
          </TrackedLink>
          <LanguageSwitcher />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((previous) => !previous)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[color:var(--scooli-border)] bg-white text-[color:var(--scooli-ink)] shadow-sm transition hover:bg-[color:var(--scooli-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--scooli-primary)]"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {open && (
        <div id="mobile-menu" role="region" aria-label={t("mobileMenuLabel")} className="border-t border-[color:var(--scooli-border)] bg-white/95 lg:hidden">
          <Container className="flex flex-col gap-2 py-4">
            {links.map((link) => {
              const isActive = isLinkActive(link.href);

              return (
                <TrackedLink
                  key={link.href}
                  href={link.href}
                  eventName="marketing_navigation_clicked"
                  eventProperties={{
                    location: "header_mobile_nav",
                    link_label: link.labelKey,
                  }}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-2xl px-4 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--scooli-primary)]",
                    isActive
                      ? "bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]"
                      : "text-[color:var(--scooli-ink)] hover:bg-[color:var(--scooli-accent)]"
                  )}
                >
                  {t(link.labelKey)}
                </TrackedLink>
              );
            })}
            <div className="mt-2 grid gap-2 border-t border-[color:var(--scooli-border)] pt-4">
              <TrackedLink
                href={`${APP_URL}/sign-in`}
                eventName="marketing_cta_clicked"
                eventProperties={{
                  cta_id: "header_mobile_sign_in",
                  placement: "header_mobile",
                }}
                className="flex h-12 items-center justify-center rounded-2xl border border-[color:var(--scooli-border)] text-sm font-semibold text-[color:var(--scooli-ink)] transition hover:bg-[color:var(--scooli-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--scooli-primary)]"
              >
                {tCommon("signIn")}
              </TrackedLink>
              <TrackedLink
                href={appSignUpUrl(locale)}
                eventName="marketing_cta_clicked"
                eventProperties={{
                  cta_id: "header_mobile_start_free",
                  placement: "header_mobile",
                }}
                className="flex h-12 items-center justify-center rounded-2xl bg-[color:var(--scooli-primary)] text-sm font-semibold text-white transition hover:bg-[color:var(--scooli-primary-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--scooli-primary)]"
              >
                {tCommon("startFree")}
              </TrackedLink>
            </div>
          </Container>
        </div>
      )}
    </nav>
  );
}
