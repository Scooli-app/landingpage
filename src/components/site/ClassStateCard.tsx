import { cn } from "@/lib/utils";
import { CalendarCheck, Check, Circle, Clock, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

type TopicStatus = "done" | "progress" | "late";

const statusStyles: Record<TopicStatus, { pill: string; icon: typeof Check }> = {
  done: { pill: "bg-tag-green text-tag-green-ink", icon: Check },
  progress: { pill: "bg-violet-wash text-violet-ink", icon: Clock },
  late: { pill: "bg-tag-red text-tag-red-ink", icon: Circle },
};

/**
 * One class's state: how much of the curriculum is covered, the topics and
 * where each one stands, and what Scooli recommends doing next. A drawn
 * example, not a screenshot: it explains the idea the whole product is built
 * around, and the caption says so.
 */
export function ClassStateCard({
  className,
  ...rest
}: { className?: string } & React.HTMLAttributes<HTMLElement>) {
  const t = useTranslations("classState.card");
  const topics = t.raw("topics") as { name: string; status: TopicStatus }[];
  const labels = t.raw("statusLabels") as Record<TopicStatus, string>;
  const recommendations = t.raw("recommendations") as string[];
  const completion = Number(t.raw("completionValue"));

  return (
    <figure {...rest} className={cn("relative", className)}>
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[32px] bg-[radial-gradient(60%_60%_at_70%_30%,rgba(103,83,255,0.14),transparent)]"
      />
      <div className="overflow-hidden rounded-2xl border border-line-strong bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03),0_36px_80px_-44px_rgba(17,17,17,0.3)]">
        <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-subtle">{t("label")}</p>
            <p className="mt-1 text-[17px] font-semibold tracking-[-0.01em] text-ink">{t("className")}</p>
          </div>
          <div className="text-right">
            <p className="font-display text-[34px] font-medium leading-none tracking-[-0.02em] text-ink">
              {completion}%
            </p>
            <p className="mt-1 text-[12px] text-subtle">{t("completionLabel")}</p>
          </div>
        </div>

        <div className="px-6 pt-5">
          <div
            role="img"
            aria-label={`${t("completionLabel")}: ${completion}%`}
            className="h-2 overflow-hidden rounded-full bg-stone-soft"
          >
            <div className="h-full rounded-full bg-violet" style={{ width: `${completion}%` }} />
          </div>
        </div>

        <ul className="mt-4 divide-y divide-line px-6">
          {topics.map((topic) => {
            const style = statusStyles[topic.status];
            const Icon = style.icon;

            return (
              <li key={topic.name} className="flex items-center justify-between gap-4 py-3">
                <span className="text-[15px] text-ink">{topic.name}</span>
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-medium",
                    style.pill,
                  )}
                >
                  <Icon aria-hidden className="size-3" strokeWidth={2.5} />
                  {labels[topic.status]}
                </span>
              </li>
            );
          })}
        </ul>

        <p className="mt-1 flex items-center gap-2 border-t border-line px-6 py-3 text-[13px] text-subtle">
          <CalendarCheck aria-hidden className="size-4" strokeWidth={1.75} />
          {t("calendarNote")}
        </p>

        <div className="border-t border-violet-line bg-violet-wash/70 px-6 py-5">
          <p className="flex items-center gap-2 text-[13px] font-semibold text-violet-ink">
            <Sparkles aria-hidden className="size-4" strokeWidth={1.75} />
            {t("recommendationTitle")}
          </p>
          <ul className="mt-3 space-y-1.5">
            {recommendations.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[14.5px] text-ink">
                <Check aria-hidden className="mt-[3px] size-3.5 shrink-0 text-violet" strokeWidth={2.5} />
                {item}
              </li>
            ))}
          </ul>
          <span className="mt-4 inline-flex h-9 items-center rounded-md bg-violet px-4 text-[13.5px] font-medium text-white">
            {t("action")}
          </span>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-[12px] text-faint">{t("caption")}</figcaption>
    </figure>
  );
}
