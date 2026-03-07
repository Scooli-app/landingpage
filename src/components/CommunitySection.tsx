"use client";

import { Container } from "@/components/Container";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, BookMarked, Heart, RefreshCw, Users } from "lucide-react";

const resources = [
  {
    title: "Fichas de trabalho partilhadas",
    meta: "Português • 2.º ciclo",
    badges: ["Pronto a usar", "Editável"],
  },
  {
    title: "Teste de avaliação formativa",
    meta: "Matemática • 3.º ciclo",
    badges: ["Mais utilizado", "Adaptável"],
  },
  {
    title: "Plano de aula com apresentação",
    meta: "História • Secundário",
    badges: ["Partilhado", "Reutilizável"],
  },
];

export function CommunitySection() {
  return (
    <section id="comunidade" className="relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_20%,rgba(103,83,255,0.08),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(78,59,192,0.08),transparent_40%)]" />
      <Container className="relative grid gap-10 md:grid-cols-[1.1fr,1fr] md:items-center">
        <div className="space-y-6">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-[color:var(--scooli-muted)]">
              Biblioteca comunitária
            </p>
            <h2 className="text-3xl font-semibold text-[color:var(--scooli-ink)] md:text-4xl">
              Uma biblioteca de recursos criada por professores.
            </h2>
            <p className="text-lg text-[color:var(--scooli-muted)]">
              Nem sempre é necessário criar tudo do zero.
            </p>
            <p className="text-[color:var(--scooli-muted)]">
              Na Scooli pode encontrar materiais pedagógicos partilhados por outros professores.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color:var(--scooli-primary)]/10 text-[color:var(--scooli-primary)]">
                <BookMarked className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-[color:var(--scooli-ink)]">Encontre fichas de trabalho e testes</p>
                <p className="text-sm text-[color:var(--scooli-muted)]">Recursos práticos para usar, adaptar e poupar tempo de preparação.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color:var(--scooli-primary)]/10 text-[color:var(--scooli-primary)]">
                <RefreshCw className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-[color:var(--scooli-ink)]">Descubra planos de aula e apresentações</p>
                <p className="text-sm text-[color:var(--scooli-muted)]">Use materiais já estruturados e adapte ao seu contexto pedagógico.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color:var(--scooli-primary)]/10 text-[color:var(--scooli-primary)]">
                <Heart className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-[color:var(--scooli-ink)]">Use, adapte ou partilhe os seus recursos</p>
                <p className="text-sm text-[color:var(--scooli-muted)]">A biblioteca inclui fichas, testes, planos, apresentações e outros recursos educativos.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color:var(--scooli-primary)]/10 text-[color:var(--scooli-primary)]">
                <Users className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-[color:var(--scooli-ink)]">Uma comunidade onde professores ajudam professores</p>
                <p className="text-sm text-[color:var(--scooli-muted)]">Partilha real de boas práticas pensadas para a escola portuguesa.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative h-full">
          <div className="absolute -bottom-6 -left-8 -right-8 -top-6 rounded-3xl bg-white/70 shadow-[0_20px_100px_-60px_rgba(103,83,255,0.45)]" />
          <div className="relative grid gap-4">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    delay: index * 0.2,
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  }}
                >
                  <Card className="overflow-hidden rounded-2xl border-[color:var(--scooli-border)] bg-white/90 shadow-lg">
                    <CardContent className="space-y-3 p-5">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-semibold uppercase tracking-wide text-[color:var(--scooli-muted)]">
                            Biblioteca comunitária
                          </p>
                          <h3 className="text-lg font-semibold text-[color:var(--scooli-ink)]">
                            {resource.title}
                          </h3>
                          <p className="text-sm text-[color:var(--scooli-muted)]">
                            {resource.meta}
                          </p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-[color:var(--scooli-primary)]" />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {resource.badges.map((badge) => (
                          <span
                            key={badge}
                            className="inline-flex items-center rounded-full bg-[color:var(--scooli-accent)] px-3 py-1 text-xs font-semibold text-[color:var(--scooli-ink)]"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
