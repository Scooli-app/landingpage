"use client";

import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { APP_URL, PRICING } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { usePlans, type Plan } from "@/contexts/PlansContext";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Coins,
  Crown,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";

type DisplayPlan = {
  planCode: string;
  name: string;
  description: string;
  priceCents: number;
  billingPeriod: "month" | "year";
  interactionsPerPeriod: number;
  included: string[];
  excluded?: string[];
  badge?: string;
  highlight?: "default" | "popular" | "annual";
};

const featureLabels: Record<string, string> = {
  rag: "Pesquisa inteligente em documentos",
  streaming: "Geração em tempo real",
  templates: "Templates personalizáveis",
  priority_support: "Suporte prioritário",
};

const fallbackPlans: DisplayPlan[] = [
  {
    planCode: "free",
    name: "Plano Gratuito",
    description: "Para experimentar a Scooli e perceber o fluxo de criação antes de avançar.",
    priceCents: 0,
    billingPeriod: "month",
    interactionsPerPeriod: PRICING.free.generationsPerMonth,
    included: [
      `${PRICING.free.generationsPerMonth} gerações por mês`,
      "Acesso à biblioteca comunitária",
      "Exportação básica",
      "Editor para rever e ajustar",
    ],
    excluded: ["Suporte prioritário", "Modelos de IA avançados"],
    highlight: "default",
  },
  {
    planCode: "pro_monthly",
    name: "Pro Mensal",
    description: "Para quem usa a plataforma todas as semanas e quer um ritmo de trabalho mais fluido.",
    priceCents: PRICING.pro_monthly.priceCents,
    billingPeriod: "month",
    interactionsPerPeriod: 999,
    included: [
      "Geração ilimitada sujeita a uso justo",
      "Modelos de IA avançados",
      "Exportação em múltiplos formatos",
      "Acesso antecipado a novidades",
    ],
    badge: "Mais popular",
    highlight: "popular",
  },
  {
    planCode: "pro_annual",
    name: "Pro Anual",
    description: "Para quem quer estabilidade ao longo do ano letivo e melhor relação custo-benefício.",
    priceCents: PRICING.pro_annual.priceCents,
    billingPeriod: "year",
    interactionsPerPeriod: 999,
    included: [
      "Geração ilimitada sujeita a uso justo",
      "Modelos de IA avançados",
      "Exportação em múltiplos formatos",
      `Poupe ${PRICING.pro_annual.savings} face ao mensal`,
    ],
    badge: "Melhor valor",
    highlight: "annual",
  },
];

function formatPrice(priceCents: number): string {
  if (priceCents === 0) {
    return "Grátis";
  }

  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
  }).format(priceCents / 100);
}

function formatPeriod(period: "month" | "year") {
  return period === "year" ? "/ano" : "/mês";
}

function mapPlan(plan: Plan): DisplayPlan {
  const included: string[] = [];
  const features =
    plan.features && typeof plan.features === "object" ? plan.features : {};

  Object.entries(features).forEach(([key, value]) => {
    if (value && featureLabels[key]) {
      included.push(featureLabels[key]);
    }
  });

  if (plan.planCode === "free") {
    included.push("Acesso à biblioteca comunitária", "Exportação básica");
  }

  if (plan.planCode === "pro_monthly" || plan.planCode === "pro_annual") {
    included.push(
      "Modelos de IA avançados",
      "Exportação em múltiplos formatos",
      "Acesso antecipado a novidades"
    );
  }

  if (plan.planCode === "pro_annual") {
    included.push(`Poupe ${PRICING.pro_annual.savings} face ao mensal`);
  }

  return {
    planCode: plan.planCode,
    name:
      plan.planCode === "free"
        ? "Plano Gratuito"
        : plan.planCode === "pro_annual"
          ? "Pro Anual"
          : "Pro Mensal",
    description: plan.description,
    priceCents: plan.priceCents,
    billingPeriod: plan.billingPeriod,
    interactionsPerPeriod: plan.interactionsPerPeriod,
    included: [...new Set(included)],
    excluded:
      plan.planCode === "free"
        ? ["Suporte prioritário", "Modelos de IA avançados"]
        : [],
    badge:
      plan.planCode === "pro_monthly"
        ? "Mais popular"
        : plan.planCode === "pro_annual"
          ? "Melhor valor"
          : undefined,
    highlight:
      plan.planCode === "pro_monthly"
        ? "popular"
        : plan.planCode === "pro_annual"
          ? "annual"
          : "default",
  };
}

