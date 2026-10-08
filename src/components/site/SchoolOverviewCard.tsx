import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

type State = "ok" | "watch" | "late";
type Row = { className: string; teacher: string; progress: number; state: State };

const stateStyles: Record<State, { pill: string; bar: string }> = {
  ok: { pill: "bg-tag-green text-tag-green-ink", bar: "bg-violet" },
  watch: { pill: "bg-tag-yellow text-tag-yellow-ink", bar: "bg-[#d9a21b]" },
  late: { pill: "bg-tag-red text-tag-red-ink", bar: "bg-[#d4574f]" },
};

/**
 * The school-wide view of the same idea as `ClassStateCard`: every class with
 * how much of its curriculum is covered and whether it is on track. A drawn
 * example (fictional classes and teachers), captioned as such.
 */
export function SchoolOverviewCard({
  className,
  ...rest
}: { className?: string } & React.HTMLAttributes<HTMLElement>) {
  const t = useTranslations("classState.school");
  const rows = t.raw("rows") as Row[];
  const columns = t.raw("columns") as Record<"class" | "teacher" | "progress" | "state", string>;
  const stateLabels = t.raw("stateLabels") as Record<State, string>;
  const summaryLabels = t.raw("summaryLabels") as Record<State, string>;
  const counts = (["ok", "watch", "late"] as const).map((state) => ({
    state,
    value: rows.filter((row) => row.state === state).length,
  }));

  return (
    <figure {...rest} className={cn("relative", className)}>
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[32px] bg-[radial-gradient(60%_60%_at_30%_30%,rgba(103,83,255,0.12),transparent)]"
      />
      <div className="overflow-hidden rounded-2xl border border-line-strong bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03),0_36px_80px_-44px_rgba(17,17,17,0.3)]">
        <div className="grid grid-cols-3 divide-x divide-line border-b border-line">
          {counts.map((item) => (
            <div key={item.state} className="px-5 py-4">
              <p className="font-display text-[32px] font-medium leading-none tracking-[-0.02em] text-ink">
                {item.value}
              </p>
              <p className="mt-1.5 text-[12.5px] text-subtle">{summaryLabels[item.state]}</p>
            </div>
          ))}
        </div>

        <table className="w-full text-left">
          <caption className="sr-only">{t("tableLabel")}</caption>
          <thead>
            <tr className="border-b border-line text-[11.5px] uppercase tracking-[0.05em] text-subtle">
              <th scope="col" className="px-5 py-3 font-medium">{columns.class}</th>
              <th scope="col" className="hidden px-3 py-3 font-medium sm:table-cell">{columns.teacher}</th>
              <th scope="col" className="px-3 py-3 font-medium">{columns.progress}</th>
              <th scope="col" className="px-5 py-3 text-right font-medium">{columns.state}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const style = stateStyles[row.state];

              return (
                <tr key={row.className} className="border-b border-line last:border-b-0">
                  <th scope="row" className="px-5 py-3.5 text-[14px] font-semibold text-ink">{row.className}</th>
                  <td className="hidden px-3 py-3.5 text-[14px] text-subtle sm:table-cell">{row.teacher}</td>
                  <td className="px-3 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-stone-soft sm:w-28">
                        <div className={cn("h-full rounded-full", style.bar)} style={{ width: `${row.progress}%` }} />
                      </div>
                      <span className="text-[13px] tabular-nums text-ink">{row.progress}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <span className={cn("inline-flex rounded-full px-2.5 py-1 text-[12px] font-medium", style.pill)}>
                      {stateLabels[row.state]}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-3 text-center text-[12px] text-faint">{t("caption")}</figcaption>
    </figure>
  );
}
