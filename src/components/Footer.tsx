import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Company Info */}
            <div className="text-center md:text-left">
              <Image
                src="/logo-full-blue.png"
                alt="Scooli - Plataforma Educativa para Professores"
                className="mx-auto md:mx-0 mb-4 h-10"
                width={120}
                height={150}
              />
              <p className="text-sm leading-relaxed mb-4">
                A plataforma educativa para professores portugueses de todos os
                níveis de ensino.
              </p>
              <div className="flex justify-center md:justify-start gap-4 text-xs">
                <span className="inline-flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"/>
                  RGPD Compliant
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"/>
                  Made in Portugal
                </span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-center md:text-left">
              <h3 className="text-white font-semibold mb-4">Links Rápidos</h3>
              <nav aria-label="Footer navigation">
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="/"
                      className="text-slate-400 hover:text-slate-300 transition-colors duration-200"
                    >
                      Página Principal
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className="text-slate-400 hover:text-slate-300 transition-colors duration-200"
                    >
                      Política de Privacidade
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="text-slate-400 hover:text-slate-300 transition-colors duration-200"
                    >
                      Termos de Utilização
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cancel"
                      className="text-slate-400 hover:text-slate-300 transition-colors duration-200"
                    >
                      Cancelar Subscrição
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Contact & Legal */}
            <div className="text-center md:text-left">
              <h3 className="text-white font-semibold mb-4">Informações</h3>
              <div className="space-y-2 text-sm">
                <p>Plataforma em desenvolvimento</p>
                <p>Lançamento previsto: 2025</p>
                <p>Suporte: info@scooli.app</p>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-slate-800 pt-6">
            <div className="text-center">
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
                  href="/terms"
                  className="text-slate-400 hover:text-slate-300 underline transition-colors duration-200"
                >
                  Termos de Utilização
                </Link>
                <span className="text-slate-600">•</span>
                <Link
                  href="/privacy"
                  className="text-slate-400 hover:text-slate-300 underline transition-colors duration-200"
                >
                  Política de Privacidade
                </Link>
                <span className="text-slate-600">•</span>
                <span className="text-slate-500">
                  © 2025 Scooli. Todos os direitos reservados.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
