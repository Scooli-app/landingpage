"use client";

import { Container } from "@/components/Container";
import { TrackedLink } from "@/components/TrackedLink";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { captureMarketingEvent, getErrorType } from "@/lib/analytics";
import { EMAIL_REGEX } from "@/lib/contactForm";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
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
import { useTranslations } from "next-intl";
import Image from "next/image";
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


type RecommendationFormErrorMessages = {
  name: string;
  emailRequired: string;
  emailInvalid: string;
  role: string;
  institution: string;
  leadershipContact: string;
};

function validateRecommendationForm(
  values: {
    name: string;
    email: string;
    role: string;
    institution: string;
    leadershipContact: string;
  },
  messages: RecommendationFormErrorMessages,
): RecommendationErrors {
  const errors: RecommendationErrors = {};

  if (!values.name.trim()) {
    errors.name = messages.name;
  }

  if (!values.email.trim()) {
    errors.email = messages.emailRequired;
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = messages.emailInvalid;
  }

  if (!values.role.trim()) {
    errors.role = messages.role;
  }

  if (!values.institution.trim()) {
    errors.institution = messages.institution;
  }

  if (!values.leadershipContact.trim()) {
    errors.leadershipContact = messages.leadershipContact;
  }

  return errors;
}

export function InstitutionRecommendationPage() {
  const t = useTranslations("recommendInstitution");
  const tNav = useTranslations("nav");
  const tFooter = useTranslations("footer");
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

    const nextErrors = validateRecommendationForm(
      {
        name,
        email,
        role,
        institution,
        leadershipContact,
      },
      {
        name: t("form.errors.name"),
        emailRequired: t("form.errors.emailRequired"),
        emailInvalid: t("form.errors.emailInvalid"),
        role: t("form.errors.role"),
        institution: t("form.errors.institution"),
        leadershipContact: t("form.errors.leadershipContact"),
      },
    );

    if (Object.keys(nextErrors).length > 0) {
      captureMarketingEvent("marketing_contact_form_validation_failed", {
        source: SOURCE,
        invalid_fields: Object.keys(nextErrors),
      });
      setErrors(nextErrors);
      setSubmitMessage({
        tone: "error",
        text: t("form.validationNotice"),
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
          errorData.error || t("form.fetchErrorFallback")
        );
      }

      const successMessage = t("form.successMessage");
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
          : t("form.genericErrorFallback");
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
              aria-label={tFooter("homeAria")}
            >
              <Image
                src="/scooli.svg"
                alt={tNav("logoAlt")}
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
              {t("backLabel")}
            </TrackedLink>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <section className="space-y-6 lg:pt-6">
              <div className="space-y-4">
                <span className="inline-flex w-fit items-center rounded-full border border-[#d9ddff] bg-[color:var(--scooli-accent)] px-4 py-1.5 text-sm font-semibold text-[color:var(--scooli-primary)]">
                  {t("badge")}
                </span>
                <div className="space-y-4">
                  <h1 className="font-display text-4xl leading-tight text-[color:var(--scooli-ink)] sm:text-5xl">
                    {t("title")}
                  </h1>
                  <p className="text-lg leading-8 text-[color:var(--scooli-muted)]">
                    {t("description")}
                  </p>
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_-56px_rgba(19,35,58,0.28)]">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {t("noteLabel")}
                </p>
                <p className="mt-3 text-base leading-8 text-[color:var(--scooli-ink)]">
                  {t("noteText")}
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
                  {t("form.requiredNote")}
                </p>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor={fieldIds.name}
                      className="flex items-center gap-2 text-sm font-medium text-slate-700"
                    >
                      <User className="h-3.5 w-3.5 text-slate-400" />
                      {t("form.nameLabel")}
                    </Label>
                    <Input
                      id={fieldIds.name}
                      name="name"
                      type="text"
                      placeholder={t("form.namePlaceholder")}
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
                      {t("form.emailLabel")}
                    </Label>
                    <Input
                      id={fieldIds.email}
                      name="email"
                      type="email"
                      placeholder={t("form.emailPlaceholder")}
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
                      {t("form.roleLabel")}
                    </Label>
                    <Input
                      id={fieldIds.role}
                      name="role"
                      type="text"
                      placeholder={t("form.rolePlaceholder")}
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
                      {t("form.institutionLabel")}
                    </Label>
                    <Input
                      id={fieldIds.institution}
                      name="institution"
                      type="text"
                      placeholder={t("form.institutionPlaceholder")}
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
                    {t("form.leadershipContactLabel")}
                  </Label>
                  <Input
                    id={fieldIds.leadershipContact}
                    name="leadershipContact"
                    type="text"
                    placeholder={t("form.leadershipContactPlaceholder")}
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
                    {t("form.messageLabel")}
                  </Label>
                  <textarea
                    id={fieldIds.message}
                    name="message"
                    placeholder={t("form.messagePlaceholder")}
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
                    {t("form.ccHint")}
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
                      {t("form.submittingLabel")}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      {t("form.submitLabel")}
                    </span>
                  )}
                </Button>

                <p className="text-center text-xs text-slate-400">
                  {t.rich("form.consent", {
                    link: (chunks) => (
                      <Link
                        href="/privacy"
                        className="text-[color:var(--scooli-primary)] underline hover:text-[color:var(--scooli-primary-strong)]"
                      >
                        {chunks}
                      </Link>
                    ),
                  })}
                </p>
              </form>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}
