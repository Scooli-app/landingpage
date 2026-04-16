import posthog from "posthog-js";
import type { LinkProps } from "next/link";

export const MARKETING_SITE_AREA = "marketing";

export type MarketingEventName =
  | "marketing_cta_clicked"
  | "marketing_navigation_clicked"
  | "marketing_plan_selected"
  | "marketing_institutional_contact_opened"
  | "marketing_contact_form_validation_failed"
  | "marketing_contact_form_submitted"
  | "marketing_contact_form_failed"
  | "marketing_faq_opened"
  | "marketing_email_copied"
  | "marketing_scroll_depth_reached";

export type MarketingEventProperties = Record<string, unknown>;

function getCurrentPathname() {
  if (typeof window === "undefined") {
    return "";
  }

  return window.location.pathname || "/";
}

export function getPageCategory(pathname = getCurrentPathname()) {
  if (!pathname || pathname === "/") {
    return "home";
  }

  if (pathname.startsWith("/ferramentas/")) {
    return "tool_detail";
  }

  if (pathname === "/ferramentas") {
    return "tools_index";
  }

  if (pathname === "/precos") {
    return "pricing";
  }

  if (pathname === "/escolas") {
    return "schools";
  }

  if (pathname === "/recomendar-instituicao") {
    return "institution_referral";
  }

  if (pathname === "/professores" || pathname === "/ia-para-professores") {
    return "teachers";
  }

  if (pathname === "/biblioteca") {
    return "library";
  }

  if (pathname === "/contacto") {
    return "contact";
  }

  if (pathname === "/confianca") {
    return "trust";
  }

  if (pathname === "/sobre") {
    return "about";
  }

  if (pathname === "/privacy" || pathname === "/terms") {
    return "legal";
  }

  return "marketing_page";
}

export function resolveHrefValue(
  href: LinkProps["href"]
) {
  if (typeof href === "string") {
    return href;
  }

  const pathname = href.pathname ?? "";
  const query = href.query
    ? Object.entries(href.query).filter(([, value]) => value !== undefined)
    : [];

  if (query.length === 0) {
    return pathname;
  }

  const searchParams = new URLSearchParams();

  for (const [key, value] of query) {
    searchParams.set(key, String(value));
  }

  const serializedQuery = searchParams.toString();
  return serializedQuery ? `${pathname}?${serializedQuery}` : pathname;
}

export function getTargetKind(targetUrl: string) {
  if (!targetUrl) {
    return "unknown";
  }

  if (targetUrl.startsWith("mailto:")) {
    return "email";
  }

  if (targetUrl.startsWith("#")) {
    return "section";
  }

  if (targetUrl.includes("/sign-up")) {
    return "sign_up";
  }

  if (targetUrl.includes("/sign-in")) {
    return "sign_in";
  }

  if (targetUrl.includes("/checkout")) {
    return "checkout";
  }

  if (targetUrl.startsWith("/precos")) {
    return "pricing";
  }

  if (targetUrl.startsWith("/escolas")) {
    return "schools";
  }

  if (targetUrl.startsWith("/recomendar-instituicao")) {
    return "institution_referral";
  }

  if (targetUrl.startsWith("/biblioteca")) {
    return "library";
  }

  if (targetUrl.startsWith("/ferramentas/")) {
    return "tool_detail";
  }

  if (targetUrl.startsWith("/ferramentas")) {
    return "tools_index";
  }

  if (targetUrl.startsWith("/contacto")) {
    return "contact";
  }

  if (targetUrl.startsWith("http")) {
    return "external";
  }

  return "internal_page";
}

export function getErrorType(error: unknown) {
  if (!error) {
    return "unknown_error";
  }

  if (error instanceof TypeError) {
    return "network_error";
  }

  if (error instanceof Error) {
    return "application_error";
  }

  return "unknown_error";
}

function getSharedProperties() {
  const pathname = getCurrentPathname();

  if (typeof window === "undefined") {
    return {
      site_area: MARKETING_SITE_AREA,
      page_slug: pathname || "/",
      page_category: getPageCategory(pathname || "/"),
      host: "",
    };
  }

  return {
    site_area: MARKETING_SITE_AREA,
    page_slug: pathname,
    page_category: getPageCategory(pathname),
    host: window.location.host,
  };
}

export function captureMarketingEvent(
  eventName: MarketingEventName,
  properties: MarketingEventProperties = {}
) {
  posthog.capture(eventName, {
    ...getSharedProperties(),
    ...properties,
  });
}
