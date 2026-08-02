import { afterEach, describe, expect, it, vi } from "vitest";

import { EXPECTED_ASSETS, getPublicAssetUrl, hasUsableAssetPath } from "@/lib/assets";
import { isAnalyticsConfigured, trackEvent } from "@/lib/analytics";

describe("asset helpers", () => {
  it("resolves expected public assets under an optional base path", () => {
    expect(getPublicAssetUrl(EXPECTED_ASSETS.cv, "/portfolio")).toBe(
      "/portfolio/documents/Daniel_Laky_Remote_Roles_CV.pdf",
    );
    expect(hasUsableAssetPath("[CERTIFICATE_IMAGE]")).toBe(false);
    expect(hasUsableAssetPath("/images/projects/growthstack/")).toBe(false);
    expect(hasUsableAssetPath("/images/projects/growthstack/home.webp")).toBe(true);
  });
});

describe("analytics abstraction", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    delete window.gtag;
  });

  it("is a no-op when analytics is not configured", () => {
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_ANALYTICS_ID", "");
    window.gtag = vi.fn();

    trackEvent("project_viewed", { projectId: "growthstack" });

    expect(isAnalyticsConfigured()).toBe(false);
    expect(window.gtag).not.toHaveBeenCalled();
  });

  it("allows link and download events without optional context", () => {
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_ANALYTICS_ID", "G-TEST123");
    window.gtag = vi.fn();

    trackEvent("cv_downloaded");

    expect(window.gtag).toHaveBeenCalledWith("event", "cv_downloaded", {
      send_to: "G-TEST123",
    });
  });

  it("forwards typed events to an already-installed analytics runtime", () => {
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_ANALYTICS_ID", "G-TEST123");
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
});
