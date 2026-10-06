import { TrackedFaqAccordion } from "@/components/TrackedFaqAccordion";
import { TrackedLink } from "@/components/TrackedLink";
import {
  DividerGrid,
  DividerItem,
  Kicker,
  Section,
  SectionHeader,
  WindowFrame,
} from "@/components/site/primitives";
import { cn } from "@/lib/utils";
import { ResourcePreview } from "@/components/homepage/ResourcesSection";
import { NAV_TOOL_SLUGS, type NavToolSlug } from "@/components/site/nav-data";
import { useTranslations } from "next-intl";
import type { ToolPageData } from "./data";
import { Checklist, PageCtaBanner, PageHero, PublicSiteShell } from "./shared";

/**
 * One template for every tool page. The three layouts ("planning",
 * "assessment", default) keep their own copy — headings, the planning
 * mock-up, the assessment question formats — but share one structure:
 * hero → what's inside → in practice → how it works → what you gain → FAQ.
 */

type PlanningVisual = {
  label: string;
  sub: string;
  badge: string;
  rows: { title: string; meta: string }[];
};
type AssessmentStat = { value: string; label: string; source: string };
type QuestionType = { symbol: string; label: string; detail: string };

const isNavToolSlug = (slug: string): slug is NavToolSlug =>
  (NAV_TOOL_SLUGS as readonly string[]).includes(slug);

/** The mocked-up document in the hero is illustrative copy, so it is translated too. */
function visualKeyForSlug(slug: string) {
  return slug === "sequencias-de-aulas" || slug === "planificacoes" ? slug : "default";
}

