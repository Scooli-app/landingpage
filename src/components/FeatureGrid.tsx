"use client";

import { Container } from "@/components/Container";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Archive,
  CalendarClock,
  Layers,
  Presentation,
  Sparkles,
  UploadCloud,
} from "lucide-react";

const features = [
  {
    title: "Apresentações",
    description: "Slides claros, com imagens sugeridas e ritmo de aula.",
    icon: Presentation,
  },
  {
    title: "Planificação",
    description: "Objetivos, metodologias e avaliação, alinhados ao currículo.",
    icon: CalendarClock,
  },
  {
    title: "Testes & Fichas",
    description: "Itens mistos com rubricas prontas para correção rápida.",
    icon: Layers,
  },
  {
    title: "Organização",
    description: "Guarde, etiquete e recupere recursos por turma e tema.",
    icon: Archive,
  },
  {
    title: "Upload & Transformação",
    description: "Suba PDFs ou notas e transforme em atividades utilizáveis.",
    icon: UploadCloud,
  },
  {
    title: "Sugestões inteligentes",
    description: "Dinâmicas, trabalhos de grupo e diferenciação pedagógica.",
    icon: Sparkles,
  },
];

export function FeatureGrid() {
  return (
    <section id="funcionalidades" className="bg-[color:var(--scooli-accent)]/60 py-16 md:py-24">
      <Container className="space-y-10">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-[color:var(--scooli-muted)]">
            Funcionalidades essenciais
          </p>
          <h2 className="text-3xl font-semibold text-[color:var(--scooli-ink)] md:text-4xl">
            Tudo o que precisa para preparar aulas com confiança.
          </h2>
          <p className="max-w-3xl text-[color:var(--scooli-muted)]">
            Gerar, personalizar, guardar e partilhar com micro-interações que
            mantêm a experiência rápida e acessível.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color:var(--scooli-primary)]/10 text-[color:var(--scooli-primary)]">
                      <Icon className="h-6 w-6" />
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

