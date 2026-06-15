"use client";

import { Container } from "@/components/Container";
import { TrackedLink } from "@/components/TrackedLink";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { PRICING } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "./shared";

const euro = (value: number) => `€${value.toFixed(2).replace(".", ",")}`;

const plans = [
  {
    name: "Gratuito",
    price: "€0",
    detail: `${PRICING.free.generationsPerMonth} gerações por mês`,
    description: "Para testar com aulas reais, sem cartão e sem compromisso.",
    highlighted: false,
  },
  {
    name: "Pro",
    price: `${euro(PRICING.pro_monthly.price)}/mês`,
    detail: `ou ${euro(PRICING.pro_annual.price)}/ano (poupa ${PRICING.pro_annual.savings})`,
    description:
      "Para quem prepara aulas todas as semanas. Gerações ilimitadas, com política de utilização justa.",
    highlighted: true,
  },
  {
    name: "Escolas",
    price: "Sob contacto",
    detail: "Pilotos passo a passo",
    description:
      "Para escolas e agrupamentos que querem testar com uma equipa pequena antes de alargar.",
    highlighted: false,
  },
];

export function PricingTeaserSection() {
  const ref = useScrollReveal({ stagger: 0.1, y: 24 });

  return (
    <section id="precos" className="py-16 sm:py-20 lg:py-24">
      <Container ref={ref} className="space-y-12">
        <SectionHeading
          eyebrow="Preços"
          title="Comece grátis. Pague só quando fizer parte da sua semana."
          description="Sem letras pequenas: o plano gratuito inclui 20 gerações por mês, todos os meses."
          centered
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              data-reveal
              className={cn(
                "flex h-full flex-col rounded-[28px] border bg-white p-7 shadow-[0_24px_70px_-56px_rgba(19,35,58,0.28)]",
                plan.highlighted
                  ? "border-[color:var(--scooli-primary)]"
                  : "border-slate-200",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-[color:var(--scooli-ink)]">
                  {plan.name}
                </h3>
                {plan.highlighted && (
                  <span className="rounded-full bg-[color:var(--scooli-accent)] px-3 py-1 text-xs font-semibold text-[color:var(--scooli-primary)]">
                    Para uso semanal
                  </span>
                )}
              </div>
              <p className="mt-4 font-display text-4xl text-[color:var(--scooli-ink)]">
                {plan.price}
              </p>
              <p className="mt-1 text-sm font-medium text-[color:var(--scooli-muted)]">
                {plan.detail}
              </p>
              <p className="mt-4 flex-1 text-sm leading-7 text-[color:var(--scooli-muted)]">
                {plan.description}
              </p>
            </div>
          ))}
        </div>

        <div
          data-reveal
          className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center"
        >
          <p className="rounded-[22px] border border-slate-200 bg-white px-6 py-4 text-sm leading-7 text-[color:var(--scooli-ink-soft)]">
            O ChatGPT é gratuito, mas não conhece os documentos do ensino
            português — e corrigir os erros custa tempo. O Pro compensa pela
            primeira semana que poupar.
          </p>
          <Button
            asChild
            variant="outline"
            className="h-12 rounded-full px-6 text-base font-semibold"
          >
            <TrackedLink
              href="/precos"
              eventName="marketing_cta_clicked"
              eventProperties={{
                cta_id: "home_pricing_teaser_view_pricing",
                placement: "home_pricing_teaser",
              }}
            >
              Ver preços
              <ArrowRight className="h-4 w-4" />
            </TrackedLink>
          </Button>
        </div>
      </Container>
    </section>
  );
}
