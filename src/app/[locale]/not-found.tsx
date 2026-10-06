import { PublicSiteShell } from "@/components/marketing/shared";
import { displayTitle } from "@/components/site/primitives";
import { TrackedLink } from "@/components/TrackedLink";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/Container";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const links = [
  { labelKey: "teachers", href: "/professores" },
  { labelKey: "schools", href: "/escolas" },
  { labelKey: "tools", href: "/ferramentas" },
  { labelKey: "pricing", href: "/precos" },
] as const;

export default function NotFound() {
  const t = useTranslations("notFound");
  const tNav = useTranslations("nav");

  return (
    <PublicSiteShell>
      <section aria-labelledby="not-found-heading" className="py-24 md:py-36">
        <Container className="max-w-[760px]">
          <p className="font-mono text-sm text-faint">404</p>
          <h1
            id="not-found-heading"
            className={cn(displayTitle, "mt-4 text-[clamp(40px,5vw,60px)] leading-[1.05] tracking-[-0.03em]")}
          >
            {t("heading")}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-subtle">{t("description")}</p>
          <div className="mt-9">
            <TrackedLink
              href="/"
              eventName="marketing_navigation_clicked"
              eventProperties={{ location: "not_found", link_label: "home" }}
              className={buttonVariants({ variant: "primary", size: "lg" })}
            >
              {t("backHome")}
            </TrackedLink>
          </div>
          <ul className="mt-14 border-t border-line">
            {links.map((link) => (
              <li key={link.href} className="border-b border-line">
                <TrackedLink
                  href={link.href}
                  eventName="marketing_navigation_clicked"
                  eventProperties={{ location: "not_found", link_label: link.labelKey }}
                  className="flex items-center justify-between py-4 text-[17px] text-ink transition-colors hover:text-violet-ink"
                >
                  {tNav(link.labelKey)}
                  <span aria-hidden className="text-subtle">→</span>
                </TrackedLink>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </PublicSiteShell>
  );
}
