"use client";

import { Container } from "@/components/Container";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BookOpenCheck, ClipboardList, Edit3, Sparkles } from "lucide-react";
import { useState } from "react";

const steps = [
  {
    title: "Escolha o tipo de material",
    description: "Teste, ficha de trabalho, plano de aula ou apresentação.",
    icon: ClipboardList,
  },
  {
    title: "Descreva o que precisa",
    description: "Indique disciplina, tema e nível de ensino.",
    icon: Sparkles,
  },
  {
    title: "A IA gera o material",
    description: "Edite, adapte e exporte.",
    icon: Edit3,
  },
];

const screenshotCaptions = [
  {
    title: "Geração automática de testes",
    description: "Crie avaliações em segundos com estrutura pronta para ajustar.",
  },
  {
    title: "Editor de documentos com IA",
    description: "Refine, adapte e personalize materiais sem começar do zero.",
  },
  {
    title: "Biblioteca comunitária de recursos",
    description: "Encontre conteúdos partilhados por professores e reutilize com facilidade.",
  },
];

export function ScrollShowcase() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="como-funciona" className="py-16 md:py-24">
      <Container>
        <div className="mb-10 flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-[color:var(--scooli-muted)]">
            Como funciona
          </p>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <h2 className="text-3xl font-semibold text-[color:var(--scooli-ink)] md:text-4xl">
              Três passos para criar materiais pedagógicos com IA
            </h2>
            <p className="max-w-xl text-[color:var(--scooli-muted)]">
              Processo simples, rápido e sempre editável para o contexto real da sua turma.
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
                      className={`flex h-12 w-12 items-center justify-center rounded-xl aspect-square ${
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
                      <p className="text-[color:var(--scooli-muted)]">{step.description}</p>
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
                  Capturas do produto
                </span>
              </div>
              <div className="space-y-3">
                {screenshotCaptions.map((caption) => (
                  <div
                    key={caption.title}
                    className="flex items-center justify-between rounded-xl border border-[color:var(--scooli-border)] bg-white px-4 py-3 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.3)]"
                  >
                    <div>
                      <p className="text-sm font-semibold text-[color:var(--scooli-ink)]">
                        {caption.title}
                      </p>
                      <p className="text-sm text-[color:var(--scooli-muted)]">
                        {caption.description}
                      </p>
                    </div>
                    <span className="h-2 w-12 rounded-full bg-gradient-to-r from-[color:var(--scooli-primary)]/70 to-[color:var(--scooli-primary-strong)]/80" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  );
}
