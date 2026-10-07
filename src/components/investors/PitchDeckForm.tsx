"use client";

import { Button } from "@/components/ui/button";
import { errorClass, hintClass, Input, labelClass, textareaClass } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Locale } from "@/i18n/routing";
import { captureMarketingEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useId, useState } from "react";

type Status = { tone: "success" | "error"; text: string } | null;

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

/**
 * Investors ask for the deck here. It is a contact request like the others
 * (backend /contact notifies info@scooli.app and confirms to the sender), with
 * its own source so the team knows to reply with the deck. `website` is a
 * honeypot: hidden from people, filled by bots.
 */
export function PitchDeckForm() {
  const t = useTranslations("investors.deckForm");
  const locale = useLocale() as Locale;
  const formId = useId();
  const [fields, setFields] = useState({ name: "", email: "", company: "", note: "", website: "" });
  const [invalid, setInvalid] = useState<{ name?: boolean; email?: boolean }>({});
  const [status, setStatus] = useState<Status>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const update = (key: keyof typeof fields) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((current) => ({ ...current, [key]: event.target.value }));
    if (key === "name" || key === "email") {setInvalid((current) => ({ ...current, [key]: false }));}
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const nextInvalid = {
      name: fields.name.trim().length < 2,
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim()),
    };
    if (nextInvalid.name || nextInvalid.email) {
      setInvalid(nextInvalid);
      setStatus({ tone: "error", text: t("errors.invalid") });
      document.getElementById(`${formId}-${nextInvalid.name ? "name" : "email"}`)?.focus();
      return;
    }

    // Bots fill the hidden field; pretend it worked and send nothing.
    if (fields.website) {
      setSent(true);
      setStatus({ tone: "success", text: t("success") });
      return;
    }

    setSending(true);
    setStatus(null);
    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.name.trim(),
          email: fields.email.trim().toLowerCase(),
          organization: fields.company.trim() || null,
          message: fields.note.trim() || t("defaultMessage"),
          source: "investors_pitch_deck",
          locale,
        }),
      });
      if (response.ok) {
        captureMarketingEvent("marketing_pitch_deck_requested", { has_company: Boolean(fields.company.trim()) });
        setSent(true);
        setStatus({ tone: "success", text: t("success") });
        return;
      }
      captureMarketingEvent("marketing_pitch_deck_failed", { status: response.status });
      setStatus({ tone: "error", text: t(response.status === 400 ? "errors.invalid" : "errors.unavailable") });
    } catch {
      captureMarketingEvent("marketing_pitch_deck_failed", { status: 0 });
      setStatus({ tone: "error", text: t("errors.unavailable") });
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate aria-busy={sending} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`${formId}-name`} className={labelClass}>
            {t("nameLabel")}
          </Label>
          <Input
            id={`${formId}-name`}
            autoComplete="name"
            value={fields.name}
            onChange={update("name")}
            maxLength={120}
            aria-invalid={invalid.name}
            disabled={sending || sent}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${formId}-email`} className={labelClass}>
            {t("emailLabel")}
          </Label>
          <Input
            id={`${formId}-email`}
            type="email"
            autoComplete="email"
            value={fields.email}
            onChange={update("email")}
            maxLength={200}
            aria-invalid={invalid.email}
            disabled={sending || sent}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${formId}-company`} className={labelClass}>
          {t("companyLabel")}
        </Label>
        <Input
          id={`${formId}-company`}
          autoComplete="organization"
          value={fields.company}
          onChange={update("company")}
          maxLength={160}
          disabled={sending || sent}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${formId}-note`} className={labelClass}>
          {t("noteLabel")}
        </Label>
        <textarea
          id={`${formId}-note`}
          value={fields.note}
          onChange={update("note")}
          maxLength={2000}
          className={cn(textareaClass, "min-h-[96px]")}
          disabled={sending || sent}
        />
      </div>
      {/* Honeypot: off-screen for people, tempting for bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${formId}-website`}>Website</label>
        <input
          id={`${formId}-website`}
          tabIndex={-1}
          autoComplete="off"
          value={fields.website}
          onChange={update("website")}
        />
      </div>

      <div aria-live="polite" className="min-h-6">
        {status && (
          <p
            role="status"
            className={cn("text-sm", status.tone === "error" ? errorClass : "text-tag-green-ink")}
          >
            {status.text}
          </p>
        )}
      </div>

      <Button type="submit" size="lg" disabled={sending || sent} className="w-full sm:w-auto">
        {sending ? (
          <span className="flex items-center gap-2">
            <Loader2 aria-hidden className="size-4 animate-spin" />
            {t("sending")}
          </span>
        ) : (
          t("submit")
        )}
      </Button>
      <p className={hintClass}>{t("privacy")}</p>
    </form>
  );
}
