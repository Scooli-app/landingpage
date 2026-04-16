"use client";

import { Container } from "@/components/Container";
import { TrackedLink } from "@/components/TrackedLink";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { captureMarketingEvent, getErrorType } from "@/lib/analytics";
import { EMAIL_REGEX } from "@/lib/contactForm";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  Loader2,
  Mail,
  Send,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
const SOURCE = "institution_recommendation_page";

type RecommendationField =
  | "name"
  | "email"
  | "role"
  | "institution"
  | "leadershipContact"
  | "message";

type RecommendationErrors = Partial<Record<RecommendationField, string>>;


function validateRecommendationForm(values: {
  name: string;
  email: string;
  role: string;
  institution: string;
  leadershipContact: string;
}): RecommendationErrors {
  const errors: RecommendationErrors = {};

  if (!values.name.trim()) {
    errors.name = "Indica o teu nome para sabermos quem está a recomendar.";
  }

  if (!values.email.trim()) {
    errors.email = "Indica um email para podermos responder ao pedido.";
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = "Introduz um endereço de email válido.";
  }

  if (!values.role.trim()) {
    errors.role = "Partilha o teu papel na escola ou instituição.";
  }

  if (!values.institution.trim()) {
    errors.institution =
      "Indica a escola, instituição ou agrupamento que queres recomendar.";
  }

  if (!values.leadershipContact.trim()) {
    errors.leadershipContact =
      "Indica o contacto da direção ou coordenação.";
  }

  return errors;
}

