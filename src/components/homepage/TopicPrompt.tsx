"use client";

import { buttonVariants } from "@/components/ui/button";
import type { Locale } from "@/i18n/routing";
import { captureMarketingEvent } from "@/lib/analytics";
import { appSignUpWithTopicUrl } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useId, useState, type FormEvent } from "react";

/**
 * The app's own "what are you teaching?" box, on the site: the visitor writes
 * the topic, creates the account and lands in the form with it filled in.
 */
export function TopicPrompt({ placement }: { placement: string }) {
  const t = useTranslations("home.topicPrompt");
  const locale = useLocale() as Locale;
  const inputId = useId();
  const [topic, setTopic] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    captureMarketingEvent("marketing_cta_clicked", {
      cta_id: "topic_prompt_submit",
      placement,
      has_topic: topic.trim().length > 0,
    });
    window.location.assign(appSignUpWithTopicUrl(locale, topic));
  };

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto w-full max-w-[620px] rounded-xl border border-line-strong bg-white p-2 text-left shadow-[0_1px_2px_rgba(0,0,0,0.03),0_18px_40px_-28px_rgba(17,17,17,0.25)]"
    >
      <label htmlFor={inputId} className="flex items-center gap-2 px-3 pt-2 text-sm font-medium text-ink">
        <Sparkles aria-hidden className="size-4 text-violet" strokeWidth={1.75} />
        {t("label")}
      </label>
      <div className="mt-1.5 flex flex-col gap-2 sm:flex-row">
        <input
          id={inputId}
          value={topic}
          onChange={(event) => setTopic(event.target.value)}
          placeholder={t("placeholder")}
          maxLength={200}
          className="h-12 min-w-0 flex-1 rounded-lg bg-transparent px-3 text-[16px] text-ink outline-none placeholder:text-faint focus-visible:ring-2 focus-visible:ring-violet/30"
        />
        <button type="submit" className={cn(buttonVariants({ variant: "primary", size: "lg" }), "h-12 gap-2")}>
          {t("submit")}
          <ArrowRight aria-hidden className="size-4" />
        </button>
      </div>
    </form>
  );
}
