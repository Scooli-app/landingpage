import { Container } from "@/components/Container";
import { libraryPageCards } from "@/components/marketing/data";
import {
  Checklist,
  MarketingSectionHeading,
  PageCtaBanner,
  PageHero,
  PublicSiteShell,
  SurfacePanel,
} from "@/components/marketing/shared";
import { getPageMetadata } from "@/lib/seo";
import { BookCopy, FolderSearch, LibraryBig, LockKeyhole } from "lucide-react";

export const metadata = getPageMetadata({
  title: "Biblioteca comunitária Scooli",
  description:
    "Explora a biblioteca comunitária da Scooli e descobre materiais que podes duplicar, adaptar e usar como ponto de partida.",
  path: "/biblioteca",
});

function LibraryPreviewGrid() {
  return (
    <SurfacePanel className="bg-[color:var(--scooli-surface-alt)]">
      <div className="grid gap-3">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
          <div className="flex items-center gap-3 rounded-[24px] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500">
            <FolderSearch className="h-4 w-4 text-[color:var(--scooli-primary)]" />
            Procurar por disciplina, ano, tipo de recurso ou tema
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-500">
            {["Português", "Matemática", "Fichas", "Testes"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-slate-200 bg-white px-2 py-1 flex items-center"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {libraryPageCards.slice(0, 3).map((card) => (
            <div
              key={card.title}
              className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_20px_50px_-40px_rgba(19,35,58,0.28)]"
            >
              <p className="text-lg font-semibold text-slate-800">
                {card.title}
              </p>
              <p className="mt-2 text-sm text-slate-500">{card.meta}</p>
              <div className="mt-4 h-24 rounded-[20px] bg-[linear-gradient(180deg,rgba(238,240,255,0.55),rgba(226,232,240,0.85))]" />
            </div>
          ))}
        </div>
      </div>
    </SurfacePanel>
  );
}

export default function LibraryPage() {
  return (
    <PublicSiteShell>
      <PageHero
        eyebrow="Biblioteca"
        title="Uma biblioteca comunitária para encontrar boas bases mais depressa"
        description="Explora materiais partilhados, percebe o tipo de recursos disponíveis e entra na plataforma para duplicar e adaptar ao teu contexto."
        secondaryHref="/professores"
        secondaryLabel="Ver percurso para professores"
        aside={<LibraryPreviewGrid />}
      >
        <Checklist
          items={[
            "Procurar por disciplina, ano e tipo de recurso",
            "Ver exemplos antes de entrar",
            "Duplicar e adaptar em vez de começar do zero",
          ]}
        />
      </PageHero>

      <section className="py-20 sm:py-24 lg:py-28">
        <Container className="space-y-12">
          <MarketingSectionHeading
            eyebrow="Como funciona"
            title="Descobrir primeiro. Adaptar depois."
            description="A biblioteca ajuda-te a perceber rapidamente se já existe uma boa base para o que precisas de preparar."
            centered
          />
          <div className="grid gap-5 lg:grid-cols-3">
            <SurfacePanel>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
                <LibraryBig className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-[color:var(--scooli-ink)]">
                Descobrir materiais relevantes
              </h3>
              <p className="mt-3 text-sm leading-7 text-[color:var(--scooli-muted)]">
                Pesquisar por disciplina, ciclo, tema e tipo de recurso aproxima
                a biblioteca da procura real dos professores.
              </p>
            </SurfacePanel>
            <SurfacePanel>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
                <BookCopy className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-[color:var(--scooli-ink)]">
                Duplicar e adaptar
              </h3>
              <p className="mt-3 text-sm leading-7 text-[color:var(--scooli-muted)]">
                O objetivo não é só ver um recurso: é usar essa base para chegar
                mais depressa a uma versão final útil.
              </p>
            </SurfacePanel>
            <SurfacePanel>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
                <LockKeyhole className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-[color:var(--scooli-ink)]">
                Preview com caminho claro
              </h3>
              <p className="mt-3 text-sm leading-7 text-[color:var(--scooli-muted)]">
                Os previews ajudam a decidir. A edição, a duplicação e o
                trabalho completo acontecem dentro da conta.
              </p>
            </SurfacePanel>
          </div>
        </Container>
      </section>

      <section className="bg-white/70 py-20 sm:py-24 lg:py-28">
        <Container className="space-y-12">
          <MarketingSectionHeading
            eyebrow="Exemplos de recursos"
            title="O tipo de materiais que podes encontrar na biblioteca"
            description="Fichas, planificações, testes, apresentações e recursos de apoio prontos para servir de base ao teu trabalho."
            centered
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {libraryPageCards.map((card) => (
              <SurfacePanel key={card.title}>
                <p className="text-xl font-semibold text-[color:var(--scooli-ink)]">
                  {card.title}
                </p>
                <p className="mt-2 text-sm text-[color:var(--scooli-muted)]">
                  {card.meta}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-5 h-28 rounded-[22px] bg-[linear-gradient(180deg,rgba(238,240,255,0.55),rgba(226,232,240,0.9))]" />
              </SurfacePanel>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-24 lg:pb-28">
        <Container>
          <PageCtaBanner
            title="Quer usar um destes recursos como ponto de partida?"
            description="Entra na Scooli, escolhe um material da biblioteca e adapta-o à tua turma em vez de começares tudo do zero."
            secondaryHref="/ferramentas"
            secondaryLabel="Ver ferramentas"
          />
        </Container>
      </section>
    </PublicSiteShell>
  );
}
