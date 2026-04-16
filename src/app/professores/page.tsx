import { Container } from "@/components/Container";
import { OutputCard } from "@/components/homepage/OutputCard";
import { outputs } from "@/components/homepage/data";
import { teacherPageCards } from "@/components/marketing/data";
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
import { CalendarClock, LibraryBig } from "lucide-react";

export const metadata = getPageMetadata({
  title: "Para professores",
  description:
    "Descubra como a Scooli ajuda professores a criar planificações, fichas e testes com menos trabalho repetitivo, mais controlo e melhor alinhamento com as Aprendizagens Essenciais.",
  path: "/professores",
});

function WeeklyFlowPreview() {
  return (
    <SurfacePanel className="bg-[color:var(--scooli-surface-alt)]">
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { day: "2.ª feira", task: "Planificação da semana" },
          { day: "4.ª feira", task: "Ficha de consolidação" },
          { day: "6.ª feira", task: "Teste ou quiz rápido" },
        ].map((item) => (
          <div key={item.day} className="rounded-[24px] border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{item.day}</p>
            <p className="mt-3 text-lg font-semibold text-slate-800">{item.task}</p>
            <div className="mt-4 h-2.5 w-4/5 rounded-full bg-slate-200" />
            <div className="mt-2 h-2.5 w-3/5 rounded-full bg-slate-200" />
          </div>
        ))}
      </div>
    </SurfacePanel>
  );
}

export default function TeachersPage() {
  return (
    <PublicSiteShell>
      <PageHero
        eyebrow="Para professores"
        title="Uma forma mais simples de preparar aulas, fichas e testes sem começar do zero"
        description="Gere recursos editáveis em minutos, alinhados com as Aprendizagens Essenciais e prontos a adaptar para cada turma."
        secondaryHref="/biblioteca"
        secondaryLabel="Ver biblioteca"
        aside={<WeeklyFlowPreview />}
      >
        <Checklist
          items={[
            "Criar materiais em minutos",
            "Alinhar melhor com as Aprendizagens Essenciais",
            "Editar tudo antes de usar",
          ]}
        />
      </PageHero>

      <section className="py-20 sm:py-24 lg:py-28">
        <Container className="space-y-12">
          <MarketingSectionHeading
            eyebrow="Como ajuda"
            title="O que muda na prática durante a semana"
            description="A Scooli encaixa nas tarefas que mais se repetem: planificar, criar materiais e adaptar recursos para turmas diferentes, sempre com o contexto do currículo português em mente."
            centered
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {teacherPageCards.map((card) => (
              <InfoCard key={card.title} icon={card.icon} title={card.title} description={card.description} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white/70 py-20 sm:py-24 lg:py-28">
        <Container className="space-y-12">
          <MarketingSectionHeading
            eyebrow="O que pode criar"
            title="Veja o tipo de documento que sai"
            description="Planificações, fichas e testes aparecem com estrutura, texto e organização suficientes para começar a editar em vez de começar do zero."
            centered
          />
          <div className="grid gap-6 xl:grid-cols-3">
            {outputs.map((output) => (
              <OutputCard key={output.label} output={output} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24 lg:py-28">
        <Container className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <SurfacePanel>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
                <LibraryBig className="h-5 w-5" />
              </div>
              <div>
                <p className="text-lg font-semibold text-[color:var(--scooli-ink)]">Biblioteca comunitária</p>
                <p className="text-sm text-[color:var(--scooli-muted)]">Descobrir, duplicar e adaptar</p>
              </div>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Pesquisar por disciplina e ano",
                "Duplicar uma base já existente",
                "Guardar materiais para reutilizar mais tarde",
                "Entrar num recurso, adaptar e exportar",
              ].map((item) => (
                <div key={item} className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </SurfacePanel>
          <SurfacePanel>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
                <CalendarClock className="h-5 w-5" />
              </div>
              <p className="text-lg font-semibold text-[color:var(--scooli-ink)]">Como encaixa na semana</p>
            </div>
            <div className="mt-6 space-y-3">
              {[
                "Preparar uma aula mais depressa no início da semana",
                "Gerar uma ficha de consolidação alinhada com as Aprendizagens Essenciais",
                "Fechar um teste ou quiz sem reconstruir a estrutura toda",
              ].map((item) => (
                <div key={item} className="rounded-[22px] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
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
            title="Quer testar a Scooli ao seu ritmo?"
            description="Comece gratuitamente, experimente um pedido real da próxima aula e ajuste tudo ao seu contexto antes de usar."
            secondaryHref="/precos"
            secondaryLabel="Ver preços"
          />
        </Container>
      </section>
    </PublicSiteShell>
  );
}
