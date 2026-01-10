"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, Clock, Gift, Mail, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export function EmailForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Por favor, introduza um endereço de email válido.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/waitlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        if (response.status === 409) {
          // Duplicate email
          toast.error(
            "Este email já está na nossa lista de espera. Verifique a sua caixa de entrada para o email de confirmação."
          );
          setIsLoading(false);
          return;
        }

        throw new Error(errorData.message || "Failed to register email");
      }

      toast.success(
        "Obrigado! O seu email foi registado e receberá um email de confirmação em breve."
      );
      setEmail("");
    } catch (error) {
      console.error("Error in email registration:", error);
      toast.error("Ocorreu um erro. Tente novamente ou utilize outro email.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="mb-20" aria-labelledby="email-form-heading">
      <div className="mx-auto max-w-2xl">
        <Card className="border-slate-200/50 bg-white/80 shadow-xl backdrop-blur-sm">
          <CardContent className="p-8 md:p-12">
            <div className="mb-8 text-center">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6753FF] to-[#4E3BC0]">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h2
                id="email-form-heading"
                className="mb-4 text-2xl font-bold text-slate-900 md:text-3xl"
              >
                Seja o primeiro a saber
              </h2>
              <p className="mb-6 leading-relaxed text-slate-600">
                Registe o seu email e seja notificado quando o Scooli estiver
                disponível. Não perca a oportunidade de revolucionar a sua
                experiência de ensino.
              </p>

              {/* Enhanced content for GEO */}
              <div className="mb-8 grid gap-4 md:grid-cols-3">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Clock className="h-4 w-4 text-[#6753FF]" />
                  <span>Acesso prioritário</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Gift className="h-4 w-4 text-green-500" />
                  <span>100 créditos gratuitos</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Users className="h-4 w-4 text-purple-500" />
                  <span>Comunidade exclusiva</span>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              role="form"
              aria-labelledby="email-form-heading"
            >
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1">
                  <label htmlFor="email-input" className="sr-only">
                    Endereço de email
                  </label>
                  <Input
                    type="email"
                    id="email-input"
                    placeholder="o.seu.email@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 border-slate-300 bg-white text-lg focus:border-[#6753FF] focus:ring-[#6753FF]"
                    disabled={isLoading}
                    required
                    aria-describedby="email-help"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-12 bg-gradient-to-r from-[#6753FF] to-[#4E3BC0] px-8 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      A registar...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Registar
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-slate-500">
                Ao registar, concorda com a nossa{" "}
                <a
                  href="/privacy"
                  className="text-[#6753FF] underline hover:text-[#4E3BC0]"
                >
                  Política de Privacidade
                </a>
                . Pode cancelar a subscrição a qualquer momento.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
