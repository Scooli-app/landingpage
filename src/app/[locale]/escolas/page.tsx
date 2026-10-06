import { InstitutionalContactButton } from "@/components/InstitutionalContactButton";
import { TrackedLink } from "@/components/TrackedLink";
import { getSchoolPageCards } from "@/components/marketing/data";
import type { Locale } from "@/i18n/routing";
import { PageCtaBanner, PageHero, PublicSiteShell } from "@/components/marketing/shared";
import {
  Card,
  DividerGrid,
  DividerItem,
  LineList,
  Section,
  SectionHeader,
  displayTitle,
} from "@/components/site/primitives";
import { buttonVariants } from "@/components/ui/button";
import { getPageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "schools.meta" });

  return getPageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/escolas",
    locale,
  });
}

/** The pilot path in three steps, beside the hero. */
function PilotSteps() {
  const t = useTranslations("schools.preview");
  const items = t.raw("items") as string[];

  return (
    <Card className="p-2">
      <ol>
        {items.map((item, index) => (
          <li
            key={item}
            className="flex items-baseline gap-5 border-b border-line px-6 py-6 last:border-b-0"
          >
            <span className="font-mono text-xs text-faint">0{index + 1}</span>
            <span className="font-display text-2xl font-medium leading-snug tracking-[-0.01em] text-ink">
              {item}
            </span>
          </li>
        ))}
      </ol>
    </Card>
  );
}

export default async function SchoolsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const schoolPageCards = getSchoolPageCards(locale);
  const t = await getTranslations({ locale, namespace: "schools" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  return (
    <PublicSiteShell>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        primaryAction={
          <InstitutionalContactButton source="schools_page_hero" label={tCommon("bookDemo")} />
        }
        secondaryHref="/confianca"
        secondaryLabel={t("hero.secondaryLabel")}
        aside={<PilotSteps />}
      />

      <Section aria-labelledby="schools-how-title">
        <SectionHeader
          id="schools-how-title"
          kicker={t("howWeWork.eyebrow")}
          title={t("howWeWork.title")}
          description={t("howWeWork.description")}
        />
        <DividerGrid columns={3}>
          {schoolPageCards.map((card, index) => (
            <DividerItem key={card.title} label={`0${index + 1}`} title={card.title}>
              {card.description}
            </DividerItem>
          ))}
        </DividerGrid>
      </Section>

      <Section tone="stone" aria-labelledby="schools-blockers-title">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div data-reveal>
            <h2
              id="schools-blockers-title"
              className={cn(displayTitle, "text-[clamp(30px,3.4vw,42px)] leading-[1.1]")}
            >
              {t("blockers.title")}
            </h2>
            <TrackedLink
              href="/confianca"
              eventName="marketing_navigation_clicked"
              eventProperties={{ location: "schools_blockers", link_label: "trust_page" }}
              className="mt-6 inline-block text-[15px] font-medium text-violet-ink hover:underline"
            >
              {t("finalCta.secondaryLabel")} →
            </TrackedLink>
          </div>
          <LineList
            items={t.raw("blockers.items") as string[]}
            className="border-line-strong [&>li]:border-line-strong"
          />
        </div>
      </Section>

      <Section aria-labelledby="schools-recommend-title">
        <div
          data-reveal
          className="grid gap-6 border-y border-line py-10 lg:grid-cols-[1fr_auto] lg:items-center"
        >
          <div className="max-w-[640px]">
            <p className="font-mono text-xs uppercase tracking-[0.06em] text-subtle">
              {t("recommend.eyebrow")}
            </p>
            <h2
              id="schools-recommend-title"
              className={cn(displayTitle, "mt-3 text-[clamp(26px,2.8vw,34px)] leading-[1.15]")}
            >
              {t("recommend.title")}
            </h2>
            <p className="mt-3 text-[17px] leading-relaxed text-subtle">{t("recommend.description")}</p>
          </div>
          <TrackedLink
            href="/recomendar-instituicao"
            eventName="marketing_cta_clicked"
            eventProperties={{
              cta_id: "schools_page_recommend_institution",
              placement: "schools_page_referral_callout",
            }}
            className={buttonVariants({ variant: "secondary", size: "lg" })}
          >
            {t("recommend.buttonLabel")}
          </TrackedLink>
        </div>

        <div className="mt-16 md:mt-24">
          <PageCtaBanner
            title={t("finalCta.title")}
            description={t("finalCta.description")}
            primaryAction={
              <InstitutionalContactButton source="schools_page_cta_banner" label={tCommon("bookDemo")} />
            }
            secondaryHref="/confianca"
            secondaryLabel={t("finalCta.secondaryLabel")}
          />
        </div>
      </Section>
    </PublicSiteShell>
  );
}
