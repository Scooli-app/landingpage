import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Image
            src="/logo-full-blue.png"
            alt="Scooli logo"
            className="mx-auto mb-4 h-10"
            width={120}
            height={150}
          />
          <p className="text-sm leading-relaxed mb-6">
            A plataforma educativa para professores portugueses de todos os
            níveis de ensino.
          </p>
          <div className="border-t border-slate-800 pt-6">
            <p className="text-xs text-slate-500 mb-4">
              Os seus dados pessoais são tratados de acordo com o Regulamento
              Geral sobre a Proteção de Dados (RGPD). Ao registar o seu email,
              consente que o contactemos sobre o lançamento da Scooli. Pode
              cancelar a subscrição a qualquer momento.
            </p>
            <div className="flex justify-center gap-4 text-xs">
              <Link
                href="/cancel"
                className="text-slate-400 hover:text-slate-300 underline transition-colors duration-200"
              >
                Cancelar subscrição
              </Link>
              <span className="text-slate-600">•</span>
              <Link
                href="/privacy"
                className="text-slate-400 hover:text-slate-300 underline transition-colors duration-200"
              >
                Política de Privacidade
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
