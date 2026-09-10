"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Calendar,
  Database,
  Eye,
  FileText,
  Mail,
  Shield,
  UserCheck,
} from "lucide-react";
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
    <ul className="list-disc list-inside text-slate-600 space-y-2">
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
 * The legal body below is rendered verbatim in Portuguese regardless of site
 * locale — see CLAUDE.md: mistranslating legal/GDPR terms is a liability, not
 * a copy problem. Only the page chrome (title, tagline, back link, and the
 * disclaimer shown to English readers) is authored per locale.
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
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div>
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center text-slate-600 hover:text-slate-900 transition-colors duration-200 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("header.backLabel")}
          </button>
        </div>

        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6">
          <Shield className="w-8 h-8 text-white" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          {t("header.title")}
        </h1>
        <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto">
          {t("header.tagline")}
        </p>

        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-slate-600 border border-slate-200 mt-4">
          <Calendar className="w-4 h-4" />
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
        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex-shrink-0">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-3">
                  {t("sections.intro.heading")}
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  {t("sections.intro.paragraph")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex-shrink-0">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-slate-900 mb-3">
                  {t("sections.dataCollection.heading")}
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">
                      {t("sections.dataCollection.provided.heading")}
                    </h3>
                    <BulletList items={dataCollectionProvided} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">
                      {t("sections.dataCollection.automatic.heading")}
                    </h3>
                    <BulletList items={dataCollectionAutomatic} />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex-shrink-0">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-slate-900 mb-3">
                  {t("sections.dataUse.heading")}
                </h2>
                <p className="text-slate-600 mb-4">{t("sections.dataUse.intro")}</p>
                <BulletList items={dataUseItems} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex-shrink-0">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-slate-900 mb-3">
                  {t("sections.legalBasis.heading")}
                </h2>
                <p className="text-slate-600 mb-4">{t("sections.legalBasis.intro")}</p>
                <BulletList items={legalBasisItems} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex-shrink-0">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-slate-900 mb-3">
                  {t("sections.dataSharing.heading")}
                </h2>
                <p className="text-slate-600 mb-4">{t("sections.dataSharing.intro")}</p>
                <BulletList items={dataSharingItems} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-slate-900 mb-3">
                  {t("sections.rights.heading")}
                </h2>
                <p className="text-slate-600 mb-4">{t("sections.rights.intro")}</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <BulletList items={rightsColumnOne} />
                  <BulletList items={rightsColumnTwo} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-slate-900 mb-3">
                  {t("sections.security.heading")}
                </h2>
                <p className="text-slate-600 mb-4">{t("sections.security.intro")}</p>
                <BulletList items={securityItems} />
                <p className="text-slate-600 mt-4">{t("sections.security.closing")}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex-shrink-0">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-slate-900 mb-3">
                  {t("sections.retention.heading")}
                </h2>
                <p className="text-slate-600 mb-4">{t("sections.retention.intro")}</p>
                <BulletList items={retentionItems} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
          <CardContent className="p-8">
            <div className="text-center">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                {t("sections.contact.heading")}
              </h2>
              <p className="text-slate-600 mb-6">{t("sections.contact.intro")}</p>
              <EmailContact showIcon showLabel />
              <p className="text-sm text-slate-500 mt-6">{t("sections.contact.closing")}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
