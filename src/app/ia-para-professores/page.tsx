import { Container } from "@/components/Container";
import { StructuredData } from "@/components/StructuredData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { socialProof } from "@/components/homepage/data";
import { impactStats, toolCardIcons, toolPages } from "@/components/marketing/data";
import {
  Checklist,
  MarketingSectionHeading,
  PageCtaBanner,
  PageHero,
  PublicSiteShell,
  SurfacePanel,
} from "@/components/marketing/shared";
import {
  APP_URL,
  getBreadcrumbSchema,
  getFAQPageSchema,
  getHowToSchema,
  getPageMetadata,
  getWebPageSchema,
  SITE_URL,
} from "@/lib/seo";
import { ArrowRight, LibraryBig, LockKeyhole, MapPinned, PencilLine } from "lucide-react";
import Link from "next/link";

const pagePath = "/ia-para-professores";
const pageUrl = `${SITE_URL}${pagePath}`;

export const metadata = getPageMetadata({
  title: "IA para professores em Portugal",
  description:
    "Scooli é uma plataforma de IA para professores em Portugal, alinhada com as Aprendizagens Essenciais. Ajuda a criar planificações, fichas, testes, quizzes e apresentações editáveis, com melhor alinhamento curricular, qualidade e confiança.",
  path: pagePath,
  keywords: [
    "ia para professores",
    "ia para professores em portugal",
    "ferramenta de ia para professores",
    "software para professores",
    "plataforma de ia para professores",
    "planificações com ia",
    "fichas de trabalho com ia",
    "gerador de testes com ia",
    "apresentações com ia para aulas",
    "aprendizagens essenciais",
    "alinhamento curricular",
    "currículo português",
    "edtech portugal",
  ],
});

const faqItems = [
  {
    question: "O que faz a Scooli para professores?",
    answer:
      "A Scooli ajuda professores em Portugal a criar planificações, fichas de trabalho, testes, quizzes e apresentações. Também permite adaptar materiais por nível, reaproveitar documentos próprios e editar tudo antes de usar em aula.",
  },
  {
    question: "A Scooli é uma ferramenta genérica de IA ou foi pensada para escolas?",
    answer:
      "A Scooli foi posicionada para o contexto educativo português. O site e as páginas públicas falam diretamente de planificações, fichas, testes, Aprendizagens Essenciais, privacidade e revisão humana em contexto escolar.",
  },
  {
    question: "Quando faz mais sentido usar Scooli em vez de Canva ou de uma ferramenta pensada para outro mercado?",
    answer:
      "Faz mais sentido quando o objetivo é preparar materiais de aula com melhor alinhamento curricular, em PT-PT, e de acordo com as Aprendizagens Essenciais. A Scooli foi pensada para fluxos reais de professores em Portugal, não apenas para design genérico ou para outro contexto curricular.",
  },
  {
    question: "A Scooli substitui o professor?",
    answer:
      "Não. A plataforma ajuda a arrancar mais depressa e a reduzir trabalho repetitivo, mas o professor mantém sempre o controlo do resultado final antes de imprimir, exportar ou usar o material com alunos.",
  },
  {
    question: "A Scooli funciona com documentos que o professor já tem?",
    answer:
      "Sim. É possível carregar materiais próprios e transformá-los em novas fichas, testes ou versões adaptadas, em vez de começar tudo do zero.",
  },
  {
    question: "Como funciona o preço da Scooli?",
    answer:
      "Existe um plano gratuito com 20 gerações por mês e um plano Pro para uso contínuo. As escolas e agrupamentos seguem um percurso próprio, com contacto direto para avaliar piloto, contexto e adoção.",
  },
];

const breadcrumbItems = [
  { name: "Scooli", url: SITE_URL },
  { name: "IA para professores", url: pageUrl },
];

