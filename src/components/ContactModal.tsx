"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Loader2, Mail, Send, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source?: string;
  title?: string;
  description?: string;
}

export function ContactModal({
  open,
  onOpenChange,
  source = "contact_page",
  title = "Fale connosco",
  description = "Preencha o formulário e entraremos em contacto consigo o mais brevemente possível.",
}: ContactModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (!EMAIL_REGEX.test(email.trim())) {
      toast.error("Por favor, introduza um endereço de email válido.");
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
          source,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || "Erro ao enviar a mensagem. Tente novamente."
        );
      }

      toast.success(
        "Mensagem enviada com sucesso! Receberá um email de confirmação em breve."
      );
      setName("");
      setEmail("");
      setOrganization("");
      setMessage("");
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Ocorreu um erro. Tente novamente mais tarde."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-slate-200 bg-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl text-slate-900">
            <div className="rounded-lg bg-[#6753FF]/10 p-2">
              <Mail className="h-5 w-5 text-[#6753FF]" />
            </div>
            {title}
          </DialogTitle>
          <DialogDescription className="text-slate-500">
            {description}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label
              htmlFor="contact-name"
              className="flex items-center gap-2 text-sm font-medium text-slate-700"
            >
              <User className="h-3.5 w-3.5 text-slate-400" />
              Nome *
            </Label>
            <Input
              id="contact-name"
              type="text"
              placeholder="O seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={200}
              className="border-slate-200 bg-white focus:border-[#6753FF] focus:ring-[#6753FF]"
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="contact-email"
              className="flex items-center gap-2 text-sm font-medium text-slate-700"
            >
              <Mail className="h-3.5 w-3.5 text-slate-400" />
              Email *
            </Label>
            <Input
              id="contact-email"
              type="email"
              placeholder="o.seu.email@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-slate-200 bg-white focus:border-[#6753FF] focus:ring-[#6753FF]"
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="contact-organization"
              className="flex items-center gap-2 text-sm font-medium text-slate-700"
            >
              <Building2 className="h-3.5 w-3.5 text-slate-400" />
              Organização / Escola
            </Label>
            <Input
              id="contact-organization"
              type="text"
              placeholder="Nome da sua instituição (opcional)"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              maxLength={200}
              className="border-slate-200 bg-white focus:border-[#6753FF] focus:ring-[#6753FF]"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="contact-message"
              className="text-sm font-medium text-slate-700"
            >
              Mensagem *
            </Label>
            <textarea
              id="contact-message"
              placeholder="Como podemos ajudar?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={2000}
              className="flex min-h-[100px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-xs placeholder:text-slate-400 focus:border-[#6753FF] focus:outline-none focus:ring-1 focus:ring-[#6753FF] disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isLoading}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="h-11 w-full rounded-xl bg-gradient-to-r from-[#6753FF] to-[#4E3BC0] font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-[#6753FF]/25 disabled:cursor-not-allowed disabled:opacity-50"
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
            <a
              href="/privacy"
              className="text-[#6753FF] underline hover:text-[#4E3BC0]"
            >
              Política de Privacidade
            </a>
            .
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
