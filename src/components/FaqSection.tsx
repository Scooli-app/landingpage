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
      "Ao criar conta na Scooli recebe 100 créditos gratuitos para começar. Pode usar estes créditos para gerar apresentações, planos de aula, testes e quizzes. Quando os créditos terminarem, pode ganhar mais ao contribuir recursos de qualidade para a biblioteca comunitária, ou subscrever o plano Scooli Pro para geração ilimitada.",
  },
  {
    question: "Quanto custa o Scooli Pro e quais são os benefícios?",
    answer:
      "O plano Scooli Pro custa €9,99 por mês ou €95,90 por ano (poupança de 20%). Inclui geração ilimitada de recursos educativos, acesso aos modelos de IA mais avançados, suporte prioritário e acesso antecipado a novas funcionalidades. A geração ilimitada está sujeita à nossa Política de Uso Justo para garantir qualidade de serviço para todos.",
  },
  {
    question: "Posso cancelar a subscrição do Scooli Pro a qualquer momento?",
    answer:
      "Sim, pode cancelar a sua subscrição a qualquer momento sem penalizações. Após cancelar, mantém acesso às funcionalidades Pro até ao fim do período de faturação atual. Os pagamentos são processados de forma segura via Stripe. Se tiver dúvidas, a nossa equipa está disponível para ajudar.",
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
    question: "Como posso ganhar mais créditos sem pagar?",
    answer:
      "Pode ganhar créditos adicionais ao partilhar recursos de qualidade na biblioteca comunitária da Scooli. Quando outros professores utilizam e avaliam positivamente os seus recursos, recebe créditos como recompensa. Quanto mais contribuir para a comunidade, mais créditos ganha. É uma forma de valorizar professores que ajudam outros professores.",
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
    </>
  );
}
