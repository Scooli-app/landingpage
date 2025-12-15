"use client";

import { Container } from "@/components/Container";
import { EmailContact } from "@/components/EmailContact";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getFAQPageSchema } from "@/lib/seo";
import { motion } from "framer-motion";
import Script from "next/script";

// FAQ data optimized for SEO and AEO
// Questions are written to match common search queries
const faqs = [
  {
    question: "Como funciona o pacote de boas-vindas da Scooli?",
    answer:
      "Ao criar conta na Scooli recebe 100 créditos não renováveis gratuitamente. Pode usar estes créditos para gerar apresentações, planos de aula, testes e quizzes. Quando os créditos acabam, pode ganhar mais contribuindo recursos de qualidade para a biblioteca comunitária, ou subscrever o plano Scooli Pro.",
  },
  {
    question: "Quanto custa o Scooli Pro e quais são os benefícios?",
    answer:
      "O plano Scooli Pro custa €7,99 por mês e oferece geração ilimitada de recursos educativos, acesso aos modelos de IA mais avançados e suporte prioritário. Não há limites na quantidade de apresentações, planos de aula ou testes que pode criar. Mantemos políticas de uso responsável para garantir o melhor desempenho.",
  },
  {
    question: "A Scooli está em conformidade com o RGPD?",
    answer:
      "Sim, a Scooli está em total conformidade com o RGPD (Regulamento Geral sobre a Proteção de Dados). Os dados são tratados com base legal clara e nunca vendemos dados pessoais a terceiros. Todos os dados são processados e armazenados de acordo com a legislação portuguesa e europeia. Consulte a nossa Política de Privacidade para informações detalhadas.",
  },
  {
    question: "Posso usar os materiais gerados pela Scooli diretamente com alunos?",
    answer:
      "Sim, pode usar os materiais gerados pela Scooli diretamente nas suas aulas. No entanto, recomendamos sempre rever e adaptar o conteúdo ao seu contexto específico e às necessidades da sua turma. A IA acelera a criação de recursos, mas o professor continua a ser essencial na validação e personalização do conteúdo educativo.",
  },
  {
    question: "Os recursos da Scooli estão alinhados com as aprendizagens essenciais portuguesas?",
    answer:
      "Sim, a Scooli foi desenvolvida especificamente para o contexto educativo português. Todos os recursos gerados são alinhados com as aprendizagens essenciais e metas curriculares do sistema de ensino português, desde o ensino básico ao secundário. A IA conhece o currículo português e adapta os conteúdos de acordo.",
  },
  {
    question: "Quando estarão disponíveis integrações com Google Classroom e OneDrive?",
    answer:
      "As integrações com Google Classroom, OneDrive e outras plataformas educativas estão planeadas para a próxima fase do desenvolvimento da Scooli. Inscreva-se na nossa lista de espera para ser notificado assim que estas funcionalidades estiverem disponíveis e receber acesso antecipado.",
  },
];

// Generate FAQ schema for AEO
const faqSchema = getFAQPageSchema(faqs);

export function FaqSection() {
  return (
    <>
      {/* FAQ Schema for AEO - helps AI search engines understand Q&A content */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
        strategy="afterInteractive"
      />

      <section
        id="faq"
        className="bg-[color:var(--scooli-accent)]/50 py-16 md:py-24"
        aria-labelledby="faq-heading"
        itemScope
        itemType="https://schema.org/FAQPage"
      >
        <Container className="grid gap-10 md:grid-cols-[1fr,1.1fr] md:items-start">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-[color:var(--scooli-muted)]">
              Perguntas Frequentes
            </p>
            <h2
              id="faq-heading"
              className="text-3xl font-semibold text-[color:var(--scooli-ink)] md:text-4xl"
            >
              Transparência para professores e escolas.
            </h2>
            <p className="text-[color:var(--scooli-muted)]">
              Se não encontrar a resposta que procura, fale connosco:
            </p>
            <EmailContact showIcon />
          </motion.div>

          <Accordion
            type="single"
            collapsible
            className="space-y-3"
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`item-${index}`}
                className="overflow-hidden rounded-2xl border border-[color:var(--scooli-border)] bg-white/90 shadow-sm"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <AccordionTrigger
                  className="px-4 py-3 text-left text-[color:var(--scooli-ink)] hover:text-[color:var(--scooli-primary)]"
                  itemProp="name"
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent
                  className="px-4 pb-4 text-[color:var(--scooli-muted)]"
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <span itemProp="text">{faq.answer}</span>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </section>
    </>
  );
}
