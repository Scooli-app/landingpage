import { InstitutionalContactButton } from "@/components/InstitutionalContactButton";
import { Section, SectionHeader } from "@/components/site/primitives";
import { Check, Minus } from "lucide-react";
import { useTranslations } from "next-intl";

type Row = { label: string; pro: string; institutional: string };

/**
 * Why a school should buy the institutional plan rather than a Pro licence per
 * teacher. Every row is something the app does today (school workspace, seats
 * and invitations, per-teacher activity, internal library); nothing promised.
 * A table on wide screens, one card per row on phones.
 */
export function InstitutionalComparison() {
  const t = useTranslations("pricingPage.institutional");
  const rows = t.raw("rows") as Row[];

  return (
    <Section id="porque-institucional" tone="stone" aria-labelledby="pricing-institutional-title">
      <SectionHeader
        id="pricing-institutional-title"
        kicker={t("kicker")}
        title={t("title")}
        description={t("description")}
      />

      <div data-reveal className="hidden overflow-hidden rounded-xl border border-line-strong bg-white md:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-line-strong">
              <th scope="col" className="w-[22%] px-6 py-5">
                <span className="sr-only">{t("columns.label")}</span>
              </th>
              <th scope="col" className="w-[36%] px-6 py-5 text-[15px] font-medium text-subtle">
                {t("columns.pro")}
              </th>
              <th scope="col" className="w-[42%] bg-violet-wash px-6 py-5 text-[15px] font-semibold text-violet-ink">
                {t("columns.institutional")}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-line last:border-b-0">
                <th scope="row" className="px-6 py-4 text-[15px] font-semibold text-ink">
                  {row.label}
                </th>
                <td className="px-6 py-4 text-[15px] text-subtle">
                  <span className="flex items-start gap-2.5">
                    <Minus aria-hidden className="mt-[3px] size-4 shrink-0 text-faint" strokeWidth={1.75} />
                    {row.pro}
                  </span>
                </td>
                <td className="bg-violet-wash/60 px-6 py-4 text-[15px] font-medium text-ink">
                  <span className="flex items-start gap-2.5">
                    <Check aria-hidden className="mt-[3px] size-4 shrink-0 text-violet" strokeWidth={2} />
                    {row.institutional}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="grid gap-3 md:hidden">
        {rows.map((row) => (
          <li key={row.label} data-reveal className="rounded-xl border border-line-strong bg-white p-5">
            <p className="text-[15px] font-semibold text-ink">{row.label}</p>
            <p className="mt-3 flex items-start gap-2.5 text-[15px] font-medium text-ink">
              <Check aria-hidden className="mt-[3px] size-4 shrink-0 text-violet" strokeWidth={2} />
              <span>
                <span className="sr-only">{t("columns.institutional")}: </span>
                {row.institutional}
              </span>
            </p>
            <p className="mt-1.5 flex items-start gap-2.5 text-[14px] text-subtle">
              <Minus aria-hidden className="mt-[3px] size-4 shrink-0 text-faint" strokeWidth={1.75} />
              <span>
                <span className="sr-only">{t("columns.pro")}: </span>
                {row.pro}
              </span>
            </p>
          </li>
        ))}
      </ul>

      <div data-reveal className="mt-10 flex justify-center">
        <InstitutionalContactButton
          source="pricing_institutional_comparison"
          label={t("cta")}
          title={t("contactTitle")}
          description={t("contactDescription")}
        />
      </div>
    </Section>
  );
}
