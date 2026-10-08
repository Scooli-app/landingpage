import { PageSchemas } from "@/components/marketing/PageSchemas";
import { StructuredData } from "@/components/StructuredData";
import { TrackedFaqAccordion } from "@/components/TrackedFaqAccordion";
import type { Locale } from "@/i18n/routing";
import { InstitutionalComparison } from "@/components/marketing/InstitutionalComparison";
import { PricingPageClient } from "@/components/marketing/PricingPageClient";
import { getFAQPageSchema, getPageMetadata, getProductSchema } from "@/lib/seo";
import { PageCtaBanner, PageHero, PublicSiteShell } from "@/components/marketing/shared";
import { Section, SectionHeader } from "@/components/site/primitives";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricingPage.meta" });

  return getPageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/precos",
    locale,
  });
}


type Card = { title: string; description: string };

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pricingPage" });
  const productSchema = getProductSchema(locale);

  // The questions people ask before paying: what a generation is, fair use,
  // payment, schools. One FAQ instead of two rows of cards.
  const faqs = [
    ...(t.raw("faqCards") as Card[]),
    ...(t.raw("notes.cards") as Card[]),
  ].map((card) => ({ question: card.title, answer: card.description }));

  const tPageMeta = await getTranslations({ locale, namespace: "pricingPage.meta" });

  return (
    <PublicSiteShell>
      <PageSchemas
        id="precos"
        path="/precos"
        locale={locale}
        title={tPageMeta("title")}
        description={tPageMeta("description")}
      />
      <StructuredData id="pricing-product-schema" data={productSchema} />
      <StructuredData id="pricing-faq-schema" data={getFAQPageSchema(faqs)} />

      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        secondaryHref="#porque-institucional"
        secondaryLabel={t("hero.secondaryLabel")}
      />

      <PricingPageClient />

      <InstitutionalComparison />

      <Section bordered aria-labelledby="pricing-faq-title">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
          <SectionHeader
            id="pricing-faq-title"
            kicker={t("faq.kicker")}
            title={t("faq.title")}
            description={t("notes.description")}
            className="mb-0 md:mb-0"
          />
          <TrackedFaqAccordion
            items={faqs}
            faqGroup="pricing"
            itemValuePrefix="pricing-faq"
            className="border-t border-line"
          />
        </div>

        <div className="mt-20 md:mt-28">
          <PageCtaBanner
            title={t("cta.title")}
            description={t("cta.description")}
            secondaryHref="/confianca"
            secondaryLabel={t("cta.secondaryLabel")}
          />
        </div>
      </Section>
    </PublicSiteShell>
  );
}
