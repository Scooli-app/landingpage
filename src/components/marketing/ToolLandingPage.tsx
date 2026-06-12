import { Container } from "@/components/Container";
import { TrackedFaqAccordion } from "@/components/TrackedFaqAccordion";
import { TrackedLink } from "@/components/TrackedLink";
import { APP_URL } from "@/lib/seo";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { toolCardIcons, type ToolPageData } from "./data";
import {
  Checklist,
  MarketingSectionHeading,
  PageCtaBanner,
  PageHero,
  PublicSiteShell,
  SurfacePanel,
} from "./shared";

// ─── Shared pieces ───────────────────────────────────────────────────────────

const toolPreviewImages: Partial<Record<string, { src: string; alt: string }>> = {
  planificacoes: {
    src: "/screenshots/plano-pdf.png",
    alt: "Exemplo real de uma planificação criada com a Scooli",
  },
  "fichas-de-trabalho": {
    src: "/screenshots/ficha-pdf.png",
    alt: "Exemplo real de uma ficha de trabalho criada com a Scooli",
  },
  "gerador-de-testes": {
    src: "/screenshots/teste-pdf.png",
    alt: "Exemplo real de um teste criado com a Scooli",
  },
};

function UseCaseChips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((useCase) => (
        <span
          key={useCase}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600"
        >
          <CheckCircle2 className="h-4 w-4 text-[color:var(--scooli-primary)]" />
          {useCase}
        </span>
      ))}
    </div>
  );
}

function DocumentPreview({ tool }: { tool: ToolPageData }) {
  const previewImage = toolPreviewImages[tool.slug];

  if (previewImage) {
    return (
      <SurfacePanel className="bg-[color:var(--scooli-surface-alt)]">
        <div className="space-y-4">
          <div className="rounded-[26px] border border-slate-200 bg-white p-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
              Exemplo real criado na Scooli
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-[color:var(--scooli-ink)]">
              {tool.shortTitle}
            </h3>
          </div>
          <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_20px_50px_-40px_rgba(19,35,58,0.28)]">
            <Image
              src={previewImage.src}
              alt={previewImage.alt}
              width={1600}
              height={2000}
              sizes="(min-width: 1024px) 34vw, 100vw"
              className="h-auto w-full object-cover object-top"
            />
          </div>
        </div>
      </SurfacePanel>
    );
  }

  return (
    <SurfacePanel className="bg-[color:var(--scooli-surface-alt)]">
      <div className="rounded-[26px] border border-slate-200 bg-white p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
          O que costuma sair
        </p>
        <h3 className="mt-4 text-2xl font-semibold text-[color:var(--scooli-ink)]">
          {tool.shortTitle}
        </h3>
        <div className="mt-5 grid gap-3">
          {tool.outputs.map((output, index) => (
            <div
              key={output}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
            >
              <span className="mr-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-semibold text-[color:var(--scooli-primary)]">
                {index + 1}
              </span>
              {output}
            </div>
          ))}
        </div>
      </div>
    </SurfacePanel>
  );
}

