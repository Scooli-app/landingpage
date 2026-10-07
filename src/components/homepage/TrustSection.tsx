import { Container } from "@/components/Container";
import { InstitutionalContactButton } from "@/components/InstitutionalContactButton";
import { GdprSeal } from "@/components/site/GdprSeal";
import { displayTitle, Kicker } from "@/components/site/primitives";
import { TrackedLink } from "@/components/TrackedLink";
import { cn } from "@/lib/utils";
import { Ban, Eye, Lock, PencilLine } from "lucide-react";
import { useTranslations } from "next-intl";

const itemIcons = [PencilLine, Ban, Lock, Eye];

const policies = [
  { key: "privacy", href: "/privacy" },
  { key: "terms", href: "/terms" },
  { key: "trust", href: "/confianca" },
] as const;

/**
 * Trust as a selling point, right after the chat comparison: the stance, the
 * GDPR seal, four guarantees and the policies themselves one click away. Only
 * what the privacy policy and /confianca already state publicly; no
 * certifications, hosting regions or ready-made packs that don't exist.
 */
export function TrustSection() {
  const t = useTranslations("home.trust");
  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <section aria-labelledby="home-trust-title" className="bg-canvas py-20 md:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div data-reveal>
            <Kicker>{t("kicker")}</Kicker>
            <h2
              id="home-trust-title"
              className={cn(displayTitle, "mt-3 text-[clamp(32px,3.8vw,46px)] leading-[1.08]")}
            >
              {t("title")}
            </h2>
            <div className="mt-8 flex items-center gap-4">
              <GdprSeal className="size-24 shrink-0 drop-shadow-[0_10px_18px_rgba(0,51,153,0.22)]" />
              <p className="text-[17px] font-semibold leading-snug text-ink">{t("seal")}</p>
            </div>
            <p className="mt-6 max-w-[420px] text-[16px] leading-relaxed text-subtle">
              {t("schools.text")}
            </p>
          </div>

          <ul data-reveal className="grid gap-4 sm:grid-cols-2">
            {items.map((item, index) => {
              const Icon = itemIcons[index % itemIcons.length];

              return (
                <li key={item.title} className="rounded-xl border border-line bg-stone-soft p-6">
                  <Icon aria-hidden className="size-5 text-violet" strokeWidth={1.75} />
                  <p className="mt-4 text-[17px] font-semibold tracking-[-0.01em] text-ink">
                    {item.title}
                  </p>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-subtle">
                    {item.description}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>

        <div
          data-reveal
          className="mt-12 flex flex-col gap-5 border-t border-line-strong pt-8 md:flex-row md:items-center md:justify-between"
        >
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="font-mono text-xs uppercase tracking-[0.06em] text-subtle">
              {t("policiesLabel")}
            </span>
            {policies.map((policy) => (
              <TrackedLink
                key={policy.key}
                href={policy.href}
                eventName="marketing_navigation_clicked"
                eventProperties={{ location: "home_trust_policies", link_label: policy.key }}
                className="text-[15px] font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
              >
                {t(`policies.${policy.key}`)}
              </TrackedLink>
            ))}
          </div>
          <InstitutionalContactButton
            source="home_trust_request_docs"
            label={t("schools.cta")}
            title={t("schools.contactTitle")}
            description={t("schools.contactDescription")}
            variant="secondary"
            size="default"
          />
        </div>
      </Container>
    </section>
  );
}
