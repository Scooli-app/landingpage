import { Container } from "@/components/Container";
import { trustCards } from "@/components/marketing/data";
import {
  InfoCard,
  MarketingSectionBadge,
  PublicSiteShell,
  SurfacePanel,
} from "@/components/marketing/shared";
import { getPageMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = getPageMetadata({
  title: "Confiança e Privacidade",
  description:
    "Percebe como a Scooli trata privacidade, revisão humana, Aprendizagens Essenciais e uso responsável da IA com linguagem simples e direta.",
  path: "/confianca",
});

const summaryPoints = [
  "RGPD-ready",
  "Professor no controlo do resultado final",
  "Os dados dos utilizadores não são usados para treinar modelos",
  "Revisão humana antes de usar em aula",
  "Materiais orientados pelas Aprendizagens Essenciais",
];

const commitments = [
  {
    title: "Professor no controlo",
    description:
      "A Scooli ajuda a gerar um ponto de partida, mas a decisão final sobre o que vai para a aula continua do lado do professor.",
  },
  {
    title: "Sem treino com dados dos utilizadores",
    description:
      "Os materiais e pedidos feitos na plataforma não são usados para treinar modelos de IA.",
  },
  {
    title: "Revisão humana sempre recomendada",
    description:
      "Os outputs devem ser revistos, ajustados e validados antes de serem usados com alunos.",
  },
  {
    title: "Alinhamento com Aprendizagens Essenciais",
    description:
      "A Scooli é posicionada para gerar materiais de acordo com as Aprendizagens Essenciais, o que ajuda a reforçar alinhamento curricular, qualidade do conteúdo e confiança.",
  },
  {
    title: "Privacidade explicada sem jargão",
    description:
      "A postura da Scooli sobre privacidade e uso responsável pode ser percebida rapidamente, sem depender só dos textos legais.",
  },
];

const goodPractices = [
  "Evita inserir dados pessoais desnecessários de alunos.",
  "Usa contexto pedagógico sempre que possível, em vez de informação identificável.",
  "Confirma sempre que o material final está alinhado com as Aprendizagens Essenciais e com o teu contexto de aula.",
  "Trata a IA como apoio à criação e adaptação de materiais, nunca como substituição da decisão pedagógica.",
];

export default function TrustPage() {
  return (
    <PublicSiteShell>
      <section className="relative isolate pt-8 sm:pt-10">
        <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(circle_at_top_left,rgba(103,83,255,0.16),transparent_40%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.10),transparent_24%)]" />
        <Container className="pb-16 pt-10 sm:pb-20 lg:pb-24">
          <div className="space-y-6">
            <MarketingSectionBadge>Confiança e Privacidade</MarketingSectionBadge>
            <div className="max-w-4xl space-y-4">
              <h1 className="font-display text-4xl leading-tight text-[color:var(--scooli-ink)] sm:text-5xl lg:text-6xl">
                Privacidade, revisão humana, alinhamento curricular e uso responsável, explicados sem jargão
              </h1>
              <p className="text-lg leading-8 text-[color:var(--scooli-muted)] sm:text-xl">
                Se queres perceber rapidamente como a Scooli lida com estes temas, aqui tens o essencial: o que acontece aos dados, onde fica o controlo do professor e porque o alinhamento com as Aprendizagens Essenciais também faz parte da confiança no produto.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {summaryPoints.map((item) => (
                <div
                  key={item}
                  className="rounded-[24px] border border-slate-200 bg-white px-5 py-4 text-sm font-medium text-slate-700 shadow-[0_24px_60px_-56px_rgba(19,35,58,0.35)]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-24 lg:pb-28">
        <Container className="space-y-6">
          <section className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--scooli-primary)]">Princípios</p>
              <h2 className="font-display text-3xl leading-tight text-[color:var(--scooli-ink)] sm:text-4xl">
                O essencial para usar a Scooli com confiança
              </h2>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {trustCards.map((card) => (
                <InfoCard
                  key={card.title}
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                />
              ))}
            </div>
          </section>

          <section>
            <SurfacePanel>
              <h2 className="font-display text-2xl leading-tight text-[color:var(--scooli-ink)] sm:text-3xl">
                Compromissos públicos
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {commitments.map((item) => (
                  <div key={item.title} className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                    <p className="text-lg font-semibold text-[color:var(--scooli-ink)]">{item.title}</p>
                    <p className="mt-3 text-sm leading-7 text-[color:var(--scooli-muted)]">{item.description}</p>
                  </div>
                ))}
              </div>
            </SurfacePanel>
          </section>

          <section>
            <SurfacePanel>
              <h2 className="font-display text-2xl leading-tight text-[color:var(--scooli-ink)] sm:text-3xl">
                Antes de usar em aula
              </h2>
              <div className="mt-6 grid gap-3">
                {goodPractices.map((item) => (
                  <div
                    key={item}
                    className="rounded-[22px] border border-slate-200 bg-white px-4 py-3 text-sm leading-7 text-slate-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </SurfacePanel>
          </section>

          <section>
            <SurfacePanel>
              <h2 className="font-display text-2xl leading-tight text-[color:var(--scooli-ink)] sm:text-3xl">
                Documentos úteis
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Link
                  href="/privacy"
                  className="rounded-[24px] border border-slate-200 bg-white p-5 transition hover:border-[color:var(--scooli-primary)]/30 hover:bg-[color:var(--scooli-surface-alt)]"
                >
                  <p className="text-lg font-semibold text-[color:var(--scooli-ink)]">Política de Privacidade</p>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--scooli-muted)]">
                    Detalhes legais sobre tratamento de dados, responsabilidades e informação adicional.
                  </p>
                </Link>
                <Link
                  href="/terms"
                  className="rounded-[24px] border border-slate-200 bg-white p-5 transition hover:border-[color:var(--scooli-primary)]/30 hover:bg-[color:var(--scooli-surface-alt)]"
                >
                  <p className="text-lg font-semibold text-[color:var(--scooli-ink)]">Termos de Utilização</p>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--scooli-muted)]">
                    Condições de uso, princípios de utilização e notas sobre subscrição e uso justo.
                  </p>
                </Link>
              </div>
            </SurfacePanel>
          </section>
        </Container>
      </section>
    </PublicSiteShell>
  );
}
