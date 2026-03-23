import type { OutputItem, OutputKind } from "./data";

function OutputDocument({ kind }: { kind: OutputKind }) {
  if (kind === "plan") {
    return (
      <div className="space-y-4 text-slate-700">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">Planificação semanal</p>
          <h4 className="mt-2 text-lg font-semibold text-slate-800">Ciências Naturais · 6.º ano</h4>
        </div>
        <div className="grid gap-2 rounded-2xl bg-slate-50 p-3 text-sm">
          <div className="flex items-center justify-between">
            <span>Objetivo</span>
            <span className="font-medium">Compreender o sistema digestivo</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Duração</span>
            <span className="font-medium">50 min</span>
          </div>
        </div>
        <div className="space-y-3 text-sm">
          {[
            "Ativação de conhecimentos prévios",
            "Exploração guiada com imagem e perguntas",
            "Síntese final e registo no caderno",
          ].map((item, index) => (
            <div key={item} className="flex gap-3 rounded-2xl border border-slate-200 p-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[color:var(--scooli-accent)] text-xs font-semibold text-[color:var(--scooli-primary)]">
                {index + 1}
              </span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (kind === "worksheet") {
    return (
      <div className="space-y-4 text-slate-700">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">Ficha de trabalho</p>
          <h4 className="mt-2 text-lg font-semibold text-slate-800">Português · 2.º ciclo</h4>
        </div>
        <div className="rounded-2xl bg-slate-50 p-3 text-sm">
          <p className="font-medium text-slate-800">Lê o texto e responde às perguntas.</p>
          <p className="mt-2 text-slate-500">Tempo previsto: 20 minutos</p>
        </div>
        <div className="space-y-3 text-sm">
          <div className="rounded-2xl border border-slate-200 p-3">
            <p className="font-medium">1. Identifica dois adjetivos presentes no texto.</p>
            <div className="mt-3 h-9 rounded-xl border border-dashed border-slate-200" />
          </div>
          <div className="rounded-2xl border border-slate-200 p-3">
            <p className="font-medium">2. Reescreve a frase com um sinónimo de “rápido”.</p>
            <div className="mt-3 h-9 rounded-xl border border-dashed border-slate-200" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 text-slate-700">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">Teste</p>
        <h4 className="mt-2 text-lg font-semibold text-slate-800">História · 8.º ano</h4>
      </div>
      <div className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-2xl bg-slate-50 p-3 text-sm">
        <p className="font-medium text-slate-800">Unidade: Liberalismo e revoluções</p>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500">50 pontos</span>
      </div>
      <div className="space-y-3 text-sm">
        <div className="rounded-2xl border border-slate-200 p-3">
          <p className="font-medium">1. Assinala a opção correta.</p>
          <div className="mt-3 grid gap-2">
            {["Monarquia constitucional", "Absolutismo", "Feudalismo"].map((option) => (
              <div key={option} className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2">
                <span className="h-3.5 w-3.5 rounded-full border border-slate-300" />
                <span>{option}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 p-3">
          <p className="font-medium">Critérios de correção</p>
          <div className="mt-3 grid gap-2 text-slate-500">
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
              <span>Resposta completa</span>
              <span>5 pts</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
              <span>Resposta parcial</span>
              <span>3 pts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function OutputCard({ output }: { output: OutputItem }) {
  return (
    <div className="flex h-full flex-col rounded-[32px] border border-slate-200/80 bg-white p-6 shadow-[0_24px_80px_-56px_rgba(19,35,58,0.42)] sm:p-7">
      <span className="inline-flex w-fit rounded-full bg-[color:var(--scooli-accent)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--scooli-primary)]">
        {output.label}
      </span>
      <h3 className="mt-4 text-2xl font-semibold text-[color:var(--scooli-ink)]">{output.title}</h3>
      <p className="mt-3 text-sm leading-7 text-[color:var(--scooli-muted)] sm:text-[15px]">{output.description}</p>
      <div className="mt-6 flex-1 rounded-[28px] bg-[color:var(--scooli-surface-alt)] p-4">
        <div className="mx-auto h-full max-w-[340px] rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_18px_40px_-34px_rgba(19,35,58,0.3)]">
          <OutputDocument kind={output.kind} />
        </div>
      </div>
    </div>
  );
}
