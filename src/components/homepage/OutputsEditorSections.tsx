"use client";

import { Container } from "@/components/Container";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { outputs } from "./data";
import { OutputCard } from "./OutputCard";
import { SectionHeading } from "./shared";

export function RealOutputsSection() {
  const ref = useScrollReveal({ stagger: 0.1, y: 24 });

  return (
    <section id="outputs" className="bg-white/70 py-20 sm:py-24 lg:py-28">
      <Container ref={ref} className="space-y-12">
        <SectionHeading
          eyebrow="Resultados reais"
          title="Veja o que pode criar"
          description="Planificações, fichas e testes prontos a editar — materiais concretos, alinhados com as Aprendizagens Essenciais e adaptáveis a qualquer turma."
          centered
        />
        <div className="grid gap-6 xl:grid-cols-3">
          {outputs.map((output) => (
            <OutputCard key={output.label} output={output} />
          ))}
        </div>
        <p
          data-reveal
          className="mx-auto max-w-2xl text-center text-sm leading-7 text-[color:var(--scooli-muted)]"
        >
          Edite linha a linha, adapte por nível e mantenha sempre o controlo do resultado final.
        </p>
      </Container>
    </section>
  );
}
