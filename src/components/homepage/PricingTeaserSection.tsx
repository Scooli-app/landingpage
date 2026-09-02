"use client";

import { Container } from "@/components/Container";
import { TrackedLink } from "@/components/TrackedLink";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { PROMO_PRICE_CENTS, isPromoActive } from "@/lib/promo";
import { PRICING } from "@/lib/seo";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Coins,
  Crown,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "./shared";

const euro = (value: number) => `€${value.toFixed(2).replace(".", ",")}`;
const euroCents = (cents: number) => euro(cents / 100);

type TeaserPlan = {
  name: string;
  icon: LucideIcon;
  price: string;
  period?: string;
  detail: string;
  description: string;
  features: string[];
  highlighted: boolean;
};

const plans: TeaserPlan[] = [
  {
    name: "Gratuito",
    icon: Coins,
    price: "€0",
    period: "para sempre",
    detail: `${PRICING.free.generationsPerMonth} créditos por mês`,
    description: "Para testar com aulas reais, sem cartão e sem compromisso.",
    features: [
      `${PRICING.free.generationsPerMonth} créditos todos os meses`,
      "Biblioteca comunitária",
      "Editor para rever e ajustar",
    ],
    highlighted: false,
  },
  {
    name: "Pro",
    icon: Crown,
    price: euro(PRICING.pro_monthly.price),
    period: "/mês",
    detail: `ou ${euro(PRICING.pro_annual.price)}/ano · poupa ${PRICING.pro_annual.savings}`,
    description:
      "Para quem prepara aulas todas as semanas, com política de utilização justa.",
    features: [
      "Geração ilimitada*",
      "Modelos de IA avançados",
      "Exportação em vários formatos",
    ],
    highlighted: true,
  },
  {
    name: "Escolas",
    icon: Building2,
    price: "Sob contacto",
    detail: "Pilotos passo a passo",
    description:
      "Para escolas e agrupamentos que querem testar com uma equipa pequena antes de alargar.",
    features: [
      "Plano adaptado à equipa",
      "Apoio à implementação",
      "Formação e onboarding",
    ],
    highlighted: false,
  },
];

export function PricingTeaserSection() {
  const ref = useScrollReveal({ stagger: 0.1, y: 24 });
  const promoActive = isPromoActive();

  return (
    <section id="precos" className="py-16 sm:py-20 lg:py-24">
      <Container ref={ref} className="space-y-12">
        <SectionHeading
          eyebrow="Preços"
          title="Comece grátis. Pague só quando fizer parte da sua semana."
          description="Sem letras pequenas: o plano gratuito inclui 20 créditos por mês, todos os meses."
          centered
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                data-reveal
                className={cn(
                  "relative flex h-full flex-col rounded-[28px] border p-7",
                  plan.highlighted
                    ? "border-[color:var(--scooli-primary)] bg-[linear-gradient(180deg,rgba(238,240,255,0.9),rgba(255,255,255,1))] shadow-[0_32px_90px_-52px_rgba(103,83,255,0.5)]"
                    : "border-slate-200 bg-white shadow-[0_24px_70px_-56px_rgba(19,35,58,0.28)]",
                )}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-7 inline-flex items-center gap-1.5 rounded-full bg-[color:var(--scooli-primary)] px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg">
                    <Sparkles className="h-3.5 w-3.5" />
                    Mais popular
                  </span>
                )}

                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-[color:var(--scooli-ink)]">
                    {plan.name}
                  </h3>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                {plan.name === "Pro" && promoActive ? (
                  <>
                    <div className="mt-5 flex items-baseline gap-2">
                      <span className="font-display text-2xl text-[color:var(--scooli-muted)] line-through">
                        {euro(PRICING.pro_monthly.price)}
                      </span>
                      <span className="font-display text-4xl text-[color:var(--scooli-ink)]">
                        {euroCents(PROMO_PRICE_CENTS.monthly)}
                      </span>
                      <span className="text-sm font-medium text-[color:var(--scooli-muted)]">
                        /mês
                      </span>
                    </div>
                    <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[color:var(--scooli-primary)]/10 px-2.5 py-1 text-xs font-semibold text-[color:var(--scooli-primary)]">
                      <Sparkles className="h-3 w-3" />
                      Regresso às Aulas 2026 · preço bloqueado para sempre
                    </p>
                    <p className="mt-1.5 text-sm font-medium text-[color:var(--scooli-muted)]">
                      ou {euroCents(PROMO_PRICE_CENTS.annual)}/ano · poupa{" "}
                      {PRICING.pro_annual.savings}
                    </p>
                  </>
                ) : (
                  <>
                    <div className="mt-5 flex items-baseline gap-1.5">
                      <span className="font-display text-4xl text-[color:var(--scooli-ink)]">
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-sm font-medium text-[color:var(--scooli-muted)]">
                          {plan.period}
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 text-sm font-medium text-[color:var(--scooli-muted)]">
                      {plan.detail}
                    </p>
                  </>
                )}

                <p className="mt-4 text-sm leading-7 text-[color:var(--scooli-muted)]">
                  {plan.description}
                </p>

                <ul className="mt-6 flex-1 space-y-3 border-t border-slate-100 pt-6 text-sm text-[color:var(--scooli-ink-soft)]">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--scooli-primary)]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
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
              Ver preços e detalhes
              <ArrowRight className="h-4 w-4" />
            </TrackedLink>
          </Button>
          <p className="text-xs text-[color:var(--scooli-muted)]">
            * Geração ilimitada sujeita a política de uso justo.
          </p>
        </div>
      </Container>
    </section>
  );
}
