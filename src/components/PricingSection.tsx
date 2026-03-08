"use client";

import { ContactModal } from "@/components/ContactModal";
import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usePlans, type Plan } from "@/contexts/PlansContext";
import { APP_URL } from "@/lib/seo";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  BadgePercent,
  Building2,
  Coins,
  Crown,
  Loader2,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";

const WEB_APP_URL = APP_URL;

const featureLabels: Record<string, string> = {
  rag: "Pesquisa inteligente em documentos",
  streaming: "Geração em tempo real",
  templates: "Templates personalizáveis",
  priority_support: "Suporte prioritário",
};

const additionalFeatures: Record<string, string[]> = {
  free: ["Acesso à biblioteca comunitária", "Exportação básica"],
  pro_monthly: [
    "Modelos de IA avançados",
    "Acesso antecipado a features",
    "Exportação em múltiplos formatos",
  ],
  pro_annual: [
    "Modelos de IA avançados",
    "Acesso antecipado a features",
    "Exportação em múltiplos formatos",
    "Poupança de 20% vs mensal",
  ],
};

const excludedFeatures: Record<string, string[]> = {
  free: ["Suporte prioritário", "Modelos de IA avançados"],
  pro_monthly: [],
  pro_annual: [],
};

function formatPrice(priceCents: number): string {
  if (priceCents === 0) {
    return "Grátis";
  }

  const price = priceCents / 100;
  const formatted = new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
  }).format(price);

  return formatted;
}

function formatPeriod(billingPeriod: string): string {
  if (billingPeriod === "month") {
    return "/mês";
  }
  if (billingPeriod === "year") {
    return "/ano";
  }
  return "";
}

