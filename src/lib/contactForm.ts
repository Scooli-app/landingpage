export type ContactField = "name" | "email" | "message";

export type ContactErrors = Partial<Record<ContactField, string>>;

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactFormErrorMessages = {
  nameRequired: string;
  emailRequired: string;
  emailInvalid: string;
  messageRequired: string;
};

/**
 * Messages come from the `contactForm` namespace (see `messages/*.json`) and
 * are passed in by the caller — this module has no React/next-intl context of
 * its own, and is shared by both the /contacto page and the ContactModal.
 */
export function validateContactForm(
  values: {
    name: string;
    email: string;
    message: string;
  },
  messages: ContactFormErrorMessages,
): ContactErrors {
  const errors: ContactErrors = {};

  if (!values.name.trim()) {
    errors.name = messages.nameRequired;
  }

  if (!values.email.trim()) {
    errors.email = messages.emailRequired;
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = messages.emailInvalid;
  }

  if (!values.message.trim()) {
    errors.message = messages.messageRequired;
  }

  return errors;
}

export function getFirstContactErrorField(errors: ContactErrors): ContactField | null {
  const fields: ContactField[] = ["name", "email", "message"];

  return fields.find((field) => Boolean(errors[field])) ?? null;
}
