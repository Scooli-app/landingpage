"use client";

import { ContactModal } from "@/components/ContactModal";
import { Container } from "@/components/Container";
import { Kicker, Tag } from "@/components/site/primitives";
import { TrackedLink } from "@/components/TrackedLink";
import { Button, buttonVariants } from "@/components/ui/button";
import { usePlans, type Plan } from "@/contexts/PlansContext";
import type { Locale } from "@/i18n/routing";
import { formatEuro } from "@/lib/format";
import { APP_URL, appSignUpUrl, PRICING } from "@/lib/seo";
import { PROMO_PLAN_CODES, PROMO_PRICE_CENTS, isPromoActive } from "@/lib/promo";
import { cn } from "@/lib/utils";
import { Check, Minus } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState, type ReactNode } from "react";

type BillingCycle = "monthly" | "annual";

function calculateSavingsPercent(
  monthlyCents: number,
  annualCents: number,
): string | null {
  const yearlyFromMonthly = monthlyCents * 12;
  const savings = yearlyFromMonthly - annualCents;
  if (savings <= 0) {
    return null;
  }
  return `${Math.round((savings / yearlyFromMonthly) * 100)}%`;
}

function PlanCard({
  highlighted = false,
  badge,
  children,
}: {
  highlighted?: boolean;
  badge?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-xl bg-white p-7 sm:p-8",
        highlighted ? "border-2 border-ink" : "border border-line-strong",
      )}
    >
      {badge && <div className="absolute -top-3 left-7">{badge}</div>}
      {children}
    </div>
  );
}

