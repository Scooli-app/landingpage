"use client";

import { ContactModal } from "@/components/ContactModal";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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
  title = "Fale com a equipa",
  description = "Partilhe o contexto da sua escola ou instituição e entraremos em contacto para perceber o melhor próximo passo.",
  label = "Falar com a equipa",
  className,
}: InstitutionalContactButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        onClick={() => setOpen(true)}
        className={className}
      >
        {label}
        <ArrowRight className="h-4 w-4" />
      </Button>

      <ContactModal
        open={open}
        onOpenChange={setOpen}
        source={source}
        title={title}
        description={description}
      />
    </>
  );
}
