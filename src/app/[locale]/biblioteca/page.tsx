import { Container } from "@/components/Container";
import { getLibraryPageCards } from "@/components/marketing/data";
import type { Locale } from "@/i18n/routing";
import {
  Checklist,
  MarketingSectionHeading,
  PageCtaBanner,
  PageHero,
  PublicSiteShell,
  SurfacePanel,
} from "@/components/marketing/shared";
import { getPageMetadata } from "@/lib/seo";
import Image from "next/image";
import { BookCopy, FolderSearch, LibraryBig, LockKeyhole } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "library.meta" });

  return getPageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/biblioteca",
    locale,
  });
}

async function LibraryPreviewGrid({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "library.preview" });

  return (
    <SurfacePanel className="bg-[color:var(--scooli-surface-alt)]">
      <div className="space-y-4">
        <div className="flex items-center gap-3 rounded-[24px] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500">
          <FolderSearch className="h-4 w-4 text-[color:var(--scooli-primary)]" />
          {t("searchNote")}
        </div>
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-950 shadow-[0_24px_60px_-40px_rgba(19,35,58,0.55)]">
          <Image
            src="/screenshots/biblioteca.png"
            alt={t("imageAlt")}
            width={1600}
            height={900}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="h-auto w-full object-cover object-top"
          />
        </div>
      </div>
    </SurfacePanel>
  );
}

export default async function LibraryPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const libraryPageCards = getLibraryPageCards(locale);
  const t = await getTranslations({ locale, namespace: "library" });
  const heroChecklist = t.raw("hero.checklist") as string[];
  const howItWorksCards = t.raw("howItWorks.cards") as {
    title: string;
    description: string;
  }[];
  const howItWorksIcons = [LibraryBig, BookCopy, LockKeyhole];

  return (
    <PublicSiteShell>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        secondaryHref="/professores"
        secondaryLabel={t("hero.secondaryLabel")}
        aside={<LibraryPreviewGrid locale={locale} />}
      >
        <Checklist items={heroChecklist} />
      </PageHero>

      <section className="py-20 sm:py-24 lg:py-28">
        <Container className="space-y-12">
          <MarketingSectionHeading
            eyebrow={t("howItWorks.eyebrow")}
            title={t("howItWorks.title")}
            description={t("howItWorks.description")}
            centered
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {howItWorksCards.map((card, index) => {
              const Icon = howItWorksIcons[index];
              return (
                <SurfacePanel key={card.title}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-[color:var(--scooli-ink)]">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--scooli-muted)]">
                    {card.description}
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
            eyebrow={t("examples.eyebrow")}
            title={t("examples.title")}
            description={t("examples.description")}
            centered
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {libraryPageCards.map((card) => (
              <SurfacePanel key={card.title}>
                <p className="text-xl font-semibold text-[color:var(--scooli-ink)]">
                  {card.title}
                </p>
                <p className="mt-2 text-sm text-[color:var(--scooli-muted)]">
                  {card.meta}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-5 h-28 rounded-[22px] bg-[linear-gradient(180deg,rgba(238,240,255,0.55),rgba(226,232,240,0.9))]" />
              </SurfacePanel>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-24 lg:pb-28">
        <Container>
          <PageCtaBanner
            title={t("cta.title")}
            description={t("cta.description")}
            secondaryHref="/ferramentas"
            secondaryLabel={t("cta.secondaryLabel")}
          />
        </Container>
      </section>
    </PublicSiteShell>
  );
}
