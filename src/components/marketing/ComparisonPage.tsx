import { Check, Minus } from "lucide-react";
import { TrackedFaqAccordion } from "@/components/TrackedFaqAccordion";
import { TrackedLink } from "@/components/TrackedLink";
import { InstitutionalContactButton } from "@/components/InstitutionalContactButton";
import { Kicker, Section, SectionHeader } from "@/components/site/primitives";
import { PageCtaBanner, PageHero, PublicSiteShell } from "@/components/marketing/shared";
import type { ComparisonPageContent, ComparisonRow } from "@/components/marketing/comparisons";

/** One row of the comparison table: a checkmark on whoever wins, a dash on
 * whoever doesn't, nothing on a tie (both get the check — the row itself
 * says why). */
function WinnerMark({ winner, side }: { winner: ComparisonRow["winner"]; side: "scooli" | "competitor" }) {
  const wins = winner === "tie" || winner === side;
  return wins ? (
    <Check aria-hidden className="mt-[3px] size-4 shrink-0 text-violet" strokeWidth={2} />
  ) : (
    <Minus aria-hidden className="mt-[3px] size-4 shrink-0 text-faint" strokeWidth={1.75} />
  );
}

export function ComparisonPage({ content }: { content: ComparisonPageContent }) {
  return (
    <PublicSiteShell>
      <PageHero
        eyebrow={content.kicker}
        title={content.title}
        description={content.description}
        primaryHref="#tabela"
        primaryLabel={content.tableTitle}
        secondaryHref="#faq"
        secondaryLabel="Perguntas frequentes"
      />

      {/* The upfront verdict: the single paragraph most likely to be quoted
          whole by an AI answer engine (ChatGPT Search, AI Overviews,
          Perplexity) — states who it's for, plainly, before the table. */}
      <Section bordered aria-labelledby="comparison-verdict-title">
        <div data-reveal className="max-w-[820px] rounded-xl border border-line-strong bg-stone-soft p-7 md:p-9">
          <Kicker>Resumo</Kicker>
          <h2 id="comparison-verdict-title" className="sr-only">
            Resumo da comparação
          </h2>
          <p className="mt-3 text-[17px] leading-relaxed text-ink">{content.verdict}</p>
        </div>
      </Section>

      <Section id="tabela" tone="stone" aria-labelledby="comparison-table-title">
        <SectionHeader
          id="comparison-table-title"
          kicker="Comparação detalhada"
          title={content.tableTitle}
          description={content.tableDescription}
        />

        <div data-reveal className="hidden overflow-hidden rounded-xl border border-line-strong bg-white md:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-line-strong">
                <th scope="col" className="w-[26%] px-6 py-5">
                  <span className="sr-only">Aspeto</span>
                </th>
                <th scope="col" className="w-[37%] bg-violet-wash px-6 py-5 text-[15px] font-semibold text-violet-ink">
                  Scooli
                </th>
                <th scope="col" className="w-[37%] px-6 py-5 text-[15px] font-medium text-subtle">
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
                      <WinnerMark winner={row.winner} side="scooli" />
                      {row.scooli}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[15px] text-subtle">
                    <span className="flex items-start gap-2.5">
                      <WinnerMark winner={row.winner} side="competitor" />
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
                <WinnerMark winner={row.winner} side="scooli" />
                <span>
                  <span className="sr-only">Scooli: </span>
                  {row.scooli}
                </span>
              </p>
              <p className="mt-1.5 flex items-start gap-2.5 text-[14px] text-subtle">
                <WinnerMark winner={row.winner} side="competitor" />
                <span>
                  <span className="sr-only">{content.competitorName}: </span>
                  {row.competitor}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="comparison-strengths-title">
        <SectionHeader
          id="comparison-strengths-title"
          kicker="Honestidade"
          title={content.strengthsTitle}
          description={content.strengthsDescription}
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {content.competitorStrengths.map((strength) => (
            <div key={strength.title} data-reveal className="rounded-xl border border-line-strong bg-white p-7">
              <h3 className="text-[17px] font-semibold leading-snug text-ink">{strength.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-subtle">{strength.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="faq" tone="stone" aria-labelledby="comparison-faq-title">
        <SectionHeader
          id="comparison-faq-title"
          kicker="Perguntas frequentes"
          title="Perguntas frequentes"
        />
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
          kicker="Fontes"
          title="Todas as afirmações têm fonte"
          description="Cada comparação é construída a partir de documentação pública do concorrente, não de opinião. As fontes consultadas:"
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
        <div className="mt-0">
          <PageCtaBanner
            title={content.ctaTitle}
            description={content.ctaDescription}
            secondaryHref="/ferramentas/planificacoes"
            secondaryLabel="Ver planificações com IA"
          />
        </div>
        <div data-reveal className="mt-8 flex justify-center">
          <InstitutionalContactButton
            source={`comparison_${content.slug}`}
            label="Falar sobre um piloto na minha escola"
          />
        </div>
      </Section>
    </PublicSiteShell>
  );
}
