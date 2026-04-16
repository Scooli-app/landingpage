import { Container } from "@/components/Container";
import { InstitutionalContactButton } from "@/components/InstitutionalContactButton";
import { TrackedLink } from "@/components/TrackedLink";
import { schoolPageCards } from "@/components/marketing/data";
import {
  Checklist,
  InfoCard,
  MarketingSectionHeading,
  PageCtaBanner,
  PageHero,
  PublicSiteShell,
  SurfacePanel,
} from "@/components/marketing/shared";
import { Button } from "@/components/ui/button";
import { getPageMetadata } from "@/lib/seo";
import { ArrowRight, ShieldCheck } from "lucide-react";

export const metadata = getPageMetadata({
  title: "Para escolas e instituições",
  description:
    "Descubra como a Scooli pode ser avaliada por escolas e agrupamentos através de um percurso simples de contacto, piloto e adoção responsável.",
  path: "/escolas",
});

function InstitutionalPreview() {
  return (
    <SurfacePanel className="bg-[color:var(--scooli-surface-alt)]">
      <div className="grid gap-3">
        {[
          "Conversa inicial sobre contexto e objetivos",
          "Piloto com uma equipa pequena",
          "Avaliação do uso e próximos passos",
        ].map((item, index) => (
          <div
            key={item}
            className="rounded-[24px] border border-slate-200 bg-white p-4"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Passo 0{index + 1}
            </p>
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
        title="Um percurso simples para escolas começarem com um piloto"
        description="Para avaliar a Scooli com coordenação, direção ou uma equipa pequena de docentes, explicamos aqui como arrancar com clareza, responsabilidade e apoio inicial."
        primaryAction={
          <InstitutionalContactButton
            source="schools_page_hero"
            className="h-12 rounded-full px-6 text-base font-semibold shadow-[0_20px_32px_-18px_rgba(103,83,255,0.45)]"
          />
        }
        secondaryHref="/confianca"
        secondaryLabel="Ver confiança e privacidade"
        aside={<InstitutionalPreview />}
      >
        <Checklist
          items={[
            "Conversa inicial sobre contexto e objetivos",
            "Piloto com equipa pequena e critérios claros",
            "Professor no controlo do resultado final",
          ]}
        />
      </PageHero>

      <section className="py-20 sm:py-24 lg:py-28">
        <Container className="space-y-12">
          <MarketingSectionHeading
            eyebrow="Como trabalhamos"
            title="Um caminho leve para avaliar a Scooli em contexto real"
            description="Em vez de um processo pesado, começamos pequeno, percebemos o contexto da escola e acompanhamos a primeira fase de utilização."
            centered
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {schoolPageCards.map((card) => (
              <InfoCard
                key={card.title}
                icon={card.icon}
                title={card.title}
                description={card.description}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24 lg:py-28">
        <Container>
          <SurfacePanel>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="text-lg font-semibold text-[color:var(--scooli-ink)]">
                O que costuma travar a decisão logo no início
              </p>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Como é tratada a privacidade em contexto escolar",
                "Se os dados dos utilizadores são usados para treinar modelos",
                "Quem mantém o controlo do conteúdo final",
                "Como garantir revisão humana antes de usar em aula",
                "Como arrancar com um piloto antes de tomar uma decisão maior",
                "A adaptação de materiais para turmas e níveis diferentes continua demasiado manual",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </SurfacePanel>
        </Container>
      </section>

      <section className="pb-20 sm:pb-24 lg:pb-28">
        <Container>
          <SurfacePanel className="bg-[linear-gradient(135deg,rgba(103,83,255,0.10),rgba(255,255,255,0.97)_45%,rgba(59,130,246,0.10))]">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Recomendação interna
                </p>
                <h2 className="font-display text-3xl leading-tight text-[color:var(--scooli-ink)] sm:text-4xl">
                  Trabalha numa escola mas não está na direção?
                </h2>
                <p className="max-w-2xl text-base leading-8 text-[color:var(--scooli-muted)] sm:text-lg">
                  Pode abrir a conversa na mesma. Criamos uma página dedicada
                  para professores e equipas que querem sugerir a Scooli à
                  direção, coordenação ou agrupamento onde trabalham.
                </p>
              </div>

              <Button
                asChild
                className="h-12 rounded-full px-6 text-base font-semibold shadow-[0_20px_32px_-18px_rgba(103,83,255,0.45)]"
              >
                <TrackedLink
                  href="/recomendar-instituicao"
                  eventName="marketing_cta_clicked"
                  eventProperties={{
                    cta_id: "schools_page_recommend_institution",
                    placement: "schools_page_referral_callout",
                  }}
                >
                  Recomendar a minha escola
                  <ArrowRight className="h-4 w-4" />
                </TrackedLink>
              </Button>
            </div>
          </SurfacePanel>
        </Container>
      </section>

      <section className="pb-20 sm:pb-24 lg:pb-28">
        <Container>
          <PageCtaBanner
            title="Quer perceber se a Scooli faz sentido para a sua escola?"
            description="Comece por uma conversa curta, perceba o contexto e desenhe um piloto simples com a equipa certa."
            primaryAction={
              <InstitutionalContactButton
                source="schools_page_cta_banner"
                className="h-12 rounded-full px-6 text-base font-semibold shadow-[0_20px_32px_-18px_rgba(103,83,255,0.45)]"
              />
            }
            secondaryHref="/confianca"
            secondaryLabel="Ver confiança e privacidade"
          />
        </Container>
      </section>
    </PublicSiteShell>
  );
}
