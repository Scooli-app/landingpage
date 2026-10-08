import { Container } from "@/components/Container";
import { PUBLIC_IMPACT_METRICS } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

/**
 * The confirmed numbers (teachers, documents, hours saved a week, adapted
 * materials), shared between the homepage and any page selling to a
 * decision-maker who wants proof before a pitch — currently also /escolas,
 * where a school leader otherwise sees zero numeric trust signal before the
 * benefits list. Same figures everywhere: no page invents its own stat.
 */
export function ImpactStats({ className, bordered = true }: { className?: string; bordered?: boolean }) {
  const t = useTranslations("home.proof");

  const stats = [
    { value: `${PUBLIC_IMPACT_METRICS.activeTeachers.minValue}+`, label: t("teachers") },
    { value: `${PUBLIC_IMPACT_METRICS.generatedDocuments.minValue}+`, label: t("documents") },
    { value: `${PUBLIC_IMPACT_METRICS.hoursSavedPerWeek.minValue}h+`, label: t("hoursSaved") },
    { value: `${PUBLIC_IMPACT_METRICS.adaptedMaterials.minValue}+`, label: t("adapted") },
  ];

  return (
    <section aria-label={t("ariaLabel")} className={cn("py-10", className)}>
      <Container>
        <dl
          className={cn(
            "mx-auto grid max-w-[920px] grid-cols-2 gap-y-8 md:grid-cols-4 md:divide-x md:divide-line",
            bordered && "rounded-xl border border-line-strong bg-white py-8",
          )}
        >
          {stats.map((stat) => (
            <div key={stat.label} data-reveal className="flex flex-col-reverse items-center px-2 text-center">
              <dt className="mt-2 text-sm text-subtle">{stat.label}</dt>
              <dd className="font-display text-[clamp(32px,4vw,40px)] font-medium leading-none tracking-[-0.02em] text-ink">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
