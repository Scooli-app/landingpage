import { Container } from "@/components/Container";
import { teacherStats, trustCards } from "@/components/marketing/data";
import { ArrowRight } from "lucide-react";
import { benefits, painPoints } from "./data";
import { InfoCard, SectionHeading } from "./shared";

export function ProblemSection() {
  return (
    <section id="problema" className="py-20 sm:py-24 lg:py-28">
      <Container className="space-y-10">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <SectionHeading
            eyebrow="O problema"
            title="Horas de preparação que não cabem no horário"
            description="Entre planear, repetir estruturas, adaptar materiais e procurar recursos, sobra pouco tempo para o que realmente importa: ensinar com calma."
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {teacherStats.map((stat) => (
              <div
                key={stat.value}
                className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_-56px_rgba(19,35,58,0.28)]"
              >
                <p className="font-display text-4xl text-[color:var(--scooli-ink)]">{stat.value}</p>
                <p className="mt-3 text-sm leading-7 text-[color:var(--scooli-ink-soft)]">{stat.label}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{stat.source}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {painPoints.map((item) => (
            <InfoCard key={item.title} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export function SolutionSection() {
  return (
    <section id="solucao" className="bg-white/70 py-20 sm:py-24 lg:py-28">
      <Container className="space-y-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="A solução Scooli"
              title="A Scooli prepara a base para poderes focar-te na aula"
              description="Dás o tema, o ano e o objetivo. A Scooli gera uma base editável, ajuda-te a adaptar o material e deixa tudo pronto para revisão e exportação."
            />
            <div className="rounded-[28px] border border-slate-200 bg-[color:var(--scooli-surface-alt)] p-6">
              <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-500">
                <span className="rounded-full border border-slate-200 bg-white px-4 py-2">Pedido</span>
                <ArrowRight className="h-4 w-4 text-slate-300" />
                <span className="rounded-full border border-slate-200 bg-white px-4 py-2">Rascunho</span>
                <ArrowRight className="h-4 w-4 text-slate-300" />
                <span className="rounded-full border border-slate-200 bg-white px-4 py-2">Edição</span>
                <ArrowRight className="h-4 w-4 text-slate-300" />
                <span className="rounded-full border border-slate-200 bg-white px-4 py-2">Exportar</span>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                A IA sugere. O professor decide o que fica, o que muda e quando o material está pronto a usar em aula.
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-500">
                A IA pode falhar. Por isso, tudo deve ser revisto antes de ser usado com alunos.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((item) => (
              <InfoCard key={item.title} item={item} />
            ))}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {trustCards.map((item) => (
            <InfoCard key={item.title} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
