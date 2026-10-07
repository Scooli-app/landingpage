import { TrackedLink } from "@/components/TrackedLink";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";

/**
 * Sílvia Valério, the pedagogical advisor, as a credibility signal rather
 * than just a name in the /sobre team grid. None of the AI-for-teachers
 * competitors reviewed surface a named curriculum expert on their marketing
 * site, so this is a cheap, real differentiator worth repeating wherever a
 * visitor is evaluating curriculum trust: the homepage trust section and the
 * /escolas page, where a school leader asks exactly this question.
 */
export function AdvisorNote({ className }: { className?: string }) {
  const t = useTranslations("advisorNote");

  return (
    <div
      data-reveal
      className={cn(
        "flex items-center gap-4 rounded-xl border border-line-strong bg-white p-5",
        className,
      )}
    >
      <div className="relative size-14 shrink-0 overflow-hidden rounded-full bg-stone">
        <Image src="/team/silvia.jpg" alt={t("photoAlt")} fill sizes="56px" className="object-cover" />
      </div>
      <div className="min-w-0">
        <p className="text-[15px] leading-snug text-body">
          <span className="font-semibold text-ink">{t("name")}</span> — {t("role")}
        </p>
        <p className="mt-0.5 text-[14px] text-subtle">
          {t("description")}{" "}
          <TrackedLink
            href="/sobre"
            eventName="marketing_navigation_clicked"
            eventProperties={{ location: "advisor_note", link_label: "about" }}
            className="font-medium text-violet-ink hover:underline"
          >
            {t("link")} →
          </TrackedLink>
        </p>
      </div>
    </div>
  );
}
