"use client";

import { Container } from "@/components/Container";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  BookOpenCheck,
  ClipboardList,
  Edit3,
  FileBarChart2,
  LibraryBig,
  Timer,
} from "lucide-react";
import { useState } from "react";

const steps = [
  {
    title: "Escolha o tipo de recurso",
    description: "Plano de aula, apresentação, teste ou quiz pronto a editar.",
    icon: ClipboardList,
  },
  {
    title: "Contextualize",
    description: "Ano, disciplina, tema, objetivos e duração da aula.",
    icon: FileBarChart2,
  },
  {
    title: "Gerar em segundos",
    description: "IA com alinhamento curricular português e tom de professor.",
    icon: Timer,
  },
  {
    title: "Editar e guardar",
    description: "Ajuste, personalize e mantenha a sua biblioteca organizada.",
    icon: Edit3,
  },
  {
    title: "Partilhar com a comunidade",
    description: "Biblioteca colaborativa com XP e créditos por impacto.",
    icon: LibraryBig,
  },
];

export function ScrollShowcase() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="showcase" className="py-16 md:py-24">
      <Container>
        <div className="mb-10 flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-[color:var(--scooli-muted)]">
            Como funciona
          </p>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <h2 className="text-3xl font-semibold text-[color:var(--scooli-ink)] md:text-4xl">
              Uma narrativa simples para preparar aulas sem esforço.
            </h2>
            <p className="max-w-xl text-[color:var(--scooli-muted)]">
              Pensado para o ritmo das escolas em Portugal: rápido, organizado e
              sempre editável.
            </p>
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-[1.2fr,1fr] md:items-center">
          <motion.div className="space-y-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === activeStep;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="rounded-2xl border border-[color:var(--scooli-border)] bg-white/80 p-4 shadow-sm backdrop-blur"
                  onMouseEnter={() => setActiveStep(index)}
                  onFocus={() => setActiveStep(index)}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                        isActive
                          ? "bg-[color:var(--scooli-primary)] text-white shadow-[0_10px_30px_-12px_rgba(103,83,255,0.6)]"
                          : "bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]"
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wide text-[color:var(--scooli-muted)]">
                        Passo {index + 1}
                      </p>
                      <h3 className="text-lg font-semibold text-[color:var(--scooli-ink)]">
                        {step.title}
                      </h3>
                      <p className="text-[color:var(--scooli-muted)]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <Card className="relative overflow-hidden rounded-3xl border-[color:var(--scooli-border)] bg-white/90 shadow-lg backdrop-blur">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <BookOpenCheck className="h-5 w-5 text-[color:var(--scooli-primary)]" />
                <span className="text-sm font-semibold text-[color:var(--scooli-muted)]">
                  Demo de geração
                </span>
              </div>
              <div className="space-y-3">
                <div className="rounded-xl border border-[color:var(--scooli-border)] bg-[color:var(--scooli-accent)] px-4 py-3 text-sm text-[color:var(--scooli-ink)]">
                  Objetivo: Criar uma ficha de avaliação de Matemática (8.º ano)
                  sobre equações.
                </div>
                <div className="space-y-2">
                  {[1, 2, 3].map((row) => (
                    <div
                      key={row}
                      className="flex items-center justify-between rounded-xl border border-[color:var(--scooli-border)] bg-white px-4 py-3 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.3)]"
                    >
                      <div>
                        <p className="text-sm font-semibold text-[color:var(--scooli-ink)]">
                          {row === 1
                            ? "Título e estrutura"
                            : row === 2
                              ? "Questões abertas e de escolha múltipla"
                              : "Rubrica de correção"}
                        </p>
                        <p className="text-sm text-[color:var(--scooli-muted)]">
                          {row === 1
                            ? "Subtópicos, tempo estimado e metas de aprendizagem."
                            : row === 2
                              ? "Geração variada com níveis de dificuldade."
                              : "Critérios claros para avaliação justa."}
                        </p>
                      </div>
                      <span className="h-2 w-12 rounded-full bg-gradient-to-r from-[color:var(--scooli-primary)]/70 to-[color:var(--scooli-primary-strong)]/80" />
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl border border-[color:var(--scooli-border)] bg-gradient-to-br from-[color:var(--scooli-primary)]/10 via-white to-white p-4">
                  <p className="text-sm font-semibold text-[color:var(--scooli-ink)]">
                    Modo edição instantânea
                  </p>
                  <p className="text-sm text-[color:var(--scooli-muted)]">
                    Ajuste enunciados, nivele a complexidade e guarde na sua
                    coleção. Tudo sem perder o histórico.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  );
}

