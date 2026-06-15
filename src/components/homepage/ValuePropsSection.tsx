"use client";

import { Container } from "@/components/Container";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { valueProps } from "./data";
import { InfoCard, SectionHeading } from "./shared";

export function ValuePropsSection() {
  const ref = useScrollReveal({ stagger: 0.1, y: 24 });

  return (
    <section id="porque-a-scooli" className="bg-white py-16 sm:py-20 lg:py-24">
      <Container ref={ref} className="space-y-12">
        <SectionHeading
          eyebrow="Porquê a Scooli"
          title="Não é mais uma IA. É a que foi feita para o programa que ensina."
          description="Quatro diferenças concretas em relação a uma IA genérica."
          centered
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {valueProps.map((item) => (
            <InfoCard key={item.title} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
