"use client";

import { BookingEmbed } from "@/components/BookingEmbed";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState } from "react";
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
  title,
  description,
}: ContactModalProps) {
  const t = useTranslations("contactModal");
  const tForm = useTranslations("contactForm");
  const resolvedTitle = title ?? t("defaultTitle");
  const resolvedDescription = description ?? t("defaultDescription");
  const formId = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitMessage, setSubmitMessage] = useState<{ tone: "error" | "success"; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // Phones show one panel at a time; from md up both sit side by side.
  const [panel, setPanel] = useState<"book" | "write">("book");
  const previousOpenRef = useRef(open);

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
      setPanel("book");
    }
  }, [open, isLoading]);

  useEffect(() => {
    if (open && !previousOpenRef.current) {
      captureMarketingEvent("marketing_institutional_contact_opened", {
        source,
      });
    }

    previousOpenRef.current = open;
  }, [open, source]);

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
        source,
        invalid_fields: Object.keys(nextErrors),
      });
      setErrors(nextErrors);
      setSubmitMessage({
        tone: "error",
        text: t("validationNotice"),
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
        throw new Error(errorData.error || t("fetchErrorFallback"));
      }

      const successMessage = t("successMessage");
      captureMarketingEvent("marketing_contact_form_submitted", {
        source,
        has_organization: Boolean(organization.trim()),
      });
      toast.success(successMessage);
      setSubmitMessage({ tone: "success", text: successMessage });
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      captureMarketingEvent("marketing_contact_form_failed", {
        source,
        error_type: getErrorType(error),
      });
      const errorMessage =
        error instanceof Error ? error.message : t("genericErrorFallback");
      toast.error(errorMessage);
      setSubmitMessage({ tone: "error", text: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-line-strong bg-white sm:max-w-lg md:max-w-[1040px] md:p-9">
        <DialogHeader className="md:pr-8">
          <DialogTitle className="font-display text-[26px] font-medium leading-tight tracking-[-0.015em] text-ink">
            {resolvedTitle}
          </DialogTitle>
          <DialogDescription className="text-[15px] leading-relaxed text-subtle">{resolvedDescription}</DialogDescription>
        </DialogHeader>

        <div role="tablist" className="grid grid-cols-2 gap-1 rounded-lg bg-stone-soft p-1 md:hidden">
          {(["book", "write"] as const).map((option) => (
            <button
              key={option}
              type="button"
              role="tab"
              aria-selected={panel === option}
              onClick={() => setPanel(option)}
              className={cn(
                "h-9 rounded-md text-sm transition-colors",
                panel === option
                  ? "bg-white font-medium text-ink shadow-[0_1px_2px_rgba(0,0,0,0.06)] ring-1 ring-line-strong"
                  : "text-subtle hover:text-ink",
              )}
            >
              {option === "book" ? t("bookingHeading") : t("writeHeading")}
            </button>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:gap-10">
          <section aria-label={t("bookingHeading")} className={cn(panel !== "book" && "hidden md:block")}>
            <h3 className="mb-3 hidden text-[15px] font-semibold text-ink md:block">{t("bookingHeading")}</h3>
            <BookingEmbed source={source} />
          </section>

          <section aria-label={t("writeHeading")} className={cn(panel !== "write" && "hidden md:block")}>
            <h3 className="mb-3 hidden text-[15px] font-semibold text-ink md:block">{t("writeHeading")}</h3>
            <form onSubmit={handleSubmit} noValidate aria-busy={isLoading} className="space-y-4">
              <p className={hintClass}>{t("requiredNote")}</p>

              <div className="space-y-2">
                <Label htmlFor={fieldIds.name} className={labelClass}>
                  {t("nameLabel")}
                </Label>
                <Input
                  id={fieldIds.name}
                  name="name"
                  type="text"
                  placeholder={t("namePlaceholder")}
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
                  {t("emailLabel")}
                </Label>
                <Input
                  id={fieldIds.email}
                  name="email"
                  type="email"
                  placeholder={t("emailPlaceholder")}
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
                  {t("emailHint")}
                </p>
                {errors.email && (
                  <p id={getFieldErrorId("email")} className={errorClass}>
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor={fieldIds.organization} className={labelClass}>
                  {t("organizationLabel")}
                </Label>
                <Input
                  id={fieldIds.organization}
                  name="organization"
                  type="text"
                  placeholder={t("organizationPlaceholder")}
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  maxLength={200}
             
                  disabled={isLoading}
                  autoComplete="organization"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={fieldIds.message} className={labelClass}>
                  {t("messageLabel")}
                </Label>
                <textarea
                  id={fieldIds.message}
                  name="message"
                  placeholder={t("messagePlaceholder")}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    clearFieldError("message");
                  }}
                  maxLength={2000}
                  className={cn(textareaClass, "min-h-[100px]")}
                  disabled={isLoading}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={getFieldDescribedBy("message", fieldIds.messageHint)}
                  required
                />
                <p id={fieldIds.messageHint} className={hintClass}>
                  {t("messageHint")}
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
                    {t("submittingLabel")}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    {t("submitLabel")}
                  </div>
                )}
              </Button>

              <p className="text-center text-[13px] text-faint">
                {t.rich("consent", {
                  link: (chunks) => (
                    <Link href="/privacy" className="text-violet-ink underline underline-offset-2">
                      {chunks}
                    </Link>
                  ),
                })}
              </p>
            </form>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
