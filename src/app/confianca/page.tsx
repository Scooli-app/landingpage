import { Container } from "@/components/Container";
import { trustCards } from "@/components/marketing/data";
import { getPageMetadata } from "@/lib/seo";
import {
  Checklist,
  InfoCard,
  MarketingSectionHeading,
  PageCtaBanner,
  PageHero,
  PlaceholderCard,
  PublicSiteShell,
  SurfacePanel,
} from "@/components/marketing/shared";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";

export const metadata = getPageMetadata({
  title: "Confiança e Privacidade",
  description:
    "Página pública de confiança da Scooli com privacidade, controlo do professor e uso responsável da IA explicados de forma simples.",
  path: "/confianca",
});

function TrustPreview() {
  return (
    <SurfacePanel className="bg-[color:var(--scooli-surface-alt)]">
      <div className="space-y-3">
        {[
          "O professor revê sempre o resultado final",
          "A IA não deve receber dados pessoais dos alunos sem necessidade",
          "A documentação mais detalhada pode viver aqui, fora da homepage",
        ].map((item) => (
          <div key={item} className="rounded-[24px] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
            {item}
          </div>
        ))}
      </div>
    </SurfacePanel>
  );
}

export default function TrustPage() {
  return (
    <PublicSiteShell>
      <PageHero
        eyebrow="Confiança e Privacidade"
        title="Uma página pública para responder às objeções que a homepage não deve carregar sozinha"
        description="A Scooli precisa de um lugar claro para explicar privacidade, responsabilidade, revisão humana e documentação futura sem depender apenas dos textos legais."
        secondaryHref="/privacy"
        secondaryLabel="Ver política de privacidade"
        aside={<TrustPreview />}
      >
        <Checklist
          items={[
            "Professor no controlo do conteúdo final",
            "Uso responsável da IA explicado em linguagem simples",
            "Espaço para documentação mais detalhada quando existir",
          ]}
        />
      </PageHero>

      <section className="py-20 sm:py-24 lg:py-28">
        <Container className="space-y-12">
          <MarketingSectionHeading
            eyebrow="Três mensagens-chave"
            title="O que esta página precisa de deixar claro"
            description="O objetivo aqui não é prometer o que ainda não está validado. É explicar limites, controlo e orientação de uso com mais honestidade."
            centered
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {trustCards.map((card) => (
              <InfoCard key={card.title} icon={card.icon} title={card.title} description={card.description} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white/70 py-20 sm:py-24 lg:py-28">
        <Container className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <SurfacePanel>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <p className="text-lg font-semibold text-[color:var(--scooli-ink)]">Orientações já seguras de comunicar</p>
            </div>
            <div className="mt-6 space-y-3 text-sm leading-7 text-[color:var(--scooli-muted)]">
              <p>A IA ajuda a criar rascunhos e versões, mas o professor deve rever o resultado antes de o usar em aula.</p>
              <p>Esta página também serve para orientar o que não deve ser colocado na ferramenta sem necessidade, sobretudo quando envolve dados pessoais de alunos.</p>
              <p>Quando houver documentação mais detalhada, certificações ou respostas institucionais, este é o local certo para as publicar.</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/privacy" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-[color:var(--scooli-primary)]">
                Política de Privacidade
              </Link>
              <Link href="/terms" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-[color:var(--scooli-primary)]">
                Termos de Utilização
              </Link>
            </div>
          </SurfacePanel>
          <div className="grid gap-5">
            <PlaceholderCard
              title="Documentação institucional futura"
              description="Placeholder para o conjunto de respostas mais técnicas que escolas ou equipas internas possam precisar."
              bullets={[
                "Resumo de arquitetura e processamento",
                "Guia interno de adoção responsável",
                "Resposta a perguntas frequentes de IT",
              ]}
            />
            <PlaceholderCard
              title="Boas práticas de utilização"
              description="Placeholder para exemplos do que convém rever e do tipo de informação que deve ser tratada com cuidado."
              bullets={[
                "Evitar dados pessoais desnecessários",
                "Rever sempre antes de usar",
                "Usar a página como referência pública da postura do produto",
              ]}
            />
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-24 lg:pb-28">
        <Container>
          <PageCtaBanner
            title="Quer ver como isto se liga ao percurso institucional?"
            description="A homepage ganha clareza quando estas objeções têm uma casa própria. Esta página passa a ser essa referência pública."
            secondaryHref="/escolas"
            secondaryLabel="Ver página para escolas"
          />
        </Container>
      </section>
    </PublicSiteShell>
  );
}

