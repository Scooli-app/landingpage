import posthog from "posthog-js";

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const posthogProxyPath = process.env.NEXT_PUBLIC_POSTHOG_PROXY_PATH ?? "/_ph";
const isDevelopment = process.env.NODE_ENV === "development";
const isPostHogEnabled = process.env.NEXT_PUBLIC_POSTHOG_ENABLED === "true";

/**
 * Deferred init: `instrumentation-client` runs synchronously before
 * hydration (see Next.js docs), so an eager `posthog.init()` here parses and
 * evaluates posthog-js's full bundle — including session-recording setup —
 * inside the same window the browser is measuring for INP on the very first
 * interaction. Pushing the init to the browser's idle period (after paint,
 * before the user has necessarily interacted yet) keeps PostHog's one-time
 * setup cost off the critical path without disabling any capability.
 * `setTimeout` is the fallback for Safari/older engines without
 * `requestIdleCallback`.
 */
function initPostHog() {
  if (!isPostHogEnabled || !posthogKey) {
    if (isDevelopment && isPostHogEnabled && !posthogKey) {
      console.warn(
        "[PostHog] NEXT_PUBLIC_POSTHOG_KEY is missing; analytics is disabled."
      );
    }
    return;
  }

  posthog.init(posthogKey, {
    api_host: posthogProxyPath,
    ui_host: "https://eu.posthog.com",
    defaults: "2026-01-30",
    capture_exceptions: true,
    capture_pageview: "history_change",
    capture_pageleave: true,
    cross_subdomain_cookie: true,
    disable_compression: isDevelopment,
    disable_session_recording: isDevelopment,
    debug: isDevelopment,
  });
}

if (typeof window.requestIdleCallback === "function") {
  window.requestIdleCallback(initPostHog, { timeout: 4000 });
} else {
  window.setTimeout(initPostHog, 1);
}
