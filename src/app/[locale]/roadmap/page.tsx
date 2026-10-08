import { PageSchemas } from "@/components/marketing/PageSchemas";
import { PageHero, PublicSiteShell } from "@/components/marketing/shared";
import { RoadmapJourney } from "@/components/marketing/RoadmapJourney";
import { Section } from "@/components/site/primitives";
import { TrackedLink } from "@/components/TrackedLink";
import type { Locale } from "@/i18n/routing";
import { getPageMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "roadmap.meta" });

  return getPageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/roadmap",
    locale,
  });
}

/**
 * The public roadmap: available, in development, next. No dates. Anything not
 * shipped stays in the last two columns and is worded as such.
 */
export default async function RoadmapPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "roadmap" });

  const tPageMeta = await getTranslations({ locale, namespace: "roadmap.meta" });

  return (
    <PublicSiteShell>
      <PageSchemas
        id="roadmap"
        path="/roadmap"
        locale={locale}
        title={tPageMeta("title")}
        description={tPageMeta("description")}
      />
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        showActions={false}
      />

      <Section aria-label={t("hero.title")}>
        <RoadmapJourney />

        <p data-reveal className="mt-12 text-[16px] text-subtle">
          {t("suggest.text")}{" "}
          <TrackedLink
            href="/contacto"
            eventName="marketing_navigation_clicked"
            eventProperties={{ location: "roadmap_suggest", link_label: "contact" }}
            className="font-medium text-violet-ink hover:underline"
          >
            {t("suggest.link")} →
          </TrackedLink>
        </p>
      </Section>
    </PublicSiteShell>
  );
}
