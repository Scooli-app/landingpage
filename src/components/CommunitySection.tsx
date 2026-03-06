import { Container } from "@/components/Container";

export function CommunitySection() {
  return (
    <section id="biblioteca" className="bg-[color:var(--scooli-accent)]/45 py-20 md:py-28">
      <Container className="space-y-8">
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
            <ul className="mt-3 space-y-2 text-[color:var(--scooli-muted)]">
              <li>✔ encontrar materiais rapidamente</li>
              <li>✔ adaptar conteúdos existentes</li>
              <li>✔ partilhar recursos com outros professores</li>
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
