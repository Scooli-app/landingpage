"use client";

import { Container } from "@/components/Container";
import { APP_URL } from "@/lib/seo";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const links = [
  { label: "Funcionalidades", href: "#funcionalidades" },
  { label: "Biblioteca", href: "#biblioteca" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "FAQ", href: "#faq" },
];

export function MarketingNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-[color:var(--scooli-border)] bg-white/90 backdrop-blur-xl">
      <Container className="flex items-center justify-between py-3">
        <Link href="/" aria-label="Scooli" className="flex items-center gap-2">
          <Image src="/scooli.svg" alt="Logótipo Scooli" width={88} height={36} />
        </Link>

        <div className="hidden items-center gap-5 lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-[color:var(--scooli-muted)] hover:text-[color:var(--scooli-ink)]">
              {link.label}
            </Link>
          ))}
          <Link href={`${APP_URL}/sign-in`} className="text-sm font-medium text-[color:var(--scooli-muted)] hover:text-[color:var(--scooli-ink)]">
            Login
          </Link>
          <Link
            href="#acesso"
            className="inline-flex items-center gap-2 rounded-full bg-[color:var(--scooli-primary)] px-5 py-2 text-sm font-semibold text-white hover:bg-[color:var(--scooli-primary-strong)]"
          >
            <Sparkles className="h-4 w-4" />
            Experimentar
          </Link>
        </div>

        <button onClick={() => setOpen((v) => !v)} className="rounded-lg border px-3 py-2 text-sm lg:hidden">
          Menu
        </button>
      </Container>

      {open && (
        <Container className="flex flex-col gap-3 border-t border-[color:var(--scooli-border)] py-4 lg:hidden">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link href={`${APP_URL}/sign-in`} onClick={() => setOpen(false)}>
            Login
          </Link>
          <Link href="#acesso" onClick={() => setOpen(false)}>
            Experimentar acesso antecipado
          </Link>
        </Container>
      )}
    </nav>
  );
}
