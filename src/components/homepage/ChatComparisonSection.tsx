import { Container } from "@/components/Container";
import { displayTitle } from "@/components/site/primitives";
import { appMedia } from "@/lib/app-media";
import { cn } from "@/lib/utils";
import { BookOpenCheck, CalendarRange, FileCheck2, Minus, Users } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

/**
 * The objection teachers actually have: "I already use ChatGPT". One dark band,
 * the page's only high-contrast moment: a generic chat answer (drawn, no brand
 * UI) beside a real Scooli document. The chat side lists the work a chat
 * leaves to the teacher; the Scooli side carries the visual weight. Every
 * point must hold for any chat tool.
 */
const scooliIcons = [Users, BookOpenCheck, FileCheck2, CalendarRange];
export function ChatComparisonSection() {
  const t = useTranslations("home.chatComparison");
  const chatPoints = t.raw("chat.points") as string[];
  const scooliPoints = t.raw("scooli.points") as { title: string; text: string }[];
  const lessonPlan = appMedia(useLocale()).documents["plano-de-aula"];

  return (
    <section
      aria-labelledby="home-chat-title"
      className="bg-ink py-[88px] text-white md:py-28"
    >
      <Container>
        <div data-reveal className="max-w-[720px]">
          <span className="font-mono text-xs font-medium uppercase tracking-[0.06em] text-white/55">
            {t("kicker")}
          </span>
          <h2
            id="home-chat-title"
            className={cn(
              displayTitle,
              "mt-3 whitespace-pre-line text-[clamp(32px,4vw,48px)] leading-[1.08] text-white",
            )}
          >
            {t("title")}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/65">
            {t("description")}
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-2 lg:gap-5">
          <div
            data-reveal
            className="flex flex-col rounded-xl border border-white/10 bg-white/[0.04] p-6 md:p-8"
          >
            <p className="text-sm font-medium text-white/55">
              {t("chat.label")}
            </p>
            <div className="mt-5 flex-1 space-y-3 text-[14.5px] leading-relaxed">
              <p className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-white/10 px-4 py-2.5 text-white/90">
                {t("chat.prompt")}
              </p>
              <p className="max-w-[92%] whitespace-pre-line rounded-2xl rounded-bl-md border border-white/10 px-4 py-3 font-mono text-[13px] text-white/60">
                {t("chat.answer")}
              </p>
            </div>
            <ul className="mt-6 border-t border-white/10 lg:mt-auto">
              {chatPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 border-b border-white/10 py-3 text-[14.5px] leading-snug text-white/55"
                >
                  <Minus
                    aria-hidden
                    className="mt-1 size-4 shrink-0 text-white/40"
                    strokeWidth={1.75}
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div
            data-reveal
            style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
            className="flex flex-col rounded-xl bg-white p-6 text-ink md:p-8"
          >
            <p className="text-sm font-medium text-subtle">
              {t("scooli.label")}
            </p>
            {lessonPlan && (
              <div className="mt-5 h-[236px] overflow-hidden rounded-lg border border-line bg-stone-soft px-6 pt-6 md:h-[260px]">
                <div className="h-full overflow-hidden rounded-t-md border border-b-0 border-line bg-white">
                  <Image
                    src={lessonPlan.src}
                    alt={t("scooli.imageAlt")}
                    width={lessonPlan.width}
                    height={lessonPlan.height}
                    sizes="(min-width: 1024px) 520px, 90vw"
                    className="h-auto w-full"
                  />
                </div>
              </div>
            )}
            <ul className="mt-7 grid gap-x-6 gap-y-6 sm:grid-cols-2">
              {scooliPoints.map((point, index) => {
                const Icon = scooliIcons[index % scooliIcons.length];

                return (
                  <li key={point.title}>
                    <Icon aria-hidden className="size-5 text-violet" strokeWidth={1.75} />
                    <p className="mt-3 text-[17px] font-semibold tracking-[-0.01em] text-ink">
                      {point.title}
                    </p>
                    <p className="mt-1 text-[15px] leading-relaxed text-subtle">{point.text}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
