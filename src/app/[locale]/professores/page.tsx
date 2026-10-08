import { PageSchemas } from "@/components/marketing/PageSchemas";
import { ResourcesSection } from "@/components/homepage/ResourcesSection";
import { YearSection } from "@/components/homepage/YearSection";
import {
  Checklist,
  PageCtaBanner,
  PageHero,
  PublicSiteShell,
} from "@/components/marketing/shared";
import {
  DividerGrid,
  DividerItem,
  Section,
  SectionHeader,
  WindowFrame,
} from "@/components/site/primitives";
import { Container } from "@/components/Container";
import { LoopingVideo } from "@/components/site/LoopingVideo";
import type { Locale } from "@/i18n/routing";
import { appMedia } from "@/lib/app-media";
import { getPageMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "teachers.meta" });

  return getPageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/professores",
    locale,
  });
}

type Item = { label?: string; title: string; description: string };

/**
 * Same argument as the homepage, from the teacher's side: the week gets
 * shorter, the year stays organised, the resources are ready. The community
 * library (formerly /biblioteca) lives here under #biblioteca.
 */
export default async function TeachersPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "teachers" });
  const days = t.raw("week.days") as Item[];
  const libraryPoints = t.raw("library.points") as Item[];

  const tPageMeta = await getTranslations({ locale, namespace: "teachers.meta" });

  return (
    <PublicSiteShell>
      <PageSchemas
        id="professores"
        path="/professores"
        locale={locale}
        title={tPageMeta("title")}
        description={tPageMeta("description")}
      />
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        secondaryHref="/precos"
        secondaryLabel={t("hero.secondaryLabel")}
        aside={
          <WindowFrame>
            <LoopingVideo video={appMedia(locale).stepFilms[1]} label={t("hero.imageAlt")} priority />
          </WindowFrame>
        }
      >
        <Checklist items={t.raw("hero.checklist") as string[]} />
      </PageHero>

      <Section aria-labelledby="teachers-week-title">
        <SectionHeader
          id="teachers-week-title"
          kicker={t("week.kicker")}
          title={t("week.title")}
          description={t("week.description")}
        />
        <DividerGrid columns={3}>
          {days.map((day) => (
            <DividerItem key={day.title} label={day.label} title={day.title}>
              {day.description}
            </DividerItem>
          ))}
        </DividerGrid>
      </Section>

      <YearSection />
      <ResourcesSection />

      <section
        id="biblioteca"
        aria-labelledby="teachers-library-title"
        className="scroll-mt-20 bg-stone py-[88px] md:py-32"
      >
        <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <SectionHeader
              id="teachers-library-title"
              kicker={t("library.kicker")}
              title={t("library.title")}
              description={t("library.description")}
              className="mb-10 md:mb-10"
            />
            <div className="border-t border-line-strong">
              {libraryPoints.map((point) => (
                <DividerItem
                  key={point.title}
                  title={point.title}
                  className="border-b border-line-strong py-5"
                >
                  {point.description}
                </DividerItem>
              ))}
            </div>
          </div>
          <div data-reveal>
            <WindowFrame>
              <Image
                src={appMedia(locale).library.src}
                alt={t("library.imageAlt")}
                width={appMedia(locale).library.width}
                height={appMedia(locale).library.height}
                sizes="(min-width: 1024px) 660px, 100vw"
                className="w-full"
              />
            </WindowFrame>
          </div>
        </Container>
      </section>

      <Section>
        <PageCtaBanner
          title={t("finalCta.title")}
          description={t("finalCta.description")}
          secondaryHref="/precos"
          secondaryLabel={t("finalCta.secondaryLabel")}
        />
      </Section>
    </PublicSiteShell>
  );
}
