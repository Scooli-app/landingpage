"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const waitlistSchema = z.object({
  email: z.string().email("Introduza um email válido"),
  nome: z.string().optional(),
});

type FormValues = z.infer<typeof waitlistSchema>;

type WaitlistFormProps = {
  compact?: boolean;
};

export function WaitlistForm({ compact = false }: WaitlistFormProps) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState<string>("");
  const prefersReducedMotion = useReducedMotion();

  const form = useForm<FormValues>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: { email: "", nome: "" },
  });

  const onSubmit = async (values: FormValues) => {
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Ocorreu um erro. Tente novamente.");
      }

      form.reset();
      setStatus("success");
      setMessage(
        "Obrigado! Recebeu lugar na lista prioritária. Vamos avisar assim que estiver pronto."
      );
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível guardar o seu pedido. Tente mais tarde."
      );
    }
  };

  const formContent = (
    <div
      className={cn(
        "flex w-full flex-col gap-3 rounded-2xl border border-[color:var(--scooli-border)] bg-white/80 p-3 shadow-sm backdrop-blur",
        compact
          ? "md:flex-row md:items-end md:justify-center md:gap-2"
          : "md:flex-row md:items-end md:justify-center md:gap-3"
      )}
    >
      <div className="flex-1 space-y-2">
        <label
          htmlFor="email"
          className="text-xs font-semibold uppercase tracking-wide text-[color:var(--scooli-muted)]"
        >
          Email escolar
        </label>
        <div className="flex gap-2 items-center">
          <Input
            id="email"
            type="email"
            placeholder="prof.silva@escola.pt"
            {...form.register("email")}
            aria-invalid={!!form.formState.errors.email}
            className="h-12 flex-1 rounded-xl bg-[color:var(--scooli-surface-alt)] text-[color:var(--scooli-ink)] placeholder:text-[color:var(--scooli-muted)] focus-visible:ring-[color:var(--scooli-primary)]"
          />
          <Button
            type="submit"
            disabled={status === "loading"}
            className="h-12 rounded-xl bg-[color:var(--scooli-primary)] text-white hover:bg-[color:var(--scooli-primary-strong)]"
          >
            {status === "loading" ? "A guardar..." : "Acesso prioritário"}
          </Button>
        </div>
        {form.formState.errors.email && (
          <p className="text-xs text-[color:var(--scooli-error)]">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <form
      id="waitlist"
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full max-w-3xl"
    >
      {prefersReducedMotion ? (
        formContent
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {formContent}
        </motion.div>
      )}
      <div
        role="status"
        aria-live="polite"
        className="mt-3 min-h-[20px] text-sm"
      >
        {status === "success" && (
          <span className="text-[color:var(--scooli-success)]">{message}</span>
        )}
        {status === "error" && (
          <span className="text-[color:var(--scooli-error)]">{message}</span>
        )}
      </div>
    </form>
  );
}
