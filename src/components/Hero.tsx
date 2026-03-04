"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  BookOpen,
  ClipboardCheck,
  FileText,
  FolderOpen,
  Lightbulb,
  Presentation,
  ShieldCheck,
  Sparkles,
  Timer,
  Upload,
  Users,
  Wand2,
  Zap
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/seo";
import Link from "next/link";

const featureTags = [
  { label: "Apresentações", icon: Presentation, x: "8%", y: "12%", rotate: -6 },
  { label: "Planos de Aula", icon: FileText, x: "55%", y: "5%", rotate: 4 },
  { label: "Testes", icon: ClipboardCheck, x: "75%", y: "22%", rotate: -3 },
  { label: "Quizzes", icon: Lightbulb, x: "5%", y: "40%", rotate: 5 },
  { label: "Comunidade", icon: Users, x: "60%", y: "38%", rotate: -4 },
  { label: "Organização", icon: FolderOpen, x: "25%", y: "58%", rotate: 3 },
  { label: "Upload Docs", icon: Upload, x: "70%", y: "55%", rotate: -5 },
  { label: "IA Inteligente", icon: Wand2, x: "10%", y: "75%", rotate: 6 },
  { label: "Currículo PT", icon: BookOpen, x: "45%", y: "72%", rotate: -2 },
  { label: "Rápido", icon: Timer, x: "78%", y: "78%", rotate: 4 },
  { label: "Automático", icon: Zap, x: "88%", y: "45%", rotate: 2 },
];

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isReduced = mounted ? prefersReducedMotion : false;

  return (
    <section className="relative overflow-hidden pt-10 md:pt-14">
      <div className="absolute left-[-12%] top-[-25%] h-[36vh] w-[36vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(103,83,255,0.16),transparent)] blur-3xl" />
      <div className="absolute right-[-8%] top-[-14%] h-[28vh] w-[28vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(78,59,192,0.14),transparent)] blur-3xl" />
      <div className="noise-overlay" />
      <Container className="relative grid items-center gap-10 md:grid-cols-2">
        <div className="space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--scooli-border)] bg-white/80 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--scooli-muted)] shadow-sm backdrop-blur"
          >
            <Sparkles className="h-4 w-4 text-[color:var(--scooli-primary)]" />
            IA para professores em Portugal
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.5, ease: "easeOut" }}
            className="text-4xl font-bold leading-tight text-[color:var(--scooli-ink)] md:text-5xl"
          >
            IA + Comunidade para transformar a rotina dos professores
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
            className="max-w-xl text-lg leading-relaxed text-[color:var(--scooli-muted)]"
          >
            Crie planos, apresentações, quizzes e mais em segundos — e descubra uma biblioteca colaborativa de recursos validados por docentes portugueses.
          </motion.p>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href={`${APP_URL}/sign-up`} className="w-full sm:w-auto">
                <Button className="h-14 w-full rounded-2xl bg-[color:var(--scooli-primary)] px-8 text-[15px] font-semibold text-white hover:bg-[color:var(--scooli-primary-strong)] hover:shadow-xl hover:shadow-[rgba(103,83,255,0.25)] sm:w-auto transition-all">
                  <Sparkles className="mr-2 h-5 w-5 shrink-0" />
                  Experimente com 100 créditos gratuitos
                </Button>
              </Link>
              <Link href={`${APP_URL}/sign-in`} className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="h-14 w-full rounded-2xl border-2 border-[color:var(--scooli-border)] bg-white px-8 text-lg font-semibold text-[color:var(--scooli-ink)] hover:bg-[color:var(--scooli-accent)] sm:w-auto"
                >
                  Entrar na Plataforma
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-[color:var(--scooli-muted)]">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-2">
                <ShieldCheck className="h-4 w-4 text-[color:var(--scooli-primary)]" />
                RGPD-ready
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-2">
                🇵🇹 Professores a construir juntos
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-2">
                Aprendizagens Essenciais
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
          className="relative h-[340px] w-full md:h-[440px]"
          ref={constraintsRef}
        >
          {/* Centered logo watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Image
              src="/scooli.svg"
              alt="Scooli"
              width={100}
              height={100}
              className="opacity-10"
            />
          </div>

          {/* Draggable feature tags */}
          {featureTags.map((tag, index) => {
            const Icon = tag.icon;
            return (
              <motion.div
                key={tag.label}
                drag
                dragConstraints={constraintsRef}
                dragElastic={0.1}
                dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: isReduced ? 0 : [0, -6, 0],
                }}
                transition={{
                  opacity: { delay: 0.2 + index * 0.05, duration: 0.4 },
                  scale: { delay: 0.2 + index * 0.05, duration: 0.4 },
                  y: {
                    delay: 0.6 + index * 0.1,
                    duration: 3 + (index % 3) * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                whileHover={{ scale: 1.08, zIndex: 50 }}
                whileDrag={{ scale: 1.12, zIndex: 100, cursor: "grabbing" }}
                className="absolute cursor-grab select-none"
                style={{
                  left: tag.x,
                  top: tag.y,
                  rotate: tag.rotate,
                }}
              >
                <div className="flex items-center gap-2 rounded-xl border border-[color:var(--scooli-border)] bg-white/90 px-3 py-2 shadow-md backdrop-blur-sm transition-shadow hover:shadow-lg hover:shadow-[rgba(103,83,255,0.15)]">
                  <Icon className="h-4 w-4 text-[color:var(--scooli-primary)]" />
                  <span className="text-sm font-medium text-[color:var(--scooli-ink)] whitespace-nowrap">
                    {tag.label}
                  </span>
                </div>
              </motion.div>
            );
          })}

          {/* Hint text */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-[color:var(--scooli-muted)] opacity-60">
            Arraste para explorar ✨
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
