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

const faqs = [
  {
    question: "O que é a Biblioteca Comunitária?",
    answer:
      "A Biblioteca Comunitária é um espaço colaborativo onde professores partilham os seus recursos educativos gerados ou adaptados na Scooli. Pode explorar, reutilizar e adaptar materiais validados por outros docentes, poupando tempo valioso e aproveitando o conhecimento coletivo da comunidade.",
  },
  {
    question: "Como funciona a reutilização de recursos?",
    answer:
      "A comunidade é livre e todos os recursos partilhados nela são de acesso a todos os professores registados. A flexibilidade do editor permite que os reutilize e ajuste ao seu contexto escolar. Desta forma, as boas ideias circulam mais rápido pelas escolas inter-ajudando quem mais precisa.",
  },
  {
    question: "Como funciona o plano gratuito da Scooli?",
    answer:
      "Ao criar conta na Scooli tem acesso a 20 gerações por mês no plano gratuito. Quando atingir esse limite mensal, pode subscrever o plano Scooli Pro para geração ilimitada.",
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
    question:
      "Posso usar os materiais gerados pela Scooli diretamente com alunos?",
    answer:
      "Sim, pode usar os materiais gerados pela Scooli diretamente nas suas aulas. No entanto, recomendamos sempre rever e adaptar o conteúdo ao seu contexto específico e às necessidades da sua turma. A IA acelera a criação de recursos, mas o professor continua a ser essencial na validação e personalização do conteúdo educativo.",
  },
  {
    question:
      "Os recursos da Scooli estão alinhados com as aprendizagens essenciais portuguesas?",
    answer:
      "Sim, a Scooli foi desenvolvida especificamente para o contexto educativo português. Todos os recursos gerados são alinhados com as aprendizagens essenciais e metas curriculares do sistema de ensino português, desde o ensino básico ao secundário. A IA conhece o currículo português e adapta os conteúdos de acordo.",
  },
  {
    question:
      "Quando estarão disponíveis integrações com Google Classroom e OneDrive?",
    answer:
      "As integrações com Google Classroom, OneDrive e outras plataformas educativas estão planeadas para a próxima fase do desenvolvimento da Scooli. Crie a sua conta para receber notificações e novidades assim que estas funcionalidades estiverem disponíveis.",
  },
  {
    question: "A Scooli substitui o trabalho do professor?",
    answer:
      "Não. A Scooli ajuda a criar materiais mais rapidamente, mas o professor mantém sempre controlo sobre o conteúdo final.",
  },
  {
    question: "Os materiais podem ser editados?",
    answer:
      "Sim. Todos os conteúdos gerados podem ser editados diretamente na plataforma.",
  },
  {
    question: "Posso usar os meus próprios documentos?",
    answer:
      "Sim. Pode carregar documentos e adaptá-los ou modificá-los com ajuda da IA.",
  },
];

const faqSchema = getFAQPageSchema(faqs);

export function FaqSection() {
  return (
    <>
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
