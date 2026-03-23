import { Button } from "@/components/ui/button";
import { APP_URL, PRICING } from "@/lib/seo";
import { ArrowRight, CheckCircle2, WandSparkles } from "lucide-react";
import Link from "next/link";
import { BrowserFrame, SectionBadge } from "./shared";

const heroHighlights = [
  `${PRICING.free.generationsPerMonth} gerações por mês para experimentar`,
  "Professor no controlo do resultado final",
  "Pensado para o contexto escolar em Portugal",
  "Biblioteca partilhada por professores",
];

function HeroPreview() {
  return (
    <BrowserFrame title="Scooli - criar recurso" subtitle="Rascunho em segundos" className="relative z-10">
      <div className="grid gap-4 xl:grid-cols-[0.82fr_1.18fr]">
        <div className="rounded-[26px] bg-[color:var(--scooli-surface-alt)] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Pedido</p>
          <div className="mt-4 grid gap-3 text-sm text-slate-700">
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Disciplina</span>
              <p className="mt-1 font-medium">História</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Ano</span>
              <p className="mt-1 font-medium">8.º ano</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Pedido</span>
              <p className="mt-1 font-medium leading-7 text-slate-700">
                Criar um teste diagnóstico sobre liberalismo com perguntas de escolha múltipla e uma resposta curta.
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
              <p className="text-sm font-semibold text-slate-800">Teste diagnóstico · História · 8.º ano</p>
              <p className="text-xs text-slate-500">Tema: Liberalismo e revoluções do século XIX</p>
            </div>
            <span className="rounded-full bg-[color:var(--scooli-accent)] px-3 py-1 text-xs font-semibold text-[color:var(--scooli-primary)]">Pronto a editar</span>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="rounded-[24px] bg-[color:var(--scooli-surface-alt)] p-4">
              <div className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">Pré-visualização</p>
                <div className="mt-4 space-y-3 text-sm text-slate-700">
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <p className="font-medium">1. Assinala a consequência da Revolução Liberal.</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 p-3">
                    <div className="flex items-center gap-2">
                      <span className="h-3.5 w-3.5 rounded-full border border-slate-300" />
                      <span>Separação de poderes</span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="h-3.5 w-3.5 rounded-full border border-slate-300" />
                      <span>Poder absoluto do rei</span>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-dashed border-slate-200 p-3 text-slate-500">
                    2. Explica, em duas linhas, o que mudou com a Constituição.
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Ajustes rápidos</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
                  {["Mais simples", "Versão curta", "Critérios"].map((tag) => (
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
                <p className="text-sm font-semibold text-[color:var(--scooli-ink)]">Sem começar do zero</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  O documento fica pronto para rever, ajustar e reutilizar na próxima aula.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

export function HeroSection() {
  return (
    <section id="hero" className="relative isolate pt-6 sm:pt-10">
      <div className="absolute inset-x-0 top-0 -z-10 h-[620px] bg-[radial-gradient(circle_at_top_left,rgba(103,83,255,0.18),transparent_42%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_24%)]" />
      <div className="mx-auto w-full max-w-6xl px-6 pb-20 pt-8 md:max-w-7xl md:px-12 sm:pb-24 lg:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-[0.94fr_1.06fr] lg:gap-16">
          <div className="space-y-7">
            <SectionBadge>Menos horas fora da sala de aula</SectionBadge>
            <div className="space-y-5">
              <h1 className="font-display text-4xl leading-tight text-[color:var(--scooli-ink)] sm:text-5xl lg:text-6xl">
                Crie planificações, fichas e testes em minutos com IA.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[color:var(--scooli-muted)] sm:text-xl">
                A Scooli ajuda professores em Portugal a gerar materiais, adaptar à turma e exportar documentos prontos a usar sem começar do zero.
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
                <Link href="/escolas">Para escolas</Link>
              </Button>
            </div>

            <Link
              href="#como-funciona"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--scooli-primary)]"
            >
              Ver como funciona
              <ArrowRight className="h-4 w-4" />
            </Link>

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

