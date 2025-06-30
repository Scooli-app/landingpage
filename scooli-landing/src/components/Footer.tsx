export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Scooli</h3>
          <p className="text-sm leading-relaxed mb-6">
            A plataforma educativa para professores portugueses de todos os
            níveis de ensino.
          </p>
          <div className="border-t border-slate-800 pt-6">
            <p className="text-xs text-slate-500">
              Os seus dados pessoais são tratados de acordo com o Regulamento
              Geral sobre a Proteção de Dados (RGPD). Ao registar o seu email,
              consente que o contactemos sobre o lançamento do Scooli. Pode
              cancelar a subscrição a qualquer momento.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
