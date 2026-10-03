"use client";

import { Container } from "@/components/Container";
import { CurriculumNote } from "@/components/CurriculumNote";
import { TrackedLink } from "@/components/TrackedLink";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { PROMO_PRICE_CENTS, isPromoActive } from "@/lib/promo";
import { PRICING } from "@/lib/seo";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Coins,
  Crown,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { SectionHeading } from "./shared";

/**
 * Portuguese writes €6,99 and English €6.99. The symbol stays in front in both,
 * which is what the live Portuguese page already does — `Intl.NumberFormat`
 * would move it behind the number for pt-PT and change indexed copy.
 */
const makeEuro = (locale: string) => (value: number) =>
  locale === "en"
    ? `€${value.toFixed(2)}`
    : `€${value.toFixed(2).replace(".", ",")}`;

type TeaserPlan = {
  id: "free" | "pro" | "schools";
  icon: LucideIcon;
  price: string;
  period?: string;
  detail: string;
  description: string;
  features: string[];
  highlighted: boolean;
};

export function PricingTeaserSection() {
  const t = useTranslations("home.pricingTeaser");
  const locale = useLocale();
  const ref = useScrollReveal({ stagger: 0.1, y: 24 });
  const promoActive = isPromoActive();
  const credits = PRICING.free.generationsPerMonth;
  const euro = makeEuro(locale);
  const euroCents = (cents: number) => euro(cents / 100);

  const translateFeatures = (plan: "free" | "pro" | "schools") =>
    (t.raw(`${plan}.features`) as string[]).map((_, index) =>
      t(`${plan}.features.${index}`, { credits }),
    );

  const plans: TeaserPlan[] = [
    {
      id: "free",
      icon: Coins,
      price: "€0",
      period: t("free.period"),
      detail: t("free.detail", { credits }),
      description: t("free.description"),
      features: translateFeatures("free"),
      highlighted: false,
    },
    {
      id: "pro",
      icon: Crown,
      price: euro(PRICING.pro_monthly.price),
      period: t("pro.period"),
      detail: t("pro.detail", {
        annualPrice: euro(PRICING.pro_annual.price),
        savings: PRICING.pro_annual.savings,
      }),
      description: t("pro.description"),
      features: translateFeatures("pro"),
      highlighted: true,
    },
    {
      id: "schools",
      icon: Building2,
      price: t("schools.price"),
      detail: t("schools.detail"),
      description: t("schools.description"),
      features: translateFeatures("schools"),
      highlighted: false,
    },
  ];

  return (
    <section id="precos" className="py-16 sm:py-20 lg:py-24">
      <Container ref={ref} className="space-y-12">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description", { credits })}
          centered
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.id}
                data-reveal
                className={cn(
                  "relative flex h-full flex-col rounded-[28px] border p-7",
                  plan.highlighted
                    ? "border-[color:var(--scooli-primary)] bg-[linear-gradient(180deg,rgba(238,240,255,0.9),rgba(255,255,255,1))] shadow-[0_32px_90px_-52px_rgba(103,83,255,0.5)]"
                    : "border-slate-200 bg-white shadow-[0_24px_70px_-56px_rgba(19,35,58,0.28)]",
                )}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-7 inline-flex items-center gap-1.5 rounded-full bg-[color:var(--scooli-primary)] px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg">
                    <Sparkles className="h-3.5 w-3.5" />
                    {t("mostPopular")}
                  </span>
                )}

                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-[color:var(--scooli-ink)]">
                    {t(`${plan.id}.name`)}
                  </h3>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                {plan.id === "pro" && promoActive ? (
                  <>
                    <div className="mt-5 flex items-baseline gap-2">
                      <span className="font-display text-2xl text-[color:var(--scooli-muted)] line-through">
                        {euro(PRICING.pro_monthly.price)}
                      </span>
                      <span className="font-display text-4xl text-[color:var(--scooli-ink)]">
                        {euroCents(PROMO_PRICE_CENTS.monthly)}
                      </span>
                      <span className="text-sm font-medium text-[color:var(--scooli-muted)]">
                        {t("pro.period")}
                      </span>
                    </div>
                    <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[color:var(--scooli-primary)]/10 px-2.5 py-1 text-xs font-semibold text-[color:var(--scooli-primary)]">
                      <Sparkles className="h-3 w-3" />
                      {t("promoBadge")}
                    </p>
                    <p className="mt-1.5 text-sm font-medium text-[color:var(--scooli-muted)]">
                      {t("promoAnnual", {
                        price: euroCents(PROMO_PRICE_CENTS.annual),
                        savings: PRICING.pro_annual.savings,
                      })}
                    </p>
                  </>
                ) : (
                  <>
                    <div className="mt-5 flex items-baseline gap-1.5">
                      <span className="font-display text-4xl text-[color:var(--scooli-ink)]">
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-sm font-medium text-[color:var(--scooli-muted)]">
                          {plan.period}
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 text-sm font-medium text-[color:var(--scooli-muted)]">
                      {plan.detail}
                    </p>
                  </>
                )}

                <p className="mt-4 text-sm leading-7 text-[color:var(--scooli-muted)]">
                  {plan.description}
                </p>

                <ul className="mt-6 flex-1 space-y-3 border-t border-slate-100 pt-6 text-sm text-[color:var(--scooli-ink-soft)]">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--scooli-primary)]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div
          data-reveal
          className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center"
        >
          <CurriculumNote className="text-left" />
          <p className="rounded-[22px] border border-slate-200 bg-white px-6 py-4 text-sm leading-7 text-[color:var(--scooli-ink-soft)]">
            {t("comparison")}
          </p>
          <Button
            asChild
            variant="outline"
            className="h-12 rounded-full px-6 text-base font-semibold"
          >
            <TrackedLink
              href="/precos"
              eventName="marketing_cta_clicked"
              eventProperties={{
                cta_id: "home_pricing_teaser_view_pricing",
                placement: "home_pricing_teaser",
              }}
            >
              {t("cta")}
              <ArrowRight className="h-4 w-4" />
            </TrackedLink>
          </Button>
          <p className="text-xs text-[color:var(--scooli-muted)]">
            {t("footnote")}
          </p>
        </div>
      </Container>
    </section>
  );
}
