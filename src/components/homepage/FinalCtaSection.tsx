import { Container } from "@/components/Container";
import { InstitutionalContactButton } from "@/components/InstitutionalContactButton";
import { displayTitle } from "@/components/site/primitives";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { TopicPrompt } from "./TopicPrompt";

/** The close: the app's own first step, ready to type into. */
export function FinalCtaSection() {
  const t = useTranslations("home.finalCta");
  const tSchools = useTranslations("home.audiences.schools");

  return (
    <section
      aria-labelledby="home-final-title"
      className="border-t border-line py-[100px] text-center md:py-[136px]"
    >
      <Container data-reveal>
        <h2
          id="home-final-title"
          className={cn(
            displayTitle,
            "mx-auto max-w-[760px] text-[clamp(36px,4.6vw,56px)] leading-[1.06] tracking-[-0.03em]",
          )}
        >
          {t("title")}
        </h2>
        <div className="mt-9">
          <TopicPrompt placement="home_final_cta" />
        </div>
        <p className="mt-4 text-sm text-faint">
          {t("description")}{" "}
          <span aria-hidden>·</span>{" "}
          <InstitutionalContactButton
            source="home_final_cta_book_demo"
            label={t("schoolsLink")}
            title={tSchools("contactTitle")}
            description={tSchools("contactDescription")}
            variant="link"
            size="sm"
          />
        </p>
      </Container>
    </section>
  );
}
