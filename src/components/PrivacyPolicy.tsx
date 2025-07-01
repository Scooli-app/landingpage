"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Calendar,
  Database,
  Eye,
  FileText,
  Mail,
  Shield,
  UserCheck,
} from "lucide-react";
import Link from "next/link";
import { EmailContact } from "./EmailContact";

export function PrivacyPolicy() {
  const lastUpdated = "30 de Junho de 2025";

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div>
          <Link
            href="/"
            className="inline-flex items-center text-slate-600 hover:text-slate-900 transition-colors duration-200 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar à página principal
          </Link>
        </div>

        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6">
          <Shield className="w-8 h-8 text-white" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Política de Privacidade
        </h1>
        <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto">
          A sua privacidade é importante para nós. Esta política explica como
          recolhemos, utilizamos e protegemos os seus dados pessoais.
        </p>

        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-slate-600 border border-slate-200 mt-4">
          <Calendar className="w-4 h-4" />
          Última atualização: {lastUpdated}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-8">
        {/* Introduction */}
        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex-shrink-0">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-3">
                  Introdução
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  A Scooli (&quot;nós&quot;, &quot;nosso&quot; ou
                  &quot;nossa&quot;) respeita a sua privacidade e está
                  comprometido em proteger os seus dados pessoais. Esta Política
                  de Privacidade informa-o sobre como recolhemos, utilizamos,
                  divulgamos e protegemos as suas informações quando utiliza o
                  nosso serviço, em conformidade com o Regulamento Geral sobre a
                  Proteção de Dados (RGPD).
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Collection */}
        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex-shrink-0">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-slate-900 mb-3">
                  Dados que Recolhemos
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">
                      Dados Fornecidos por Si
                    </h3>
                    <ul className="list-disc list-inside text-slate-600 space-y-1">
                      <li>
                        Endereço de email (quando se regista para receber
                        notificações)
                      </li>
                      <li>
                        Informações de contacto que nos forneça voluntariamente
                      </li>
                      <li>Feedback e comunicações que nos envie</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">
                      Dados Recolhidos Automaticamente
                    </h3>
                    <ul className="list-disc list-inside text-slate-600 space-y-1">
                      <li>
                        Dados de utilização do website (páginas visitadas, tempo
                        de permanência)
                      </li>
                      <li>Cookies e tecnologias similares</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How We Use Data */}
        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex-shrink-0">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-slate-900 mb-3">
                  Como Utilizamos os Seus Dados
                </h2>
                <p className="text-slate-600 mb-4">
                  Utilizamos os seus dados pessoais para os seguintes fins:
                </p>
                <ul className="list-disc list-inside text-slate-600 space-y-2">
                  <li>
                    Enviar notificações sobre o lançamento da Scooli e
                    atualizações importantes
                  </li>
                  <li>
                    Melhorar e personalizar a sua experiência no nosso website
                  </li>
                  <li>Responder às suas perguntas e pedidos de suporte</li>
                  <li>
                    Analisar o uso do website para melhorar os nossos serviços
                  </li>
                  <li>Cumprir obrigações legais e regulamentares</li>
                  <li>Proteger os nossos direitos e prevenir fraudes</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Legal Basis */}
        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex-shrink-0">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-slate-900 mb-3">
                  Base Legal para o Tratamento
                </h2>
                <p className="text-slate-600 mb-4">
                  Tratamos os seus dados pessoais com base nas seguintes bases
                  legais:
                </p>
                <ul className="list-disc list-inside text-slate-600 space-y-2">
                  <li>
                    <strong>Consentimento:</strong> Quando nos dá consentimento
                    explícito para processar os seus dados
                  </li>
                  <li>
                    <strong>Interesses legítimos:</strong> Para melhorar os
                    nossos serviços e comunicar consigo
                  </li>
                  <li>
                    <strong>Cumprimento legal:</strong> Quando necessário para
                    cumprir obrigações legais
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Sharing */}
        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex-shrink-0">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-slate-900 mb-3">
                  Partilha de Dados
                </h2>
                <p className="text-slate-600 mb-4">
                  Não vendemos, alugamos ou partilhamos os seus dados pessoais
                  com terceiros para fins comerciais. Podemos partilhar os seus
                  dados apenas nas seguintes circunstâncias:
                </p>
                <ul className="list-disc list-inside text-slate-600 space-y-2">
                  <li>
                    Com fornecedores de serviços que nos ajudam a operar o
                    website (ex: serviços de email)
                  </li>
                  <li>Quando exigido por lei ou por autoridades competentes</li>
                  <li>
                    Para proteger os nossos direitos, propriedade ou segurança
                  </li>
                  <li>Com o seu consentimento explícito</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Your Rights */}
        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-slate-900 mb-3">
                  Os Seus Direitos
                </h2>
                <p className="text-slate-600 mb-4">
                  Ao abrigo do RGPD, tem os seguintes direitos:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="list-disc list-inside text-slate-600 space-y-2">
                    <li>
                      <strong>Acesso:</strong> Solicitar cópias dos seus dados
                      pessoais
                    </li>
                    <li>
                      <strong>Retificação:</strong> Corrigir dados incorretos ou
                      incompletos
                    </li>
                    <li>
                      <strong>Apagamento:</strong> Solicitar a eliminação dos
                      seus dados
                    </li>
                    <li>
                      <strong>Limitação:</strong> Restringir o processamento dos
                      seus dados
                    </li>
                  </ul>
                  <ul className="list-disc list-inside text-slate-600 space-y-2">
                    <li>
                      <strong>Portabilidade:</strong> Transferir os seus dados
                      para outro serviço
                    </li>
                    <li>
                      <strong>Oposição:</strong> Opor-se ao processamento dos
                      seus dados
                    </li>
                    <li>
                      <strong>Retirar consentimento:</strong> A qualquer momento
                    </li>
                    <li>
                      <strong>Apresentar queixa:</strong> À autoridade de
                      proteção de dados
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Security */}
        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-slate-900 mb-3">
                  Segurança dos Dados
                </h2>
                <p className="text-slate-600 mb-4">
                  Implementamos medidas técnicas e organizacionais adequadas
                  para proteger os seus dados pessoais contra:
                </p>
                <ul className="list-disc list-inside text-slate-600 space-y-2">
                  <li>Acesso não autorizado ou ilegal</li>
                  <li>Perda, destruição ou danos acidentais</li>
                  <li>Alteração, divulgação ou processamento não autorizado</li>
                </ul>
                <p className="text-slate-600 mt-4">
                  Utilizamos encriptação SSL/TLS para proteger a transmissão de
                  dados e armazenamos as informações em servidores seguros com
                  acesso restrito.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Retention */}
        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex-shrink-0">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-slate-900 mb-3">
                  Retenção de Dados
                </h2>
                <p className="text-slate-600 mb-4">
                  Conservamos os seus dados pessoais apenas pelo tempo
                  necessário para cumprir os fins para os quais foram
                  recolhidos:
                </p>
                <ul className="list-disc list-inside text-slate-600 space-y-2">
                  <li>
                    Dados de subscrição: Até cancelar a subscrição ou solicitar
                    a eliminação
                  </li>
                  <li>Dados de contacto: Até 3 anos após o último contacto</li>
                  <li>Dados de utilização: Até 2 anos para fins analíticos</li>
                  <li>Dados legais: Conforme exigido por lei</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg">
          <CardContent className="p-8">
            <div className="text-center">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Contacte-nos
              </h2>
              <p className="text-slate-600 mb-6">
                Se tiver questões sobre esta Política de Privacidade ou quiser
                exercer os seus direitos, pode contactar-nos através de:
              </p>
              <EmailContact />
              <p className="text-sm text-slate-500 mt-6">
                Responderemos ao seu pedido no prazo de 30 dias, conforme
                exigido pelo RGPD.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
