"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type EmailContactProps = {
  showLabel?: boolean;
  showIcon?: boolean;
  className?: string;
};

export function EmailContact({
  showLabel = false,
  showIcon = true,
  className = "",
}: EmailContactProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("info@scooli.app");
    setCopied(true);
    toast.success("Email copiado!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
      <button
      type="button"
      onClick={handleCopy}
      aria-label="Copiar email info@scooli.app"
      className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-[color:var(--scooli-ink)] transition-colors duration-200 hover:bg-[color:var(--scooli-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--scooli-primary)] ${className}`}
    >
      {showLabel && <span className="text-[color:var(--scooli-muted)]">Email:</span>}
      <span className="font-medium">info@scooli.app</span>
      {showIcon && (
        copied ? (
          <Check className="h-4 w-4 text-[color:var(--scooli-success)]" />
        ) : (
          <Copy className="h-4 w-4 text-[color:var(--scooli-muted)]" />
        )
      )}
      </button>
  );
}
