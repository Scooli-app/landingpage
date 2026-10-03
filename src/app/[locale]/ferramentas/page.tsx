import { Container } from "@/components/Container";
import { CurriculumNote } from "@/components/CurriculumNote";
import { getToolPages, toolCardIcons } from "@/components/marketing/data";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getPageMetadata } from "@/lib/seo";
import {
  PageCtaBanner,
  PageHero,
  PublicSiteShell,
  SurfacePanel,
} from "@/components/marketing/shared";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import Image from "next/image";

const toolScreenshots: Record<string, string> = {
  "planificacoes":        "/screenshots/landing-planificacoes.jpg",
  "plano-de-aula":        "/screenshots/landing-plano-aula.jpg",
  "sequencias-de-aulas":  "/screenshots/landing-sequencias.jpg",
  "gerador-de-testes":    "/screenshots/landing-testes.jpg",
  "fichas-de-trabalho":   "/screenshots/landing-fichas.jpg",
  "quizzes":              "/screenshots/landing-quizzes.jpg",
  "apresentacoes":        "/screenshots/landing-apresentacoes.jpg",
  "adaptacao-de-materiais": "/screenshots/landing-adaptacao.jpg",
  "carregar-documentos":  "/screenshots/landing-carregar.jpg",
};

/** Category membership is structural; the labels come from the catalogues. */
const categories = [
  { key: "planning", slugs: ["planificacoes", "plano-de-aula", "sequencias-de-aulas"] },
  { key: "assessment", slugs: ["gerador-de-testes", "quizzes"] },
  {
    key: "content",
    slugs: ["fichas-de-trabalho", "apresentacoes", "adaptacao-de-materiais", "carregar-documentos"],
  },
] as const;

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
  "teaching plan generator",
  "AI quiz generator",
  "AI presentation generator",
  "material adaptation",
];

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
  const toolPages = getToolPages(locale);

  return <ToolsIndexContent toolPages={toolPages} />;
}

function ToolsIndexContent({
  toolPages,
}: {
  toolPages: ReturnType<typeof getToolPages>;
}) {
  const t = useTranslations("tools.index");
  const tCommon = useTranslations("common");

  return (
    <PublicSiteShell>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        secondaryHref="/professores"
        secondaryLabel={tCommon("teacherJourney")}
      >
        <CurriculumNote className="max-w-2xl" />
      </PageHero>

      <section className="py-20 sm:py-24 lg:py-28">
        <Container className="space-y-20">
          {categories.map((category) => {
            const tools = category.slugs
              .map((slug) => toolPages.find((tool) => tool.slug === slug))
              .filter((tool): tool is (typeof toolPages)[number] => Boolean(tool));

            return (
              <div key={category.key} className="space-y-8">
                <div className="max-w-2xl">
                  <h2 className="text-2xl font-semibold text-[color:var(--scooli-ink)]">
                    {t(`categories.${category.key}.label`)}
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-[color:var(--scooli-muted)]">
                    {t(`categories.${category.key}.description`)}
                  </p>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {tools.map((tool) => {
                    const Icon = toolCardIcons[tool.slug];
                    return (
                      <SurfacePanel key={tool.slug} className="flex flex-col overflow-hidden !p-0">
                        {toolScreenshots[tool.slug] && (
                          <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                            <Image
                              src={toolScreenshots[tool.slug]}
                              alt={t("previewAlt", { tool: tool.shortTitle })}
                              fill
                              className="object-cover object-top"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          </div>
                        )}
                        <div className="flex flex-1 flex-col p-6">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
                            <Icon className="h-4 w-4" />
                          </div>
                          <h3 className="mt-4 text-lg font-semibold text-[color:var(--scooli-ink)]">
                            {tool.shortTitle}
                          </h3>
                          <p className="mt-2 flex-1 text-sm leading-7 text-[color:var(--scooli-muted)]">
                            {tool.description}
                          </p>
                          <Link
                            href={{
                              pathname: "/ferramentas/[slug]",
                              params: { slug: tool.slug },
                            }}
                            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--scooli-primary)]"
                          >
                            {t("seeTool", { tool: tool.shortTitle.toLowerCase() })}
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </SurfacePanel>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </Container>
      </section>

      <section className="pb-20 sm:pb-24 lg:pb-28">
        <Container>
          <PageCtaBanner
            title={t("ctaTitle")}
            description={t("ctaDescription")}
            secondaryHref="/biblioteca"
            secondaryLabel={t("ctaSecondary")}
          />
        </Container>
      </section>
    </PublicSiteShell>
  );
}