function FaqAndRelated({ tool }: { tool: ToolPageData }) {
  return (
    <section className="bg-white/70 py-10 sm:py-14 lg:py-16">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <SurfacePanel>
            <MarketingSectionHeading
              eyebrow="Perguntas frequentes"
              title={`Dúvidas sobre ${tool.shortTitle.toLowerCase()}`}
              description="Respostas rápidas para perceber o que esta ferramenta faz, como se adapta ao seu contexto e o que pode esperar antes de experimentar."
            />
            <div className="mt-8">
              <TrackedFaqAccordion
                items={tool.faq}
                faqGroup={tool.slug}
                itemValuePrefix={`${tool.slug}-faq`}
                className="space-y-3"
                itemClassName="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 px-4"
                triggerClassName="py-4 text-left text-[15px] font-semibold text-[color:var(--scooli-ink)] hover:no-underline"
                contentClassName="text-sm leading-7 text-[color:var(--scooli-muted)]"
              />
            </div>
          </SurfacePanel>

          <SurfacePanel className="bg-[color:var(--scooli-surface-alt)]">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
              Continua a explorar
            </p>
            <h3 className="mt-4 text-2xl font-semibold text-[color:var(--scooli-ink)]">
              Páginas relacionadas
            </h3>
            <p className="mt-3 text-sm leading-7 text-[color:var(--scooli-muted)]">
              Se está a comparar formas de preparar materiais, estas páginas ajudam a encontrar a ferramenta certa mais depressa.
            </p>
            <div className="mt-6 grid gap-3">
              {tool.relatedLinks.map((link) => (
                <TrackedLink
                  key={`${tool.slug}-${link.href}`}
                  href={link.href}
                  eventName="marketing_navigation_clicked"
                  eventProperties={{
                    location: "tool_related_links",
                    link_label: link.label.toLowerCase(),
                  }}
                  className="inline-flex items-center justify-between rounded-[22px] border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-[color:var(--scooli-ink)] transition-colors hover:border-[color:var(--scooli-primary)] hover:text-[color:var(--scooli-primary)]"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="h-4 w-4" />
                </TrackedLink>
              ))}
            </div>
          </SurfacePanel>
        </div>
      </Container>
    </section>
  );
}

function CtaSection({ tool }: { tool: ToolPageData }) {
  return (
    <section className="py-10 sm:py-14 lg:py-16">
      <Container>
        <PageCtaBanner
          title={`Quer experimentar ${tool.shortTitle.toLowerCase()} na Scooli?`}
          description="Começa gratuitamente, gera um primeiro material e ajusta tudo antes de usar, imprimir ou exportar."
          primaryHref={`${APP_URL}/sign-up`}
          primaryLabel="Começar gratuitamente"
          secondaryHref="/ferramentas"
          secondaryLabel="Ver todas as ferramentas"
        />
      </Container>
    </section>
  );
}

// ─── Planning layout ──────────────────────────────────────────────────────────

type PlanningRow = { num: number; title: string; meta: string };

function getPlanningRows(slug: string): PlanningRow[] {
  if (slug === "sequencias-de-aulas") {
    return [
      { num: 1, title: "Seg 16 Set · Sistemas do corpo humano", meta: "Introdução ao tema · sem plano gerado" },
      { num: 2, title: "Qua 18 Set · Aparelho respiratório", meta: "Plano de aula gerado ✓" },
      { num: 3, title: "Seg 23 Set · Aparelho circulatório", meta: "Plano de aula gerado ✓ · ficha incluída" },
      { num: 4, title: "Qua 25 Set · Revisão dos sistemas", meta: "Aguarda geração" },
    ];
  }
  if (slug === "planificacoes") {
    return [
      { num: 1, title: "Objetivos de aprendizagem", meta: "4 descritores AE · alinhados com o Perfil do Aluno" },
      { num: 2, title: "Conteúdos e sequência didática", meta: "8 sessões previstas · tópicos distribuídos" },
      { num: 3, title: "Estratégias e atividades", meta: "Trabalho em grupo · aula expositiva · pesquisa guiada" },
      { num: 4, title: "Avaliação", meta: "Formativa contínua + sumativa · critérios definidos" },
    ];
  }
  return [
    { num: 1, title: "Motivação", meta: "10 min · Ativação de conhecimentos" },
    { num: 2, title: "Desenvolvimento", meta: "25 min · Explicação e exemplo" },
    { num: 3, title: "Prática", meta: "10 min · Exercício orientado" },
    { num: 4, title: "Síntese", meta: "5 min · Avaliação formativa" },
  ];
}

function getPlanningHeader(slug: string) {
  if (slug === "sequencias-de-aulas") {
    return { label: "Plano letivo", sub: "Ciências Naturais · 6.º ano · Set–Dez", badge: "Por horário" };
  }
  if (slug === "planificacoes") {
    return { label: "Planificação anual", sub: "Ciências Naturais · 6.º ano · 1.º período", badge: "AE · DL 55/2018" };
  }
  return { label: "Plano de aula", sub: "Ciências Naturais · 6.º ano · 50 min", badge: "AE alinhadas" };
}

