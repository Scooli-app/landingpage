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
    errors.name = "Indica o teu nome para sabermos como responder.";
  }

  if (!values.email.trim()) {
    errors.email = "Indica um email para podermos entrar em contacto.";
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = "Introduz um endereço de email válido.";
  }

  if (!values.message.trim()) {
    errors.message = "Escreve uma mensagem com o que precisas.";
  }

  return errors;
}

export function getFirstContactErrorField(errors: ContactErrors): ContactField | null {
  const fields: ContactField[] = ["name", "email", "message"];

  return fields.find((field) => Boolean(errors[field])) ?? null;
}