function HeroPreview({ tool }: { tool: ToolPageData }) {
  const t = useTranslations("tools.detail");
  const tPlanning = useTranslations("tools.detail.planning");
  const tResources = useTranslations("home.resources.items");

  // The six core tools show a real document generated in the app.
  if (isNavToolSlug(tool.slug)) {
    return (
      <div className="h-[440px] overflow-hidden rounded-xl border border-line-strong bg-stone-soft px-8 pt-8 md:h-[480px] md:px-10 md:pt-10">
        <ResourcePreview slug={tool.slug} alt={tResources(`${tool.slug}.previewAlt`)} />
      </div>
    );
  }

  // Planning tools without a capture get the drawn document outline.
  if (tool.layout === "planning") {
    const visual = tPlanning.raw(`visuals.${visualKeyForSlug(tool.slug)}`) as PlanningVisual;

    return (
      <WindowFrame>
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Kicker>{tPlanning("createdWithScooli")}</Kicker>
              <p className="mt-2 font-display text-2xl font-medium text-ink">{visual.label}</p>
              <p className="text-sm text-subtle">{visual.sub}</p>
            </div>
            <span className="shrink-0 rounded-full bg-tag-green px-2 py-1 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-tag-green-ink">
              {visual.badge}
            </span>
          </div>
          <ol className="mt-6 border-t border-line">
            {visual.rows.map((row, index) => (
              <li key={row.title} className="flex gap-4 border-b border-line py-3.5">
                <span className="font-mono text-xs text-faint">0{index + 1}</span>
                <span>
                  <span className="block text-[15px] font-medium text-ink">{row.title}</span>
                  <span className="block text-[13px] text-subtle">{row.meta}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </WindowFrame>
    );
  }

  // Everything else: the outline of what the tool produces.
  return (
    <WindowFrame>
      <div className="p-6 md:p-8">
        <Kicker>{t("typicalOutput")}</Kicker>
        <p className="mt-2 font-display text-2xl font-medium text-ink">{tool.shortTitle}</p>
        <ol className="mt-6 border-t border-line">
          {tool.outputs.map((output, index) => (
            <li key={output} className="flex gap-4 border-b border-line py-3.5 text-[15px] text-ink">
              <span className="font-mono text-xs text-faint">0{index + 1}</span>
              {output}
            </li>
          ))}
        </ol>
      </div>
    </WindowFrame>
  );
}

export function ToolLandingPage({ tool }: { tool: ToolPageData }) {
  const t = useTranslations("tools.detail");
  const tPlanning = useTranslations("tools.detail.planning");
  const tAssessment = useTranslations("tools.detail.assessment");
  const tDefault = useTranslations("tools.detail.default");
  const tCommon = useTranslations("common");

  const layout = tool.layout ?? "default";
  const isSchedule = tool.slug === "sequencias-de-aulas";
  const toolName = tool.shortTitle.toLowerCase();

  const eyebrow =
    layout === "planning"
      ? t("eyebrowPlanning")
      : layout === "assessment"
        ? t("eyebrowAssessment")
        : t("eyebrowDefault");

  const practice =
    layout === "planning"
      ? {
          kicker: tPlanning("practiceEyebrow"),
          title: tPlanning("practiceTitle", { tool: toolName }),
          description: tPlanning("practiceDescription"),
        }
      : layout === "assessment"
        ? {
            kicker: tAssessment("practiceEyebrow"),
            title: tAssessment("practiceTitle", { tool: toolName }),
            description: tAssessment("practiceDescription"),
          }
        : {
            kicker: tDefault("practiceEyebrow"),
            title: tDefault("practiceTitle", { tool: toolName }),
            description: tDefault("practiceDescription"),
          };

  const how =
    layout === "planning"
      ? {
          kicker: tPlanning("howEyebrow"),
          title: isSchedule ? tPlanning("howScheduleTitle") : tPlanning("howDocumentTitle"),
          description: isSchedule
            ? tPlanning("howScheduleDescription")
            : tPlanning("howDocumentDescription"),
        }
      : layout === "assessment"
        ? {
            kicker: tAssessment("howEyebrow"),
            title: tAssessment("howTitle"),
            description: tAssessment("howDescription"),
          }
        : {
            kicker: tDefault("howEyebrow"),
            title: tDefault("howTitle"),
            description: tDefault("howDescription"),
          };

  const stats = layout === "assessment" ? (tAssessment.raw("stats") as AssessmentStat[]) : [];
  const questionTypes =
    layout === "assessment" ? (tAssessment.raw("questionTypes") as QuestionType[]) : [];

  return (
    <PublicSiteShell>
      <PageHero
        eyebrow={eyebrow}
        title={tool.hero}
        description={tool.description}
        secondaryHref="/ferramentas"
        secondaryLabel={tCommon("allTools")}
        aside={<HeroPreview tool={tool} />}
      >
        <Checklist items={tool.useCases} />
      </PageHero>

      {stats.length > 0 && (
        <section className="border-b border-line py-12">
          <div className="mx-auto grid w-full max-w-[1248px] gap-8 px-6 sm:grid-cols-2 lg:gap-16">
            {stats.map((stat) => (
              <div key={stat.value} data-reveal className="flex items-start gap-5">
                <p className="shrink-0 font-display text-[40px] font-medium leading-none tracking-[-0.02em] text-ink">
                  {stat.value}
                </p>
                <div>
                  <p className="text-[15px] leading-relaxed text-body">{stat.label}</p>
                  <p className="mt-1 font-mono text-xs text-faint">{stat.source}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* What's inside: the document's sections, or the question formats. */}
      <Section aria-labelledby="tool-inside-title">
        {layout === "assessment" ? (
          <>
            <SectionHeader
              id="tool-inside-title"
              kicker={tAssessment("formatsEyebrow")}
              title={tAssessment("formatsTitle")}
              description={tAssessment("formatsDescription")}
            />
            <DividerGrid columns={4}>
              {questionTypes.map((type) => (
                <DividerItem key={type.label} label={type.symbol} title={type.label}>
                  {type.detail}
                </DividerItem>
              ))}
            </DividerGrid>
          </>
        ) : (
          <>
            <SectionHeader
              id="tool-inside-title"
              kicker={
                layout === "planning"
                  ? isSchedule
                    ? tPlanning("structureEyebrow")
                    : tPlanning("documentEyebrow")
                  : t("typicalOutput")
              }
              title={
                layout === "planning" && isSchedule
                  ? tPlanning("scheduleTitle")
                  : tPlanning("documentTitle")
              }
              description={
                layout === "planning"
                  ? isSchedule
                    ? tPlanning("scheduleDescription")
                    : tPlanning("documentDescription")
                  : undefined
              }
            />
            <DividerGrid columns={3}>
              {tool.outputs.map((output, index) => (
                <DividerItem key={output} label={`0${index + 1}`} title={output} />
              ))}
            </DividerGrid>
          </>
        )}
      </Section>

      <Section tone="stone" aria-labelledby="tool-practice-title">
        <SectionHeader
          id="tool-practice-title"
          kicker={practice.kicker}
          title={practice.title}
          description={practice.description}
        />
        <div className="grid gap-4 lg:grid-cols-2">
          {tool.contentSections.map((section) => (
            <div key={section.title} data-reveal className="rounded-xl border border-line-strong bg-white p-7 md:p-9">
              <h3 className="font-display text-2xl font-medium leading-snug tracking-[-0.01em] text-ink">
                {section.title}
              </h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-subtle">{section.description}</p>
              {section.bullets && section.bullets.length > 0 && (
                <div className="mt-5">
                  <Checklist items={section.bullets} />
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section aria-labelledby="tool-how-title">
        <SectionHeader
          id="tool-how-title"
          kicker={how.kicker}
          title={how.title}
          description={how.description}
        />
        <DividerGrid columns={4}>
          {tool.howToSteps.map((step, index) => (
            <DividerItem key={step.name} label={`0${index + 1}`} title={step.name}>
              {step.text}
            </DividerItem>
          ))}
        </DividerGrid>
      </Section>

      <Section tone="stone" aria-labelledby="tool-gain-title">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div data-reveal>
            <h2
              id="tool-gain-title"
              className="font-display text-[clamp(28px,3vw,36px)] font-medium leading-tight tracking-[-0.02em] text-ink"
            >
              {t("whatYouGain")}
            </h2>
            <div className="mt-6">
              <Checklist items={tool.benefits} />
            </div>
          </div>
          {layout === "planning" && (
            <div data-reveal className="border-t border-line-strong pt-7 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
              <Kicker>{tPlanning("controlEyebrow")}</Kicker>
              <p className="mt-3 font-display text-2xl font-medium leading-snug text-ink">
                {isSchedule ? tPlanning("controlScheduleTitle") : tPlanning("controlDocumentTitle")}
              </p>
              <p className="mt-3 text-[15.5px] leading-relaxed text-subtle">
                {isSchedule
                  ? tPlanning("controlScheduleDescription")
                  : tPlanning("controlDocumentDescription")}
              </p>
            </div>
          )}
        </div>
      </Section>

      <Section aria-labelledby="tool-faq-title">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16">
          <div>
            <SectionHeader
              id="tool-faq-title"
              kicker={t("faq.eyebrow")}
              title={t("faq.title", { tool: toolName })}
              description={t("faq.description")}
              className="mb-8 md:mb-8"
            />
            <TrackedFaqAccordion
              items={tool.faq}
              faqGroup={tool.slug}
              itemValuePrefix={`${tool.slug}-faq`}
              className="border-t border-line"
            />
          </div>
          <aside data-reveal className="self-start rounded-xl bg-stone-soft p-7">
            <Kicker>{t("related.eyebrow")}</Kicker>
            <p className="mt-3 text-xl font-semibold text-ink">{t("related.title")}</p>
            <p className="mt-2 text-[15px] leading-relaxed text-subtle">{t("related.description")}</p>
            <ul className="mt-5 border-t border-line-strong">
              {tool.relatedLinks.map((link) => (
                <li key={`${tool.slug}-${link.label}`} className="border-b border-line-strong">
                  <TrackedLink
                    href={link.href}
                    eventName="marketing_navigation_clicked"
                    eventProperties={{
                      location: "tool_related_links",
                      link_label: link.label.toLowerCase(),
                    }}
                    className={cn(
                      "flex items-center justify-between gap-4 py-3.5 text-[15px] text-ink transition-colors hover:text-violet-ink",
                    )}
                  >
                    {link.label}
                    <span aria-hidden className="text-subtle">→</span>
                  </TrackedLink>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <div className="mt-20 md:mt-28">
          <PageCtaBanner
            title={t("cta.title", { tool: toolName })}
            description={t("cta.description")}
            secondaryHref="/ferramentas"
            secondaryLabel={tCommon("allTools")}
          />
        </div>
      </Section>
    </PublicSiteShell>
  );
}
