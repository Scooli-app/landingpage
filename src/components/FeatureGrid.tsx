"use client";

import { Container } from "@/components/Container";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CalendarClock, FileCheck2, FileText, SlidersHorizontal } from "lucide-react";

const features = [
  {
    title: "Criação automática de testes e fichas",
    description:
      "Gere exercícios e fichas completas em segundos, adaptadas ao nível de ensino.",
    icon: FileCheck2,
  },
  {
    title: "Planos de aula completos",
    description:
      "Crie planificações com objetivos, atividades e estratégias pedagógicas alinhadas com as Aprendizagens Essenciais.",
    icon: CalendarClock,
  },
  {
    title: "Adaptação de conteúdos",
    description:
      "Adapte rapidamente materiais para diferentes níveis de aprendizagem ou alunos com necessidades educativas especiais.",
    icon: SlidersHorizontal,
  },
  {
    title: "Editor completo",
    description:
      "Todos os materiais podem ser editados diretamente na plataforma antes de exportar.",
    icon: FileText,
  },
];

export function FeatureGrid() {
  return (
    <section id="funcionalidades" className="bg-[color:var(--scooli-accent)]/60 py-16 md:py-24">
      <Container className="space-y-10">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-[color:var(--scooli-muted)]">
            Funcionalidades principais
          </p>
          <h2 className="text-3xl font-semibold text-[color:var(--scooli-ink)] md:text-4xl">
            Ferramentas feitas para poupar tempo aos professores
          </h2>
          <p className="max-w-3xl text-[color:var(--scooli-muted)]">
            Crie materiais pedagógicos com IA, ajuste ao contexto da sua turma e
            mantenha sempre o controlo sobre o resultado final.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: index * 0.05, duration: 0.35 }}
                whileHover={{ y: -4, scale: 1.01 }}
              >
                <Card className="h-full overflow-hidden rounded-2xl border-[color:var(--scooli-border)] bg-white/90 shadow-sm backdrop-blur transition hover:shadow-lg">
                  <CardContent className="space-y-3 p-6">
                    <div className="aspect-square inline-flex h-12 w-12 min-h-12 min-w-12 items-center justify-center rounded-xl bg-[color:var(--scooli-primary)]/10 text-[color:var(--scooli-primary)]">
                      <Icon className="h-6 w-6 shrink-0" />
                    </div>
                    <h3 className="text-lg font-semibold text-[color:var(--scooli-ink)]">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-[color:var(--scooli-muted)]">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
