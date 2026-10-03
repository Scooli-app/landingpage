"use client";

import { Container } from "@/components/Container";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { CheckCircle2, XCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { painPointIcons, withIcons } from "./data";
import { InfoCard, SectionHeading } from "./shared";

export function ProblemSolutionSection() {
  const t = useTranslations("home.problem");
  const ref = useScrollReveal({ stagger: 0.1, y: 24 });

  const painPoints = withIcons(
    t.raw("painPoints") as { title: string; description: string }[],
    painPointIcons,
  );
  const before = t.raw("before") as string[];
  const after = t.raw("after") as string[];

  return (
    <section id="problema" className="py-16 sm:py-20 lg:py-24">
      <Container ref={ref} className="space-y-12">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
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
              {t("todayLabel")}
            </span>
            <div className="mt-6 grid gap-3">
              {before.map((item) => (
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
              {t("withScooliLabel")}
            </span>
            <div className="mt-6 grid gap-3">
              {after.map((item) => (
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
          {t("disclaimer")}
        </p>
      </Container>
    </section>
  );
}
