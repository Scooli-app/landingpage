"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BookOpen, Clock, Users } from "lucide-react";

const pillars = [
  {
    icon: BookOpen,
    title: "Não é IA genérica. É IA que conhece as AE.",
    description:
      "A Scooli gera materiais alinhados com as Aprendizagens Essenciais do currículo português — sem necessidade de configurar nada.",
    proof: "Alinhamento automático com o programa nacional",
  },
  {
    icon: Clock,
    title: "Horas poupadas por semana, não por ano.",
    description:
      "Planificações, fichas e testes que demorariam horas ficam prontos em minutos. A base chega pronta para editar e ajustar o que fizer sentido.",
    proof: "Do pedido ao material completo em menos de 60 segundos",
  },
  {
    icon: Users,
    title: "Adapta para cada aluno, sem refazer tudo.",
    description:
      "Diferentes ritmos, dificuldades ou necessidades educativas especiais? Peça uma versão adaptada e parta de um material já organizado.",
    proof: "Suporte a NEEs, diferentes níveis e ritmos de aprendizagem",
  },
];

const impactStats = [
  { value: "60 s", label: "tempo médio por recurso" },
  { value: "AE", label: "currículo nacional integrado" },
  { value: "NEEs", label: "adaptação para necessidades especiais" },
];

export function CorePillarsSection() {
  const ref = useScrollReveal({ stagger: 0.12, y: 24 });

  return (
    <section
      id="pilares"
      ref={ref}
      className="mx-auto w-full max-w-6xl px-6 py-20 md:max-w-7xl md:px-12 sm:py-24"
    >
      <div className="grid gap-6 sm:grid-cols-3">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div
              key={pillar.title}
              data-reveal
              className="flex flex-col rounded-[28px] border border-slate-200/80 bg-white p-7 shadow-[0_24px_70px_-50px_rgba(19,35,58,0.22)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="mt-6 font-display text-xl font-semibold leading-snug text-[color:var(--scooli-ink)] sm:text-2xl">
                {pillar.title}
              </h2>
              <p className="mt-3 flex-1 text-[15px] leading-7 text-[color:var(--scooli-muted)]">
                {pillar.description}
              </p>
              <p className="mt-5 text-sm font-semibold text-[color:var(--scooli-primary)]">
                {pillar.proof}
              </p>
            </div>
          );
        })}
      </div>

      <div
        data-reveal
        className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 rounded-[24px] border border-slate-200/80 bg-slate-50 px-8 py-5"
      >
        {impactStats.map((stat, i) => (
          <span
            key={stat.label}
            className="flex items-center gap-3 text-sm text-[color:var(--scooli-muted)]"
          >
            {i > 0 && (
              <span className="hidden h-4 w-px bg-slate-300 sm:inline-block" aria-hidden="true" />
            )}
            <strong className="font-display text-lg font-semibold text-[color:var(--scooli-ink)]">
              {stat.value}
            </strong>
            <span>{stat.label}</span>
          </span>
        ))}
      </div>
    </section>
  );
}
