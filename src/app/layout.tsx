import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import "../app/globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Scooli - Plataforma Educativa para Professores Portugueses",
  description:
    "Plataforma educativa que automatiza a criação de apresentações, planos de aula e testes para professores portugueses. IA avançada para todos os níveis de ensino.",
  keywords: "educação, professores, Portugal, ensino, plataforma educativa, IA, inteligência artificial, planos de aula, apresentações, testes",
  authors: [{ name: "Scooli", url: "https://scooli.app" }],
  creator: "Scooli",
  publisher: "Scooli",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://scooli.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Scooli - Plataforma Educativa para Professores Portugueses",
    description:
      "Transforme a sua experiência de ensino com ferramentas inovadoras. Gere apresentações, planos de aula e testes automaticamente.",
    type: "website",
    locale: "pt_PT",
    siteName: "Scooli",
    url: "https://scooli.app",
    images: [
      {
        url: "/logo-full-blue.png",
        width: 1200,
        height: 630,
        alt: "Scooli - Plataforma Educativa para Professores",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scooli - Plataforma Educativa para Professores Portugueses",
    description: "Transforme a sua experiência de ensino com ferramentas inovadoras.",
    images: ["/logo-full-blue.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

// Structured Data for Organization
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": "https://scooli.app/#organization",
  name: "Scooli",
  alternateName: "Scooli - Plataforma Educativa",
  description: "Plataforma educativa para professores portugueses de todos os níveis de ensino",
  url: "https://scooli.app",
  logo: {
    "@type": "ImageObject",
    url: "https://scooli.app/logo-full-blue.png",
    width: 120,
    height: 40,
  },
  sameAs: [
    "https://scooli.app",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "contacto@scooli.app",
    availableLanguage: "Portuguese",
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "PT",
    addressLocality: "Portugal",
  },
  areaServed: {
    "@type": "Country",
    name: "Portugal",
  },
  serviceType: "Educational Technology Platform",
  foundingDate: "2025",
  founder: {
    "@type": "Person",
    name: "Equipa Scooli",
  },
};

// FAQ Schema for AEO
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "O que é a Scooli?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Scooli é uma plataforma educativa que conecta professores portugueses com ferramentas inovadoras para todos os níveis de ensino. Permite gerar automaticamente apresentações, planos de aula, testes e quizzes.",
      },
    },
    {
      "@type": "Question",
      name: "Como funciona a geração automática de conteúdo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Scooli utiliza inteligência artificial avançada para gerar conteúdo educativo personalizado. Os professores introduzem os parâmetros desejados e a plataforma cria automaticamente apresentações, planos de aula e testes alinhados com o currículo português.",
      },
    },
    {
      "@type": "Question",
      name: "A Scooli é gratuita?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Scooli oferece um pacote de boas-vindas com 100 créditos gratuitos para novos utilizadores. Os utilizadores ativos podem ganhar mais créditos contribuindo para a biblioteca comunitária. Existe também um plano Scooli Pro com funcionalidades ilimitadas.",
      },
    },
    {
      "@type": "Question",
      name: "Quando estará disponível a Scooli?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Scooli está em desenvolvimento e será lançada brevemente. Registe o seu email para ser notificado quando a plataforma estiver disponível.",
      },
    },
    {
      "@type": "Question",
      name: "A Scooli é compatível com o currículo português?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim, a Scooli foi desenvolvida especificamente para o contexto educativo português, com conhecimento profundo do currículo nacional e das melhores práticas educativas em Portugal.",
      },
    },
  ],
};

// HowTo Schema for AEO - Educational Content Generation
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Como gerar conteúdo educativo com a Scooli",
  description: "Guia passo a passo para gerar apresentações, planos de aula e testes usando a plataforma Scooli",
  image: {
    "@type": "ImageObject",
    url: "https://scooli.app/logo-full-blue.png",
    width: 1200,
    height: 630,
  },
  step: [
    {
      "@type": "HowToStep",
      name: "Registar na plataforma",
      text: "Crie a sua conta na Scooli e receba 100 créditos gratuitos para começar a gerar conteúdo educativo.",
      url: "https://scooli.app",
    },
    {
      "@type": "HowToStep",
      name: "Selecionar tipo de conteúdo",
      text: "Escolha entre gerar apresentações, planos de aula, testes ou quizzes baseados no currículo português.",
    },
    {
      "@type": "HowToStep",
      name: "Introduzir parâmetros",
      text: "Especifique a matéria, nível de ensino, objetivos de aprendizagem e duração da aula.",
    },
    {
      "@type": "HowToStep",
      name: "Gerar conteúdo",
      text: "A IA da Scooli cria automaticamente conteúdo personalizado e alinhado com as metas curriculares.",
    },
    {
      "@type": "HowToStep",
      name: "Personalizar e guardar",
      text: "Edite o conteúdo gerado conforme necessário e guarde-o na sua biblioteca pessoal para reutilização.",
    },
  ],
  totalTime: "PT5M",
  estimatedCost: {
    "@type": "MonetaryAmount",
    currency: "EUR",
    value: "0",
  },
  tool: [
    {
      "@type": "SoftwareApplication",
      name: "Scooli",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
    },
  ],
  audience: {
    "@type": "Audience",
    audienceType: "Professores portugueses",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
            __html: JSON.stringify(faqSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(howToSchema),
          }}
        />
      </head>
      <body className="bg-scooli-background text-scooli-dark font-sans min-h-screen">
        <header className="w-full py-6 bg-blue-50" role="banner">
          <div className="container mx-auto px-4 flex items-center">
            <Link href="/" aria-label="Scooli - Página inicial">
              <Image
                src="/logo-full-blue.png"
                alt="Scooli logo"
                className="h-10"
                width={120}
                height={150}
                priority
              />
            </Link>
          </div>
        </header>
        <main role="main">
          {children}
        </main>
        <Toaster
          position="bottom-right"
          swipeDirections={["bottom", "right"]}
          duration={4000}
          richColors={true}
          toastOptions={{
            className: "animate-slide-in-right",
          }}
        />
        <Analytics />
      </body>
    </html>
  );
}
