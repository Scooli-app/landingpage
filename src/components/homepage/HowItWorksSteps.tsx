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
 * whole flow on its own. The three clips are stacked and preloaded together
 * and crossfade on a switch, so the next clip is ready before its turn (one
 * keyed <video> reloaded at every step and flashed its poster). Arrow keys move
 * between steps (WAI-ARIA tabs). Clips play with reduced motion too, so the
 * player has a pause button.
 */
export function HowItWorksSteps({ steps }: { steps: Step[] }) {
  const t = useTranslations("common");
  const [active, setActive] = useState(0);
  const [nearView, setNearView] = useState(false);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  // Phones get the portrait cut; the full-width recording is unreadable there.
  const clipOf = (step: Step) => (isPhone && step.film.mobile) || step.film;
  const frame = clipOf(steps[active]);

  useEffect(() => {
    const phone = window.matchMedia("(max-width: 767px)");
    setIsPhone(phone.matches);
    const onChange = (event: MediaQueryListEvent) => setIsPhone(event.matches);
    phone.addEventListener("change", onChange);
    const element = panelRef.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      setNearView(true);
      setInView(true);
      return () => phone.removeEventListener("change", onChange);
    }
    // Mount (and start buffering) a little before the section arrives; play
    // only once a good part of it is on screen.
    const near = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {setNearView(true);}
      },
      { rootMargin: "300px" },
    );
    const visible = new IntersectionObserver(
      (entries) => setInView(entries.some((entry) => entry.isIntersecting)),
      { threshold: 0.35 },
    );
    near.observe(element);
    visible.observe(element);
    return () => {
      near.disconnect();
      visible.disconnect();
      phone.removeEventListener("change", onChange);
    };
  }, []);

  // The step that just became active restarts from its first frame; the one
  // it replaces is only paused, so it holds its last frame while it fades out.
  const startedStep = useRef<number | null>(null);

  useEffect(() => {
    videoRefs.current.forEach((player, index) => {
      if (!player) {return;}
      // Browsers only autoplay muted video; React doesn't reliably set the attribute.
      player.muted = true;
      if (index !== active) {
        player.pause();
        return;
      }
      if (startedStep.current !== active) {
        startedStep.current = active;
        player.currentTime = 0;
      }
      if (inView && !paused) {void player.play().catch(() => {});}
      else {player.pause();}
    });
  }, [active, inView, paused, isPhone, nearView]);

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
            style={{ aspectRatio: `${frame.width} / ${frame.height}` }}
          >
            {nearView ? (
              steps.map((step, index) => {
                const clip = clipOf(step);
                const current = index === active;

                return (
                  <video
                    key={`${index}-${clip.src}`}
                    ref={(node) => {
                      videoRefs.current[index] = node;
                    }}
                    className={cn(
                      "absolute inset-0 size-full object-cover transition-opacity duration-500 ease-out",
                      current ? "opacity-100" : "opacity-0",
                    )}
                    poster={clip.poster}
                    muted
                    playsInline
                    preload="auto"
                    disablePictureInPicture
                    aria-hidden={!current}
                    aria-label={current ? step.imageAlt : undefined}
                    onEnded={() => setActive((value) => (value + 1) % steps.length)}
                  >
                    <source src={clip.src} type="video/mp4" />
                  </video>
                );
              })
            ) : (
              // eslint-disable-next-line @next/next/no-img-element -- poster frame of the first step's clip
              <img
                src={frame.poster}
                alt={steps[active].imageAlt}
                className="absolute inset-0 size-full object-cover"
                loading="lazy"
              />
            )}
            <button
              type="button"
              onClick={() => setPaused((value) => !value)}
              aria-label={paused ? t("playVideo") : t("pauseVideo")}
              className="absolute bottom-3 right-3 z-10 grid size-9 place-items-center rounded-full bg-ink/55 text-white opacity-70 backdrop-blur-sm transition-opacity hover:opacity-100 focus-visible:opacity-100 group-hover:opacity-100"
            >
              {paused ? <Play aria-hidden className="size-4" /> : <Pause aria-hidden className="size-4" />}
            </button>
          </div>
        </WindowFrame>
      </div>
    </div>
  );
}
