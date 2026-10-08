import { cn } from "@/lib/utils";
import {
  Brain,
  Check,
  Link2,
  Network,
  RefreshCw,
  School,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

type Status = "live" | "building" | "next";
type Phase = { name: string; title: string; status: Status; items: string[] };

const phaseIcons: LucideIcon[] = [Link2, Brain, RefreshCw, Sparkles, Network, School];

const statusStyles: Record<Status, { pill: string; node: string; card: string; rail: string }> = {
  live: {
    pill: "bg-tag-green text-tag-green-ink",
    node: "border-violet bg-violet text-white",
    card: "border-line-strong bg-white",
    rail: "bg-violet",
  },
  building: {
    pill: "bg-violet-wash text-violet-ink",
    node: "border-violet bg-white text-violet ring-4 ring-violet/15",
    card: "border-2 border-violet bg-violet-wash/40",
    rail: "bg-[repeating-linear-gradient(90deg,#6753ff_0,#6753ff_6px,transparent_6px,transparent_12px)]",
  },
  next: {
    pill: "bg-stone-soft text-subtle ring-1 ring-line-strong",
    node: "border-line-strong bg-white text-faint",
    card: "border-line bg-white/60",
    rail: "bg-line-strong",
  },
};

/**
 * The roadmap as a journey: six phases on a rail (solid where Scooli already
 * is, dashed where it is being built, grey where it is next), then a card for
 * each phase with what it contains. No dates, on purpose.
 */
export function RoadmapJourney() {
  const t = useTranslations("roadmap");
  const phases = t.raw("phases") as Phase[];
  const legend = t.raw("legend") as Record<Status, string>;
  const today = t.raw("today.items") as string[];

  return (
    <div>
      <ul className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-subtle">
        {(["live", "building", "next"] as const).map((status) => (
          <li key={status} className="flex items-center gap-2">
            <span
              className={cn(
                "size-2.5 rounded-full",
                status === "live" && "bg-violet",
                status === "building" && "border-2 border-violet bg-white",
                status === "next" && "border border-line-strong bg-white",
              )}
            />
            {legend[status]}
          </li>
        ))}
      </ul>

      <ol aria-hidden className="mb-10 hidden grid-cols-6 lg:grid">
        {phases.map((phase, index) => {
          const style = statusStyles[phase.status];
          const Icon = phaseIcons[index % phaseIcons.length];
          const nextPhase = phases[index + 1];

          return (
            <li key={phase.name} className="relative">
              <span
                className={cn(
                  "relative z-10 grid size-12 place-items-center rounded-full border-2",
                  style.node,
                )}
              >
                {phase.status === "live" ? (
                  <Check className="size-5" strokeWidth={2.5} />
                ) : (
                  <Icon className="size-5" strokeWidth={1.75} />
                )}
              </span>
              {nextPhase && (
                <span
                  className={cn(
                    "absolute left-12 right-0 top-[23px] h-0.5",
                    statusStyles[nextPhase.status].rail,
                  )}
                />
              )}
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.06em] text-subtle">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="text-[16px] font-semibold text-ink">{phase.name}</p>
            </li>
          );
        })}
      </ol>

      <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {phases.map((phase, index) => {
          const style = statusStyles[phase.status];
          const Icon = phaseIcons[index % phaseIcons.length];

          return (
            <li
              key={phase.name}
              data-reveal
              style={{ "--reveal-delay": `${(index % 3) * 80}ms` } as React.CSSProperties}
              className={cn("relative flex flex-col rounded-2xl border p-6 md:p-7", style.card)}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="grid size-11 place-items-center rounded-xl bg-white text-ink ring-1 ring-line-strong">
                  <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                </span>
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-semibold uppercase tracking-[0.05em]",
                    style.pill,
                  )}
                >
                  {phase.status === "building" && (
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-violet opacity-60" />
                      <span className="relative inline-flex size-2 rounded-full bg-violet" />
                    </span>
                  )}
                  {legend[phase.status]}
                </span>
              </div>
              <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.06em] text-subtle">
                {t("phaseLabel")} {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-1 font-display text-[28px] font-medium leading-[1.1] tracking-[-0.02em] text-ink">
                {phase.name}
              </h2>
              <p className="mt-2 text-[15px] font-medium leading-snug text-body">{phase.title}</p>
              <ul className="mt-5 flex-1 space-y-2.5 border-t border-line pt-5">
                {phase.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[14.5px] leading-snug text-subtle">
                    <span
                      aria-hidden
                      className={cn(
                        "mt-[7px] size-1.5 shrink-0 rounded-full",
                        phase.status === "next" ? "bg-line-strong" : "bg-violet",
                      )}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ol>

      <div data-reveal className="mt-12 rounded-2xl border border-line-strong bg-stone-soft p-6 md:p-8">
        <p className="text-[17px] font-semibold tracking-[-0.01em] text-ink">{t("today.title")}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {today.map((item) => (
            <li
              key={item}
              className="rounded-full border border-line-strong bg-white px-3.5 py-1.5 text-[14px] text-ink"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