export function InstitutionRecommendationPage() {
  const formId = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [institution, setInstitution] = useState("");
  const [leadershipContact, setLeadershipContact] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<RecommendationErrors>({});
  const [submitMessage, setSubmitMessage] = useState<{
    tone: "error" | "success";
    text: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fieldIds = {
    name: `${formId}-name`,
    email: `${formId}-email`,
    role: `${formId}-role`,
    institution: `${formId}-institution`,
    leadershipContact: `${formId}-leadership-contact`,
    message: `${formId}-message`,
    status: `${formId}-status`,
    ccHint: `${formId}-cc-hint`,
  };

  const getFieldErrorId = (field: RecommendationField) =>
    `${fieldIds[field]}-error`;

  const getFieldDescribedBy = (
    field: RecommendationField,
    hintId?: string
  ) => {
    const ids = [
      hintId,
      errors[field] ? getFieldErrorId(field) : undefined,
    ].filter(Boolean);
    return ids.length > 0 ? ids.join(" ") : undefined;
  };

  const clearFieldError = (field: RecommendationField) => {
    setErrors((current) => {
      if (!current[field]) {
        return current;
      }

      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const focusField = (field: RecommendationField) => {
    if (typeof document === "undefined") {
      return;
    }

    document.getElementById(fieldIds[field])?.focus();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const nextErrors = validateRecommendationForm({
      name,
      email,
      role,
      institution,
      leadershipContact,
    });

    if (Object.keys(nextErrors).length > 0) {
      captureMarketingEvent("marketing_contact_form_validation_failed", {
        source: SOURCE,
        invalid_fields: Object.keys(nextErrors),
      });
      setErrors(nextErrors);
      setSubmitMessage({
        tone: "error",
        text: "Revê os campos assinalados e tenta novamente.",
      });

      const firstErrorField = (
        [
          "name",
          "email",
          "role",
          "institution",
          "leadershipContact",
        ] as const
      ).find((field) => Boolean(nextErrors[field]));

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
          organization: institution.trim(),
          source: SOURCE,
          message: message.trim(),
          role: role.trim(),
          leadershipContact: leadershipContact.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || "Erro ao enviar o pedido. Tenta novamente."
        );
      }

      const successMessage =
        "Pedido enviado com sucesso. Vamos analisar o contexto e responder o mais depressa possível.";
      captureMarketingEvent("marketing_contact_form_submitted", {
        source: SOURCE,
        has_organization: true,
        has_leadership_contact: true,
        has_context: Boolean(message.trim()),
      });
      toast.success(successMessage);
      setSubmitMessage({ tone: "success", text: successMessage });
      setName("");
      setEmail("");
      setRole("");
      setInstitution("");
      setLeadershipContact("");
      setMessage("");
    } catch (error) {
      console.error("Error submitting institution recommendation:", error);
      captureMarketingEvent("marketing_contact_form_failed", {
        source: SOURCE,
        error_type: getErrorType(error),
      });
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Ocorreu um erro. Tenta novamente mais tarde.";
      toast.error(errorMessage);
      setSubmitMessage({ tone: "error", text: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8faff_0%,#ffffff_32%,#f6f8fc_100%)] text-[color:var(--scooli-ink)]">
      <Container className="py-6 sm:py-8">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center justify-between gap-4">
            <TrackedLink
              href="/"
              eventName="marketing_navigation_clicked"
              eventProperties={{
                location: "institution_recommendation_logo",
                link_label: "home_logo",
              }}
              className="inline-flex rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--scooli-primary)]"
              aria-label="Scooli - Página inicial"
            >
              <Image
                src="/scooli.svg"
                alt="Logótipo Scooli"
                width={92}
                height={30}
                priority
              />
            </TrackedLink>

            <TrackedLink
              href="/escolas"
              eventName="marketing_navigation_clicked"
              eventProperties={{
                location: "institution_recommendation_back_link",
                link_label: "escolas",
              }}
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--scooli-border)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--scooli-muted)] transition hover:border-[color:var(--scooli-primary)] hover:text-[color:var(--scooli-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--scooli-primary)]"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </TrackedLink>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <section className="space-y-6 lg:pt-6">
              <div className="space-y-4">
                <span className="inline-flex w-fit items-center rounded-full border border-[#d9ddff] bg-[color:var(--scooli-accent)] px-4 py-1.5 text-sm font-semibold text-[color:var(--scooli-primary)]">
                  Recomendar a Scooli
                </span>
                <div className="space-y-4">
                  <h1 className="font-display text-4xl leading-tight text-[color:var(--scooli-ink)] sm:text-5xl">
                    Quer que falemos com a sua escola?
                  </h1>
                  <p className="text-lg leading-8 text-[color:var(--scooli-muted)]">
                    Preencha este formulário com o essencial e nós tratamos do
                    próximo passo.
                  </p>
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_-56px_rgba(19,35,58,0.28)]">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Nota importante
                </p>
                <p className="mt-3 text-base leading-8 text-[color:var(--scooli-ink)]">
                  Se avançarmos com um primeiro email para a direção ou
                  coordenação, colocamos o seu email em CC.
                </p>
              </div>
            </section>

            <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_-56px_rgba(19,35,58,0.36)] sm:p-8">
              <form
                onSubmit={handleSubmit}
                noValidate
                aria-busy={isLoading}
                className="space-y-5"
              >
                <p className="text-sm text-[color:var(--scooli-muted)]">
                  Os campos assinalados com * são obrigatórios.
                </p>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor={fieldIds.name}
                      className="flex items-center gap-2 text-sm font-medium text-slate-700"
                    >
                      <User className="h-3.5 w-3.5 text-slate-400" />
                      Nome *
                    </Label>
                    <Input
                      id={fieldIds.name}
                      name="name"
                      type="text"
                      placeholder="O teu nome"
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value);
                        clearFieldError("name");
                      }}
                      maxLength={200}
                      className="h-11 border-slate-200 bg-white focus:border-[#6753FF] focus:ring-[#6753FF]"
                      disabled={isLoading}
                      autoComplete="name"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={getFieldDescribedBy("name")}
                      required
                    />
                    {errors.name && (
                      <p
                        id={getFieldErrorId("name")}
                        className="text-sm text-[color:var(--scooli-error)]"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor={fieldIds.email}
                      className="flex items-center gap-2 text-sm font-medium text-slate-700"
                    >
                      <Mail className="h-3.5 w-3.5 text-slate-400" />
                      Email *
                    </Label>
                    <Input
                      id={fieldIds.email}
                      name="email"
                      type="email"
                      placeholder="o.seu.email@exemplo.com"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        clearFieldError("email");
                      }}
                      className="h-11 border-slate-200 bg-white focus:border-[#6753FF] focus:ring-[#6753FF]"
                      disabled={isLoading}
                      autoComplete="email"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={getFieldDescribedBy("email")}
                      required
                    />
                    {errors.email && (
                      <p
                        id={getFieldErrorId("email")}
                        className="text-sm text-[color:var(--scooli-error)]"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor={fieldIds.role}
                      className="flex items-center gap-2 text-sm font-medium text-slate-700"
                    >
                      <BriefcaseBusiness className="h-3.5 w-3.5 text-slate-400" />
                      Cargo / papel *
                    </Label>
                    <Input
                      id={fieldIds.role}
                      name="role"
                      type="text"
                      placeholder="Professor, coordenação, etc."
                      value={role}
                      onChange={(event) => {
                        setRole(event.target.value);
                        clearFieldError("role");
                      }}
                      maxLength={200}
                      className="h-11 border-slate-200 bg-white focus:border-[#6753FF] focus:ring-[#6753FF]"
                      disabled={isLoading}
                      autoComplete="organization-title"
                      aria-invalid={Boolean(errors.role)}
                      aria-describedby={getFieldDescribedBy("role")}
                      required
                    />
                    {errors.role && (
                      <p
                        id={getFieldErrorId("role")}
                        className="text-sm text-[color:var(--scooli-error)]"
                      >
                        {errors.role}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor={fieldIds.institution}
                      className="flex items-center gap-2 text-sm font-medium text-slate-700"
                    >
                      <Building2 className="h-3.5 w-3.5 text-slate-400" />
                      Escola / instituição *
                    </Label>
                    <Input
                      id={fieldIds.institution}
                      name="institution"
                      type="text"
                      placeholder="Nome da escola, instituição ou agrupamento"
                      value={institution}
                      onChange={(event) => {
                        setInstitution(event.target.value);
                        clearFieldError("institution");
                      }}
                      maxLength={200}
                      className="h-11 border-slate-200 bg-white focus:border-[#6753FF] focus:ring-[#6753FF]"
                      disabled={isLoading}
                      autoComplete="organization"
                      aria-invalid={Boolean(errors.institution)}
                      aria-describedby={getFieldDescribedBy("institution")}
                      required
                    />
                    {errors.institution && (
                      <p
                        id={getFieldErrorId("institution")}
                        className="text-sm text-[color:var(--scooli-error)]"
                      >
                        {errors.institution}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor={fieldIds.leadershipContact}
                    className="flex items-center gap-2 text-sm font-medium text-slate-700"
                  >
                    <Users className="h-3.5 w-3.5 text-slate-400" />
                    Contacto da direção ou coordenação *
                  </Label>
                  <Input
                    id={fieldIds.leadershipContact}
                    name="leadershipContact"
                    type="text"
                    placeholder="Email, telefone ou nome da pessoa"
                    value={leadershipContact}
                    onChange={(event) => {
                      setLeadershipContact(event.target.value);
                      clearFieldError("leadershipContact");
                    }}
                    maxLength={200}
                    className="h-11 border-slate-200 bg-white focus:border-[#6753FF] focus:ring-[#6753FF]"
                    disabled={isLoading}
                    aria-invalid={Boolean(errors.leadershipContact)}
                    aria-describedby={getFieldDescribedBy("leadershipContact")}
                    required
                  />
                  {errors.leadershipContact && (
                    <p
                      id={getFieldErrorId("leadershipContact")}
                      className="text-sm text-[color:var(--scooli-error)]"
                    >
                      {errors.leadershipContact}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor={fieldIds.message}
                    className="text-sm font-medium text-slate-700"
                  >
                    Contexto
                  </Label>
                  <textarea
                    id={fieldIds.message}
                    name="message"
                    placeholder="Explique em poucas linhas porque faz sentido falarmos com esta escola."
                    value={message}
                    onChange={(event) => {
                      setMessage(event.target.value);
                      clearFieldError("message");
                    }}
                    maxLength={2000}
                    className="flex min-h-[160px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-xs placeholder:text-slate-400 focus:border-[#6753FF] focus:outline-none focus:ring-1 focus:ring-[#6753FF] disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={isLoading}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={getFieldDescribedBy("message", fieldIds.ccHint)}
                  />
                  <p id={fieldIds.ccHint} className="text-xs text-slate-500">
                    Usamos o teu email para te responder e para te manter em CC
                    se avançarmos com o contacto.
                  </p>
                  {errors.message && (
                    <p
                      id={getFieldErrorId("message")}
                      className="text-sm text-[color:var(--scooli-error)]"
                    >
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
                        submitMessage.tone === "error"
                          ? "text-[color:var(--scooli-error)]"
                          : "text-emerald-700"
                      )}
                    >
                      {submitMessage.text}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-12 w-full rounded-xl bg-[color:var(--scooli-primary)] text-base font-semibold text-white transition-all duration-200 hover:bg-[color:var(--scooli-primary-strong)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      A enviar...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Enviar pedido
                    </span>
                  )}
                </Button>

                <p className="text-center text-xs text-slate-400">
                  Ao enviar, concorda com a nossa{" "}
                  <Link
                    href="/privacy"
                    className="text-[color:var(--scooli-primary)] underline hover:text-[color:var(--scooli-primary-strong)]"
                  >
                    Política de Privacidade
                  </Link>
                  .
                </p>
              </form>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}
