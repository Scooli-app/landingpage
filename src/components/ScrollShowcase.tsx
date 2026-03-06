import { Container } from "@/components/Container";

const shots = [
  {
    title: "Geração de teste",
    description: "Criação de perguntas com base em disciplina, tema e ano.",
  },
  {
    title: "Editor de documento",
    description: "Edição simples para ajustar linguagem, estrutura e nível.",
  },
  {
    title: "Biblioteca comunitária",
    description: "Pesquisa e reutilização de materiais partilhados por professores.",
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
          {shots.map((shot, index) => (
            <article key={shot.title} className="rounded-2xl border border-[color:var(--scooli-border)] bg-white p-4">
              <div className="flex h-44 items-center justify-center rounded-xl bg-[color:var(--scooli-accent)] text-sm text-[color:var(--scooli-muted)]">
                Screenshot {index + 1}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{shot.title}</h3>
              <p className="text-sm text-[color:var(--scooli-muted)]">{shot.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
