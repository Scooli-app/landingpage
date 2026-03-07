"use client";

import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/seo";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export function FinalCta() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="relative overflow-hidden rounded-3xl border border-[color:var(--scooli-border)] bg-gradient-to-br from-[color:var(--scooli-primary)]/14 via-white to-white p-8 shadow-[0_30px_120px_-60px_rgba(103,83,255,0.4)] md:p-12"
        >
          <div className="absolute left-[-5%] top-[-10%] h-32 w-32 rounded-full bg-[radial-gradient(circle_at_center,rgba(103,83,255,0.25),transparent)] blur-3xl" />
          <div className="absolute bottom-[-8%] right-[-8%] h-32 w-32 rounded-full bg-[radial-gradient(circle_at_center,rgba(78,59,192,0.2),transparent)] blur-3xl" />
          <div className="relative space-y-6">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-wide text-[color:var(--scooli-muted)]">
                Último convite
              </p>
              <h2 className="text-3xl font-semibold text-[color:var(--scooli-ink)] md:text-4xl">
                Comece a poupar tempo na criação de materiais pedagógicos.
              </h2>
              <p className="max-w-3xl text-[color:var(--scooli-muted)]">
                Crie testes, fichas e planos de aula em segundos com inteligência artificial.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href={`${APP_URL}/sign-up`} className="w-full sm:w-auto">
                <Button className="h-14 w-full rounded-2xl bg-[color:var(--scooli-primary)] px-10 text-lg font-semibold text-white transition-all hover:bg-[color:var(--scooli-primary-strong)] hover:shadow-xl hover:shadow-[rgba(103,83,255,0.3)] sm:w-auto">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Começar gratuitamente
                </Button>
              </Link>
              <Link href={`${APP_URL}/sign-in`} className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="h-14 w-full rounded-2xl border-2 border-[color:var(--scooli-border)] bg-white px-8 text-lg font-semibold text-[color:var(--scooli-ink)] hover:bg-[color:var(--scooli-accent)] sm:w-auto"
                >
                  Já tenho conta
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
