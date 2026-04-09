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
import { getFirstContactErrorField, type ContactErrors, type ContactField, validateContactForm } from "@/lib/contactForm";
import { cn } from "@/lib/utils";
import { Building2, Loader2, Mail, Send, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

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
  const formId = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitMessage, setSubmitMessage] = useState<{ tone: "error" | "success"; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fieldIds = {
    name: `${formId}-name`,
    email: `${formId}-email`,
    organization: `${formId}-organization`,
    message: `${formId}-message`,
    status: `${formId}-status`,
    emailHint: `${formId}-email-hint`,
    messageHint: `${formId}-message-hint`,
  };

  const getFieldErrorId = (field: ContactField) => `${fieldIds[field]}-error`;

  const getFieldDescribedBy = (field: ContactField, hintId?: string) => {
    const ids = [hintId, errors[field] ? getFieldErrorId(field) : undefined].filter(Boolean);
    return ids.length > 0 ? ids.join(" ") : undefined;
  };

  const clearFieldError = (field: ContactField) => {
    setErrors((current) => {
      if (!current[field]) {
        return current;
      }

      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const focusField = (field: ContactField) => {
    if (typeof document === "undefined") {
      return;
    }

    document.getElementById(fieldIds[field])?.focus();
  };

  useEffect(() => {
    if (!open && !isLoading) {
      setName("");
      setEmail("");
      setOrganization("");
      setMessage("");
      setErrors({});
      setSubmitMessage(null);
    }
  }, [open, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors = validateContactForm({ name, email, message });

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSubmitMessage({
        tone: "error",
        text: "Revê os campos assinalados e tente novamente.",
      });

      const firstErrorField = getFirstContactErrorField(nextErrors);
      if (firstErrorField) {
        focusField(firstErrorField);
      }

      return;
    }

    setErrors({});
    setSubmitMessage(null);
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
        throw new Error(errorData.error || "Erro ao enviar a mensagem. Tente novamente.");
      }

      const successMessage = "Mensagem enviada com sucesso! Receberá um email de confirmação em breve.";
      toast.success(successMessage);
      setSubmitMessage({ tone: "success", text: successMessage });
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Ocorreu um erro. Tente novamente mais tarde.";
      toast.error(errorMessage);
      setSubmitMessage({ tone: "error", text: errorMessage });
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
          <DialogDescription className="text-slate-500">{description}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} noValidate aria-busy={isLoading} className="space-y-4 pt-2">
          <p className="text-sm text-slate-500">Os campos assinalados com * são obrigatórios.</p>

          <div className="space-y-2">
            <Label htmlFor={fieldIds.name} className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <User className="h-3.5 w-3.5 text-slate-400" />
              Nome *
            </Label>
            <Input
              id={fieldIds.name}
              name="name"
              type="text"
              placeholder="O seu nome"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                clearFieldError("name");
              }}
              maxLength={200}
              className="border-slate-200 bg-white focus:border-[#6753FF] focus:ring-[#6753FF]"
              disabled={isLoading}
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={getFieldDescribedBy("name")}
              required
            />
            {errors.name && (
              <p id={getFieldErrorId("name")} className="text-sm text-[color:var(--scooli-error)]">
                {errors.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor={fieldIds.email} className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <Mail className="h-3.5 w-3.5 text-slate-400" />
              Email *
            </Label>
            <Input
              id={fieldIds.email}
              name="email"
              type="email"
              placeholder="o.seu.email@exemplo.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearFieldError("email");
              }}
              className="border-slate-200 bg-white focus:border-[#6753FF] focus:ring-[#6753FF]"
              disabled={isLoading}
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={getFieldDescribedBy("email", fieldIds.emailHint)}
              required
            />
            <p id={fieldIds.emailHint} className="text-xs text-slate-500">
              Usamos o seu email apenas para responder ao pedido.
            </p>
            {errors.email && (
              <p id={getFieldErrorId("email")} className="text-sm text-[color:var(--scooli-error)]">
                {errors.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor={fieldIds.organization} className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <Building2 className="h-3.5 w-3.5 text-slate-400" />
              Organização / Escola
            </Label>
            <Input
              id={fieldIds.organization}
              name="organization"
              type="text"
              placeholder="Nome da sua instituição (opcional)"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              maxLength={200}
              className="border-slate-200 bg-white focus:border-[#6753FF] focus:ring-[#6753FF]"
              disabled={isLoading}
              autoComplete="organization"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={fieldIds.message} className="text-sm font-medium text-slate-700">
              Mensagem *
            </Label>
            <textarea
              id={fieldIds.message}
              name="message"
              placeholder="Como podemos ajudar?"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                clearFieldError("message");
              }}
              maxLength={2000}
              className="flex min-h-[100px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-xs placeholder:text-slate-400 focus:border-[#6753FF] focus:outline-none focus:ring-1 focus:ring-[#6753FF] disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isLoading}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={getFieldDescribedBy("message", fieldIds.messageHint)}
              required
            />
            <p id={fieldIds.messageHint} className="text-xs text-slate-500">
              Inclua o contexto necessário para conseguirmos ajudar.
            </p>
            {errors.message && (
              <p id={getFieldErrorId("message")} className="text-sm text-[color:var(--scooli-error)]">
                {errors.message}
              </p>
            )}
          </div>

          <div aria-live="polite" className="min-h-6">
            {submitMessage && (
              <p
                id={fieldIds.status}
                role="status"
                className={cn(
                  "text-sm",
                  submitMessage.tone === "error" ? "text-[color:var(--scooli-error)]" : "text-emerald-700"
                )}
              >
                {submitMessage.text}
              </p>
            )}
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
            <Link href="/privacy" className="text-[#6753FF] underline hover:text-[#4E3BC0]">
              Política de Privacidade
            </Link>
            .
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
