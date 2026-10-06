import { Section, SectionHeader } from "@/components/site/primitives";
import { appMedia } from "@/lib/app-media";
import { useLocale, useTranslations } from "next-intl";
import { HowItWorksSteps } from "./HowItWorksSteps";

/** Three steps, each shown by a short clip recorded in the real app. */
export function HowItWorksSection() {
  const t = useTranslations("home.howItWorks");
  const steps = t.raw("steps") as { title: string; imageAlt: string }[];
  const films = appMedia(useLocale()).stepFilms;

  return (
    <Section id="como-funciona" aria-labelledby="home-how-title">
      <SectionHeader id="home-how-title" kicker={t("kicker")} title={t("title")} />
      <HowItWorksSteps steps={steps.map((step, index) => ({ ...step, film: films[index] }))} />
    </Section>
  );
}
