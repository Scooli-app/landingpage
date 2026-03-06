import { Container } from "@/components/Container";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export function FinalCta() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="rounded-3xl border border-[color:var(--scooli-border)] bg-gradient-to-br from-[color:var(--scooli-accent)] via-white to-violet-100 p-8 text-center md:p-12">
          <h2 className="text-3xl font-semibold text-[color:var(--scooli-ink)] md:text-4xl">
            Comece a poupar tempo na criação de materiais.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[color:var(--scooli-muted)]">
            Junte-se aos primeiros professores que estão a testar a Scooli.
          </p>
          <Link
            href="#acesso"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[color:var(--scooli-primary)] px-8 py-4 font-semibold text-white hover:bg-[color:var(--scooli-primary-strong)]"
          >
            <Sparkles className="h-4 w-4" />
            Experimentar acesso antecipado
          </Link>
        </div>
      </Container>
    </section>
  );
}
