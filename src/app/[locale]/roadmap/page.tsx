import { PageHero, PublicSiteShell } from "@/components/marketing/shared";
import { Section, Tag } from "@/components/site/primitives";
import { TrackedLink } from "@/components/TrackedLink";
import type { Locale } from "@/i18n/routing";
import { getPageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "roadmap.meta" });

  return getPageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/roadmap",
    locale,
  });
}

type Column = { status: string; title: string; items: { title: string; description: string }[] };

const columnTones = ["green", "violet", "blue"] as const;

/**
 * The public roadmap: available, in development, next. No dates. Anything not
 * shipped stays in the last two columns and is worded as such.
 */
export default async function RoadmapPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "roadmap" });
  const columns = t.raw("columns") as Column[];

  return (
    <PublicSiteShell>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        showActions={false}
      />

      <Section aria-label={t("hero.title")}>
        <div className="grid items-start gap-5 lg:grid-cols-3">
          {columns.map((column, index) => (
            <section
              key={column.status}
              data-reveal
              style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
              aria-labelledby={`roadmap-column-${index}`}
              className={cn(
                "rounded-xl p-6 md:p-7",
                index === 1 ? "border-2 border-violet-line bg-violet-wash/50" : "border border-line-strong bg-white",
              )}
            >
              <Tag tone={columnTones[index] ?? "blue"}>{column.status}</Tag>
              <h2 id={`roadmap-column-${index}`} className="mt-4 text-[20px] font-semibold tracking-[-0.01em] text-ink">
                {column.title}
              </h2>
              <ul className="mt-4 border-t border-line">
                {column.items.map((item) => (
                  <li key={item.title} className="border-b border-line py-4 last:border-b-0">
                    <p className="text-[16px] font-semibold text-ink">{item.title}</p>
                    <p className="mt-1 text-[15px] leading-relaxed text-subtle">{item.description}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p data-reveal className="mt-12 text-[16px] text-subtle">
          {t("suggest.text")}{" "}
          <TrackedLink
            href="/contacto"
            eventName="marketing_navigation_clicked"
            eventProperties={{ location: "roadmap_suggest", link_label: "contact" }}
            className="font-medium text-violet-ink hover:underline"
          >
            {t("suggest.link")} →
          </TrackedLink>
        </p>
      </Section>
    </PublicSiteShell>
  );
}
