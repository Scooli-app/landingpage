"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  Coins,
  FileText,
  Gavel,
  Mail,
  Scale,
  Shield,
  Users,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

function SectionCard({
  icon,
  title,
  children,
  id,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <Card id={id} className="scroll-mt-28 border-slate-200/50 bg-white/80 shadow-lg backdrop-blur-sm">
      <CardContent className="p-8">
        <div className="flex items-start gap-4">
          <div className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600">
            {icon}
          </div>
          <div className="flex-1 space-y-3 text-slate-600">
            <h2 className="text-xl font-bold text-slate-900">{title}</h2>
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
          : "list-disc list-inside space-y-2"
      }
    >
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

const sectionIcons = [
  <Shield key="1" className="h-6 w-6 text-white" />,
  <Users key="2" className="h-6 w-6 text-white" />,
  <AlertTriangle key="3" className="h-6 w-6 text-white" />,
  <FileText key="4" className="h-6 w-6 text-white" />,
  <Shield key="5" className="h-6 w-6 text-white" />,
  <Coins key="6" className="h-6 w-6 text-white" />,
  <Scale key="7" className="h-6 w-6 text-white" />,
  <Gavel key="8" className="h-6 w-6 text-white" />,
  <Mail key="9" className="h-6 w-6 text-white" />,
];

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
    <div className="mx-auto w-full max-w-4xl">
      {/* Header */}
      <div className="mb-12 text-center">
        <div>
          <button
            type="button"
            onClick={() => router.back()}
            className="mb-8 inline-flex items-center text-slate-600 transition-colors duration-200 hover:text-slate-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("header.backLabel")}
          </button>
        </div>

        <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600">
          <FileText className="h-8 w-8 text-white" />
        </div>

        <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
          {t("header.title")}
        </h1>
        <p className="mx-auto max-w-2xl text-slate-600 leading-relaxed">
          {t("header.tagline")}
        </p>

        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm text-slate-600 backdrop-blur-sm">
          <Calendar className="h-4 w-4" />
          {t("header.lastUpdated", { date: t("header.lastUpdatedValue") })}
        </div>
      </div>

      {isEnglish && (
        <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          {t("disclaimer")}
        </div>
      )}

      {/* Content — legal body stays in Portuguese for every locale */}
      <div className="space-y-8">
        <SectionCard icon={sectionIcons[0]} title={t("sections.section1.title")}>
          {section1Paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </SectionCard>

        <SectionCard icon={sectionIcons[1]} title={t("sections.section2.title")}>
          <p>{t("sections.section2.intro")}</p>
          <BulletList items={section2Items} />
        </SectionCard>

        <SectionCard icon={sectionIcons[2]} title={t("sections.section3.title")}>
          <p>{t("sections.section3.intro")}</p>
          <BulletList items={section3Items} />
        </SectionCard>

        <SectionCard icon={sectionIcons[3]} title={t("sections.section4.title")}>
          <p>{t("sections.section4.intro")}</p>
          <BulletList items={section4Items} />
        </SectionCard>

        <SectionCard icon={sectionIcons[4]} title={t("sections.section5.title")}>
          <p>{t("sections.section5.intro")}</p>
          <BulletList items={section5Items} />
        </SectionCard>

        <SectionCard icon={sectionIcons[5]} title={t("sections.section6.title")}>
          <p>{t("sections.section6.intro")}</p>
          <ul className="list-disc list-inside space-y-2">
            {section6Items.map((item) => (
              <li key={item}>{item}</li>
            ))}
            <li>
              {t.rich("sections.section6.contactItem", {
                email: (chunks) => (
                  <a
                    href="mailto:info@scooli.app"
                    className="underline transition-colors duration-200 hover:text-slate-900"
                  >
                    {chunks}
                  </a>
                ),
              })}
            </li>
          </ul>
        </SectionCard>

        <SectionCard
          icon={sectionIcons[6]}
          id="uso-justo"
          title={t("sections.section7.title")}
        >
          <p>{t("sections.section7.paragraph1")}</p>
          <p>
            {t.rich("sections.section7.paragraph2", {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </p>

          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="mb-2 font-semibold text-amber-800">
              {t("sections.section7.abuseBox.heading")}
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700">
              {section7AbuseItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <p className="mt-4">{t("sections.section7.paragraph3")}</p>
          <BulletList items={section7AlphaItems} style="alpha" />
          <p className="mt-4 text-sm text-slate-500">
            {t("sections.section7.paragraph4")}
          </p>
        </SectionCard>

        <SectionCard icon={sectionIcons[7]} title={t("sections.section8.title")}>
          <BulletList items={section8Items} />
          <p>
            {t.rich("sections.section8.closingParagraph", {
              privacyLink: (chunks) => (
                <Link
                  href="/privacy"
                  className="underline transition-colors duration-200 hover:text-slate-900"
                >
                  {chunks}
                </Link>
              ),
            })}
          </p>
        </SectionCard>

        <SectionCard icon={sectionIcons[8]} title={t("sections.section9.title")}>
          <p>
            {t.rich("sections.section9.paragraph", {
              email: (chunks) => (
                <a
                  href="mailto:info@scooli.app"
                  className="underline transition-colors duration-200 hover:text-slate-900"
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
