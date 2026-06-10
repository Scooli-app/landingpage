"use client";

import { Container } from "@/components/Container";
import { TrackedLink } from "@/components/TrackedLink";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { APP_URL } from "@/lib/seo";
import { ArrowRight } from "lucide-react";
import { steps } from "./data";
import { SectionHeading } from "./shared";

export function HowItWorksSection() {
  const ref = useScrollReveal({ stagger: 0.12, y: 24 });

  return (
    <section id="como-funciona" className="py-20 sm:py-24 lg:py-28">
      <Container ref={ref} className="space-y-12">
        <SectionHeading
          eyebrow="Como funciona"
          title="Três passos. Sem configuração."
          description="Indique o contexto, receba o documento completo e ajuste apenas o que fizer sentido para a sua turma."
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
        <div data-reveal className="flex justify-center">
          <Button
            asChild
            className="h-12 rounded-full px-6 text-base font-semibold shadow-[0_20px_32px_-18px_rgba(103,83,255,0.45)]"
          >
            <TrackedLink
              href={`${APP_URL}/sign-up`}
              eventName="marketing_cta_clicked"
              eventProperties={{
                cta_id: "home_how_it_works_create_first",
                placement: "home_how_it_works",
              }}
            >
              Criar o primeiro recurso
              <ArrowRight className="h-4 w-4" />
            </TrackedLink>
          </Button>
        </div>
      </Container>
    </section>
  );
}
