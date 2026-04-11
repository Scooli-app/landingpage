import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { TrackedLink } from "@/components/TrackedLink";
import { MarketingNav } from "@/components/MarketingNav";
import { Button } from "@/components/ui/button";
import {
  type MarketingEventName,
  type MarketingEventProperties,
} from "@/lib/analytics";
import { APP_URL } from "@/lib/seo";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";

function toTrackingId(label: string) {
  return label
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

export function MarketingSectionBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#d9ddff] bg-[color:var(--scooli-accent)] px-4 py-1.5 text-sm font-semibold text-[color:var(--scooli-primary)]">
      <Sparkles className="h-4 w-4" />
      {children}
    </span>
  );
}

export function MarketingSectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  centered?: boolean;
}) {
  return (
    <div className={cn("max-w-3xl space-y-4", centered && "mx-auto text-center")}>
      <MarketingSectionBadge>{eyebrow}</MarketingSectionBadge>
      <h2 className="font-display text-3xl leading-tight text-[color:var(--scooli-ink)] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="text-base leading-8 text-[color:var(--scooli-muted)] sm:text-lg">{description}</p>
    </div>
  );
}

export function PublicSiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-transparent text-[color:var(--scooli-ink)]">
      <header role="banner">
        <MarketingNav />
      </header>
      <main id="main-content" role="main" tabIndex={-1} className="overflow-hidden">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  primaryHref = `${APP_URL}/sign-up`,
  primaryLabel = "Começar gratuitamente",
  primaryAction,
  secondaryHref,
  secondaryLabel,
  secondaryAction,
  primaryEventName = "marketing_cta_clicked",
  primaryEventProperties,
  secondaryEventName = "marketing_cta_clicked",
  secondaryEventProperties,
  aside,
  children,
}: {
  eyebrow: string;
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
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate pt-8 sm:pt-10">
      <div className="absolute inset-x-0 top-0 -z-10 h-[540px] bg-[radial-gradient(circle_at_top_left,rgba(103,83,255,0.18),transparent_42%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_24%)]" />
      <Container className="pb-20 pt-8 sm:pb-24 lg:pb-28">
        <div className={cn("grid gap-10 lg:items-center", aside ? "lg:grid-cols-[0.95fr_1.05fr]" : "max-w-4xl")}>
          <div className="space-y-7">
            <MarketingSectionBadge>{eyebrow}</MarketingSectionBadge>
            <div className="space-y-5">
              <h1 className="font-display text-4xl leading-tight text-[color:var(--scooli-ink)] sm:text-5xl lg:text-6xl">
                {title}
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-[color:var(--scooli-muted)] sm:text-xl">{description}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              {primaryAction ?? (
                <Button asChild className="h-12 rounded-full px-6 text-base font-semibold shadow-[0_20px_32px_-18px_rgba(103,83,255,0.45)]">
                  <TrackedLink
                    href={primaryHref}
                    eventName={primaryEventName}
                    eventProperties={{
                      cta_id: `page_hero_${toTrackingId(primaryLabel)}`,
                      placement: "page_hero_primary",
                      ...primaryEventProperties,
                    }}
                  >
                    {primaryLabel}
                    <ArrowRight className="h-4 w-4" />
                  </TrackedLink>
                </Button>
              )}
              {secondaryAction ??
                (secondaryHref && secondaryLabel && (
                  <Button asChild variant="outline" className="h-12 rounded-full px-6 text-base font-semibold">
                    <TrackedLink
                      href={secondaryHref}
                      eventName={secondaryEventName}
                      eventProperties={{
                        cta_id: `page_hero_${toTrackingId(secondaryLabel)}`,
                        placement: "page_hero_secondary",
                        ...secondaryEventProperties,
                      }}
                    >
                      {secondaryLabel}
                    </TrackedLink>
                  </Button>
                ))}
            </div>
            {children}
          </div>
          {aside}
        </div>
      </Container>
    </section>
  );
}

export function InfoCard({
  icon: Icon,
  title,
  description,
  tone = "default",
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  tone?: "default" | "soft";
}) {
  return (
    <div
      className={cn(
        "rounded-[28px] border p-6 shadow-[0_24px_70px_-50px_rgba(19,35,58,0.35)]",
        tone === "default" && "border-slate-200/80 bg-white",
        tone === "soft" && "border-[#d9ddff] bg-[color:var(--scooli-surface-alt)]"
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-5 text-xl font-semibold text-[color:var(--scooli-ink)]">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[color:var(--scooli-muted)] sm:text-[15px]">{description}</p>
    </div>
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
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_-56px_rgba(19,35,58,0.28)]">
      <p className="font-display text-4xl text-[color:var(--scooli-ink)]">{value}</p>
      <p className="mt-3 text-sm leading-7 text-[color:var(--scooli-ink-soft)]">{label}</p>
      {source && <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{source}</p>}
    </div>
  );
}

export function SurfacePanel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_-56px_rgba(19,35,58,0.36)] sm:p-8", className)}>
      {children}
    </div>
  );
}

export function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 text-sm leading-7 text-[color:var(--scooli-muted)]">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[color:var(--scooli-primary)]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function PageCtaBanner({
  title,
  description,
  primaryHref = `${APP_URL}/sign-up`,
  primaryLabel = "Começar gratuitamente",
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
  return (
    <SurfacePanel className="bg-[linear-gradient(135deg,rgba(103,83,255,0.10),rgba(255,255,255,0.97)_45%,rgba(59,130,246,0.10))]">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="space-y-4">
          <h2 className="font-display text-3xl leading-tight text-[color:var(--scooli-ink)] sm:text-4xl">{title}</h2>
          <p className="max-w-2xl text-base leading-8 text-[color:var(--scooli-muted)] sm:text-lg">{description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          {primaryAction ?? (
            <Button asChild className="h-12 rounded-full px-6 text-base font-semibold shadow-[0_20px_32px_-18px_rgba(103,83,255,0.45)]">
              <TrackedLink
                href={primaryHref}
                eventName={primaryEventName}
                eventProperties={{
                  cta_id: `page_cta_banner_${toTrackingId(primaryLabel)}`,
                  placement: "page_cta_banner_primary",
                  ...primaryEventProperties,
                }}
              >
                {primaryLabel}
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            </Button>
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
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-[color:var(--scooli-primary)]"
              >
                {secondaryLabel}
                <ChevronRight className="h-4 w-4" />
              </TrackedLink>
            ))}
        </div>
      </div>
    </SurfacePanel>
  );
}
