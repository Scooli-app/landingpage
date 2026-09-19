import { Container } from "@/components/Container";
import { CurriculumNote } from "@/components/CurriculumNote";
import { TrackedFaqAccordion } from "@/components/TrackedFaqAccordion";
import { TrackedLink } from "@/components/TrackedLink";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { toolCardIcons, type ToolPageData } from "./data";
import {
  Checklist,
  MarketingSectionHeading,
  PageCtaBanner,
  PageHero,
  PublicSiteShell,
  SurfacePanel,
} from "./shared";

// ─── Shared pieces ───────────────────────────────────────────────────────────

/**
 * Screenshots exist only for these tools. The alt text is copy and comes from
 * `tools.detail.previewAlt.<slug>`; only the file path is keyed here.
 */
const toolPreviewImages: Partial<Record<string, string>> = {
  planificacoes: "/screenshots/plano-pdf.png",
  "fichas-de-trabalho": "/screenshots/ficha-pdf.png",
  "gerador-de-testes": "/screenshots/teste-pdf.png",
  "plano-de-aula": "/screenshots/app-plano-aula.jpg",
};

function UseCaseChips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((useCase) => (
        <span
          key={useCase}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600"
        >
          <CheckCircle2 className="h-4 w-4 text-[color:var(--scooli-primary)]" />
          {useCase}
        </span>
      ))}
    </div>
  );
}

function DocumentPreview({ tool }: { tool: ToolPageData }) {
  const t = useTranslations("tools.detail");
  const previewImage = toolPreviewImages[tool.slug];

  if (previewImage) {
    return (
      <SurfacePanel className="bg-[color:var(--scooli-surface-alt)]">
        <div className="space-y-4">
          <div className="rounded-[26px] border border-slate-200 bg-white p-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
              {t("realExample")}
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-[color:var(--scooli-ink)]">
              {tool.shortTitle}
            </h3>
          </div>
          <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_20px_50px_-40px_rgba(19,35,58,0.28)]">
            <Image
              src={previewImage}
              alt={t(`previewAlt.${tool.slug}`)}
              width={1600}
              height={2000}
              sizes="(min-width: 1024px) 34vw, 100vw"
              className="h-auto w-full object-cover object-top"
            />
          </div>
        </div>
      </SurfacePanel>
    );
  }

  return (
    <SurfacePanel className="bg-[color:var(--scooli-surface-alt)]">
      <div className="rounded-[26px] border border-slate-200 bg-white p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
          {t("typicalOutput")}
        </p>
        <h3 className="mt-4 text-2xl font-semibold text-[color:var(--scooli-ink)]">
          {tool.shortTitle}
        </h3>
        <div className="mt-5 grid gap-3">
          {tool.outputs.map((output, index) => (
            <div
              key={output}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
            >
              <span className="mr-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-semibold text-[color:var(--scooli-primary)]">
                {index + 1}
              </span>
              {output}
            </div>
          ))}
        </div>
      </div>
    </SurfacePanel>
  );
}

function FaqAndRelated({ tool }: { tool: ToolPageData }) {
  const t = useTranslations("tools.detail");
  const toolName = tool.shortTitle.toLowerCase();

  return (
    <section className="bg-white/70 py-10 sm:py-14 lg:py-16">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <SurfacePanel>
            <MarketingSectionHeading
              eyebrow={t("faq.eyebrow")}
              title={t("faq.title", { tool: toolName })}
              description={t("faq.description")}
            />
            <div className="mt-8">
              <TrackedFaqAccordion
                items={tool.faq}
                faqGroup={tool.slug}
                itemValuePrefix={`${tool.slug}-faq`}
                className="space-y-3"
                itemClassName="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 px-4"
                triggerClassName="py-4 text-left text-[15px] font-semibold text-[color:var(--scooli-ink)] hover:no-underline"
                contentClassName="text-sm leading-7 text-[color:var(--scooli-muted)]"
              />
            </div>
          </SurfacePanel>

          <SurfacePanel className="bg-[color:var(--scooli-surface-alt)]">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
              {t("related.eyebrow")}
            </p>
            <h3 className="mt-4 text-2xl font-semibold text-[color:var(--scooli-ink)]">
              {t("related.title")}
            </h3>
            <p className="mt-3 text-sm leading-7 text-[color:var(--scooli-muted)]">
              {t("related.description")}
            </p>
            <div className="mt-6 grid gap-3">
              {tool.relatedLinks.map((link) => (
                <TrackedLink
                  key={`${tool.slug}-${link.label}`}
                  href={link.href}
                  eventName="marketing_navigation_clicked"
                  eventProperties={{
                    location: "tool_related_links",
                    link_label: link.label.toLowerCase(),
                  }}
                  className="inline-flex items-center justify-between rounded-[22px] border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-[color:var(--scooli-ink)] transition-colors hover:border-[color:var(--scooli-primary)] hover:text-[color:var(--scooli-primary)]"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="h-4 w-4" />
                </TrackedLink>
              ))}
            </div>
          </SurfacePanel>
        </div>
      </Container>
    </section>
  );
}

