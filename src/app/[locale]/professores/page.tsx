import { Container } from "@/components/Container";
import { OutputCard } from "@/components/homepage/OutputCard";
import { withKinds } from "@/components/homepage/data";
import { getTeacherPageCards } from "@/components/marketing/data";
import type { Locale } from "@/i18n/routing";
import {
  Checklist,
  InfoCard,
  MarketingSectionHeading,
  PageCtaBanner,
  PageHero,
  PublicSiteShell,
  SurfacePanel,
} from "@/components/marketing/shared";
import { getPageMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { CalendarClock, LibraryBig } from "lucide-react";

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

function WeeklyFlowPreview() {
  const t = useTranslations("teachers.preview");

  const items = [
    { key: "monday" as const },
    { key: "wednesday" as const },
    { key: "friday" as const },
  ];

  return (
    <SurfacePanel className="bg-[color:var(--scooli-surface-alt)]">
      <div className="grid gap-3 sm:grid-cols-3">
        {items.map((item) => (
          <div key={item.key} className="rounded-[24px] border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{t(`days.${item.key}`)}</p>
            <p className="mt-3 text-lg font-semibold text-slate-800">{t(`tasks.${item.key}`)}</p>
            <div className="mt-4 h-2.5 w-4/5 rounded-full bg-slate-200" />
            <div className="mt-2 h-2.5 w-3/5 rounded-full bg-slate-200" />
          </div>
        ))}
      </div>
    </SurfacePanel>
  );
}

export default async function TeachersPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const teacherPageCards = getTeacherPageCards(locale);
  const tOutputs = await getTranslations({ locale, namespace: "home.outputs" });
  const outputs = withKinds(
    tOutputs.raw("items") as {
      label: string;
      title: string;
      description: string;
      alt: string;
    }[],
  );
  const t = await getTranslations({ locale, namespace: "teachers" });

  return (
    <PublicSiteShell>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        secondaryHref="/biblioteca"
        secondaryLabel={t("hero.secondaryLabel")}
        aside={<WeeklyFlowPreview />}
      >
        <Checklist items={t.raw("hero.checklist") as string[]} />
      </PageHero>

      <section className="py-20 sm:py-24 lg:py-28">
        <Container className="space-y-12">
          <MarketingSectionHeading
            eyebrow={t("howItHelps.eyebrow")}
            title={t("howItHelps.title")}
            description={t("howItHelps.description")}
            centered
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {teacherPageCards.map((card) => (
              <InfoCard key={card.title} icon={card.icon} title={card.title} description={card.description} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white/70 py-20 sm:py-24 lg:py-28">
        <Container className="space-y-12">
          <MarketingSectionHeading
            eyebrow={t("outputs.eyebrow")}
            title={t("outputs.title")}
            description={t("outputs.description")}
            centered
          />
          <div className="grid gap-6 xl:grid-cols-3">
            {outputs.map((output) => (
              <OutputCard key={output.label} output={output} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24 lg:py-28">
        <Container className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <SurfacePanel>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
                <LibraryBig className="h-5 w-5" />
              </div>
              <div>
                <p className="text-lg font-semibold text-[color:var(--scooli-ink)]">{t("library.title")}</p>
                <p className="text-sm text-[color:var(--scooli-muted)]">{t("library.subtitle")}</p>
              </div>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {(t.raw("library.items") as string[]).map((item) => (
                <div key={item} className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </SurfacePanel>
          <SurfacePanel>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
                <CalendarClock className="h-5 w-5" />
              </div>
              <p className="text-lg font-semibold text-[color:var(--scooli-ink)]">{t("weeklyFit.title")}</p>
            </div>
            <div className="mt-6 space-y-3">
              {(t.raw("weeklyFit.items") as string[]).map((item) => (
                <div key={item} className="rounded-[22px] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </SurfacePanel>
        </Container>
      </section>

      <section className="pb-20 sm:pb-24 lg:pb-28">
        <Container>
          <PageCtaBanner
            title={t("finalCta.title")}
            description={t("finalCta.description")}
            secondaryHref="/precos"
            secondaryLabel={t("finalCta.secondaryLabel")}
          />
        </Container>
      </section>
    </PublicSiteShell>
  );
}
