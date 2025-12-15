import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";
import { EmailContact } from "./EmailContact";

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--scooli-border)] bg-white py-10 text-[color:var(--scooli-ink)]">
      <Container className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <Link href="/" aria-label="Scooli - Página inicial">
              <Image
              src="/scooli.svg"
              alt="Logótipo Scooli"
              width={100}
              height={40}
              />
          </Link>
          <p className="max-w-md text-sm text-[color:var(--scooli-muted)]">
            Feito em Portugal para professores que querem mais tempo para ensinar
            e inspirar.
              </p>
          <p className="text-xs text-[color:var(--scooli-muted)]">
            © 2025 Scooli. Todos os direitos reservados.
          </p>
            </div>

        <div className="flex flex-wrap items-center gap-2 text-sm text-[color:var(--scooli-ink)]">
          <Link
            href="/privacy"
            className="rounded-lg px-3 py-2 hover:bg-[color:var(--scooli-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--scooli-primary)]"
          >
            Política de Privacidade
          </Link>
          <Link
            href="/terms"
            className="rounded-lg px-3 py-2 hover:bg-[color:var(--scooli-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--scooli-primary)]"
          >
            Termos de Utilização
          </Link>
                    <Link
            href="/cancelar-subscricao"
            className="rounded-lg px-3 py-2 hover:bg-[color:var(--scooli-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--scooli-primary)]"
                    >
                      Cancelar Subscrição
                    </Link>
          <EmailContact className="text-sm" />
        </div>
      </Container>
    </footer>
  );
}
