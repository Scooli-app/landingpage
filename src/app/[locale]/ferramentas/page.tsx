import { PageSchemas } from "@/components/marketing/PageSchemas";
import { resourceIcons } from "@/components/homepage/ResourcesSection";
import { getToolPages } from "@/components/marketing/data";
import { PageCtaBanner, PageHero, PublicSiteShell } from "@/components/marketing/shared";
import { NAV_TOOL_SLUGS } from "@/components/site/nav-data";
import { Section, SectionHeader } from "@/components/site/primitives";
import { TrackedLink } from "@/components/TrackedLink";
import type { Locale } from "@/i18n/routing";
import { getPageMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";

const ptKeywords = [
  "ferramentas para professores",
  "gerador de fichas de trabalho",
  "gerador de testes",
  "planificações com IA",
  "plano de aula com IA",
  "sequências de aulas",
  "quizzes com IA",
  "apresentações com IA",
  "adaptação de materiais",
];

const enKeywords = [
  "tools for teachers",
  "AI worksheet generator",
  "AI test generator",
  "AI lesson planning",
  "AI lesson plan generator",
  "yearly plan generator",
  "AI quiz generator",
  "AI presentation generator",
  "material adaptation",
];

/** The tools that are not among the six main resources, in order. */
const moreToolSlugs = ["sequencias-de-aulas", "adaptacao-de-materiais", "carregar-documentos"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tools.index" });

  return getPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/ferramentas",
    keywords: locale === "en" ? enKeywords : ptKeywords,
    locale,
  });
}

export default async function ToolsIndexPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const toolPages = getToolPages(locale);
  const tIndex = await getTranslations({ locale, namespace: "tools.index" });

  return (
    <>
      <PageSchemas
        id="tools"
        path="/ferramentas"
        locale={locale}
        type="CollectionPage"
        title={tIndex("metaTitle")}
        description={tIndex("metaDescription")}
      />
      <ToolsIndexContent toolPages={toolPages} />
    </>
  );
}

type ToolPages = ReturnType<typeof getToolPages>;

function ToolsIndexContent({ toolPages }: { toolPages: ToolPages }) {
  const t = useTranslations("tools.index");
  const tCommon = useTranslations("common");
  const find = (slug: string) => toolPages.find((tool) => tool.slug === slug);

  return (
    <PublicSiteShell>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        secondaryHref="/professores"
        secondaryLabel={tCommon("teacherJourney")}
      />

      <Section aria-labelledby="tools-main-title">
        <SectionHeader
          id="tools-main-title"
          title={t("groups.main.label")}
          description={t("groups.main.description")}
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {NAV_TOOL_SLUGS.map((slug, index) => {
            const tool = find(slug);
            if (!tool) {return null;}
            const Icon = resourceIcons[slug];

            return (
              <li key={slug} data-reveal style={{ "--reveal-delay": `${(index % 3) * 80}ms` } as React.CSSProperties}>
                <TrackedLink
                  href={{ pathname: "/ferramentas/[slug]", params: { slug } }}
                  eventName="marketing_navigation_clicked"
                  eventProperties={{ location: "tools_index", link_label: slug }}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-line-strong bg-white transition-colors hover:border-[#C9C8C3]"
                >
                  <div className="px-6 pt-6">
                    <span className="grid size-11 place-items-center rounded-lg bg-stone-soft text-ink transition-colors group-hover:bg-violet-wash group-hover:text-violet-ink">
                      <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6 pt-5">
                    <h3 className="text-lg font-semibold text-ink">{tool.shortTitle}</h3>
                    <p className="mt-1.5 flex-1 text-[15px] leading-relaxed text-subtle">
                      {tool.description}
                    </p>
                    <span className="mt-5 text-[15px] font-medium text-violet-ink">
                      {t("seeTool", { tool: tool.shortTitle.toLowerCase() })} →
                    </span>
                  </div>
                </TrackedLink>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section tone="stone" aria-labelledby="tools-more-title">
        <SectionHeader
          id="tools-more-title"
          title={t("groups.more.label")}
          description={t("groups.more.description")}
        />
        <ul className="grid border-t border-line-strong md:grid-cols-3">
          {moreToolSlugs.map((slug) => {
            const tool = find(slug);
            if (!tool) {return null;}

            return (
              <li
                key={slug}
                data-reveal
                className="border-b border-line-strong md:border-b-0 md:px-7 md:first:pl-0 md:[&+li]:border-l md:[&+li]:border-line-strong"
              >
                <TrackedLink
                  href={{ pathname: "/ferramentas/[slug]", params: { slug } }}
                  eventName="marketing_navigation_clicked"
                  eventProperties={{ location: "tools_index", link_label: slug }}
                  className="group block py-7"
                >
                  <h3 className="text-[17px] font-semibold text-ink group-hover:text-violet-ink">
                    {tool.shortTitle} →
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-subtle">{tool.description}</p>
                </TrackedLink>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section>
        <PageCtaBanner
          title={t("ctaTitle")}
          description={t("ctaDescription")}
          secondaryHref="/professores"
          secondaryLabel={t("ctaSecondary")}
        />
      </Section>
    </PublicSiteShell>
  );
}
