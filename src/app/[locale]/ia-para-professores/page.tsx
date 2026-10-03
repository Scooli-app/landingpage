import { Container } from "@/components/Container";
import { TrackedFaqAccordion } from "@/components/TrackedFaqAccordion";
import { TrackedLink } from "@/components/TrackedLink";
import { StructuredData } from "@/components/StructuredData";
import { withRatings } from "@/components/homepage/data";
import { getImpactStats, getToolPages, toolCardIcons } from "@/components/marketing/data";
import type { Locale } from "@/i18n/routing";
import { localizedUrl } from "@/i18n/urls";
import {
  Checklist,
  MarketingSectionHeading,
  PageCtaBanner,
  PageHero,
  PublicSiteShell,
  SurfacePanel,
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
import { ArrowRight, LibraryBig, LockKeyhole, MapPinned, PencilLine } from "lucide-react";

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

const trustPointIcons = [MapPinned, PencilLine, LibraryBig, LockKeyhole];

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
  const tSocial = await getTranslations({ locale, namespace: "home.socialProof" });
  const socialProof = withRatings(
    tSocial.raw("quotes") as { quote: string; role: string }[],
  );
  const heroChecklist = t.raw("hero.checklist") as string[];
  const whenToChooseChecklist = t.raw("whenToChoose.checklist") as string[];

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
            <SurfacePanel className="bg-[color:var(--scooli-surface-alt)]">
              <div className="grid gap-3 sm:grid-cols-2">
                {discoveryPreview.map((item) => (
                  <div key={item.label} className="rounded-[24px] border border-slate-200 bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      {item.label}
                    </p>
                    <p className="mt-3 text-lg font-semibold text-slate-800">{item.value}</p>
                  </div>
                ))}
              </div>
            </SurfacePanel>
          }
        >
          <Checklist items={heroChecklist} />
        </PageHero>

        <section className="py-20 sm:py-24 lg:py-28">
          <Container className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <SurfacePanel>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                {t("quickAnswer.eyebrow")}
              </p>
              <h2 className="mt-4 font-display text-3xl leading-tight text-[color:var(--scooli-ink)] sm:text-4xl">
                {t("quickAnswer.title")}
              </h2>
              <p className="mt-4 text-base leading-8 text-[color:var(--scooli-muted)] sm:text-lg">
                {t("quickAnswer.paragraph1")}
              </p>
              <p className="mt-4 text-base leading-8 text-[color:var(--scooli-muted)] sm:text-lg">
                {t("quickAnswer.paragraph2")}
              </p>
            </SurfacePanel>

            <SurfacePanel className="bg-[color:var(--scooli-surface-alt)]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                {t("whenToChoose.eyebrow")}
              </p>
              <div className="mt-4">
                <Checklist items={whenToChooseChecklist} />
              </div>
            </SurfacePanel>
          </Container>
        </section>

        <section className="bg-white/70 py-20 sm:py-24 lg:py-28">
          <Container className="space-y-12">
            <MarketingSectionHeading
              eyebrow={t("toolsSection.eyebrow")}
              title={t("toolsSection.title")}
              description={t("toolsSection.description")}
              centered
            />
            <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
              {toolPages.slice(0, 4).map((tool) => {
                const Icon = toolCardIcons[tool.slug];

                return (
                  <SurfacePanel key={tool.slug}>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-[color:var(--scooli-ink)]">
                      {tool.shortTitle}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[color:var(--scooli-muted)]">
                      {tool.description}
                    </p>
                    <TrackedLink
                      href={`/ferramentas/${tool.slug}`}
                      eventName="marketing_navigation_clicked"
                      eventProperties={{
                        location: "ia_para_professores_tools_grid",
                        link_label: tool.shortTitle.toLowerCase(),
                      }}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--scooli-primary)]"
                    >
                      {t("toolsSection.seeTool")}
                      <ArrowRight className="h-4 w-4" />
                    </TrackedLink>
                  </SurfacePanel>
                );
              })}
            </div>
          </Container>
        </section>

        <section className="py-20 sm:py-24 lg:py-28">
          <Container className="space-y-12">
            <MarketingSectionHeading
              eyebrow={t("trustSection.eyebrow")}
              title={t("trustSection.title")}
              description={t("trustSection.description")}
              centered
            />
            <div className="grid gap-5 lg:grid-cols-2">
              {trustPoints.map((item, index) => {
                const Icon = trustPointIcons[index];

                return (
                  <SurfacePanel key={item.title}>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-[color:var(--scooli-ink)]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[color:var(--scooli-muted)]">
                      {item.description}
                    </p>
                  </SurfacePanel>
                );
              })}
            </div>
          </Container>
        </section>

        <section className="bg-white/70 py-20 sm:py-24 lg:py-28">
          <Container className="space-y-12">
            <MarketingSectionHeading
              eyebrow={t("socialSection.eyebrow")}
              title={t("socialSection.title")}
              description={t("socialSection.description")}
              centered
            />
            <div className="grid gap-5 lg:grid-cols-4">
              {impactStats.map((item) => (
                <SurfacePanel key={item.label}>
                  <p className="font-display text-4xl text-[color:var(--scooli-ink)]">{item.value}</p>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--scooli-muted)]">
                    {item.label}
                  </p>
                </SurfacePanel>
              ))}
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {socialProof.map((item) => (
                <SurfacePanel key={item.quote}>
                  <p className="text-base leading-8 text-[color:var(--scooli-ink)]">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <p className="mt-4 text-sm font-medium text-[color:var(--scooli-muted)]">
                    {item.role}
                  </p>
                </SurfacePanel>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-20 sm:py-24 lg:py-28">
          <Container className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <SurfacePanel>
              <MarketingSectionHeading
                eyebrow={t("faqSection.eyebrow")}
                title={t("faqSection.title")}
                description={t("faqSection.description")}
              />
              <div className="mt-8">
                <TrackedFaqAccordion
                  items={faqItems}
                  faqGroup="ia_para_professores"
                  itemValuePrefix="ia-professores-faq"
                  className="space-y-3"
                  itemClassName="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 px-4"
                  triggerClassName="py-4 text-left text-[15px] font-semibold text-[color:var(--scooli-ink)] hover:no-underline"
                  contentClassName="text-sm leading-7 text-[color:var(--scooli-muted)]"
                />
              </div>
            </SurfacePanel>

            <SurfacePanel className="bg-[color:var(--scooli-surface-alt)]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                {t("nextSteps.eyebrow")}
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-[color:var(--scooli-ink)]">
                {t("nextSteps.title")}
              </h3>
              <div className="mt-6 grid gap-3">
                {nextStepsLinks.map((link) => (
                  <TrackedLink
                    key={link.href}
                    href={link.href}
                    eventName="marketing_navigation_clicked"
                    eventProperties={{
                      location: "ia_para_professores_next_steps",
                      link_label: link.label.toLowerCase(),
                    }}
                    className="inline-flex items-center justify-between rounded-[22px] border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-[color:var(--scooli-ink)] transition-colors hover:border-[color:var(--scooli-primary)] hover:text-[color:var(--scooli-primary)]"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="h-4 w-4" />
                  </TrackedLink>
                ))}
              </div>
              <div className="mt-6 rounded-[24px] border border-[#d9ddff] bg-white px-5 py-4 text-sm leading-7 text-[color:var(--scooli-muted)]">
                {t.rich("nextSteps.signupNote", {
                  link: (chunks) => (
                    <TrackedLink
                      href={appSignUpUrl(locale)}
                      eventName="marketing_cta_clicked"
                      eventProperties={{
                        cta_id: "ia_para_professores_inline_signup",
                        placement: "ia_para_professores_next_steps",
                      }}
                      className="font-semibold text-[color:var(--scooli-primary)]"
                    >
                      {chunks}
                    </TrackedLink>
                  ),
                })}
              </div>
            </SurfacePanel>
          </Container>
        </section>

        <section className="pb-20 sm:pb-24 lg:pb-28">
          <Container>
            <PageCtaBanner
              title={t("cta.title")}
              description={t("cta.description")}
              secondaryHref="/confianca"
              secondaryLabel={t("cta.secondaryLabel")}
            />
          </Container>
        </section>
      </PublicSiteShell>
    </>
  );
}
