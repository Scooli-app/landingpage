import { Container } from "@/components/Container";
import { LibraryBig, SearchCheck, Share2, WandSparkles } from "lucide-react";

export function CommunitySection() {
  return (
    <section id="biblioteca" className="relative overflow-hidden bg-[color:var(--scooli-accent)]/45 py-20 md:py-28">
      <div className="absolute -left-16 bottom-10 h-52 w-52 rounded-full bg-violet-200/50 blur-3xl" />
      <Container className="relative space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--scooli-border)] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--scooli-muted)]">
          <LibraryBig className="h-4 w-4 text-[color:var(--scooli-primary)]" />
          Diferenciador Scooli
        </div>

        <h2 className="text-3xl font-semibold text-[color:var(--scooli-ink)] md:text-5xl">
          Uma biblioteca de recursos criada por professores.
        </h2>
        <p className="max-w-4xl text-lg text-[color:var(--scooli-muted)]">
          Nem sempre é necessário criar tudo do zero. Na Scooli pode encontrar
          materiais pedagógicos partilhados por professores da comunidade.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-[color:var(--scooli-border)] bg-white p-6">
            <p className="font-semibold">Disponível na biblioteca</p>
            <ul className="mt-3 space-y-2 text-[color:var(--scooli-muted)]">
              <li>• fichas de trabalho</li>
              <li>• testes</li>
              <li>• planos de aula</li>
              <li>• apresentações</li>
              <li>• recursos pedagógicos</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-[color:var(--scooli-border)] bg-white p-6">
            <p className="font-semibold">Benefícios</p>
            <ul className="mt-3 space-y-3 text-[color:var(--scooli-muted)]">
              <li className="flex items-center gap-2"><SearchCheck className="h-4 w-4 text-[color:var(--scooli-primary)]" /> encontrar materiais rapidamente</li>
              <li className="flex items-center gap-2"><WandSparkles className="h-4 w-4 text-[color:var(--scooli-primary)]" /> adaptar conteúdos existentes</li>
              <li className="flex items-center gap-2"><Share2 className="h-4 w-4 text-[color:var(--scooli-primary)]" /> partilhar recursos com outros professores</li>
            </ul>
          </div>
        </div>

        <p className="text-2xl font-semibold text-[color:var(--scooli-ink)] md:text-3xl">
          Uma comunidade onde professores ajudam professores.
        </p>
      </Container>
    </section>
  );
}
