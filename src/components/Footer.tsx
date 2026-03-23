import { APP_URL } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";
import { EmailContact } from "./EmailContact";

const primaryLinks = [
  { label: "Professores", href: "/professores" },
  { label: "Escolas", href: "/escolas" },
  { label: "Biblioteca", href: "/biblioteca" },
  { label: "Ferramentas", href: "/ferramentas" },
  { label: "Preços", href: "/precos" },
  { label: "Confiança", href: "/confianca" },
  { label: "Sobre", href: "/sobre" },
];

const legalLinks = [
  { label: "Política de Privacidade", href: "/privacy" },
  { label: "Termos de Utilização", href: "/terms" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[color:var(--scooli-border)] bg-white py-12 text-[color:var(--scooli-ink)]">
      <Container className="space-y-10">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-4">
            <Link href="/" aria-label="Scooli - Página inicial">
              <Image src="/scooli.svg" alt="Logótipo Scooli" width={100} height={40} />
            </Link>
            <p className="max-w-md text-sm leading-7 text-[color:var(--scooli-muted)]">
              Feito em Portugal para professores que querem preparar melhor, adaptar mais depressa e recuperar tempo.
            </p>
            <div className="flex flex-wrap gap-2">
              <Link
                href={`${APP_URL}/sign-up`}
                className="rounded-full bg-[color:var(--scooli-primary)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[color:var(--scooli-primary-strong)]"
              >
                Começar gratuitamente
              </Link>
              <Link
                href="/escolas"
                className="rounded-full border border-[color:var(--scooli-border)] px-4 py-2 text-sm font-semibold text-[color:var(--scooli-ink)] transition hover:bg-[color:var(--scooli-accent)]"
              >
                Para escolas
              </Link>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Explorar</p>
              <div className="mt-4 grid gap-2">
                {primaryLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-[color:var(--scooli-muted)] transition hover:text-[color:var(--scooli-primary)]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Legal e contacto</p>
              <div className="mt-4 grid gap-2">
                {legalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-[color:var(--scooli-muted)] transition hover:text-[color:var(--scooli-primary)]"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href={`${APP_URL}/sign-in`}
                  className="text-sm text-[color:var(--scooli-muted)] transition hover:text-[color:var(--scooli-primary)]"
                >
                  Entrar
                </Link>
                <EmailContact className="px-0 py-0 text-sm text-[color:var(--scooli-muted)] hover:bg-transparent hover:text-[color:var(--scooli-primary)]" showIcon={false} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-[color:var(--scooli-border)] pt-6 text-xs text-[color:var(--scooli-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Scooli. Todos os direitos reservados.</p>
          <p>Homepage para clareza. Páginas próprias para confiança, preços, biblioteca e contexto institucional.</p>
        </div>
      </Container>
    </footer>
  );
}
