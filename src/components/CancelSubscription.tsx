"use client";
import { emailTemplate } from "@/assets/email-template";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabaseClient";
import type { CancelReason } from "@/types/cancel-reasons";
import { AlertTriangle, ArrowLeft, CheckCircle, Mail } from "lucide-react";
import Link from "next/link";
import { type FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

export function CancelSubscription() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [selectedReason, setSelectedReason] = useState<number>(0);
  const [showDialog, setShowDialog] = useState(false);
  const [reasons, setReasons] = useState<CancelReason[]>([]);
  const [reasonsLoading, setReasonsLoading] = useState(true);

  useEffect(() => {
    async function fetchReasons() {
      setReasonsLoading(true);
      const { data, error } = await supabase
        .from("CancelReasons")
        .select("id,reason,description")
        .order("id", { ascending: true });
      if (!error && data) {
        setReasons(data);
      }
      setReasonsLoading(false);
    }
    fetchReasons();
  }, []);

  const handleCancel = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Por favor, introduza um endereço de email válido.");
      return;
    }

    setShowDialog(true);
  };

  const handleConfirmCancel = async () => {
    setIsLoading(true);
    setShowDialog(false);

    try {
      const { error } = await supabase.functions.invoke("cancel-order", {
        body: {
          email,
          cancelReason: selectedReason,
        },
      });
      if (error) {
        toast.error(
          "Ocorreu um erro ao cancelar a subscrição. É possível que não tenha nenhuma subscrição ativa."
        );
        setIsLoading(false);
        return;
      }

      try {
        const { error: emailError } = await supabase.functions.invoke(
          "send-email",
          {
            body: {
              to: email,
              subject: "Subscrição Cancelada - Scooli",
              html: emailTemplate.cancellation,
            },
          }
        );

        if (emailError) {
          toast.error(
            "Não foi possível enviar o email de confirmação do cancelamento. Mas a subscrição foi cancelada com sucesso."
          );
        } else {
          console.warn("Cancellation email sent successfully");
        }
      } catch {
        toast.error(
          "Não foi possível enviar o email de confirmação do cancelamento. Mas a subscrição foi cancelada com sucesso."
        );
      }

      setIsCancelled(true);
      toast.success("A sua subscrição foi cancelada com sucesso.");
    } catch {
      toast.error(
        "Ocorreu um erro ao cancelar a subscrição. Tente novamente mais tarde."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isCancelled) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-xl">
          <CardContent className="p-8 md:p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Subscrição Cancelada
            </h1>
            <p className="text-slate-600 leading-relaxed mb-8">
              A sua subscrição foi cancelada com sucesso. Não receberá mais
              notificações sobre a Scooli.
            </p>
            <div className="space-y-4">
              <p className="text-sm text-slate-500">
                Se mudou de ideias, pode sempre voltar a subscrever na nossa
                página principal.
              </p>
              <Link href="/">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar à Página Principal
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-slate-600 hover:text-slate-900 transition-colors duration-200 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar à página principal
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Cancelar Subscrição
        </h1>
        <p className="text-slate-600 leading-relaxed">
          Lamentamos vê-lo partir. Pode cancelar a sua subscrição a qualquer
          momento.
        </p>
      </div>

      <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-xl mb-8">
        <CardContent className="p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Confirmar Cancelamento
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Introduza o seu endereço de email para cancelar a subscrição das
              notificações do Scooli.
            </p>
          </div>

          <Alert className="mb-6 border-amber-200 bg-amber-50">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              <strong>Atenção:</strong> Ao cancelar a subscrição, deixará de
              receber todas as notificações sobre o lançamento do Scooli e
              futuras atualizações.
            </AlertDescription>
          </Alert>

          <form onSubmit={handleCancel} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Endereço de Email
              </label>
              <Input
                type="email"
                id="email"
                placeholder="o.seu.email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 text-lg bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500 "
                disabled={isLoading}
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 h-12 border-slate-300 text-slate-700 hover:bg-slate-50 transition-all duration-300 bg-transparent"
                variant="outline"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    A cancelar...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Cancelar Subscrição
                  </div>
                )}
              </Button>
              <Link href="/" className="flex-1">
                <Button
                  type="button"
                  className="flex-1 w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Manter Subscrição
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-white/95 backdrop-blur-sm border-slate-200/50 shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900">
              Confirmar Cancelamento
            </DialogTitle>
            <DialogDescription className="text-slate-600">
              Ajude-nos a melhorar. Qual o motivo principal para cancelar a
              subscrição?
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 my-6">
            {reasonsLoading ? (
              <div className="text-center text-slate-500 py-8">
                A carregar motivos...
              </div>
            ) : (
              reasons.map((reason) => (
                <label
                  key={reason.id}
                  className={`flex items-start space-x-3 p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:bg-slate-50 ${
                    selectedReason === reason.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="reason"
                    value={reason.id}
                    checked={selectedReason === reason.id}
                    onChange={(e) => setSelectedReason(Number(e.target.value))}
                    className="mt-1 w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-slate-900">
                      {reason.reason}
                    </div>
                    <div className="text-sm text-slate-600">
                      {reason.description}
                    </div>
                  </div>
                </label>
              ))
            )}
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleConfirmCancel}
              disabled={!selectedReason || isLoading}
              variant="outline"
              className="border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  A cancelar...
                </div>
              ) : (
                "Confirmar Cancelamento"
              )}
            </Button>
            <Button
              onClick={() => setShowDialog(false)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50"
            >
              Manter Subscrição
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
