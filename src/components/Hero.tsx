import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/seo";
import { BookOpenCheck, Sparkles, Timer, Users2 } from "lucide-react";
import Link from "next/link";

const bullets = [
  "Criar testes e fichas automaticamente",
  "Gerar planos de aula completos",
  "Adaptar materiais para diferentes níveis e alunos com NEE",
  "Encontrar recursos numa biblioteca criada por professores",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="absolute -top-32 left-[-10%] h-72 w-72 rounded-full bg-[color:var(--scooli-primary)]/20 blur-3xl" />
      <div className="absolute -right-12 top-10 h-56 w-56 rounded-full bg-cyan-300/30 blur-3xl" />

      <Container className="relative grid items-center gap-10 md:grid-cols-2">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--scooli-border)] bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--scooli-muted)]">
            <Sparkles className="h-3.5 w-3.5 text-[color:var(--scooli-primary)]" />
            IA + Biblioteca comunitária
          </div>

          <h1 className="mt-4 text-4xl font-bold leading-tight text-[color:var(--scooli-ink)] md:text-5xl">
            Crie testes, planos de aula e fichas em segundos com IA.
          </h1>
          <p className="mt-5 text-lg text-[color:var(--scooli-muted)]">
            A Scooli ajuda professores a poupar horas de trabalho ao gerar
            materiais pedagógicos alinhados com o currículo português.
          </p>

          <ul className="mt-6 space-y-3 text-[color:var(--scooli-ink)]">
            {bullets.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-xl bg-white/80 px-3 py-2">
                <BookOpenCheck className="mt-0.5 h-4.5 w-4.5 text-[color:var(--scooli-success)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href="#acesso" className="w-full sm:w-auto">
              <Button className="h-12 w-full rounded-full bg-[color:var(--scooli-primary)] px-7 text-white hover:bg-[color:var(--scooli-primary-strong)] sm:w-auto">
                Experimentar acesso antecipado
              </Button>
            </Link>
            <Link href={`${APP_URL}/sign-in`} className="text-sm font-semibold text-[color:var(--scooli-primary)]">
              Login
            </Link>
          </div>
          <p className="mt-3 text-sm text-[color:var(--scooli-muted)]">
            Estamos a convidar professores para testar a Scooli antes do
            lançamento oficial na Education Summit.
          </p>

          <div className="mt-5 flex flex-wrap gap-2 text-xs">
            <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[color:var(--scooli-muted)]"><Timer className="h-3.5 w-3.5" /> Menos horas a preparar</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[color:var(--scooli-muted)]"><Users2 className="h-3.5 w-3.5" /> Comunidade de professores</span>
          </div>
        </div>

        <div className="rounded-3xl border border-[color:var(--scooli-border)] bg-gradient-to-br from-white to-[color:var(--scooli-accent)] p-5 shadow-lg">
          <div className="rounded-2xl border border-[color:var(--scooli-border)] bg-white p-4">
            <p className="text-sm font-medium text-[color:var(--scooli-muted)]">Prompt</p>
            <p className="mt-2 rounded-lg border border-[color:var(--scooli-border)] bg-[color:var(--scooli-accent)]/40 p-3 text-sm">
              Criar teste de História para 8.º ano sobre Revolução Liberal.
            </p>
            <p className="mt-4 text-sm font-medium text-[color:var(--scooli-muted)]">Pré-visualização</p>
            <div className="mt-2 space-y-2 rounded-lg border border-[color:var(--scooli-border)] bg-white p-3 text-sm">
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
