"use client";

import { ContactModal } from "@/components/ContactModal";
import { Container } from "@/components/Container";
import { Tag } from "@/components/site/primitives";
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
import { Fragment, useState, type ReactNode } from "react";

type BillingCycle = "monthly" | "annual";
type FeatureGroup = { title: string; plans?: ("trial" | "pro" | "school")[]; rows: string[] };

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

function PriceLine({ price, suffix, before }: { price: string; suffix?: string; before?: string }) {
  return (
    <div className="mt-3 flex flex-wrap items-baseline gap-x-2">
      {before && <span className="text-lg text-faint line-through">{before}</span>}
      <span className="font-display text-[32px] font-medium leading-none tracking-[-0.02em] text-ink md:max-lg:text-[24px]">
        {price}
      </span>
      {suffix && <span className="text-[15px] text-subtle md:max-lg:text-[13px]">{suffix}</span>}
    </div>
  );
}

/** Header buttons: at the bottom of the cell so the three line up; wrapping in the narrow tablet columns. */
const HEADER_CTA =
  "mt-auto w-full md:max-lg:h-auto md:max-lg:min-h-10 md:max-lg:whitespace-normal md:max-lg:px-2 md:max-lg:py-2 md:max-lg:text-center md:max-lg:text-[13px] md:max-lg:leading-tight";

/** Phone header buttons: three side by side in narrow columns, so short labels and tight padding. */
const COMPACT_CTA = "h-8 w-full px-0.5 text-[12px] max-[379px]:text-[11px]";

/** A plan's header in a phone column: name, price, and its button at the bottom so the three line up. */
function CompactHeader({ name, value, sub, cta }: { name: string; value: string; sub?: string; cta: ReactNode }) {
  return (
    <div className="flex h-full flex-col items-center px-1 pb-3 pt-3.5 text-center font-normal">
      <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.06em] text-subtle">{name}</span>
      <span className="mt-1.5 font-display text-[17px] leading-tight text-ink">{value}</span>
      {sub && <span className="text-[11.5px] text-subtle">{sub}</span>}
      <div className="mt-auto w-full pt-2.5">{cta}</div>
    </div>
  );
}

/** Same row height in all three header cells, with or without Pro's promo tag, so the prices line up. */
function KickerRow({ children }: { children: ReactNode }) {
  return <div className="flex min-h-6 flex-wrap items-center gap-2 font-mono md:max-lg:min-h-8 text-xs font-medium uppercase tracking-[0.06em] text-subtle">{children}</div>;
}

/** The free trial: 30 days, no payment details. Its column shows what it leaves out. */
function TrialHeader({ compact = false }: { compact?: boolean }) {
  const t = useTranslations("pricingSection.trial");
  const locale = useLocale() as Locale;
  const href = appSignUpUrl(locale);
  // Plan code "free" and this placement are what the funnels already count for the sign-up button.
  const cta = (className: string, label: string) => (
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
      className={className}
    >
      {label}
    </TrackedLink>
  );
  if (compact) {
    return (
      <CompactHeader
        name={t("short")}
        value={t("days")}
        cta={cta(cn(buttonVariants({ variant: "secondary", size: "sm" }), COMPACT_CTA), t("ctaShort"))}
      />
    );
  }
  return (
    <div className="flex h-full flex-col font-normal">
      <KickerRow>{t("title")}</KickerRow>
      <PriceLine price={t("price")} suffix={t("period")} />
      <p className="mb-5 mt-2 text-[13px] text-faint">{t("note")}</p>
      {cta(cn(buttonVariants({ variant: "secondary", size: "lg" }), HEADER_CTA), t("cta"))}
    </div>
  );
}

