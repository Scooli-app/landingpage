"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Home, Search, ArrowLeft } from "lucide-react";

import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden flex items-center justify-center">
      {/* Background gradients */}
      <div className="absolute left-[-12%] top-[-25%] h-[36vh] w-[36vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(103,83,255,0.16),transparent)] blur-3xl" />
      <div className="absolute right-[-8%] bottom-[-14%] h-[28vh] w-[28vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(78,59,192,0.14),transparent)] blur-3xl" />
      <div className="noise-overlay" />

      <Container className="relative text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center gap-8"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <Image
              src="/scooli.svg"
              alt="Scooli"
              width={80}
              height={80}
              className="opacity-80"
            />
          </motion.div>

          {/* 404 Number */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="relative"
          >
            <span className="text-[10rem] md:text-[14rem] font-bold leading-none text-transparent bg-clip-text bg-gradient-to-br from-[#6753FF] to-[#4E3BC0] select-none">
              404
            </span>
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Search className="h-16 w-16 md:h-24 md:w-24 text-[#6753FF] opacity-20" />
            </motion.div>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-3 max-w-md"
          >
            <h1 className="text-2xl md:text-3xl font-bold text-[color:var(--scooli-ink)]">
              Página não encontrada
            </h1>
            <p className="text-base md:text-lg text-[color:var(--scooli-muted)] leading-relaxed">
              Parece que esta página foi para o recreio e não voltou. 
              Vamos levá-lo de volta ao início!
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 mt-4"
          >
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-[#6753FF] hover:bg-[#4E3BC0] text-white px-6 py-3 rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#6753FF] focus:ring-offset-2"
            >
              <Home className="h-5 w-5" />
              Voltar ao Início
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 border border-[#C7C9D9] text-[#0B0D17] bg-white hover:bg-[#EEF0FF] px-6 py-3 rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#6753FF] focus:ring-offset-2"
            >
              <ArrowLeft className="h-5 w-5" />
              Página Anterior
            </button>
          </motion.div>

          {/* Decorative tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            {["Apresentações", "Planos de Aula", "Testes", "Quizzes"].map(
              (tag, index) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 0.6, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                  className="inline-flex items-center gap-2 rounded-full border border-[color:var(--scooli-border)] bg-white/60 px-3 py-1.5 text-xs text-[color:var(--scooli-muted)]"
                >
                  {tag}
                </motion.span>
              )
            )}
          </motion.div>
        </motion.div>
      </Container>
    </main>
  );
}

