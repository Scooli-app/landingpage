import { CancelSubscription } from "@/components/CancelSubscription";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cancelar Subscrição - Scooli",
  description:
    "Cancele a sua subscrição de notificações do Scooli a qualquer momento.",
  robots: "noindex, nofollow",
};

export default function CancelPage() {
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
