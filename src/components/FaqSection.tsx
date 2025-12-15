"use client";

import { Container } from "@/components/Container";
import { EmailContact } from "@/components/EmailContact";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "Como funciona o pacote de boas-vindas?",
    answer:
      "Ao criar conta recebe 100 créditos não renováveis. Pode gerar recursos até esgotar. Contribuir para a biblioteca comunitária permite ganhar mais créditos.",
  },
  {
    question: "O Scooli Pro tem limites?",
    answer:
      "O plano Pro (€7,99/mês) oferece geração ilimitada, modelos mais avançados e suporte prioritário. Mantemos políticas de uso responsável para garantir desempenho.",
  },
  {
    question: "A Scooli cumpre o RGPD?",
    answer:
      "Sim. Dados são tratados com base legal e em conformidade com o RGPD. Não vendemos dados. Consulte a Política de Privacidade para saber mais.",
  },
  {
    question: "Posso usar materiais gerados diretamente com alunos?",
    answer:
      "Sim, mas recomendamos rever e adaptar ao seu contexto e turma. A IA acelera, o professor valida.",
  },
  {
    question: "Quando chegam integrações (Google Classroom, OneDrive)?",
    answer:
      "Estão na fase seguinte do roadmap. Inscreva-se para receber acesso antecipado assim que estiver disponível.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="bg-[color:var(--scooli-accent)]/50 py-16 md:py-24">
      <Container className="grid gap-10 md:grid-cols-[1fr,1.1fr] md:items-start">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4 }}
          className="space-y-4"
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-[color:var(--scooli-muted)]">
            Dúvidas frequentes
          </p>
          <h2 className="text-3xl font-semibold text-[color:var(--scooli-ink)] md:text-4xl">
            Transparência para professores e escolas.
          </h2>
          <p className="text-[color:var(--scooli-muted)]">
            Se não encontrar a resposta, fale connosco:
          </p>
          <EmailContact showIcon />
        </motion.div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              value={`item-${index}`}
              className="overflow-hidden rounded-2xl border border-[color:var(--scooli-border)] bg-white/90 shadow-sm"
            >
              <AccordionTrigger className="px-4 py-3 text-left text-[color:var(--scooli-ink)] hover:text-[color:var(--scooli-primary)]">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 text-[color:var(--scooli-muted)]">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}