function PlanningHeroVisual({ slug }: { slug: string }) {
  const header = getPlanningHeader(slug);
  const rows = getPlanningRows(slug);

  return (
    <SurfacePanel className="bg-[color:var(--scooli-surface-alt)]">
      <div className="rounded-[22px] border border-slate-200 bg-white p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
              Criado na Scooli
            </p>
            <p className="mt-1 font-semibold text-slate-800">{header.label}</p>
            <p className="text-sm text-slate-500">{header.sub}</p>
          </div>
          <span className="shrink-0 rounded-full bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700">
            {header.badge}
          </span>
        </div>
        <div className="mt-4 space-y-2">
          {rows.map((row) => (
            <div
              key={row.num}
              className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[color:var(--scooli-accent)] text-xs font-bold text-[color:var(--scooli-primary)]">
                {row.num}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800">{row.title}</p>
                <p className="text-xs text-slate-500">{row.meta}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2">
          <span className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-500">Editável</span>
          {slug === "sequencias-de-aulas" ? (
            <span className="rounded-md bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-600">
              Gerar plano de aula
            </span>
          ) : (
            <span className="rounded-md bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-600">
              Exportar PDF
            </span>
          )}
        </div>
      </div>
    </SurfacePanel>
  );
}

function PlanningToolPage({ tool }: { tool: ToolPageData }) {
  const Icon = toolCardIcons[tool.slug];

  return (
    <PublicSiteShell>
      <PageHero
        eyebrow="Planificação"
        title={tool.hero}
        description={tool.description}
        primaryHref={`${APP_URL}/sign-up`}
        primaryLabel="Começar gratuitamente"
        secondaryHref="/ferramentas"
        secondaryLabel="Ver todas as ferramentas"
        aside={<PlanningHeroVisual slug={tool.slug} />}
      >
        <UseCaseChips items={tool.useCases} />
      </PageHero>

      {/* O que inclui */}
      <section className="py-10 sm:py-14 lg:py-16">
        <Container className="space-y-8">
          <MarketingSectionHeading
            eyebrow={tool.slug === "sequencias-de-aulas" ? "A estrutura" : "O documento"}
            title={tool.slug === "sequencias-de-aulas" ? "O que encontra no plano letivo" : "O que encontra no documento gerado"}
            description={
              tool.slug === "sequencias-de-aulas"
                ? "Cada plano letivo mostra as aulas distribuídas pelo período com o tópico de cada sessão — pronto a consultar e a gerar planos de aula quando precisar."
                : "Cada documento parte dos referenciais curriculares portugueses e chega pronto a rever, editar e usar."
            }
            centered
          />
          <div className="grid gap-5 sm:grid-cols-3">
            {tool.outputs.map((output, i) => (
              <SurfacePanel key={output} className="flex flex-col gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-sm font-bold text-[color:var(--scooli-primary)]">
                  {i + 1}
                </span>
                <p className="text-lg font-semibold text-[color:var(--scooli-ink)]">{output}</p>
              </SurfacePanel>
            ))}
          </div>
        </Container>
      </section>

      {/* Ligação ao currículo + Como funciona */}
      <section className="bg-white/70 py-10 sm:py-14 lg:py-16">
        <Container className="space-y-8">
          <MarketingSectionHeading
            eyebrow="Na prática"
            title={`Como usar ${tool.shortTitle.toLowerCase()} na sua rotina`}
            description="Estas são as situações em que esta ferramenta faz mais diferença e o que pode esperar do resultado."
            centered
          />
          <div className="grid gap-5 lg:grid-cols-2">
            {tool.contentSections.map((section) => (
              <SurfacePanel key={section.title}>
                <h3 className="text-2xl font-semibold text-[color:var(--scooli-ink)]">
                  {section.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[color:var(--scooli-muted)] sm:text-[15px]">
                  {section.description}
                </p>
                {section.bullets && section.bullets.length > 0 && (
                  <div className="mt-5">
                    <Checklist items={section.bullets} />
                  </div>
                )}
              </SurfacePanel>
            ))}
          </div>
        </Container>
      </section>

      {/* Passo a passo */}
      <section className="py-10 sm:py-14 lg:py-16">
        <Container className="space-y-8">
          <MarketingSectionHeading
            eyebrow="Como funciona"
            title={tool.slug === "sequencias-de-aulas" ? "Do horário ao plano letivo organizado" : "Do pedido ao documento editável"}
            description={
              tool.slug === "sequencias-de-aulas"
                ? "Indique a disciplina, o período e o horário — a Scooli distribui as aulas e sugere os tópicos. Gere o plano de aula de qualquer sessão quando precisar."
                : "O processo é simples: parte de um contexto, recebe uma base estruturada e ajusta até estar pronto a usar."
            }
            centered
          />
          <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tool.howToSteps.map((step, i) => (
              <div key={step.name} className="relative">
                <SurfacePanel className="h-full">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--scooli-accent)] text-sm font-bold text-[color:var(--scooli-primary)]">
                    {i + 1}
                  </span>
                  <p className="mt-4 font-semibold text-[color:var(--scooli-ink)]">{step.name}</p>
                  <p className="mt-2 text-sm leading-7 text-[color:var(--scooli-muted)]">{step.text}</p>
                </SurfacePanel>
                {i < tool.howToSteps.length - 1 && (
                  <div className="absolute -right-2.5 top-8 z-10 hidden h-5 w-5 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 lg:flex">
                    <ArrowRight className="h-3 w-3" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* O que ganhas */}
      <section className="bg-white/70 py-10 sm:py-14 lg:py-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[auto_1fr]">
            <SurfacePanel className="lg:max-w-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-xl font-semibold text-[color:var(--scooli-ink)]">O que ganha</p>
              </div>
              <div className="mt-5">
                <Checklist items={tool.benefits} />
              </div>
            </SurfacePanel>
            <SurfacePanel className="bg-[color:var(--scooli-surface-alt)]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                Professor no controlo
              </p>
              {tool.slug === "sequencias-de-aulas" ? (
                <>
                  <p className="mt-4 text-2xl font-semibold leading-snug text-[color:var(--scooli-ink)]">
                    A Scooli organiza as aulas — o professor gera o plano quando quiser
                  </p>
                  <p className="mt-4 text-sm leading-7 text-[color:var(--scooli-muted)]">
                    O plano letivo define a estrutura temporal. A geração do plano de aula de cada sessão é sempre uma decisão do professor — a Scooli não gera automaticamente sem pedido.
                  </p>
                </>
              ) : (
                <>
                  <p className="mt-4 text-2xl font-semibold leading-snug text-[color:var(--scooli-ink)]">
                    A Scooli gera a base — o professor decide o que fica
                  </p>
                  <p className="mt-4 text-sm leading-7 text-[color:var(--scooli-muted)]">
                    Todos os documentos são editáveis antes de imprimir, exportar ou partilhar. A decisão final é sempre do professor, não da IA.
                  </p>
                </>
              )}
            </SurfacePanel>
          </div>
        </Container>
      </section>

      <FaqAndRelated tool={tool} />
      <CtaSection tool={tool} />
    </PublicSiteShell>
  );
}

// ─── Assessment layout ────────────────────────────────────────────────────────

const ASSESSMENT_STATS = [
  {
    value: "6,9 h/semana",
    label: "gasto em correção e avaliação por docente em Portugal",
    source: "TALIS 2024",
  },
  {
    value: "77%",
    label: "identificam o excesso de correções como fonte de stress",
    source: "TALIS 2024",
  },
];

const QUESTION_TYPES = [
  {
    symbol: "A · B · C · D",
    label: "Escolha múltipla",
    detail: "Opções com resposta única ou múltipla",
  },
  {
    symbol: "___",
    label: "Resposta curta",
    detail: "Uma ou duas frases, foco na compreensão",
  },
  {
    symbol: "¶",
    label: "Desenvolvimento",
    detail: "Resposta extensa com critérios visíveis",
  },
  {
    symbol: "✓",
    label: "Critérios de correção",
    detail: "Pontuação por item e descritores de classificação",
  },
];

function AssessmentToolPage({ tool }: { tool: ToolPageData }) {
  const Icon = toolCardIcons[tool.slug];

  return (
    <PublicSiteShell>
      <PageHero
        eyebrow="Avaliação"
        title={tool.hero}
        description={tool.description}
        primaryHref={`${APP_URL}/sign-up`}
        primaryLabel="Começar gratuitamente"
        secondaryHref="/ferramentas"
        secondaryLabel="Ver todas as ferramentas"
        aside={<DocumentPreview tool={tool} />}
      >
        <UseCaseChips items={tool.useCases} />
      </PageHero>

      {/* Stats strip */}
      <div className="border-y border-slate-200/70 bg-white">
        <Container className="py-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:gap-16">
            {ASSESSMENT_STATS.map((stat) => (
              <div key={stat.value} className="flex items-start gap-5">
                <p className="font-display text-4xl text-[color:var(--scooli-ink)] sm:text-5xl">
                  {stat.value}
                </p>
                <div>
                  <p className="text-sm leading-7 text-[color:var(--scooli-muted)]">{stat.label}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                    {stat.source}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Tipos de questão */}
      <section className="py-10 sm:py-14 lg:py-16">
        <Container className="space-y-8">
          <MarketingSectionHeading
            eyebrow="Formatos de questão"
            title="Perguntas variadas, num só documento"
            description="Pode combinar diferentes tipos de pergunta no mesmo instrumento de avaliação, com cotação e critérios já incluídos."
            centered
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {QUESTION_TYPES.map((qt) => (
              <SurfacePanel key={qt.label} className="text-center">
                <p className="font-display text-3xl text-[color:var(--scooli-primary)]">
                  {qt.symbol}
                </p>
                <p className="mt-4 font-semibold text-[color:var(--scooli-ink)]">{qt.label}</p>
                <p className="mt-2 text-sm leading-6 text-[color:var(--scooli-muted)]">{qt.detail}</p>
              </SurfacePanel>
            ))}
          </div>
        </Container>
      </section>

      {/* Benefícios + Conteúdo */}
      <section className="bg-white/70 py-10 sm:py-14 lg:py-16">
        <Container className="space-y-8">
          <MarketingSectionHeading
            eyebrow="Na prática"
            title={`O que muda com ${tool.shortTitle.toLowerCase()} na Scooli`}
            description="Estas são as situações em que a ferramenta faz mais diferença no dia a dia de preparação e avaliação."
            centered
          />
          <div className="grid gap-5 lg:grid-cols-[1fr_auto]">
            <div className="grid gap-5 lg:grid-cols-2">
              {tool.contentSections.map((section) => (
                <SurfacePanel key={section.title}>
                  <h3 className="text-xl font-semibold text-[color:var(--scooli-ink)]">
                    {section.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--scooli-muted)]">
                    {section.description}
                  </p>
                  {section.bullets && section.bullets.length > 0 && (
                    <div className="mt-4">
                      <Checklist items={section.bullets} />
                    </div>
                  )}
                </SurfacePanel>
              ))}
            </div>
            <SurfacePanel className="lg:w-64">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-5 text-xl font-semibold text-[color:var(--scooli-ink)]">O que ganha</p>
              <div className="mt-4">
                <Checklist items={tool.benefits} />
              </div>
            </SurfacePanel>
          </div>
        </Container>
      </section>

      {/* Como funciona */}
      <section className="py-10 sm:py-14 lg:py-16">
        <Container className="space-y-8">
          <MarketingSectionHeading
            eyebrow="Como funciona"
            title="Do tema ao instrumento de avaliação"
            description="Quatro passos desde o primeiro pedido até ter um instrumento revisado e pronto a entregar."
            centered
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tool.howToSteps.map((step, i) => (
              <SurfacePanel key={step.name} className="relative">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--scooli-accent)] text-sm font-bold text-[color:var(--scooli-primary)]">
                  {i + 1}
                </span>
                <p className="mt-4 font-semibold text-[color:var(--scooli-ink)]">{step.name}</p>
                <p className="mt-2 text-sm leading-7 text-[color:var(--scooli-muted)]">{step.text}</p>
              </SurfacePanel>
            ))}
          </div>
        </Container>
      </section>

      <FaqAndRelated tool={tool} />
      <CtaSection tool={tool} />
    </PublicSiteShell>
  );
}

// ─── Default layout ───────────────────────────────────────────────────────────

function DefaultToolPage({ tool }: { tool: ToolPageData }) {
  const Icon = toolCardIcons[tool.slug];

  return (
    <PublicSiteShell>
      <PageHero
        eyebrow="Ferramenta"
        title={tool.hero}
        description={tool.description}
        primaryHref={`${APP_URL}/sign-up`}
        primaryLabel="Começar gratuitamente"
        secondaryHref="/professores"
        secondaryLabel="Ver percurso para professores"
        aside={<DocumentPreview tool={tool} />}
      >
        <UseCaseChips items={tool.useCases} />
      </PageHero>

      {/* O que ganhas + casos de uso */}
      <section className="py-10 sm:py-14 lg:py-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <SurfacePanel>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-xl font-semibold text-[color:var(--scooli-ink)]">O que ganha</p>
              </div>
              <div className="mt-5">
                <Checklist items={tool.benefits} />
              </div>
            </SurfacePanel>

            <SurfacePanel className="bg-[color:var(--scooli-surface-alt)]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                Quando usar
              </p>
              <p className="mt-4 text-2xl font-semibold text-[color:var(--scooli-ink)]">
                Situações em que esta ferramenta faz a diferença
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {tool.useCases.map((useCase) => (
                  <div
                    key={useCase}
                    className="rounded-2xl border border-slate-200 bg-white p-4"
                  >
                    <CheckCircle2 className="h-5 w-5 text-[color:var(--scooli-primary)]" />
                    <p className="mt-3 font-semibold text-slate-800">{useCase}</p>
                  </div>
                ))}
              </div>
            </SurfacePanel>
          </div>
        </Container>
      </section>

      {/* Na prática */}
      <section className="bg-white/70 py-10 sm:py-14 lg:py-16">
        <Container className="space-y-8">
          <MarketingSectionHeading
            eyebrow="Na prática"
            title={`O que pode fazer com ${tool.shortTitle.toLowerCase()}`}
            description="Esta página resume o tipo de resultado que pode esperar e em que situações faz sentido usar esta ferramenta."
            centered
          />
          <div className="grid gap-5 lg:grid-cols-2">
            {tool.contentSections.map((section) => (
              <SurfacePanel key={section.title}>
                <h3 className="text-2xl font-semibold text-[color:var(--scooli-ink)]">
                  {section.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[color:var(--scooli-muted)] sm:text-[15px]">
                  {section.description}
                </p>
                {section.bullets && section.bullets.length > 0 && (
                  <div className="mt-5">
                    <Checklist items={section.bullets} />
                  </div>
                )}
              </SurfacePanel>
            ))}
          </div>
        </Container>
      </section>

      {/* Como funciona */}
      <section className="py-10 sm:py-14 lg:py-16">
        <Container className="space-y-8">
          <MarketingSectionHeading
            eyebrow="Como funciona"
            title="Quatro passos do pedido ao material pronto"
            description="Parte de um contexto simples, recebe uma base estruturada e ajusta antes de usar."
            centered
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tool.howToSteps.map((step, i) => (
              <SurfacePanel key={step.name}>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--scooli-accent)] text-sm font-bold text-[color:var(--scooli-primary)]">
                  {i + 1}
                </span>
                <p className="mt-4 font-semibold text-[color:var(--scooli-ink)]">{step.name}</p>
                <p className="mt-2 text-sm leading-7 text-[color:var(--scooli-muted)]">{step.text}</p>
              </SurfacePanel>
            ))}
          </div>
        </Container>
      </section>

      <FaqAndRelated tool={tool} />
      <CtaSection tool={tool} />
    </PublicSiteShell>
  );
}

// ─── Router ───────────────────────────────────────────────────────────────────

export function ToolLandingPage({ tool }: { tool: ToolPageData }) {
  if (tool.layout === "planning") { return <PlanningToolPage tool={tool} />; }
  if (tool.layout === "assessment") { return <AssessmentToolPage tool={tool} />; }
  return <DefaultToolPage tool={tool} />;
}
