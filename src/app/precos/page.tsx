import { Container } from "@/components/Container";
import { PricingPageClient } from "@/components/marketing/PricingPageClient";
import { getPageMetadata, PRICING } from "@/lib/seo";
import {
  Checklist,
  MarketingSectionHeading,
  PageCtaBanner,
  PageHero,
  PublicSiteShell,
  SurfacePanel,
} from "@/components/marketing/shared";
import { CreditCard, ShieldCheck, Sparkles } from "lucide-react";

export const metadata = getPageMetadata({
  title: "Preços Scooli",
  description:
    "Veja os planos da Scooli, o que está incluído em cada opção e a estrutura preparada para explicar limites e uso justo com clareza.",
  path: "/precos",
});

function PricingIntroCard() {
  return (
    <SurfacePanel className="bg-[color:var(--scooli-surface-alt)]">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-[24px] border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Plano gratuito</p>
          <p className="mt-2 text-2xl font-semibold text-slate-800">{PRICING.free.generationsPerMonth} gerações / mês</p>
          <p className="mt-2 text-sm text-slate-500">Ponto de entrada claro para experimentar.</p>
        </div>
        <div className="rounded-[24px] border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Plano Pro</p>
          <p className="mt-2 text-2xl font-semibold text-slate-800">Uso contínuo com mais liberdade</p>
          <p className="mt-2 text-sm text-slate-500">A explicação de limites e uso justo deve ficar visível nesta página.</p>
        </div>
      </div>
    </SurfacePanel>
  );
}

export default function PricingPage() {
  return (
    <PublicSiteShell>
      <PageHero
        eyebrow="Preços"
        title="Uma página própria para preços, limites e confiança"
        description="A homepage não precisa de carregar tudo. Esta página reúne planos, explicações sobre gerações, uso justo e caminhos diferentes para professores e escolas."
        secondaryHref="/escolas"
        secondaryLabel="Ver opção para escolas"
        aside={<PricingIntroCard />}
      >
        <Checklist
          items={[
            "Plano gratuito claro para experimentar",
            "Explicação do que conta como geração",
            "Separação entre self-serve e institucional",
          ]}
        />
      </PageHero>

      <section className="py-20 sm:py-24 lg:py-28">
        <Container className="grid gap-6 lg:grid-cols-3">
          <SurfacePanel>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-[color:var(--scooli-ink)]">O que é uma geração?</h3>
            <p className="mt-3 text-sm leading-7 text-[color:var(--scooli-muted)]">Esta página já cria espaço para explicar em linguagem simples o que conta como geração e o que o professor pode esperar.</p>
          </SurfacePanel>
          <SurfacePanel>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-[color:var(--scooli-ink)]">Uso justo sem letras pequenas</h3>
            <p className="mt-3 text-sm leading-7 text-[color:var(--scooli-muted)]">A política de uso justo deve continuar a existir, mas explicada aqui com clareza antes da decisão de compra.</p>
          </SurfacePanel>
          <SurfacePanel>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
              <CreditCard className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-[color:var(--scooli-ink)]">Caminhos diferentes</h3>
            <p className="mt-3 text-sm leading-7 text-[color:var(--scooli-muted)]">Professores podem decidir rápido. Escolas precisam de um percurso próprio com contacto e informação institucional.</p>
          </SurfacePanel>
        </Container>
      </section>

      <PricingPageClient />

      <section className="py-20 sm:py-24 lg:py-28">
        <Container className="space-y-12">
          <MarketingSectionHeading
            eyebrow="Notas importantes"
            title="Confiança ao lado da decisão"
            description="Em vez de esconder os detalhes, esta página aproxima a explicação dos limites, do pagamento e do apoio disponível."
            centered
          />
          <div className="grid gap-5 lg:grid-cols-3">
            <SurfacePanel>
              <p className="text-lg font-semibold text-[color:var(--scooli-ink)]">Pagamento</p>
              <p className="mt-3 text-sm leading-7 text-[color:var(--scooli-muted)]">Espaço para reforçar pagamentos seguros, cancelamento simples e apoio em caso de dúvida.</p>
            </SurfacePanel>
            <SurfacePanel>
              <p className="text-lg font-semibold text-[color:var(--scooli-ink)]">Uso justo</p>
              <p className="mt-3 text-sm leading-7 text-[color:var(--scooli-muted)]">Espaço para explicar o princípio de forma humana, sem obrigar o utilizador a abrir logo os termos legais.</p>
            </SurfacePanel>
            <SurfacePanel>
              <p className="text-lg font-semibold text-[color:var(--scooli-ink)]">Escolas</p>
              <p className="mt-3 text-sm leading-7 text-[color:var(--scooli-muted)]">Espaço para encaminhar instituições para contacto direto e proposta adaptada.</p>
            </SurfacePanel>
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-24 lg:pb-28">
        <Container>
          <PageCtaBanner
            title="Quer decidir com mais contexto antes de avançar?"
            description="A navegação pública já separa melhor preços, confiança, biblioteca e páginas por intenção. Isso reduz ruído na homepage e melhora a clareza da decisão."
            secondaryHref="/confianca"
            secondaryLabel="Ver confiança e privacidade"
          />
        </Container>
      </section>
    </PublicSiteShell>
  );
}
