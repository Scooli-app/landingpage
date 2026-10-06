import { InstitutionalContactButton } from "@/components/InstitutionalContactButton";
import { Kicker, Section, SectionHeader } from "@/components/site/primitives";
import { TrackedLink } from "@/components/TrackedLink";
import { buttonVariants } from "@/components/ui/button";
import type { Locale } from "@/i18n/routing";
import { appMedia, type ImageAsset } from "@/lib/app-media";
import { formatEuro } from "@/lib/format";
import { appSignUpUrl, PRICING } from "@/lib/seo";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import type { ReactNode } from "react";

function Panel({
  kicker,
  title,
  description,
  price,
  actions,
  visual,
  visualAlt,
}: {
  kicker: string;
  title: string;
  description: string;
  price: ReactNode;
  actions: ReactNode;
  visual: ImageAsset;
  visualAlt: string;
}) {
  return (
    <div
      data-reveal
      className="flex flex-col overflow-hidden rounded-xl border border-line-strong bg-white"
    >
      {/* What each audience will actually look at in the app. */}
      <div className="aspect-[19/10] overflow-hidden border-b border-line bg-stone-soft px-7 pt-7 md:px-11 md:pt-9">
        <Image
          src={visual.src}
          alt={visualAlt}
          width={visual.width}
          height={visual.height}
          sizes="(min-width: 1024px) 520px, 90vw"
          className="w-full rounded-t-lg border border-b-0 border-line object-cover object-top shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
        />
      </div>
      <div className="flex flex-1 flex-col p-7 md:p-11">
        <Kicker>{kicker}</Kicker>
        <h3 className="mt-3.5 font-display text-[32px] font-medium leading-[1.1] tracking-[-0.02em] text-ink">
          {title}
        </h3>
        <p className="mt-3 text-[16.5px] leading-relaxed text-subtle">
          {description}
        </p>
        <p className="mb-9 mt-3 text-sm text-subtle [&_b]:font-semibold [&_b]:text-ink">
          {price}
        </p>
        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3">
          {actions}
        </div>
      </div>
    </div>
  );
}

export function AudiencesSection() {
  const t = useTranslations("home.audiences");
  const tCommon = useTranslations("common");
  const locale = useLocale() as Locale;
  const media = appMedia(locale);
  const bold = { b: (chunks: ReactNode) => <b>{chunks}</b> };
  const linkClass = "text-[15px] font-medium text-violet-ink hover:underline";

  return (
    <Section tone="stone" aria-labelledby="home-audiences-title">
      <SectionHeader
        id="home-audiences-title"
        kicker={t("kicker")}
        title={t("title")}
        align="center"
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel
          kicker={t("teachers.kicker")}
          visual={media.dashboard}
          visualAlt={t("teachers.imageAlt")}
          title={t("teachers.title")}
          description={t("teachers.description")}
          price={t.rich("teachers.price", {
            ...bold,
            price: formatEuro(locale, PRICING.pro_monthly.priceCents),
          })}
          actions={
            <>
              <TrackedLink
                href={appSignUpUrl(locale)}
                eventName="marketing_cta_clicked"
                eventProperties={{
                  cta_id: "home_teachers_start_free",
                  placement: "home_audiences_teachers",
                }}
                className={buttonVariants({ variant: "primary", size: "lg" })}
              >
                {tCommon("startFree")}
              </TrackedLink>
              <TrackedLink
                href="/precos"
                eventName="marketing_cta_clicked"
                eventProperties={{
                  cta_id: "home_teachers_pricing",
                  placement: "home_audiences_teachers",
                }}
                className={linkClass}
              >
                {t("teachers.link")} →
              </TrackedLink>
            </>
          }
        />
        <Panel
          kicker={t("schools.kicker")}
          visual={media.library}
          visualAlt={t("schools.imageAlt")}
          title={t("schools.title")}
          description={t("schools.description")}
          price={t.rich("schools.price", bold)}
          actions={
            <>
              <InstitutionalContactButton
                source="home_schools_book_demo"
                label={tCommon("bookDemo")}
                title={t("schools.contactTitle")}
                description={t("schools.contactDescription")}
                variant="secondary"
                size="lg"
              />
              <TrackedLink
                href="/escolas"
                eventName="marketing_cta_clicked"
                eventProperties={{
                  cta_id: "home_schools_learn_more",
                  placement: "home_audiences_schools",
                }}
                className={linkClass}
              >
                {t("schools.link")} →
              </TrackedLink>
            </>
          }
        />
      </div>

      <p data-reveal className="mt-7 text-center text-[15px] text-subtle">
        {t("recommend.text")}{" "}
        <TrackedLink
          href="/recomendar-instituicao"
          eventName="marketing_cta_clicked"
          eventProperties={{
            cta_id: "home_recommend_institution",
            placement: "home_audiences_recommend",
          }}
          className={linkClass}
        >
          {t("recommend.link")} →
        </TrackedLink>
      </p>
    </Section>
  );
}
