"use client";

import { Container } from "@/components/Container";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Image from "next/image";
import { SectionHeading } from "./shared";

function ScreenFrame({
  label,
  src,
  alt,
  priority = false,
}: {
  label: string;
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-[20px] border border-slate-200/80 bg-white shadow-[0_24px_80px_-48px_rgba(19,35,58,0.38)]">
      <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff8a80]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffd180]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#7aa2ff]" />
        <span className="ml-3 rounded-full border border-slate-200 bg-white px-3 py-0.5 text-xs font-medium text-slate-500">
          {label}
        </span>
      </div>
      <Image
        src={src}
        alt={alt}
        width={1400}
        height={760}
        className="w-full"
        priority={priority}
      />
    </div>
  );
}

export function AppPreviewSection() {
  const ref = useScrollReveal({ stagger: 0.12, y: 28 });

  return (
    <section id="plataforma" className="py-16 sm:py-20 lg:py-28">
      <Container ref={ref} className="space-y-10">
        <SectionHeading
          eyebrow="A plataforma"
          title="O ambiente onde trabalha"
          description="Da planificação ao plano de aula, tudo num só sítio — com IA integrada que sugere, gera e adapta sem sair do documento."
          centered
        />

        <div data-reveal>
          <ScreenFrame
            label="Editor · Planificação Semestral de Matemática"
            src="/screenshots/app-planificacao.jpg"
            alt="Editor de planificação da Scooli com estrutura de secções e painel de IA à direita"
            priority
          />
        </div>

        <div data-reveal className="grid gap-5 sm:grid-cols-2">
          <ScreenFrame
            label="Calendário · Plano letivo semanal"
            src="/screenshots/app-calendario.png"
            alt="Vista semanal do calendário da Scooli com aulas distribuídas pelos dias"
          />
        </div>
      </Container>
    </section>
  );
}
