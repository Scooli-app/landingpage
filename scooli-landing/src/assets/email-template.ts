export const emailTemplate = `
<!DOCTYPE html>
<html lang="pt-PT">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bem-vindo à Scooli</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; color: #374151; background-color: #f8fafc; margin: 0; padding: 0; }
      .email-container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1); }
      .header { background: linear-gradient(135deg, #2c6ecb 0%, #57d1b0 100%); padding: 40px 30px; text-align: center; color: white; }
      .logo { font-size: 32px; font-weight: 700; margin-bottom: 8px; letter-spacing: -0.5px; }
      .tagline { font-size: 16px; opacity: 0.9; font-weight: 500; }
      .content { padding: 40px 30px; }
      .greeting { font-size: 24px; font-weight: 600; color: #2c6ecb; margin-bottom: 20px; }
      .message { font-size: 16px; line-height: 1.7; margin-bottom: 30px; color: #4b5563; }
      .benefits { background: linear-gradient(135deg, #e6f0fb 0%, #f1f5f9 100%); border-radius: 12px; padding: 30px; margin: 30px 0; }
      .benefits-title { font-size: 20px; font-weight: 600; color: #2c6ecb; margin-bottom: 20px; text-align: center; }
      .benefits-grid { width: 100%; text-align: center; }
      .benefit-item { display: inline-block; text-align: center; width: 150px; margin: 0 10px 20px 10px; vertical-align: top; }
      .benefit-icon { width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 12px; text-align: center; line-height: 60px; font-size: 24px; font-weight: 700; color: white; }
      .benefit-icon.mint { background: #57d1b0; }
      .benefit-icon.blue { background: #2c6ecb; }
      .benefit-icon.orange { background: #ffa759; }
      .benefit-text { font-size: 14px; font-weight: 600; color: #374151; }
      .footer { background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0; }
      .footer-text { font-size: 14px; color: #6b7280; margin-bottom: 10px; }
      .social-links { margin: 20px 0; }
      .social-link { display: inline-block; margin: 0 10px; color: #2c6ecb; text-decoration: none; font-size: 14px; font-weight: 500; }
      .unsubscribe { font-size: 12px; color: #9ca3af; margin-top: 20px; }
      .unsubscribe a { color: #2c6ecb; text-decoration: none; }
      @media only screen and (max-width: 600px) { .email-container { margin: 10px; border-radius: 12px; } .header, .content, .footer { padding: 30px 20px; } .benefits { padding: 20px; } .greeting { font-size: 20px; } .logo { font-size: 28px; } }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <div class="logo">Scooli</div>
        <div class="tagline">A Scooli ajuda. Você ensina.</div>
      </div>
      <div class="content">
        <div class="greeting">Bem-vindo à Scooli! 🎓</div>
        <div class="message">
          Olá,<br /><br />
          Obrigado por se juntar à nossa lista de espera! Estamos entusiasmados por contar consigo nesta jornada para otimizar o seu trabalho diário.<br /><br />
          A Scooli está a ser desenvolvida especialmente para professores portugueses de todos os níveis de ensino, com o objetivo de simplificar o seu trabalho diário e potenciar a qualidade do ensino.
        </div>
        <div class="benefits">
          <div class="benefits-title">O que pode esperar da Scooli:</div>
          <div class="benefits-grid">
            <div class="benefit-item">
              <div class="benefit-icon mint">⏱️</div>
              <div class="benefit-text">Mais Tempo Para Si</div>
            </div>
            <div class="benefit-item">
              <div class="benefit-icon blue">✨</div>
              <div class="benefit-text">Mais Qualidade Para os Alunos</div>
            </div>
            <div class="benefit-item">
              <div class="benefit-icon orange">🎯</div>
              <div class="benefit-text">Uma Ferramenta Simples e Intuitiva</div>
            </div>
          </div>
        </div>
        <div class="message">
          Será notificado assim que a plataforma estiver disponível. Entretanto, pode seguir o nosso progresso e receber dicas exclusivas nas nossas redes sociais.<br /><br />
          Obrigado por acreditar em nós e na nossa missão!<br /><br />
          Com os melhores cumprimentos,<br />
          <strong>Equipa Scooli</strong>
        </div>
      </div>
      <div class="footer">
        <div class="footer-text">
          <strong>Scooli</strong> - Plataforma Educativa para Professores Portugueses
        </div>
        <div class="social-links">
          <a href="https://scooli.app" class="social-link">Website</a>
          <!-- <a href="#" class="social-link">LinkedIn</a> -->
          <!-- <a href="#" class="social-link">Facebook</a> -->
        </div>
        <div class="unsubscribe">
          Os seus dados são tratados com confidencialidade.<br />
          <a href="https://scooli.app/cancel">Cancelar subscrição</a> | <a href="https://scooli.app/privacy">Política de Privacidade</a>
        </div>
      </div>
    </div>
  </body>
</html>`;
