import { Container } from "@/components/Container";
import { CheckCircle2 } from "lucide-react";
import { editorBenefits, outputs } from "./data";
import { OutputCard } from "./OutputCard";
import { BrowserFrame, FeatureRow, SectionHeading } from "./shared";

function EditorPreview() {
  return (
    <BrowserFrame title="Editor Scooli" subtitle="A IA em ação">
      <div className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="rounded-[26px] border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-800">Ficha de trabalho · Português · 5.º ano</p>
              <p className="text-xs text-slate-500">Modo de edição</p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">Editável</span>
          </div>
          <div className="mt-5 space-y-3 text-sm text-slate-700">
            <div className="rounded-2xl bg-slate-50 p-3">
              <p className="font-medium">Objetivo</p>
              <p className="mt-1 text-slate-600">Identificar adjetivos num texto curto e usá-los em frases próprias.</p>
            </div>
            <div className="rounded-2xl border border-[#d9ddff] bg-[color:var(--scooli-accent)] p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--scooli-primary)]">Sugestão da IA</p>
              <p className="mt-2 leading-7 text-[color:var(--scooli-primary-strong)]">
                Criar uma versão com frases mais curtas, mais apoio visual e um exercício final de consolidação.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-3">
              <p className="font-medium">Exercício 2</p>
              <p className="mt-1 text-slate-600">Lê o texto, sublinha os adjetivos e escreve um novo adjetivo para cada nome.</p>
            </div>
            <div className="rounded-2xl border border-dashed border-slate-200 p-3 text-slate-500">
              Versão alternativa para apoio adicional pronta a gerar.
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-[26px] bg-[color:var(--scooli-surface-alt)] p-4">
          <div className="rounded-[22px] border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Pede alterações</p>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              “Simplifica o texto, cria uma versão com menos itens e mantém os mesmos objetivos.”
            </p>
          </div>
          <div className="rounded-[22px] border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Ações rápidas</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
              {["Simplificar linguagem", "Mudar dificuldade", "Adicionar critérios"].map((tag) => (
                <span key={tag} className="rounded-full bg-slate-50 px-3 py-1.5">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-[22px] border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Estado</p>
            <div className="mt-3 flex items-center gap-3 rounded-2xl bg-[color:var(--scooli-accent)] px-4 py-3 text-sm text-[color:var(--scooli-primary-strong)]">
              <CheckCircle2 className="h-4 w-4" />
              Documento revisto e pronto para exportar.
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

export function RealOutputsSection() {
  return (
    <section id="outputs" className="bg-white/70 py-20 sm:py-24 lg:py-28">
      <Container className="space-y-12">
        <SectionHeading
          eyebrow="Resultados reais"
          title="Vê logo o que podes criar"
          description="Planificações, fichas e testes apresentados como documentos reais. Materiais que pode usar imediatamente na sala de aula."
          centered
        />
        <div className="grid gap-6 xl:grid-cols-3">
          {outputs.map((output) => (
            <OutputCard key={output.label} output={output} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export function EditorSection() {
  return (
    <section id="editor" className="py-20 sm:py-24 lg:py-28">
      <Container className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <EditorPreview />
        <div className="space-y-6">
          <SectionHeading
            eyebrow="IA em ação"
            title="A IA trabalha contigo, não por cima de ti"
            description="Pede alterações, cria versões mais simples, muda o formato do exercício ou ajusta a linguagem sem perder o que já afinaste."
          />
          <div className="grid gap-4">
            {editorBenefits.map((item) => (
              <FeatureRow
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
          <div className="rounded-[28px] border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-900">
            Revê sempre o conteúdo antes de o usar em aula. A Scooli acelera o trabalho, mas o olhar final continua a ser teu.
          </div>
        </div>
      </Container>
    </section>
  );
}

