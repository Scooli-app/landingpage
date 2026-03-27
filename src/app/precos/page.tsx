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
  title: "Preços",
  description:
    "Vê os preços da Scooli, percebe o que inclui cada plano e descobre qual é o caminho certo para professores e escolas.",
  path: "/precos",
});

function PricingIntroCard() {
  return (
    <SurfacePanel className="bg-[color:var(--scooli-surface-alt)]">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-[24px] border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Plano gratuito</p>
          <p className="mt-2 text-2xl font-semibold text-slate-800">{PRICING.free.generationsPerMonth} gerações / mês</p>
          <p className="mt-2 text-sm text-slate-500">Para experimentar a Scooli com pedidos reais e perceber o fluxo de trabalho.</p>
        </div>
        <div className="rounded-[24px] border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Plano Pro</p>
          <p className="mt-2 text-2xl font-semibold text-slate-800">Uso contínuo com mais liberdade</p>
          <p className="mt-2 text-sm text-slate-500">Para quem quer usar a plataforma todas as semanas sem pensar em limites curtos.</p>
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
        title="Preços claros para professores e um caminho próprio para escolas"
        description="Experimenta a Scooli com o plano gratuito. Se precisares de usar a plataforma todas as semanas, escolhe Pro. Se representas uma escola, fala connosco para definir um piloto ou percurso institucional."
        secondaryHref="/escolas"
        secondaryLabel="Ver opção para escolas"
        aside={<PricingIntroCard />}
      >
        <Checklist
          items={[
            "Plano gratuito para experimentar sem compromisso",
            "Plano Pro para uso contínuo com mais liberdade",
            "Escolas seguem por contacto direto com a equipa",
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
            <p className="mt-3 text-sm leading-7 text-[color:var(--scooli-muted)]">
              Na prática, uma geração é cada novo documento criado com IA. Se pedires outra versão do mesmo material,
              isso conta como uma nova geração.
            </p>
          </SurfacePanel>
          <SurfacePanel>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-[color:var(--scooli-ink)]">Uso justo sem letras pequenas</h3>
            <p className="mt-3 text-sm leading-7 text-[color:var(--scooli-muted)]">
              No Pro não tens um limite mensal rígido. A política de uso justo existe para evitar abuso automatizado e
              manter a qualidade do serviço para todos.
            </p>
          </SurfacePanel>
          <SurfacePanel>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
              <CreditCard className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-[color:var(--scooli-ink)]">Professores e escolas não seguem o mesmo caminho</h3>
            <p className="mt-3 text-sm leading-7 text-[color:var(--scooli-muted)]">
              Professores podem começar logo. Escolas e agrupamentos têm um percurso próprio, com contacto inicial e
              avaliação do contexto antes de avançar.
            </p>
          </SurfacePanel>
        </Container>
      </section>

      <PricingPageClient />

      <section className="py-20 sm:py-24 lg:py-28">
        <Container className="space-y-12">
          <MarketingSectionHeading
            eyebrow="Notas importantes"
            title="Ajudar a decidir com mais clareza"
            description="Em vez de esconder os detalhes, aqui tens o essencial para decidir com mais clareza: limites, pagamento, apoio e percurso institucional."
            centered
          />
          <div className="grid gap-5 lg:grid-cols-3">
            <SurfacePanel>
              <p className="text-lg font-semibold text-[color:var(--scooli-ink)]">Pagamento</p>
              <p className="mt-3 text-sm leading-7 text-[color:var(--scooli-muted)]">
                Os pagamentos são processados de forma segura. Se precisares de ajuda com faturação ou subscrição,
                responde-nos por email.
              </p>
            </SurfacePanel>
            <SurfacePanel>
              <p className="text-lg font-semibold text-[color:var(--scooli-ink)]">Uso justo</p>
              <p className="mt-3 text-sm leading-7 text-[color:var(--scooli-muted)]">
                Queremos que possas trabalhar com liberdade. Só intervimos quando há padrões anómalos ou automatizados
                que coloquem o serviço em risco.
              </p>
            </SurfacePanel>
            <SurfacePanel>
              <p className="text-lg font-semibold text-[color:var(--scooli-ink)]">Escolas</p>
              <p className="mt-3 text-sm leading-7 text-[color:var(--scooli-muted)]">
                Para equipas, agrupamentos ou projetos-piloto, definimos o percurso caso a caso, sempre com contacto
                direto com a equipa.
              </p>
            </SurfacePanel>
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-24 lg:pb-28">
        <Container>
          <PageCtaBanner
            title="Quer experimentar antes de decidir?"
            description="Começa gratuitamente, gera alguns materiais reais e percebe se a Scooli encaixa no teu ritmo de trabalho."
            secondaryHref="/confianca"
            secondaryLabel="Ver confiança e privacidade"
          />
        </Container>
      </section>
    </PublicSiteShell>
  );
}
