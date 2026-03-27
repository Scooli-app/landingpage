import { Toaster } from "@/components/ui/sonner";
import {
  BRAND_KEYWORDS,
  getHomePageSchemas,
  SITE_LANGUAGE,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["600", "700"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eef0ff" },
    { media: "(prefers-color-scheme: dark)", color: "#6753FF" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | IA prática para professores em Portugal`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Crie planificações, fichas e testes com IA, edite tudo ao seu ritmo e recupere tempo para ensinar. A Scooli foi pensada para professores em Portugal.",
  keywords: [...BRAND_KEYWORDS],
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
    languages: {
      "pt-PT": SITE_URL,
      "x-default": SITE_URL,
    },
  },
  category: "education",
  classification: "Educational Software",
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    siteName: SITE_NAME,
    url: SITE_URL,
    title: `${SITE_NAME} | Planificações, fichas e testes em minutos`,
    description:
      "A Scooli ajuda professores em Portugal a criar materiais prontos a editar, adaptar à turma e exportar sem começar do zero.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | IA prática para professores`,
    description:
      "Planificações, fichas e testes com IA, feitos para poupar tempo e manter o professor no controlo.",
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
    "geo.region": "PT",
    "geo.placename": "Portugal",
    "content-language": SITE_LANGUAGE,
    "DC.title": `${SITE_NAME} - IA prática para professores em Portugal`,
    "DC.creator": SITE_NAME,
    "DC.subject": "Educação, Inteligência Artificial, Professores, Portugal",
    "DC.description":
      "Ferramenta para criar planificações, fichas e testes com IA em contexto escolar português",
    "DC.publisher": SITE_NAME,
    "DC.language": SITE_LANGUAGE,
    "DC.type": "Software",
    "DC.format": "text/html",
  },
};

const schemas = getHomePageSchemas();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-PT" className={`${manrope.variable} ${fraunces.variable}`}>
      <head>
        {schemas.map((schema, index) => (
          <script
            key={`schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema),
            }}
          />
        ))}
        {process.env.NODE_ENV === "production" && (
          <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
        )}
      </head>
      <body className="min-h-screen bg-white text-[color:var(--scooli-ink)] antialiased">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            className: "glass border border-[color:var(--scooli-border)]",
          }}
        />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
