"use client";

import { cn } from "@/lib/utils";
import { Landmark } from "lucide-react";
import { useTranslations } from "next-intl";

/**
 * The honest, non-alarming statement of what Scooli is actually aligned to.
 *
 * Scooli generates against the Portuguese national curriculum regardless of the
 * reader's language, so every page that claims curriculum alignment should say
 * which curriculum. In Portuguese that is self-evident and the note would be
 * noise, so `curriculum.note` is simply absent from `messages/pt-PT.json` and
 * this renders nothing. When Scooli supports another country's curriculum, this
 * is one message key to rewrite — not a component to hunt down.
 */
export function CurriculumNote({ className }: { className?: string }) {
  const t = useTranslations("curriculum");

  if (!t.has("note")) {
    return null;
  }

  return (
    <p
      className={cn(
        "flex items-start gap-2.5 rounded-[20px] border border-[#d9ddff] bg-[color:var(--scooli-surface-alt)] px-4 py-3 text-sm leading-6 text-[color:var(--scooli-ink-soft)]",
        className,
      )}
    >
      <Landmark
        className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--scooli-primary)]"
        aria-hidden="true"
      />
      <span>{t("note")}</span>
    </p>
  );
}
