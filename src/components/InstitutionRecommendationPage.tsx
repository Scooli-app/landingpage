"use client";

import { Container } from "@/components/Container";
import { TrackedLink } from "@/components/TrackedLink";
import { Button } from "@/components/ui/button";
import { errorClass, hintClass, Input, labelClass, textareaClass } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { captureMarketingEvent, getErrorType } from "@/lib/analytics";
import { EMAIL_REGEX } from "@/lib/contactForm";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { displayTitle, Kicker } from "@/components/site/primitives";
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
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-white">
      <div className="border-b border-line">
        <Container className="flex h-16 items-center justify-between gap-4">
          <TrackedLink
            href="/"
            eventName="marketing_navigation_clicked"
            eventProperties={{
              location: "institution_recommendation_logo",
              link_label: "home_logo",
            }}
            className="inline-flex rounded-md"
            aria-label={tFooter("homeAria")}
          >
            <Image src="/scooli.svg" alt={tNav("logoAlt")} width={80} height={26} priority />
          </TrackedLink>

          <TrackedLink
            href="/escolas"
            eventName="marketing_navigation_clicked"
            eventProperties={{
              location: "institution_recommendation_back_link",
              link_label: "escolas",
            }}
            className="inline-flex items-center gap-2 text-[14.5px] text-subtle transition-colors hover:text-ink"
          >
            <ArrowLeft aria-hidden className="size-4" strokeWidth={1.75} />
            {t("backLabel")}
          </TrackedLink>
        </Container>
      </div>

      <Container className="py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <section>
            <Kicker>{t("badge")}</Kicker>
            <h1
              className={cn(
                displayTitle,
                "mt-4 text-[clamp(36px,4.4vw,56px)] leading-[1.06] tracking-[-0.03em]",
              )}
            >
              {t("title")}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-subtle">{t("description")}</p>

            <div className="mt-10 border-t border-line pt-6">
              <Kicker>{t("noteLabel")}</Kicker>
              <p className="mt-3 text-[16px] leading-relaxed text-body">{t("noteText")}</p>
            </div>
          </section>

          <section className="self-start rounded-xl border border-line-strong bg-white p-6 sm:p-9">
            <form
              onSubmit={handleSubmit}
              noValidate
              aria-busy={isLoading}
              className="space-y-5"
            >
              <p className={hintClass}>{t("form.requiredNote")}</p>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor={fieldIds.name}
                      className={labelClass}
                    >
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
                     
                      disabled={isLoading}
                      autoComplete="name"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={getFieldDescribedBy("name")}
                      required
                    />
                    {errors.name && (
                      <p
                        id={getFieldErrorId("name")}
                        className={errorClass}
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor={fieldIds.email}
                      className={labelClass}
                    >
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
                     
                      disabled={isLoading}
                      autoComplete="email"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={getFieldDescribedBy("email")}
                      required
                    />
                    {errors.email && (
                      <p
                        id={getFieldErrorId("email")}
                        className={errorClass}
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
                      className={labelClass}
                    >
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
                     
                      disabled={isLoading}
                      autoComplete="organization-title"
                      aria-invalid={Boolean(errors.role)}
                      aria-describedby={getFieldDescribedBy("role")}
                      required
                    />
                    {errors.role && (
                      <p
                        id={getFieldErrorId("role")}
                        className={errorClass}
                      >
                        {errors.role}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor={fieldIds.institution}
                      className={labelClass}
                    >
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
                     
                      disabled={isLoading}
                      autoComplete="organization"
                      aria-invalid={Boolean(errors.institution)}
                      aria-describedby={getFieldDescribedBy("institution")}
                      required
                    />
                    {errors.institution && (
                      <p
                        id={getFieldErrorId("institution")}
                        className={errorClass}
                      >
                        {errors.institution}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor={fieldIds.leadershipContact}
                    className={labelClass}
                  >
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
                   
                    disabled={isLoading}
                    aria-invalid={Boolean(errors.leadershipContact)}
                    aria-describedby={getFieldDescribedBy("leadershipContact")}
                    required
                  />
                  {errors.leadershipContact && (
                    <p
                      id={getFieldErrorId("leadershipContact")}
                      className={errorClass}
                    >
                      {errors.leadershipContact}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor={fieldIds.message}
                    className={labelClass}
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
                    className={cn(textareaClass, "min-h-[160px]")}
                    disabled={isLoading}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={getFieldDescribedBy("message", fieldIds.ccHint)}
                  />
                  <p id={fieldIds.ccHint} className={hintClass}>
                    {t("form.ccHint")}
                  </p>
                  {errors.message && (
                    <p
                      id={getFieldErrorId("message")}
                      className={errorClass}
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
                          ? "text-tag-red-ink"
                          : "text-tag-green-ink"
                      )}
                    >
                      {submitMessage.text}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  size="lg" className="w-full"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {t("form.submittingLabel")}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      {t("form.submitLabel")}
                    </span>
                  )}
                </Button>

                <p className="text-center text-[13px] text-faint">
                  {t.rich("form.consent", {
                    link: (chunks) => (
                      <Link
                        href="/privacy"
                        className="text-violet-ink underline underline-offset-2"
                      >
                        {chunks}
                      </Link>
                    ),
                  })}
                </p>
              </form>
          </section>
        </div>
      </Container>
    </main>
  );
}
