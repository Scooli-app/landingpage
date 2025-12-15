import { Container } from "@/components/Container";
import { EmailContact } from "@/components/EmailContact";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Billing | Scooli",
  description: "Gestão de faturação estará disponível em breve.",
};

export default function BillingPlaceholder() {
  return (
    <section className="py-16 md:py-20">
      <Container className="max-w-3xl space-y-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-[color:var(--scooli-muted)]">
          Brevemente
        </p>
        <h1 className="text-3xl font-bold text-[color:var(--scooli-ink)] md:text-4xl">
          Portal de faturação
        </h1>
        <p className="text-[color:var(--scooli-muted)]">
          Estamos a preparar um portal de faturação self-service para gerir
          recibos, métodos de pagamento e subscrições. Receberá acesso assim que
          estiver disponível.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild className="rounded-xl">
            <Link href="#waitlist">Ser notificado</Link>
          </Button>
          <EmailContact showIcon className="rounded-xl border border-[color:var(--scooli-border)]" />
        </div>
      </Container>
    </section>
  );
}

