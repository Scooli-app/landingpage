import { Container } from "@/components/Container";

export function SolutionSection() {
  return (
    <section id="solucao" className="py-16 md:py-24">
      <Container className="max-w-4xl space-y-5">
        <h2 className="text-3xl font-semibold text-[color:var(--scooli-ink)] md:text-4xl">
          Uma plataforma criada para professores.
        </h2>
        <p className="text-lg text-[color:var(--scooli-muted)]">
          A Scooli utiliza inteligência artificial para ajudar professores a
          criar materiais pedagógicos rapidamente, mantendo controlo total sobre
          o conteúdo.
        </p>
        <p className="text-lg text-[color:var(--scooli-muted)]">
          Em vez de começar do zero, pode gerar um primeiro rascunho em
          segundos e depois editar ou adaptar conforme necessário.
        </p>
      </Container>
    </section>
  );
}
