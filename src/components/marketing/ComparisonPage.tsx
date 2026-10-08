import { InstitutionalContactButton } from "@/components/InstitutionalContactButton";
import { PageCtaBanner, PageHero, PublicSiteShell } from "@/components/marketing/shared";
import type { ComparisonPageContent } from "@/components/marketing/comparisons";
import { Kicker, Section, SectionHeader } from "@/components/site/primitives";
import { TrackedFaqAccordion } from "@/components/TrackedFaqAccordion";
import { TrackedLink } from "@/components/TrackedLink";
import { Check, Minus } from "lucide-react";
import { useTranslations } from "next-intl";

/**
 * A "Scooli vs X" page: the verdict first (the paragraph most likely to be
 * quoted whole by an answer engine), the side-by-side table, why teachers pick
 * Scooli, the FAQ and the sources behind every claim about the other product.
 */
export function ComparisonPage({ content }: { content: ComparisonPageContent }) {
  const t = useTranslations("comparison");

  return (
    <PublicSiteShell>
      <PageHero
        eyebrow={content.kicker}
        title={content.title}
        description={content.description}
        primaryHref="#tabela"
        primaryLabel={content.tableTitle}
        secondaryHref="#faq"
        secondaryLabel={t("faq")}
      />

      <Section bordered aria-labelledby="comparison-verdict-title">
        <div data-reveal className="max-w-[820px] rounded-xl border border-line-strong bg-stone-soft p-7 md:p-9">
          <Kicker>{t("summary")}</Kicker>
          <h2 id="comparison-verdict-title" className="sr-only">
            {t("summaryTitle")}
          </h2>
          <p className="mt-3 text-[17px] leading-relaxed text-ink">{content.verdict}</p>
        </div>
      </Section>

      <Section id="tabela" tone="stone" aria-labelledby="comparison-table-title">
        <SectionHeader
          id="comparison-table-title"
          kicker={t("detail")}
          title={content.tableTitle}
          description={content.tableDescription}
        />

        <div data-reveal className="hidden overflow-hidden rounded-xl border border-line-strong bg-white md:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-line-strong">
                <th scope="col" className="w-[24%] px-6 py-5">
                  <span className="sr-only">{t("aspect")}</span>
                </th>
                <th scope="col" className="w-[40%] bg-violet-wash px-6 py-5 text-[15px] font-semibold text-violet-ink">
                  Scooli
                </th>
                <th scope="col" className="w-[36%] px-6 py-5 text-[15px] font-medium text-subtle">
                  {content.competitorName}
                </th>
              </tr>
            </thead>
            <tbody>
              {content.rows.map((row) => (
                <tr key={row.aspect} className="border-b border-line last:border-b-0">
                  <th scope="row" className="px-6 py-4 text-[15px] font-semibold text-ink">
                    {row.aspect}
                  </th>
                  <td className="bg-violet-wash/60 px-6 py-4 text-[15px] font-medium text-ink">
                    <span className="flex items-start gap-2.5">
                      <Check aria-hidden className="mt-[3px] size-4 shrink-0 text-violet" strokeWidth={2} />
                      {row.scooli}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[14.5px] text-subtle">
                    <span className="flex items-start gap-2.5">
                      <Minus aria-hidden className="mt-[3px] size-4 shrink-0 text-faint" strokeWidth={1.75} />
                      {row.competitor}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className="grid gap-3 md:hidden">
          {content.rows.map((row) => (
            <li key={row.aspect} data-reveal className="rounded-xl border border-line-strong bg-white p-5">
              <p className="text-[15px] font-semibold text-ink">{row.aspect}</p>
              <p className="mt-3 flex items-start gap-2.5 text-[15px] font-medium text-ink">
                <Check aria-hidden className="mt-[3px] size-4 shrink-0 text-violet" strokeWidth={2} />
                <span>
                  <span className="sr-only">Scooli: </span>
                  {row.scooli}
                </span>
              </p>
              <p className="mt-1.5 flex items-start gap-2.5 text-[14px] text-subtle">
                <Minus aria-hidden className="mt-[3px] size-4 shrink-0 text-faint" strokeWidth={1.75} />
                <span>
                  <span className="sr-only">{content.competitorName}: </span>
                  {row.competitor}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="comparison-reasons-title">
        <SectionHeader id="comparison-reasons-title" kicker={t("why")} title={content.reasonsTitle} />
        <div className="grid gap-4 lg:grid-cols-3">
          {content.reasons.map((reason, index) => (
            <div key={reason.title} data-reveal className="rounded-xl border border-line-strong bg-white p-7">
              <span className="font-mono text-xs text-violet-ink">0{index + 1}</span>
              <h3 className="mt-3 text-[19px] font-semibold leading-snug tracking-[-0.01em] text-ink">
                {reason.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-subtle">{reason.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="faq" tone="stone" aria-labelledby="comparison-faq-title">
        <SectionHeader id="comparison-faq-title" kicker={t("faq")} title={t("faq")} />
        <TrackedFaqAccordion
          items={content.faq}
          faqGroup={`comparison-${content.slug}`}
          itemValuePrefix={`comparison-${content.slug}-faq`}
          className="border-t border-line"
        />
      </Section>

      <Section bordered aria-labelledby="comparison-sources-title">
        <SectionHeader
          id="comparison-sources-title"
          kicker={t("sources")}
          title={t("sourcesTitle")}
          description={t("sourcesDescription")}
        />
        <ul className="grid gap-2 border-t border-line pt-6 sm:grid-cols-2">
          {content.sources.map((source) => (
            <li key={source.url} className="text-[14px] text-subtle">
              <TrackedLink
                href={source.url}
                eventName="marketing_navigation_clicked"
                eventProperties={{ location: "comparison_sources", link_label: source.label }}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-line-strong underline-offset-2 transition-colors hover:text-ink"
              >
                {source.label}
              </TrackedLink>
            </li>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="comparison-cta-title">
        <PageCtaBanner
          title={content.ctaTitle}
          description={content.ctaDescription}
          secondaryHref="/escolas"
          secondaryLabel={t("forSchools")}
        />
        <div data-reveal className="mt-8 flex justify-center">
          <InstitutionalContactButton source={`comparison_${content.slug}`} label={t("pilot")} />
        </div>
      </Section>
    </PublicSiteShell>
  );
}
