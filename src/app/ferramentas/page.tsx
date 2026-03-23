import { Container } from "@/components/Container";
import { toolCardIcons, toolPages } from "@/components/marketing/data";
import { getPageMetadata } from "@/lib/seo";
import {
  Checklist,
  MarketingSectionHeading,
  PageCtaBanner,
  PageHero,
  PublicSiteShell,
  SurfacePanel,
} from "@/components/marketing/shared";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = getPageMetadata({
  title: "Ferramentas Scooli",
  description:
    "Índice das páginas de ferramenta da Scooli, criado para suportar discovery, SEO e páginas de intenção específicas com placeholders prontos para conteúdo real.",
  path: "/ferramentas",
});

function ToolsPreview() {
  return (
    <SurfacePanel className="bg-[color:var(--scooli-surface-alt)]">
      <div className="grid gap-3 sm:grid-cols-2">
        {toolPages.slice(0, 4).map((tool) => {
          const Icon = toolCardIcons[tool.slug];
          return (
            <div key={tool.slug} className="rounded-[24px] border border-slate-200 bg-white p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-4 text-lg font-semibold text-slate-800">{tool.shortTitle}</p>
              <p className="mt-2 text-sm text-slate-500">Página pronta para SEO e prova futura.</p>
            </div>
          );
        })}
      </div>
    </SurfacePanel>
  );
}

export default function ToolsIndexPage() {
  return (
    <PublicSiteShell>
      <PageHero
        eyebrow="Ferramentas"
        title="Páginas de intenção específicas para aquilo que os professores realmente procuram"
        description="Em vez de fazer a homepage responder a tudo, estas páginas passam a corresponder a intenções concretas como testes, fichas, planificações ou adaptação de materiais."
        secondaryHref="/professores"
        secondaryLabel="Ver percurso para professores"
        aside={<ToolsPreview />}
      >
        <Checklist
          items={[
            "Melhor estrutura para SEO",
            "Páginas curtas e focadas por intenção",
            "Placeholders prontos para screenshots e exemplos reais",
          ]}
        />
      </PageHero>

      <section className="py-20 sm:py-24 lg:py-28">
        <Container className="space-y-12">
          <MarketingSectionHeading
            eyebrow="Páginas disponíveis"
            title="Arquitetura já preparada para crescer com o produto"
            description="Cada página de ferramenta tem estrutura própria para hero, exemplos, casos de uso e CTA, mesmo antes de o conteúdo final estar completo."
            centered
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {toolPages.map((tool) => {
              const Icon = toolCardIcons[tool.slug];
              return (
                <SurfacePanel key={tool.slug}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-[color:var(--scooli-ink)]">{tool.shortTitle}</h3>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--scooli-muted)]">{tool.description}</p>
                  <Link href={`/ferramentas/${tool.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--scooli-primary)]">
                    Abrir página
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </SurfacePanel>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-24 lg:pb-28">
        <Container>
          <PageCtaBanner
            title="Quer que estas páginas passem de estrutura a prova real?"
            description="O passo seguinte é ligar screenshots, documentos exportados, exemplos reais e copy final a cada intenção de procura."
            secondaryHref="/biblioteca"
            secondaryLabel="Ver biblioteca"
          />
        </Container>
      </section>
    </PublicSiteShell>
  );
}
