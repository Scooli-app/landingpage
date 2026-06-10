"use client";

import { Container } from "@/components/Container";
import { TrackedLink } from "@/components/TrackedLink";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { APP_URL } from "@/lib/seo";
import { ArrowRight } from "lucide-react";
import { SectionBadge } from "./shared";

export function WeeklyHabitSection() {
  const ref = useScrollReveal({ y: 20 });

  return (
    <section id="habito-semanal" className="bg-white/70 py-20 sm:py-24 lg:py-28">
      <Container ref={ref}>
        <div
          data-reveal
          className="mx-auto flex max-w-3xl flex-col items-center space-y-6 text-center"
        >
          <SectionBadge>Semana após semana</SectionBadge>
          <h2 className="font-display text-3xl leading-tight text-[color:var(--scooli-ink)] sm:text-4xl lg:text-5xl">
            Feita para todas as semanas — não para experimentar uma vez.
          </h2>
          <p className="text-base leading-8 text-[color:var(--scooli-muted)] sm:text-lg">
            Cada material que cria fica guardado na sua biblioteca pessoal. Na
            semana seguinte, não recomeça: duplica a ficha do 5.º A e adapta-a
            para o 5.º B em minutos. Quanto mais semanas usa, mais a biblioteca
            trabalha por si — é assim que os professores ativos chegam às 7+
            horas poupadas por semana.
          </p>
          <Button
            asChild
            className="h-12 rounded-full px-6 text-base font-semibold shadow-[0_20px_32px_-18px_rgba(103,83,255,0.45)]"
          >
            <TrackedLink
              href={`${APP_URL}/sign-up`}
              eventName="marketing_cta_clicked"
              eventProperties={{
                cta_id: "home_weekly_habit_create_library",
                placement: "home_weekly_habit",
              }}
            >
              Criar a minha biblioteca
              <ArrowRight className="h-4 w-4" />
            </TrackedLink>
          </Button>
        </div>
      </Container>
    </section>
  );
}
