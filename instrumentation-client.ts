import posthog from "posthog-js";

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const posthogProxyPath = process.env.NEXT_PUBLIC_POSTHOG_PROXY_PATH ?? "/_ph";
const isDevelopment = process.env.NODE_ENV === "development";
const isPostHogEnabled = process.env.NEXT_PUBLIC_POSTHOG_ENABLED === "true";

if (isPostHogEnabled && posthogKey) {
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
} else if (isDevelopment && isPostHogEnabled && !posthogKey) {
  console.warn(
    "[PostHog] NEXT_PUBLIC_POSTHOG_KEY is missing; analytics is disabled."
  );
}
