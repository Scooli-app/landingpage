import { TrackedFaqAccordion } from "@/components/TrackedFaqAccordion";
import { TrackedLink } from "@/components/TrackedLink";
import { StructuredData } from "@/components/StructuredData";
import { getImpactStats, getToolPages } from "@/components/marketing/data";
import { NAV_TOOL_SLUGS } from "@/components/site/nav-data";
import {
  Card,
  DividerGrid,
  DividerItem,
  Kicker,
  Section,
  SectionHeader,
  displayTitle,
} from "@/components/site/primitives";
import type { Locale } from "@/i18n/routing";
import { localizedUrl } from "@/i18n/urls";
import {
  Checklist,
  PageCtaBanner,
  PageHero,
  PublicSiteShell,
  StatCard,
} from "@/components/marketing/shared";
import {
  appSignUpUrl,
  getBreadcrumbSchema,
  getFAQPageSchema,
  getHowToSchema,
  getPageMetadata,
  getWebPageSchema,
  SITE_URL,
} from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";

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

async function buildPageContent(locale: Locale) {
  const t = await getTranslations({ locale, namespace: "aiForTeachers" });

  const faqItems = t.raw("faq") as { question: string; answer: string }[];
  const trustPoints = t.raw("trustPoints") as {
    title: string;
    description: string;
  }[];
  const discoveryPreview = t.raw("discoveryPreview") as {
    label: string;
    value: string;
  }[];
  const howToSteps = t.raw("howToSchema.steps") as {
    name: string;
    text: string;
  }[];
  const nextStepsLinks = t.raw("nextSteps.links") as {
    label: string;
    href: string;
  }[];

  const pageUrl = localizedUrl(SITE_URL, pagePath, locale);
  const breadcrumbItems = [
    { name: t("breadcrumb.home"), url: localizedUrl(SITE_URL, "/", locale) },
    { name: t("breadcrumb.page"), url: pageUrl },
  ];

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbItems);
  const webPageSchema = getWebPageSchema({
    title: t("webPage.title"),
    description: t("webPage.description"),
    url: pageUrl,
    breadcrumb: breadcrumbItems,
    locale,
  });
  const faqSchema = getFAQPageSchema(faqItems);
  const howToSchema = getHowToSchema(
    t("howToSchema.name"),
    t("howToSchema.description"),
    howToSteps,
  );

  return {
    t,
    faqItems,
    trustPoints,
    discoveryPreview,
    breadcrumbSchema,
    webPageSchema,
    faqSchema,
    howToSchema,
    nextStepsLinks,
  };
}

