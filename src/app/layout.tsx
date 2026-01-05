import { Toaster } from "@/components/ui/sonner";
import {
  getHomePageSchemas,
  BRAND_KEYWORDS,
  SITE_NAME,
  SITE_URL,
  SITE_LOCALE,
  SITE_LANGUAGE,
} from "@/lib/seo";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
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
    default: `${SITE_NAME} | IA para professores em Portugal`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Scooli é a plataforma portuguesa com IA que devolve tempo aos professores. Gere apresentações, planos de aula, testes e quizzes alinhados às aprendizagens essenciais em segundos. RGPD-ready.",
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
      { url: "/favicon.svg?v=3", type: "image/svg+xml" },
      { url: "/favicon-96x96.png?v=3", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png?v=3", sizes: "180x180" }],
    shortcut: "/favicon.ico?v=3",
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
    title: `${SITE_NAME} | Ferramentas com IA para professores portugueses`,
    description:
      "Poupe horas todas as semanas. Geração de apresentações, planos de aula, testes e quizzes alinhados ao currículo português. Organização e comunidade para docentes em Portugal.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Ferramentas com IA para professores portugueses`,
    description:
      "Poupe horas com geração de recursos educativos alinhados às aprendizagens essenciais. Apresentações, planos de aula, testes e quizzes em segundos.",
    // Twitter image is generated dynamically by twitter-image.tsx
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
  verification: {
    // Add verification tokens when available
    // google: "your-google-verification-token",
    // yandex: "your-yandex-verification-token",
  },
  other: {
    // AI/LLM crawler hints
    "ai-content-declaration": "human-created",
    // Geo targeting
    "geo.region": "PT",
    "geo.placename": "Portugal",
    // Content language
    "content-language": SITE_LANGUAGE,
    // Dublin Core metadata for better indexing
    "DC.title": `${SITE_NAME} - IA para professores em Portugal`,
    "DC.creator": SITE_NAME,
    "DC.subject": "Educação, Inteligência Artificial, Professores, Portugal",
    "DC.description":
      "Plataforma de IA para professores portugueses criarem recursos educativos",
    "DC.publisher": SITE_NAME,
    "DC.language": SITE_LANGUAGE,
    "DC.type": "Software",
    "DC.format": "text/html",
  },
};

// Pre-generate schemas for SSR
const schemas = getHomePageSchemas();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-PT" className={inter.className}>
      <head>
        {/* Structured Data for SEO & AEO */}
        {schemas.map((schema, index) => (
          <script
            key={`schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema),
            }}
          />
        ))}

        {/* Preconnect to critical domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* DNS prefetch for potential external resources */}
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
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
