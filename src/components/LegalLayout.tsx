import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

type LegalLayoutProps = {
  title: string;
  description?: string;
  updated?: string;
  children: ReactNode;
};

export function LegalLayout({
  title,
  description,
  updated,
  children,
}: LegalLayoutProps) {
  return (
    <section className="min-h-screen py-12 md:py-16">
      <Container className="max-w-3xl">
        {/* Back navigation */}
        <div className="mb-8">
          <Button asChild variant="ghost" className="gap-2 rounded-xl px-3 py-2">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Voltar à página principal
            </Link>
          </Button>
        </div>

        {/* Header card */}
        <div className="mb-10 rounded-2xl border border-[color:var(--scooli-border)] bg-white/80 p-8 shadow-sm backdrop-blur">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[color:var(--scooli-primary)] to-[color:var(--scooli-primary-strong)]">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--scooli-muted)]">
                Documento Legal
              </p>
              <h1 className="text-2xl font-bold text-[color:var(--scooli-ink)] md:text-3xl">
                {title}
              </h1>
            </div>
          </div>
          {description && (
            <p className="mt-3 text-[color:var(--scooli-muted)]">{description}</p>
          )}
          {updated && (
            <p className="mt-2 text-sm text-[color:var(--scooli-muted)]">
              Última atualização: {updated}
            </p>
          )}
        </div>

        {/* Content */}
        <article className="rounded-2xl border border-[color:var(--scooli-border)] bg-white p-8 shadow-sm md:p-10">
          <div className="prose prose-slate max-w-none text-[color:var(--scooli-ink)] [&_a]:text-[color:var(--scooli-primary)] [&_a]:no-underline [&_a]:font-medium [&_a]:hover:text-[color:var(--scooli-primary-strong)] [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-[color:var(--scooli-ink)] [&_h3]:mb-3 [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-2 [&_strong]:text-[color:var(--scooli-ink)] [&_p]:mb-4 [&_p]:leading-relaxed">
            {children}
          </div>
        </article>
      </Container>
    </section>
  );
}

