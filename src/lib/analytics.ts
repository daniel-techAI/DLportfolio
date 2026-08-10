import type { AnalyticsEventName } from "@/types/portfolio";

export type { AnalyticsEventName } from "@/types/portfolio";

export type AnalyticsEventPayloads = {
  graph_opened: { graphId: string; path: string };
  project_viewed: { projectId: string };
  project_link_clicked: {
    projectId: string;
    destination: "live_site" | "repository" | "other";
  };
  credential_viewed: { credentialId: string; status?: string };
  credential_verification_clicked: { credentialId: string; issuer?: string };
  contact_action: {
    method: "email" | "phone" | "linkedin" | "github";
    source?: string;
  };
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
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (
      command: "event",
      eventName: string,
      parameters?: Record<string, string | number | boolean>,
    ) => void;
  }
}

type AnalyticsConfiguration = {
  gtmId?: string;
  measurementId?: string;
};

export function isAnalyticsConfigured({
  gtmId = process.env.NEXT_PUBLIC_GTM_ID,
  measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
}: AnalyticsConfiguration = {}): boolean {
  return Boolean(gtmId?.trim() || measurementId?.trim());
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
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim();
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

  if (typeof window === "undefined") return;

  const parameters = Object.fromEntries(
    Object.entries(payload).filter((entry) => entry[1] !== undefined),
  ) as Record<string, string | number | boolean>;

  // Prefer an existing GTM runtime when both integrations are configured to
  // avoid forwarding the same interaction twice.
  if (gtmId && Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: eventName, ...parameters });
    return;
  }

  if (measurementId && typeof window.gtag === "function") {
    window.gtag("event", eventName, {
      ...parameters,
      send_to: measurementId,
    });
  }
}

export const analytics = {
  track: trackEvent,
  isConfigured: isAnalyticsConfigured,
} as const;
