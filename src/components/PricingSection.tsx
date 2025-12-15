"use client";

import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BadgeCheck, Coins, ShieldCheck } from "lucide-react";

const plans = [
  {
    name: "Welcome package",
    price: "100 créditos",
    subtitle: "Oferta única de arranque para novos utilizadores.",
    highlights: [
      "100 créditos para gerar recursos",
      "Acesso às funcionalidades base",
      "Ganha mais créditos ao partilhar recursos",
      "Sem necessidade de cartão",
    ],
    cta: "Começar",
    variant: "outline" as const,
  },
  {
    name: "Scooli Pro",
    price: "€7,99 / mês",
    subtitle: "Geração ilimitada, mais modelos e prioridade.",
    highlights: [
      "Geração ilimitada de recursos",
      "Modelos mais avançados de IA",
      "Suporte prioritário e curadoria",
      "Acesso antecipado a novas features",
    ],
    cta: "Escolher Pro",
    variant: "solid" as const,
  },
];

export function PricingSection() {
  return (
    <section id="precos" className="bg-white py-16 md:py-24">
      <Container className="space-y-10">
        <div className="space-y-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-[color:var(--scooli-muted)]">
            Preços transparentes
          </p>
          <h2 className="text-3xl font-semibold text-[color:var(--scooli-ink)] md:text-4xl">
            Cresça connosco: créditos para começar, Pro para acelerar.
          </h2>
          <p className="mx-auto max-w-2xl text-[color:var(--scooli-muted)]">
            Créditos recompensam quem partilha. Pro desbloqueia velocidade
            ilimitada e modelos avançados sem surpresas na fatura.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
            >
              <Card
                className={`h-full rounded-2xl border-[color:var(--scooli-border)] ${
                  plan.variant === "solid"
                    ? "bg-gradient-to-br from-[color:var(--scooli-primary)]/92 to-[color:var(--scooli-primary-strong)] text-white shadow-lg shadow-[rgba(103,83,255,0.35)]"
                    : "bg-white/95 shadow-sm"
                }`}
              >
                <CardContent className="space-y-6 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        className={`text-sm font-semibold uppercase tracking-wide ${
                          plan.variant === "solid"
                            ? "text-white/80"
                            : "text-[color:var(--scooli-muted)]"
                        }`}
                      >
                        {plan.name}
                      </p>
                      <h3
                        className={`text-2xl font-bold ${
                          plan.variant === "solid"
                            ? "text-white"
                            : "text-[color:var(--scooli-ink)]"
                        }`}
                      >
                        {plan.price}
                      </h3>
                    </div>
                    {plan.variant === "solid" ? (
                      <ShieldCheck className="h-10 w-10 text-white/90" />
                    ) : (
                      <Coins className="h-10 w-10 text-[color:var(--scooli-primary)]" />
                    )}
                  </div>

                  <p
                    className={
                      plan.variant === "solid"
                        ? "text-white/90"
                        : "text-[color:var(--scooli-muted)]"
                    }
                  >
                    {plan.subtitle}
                  </p>

                  <ul className="space-y-3">
                    {plan.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm"
                      >
                        <BadgeCheck
                          className={
                            plan.variant === "solid"
                              ? "mt-0.5 h-4 w-4 text-white"
                              : "mt-0.5 h-4 w-4 text-[color:var(--scooli-primary)]"
                          }
                        />
                        <span
                          className={
                            plan.variant === "solid"
                              ? "text-white/90"
                              : "text-[color:var(--scooli-ink)]"
                          }
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={
                      plan.variant === "solid"
                        ? "h-11 w-full rounded-xl !bg-white !text-[color:var(--scooli-primary)] hover:!bg-white/90"
                        : "h-11 w-full rounded-xl border-[color:var(--scooli-border)] bg-white text-[color:var(--scooli-ink)] hover:bg-[color:var(--scooli-accent)]"
                    }
                    variant={plan.variant === "solid" ? "secondary" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

