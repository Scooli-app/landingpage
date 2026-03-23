import { Container } from "@/components/Container";
import {
  impactStats,
  teacherStats,
  trustCards,
} from "@/components/marketing/data";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { benefits, painPoints } from "./data";
import { InfoCard, SectionHeading } from "./shared";

const beforeItems = [
  "Começar quase sempre do zero",
  "Repetir a mesma estrutura em fichas e testes",
  "Adaptar tudo manualmente para cada turma",
  "Levar trabalho para casa",
];

const afterItems = [
  "Gerar uma planificação, ficha ou teste em minutos",
  "Editar uma base já organizada em vez de recomeçar",
  "Adaptar por nível e para alunos com NEEs sem refazer tudo manualmente",
  "Ter materiais prontos a usar mais depressa",
  "Ter mais tempo livre para si e para a familia",
];

export function ImpactSection() {
  return (
    <section id="impacto" className="py-20 sm:py-24 lg:py-28">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow="Impacto da Scooli"
          title="A Scooli já está a poupar tempo a centenas de professores"
          description="Documentos gerados, materiais adaptados e horas poupadas todas as semanas mostram o impacto da Scooli no trabalho do dia a dia."
          centered
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {impactStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_-56px_rgba(19,35,58,0.28)]"
            >
              <p className="font-display text-5xl leading-none text-[color:var(--scooli-ink)]">
                {stat.value}
              </p>
              <p className="mt-4 text-sm font-medium leading-7 text-[color:var(--scooli-ink-soft)]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function ProblemSection() {
  return (
    <section id="problema" className="py-20 sm:py-24 lg:py-28">
      <Container className="space-y-10">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <SectionHeading
            eyebrow="O problema"
            title="Preparar aulas continua a roubar horas todas as semanas"
            description="Não é só planear. É repetir trabalho, adaptar materiais e procurar recursos quando o foco já devia estar nos alunos e na aula seguinte."
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {teacherStats.map((stat) => (
              <div
                key={stat.value}
                className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_-56px_rgba(19,35,58,0.28)]"
              >
                <p className="font-display text-4xl text-[color:var(--scooli-ink)]">
                  {stat.value}
                </p>
                <p className="mt-3 text-sm leading-7 text-[color:var(--scooli-ink-soft)]">
                  {stat.label}
                </p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {stat.source}
                </p>
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

export function BeforeAfterSection() {
  return (
    <section id="antes-depois" className="bg-white/70 py-20 sm:py-24 lg:py-28">
      <Container className="space-y-12">
        <SectionHeading
          eyebrow="Antes e depois"
          title="O mesmo trabalho, com muito menos fricção"
          description="Sem Scooli, a preparação arrasta-se. Com Scooli, ganha uma base pronta a editar e chega mais depressa a materiais úteis."
          centered
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_-56px_rgba(19,35,58,0.28)] sm:p-8">
            <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Sem Scooli
            </span>
            <div className="mt-6 grid gap-3">
              {beforeItems.map((item) => (
                <div
                  key={item}
                  className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-[#d9ddff] bg-[color:var(--scooli-surface-alt)] p-6 shadow-[0_24px_70px_-56px_rgba(19,35,58,0.28)] sm:p-8">
            <span className="inline-flex rounded-full border border-[#d9ddff] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--scooli-primary)]">
              Com Scooli
            </span>
            <div className="mt-6 grid gap-3">
              {afterItems.map((item) => (
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
      </Container>
    </section>
  );
}

export function SolutionSection() {
  return (
    <section id="solucao" className="py-20 sm:py-24 lg:py-28">
      <Container className="space-y-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="A solução Scooli"
              title="Uma base pronta em minutos para não perder tempo no mesmo trabalho"
              description="Dá o tema, o ano e o objetivo. A Scooli gera uma base editável, ajuda-te a adaptar o material e deixa tudo pronto para revisão e exportação."
            />
            <div className="rounded-[28px] border border-slate-200 bg-[color:var(--scooli-surface-alt)] p-6">
              <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-500">
                <span className="rounded-full border border-slate-200 bg-white px-4 py-2">
                  Pedido
                </span>
                <ArrowRight className="h-4 w-4 text-slate-300" />
                <span className="rounded-full border border-slate-200 bg-white px-4 py-2">
                  Primeira versão
                </span>
                <ArrowRight className="h-4 w-4 text-slate-300" />
                <span className="rounded-full border border-slate-200 bg-white px-4 py-2">
                  Edição
                </span>
                <ArrowRight className="h-4 w-4 text-slate-300" />
                <span className="rounded-full border border-slate-200 bg-white px-4 py-2">
                  Exportar
                </span>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                A IA sugere. O professor decide o que fica, o que muda e quando
                o material está pronto a usar em aula.
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-500">
                A IA pode falhar. Por isso, tudo deve ser revisto antes de ser
                usado com alunos.
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
