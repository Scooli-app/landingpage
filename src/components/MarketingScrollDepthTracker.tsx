"use client";

import { captureMarketingEvent } from "@/lib/analytics";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const SCROLL_DEPTH_THRESHOLDS = [25, 50, 75, 90] as const;

function getScrollDepth() {
  const doc = document.documentElement;
  const body = document.body;
  const viewportHeight = window.innerHeight || doc.clientHeight;
  const documentHeight = Math.max(
    doc.scrollHeight,
    body.scrollHeight,
    doc.offsetHeight,
    body.offsetHeight,
    doc.clientHeight
  );

  if (documentHeight <= 0) {
    return {
      documentHeight: 0,
      viewportHeight,
      scrollDepthPercent: 0,
    };
  }

  if (documentHeight <= viewportHeight) {
    return {
      documentHeight,
      viewportHeight,
      scrollDepthPercent: 100,
    };
  }

  const currentDepth = ((window.scrollY + viewportHeight) / documentHeight) * 100;

  return {
    documentHeight,
    viewportHeight,
    scrollDepthPercent: Math.max(0, Math.min(100, Math.round(currentDepth))),
  };
}

export function MarketingScrollDepthTracker() {
  const pathname = usePathname();
  const reachedThresholdsRef = useRef<Set<number>>(new Set());
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    reachedThresholdsRef.current = new Set();

    const captureReachedThresholds = (trigger: "scroll" | "pagehide") => {
      const { documentHeight, viewportHeight, scrollDepthPercent } =
        getScrollDepth();

      for (const threshold of SCROLL_DEPTH_THRESHOLDS) {
        if (
          scrollDepthPercent < threshold ||
          reachedThresholdsRef.current.has(threshold)
        ) {
          continue;
        }

        reachedThresholdsRef.current.add(threshold);

        captureMarketingEvent("marketing_scroll_depth_reached", {
          depth_percent: threshold,
          depth_bucket: `${threshold}%`,
          max_scroll_percent: scrollDepthPercent,
          document_height_px: documentHeight,
          viewport_height_px: viewportHeight,
          trigger,
        });
      }
    };

    const scheduleScrollCheck = () => {
      if (frameRef.current !== null) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        captureReachedThresholds("scroll");
      });
    };

    const handlePageHide = () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }

      captureReachedThresholds("pagehide");
    };

    scheduleScrollCheck();

    window.addEventListener("scroll", scheduleScrollCheck, { passive: true });
    window.addEventListener("resize", scheduleScrollCheck);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }

      window.removeEventListener("scroll", scheduleScrollCheck);
      window.removeEventListener("resize", scheduleScrollCheck);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, [pathname]);

  return null;
}
