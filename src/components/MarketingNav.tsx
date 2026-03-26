"use client";

import { Container } from "@/components/Container";
import { toolCardIcons, toolPages } from "@/components/marketing/data";
import { APP_URL } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type FocusEvent } from "react";

const links = [
  { label: "Professores", href: "/professores" },
  { label: "Escolas", href: "/escolas" },
  { label: "Biblioteca", href: "/biblioteca" },
  { label: "Ferramentas", href: "/ferramentas" },
  { label: "Preços", href: "/precos" },
  { label: "Confiança", href: "/confianca" },
  { label: "Sobre", href: "/sobre" },
];

export function MarketingNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);

  const isLinkActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  const isToolsSectionActive = isLinkActive("/ferramentas");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setToolsOpen(false);
    setMobileToolsOpen(isToolsSectionActive);
  }, [pathname, isToolsSectionActive]);

  const handleDesktopToolsBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setToolsOpen(false);
    }
  };

  return (
    <nav
      aria-label="Navegação principal"
      className={cn(
        "sticky top-0 z-50 border-b border-transparent backdrop-blur-xl transition-all duration-200",
        scrolled && "border-[color:var(--scooli-border)] bg-white/92 shadow-[0_10px_30px_-24px_rgba(19,35,58,0.35)]",
        !scrolled && "bg-white/75"
      )}
    >
      <Container className="flex items-center justify-between gap-4 py-4">
        <Link
          href="/"
          className="rounded-full px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--scooli-primary)]"
          aria-label="Voltar ao início"
        >
          <Image src="/scooli.svg" alt="Logótipo Scooli" width={86} height={28} priority />
        </Link>

        <div className="hidden items-center gap-1 xl:flex">
          {links.map((link) => {
            const isActive = isLinkActive(link.href);

            if (link.href === "/ferramentas") {
              return (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setToolsOpen(true)}
                  onMouseLeave={() => setToolsOpen(false)}
                  onFocusCapture={() => setToolsOpen(true)}
                  onBlurCapture={handleDesktopToolsBlur}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      setToolsOpen(false);
                    }
                  }}
                >
                  <Link
                    href={link.href}
                    aria-haspopup="menu"
                    aria-expanded={toolsOpen}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--scooli-primary)]",
                      isActive
                        ? "bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]"
                        : "text-[color:var(--scooli-muted)] hover:bg-[color:var(--scooli-accent)] hover:text-[color:var(--scooli-ink)]"
                    )}
                  >
                    {link.label}
                    <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", toolsOpen && "rotate-180")} />
                  </Link>

                  <div
                    className={cn(
                      "absolute left-0 top-full z-20 pt-3 transition-all duration-200",
                      toolsOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
                    )}
                  >
                    <div className="w-[620px] rounded-[28px] border border-[color:var(--scooli-border)] bg-white/98 p-5 shadow-[0_30px_90px_-42px_rgba(19,35,58,0.4)] backdrop-blur-xl">
                      <div className="flex items-start justify-between gap-6 border-b border-[color:var(--scooli-border)] pb-4">
                        <div className="space-y-1">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Ferramentas Scooli</p>
                          <p className="text-lg font-semibold text-[color:var(--scooli-ink)]">Vai diretamente para o tipo de material que queres criar</p>
                        </div>
                        <Link
                          href="/ferramentas"
                          className="shrink-0 rounded-full border border-[color:var(--scooli-border)] px-3 py-2 text-sm font-semibold text-[color:var(--scooli-primary)] transition hover:border-[color:var(--scooli-primary)] hover:bg-[color:var(--scooli-accent)]"
                        >
                          Ver todas
                        </Link>
                      </div>

                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {toolPages.map((tool) => {
                          const Icon = toolCardIcons[tool.slug];
                          const isToolActive = isLinkActive(`/ferramentas/${tool.slug}`);

                          return (
                            <Link
                              key={tool.slug}
                              href={`/ferramentas/${tool.slug}`}
                              className={cn(
                                "rounded-[22px] border px-4 py-4 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--scooli-primary)]",
                                isToolActive
                                  ? "border-[color:var(--scooli-primary)] bg-[color:var(--scooli-accent)]"
                                  : "border-slate-200 bg-white hover:border-[color:var(--scooli-primary)] hover:bg-[color:var(--scooli-accent)]/50"
                              )}
                            >
                              <div className="flex items-start gap-3">
                                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
                                  <Icon className="h-4 w-4" />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-sm font-semibold text-[color:var(--scooli-ink)]">{tool.shortTitle}</p>
                                  <p className="mt-1 line-clamp-2 text-sm leading-6 text-[color:var(--scooli-muted)]">{tool.description}</p>
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--scooli-primary)]",
                  isActive
                    ? "bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]"
                    : "text-[color:var(--scooli-muted)] hover:bg-[color:var(--scooli-accent)] hover:text-[color:var(--scooli-ink)]"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 xl:flex">
          <Link
            href={`${APP_URL}/sign-in`}
            className="rounded-full px-4 py-2 text-sm font-semibold text-[color:var(--scooli-ink)] transition hover:bg-[color:var(--scooli-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--scooli-primary)]"
          >
            Entrar
          </Link>
          <Link
            href={`${APP_URL}/sign-up`}
            className="rounded-full bg-[color:var(--scooli-primary)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[color:var(--scooli-primary-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--scooli-primary)]"
          >
            Começar gratuitamente
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((previous) => !previous)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[color:var(--scooli-border)] bg-white text-[color:var(--scooli-ink)] shadow-sm transition hover:bg-[color:var(--scooli-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--scooli-primary)] xl:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {open && (
        <div id="mobile-menu" className="border-t border-[color:var(--scooli-border)] bg-white/95 xl:hidden">
          <Container className="flex flex-col gap-2 py-4">
            {links.map((link) => {
              const isActive = isLinkActive(link.href);

              if (link.href === "/ferramentas") {
                return (
                  <div key={link.href} className="rounded-[24px] border border-[color:var(--scooli-border)] bg-white p-2">
                    <div className="flex items-center gap-2">
                      <Link
                        href={link.href}
                        className={cn(
                          "flex-1 rounded-2xl px-4 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--scooli-primary)]",
                          isActive
                            ? "bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]"
                            : "text-[color:var(--scooli-ink)] hover:bg-[color:var(--scooli-accent)]"
                        )}
                      >
                        {link.label}
                      </Link>
                      <button
                        type="button"
                        aria-label={mobileToolsOpen ? "Fechar lista de ferramentas" : "Abrir lista de ferramentas"}
                        aria-expanded={mobileToolsOpen}
                        onClick={() => setMobileToolsOpen((previous) => !previous)}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-2xl text-[color:var(--scooli-muted)] transition hover:bg-[color:var(--scooli-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--scooli-primary)]"
                      >
                        <ChevronDown className={cn("h-5 w-5 transition-transform duration-200", mobileToolsOpen && "rotate-180")} />
                      </button>
                    </div>

                    {mobileToolsOpen && (
                      <div className="mt-2 grid gap-2 border-t border-[color:var(--scooli-border)] pt-3">
                        {toolPages.map((tool) => {
                          const Icon = toolCardIcons[tool.slug];
                          const isToolActive = isLinkActive(`/ferramentas/${tool.slug}`);

                          return (
                            <Link
                              key={tool.slug}
                              href={`/ferramentas/${tool.slug}`}
                              className={cn(
                                "flex items-start gap-3 rounded-2xl px-4 py-3 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--scooli-primary)]",
                                isToolActive
                                  ? "bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]"
                                  : "text-[color:var(--scooli-ink)] hover:bg-[color:var(--scooli-accent)]"
                              )}
                            >
                              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-white text-[color:var(--scooli-primary)] shadow-sm">
                                <Icon className="h-4 w-4" />
                              </span>
                              <span className="min-w-0">
                                <span className="block font-semibold">{tool.shortTitle}</span>
                                <span className="mt-1 block text-xs leading-5 text-[color:var(--scooli-muted)]">{tool.description}</span>
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-2xl px-4 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--scooli-primary)]",
                    isActive
                      ? "bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]"
                      : "text-[color:var(--scooli-ink)] hover:bg-[color:var(--scooli-accent)]"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-2 grid gap-2 border-t border-[color:var(--scooli-border)] pt-4">
              <Link
                href={`${APP_URL}/sign-in`}
                className="flex h-12 items-center justify-center rounded-2xl border border-[color:var(--scooli-border)] text-sm font-semibold text-[color:var(--scooli-ink)] transition hover:bg-[color:var(--scooli-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--scooli-primary)]"
              >
                Entrar
              </Link>
              <Link
                href={`${APP_URL}/sign-up`}
                className="flex h-12 items-center justify-center rounded-2xl bg-[color:var(--scooli-primary)] text-sm font-semibold text-white transition hover:bg-[color:var(--scooli-primary-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--scooli-primary)]"
              >
                Começar gratuitamente
              </Link>
            </div>
          </Container>
        </div>
      )}
    </nav>
  );
}
