import { Container } from "@/components/Container";
import { TrackedLink } from "@/components/TrackedLink";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { SectionHeading } from "./shared";

export function InstitutionReferralSection() {
  return (
    <section className="py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="overflow-hidden rounded-[36px] border border-slate-200 bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(243,245,255,0.98)_40%,rgba(214,236,255,0.72))] p-8 shadow-[0_30px_100px_-60px_rgba(19,35,58,0.38)] sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="space-y-6">
              <SectionHeading
                eyebrow="Trabalha numa escola?"
                title="Se não decide a adoção, ainda assim pode abrir a conversa"
                description="Criamos uma página própria para professores e equipas que querem sugerir a Scooli à direção, coordenação ou agrupamento onde trabalham."
              />
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  className="h-12 rounded-full px-6 text-base font-semibold shadow-[0_20px_32px_-18px_rgba(103,83,255,0.45)]"
                >
                  <TrackedLink
                    href="/recomendar-instituicao"
                    eventName="marketing_cta_clicked"
                    eventProperties={{
                      cta_id: "home_recommend_institution",
                      placement: "home_institution_referral_primary",
                    }}
                  >
                    Recomendar a minha escola
                    <ArrowRight className="h-4 w-4" />
                  </TrackedLink>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-12 rounded-full px-6 text-base font-semibold"
                >
                  <TrackedLink
                    href="/escolas"
                    eventName="marketing_cta_clicked"
                    eventProperties={{
                      cta_id: "home_recommendation_view_schools",
                      placement: "home_institution_referral_secondary",
                    }}
                  >
                    Ver página para escolas
                  </TrackedLink>
                </Button>
              </div>
              <p className="text-sm leading-7 text-[color:var(--scooli-muted)]">
                Se já tiver um contacto da direção, pode incluí-lo no pedido.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  title: "Partilhe contexto",
                  text: "Indique a escola, o seu papel e porque faz sentido o contacto.",
                },
                {
                  title: "Alinhamos abordagem",
                  text: "Preparamos a primeira conversa com clareza sobre piloto, privacidade e adoção.",
                },
                {
                  title: "Abrimos o próximo passo",
                  text: "Entramos em contacto com a direção ou coordenação quando houver base para isso.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_20px_50px_-44px_rgba(19,35,58,0.36)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-base font-semibold text-[color:var(--scooli-ink)]">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--scooli-muted)]">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-[color:var(--scooli-border)] pt-6 text-sm text-[color:var(--scooli-muted)] sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--scooli-primary)]" />
              <span>
                Pensado para professores, coordenação e equipas que querem
                levar uma sugestão estruturada para dentro da escola.
              </span>
            </div>
            <TrackedLink
              href="/recomendar-instituicao"
              eventName="marketing_cta_clicked"
              eventProperties={{
                cta_id: "home_institution_referral_footer_link",
                placement: "home_institution_referral_footer",
              }}
              className="inline-flex items-center gap-2 font-semibold text-[color:var(--scooli-primary)]"
            >
              Abrir página de recomendação
              <ChevronRight className="h-4 w-4" />
            </TrackedLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
