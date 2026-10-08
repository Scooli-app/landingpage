import { NAV_TOOL_SLUGS } from "@/components/site/nav-data";
import { Facebook, Instagram } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import type { ComponentProps } from "react";
import { Container } from "./Container";
import { EmailContact } from "./EmailContact";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { TrackedLink } from "./TrackedLink";

type Href = ComponentProps<typeof TrackedLink>["href"];

/**
 * `href` values are the internal (Portuguese) pathname keys from
 * `src/i18n/routing.ts`; `TrackedLink` swaps in the English slug on `/en`.
 */
const productLinks = [
  { labelKey: "howItWorks", href: "/#como-funciona" },
  { labelKey: "teachers", href: "/professores" },
  { labelKey: "schools", href: "/escolas" },
  { labelKey: "pricing", href: "/precos" },
] as const;

const companyLinks = [
  { labelKey: "about", href: "/sobre" },
  { labelKey: "investors", href: "/investidores" },
  { labelKey: "roadmap", href: "/roadmap" },
  { labelKey: "trust", href: "/confianca" },
  { labelKey: "contact", href: "/contacto" },
  { labelKey: "recommend", href: "/recomendar-instituicao" },
] as const;

const resourceLinks = [
  { labelKey: "aiForTeachers", href: "/ia-para-professores" },
  { labelKey: "allTools", href: "/ferramentas" },
  { labelKey: "privacy", href: "/privacy" },
  { labelKey: "terms", href: "/terms" },
] as const;

/** "Scooli vs X" comparison pages, in both languages (the URL slug is localized by `Link`). */
const comparisonLinks = [
  { label: "Scooli vs Canva", labelEn: "Scooli vs Canva", slug: "canva-para-educacao" },
  { label: "Scooli vs MagicSchool AI", labelEn: "Scooli vs MagicSchool AI", slug: "magicschool-ai" },
  { label: "Scooli vs Teachy", labelEn: "Scooli vs Teachy", slug: "teachy" },
  { label: "Scooli vs ChatGPT/Gemini/Perplexity", labelEn: "Scooli vs ChatGPT/Gemini/Perplexity", slug: "chatgpt-gemini-perplexity" },
] as const;

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/scooliapp/", icon: Instagram },
  {
    label: "Facebook",
    href: "https://www.facebook.com/people/Scooli/61588415560096/",
    icon: Facebook,
  },
];

function FooterColumn({
  heading,
  location,
  items,
}: {
  heading: string;
  location: string;
  items: { key: string; label: string; href: Href }[];
}) {
  return (
    <nav aria-label={heading}>
      <p className="text-[13px] font-medium text-ink">{heading}</p>
      <ul className="mt-3.5 space-y-2">
        {items.map((item) => (
          <li key={item.key}>
            <TrackedLink
              href={item.href}
              eventName="marketing_navigation_clicked"
              eventProperties={{ location, link_label: item.key }}
              className="text-sm text-subtle transition-colors hover:text-ink"
            >
              {item.label}
            </TrackedLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  const locale = useLocale();
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-white pb-8 pt-16">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(4,1fr)] lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <TrackedLink
              href="/"
              eventName="marketing_navigation_clicked"
              eventProperties={{ location: "footer_logo", link_label: "home_logo" }}
              aria-label={t("homeAria")}
              className="inline-flex rounded-md"
            >
              <Image src="/scooli.svg" alt={tNav("logoAlt")} width={80} height={26} />
            </TrackedLink>
            <p className="mt-4 max-w-[260px] font-display text-xl leading-snug tracking-[-0.01em] text-ink">
              {t("tagline")}
            </p>
          </div>

          <FooterColumn
            heading={t("productHeading")}
            location="footer_product_links"
            items={productLinks.map((link) => ({
              key: link.labelKey,
              label: t(`links.${link.labelKey}`),
              href: link.href,
            }))}
          />
          <FooterColumn
            heading={t("toolsHeading")}
            location="footer_tools_links"
            items={NAV_TOOL_SLUGS.map((slug) => ({
              key: slug,
              label: tNav(`toolsMenu.items.${slug}.label`),
              href: { pathname: "/ferramentas/[slug]", params: { slug } },
            }))}
          />
          <FooterColumn
            heading={t("companyHeading")}
            location="footer_company_links"
            items={companyLinks.map((link) => ({
              key: link.labelKey,
              label: t(`links.${link.labelKey}`),
              href: link.href,
            }))}
          />
          <FooterColumn
            heading={t("resourcesHeading")}
            location="footer_resources_links"
            items={[
              ...resourceLinks.map((link) => ({
                key: link.labelKey,
                label: t(`links.${link.labelKey}`),
                href: link.href as Href,
              })),
              ...comparisonLinks.map((link) => ({
                key: link.slug,
                label: locale === "en" ? link.labelEn : link.label,
                href: { pathname: "/comparar/[slug]", params: { slug: link.slug } } as Href,
              })),
            ]}
          />
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 text-[13px] text-faint sm:flex-row sm:items-center sm:justify-between">
          {/* Passed as a string so ICU does not group the digits ("2.026"). */}
          <p>{t("rights", { year: String(year) })}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <EmailContact
              className="px-0 py-0 text-[13px] text-subtle hover:bg-transparent hover:text-ink"
              placement="footer_contact"
              showIcon={false}
            />
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <TrackedLink
                  key={social.label}
                  href={social.href}
                  eventName="marketing_navigation_clicked"
                  eventProperties={{ location: "footer_social", link_label: social.label.toLowerCase() }}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t("socialAria", { network: social.label })}
                  className="text-subtle transition-colors hover:text-ink"
                >
                  <Icon className="size-4" strokeWidth={1.75} />
                </TrackedLink>
              );
            })}
            <LanguageSwitcher />
          </div>
        </div>
      </Container>
    </footer>
  );
}
