"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

interface HeroVideoProps {
  src: string;
  className: string;
  ariaLabel: string;
}

/**
 * Hero video that only mounts a <source> once the element is actually in
 * (or near) the viewport. `autoPlay` alone makes browsers start buffering
 * immediately regardless of `preload="none"`, so the server-rendered markup
 * previously shipped the video byte fetch as part of the initial page load
 * — competing with the H1/CTA for bandwidth on the critical rendering path
 * and occasionally showing up as an LCP outlier (a p75 LCP spike to ~9.3s
 * was observed for one week in PostHog web vitals). Deferring the fetch to
 * a client-side IntersectionObserver lets text content paint first.
 */
export function HeroVideo({ src, className, ariaLabel }: HeroVideoProps) {
  const t = useTranslations("home");
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad) {
      return;
    }
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);

    // Safety net: the hero is very often already in the initial viewport, so
    // this should fire almost immediately in practice. If the callback never
    // arrives for any reason (observer edge cases, unusual embedding), don't
    // strand the placeholder forever.
    const fallback = window.setTimeout(() => setShouldLoad(true), 4000);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [shouldLoad]);

  return (
    <div ref={containerRef} className={className}>
      {shouldLoad ? (
        <video
          className="pointer-events-none aspect-[16/10] w-full object-cover md:aspect-[16/9]"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          disablePictureInPicture
          aria-label={ariaLabel}
        >
          <source src={src} type="video/mp4" />
          {t("videoFallback")}
        </video>
      ) : (
        <div
          className="aspect-[16/10] w-full md:aspect-[16/9]"
          role="img"
          aria-label={ariaLabel}
        />
      )}
    </div>
  );
}
