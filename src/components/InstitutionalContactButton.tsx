"use client";

import { ContactModal } from "@/components/ContactModal";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface InstitutionalContactButtonProps {
  source: string;
  title?: string;
  description?: string;
  label?: string;
  className?: string;
}

export function InstitutionalContactButton({
  source,
  title,
  description,
  label,
  className,
}: InstitutionalContactButtonProps) {
  const t = useTranslations("institutionalContactButton");
  const [open, setOpen] = useState(false);
  const resolvedTitle = title ?? t("defaultTitle");
  const resolvedDescription = description ?? t("defaultDescription");
  const resolvedLabel = label ?? t("defaultLabel");

  return (
    <>
      <Button
        type="button"
        onClick={() => setOpen(true)}
        className={className}
      >
        {resolvedLabel}
        <ArrowRight className="h-4 w-4" />
      </Button>

      <ContactModal
        open={open}
        onOpenChange={setOpen}
        source={source}
        title={resolvedTitle}
        description={resolvedDescription}
      />
    </>
  );
}
