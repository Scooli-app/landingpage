import { ClassStateCard } from "@/components/site/ClassStateCard";
import { Kicker, Section, Tag, displayTitle } from "@/components/site/primitives";
import { TrackedLink } from "@/components/TrackedLink";
import { cn } from "@/lib/utils";
import { BookOpen, CalendarRange, CheckCheck, Gauge, RefreshCw, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

const loopIcons = [BookOpen, CalendarRange, CheckCheck, Gauge, Sparkles];

/**
 * The idea the product is built around: every class has a live state, and the
 * next lesson comes from it. The card shows one class; the loop underneath
 * shows why it keeps getting better week after week.
 */
export function ClassStateSection({ id = "estado-da-turma" }: { id?: string }) {
  const t = useTranslations("classState");
  const points = t.raw("points") as { title: string; text: string }[];
  const loop = t.raw("loop") as { title: string; text: string }[];

  return (
    <Section id={id} aria-labelledby={`${id}-title`}>
      <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-20">
        <div data-reveal>
          <div className="flex flex-wrap items-center gap-3">
            <Kicker>{t("kicker")}</Kicker>
            <Tag tone="violet">{t("badge")}</Tag>
          </div>
          <h2
            id={`${id}-title`}
            className={cn(displayTitle, "mt-3 text-[clamp(34px,4.4vw,56px)] leading-[1.05] tracking-[-0.03em]")}
          >
            {t("title")}
          </h2>
          <p className="mt-5 max-w-[560px] text-[18px] leading-relaxed text-subtle">{t("description")}</p>

          <ul className="mt-9 space-y-6">
            {points.map((point, index) => (
              <li key={point.title} className="flex gap-4">
                <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-violet-wash font-mono text-[12px] font-medium text-violet-ink">
                  {index + 1}
                </span>
                <div>
                  <p className="text-[17px] font-semibold tracking-[-0.01em] text-ink">{point.title}</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-subtle">{point.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <TrackedLink
            href="/escolas"
            eventName="marketing_navigation_clicked"
            eventProperties={{ location: "home_class_state", link_label: "schools" }}
            className="mt-9 inline-block text-[15px] font-medium text-violet-ink hover:underline"
          >
            {t("schoolsLink")} →
          </TrackedLink>
        </div>

        <ClassStateCard data-reveal className="mx-auto w-full max-w-[520px]" />
      </div>

      <div data-reveal className="mt-20 rounded-2xl border border-line-strong bg-stone-soft p-6 md:mt-24 md:p-9">
        <p className="flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.06em] text-subtle">
          <RefreshCw aria-hidden className="size-3.5" strokeWidth={1.75} />
          {t("loopTitle")}
        </p>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
          {loop.map((step, index) => {
            const Icon = loopIcons[index % loopIcons.length];

            return (
              <li key={step.title} className="relative flex items-center gap-4 lg:flex-col lg:items-start lg:gap-0 lg:pr-6">
                <span
                  className={cn(
                    "relative z-10 grid size-11 shrink-0 place-items-center rounded-full border bg-white",
                    index === 3 ? "border-violet text-violet" : "border-line-strong text-ink",
                  )}
                >
                  <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                </span>
                {index < loop.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute left-11 right-0 top-[22px] hidden h-px bg-line-strong lg:block"
                  />
                )}
                <div className="lg:mt-4">
                  <p className="text-[16px] font-semibold text-ink">{step.title}</p>
                  <p className="mt-0.5 text-[14px] text-subtle">{step.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
