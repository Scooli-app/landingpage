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
    "Explora as ferramentas da Scooli e escolhe o tipo de recurso que queres criar: testes, fichas, planificações, quizzes e mais.",
  path: "/ferramentas",
  keywords: [
    "ferramentas para professores",
    "gerador de fichas de trabalho",
    "gerador de testes",
    "planificações com IA",
    "quizzes com IA",
    "apresentações com IA",
    "adaptação de materiais",
  ],
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
              <p className="mt-2 text-sm text-slate-500">Criação rápida com edição total antes de usar.</p>
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
        title="Escolhe o tipo de recurso que queres criar"
        description="Se já sabes o que precisas de preparar, estas páginas mostram-te rapidamente em que situações a Scooli ajuda e que resultado podes esperar."
        secondaryHref="/professores"
        secondaryLabel="Ver percurso para professores"
        aside={<ToolsPreview />}
      >
        <Checklist
          items={[
            "Páginas curtas focadas numa tarefa concreta",
            "Exemplos do que podes criar",
            "Acesso direto para começar gratuitamente",
          ]}
        />
      </PageHero>

      <section className="py-20 sm:py-24 lg:py-28">
        <Container className="space-y-12">
          <MarketingSectionHeading
            eyebrow="Ferramentas disponíveis"
            title="Escolhe a opção mais próxima do que precisas hoje"
            description="Cada ferramenta responde a uma necessidade concreta, para perceberes logo se a Scooli encaixa no trabalho que queres adiantar."
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
                    Ver {tool.shortTitle.toLowerCase()}
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
            title="Quer começar por um pedido simples?"
            description="Escolhe a ferramenta mais próxima do que precisas ou entra diretamente na plataforma para criar o primeiro material."
            secondaryHref="/biblioteca"
            secondaryLabel="Ver biblioteca"
          />
        </Container>
      </section>
    </PublicSiteShell>
  );
}
