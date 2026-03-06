import { Container } from "@/components/Container";

export function ProblemSection() {
  return (
    <section id="problema" className="bg-[color:var(--scooli-accent)]/55 py-16 md:py-24">
      <Container className="max-w-4xl space-y-6">
        <h2 className="text-3xl font-semibold text-[color:var(--scooli-ink)] md:text-4xl">
          Ser professor não devia significar horas extra.
        </h2>
        <p className="text-lg text-[color:var(--scooli-muted)]">
          Todos os dias milhares de professores passam horas a preparar aulas,
          criar testes e fichas, adaptar materiais para diferentes alunos e
          organizar conteúdos pedagógicos.
        </p>
        <p className="text-lg text-[color:var(--scooli-muted)]">
          Grande parte deste trabalho é repetitivo e consome tempo que podia
          ser usado para aquilo que realmente importa: ensinar.
        </p>
        <p className="text-lg font-semibold text-[color:var(--scooli-ink)]">
          A Scooli foi criada para reduzir esse trabalho.
        </p>
      </Container>
    </section>
  );
}
