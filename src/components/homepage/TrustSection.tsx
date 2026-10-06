import { Container } from "@/components/Container";
import { InstitutionalContactButton } from "@/components/InstitutionalContactButton";
import { displayTitle, Kicker } from "@/components/site/primitives";
import { TrackedLink } from "@/components/TrackedLink";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

/**
 * The stance, then facts a school's data officer can check. Only what the
 * privacy policy and /confianca already state publicly; no certifications,
 * hosting regions or ready-made packs that don't exist.
 */
export function TrustSection() {
  const t = useTranslations("home.trust");
  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <section aria-labelledby="home-trust-title" className="border-t border-line py-20 md:py-28">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <div data-reveal>
          <Kicker>{t("kicker")}</Kicker>
          <h2
            id="home-trust-title"
            className={cn(displayTitle, "mt-3 text-[clamp(30px,3.4vw,42px)] leading-[1.1]")}
          >
            {t("title")}
          </h2>
          <p className="mt-5 max-w-[420px] text-[16px] leading-relaxed text-subtle">
            {t("schools.text")}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
            <InstitutionalContactButton
              source="home_trust_request_docs"
              label={t("schools.cta")}
              title={t("schools.contactTitle")}
              description={t("schools.contactDescription")}
              variant="secondary"
              size="default"
            />
            <TrackedLink
              href="/confianca"
              eventName="marketing_navigation_clicked"
              eventProperties={{ location: "home_trust", link_label: "trust_page" }}
              className="text-[15px] font-medium text-violet-ink hover:underline"
            >
              {t("link")} →
            </TrackedLink>
          </div>
        </div>
        <ul data-reveal className="grid gap-x-10 sm:grid-cols-2">
          {items.map((item) => (
            <li key={item.title} className="border-b border-line py-5">
              <p className="flex items-center gap-2.5 text-[16px] font-medium text-ink">
                <Check aria-hidden className="size-4 shrink-0 text-ink" strokeWidth={1.75} />
                {item.title}
              </p>
              <p className="mt-1.5 pl-[26px] text-[15px] leading-relaxed text-subtle">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
