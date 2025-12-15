import { LegalLayout } from "@/components/LegalLayout";
import { Button } from "@/components/ui/button";
import { getLegalContent } from "@/lib/legal";
import type { Metadata } from "next";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export const metadata: Metadata = {
  title: "Termos de Utilização | Scooli",
  description: "Regras de utilização do website e serviço Scooli.",
};

export default async function TermsPage() {
  const { content, title, description, updated } = await getLegalContent(
    "termos-de-utilizacao"
  );

  return (
    <LegalLayout title={title} description={description} updated={updated}>
      <ReactMarkdown>{content}</ReactMarkdown>
      <div className="mt-8 flex flex-wrap gap-3 border-t border-[color:var(--scooli-border)] pt-6">
        <Button asChild variant="outline" className="rounded-xl">
          <Link href="/politica-de-privacidade">Política de Privacidade</Link>
        </Button>
        <Button asChild className="rounded-xl">
          <Link href="/cancelar-subscricao">Cancelar Subscrição</Link>
        </Button>
      </div>
    </LegalLayout>
  );
}