/** Pro's price: API price, constants as fallback, the launch promo while it runs. */
function ProHeader({
  billing,
  onBillingChange,
  apiPlans,
  compact = false,
}: {
  billing: BillingCycle;
  onBillingChange: (b: BillingCycle) => void;
  apiPlans: Plan[];
  compact?: boolean;
}) {
  const t = useTranslations("pricingSection.pro");
  const locale = useLocale() as Locale;
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

  const checkoutHref = `${APP_URL}/checkout?plan=${displayPlanCode}`;
  const cta = (className: string) => (
    <TrackedLink
      href={checkoutHref}
      eventName="marketing_plan_selected"
      eventProperties={{
        plan_code: displayPlanCode,
        billing_period: isAnnual ? "year" : "month",
        price_cents: displayPriceCents,
        placement: "pricing_plan_card",
        target_url: checkoutHref,
      }}
      className={className}
    >
      {t("cta")}
    </TrackedLink>
  );

  if (compact) {
    return (
      <CompactHeader
        name={t("short")}
        value={formatEuro(locale, displayMonthlyCents)}
        sub={t("perMonth")}
        cta={cta(cn(buttonVariants({ variant: "primary", size: "sm" }), COMPACT_CTA))}
      />
    );
  }

  return (
    <div className="flex h-full flex-col font-normal">
      <KickerRow>
        {t("label")}
        {promoActive && <Tag tone="yellow">{t("promoBadge")}</Tag>}
      </KickerRow>
      <PriceLine
        price={formatEuro(locale, displayMonthlyCents)}
        suffix={t("perMonth")}
        before={promoActive ? formatEuro(locale, monthlyDisplayCents) : undefined}
      />
      <p className="mb-5 mt-2 text-[13px] text-faint">
        {promoActive
          ? `${isAnnual ? t("promoAnnualPrefix", { price: formatEuro(locale, promoPriceCents) }) : ""}${t("promoTagline")}`
          : isAnnual
            ? t("annualNote", {
                price: formatEuro(locale, annualTotalCents),
                savings: savingsPercent,
              })
            : t("monthlyNote")}
      </p>
      <BillingToggle billing={billing} onChange={onBillingChange} apiPlans={apiPlans} className="mb-5" />
      {cta(cn(buttonVariants({ variant: "primary", size: "lg" }), HEADER_CTA))}
    </div>
  );
}

function SchoolHeader({ onContactClick, compact = false }: { onContactClick: () => void; compact?: boolean }) {
  const t = useTranslations("pricingSection.enterprise");
  if (compact) {
    return (
      <CompactHeader
        name={t("short")}
        value={t("price")}
        cta={
          <Button type="button" variant="secondary" size="sm" onClick={onContactClick} className={COMPACT_CTA}>
            {t("ctaShort")}
          </Button>
        }
      />
    );
  }
  return (
    <div className="flex h-full flex-col font-normal">
      <KickerRow>{t("label")}</KickerRow>
      <PriceLine price={t("price")} />
      <p className="mb-5 mt-2 text-[13px] text-faint">{t("detail")}</p>
      <Button type="button" variant="secondary" size="lg" onClick={onContactClick} className={HEADER_CTA}>
        {t("cta")}
      </Button>
    </div>
  );
}

function Mark({ included }: { included: boolean }) {
  const t = useTranslations("pricingSection.table");
  return included ? (
    <>
      <Check aria-hidden className="mx-auto size-[18px] text-violet" strokeWidth={2} />
      <span className="sr-only">{t("included")}</span>
    </>
  ) : (
    <>
      <Minus aria-hidden className="mx-auto size-[18px] text-faint" strokeWidth={1.75} />
      <span className="sr-only">{t("notIncluded")}</span>
    </>
  );
}

const PLAN_COLUMNS = ["trial", "pro", "school"] as const;
type PlanColumn = (typeof PLAN_COLUMNS)[number];

/**
 * What each plan includes, as one table with checks: the free trial, Pro and the schools' plan side by
 * side, each column topped by its price and button. Each feature group lists the plans it belongs to
 * (all three when it says nothing). Phones get a compact header row that stays in view while the
 * rows scroll, so the three columns can be compared all the way down.
 */
