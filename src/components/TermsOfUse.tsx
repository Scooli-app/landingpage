"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  Coins,
  FileText,
  Gavel,
  Mail,
  Scale,
  Shield,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState, type ReactNode } from "react";

type Language = "pt" | "en";

function LanguageToggle({
  value,
  onChange,
}: {
  value: Language;
  onChange: (next: Language) => void;
}) {
  const baseBtn =
    "px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#6753FF]";

  return (
    <div
      className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white/80 p-1 backdrop-blur-sm"
      role="tablist"
      aria-label="Language"
    >
      <button
        type="button"
        role="tab"
        aria-selected={value === "pt"}
        className={`${baseBtn} ${
          value === "pt"
            ? "bg-[#6753FF] text-white"
            : "text-slate-700 hover:bg-white"
        }`}
        onClick={() => onChange("pt")}
      >
        Português
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={value === "en"}
        className={`${baseBtn} ${
          value === "en"
            ? "bg-[#6753FF] text-white"
            : "text-slate-700 hover:bg-white"
        }`}
        onClick={() => onChange("en")}
      >
        English
      </button>
    </div>
  );
}

function SectionCard({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <Card className="border-slate-200/50 bg-white/80 shadow-lg backdrop-blur-sm">
      <CardContent className="p-8">
        <div className="flex items-start gap-4">
          <div className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600">
            {icon}
          </div>
          <div className="flex-1">
            <h2 className="mb-3 text-xl font-bold text-slate-900">{title}</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              {children}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function TermsOfUse() {
  const [language, setLanguage] = useState<Language>("pt");
  const lastUpdated = "5 de Janeiro de 2026";
  const lastUpdatedEn = "January 5, 2026";

  return (
    <div className="mx-auto w-full max-w-4xl">
      {/* Header */}
      <div className="mb-12 text-center">
        <div>
          <Link
            href="/"
            className="mb-8 inline-flex items-center text-slate-600 transition-colors duration-200 hover:text-slate-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar à página principal
          </Link>
        </div>

        <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600">
          <FileText className="h-8 w-8 text-white" />
        </div>

        <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
          Termos de Utilização
        </h1>
        {language === "pt" ? (
          <p className="mx-auto max-w-2xl text-slate-600 leading-relaxed">
            Estes Termos regulam o acesso e utilização do website e (quando
            disponível) da aplicação Scooli, incluindo funcionalidades de
            geração de conteúdos e componentes comunitários.
          </p>
        ) : (
          <p className="mx-auto max-w-2xl text-slate-600 leading-relaxed">
            These Terms govern access to and use of the Scooli website and (when
            available) the Scooli app, including AI content generation and
            community features.
          </p>
        )}

        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm text-slate-600 backdrop-blur-sm">
          <Calendar className="h-4 w-4" />
          {language === "pt"
            ? `Última atualização: ${lastUpdated}`
            : `Last updated: ${lastUpdatedEn}`}
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <LanguageToggle value={language} onChange={setLanguage} />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-8">
        {language === "pt" ? (
          <>
            <SectionCard
              icon={<Shield className="h-6 w-6 text-white" />}
              title="1) Aceitação dos Termos"
            >
            <p>
              Ao aceder ou utilizar a Scooli, concorda com estes Termos. Se não
              concordar, não deve utilizar o serviço.
            </p>
            <p>
              Estes Termos aplicam-se ao website, a eventuais versões beta e à
              aplicação Scooli, bem como a funcionalidades associadas (por
              exemplo, biblioteca comunitária).
            </p>
          </SectionCard>

            <SectionCard
              icon={<Users className="h-6 w-6 text-white" />}
              title="2) O Serviço e Contas"
            >
          <p>
            A Scooli é um produto de tecnologia educativa para apoiar professores
            em Portugal na criação e organização de recursos pedagógicos.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Poderá ser necessário criar uma conta para aceder a determinadas
              funcionalidades.
            </li>
            <li>
              Deve fornecer informação verdadeira e manter os seus dados
              atualizados.
            </li>
            <li>
              É responsável pela confidencialidade das suas credenciais e por
              qualquer atividade realizada na sua conta.
            </li>
          </ul>
        </SectionCard>

            <SectionCard
              icon={<AlertTriangle className="h-6 w-6 text-white" />}
              title="3) Uso Aceitável"
            >
          <p>Compromete-se a não:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Usar o serviço para fins ilegais, fraudulentos ou abusivos.</li>
            <li>
              Carregar, gerar, partilhar ou solicitar conteúdos que violem
              direitos de terceiros (ex.: direitos de autor, privacidade).
            </li>
            <li>
              Tentar contornar limites de segurança, explorar vulnerabilidades
              ou interferir com o funcionamento do serviço.
            </li>
            <li>
              Partilhar dados pessoais de alunos (ou outros menores) sem base
              legal e consentimentos aplicáveis.
            </li>
          </ul>
        </SectionCard>

            <SectionCard
              icon={<FileText className="h-6 w-6 text-white" />}
              title="4) Conteúdos do Utilizador e Biblioteca Comunitária"
            >
          <p>
            Se o serviço permitir carregar ou partilhar recursos, é responsável
            por garantir que tem direitos para o fazer.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Ao submeter conteúdos para áreas comunitárias, concede à Scooli uma
              licença não exclusiva para alojar, reproduzir e disponibilizar esse
              conteúdo no âmbito do serviço.
            </li>
            <li>
              Poderemos moderar, remover ou restringir conteúdos que violem estes
              Termos, a lei ou padrões de qualidade/segurança da comunidade.
            </li>
          </ul>
        </SectionCard>

            <SectionCard
              icon={<Shield className="h-6 w-6 text-white" />}
              title="5) Conteúdo Gerado por IA"
            >
          <p>
            A Scooli pode gerar sugestões e materiais através de inteligência
            artificial. Estes resultados podem conter imprecisões.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Deve rever e validar todo o conteúdo antes de o utilizar em sala de
              aula, avaliações ou comunicações oficiais.
            </li>
            <li>
              A Scooli não garante a exatidão, adequação curricular ou ausência
              de erros nos conteúdos gerados.
            </li>
          </ul>
        </SectionCard>

            <SectionCard
              icon={<Coins className="h-6 w-6 text-white" />}
              title="6) Créditos, Plano Pro e Cancelamentos"
            >
              <p>
                Algumas funcionalidades podem depender de créditos, planos pagos ou
                condições promocionais (ex.: pacote de boas-vindas).
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  Créditos não têm valor monetário, não são transferíveis e podem
                  estar sujeitos a expiração e alterações de regras.
                </li>
                <li>
                  Preços, funcionalidades e limites podem ser atualizados ao longo
                  do tempo.
                </li>
                <li>
                  O acesso &ldquo;ilimitado&rdquo; do Plano Pro está sujeito à
                  Política de Uso Justo descrita na secção 7.
                </li>
                <li>
                  Para gestão/cancelamento de subscrição, consulte{" "}
                  <Link
                    href="/cancelar-subscricao"
                    className="underline transition-colors duration-200 hover:text-slate-900"
                  >
                    Cancelar Subscrição
                  </Link>
                  .
                </li>
              </ul>
            </SectionCard>

            <SectionCard
              icon={<Scale className="h-6 w-6 text-white" />}
              title="7) Política de Uso Justo (Fair Use)"
            >
              <p>
                O Plano Pro da Scooli oferece capacidade de geração de conteúdos
                de forma ilimitada para fins de uso pessoal e profissional do
                docente subscritor.
              </p>
              <p>
                Para garantir a estabilidade da plataforma e a qualidade do
                serviço para todos os utilizadores, a Scooli aplica uma{" "}
                <strong>Política de Uso Justo</strong>. Esta política destina-se
                a evitar utilizações abusivas, automáticas ou não-humanas que
                coloquem em causa a integridade do sistema.
              </p>

              <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
                <p className="font-semibold text-amber-800 mb-2">
                  Considera-se uso abusivo:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-700">
                  <li>A partilha de credenciais de acesso com terceiros;</li>
                  <li>
                    A utilização de scripts, bots ou qualquer forma de automação
                    para geração massiva de conteúdos;
                  </li>
                  <li>
                    A utilização da conta por múltiplos utilizadores em
                    simultâneo;
                  </li>
                  <li>
                    Qualquer outra forma de utilização que exceda manifestamente
                    o padrão de uso individual humano.
                  </li>
                </ul>
              </div>

              <p className="mt-4">
                Caso o volume de utilização de um utilizador exceda
                manifestamente a média expectável para um uso individual humano
                num período de 30 dias, a Scooli reserva-se o direito de:
              </p>
              <ul className="list-[lower-alpha] list-inside space-y-2 ml-4">
                <li>
                  Ajustar temporariamente a velocidade de processamento ou o
                  modelo de IA utilizado;
                </li>
                <li>
                  Contactar o utilizador para validar a conformidade da
                  utilização;
                </li>
                <li>
                  Suspender temporariamente o acesso em casos extremos de
                  violação técnica;
                </li>
                <li>
                  Rescindir a subscrição em caso de violação reiterada ou grave,
                  com devolução proporcional do valor não utilizado.
                </li>
              </ul>
              <p className="mt-4 text-sm text-slate-500">
                A aplicação desta política será sempre proporcional e precedida,
                sempre que possível, de contacto com o utilizador para
                esclarecimento.
              </p>
            </SectionCard>

            <SectionCard
              icon={<Gavel className="h-6 w-6 text-white" />}
              title="8) Propriedade Intelectual, Responsabilidade e Lei Aplicável"
            >
          <ul className="list-disc list-inside space-y-2">
            <li>
              A Scooli (incluindo marca, software e design) é protegida por
              direitos de propriedade intelectual.
            </li>
            <li>
              O serviço é fornecido “tal como está” e pode estar sujeito a
              indisponibilidades, especialmente em fases beta.
            </li>
            <li>
              Na medida permitida por lei, a Scooli não será responsável por
              perdas indiretas ou consequenciais decorrentes do uso do serviço.
            </li>
            <li>
              Estes Termos regem-se pela lei portuguesa, sem prejuízo de normas
              imperativas aplicáveis.
            </li>
          </ul>
          <p>
            Para privacidade e dados pessoais, consulte a{" "}
            <Link
              href="/privacy"
              className="underline transition-colors duration-200 hover:text-slate-900"
            >
              Política de Privacidade
            </Link>
            .
          </p>
        </SectionCard>

            <SectionCard
              icon={<Mail className="h-6 w-6 text-white" />}
              title="9) Contacto"
            >
              <p>
                Para questões sobre estes Termos, contacte-nos em{" "}
                <a
                  href="mailto:info@scooli.app"
                  className="underline transition-colors duration-200 hover:text-slate-900"
                >
                  info@scooli.app
                </a>
                .
              </p>
            </SectionCard>
          </>
        ) : (
          <>
            <SectionCard
              icon={<Shield className="h-6 w-6 text-white" />}
              title="1) Acceptance of Terms"
            >
            <p>
              By accessing or using Scooli, you agree to these Terms. If you do
              not agree, do not use the service.
            </p>
            <p>
              These Terms apply to the website, any beta versions, and the Scooli
              app (when available), including associated features (such as a
              community library).
            </p>
          </SectionCard>

            <SectionCard
              icon={<Users className="h-6 w-6 text-white" />}
              title="2) The Service and Accounts"
            >
          <p>
            Scooli is an education technology product designed to help teachers
            in Portugal create and organize teaching resources.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              You may need an account to access certain features.
            </li>
            <li>
              You must provide accurate information and keep it up to date.
            </li>
            <li>
              You are responsible for safeguarding your credentials and all
              activity under your account.
            </li>
          </ul>
        </SectionCard>

            <SectionCard
              icon={<AlertTriangle className="h-6 w-6 text-white" />}
              title="3) Acceptable Use"
            >
          <p>You agree not to:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Use the service for unlawful, fraudulent, or abusive purposes.</li>
            <li>
              Upload, generate, share, or request content that infringes third
              party rights (e.g., copyright, privacy).
            </li>
            <li>
              Attempt to bypass security controls, exploit vulnerabilities, or
              disrupt the service.
            </li>
            <li>
              Share students’ personal data (or other minors’ data) without a
              valid legal basis and required consents.
            </li>
          </ul>
        </SectionCard>

            <SectionCard
              icon={<FileText className="h-6 w-6 text-white" />}
              title="4) User Content and Community Library"
            >
          <p>
            If the service allows you to upload or share resources, you are
            responsible for ensuring you have the rights to do so.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              By submitting content to community areas, you grant Scooli a
              non-exclusive license to host, reproduce, and make that content
              available within the service.
            </li>
            <li>
              We may moderate, remove, or restrict content that violates these
              Terms, applicable law, or community quality/safety standards.
            </li>
          </ul>
        </SectionCard>

            <SectionCard
              icon={<Shield className="h-6 w-6 text-white" />}
              title="5) AI-Generated Content"
            >
          <p>
            Scooli may generate suggestions and materials using artificial
            intelligence. Outputs may contain inaccuracies.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              You must review and validate all content before using it in class,
              assessments, or official communications.
            </li>
            <li>
              Scooli does not guarantee accuracy, curriculum alignment, or
              error-free outputs.
            </li>
          </ul>
        </SectionCard>

            <SectionCard
              icon={<Coins className="h-6 w-6 text-white" />}
              title="6) Credits, Pro Plan and Cancellations"
            >
              <p>
                Some features may depend on credits, paid plans, or promotional
                conditions (e.g., a welcome package).
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  Credits have no cash value, are non-transferable, and may be
                  subject to expiration and rule changes.
                </li>
                <li>
                  Pricing, features, and limits may change over time.
                </li>
                <li>
                  &ldquo;Unlimited&rdquo; access under the Pro Plan is subject
                  to the Fair Use Policy described in section 7.
                </li>
                <li>
                  For subscription management/cancellation, see{" "}
                  <Link
                    href="/cancelar-subscricao"
                    className="underline transition-colors duration-200 hover:text-slate-900"
                  >
                    Cancel Subscription
                  </Link>
                  .
                </li>
              </ul>
            </SectionCard>

            <SectionCard
              icon={<Scale className="h-6 w-6 text-white" />}
              title="7) Fair Use Policy"
            >
              <p>
                The Scooli Pro Plan offers unlimited content generation capacity
                for personal and professional use by the subscribing teacher.
              </p>
              <p>
                To ensure platform stability and service quality for all users,
                Scooli applies a <strong>Fair Use Policy</strong>. This policy
                is designed to prevent abusive, automatic, or non-human use that
                compromises system integrity.
              </p>

              <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
                <p className="font-semibold text-amber-800 mb-2">
                  The following constitutes abusive use:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-700">
                  <li>Sharing login credentials with third parties;</li>
                  <li>
                    Using scripts, bots, or any form of automation for mass
                    content generation;
                  </li>
                  <li>Using the account by multiple users simultaneously;</li>
                  <li>
                    Any other form of use that manifestly exceeds the pattern of
                    individual human use.
                  </li>
                </ul>
              </div>

              <p className="mt-4">
                If a user&apos;s usage volume manifestly exceeds the expected
                average for individual human use within a 30-day period, Scooli
                reserves the right to:
              </p>
              <ul className="list-[lower-alpha] list-inside space-y-2 ml-4">
                <li>
                  Temporarily adjust processing speed or the AI model used;
                </li>
                <li>Contact the user to validate usage compliance;</li>
                <li>
                  Temporarily suspend access in extreme cases of technical
                  violation;
                </li>
                <li>
                  Terminate the subscription in case of repeated or serious
                  violation, with proportional refund of unused value.
                </li>
              </ul>
              <p className="mt-4 text-sm text-slate-500">
                Application of this policy will always be proportionate and
                preceded, whenever possible, by contact with the user for
                clarification.
              </p>
            </SectionCard>

            <SectionCard
              icon={<Gavel className="h-6 w-6 text-white" />}
              title="8) Intellectual Property, Liability and Governing Law"
            >
          <ul className="list-disc list-inside space-y-2">
            <li>
              Scooli (including brand, software, and design) is protected by
              intellectual property laws.
            </li>
            <li>
              The service is provided “as is” and may experience downtime,
              especially during beta phases.
            </li>
            <li>
              To the extent permitted by law, Scooli is not liable for indirect
              or consequential losses arising from use of the service.
            </li>
            <li>
              These Terms are governed by Portuguese law, without prejudice to
              mandatory consumer protection rules where applicable.
            </li>
          </ul>
          <p>
            For personal data and privacy, see the{" "}
            <Link
              href="/privacy"
              className="underline transition-colors duration-200 hover:text-slate-900"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </SectionCard>

            <SectionCard
              icon={<Mail className="h-6 w-6 text-white" />}
              title="9) Contact"
            >
              <p>
                If you have questions about these Terms, contact us at{" "}
                <a
                  href="mailto:info@scooli.app"
                  className="underline transition-colors duration-200 hover:text-slate-900"
                >
                  info@scooli.app
                </a>
                .
              </p>
            </SectionCard>
          </>
        )}
      </div>
    </div>
  );
}


