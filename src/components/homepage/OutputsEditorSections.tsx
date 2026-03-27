import { Container } from "@/components/Container";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { editorBenefits, outputs } from "./data";
import { OutputCard } from "./OutputCard";
import { BrowserFrame, FeatureRow, SectionHeading } from "./shared";

function EditorPreview() {
  return (
    <BrowserFrame title="Editor Scooli" subtitle="A IA em ação">
      <div className="space-y-4">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-950 shadow-[0_24px_60px_-40px_rgba(19,35,58,0.55)]">
          <Image
            src="/screenshots/editor.png"
            alt="Editor real da Scooli com um teste a ser criado e ajustado"
            width={1600}
            height={1080}
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="h-auto w-full object-cover object-top"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            "Documento completo visível enquanto editas",
            "Pedido à IA no mesmo fluxo de trabalho",
            "Exportação pronta quando o conteúdo estiver validado",
          ].map((item) => (
            <div
              key={item}
              className="rounded-[22px] border border-slate-200 bg-white px-4 py-4 text-sm leading-6 text-slate-700"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[color:var(--scooli-primary)]" />
                <p>{item}</p>
              </div>
            </div>
          ))}
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