function PlanCard({
  plan,
  index,
  isPopular,
}: {
  plan: Plan;
  index: number;
  isPopular: boolean;
}) {
  const isPro = plan.planCode.includes("pro");
  const isAnnual = plan.planCode.includes("annual");

  const handleClick = () => {
    if (isPro) {
      window.location.href = `${WEB_APP_URL}/checkout?plan=${plan.planCode}`;
    } else {
      window.location.href = `${WEB_APP_URL}/signup`;
    }
  };

  const includedFeatures: string[] = [];
  const notIncludedFeatures: string[] = [];

  Object.entries(plan.features).forEach(([key, value]) => {
    if (value && featureLabels[key]) {
      includedFeatures.push(featureLabels[key]);
    }
  });

  const extras = additionalFeatures[plan.planCode] || [];
  includedFeatures.push(...extras);

  const excluded = excludedFeatures[plan.planCode] || [];
  notIncludedFeatures.push(...excluded);

  const interactionsText =
    plan.interactionsPerPeriod >= 500
      ? "Geração ilimitada*"
      : `${plan.interactionsPerPeriod} gerações/mês`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative"
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-1.5 text-xs font-semibold text-white shadow-lg">
            <Sparkles className="h-3.5 w-3.5" />
            Mais popular
          </span>
        </div>
      )}

      {isAnnual && (
        <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-1.5 text-xs font-semibold text-white shadow-lg">
            <BadgePercent className="h-3.5 w-3.5" />
            Melhor negócio
          </span>
        </div>
      )}

      <Card
        className={`h-full rounded-2xl transition-all duration-300 ${
          isPopular
            ? "border-2 border-[#6753FF] bg-gradient-to-br from-[#6753FF]/5 to-[#6753FF]/10 shadow-xl shadow-[#6753FF]/10"
            : isAnnual
              ? "border-2 border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg shadow-green-500/10"
              : "border border-slate-200 bg-white shadow-sm hover:shadow-md"
        }`}
      >
        <CardContent className="flex h-full flex-col p-6 md:p-8">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <p
                className={`text-sm font-semibold uppercase tracking-wide ${
                  isPopular
                    ? "text-[#6753FF]"
                    : isAnnual
                      ? "text-green-600"
                      : "text-slate-500"
                }`}
              >
                {plan.planCode === "free"
                  ? "Plano Gratuito"
                  : isAnnual
                    ? "Pro Anual"
                    : "Pro Mensal"}
              </p>
              <div className="mt-2 flex items-baseline gap-1">
                <span
                  className={`text-4xl font-bold ${
                    isPopular
                      ? "text-[#6753FF]"
                      : isAnnual
                        ? "text-green-600"
                        : "text-slate-900"
                  }`}
                >
                  {formatPrice(plan.priceCents)}
                </span>
                {plan.priceCents > 0 && (
                  <span className="text-slate-500">{formatPeriod(plan.billingPeriod)}</span>
                )}
              </div>
              {isAnnual && <p className="mt-1 text-sm font-medium text-green-600">Poupe 20% vs mensal</p>}
            </div>
            <div
              className={`rounded-xl p-3 ${
                isPopular
                  ? "bg-[#6753FF]/10 text-[#6753FF]"
                  : isAnnual
                    ? "bg-green-100 text-green-600"
                    : "bg-slate-100 text-slate-600"
              }`}
            >
              {isPro ? <Crown className="h-6 w-6" /> : <Coins className="h-6 w-6" />}
            </div>
          </div>

          <p className="mb-4 text-slate-600">{plan.description}</p>

          <div className={`mb-6 rounded-xl p-3 ${isPopular ? "bg-[#6753FF]/10" : isAnnual ? "bg-green-100" : "bg-slate-50"}`}>
            <p className={`text-sm font-semibold ${isPopular ? "text-[#6753FF]" : isAnnual ? "text-green-700" : "text-slate-700"}`}>
              {interactionsText}
            </p>
          </div>

          <ul className="mb-8 flex-1 space-y-3">
            {includedFeatures.map((feature, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                <BadgeCheck
                  className={`mt-0.5 h-4 w-4 flex-shrink-0 ${
                    isPopular ? "text-[#6753FF]" : isAnnual ? "text-green-600" : "text-green-500"
                  }`}
                />
                <span>{feature}</span>
              </li>
            ))}
            {notIncludedFeatures.map((feature, i) => (
              <li key={`excluded-${i}`} className="flex items-start gap-3 text-sm text-slate-400">
                <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-300" />
                <span className="line-through">{feature}</span>
              </li>
            ))}
          </ul>

          <Button
            onClick={handleClick}
            className={`h-12 w-full rounded-xl text-base font-semibold transition-all duration-200 ${
              isPopular
                ? "bg-[#6753FF] text-white hover:bg-[#4E3BC0] hover:shadow-lg hover:shadow-[#6753FF]/25"
                : isAnnual
                  ? "bg-green-600 text-white hover:bg-green-700 hover:shadow-lg hover:shadow-green-500/25"
                  : "border-2 border-slate-200 bg-white text-slate-700 hover:border-[#6753FF] hover:bg-[#6753FF]/5 hover:text-[#6753FF]"
            }`}
            variant={isPopular || isAnnual ? "default" : "outline"}
          >
            {isPro ? (
              <>
                <Zap className="mr-2 h-4 w-4" />
                Subscrever
              </>
            ) : (
              <>
                <ShieldCheck className="mr-2 h-4 w-4" />
                Começar gratuitamente
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

const enterpriseFeatures = [
  "Licenças múltiplas para a escola",
  "Gestão centralizada de contas",
  "Suporte prioritário dedicado",
  "Formação personalizada para docentes",
  "Integrações personalizadas",
  "Gestor de conta dedicado",
  "Geração ilimitada",
  "Modelos de IA avançados",
];

function EnterprisePlanCard({ index }: { index: number }) {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className="relative"
      >
        <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-1.5 text-xs font-semibold text-white shadow-lg">
            <Building2 className="h-3.5 w-3.5" />
            Institucional
          </span>
        </div>

        <Card className="h-full rounded-2xl border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg shadow-blue-500/10 transition-all duration-300">
          <CardContent className="flex h-full flex-col p-6 md:p-8">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Escolas e Instituições</p>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-blue-600">Sob Consulta</span>
                </div>
                <p className="mt-1 text-sm font-medium text-blue-600">Plano personalizado</p>
              </div>
              <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                <Building2 className="h-6 w-6" />
              </div>
            </div>

            <p className="mb-4 text-slate-600">Solução à medida para escolas, agrupamentos e instituições de ensino.</p>

            <div className="mb-6 rounded-xl bg-blue-100 p-3">
              <p className="text-sm font-semibold text-blue-700">Personalizado para a sua instituição</p>
            </div>

            <ul className="mb-8 flex-1 space-y-3">
              {enterpriseFeatures.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                  <BadgeCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={() => setContactOpen(true)}
              className="h-12 w-full rounded-xl bg-blue-600 text-base font-semibold text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Falar com a equipa
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <ContactModal
        open={contactOpen}
        onOpenChange={setContactOpen}
        source="enterprise_plan"
        title="Plano Institucional"
        description="Preencha o formulário e a nossa equipa entrará em contacto para criar um plano à medida da sua instituição."
      />
    </>
  );
}

export function PricingSection() {
  const { plans, loading, hasPlans } = usePlans();

  if (!loading && !hasPlans) {
    return null;
  }

  return (
    <section id="precos" className="bg-gradient-to-b from-slate-50 to-white py-20 md:py-28">
      <Container className="space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl space-y-4 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-[#6753FF]/10 px-4 py-1.5 text-sm font-medium text-[#6753FF]">
            <Sparkles className="h-4 w-4" />
            Preços transparentes
          </span>
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
            Escolha o plano que melhor se adapta às suas necessidades.
          </h2>
          <p className="text-lg text-slate-600">
            Comece gratuitamente e gere materiais pedagógicos em segundos com ajuda da IA.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-[#6753FF]" />
          </div>
        ) : (
          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan, index) => (
              <PlanCard
                key={plan.planCode}
                plan={plan}
                index={index}
                isPopular={plan.planCode === "pro_monthly"}
              />
            ))}
            <EnterprisePlanCard index={plans.length} />
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 pt-8 text-sm text-slate-500"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-green-500" />
            <span>Pagamento seguro via Stripe</span>
          </div>
          <div className="flex items-center gap-2">
            <BadgeCheck className="h-5 w-5 text-blue-500" />
            <span>Cancele a qualquer momento</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            <span>Ativação instantânea</span>
          </div>
        </motion.div>

        <p className="text-center text-xs text-slate-400">
          * Geração ilimitada sujeita à{" "}
          <a href="/terms#precos" className="underline hover:text-slate-600">
            Política de Uso Justo
          </a>
          .
        </p>
      </Container>
    </section>
  );
}
