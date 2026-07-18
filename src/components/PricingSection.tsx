"use client";

import { ContactModal } from "@/components/ContactModal";
import { Container } from "@/components/Container";
import { TrackedLink } from "@/components/TrackedLink";
import { Button } from "@/components/ui/button";
import { usePlans, type Plan } from "@/contexts/PlansContext";
import { APP_URL, PRICING } from "@/lib/seo";
import { PROMO_PLAN_CODES, PROMO_PRICE_CENTS, isPromoActive } from "@/lib/promo";
import { cn } from "@/lib/utils";
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
import { useState } from "react";

type BillingCycle = "monthly" | "annual";

function formatEur(cents: number): string {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(cents / 100);
}

function calculateSavingsPercent(
  monthlyCents: number,
  annualCents: number,
): string | null {
  const yearlyFromMonthly = monthlyCents * 12;
  const savings = yearlyFromMonthly - annualCents;
  if (savings <= 0) {
    return null;
  }
  return `${Math.round((savings / yearlyFromMonthly) * 100)}%`;
}

function FreePlanCard() {
  const href = `${APP_URL}/sign-up`;
  return (
    <div className="flex h-full flex-col rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_-56px_rgba(19,35,58,0.32)] sm:p-7">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            Plano Gratuito
          </p>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-4xl font-bold text-[color:var(--scooli-ink)]">
              Grátis
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-400">para sempre</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
          <Coins className="h-5 w-5" />
        </div>
      </div>

      <p className="text-sm leading-7 text-[color:var(--scooli-muted)]">
        Para experimentar a Scooli e perceber o fluxo de criação antes de
        avançar.
      </p>

      <div className="mt-5 rounded-[22px] bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
        {PRICING.free.generationsPerMonth} créditos/mês
      </div>

      <ul className="mt-6 flex-1 space-y-3 text-sm text-slate-700">
        {[
          `${PRICING.free.generationsPerMonth} créditos por mês`,
          "Acesso à biblioteca comunitária",
          "Exportação básica",
          "Editor para rever e ajustar",
        ].map((f) => (
          <li key={f} className="flex items-start gap-3">
            <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--scooli-primary)]" />
            <span>{f}</span>
          </li>
        ))}
        {["Suporte prioritário", "Modelos de IA avançados"].map((f) => (
          <li key={f} className="flex items-start gap-3 text-slate-400">
            <span className="mt-0.5 inline-block h-4 w-4 shrink-0 rounded-full border border-slate-300" />
            <span className="line-through">{f}</span>
          </li>
        ))}
      </ul>

      <Button
        asChild
        variant="outline"
        className="mt-8 min-h-[3.25rem] w-full rounded-full px-5 text-sm font-semibold sm:text-[15px]"
      >
        <TrackedLink
          href={href}
          eventName="marketing_plan_selected"
          eventProperties={{
            plan_code: "free",
            billing_period: "month",
            price_cents: 0,
            placement: "pricing_plan_card",
            target_url: href,
          }}
        >
          Experimentar grátis
          <ArrowRight className="h-4 w-4" />
        </TrackedLink>
      </Button>
    </div>
  );
}

