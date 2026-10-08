import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { MarketingNav } from "@/components/MarketingNav";
import { Card, displayTitle, Kicker, SectionHeader } from "@/components/site/primitives";
import { TrackedLink } from "@/components/TrackedLink";
import { buttonVariants } from "@/components/ui/button";
import {
  type MarketingEventName,
  type MarketingEventProperties,
} from "@/lib/analytics";
import type { Locale } from "@/i18n/routing";
import { appSignUpUrl } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { Check, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Templates shared by the interior pages. They sit on the same primitives as
 * the homepage (`components/site/primitives.tsx`), so every page reads as one
 * system: type and space for hierarchy, hairlines instead of boxes, violet
 * only on actions.
 */

function toTrackingId(label: string) {
  return label
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

/** Small label above a heading. */
export function MarketingSectionBadge({ children }: { children: ReactNode }) {
  return <Kicker>{children}</Kicker>;
}

export function MarketingSectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  centered?: boolean;
}) {
  return (
    <SectionHeader
      kicker={eyebrow}
      title={title}
      description={description}
      align={centered ? "center" : "left"}
      className="mb-0 md:mb-0"
    />
  );
}

export function PublicSiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <MarketingNav />
      <main id="main-content" tabIndex={-1} className="overflow-x-clip">
        {children}
      </main>
      <Footer />
    </>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  primaryHref,
  primaryLabel,
  primaryAction,
  secondaryHref,
  secondaryLabel,
  secondaryAction,
  primaryEventName = "marketing_cta_clicked",
  primaryEventProperties,
  secondaryEventName = "marketing_cta_clicked",
  secondaryEventProperties,
  aside,
  showActions = true,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description: ReactNode;
  /** Pages like /confianca have nothing to sell in the hero. */
  showActions?: boolean;
  primaryHref?: string;
  primaryLabel?: string;
  primaryAction?: ReactNode;
  secondaryHref?: string;
  secondaryLabel?: string;
  secondaryAction?: ReactNode;
  primaryEventName?: MarketingEventName;
  primaryEventProperties?: MarketingEventProperties;
  secondaryEventName?: MarketingEventName;
  secondaryEventProperties?: MarketingEventProperties;
  aside?: ReactNode;
  children?: ReactNode;
}) {
  const t = useTranslations("common");
  const locale = useLocale() as Locale;
  const resolvedPrimaryLabel = primaryLabel ?? t("startFree");
  // Sign-up by default, carrying the visitor's language so the app does not have
  // to guess it from the browser — see appSignUpUrl.
  const resolvedPrimaryHref = primaryHref ?? appSignUpUrl(locale);

  return (
    <section className="border-b border-line pb-16 pt-14 md:pb-24 md:pt-20">
      <Container>
        <div
          className={cn(
            "grid gap-12 lg:items-center",
            aside ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16" : "max-w-[820px]",
          )}
        >
          <div>
            {eyebrow && <Kicker>{eyebrow}</Kicker>}
            <h1
              className={cn(
                displayTitle,
                // Size before `leading-*`: tailwind-merge drops a line-height
                // that comes before a font-size class.
                aside ? "text-[clamp(38px,4.4vw,56px)]" : "text-[clamp(40px,5vw,64px)]",
                "mt-4 leading-[1.04] tracking-[-0.03em]",
              )}
            >
              {title}
            </h1>
            <p className="mt-5 max-w-[620px] text-lg leading-relaxed text-subtle md:text-[19px]">
              {description}
            </p>
            {showActions && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              {primaryAction ?? (
                <TrackedLink
                  href={resolvedPrimaryHref}
                  eventName={primaryEventName}
                  eventProperties={{
                    cta_id: `page_hero_${toTrackingId(resolvedPrimaryLabel)}`,
                    placement: "page_hero_primary",
                    ...primaryEventProperties,
                  }}
                  className={buttonVariants({ variant: "primary", size: "lg" })}
                >
                  {resolvedPrimaryLabel}
                </TrackedLink>
              )}
              {secondaryAction ??
                (secondaryHref && secondaryLabel && (
                  <TrackedLink
                    href={secondaryHref}
                    eventName={secondaryEventName}
                    eventProperties={{
                      cta_id: `page_hero_${toTrackingId(secondaryLabel)}`,
                      placement: "page_hero_secondary",
                      ...secondaryEventProperties,
                    }}
                    className={buttonVariants({ variant: "secondary", size: "lg" })}
                  >
                    {secondaryLabel}
                  </TrackedLink>
                ))}
            </div>
            )}
            {children && <div className="mt-8">{children}</div>}
          </div>
          {aside && <div className="min-w-0">{aside}</div>}
        </div>
      </Container>
    </section>
  );
}

