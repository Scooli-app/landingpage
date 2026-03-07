"use client";

import { Container } from "@/components/Container";

export function ProblemSolutionSection() {
  return (
    <section className="py-16 md:py-24">
      <Container className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-2xl border border-[color:var(--scooli-border)] bg-white/90 p-6 shadow-sm">
          <h2 className="text-3xl font-semibold text-[color:var(--scooli-ink)] md:text-4xl">
            Ser professor não devia significar horas extra.
          </h2>
          <p className="text-[color:var(--scooli-muted)]">
            Todos os dias milhares de professores passam horas a:
          </p>
          <ul className="list-disc space-y-1 pl-5 text-[color:var(--scooli-muted)]">
            <li>preparar aulas</li>
            <li>criar testes e fichas</li>
            <li>adaptar materiais para diferentes alunos</li>
            <li>organizar conteúdos pedagógicos</li>
          </ul>
          <p className="text-[color:var(--scooli-muted)]">
            Grande parte deste trabalho é repetitivo e consome tempo que podia
            ser usado para aquilo que realmente importa: <b>ensinar</b>.
          </p>
        </div>

        <div className="space-y-4 rounded-2xl border border-[color:var(--scooli-border)] bg-[color:var(--scooli-accent)]/60 p-6 shadow-sm">
          <h2 className="text-3xl font-semibold text-[color:var(--scooli-ink)] md:text-4xl">
            Uma plataforma criada para professores.
          </h2>
          <p className="text-[color:var(--scooli-muted)]">
            A Scooli utiliza inteligência artificial para ajudar professores a
            criar materiais pedagógicos rapidamente.
          </p>
          <p className="text-[color:var(--scooli-muted)]">
            Em vez de começar do zero, pode gerar um primeiro rascunho em
            segundos e depois editar ou adaptar conforme necessário.
          </p>
        </div>
      </Container>
    </section>
  );
}
