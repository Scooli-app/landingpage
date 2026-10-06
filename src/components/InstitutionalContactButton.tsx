"use client";

import { ContactModal } from "@/components/ContactModal";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useState, type ComponentProps } from "react";

type ButtonProps = ComponentProps<typeof Button>;

interface InstitutionalContactButtonProps {
  source: string;
  title?: string;
  description?: string;
  label?: string;
  className?: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
}

/** Opens the institutional contact form ("Pedir demonstração" for schools). */
export function InstitutionalContactButton({
  source,
  title,
  description,
  label,
  className,
  variant = "primary",
  size = "lg",
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
        variant={variant}
        size={size}
        onClick={() => setOpen(true)}
        className={className}
      >
        {resolvedLabel}
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
