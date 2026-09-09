"use client";

import { Container } from "@/components/Container";
import { TrackedLink } from "@/components/TrackedLink";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { APP_URL } from "@/lib/seo";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionBadge } from "./shared";

export function WeeklyHabitSection() {
  const t = useTranslations("home.weeklyHabit");
  const ref = useScrollReveal({ y: 20 });

  return (
    <section id="habito-semanal" className="bg-white py-16 sm:py-20 lg:py-24">
      <Container ref={ref}>
        <div
          data-reveal
          className="mx-auto flex max-w-3xl flex-col items-center space-y-6 text-center"
        >
          <SectionBadge>{t("badge")}</SectionBadge>
          <h2 className="font-display text-3xl leading-tight text-[color:var(--scooli-ink)] sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="text-base leading-8 text-[color:var(--scooli-muted)] sm:text-lg">
            {t("description")}
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
              {t("cta")}
              <ArrowRight className="h-4 w-4" />
            </TrackedLink>
          </Button>
        </div>
      </Container>
    </section>
  );
}
