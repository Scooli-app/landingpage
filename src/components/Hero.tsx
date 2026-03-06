import { Container } from "@/components/Container";
import Link from "next/link";

const bullets = [
  "Criar testes e fichas automaticamente",
  "Gerar planos de aula completos",
  "Adaptar materiais para diferentes níveis e alunos com NEE",
  "Encontrar recursos numa biblioteca criada por professores",
];

export function Hero() {
  return (
    <section className="py-16 md:py-24">
      <Container className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <h1 className="text-4xl font-bold leading-tight text-[color:var(--scooli-ink)] md:text-5xl">
            Crie testes, planos de aula e fichas em segundos com IA.
          </h1>
          <p className="mt-5 text-lg text-[color:var(--scooli-muted)]">
            A Scooli ajuda professores a poupar horas de trabalho ao gerar
            materiais pedagógicos alinhados com o currículo português.
          </p>

          <ul className="mt-6 space-y-3 text-[color:var(--scooli-ink)]">
            {bullets.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 text-[color:var(--scooli-success)]">✔</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Link
              href="#acesso"
              className="inline-block rounded-full bg-[color:var(--scooli-primary)] px-8 py-4 text-base font-semibold text-white hover:bg-[color:var(--scooli-primary-strong)]"
            >
              Experimentar acesso antecipado
            </Link>
            <p className="mt-3 text-sm text-[color:var(--scooli-muted)]">
              Estamos a convidar professores para testar a Scooli antes do
              lançamento oficial na Education Summit.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-[color:var(--scooli-border)] bg-white p-5 shadow-sm">
          <div className="rounded-2xl border border-[color:var(--scooli-border)] bg-[color:var(--scooli-accent)] p-4">
            <p className="text-sm font-medium text-[color:var(--scooli-muted)]">Prompt</p>
            <p className="mt-2 rounded-lg bg-white p-3 text-sm">
              Criar teste de História para 8.º ano sobre Revolução Liberal.
            </p>
            <p className="mt-4 text-sm font-medium text-[color:var(--scooli-muted)]">Pré-visualização</p>
            <div className="mt-2 space-y-2 rounded-lg bg-white p-3 text-sm">
              <p>1) Escolha múltipla</p>
              <p>2) Resposta curta</p>
              <p>3) Desenvolvimento</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
