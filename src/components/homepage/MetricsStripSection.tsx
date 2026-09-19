"use client";

import { Container } from "@/components/Container";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { PUBLIC_IMPACT_METRICS } from "@/lib/seo";

const formatCount = (value: number) =>
  String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const metrics = [
  {
    value: `${formatCount(PUBLIC_IMPACT_METRICS.activeTeachers.minValue)}+`,
    label: "professores ativos",
  },
  {
    value: `${formatCount(PUBLIC_IMPACT_METRICS.generatedDocuments.minValue)}+`,
    label: "documentos gerados",
  },
  {
    value: `${PUBLIC_IMPACT_METRICS.weeklyHoursSaved.minValue}h+`,
    label: "poupadas por semana",
  },
  {
    value: `${formatCount(PUBLIC_IMPACT_METRICS.adaptedMaterials.minValue)}+`,
    label: "materiais adaptados",
  },
];

export function MetricsStripSection() {
  const ref = useScrollReveal({ y: 12 });

  return (
    <section
      aria-label="Impacto da Scooli"
      className="border-y border-slate-200/70 bg-white py-8 sm:py-10"
    >
      <Container
        ref={ref}
        className="flex flex-wrap items-center justify-center gap-x-14 gap-y-6"
      >
        {metrics.map((metric) => (
          <div key={metric.label} data-reveal className="text-center">
            <p className="font-display text-3xl leading-none text-[color:var(--scooli-ink)] sm:text-4xl">
              {metric.value}
            </p>
            <p className="mt-2 text-sm font-medium text-[color:var(--scooli-muted)]">
              {metric.label}
            </p>
          </div>
        ))}
      </Container>
    </section>
  );
}
