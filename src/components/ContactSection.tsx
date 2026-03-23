"use client";

import { Container } from "@/components/Container";
import { EmailContact } from "@/components/EmailContact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Clock3, Loader2, Mail, MessageSquare, Send, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Por favor, preenche todos os campos obrigatórios.");
      return;
    }

    if (!EMAIL_REGEX.test(email.trim())) {
      toast.error("Por favor, introduz um endereço de email válido.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          message: message.trim(),
          organization: organization.trim() || null,
          source: "contact_page",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Erro ao enviar a mensagem. Tenta novamente.");
      }

      toast.success("Mensagem enviada com sucesso. Vamos responder o mais depressa possível.");
      setName("");
      setEmail("");
      setOrganization("");
      setMessage("");
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Ocorreu um erro. Tenta novamente mais tarde."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative isolate pb-20 pt-8 sm:pb-24 sm:pt-10 lg:pb-28">
      <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(circle_at_top_left,rgba(103,83,255,0.16),transparent_40%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.10),transparent_24%)]" />
      <Container className="space-y-10">
        <div className="max-w-4xl space-y-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#d9ddff] bg-[color:var(--scooli-accent)] px-4 py-1.5 text-sm font-semibold text-[color:var(--scooli-primary)]">
            <MessageSquare className="h-4 w-4" />
            Contacto
          </span>
          <div className="space-y-4">
            <h1 className="font-display text-4xl leading-tight text-[color:var(--scooli-ink)] sm:text-5xl lg:text-6xl">
              Fala connosco
            </h1>
            <p className="text-lg leading-8 text-[color:var(--scooli-muted)] sm:text-xl">
              Se tens perguntas sobre a Scooli, queres falar sobre um piloto ou precisas de ajuda, usa o formulário ou envia-nos um email.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="grid gap-4">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_-56px_rgba(19,35,58,0.28)]">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-[color:var(--scooli-ink)]">Email</p>
                  <p className="text-sm text-[color:var(--scooli-muted)]">A forma mais simples de falar connosco</p>
                </div>
              </div>
              <div className="mt-5">
                <EmailContact showIcon showLabel={false} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 hover:bg-[color:var(--scooli-surface-alt)]" />
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_-56px_rgba(19,35,58,0.28)]">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
                  <Clock3 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-[color:var(--scooli-ink)]">Tempo de resposta</p>
                  <p className="text-sm text-[color:var(--scooli-muted)]">Normalmente respondemos em 24 a 48 horas úteis.</p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_-56px_rgba(19,35,58,0.28)]">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--scooli-accent)] text-[color:var(--scooli-primary)]">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-[color:var(--scooli-ink)]">Escolas e instituições</p>
                  <p className="text-sm text-[color:var(--scooli-muted)]">
                    Se queres falar sobre pilotos, adoção institucional ou dúvidas de implementação, também podes escrever-nos por aqui.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_-56px_rgba(19,35,58,0.36)] sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="section-contact-name" className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <User className="h-3.5 w-3.5 text-slate-400" />
                  Nome *
                </Label>
                <Input
                  id="section-contact-name"
                  type="text"
                  placeholder="O seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={200}
                  className="h-11 border-slate-200 bg-white focus:border-[#6753FF] focus:ring-[#6753FF]"
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="section-contact-email" className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Mail className="h-3.5 w-3.5 text-slate-400" />
                  Email *
                </Label>
                <Input
                  id="section-contact-email"
                  type="email"
                  placeholder="o.seu.email@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 border-slate-200 bg-white focus:border-[#6753FF] focus:ring-[#6753FF]"
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="section-contact-org" className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Building2 className="h-3.5 w-3.5 text-slate-400" />
                  Organização / Escola
                </Label>
                <Input
                  id="section-contact-org"
                  type="text"
                  placeholder="Nome da sua organização (opcional)"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  maxLength={200}
                  className="h-11 border-slate-200 bg-white focus:border-[#6753FF] focus:ring-[#6753FF]"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="section-contact-message" className="text-sm font-medium text-slate-700">
                  Mensagem *
                </Label>
                <textarea
                  id="section-contact-message"
                  placeholder="Como podemos ajudar?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={2000}
                  className="flex min-h-[140px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-xs placeholder:text-slate-400 focus:border-[#6753FF] focus:outline-none focus:ring-1 focus:ring-[#6753FF] disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={isLoading}
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="h-12 w-full rounded-xl bg-[color:var(--scooli-primary)] text-base font-semibold text-white transition-all duration-200 hover:bg-[color:var(--scooli-primary-strong)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    A enviar...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Enviar mensagem
                  </div>
                )}
              </Button>

              <p className="text-center text-xs text-slate-400">
                Ao enviar, concorda com a nossa{" "}
                <Link href="/privacy" className="text-[color:var(--scooli-primary)] underline hover:text-[color:var(--scooli-primary-strong)]">
                  Política de Privacidade
                </Link>
                .
              </p>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
