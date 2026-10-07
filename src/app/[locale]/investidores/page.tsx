import { Container } from "@/components/Container";
import { InstitutionalContactButton } from "@/components/InstitutionalContactButton";
import { PitchDeckForm } from "@/components/investors/PitchDeckForm";
import { PublicSiteShell } from "@/components/marketing/shared";
import { LoopingVideo } from "@/components/site/LoopingVideo";
import { Kicker, Section, SectionHeader, displayTitle } from "@/components/site/primitives";
import { TrackedLink } from "@/components/TrackedLink";
import type { Locale } from "@/i18n/routing";
import { appMedia } from "@/lib/app-media";
import { formatEuro } from "@/lib/format";
import { getPageMetadata, PRICING, PUBLIC_IMPACT_METRICS } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { Building2, CalendarRange, Database, FileCheck2 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import type { ComponentProps } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "investors.meta" });

  return getPageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/investidores",
    locale,
  });
}

type Item = { title: string; description: string };

const edgeIcons = [FileCheck2, CalendarRange, Database, Building2];

const founders = [
  { name: "Miguel Rodrigues", image: "/team/miguel.jpg" },
  { name: "Pedro Rocha", image: "/team/pedro.jpeg", imageClassName: "scale-[1.28]" },
  { name: "Hugo Silva", image: "/team/hugo.jpg" },
  { name: "Sílvia Valério", image: "/team/silvia.jpg" },
];

function MoreLink({
  href,
  label,
  location,
}: {
  href: ComponentProps<typeof TrackedLink>["href"];
  label: string;
  location: string;
}) {
  return (
    <TrackedLink
      href={href}
      eventName="marketing_navigation_clicked"
      eventProperties={{ location, link_label: label }}
      className="inline-block text-[15px] font-medium text-violet-ink hover:underline"
    >
      {label} →
    </TrackedLink>
  );
}

/**
 * For investors, in the order they read: what Scooli is (one sentence and the
 * product on screen), the numbers, the problem, why Scooli wins, how it makes
 * money, the market, where it goes, who builds it, and how to follow up. Public
 * numbers and prices only; nothing about a round; Class State only as in
 * development.
 */
