"use client";

import { captureMarketingEvent } from "@/lib/analytics";
import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type EmailContactProps = {
  showLabel?: boolean;
  showIcon?: boolean;
  className?: string;
  placement?: string;
};

export function EmailContact({
  showLabel = false,
  showIcon = true,
  className = "",
  placement = "inline_email",
}: EmailContactProps) {
  const [copied, setCopied] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    try {
      if (!navigator.clipboard) {
        throw new Error("Clipboard API unavailable");
      }

      await navigator.clipboard.writeText("info@scooli.app");
      captureMarketingEvent("marketing_email_copied", {
        placement,
      });
      setCopied(true);
      setStatusMessage("Email copiado para a área de transferência.");
      toast.success("Email copiado!");

      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }

      resetTimerRef.current = window.setTimeout(() => {
        setCopied(false);
        setStatusMessage("");
      }, 2000);
    } catch (error) {
      console.error("Error copying email:", error);
      setCopied(false);
      setStatusMessage("Não foi possível copiar o email. Tenta novamente.");
      toast.error("Não foi possível copiar o email.");
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copiar email info@scooli.app"
        title="Copiar info@scooli.app"
        className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-[color:var(--scooli-ink)] transition-colors duration-200 hover:bg-[color:var(--scooli-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--scooli-primary)] ${className}`}
      >
        {showLabel && <span className="text-[color:var(--scooli-muted)]">Email:</span>}
        <span className="font-medium">info@scooli.app</span>
        {showIcon &&
          (copied ? (
            <Check className="h-4 w-4 text-[color:var(--scooli-success)]" />
          ) : (
            <Copy className="h-4 w-4 text-[color:var(--scooli-muted)]" />
          ))}
      </button>
      <span aria-live="polite" className="sr-only">
        {statusMessage}
      </span>
    </>
  );
}
