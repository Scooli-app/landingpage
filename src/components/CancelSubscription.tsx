"use client";

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
import type { CancelReason } from "@/types/cancel-reasons";
import { AlertTriangle, ArrowLeft, CheckCircle, Mail } from "lucide-react";
import Link from "next/link";
import { type FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

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
      try {
        const response = await fetch(`${API_URL}/subscriptions/cancel-reasons`);
        if (!response.ok) {
          throw new Error("Failed to fetch cancel reasons");
        }
        const data = await response.json();
        if (data && Array.isArray(data)) {
          setReasons(data);
        }
      } catch (error) {
        console.error("Error fetching cancel reasons:", error);
        // Fallback reasons if API fails
        setReasons([
          { id: 1, reason: "Não utilizo o suficiente", description: "Não tenho tempo ou necessidade de usar a plataforma regularmente." },
          { id: 2, reason: "Demasiado caro", description: "O preço não se adequa ao meu orçamento atual." },
          { id: 3, reason: "Encontrei alternativa melhor", description: "Estou a usar outra ferramenta que me serve melhor." },
          { id: 4, reason: "Funcionalidades limitadas", description: "A plataforma não tem as funcionalidades que preciso." },
          { id: 5, reason: "Outro motivo", description: "Prefiro não especificar ou tenho outro motivo." },
        ]);
      } finally {
        setReasonsLoading(false);
      }
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
      const response = await fetch(`${API_URL}/subscriptions/cancel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          cancelReasonId: selectedReason,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to cancel subscription");
      }

      setIsCancelled(true);
      toast.success("A sua subscrição foi cancelada com sucesso.");
    } catch (error) {
      console.error("Error cancelling subscription:", error);
      toast.error(
        "Ocorreu um erro ao cancelar a subscrição. É possível que não tenha nenhuma subscrição ativa."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isCancelled) {
    return (
      <div className="mx-auto max-w-2xl">
        <Card className="border-slate-200/50 bg-white/80 shadow-xl backdrop-blur-sm">
          <CardContent className="p-8 text-center md:p-12">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h1 className="mb-4 text-2xl font-bold text-slate-900 md:text-3xl">
              Subscrição Cancelada
            </h1>
            <p className="mb-8 leading-relaxed text-slate-600">
              A sua subscrição foi cancelada com sucesso. Receberá um email de
              confirmação em breve.
            </p>
            <div className="space-y-4">
              <p className="text-sm text-slate-500">
                Se mudou de ideias, pode sempre voltar a subscrever na nossa
                página de preços.
              </p>
              <Link href="/#precos">
                <Button className="bg-gradient-to-r from-[#6753FF] to-[#4E3BC0] font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Ver Planos
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 text-center">
        <Link
          href="/"
          className="mb-6 inline-flex items-center text-slate-600 transition-colors duration-200 hover:text-slate-900"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar à página principal
        </Link>
        <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
          Cancelar Subscrição
        </h1>
        <p className="leading-relaxed text-slate-600">
          Lamentamos vê-lo partir. Pode cancelar a sua subscrição a qualquer
          momento.
        </p>
      </div>

      <Card className="mb-8 border-slate-200/50 bg-white/80 shadow-xl backdrop-blur-sm">
        <CardContent className="p-8 md:p-12">
          <div className="mb-8 text-center">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600">
              <AlertTriangle className="h-8 w-8 text-white" />
            </div>
            <h2 className="mb-4 text-2xl font-bold text-slate-900 md:text-3xl">
              Confirmar Cancelamento
            </h2>
            <p className="leading-relaxed text-slate-600">
              Introduza o seu endereço de email para cancelar a sua subscrição
              do Scooli Pro.
            </p>
          </div>

          <Alert className="mb-6 border-amber-200 bg-amber-50">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              <strong>Atenção:</strong> Ao cancelar, perderá acesso às
              funcionalidades Pro no final do período de faturação atual.
              Manterá acesso ao plano gratuito com 100 créditos.
            </AlertDescription>
          </Alert>

          <form onSubmit={handleCancel} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Endereço de Email
              </label>
              <Input
                type="email"
                id="email"
                placeholder="o.seu.email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 border-slate-300 bg-white text-lg focus:border-[#6753FF] focus:ring-[#6753FF]"
                disabled={isLoading}
                required
              />
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                type="submit"
                disabled={isLoading}
                className="h-12 flex-1 border-slate-300 bg-transparent text-slate-700 transition-all duration-300 hover:bg-slate-50"
                variant="outline"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    A cancelar...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Cancelar Subscrição
                  </div>
                )}
              </Button>
              <Link href="/" className="flex-1">
                <Button
                  type="button"
                  className="h-12 w-full flex-1 bg-gradient-to-r from-[#6753FF] to-[#4E3BC0] font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Manter Subscrição
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="border-slate-200/50 bg-white/95 shadow-xl backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900">
              Confirmar Cancelamento
            </DialogTitle>
            <DialogDescription className="text-slate-600">
              Ajude-nos a melhorar. Qual o motivo principal para cancelar a
              subscrição?
            </DialogDescription>
          </DialogHeader>

          <div className="my-6 space-y-3">
            {reasonsLoading ? (
              <div className="py-8 text-center text-slate-500">
                A carregar motivos...
              </div>
            ) : (
              reasons.map((reason) => (
                <label
                  key={reason.id}
                  className={`flex cursor-pointer items-start space-x-3 rounded-lg border p-3 transition-all duration-200 hover:bg-slate-50 ${
                    selectedReason === reason.id
                      ? "border-[#6753FF] bg-[#6753FF]/5"
                      : "border-slate-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="reason"
                    value={reason.id}
                    checked={selectedReason === reason.id}
                    onChange={(e) => setSelectedReason(Number(e.target.value))}
                    className="mt-1 h-4 w-4 border-slate-300 text-[#6753FF] focus:ring-[#6753FF]"
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

          <DialogFooter className="flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={handleConfirmCancel}
              disabled={!selectedReason || isLoading}
              variant="outline"
              className="border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  A cancelar...
                </div>
              ) : (
                "Confirmar Cancelamento"
              )}
            </Button>
            <Button
              onClick={() => setShowDialog(false)}
              className="bg-gradient-to-r from-[#6753FF] to-[#4E3BC0] font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50"
            >
              Manter Subscrição
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
