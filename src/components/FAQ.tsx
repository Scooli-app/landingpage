"use client";
import { EmailContact } from "@/components/EmailContact";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    question: "O que é a Scooli?",
    answer:
      "A Scooli é uma plataforma educativa inovadora que conecta professores portugueses com ferramentas de inteligência artificial para todos os níveis de ensino. Permite gerar automaticamente apresentações, planificações, testes e quizzes personalizados, entre muitas outras coisas.",
    category: "Geral",
  },
  {
    question: "Quando estará disponível a Scooli?",
    answer:
      "A Scooli está em desenvolvimento ativo e será lançada brevemente. Registe o seu email para ser notificado quando a plataforma estiver disponível e receber acesso prioritário.",
    category: "Disponibilidade",
  },
  {
    question: "Como funciona a geração automática de conteúdo?",
    answer:
      "A Scooli utiliza inteligência artificial avançada para gerar conteúdo educativo personalizado. Os professores introduzem os parâmetros desejados (matéria, nível, objetivos) e a plataforma cria automaticamente apresentações, planificações, testes e quizzes alinhados com as aprendizagens essenciais e as melhores práticas educativas.",
    category: "Funcionalidades",
  },
  {
    question: "A Scooli é gratuita?",
    answer:
      "A Scooli oferece um pacote de boas-vindas com 100 créditos gratuitos para novos utilizadores. Os utilizadores ativos podem ganhar mais créditos contribuindo para a biblioteca comunitária. Existe também um plano Scooli Pro (€7,99/mês) com funcionalidades ilimitadas e acesso aos modelos de IA mais avançados.",
    category: "Preços",
  },

  {
    question: "A Scooli é compatível com as aprendizagens essenciais?",
    answer:
      "Sim, a Scooli foi desenvolvida especificamente para o contexto educativo português, com conhecimento profundo das aprendizagens essenciais, metas de aprendizagem e das melhores práticas educativas em Portugal. Todos os conteúdos gerados estão alinhados com as aprendizagens essenciais.",
    category: "Aprendizagens essenciais",
  },
  {
    question: "Que tipos de conteúdo posso gerar?",
    answer:
      "A Scooli permite gerar apresentações para aulas, planos de aula detalhados, testes e quizzes, fichas de trabalho, atividades de grupo, estratégias de ensino diferentes, sugestões de avaliação, entre muitas outras coisas. Todos os conteúdos são personalizáveis e adaptáveis às suas necessidades específicas.",
    category: "Funcionalidades",
  },
  {
    question: "Posso fazer upload dos meus próprios documentos?",
    answer:
      "Sim, a Scooli permite fazer upload dos seus próprios documentos (PDF, Word, PowerPoint) para serem melhorados, transformados pela IA, ou usados como base para a geração de novos conteúdos. A plataforma pode adaptar, expandir ou reformular o conteúdo existente mantendo o seu estilo e objetivos educativos.",
    category: "Funcionalidades",
  },
  {
    question: "Como funciona o sistema de créditos?",
    answer:
      "Cada geração de conteúdo consome créditos. Novos utilizadores recebem 100 créditos gratuitos. Utilizadores ativos podem ganhar mais créditos contribuindo recursos de qualidade para a biblioteca comunitária. O plano Scooli Pro oferece geração ilimitada e acesso aos modelos de IA mais avançados.",
    category: "Preços",
  },
  {
    question: "A Scooli é segura e protege os meus dados?",
    answer:
      "Sim, a Scooli está em total conformidade com o RGPD e implementa as mais rigorosas medidas de segurança. Os seus dados pessoais e conteúdos são protegidos com encriptação de ponta a ponta. Nunca partilhamos dados pessoais com terceiros sem o seu consentimento explícito. A Scooli é uma empresa portuguesa e está em conformidade com as leis portuguesas e europeias.",
    category: "Segurança",
  },
  {
    question: "Posso partilhar os conteúdos gerados com outros professores?",
    answer:
      "Sim, a Scooli inclui uma biblioteca comunitária onde pode partilhar os seus melhores recursos com outros professores. Esta funcionalidade permite colaboração, partilha de boas práticas e ganhar créditos adicionais através das suas contribuições. A biblioteca comunitária é um recurso aberto e público, onde todos os utilizadores podem contribuir com recursos de qualidade e receber créditos por isso.",
    category: "Comunidade",
  },
];

export function FAQ() {
  return (
    <section className="mb-20 md:mb-32" aria-labelledby="faq-heading">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h2
            id="faq-heading"
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
          >
            Perguntas Frequentes
          </h2>
          <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Encontre respostas às perguntas mais comuns sobre a Scooli e como
            pode transformar a sua experiência de ensino.
          </p>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
          <CardContent className="p-8">
            <Accordion type="single" collapsible className="w-full space-y-2">
              {faqData.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-slate-200 rounded-lg px-4 data-[state=open]:bg-slate-50/50 transition-colors duration-200"
                >
                  <AccordionTrigger className="text-left text-lg font-semibold text-slate-900 hover:text-slate-700 px-0 py-6 [&[data-state=open]]:text-blue-600">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed px-0 pb-6">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <div className="text-center mt-12">
          <p className="text-slate-600 mb-4">
            Não encontrou a resposta que procura?
          </p>
          <p className="text-sm text-slate-500 mt-6"> Contacte-nos</p>
          <EmailContact />
        </div>
      </div>
    </section>
  );
}
