import {
  DividerGrid,
  DividerItem,
  Section,
  SectionHeader,
  WindowFrame,
} from "@/components/site/primitives";
import { appMedia } from "@/lib/app-media";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

/** The second promise: Scooli stays with the teacher through the school year. */
export function YearSection() {
  const t = useTranslations("home.year");
  const items = t.raw("items") as { label: string; title: string }[];
  const month = appMedia(useLocale()).calendarMonth;

  return (
    <Section tone="stone" aria-labelledby="home-year-title">
      <SectionHeader
        id="home-year-title"
        kicker={t("kicker")}
        title={t("title")}
      />
      <DividerGrid columns={3} onStone className="mb-12">
        {items.map((item) => (
          <DividerItem key={item.title} label={item.label} title={item.title} />
        ))}
      </DividerGrid>
      <div data-reveal>
        <WindowFrame>
          {/* Seven columns are unreadable on a phone; show Monday to Thursday there. */}
          <Image
            src={month.mobile.src}
            alt={t("imageAlt")}
            width={month.mobile.width}
            height={month.mobile.height}
            sizes="100vw"
            className="w-full md:hidden"
          />
          <Image
            src={month.src}
            alt={t("imageAlt")}
            width={month.width}
            height={month.height}
            sizes="(min-width: 1248px) 1200px, 100vw"
            className="hidden w-full md:block"
          />
        </WindowFrame>
      </div>
    </Section>
  );
}