function ProPlanCard({
  billing,
  apiPlans,
}: {
  billing: BillingCycle;
  apiPlans: Plan[];
}) {
  const isAnnual = billing === "annual";
  const planCode = isAnnual ? "pro_annual" : "pro_monthly";

  // Use API price if available, fall back to constants
  const apiPlan = apiPlans.find((p) => p.planCode === planCode);
  const annualApiPlan = apiPlans.find((p) => p.planCode === "pro_annual");
  const monthlyApiPlan = apiPlans.find((p) => p.planCode === "pro_monthly");

  const monthlyDisplayCents = isAnnual
    ? Math.round(
        (annualApiPlan?.priceCents ?? PRICING.pro_annual.priceCents) / 12,
      )
    : (monthlyApiPlan?.priceCents ?? PRICING.pro_monthly.priceCents);

  const annualTotalCents =
    annualApiPlan?.priceCents ?? PRICING.pro_annual.priceCents;
  const savingsPercent =
    calculateSavingsPercent(
      monthlyApiPlan?.priceCents ?? PRICING.pro_monthly.priceCents,
      annualTotalCents,
    ) ?? PRICING.pro_annual.savings;
  const currentPriceCents =
    apiPlan?.priceCents ??
    (isAnnual ? PRICING.pro_annual.priceCents : PRICING.pro_monthly.priceCents);

  // Time-limited launch offer: replaces the regular price/plan code while
  // active. Not fetched from the API since promo plans are excluded from the
  // public /subscriptions/plans listing on purpose.
  const promoActive = isPromoActive();
  const promoPriceCents = isAnnual
    ? PROMO_PRICE_CENTS.annual
    : PROMO_PRICE_CENTS.monthly;
  const promoMonthlyDisplayCents = isAnnual
    ? Math.round(PROMO_PRICE_CENTS.annual / 12)
    : PROMO_PRICE_CENTS.monthly;

  const displayPlanCode = promoActive
    ? isAnnual
      ? PROMO_PLAN_CODES.annual
      : PROMO_PLAN_CODES.monthly
    : planCode;
  const displayMonthlyCents = promoActive
    ? promoMonthlyDisplayCents
    : monthlyDisplayCents;
  const displayPriceCents = promoActive ? promoPriceCents : currentPriceCents;

  const href = `${APP_URL}/checkout?plan=${displayPlanCode}`;

  const included = [
    "Modelos de IA avançados",
    "Exportação em múltiplos formatos",
    "Acesso antecipado a novidades",
    "Biblioteca comunitária",
    "Geração de imagens",
  ];

  return (
    <div className="relative h-full">
      <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold text-white shadow-lg",
            isAnnual
              ? "bg-[color:var(--scooli-secondary)]"
              : "bg-[color:var(--scooli-primary)]",
          )}
        >
          <Sparkles className="h-3.5 w-3.5" />
          {isAnnual ? "Melhor valor" : "Mais popular"}
        </span>
      </div>

      <div
        className={cn(
          "flex h-full flex-col rounded-[28px] border p-6 shadow-[0_24px_70px_-56px_rgba(19,35,58,0.32)] transition-all duration-200 sm:p-7",
          isAnnual
            ? "border-[color:var(--scooli-secondary)] bg-[linear-gradient(180deg,rgba(239,246,255,0.95),rgba(255,255,255,1))]"
            : "border-[color:var(--scooli-primary)] bg-[linear-gradient(180deg,rgba(238,240,255,0.88),rgba(255,255,255,1))]",
        )}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Pro
            </p>
            {promoActive && (
              <span className="mt-2 inline-flex w-fit items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-amber-700">
                Oferta limitada
              </span>
            )}
            <div className="mt-2 flex items-baseline gap-2">
              {promoActive && (
                <span className="text-lg font-medium text-slate-400 line-through">
                  {formatEur(monthlyDisplayCents)}
                </span>
              )}
              <span className="text-4xl font-bold text-[color:var(--scooli-ink)]">
                {formatEur(displayMonthlyCents)}
              </span>
              <span className="text-slate-500">/mês</span>
            </div>
            {promoActive ? (
              <p className="mt-1 text-xs text-slate-400">
                {isAnnual ? `${formatEur(promoPriceCents)}/ano · ` : ""}
                válido nos primeiros 30 dias · depois mantém este preço para
                sempre
              </p>
            ) : isAnnual ? (
              <p className="mt-1 text-xs text-slate-400">
                {formatEur(annualTotalCents)}/ano · poupe {savingsPercent}
              </p>
            ) : (
              <p className="mt-1 text-xs text-slate-400">
                faturado mensalmente
              </p>
            )}
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
            <Crown className="h-5 w-5" />
          </div>
        </div>

        <p className="text-sm leading-7 text-[color:var(--scooli-muted)]">
          {isAnnual
            ? "Para quem quer estabilidade ao longo do ano letivo e melhor relação custo-benefício."
            : "Para quem usa a plataforma todas as semanas e quer um ritmo de trabalho mais fluido."}
        </p>

        <div className="mt-5 rounded-[22px] bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
          Geração ilimitada*
        </div>

        <ul className="mt-6 flex-1 space-y-3 text-sm text-slate-700">
          {included.map((f) => (
            <li key={f} className="flex items-start gap-3">
              <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--scooli-primary)]" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <Button
          asChild
          className="mt-8 min-h-[3.25rem] w-full rounded-full px-5 text-sm font-semibold shadow-[0_20px_32px_-18px_rgba(103,83,255,0.45)] sm:text-[15px]"
        >
          <TrackedLink
            href={href}
            eventName="marketing_plan_selected"
            eventProperties={{
              plan_code: displayPlanCode,
              billing_period: isAnnual ? "year" : "month",
              price_cents: displayPriceCents,
              placement: "pricing_plan_card",
              target_url: href,
            }}
          >
            Subscrever
            <ArrowRight className="h-4 w-4" />
          </TrackedLink>
        </Button>
      </div>
    </div>
  );
}

