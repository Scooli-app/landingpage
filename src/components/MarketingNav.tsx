"use client";

import { Container } from "@/components/Container";
import { usePlans } from "@/contexts/PlansContext";
import { APP_URL } from "@/lib/seo";
import { cn } from "@/lib/utils";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const allLinks = [
  { label: "Funcionalidades", href: "#funcionalidades" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Comunidade", href: "#comunidade" },
  { label: "Preços", href: "#precos", requiresPlans: true },
  { label: "FAQ", href: "#faq" },
  { label: "Contacto", href: "#contacto" },
];

export function MarketingNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const borderOpacity = useTransform(scrollY, [0, 120], [0, 1]);
  const { hasPlans, loading } = usePlans();

  const links = useMemo(() => {
    if (loading) {
      return allLinks;
    }
    return allLinks.filter((link) => !link.requiresPlans || hasPlans);
  }, [hasPlans, loading]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      aria-label="Navegação principal"
      className={cn(
        "sticky top-0 z-50 w-full backdrop-blur-xl transition-all duration-300",
        scrolled ? "bg-white/85 shadow-sm" : "bg-white/70"
      )}
      style={{ borderBottom: `1px solid rgba(228, 228, 231, ${0.4})` }}
    >
      <Container className="flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-full px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--scooli-primary)]"
            aria-label="Voltar à página inicial"
          >
            <Image src="/scooli.svg" alt="Logótipo Scooli" width={70} height={70} priority />
          </Link>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-[color:var(--scooli-muted)] transition hover:text-[color:var(--scooli-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--scooli-primary)]"
            >
              {link.label}
            </Link>
          ))}
          <div className="ml-2 flex items-center gap-3 border-l border-[color:var(--scooli-border)] pl-4">
            <Link
              href={`${APP_URL}/sign-in`}
              className="rounded-full px-3 py-2 text-sm font-medium text-[color:var(--scooli-muted)] transition hover:text-[color:var(--scooli-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--scooli-primary)]"
            >
              Entrar
            </Link>
            <Link
              href={`${APP_URL}/sign-up`}
              className="rounded-full bg-[color:var(--scooli-primary)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[color:var(--scooli-primary-strong)] hover:shadow-lg hover:shadow-[rgba(103,83,255,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--scooli-primary)]"
            >
              Começar gratuitamente
            </Link>
          </div>
        </div>

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((prev) => !prev)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-[color:var(--scooli-border)] bg-white text-[color:var(--scooli-ink)] shadow-sm transition hover:bg-[color:var(--scooli-accent)] lg:hidden"
        >
          <motion.span className="relative flex h-5 w-6 flex-col items-center justify-center">
            <motion.span
              className="absolute h-[2px] w-full rounded-full bg-current"
              animate={{ rotate: open ? 45 : 0, y: open ? 0 : -6 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="absolute h-[2px] w-full rounded-full bg-current"
              animate={{ opacity: open ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="absolute h-[2px] w-full rounded-full bg-current"
              animate={{ rotate: open ? -45 : 0, y: open ? 0 : 6 }}
              transition={{ duration: 0.2 }}
            />
          </motion.span>
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-[color:var(--scooli-border)] bg-white/95 lg:hidden"
          >
            <Container className="flex flex-col gap-3 py-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-[15px] font-medium text-[color:var(--scooli-ink)] hover:bg-[color:var(--scooli-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--scooli-primary)]"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 flex flex-col gap-2 border-t border-[color:var(--scooli-border)] pt-4">
                <Link
                  href={`${APP_URL}/sign-in`}
                  onClick={() => setOpen(false)}
                  className="flex h-12 items-center justify-center rounded-xl border border-[color:var(--scooli-border)] text-[15px] font-semibold text-[color:var(--scooli-ink)] transition hover:bg-[color:var(--scooli-accent)]"
                >
                  Entrar
                </Link>
                <Link
                  href={`${APP_URL}/sign-up`}
                  onClick={() => setOpen(false)}
                  className="flex h-12 items-center justify-center rounded-xl bg-[color:var(--scooli-primary)] text-[15px] font-semibold text-white transition hover:bg-[color:var(--scooli-primary-strong)]"
                >
                  Começar gratuitamente
                </Link>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        aria-hidden
        className="pointer-events-none h-px w-full bg-gradient-to-r from-transparent via-[rgba(103,83,255,0.2)] to-transparent"
        style={{ opacity: borderOpacity }}
      />
    </motion.nav>
  );
}