function PlanCard({ plan }: { plan: DisplayPlan }) {
  const isPopular = plan.highlight === "popular";
  const isAnnual = plan.highlight === "annual";
  const isFree = plan.planCode === "free";
  const href = isFree ? `${APP_URL}/sign-up` : `${APP_URL}/checkout?plan=${plan.planCode}`;
  const interactionText =
    plan.interactionsPerPeriod >= 500
      ? "Geração ilimitada*"
      : `${plan.interactionsPerPeriod} gerações/mês`;

  return (
    <div className="relative h-full">
      {plan.badge && (
        <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold text-white shadow-lg",
              isPopular && "bg-[color:var(--scooli-primary)]",
              isAnnual && "bg-[color:var(--scooli-secondary)]",
              !isPopular && !isAnnual && "bg-slate-700"
            )}
          >
            <Sparkles className="h-3.5 w-3.5" />
            {plan.badge}
          </span>
        </div>
      )}

      <div
        className={cn(
          "flex h-full flex-col rounded-[28px] border bg-white p-6 shadow-[0_24px_70px_-56px_rgba(19,35,58,0.32)] transition-all duration-200 sm:p-7",
          isPopular && "border-[color:var(--scooli-primary)] bg-[linear-gradient(180deg,rgba(238,240,255,0.88),rgba(255,255,255,1))]",
          isAnnual && "border-[color:var(--scooli-secondary)] bg-[linear-gradient(180deg,rgba(239,246,255,0.95),rgba(255,255,255,1))]",
          !isPopular && !isAnnual && "border-slate-200"
        )}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{plan.name}</p>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-[color:var(--scooli-ink)]">{formatPrice(plan.priceCents)}</span>
              {plan.priceCents > 0 && <span className="text-slate-500">{formatPeriod(plan.billingPeriod)}</span>}
            </div>
            {isAnnual && <p className="mt-1 text-sm font-medium text-[color:var(--scooli-secondary)]">Poupe no compromisso anual</p>}
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
            {isFree ? <Coins className="h-5 w-5" /> : <Crown className="h-5 w-5" />}
          </div>
        </div>

        <p className="text-sm leading-7 text-[color:var(--scooli-muted)]">{plan.description}</p>

        <div className="mt-5 rounded-[22px] bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
          {interactionText}
        </div>

        <ul className="mt-6 flex-1 space-y-3 text-sm text-slate-700">
          {plan.included.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--scooli-primary)]" />
              <span>{feature}</span>
            </li>
          ))}
          {plan.excluded?.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-slate-400">
              <span className="mt-0.5 inline-block h-4 w-4 shrink-0 rounded-full border border-slate-300" />
              <span className="line-through">{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          asChild
          variant={isFree ? "outline" : "default"}
          className={cn(
            "mt-8 h-12 w-full rounded-full text-base font-semibold",
            !isFree && "shadow-[0_20px_32px_-18px_rgba(103,83,255,0.45)]"
          )}
        >
          <Link href={href}>
            {isFree ? "Começar gratuitamente" : "Subscrever"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

function EnterpriseCard() {
  return (
    <div className="relative h-full">
      <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-800 px-4 py-1.5 text-xs font-semibold text-white shadow-lg">
          <Building2 className="h-3.5 w-3.5" />
          Institucional
        </span>
      </div>
      <div className="flex h-full flex-col rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_-56px_rgba(19,35,58,0.32)] sm:p-7">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Escolas e instituições</p>
            <p className="mt-2 text-3xl font-bold text-[color:var(--scooli-ink)]">Sob consulta</p>
            <p className="mt-1 text-sm font-medium text-slate-500">Plano ajustado ao contexto</p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
            <Building2 className="h-5 w-5" />
          </div>
        </div>
        <p className="text-sm leading-7 text-[color:var(--scooli-muted)]">
          Para agrupamentos, escolas e equipas que precisam de um percurso institucional, apoio e formação.
        </p>
        <ul className="mt-6 flex-1 space-y-3 text-sm text-slate-700">
          {[
            "Plano adaptado ao volume e à equipa",
            "Apoio à implementação",
            "Formação e onboarding",
            "Caminho próprio para validação interna",
          ].map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--scooli-primary)]" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Button asChild className="mt-8 h-12 w-full rounded-full text-base font-semibold shadow-[0_20px_32px_-18px_rgba(103,83,255,0.45)]">
          <Link href="/escolas">
            Ver percurso institucional
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

export function PricingSection() {
  const { plans, hasPlans } = usePlans();
  const displayPlans = hasPlans ? plans.map(mapPlan) : fallbackPlans;

  return (
    <section id="precos" className="bg-gradient-to-b from-slate-50/70 to-white py-20 md:py-28">
      <Container className="space-y-12">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[color:var(--scooli-accent)] px-4 py-1.5 text-sm font-medium text-[color:var(--scooli-primary)]">
            <Sparkles className="h-4 w-4" />
            Preços e opções
          </span>
          <h2 className="font-display text-3xl text-[color:var(--scooli-ink)] md:text-4xl lg:text-5xl">
            Escolha a opção certa para a forma como quer usar a Scooli.
          </h2>
          <p className="text-lg text-[color:var(--scooli-muted)]">
            O plano gratuito ajuda a experimentar. Os planos pagos dão mais continuidade. As escolas seguem por um percurso próprio.
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 xl:grid-cols-4">
          {displayPlans.map((plan) => (
            <PlanCard key={plan.planCode} plan={plan} />
          ))}
          <EnterpriseCard />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-[color:var(--scooli-success)]" />
            <span>Pagamento seguro via Stripe</span>
          </div>
          <div className="flex items-center gap-2">
            <BadgeCheck className="h-5 w-5 text-[color:var(--scooli-primary)]" />
            <span>Cancele a qualquer momento</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-[color:var(--scooli-warning)]" />
            <span>Ativação imediata</span>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400">
          * Geração ilimitada sujeita à <Link href="/terms#precos" className="underline hover:text-slate-600">Política de Uso Justo</Link>.
        </p>
      </Container>
    </section>
  );
}
