import { Container } from "@/components/Container";
import { InstitutionalContactButton } from "@/components/InstitutionalContactButton";
import { LoopingVideo } from "@/components/site/LoopingVideo";
import { displayTitle, Kicker } from "@/components/site/primitives";
import { TrackedLink } from "@/components/TrackedLink";
import { buttonVariants } from "@/components/ui/button";
import type { Locale } from "@/i18n/routing";
import { appMedia } from "@/lib/app-media";
import { appSignUpUrl } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";

export function HeroSection() {
  const t = useTranslations("home.hero");
  const tCommon = useTranslations("common");
  const tSchools = useTranslations("home.audiences.schools");
  const locale = useLocale() as Locale;

  return (
    <section aria-labelledby="home-hero-title" className="pt-12 text-center md:pt-16">
      <Container>
        <Kicker>{t("kicker")}</Kicker>
        <h1
          id="home-hero-title"
          className={cn(
            displayTitle,
            "mx-auto mt-4 max-w-[880px] text-[clamp(42px,5.6vw,70px)] leading-[1.03] tracking-[-0.035em]",
          )}
        >
          {t.rich("title", { em: (chunks) => <em>{chunks}</em> })}
        </h1>
        <p className="mx-auto mt-5 max-w-[600px] text-lg leading-relaxed text-subtle md:text-[19px] [&_strong]:font-medium [&_strong]:text-body">
          {t.rich("description", { strong: (chunks) => <strong>{chunks}</strong> })}
        </p>

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <TrackedLink
            href={appSignUpUrl(locale)}
            eventName="marketing_cta_clicked"
            eventProperties={{ cta_id: "home_hero_start_free", placement: "home_hero_primary" }}
            className={buttonVariants({ variant: "primary", size: "lg" })}
          >
            {tCommon("startFree")}
          </TrackedLink>
          <InstitutionalContactButton
            source="home_hero_book_demo"
            label={tCommon("bookDemo")}
            title={tSchools("contactTitle")}
            description={tSchools("contactDescription")}
            variant="secondary"
            size="lg"
          />
        </div>

        {/* The film is the headline made visible: the year, prepared one week at a time. */}
        <LoopingVideo
          video={appMedia(locale).heroFilm}
          label={t("videoAria")}
          priority
          className="mx-auto mt-10 max-w-[1160px] rounded-2xl border border-line-strong shadow-[0_1px_2px_rgba(0,0,0,0.03),0_40px_90px_-48px_rgba(17,17,17,0.35)] md:mt-12"
        />
      </Container>
    </section>
  );
}
