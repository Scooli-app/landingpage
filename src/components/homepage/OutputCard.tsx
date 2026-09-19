import Image from "next/image";
import type { OutputItem, OutputKind } from "./data";

const outputScreenshots: Record<
  OutputKind,
  { src: string; alt: string; sizes: string }
> = {
  plan: {
    src: "/screenshots/plano-pdf.png",
    alt: "Exemplo real de uma planificação criada com a Scooli",
    sizes: "(min-width: 1280px) 26vw, (min-width: 768px) 40vw, 100vw",
  },
  worksheet: {
    src: "/screenshots/ficha-pdf.png",
    alt: "Exemplo real de uma ficha de trabalho criada com a Scooli",
    sizes: "(min-width: 1280px) 26vw, (min-width: 768px) 40vw, 100vw",
  },
  test: {
    src: "/screenshots/teste-pdf.png",
    alt: "Exemplo real de um teste criado com a Scooli",
    sizes: "(min-width: 1280px) 26vw, (min-width: 768px) 40vw, 100vw",
  },
};

export function OutputCard({ output }: { output: OutputItem }) {
  const screenshot = outputScreenshots[output.kind];

  return (
    <div className="flex h-full flex-col rounded-[32px] border border-slate-200/80 bg-white p-6 shadow-[0_24px_80px_-56px_rgba(19,35,58,0.42)] sm:p-7">
      <span className="inline-flex w-fit rounded-full bg-[color:var(--scooli-accent)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--scooli-primary)]">
        {output.label}
      </span>
      <h3 className="mt-4 text-2xl font-semibold text-[color:var(--scooli-ink)]">
        {output.title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-[color:var(--scooli-muted)] sm:text-[15px]">
        {output.description}
      </p>
      <div className="mt-6 flex-1 rounded-[28px] bg-[color:var(--scooli-surface-alt)] p-3">
        <div className="h-full overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_18px_40px_-34px_rgba(19,35,58,0.3)]">
          <Image
            src={screenshot.src}
            alt={screenshot.alt}
            width={1600}
            height={2000}
            sizes={screenshot.sizes}
            className="h-full w-full object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}