function FeatureList({ items, locked = [] }: { items: string[]; locked?: string[] }) {
  return (
    <ul className="mt-6 flex-1 space-y-2.5 border-t border-line pt-6 text-[15px] text-body">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <Check aria-hidden className="mt-[3px] size-4 shrink-0 text-ink" strokeWidth={1.75} />
          <span>{item}</span>
        </li>
      ))}
      {locked.map((item) => (
        <li key={item} className="flex items-start gap-3 text-faint">
          <Minus aria-hidden className="mt-[3px] size-4 shrink-0" strokeWidth={1.75} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function PriceLine({ price, suffix, before }: { price: string; suffix?: string; before?: string }) {
  return (
    <div className="mt-4 flex items-baseline gap-2">
      {before && <span className="text-lg text-faint line-through">{before}</span>}
      <span className="font-display text-[44px] font-medium leading-none tracking-[-0.02em] text-ink">
        {price}
      </span>
      {suffix && <span className="text-[15px] text-subtle">{suffix}</span>}
    </div>
  );
}

function FreePlanCard() {
  const t = useTranslations("pricingSection.free");
  const locale = useLocale() as Locale;
  const href = appSignUpUrl(locale);
  const credits = PRICING.free.generationsPerMonth;
  const features = (t.raw("features") as string[]).map((_, index) =>
    t(`features.${index}`, { credits }),
  );
  const lockedFeatures = t.raw("lockedFeatures") as string[];

  return (
    <PlanCard>
      <Kicker>{t("label")}</Kicker>
      <PriceLine price={t("price")} suffix={t("period")} />
      <p className="mt-4 text-[15px] leading-relaxed text-subtle">{t("description")}</p>
      <FeatureList items={features} locked={lockedFeatures} />
      <TrackedLink
        href={href}
        eventName="marketing_plan_selected"
        eventProperties={{
          plan_code: "free",
          billing_period: "month",
          price_cents: 0,
          placement: "pricing_plan_card",
          target_url: href,
        }}
        className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "mt-8 w-full")}
      >
        {t("cta")}
      </TrackedLink>
    </PlanCard>
  );
}

function ProPlanCard({
  billing,
  apiPlans,
}: {
  billing: BillingCycle;
  apiPlans: Plan[];
}) {
  const t = useTranslations("pricingSection.pro");
  const locale = useLocale();
  const isAnnual = billing === "annual";
  const planCode = isAnnual ? "pro_annual" : "pro_monthly";

  // Use API price if available, fall back to constants
  const apiPlan = apiPlans.find((p) => p.planCode === planCode);
  const annualApiPlan = apiPlans.find((p) => p.planCode === "pro_annual");
  const monthlyApiPlan = apiPlans.find((p) => p.planCode === "pro_monthly");

  const monthlyDisplayCents = isAnnual
    ? Math.round(
        (annualApiPlan?.priceCents ?? PRICING.pro_annual.priceCents) / 12,
      )
    : (monthlyApiPlan?.priceCents ?? PRICING.pro_monthly.priceCents);

  const annualTotalCents =
    annualApiPlan?.priceCents ?? PRICING.pro_annual.priceCents;
  const savingsPercent =
    calculateSavingsPercent(
      monthlyApiPlan?.priceCents ?? PRICING.pro_monthly.priceCents,
      annualTotalCents,
    ) ?? PRICING.pro_annual.savings;
  const currentPriceCents =
    apiPlan?.priceCents ??
    (isAnnual ? PRICING.pro_annual.priceCents : PRICING.pro_monthly.priceCents);

  // Time-limited launch offer: replaces the regular price/plan code while
  // active. Not fetched from the API since promo plans are excluded from the
  // public /subscriptions/plans listing on purpose.
  const promoActive = isPromoActive();
  const promoPriceCents = isAnnual
    ? PROMO_PRICE_CENTS.annual
    : PROMO_PRICE_CENTS.monthly;
  const promoMonthlyDisplayCents = isAnnual
    ? Math.round(PROMO_PRICE_CENTS.annual / 12)
    : PROMO_PRICE_CENTS.monthly;

  const displayPlanCode = promoActive
    ? isAnnual
      ? PROMO_PLAN_CODES.annual
      : PROMO_PLAN_CODES.monthly
    : planCode;
  const displayMonthlyCents = promoActive
    ? promoMonthlyDisplayCents
    : monthlyDisplayCents;
  const displayPriceCents = promoActive ? promoPriceCents : currentPriceCents;

  const href = `${APP_URL}/checkout?plan=${displayPlanCode}`;

  const included = t.raw("features") as string[];

  return (
    <PlanCard
      highlighted
      badge={<Tag tone="violet">{isAnnual ? t("bestValue") : t("mostPopular")}</Tag>}
    >
      <div className="flex flex-wrap items-center gap-2">
        <Kicker>{t("label")}</Kicker>
        {promoActive && <Tag tone="yellow">{t("promoBadge")}</Tag>}
      </div>
      <PriceLine
        price={formatEuro(locale, displayMonthlyCents)}
        suffix={t("perMonth")}
        before={promoActive ? formatEuro(locale, monthlyDisplayCents) : undefined}
      />
      <p className="mt-2 text-[13px] text-faint">
        {promoActive
          ? `${isAnnual ? t("promoAnnualPrefix", { price: formatEuro(locale, promoPriceCents) }) : ""}${t("promoTagline")}`
          : isAnnual
            ? t("annualNote", {
                price: formatEuro(locale, annualTotalCents),
                savings: savingsPercent,
              })
            : t("monthlyNote")}
      </p>
      <p className="mt-4 text-[15px] leading-relaxed text-subtle">
        {isAnnual ? t("descriptionAnnual", { savings: savingsPercent }) : t("descriptionMonthly")}
      </p>
      <FeatureList items={[t("unlimitedBadge"), ...included]} />
      <TrackedLink
        href={href}
        eventName="marketing_plan_selected"
        eventProperties={{
          plan_code: displayPlanCode,
          billing_period: isAnnual ? "year" : "month",
          price_cents: displayPriceCents,
          placement: "pricing_plan_card",
          target_url: href,
        }}
        className={cn(buttonVariants({ variant: "primary", size: "lg" }), "mt-8 w-full")}
      >
        {t("cta")}
      </TrackedLink>
    </PlanCard>
  );
}

function EnterpriseCard({ onContactClick }: { onContactClick: () => void }) {
  const t = useTranslations("pricingSection.enterprise");
  const features = t.raw("features") as string[];

  return (
    <PlanCard>
      <Kicker>{t("label")}</Kicker>
      <PriceLine price={t("price")} />
      <p className="mt-2 text-[13px] text-faint">{t("detail")}</p>
      <p className="mt-4 text-[15px] leading-relaxed text-subtle">{t("description")}</p>
      <FeatureList items={features} />
      <Button
        type="button"
        variant="secondary"
        size="lg"
        onClick={onContactClick}
        className="mt-8 w-full"
      >
        {t("cta")}
      </Button>
    </PlanCard>
  );
}

function BillingToggle({
  billing,
  onChange,
  apiPlans,
}: {
  billing: BillingCycle;
  onChange: (b: BillingCycle) => void;
  apiPlans: Plan[];
}) {
  const t = useTranslations("pricingSection.billingToggle");
  const monthlyApiPlan = apiPlans.find((p) => p.planCode === "pro_monthly");
  const annualApiPlan = apiPlans.find((p) => p.planCode === "pro_annual");
  const savingsPercent =
    calculateSavingsPercent(
      monthlyApiPlan?.priceCents ?? PRICING.pro_monthly.priceCents,
      annualApiPlan?.priceCents ?? PRICING.pro_annual.priceCents,
    ) ?? PRICING.pro_annual.savings;

  const optionClass = (active: boolean) =>
    cn(
      "inline-flex h-9 items-center gap-2 rounded-md px-4 text-sm transition-colors",
      active
        ? "bg-white text-ink shadow-[0_1px_2px_rgba(0,0,0,0.06)] ring-1 ring-line-strong"
        : "text-subtle hover:text-ink",
    );

  return (
    <div className="flex justify-center">
      <div role="radiogroup" className="inline-flex items-center gap-1 rounded-lg bg-stone-soft p-1">
        <button
          type="button"
          role="radio"
          aria-checked={billing === "monthly"}
          onClick={() => onChange("monthly")}
          className={optionClass(billing === "monthly")}
        >
          {t("monthly")}
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={billing === "annual"}
          onClick={() => onChange("annual")}
          className={optionClass(billing === "annual")}
        >
          {t("annual")}
          <Tag tone="green">−{savingsPercent}</Tag>
        </button>
      </div>
    </div>
  );
}

/** Plan cards for /precos. The page hero above it carries the heading. */
export function PricingSection() {
  const t = useTranslations("pricingSection");
  const { plans, hasPlans } = usePlans();
  const [billing, setBilling] = useState<BillingCycle>("annual");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const apiPlans = hasPlans ? plans : [];

  return (
    <section id="planos" aria-label={t("title")} className="scroll-mt-20 py-16 md:py-24">
      <Container>
        <BillingToggle billing={billing} onChange={setBilling} apiPlans={apiPlans} />

        <div className="mx-auto mt-12 grid max-w-[1080px] gap-5 md:grid-cols-3">
          <FreePlanCard />
          <ProPlanCard billing={billing} apiPlans={apiPlans} />
          <EnterpriseCard onContactClick={() => setIsContactModalOpen(true)} />
        </div>

        <p className="mt-10 text-center text-sm text-subtle">
          {[
            t("trustBadges.securePayment"),
            t("trustBadges.cancelAnytime"),
            t("trustBadges.instantActivation"),
          ].join(" · ")}
        </p>

        <p className="mt-3 text-center text-[13px] text-faint">
          {t.rich("fairUseFootnote", {
            link: (chunks) => (
              <TrackedLink
                href="/terms#uso-justo"
                eventName="marketing_navigation_clicked"
                eventProperties={{
                  location: "pricing_terms_note",
                  link_label: "politica_uso_justo",
                }}
                className="underline underline-offset-2 hover:text-subtle"
              >
                {chunks}
              </TrackedLink>
            ),
          })}
        </p>
      </Container>

      <ContactModal
        open={isContactModalOpen}
        onOpenChange={setIsContactModalOpen}
        source="enterprise_plan"
        title={t("contactModal.title")}
        description={t("contactModal.description")}
      />
    </section>
  );
}
