"use client";

import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import {
  Building2,
  Clock,
  Loader2,
  Mail,
  MessageSquare,
  Send,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (!EMAIL_REGEX.test(email.trim())) {
      toast.error("Por favor, introduza um endereço de email válido.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          message: message.trim(),
          organization: organization.trim() || null,
          source: "contact_page",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || "Erro ao enviar a mensagem. Tente novamente."
        );
      }

      toast.success(
        "Mensagem enviada com sucesso! Receberá um email de confirmação em breve."
      );
      setName("");
      setEmail("");
      setOrganization("");
      setMessage("");
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Ocorreu um erro. Tente novamente mais tarde."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="contacto"
      className="bg-gradient-to-b from-white to-slate-50 py-20 md:py-28"
    >
      <Container>
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left side — Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col justify-center"
            >
              <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-[#6753FF]/10 px-4 py-1.5 text-sm font-medium text-[#6753FF]">
                <MessageSquare className="h-4 w-4" />
                Contacto
              </span>
              <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
                Tem alguma questão?
              </h2>
              <p className="mb-8 text-lg text-slate-600">
                Estamos aqui para ajudar. Entre em contacto connosco e a nossa
                equipa responderá o mais brevemente possível.
              </p>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-[#6753FF]/10 p-3">
                    <Mail className="h-5 w-5 text-[#6753FF]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Email</h3>
                    <p className="text-slate-600">info@scooli.app</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-green-100 p-3">
                    <Clock className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Tempo de resposta
                    </h3>
                    <p className="text-slate-600">24 a 48 horas úteis</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-amber-100 p-3">
                    <Building2 className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Escolas e instituições
                    </h3>
                    <p className="text-slate-600">
                      Planos personalizados para a sua instituição — fale
                      connosco!
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right side — Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg md:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label
                      htmlFor="section-contact-name"
                      className="flex items-center gap-2 text-sm font-medium text-slate-700"
                    >
                      <User className="h-3.5 w-3.5 text-slate-400" />
                      Nome *
                    </Label>
                    <Input
                      id="section-contact-name"
                      type="text"
                      placeholder="O seu nome"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      maxLength={200}
                      className="h-11 border-slate-200 bg-white focus:border-[#6753FF] focus:ring-[#6753FF]"
                      disabled={isLoading}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="section-contact-email"
                      className="flex items-center gap-2 text-sm font-medium text-slate-700"
                    >
                      <Mail className="h-3.5 w-3.5 text-slate-400" />
                      Email *
                    </Label>
                    <Input
                      id="section-contact-email"
                      type="email"
                      placeholder="o.seu.email@exemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11 border-slate-200 bg-white focus:border-[#6753FF] focus:ring-[#6753FF]"
                      disabled={isLoading}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="section-contact-org"
                      className="flex items-center gap-2 text-sm font-medium text-slate-700"
                    >
                      <Building2 className="h-3.5 w-3.5 text-slate-400" />
                      Organização / Escola
                    </Label>
                    <Input
                      id="section-contact-org"
                      type="text"
                      placeholder="Nome da sua instituição (opcional)"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      maxLength={200}
                      className="h-11 border-slate-200 bg-white focus:border-[#6753FF] focus:ring-[#6753FF]"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="section-contact-message"
                      className="text-sm font-medium text-slate-700"
                    >
                      Mensagem *
                    </Label>
                    <textarea
                      id="section-contact-message"
                      placeholder="Como podemos ajudar?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      maxLength={2000}
                      className="flex min-h-[120px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-xs placeholder:text-slate-400 focus:border-[#6753FF] focus:outline-none focus:ring-1 focus:ring-[#6753FF] disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={isLoading}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="h-12 w-full rounded-xl bg-gradient-to-r from-[#6753FF] to-[#4E3BC0] text-base font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-[#6753FF]/25 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        A enviar...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Enviar mensagem
                      </div>
                    )}
                  </Button>

                  <p className="text-center text-xs text-slate-400">
                    Ao enviar, concorda com a nossa{" "}
                    <a
                      href="/privacy"
                      className="text-[#6753FF] underline hover:text-[#4E3BC0]"
                    >
                      Política de Privacidade
                    </a>
                    .
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
