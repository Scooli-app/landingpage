"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Wraps the app with Lenis smooth scroll.
 * Uses Lenis's own RAF loop — no GSAP ticker dependency.
 * Skips initialisation when the user prefers reduced motion.
 */
export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.07,        // trailing inertia — lower = more glide
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
