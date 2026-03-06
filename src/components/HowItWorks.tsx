import { Container } from "@/components/Container";

const steps = [
  {
    title: "Escolha o tipo de material",
    text: "Teste, ficha de trabalho, plano de aula ou apresentação.",
  },
  {
    title: "Descreva o que precisa",
    text: "Indique disciplina, tema e nível de ensino.",
  },
  {
    title: "A IA gera o material",
    text: "Edite, adapte e exporte.",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-16 md:py-24">
      <Container>
        <h2 className="text-center text-3xl font-semibold text-[color:var(--scooli-ink)] md:text-4xl">
          Como funciona
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-2xl border border-[color:var(--scooli-border)] bg-white p-6"
            >
              <p className="text-sm font-semibold text-[color:var(--scooli-primary)]">
                Passo {index + 1}
              </p>
              <h3 className="mt-3 text-xl font-semibold text-[color:var(--scooli-ink)]">
                {step.title}
              </h3>
              <p className="mt-2 text-[color:var(--scooli-muted)]">{step.text}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
