"use client";

import { Container } from "@/components/Container";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, BookMarked, Heart, RefreshCw, Users } from "lucide-react";

const resources = [
  {
    title: "Plano de aula | 5.º ano",
    meta: "Português • 45 min",
    badges: ["Partilhado", "+18 downloads"],
  },
  {
    title: "Quiz rápido | Energia",
    meta: "FQ • 9.º ano",
    badges: ["Ajuda extra", "Popular"],
  },
  {
    title: "Apresentação | Arte",
    meta: "Educação Visual • 7.º ano",
    badges: ["Mais utilizado", "+80 partilhas"],
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
              ⭐ A Grande Vantagem da Scooli
            </p>
            <h2 className="text-3xl font-semibold text-[color:var(--scooli-ink)] md:text-4xl">
              Biblioteca Comunitária
            </h2>
            <p className="text-[color:var(--scooli-muted)] text-lg">
              Explore e reutilize materiais criados por outros professores. Partilhe os seus recursos para ajudar a construir um ecossistema educativo mais forte.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex mt-1 h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color:var(--scooli-primary)]/10 text-[color:var(--scooli-primary)]">
                <BookMarked className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-[color:var(--scooli-ink)]">Recursos reais criados por professores como você</p>
                <p className="text-sm text-[color:var(--scooli-muted)]">A comunidade conhece melhor o seu currículo e partilha materiais que funcionam em sala de aula.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex mt-1 h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color:var(--scooli-primary)]/10 text-[color:var(--scooli-primary)]">
                <RefreshCw className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-[color:var(--scooli-ink)]">Reutilize em 1 clique e adapte aos seus alunos</p>
                <p className="text-sm text-[color:var(--scooli-muted)]">Materiais que todos podem reutilizar. Descarregue e ajuste instantaneamente ao nível da sua turma.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex mt-1 h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color:var(--scooli-primary)]/10 text-[color:var(--scooli-primary)]">
                <Heart className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-[color:var(--scooli-ink)]">Inspire colegas de todo o país</p>
                <p className="text-sm text-[color:var(--scooli-muted)]">O seu trabalho ganha uma nova vida e pode ter um impacto real nas aprendizagens de outros alunos.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex mt-1 h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color:var(--scooli-primary)]/10 text-[color:var(--scooli-primary)]">
                <Users className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-[color:var(--scooli-ink)]">Professores a construir juntos</p>
                <p className="text-sm text-[color:var(--scooli-muted)]">Não apenas IA: criamos em conjunto uma enorme fonte de boas práticas adaptadas à nossa realidade.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative h-full">
          <div className="absolute -left-8 -right-8 -top-6 -bottom-6 rounded-3xl bg-white/70 shadow-[0_20px_100px_-60px_rgba(103,83,255,0.45)]" />
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

