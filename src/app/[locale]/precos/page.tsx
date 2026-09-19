import { Container } from "@/components/Container";
import { StructuredData } from "@/components/StructuredData";
import { withRatings } from "@/components/homepage/data";
import type { Locale } from "@/i18n/routing";
import { PricingPageClient } from "@/components/marketing/PricingPageClient";
import { getPageMetadata, getProductSchema, PRICING } from "@/lib/seo";
import {
  Checklist,
  MarketingSectionHeading,
  PageCtaBanner,
  PageHero,
  PublicSiteShell,
  SurfacePanel,
} from "@/components/marketing/shared";
import { getTranslations } from "next-intl/server";
import { CreditCard, ShieldCheck, Sparkles, Star } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricingPage.meta" });

  return getPageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/precos",
    locale,
  });
}

function formatRating(rating: number, locale: Locale) {
  const trimmed = rating.toFixed(1).replace(".0", "");
  return locale === "en" ? trimmed : trimmed.replace(".", ",");
}

async function PricingIntroCard({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "pricingPage.intro" });

  return (
    <SurfacePanel className="bg-[color:var(--scooli-surface-alt)]">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-[24px] border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            {t("freeLabel")}
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-800">
            {t("freeCredits", { credits: PRICING.free.generationsPerMonth })}
          </p>
          <p className="mt-2 text-sm text-slate-500">{t("freeDescription")}</p>
        </div>
        <div className="rounded-[24px] border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            {t("proLabel")}
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-800">
            {t("proHeadline")}
          </p>
          <p className="mt-2 text-sm text-slate-500">{t("proDescription")}</p>
        </div>
      </div>
    </SurfacePanel>
  );
}

const faqIcons = [Sparkles, ShieldCheck, CreditCard];

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricingPage" });
  const tSocial = await getTranslations({ locale, namespace: "home.socialProof" });
  // The quotes are copy, the ratings are not — they are the values marked up as
  // AggregateRating, so they have to be identical across locales.
  const socialProof = withRatings(
    tSocial.raw("quotes") as { quote: string; role: string }[],
  );
  const productSchema = getProductSchema(socialProof);
  const averageReviewRating = (
    socialProof.reduce((sum, item) => sum + item.rating, 0) / socialProof.length
  ).toFixed(1);
  const heroChecklist = t.raw("hero.checklist") as string[];
  const faqCards = t.raw("faqCards") as { title: string; description: string }[];
  const notesCards = t.raw("notes.cards") as { title: string; description: string }[];

  return (
    <PublicSiteShell>
      <StructuredData id="pricing-product-schema" data={productSchema} />

      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        secondaryHref="/escolas"
        secondaryLabel={t("hero.secondaryLabel")}
        aside={<PricingIntroCard locale={locale} />}
      >
        <Checklist items={heroChecklist} />
      </PageHero>

      <section className="py-20 sm:py-24 lg:py-28">
        <Container className="grid gap-6 lg:grid-cols-3">
          {faqCards.map((card, index) => {
            const Icon = faqIcons[index];
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
        </Container>
      </section>

      <PricingPageClient />

      <section className="py-20 sm:py-24 lg:py-28">
        <Container className="space-y-12">
          <MarketingSectionHeading
            eyebrow={t("reviews.eyebrow")}
            title={t("reviews.title")}
            description={t("reviews.description", {
              rating: locale === "en" ? averageReviewRating : averageReviewRating.replace(".", ","),
              count: socialProof.length,
            })}
            centered
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {socialProof.map((item) => (
              <SurfacePanel key={item.quote}>
                <div className="flex items-center gap-2 text-[color:var(--scooli-primary)]">
                  <Star className="h-4 w-4 fill-current" />
                  <p className="text-sm font-semibold">
                    {formatRating(item.rating, locale)}/5
                  </p>
                </div>
                <p className="mt-4 text-base leading-8 text-[color:var(--scooli-ink)]">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <p className="mt-4 text-sm font-medium text-[color:var(--scooli-muted)]">
                  {item.role}
                </p>
              </SurfacePanel>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24 lg:py-28">
        <Container className="space-y-12">
          <MarketingSectionHeading
            eyebrow={t("notes.eyebrow")}
            title={t("notes.title")}
            description={t("notes.description")}
            centered
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {notesCards.map((card) => (
              <SurfacePanel key={card.title}>
                <p className="text-lg font-semibold text-[color:var(--scooli-ink)]">
                  {card.title}
                </p>
                <p className="mt-3 text-sm leading-7 text-[color:var(--scooli-muted)]">
                  {card.description}
                </p>
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
            secondaryHref="/confianca"
            secondaryLabel={t("cta.secondaryLabel")}
          />
        </Container>
      </section>
    </PublicSiteShell>
  );
}
