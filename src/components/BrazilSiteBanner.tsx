"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { isLocalized } from "@/i18n/localizationStatus";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useState, type ComponentProps } from "react";

// Offered on pt-PT pages only, never an automatic redirect. Every storage read
// is guarded: the page must render when cookies or localStorage throw.
const DISMISSED_KEY = "scooli_br_banner_dismissed";

function shouldShow(): boolean {
  try {
    if (localStorage.getItem(DISMISSED_KEY) === "1") {return false;}
  } catch {
    // storage blocked: treat as not dismissed
  }
  try {
    return /(?:^|; )(?:scooli_country=BR|NEXT_LOCALE=pt-BR)(?:;|$)/.test(document.cookie);
  } catch {
    return false;
  }
}

export function BrazilSiteBanner() {
  const t = useTranslations("brazilBanner");
  const pathname = usePathname();
  const params = useParams();
  // Start hidden and reveal after mount so SSR and client markup match.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(shouldShow());
  }, []);

  if (!visible) {
    return null;
  }

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(DISMISSED_KEY, "1");
    } catch {
      // non-fatal: the banner reappears on the next load
    }
  };

  const href = isLocalized(pathname, "pt-BR")
    ? ({ pathname, params } as unknown as ComponentProps<typeof Link>["href"])
    : "/";

  return (
    <div className="flex items-center justify-center gap-3 border-b border-line bg-stone-soft px-4 py-2 text-sm text-ink">
      <p>
        {t("text")}{" "}
        <Link
          href={href}
          locale="pt-BR"
          className="font-medium underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          {t("cta")}
        </Link>
      </p>
      <button
        type="button"
        onClick={dismiss}
        aria-label={t("dismiss")}
        className="rounded-md p-1 hover:bg-line focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <X className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}