function EnterpriseCard({ onContactClick }: { onContactClick: () => void }) {
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
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Escolas e instituições
            </p>
            <p className="mt-2 text-3xl font-bold text-[color:var(--scooli-ink)]">
              Sob consulta
            </p>
            <p className="mt-1 text-sm font-medium text-slate-500">
              Plano ajustado ao contexto
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
            <Building2 className="h-5 w-5" />
          </div>
        </div>
        <p className="text-sm leading-7 text-[color:var(--scooli-muted)]">
          Para agrupamentos, escolas e equipas que precisam de um percurso
          institucional, apoio e formação.
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
        <Button
          type="button"
          onClick={onContactClick}
          className="mt-8 min-h-[3.25rem] w-full rounded-full px-5 text-sm font-semibold shadow-[0_20px_32px_-18px_rgba(103,83,255,0.45)] sm:text-[15px]"
        >
          Falar com a equipa
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function BillingToggle({
  billing,
  onChange,
  apiPlans,
}: {
  billing: BillingCycle;
  onChange: (b: BillingCycle) => void;
  apiPlans: Plan[];
}) {
  const monthlyApiPlan = apiPlans.find((p) => p.planCode === "pro_monthly");
  const annualApiPlan = apiPlans.find((p) => p.planCode === "pro_annual");
  const savingsPercent =
    calculateSavingsPercent(
      monthlyApiPlan?.priceCents ?? PRICING.pro_monthly.priceCents,
      annualApiPlan?.priceCents ?? PRICING.pro_annual.priceCents,
    ) ?? PRICING.pro_annual.savings;

  return (
    <div className="flex items-center justify-center">
      <div className="inline-flex items-center rounded-full border border-slate-200 bg-white p-1 shadow-sm">
        <button
          type="button"
          onClick={() => onChange("monthly")}
          className={cn(
            "rounded-full px-5 py-2 text-sm font-medium transition-all duration-200",
            billing === "monthly"
              ? "bg-[color:var(--scooli-primary)] text-white shadow-sm"
              : "text-slate-500 hover:text-slate-700",
          )}
        >
          Mensal
        </button>
        <button
          type="button"
          onClick={() => onChange("annual")}
          className={cn(
            "flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all duration-200",
            billing === "annual"
              ? "bg-[color:var(--scooli-primary)] text-white shadow-sm"
              : "text-slate-500 hover:text-slate-700",
          )}
        >
          Anual
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-xs font-semibold",
              billing === "annual"
                ? "bg-white/20 text-white"
                : "bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]",
            )}
          >
            -{savingsPercent}
          </span>
        </button>
      </div>
    </div>
  );
}

export function PricingSection() {
  const { plans, hasPlans } = usePlans();
  const [billing, setBilling] = useState<BillingCycle>("annual");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const apiPlans = hasPlans ? plans : [];

  return (
    <section
      id="precos"
      className="bg-gradient-to-b from-slate-50/70 to-white py-20 md:py-28"
    >
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
            O plano gratuito ajuda a experimentar. Os planos pagos dão mais
            continuidade. As escolas seguem por um percurso próprio.
          </p>
        </div>

        <BillingToggle
          billing={billing}
          onChange={setBilling}
          apiPlans={apiPlans}
        />

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          <FreePlanCard />
          <ProPlanCard billing={billing} apiPlans={apiPlans} />
          <EnterpriseCard onContactClick={() => setIsContactModalOpen(true)} />
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
          * Geração ilimitada sujeita à{" "}
          <TrackedLink
            href="/terms#uso-justo"
            eventName="marketing_navigation_clicked"
            eventProperties={{
              location: "pricing_terms_note",
              link_label: "politica_uso_justo",
            }}
            className="underline hover:text-slate-600"
          >
            Política de Uso Justo
          </TrackedLink>
          .
        </p>
      </Container>

      <ContactModal
        open={isContactModalOpen}
        onOpenChange={setIsContactModalOpen}
        source="enterprise_plan"
        title="Fale com a equipa"
        description="Partilhe o contexto da sua escola ou instituição e entraremos em contacto para perceber o melhor próximo passo."
      />
    </section>
  );
}
