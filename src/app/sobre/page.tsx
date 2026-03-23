import { Container } from "@/components/Container";
import { aboutPrinciples, supportCards } from "@/components/marketing/data";
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

export const metadata = getPageMetadata({
  title: "Sobre a Scooli",
  description:
    "Conheça a missão, os princípios e a estrutura pública da página Sobre da Scooli, preparada para receber equipa e história real.",
  path: "/sobre",
});

function StoryPreview() {
  return (
    <SurfacePanel className="bg-[color:var(--scooli-surface-alt)]">
      <div className="space-y-3">
        {[
          "Porque é que a Scooli existe",
          "O que acredita sobre o papel do professor",
          "Quem está por trás do projeto",
        ].map((item, index) => (
          <div key={item} className="rounded-[24px] border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Bloco 0{index + 1}</p>
            <p className="mt-2 text-lg font-semibold text-slate-800">{item}</p>
            <div className="mt-4 h-2.5 w-4/5 rounded-full bg-slate-200" />
            <div className="mt-2 h-2.5 w-3/5 rounded-full bg-slate-200" />
          </div>
        ))}
      </div>
    </SurfacePanel>
  );
}

export default function AboutPage() {
  return (
    <PublicSiteShell>
      <PageHero
        eyebrow="Sobre"
        title="Uma página para explicar por que existe a Scooli e quem a está a construir"
        description="A homepage não deve carregar sozinha a missão e a credibilidade humana do projeto. Esta página cria esse espaço de forma clara e honesta."
        secondaryHref="mailto:info@scooli.app?subject=Sobre%20a%20Scooli"
        secondaryLabel="Falar connosco"
        aside={<StoryPreview />}
      >
        <Checklist
          items={[
            "Missão explicada sem discurso vazio",
            "Princípios claros para o produto",
            "Estrutura pronta para equipa real e contactos",
          ]}
        />
      </PageHero>

      <section className="py-20 sm:py-24 lg:py-28">
        <Container className="space-y-12">
          <MarketingSectionHeading
            eyebrow="Princípios"
            title="O que esta página deve transmitir"
            description="Antes de existirem fotos, bios ou marcos públicos, a página já pode mostrar a lógica do produto e a forma como a equipa pensa o problema."
            centered
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {aboutPrinciples.map((card) => (
              <InfoCard key={card.title} icon={card.icon} title={card.title} description={card.description} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white/70 py-20 sm:py-24 lg:py-28">
        <Container className="grid gap-6 lg:grid-cols-3">
          <PlaceholderCard
            title="História do projeto"
            description="Placeholder para contar o percurso da Scooli, o contexto em que surgiu e os marcos mais importantes à medida que existirem."
            bullets={[
              "Origem da ideia",
              "Aprendizagens iniciais",
              "Marcos e evolução futura",
            ]}
          />
          <PlaceholderCard
            title="Equipa"
            description="Placeholder para perfis reais, fotos e funções assim que a equipa pública estiver pronta para aparecer nesta página."
            bullets={[
              "Nome e função",
              "Breve biografia",
              "Ligação ao problema educativo",
            ]}
          />
          <PlaceholderCard
            title="Parceiros ou pilotos"
            description="Placeholder para prova externa real, sempre que existirem colaborações ou pilotos que possam ser mencionados publicamente."
            bullets={[
              "Contexto autorizado",
              "O que foi testado",
              "O que aprendemos",
            ]}
          />
        </Container>
      </section>

      <section className="py-20 sm:py-24 lg:py-28">
        <Container className="space-y-12">
          <MarketingSectionHeading
            eyebrow="Suporte ao crescimento"
            title="Estrutura pronta para o que vier a seguir"
            description="Nem tudo precisa de estar preenchido já. O importante é deixar a casa feita para conteúdo real e verificável."
            centered
          />
          <div className="grid gap-5 lg:grid-cols-2">
            {supportCards.map((card) => (
              <InfoCard key={card.title} icon={card.icon} title={card.title} description={card.description} tone="soft" />
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-24 lg:pb-28">
        <Container>
          <PageCtaBanner
            title="Quer ver como esta história se liga à homepage e às páginas públicas?"
            description="A homepage explica o produto em segundos. Esta página ajuda a sustentar confiança, missão e identidade da marca ao longo do tempo."
            secondaryHref="/"
            secondaryLabel="Voltar à homepage"
          />
        </Container>
      </section>
    </PublicSiteShell>
  );
}


