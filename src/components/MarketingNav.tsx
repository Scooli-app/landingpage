"use client";

import { Container } from "@/components/Container";
import { APP_URL } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);

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
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);

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
