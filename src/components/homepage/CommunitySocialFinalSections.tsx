"use client";

import { Container } from "@/components/Container";
import { TrackedLink } from "@/components/TrackedLink";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { APP_URL, PRICING } from "@/lib/seo";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Layers3,
  PencilLine,
} from "lucide-react";
import { socialProof } from "./data";
import {
  QuoteCard,
  SectionBadge,
  SectionHeading,
} from "./shared";

export function SocialProofSection() {
  const ref = useScrollReveal({ stagger: 0.1, y: 20 });

  return (
    <section id="prova-social" className="py-20 sm:py-24 lg:py-28">
      <Container ref={ref} className="space-y-10">
        <SectionHeading
          eyebrow="Prova social"
          title="Ganhos que fazem diferença semana após semana"
          description="O que dizem professores que usam a Scooli todas as semanas:"
          centered
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {socialProof.map((item) => (
            <QuoteCard key={item.quote} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export function LandingFinalCtaSection() {
  const ref = useScrollReveal({ y: 20 });

  return (
    <section id="cta-final" ref={ref} className="pb-20 sm:pb-24 lg:pb-28">
      <Container>
        <div className="overflow-hidden rounded-[36px] border border-slate-200 bg-[linear-gradient(135deg,rgba(103,83,255,0.10),rgba(255,255,255,0.97)_45%,rgba(59,130,246,0.10))] p-8 shadow-[0_30px_100px_-60px_rgba(19,35,58,0.45)] sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="space-y-6">
              <SectionBadge>Último passo</SectionBadge>
              <div className="space-y-4">
                <h2 className="font-display text-3xl leading-tight text-[color:var(--scooli-ink)] sm:text-4xl lg:text-5xl">
                  Comece hoje e poupe horas todas as semanas.
                </h2>
                <p className="max-w-2xl text-base leading-8 text-[color:var(--scooli-muted)] sm:text-lg">
                  Crie planificações, fichas e testes em minutos, ajuste tudo ao
                  seu ritmo e leve materiais prontos para a próxima aula.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  className="h-12 rounded-full px-6 text-base font-semibold shadow-[0_20px_32px_-18px_rgba(103,83,255,0.45)]"
                >
                  <TrackedLink
                    href={`${APP_URL}/sign-up`}
                    eventName="marketing_cta_clicked"
                    eventProperties={{
                      cta_id: "home_final_cta_start_free",
                      placement: "home_final_cta_primary",
                    }}
                  >
                    Começar gratuitamente
                    <ArrowRight className="h-4 w-4" />
                  </TrackedLink>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-12 rounded-full px-6 text-base font-semibold"
                >
                  <TrackedLink
                    href="/precos"
                    eventName="marketing_cta_clicked"
                    eventProperties={{
                      cta_id: "home_final_cta_pricing",
                      placement: "home_final_cta_secondary",
                    }}
                  >
                    Ver preços
                  </TrackedLink>
                </Button>
              </div>
              <TrackedLink
                href="/escolas"
                eventName="marketing_cta_clicked"
                eventProperties={{
                  cta_id: "home_final_cta_schools",
                  placement: "home_final_cta_institutional",
                }}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--scooli-primary)]"
              >
                É uma escola ou instituição? Ver percurso institucional
                <ChevronRight className="h-4 w-4" />
              </TrackedLink>
              <ul className="grid gap-3 text-sm leading-7 text-[color:var(--scooli-muted)]">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[color:var(--scooli-primary)]" />
                  <span>
                    {PRICING.free.generationsPerMonth} gerações por mês para
                    explorar a ferramenta sem compromisso inicial.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[color:var(--scooli-primary)]" />
                  <span>
                    Todo o conteúdo continua editável antes de exportar ou
                    reutilizar.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[color:var(--scooli-primary)]" />
                  <span>
                    Combine geração com IA e materiais da biblioteca comunitária.
                  </span>
                </li>
              </ul>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_20px_50px_-44px_rgba(19,35,58,0.36)] sm:col-span-2">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      O que sai no fim
                    </p>
                    <p className="text-xs text-slate-500">
                      Materiais prontos a rever e a usar
                    </p>
                  </div>
                  <Layers3 className="h-5 w-5 text-[color:var(--scooli-primary)]" />
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {["Planificação", "Ficha", "Teste"].map((label) => (
                    <div
                      key={label}
                      className="rounded-[22px] bg-[color:var(--scooli-surface-alt)] p-4"
                    >
                      <p className="text-sm font-semibold text-slate-800">
                        {label}
                      </p>
                      <div className="mt-3 h-2.5 w-4/5 rounded-full bg-slate-200" />
                      <div className="mt-2 h-2.5 w-3/5 rounded-full bg-slate-200" />
                      <div className="mt-3 h-16 rounded-2xl bg-white" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_20px_50px_-44px_rgba(19,35,58,0.36)]">
                <p className="text-sm font-semibold text-slate-800">
                  Pronto a editar
                </p>
                <div className="mt-4 flex items-center gap-3 rounded-2xl bg-[color:var(--scooli-accent)] px-4 py-3 text-sm text-[color:var(--scooli-primary-strong)]">
                  <CheckCircle2 className="h-4 w-4" />
                  Documento gerado
                </div>
                <div className="mt-3 flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  <PencilLine className="h-4 w-4 text-[color:var(--scooli-primary)]" />
                  Ajuste ao seu gosto
                </div>
              </div>
              <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_20px_50px_-44px_rgba(19,35,58,0.36)]">
                <p className="text-sm font-semibold text-slate-800">
                  Próximo passo
                </p>
                <TrackedLink
                  href={`${APP_URL}/sign-up`}
                  eventName="marketing_cta_clicked"
                  eventProperties={{
                    cta_id: "home_final_card_enter_platform",
                    placement: "home_final_cta_card",
                  }}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-[color:var(--scooli-accent)] px-4 py-2 text-sm font-semibold text-[color:var(--scooli-primary)]"
                >
                  Entrar na plataforma
                  <ChevronRight className="h-4 w-4" />
                </TrackedLink>
                <p className="mt-4 text-sm leading-7 text-slate-500">
                  Mantenha o controlo do conteúdo e ganhe velocidade no trabalho
                  que mais se repete.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
