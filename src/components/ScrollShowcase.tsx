import { Container } from "@/components/Container";
import { BookImage, FilePenLine, ListChecks } from "lucide-react";

const shots = [
  {
    title: "Geração de teste",
    description: "Criação de perguntas com base em disciplina, tema e ano.",
    icon: ListChecks,
    tone: "bg-violet-100 text-violet-700",
  },
  {
    title: "Editor de documento",
    description: "Edição simples para ajustar linguagem, estrutura e nível.",
    icon: FilePenLine,
    tone: "bg-cyan-100 text-cyan-700",
  },
  {
    title: "Biblioteca comunitária",
    description: "Pesquisa e reutilização de materiais partilhados por professores.",
    icon: BookImage,
    tone: "bg-emerald-100 text-emerald-700",
  },
];

export function ScrollShowcase() {
  return (
    <section id="produto" className="py-16 md:py-24">
      <Container>
        <h2 className="text-center text-3xl font-semibold text-[color:var(--scooli-ink)] md:text-4xl">
          Produto em ação
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {shots.map((shot) => {
            const Icon = shot.icon;
            return (
              <article key={shot.title} className="rounded-2xl border border-[color:var(--scooli-border)] bg-white p-4 shadow-sm">
                <div className={`flex h-44 flex-col items-center justify-center gap-2 rounded-xl ${shot.tone}`}>
                  <Icon className="h-8 w-8" />
                  <span className="text-xs font-semibold uppercase tracking-wide">Imagem do produto</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{shot.title}</h3>
                <p className="text-sm text-[color:var(--scooli-muted)]">{shot.description}</p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
