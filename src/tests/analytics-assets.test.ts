import { afterEach, describe, expect, it, vi } from "vitest";

import { EXPECTED_ASSETS, getPublicAssetUrl, hasUsableAssetPath } from "@/lib/assets";
import { isAnalyticsConfigured, trackEvent } from "@/lib/analytics";

describe("asset helpers", () => {
  it("resolves expected public assets under an optional base path", () => {
    expect(getPublicAssetUrl(EXPECTED_ASSETS.cv, "/portfolio")).toBe(
      "/portfolio/documents/Daniel_Laky_Remote_Roles_CV.pdf",
    );
    expect(getPublicAssetUrl(EXPECTED_ASSETS.cvSlovak, "/portfolio")).toBe(
      "/portfolio/documents/Daniel_Laky_CV_Slovak.pdf",
    );
    expect(hasUsableAssetPath("[CERTIFICATE_IMAGE]")).toBe(false);
    expect(hasUsableAssetPath("/images/projects/growthstack/")).toBe(false);
    expect(hasUsableAssetPath("/images/projects/growthstack/home.webp")).toBe(true);
  });
});

describe("analytics abstraction", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    delete window.dataLayer;
    delete window.gtag;
  });

  it("is a no-op when analytics is not configured", () => {
    vi.stubEnv("NEXT_PUBLIC_GTM_ID", "");
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "");
    window.dataLayer = [];
    window.gtag = vi.fn();

    trackEvent("project_viewed", { projectId: "growthstack" });

    expect(isAnalyticsConfigured()).toBe(false);
    expect(window.dataLayer).toEqual([]);
    expect(window.gtag).not.toHaveBeenCalled();
  });

  it("does not install or assume an analytics runtime when only an ID is configured", () => {
    vi.stubEnv("NEXT_PUBLIC_GTM_ID", "GTM-TEST123");
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "G-TEST123");
    delete window.dataLayer;
    delete window.gtag;

    expect(isAnalyticsConfigured()).toBe(true);
    expect(() => trackEvent("project_viewed", { projectId: "growthstack" })).not.toThrow();
    expect(window.dataLayer).toBeUndefined();
    expect(window.gtag).toBeUndefined();
  });

  it("allows link and download events without optional context", () => {
    vi.stubEnv("NEXT_PUBLIC_GTM_ID", "");
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "G-TEST123");
    window.gtag = vi.fn();

    trackEvent("cv_downloaded");

    expect(window.gtag).toHaveBeenCalledWith("event", "cv_downloaded", {
      send_to: "G-TEST123",
    });
  });

  it("forwards typed events to an already-installed GA runtime", () => {
    vi.stubEnv("NEXT_PUBLIC_GTM_ID", "");
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "G-TEST123");
    window.gtag = vi.fn();

    trackEvent("graph_opened", {
      graphId: "project-growthstack",
      path: "projects/growthstack",
    });

    expect(window.gtag).toHaveBeenCalledWith("event", "graph_opened", {
      graphId: "project-growthstack",
      path: "projects/growthstack",
      send_to: "G-TEST123",
    });
  });

  it("forwards meaningful events to an already-installed GTM data layer", () => {
    vi.stubEnv("NEXT_PUBLIC_GTM_ID", "GTM-TEST123");
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "");
    window.dataLayer = [];

    trackEvent("project_link_clicked", {
      projectId: "klinepilot",
      destination: "live_site",
    });
    trackEvent("credential_verification_clicked", {
      credentialId: "google-ai-powered-shopping-ads-certification",
      issuer: "Skillshop / Google",
    });
    trackEvent("contact_action", { method: "phone", source: "contact-map" });

    expect(isAnalyticsConfigured()).toBe(true);
    expect(window.dataLayer).toEqual([
      {
        event: "project_link_clicked",
        projectId: "klinepilot",
        destination: "live_site",
      },
      {
        event: "credential_verification_clicked",
        credentialId: "google-ai-powered-shopping-ads-certification",
        issuer: "Skillshop / Google",
      },
      {
        event: "contact_action",
        method: "phone",
        source: "contact-map",
      },
    ]);
  });

  it("prefers GTM when both consent-aware runtimes are already installed", () => {
    vi.stubEnv("NEXT_PUBLIC_GTM_ID", "GTM-TEST123");
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "G-TEST123");
    window.dataLayer = [];
    window.gtag = vi.fn();

    trackEvent("cv_downloaded", { source: "portfolio" });

    expect(window.dataLayer).toEqual([{ event: "cv_downloaded", source: "portfolio" }]);
    expect(window.gtag).not.toHaveBeenCalled();
  });
});
