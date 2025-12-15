import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.scooli.app";
const ogImage = `${siteUrl}/scooli.svg`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Scooli | IA para professores em Portugal",
    template: "%s | Scooli",
  },
  description:
    "A plataforma portuguesa que devolve tempo aos professores: gere apresentações, planos de aula, testes e quizzes alinhados ao currículo com IA.",
  keywords: [
    "Scooli",
    "IA para professores",
    "plano de aula",
    "apresentações",
    "testes",
    "edtech Portugal",
    "currículo português",
    "recursos educativos",
    "biblioteca comunitária",
  ],
  authors: [{ name: "Scooli", url: siteUrl }],
  creator: "Scooli",
  publisher: "Scooli",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Scooli | Ferramentas com IA para professores portugueses",
    description:
      "Poupe horas todas as semanas. Geração de recursos, organização e comunidade para docentes em Portugal.",
    type: "website",
    locale: "pt_PT",
    siteName: "Scooli",
    url: siteUrl,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Scooli - IA para professores",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scooli | Ferramentas com IA para professores portugueses",
    description:
      "Poupe horas todas as semanas com geração de recursos alinhados ao currículo.",
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "Scooli",
  url: siteUrl,
  logo: `${siteUrl}/scooli.svg`,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "info@scooli.app",
    availableLanguage: "Portuguese",
  },
  sameAs: [siteUrl],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
      name: "Scooli",
  url: siteUrl,
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-PT" className={inter.className}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body className="min-h-screen bg-white text-[color:var(--scooli-ink)] antialiased">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            className: "glass border border-[color:var(--scooli-border)]",
          }}
        />
        <Analytics />
      </body>
    </html>
  );
}
