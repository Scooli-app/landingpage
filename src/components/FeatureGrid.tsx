import { Container } from "@/components/Container";

const features = [
  {
    title: "Criação automática de testes e fichas",
    text: "Gere exercícios, perguntas e fichas completas em segundos.",
    points: ["múltipla escolha", "resposta curta", "desenvolvimento"],
  },
  {
    title: "Planos de aula completos",
    text: "Crie planificações com:",
    points: ["objetivos", "atividades", "estratégias pedagógicas", "critérios de avaliação"],
  },
  {
    title: "Adaptação de conteúdos",
    text: "Adapte rapidamente materiais para:",
    points: [
      "diferentes níveis de aprendizagem",
      "alunos com necessidades educativas especiais",
      "simplificação ou aprofundamento de conteúdos",
    ],
  },
  {
    title: "Editor completo",
    text: "Todos os materiais podem ser editados diretamente na plataforma antes de exportar.",
    points: [],
  },
];

export function FeatureGrid() {
  return (
    <section id="funcionalidades" className="py-16 md:py-24">
      <Container>
        <h2 className="text-center text-3xl font-semibold text-[color:var(--scooli-ink)] md:text-4xl">
          Funcionalidades principais
        </h2>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-2xl border border-[color:var(--scooli-border)] bg-white p-6">
              <h3 className="text-xl font-semibold text-[color:var(--scooli-ink)]">{feature.title}</h3>
              <p className="mt-2 text-[color:var(--scooli-muted)]">{feature.text}</p>
              {feature.points.length > 0 && (
                <ul className="mt-4 space-y-2 text-sm text-[color:var(--scooli-ink)]">
                  {feature.points.map((point) => (
                    <li key={point}>• {point}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
