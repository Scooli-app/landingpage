"use client";

import { usePathname } from "@/i18n/navigation";
import { useEffect } from "react";

const SELECTOR = "[data-reveal]:not([data-revealed])";

/**
 * Fades `[data-reveal]` elements in as they enter the viewport.
 *
 * One observer for the whole page instead of a hook per section keeps the
 * sections themselves server components. The `.reveal-ready` class on <html>
 * is what arms the hidden state in globals.css, so content is never hidden
 * without JavaScript, and reduced-motion users get it visible immediately.
 * Children can stagger with `style={{ "--reveal-delay": "80ms" }}`.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.classList.remove("reveal-ready");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const observeAll = () => {
      document.querySelectorAll(SELECTOR).forEach((element) => {
        // Anything already on screen when we arm the hidden state would
        // flash out and back in; mark it revealed straight away.
        if (element.getBoundingClientRect().top < window.innerHeight * 0.92) {
          element.setAttribute("data-revealed", "");
        } else {
          observer.observe(element);
        }
      });
    };

    observeAll();
    root.classList.add("reveal-ready");

    // Client-side content (tabs, menus) can mount new reveal targets later.
    const mutations = new MutationObserver(() => observeAll());
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, [pathname]);

  return null;
}
