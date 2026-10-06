import { PageCtaBanner, PageHero, StatCard } from "@/components/marketing/shared";
import { DividerGrid, DividerItem, Kicker, Section, SectionHeader } from "@/components/site/primitives";
import { PUBLIC_IMPACT_METRICS } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";

/**
 * Names, photos and locations are locale-independent (same people, same
 * places). Role titles and alt text come from `about.team.members` in the
 * message catalogues and are zipped in by index.
 */
type TeamMember = {
  name: string;
  image: string;
  location: string;
  /** Pedro's photo is framed wider than the others. */
  imageClassName?: string;
};

const team: TeamMember[] = [
  { name: "Miguel Rodrigues", image: "/team/miguel.jpg", location: "Santa Maria da Feira, Aveiro" },
  {
    name: "Pedro Rocha",
    image: "/team/pedro.jpeg",
    location: "Vila Nova de Gaia, Porto",
    imageClassName: "scale-[1.28]",
  },
  { name: "Hugo Silva", image: "/team/hugo.jpg", location: "Santa Maria da Feira, Aveiro" },
  { name: "Sílvia Valério", image: "/team/silvia.jpg", location: "Lisboa" },
];

function Portrait({
  src,
  alt,
  className,
  imageClassName,
  sizes,
}: {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes: string;
}) {
  return (
    <div className={cn("relative aspect-[4/5] overflow-hidden rounded-lg bg-stone-soft", className)}>
      <Image src={src} alt={alt} fill sizes={sizes} className={cn("object-cover", imageClassName)} />
    </div>
  );
}

export function AboutPage() {
  const t = useTranslations("about");
  const chapters = t.raw("story.chapters") as { title: string; description: string }[];
  const missionPoints = t.raw("mission.points") as { title: string; description: string }[];
  const members = t.raw("team.members") as { role: string; alt: string }[];

  const metrics = [
    { value: PUBLIC_IMPACT_METRICS.activeTeachers.minValue, label: t("metrics.activeTeachers") },
    { value: PUBLIC_IMPACT_METRICS.generatedDocuments.minValue, label: t("metrics.generatedDocuments") },
  ];

  return (
    <>
      <PageHero
        eyebrow={t("hero.badge")}
        title={t("hero.title")}
        description={t("hero.description")}
        showActions={false}
      />

      <Section aria-labelledby="about-story-title">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <div>
            <SectionHeader
              id="about-story-title"
              kicker={t("story.badge")}
              title={t("story.title")}
              className="mb-10 md:mb-10"
            />
            <ol className="border-t border-line">
              {chapters.map((chapter, index) => (
                <li key={chapter.title} data-reveal className="grid gap-2 border-b border-line py-7 sm:grid-cols-[48px_1fr]">
                  <span className="pt-1 font-mono text-xs text-faint">0{index + 1}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-ink">{chapter.title}</h3>
                    <p className="mt-2 text-[16px] leading-relaxed text-subtle">{chapter.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div data-reveal className="grid grid-cols-2 gap-4 self-start lg:sticky lg:top-28">
            <figure>
              <Portrait src="/team/miguel.jpg" alt={t("story.miguelAlt")} sizes="(min-width: 1024px) 260px, 45vw" />
              <figcaption className="mt-3 text-sm text-subtle">{t("story.miguelCaption")}</figcaption>
            </figure>
            <figure className="mt-12">
              <Portrait
                src="/team/pedro.jpeg"
                alt={t("story.pedroAlt")}
                imageClassName="scale-[1.28]"
                sizes="(min-width: 1024px) 260px, 45vw"
              />
              <figcaption className="mt-3 text-sm text-subtle">{t("story.pedroCaption")}</figcaption>
            </figure>
          </div>
        </div>
      </Section>

      <section aria-label={t("metrics.eyebrow")} className="border-y border-line py-14">
        <div className="mx-auto w-full max-w-[1248px] px-6">
          <Kicker>{t("metrics.eyebrow")}</Kicker>
          <div className="mt-6 grid max-w-[720px] gap-8 sm:grid-cols-2">
            {metrics.map((metric) => (
              <StatCard key={metric.label} value={`${metric.value}+`} label={metric.label} />
            ))}
          </div>
        </div>
      </section>

      <Section tone="stone" aria-labelledby="about-mission-title">
        <SectionHeader
          id="about-mission-title"
          kicker={t("mission.badge")}
          title={t("mission.title")}
          description={t("mission.description")}
        />
        <DividerGrid columns={3} onStone>
          {missionPoints.map((point) => (
            <DividerItem key={point.title} title={point.title}>
              {point.description}
            </DividerItem>
          ))}
        </DividerGrid>
      </Section>

      <Section aria-labelledby="about-team-title">
        <SectionHeader
          id="about-team-title"
          kicker={t("team.badge")}
          title={t("team.title")}
          description={t("team.description")}
        />
        <ul className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <li key={member.name} data-reveal>
              <Portrait
                src={member.image}
                alt={members[index]?.alt ?? member.name}
                imageClassName={member.imageClassName}
                sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 100vw"
              />
              <p className="mt-5 text-lg font-semibold text-ink">{member.name}</p>
              <p className="mt-1 text-[15px] text-body">{members[index]?.role}</p>
              <p className="mt-1 text-sm text-subtle">{member.location}</p>
            </li>
          ))}
        </ul>

        <div className="mt-20 md:mt-28">
          <PageCtaBanner
            title={t("finalCta.title")}
            description={t("finalCta.description")}
            primaryEventProperties={{
              cta_id: "about_final_cta_start_free",
              placement: "about_final_cta",
            }}
            secondaryHref="/contacto"
            secondaryLabel={t("finalCta.secondaryLabel")}
            secondaryEventProperties={{
              cta_id: "about_final_cta_contact",
              placement: "about_final_cta",
            }}
          />
        </div>
      </Section>
    </>
  );
}
