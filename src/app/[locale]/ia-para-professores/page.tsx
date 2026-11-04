import { pageUpdated } from "@/lib/pageDates";
import { ClassStateSection } from "@/components/homepage/ClassStateSection";
import { resourceIcons } from "@/components/homepage/ResourcesSection";
import { Container } from "@/components/Container";
import { InstitutionalContactButton } from "@/components/InstitutionalContactButton";
import { getToolPages } from "@/components/marketing/data";
import { PageCtaBanner, PublicSiteShell, StatCard } from "@/components/marketing/shared";
import { LoopingVideo } from "@/components/site/LoopingVideo";
import { NAV_TOOL_SLUGS } from "@/components/site/nav-data";
import {
  Card,
  DividerGrid,
  DividerItem,
  Kicker,
  LineList,
  Section,
  SectionHeader,
  displayTitle,
} from "@/components/site/primitives";
import { StructuredData } from "@/components/StructuredData";
import { TrackedFaqAccordion } from "@/components/TrackedFaqAccordion";
import { TrackedLink } from "@/components/TrackedLink";
import { buttonVariants } from "@/components/ui/button";
import type { Locale } from "@/i18n/routing";
import { localizedUrl } from "@/i18n/urls";
import { appMedia } from "@/lib/app-media";
import {
  appSignUpUrl,
  getBreadcrumbSchema,
  getFAQPageSchema,
  getHowToSchema,
  getPageMetadata,
  getWebPageSchema,
  PUBLIC_IMPACT_METRICS,
  SITE_URL,
} from "@/lib/seo";
import { cn } from "@/lib/utils";
import { Check, Minus } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

const pagePath = "/ia-para-professores";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aiForTeachers.meta" });

  return getPageMetadata({
    title: t("title"),
    description: t("description"),
    path: pagePath,
    keywords: t.raw("keywords") as string[],
    locale,
  });
}

/**
 * The search landing for "AI for teachers". Its copy must stay its own: when it
 * reused most of the homepage (Oct 2026), the two pages competed for the same
 * query and both lost rank. Only the class-state section is shared. The FAQ
 * also feeds the FAQ and HowTo structured data.
 */
