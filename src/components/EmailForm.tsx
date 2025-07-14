"use client";
import { emailTemplate } from "@/assets/email-template";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabaseClient";
import { ArrowRight, Mail, Clock, Gift, Users } from "lucide-react";
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

      try {
        const { error } = await supabase.functions.invoke("send-email", {
          body: {
            to: email,
            subject: "Obrigado por se juntar à Scooli 🎓🚀",
            html: emailTemplate.confirmation,
          },
        });

        if (error) {
          throw error;
        }
        toast.success(
          "Obrigado! O seu email foi registado e receberá um email de confirmação em breve."
        );
      } catch (emailError) {
        console.error("Error sending email:", emailError);
        toast.success(
          "Email registado com sucesso! Não foi possível enviar o email de confirmação, mas será notificado quando a Scooli estiver disponível."
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
    <section className="mb-20" aria-labelledby="email-form-heading">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-xl">
          <CardContent className="p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h2 id="email-form-heading" className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Seja o primeiro a saber
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Registe o seu email e seja notificado quando o Scooli estiver
                disponível. Não perca a oportunidade de revolucionar a sua
                experiência de ensino.
              </p>
              
              {/* Enhanced content for GEO */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>Acesso prioritário</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Gift className="w-4 h-4 text-green-500" />
                  <span>100 créditos gratuitos</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Users className="w-4 h-4 text-purple-500" />
                  <span>Comunidade exclusiva</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" role="form" aria-labelledby="email-form-heading">
              <div className="flex flex-col sm:flex-row gap-4">
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
                    className="h-12 text-lg bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    disabled={isLoading}
                    required
                    aria-describedby="email-help"
                  />
                  <p id="email-help" className="text-xs text-slate-500 mt-1">
                    Receberá notificações sobre o lançamento e dicas exclusivas.
                  </p>
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-12 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
            
            <div className="mt-6 text-center">
              <p className="text-xs text-slate-500">
                Ao registar, concorda com a nossa{" "}
                <a href="/privacy" className="text-blue-600 hover:text-blue-700 underline">
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
