import { EmailContact } from "@/components/EmailContact";
import { LegalLayout } from "@/components/LegalLayout";
import { Button } from "@/components/ui/button";
import { getLegalContent } from "@/lib/legal";
import type { Metadata } from "next";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export const metadata: Metadata = {
  title: "Política de Privacidade | Scooli",
  description:
    "Como a Scooli trata dados pessoais de professores e visitantes, em conformidade com o RGPD.",
};

export default async function PrivacyPage() {
  const { content, title, description, updated } = await getLegalContent(
    "politica-de-privacidade"
  );

  return (
    <LegalLayout title={title} description={description} updated={updated}>
      <ReactMarkdown>{content}</ReactMarkdown>
      <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-[color:var(--scooli-border)] pt-6">
        <Button asChild className="rounded-xl">
          <Link href="/termos-de-utilizacao">Ver Termos de Utilização</Link>
        </Button>
        <EmailContact showIcon className="rounded-xl border border-[color:var(--scooli-border)]" />
      </div>
    </LegalLayout>
  );
}

