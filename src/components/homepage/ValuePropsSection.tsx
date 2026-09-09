"use client";

import { Container } from "@/components/Container";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useTranslations } from "next-intl";
import { valuePropIcons, withIcons } from "./data";
import { InfoCard, SectionHeading } from "./shared";

export function ValuePropsSection() {
  const t = useTranslations("home.valueProps");
  const ref = useScrollReveal({ stagger: 0.1, y: 24 });

  const valueProps = withIcons(
    t.raw("items") as { title: string; description: string }[],
    valuePropIcons,
  );

  return (
    <section id="porque-a-scooli" className="bg-white py-16 sm:py-20 lg:py-24">
      <Container ref={ref} className="space-y-12">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          centered
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {valueProps.map((item) => (
            <InfoCard key={item.title} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
