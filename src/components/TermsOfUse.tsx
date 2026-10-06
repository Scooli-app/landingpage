"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

function SectionCard({
  title,
  children,
  id,
}: {
  title: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <Card id={id} className="scroll-mt-28 rounded-none border-0 border-t border-line bg-transparent py-0 shadow-none">
      <CardContent className="px-0 py-9">
        <div>
          <div className="space-y-3 text-body">
            <h2 className="font-display text-[26px] font-medium leading-snug tracking-[-0.015em] text-ink">{title}</h2>
            {children}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function BulletList({ items, style = "disc" }: { items: string[]; style?: "disc" | "alpha" }) {
  return (
    <ul
      className={
        style === "alpha"
          ? "ml-4 list-[lower-alpha] list-inside space-y-2"
          : "list-disc pl-5 space-y-2"
      }
    >
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

/**
 * The legal body below is rendered verbatim in Portuguese regardless of site
 * locale — see CLAUDE.md: mistranslating legal/GDPR terms is a liability, not
 * a copy problem. Only the page chrome (title, tagline, back link, and the
 * disclaimer shown to English readers) is authored per locale.
 */
export function TermsOfUse() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("termsOfUse");
  const isEnglish = locale === "en";

  const section2Items = t.raw("sections.section2.items") as string[];
  const section3Items = t.raw("sections.section3.items") as string[];
  const section4Items = t.raw("sections.section4.items") as string[];
  const section5Items = t.raw("sections.section5.items") as string[];
  const section6Items = t.raw("sections.section6.items") as string[];
  const section7AbuseItems = t.raw("sections.section7.abuseBox.items") as string[];
  const section7AlphaItems = t.raw("sections.section7.alphaItems") as string[];
  const section8Items = t.raw("sections.section8.items") as string[];
  const section1Paragraphs = t.raw("sections.section1.paragraphs") as string[];

  return (
    <div className="mx-auto w-full max-w-[760px]">
      {/* Header */}
      <div className="mb-12">
        <div>
          <button
            type="button"
            onClick={() => router.back()}
            className="mb-8 inline-flex items-center text-body transition-colors duration-200 hover:text-ink"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("header.backLabel")}
          </button>
        </div>

        <h1 className="mb-4 font-display text-[clamp(40px,5vw,56px)] font-medium leading-[1.05] tracking-[-0.03em] text-ink">
          {t("header.title")}
        </h1>
        <p className="max-w-[680px] text-lg leading-relaxed text-subtle">
          {t("header.tagline")}
        </p>

        <div className="mt-4 inline-flex items-center gap-2 font-mono text-xs text-faint">
          <Calendar className="h-4 w-4" />
          {t("header.lastUpdated", { date: t("header.lastUpdatedValue") })}
        </div>
      </div>

      {isEnglish && (
        <div className="mb-8 rounded-xl border border-[#F1E3B5] bg-tag-yellow px-5 py-4 text-sm text-tag-yellow-ink">
          {t("disclaimer")}
        </div>
      )}

      {/* Content — legal body stays in Portuguese for every locale */}
      <div className="space-y-8">
        <SectionCard title={t("sections.section1.title")}>
          {section1Paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </SectionCard>

        <SectionCard title={t("sections.section2.title")}>
          <p>{t("sections.section2.intro")}</p>
          <BulletList items={section2Items} />
        </SectionCard>

        <SectionCard title={t("sections.section3.title")}>
          <p>{t("sections.section3.intro")}</p>
          <BulletList items={section3Items} />
        </SectionCard>

        <SectionCard title={t("sections.section4.title")}>
          <p>{t("sections.section4.intro")}</p>
          <BulletList items={section4Items} />
        </SectionCard>

        <SectionCard title={t("sections.section5.title")}>
          <p>{t("sections.section5.intro")}</p>
          <BulletList items={section5Items} />
        </SectionCard>

        <SectionCard title={t("sections.section6.title")}>
          <p>{t("sections.section6.intro")}</p>
          <ul className="list-disc pl-5 space-y-2">
            {section6Items.map((item) => (
              <li key={item}>{item}</li>
            ))}
            <li>
              {t.rich("sections.section6.contactItem", {
                email: (chunks) => (
                  <a
                    href="mailto:info@scooli.app"
                    className="underline transition-colors duration-200 hover:text-ink"
                  >
                    {chunks}
                  </a>
                ),
              })}
            </li>
          </ul>
        </SectionCard>

        <SectionCard
          id="uso-justo"
          title={t("sections.section7.title")}
        >
          <p>{t("sections.section7.paragraph1")}</p>
          <p>
            {t.rich("sections.section7.paragraph2", {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </p>

          <div className="mt-4 rounded-xl border border-[#F1E3B5] bg-tag-yellow p-4">
            <p className="mb-2 font-semibold text-tag-yellow-ink">
              {t("sections.section7.abuseBox.heading")}
            </p>
            <ul className="list-disc pl-5 space-y-2 text-body">
              {section7AbuseItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <p className="mt-4">{t("sections.section7.paragraph3")}</p>
          <BulletList items={section7AlphaItems} style="alpha" />
          <p className="mt-4 text-sm text-subtle">
            {t("sections.section7.paragraph4")}
          </p>
        </SectionCard>

        <SectionCard title={t("sections.section8.title")}>
          <BulletList items={section8Items} />
          <p>
            {t.rich("sections.section8.closingParagraph", {
              privacyLink: (chunks) => (
                <Link
                  href="/privacy"
                  className="underline transition-colors duration-200 hover:text-ink"
                >
                  {chunks}
                </Link>
              ),
            })}
          </p>
        </SectionCard>

        <SectionCard title={t("sections.section9.title")}>
          <p>
            {t.rich("sections.section9.paragraph", {
              email: (chunks) => (
                <a
                  href="mailto:info@scooli.app"
                  className="underline transition-colors duration-200 hover:text-ink"
                >
                  {chunks}
                </a>
              ),
            })}
          </p>
        </SectionCard>
      </div>
    </div>
  );
}
