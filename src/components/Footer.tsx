import type { Locale } from "@/i18n/routing";
import { APP_URL, appSignUpUrl } from "@/lib/seo";
import { Facebook, Instagram } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Container } from "./Container";
import { EmailContact } from "./EmailContact";
import { TrackedLink } from "./TrackedLink";

/**
 * `href` values are the internal (Portuguese) pathname keys from
 * `src/i18n/routing.ts`; `TrackedLink` swaps in the English slug on `/en`.
 */
const primaryLinks = [
  { labelKey: "teachers", href: "/professores" },
  { labelKey: "aiForTeachers", href: "/ia-para-professores" },
  { labelKey: "schools", href: "/escolas" },
  { labelKey: "recommend", href: "/recomendar-instituicao" },
  { labelKey: "library", href: "/biblioteca" },
  { labelKey: "tools", href: "/ferramentas" },
  { labelKey: "pricing", href: "/precos" },
  { labelKey: "trust", href: "/confianca" },
  { labelKey: "about", href: "/sobre" },
] as const;

const legalLinks = [
  { labelKey: "contact", href: "/contacto" },
  { labelKey: "privacy", href: "/privacy" },
  { labelKey: "terms", href: "/terms" },
] as const;

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/scooliapp/",
    icon: Instagram,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/people/Scooli/61588415560096/",
    icon: Facebook,
  },
];

export function Footer() {
  const locale = useLocale() as Locale;
  const t = useTranslations("footer");
  const tCommon = useTranslations("common");
  const tNav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[color:var(--scooli-border)] bg-white py-12 text-[color:var(--scooli-ink)]">
      <Container className="space-y-10">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-4">
            <TrackedLink
              href="/"
              eventName="marketing_navigation_clicked"
              eventProperties={{
                location: "footer_logo",
                link_label: "home_logo",
              }}
              aria-label={t("homeAria")}
              className="inline-flex rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--scooli-primary)]"
            >
              <Image src="/scooli.svg" alt={tNav("logoAlt")} width={100} height={40} />
            </TrackedLink>
            <p className="max-w-md text-sm leading-7 text-[color:var(--scooli-muted)]">
              {t("tagline")}
            </p>
            <div className="flex flex-wrap gap-2">
              <TrackedLink
                href={appSignUpUrl(locale)}
                eventName="marketing_cta_clicked"
                eventProperties={{
                  cta_id: "footer_start_free",
                  placement: "footer_primary",
                }}
                className="rounded-full bg-[color:var(--scooli-primary)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[color:var(--scooli-primary-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--scooli-primary)]"
              >
                {tCommon("startFree")}
              </TrackedLink>
              <TrackedLink
                href="/escolas"
                eventName="marketing_cta_clicked"
                eventProperties={{
                  cta_id: "footer_schools",
                  placement: "footer_secondary",
                }}
                className="rounded-full border border-[color:var(--scooli-border)] px-4 py-2 text-sm font-semibold text-[color:var(--scooli-ink)] transition hover:bg-[color:var(--scooli-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--scooli-primary)]"
              >
                {tCommon("forSchools")}
              </TrackedLink>
            </div>
            <div className="flex items-center gap-3 pt-1">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <TrackedLink
                    key={social.label}
                    href={social.href}
                    eventName="marketing_navigation_clicked"
                    eventProperties={{
                      location: "footer_social",
                      link_label: social.label.toLowerCase(),
                    }}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={t("socialAria", { network: social.label })}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--scooli-border)] text-[color:var(--scooli-muted)] transition hover:border-[color:var(--scooli-primary)] hover:bg-[color:var(--scooli-accent)] hover:text-[color:var(--scooli-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--scooli-primary)]"
                  >
                    <Icon className="h-4 w-4" />
                  </TrackedLink>
                );
              })}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <nav aria-label={t("exploreHeading")}>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">{t("exploreHeading")}</p>
              <div className="mt-4 grid gap-2">
                {primaryLinks.map((link) => (
                  <TrackedLink
                    key={link.href}
                    href={link.href}
                    eventName="marketing_navigation_clicked"
                    eventProperties={{
                      location: "footer_primary_links",
                      link_label: link.labelKey,
                    }}
                    className="rounded-md text-sm text-[color:var(--scooli-muted)] transition hover:text-[color:var(--scooli-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--scooli-primary)]"
                  >
                    {t(`links.${link.labelKey}`)}
                  </TrackedLink>
                ))}
              </div>
            </nav>
            <nav aria-label={t("legalHeading")}>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">{t("legalHeading")}</p>
              <div className="mt-4 grid gap-2">
                {legalLinks.map((link) => (
                  <TrackedLink
                    key={link.href}
                    href={link.href}
                    eventName="marketing_navigation_clicked"
                    eventProperties={{
                      location: "footer_legal_links",
                      link_label: link.labelKey,
                    }}
                    className="rounded-md text-sm text-[color:var(--scooli-muted)] transition hover:text-[color:var(--scooli-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--scooli-primary)]"
                  >
                    {t(`links.${link.labelKey}`)}
                  </TrackedLink>
                ))}
                <TrackedLink
                  href={`${APP_URL}/sign-in`}
                  eventName="marketing_cta_clicked"
                  eventProperties={{
                    cta_id: "footer_sign_in",
                    placement: "footer_legal_links",
                  }}
                  className="rounded-md text-sm text-[color:var(--scooli-muted)] transition hover:text-[color:var(--scooli-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--scooli-primary)]"
                >
                  {tCommon("signIn")}
                </TrackedLink>
                <EmailContact
                  className="px-0 py-0 text-sm text-[color:var(--scooli-muted)] hover:bg-transparent hover:text-[color:var(--scooli-primary)]"
                  placement="footer_contact"
                  showIcon={false}
                />
              </div>
            </nav>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-[color:var(--scooli-border)] pt-6 text-xs text-[color:var(--scooli-muted)] sm:flex-row sm:items-center sm:justify-between">
          {/* Passed as a string so ICU does not group the digits ("2.026"). */}
          <p>{t("rights", { year: String(year) })}</p>
        </div>
      </Container>
    </footer>
  );
}
