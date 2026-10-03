import { Container } from "@/components/Container";
import { InstitutionalContactButton } from "@/components/InstitutionalContactButton";
import { TrackedLink } from "@/components/TrackedLink";
import { getSchoolPageCards } from "@/components/marketing/data";
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
import { Button } from "@/components/ui/button";
import { getPageMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { ArrowRight, ShieldCheck } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "schools.meta" });

  return getPageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/escolas",
    locale,
  });
}

function InstitutionalPreview() {
  const t = useTranslations("schools.preview");
  const items = t.raw("items") as string[];

  return (
    <SurfacePanel className="bg-[color:var(--scooli-surface-alt)]">
      <div className="grid gap-3">
        {items.map((item, index) => (
          <div
            key={item}
            className="rounded-[24px] border border-slate-200 bg-white p-4"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              {t("stepLabel", { number: String(index + 1).padStart(2, "0") })}
            </p>
            <p className="mt-2 text-lg font-semibold text-slate-800">{item}</p>
            <div className="mt-4 h-2.5 w-4/5 rounded-full bg-slate-200" />
            <div className="mt-2 h-2.5 w-3/5 rounded-full bg-slate-200" />
          </div>
        ))}
      </div>
    </SurfacePanel>
  );
}

export default async function SchoolsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const schoolPageCards = getSchoolPageCards(locale);
  const t = await getTranslations({ locale, namespace: "schools" });

  return (
    <PublicSiteShell>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        primaryAction={
          <InstitutionalContactButton
            source="schools_page_hero"
            className="h-12 rounded-full px-6 text-base font-semibold shadow-[0_20px_32px_-18px_rgba(103,83,255,0.45)]"
          />
        }
        secondaryHref="/confianca"
        secondaryLabel={t("hero.secondaryLabel")}
        aside={<InstitutionalPreview />}
      >
        <Checklist items={t.raw("hero.checklist") as string[]} />
      </PageHero>

      <section className="py-20 sm:py-24 lg:py-28">
        <Container className="space-y-12">
          <MarketingSectionHeading
            eyebrow={t("howWeWork.eyebrow")}
            title={t("howWeWork.title")}
            description={t("howWeWork.description")}
            centered
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {schoolPageCards.map((card) => (
              <InfoCard
                key={card.title}
                icon={card.icon}
                title={card.title}
                description={card.description}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24 lg:py-28">
        <Container>
          <SurfacePanel>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="text-lg font-semibold text-[color:var(--scooli-ink)]">
                {t("blockers.title")}
              </p>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {(t.raw("blockers.items") as string[]).map((item) => (
                <div
                  key={item}
                  className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </SurfacePanel>
        </Container>
      </section>

      <section className="pb-20 sm:pb-24 lg:pb-28">
        <Container>
          <SurfacePanel className="bg-[linear-gradient(135deg,rgba(103,83,255,0.10),rgba(255,255,255,0.97)_45%,rgba(59,130,246,0.10))]">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {t("recommend.eyebrow")}
                </p>
                <h2 className="font-display text-3xl leading-tight text-[color:var(--scooli-ink)] sm:text-4xl">
                  {t("recommend.title")}
                </h2>
                <p className="max-w-2xl text-base leading-8 text-[color:var(--scooli-muted)] sm:text-lg">
                  {t("recommend.description")}
                </p>
              </div>

              <Button
                asChild
                className="h-12 rounded-full px-6 text-base font-semibold shadow-[0_20px_32px_-18px_rgba(103,83,255,0.45)]"
              >
                <TrackedLink
                  href="/recomendar-instituicao"
                  eventName="marketing_cta_clicked"
                  eventProperties={{
                    cta_id: "schools_page_recommend_institution",
                    placement: "schools_page_referral_callout",
                  }}
                >
                  {t("recommend.buttonLabel")}
                  <ArrowRight className="h-4 w-4" />
                </TrackedLink>
              </Button>
            </div>
          </SurfacePanel>
        </Container>
      </section>

      <section className="pb-20 sm:pb-24 lg:pb-28">
        <Container>
          <PageCtaBanner
            title={t("finalCta.title")}
            description={t("finalCta.description")}
            primaryAction={
              <InstitutionalContactButton
                source="schools_page_cta_banner"
                className="h-12 rounded-full px-6 text-base font-semibold shadow-[0_20px_32px_-18px_rgba(103,83,255,0.45)]"
              />
            }
            secondaryHref="/confianca"
            secondaryLabel={t("finalCta.secondaryLabel")}
          />
        </Container>
      </section>
    </PublicSiteShell>
  );
}
