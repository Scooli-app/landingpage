import { Container } from "@/components/Container";
import { TrackedFaqAccordion } from "@/components/TrackedFaqAccordion";
import { TrackedLink } from "@/components/TrackedLink";
import { APP_URL } from "@/lib/seo";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { toolCardIcons, type ToolPageData } from "./data";
import {
  Checklist,
  MarketingSectionHeading,
  PageCtaBanner,
  PageHero,
  PublicSiteShell,
  SurfacePanel,
} from "./shared";

const toolPreviewImages: Partial<Record<string, { src: string; alt: string }>> = {
  planificacoes: {
    src: "/screenshots/plano-pdf.png",
    alt: "Exemplo real de uma planificação criada com a Scooli",
  },
  "fichas-de-trabalho": {
    src: "/screenshots/ficha-pdf.png",
    alt: "Exemplo real de uma ficha de trabalho criada com a Scooli",
  },
  "gerador-de-testes": {
    src: "/screenshots/teste-pdf.png",
    alt: "Exemplo real de um teste criado com a Scooli",
  },
};

function ToolPreview({ tool }: { tool: ToolPageData }) {
  const previewImage = toolPreviewImages[tool.slug];

  if (previewImage) {
    return (
      <SurfacePanel className="bg-[color:var(--scooli-surface-alt)]">
        <div className="space-y-4">
          <div className="rounded-[26px] border border-slate-200 bg-white p-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
              Exemplo real criado na Scooli
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-[color:var(--scooli-ink)]">
              {tool.shortTitle}
            </h3>
          </div>
          <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_20px_50px_-40px_rgba(19,35,58,0.28)]">
            <Image
              src={previewImage.src}
              alt={previewImage.alt}
              width={1600}
              height={2000}
              sizes="(min-width: 1024px) 34vw, 100vw"
              className="h-auto w-full object-cover object-top"
            />
          </div>
        </div>
      </SurfacePanel>
    );
  }

  return (
    <SurfacePanel className="bg-[color:var(--scooli-surface-alt)]">
      <div className="rounded-[26px] border border-slate-200 bg-white p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
          O que costuma sair
        </p>
        <h3 className="mt-4 text-2xl font-semibold text-[color:var(--scooli-ink)]">
          {tool.shortTitle}
        </h3>
        <div className="mt-5 grid gap-3">
          {tool.outputs.map((output, index) => (
            <div
              key={output}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
            >
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
  return `Ideal para ${useCase.toLowerCase()}, quando queres chegar depressa a um material organizado e depois ajustá-lo ao teu contexto.`;
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
        aside={<ToolPreview tool={tool} />}
      >
        <div className="flex flex-wrap gap-3">
          {tool.useCases.map((useCase) => (
            <span
              key={useCase}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600"
            >
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
                <p className="text-sm font-semibold text-[color:var(--scooli-ink)]">
                  O que consegues criar
                </p>
                <p className="text-sm text-[color:var(--scooli-muted)]">
                  Partes de um pedido simples e recebes um material editável pronto a rever e ajustar.
                </p>
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {tool.outputs.map((output) => (
                <div
                  key={output}
                  className="rounded-[24px] border border-slate-200 bg-slate-50 p-4"
                >
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
              <Checklist items={tool.benefits} />
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
                <p className="text-xl font-semibold text-[color:var(--scooli-ink)]">
                  {useCase}
                </p>
                <p className="mt-3 text-sm leading-7 text-[color:var(--scooli-muted)]">
                  {getUseCaseDescription(useCase)}
                </p>
              </SurfacePanel>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24 lg:py-28">
        <Container className="space-y-12">
          <MarketingSectionHeading
            eyebrow="Na prática"
            title={`O que podes fazer com ${tool.shortTitle.toLowerCase()}`}
            description="Esta página resume o tipo de resultado que podes esperar, em que situações faz sentido usar esta ferramenta e como a integrar no teu trabalho semanal."
            centered
          />
          <div className="grid gap-5 lg:grid-cols-2">
            {tool.contentSections.map((section) => (
              <SurfacePanel key={section.title}>
                <h3 className="text-2xl font-semibold text-[color:var(--scooli-ink)]">
                  {section.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[color:var(--scooli-muted)] sm:text-[15px]">
                  {section.description}
                </p>
                {section.bullets && section.bullets.length > 0 && (
                  <div className="mt-5">
                    <Checklist items={section.bullets} />
                  </div>
                )}
              </SurfacePanel>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white/70 py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <SurfacePanel>
              <MarketingSectionHeading
                eyebrow="Perguntas frequentes"
                title={`Dúvidas comuns sobre ${tool.shortTitle.toLowerCase()}`}
                description="Respostas rápidas para perceberes o que esta ferramenta faz, como se adapta ao teu contexto e o que podes esperar antes de experimentar."
              />
              <div className="mt-8">
                <TrackedFaqAccordion
                  items={tool.faq}
                  faqGroup={tool.slug}
                  itemValuePrefix={`${tool.slug}-faq`}
                  className="space-y-3"
                  itemClassName="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 px-4"
                  triggerClassName="py-4 text-left text-[15px] font-semibold text-[color:var(--scooli-ink)] hover:no-underline"
                  contentClassName="text-sm leading-7 text-[color:var(--scooli-muted)]"
                />
              </div>
            </SurfacePanel>

            <SurfacePanel className="bg-[color:var(--scooli-surface-alt)]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                Continua a explorar
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-[color:var(--scooli-ink)]">
                Páginas relacionadas
              </h3>
              <p className="mt-3 text-sm leading-7 text-[color:var(--scooli-muted)]">
                Se estás a comparar formas de preparar materiais, estas páginas ajudam-te a encontrar a ferramenta certa mais depressa.
              </p>
              <div className="mt-6 grid gap-3">
                {tool.relatedLinks.map((link) => (
                  <TrackedLink
                    key={`${tool.slug}-${link.href}`}
                    href={link.href}
                    eventName="marketing_navigation_clicked"
                    eventProperties={{
                      location: "tool_related_links",
                      link_label: link.label.toLowerCase(),
                    }}
                    className="inline-flex items-center justify-between rounded-[22px] border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-[color:var(--scooli-ink)] transition-colors hover:border-[color:var(--scooli-primary)] hover:text-[color:var(--scooli-primary)]"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="h-4 w-4" />
                  </TrackedLink>
                ))}
              </div>
            </SurfacePanel>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24 lg:py-28">
        <Container>
          <PageCtaBanner
            title={`Quer experimentar ${tool.shortTitle.toLowerCase()} na Scooli?`}
            description="Começa gratuitamente, gera um primeiro material e ajusta tudo antes de usar, imprimir ou exportar."
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
