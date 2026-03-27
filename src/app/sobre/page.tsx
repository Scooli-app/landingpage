import { Container } from "@/components/Container";
import {
  MarketingSectionBadge,
  PublicSiteShell,
  SurfacePanel,
} from "@/components/marketing/shared";
import { getPageMetadata } from "@/lib/seo";
import Image from "next/image";

export const metadata = getPageMetadata({
  title: "Sobre a Scooli",
  description:
    "Conhece a missão da Scooli, o problema que queremos resolver e a equipa que está a construir o produto.",
  path: "/sobre",
});

const missionPoints = [
  {
    title: "Devolver tempo aos professores",
    description:
      "Queremos reduzir o trabalho repetitivo da preparação de aulas para libertar tempo para ensinar, acompanhar alunos e ajustar melhor o que acontece em sala.",
  },
  {
    title: "Criar comunidade, não só uma ferramenta",
    description:
      "O trabalho de um professor é muitas vezes solitário. A Scooli também quer aproximar docentes através da biblioteca comunitária e da partilha de materiais úteis.",
  },
  {
    title: "Construir para a realidade portuguesa",
    description:
      "A linguagem, os exemplos e a forma de usar a Scooli são pensados para professores, escolas e currículo em Portugal.",
  },
];

const team = [
  {
    name: "Miguel Rodrigues",
    role: "Fundador e Engenheiro de Software & IA",
    image: "/team/miguel.jpg",
    location: "Santa Maria da Feira, Aveiro",
    alt: "Miguel Rodrigues, Fundador e Engenheiro de Software & IA da Scooli",
  },
  {
    name: "Pedro Rocha",
    role: "Co-Fundador e Engenheiro de Software & IA",
    image: "/team/pedro.jpeg",
    location: "Vila Nova de Gaia, Porto",
    alt: "Pedro Rocha, Co-Fundador e Engenheiro de Software & IA da Scooli",
    imageClassName: "scale-[1.28]",
  },
];

export default function AboutPage() {
  return (
    <PublicSiteShell>
      <section className="relative isolate pt-8 sm:pt-10">
        <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(circle_at_top_left,rgba(103,83,255,0.16),transparent_40%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.10),transparent_24%)]" />
        <Container className="pb-16 pt-10 sm:pb-20 lg:pb-24">
          <div className="space-y-6">
            <MarketingSectionBadge>Sobre</MarketingSectionBadge>
            <div className="max-w-4xl space-y-4">
              <h1 className="font-display text-4xl leading-tight text-[color:var(--scooli-ink)] sm:text-5xl lg:text-6xl">
                A Scooli existe para devolver tempo aos professores e aproximar
                uma comunidade que muitas vezes trabalha sozinha
              </h1>
              <p className="text-lg leading-8 text-[color:var(--scooli-muted)] sm:text-xl">
                Estamos a construir a Scooli para reduzir o trabalho repetitivo
                da preparação de aulas e ajudar docentes a chegar mais depressa
                a materiais úteis, sempre com controlo humano sobre o resultado
                final.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-24 lg:pb-28">
        <Container className="space-y-6">
          <section>
            <SurfacePanel>
              <div className="max-w-3xl space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--scooli-primary)]">
                  Missão
                </p>
                <h2 className="font-display text-3xl leading-tight text-[color:var(--scooli-ink)] sm:text-4xl">
                  Queremos aliviar o lado mais pesado do trabalho docente e
                  criar mais ligação entre professores
                </h2>
                <p className="text-sm leading-7 text-[color:var(--scooli-muted)] sm:text-[15px]">
                  A Scooli nasce da ideia de que a IA deve ser prática, útil e
                  respeitadora do papel do professor. Mas a missão não acaba na
                  automação: queremos também criar uma comunidade onde os
                  professores encontrem boas bases, partilhem materiais e sintam
                  menos isolamento no trabalho diário.
                </p>
              </div>

              <div className="mt-8 grid gap-4 lg:grid-cols-3">
                {missionPoints.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[24px] border border-slate-200 bg-slate-50 p-5"
                  >
                    <p className="text-lg font-semibold text-[color:var(--scooli-ink)]">
                      {item.title}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[color:var(--scooli-muted)]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </SurfacePanel>
          </section>

          <section>
            <SurfacePanel>
              <div className="max-w-3xl space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--scooli-primary)]">
                  Equipa
                </p>
                <h2 className="font-display text-3xl leading-tight text-[color:var(--scooli-ink)] sm:text-4xl">
                  Quem está a construir a Scooli
                </h2>
                <p className="text-sm leading-7 text-[color:var(--scooli-muted)] sm:text-[15px]">
                  A equipa atual junta produto, operação, software e IA na
                  construção da Scooli.
                </p>
              </div>

              <div className="mt-8 grid gap-5 lg:grid-cols-2">
                {team.map((member) => (
                  <div
                    key={member.name}
                    className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_24px_70px_-56px_rgba(19,35,58,0.28)]"
                  >
                    <div className="relative mx-auto aspect-[4/5] w-full max-w-[260px] overflow-hidden rounded-[24px] bg-[linear-gradient(135deg,rgba(103,83,255,0.14),rgba(59,130,246,0.10))] sm:max-w-[280px]">
                      <Image
                        src={member.image}
                        alt={member.alt}
                        fill
                        className={`object-cover ${member.imageClassName ?? ""}`}
                        sizes="(min-width: 1024px) 280px, (min-width: 640px) 260px, 100vw"
                      />
                    </div>
                    <div className="mt-5 space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--scooli-primary)]">
                        {member.role}
                      </p>
                      <p className="text-2xl font-semibold text-[color:var(--scooli-ink)]">
                        {member.name}
                      </p>
                      <p className="text-base text-[color:var(--scooli-muted)]">
                        {member.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </SurfacePanel>
          </section>
        </Container>
      </section>
    </PublicSiteShell>
  );
}
