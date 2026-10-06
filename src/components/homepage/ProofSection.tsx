import { Container } from "@/components/Container";
import { PUBLIC_IMPACT_METRICS } from "@/lib/seo";
import { useTranslations } from "next-intl";

/**
 * Plain numbers straight under the hero. Only figures the team has confirmed:
 * there are no published testimonials or customer logos yet, so neither is here.
 */
export function ProofSection() {
  const t = useTranslations("home.proof");

  const stats = [
    { value: `${PUBLIC_IMPACT_METRICS.activeTeachers.minValue}+`, label: t("teachers") },
    { value: `${PUBLIC_IMPACT_METRICS.generatedDocuments.minValue}+`, label: t("documents") },
  ];

  return (
    <section aria-label={t("ariaLabel")} className="mt-16 py-10 md:mt-20">
      <Container>
        <dl className="mx-auto grid max-w-[560px] grid-cols-2 divide-x divide-line">
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
