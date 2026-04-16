"use client";

import { Container } from "@/components/Container";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { steps } from "./data";
import { SectionHeading } from "./shared";

export function HowItWorksSection() {
  const ref = useScrollReveal({ stagger: 0.12, y: 24 });

  return (
    <section id="como-funciona" className="py-20 sm:py-24 lg:py-28">
      <Container ref={ref} className="space-y-12">
        <SectionHeading
          eyebrow="Como funciona"
          title="Da ideia ao material pronto a usar em três passos"
          description="Sem configuração complicada: indique o contexto, receba o material completo e ajuste apenas o que fizer sentido para a sua turma."
          centered
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                data-reveal
                className="rounded-[32px] border border-slate-200/80 bg-white p-6 shadow-[0_24px_80px_-60px_rgba(19,35,58,0.4)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--scooli-accent)] text-sm font-semibold text-[color:var(--scooli-primary)]">
                    0{index + 1}
                  </span>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 text-[color:var(--scooli-primary)]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-[color:var(--scooli-ink)]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[color:var(--scooli-muted)] sm:text-[15px]">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
