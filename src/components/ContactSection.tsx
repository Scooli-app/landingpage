import { Container } from "@/components/Container";
import { Gift, Rocket, Users } from "lucide-react";

export function ContactSection() {
  return (
    <section id="acesso" className="bg-gradient-to-b from-[color:var(--scooli-accent)]/70 to-white py-16 md:py-24">
      <Container className="grid gap-10 md:grid-cols-2 md:items-start">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-[color:var(--scooli-ink)] md:text-4xl">
            Experimente a Scooli antes do lançamento oficial
          </h2>
          <p className="text-[color:var(--scooli-muted)]">
            Estamos a abrir acesso antecipado a um número limitado de
            professores que queiram testar a plataforma e dar feedback.
          </p>
          <ul className="space-y-3 text-[color:var(--scooli-ink)]">
            <li className="flex items-center gap-2"><Rocket className="h-4 w-4 text-[color:var(--scooli-primary)]" /> acesso antecipado à plataforma</li>
            <li className="flex items-center gap-2"><Users className="h-4 w-4 text-[color:var(--scooli-primary)]" /> ajudar a melhorar a ferramenta</li>
            <li className="flex items-center gap-2"><Gift className="h-4 w-4 text-[color:var(--scooli-primary)]" /> créditos gratuitos para testar funcionalidades</li>
          </ul>
        </div>

        <form className="space-y-4 rounded-2xl border border-[color:var(--scooli-border)] bg-white p-6 shadow-lg">
          <label className="block text-sm font-medium">
            Nome
            <input className="mt-1 w-full rounded-lg border border-[color:var(--scooli-border)] px-3 py-2" />
          </label>
          <label className="block text-sm font-medium">
            Email
            <input type="email" className="mt-1 w-full rounded-lg border border-[color:var(--scooli-border)] px-3 py-2" />
          </label>
          <label className="block text-sm font-medium">
            Disciplina
            <input className="mt-1 w-full rounded-lg border border-[color:var(--scooli-border)] px-3 py-2" />
          </label>
          <label className="block text-sm font-medium">
            Ano de ensino
            <input className="mt-1 w-full rounded-lg border border-[color:var(--scooli-border)] px-3 py-2" />
          </label>
          <button
            type="button"
            className="w-full rounded-full bg-[color:var(--scooli-primary)] px-5 py-3 font-semibold text-white hover:bg-[color:var(--scooli-primary-strong)]"
          >
            Pedir acesso
          </button>
        </form>
      </Container>
    </section>
  );
}
