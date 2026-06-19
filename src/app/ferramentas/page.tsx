import { Container } from "@/components/Container";
import { toolCardIcons, toolPages } from "@/components/marketing/data";
import { getPageMetadata } from "@/lib/seo";
import {
  PageCtaBanner,
  PageHero,
  PublicSiteShell,
  SurfacePanel,
} from "@/components/marketing/shared";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const toolScreenshots: Record<string, string> = {
  "planificacoes":        "/screenshots/landing-planificacoes.jpg",
  "plano-de-aula":        "/screenshots/landing-plano-aula.jpg",
  "sequencias-de-aulas":  "/screenshots/landing-sequencias.jpg",
  "gerador-de-testes":    "/screenshots/landing-testes.jpg",
  "fichas-de-trabalho":   "/screenshots/landing-fichas.jpg",
  "quizzes":              "/screenshots/landing-quizzes.jpg",
  "apresentacoes":        "/screenshots/landing-apresentacoes.jpg",
  "adaptacao-de-materiais": "/screenshots/landing-adaptacao.jpg",
  "carregar-documentos":  "/screenshots/landing-carregar.jpg",
};

export const metadata = getPageMetadata({
  title: "Ferramentas para professores",
  description:
    "Explore as ferramentas da Scooli: planificações, planos de aula, sequências de aulas, testes, fichas, quizzes e mais — tudo alinhado com o currículo português.",
  path: "/ferramentas",
  keywords: [
    "ferramentas para professores",
    "gerador de fichas de trabalho",
    "gerador de testes",
    "planificações com IA",
    "plano de aula com IA",
    "sequências de aulas",
    "quizzes com IA",
    "apresentações com IA",
    "adaptação de materiais",
  ],
});

const categories = [
  {
    label: "Planificação e preparação",
    description: "Da planificação anual ao plano letivo por período e ao plano de aula individual — documentos e estruturas alinhados com as AE e o DL 55/2018.",
    slugs: ["planificacoes", "plano-de-aula", "sequencias-de-aulas"],
  },
  {
    label: "Avaliação",
    description: "Testes e quizzes com diferentes tipos de pergunta, cotação e critérios de correção, prontos a rever e exportar.",
    slugs: ["gerador-de-testes", "quizzes"],
  },
  {
    label: "Conteúdo e materiais",
    description: "Fichas de trabalho, apresentações e adaptações de materiais para diferentes turmas e ritmos de aprendizagem.",
    slugs: ["fichas-de-trabalho", "apresentacoes", "adaptacao-de-materiais", "carregar-documentos"],
  },
];

export default function ToolsIndexPage() {
  return (
    <PublicSiteShell>
      <PageHero
        eyebrow="Ferramentas"
        title="Escolha o tipo de recurso que quer criar"
        description="Cada ferramenta responde a uma necessidade concreta. Se já sabe o que precisa de preparar, escolha diretamente; se não, explore por categoria."
        secondaryHref="/professores"
        secondaryLabel="Ver percurso para professores"
      />

      <section className="py-20 sm:py-24 lg:py-28">
        <Container className="space-y-20">
          {categories.map((category) => {
            const tools = category.slugs
              .map((slug) => toolPages.find((t) => t.slug === slug))
              .filter(Boolean) as typeof toolPages;

            return (
              <div key={category.label} className="space-y-8">
                <div className="max-w-2xl">
                  <h2 className="text-2xl font-semibold text-[color:var(--scooli-ink)]">
                    {category.label}
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-[color:var(--scooli-muted)]">
                    {category.description}
                  </p>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {tools.map((tool) => {
                    const Icon = toolCardIcons[tool.slug];
                    return (
                      <SurfacePanel key={tool.slug} className="flex flex-col overflow-hidden !p-0">
                        {toolScreenshots[tool.slug] && (
                          <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                            <Image
                              src={toolScreenshots[tool.slug]}
                              alt={`Pré-visualização: ${tool.shortTitle}`}
                              fill
                              className="object-cover object-top"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          </div>
                        )}
                        <div className="flex flex-1 flex-col p-6">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
                            <Icon className="h-4 w-4" />
                          </div>
                          <h3 className="mt-4 text-lg font-semibold text-[color:var(--scooli-ink)]">
                            {tool.shortTitle}
                          </h3>
                          <p className="mt-2 flex-1 text-sm leading-7 text-[color:var(--scooli-muted)]">
                            {tool.description}
                          </p>
                          <Link
                            href={`/ferramentas/${tool.slug}`}
                            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--scooli-primary)]"
                          >
                            Ver {tool.shortTitle.toLowerCase()}
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </SurfacePanel>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </Container>
      </section>

      <section className="pb-20 sm:pb-24 lg:pb-28">
        <Container>
          <PageCtaBanner
            title="Quer começar por um pedido simples?"
            description="Escolha a ferramenta mais próxima do que precisa ou entre diretamente na plataforma para criar o primeiro material."
            secondaryHref="/biblioteca"
            secondaryLabel="Ver biblioteca"
          />
        </Container>
      </section>
    </PublicSiteShell>
  );
}
