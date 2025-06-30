// @ts-nocheck

export const generateWelcomeEmail = (name: string): string => {
  const displayName = name || 'there';
  return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Welcome Email</title>
      <style>
        /* Ensuring styles cascade properly in most email clients */
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
            Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f7fafc;
          color: #1a202c;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 6px;
          overflow: hidden;
        }
        .header {
          background-color: #3b82f6;
          color: #ffffff;
          text-align: center;
          padding: 24px 16px;
          font-size: 24px;
          font-weight: 600;
        }
        .content {
          padding: 32px 24px;
          line-height: 1.6;
        }
        .button-wrapper {
          text-align: center;
          margin: 32px 0;
        }
        .primary-button {
          background-color: #3b82f6;
          color: #ffffff !important;
          padding: 12px 24px;
          border-radius: 4px;
          text-decoration: none;
          display: inline-block;
          font-weight: 600;
        }
        .footer {
          font-size: 12px;
          color: #718096;
          text-align: center;
          padding: 16px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">Welcome to Our Service! 🎉</div>
        <div class="content">
          <p>Hi ${displayName},</p>
          <p>
            We're thrilled to have you on board. Thank you for reaching out! Below is a
            brief overview of what you can expect from us.
          </p>
          <ul>
            <li>Top-notch support from our friendly team.</li>
            <li>Regular updates and improvements.</li>
            <li>Resources to help you make the most of our platform.</li>
          </ul>
          <div class="button-wrapper">
            <a class="primary-button" href="https://example.com/login" target="_blank" rel="noopener noreferrer">
              Get Started
            </a>
          </div>
          <p>If you have any questions, just reply to this email—we're always happy to help.</p>
          <p>Cheers,<br />The Team</p>
        </div>
        <div class="footer">
          © ${new Date().getFullYear()} Our Service. All rights reserved.
        </div>
      </div>
    </body>
  </html>`;
};