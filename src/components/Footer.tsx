import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--scooli-border)] bg-white py-10">
      <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <Image src="/scooli.svg" alt="Logótipo Scooli" width={90} height={36} />
          <p className="text-sm text-[color:var(--scooli-muted)]">contact@scooli.app</p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm">
          <Link href="#">Sobre</Link>
          <Link href="#acesso">Contactos</Link>
          <Link href="/privacy">Privacidade</Link>
          <Link href="/terms">Termos</Link>
        </div>
      </Container>
    </footer>
  );
}
