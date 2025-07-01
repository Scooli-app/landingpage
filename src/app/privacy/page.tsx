import { Footer } from "@/components/Footer";
import { PrivacyPolicy } from "@/components/PrivacyPolicy";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade - Scooli",
  description:
    "Política de privacidade e proteção de dados do Scooli, em conformidade com o RGPD.",
  keywords: "privacidade, RGPD, proteção de dados, política de privacidade",
};

export default function PrivacyPage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <main className="container mx-auto px-4 py-8 md:py-16">
          <PrivacyPolicy />
        </main>
      </div>
      <Footer />
    </>
  );
}
