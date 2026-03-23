import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { APP_URL, PRICING } from "@/lib/seo";
import { ArrowRight, CheckCircle2, ChevronRight, Layers3, PencilLine } from "lucide-react";
import Link from "next/link";
import { libraryBenefits, libraryCards, socialProof } from "./data";
import { BrowserFrame, QuoteCard, SectionBadge, SectionHeading } from "./shared";

function LibraryPreview() {
  return (
    <BrowserFrame title="Biblioteca comunitária" subtitle="Recursos partilhados">
      <div className="space-y-4">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
          <div className="flex items-center gap-3 rounded-[24px] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500">
            Procurar por disciplina, ano ou recurso
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-500">
            {["Português", "Matemática", "Fichas", "Planificações"].map((tag) => (
              <span key={tag} className="rounded-full border border-slate-200 bg-white px-3 py-2">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {libraryCards.map((card) => (
            <div key={card.title} className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_20px_50px_-40px_rgba(19,35,58,0.28)]">
              <p className="text-lg font-semibold text-slate-800">{card.title}</p>
              <p className="mt-2 text-sm text-slate-500">{card.meta}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {card.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600">
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href="/biblioteca"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--scooli-primary)]"
              >
                Abrir e adaptar
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

export function CommunityLibrarySection() {
  return (
    <section id="biblioteca" className="bg-white/70 py-20 sm:py-24 lg:py-28">
      <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Biblioteca comunitária"
            title="Não comece do zero: use materiais já criados"
            description="Aceda a recursos partilhados por outros professores e poupe ainda mais tempo."
          />
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_-42px_rgba(19,35,58,0.35)]">
            <p className="text-lg font-semibold text-[color:var(--scooli-ink)]">Use materiais da comunidade e avance mais depressa</p>
            <ul className="mt-5 grid gap-3 text-sm leading-7 text-[color:var(--scooli-muted)]">
              {libraryBenefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[color:var(--scooli-primary)]" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/biblioteca"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--scooli-primary)]"
            >
              Explorar a biblioteca
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <LibraryPreview />
      </Container>
    </section>
  );
}

export function SocialProofSection() {
  return (
    <section id="prova-social" className="py-20 sm:py-24 lg:py-28">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow="Prova social"
          title="Ganhos que fazem diferença semana após semana"
          description="Ainda estamos a reunir testemunhos autorizados. Até lá, estes exemplos mostram o tipo de impacto que queremos documentar com utilizadores reais."
          centered
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {socialProof.map((item) => (
            <QuoteCard key={item.quote} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export function LandingFinalCtaSection() {
  return (
    <section id="cta-final" className="pb-20 sm:pb-24 lg:pb-28">
      <Container>
        <div className="overflow-hidden rounded-[36px] border border-slate-200 bg-[linear-gradient(135deg,rgba(103,83,255,0.10),rgba(255,255,255,0.97)_45%,rgba(59,130,246,0.10))] p-8 shadow-[0_30px_100px_-60px_rgba(19,35,58,0.45)] sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="space-y-6">
              <SectionBadge>Último passo</SectionBadge>
              <div className="space-y-4">
                <h2 className="font-display text-3xl leading-tight text-[color:var(--scooli-ink)] sm:text-4xl lg:text-5xl">
                  Comece hoje e poupe horas todas as semanas.
                </h2>
                <p className="max-w-2xl text-base leading-8 text-[color:var(--scooli-muted)] sm:text-lg">
                  Crie planificações, fichas e testes em minutos, ajuste tudo ao seu ritmo e leve materiais prontos para a próxima aula.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild className="h-12 rounded-full px-6 text-base font-semibold shadow-[0_20px_32px_-18px_rgba(103,83,255,0.45)]">
                  <Link href={`${APP_URL}/sign-up`}>
                    Começar gratuitamente
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-12 rounded-full px-6 text-base font-semibold">
                  <Link href="/precos">Ver preços</Link>
                </Button>
              </div>
              <Link
                href="/escolas"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--scooli-primary)]"
              >
                É uma escola ou instituição? Ver percurso institucional
                <ChevronRight className="h-4 w-4" />
              </Link>
              <ul className="grid gap-3 text-sm leading-7 text-[color:var(--scooli-muted)]">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[color:var(--scooli-primary)]" />
                  <span>{PRICING.free.generationsPerMonth} gerações por mês para explorares a ferramenta sem compromisso inicial.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[color:var(--scooli-primary)]" />
                  <span>Todo o conteúdo continua editável antes de exportares ou reutilizares.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[color:var(--scooli-primary)]" />
                  <span>Podes combinar geração com IA e materiais da biblioteca comunitária.</span>
                </li>
              </ul>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_20px_50px_-44px_rgba(19,35,58,0.36)] sm:col-span-2">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">O que sai no fim</p>
                    <p className="text-xs text-slate-500">Materiais prontos a rever e a usar</p>
                  </div>
                  <Layers3 className="h-5 w-5 text-[color:var(--scooli-primary)]" />
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {["Planificação", "Ficha", "Teste"].map((label) => (
                    <div key={label} className="rounded-[22px] bg-[color:var(--scooli-surface-alt)] p-4">
                      <p className="text-sm font-semibold text-slate-800">{label}</p>
                      <div className="mt-3 h-2.5 w-4/5 rounded-full bg-slate-200" />
                      <div className="mt-2 h-2.5 w-3/5 rounded-full bg-slate-200" />
                      <div className="mt-3 h-16 rounded-2xl bg-white" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_20px_50px_-44px_rgba(19,35,58,0.36)]">
                <p className="text-sm font-semibold text-slate-800">Pronto a editar</p>
                <div className="mt-4 flex items-center gap-3 rounded-2xl bg-[color:var(--scooli-accent)] px-4 py-3 text-sm text-[color:var(--scooli-primary-strong)]">
                  <CheckCircle2 className="h-4 w-4" />
                  Documento gerado
                </div>
                <div className="mt-3 flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  <PencilLine className="h-4 w-4 text-[color:var(--scooli-primary)]" />
                  Ajusta ao teu estilo
                </div>
              </div>
              <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_20px_50px_-44px_rgba(19,35,58,0.36)]">
                <p className="text-sm font-semibold text-slate-800">Próximo passo</p>
                <Link
                  href={`${APP_URL}/sign-up`}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-[color:var(--scooli-accent)] px-4 py-2 text-sm font-semibold text-[color:var(--scooli-primary)]"
                >
                  Entrar na plataforma
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <p className="mt-4 text-sm leading-7 text-slate-500">
                  Mantém o controlo do conteúdo e ganha velocidade no trabalho que mais se repete.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