function PlanTable({
  billing,
  onBillingChange,
  apiPlans,
  onContactClick,
}: {
  billing: BillingCycle;
  onBillingChange: (b: BillingCycle) => void;
  apiPlans: Plan[];
  onContactClick: () => void;
}) {
  const t = useTranslations("pricingSection");
  const groups = t.raw("table.groups") as FeatureGroup[];
  const header = (plan: PlanColumn, compact: boolean) =>
    plan === "trial" ? (
      <TrialHeader compact={compact} />
    ) : plan === "pro" ? (
      <ProHeader billing={billing} onBillingChange={onBillingChange} apiPlans={apiPlans} compact={compact} />
    ) : (
      <SchoolHeader onContactClick={onContactClick} compact={compact} />
    );
  // Pro stays the highlighted column.
  const columnClass = (plan: PlanColumn) => cn("border-l border-line", plan === "pro" && "bg-violet-wash/40");

  return (
    // overflow-clip, not hidden: it rounds the corners without becoming a scroll box, so the phone header can stick.
    <div className="mx-auto max-w-[1080px] overflow-clip rounded-xl border border-line-strong bg-white">
      <table className="w-full table-fixed border-collapse text-left">
        <caption className="sr-only">{t("table.caption")}</caption>
        <thead>
          <tr className="md:hidden">
            {/* Sticky cells need opaque backgrounds and an inset rule: collapsed borders stay behind when they move. */}
            <th scope="col" className="sticky top-16 z-10 w-[36%] bg-white px-3 py-3 align-middle font-normal shadow-[inset_0_-1px_0_var(--color-line-strong)]">
              <span className="sr-only">{t("table.featureColumn")}</span>
              {/* The Pro column is too narrow for it: the toggle sits next to it, and stays in view with the header. */}
              <BillingToggle billing={billing} onChange={onBillingChange} apiPlans={apiPlans} stacked className="mx-auto max-w-[8.5rem]" />
            </th>
            {PLAN_COLUMNS.map((plan) => (
              <th
                key={plan}
                scope="col"
                className="sticky top-16 z-10 h-px w-[21.33%] border-l border-line bg-white p-0 align-top shadow-[inset_0_-1px_0_var(--color-line-strong)]"
              >
                <div className={cn("h-full", plan === "pro" && "bg-violet-wash/40")}>{header(plan, true)}</div>
              </th>
            ))}
          </tr>
          <tr className="border-b border-line-strong max-md:hidden">
            <th scope="col" className="w-[31%] px-5 py-8 align-bottom lg:px-7">
              <span className="text-[13px] font-medium text-subtle">{t("table.featureColumn")}</span>
            </th>
            {PLAN_COLUMNS.map((plan) => (
              <th key={plan} scope="col" className={cn(columnClass(plan), "h-px w-[23%] px-4 py-8 align-top lg:px-5")}>
                {header(plan, false)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => (
            <Fragment key={group.title}>
              <tr className="border-t border-line-strong first:border-t-0">
                <th
                  scope="colgroup"
                  colSpan={PLAN_COLUMNS.length + 1}
                  className="bg-stone-soft px-3 py-2.5 font-mono text-[11.5px] font-normal uppercase tracking-[0.06em] text-subtle md:px-5 lg:px-7"
                >
                  {group.title}
                </th>
              </tr>
              {group.rows.map((row) => (
                <tr key={row} className="border-t border-line">
                  <th scope="row" className="px-3 py-3 text-[13.5px] font-normal text-body md:px-5 md:text-[14px] lg:px-7 lg:text-[15px]">
                    {row}
                  </th>
                  {PLAN_COLUMNS.map((plan) => (
                    <td key={plan} className={cn(columnClass(plan), "py-3")}>
                      <Mark included={!group.plans || group.plans.includes(plan)} />
                    </td>
                  ))}
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BillingToggle({
  billing,
  onChange,
  apiPlans,
  stacked = false,
  className,
}: {
  billing: BillingCycle;
  onChange: (b: BillingCycle) => void;
  apiPlans: Plan[];
  stacked?: boolean;
  className?: string;
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
      "inline-flex items-center justify-center gap-1.5 transition-[color,background-color,box-shadow] duration-150",
      stacked ? "h-8 w-full rounded-lg text-[12.5px]" : "h-8 flex-1 rounded-full px-3 text-[13px] md:max-lg:px-1.5 md:max-lg:text-[12.5px]",
      active
        ? "bg-white font-medium text-ink shadow-[0_1px_3px_rgba(17,17,17,0.10),0_0_0_1px_var(--color-line-strong)]"
        : "text-subtle hover:text-ink",
    );

  return (
    <div className={className}>
      <div
        role="radiogroup"
        aria-label={t("label")}
        className={cn(
          "gap-1 bg-stone-soft p-1 ring-1 ring-inset ring-line",
          stacked ? "grid rounded-xl" : "flex items-center rounded-full",
        )}
      >
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
          {/* The tag doesn't fit the narrow tablet Pro column or the phone cell: the note under the price, or the caption below, says it. */}
          {!stacked && <Tag tone="green" className="px-1.5 md:max-lg:hidden">−{savingsPercent}</Tag>}
        </button>
      </div>
      {stacked && (
        <p className="mt-1.5 text-center text-[11px] font-medium text-tag-green-ink">
          {t("annualSavings", { savings: savingsPercent })}
        </p>
      )}
    </div>
  );
}

/** The plan table for /precos. The page hero above it carries the heading. */
export function PricingSection() {
  const t = useTranslations("pricingSection");
  const { plans, hasPlans } = usePlans();
  const [billing, setBilling] = useState<BillingCycle>("annual");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const apiPlans = hasPlans ? plans : [];

  return (
    <section id="planos" aria-label={t("title")} className="scroll-mt-20 py-16 md:py-24">
      <Container>
        <PlanTable
          billing={billing}
          onBillingChange={setBilling}
          apiPlans={apiPlans}
          onContactClick={() => setIsContactModalOpen(true)}
        />

        <p className="mx-auto mt-6 max-w-[70ch] text-center text-[14px] text-subtle">{t("trial.after")}</p>

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
