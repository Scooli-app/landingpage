import { Button } from "@/components/ui/button";
import { APP_URL, PRICING } from "@/lib/seo";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { BrowserFrame, SectionBadge } from "./shared";

const heroHighlights = [
  `${PRICING.free.generationsPerMonth} gerações por mês para experimentar`,
  "Planificações, fichas e testes prontos a editar",
  "Professor no controlo do resultado final",
  "Biblioteca partilhada por professores",
];

const heroTags = ["Dashboard", "Criar teste", "Exportar"];
const heroVideoSrc = "/videos/test-creation.mp4";

function HeroPreview() {
  return (
    <div className="relative">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 shadow-[0_16px_32px_-28px_rgba(19,35,58,0.35)]">
          Crie recursos em 20 segundos
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

      <BrowserFrame
        title="Scooli em ação"
        subtitle="Da dashboard ao teste"
        className="relative z-10"
      >
        <div className="rounded-[28px] bg-[color:var(--scooli-surface-alt)] p-3 sm:p-4">
          <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-950 shadow-[0_24px_60px_-40px_rgba(19,35,58,0.55)]">
            <video
              className="aspect-[16/10] w-full object-cover md:aspect-[16/9]"
              autoPlay
              muted
              loop
              playsInline
              controls
              preload="metadata"
            >
              <source src={heroVideoSrc} type="video/mp4" />O seu navegador não
              suporta vídeo HTML5.
            </video>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              "Entrar na dashboard e escolher o que criar",
              "Gerar um teste completo com IA",
              "Rever, finalizar e exportar",
            ].map((step, index) => (
              <div
                key={step}
                className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 text-sm text-slate-700"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Passo {index + 1}
                </p>
                <p className="mt-2 font-medium leading-6">{step}</p>
              </div>
            ))}
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
                Crie planificações, fichas e testes em minutos, sem perder horas
                a preparar.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[color:var(--scooli-muted)] sm:text-xl">
                Para professores que querem menos trabalho administrativo e mais
                tempo para ensinar.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                className="h-12 rounded-full px-6 text-base font-semibold shadow-[0_20px_32px_-18px_rgba(103,83,255,0.45)]"
              >
                <Link href={`${APP_URL}/sign-up`}>
                  Começar gratuitamente
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 rounded-full px-6 text-base font-semibold"
              >
                <Link href="#como-funciona">Ver como funciona</Link>
              </Button>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-[color:var(--scooli-ink)]">
                Comece gratuitamente. Sem compromisso.
              </p>
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
