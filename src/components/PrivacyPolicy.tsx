"use client";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { EmailContact } from "./EmailContact";

type BulletItem = string;
type BoldBulletItem = { bold: string; text: string };

function isBoldBulletItem(item: BulletItem | BoldBulletItem): item is BoldBulletItem {
  return typeof item === "object";
}

function BulletList({ items }: { items: (BulletItem | BoldBulletItem)[] }) {
  return (
    <ul className="list-disc pl-5 text-body space-y-2">
      {items.map((item) => {
        if (isBoldBulletItem(item)) {
          return (
            <li key={item.bold}>
              <strong>{item.bold}</strong> {item.text}
            </li>
          );
        }
        return <li key={item}>{item}</li>;
      })}
    </ul>
  );
}

/**
 * The legal body comes from each locale's messages. The Portuguese text is the
 * binding version; English readers get a translation plus a disclaimer saying
 * so. Keep both locales in step when the document changes.
 */
export function PrivacyPolicy() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("privacyPolicy");
  const isEnglish = locale === "en";

  const dataCollectionProvided = t.raw("sections.dataCollection.provided.items") as string[];
  const dataCollectionAutomatic = t.raw("sections.dataCollection.automatic.items") as string[];
  const dataUseItems = t.raw("sections.dataUse.items") as string[];
  const legalBasisItems = t.raw("sections.legalBasis.items") as BoldBulletItem[];
  const dataSharingItems = t.raw("sections.dataSharing.items") as string[];
  const rightsColumnOne = t.raw("sections.rights.columnOne") as BoldBulletItem[];
  const rightsColumnTwo = t.raw("sections.rights.columnTwo") as BoldBulletItem[];
  const securityItems = t.raw("sections.security.items") as string[];
  const retentionItems = t.raw("sections.retention.items") as string[];

  return (
    <div className="mx-auto max-w-[760px]">
      {/* Header */}
      <div className="mb-12">
        <div>
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center text-body hover:text-ink transition-colors duration-200 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
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
          <Calendar className="w-4 h-4" />
          {t("header.lastUpdated", { date: t("header.lastUpdatedValue") })}
        </div>
      </div>

      {isEnglish && (
        <div className="mb-8 rounded-xl border border-[#F1E3B5] bg-tag-yellow px-5 py-4 text-sm text-tag-yellow-ink">
          {t("disclaimer")}
        </div>
      )}

      {/* Content — in the page's language; Portuguese prevails */}
      <div className="space-y-8">
        <Card className="rounded-none border-0 border-t border-line bg-transparent py-0 shadow-none">
          <CardContent className="px-0 py-9">
            <div className="flex items-start">
              <div>
                <h2 className="mb-3 font-display text-[26px] font-medium leading-snug tracking-[-0.015em] text-ink">
                  {t("sections.intro.heading")}
                </h2>
                <p className="text-body leading-relaxed">
                  {t("sections.intro.paragraph")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-none border-0 border-t border-line bg-transparent py-0 shadow-none">
          <CardContent className="px-0 py-9">
            <div className="flex items-start">
              <div className="flex-1">
                <h2 className="mb-3 font-display text-[26px] font-medium leading-snug tracking-[-0.015em] text-ink">
                  {t("sections.dataCollection.heading")}
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-ink mb-2">
                      {t("sections.dataCollection.provided.heading")}
                    </h3>
                    <BulletList items={dataCollectionProvided} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink mb-2">
                      {t("sections.dataCollection.automatic.heading")}
                    </h3>
                    <BulletList items={dataCollectionAutomatic} />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-none border-0 border-t border-line bg-transparent py-0 shadow-none">
          <CardContent className="px-0 py-9">
            <div className="flex items-start">
              <div className="flex-1">
                <h2 className="mb-3 font-display text-[26px] font-medium leading-snug tracking-[-0.015em] text-ink">
                  {t("sections.dataUse.heading")}
                </h2>
                <p className="text-body mb-4">{t("sections.dataUse.intro")}</p>
                <BulletList items={dataUseItems} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-none border-0 border-t border-line bg-transparent py-0 shadow-none">
          <CardContent className="px-0 py-9">
            <div className="flex items-start">
              <div className="flex-1">
                <h2 className="mb-3 font-display text-[26px] font-medium leading-snug tracking-[-0.015em] text-ink">
                  {t("sections.legalBasis.heading")}
                </h2>
                <p className="text-body mb-4">{t("sections.legalBasis.intro")}</p>
                <BulletList items={legalBasisItems} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-none border-0 border-t border-line bg-transparent py-0 shadow-none">
          <CardContent className="px-0 py-9">
            <div className="flex items-start">
              <div className="flex-1">
                <h2 className="mb-3 font-display text-[26px] font-medium leading-snug tracking-[-0.015em] text-ink">
                  {t("sections.dataSharing.heading")}
                </h2>
                <p className="text-body mb-4">{t("sections.dataSharing.intro")}</p>
                <BulletList items={dataSharingItems} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-none border-0 border-t border-line bg-transparent py-0 shadow-none">
          <CardContent className="px-0 py-9">
            <div className="flex items-start">
              <div className="flex-1">
                <h2 className="mb-3 font-display text-[26px] font-medium leading-snug tracking-[-0.015em] text-ink">
                  {t("sections.rights.heading")}
                </h2>
                <p className="text-body mb-4">{t("sections.rights.intro")}</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <BulletList items={rightsColumnOne} />
                  <BulletList items={rightsColumnTwo} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-none border-0 border-t border-line bg-transparent py-0 shadow-none">
          <CardContent className="px-0 py-9">
            <div className="flex items-start">
              <div className="flex-1">
                <h2 className="mb-3 font-display text-[26px] font-medium leading-snug tracking-[-0.015em] text-ink">
                  {t("sections.security.heading")}
                </h2>
                <p className="text-body mb-4">{t("sections.security.intro")}</p>
                <BulletList items={securityItems} />
                <p className="text-body mt-4">{t("sections.security.closing")}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-none border-0 border-t border-line bg-transparent py-0 shadow-none">
          <CardContent className="px-0 py-9">
            <div className="flex items-start">
              <div className="flex-1">
                <h2 className="mb-3 font-display text-[26px] font-medium leading-snug tracking-[-0.015em] text-ink">
                  {t("sections.retention.heading")}
                </h2>
                <p className="text-body mb-4">{t("sections.retention.intro")}</p>
                <BulletList items={retentionItems} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-none border-0 border-t border-line bg-transparent py-0 shadow-none">
          <CardContent className="px-0 py-9">
            <div className="text-center">
              <h2 className="mb-4 font-display text-[26px] font-medium leading-snug tracking-[-0.015em] text-ink">
                {t("sections.contact.heading")}
              </h2>
              <p className="text-body mb-6">{t("sections.contact.intro")}</p>
              <EmailContact showIcon showLabel />
              <p className="text-sm text-subtle mt-6">{t("sections.contact.closing")}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
