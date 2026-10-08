import { MarketingScrollDepthTracker } from "@/components/MarketingScrollDepthTracker";
import { PromoBanner } from "@/components/PromoBanner";
import { RevealObserver } from "@/components/site/RevealObserver";
import { StructuredData } from "@/components/StructuredData";
import { Toaster } from "@/components/ui/sonner";
import {
  brandKeywords,
  getGlobalSchemas,
  openGraphLocale,
  SHARE_IMAGE_SIZE,
  shareImageUrl,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";
import { routing, type Locale } from "@/i18n/routing";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { hreflangAlternates } from "@/i18n/urls";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import type { ReactNode } from "react";
import "../globals.css";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

// Variable font: leaving `weight` unset keeps the full weight axis, which is
// what lets `axes: ["opsz"]` give large headings their display cut.
const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: requestedLocale } = await params;
  const locale: Locale = hasLocale(routing.locales, requestedLocale)
    ? requestedLocale
    : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "siteMeta" });
  const siteLanguage = locale === "en" ? "en" : "pt-PT";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${SITE_NAME} | ${t("titleSuffix")}`,
      template: `%s | ${SITE_NAME}`,
    },
    description: t("description"),
    // Root-level fallback keywords; every localized page overrides these with
    // its own locale-specific list via `getPageMetadata`.
    keywords: [...brandKeywords(locale)],
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    applicationName: SITE_NAME,
    generator: "Next.js",
    referrer: "origin-when-cross-origin",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    icons: {
      icon: [
        { url: "/favicon.svg?v=4", type: "image/svg+xml" },
        { url: "/favicon-96x96.png?v=4", sizes: "96x96", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png?v=4", sizes: "180x180" }],
      shortcut: "/favicon.svg?v=4",
    },
    manifest: "/manifest.webmanifest",
    alternates: {
      canonical: SITE_URL,
      // Root-level defaults; every page overrides these with its own canonical
      // and hreflang set via `getPageMetadata`.
      languages: hreflangAlternates(SITE_URL, "/"),
    },
    category: "education",
    classification: "Educational Software",
    openGraph: {
      type: "website",
      locale: openGraphLocale(locale),
      siteName: SITE_NAME,
      url: SITE_URL,
      title: `${SITE_NAME} | ${t("ogTitleSuffix")}`,
      description: t("ogDescription"),
      images: [
        {
          url: shareImageUrl(locale),
          ...SHARE_IMAGE_SIZE,
          alt: `${SITE_NAME} | ${t("ogTitleSuffix")}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE_NAME} | ${t("twitterTitleSuffix")}`,
      description: t("twitterDescription"),
      images: [shareImageUrl(locale)],
      creator: "@scooli_app",
      site: "@scooli_app",
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: {
      "ai-content-declaration": "human-created",
      // The English site is market-agnostic (see CLAUDE.md), so only the
      // Portuguese pages declare a geographic target.
      ...(locale === "en" ? {} : { "geo.region": "PT", "geo.placename": "Portugal" }),
      "content-language": siteLanguage,
      "DC.title": `${SITE_NAME} - ${t("dcTitleSuffix")}`,
      "DC.creator": SITE_NAME,
      "DC.subject": t("dcSubject"),
      "DC.description": t("dcDescription"),
      "DC.publisher": SITE_NAME,
      "DC.language": siteLanguage,
      "DC.type": "Software",
      "DC.format": "text/html",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // A locale outside the registry is a 404, not a silent fall back to Portuguese:
  // serving Portuguese content at /fr/ would get it indexed as French.
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Opt the tree into static rendering: without this next-intl reads the request
  // headers to find the locale and every page becomes dynamic (no-store HTML).
  setRequestLocale(locale);

  const messages = await getMessages({ locale });
  const schemas = getGlobalSchemas(locale);
  const t = await getTranslations({ locale, namespace: "common" });

  return (
    <html
      lang={locale}
      className={`${geist.variable} ${geistMono.variable} ${newsreader.variable}`}
    >
      <head>
        {schemas.map((schema, index) => (
          <StructuredData
            key={`schema-${index}`}
            id={`schema-${index}`}
            data={schema}
          />
        ))}
        {process.env.NODE_ENV === "production" && (
          <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
        )}
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          {t("skipToContent")}
        </a>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <PromoBanner />
          <MarketingScrollDepthTracker />
          <RevealObserver />
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: "border border-line-strong bg-white text-ink",
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
