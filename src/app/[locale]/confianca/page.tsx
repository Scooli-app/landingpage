import { getTrustCards } from "@/components/marketing/data";
import { Checklist, PageHero, PublicSiteShell } from "@/components/marketing/shared";
import {
  DividerGrid,
  DividerItem,
  Section,
  SectionHeader,
  displayTitle,
} from "@/components/site/primitives";
import { TrackedLink } from "@/components/TrackedLink";
import { GdprSeal } from "@/components/site/GdprSeal";
import type { Locale } from "@/i18n/routing";
import { getPageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "trust.meta" });

  return getPageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/confianca",
    locale,
  });
}

export default async function TrustPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const trustCards = getTrustCards(locale);
  const t = await getTranslations({ locale, namespace: "trust" });
  const summaryPoints = t.raw("summaryPoints") as string[];
  const commitments = t.raw("commitments.items") as { title: string; description: string }[];
  const goodPractices = t.raw("goodPractices.items") as string[];

  const documents = [
    { key: "privacy", href: "/privacy" },
    { key: "terms", href: "/terms" },
  ] as const;

  return (
    <PublicSiteShell>
      <PageHero
        eyebrow={t("badge")}
        title={t("title")}
        description={t("description")}
        showActions={false}
      >
        <div className="flex items-center gap-4">
          <GdprSeal className="size-16 shrink-0 drop-shadow-[0_10px_18px_rgba(0,51,153,0.22)]" />
          <p className="text-[16px] font-semibold leading-snug text-ink">{summaryPoints[0]}</p>
        </div>
        <div className="mt-6">
          <Checklist items={summaryPoints.slice(1)} />
        </div>
      </PageHero>

      <Section aria-labelledby="trust-principles-title">
        <SectionHeader
          id="trust-principles-title"
          kicker={t("principles.eyebrow")}
          title={t("principles.title")}
        />
        <DividerGrid columns={3}>
          {trustCards.map((card) => (
            <DividerItem key={card.title} title={card.title}>
              {card.description}
            </DividerItem>
          ))}
        </DividerGrid>
      </Section>

      <Section tone="stone" aria-labelledby="trust-commitments-title">
        <SectionHeader id="trust-commitments-title" title={t("commitments.title")} />
        <div className="grid gap-x-16 md:grid-cols-2">
          {commitments.map((item) => (
            <DividerItem
              key={item.title}
              title={item.title}
              className="border-t border-line-strong py-6"
            >
              {item.description}
            </DividerItem>
          ))}
        </div>
      </Section>

      <Section aria-labelledby="trust-practices-title">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div data-reveal>
            <h2
              id="trust-practices-title"
              className={cn(displayTitle, "text-[clamp(30px,3.4vw,42px)] leading-[1.1]")}
            >
              {t("goodPractices.title")}
            </h2>
            <ol className="mt-8 border-t border-line">
              {goodPractices.map((item, index) => (
                <li key={item} className="flex gap-5 border-b border-line py-4 text-[16px] leading-relaxed text-body">
                  <span className="pt-1 font-mono text-xs text-faint">0{index + 1}</span>
                  {item}
                </li>
              ))}
            </ol>
          </div>

          <div data-reveal>
            <h2 className={cn(displayTitle, "text-[clamp(30px,3.4vw,42px)] leading-[1.1]")}>
              {t("documents.title")}
            </h2>
            <ul className="mt-8 border-t border-line">
              {documents.map((document) => (
                <li key={document.key} className="border-b border-line">
                  <TrackedLink
                    href={document.href}
                    eventName="marketing_navigation_clicked"
                    eventProperties={{ location: "trust_documents", link_label: document.key }}
                    className="group block py-5"
                  >
                    <span className="flex items-center justify-between gap-4 text-[17px] font-semibold text-ink group-hover:text-violet-ink">
                      {t(`documents.${document.key}.title`)}
                      <span aria-hidden className="font-normal text-subtle">→</span>
                    </span>
                    <span className="mt-1 block text-[15px] leading-relaxed text-subtle">
                      {t(`documents.${document.key}.description`)}
                    </span>
                  </TrackedLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </PublicSiteShell>
  );
}
