"use client";

import { Container } from "@/components/Container";
import { WaitlistForm } from "@/components/WaitlistForm";
import { motion } from "framer-motion";

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
          <div className="absolute right-[-8%] bottom-[-8%] h-32 w-32 rounded-full bg-[radial-gradient(circle_at_center,rgba(78,59,192,0.2),transparent)] blur-3xl" />
          <div className="relative space-y-6">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-wide text-[color:var(--scooli-muted)]">
                Último convite
              </p>
              <h2 className="text-3xl font-semibold text-[color:var(--scooli-ink)] md:text-4xl">
                Menos tempo a formatar, mais tempo a inspirar alunos.
              </h2>
              <p className="max-w-3xl text-[color:var(--scooli-muted)]">
                Acesso prioritário para professores que querem experimentar a IA
                aplicada ao currículo português. Sem compromissos.
              </p>
            </div>
            <WaitlistForm />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

