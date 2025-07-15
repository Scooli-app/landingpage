import { Footer } from "@/components/Footer";
import { PrivacyPolicy } from "@/components/PrivacyPolicy";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade - Scooli",
  description:
    "Consulte a política de privacidade da Scooli. Saiba como recolhemos, usamos e protegemos os seus dados.",
  robots: {
    index: true,
    follow: true,
  },
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