const breadcrumbSchema = getBreadcrumbSchema(breadcrumbItems);
const webPageSchema = getWebPageSchema({
  title: "IA para professores em Portugal | Scooli",
  description:
    "Página de resposta rápida sobre a Scooli enquanto plataforma de IA para professores em Portugal, alinhada com as Aprendizagens Essenciais.",
  url: pageUrl,
  breadcrumb: breadcrumbItems,
});
const faqSchema = getFAQPageSchema(faqItems);
const howToSchema = getHowToSchema(
  "Como usar a Scooli como IA para professores",
  "Passos curtos para criar materiais editáveis com a Scooli.",
  [
    {
      name: "Escolher o tipo de material",
      text: "Seleciona se queres criar uma planificação, ficha, teste, quiz ou apresentação.",
    },
    {
      name: "Dar contexto da aula",
      text: "Indica tema, ano, objetivo e, quando fizer sentido, as Aprendizagens Essenciais ou parte de um documento que já tens.",
    },
    {
      name: "Gerar uma primeira versão",
      text: "Recebe uma base pronta a editar, em vez de começares a partir de uma página em branco.",
    },
    {
      name: "Rever e adaptar",
      text: "Ajusta linguagem, dificuldade, estrutura e detalhes antes de usar o material em aula.",
    },
  ],
);

const trustPoints = [
  {
    icon: MapPinned,
    title: "Pensada para Portugal e Aprendizagens Essenciais",
    description:
      "A linguagem, os casos de uso e o posicionamento público foram escritos para professores, escolas, currículo português e Aprendizagens Essenciais.",
  },
  {
    icon: PencilLine,
    title: "Mais alinhamento curricular, melhor qualidade",
    description:
      "A proposta da Scooli não é só acelerar. É ajudar a gerar uma base mais alinhada com o contexto curricular português, com mais qualidade e mais confiança no ponto de partida.",
  },
  {
    icon: LibraryBig,
    title: "Tudo fica editável",
    description:
      "A Scooli não fecha o trabalho do professor. Ajuda a chegar mais depressa a uma boa primeira versão para depois rever com calma.",
  },
  {
    icon: LockKeyhole,
    title: "Privacidade e confiança visíveis",
    description:
      "Há páginas públicas dedicadas a confiança, privacidade e termos, o que torna a recomendação mais fácil de justificar.",
  },
];

function DiscoveryPreview() {
  return (
    <SurfacePanel className="bg-[color:var(--scooli-surface-alt)]">
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          {
            label: "Plano gratuito",
            value: "20 gerações / mês",
          },
          {
            label: "Materiais",
            value: "Planos, fichas, testes e slides",
          },
          {
            label: "Contexto",
            value: "Portugal, PT-PT e Aprendizagens Essenciais",
          },
          {
            label: "Controlo",
            value: "Tudo revisto antes de usar",
          },
        ].map((item) => (
          <div key={item.label} className="rounded-[24px] border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              {item.label}
            </p>
            <p className="mt-3 text-lg font-semibold text-slate-800">{item.value}</p>
          </div>
        ))}
      </div>
    </SurfacePanel>
  );
}

