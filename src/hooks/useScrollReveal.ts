"use client";

import { useEffect, useRef } from "react";

type ScrollRevealOptions = {
  y?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
  start?: string;
};

/**
 * GSAP ScrollTrigger fade-up reveal.
 * Respects prefers-reduced-motion — elements stay visible if user prefers no motion.
 * Returns a ref to attach to the container element.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {},
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || !ref.current) return;

    const { y = 28, duration = 0.7, stagger = 0.1, delay = 0, start = "top 88%" } = options;

    let ctx: { revert(): void } | null = null;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const targets = ref.current!.querySelectorAll("[data-reveal]");
        const els = targets.length > 0 ? targets : [ref.current!];

        gsap.fromTo(
          els,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration,
            delay,
            stagger,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ref.current!,
              start,
              once: true,
            },
          },
        );
      }, ref.current!);
    };

    init();

    return () => {
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
