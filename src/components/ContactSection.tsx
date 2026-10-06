"use client";

import { Container } from "@/components/Container";
import { EmailContact } from "@/components/EmailContact";
import { Button } from "@/components/ui/button";
import { errorClass, hintClass, Input, labelClass, textareaClass } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  captureMarketingEvent,
  getErrorType,
} from "@/lib/analytics";
import { getFirstContactErrorField, type ContactErrors, type ContactField, validateContactForm } from "@/lib/contactForm";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { Loader2 } from "lucide-react";
import { displayTitle, Kicker } from "@/components/site/primitives";
import { useTranslations } from "next-intl";
import { useId, useState } from "react";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export function ContactSection() {
  const t = useTranslations("contact");
  const tForm = useTranslations("contactForm");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors = validateContactForm(
      { name, email, message },
      {
        nameRequired: tForm("nameRequired"),
        emailRequired: tForm("emailRequired"),
        emailInvalid: tForm("emailInvalid"),
        messageRequired: tForm("messageRequired"),
      },
    );

    if (Object.keys(nextErrors).length > 0) {
      captureMarketingEvent("marketing_contact_form_validation_failed", {
        source: "contact_page",
        invalid_fields: Object.keys(nextErrors),
      });
      setErrors(nextErrors);
      setSubmitMessage({
        tone: "error",
        text: t("form.validationNotice"),
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
          source: "contact_page",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || t("form.fetchErrorFallback"));
      }

      const successMessage = t("form.successMessage");
      captureMarketingEvent("marketing_contact_form_submitted", {
        source: "contact_page",
        has_organization: Boolean(organization.trim()),
      });
      toast.success(successMessage);
      setSubmitMessage({ tone: "success", text: successMessage });
      setName("");
      setEmail("");
      setOrganization("");
      setMessage("");
    } catch (error) {
      console.error("Error submitting contact form:", error);
      captureMarketingEvent("marketing_contact_form_failed", {
        source: "contact_page",
        error_type: getErrorType(error),
      });
      const errorMessage =
        error instanceof Error ? error.message : t("form.genericErrorFallback");
      toast.error(errorMessage);
      setSubmitMessage({ tone: "error", text: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="pb-[88px] pt-14 md:pb-32 md:pt-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <Kicker>{t("badge")}</Kicker>
            <h1
              className={cn(
                displayTitle,
                "mt-4 text-[clamp(40px,5vw,64px)] leading-[1.04] tracking-[-0.03em]",
              )}
            >
              {t("title")}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-subtle md:text-[19px]">{t("description")}</p>

            <dl className="mt-10 border-t border-line">
              <div className="border-b border-line py-5">
                <dt className="text-[15px] font-semibold text-ink">{t("cards.email.title")}</dt>
                <dd className="mt-1 text-[15px] text-subtle">{t("cards.email.subtitle")}</dd>
                <dd className="mt-2">
                  <EmailContact
                    showIcon
                    showLabel={false}
                    placement="contact_page_email_card"
                    className="-ml-3 text-[15px]"
                  />
                </dd>
              </div>
              <div className="border-b border-line py-5">
                <dt className="text-[15px] font-semibold text-ink">{t("cards.responseTime.title")}</dt>
                <dd className="mt-1 text-[15px] text-subtle">{t("cards.responseTime.subtitle")}</dd>
              </div>
              <div className="border-b border-line py-5">
                <dt className="text-[15px] font-semibold text-ink">{t("cards.institutions.title")}</dt>
                <dd className="mt-1 text-[15px] text-subtle">{t("cards.institutions.subtitle")}</dd>
              </div>
            </dl>
          </div>

          <div className="self-start rounded-xl border border-line-strong bg-white p-6 sm:p-9">
            <form onSubmit={handleSubmit} noValidate aria-busy={isLoading} className="space-y-5">
              <p className={hintClass}>{t("form.requiredNote")}</p>

              <div className="space-y-2">
                <Label htmlFor={fieldIds.name} className={labelClass}>
                  {t("form.nameLabel")}
                </Label>
                <Input
                  id={fieldIds.name}
                  name="name"
                  type="text"
                  placeholder={t("form.namePlaceholder")}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
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
                  <p id={getFieldErrorId("name")} className={errorClass}>
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor={fieldIds.email} className={labelClass}>
                  {t("form.emailLabel")}
                </Label>
                <Input
                  id={fieldIds.email}
                  name="email"
                  type="email"
                  placeholder={t("form.emailPlaceholder")}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    clearFieldError("email");
                  }}
                 
                  disabled={isLoading}
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={getFieldDescribedBy("email", fieldIds.emailHint)}
                  required
                />
                <p id={fieldIds.emailHint} className={hintClass}>
                  {t("form.emailHint")}
                </p>
                {errors.email && (
                  <p id={getFieldErrorId("email")} className={errorClass}>
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor={fieldIds.organization} className={labelClass}>
                  {t("form.organizationLabel")}
                </Label>
                <Input
                  id={fieldIds.organization}
                  name="organization"
                  type="text"
                  placeholder={t("form.organizationPlaceholder")}
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  maxLength={200}
                 
                  disabled={isLoading}
                  autoComplete="organization"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={fieldIds.message} className={labelClass}>
                  {t("form.messageLabel")}
                </Label>
                <textarea
                  id={fieldIds.message}
                  name="message"
                  placeholder={t("form.messagePlaceholder")}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    clearFieldError("message");
                  }}
                  maxLength={2000}
                  className={cn(textareaClass, "min-h-[140px]")}
                  disabled={isLoading}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={getFieldDescribedBy("message", fieldIds.messageHint)}
                  required
                />
                <p id={fieldIds.messageHint} className={hintClass}>
                  {t("form.messageHint")}
                </p>
                {errors.message && (
                  <p id={getFieldErrorId("message")} className={errorClass}>
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
                      submitMessage.tone === "error" ? "text-tag-red-ink" : "text-tag-green-ink"
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
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t("form.submittingLabel")}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    {t("form.submitLabel")}
                  </div>
                )}
              </Button>

              <p className="text-center text-[13px] text-faint">
                {t.rich("form.consent", {
                  link: (chunks) => (
                    <Link href="/privacy" className="text-violet-ink underline underline-offset-2">
                      {chunks}
                    </Link>
                  ),
                })}
              </p>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