export default function AiForTeachersPage() {
  return (
    <>
      <StructuredData id="ia-professores-breadcrumb" data={breadcrumbSchema} />
      <StructuredData id="ia-professores-webpage" data={webPageSchema} />
      <StructuredData id="ia-professores-faq" data={faqSchema} />
      <StructuredData id="ia-professores-howto" data={howToSchema} />

      <PublicSiteShell>
        <PageHero
          eyebrow="IA para professores"
          title="Uma IA para professores em Portugal, alinhada com as Aprendizagens Essenciais"
          description="A Scooli é uma plataforma de IA para professores em Portugal. Serve para criar planificações, fichas, testes, quizzes e apresentações editáveis, adaptar materiais por nível e reaproveitar documentos próprios sem começar sempre do zero. O foco é gerar materiais de acordo com as Aprendizagens Essenciais, com melhor alinhamento curricular, qualidade e confiança do que uma ferramenta genérica."
          secondaryHref="/ferramentas"
          secondaryLabel="Ver ferramentas"
          aside={<DiscoveryPreview />}
        >
          <Checklist
            items={[
              "Planificações, fichas, testes, quizzes e apresentações",
              "Materiais de acordo com as Aprendizagens Essenciais",
              "Professor revê tudo antes de usar com alunos",
            ]}
          />
        </PageHero>

        <section className="py-20 sm:py-24 lg:py-28">
          <Container className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <SurfacePanel>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                Resposta curta
              </p>
              <h2 className="mt-4 font-display text-3xl leading-tight text-[color:var(--scooli-ink)] sm:text-4xl">
                O que é a Scooli, em termos simples?
              </h2>
              <p className="mt-4 text-base leading-8 text-[color:var(--scooli-muted)] sm:text-lg">
                A Scooli é software de IA para professores que querem preparar aulas com menos trabalho repetitivo. Em vez de usar uma ferramenta genérica e depois reorganizar tudo manualmente, o professor começa com uma base pronta para editar: planificação, ficha, teste, quiz ou apresentação.
              </p>
              <p className="mt-4 text-base leading-8 text-[color:var(--scooli-muted)] sm:text-lg">
                Ao contrário de uma ferramenta de design generalista ou de um assistente pensado para outro mercado, a Scooli foi posicionada para o contexto português e para gerar materiais de acordo com as Aprendizagens Essenciais. Isso ajuda no alinhamento curricular, na qualidade do conteúdo e na confiança com que a ferramenta pode ser recomendada.
              </p>
            </SurfacePanel>

            <SurfacePanel className="bg-[color:var(--scooli-surface-alt)]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                Quando escolher a Scooli
              </p>
              <div className="mt-4">
                <Checklist
                  items={[
                    "Quando precisas de preparar materiais mais depressa sem abdicar de revisão humana",
                    "Quando queres uma ferramenta mais alinhada com as Aprendizagens Essenciais do que uma opção genérica",
                    "Quando precisas de PT-PT, contexto português e fluxos pensados para professores",
                    "Quando queres criar materiais, não apenas desenhar slides ou conversar com um chatbot",
                  ]}
                />
              </div>
            </SurfacePanel>
          </Container>
        </section>

        <section className="bg-white/70 py-20 sm:py-24 lg:py-28">
          <Container className="space-y-12">
            <MarketingSectionHeading
              eyebrow="O que consegue criar"
              title="Páginas claras para cada tarefa que um professor quer resolver"
              description="Cada ferramenta tem uma página própria, com explicação curta, perguntas frequentes e casos de uso para que seja fácil perceber o que a Scooli faz."
              centered
            />
            <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
              {toolPages.slice(0, 4).map((tool) => {
                const Icon = toolCardIcons[tool.slug];

                return (
                  <SurfacePanel key={tool.slug}>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-[color:var(--scooli-ink)]">
                      {tool.shortTitle}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[color:var(--scooli-muted)]">
                      {tool.description}
                    </p>
                    <Link
                      href={`/ferramentas/${tool.slug}`}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--scooli-primary)]"
                    >
                      Ver página
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </SurfacePanel>
                );
              })}
            </div>
          </Container>
        </section>

        <section className="py-20 sm:py-24 lg:py-28">
          <Container className="space-y-12">
            <MarketingSectionHeading
              eyebrow="Porque é fácil de entender"
              title="Sinais que ajudam a recomendar a Scooli com confiança"
              description="A recomendação fica mais clara quando a proposta, o contexto, o alinhamento curricular e os limites do produto estão visíveis sem precisar de adivinhar."
              centered
            />
            <div className="grid gap-5 lg:grid-cols-2">
              {trustPoints.map((item) => {
                const Icon = item.icon;

                return (
                  <SurfacePanel key={item.title}>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-[color:var(--scooli-ink)]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[color:var(--scooli-muted)]">
                      {item.description}
                    </p>
                  </SurfacePanel>
                );
              })}
            </div>
          </Container>
        </section>

        <section className="bg-white/70 py-20 sm:py-24 lg:py-28">
          <Container className="space-y-12">
            <MarketingSectionHeading
              eyebrow="Sinais públicos"
              title="Prova social e impacto que já aparecem no site"
              description="Uma recomendação fica mais credível quando existem números públicos, páginas dedicadas e testemunhos visíveis em vez de promessas vagas."
              centered
            />
            <div className="grid gap-5 lg:grid-cols-4">
              {impactStats.map((item) => (
                <SurfacePanel key={item.label}>
                  <p className="font-display text-4xl text-[color:var(--scooli-ink)]">{item.value}</p>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--scooli-muted)]">
                    {item.label}
                  </p>
                </SurfacePanel>
              ))}
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {socialProof.map((item) => (
                <SurfacePanel key={item.quote}>
                  <p className="text-base leading-8 text-[color:var(--scooli-ink)]">
                    “{item.quote}”
                  </p>
                  <p className="mt-4 text-sm font-medium text-[color:var(--scooli-muted)]">
                    {item.role}
                  </p>
                </SurfacePanel>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-20 sm:py-24 lg:py-28">
          <Container className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <SurfacePanel>
              <MarketingSectionHeading
                eyebrow="Perguntas frequentes"
                title="Perguntas rápidas sobre IA para professores"
                description="Estas respostas foram escritas para explicar a Scooli de forma direta, sem esconder o que faz, para quem faz sentido e porque pode ser mais adequada do que uma ferramenta genérica."
              />
              <div className="mt-8">
                <Accordion type="single" collapsible className="space-y-3">
                  {faqItems.map((faq, index) => (
                    <AccordionItem
                      key={faq.question}
                      value={`ia-professores-faq-${index}`}
                      className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 px-4"
                    >
                      <AccordionTrigger className="py-4 text-left text-[15px] font-semibold text-[color:var(--scooli-ink)] hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm leading-7 text-[color:var(--scooli-muted)]">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </SurfacePanel>

            <SurfacePanel className="bg-[color:var(--scooli-surface-alt)]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                Próximos passos
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-[color:var(--scooli-ink)]">
                Páginas úteis para perceber melhor a Scooli
              </h3>
              <div className="mt-6 grid gap-3">
                {[
                  { label: "Ver todas as ferramentas", href: "/ferramentas" },
                  { label: "Ler a página para professores", href: "/professores" },
                  { label: "Ver preços", href: "/precos" },
                  { label: "Ler confiança e privacidade", href: "/confianca" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="inline-flex items-center justify-between rounded-[22px] border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-[color:var(--scooli-ink)] transition-colors hover:border-[color:var(--scooli-primary)] hover:text-[color:var(--scooli-primary)]"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ))}
              </div>
              <div className="mt-6 rounded-[24px] border border-[#d9ddff] bg-white px-5 py-4 text-sm leading-7 text-[color:var(--scooli-muted)]">
                Se queres experimentar diretamente a plataforma, o registo está em{" "}
                <Link href={`${APP_URL}/sign-up`} className="font-semibold text-[color:var(--scooli-primary)]">
                  create.scooli.app
                </Link>
                .
              </div>
            </SurfacePanel>
          </Container>
        </section>

        <section className="pb-20 sm:pb-24 lg:pb-28">
          <Container>
            <PageCtaBanner
              title="Quer ver se a Scooli encaixa no teu ritmo de preparação?"
              description="Experimenta um pedido real da próxima aula, revê o resultado, confirma o alinhamento com as Aprendizagens Essenciais e ajusta tudo antes de usar com a turma."
              secondaryHref="/confianca"
              secondaryLabel="Ver confiança e privacidade"
            />
          </Container>
        </section>
      </PublicSiteShell>
    </>
  );
}
