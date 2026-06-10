"use client";

import { Container } from "@/components/Container";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { CheckCircle2, XCircle } from "lucide-react";
import { beforeAfter, painPoints } from "./data";
import { InfoCard, SectionHeading } from "./shared";

export function ProblemSolutionSection() {
  const ref = useScrollReveal({ stagger: 0.1, y: 24 });

  return (
    <section id="problema" className="bg-white/70 py-20 sm:py-24 lg:py-28">
      <Container ref={ref} className="space-y-12">
        <SectionHeading
          eyebrow="O problema"
          title="Preparar aulas continua a roubar horas — e a IA genérica devolve trabalho extra"
          description="A maioria dos professores já experimentou o ChatGPT. O problema não é usar IA — é usar uma IA que não conhece o programa português."
          centered
        />

        <div className="grid gap-4 md:grid-cols-3">
          {painPoints.map((item) => (
            <InfoCard key={item.title} item={item} />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div
            data-reveal
            className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_-56px_rgba(19,35,58,0.28)] sm:p-8"
          >
            <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Hoje
            </span>
            <div className="mt-6 grid gap-3">
              {beforeAfter.before.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                >
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            data-reveal
            className="rounded-[32px] border border-[#d9ddff] bg-[color:var(--scooli-surface-alt)] p-6 shadow-[0_24px_70px_-56px_rgba(19,35,58,0.28)] sm:p-8"
          >
            <span className="inline-flex rounded-full border border-[#d9ddff] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--scooli-primary)]">
              Com a Scooli
            </span>
            <div className="mt-6 grid gap-3">
              {beforeAfter.after.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-[22px] border border-white/80 bg-white px-4 py-3 text-sm text-slate-700"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--scooli-primary)]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p
          data-reveal
          className="mx-auto max-w-2xl text-center text-sm leading-7 text-[color:var(--scooli-muted)]"
        >
          A IA pode falhar. Por isso, tudo o que a Scooli gera é editável e
          passa sempre pela sua revisão antes de chegar à aula.
        </p>
      </Container>
    </section>
  );
}
