import { Container } from "@/components/Container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "A Scooli substitui o trabalho do professor?",
    answer:
      "Não. A Scooli ajuda a criar materiais mais rapidamente, mas o professor mantém sempre controlo sobre o conteúdo final.",
  },
  {
    question: "Os materiais podem ser editados?",
    answer:
      "Sim. Todos os conteúdos gerados podem ser editados diretamente no editor da plataforma.",
  },
  {
    question: "Posso usar os meus próprios documentos?",
    answer:
      "Sim. Pode carregar documentos e adaptá-los ou modificá-los com ajuda da IA.",
  },
  {
    question: "O que é a biblioteca comunitária?",
    answer:
      "É um espaço para encontrar, adaptar e partilhar recursos pedagógicos entre professores.",
  },
  {
    question: "Quando é o lançamento oficial?",
    answer:
      "O lançamento oficial será apresentado na Education Summit. Até lá, estamos a abrir acesso antecipado a um grupo limitado de professores.",
  },
  {
    question: "A Scooli está em conformidade com o RGPD?",
    answer:
      "Sim. O tratamento de dados segue as regras do RGPD e as boas práticas de segurança.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="py-16 md:py-24">
      <Container className="max-w-4xl">
        <h2 className="text-center text-3xl font-semibold text-[color:var(--scooli-ink)] md:text-4xl">
          FAQ
        </h2>
        <Accordion type="single" collapsible className="mt-10 space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              value={`faq-${index}`}
              className="rounded-xl border border-[color:var(--scooli-border)] px-5"
            >
              <AccordionTrigger className="text-left font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[color:var(--scooli-muted)]">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}
