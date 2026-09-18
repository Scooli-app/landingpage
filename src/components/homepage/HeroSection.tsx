// Deliberately a Server Component: next-intl's `useTranslations` works in RSC,
// so the hero (the LCP element) keeps rendering as HTML instead of shipping as
// JavaScript. Only `HeroVideo` and `CurriculumNote` cross the client boundary.
import { CurriculumNote } from "@/components/CurriculumNote";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/TrackedLink";
import type { Locale } from "@/i18n/routing";
import { appSignUpUrl, PRICING } from "@/lib/seo";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { HeroVideo } from "./HeroVideo";
import { BrowserFrame, SectionBadge } from "./shared";

const heroVideoSrc = "/videos/test-creation.mp4";

function HeroPreview() {
  const t = useTranslations("home.hero");
  const steps = t.raw("previewSteps") as string[];

  return (
    <div className="relative">
      <BrowserFrame
        title={t("previewTitle")}
        subtitle={t("previewSubtitle")}
        className="relative z-10"
      >
        <div className="rounded-[28px] bg-[color:var(--scooli-surface-alt)] p-3 sm:p-4">
          <HeroVideo
            src={heroVideoSrc}
            className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-950 shadow-[0_24px_60px_-40px_rgba(19,35,58,0.55)]"
            ariaLabel={t("videoAria")}
          />

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={step}
                className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 text-sm text-slate-700"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {t("stepLabel", { number: index + 1 })}
                </p>
                <p className="mt-2 font-medium leading-6">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </BrowserFrame>
    </div>
  );
}

export function HeroSection() {
  const locale = useLocale() as Locale;
  const t = useTranslations("home.hero");
  const tCommon = useTranslations("common");
  const tCurriculum = useTranslations("curriculum");
  const highlights = t.raw("highlights") as string[];

  return (
    <section id="hero" className="relative isolate pt-6 sm:pt-10">
      <div className="absolute inset-x-0 top-0 -z-10 h-[620px] bg-[radial-gradient(ellipse_80%_55%_at_50%_-10%,rgba(103,83,255,0.09),transparent)]" />
      <div className="mx-auto w-full max-w-6xl px-6 pb-20 pt-8 md:max-w-7xl md:px-12 sm:pb-24 lg:pb-28">
        <div className="grid items-start gap-12 lg:grid-cols-[0.94fr_1.06fr] lg:gap-16">
          <div className="space-y-7">
            <SectionBadge>{tCurriculum("badge")}</SectionBadge>
            <div className="space-y-5">
              <h1 className="font-display text-4xl leading-tight text-[color:var(--scooli-ink)] sm:text-5xl lg:text-6xl">
                {t("title")}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[color:var(--scooli-muted)] sm:text-xl">
                {t("description")}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                className="h-12 rounded-full px-6 text-base font-semibold shadow-[0_20px_32px_-18px_rgba(103,83,255,0.45)]"
              >
                <TrackedLink
                  href={appSignUpUrl(locale)}
                  eventName="marketing_cta_clicked"
                  eventProperties={{
                    cta_id: "home_hero_start_free",
                    placement: "home_hero_primary",
                  }}
                >
                  {tCommon("startFree")}
                  <ArrowRight className="h-4 w-4" />
                </TrackedLink>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 rounded-full px-6 text-base font-semibold"
              >
                <TrackedLink
                  href="#como-funciona"
                  eventName="marketing_cta_clicked"
                  eventProperties={{
                    cta_id: "home_hero_view_how_it_works",
                    placement: "home_hero_secondary",
                  }}
                >
                  {t("seeHowItWorks")}
                </TrackedLink>
              </Button>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-[color:var(--scooli-ink)]">
                {t("freeCredits", {
                  credits: PRICING.free.generationsPerMonth,
                })}
              </p>
              <TrackedLink
                href="/escolas"
                eventName="marketing_cta_clicked"
                eventProperties={{
                  cta_id: "home_hero_schools",
                  placement: "home_hero_institutional",
                }}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--scooli-primary)]"
              >
                {t("schoolsLink")}
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            </div>

            <div className="flex flex-wrap gap-3">
              {highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm font-medium text-slate-600 shadow-[0_12px_28px_-24px_rgba(19,35,58,0.35)]"
                >
                  <CheckCircle2 className="h-4 w-4 text-[color:var(--scooli-primary)]" />
                  {highlight}
                </span>
              ))}
            </div>

            <CurriculumNote className="max-w-2xl" />
          </div>

          <HeroPreview />
        </div>
      </div>
    </section>
  );
}
