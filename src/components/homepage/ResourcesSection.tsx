import { Section, SectionHeader } from "@/components/site/primitives";
import { NAV_TOOL_SLUGS, type NavToolSlug } from "@/components/site/nav-data";
import { TrackedLink } from "@/components/TrackedLink";
import { cn } from "@/lib/utils";
import { appMedia } from "@/lib/app-media";
import {
  CalendarRange,
  ClipboardCheck,
  FileText,
  ListChecks,
  NotebookPen,
  Presentation,
  type LucideIcon,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import type { ReactNode } from "react";

function Sheet({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "h-full overflow-hidden rounded-t-md border border-b-0 border-line bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Two slides of a generated deck, the title slide resting on a content slide. */
function SlideStack({ alt }: { alt: string }) {
  const [titleSlide, contentSlide] = appMedia(useLocale()).slides;
  const slideClass =
    "absolute w-[78%] rounded-md border border-black/10 shadow-[0_12px_30px_-14px_rgba(17,17,17,0.35)]";

  return (
    <div className="flex h-full items-center">
      <div className="relative aspect-[16/11] w-full">
        <Image
          src={contentSlide.src}
          alt=""
          width={contentSlide.width}
          height={contentSlide.height}
          sizes="(min-width: 1024px) 260px, 70vw"
          className={cn(slideClass, "right-0 top-1.5")}
        />
        <Image
          src={titleSlide.src}
          alt={alt}
          width={titleSlide.width}
          height={titleSlide.height}
          sizes="(min-width: 1024px) 260px, 70vw"
          className={cn(slideClass, "left-0 top-[13%]")}
        />
      </div>
    </div>
  );
}

/**
 * The preview for one of the six resources (also used on /ferramentas): a crop
 * of a real document generated in the app, in the page's language.
 */
export function ResourcePreview({
  slug,
  alt,
}: {
  slug: NavToolSlug;
  alt: string;
}) {
  const locale = useLocale();
  if (slug === "apresentacoes") {
    return <SlideStack alt={alt} />;
  }

  const image = appMedia(locale).documents[slug];
  if (!image) {
    return null;
  }

  return (
    <Sheet>
      <Image
        src={image.src}
        alt={alt}
        width={image.width}
        height={image.height}
        sizes="(min-width: 1024px) 340px, 90vw"
        className="h-auto w-full"
      />
    </Sheet>
  );
}

export const resourceIcons: Record<NavToolSlug, LucideIcon> = {
  "plano-de-aula": NotebookPen,
  "fichas-de-trabalho": FileText,
  "gerador-de-testes": ClipboardCheck,
  quizzes: ListChecks,
  planificacoes: CalendarRange,
  apresentacoes: Presentation,
};

/**
 * The third promise: the resources themselves, in order of relevance. Icons
 * rather than document crops: six crops side by side read as six copies of the
 * same page (the crops still illustrate each tool on /ferramentas).
 */
export function ResourcesSection() {
  const t = useTranslations("home.resources");

  return (
    <Section aria-labelledby="home-resources-title">
      <SectionHeader
        id="home-resources-title"
        kicker={t("kicker")}
        title={t("title")}
        description={t("description")}
      />

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {NAV_TOOL_SLUGS.map((slug, index) => {
          const Icon = resourceIcons[slug];

          return (
            <li
              key={slug}
              data-reveal
              style={
                {
                  "--reveal-delay": `${(index % 3) * 80}ms`,
                } as React.CSSProperties
              }
            >
              <TrackedLink
                href={{ pathname: "/ferramentas/[slug]", params: { slug } }}
                eventName="marketing_navigation_clicked"
                eventProperties={{ location: "home_resources", link_label: slug }}
                className="group flex h-full flex-col rounded-xl border border-line-strong bg-white p-6 transition-colors hover:border-[#C9C8C3] md:p-7"
              >
                <span className="grid size-11 place-items-center rounded-lg bg-stone-soft text-ink transition-colors group-hover:bg-violet-wash group-hover:text-violet-ink">
                  <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-6 flex items-center justify-between gap-4 text-[17px] font-semibold text-ink">
                  {t(`items.${slug}.title`)}
                  <span
                    aria-hidden
                    className="text-subtle transition-transform group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-subtle">
                  {t(`items.${slug}.description`)}
                </p>
              </TrackedLink>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
