"use client";

import { Container } from "@/components/Container";
import {
  MarketingSectionBadge,
  PageCtaBanner,
} from "@/components/marketing/shared";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { PUBLIC_IMPACT_METRICS } from "@/lib/seo";
import {
  Clock3,
  GraduationCap,
  Lightbulb,
  MapPin,
  MapPinned,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const formatCount = (value: number) =>
  String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

function CountUp({
  value,
  suffix = "",
  duration = 1400,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setDisplay(formatCount(value));
      return;
    }

    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(formatCount(value * eased));
          if (progress < 1) {
            raf = requestAnimationFrame(tick);
          }
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

type StoryChapter = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const storyChapters: StoryChapter[] = [
  {
    title: "O que víamos",
    description:
      "Professores próximos de nós a chegar ao fim do dia com as aulas dadas e as reuniões feitas — e ainda uma noite de planificações, fichas e testes pela frente. Serões e fins de semana de família a desaparecer em trabalho que se repete, semana após semana.",
    icon: Clock3,
  },
  {
    title: "A pergunta",
    description:
      "Somos dois jovens engenheiros portugueses, o Miguel e o Pedro. Quando a IA generativa começou a mostrar o que conseguia fazer, a pergunta tornou-se óbvia: porque é que estas horas não voltam para quem ensina? A resposta habitual — «usa-se o ChatGPT» — não chegava: faltava-lhe o currículo português, as Aprendizagens Essenciais, os DL 54/2018 e 55/2018, e o formato de documento que um professor usa de verdade.",
    icon: Lightbulb,
  },
  {
    title: "A Scooli",
    description:
      "Por isso construímos a Scooli: feita em Portugal, para o ensino português, com a IA a fazer o trabalho mecânico e o professor a manter a decisão final. O objetivo é o mesmo desde o primeiro dia — devolver tempo a quem ensina. E às famílias de quem ensina.",
    icon: GraduationCap,
  },
];

const metrics = [
  {
    value: PUBLIC_IMPACT_METRICS.activeTeachers.minValue,
    suffix: "+",
    label: "professores ativos",
  },
  {
    value: PUBLIC_IMPACT_METRICS.generatedDocuments.minValue,
    suffix: "+",
    label: "documentos gerados",
  },
  {
    value: PUBLIC_IMPACT_METRICS.weeklyHoursSaved.minValue,
    suffix: "h+",
    label: "poupadas por semana",
  },
  {
    value: PUBLIC_IMPACT_METRICS.adaptedMaterials.minValue,
    suffix: "+",
    label: "materiais adaptados",
  },
];

const missionPoints = [
  {
    title: "Devolver tempo aos professores",
    description:
      "Reduzir o trabalho repetitivo da preparação de aulas para libertar tempo para ensinar, acompanhar alunos e ajustar melhor o que acontece em sala.",
    icon: Sparkles,
  },
  {
    title: "Criar comunidade, não só uma ferramenta",
    description:
      "O trabalho de um professor é muitas vezes solitário. A Scooli também quer aproximar docentes através da biblioteca comunitária e da partilha de materiais úteis.",
    icon: Users,
  },
  {
    title: "Construir para a realidade portuguesa",
    description:
      "A linguagem, os exemplos e a forma de usar a Scooli são pensados para professores, escolas e currículo em Portugal.",
    icon: MapPinned,
  },
];

const team = [
  {
    name: "Miguel Rodrigues",
    role: "Co-Fundador · Engenheiro de Software & IA",
    image: "/team/miguel.jpg",
    location: "Santa Maria da Feira, Aveiro",
    alt: "Miguel Rodrigues, Fundador e Engenheiro de Software & IA da Scooli",
    imageClassName: "group-hover:scale-105",
  },
  {
    name: "Pedro Rocha",
    role: "Co-Fundador · Engenheiro de Software & IA",
    image: "/team/pedro.jpeg",
    location: "Vila Nova de Gaia, Porto",
    alt: "Pedro Rocha, Co-Fundador e Engenheiro de Software & IA da Scooli",
    imageClassName: "scale-[1.28] group-hover:scale-[1.33]",
  },
];

function PolaroidCard({
  src,
  alt,
  caption,
  className,
  imageClassName,
}: {
  src: string;
  alt: string;
  caption: string;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <figure
      className={`rounded-[20px] border border-slate-200 bg-white p-3 pb-4 shadow-[0_24px_70px_-40px_rgba(19,35,58,0.4)] transition-all duration-300 ease-out hover:-translate-y-1 hover:rotate-0 ${className ?? ""}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] bg-[color:var(--scooli-surface-alt)]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 224px, 45vw"
          className={`object-cover ${imageClassName ?? ""}`}
        />
      </div>
      <figcaption className="mt-3 text-center text-xs font-semibold text-slate-600">
        {caption}
      </figcaption>
    </figure>
  );
}

function HeroSection() {
  const ref = useScrollReveal({ stagger: 0.12, y: 20, start: "top 100%" });

  return (
    <section className="relative isolate pt-8 sm:pt-10">
      <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(ellipse_80%_55%_at_50%_-10%,rgba(103,83,255,0.08),transparent)]" />
      <Container ref={ref} className="pb-14 pt-10 sm:pb-16 lg:pb-20">
        <div className="space-y-6">
          <div data-reveal>
            <MarketingSectionBadge>Sobre nós</MarketingSectionBadge>
          </div>
          <div className="max-w-4xl space-y-4">
            <h1
              data-reveal
              className="font-display text-4xl leading-tight text-[color:var(--scooli-ink)] sm:text-5xl lg:text-6xl"
            >
              A Scooli existe para devolver tempo aos professores
            </h1>
            <p
              data-reveal
              className="text-lg leading-8 text-[color:var(--scooli-muted)] sm:text-xl"
            >
              Estamos a reduzir o trabalho repetitivo da preparação de aulas e a
              aproximar uma comunidade que muitas vezes trabalha sozinha —
              sempre com o professor no controlo do resultado final.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function StorySection() {
  const ref = useScrollReveal({ stagger: 0.14, y: 26 });
  const timelineRef = useRef<HTMLOListElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const timelineEl = timelineRef.current;
    const lineEl = lineRef.current;

    if (!timelineEl || !lineEl) {
      return;
    }

    if (prefersReducedMotion) {
      lineEl.style.transform = "scaleY(1)";
      return;
    }

    let ctx: { revert(): void } | null = null;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(
          lineEl,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: timelineEl,
              start: "top 78%",
              end: "bottom 55%",
              scrub: 0.6,
            },
          },
        );
      }, timelineEl);
    };

    init();

    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <section className="py-14 sm:py-16 lg:py-20">
      <Container ref={ref}>
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-8">
            <div data-reveal className="space-y-4">
              <MarketingSectionBadge>A nossa história</MarketingSectionBadge>
              <h2 className="font-display text-3xl leading-tight text-[color:var(--scooli-ink)] sm:text-4xl">
                Começou com os professores à nossa volta
              </h2>
            </div>

            <ol ref={timelineRef} className="relative space-y-8 pl-8">
              <span
                aria-hidden="true"
                className="absolute bottom-1 left-0 top-1 w-0.5 rounded-full bg-[#e2e5ff]"
              />
              <span
                ref={lineRef}
                aria-hidden="true"
                className="absolute bottom-1 left-0 top-1 w-0.5 origin-top scale-y-0 rounded-full bg-[linear-gradient(180deg,var(--scooli-primary),var(--scooli-secondary))]"
              />
              {storyChapters.map((chapter) => {
                const Icon = chapter.icon;
                return (
                  <li key={chapter.title} data-reveal className="relative">
                    <span className="absolute -left-[49px] flex h-9 w-9 items-center justify-center rounded-full border border-[#d9ddff] bg-white text-[color:var(--scooli-primary)] shadow-sm">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <h3 className="text-lg font-semibold text-[color:var(--scooli-ink)]">
                      {chapter.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[color:var(--scooli-muted)] sm:text-[15px]">
                      {chapter.description}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>

          <div data-reveal className="relative hidden h-[620px] lg:block">
            <PolaroidCard
              src="/team/miguel.jpg"
              alt="Miguel Rodrigues, fundador da Scooli"
              caption="Miguel · Santa Maria da Feira"
              className="absolute left-0 top-0 z-10 w-56 -rotate-6"
            />
            <PolaroidCard
              src="/team/pedro.jpeg"
              alt="Pedro Rocha, co-fundador da Scooli"
              caption="Pedro · Vila Nova de Gaia"
              className="absolute right-2 top-10 z-10 w-56 rotate-[5deg]"
              imageClassName="scale-[1.28]"
            />
            <figure className="absolute bottom-0 left-16 z-20 w-80 rotate-[-2deg] rounded-[20px] border border-slate-200 bg-white p-3 pb-4 shadow-[0_24px_70px_-40px_rgba(19,35,58,0.4)] transition-all duration-300 ease-out hover:-translate-y-1 hover:rotate-0">
              <div className="relative aspect-video overflow-hidden rounded-[14px] bg-slate-950">
                <video
                  className="pointer-events-none h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                  disablePictureInPicture
                  aria-label="Demonstração da criação de um teste na Scooli"
                >
                  <source src="/videos/test-creation.mp4" type="video/mp4" />
                </video>
              </div>
              <figcaption className="mt-3 text-center text-xs font-semibold text-slate-600">
                Scooli em ação · um teste a ganhar forma
              </figcaption>
            </figure>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:hidden">
            <PolaroidCard
              src="/team/miguel.jpg"
              alt="Miguel Rodrigues, fundador da Scooli"
              caption="Miguel · Santa Maria da Feira"
              className="-rotate-2"
            />
            <PolaroidCard
              src="/team/pedro.jpeg"
              alt="Pedro Rocha, co-fundador da Scooli"
              caption="Pedro · Vila Nova de Gaia"
              className="rotate-2"
              imageClassName="scale-[1.28]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

function MetricsSection() {
  const ref = useScrollReveal({ stagger: 0.08, y: 16 });

  return (
    <section
      aria-label="A Scooli hoje"
      className="border-y border-slate-200/70 bg-white py-12 sm:py-14"
    >
      <Container ref={ref} className="space-y-8">
        <p
          data-reveal
          className="text-center text-sm font-semibold uppercase tracking-[0.18em] text-slate-400"
        >
          A Scooli hoje
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-8">
          {metrics.map((metric) => (
            <div key={metric.label} data-reveal className="text-center">
              <p className="font-display text-4xl leading-none text-[color:var(--scooli-ink)] sm:text-5xl">
                <CountUp value={metric.value} suffix={metric.suffix} />
              </p>
              <p className="mt-2 text-sm font-medium text-[color:var(--scooli-muted)]">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function MissionSection() {
  const ref = useScrollReveal({ stagger: 0.12, y: 24 });

  return (
    <section className="py-14 sm:py-16 lg:py-20">
      <Container ref={ref} className="space-y-10">
        <div data-reveal className="mx-auto max-w-3xl space-y-4 text-center">
          <div className="flex justify-center">
            <MarketingSectionBadge>Missão</MarketingSectionBadge>
          </div>
          <h2 className="font-display text-3xl leading-tight text-[color:var(--scooli-ink)] sm:text-4xl">
            Aliviar o lado mais pesado do trabalho docente
          </h2>
          <p className="text-base leading-8 text-[color:var(--scooli-muted)] sm:text-lg">
            A IA deve ser prática, útil e respeitadora do papel do professor. E
            a missão não acaba na automação: queremos uma comunidade onde os
            professores encontrem boas bases e sintam menos isolamento.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {missionPoints.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                data-reveal
                className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_24px_70px_-56px_rgba(19,35,58,0.28)] transition-transform duration-300 ease-out hover:-translate-y-1"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className="mt-5 text-lg font-semibold text-[color:var(--scooli-ink)]">
                  {item.title}
                </p>
                <p className="mt-3 text-sm leading-7 text-[color:var(--scooli-muted)]">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function TeamSection() {
  const ref = useScrollReveal({ stagger: 0.12, y: 24 });

  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <Container ref={ref} className="space-y-10">
        <div data-reveal className="mx-auto max-w-3xl space-y-4 text-center">
          <div className="flex justify-center">
            <MarketingSectionBadge>Equipa</MarketingSectionBadge>
          </div>
          <h2 className="font-display text-3xl leading-tight text-[color:var(--scooli-ink)] sm:text-4xl">
            Quem está a construir a Scooli
          </h2>
          <p className="text-base leading-8 text-[color:var(--scooli-muted)]">
            Dois engenheiros de software e IA, a construir a Scooli em contacto
            direto com professores portugueses.
          </p>
        </div>

        <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
          {team.map((member) => (
            <div
              key={member.name}
              data-reveal
              className="group rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_24px_70px_-56px_rgba(19,35,58,0.28)] transition-transform duration-300 ease-out hover:-translate-y-1"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[22px] bg-[linear-gradient(135deg,rgba(103,83,255,0.14),rgba(59,130,246,0.10))]">
                <Image
                  src={member.image}
                  alt={member.alt}
                  fill
                  className={`object-cover transition-transform duration-500 ease-out ${member.imageClassName}`}
                  sizes="(min-width: 640px) 340px, 100vw"
                />
              </div>
              <div className="mt-5 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--scooli-primary)]">
                  {member.role}
                </p>
                <p className="text-2xl font-semibold text-[color:var(--scooli-ink)]">
                  {member.name}
                </p>
                <p className="flex items-center gap-1.5 text-sm text-[color:var(--scooli-muted)]">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  {member.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function FinalCtaSection() {
  const ref = useScrollReveal({ y: 20 });

  return (
    <section className="py-14 sm:py-16 lg:py-20">
      <Container ref={ref}>
        <div data-reveal>
          <PageCtaBanner
            title="Quer fazer parte desta história?"
            description="Junte-se a 300+ professores que já preparam aulas com a Scooli. Gratuito, sem cartão, sem compromisso."
            primaryEventProperties={{
              cta_id: "about_final_cta_start_free",
              placement: "about_final_cta",
            }}
            secondaryHref="/contacto"
            secondaryLabel="Falar connosco"
            secondaryEventProperties={{
              cta_id: "about_final_cta_contact",
              placement: "about_final_cta",
            }}
          />
        </div>
      </Container>
    </section>
  );
}

export function AboutPageClient() {
  return (
    <>
      <HeroSection />
      <StorySection />
      <MetricsSection />
      <MissionSection />
      <TeamSection />
      <FinalCtaSection />
    </>
  );
}
