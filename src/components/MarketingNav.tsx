"use client";

import { Container } from "@/components/Container";
import { InstitutionalContactButton } from "@/components/InstitutionalContactButton";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { NAV_TOOL_SLUGS } from "@/components/site/nav-data";
import { TrackedLink } from "@/components/TrackedLink";
import { buttonVariants } from "@/components/ui/button";
import { usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { APP_URL, appSignUpUrl } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";

/** `href` is the internal (Portuguese) pathname key; TrackedLink localizes it. */
const links = [
  { labelKey: "teachers", href: "/professores" },
  { labelKey: "schools", href: "/escolas" },
  { labelKey: "pricing", href: "/precos" },
] as const;

const toolHref = (slug: string) => ({
  pathname: "/ferramentas/[slug]" as const,
  params: { slug },
});

export function MarketingNav() {
  const locale = useLocale() as Locale;
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const toolsId = useId();
  const toolsRef = useRef<HTMLDivElement>(null);
  const toolsButtonRef = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [panelTop, setPanelTop] = useState(64);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const toolsActive = isActive("/ferramentas");

  useEffect(() => {
    setMobileOpen(false);
    setToolsOpen(false);
  }, [pathname]);

  // Lock page scroll behind the full-screen mobile menu.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!toolsOpen) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!toolsRef.current?.contains(event.target as Node)) {
        setToolsOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setToolsOpen(false);
        toolsButtonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [toolsOpen]);

  // Hover opens the menu on pointer devices, with a short grace period so the
  // pointer can travel from the trigger into the panel.
  const openOnHover = useCallback(() => {
    if (hoverTimer.current) {clearTimeout(hoverTimer.current);}
    setToolsOpen(true);
  }, []);
  const closeOnLeave = useCallback(() => {
    if (hoverTimer.current) {clearTimeout(hoverTimer.current);}
    hoverTimer.current = setTimeout(() => setToolsOpen(false), 140);
  }, []);

  const linkClass = (active: boolean) =>
    cn(
      "rounded-md px-3 py-2 text-[14.5px] transition-colors hover:text-ink",
      active ? "text-ink" : "text-body",
    );

  // The <header> is the sticky element: a sticky <nav> inside a header of the
  // same height would have no room to stick.
  return (
    <>
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-line bg-white/[0.88] backdrop-blur-md">
      <nav aria-label={t("ariaLabel")}>
        <Container className="flex h-16 items-center gap-6">
          <TrackedLink
            href="/"
            eventName="marketing_navigation_clicked"
            eventProperties={{ location: "header_logo", link_label: "home_logo" }}
            className="shrink-0 rounded-md"
            aria-label={t("backToHome")}
          >
            <Image src="/scooli.svg" alt={t("logoAlt")} width={80} height={26} priority />
          </TrackedLink>

          <div className="hidden items-center gap-1 lg:flex">
            <div
              ref={toolsRef}
              className="relative"
              onPointerEnter={(event) => event.pointerType === "mouse" && openOnHover()}
              onPointerLeave={(event) => event.pointerType === "mouse" && closeOnLeave()}
            >
              <button
                ref={toolsButtonRef}
                type="button"
                aria-expanded={toolsOpen}
                aria-controls={toolsId}
                onClick={() => setToolsOpen((open) => !open)}
                className={cn(linkClass(toolsActive), "inline-flex items-center gap-1")}
              >
                {t("tools")}
                <ChevronDown
                  aria-hidden
                  className={cn("size-3.5 opacity-60 transition-transform", toolsOpen && "rotate-180")}
                />
              </button>

              <div
                id={toolsId}
                hidden={!toolsOpen}
                className="absolute left-0 top-full pt-3"
              >
                <div className="grid w-[600px] grid-cols-[210px_1fr] gap-1.5 rounded-xl border border-line bg-white p-2.5 shadow-[0_16px_44px_-16px_rgba(17,17,17,0.16)]">
                  <div className="flex flex-col rounded-lg border border-line bg-[#FBFBFA] p-4">
                    <p className="font-display text-xl font-medium tracking-[-0.01em] text-ink">
                      {t("toolsMenu.howTitle")}
                    </p>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-subtle">
                      {t("toolsMenu.howDescription")}
                    </p>
                    <TrackedLink
                      href="/#como-funciona"
                      eventName="marketing_navigation_clicked"
                      eventProperties={{ location: "header_tools_menu", link_label: "how_it_works" }}
                      onClick={() => setToolsOpen(false)}
                      className="mt-auto pt-4 text-[13.5px] font-medium text-violet-ink hover:underline"
                    >
                      {t("toolsMenu.howLink")} →
                    </TrackedLink>
                  </div>
                  <ul className="grid grid-cols-2 gap-0.5 p-1">
                    {NAV_TOOL_SLUGS.map((slug) => (
                      <li key={slug}>
                        <TrackedLink
                          href={toolHref(slug)}
                          eventName="marketing_navigation_clicked"
                          eventProperties={{ location: "header_tools_menu", link_label: slug }}
                          onClick={() => setToolsOpen(false)}
                          className="block rounded-md px-2.5 py-2 transition-colors hover:bg-stone-soft"
                        >
                          <span className="block text-sm text-ink">
                            {t(`toolsMenu.items.${slug}.label`)}
                          </span>
                          <span className="block text-[12.5px] leading-snug text-subtle">
                            {t(`toolsMenu.items.${slug}.description`)}
                          </span>
                        </TrackedLink>
                      </li>
                    ))}
                    <li className="col-span-2 mt-1 border-t border-line pt-1.5">
                      <TrackedLink
                        href="/ferramentas"
                        eventName="marketing_navigation_clicked"
                        eventProperties={{ location: "header_tools_menu", link_label: "all_tools" }}
                        onClick={() => setToolsOpen(false)}
                        className="block rounded-md px-2.5 py-2 text-[13.5px] font-medium text-violet-ink hover:bg-stone-soft"
                      >
                        {t("toolsMenu.allTools")} →
                      </TrackedLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {links.map((link) => (
              <TrackedLink
                key={link.href}
                href={link.href}
                eventName="marketing_navigation_clicked"
                eventProperties={{ location: "header_desktop_nav", link_label: link.labelKey }}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={linkClass(isActive(link.href))}
              >
                {t(link.labelKey)}
              </TrackedLink>
            ))}
          </div>

          <div className="ml-auto hidden items-center gap-4 lg:flex">
            <LanguageSwitcher />
            <TrackedLink
              href={`${APP_URL}/sign-in`}
              eventName="marketing_cta_clicked"
              eventProperties={{ cta_id: "header_sign_in", placement: "header_desktop" }}
              className="text-[14.5px] text-subtle transition-colors hover:text-ink"
            >
              {tCommon("signIn")}
            </TrackedLink>
            <TrackedLink
              href={appSignUpUrl(locale)}
              eventName="marketing_cta_clicked"
              eventProperties={{ cta_id: "header_start_free", placement: "header_desktop" }}
              className={buttonVariants({ variant: "primary", size: "sm" })}
            >
              {tCommon("startFree")}
            </TrackedLink>
          </div>

          <div className="ml-auto flex items-center gap-2 lg:hidden">
            <LanguageSwitcher />
            <button
              type="button"
              aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => {
              setPanelTop(headerRef.current?.getBoundingClientRect().bottom ?? 64);
              setMobileOpen((open) => !open);
            }}
              className="inline-flex size-10 items-center justify-center rounded-md text-ink transition-colors hover:bg-stone-soft"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </Container>

      </nav>
    </header>
    {mobileOpen && (
      <div
        id="mobile-menu"
        role="region"
        aria-label={t("mobileMenuLabel")}
        style={{ top: panelTop }}
        className="fixed inset-x-0 bottom-0 z-40 overflow-y-auto bg-white lg:hidden"
      >
        <Container className="flex min-h-full flex-col py-4">
          <p className="pt-2 font-mono text-xs uppercase tracking-[0.06em] text-subtle">
            {t("tools")}
          </p>
          <ul className="mt-1 border-b border-line pb-3">
            {NAV_TOOL_SLUGS.map((slug) => (
              <li key={slug}>
                <TrackedLink
                  href={toolHref(slug)}
                  eventName="marketing_navigation_clicked"
                  eventProperties={{ location: "header_mobile_nav", link_label: slug }}
                  className="block py-2.5 text-[17px] text-ink"
                >
                  {t(`toolsMenu.items.${slug}.label`)}
                </TrackedLink>
              </li>
            ))}
            <li>
              <TrackedLink
                href="/#como-funciona"
                eventName="marketing_navigation_clicked"
                eventProperties={{ location: "header_mobile_nav", link_label: "how_it_works" }}
                onClick={() => setMobileOpen(false)}
                className="block py-2.5 text-[15px] text-violet-ink"
              >
                {t("toolsMenu.howLink")} →
              </TrackedLink>
            </li>
          </ul>
          <ul>
            {links.map((link) => (
              <li key={link.href} className="border-b border-line">
                <TrackedLink
                  href={link.href}
                  eventName="marketing_navigation_clicked"
                  eventProperties={{ location: "header_mobile_nav", link_label: link.labelKey }}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className="block py-3.5 text-[17px] text-ink"
                >
                  {t(link.labelKey)}
                </TrackedLink>
              </li>
            ))}
            <li className="border-b border-line">
              <TrackedLink
                href={`${APP_URL}/sign-in`}
                eventName="marketing_cta_clicked"
                eventProperties={{ cta_id: "header_mobile_sign_in", placement: "header_mobile" }}
                className="block py-3.5 text-[17px] text-subtle"
              >
                {tCommon("signIn")}
              </TrackedLink>
            </li>
          </ul>
          <div className="mt-auto grid gap-2 pb-6 pt-8">
            <TrackedLink
              href={appSignUpUrl(locale)}
              eventName="marketing_cta_clicked"
              eventProperties={{ cta_id: "header_mobile_start_free", placement: "header_mobile" }}
              className={buttonVariants({ variant: "primary", size: "lg" })}
            >
              {tCommon("startFree")}
            </TrackedLink>
            <InstitutionalContactButton
              source="header_mobile_book_demo"
              label={tCommon("bookDemo")}
              variant="secondary"
              size="lg"
            />
          </div>
        </Container>
      </div>
    )}
    </>
  );
}
