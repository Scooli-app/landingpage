"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabaseClient";
import { ArrowRight, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

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
      // First, try to insert the email into the preOrderEmails table
      const { error: insertError } = await supabase
        .from("preOrderEmails")
        .insert({ email });

      if (insertError) {
        if (insertError.code === "23505") {
          // Duplicate email error
          toast.error(
            "Este email já está na nossa lista de espera. Verifique a sua caixa de entrada para o email de confirmação."
          );
          setIsLoading(false);
          return;
        } else {
          // Other database errors
          throw insertError;
        }
      }

      const { error: authError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/confirm`,
        },
      });

      if (authError) {
        console.error("Error sending confirmation email:", authError);
        toast.warning(
          "Email registado com sucesso, mas não foi possível enviar o email de confirmação."
        );
      } else {
        toast.success(
          "Obrigado! Verifique o seu email para confirmar a subscrição. Será notificado assim que o Scooli estiver disponível."
        );
      }

      setEmail("");
    } catch (error) {
      console.error("Error in email registration:", error);
      toast.error("Ocorreu um erro. Tente novamente ou utilize outro email.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="mb-20">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-xl">
          <CardContent className="p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Seja o primeiro a saber
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Registe o seu email e seja notificado quando o Scooli estiver
                disponível. Não perca a oportunidade de revolucionar a sua
                experiência de ensino.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="text"
                  placeholder="o.seu.email@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-12 text-lg bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  disabled={isLoading}
                  required
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-12 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      A registar...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Registar
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
