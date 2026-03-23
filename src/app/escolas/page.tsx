import { Container } from "@/components/Container";
import { schoolPageCards } from "@/components/marketing/data";
import { getPageMetadata } from "@/lib/seo";
import {
  Checklist,
  InfoCard,
  MarketingSectionHeading,
  PageCtaBanner,
  PageHero,
  PlaceholderCard,
  PlaceholderTag,
  PublicSiteShell,
  SurfacePanel,
} from "@/components/marketing/shared";
import { Building2, FileStack, GraduationCap, ShieldCheck } from "lucide-react";

export const metadata = getPageMetadata({
  title: "Scooli para escolas e instituições",
  description:
    "Página institucional da Scooli para escolas, agrupamentos e equipas que procuram adoção responsável, apoio e um percurso de implementação claro.",
  path: "/escolas",
});

function InstitutionalPreview() {
  return (
    <SurfacePanel className="bg-[color:var(--scooli-surface-alt)]">
      <div className="grid gap-3">
        {[
          "Piloto com equipa pequena",
          "Formação inicial e boas práticas",
          "Acompanhamento e expansão faseada",
        ].map((item, index) => (
          <div key={item} className="rounded-[24px] border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Passo 0{index + 1}</p>
            <p className="mt-2 text-lg font-semibold text-slate-800">{item}</p>
            <div className="mt-4 h-2.5 w-4/5 rounded-full bg-slate-200" />
            <div className="mt-2 h-2.5 w-3/5 rounded-full bg-slate-200" />
          </div>
        ))}
      </div>
    </SurfacePanel>
  );
}

export default function SchoolsPage() {
  return (
    <PublicSiteShell>
      <PageHero
        eyebrow="Para escolas"
        title="Uma página institucional para adoção com mais clareza e menos fricção"
        description="A Scooli precisa de um percurso próprio para escolas, agrupamentos e instituições. Esta página já cria esse caminho com estrutura para documentação, implementação e prova futura."
        primaryHref="mailto:info@scooli.app?subject=Scooli%20para%20escolas"
        primaryLabel="Falar com a equipa"
        secondaryHref="/confianca"
        secondaryLabel="Ver confiança e privacidade"
        aside={<InstitutionalPreview />}
      >
        <Checklist
          items={[
            "Percurso separado do self-serve",
            "Espaço para documentação institucional",
            "Estrutura pronta para pilotos e casos de uso",
          ]}
        />
      </PageHero>

      <section className="py-20 sm:py-24 lg:py-28">
        <Container className="space-y-12">
          <MarketingSectionHeading
            eyebrow="O que esta página resolve"
            title="Objeções institucionais que não devem viver só na homepage"
            description="Escolas e instituições precisam de um lugar próprio para perceber onboarding, apoio, privacidade e limites de uso."
            centered
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {schoolPageCards.map((card) => (
              <InfoCard key={card.title} icon={card.icon} title={card.title} description={card.description} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white/70 py-20 sm:py-24 lg:py-28">
        <Container className="grid gap-6 lg:grid-cols-3">
          <PlaceholderCard
            title="Pack de aprovação interna"
            description="Placeholder para documentos que ajudam equipas diretivas, coordenadores e IT a perceber o que a Scooli faz e como pode ser adotada."
            bullets={[
              "Resumo executivo da ferramenta",
              "Perguntas frequentes de adoção",
              "Checklist interna para piloto",
            ]}
          />
          <PlaceholderCard
            title="Casos de uso por ciclo ou departamento"
            description="Placeholder para mostrar como a ferramenta pode ser usada em contextos diferentes sem prometer resultados não validados."
            bullets={[
              "Português e línguas",
              "Matemática e Ciências",
              "Adaptação de materiais em equipas mistas",
            ]}
          />
          <PlaceholderCard
            title="Prova institucional futura"
            description="Placeholder para pilotos, depoimentos autorizados e exemplos de implementação assim que existirem."
            bullets={[
              "Caso-piloto com feedback real",
              "Resumo de formação inicial",
              "Materiais de onboarding",
            ]}
          />
        </Container>
      </section>

      <section className="py-20 sm:py-24 lg:py-28">
        <Container className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <SurfacePanel>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <p className="text-lg font-semibold text-[color:var(--scooli-ink)]">Pontos que a equipa precisa de ver logo</p>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Professor continua no controlo do conteúdo final",
                "Os outputs devem ser revistos antes de usar",
                "Página de confiança com linguagem simples",
                "Documentação adicional assinalada como placeholder quando ainda não existir",
              ].map((item) => (
                <div key={item} className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </SurfacePanel>
          <SurfacePanel>
            <PlaceholderTag>Placeholder institucional</PlaceholderTag>
            <div className="mt-5 space-y-4">
              <div className="flex items-center gap-3 rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-3">
                <Building2 className="h-5 w-5 text-[color:var(--scooli-primary)]" />
                <span className="text-sm text-slate-700">Resumo para direção</span>
              </div>
              <div className="flex items-center gap-3 rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-3">
                <GraduationCap className="h-5 w-5 text-[color:var(--scooli-primary)]" />
                <span className="text-sm text-slate-700">Plano de formação inicial</span>
              </div>
              <div className="flex items-center gap-3 rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-3">
                <FileStack className="h-5 w-5 text-[color:var(--scooli-primary)]" />
                <span className="text-sm text-slate-700">Documentação em preparação</span>
              </div>
            </div>
          </SurfacePanel>
        </Container>
      </section>

      <section className="pb-20 sm:pb-24 lg:pb-28">
        <Container>
          <PageCtaBanner
            title="Quer abrir um piloto ou perceber melhor o percurso institucional?"
            description="A página já está preparada para esse caminho. O próximo passo pode ser uma conversa inicial e a ligação futura de documentação e prova real."
            primaryHref="mailto:info@scooli.app?subject=Pedido%20de%20informa%C3%A7%C3%A3o%20institucional%20Scooli"
            primaryLabel="Contactar a equipa"
            secondaryHref="/precos"
            secondaryLabel="Ver opções e planos"
          />
        </Container>
      </section>
    </PublicSiteShell>
  );
}
