"use client";

import { Container } from "@/components/Container";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useTranslations } from "next-intl";
import { withKinds } from "./data";
import { OutputCard } from "./OutputCard";
import { SectionHeading } from "./shared";

export function RealOutputsSection() {
  const t = useTranslations("home.outputs");
  const ref = useScrollReveal({ stagger: 0.1, y: 24 });

  const outputs = withKinds(
    t.raw("items") as {
      label: string;
      title: string;
      description: string;
      alt: string;
    }[],
  );

  return (
    <section id="outputs" className="py-16 sm:py-20 lg:py-24">
      <Container ref={ref} className="space-y-12">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          centered
        />
        <div className="grid gap-6 xl:grid-cols-3">
          {outputs.map((output) => (
            <OutputCard key={output.label} output={output} />
          ))}
        </div>
        <p
          data-reveal
          className="mx-auto max-w-2xl text-center text-sm leading-7 text-[color:var(--scooli-muted)]"
        >
          {t("note")}
        </p>
      </Container>
    </section>
  );
}
