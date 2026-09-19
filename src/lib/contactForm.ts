export type ContactField = "name" | "email" | "message";

export type ContactErrors = Partial<Record<ContactField, string>>;

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(values: {
  name: string;
  email: string;
  message: string;
}): ContactErrors {
  const errors: ContactErrors = {};

  if (!values.name.trim()) {
    errors.name = "Indique o seu nome para sabermos como responder.";
  }

  if (!values.email.trim()) {
    errors.email = "Indique um email para podermos entrar em contacto.";
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = "Introduza um endereço de email válido.";
  }

  if (!values.message.trim()) {
    errors.message = "Escreva uma mensagem com o que precisa.";
  }

  return errors;
}

export function getFirstContactErrorField(errors: ContactErrors): ContactField | null {
  const fields: ContactField[] = ["name", "email", "message"];

  return fields.find((field) => Boolean(errors[field])) ?? null;
}