export default async function AiForTeachersPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "aiForTeachers" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const tTools = await getTranslations({ locale, namespace: "tools.index" });
  const media = appMedia(locale);

  const faqItems = t.raw("faq") as { question: string; answer: string }[];
  const howToSteps = t.raw("howToSchema.steps") as { name: string; text: string }[];
  const withoutItems = t.raw("week.without.items") as string[];
  const withItems = t.raw("week.with.items") as string[];
  const quickAnswerParagraphs = t.raw("quickAnswer.paragraphs") as string[];
  const whenToChooseItems = t.raw("whenToChoose.items") as string[];
  const trustItems = t.raw("trust.items") as { title: string; description: string }[];
  const toolPages = getToolPages(locale);

  const pageUrl = localizedUrl(SITE_URL, pagePath, locale);
  const breadcrumbItems = [
    { name: t("breadcrumb.home"), url: localizedUrl(SITE_URL, "/", locale) },
    { name: t("breadcrumb.page"), url: pageUrl },
  ];

  return (
    <>
      <StructuredData id="ia-professores-breadcrumb" data={getBreadcrumbSchema(breadcrumbItems)} />
      <StructuredData
        id="ia-professores-webpage"
        data={getWebPageSchema({
          title: t("webPage.title"),
          description: t("webPage.description"),
          url: pageUrl,
          breadcrumb: breadcrumbItems,
          locale,
          dateModified: pageUpdated(pagePath),
        })}
      />
      <StructuredData id="ia-professores-faq" data={getFAQPageSchema(faqItems)} />
      <StructuredData
        id="ia-professores-howto"
        data={getHowToSchema(t("howToSchema.name"), t("howToSchema.description"), howToSteps)}
      />

      <PublicSiteShell>
        <section aria-labelledby="ia-hero-title" className="pt-12 text-center md:pt-16">
          <Container>
            <Kicker>{t("hero.eyebrow")}</Kicker>
            <h1
              id="ia-hero-title"
              className={cn(
                displayTitle,
                "mx-auto mt-4 max-w-[900px] text-[clamp(40px,5.2vw,66px)] leading-[1.04] tracking-[-0.035em]",
              )}
            >
              {t.rich("hero.title", { em: (chunks) => <em>{chunks}</em> })}
            </h1>
            <p className="mx-auto mt-5 max-w-[620px] text-lg leading-relaxed text-subtle md:text-[19px]">
              {t("hero.description")}
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <TrackedLink
                href={appSignUpUrl(locale)}
                eventName="marketing_cta_clicked"
                eventProperties={{ cta_id: "ia_hero_start_free", placement: "ia_hero_primary" }}
                className={buttonVariants({ variant: "primary", size: "lg" })}
              >
                {tCommon("startFree")}
              </TrackedLink>
              <TrackedLink
                href="/ferramentas"
                eventName="marketing_navigation_clicked"
                eventProperties={{ location: "ia_hero", link_label: "tools" }}
                className={buttonVariants({ variant: "secondary", size: "lg" })}
              >
                {t("hero.secondaryLabel")}
              </TrackedLink>
            </div>
            <LoopingVideo
              video={media.heroFilm}
              label={t("hero.videoAria")}
              priority
              className="mx-auto mt-12 max-w-[1160px] rounded-2xl border border-line-strong shadow-[0_1px_2px_rgba(0,0,0,0.03),0_40px_90px_-48px_rgba(17,17,17,0.35)] md:mt-14"
            />
          </Container>
        </section>

        <section aria-label={t("proofLabel")} className="py-14 md:py-16">
          <Container className="grid max-w-[720px] gap-8 sm:grid-cols-2">
            <StatCard value={`${PUBLIC_IMPACT_METRICS.activeTeachers.minValue}+`} label={t("proof.teachers")} />
            <StatCard
              value={`${PUBLIC_IMPACT_METRICS.generatedDocuments.minValue}+`}
              label={t("proof.documents")}
            />
          </Container>
        </section>

        <Section bordered aria-labelledby="ia-answer-title">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
            <div data-reveal>
              <Kicker>{t("quickAnswer.kicker")}</Kicker>
              <h2
                id="ia-answer-title"
                className={cn(displayTitle, "mt-3 text-[clamp(30px,3.4vw,42px)] leading-[1.1]")}
              >
                {t("quickAnswer.title")}
              </h2>
              {quickAnswerParagraphs.map((paragraph) => (
                <p key={paragraph} className="mt-5 text-lg leading-relaxed text-subtle">
                  {paragraph}
                </p>
              ))}
            </div>
            <Card data-reveal className="self-start p-6 md:p-8">
              <h3 className="text-[17px] font-semibold text-ink">{t("whenToChoose.title")}</h3>
              <LineList items={whenToChooseItems} className="mt-5" />
            </Card>
          </div>
        </Section>

        <Section tone="stone" aria-labelledby="ia-week-title">
          <SectionHeader
            id="ia-week-title"
            kicker={t("week.kicker")}
            title={t("week.title")}
            description={t("week.description")}
          />
          <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
            <div data-reveal className="rounded-xl border border-line-strong bg-white/60 p-6 md:p-8">
              <p className="text-sm font-medium text-subtle">{t("week.without.label")}</p>
              <ul className="mt-5 border-t border-line">
                {withoutItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 border-b border-line py-3.5 text-[15px] leading-relaxed text-subtle"
                  >
                    <Minus aria-hidden className="mt-1 size-4 shrink-0 text-faint" strokeWidth={1.75} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div
              data-reveal
              style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
              className="rounded-xl border-2 border-ink bg-white p-6 md:p-8"
            >
              <p className="text-sm font-medium text-violet-ink">{t("week.with.label")}</p>
              <ul className="mt-5 border-t border-line">
                {withItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 border-b border-line py-3.5 text-[15px] font-medium leading-relaxed text-ink"
                  >
                    <Check aria-hidden className="mt-1 size-4 shrink-0 text-violet" strokeWidth={2} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section aria-labelledby="ia-tools-title">
          <SectionHeader
            id="ia-tools-title"
            kicker={t("tools.kicker")}
            title={t("tools.title")}
            description={t("tools.description")}
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {NAV_TOOL_SLUGS.map((slug) => {
              const tool = toolPages.find((page) => page.slug === slug);
              if (!tool) {return null;}
              const Icon = resourceIcons[slug];

              return (
                <li key={slug} data-reveal>
                  <TrackedLink
                    href={{ pathname: "/ferramentas/[slug]", params: { slug } }}
                    eventName="marketing_navigation_clicked"
                    eventProperties={{ location: "ia_tools_grid", link_label: slug }}
                    className="group flex h-full flex-col rounded-xl border border-line-strong bg-white p-6 transition-colors hover:border-[#C9C8C3]"
                  >
                    <span className="grid size-11 place-items-center rounded-lg bg-stone-soft text-ink transition-colors group-hover:bg-violet-wash group-hover:text-violet-ink">
                      <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                    </span>
                    <h3 className="mt-5 text-lg font-semibold text-ink">{tool.shortTitle}</h3>
                    <p className="mt-1.5 flex-1 text-[15px] leading-relaxed text-subtle">
                      {tool.description}
                    </p>
                    <span className="mt-5 text-[15px] font-medium text-violet-ink">
                      {tTools("seeTool", { tool: tool.shortTitle.toLowerCase() })} →
                    </span>
                  </TrackedLink>
                </li>
              );
            })}
          </ul>
        </Section>

        <Section tone="stone" aria-labelledby="ia-trust-title">
          <SectionHeader id="ia-trust-title" kicker={t("trust.kicker")} title={t("trust.title")} />
          <DividerGrid columns={4} onStone>
            {trustItems.map((item) => (
              <DividerItem key={item.title} title={item.title}>
                {item.description}
              </DividerItem>
            ))}
          </DividerGrid>
        </Section>

        <ClassStateSection id="ia-class-state" />

        <Section tone="stone" aria-labelledby="ia-faq-title">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
            <SectionHeader
              id="ia-faq-title"
              kicker={t("faqSection.eyebrow")}
              title={t("faqSection.title")}
              className="mb-0 md:mb-0"
            />
            <TrackedFaqAccordion
              items={faqItems}
              faqGroup="ia_para_professores"
              itemValuePrefix="ia-professores-faq"
              className="border-t border-line-strong"
            />
          </div>
        </Section>

        <Section>
          <PageCtaBanner
            title={t("cta.title")}
            description={t("cta.description")}
            secondaryAction={
              <InstitutionalContactButton
                source="ia_para_professores_cta"
                label={tCommon("forSchools")}
                variant="secondary"
              />
            }
          />
        </Section>
      </PublicSiteShell>
    </>
  );
}
