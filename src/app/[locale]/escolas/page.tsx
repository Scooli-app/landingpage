import { PageSchemas } from "@/components/marketing/PageSchemas";
import { SchoolOverviewCard } from "@/components/site/SchoolOverviewCard";
import { InstitutionalContactButton } from "@/components/InstitutionalContactButton";
import { TrackedFaqAccordion } from "@/components/TrackedFaqAccordion";
import { TrackedLink } from "@/components/TrackedLink";
import { AdvisorNote } from "@/components/AdvisorNote";
import { ImpactStats } from "@/components/ImpactStats";
import type { Locale } from "@/i18n/routing";
import { PageCtaBanner, PageHero, PublicSiteShell } from "@/components/marketing/shared";
import { Kicker, Section, SectionHeader, WindowFrame, displayTitle } from "@/components/site/primitives";
import { buttonVariants } from "@/components/ui/button";
import { appMedia } from "@/lib/app-media";
import { getPageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { BarChart3, GraduationCap, Layers, Library, ShieldCheck, Users } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";

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

const benefitIcons = [Users, BarChart3, Library, Layers, GraduationCap, ShieldCheck];

type Item = { title: string; description: string };

/**
 * The institutional plan's page. It sells the plan itself (what a school gets
 * beyond a Pro licence per teacher), shows the real school dashboard, then the
 * pilot path and the questions school leaders ask before deciding.
 */
export default async function SchoolsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "schools" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const dashboard = appMedia(locale).schoolDashboard;
  const tState = await getTranslations({ locale, namespace: "classState" });
  const statePoints = tState.raw("school.points") as { title: string; text: string }[];
  const benefits = t.raw("benefits.items") as Item[];
  const startSteps = t.raw("start.items") as Item[];
  const questions = t.raw("questions.items") as { question: string; answer: string }[];

  const tMeta = await getTranslations({ locale, namespace: "schools.meta" });

  return (
    <PublicSiteShell>
      <PageSchemas
        id="schools"
        path="/escolas"
        locale={locale}
        title={tMeta("title")}
        description={tMeta("description")}
        faq={questions}
      />
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        primaryAction={
          <InstitutionalContactButton source="schools_page_hero" label={tCommon("bookDemo")} />
        }
        secondaryHref="/precos"
        secondaryLabel={t("hero.secondaryLabel")}
        aside={
          <WindowFrame>
            <Image
              src={dashboard.src}
              alt={t("hero.imageAlt")}
              width={dashboard.width}
              height={dashboard.height}
              sizes="(min-width: 1024px) 620px, 92vw"
              priority
              className="h-auto w-full"
            />
          </WindowFrame>
        }
      />

      <ImpactStats className="border-b border-line" />

      <Section tone="stone" aria-labelledby="schools-curriculum-title">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <div data-reveal>
            <Kicker>{tState("school.kicker")}</Kicker>
            <h2
              id="schools-curriculum-title"
              className={cn(displayTitle, "mt-3 text-[clamp(32px,4vw,50px)] leading-[1.06] tracking-[-0.03em]")}
            >
              {tState("school.title")}
            </h2>
            <p className="mt-5 text-[18px] leading-relaxed text-subtle">{tState("school.description")}</p>
            <ul className="mt-8 space-y-6">
              {statePoints.map((point, index) => (
                <li key={point.title} className="flex gap-4">
                  <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-white font-mono text-[12px] font-medium text-violet-ink">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-[17px] font-semibold tracking-[-0.01em] text-ink">{point.title}</p>
                    <p className="mt-1 text-[15px] leading-relaxed text-subtle">{point.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <SchoolOverviewCard data-reveal className="w-full" />
        </div>
      </Section>

      <Section aria-labelledby="schools-benefits-title">
        <SectionHeader
          id="schools-benefits-title"
          kicker={t("benefits.kicker")}
          title={t("benefits.title")}
          description={t("benefits.description")}
        />
        <AdvisorNote className="mb-10 max-w-[560px]" />
        <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefitIcons[index % benefitIcons.length];

            return (
              <li
                key={benefit.title}
                data-reveal
                style={{ "--reveal-delay": `${(index % 3) * 80}ms` } as React.CSSProperties}
                className="border-t border-line pt-6"
              >
                <span className="grid size-11 place-items-center rounded-lg bg-violet-wash text-violet-ink">
                  <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 text-[18px] font-semibold tracking-[-0.01em] text-ink">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-subtle">{benefit.description}</p>
              </li>
            );
          })}
        </ul>
        <div data-reveal className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3">
          <InstitutionalContactButton
            source="schools_page_benefits"
            label={tCommon("talkToTeam")}
            size="default"
          />
          <TrackedLink
            href="/precos"
            eventName="marketing_navigation_clicked"
            eventProperties={{ location: "schools_benefits", link_label: "pricing_comparison" }}
            className="text-[15px] font-medium text-violet-ink hover:underline"
          >
            {t("hero.secondaryLabel")} →
          </TrackedLink>
        </div>
      </Section>

      <Section tone="stone" aria-labelledby="schools-start-title">
        <SectionHeader id="schools-start-title" kicker={t("start.kicker")} title={t("start.title")} />
        <ol className="grid gap-4 md:grid-cols-3">
          {startSteps.map((step, index) => (
            <li
              key={step.title}
              data-reveal
              style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
              className="rounded-xl border border-line-strong bg-white p-7"
            >
              <span className="font-mono text-xs text-faint">0{index + 1}</span>
              <h3 className="mt-3 font-display text-2xl font-medium leading-snug tracking-[-0.01em] text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-subtle">{step.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section aria-labelledby="schools-questions-title">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
          <div data-reveal>
            <SectionHeader
              id="schools-questions-title"
              kicker={t("questions.kicker")}
              title={t("questions.title")}
              className="mb-0 md:mb-0"
            />
            <TrackedLink
              href="/confianca"
              eventName="marketing_navigation_clicked"
              eventProperties={{ location: "schools_questions", link_label: "trust_page" }}
              className="mt-6 inline-block text-[15px] font-medium text-violet-ink hover:underline"
            >
              {t("finalCta.secondaryLabel")} →
            </TrackedLink>
          </div>
          <TrackedFaqAccordion
            items={questions}
            faqGroup="schools"
            itemValuePrefix="schools-faq"
            className="border-t border-line"
          />
        </div>
      </Section>

      <Section bordered aria-labelledby="schools-recommend-title">
        <div
          data-reveal
          className="grid gap-6 border-b border-line pb-10 lg:grid-cols-[1fr_auto] lg:items-center"
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
