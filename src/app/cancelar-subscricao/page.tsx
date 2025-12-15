import { EmailContact } from "@/components/EmailContact";
import { LegalLayout } from "@/components/LegalLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getLegalContent } from "@/lib/legal";
import { CreditCard } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export const metadata: Metadata = {
  title: "Cancelar Subscrição | Scooli",
  description: "Instruções claras para cancelar a sua subscrição Scooli.",
};

export default async function CancelPage() {
  const { content, title, description, updated } = await getLegalContent(
    "cancelar-subscricao"
  );

  return (
    <LegalLayout title={title} description={description} updated={updated}>
      <ReactMarkdown>{content}</ReactMarkdown>
      <Card className="mt-8 rounded-2xl border-[color:var(--scooli-border)] bg-gradient-to-br from-[color:var(--scooli-accent)] to-white">
        <CardContent className="space-y-4 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--scooli-primary)]">
              <CreditCard className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[color:var(--scooli-ink)]">
                Portal de faturação
              </p>
              <p className="text-sm text-[color:var(--scooli-muted)]">
                Em breve disponível
              </p>
            </div>
          </div>
          <p className="text-[color:var(--scooli-muted)]">
            Em breve terá um portal self-service para cancelar, alterar método de
            pagamento ou transferir faturas.
          </p>
          <Button disabled className="w-full rounded-xl">
            Abrir portal (brevemente)
          </Button>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <EmailContact showIcon className="flex-1 justify-center rounded-xl border border-[color:var(--scooli-border)]" />
            <Button asChild className="flex-1 rounded-xl">
              <Link href="/termos-de-utilizacao">Ver Termos</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </LegalLayout>
  );
}

