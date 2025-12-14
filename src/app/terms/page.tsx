import { Footer } from "@/components/Footer";
import { TermsOfUse } from "@/components/TermsOfUse";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Utilização - Scooli",
  description:
    "Consulte os Termos de Utilização da Scooli (PT/EN). Regras de acesso e uso do website, aplicação, comunidade e créditos.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <main className="container mx-auto px-4 py-8 md:py-16">
          <TermsOfUse />
        </main>
      </div>
      <Footer />
    </>
  );
}


