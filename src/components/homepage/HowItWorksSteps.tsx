"use client";

import type { VideoAsset } from "@/components/site/LoopingVideo";
import { WindowFrame } from "@/components/site/primitives";
import { cn } from "@/lib/utils";
import { Pause, Play } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

type Step = { title: string; imageAlt: string; film: VideoAsset };

/**
 * Three steps as tabs beside one player. Each step is a short clip recorded in
 * the app; when it ends the next step takes over, so the section plays the
 * whole flow on its own. Arrow keys move between steps (WAI-ARIA tabs). Clips
 * play with reduced motion too, so the player has a pause button.
 */
export function HowItWorksSteps({ steps }: { steps: Step[] }) {
  const t = useTranslations("common");
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const current = steps[active];
  // Phones get the portrait cut; the full-width recording is unreadable there.
  const film = (isPhone && current.film.mobile) || current.film;

  useEffect(() => {
    const phone = window.matchMedia("(max-width: 767px)");
    setIsPhone(phone.matches);
    const onChange = (event: MediaQueryListEvent) => setIsPhone(event.matches);
    phone.addEventListener("change", onChange);
    const element = panelRef.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return () => phone.removeEventListener("change", onChange);
    }
    const observer = new IntersectionObserver(
      (entries) => setInView(entries.some((entry) => entry.isIntersecting)),
      { threshold: 0.35 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      phone.removeEventListener("change", onChange);
    };
  }, []);

  useEffect(() => {
    const player = videoRef.current;
    if (!player) {return;}
    // Browsers only autoplay muted video; React doesn't reliably set the attribute.
    player.muted = true;
    if (inView && !paused) {void player.play().catch(() => {});}
    else {player.pause();}
  }, [inView, active, paused, isPhone]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") {return;}
    event.preventDefault();
    const next = (active + (event.key === "ArrowDown" ? 1 : steps.length - 1)) % steps.length;
    setActive(next);
    document.getElementById(`how-step-${next}`)?.focus();
  };

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[340px_1fr] lg:gap-14">
      <div role="tablist" aria-orientation="vertical" className="flex flex-col">
        {steps.map((step, index) => {
          const selected = index === active;

          return (
            <button
              key={step.title}
              id={`how-step-${index}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="how-step-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={onKeyDown}
              className={cn(
                "border-l py-5 pl-6 text-left transition-colors",
                selected ? "border-l-2 border-ink pl-[23px]" : "border-line hover:border-line-strong",
              )}
            >
              <span className="font-mono text-xs text-faint">0{index + 1}</span>
              <span
                className={cn(
                  "mt-1 block text-[19px] font-semibold tracking-[-0.01em]",
                  selected ? "text-ink" : "text-subtle",
                )}
              >
                {step.title}
              </span>
            </button>
          );
        })}
      </div>

      <div ref={panelRef} id="how-step-panel" role="tabpanel" aria-labelledby={`how-step-${active}`}>
        <WindowFrame>
          <div
            className="group relative bg-stone-soft"
            style={{ aspectRatio: `${film.width} / ${film.height}` }}
          >
            {inView ? (
              <video
                ref={videoRef}
                key={film.src}
                className="absolute inset-0 size-full object-cover"
                poster={film.poster}
                autoPlay
                muted
                playsInline
                preload="auto"
                disablePictureInPicture
                aria-label={current.imageAlt}
                onEnded={() => setActive((index) => (index + 1) % steps.length)}
              >
                <source src={film.src} type="video/mp4" />
              </video>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element -- poster frame of the step's clip
              <img
                src={film.poster}
                alt={current.imageAlt}
                className="absolute inset-0 size-full object-cover"
                loading="lazy"
              />
            )}
            <button
              type="button"
              onClick={() => setPaused((value) => !value)}
              aria-label={paused ? t("playVideo") : t("pauseVideo")}
              className="absolute bottom-3 right-3 grid size-9 place-items-center rounded-full bg-ink/55 text-white opacity-70 backdrop-blur-sm transition-opacity hover:opacity-100 focus-visible:opacity-100 group-hover:opacity-100"
            >
              {paused ? <Play aria-hidden className="size-4" /> : <Pause aria-hidden className="size-4" />}
            </button>
          </div>
        </WindowFrame>
      </div>
    </div>
  );
}
