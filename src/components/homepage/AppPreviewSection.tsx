"use client";

import { Container } from "@/components/Container";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useTranslations } from "next-intl";
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
    <figure className="overflow-hidden rounded-[20px] border border-slate-200/80 bg-white shadow-[0_24px_80px_-48px_rgba(19,35,58,0.38)]">
      <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff8a80]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffd180]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#7aa2ff]" />
        <span className="ml-3 truncate rounded-full border border-slate-200 bg-white px-3 py-0.5 text-xs font-medium text-slate-500">
          {label}
        </span>
      </div>
      <div className="relative aspect-[16/7]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1280px) 1184px, 100vw"
          className="object-cover object-top"
          priority={priority}
        />
      </div>
    </figure>
  );
}

export function AppPreviewSection() {
  const t = useTranslations("home.appPreview");
  const ref = useScrollReveal({ stagger: 0.12, y: 28 });

  return (
    <section id="plataforma" className="py-16 sm:py-20 lg:py-28">
      <Container ref={ref} className="space-y-10">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          centered
        />

        <div data-reveal>
          <ScreenFrame
            label={t("editorLabel")}
            src="/screenshots/app-planificacao.jpg"
            alt={t("editorAlt")}
            priority
          />
        </div>

        <div data-reveal>
          <ScreenFrame
            label={t("calendarLabel")}
            src="/screenshots/app-calendario.png"
            alt={t("calendarAlt")}
          />
        </div>
      </Container>
    </section>
  );
}
