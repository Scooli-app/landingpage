import { cn } from "@/lib/utils";
import { FileCheck2, Sparkles, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import type { InfoItem, QuoteItem } from "./data";

export function SectionBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#d9ddff] bg-[color:var(--scooli-accent)] px-4 py-1.5 text-sm font-semibold text-[color:var(--scooli-primary)]">
      <Sparkles className="h-4 w-4" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  centered?: boolean;
}) {
  return (
    <div className={cn("max-w-3xl space-y-4", centered && "mx-auto text-center")}>
      <SectionBadge>{eyebrow}</SectionBadge>
      <h2 className="font-display text-3xl leading-tight text-[color:var(--scooli-ink)] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="text-base leading-8 text-[color:var(--scooli-muted)] sm:text-lg">{description}</p>
    </div>
  );
}

export function BrowserFrame({
  title,
  subtitle,
  className,
  children,
}: {
  title: string;
  subtitle?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[30px] border border-slate-200/80 bg-white shadow-[0_32px_120px_-60px_rgba(19,35,58,0.48)]",
        className
      )}
    >
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 bg-slate-50/90 px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff8a80]" />
          <span className="h-3 w-3 rounded-full bg-[#ffd180]" />
          <span className="h-3 w-3 rounded-full bg-[#7aa2ff]" />
        </div>
        <div className="rounded-full border border-slate-200 bg-white px-4 py-1 text-xs font-semibold text-slate-500">
          {title}
        </div>
        <div className="hidden text-xs font-medium text-slate-400 sm:block">{subtitle}</div>
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </div>
  );
}

export function InfoCard({ item }: { item: InfoItem }) {
  const Icon = item.icon;

  return (
    <div className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_24px_70px_-50px_rgba(19,35,58,0.35)]">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-5 text-xl font-semibold text-[color:var(--scooli-ink)]">{item.title}</h3>
      <p className="mt-3 text-sm leading-7 text-[color:var(--scooli-muted)] sm:text-[15px]">{item.description}</p>
    </div>
  );
}

export function StepVisual({ step }: { step: number }) {
  if (step === 0) {
    return (
      <div className="rounded-[22px] border border-slate-200 bg-white p-4">
        <div className="grid gap-3 text-sm text-slate-600">
          <div className="rounded-2xl bg-slate-50 px-3 py-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Tipo</span>
            <p className="mt-1 font-medium text-slate-700">Ficha de trabalho</p>
          </div>
          <div className="rounded-2xl bg-slate-50 px-3 py-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Pedido</span>
            <p className="mt-1 line-clamp-2 font-medium text-slate-700">Criar exercícios sobre frações equivalentes para 5.º ano.</p>
          </div>
        </div>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="rounded-[22px] border border-slate-200 bg-white p-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--scooli-secondary)]" />
          IA a gerar
        </div>
        <div className="mt-4 space-y-3">
          <div className="h-3 w-10/12 rounded-full bg-slate-200" />
          <div className="h-3 w-8/12 rounded-full bg-slate-200" />
          <div className="h-20 rounded-2xl bg-[color:var(--scooli-accent)]/80" />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[22px] border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
        <div>
          <p className="text-sm font-semibold text-slate-700">Exportar versão final</p>
          <p className="text-xs text-slate-500">Depois de rever e ajustar</p>
        </div>
        <FileCheck2 className="h-5 w-5 text-[color:var(--scooli-primary)]" />
      </div>
      <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-slate-500">
        {["PDF", "Partilhar", "Duplicar"].map((label) => (
          <span key={label} className="rounded-full border border-slate-200 bg-white px-3 py-1.5">
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function QuoteCard({ item }: { item: QuoteItem }) {
  return (
    <div className="flex h-full flex-col rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_24px_70px_-56px_rgba(19,35,58,0.38)]">
      <span className="inline-flex w-fit rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
        Placeholder
      </span>
      <p className="mt-5 text-xl font-semibold leading-9 text-[color:var(--scooli-ink)]">“{item.quote}”</p>
      <p className="mt-4 text-sm text-[color:var(--scooli-muted)]">{item.role}</p>
    </div>
  );
}

export function FeatureRow({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[color:var(--scooli-ink)]">{title}</h3>
          <p className="mt-2 text-sm leading-7 text-[color:var(--scooli-muted)]">{description}</p>
        </div>
      </div>
    </div>
  );
}