/**
 * A short statement in a bordered card. `icon` is accepted for older call
 * sites but no longer drawn: an icon on every card is the look we are avoiding.
 */
export function InfoCard({
  title,
  description,
  tone = "default",
}: {
  icon?: LucideIcon;
  title: string;
  description: string;
  tone?: "default" | "soft";
}) {
  return (
    <Card data-reveal className={cn("p-7", tone === "soft" && "bg-stone-soft")}>
      <h3 className="text-[17px] font-semibold leading-snug text-ink">{title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-subtle">{description}</p>
    </Card>
  );
}

export function StatCard({
  value,
  label,
  source,
}: {
  value: string;
  label: string;
  source?: string;
}) {
  return (
    <div data-reveal className="border-t border-line-strong pt-6">
      <p className="font-display text-[40px] font-medium leading-none tracking-[-0.02em] text-ink">
        {value}
      </p>
      <p className="mt-3 text-[15px] leading-relaxed text-body">{label}</p>
      {source && <p className="mt-2 font-mono text-xs text-faint">{source}</p>}
    </div>
  );
}

export function SurfacePanel({ children, className }: { children: ReactNode; className?: string }) {
  return <Card className={cn("p-7 md:p-9", className)}>{children}</Card>;
}

export function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-2.5 text-[15px] leading-relaxed text-body">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <Check aria-hidden className="mt-[3px] size-4 shrink-0 text-ink" strokeWidth={1.75} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function PageCtaBanner({
  title,
  description,
  primaryHref,
  primaryLabel,
  primaryAction,
  secondaryHref,
  secondaryLabel,
  secondaryAction,
  primaryEventName = "marketing_cta_clicked",
  primaryEventProperties,
  secondaryEventName = "marketing_cta_clicked",
  secondaryEventProperties,
}: {
  title: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
  primaryAction?: ReactNode;
  secondaryHref?: string;
  secondaryLabel?: string;
  secondaryAction?: ReactNode;
  primaryEventName?: MarketingEventName;
  primaryEventProperties?: MarketingEventProperties;
  secondaryEventName?: MarketingEventName;
  secondaryEventProperties?: MarketingEventProperties;
}) {
  const t = useTranslations("common");
  const locale = useLocale() as Locale;
  const resolvedPrimaryLabel = primaryLabel ?? t("startFree");
  const resolvedPrimaryHref = primaryHref ?? appSignUpUrl(locale);

  return (
    <div
      data-reveal
      className="grid gap-8 rounded-xl border border-line-strong bg-stone-soft p-8 md:p-12 lg:grid-cols-[1fr_auto] lg:items-end"
    >
      <div className="max-w-[640px]">
        <h2 className={cn(displayTitle, "text-[clamp(30px,3.4vw,42px)] leading-[1.1]")}>{title}</h2>
        <p className="mt-3 text-[17px] leading-relaxed text-subtle">{description}</p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {primaryAction ?? (
          <TrackedLink
            href={resolvedPrimaryHref}
            eventName={primaryEventName}
            eventProperties={{
              cta_id: `page_cta_banner_${toTrackingId(resolvedPrimaryLabel)}`,
              placement: "page_cta_banner_primary",
              ...primaryEventProperties,
            }}
            className={buttonVariants({ variant: "primary", size: "lg" })}
          >
            {resolvedPrimaryLabel}
          </TrackedLink>
        )}
        {secondaryAction ??
          (secondaryHref && secondaryLabel && (
            <TrackedLink
              href={secondaryHref}
              eventName={secondaryEventName}
              eventProperties={{
                cta_id: `page_cta_banner_${toTrackingId(secondaryLabel)}`,
                placement: "page_cta_banner_secondary",
                ...secondaryEventProperties,
              }}
              className="px-2 text-[15px] font-medium text-violet-ink hover:underline"
            >
              {secondaryLabel} →
            </TrackedLink>
          ))}
      </div>
    </div>
  );
}
