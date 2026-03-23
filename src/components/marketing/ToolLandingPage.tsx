import { Container } from "@/components/Container";
import { APP_URL } from "@/lib/seo";
import { CheckCircle2 } from "lucide-react";
import { toolCardIcons, type ToolPageData } from "./data";
import { Checklist, MarketingSectionHeading, PageCtaBanner, PageHero, PublicSiteShell, SurfacePanel } from "./shared";

function ToolPreview({ title, outputs }: { title: string; outputs: string[] }) {
  return (
    <SurfacePanel className="bg-[color:var(--scooli-surface-alt)]">
      <div className="rounded-[26px] border border-slate-200 bg-white p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">O que normalmente sai</p>
        <h3 className="mt-4 text-2xl font-semibold text-[color:var(--scooli-ink)]">{title}</h3>
        <div className="mt-5 grid gap-3">
          {outputs.map((output, index) => (
            <div key={output} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              <span className="mr-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-semibold text-[color:var(--scooli-primary)]">
                {index + 1}
              </span>
              {output}
            </div>
          ))}
        </div>
      </div>
    </SurfacePanel>
  );
}

function getUseCaseDescription(useCase: string) {
  return `Ideal para ${useCase.toLowerCase()}, quando queres chegar depressa a uma primeira versão organizada e depois ajustar ao teu contexto.`;
}

export function ToolLandingPage({ tool }: { tool: ToolPageData }) {
  const Icon = toolCardIcons[tool.slug];

  return (
    <PublicSiteShell>
      <PageHero
        eyebrow="Ferramenta"
        title={tool.hero}
        description={tool.description}
        primaryHref={`${APP_URL}/sign-up`}
        primaryLabel="Começar gratuitamente"
        secondaryHref="/professores"
        secondaryLabel="Ver percurso para professores"
        aside={<ToolPreview title={tool.shortTitle} outputs={tool.outputs} />}
      >
        <div className="flex flex-wrap gap-3">
          {tool.useCases.map((useCase) => (
            <span key={useCase} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600">
              <CheckCircle2 className="h-4 w-4 text-[color:var(--scooli-primary)]" />
              {useCase}
            </span>
          ))}
        </div>
      </PageHero>

      <section className="py-20 sm:py-24 lg:py-28">
        <Container className="grid gap-6 lg:grid-cols-3">
          <SurfacePanel className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[color:var(--scooli-ink)]">O que consegues criar</p>
                <p className="text-sm text-[color:var(--scooli-muted)]">Partes de um pedido simples e recebes uma base pronta a rever e ajustar.</p>
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {tool.outputs.map((output) => (
                <div key={output} className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-800">{output}</p>
                  <div className="mt-3 h-2.5 w-4/5 rounded-full bg-slate-200" />
                  <div className="mt-2 h-2.5 w-3/5 rounded-full bg-slate-200" />
                  <div className="mt-4 h-20 rounded-2xl bg-white" />
                </div>
              ))}
            </div>
          </SurfacePanel>

          <SurfacePanel>
            <p className="text-2xl font-semibold text-[color:var(--scooli-ink)]">O que ganhas</p>
            <div className="mt-5">
              <Checklist
                items={[
                  "Menos tempo a montar a primeira versão",
                  "Mais facilidade em ajustar nível, formato e linguagem",
                  "Documento editável antes de exportar ou usar",
                ]}
              />
            </div>
          </SurfacePanel>
        </Container>
      </section>

      <section className="bg-white/70 py-20 sm:py-24 lg:py-28">
        <Container className="space-y-12">
          <MarketingSectionHeading
            eyebrow="Casos de uso"
            title={`Quando faz mais sentido usar ${tool.shortTitle.toLowerCase()}`}
            description="Estas são situações comuns em que esta ferramenta te ajuda a arrancar mais depressa, com uma boa base para editar depois."
            centered
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {tool.useCases.map((useCase) => (
              <SurfacePanel key={useCase}>
                <p className="text-xl font-semibold text-[color:var(--scooli-ink)]">{useCase}</p>
                <p className="mt-3 text-sm leading-7 text-[color:var(--scooli-muted)]">{getUseCaseDescription(useCase)}</p>
              </SurfacePanel>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24 lg:py-28">
        <Container>
          <PageCtaBanner
            title={`Quer experimentar ${tool.shortTitle.toLowerCase()} na Scooli?`}
            description="Começa gratuitamente, gera uma primeira versão e ajusta tudo antes de usar ou exportar."
            primaryHref={`${APP_URL}/sign-up`}
            primaryLabel="Começar gratuitamente"
            secondaryHref="/ferramentas"
            secondaryLabel="Ver todas as ferramentas"
          />
        </Container>
      </section>
    </PublicSiteShell>
  );
}