function CtaSection({ tool }: { tool: ToolPageData }) {
  const t = useTranslations("tools.detail");
  const tCommon = useTranslations("common");

  return (
    <section className="py-10 sm:py-14 lg:py-16">
      <Container>
        <PageCtaBanner
          title={t("cta.title", { tool: tool.shortTitle.toLowerCase() })}
          description={t("cta.description")}
          secondaryHref="/ferramentas"
          secondaryLabel={tCommon("allTools")}
        />
      </Container>
    </section>
  );
}

// ─── Planning layout ──────────────────────────────────────────────────────────

type PlanningRow = { title: string; meta: string };
type PlanningVisual = {
  label: string;
  sub: string;
  badge: string;
  rows: PlanningRow[];
};

/** The mocked-up document in the hero is illustrative copy, so it is translated too. */
function visualKeyForSlug(slug: string) {
  if (slug === "sequencias-de-aulas" || slug === "planificacoes") {
    return slug;
  }
  return "default";
}

function PlanningHeroVisual({ slug }: { slug: string }) {
  const t = useTranslations("tools.detail.planning");
  const visual = t.raw(
    `visuals.${visualKeyForSlug(slug)}`,
  ) as PlanningVisual;

  return (
    <SurfacePanel className="bg-[color:var(--scooli-surface-alt)]">
      <div className="rounded-[22px] border border-slate-200 bg-white p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
              {t("createdWithScooli")}
            </p>
            <p className="mt-1 font-semibold text-slate-800">{visual.label}</p>
            <p className="text-sm text-slate-500">{visual.sub}</p>
          </div>
          <span className="shrink-0 rounded-full bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700">
            {visual.badge}
          </span>
        </div>
        <div className="mt-4 space-y-2">
          {visual.rows.map((row, index) => (
            <div
              key={row.title}
              className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[color:var(--scooli-accent)] text-xs font-bold text-[color:var(--scooli-primary)]">
                {index + 1}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800">{row.title}</p>
                <p className="text-xs text-slate-500">{row.meta}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2">
          <span className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-500">
            {t("editable")}
          </span>
          <span className="rounded-md bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-600">
            {slug === "sequencias-de-aulas"
              ? t("generateLessonPlan")
              : t("exportPdf")}
          </span>
        </div>
      </div>
    </SurfacePanel>
  );
}

function PlanningToolPage({ tool }: { tool: ToolPageData }) {
  const t = useTranslations("tools.detail");
  const tPlanning = useTranslations("tools.detail.planning");
  const tCommon = useTranslations("common");
  const Icon = toolCardIcons[tool.slug];
  const isSchedule = tool.slug === "sequencias-de-aulas";

  return (
    <PublicSiteShell>
      <PageHero
        eyebrow={t("eyebrowPlanning")}
        title={tool.hero}
        description={tool.description}
        secondaryHref="/ferramentas"
        secondaryLabel={tCommon("allTools")}
        aside={toolPreviewImages[tool.slug] ? <DocumentPreview tool={tool} /> : <PlanningHeroVisual slug={tool.slug} />}
      >
        <UseCaseChips items={tool.useCases} />
        <CurriculumNote className="max-w-2xl" />
      </PageHero>

      {/* What the document contains */}
      <section className="py-10 sm:py-14 lg:py-16">
        <Container className="space-y-8">
          <MarketingSectionHeading
            eyebrow={isSchedule ? tPlanning("structureEyebrow") : tPlanning("documentEyebrow")}
            title={isSchedule ? tPlanning("scheduleTitle") : tPlanning("documentTitle")}
            description={
              isSchedule
                ? tPlanning("scheduleDescription")
                : tPlanning("documentDescription")
            }
            centered
          />
          <div className="grid gap-5 sm:grid-cols-3">
            {tool.outputs.map((output, i) => (
              <SurfacePanel key={output} className="flex flex-col gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-sm font-bold text-[color:var(--scooli-primary)]">
                  {i + 1}
                </span>
                <p className="text-lg font-semibold text-[color:var(--scooli-ink)]">{output}</p>
              </SurfacePanel>
            ))}
          </div>
        </Container>
      </section>

      {/* Curriculum link + in practice */}
      <section className="bg-white/70 py-10 sm:py-14 lg:py-16">
        <Container className="space-y-8">
          <MarketingSectionHeading
            eyebrow={tPlanning("practiceEyebrow")}
            title={tPlanning("practiceTitle", { tool: tool.shortTitle.toLowerCase() })}
            description={tPlanning("practiceDescription")}
            centered
          />
          <div className="grid gap-5 lg:grid-cols-2">
            {tool.contentSections.map((section) => (
              <SurfacePanel key={section.title}>
                <h3 className="text-2xl font-semibold text-[color:var(--scooli-ink)]">
                  {section.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[color:var(--scooli-muted)] sm:text-[15px]">
                  {section.description}
                </p>
                {section.bullets && section.bullets.length > 0 && (
                  <div className="mt-5">
                    <Checklist items={section.bullets} />
                  </div>
                )}
              </SurfacePanel>
            ))}
          </div>
        </Container>
      </section>

      {/* Step by step */}
      <section className="py-10 sm:py-14 lg:py-16">
        <Container className="space-y-8">
          <MarketingSectionHeading
            eyebrow={tPlanning("howEyebrow")}
            title={isSchedule ? tPlanning("howScheduleTitle") : tPlanning("howDocumentTitle")}
            description={
              isSchedule
                ? tPlanning("howScheduleDescription")
                : tPlanning("howDocumentDescription")
            }
            centered
          />
          <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tool.howToSteps.map((step, i) => (
              <div key={step.name} className="relative">
                <SurfacePanel className="h-full">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--scooli-accent)] text-sm font-bold text-[color:var(--scooli-primary)]">
                    {i + 1}
                  </span>
                  <p className="mt-4 font-semibold text-[color:var(--scooli-ink)]">{step.name}</p>
                  <p className="mt-2 text-sm leading-7 text-[color:var(--scooli-muted)]">{step.text}</p>
                </SurfacePanel>
                {i < tool.howToSteps.length - 1 && (
                  <div className="absolute -right-2.5 top-8 z-10 hidden h-5 w-5 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 lg:flex">
                    <ArrowRight className="h-3 w-3" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* What you gain */}
      <section className="bg-white/70 py-10 sm:py-14 lg:py-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[auto_1fr]">
            <SurfacePanel className="lg:max-w-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-xl font-semibold text-[color:var(--scooli-ink)]">{t("whatYouGain")}</p>
              </div>
              <div className="mt-5">
                <Checklist items={tool.benefits} />
              </div>
            </SurfacePanel>
            <SurfacePanel className="bg-[color:var(--scooli-surface-alt)]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                {tPlanning("controlEyebrow")}
              </p>
              <p className="mt-4 text-2xl font-semibold leading-snug text-[color:var(--scooli-ink)]">
                {isSchedule
                  ? tPlanning("controlScheduleTitle")
                  : tPlanning("controlDocumentTitle")}
              </p>
              <p className="mt-4 text-sm leading-7 text-[color:var(--scooli-muted)]">
                {isSchedule
                  ? tPlanning("controlScheduleDescription")
                  : tPlanning("controlDocumentDescription")}
              </p>
            </SurfacePanel>
          </div>
        </Container>
      </section>

      <FaqAndRelated tool={tool} />
      <CtaSection tool={tool} />
    </PublicSiteShell>
  );
}

// ─── Assessment layout ────────────────────────────────────────────────────────

type AssessmentStat = { value: string; label: string; source: string };
type QuestionType = { symbol: string; label: string; detail: string };

function AssessmentToolPage({ tool }: { tool: ToolPageData }) {
  const t = useTranslations("tools.detail");
  const tAssessment = useTranslations("tools.detail.assessment");
  const tCommon = useTranslations("common");
  const Icon = toolCardIcons[tool.slug];

  const stats = tAssessment.raw("stats") as AssessmentStat[];
  const questionTypes = tAssessment.raw("questionTypes") as QuestionType[];

  return (
    <PublicSiteShell>
      <PageHero
        eyebrow={t("eyebrowAssessment")}
        title={tool.hero}
        description={tool.description}
        secondaryHref="/ferramentas"
        secondaryLabel={tCommon("allTools")}
        aside={<DocumentPreview tool={tool} />}
      >
        <UseCaseChips items={tool.useCases} />
        <CurriculumNote className="max-w-2xl" />
      </PageHero>

      {/* Stats strip */}
      <div className="border-y border-slate-200/70 bg-white">
        <Container className="py-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:gap-16">
            {stats.map((stat) => (
              <div key={stat.value} className="flex items-start gap-5">
                <p className="font-display text-4xl text-[color:var(--scooli-ink)] sm:text-5xl">
                  {stat.value}
                </p>
                <div>
                  <p className="text-sm leading-7 text-[color:var(--scooli-muted)]">{stat.label}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                    {stat.source}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Question formats */}
      <section className="py-10 sm:py-14 lg:py-16">
        <Container className="space-y-8">
          <MarketingSectionHeading
            eyebrow={tAssessment("formatsEyebrow")}
            title={tAssessment("formatsTitle")}
            description={tAssessment("formatsDescription")}
            centered
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {questionTypes.map((qt) => (
              <SurfacePanel key={qt.label} className="text-center">
                <p className="font-display text-3xl text-[color:var(--scooli-primary)]">
                  {qt.symbol}
                </p>
                <p className="mt-4 font-semibold text-[color:var(--scooli-ink)]">{qt.label}</p>
                <p className="mt-2 text-sm leading-6 text-[color:var(--scooli-muted)]">{qt.detail}</p>
              </SurfacePanel>
            ))}
          </div>
        </Container>
      </section>

      {/* Benefits + content */}
      <section className="bg-white/70 py-10 sm:py-14 lg:py-16">
        <Container className="space-y-8">
          <MarketingSectionHeading
            eyebrow={tAssessment("practiceEyebrow")}
            title={tAssessment("practiceTitle", { tool: tool.shortTitle.toLowerCase() })}
            description={tAssessment("practiceDescription")}
            centered
          />
          <div className="grid gap-5 lg:grid-cols-[1fr_auto]">
            <div className="grid gap-5 lg:grid-cols-2">
              {tool.contentSections.map((section) => (
                <SurfacePanel key={section.title}>
                  <h3 className="text-xl font-semibold text-[color:var(--scooli-ink)]">
                    {section.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--scooli-muted)]">
                    {section.description}
                  </p>
                  {section.bullets && section.bullets.length > 0 && (
                    <div className="mt-4">
                      <Checklist items={section.bullets} />
                    </div>
                  )}
                </SurfacePanel>
              ))}
            </div>
            <SurfacePanel className="lg:w-64">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-5 text-xl font-semibold text-[color:var(--scooli-ink)]">{t("whatYouGain")}</p>
              <div className="mt-4">
                <Checklist items={tool.benefits} />
              </div>
            </SurfacePanel>
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="py-10 sm:py-14 lg:py-16">
        <Container className="space-y-8">
          <MarketingSectionHeading
            eyebrow={tAssessment("howEyebrow")}
            title={tAssessment("howTitle")}
            description={tAssessment("howDescription")}
            centered
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tool.howToSteps.map((step, i) => (
              <SurfacePanel key={step.name} className="relative">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--scooli-accent)] text-sm font-bold text-[color:var(--scooli-primary)]">
                  {i + 1}
                </span>
                <p className="mt-4 font-semibold text-[color:var(--scooli-ink)]">{step.name}</p>
                <p className="mt-2 text-sm leading-7 text-[color:var(--scooli-muted)]">{step.text}</p>
              </SurfacePanel>
            ))}
          </div>
        </Container>
      </section>

      <FaqAndRelated tool={tool} />
      <CtaSection tool={tool} />
    </PublicSiteShell>
  );
}

// ─── Default layout ───────────────────────────────────────────────────────────

function DefaultToolPage({ tool }: { tool: ToolPageData }) {
  const t = useTranslations("tools.detail");
  const tDefault = useTranslations("tools.detail.default");
  const tCommon = useTranslations("common");
  const Icon = toolCardIcons[tool.slug];

  return (
    <PublicSiteShell>
      <PageHero
        eyebrow={t("eyebrowDefault")}
        title={tool.hero}
        description={tool.description}
        secondaryHref="/professores"
        secondaryLabel={tCommon("teacherJourney")}
        aside={<DocumentPreview tool={tool} />}
      >
        <UseCaseChips items={tool.useCases} />
        <CurriculumNote className="max-w-2xl" />
      </PageHero>

      {/* What you gain + use cases */}
      <section className="py-10 sm:py-14 lg:py-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <SurfacePanel>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-xl font-semibold text-[color:var(--scooli-ink)]">{t("whatYouGain")}</p>
              </div>
              <div className="mt-5">
                <Checklist items={tool.benefits} />
              </div>
            </SurfacePanel>

            <SurfacePanel className="bg-[color:var(--scooli-surface-alt)]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                {tDefault("whenEyebrow")}
              </p>
              <p className="mt-4 text-2xl font-semibold text-[color:var(--scooli-ink)]">
                {tDefault("whenTitle")}
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {tool.useCases.map((useCase) => (
                  <div
                    key={useCase}
                    className="rounded-2xl border border-slate-200 bg-white p-4"
                  >
                    <CheckCircle2 className="h-5 w-5 text-[color:var(--scooli-primary)]" />
                    <p className="mt-3 font-semibold text-slate-800">{useCase}</p>
                  </div>
                ))}
              </div>
            </SurfacePanel>
          </div>
        </Container>
      </section>

      {/* In practice */}
      <section className="bg-white/70 py-10 sm:py-14 lg:py-16">
        <Container className="space-y-8">
          <MarketingSectionHeading
            eyebrow={tDefault("practiceEyebrow")}
            title={tDefault("practiceTitle", { tool: tool.shortTitle.toLowerCase() })}
            description={tDefault("practiceDescription")}
            centered
          />
          <div className="grid gap-5 lg:grid-cols-2">
            {tool.contentSections.map((section) => (
              <SurfacePanel key={section.title}>
                <h3 className="text-2xl font-semibold text-[color:var(--scooli-ink)]">
                  {section.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[color:var(--scooli-muted)] sm:text-[15px]">
                  {section.description}
                </p>
                {section.bullets && section.bullets.length > 0 && (
                  <div className="mt-5">
                    <Checklist items={section.bullets} />
                  </div>
                )}
              </SurfacePanel>
            ))}
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="py-10 sm:py-14 lg:py-16">
        <Container className="space-y-8">
          <MarketingSectionHeading
            eyebrow={tDefault("howEyebrow")}
            title={tDefault("howTitle")}
            description={tDefault("howDescription")}
            centered
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tool.howToSteps.map((step, i) => (
              <SurfacePanel key={step.name}>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--scooli-accent)] text-sm font-bold text-[color:var(--scooli-primary)]">
                  {i + 1}
                </span>
                <p className="mt-4 font-semibold text-[color:var(--scooli-ink)]">{step.name}</p>
                <p className="mt-2 text-sm leading-7 text-[color:var(--scooli-muted)]">{step.text}</p>
              </SurfacePanel>
            ))}
          </div>
        </Container>
      </section>

      <FaqAndRelated tool={tool} />
      <CtaSection tool={tool} />
    </PublicSiteShell>
  );
}

// ─── Router ───────────────────────────────────────────────────────────────────

export function ToolLandingPage({ tool }: { tool: ToolPageData }) {
  if (tool.layout === "planning") { return <PlanningToolPage tool={tool} />; }
  if (tool.layout === "assessment") { return <AssessmentToolPage tool={tool} />; }
  return <DefaultToolPage tool={tool} />;
}
