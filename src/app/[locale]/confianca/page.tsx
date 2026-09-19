import { Container } from "@/components/Container";
import { getTrustCards } from "@/components/marketing/data";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import {
  InfoCard,
  MarketingSectionBadge,
  PublicSiteShell,
  SurfacePanel,
} from "@/components/marketing/shared";
import { getPageMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "trust.meta" });

  return getPageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/confianca",
    locale,
  });
}

export default async function TrustPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const trustCards = getTrustCards(locale);
  const t = await getTranslations({ locale, namespace: "trust" });
  const summaryPoints = t.raw("summaryPoints") as string[];
  const commitments = t.raw("commitments.items") as { title: string; description: string }[];
  const goodPractices = t.raw("goodPractices.items") as string[];

  return (
    <PublicSiteShell>
      <section className="relative isolate pt-8 sm:pt-10">
        <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(ellipse_80%_55%_at_50%_-10%,rgba(103,83,255,0.08),transparent)]" />
        <Container className="pb-16 pt-10 sm:pb-20 lg:pb-24">
          <div className="space-y-6">
            <MarketingSectionBadge>{t("badge")}</MarketingSectionBadge>
            <div className="max-w-4xl space-y-4">
              <h1 className="font-display text-4xl leading-tight text-[color:var(--scooli-ink)] sm:text-5xl lg:text-6xl">
                {t("title")}
              </h1>
              <p className="text-lg leading-8 text-[color:var(--scooli-muted)] sm:text-xl">
                {t("description")}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {summaryPoints.map((item) => (
                <div
                  key={item}
                  className="rounded-[24px] border border-slate-200 bg-white px-5 py-4 text-sm font-medium text-slate-700 shadow-[0_24px_60px_-56px_rgba(19,35,58,0.35)]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-24 lg:pb-28">
        <Container className="space-y-6">
          <section className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--scooli-primary)]">{t("principles.eyebrow")}</p>
              <h2 className="font-display text-3xl leading-tight text-[color:var(--scooli-ink)] sm:text-4xl">
                {t("principles.title")}
              </h2>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {trustCards.map((card) => (
                <InfoCard
                  key={card.title}
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                />
              ))}
            </div>
          </section>

          <section>
            <SurfacePanel>
              <h2 className="font-display text-2xl leading-tight text-[color:var(--scooli-ink)] sm:text-3xl">
                {t("commitments.title")}
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {commitments.map((item) => (
                  <div key={item.title} className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                    <p className="text-lg font-semibold text-[color:var(--scooli-ink)]">{item.title}</p>
                    <p className="mt-3 text-sm leading-7 text-[color:var(--scooli-muted)]">{item.description}</p>
                  </div>
                ))}
              </div>
            </SurfacePanel>
          </section>

          <section>
            <SurfacePanel>
              <h2 className="font-display text-2xl leading-tight text-[color:var(--scooli-ink)] sm:text-3xl">
                {t("goodPractices.title")}
              </h2>
              <div className="mt-6 grid gap-3">
                {goodPractices.map((item) => (
                  <div
                    key={item}
                    className="rounded-[22px] border border-slate-200 bg-white px-4 py-3 text-sm leading-7 text-slate-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </SurfacePanel>
          </section>

          <section>
            <SurfacePanel>
              <h2 className="font-display text-2xl leading-tight text-[color:var(--scooli-ink)] sm:text-3xl">
                {t("documents.title")}
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Link
                  href="/privacy"
                  className="rounded-[24px] border border-slate-200 bg-white p-5 transition hover:border-[color:var(--scooli-primary)]/30 hover:bg-[color:var(--scooli-surface-alt)]"
                >
                  <p className="text-lg font-semibold text-[color:var(--scooli-ink)]">{t("documents.privacy.title")}</p>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--scooli-muted)]">
                    {t("documents.privacy.description")}
                  </p>
                </Link>
                <Link
                  href="/terms"
                  className="rounded-[24px] border border-slate-200 bg-white p-5 transition hover:border-[color:var(--scooli-primary)]/30 hover:bg-[color:var(--scooli-surface-alt)]"
                >
                  <p className="text-lg font-semibold text-[color:var(--scooli-ink)]">{t("documents.terms.title")}</p>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--scooli-muted)]">
                    {t("documents.terms.description")}
                  </p>
                </Link>
              </div>
            </SurfacePanel>
          </section>
        </Container>
      </section>
    </PublicSiteShell>
  );
}
