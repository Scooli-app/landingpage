import { Container } from "@/components/Container";
import { ClipboardCheck, FileText, SlidersHorizontal, SquarePen } from "lucide-react";

const features = [
  {
    title: "Criação automática de testes e fichas",
    text: "Gere exercícios, perguntas e fichas completas em segundos.",
    points: ["múltipla escolha", "resposta curta", "desenvolvimento"],
    icon: ClipboardCheck,
    color: "from-violet-100 to-violet-50",
  },
  {
    title: "Planos de aula completos",
    text: "Crie planificações com:",
    points: ["objetivos", "atividades", "estratégias pedagógicas", "critérios de avaliação"],
    icon: FileText,
    color: "from-cyan-100 to-cyan-50",
  },
  {
    title: "Adaptação de conteúdos",
    text: "Adapte rapidamente materiais para:",
    points: [
      "diferentes níveis de aprendizagem",
      "alunos com necessidades educativas especiais",
      "simplificação ou aprofundamento de conteúdos",
    ],
    icon: SlidersHorizontal,
    color: "from-emerald-100 to-emerald-50",
  },
  {
    title: "Editor completo",
    text: "Todos os materiais podem ser editados diretamente na plataforma antes de exportar.",
    points: [],
    icon: SquarePen,
    color: "from-amber-100 to-amber-50",
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
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article key={feature.title} className={`rounded-2xl border border-[color:var(--scooli-border)] bg-gradient-to-br ${feature.color} p-6`}>
                <div className="inline-flex rounded-xl bg-white p-2 shadow-sm">
                  <Icon className="h-5 w-5 text-[color:var(--scooli-primary)]" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-[color:var(--scooli-ink)]">{feature.title}</h3>
                <p className="mt-2 text-[color:var(--scooli-muted)]">{feature.text}</p>
                {feature.points.length > 0 && (
                  <ul className="mt-4 space-y-2 text-sm text-[color:var(--scooli-ink)]">
                    {feature.points.map((point) => (
                      <li key={point}>• {point}</li>
                    ))}
                  </ul>
                )}
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
