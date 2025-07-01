import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react";
import "../app/globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Scooli - Plataforma Educativa para Professores Portugueses",
  description:
    "A plataforma educativa que conecta professores portugueses com ferramentas inovadoras para todos os níveis de ensino.",
  keywords: "educação, professores, Portugal, ensino, plataforma educativa",
  authors: [{ name: "Scooli" }],
  openGraph: {
    title: "Scooli - Plataforma Educativa para Professores Portugueses",
    description:
      "Transforme a sua experiência de ensino com ferramentas inovadoras.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-PT" className={inter.className}>
      <body className="bg-scooli-background text-scooli-dark font-sans min-h-screen">
        {children}
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
