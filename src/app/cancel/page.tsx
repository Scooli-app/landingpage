import { CancelSubscription } from "@/components/CancelSubscription";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cancelar Subscrição - Scooli",
  description: "Página para gerir ou cancelar a sua subscrição Scooli Pro.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function Cancel() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <main className="container mx-auto px-4 py-8 md:py-16">
          <CancelSubscription />
        </main>
      </div>
      <Footer />
    </>
  );
}
