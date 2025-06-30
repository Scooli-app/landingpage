"use client";
import { Benefits } from "@/components/Benefits";
import { EmailForm } from "@/components/EmailForm";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <main className="container mx-auto px-4 py-8 md:py-16">
        <Hero />
        <Benefits />
        <EmailForm />
      </main>
      <Footer />
    </div>
  );
}
