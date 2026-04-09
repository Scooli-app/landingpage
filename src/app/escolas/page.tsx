import { Container } from "@/components/Container";
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
import { getPageMetadata } from "@/lib/seo";
import { ShieldCheck, Users } from "lucide-react";

export const metadata = getPageMetadata({
  title: "Para escolas e instituições",
  description:
    "Descobre como a Scooli pode ser avaliada por escolas e agrupamentos através de um percurso simples de contacto, piloto e adoção responsável.",
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
        description="Se queres avaliar a Scooli com coordenação, direção ou uma equipa pequena de docentes, explicamos aqui como arrancar com clareza, responsabilidade e apoio inicial."
        primaryHref="mailto:info@scooli.app?subject=Scooli%20para%20escolas"
        primaryLabel="Falar com a equipa"
        primaryEventName="marketing_institutional_contact_opened"
        primaryEventProperties={{
          source: "schools_page_hero",
        }}
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
        <Container className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <SurfacePanel>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
                <ShieldCheck className="h-5 w-5" />
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

          <SurfacePanel>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
                <Users className="h-5 w-5" />
              </div>
              <p className="text-lg font-semibold text-[color:var(--scooli-ink)]">
                Problemas que costumam levar uma escola a procurar a Scooli
              </p>
            </div>
            <div className="mt-6 space-y-3">
              {[
                "A preparação de planificações, fichas e testes está a consumir demasiado tempo às equipas docentes",
                "A adaptação de materiais para turmas e níveis diferentes continua demasiado manual",
                "A escola quer testar IA útil sem abdicar de controlo pedagógico e revisão humana",
                "Há procura por uma forma simples de arrancar com um piloto antes de tomar uma decisão maior",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[22px] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
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
          <PageCtaBanner
            title="Quer perceber se a Scooli faz sentido para a tua escola?"
            description="Podemos começar por uma conversa curta, perceber o contexto e desenhar um piloto simples com a equipa certa."
            primaryHref="mailto:info@scooli.app?subject=Pedido%20de%20informa%C3%A7%C3%A3o%20institucional%20Scooli"
            primaryLabel="Contactar a equipa"
            primaryEventName="marketing_institutional_contact_opened"
            primaryEventProperties={{
              source: "schools_page_cta_banner",
            }}
            secondaryHref="/confianca"
            secondaryLabel="Ver confiança e privacidade"
          />
        </Container>
      </section>
    </PublicSiteShell>
  );
}