export default async function AiForTeachersPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const {
    t,
    faqItems,
    trustPoints,
    discoveryPreview,
    breadcrumbSchema,
    webPageSchema,
    faqSchema,
    howToSchema,
    nextStepsLinks,
  } = await buildPageContent(locale);
  const toolPages = getToolPages(locale);
  const impactStats = getImpactStats(locale);
  const heroChecklist = t.raw("hero.checklist") as string[];
  const whenToChooseChecklist = t.raw("whenToChoose.checklist") as string[];
  const tools = NAV_TOOL_SLUGS.map((slug) => toolPages.find((tool) => tool.slug === slug)).filter(
    (tool): tool is (typeof toolPages)[number] => Boolean(tool),
  );

  return (
    <>
      <StructuredData id="ia-professores-breadcrumb" data={breadcrumbSchema} />
      <StructuredData id="ia-professores-webpage" data={webPageSchema} />
      <StructuredData id="ia-professores-faq" data={faqSchema} />
      <StructuredData id="ia-professores-howto" data={howToSchema} />

      <PublicSiteShell>
        <PageHero
          eyebrow={t("hero.eyebrow")}
          title={t("hero.title")}
          description={t("hero.description")}
          secondaryHref="/ferramentas"
          secondaryLabel={t("hero.secondaryLabel")}
          aside={
            <Card className="grid grid-cols-2">
              {discoveryPreview.map((item, index) => (
                <div
                  key={item.label}
                  className={cn(
                    "p-6",
                    index % 2 === 1 && "border-l border-line",
                    index > 1 && "border-t border-line",
                  )}
                >
                  <Kicker>{item.label}</Kicker>
                  <p className="mt-3 text-lg font-semibold leading-snug text-ink">{item.value}</p>
                </div>
              ))}
            </Card>
          }
        >
          <Checklist items={heroChecklist} />
        </PageHero>

        <Section aria-labelledby="ia-quick-title">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:gap-16">
            <article data-reveal className="max-w-[720px]">
              <Kicker>{t("quickAnswer.eyebrow")}</Kicker>
              <h2
                id="ia-quick-title"
                className={cn(displayTitle, "mt-3 text-[clamp(30px,3.4vw,42px)] leading-[1.1]")}
              >
                {t("quickAnswer.title")}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-body">{t("quickAnswer.paragraph1")}</p>
              <p className="mt-4 text-lg leading-relaxed text-body">{t("quickAnswer.paragraph2")}</p>
            </article>
            <aside data-reveal className="self-start rounded-xl bg-stone-soft p-7">
              <Kicker>{t("whenToChoose.eyebrow")}</Kicker>
              <div className="mt-4">
                <Checklist items={whenToChooseChecklist} />
              </div>
            </aside>
          </div>
        </Section>

        <Section tone="stone" aria-labelledby="ia-tools-title">
          <SectionHeader
            id="ia-tools-title"
            kicker={t("toolsSection.eyebrow")}
            title={t("toolsSection.title")}
            description={t("toolsSection.description")}
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <li key={tool.slug} data-reveal>
                <TrackedLink
                  href={{ pathname: "/ferramentas/[slug]", params: { slug: tool.slug } }}
                  eventName="marketing_navigation_clicked"
                  eventProperties={{
                    location: "ia_para_professores_tools_grid",
                    link_label: tool.shortTitle.toLowerCase(),
                  }}
                  className="flex h-full flex-col rounded-xl border border-line-strong bg-white p-7 transition-colors hover:border-[#C9C8C3]"
                >
                  <h3 className="text-lg font-semibold text-ink">{tool.shortTitle}</h3>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-subtle">{tool.description}</p>
                  <span className="mt-5 text-[15px] font-medium text-violet-ink">
                    {t("toolsSection.seeTool")} →
                  </span>
                </TrackedLink>
              </li>
            ))}
          </ul>
        </Section>

        <Section aria-labelledby="ia-trust-title">
          <SectionHeader
            id="ia-trust-title"
            kicker={t("trustSection.eyebrow")}
            title={t("trustSection.title")}
            description={t("trustSection.description")}
          />
          <DividerGrid columns={4}>
            {trustPoints.map((item) => (
              <DividerItem key={item.title} title={item.title}>
                {item.description}
              </DividerItem>
            ))}
          </DividerGrid>
        </Section>

        <Section tone="stone" aria-labelledby="ia-social-title">
          <SectionHeader
            id="ia-social-title"
            kicker={t("socialSection.eyebrow")}
            title={t("socialSection.title")}
            description={t("socialSection.description")}
          />
          <div className="grid max-w-[720px] gap-8 sm:grid-cols-2">
            {impactStats.map((item) => (
              <StatCard key={item.label} value={item.value} label={item.label} />
            ))}
          </div>
        </Section>

        <Section aria-labelledby="ia-faq-title">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16">
            <div>
              <SectionHeader
                id="ia-faq-title"
                kicker={t("faqSection.eyebrow")}
                title={t("faqSection.title")}
                description={t("faqSection.description")}
                className="mb-8 md:mb-8"
              />
              <TrackedFaqAccordion
                items={faqItems}
                faqGroup="ia_para_professores"
                itemValuePrefix="ia-professores-faq"
                className="border-t border-line"
              />
            </div>
            <aside data-reveal className="self-start rounded-xl bg-stone-soft p-7">
              <Kicker>{t("nextSteps.eyebrow")}</Kicker>
              <p className="mt-3 text-xl font-semibold text-ink">{t("nextSteps.title")}</p>
              <ul className="mt-5 border-t border-line-strong">
                {nextStepsLinks.map((link) => (
                  <li key={link.href} className="border-b border-line-strong">
                    <TrackedLink
                      href={link.href}
                      eventName="marketing_navigation_clicked"
                      eventProperties={{
                        location: "ia_para_professores_next_steps",
                        link_label: link.label.toLowerCase(),
                      }}
                      className="flex items-center justify-between gap-4 py-3.5 text-[15px] text-ink transition-colors hover:text-violet-ink"
                    >
                      {link.label}
                      <span aria-hidden className="text-subtle">→</span>
                    </TrackedLink>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[15px] leading-relaxed text-subtle">
                {t.rich("nextSteps.signupNote", {
                  link: (chunks) => (
                    <TrackedLink
                      href={appSignUpUrl(locale)}
                      eventName="marketing_cta_clicked"
                      eventProperties={{
                        cta_id: "ia_para_professores_inline_signup",
                        placement: "ia_para_professores_next_steps",
                      }}
                      className="font-medium text-violet-ink hover:underline"
                    >
                      {chunks}
                    </TrackedLink>
                  ),
                })}
              </p>
            </aside>
          </div>

          <div className="mt-20 md:mt-28">
            <PageCtaBanner
              title={t("cta.title")}
              description={t("cta.description")}
              secondaryHref="/confianca"
              secondaryLabel={t("cta.secondaryLabel")}
            />
          </div>
        </Section>
      </PublicSiteShell>
    </>
  );
}
