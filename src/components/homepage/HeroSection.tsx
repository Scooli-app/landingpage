import { Button } from "@/components/ui/button";
import { APP_URL, PRICING } from "@/lib/seo";
import { ArrowRight, CheckCircle2, WandSparkles } from "lucide-react";
import Link from "next/link";
import { BrowserFrame, SectionBadge } from "./shared";

const heroHighlights = [
  `${PRICING.free.generationsPerMonth} gerações por mês para experimentar`,
  "Planificações, fichas e testes prontos a editar",
  "Professor no controlo do resultado final",
  "Biblioteca partilhada por professores",
];

const heroTags = ["Planificação completa", "Pronta a usar", "Gerada em segundos"];

function HeroPreview() {
  return (
    <div className="relative">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 shadow-[0_16px_32px_-28px_rgba(19,35,58,0.35)]">
          Exemplo de planificação gerada automaticamente
        </span>
        {heroTags.map((tag) => (
          <span
            key={tag}
            className="inline-flex rounded-full bg-[color:var(--scooli-accent)] px-3 py-1.5 text-xs font-semibold text-[color:var(--scooli-primary)]"
          >
            {tag}
          </span>
        ))}
      </div>

      <BrowserFrame title="Scooli - criar recurso" subtitle="Primeira versão em segundos" className="relative z-10">
        <div className="grid gap-4 xl:grid-cols-[0.82fr_1.18fr]">
          <div className="rounded-[26px] bg-[color:var(--scooli-surface-alt)] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Pedido</p>
            <div className="mt-4 grid gap-3 text-sm text-slate-700">
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Disciplina</span>
                <p className="mt-1 font-medium">Ciências Naturais</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Ano</span>
                <p className="mt-1 font-medium">6.º ano</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Pedido</span>
                <p className="mt-1 font-medium leading-7 text-slate-700">
                  Criar uma planificação sobre o sistema digestivo com objetivos, atividades e avaliação final.
                </p>
              </div>
              <div className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[color:var(--scooli-primary)] px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_28px_-16px_rgba(103,83,255,0.48)]">
                <WandSparkles className="h-4 w-4" />
                Gerar material
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-[26px] border border-slate-200 bg-white p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-800">Planificação semanal · Ciências Naturais · 6.º ano</p>
                <p className="text-xs text-slate-500">Tema: Sistema digestivo</p>
              </div>
              <span className="rounded-full bg-[color:var(--scooli-accent)] px-3 py-1 text-xs font-semibold text-[color:var(--scooli-primary)]">
                Pronta a editar
              </span>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
              <div className="rounded-[24px] bg-[color:var(--scooli-surface-alt)] p-3">
                <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">Pré-visualização</p>
                  <div className="mt-4 space-y-3 text-sm text-slate-700">
                    <div className="rounded-2xl bg-slate-50 p-3">
                      <p className="font-medium">Objetivo</p>
                      <p className="mt-1 text-slate-600">Identificar os principais órgãos do sistema digestivo e explicar a sua função.</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 p-3">
                      <p className="font-medium">Sequência da aula</p>
                      <ul className="mt-2 space-y-2 text-slate-600">
                        <li>1. Ativação de conhecimentos prévios</li>
                        <li>2. Exploração guiada com imagem</li>
                        <li>3. Síntese final e verificação</li>
                      </ul>
                    </div>
                    <div className="rounded-2xl border border-dashed border-slate-200 p-3 text-slate-500">
                      Avaliação rápida pronta para incluir no final da aula.
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Ajustes rápidos</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
                    {["Mais simples", "Versão curta", "Avaliação"].map((tag) => (
                      <span key={tag} className="rounded-full border border-slate-200 bg-white px-3 py-1.5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Exportar</p>
                  <div className="mt-3 flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-sm text-slate-700">
                    <span>Documento validado</span>
                    <ArrowRight className="h-4 w-4 text-[color:var(--scooli-primary)]" />
                  </div>
                </div>
                <div className="rounded-[24px] border border-[color:var(--scooli-accent)] bg-[color:var(--scooli-accent)]/60 p-4">
                  <p className="text-sm font-semibold text-[color:var(--scooli-ink)]">Sem perder horas a preparar</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    A planificação fica pronta a rever, ajustar e usar mais depressa na próxima aula.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BrowserFrame>
    </div>
  );
}

export function HeroSection() {
  return (
    <section id="hero" className="relative isolate pt-6 sm:pt-10">
      <div className="absolute inset-x-0 top-0 -z-10 h-[620px] bg-[radial-gradient(circle_at_top_left,rgba(103,83,255,0.18),transparent_42%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_24%)]" />
      <div className="mx-auto w-full max-w-6xl px-6 pb-20 pt-8 md:max-w-7xl md:px-12 sm:pb-24 lg:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-[0.94fr_1.06fr] lg:gap-16">
          <div className="space-y-7">
            <SectionBadge>Poupe horas todas as semanas</SectionBadge>
            <div className="space-y-5">
              <h1 className="font-display text-4xl leading-tight text-[color:var(--scooli-ink)] sm:text-5xl lg:text-6xl">
                Crie planificações, fichas e testes em minutos, sem perder horas a preparar.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[color:var(--scooli-muted)] sm:text-xl">
                Para professores que querem menos trabalho administrativo e mais tempo para ensinar.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild className="h-12 rounded-full px-6 text-base font-semibold shadow-[0_20px_32px_-18px_rgba(103,83,255,0.45)]">
                <Link href={`${APP_URL}/sign-up`}>
                  Começar gratuitamente
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-full px-6 text-base font-semibold">
                <Link href="#como-funciona">Ver como funciona</Link>
              </Button>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-[color:var(--scooli-ink)]">Comece gratuitamente. Sem compromisso.</p>
              <Link
                href="/escolas"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--scooli-primary)]"
              >
                É uma escola ou agrupamento? Ver percurso institucional
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="flex flex-wrap gap-3">
              {heroHighlights.map((highlight) => (
                <span
                  key={highlight}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm font-medium text-slate-600 shadow-[0_12px_28px_-24px_rgba(19,35,58,0.35)]"
                >
                  <CheckCircle2 className="h-4 w-4 text-[color:var(--scooli-primary)]" />
                  {highlight}
                </span>
              ))}
            </div>
          </div>

          <HeroPreview />
        </div>
      </div>
    </section>
  );
}