export default async function InvestorsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "investors" });
  const media = appMedia(locale);
  const problem = t.raw("problem.paragraphs") as string[];
  const edges = t.raw("edge.items") as Item[];
  const plans = t.raw("model.plans") as (Item & { price: string })[];
  const people = t.raw("team.people") as { role: string; background: string }[];
  const proPrice = formatEuro(locale, PRICING.pro_monthly.priceCents);

  const numbers = [
    { value: `${PUBLIC_IMPACT_METRICS.activeTeachers.minValue}+`, label: t("numbers.teachers") },
    { value: `${PUBLIC_IMPACT_METRICS.generatedDocuments.minValue}+`, label: t("numbers.documents") },
    { value: proPrice, label: t("numbers.pro") },
    { value: t("numbers.launchValue"), label: t("numbers.launch") },
  ];

  return (
    <PublicSiteShell>
      <section aria-labelledby="investors-hero-title" className="pt-12 md:pt-16">
        <Container>
          <div className="max-w-[900px]">
            <Kicker>{t("hero.eyebrow")}</Kicker>
            <h1
              id="investors-hero-title"
              className={cn(
                displayTitle,
                "mt-4 text-[clamp(40px,5.2vw,66px)] leading-[1.04] tracking-[-0.035em]",
              )}
            >
              {t.rich("hero.title", { em: (chunks) => <em>{chunks}</em> })}
            </h1>
            <p className="mt-5 max-w-[680px] text-lg leading-relaxed text-subtle md:text-[19px]">
              {t("hero.description")}
            </p>
          </div>
          <LoopingVideo
            video={media.heroFilm}
            label={t("hero.videoAria")}
            priority
            className="mt-12 rounded-2xl border border-line-strong shadow-[0_1px_2px_rgba(0,0,0,0.03),0_40px_90px_-48px_rgba(17,17,17,0.35)]"
          />
        </Container>
      </section>

      <section aria-label={t("numbers.label")} className="py-16 md:py-20">
        <Container>
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {numbers.map((item) => (
              <div key={item.label} data-reveal className="rounded-xl border border-line-strong bg-white p-6">
                <dt className="sr-only">{item.label}</dt>
                <dd className="font-display text-[44px] font-medium leading-none tracking-[-0.02em] text-ink">
                  {item.value}
                </dd>
                <dd className="mt-3 text-[15px] leading-relaxed text-subtle">{item.label}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <Section tone="stone" aria-labelledby="investors-problem-title">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionHeader
            id="investors-problem-title"
            kicker={t("problem.kicker")}
            title={t("problem.title")}
            className="mb-0 md:mb-0"
          />
          <div data-reveal className="space-y-5 text-[17px] leading-relaxed text-body lg:pt-9">
            {problem.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section aria-labelledby="investors-edge-title">
        <SectionHeader id="investors-edge-title" kicker={t("edge.kicker")} title={t("edge.title")} />
        <ul className="grid gap-4 sm:grid-cols-2">
          {edges.map((edge, index) => {
            const Icon = edgeIcons[index % edgeIcons.length];

            return (
              <li key={edge.title} data-reveal className="rounded-xl border border-line-strong bg-white p-7">
                <span className="grid size-11 place-items-center rounded-lg bg-violet-wash text-violet-ink">
                  <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 text-[19px] font-semibold tracking-[-0.01em] text-ink">{edge.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-subtle">{edge.description}</p>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section tone="stone" aria-labelledby="investors-model-title">
        <SectionHeader
          id="investors-model-title"
          kicker={t("model.kicker")}
          title={t("model.title")}
          description={t("model.description")}
        />
        <ol className="grid gap-4 md:grid-cols-3">
          {plans.map((plan, index) => (
            <li
              key={plan.title}
              data-reveal
              className={cn(
                "rounded-xl bg-white p-7",
                index === 2 ? "border-2 border-ink" : "border border-line-strong",
              )}
            >
              <p className="font-mono text-xs uppercase tracking-[0.06em] text-subtle">{plan.title}</p>
              <p className="mt-3 font-display text-[30px] font-medium leading-none text-ink">
                {plan.price.replace("{pro}", proPrice)}
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-subtle">{plan.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section aria-labelledby="investors-market-title">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div data-reveal>
            <Kicker>{t("market.kicker")}</Kicker>
            <h2
              id="investors-market-title"
              className={cn(displayTitle, "mt-3 text-[clamp(30px,3.4vw,42px)] leading-[1.1]")}
            >
              {t("market.title")}
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-subtle">{t("market.description")}</p>
          </div>
          <div data-reveal>
            <Kicker>{t("next.kicker")}</Kicker>
            <h2 className={cn(displayTitle, "mt-3 text-[clamp(30px,3.4vw,42px)] leading-[1.1]")}>
              {t("next.title")}
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-subtle">{t("next.description")}</p>
            <div className="mt-6">
              <MoreLink href="/roadmap" label={t("next.link")} location="investors_next" />
            </div>
          </div>
        </div>
      </Section>

      <Section tone="stone" aria-labelledby="investors-team-title">
        <SectionHeader
          id="investors-team-title"
          kicker={t("team.kicker")}
          title={t("team.title")}
          description={t("team.description")}
        />
        <ul className="grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {founders.map((person, index) => (
            <li key={person.name} data-reveal className="flex items-center gap-4">
              <div className="relative size-16 shrink-0 overflow-hidden rounded-full bg-stone">
                <Image
                  src={person.image}
                  alt={person.name}
                  fill
                  sizes="64px"
                  className={cn("object-cover", person.imageClassName)}
                />
              </div>
              <div>
                <p className="text-[16px] font-semibold text-ink">{person.name}</p>
                <p className="text-[14px] text-body">{people[index]?.role}</p>
                <p className="text-[14px] text-subtle">{people[index]?.background}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <MoreLink href="/sobre" label={t("team.link")} location="investors_team" />
        </div>
      </Section>

      <Section aria-labelledby="investors-contact-title">
        <SectionHeader id="investors-contact-title" kicker={t("contact.kicker")} title={t("contact.title")} />
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div data-reveal className="rounded-xl border border-line-strong bg-white p-6 sm:p-8">
            <h3 className="text-[19px] font-semibold tracking-[-0.01em] text-ink">{t("contact.deckTitle")}</h3>
            <p className="mt-1.5 text-[15px] text-subtle">{t("contact.deckDescription")}</p>
            <div className="relative mt-6">
              <PitchDeckForm />
            </div>
          </div>
          <div
            data-reveal
            className="flex flex-col items-start rounded-xl border border-line-strong bg-stone-soft p-6 sm:p-8"
          >
            <h3 className="text-[19px] font-semibold tracking-[-0.01em] text-ink">{t("contact.callTitle")}</h3>
            <p className="mt-1.5 text-[15px] leading-relaxed text-subtle">{t("contact.callDescription")}</p>
            <InstitutionalContactButton
              source="investors_page_call"
              label={t("contact.callCta")}
              title={t("contact.callDialogTitle")}
              description={t("contact.callDialogDescription")}
              variant="secondary"
              className="mt-6"
            />
          </div>
        </div>
      </Section>
    </PublicSiteShell>
  );
}
