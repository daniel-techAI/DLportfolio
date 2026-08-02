import type { AnalyticsEventName } from "@/types/portfolio";

export type { AnalyticsEventName } from "@/types/portfolio";

export type AnalyticsEventPayloads = {
  graph_opened: { graphId: string; path: string };
  project_viewed: { projectId: string };
  credential_viewed: { credentialId: string; status?: string };
  cv_downloaded: { source?: string };
  linkedin_clicked: { source?: string };
  github_clicked: { source?: string };
  email_clicked: { source?: string };
};

type AnalyticsEventArguments<EventName extends AnalyticsEventName> =
  Record<string, never> extends AnalyticsEventPayloads[EventName]
    ? [payload?: AnalyticsEventPayloads[EventName]]
    : [payload: AnalyticsEventPayloads[EventName]];

declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: string,
      parameters?: Record<string, string | number | boolean>,
    ) => void;
  }
}

export function isAnalyticsConfigured(
  measurementId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
): boolean {
  return Boolean(measurementId?.trim());
}

/**
 * Forward an event only to an analytics runtime the host has already installed.
 * This module never injects a script, creates a cookie, or stores consent.
 */
export function trackEvent<EventName extends AnalyticsEventName>(
  eventName: EventName,
  ...args: AnalyticsEventArguments<EventName>
): void {
  const payload = (args[0] ?? {}) as AnalyticsEventPayloads[EventName];
  const measurementId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID?.trim();

  if (!measurementId || typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  const parameters = Object.fromEntries(
    Object.entries(payload).filter((entry) => entry[1] !== undefined),
  ) as Record<string, string | number | boolean>;

  window.gtag("event", eventName, {
    ...parameters,
    send_to: measurementId,
  });
}

export const analytics = {
  track: trackEvent,
  isConfigured: isAnalyticsConfigured,
} as const;
