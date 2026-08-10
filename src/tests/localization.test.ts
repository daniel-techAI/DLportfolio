import { describe, expect, it } from "vitest";

import {
  formatPortfolioDate,
  formatPortfolioProficiency,
  formatPortfolioStatus,
  getPortfolioUiCopy,
  localizePortfolioData,
  resolvePortfolioLocale,
} from "@/data/localization";
import { portfolioData } from "@/data/portfolio";

describe("portfolio localization", () => {
  it("falls back safely and returns the English source without cloning it", () => {
    expect(resolvePortfolioLocale("sk")).toBe("sk");
    expect(resolvePortfolioLocale("de")).toBe("en");
    expect(localizePortfolioData(portfolioData, "en")).toBe(portfolioData);
  });

  it("localizes presentation content without changing graph navigation", () => {
    const slovak = localizePortfolioData(portfolioData, "sk");
    const englishGraphs = Object.values(portfolioData.graphs);
    const slovakGraphs = Object.values(slovak.graphs);

    expect(slovak).not.toBe(portfolioData);
    expect(slovak.metadata.locale).toBe("sk_SK");
    expect(slovak.graphs.about.title).toBe("O Danielovi");
    expect(slovak.graphs.root.nodes.find((node) => node.id === "root-about")?.title).toBe("O mne");
    expect(slovakGraphs.map((graph) => graph.id)).toEqual(englishGraphs.map((graph) => graph.id));

    for (const graph of englishGraphs) {
      const localized = slovak.graphs[graph.id];
      expect(localized.slug).toBe(graph.slug);
      expect(localized.centerNodeId).toBe(graph.centerNodeId);
      expect(localized.parentGraphId).toBe(graph.parentGraphId);
      expect(localized.parentNodeId).toBe(graph.parentNodeId);
      expect(localized.nodes.map(({ id, slug }) => ({ id, slug }))).toEqual(
        graph.nodes.map(({ id, slug }) => ({ id, slug })),
      );
    }
  });

  it("preserves official credentials, project names, issuers and external targets", () => {
    const slovak = localizePortfolioData(portfolioData, "sk");

    expect(slovak.credentials.map(({ id, title, issuer }) => ({ id, title, issuer }))).toEqual(
      portfolioData.credentials.map(({ id, title, issuer }) => ({ id, title, issuer })),
    );

    for (const projectId of [
      "projects-growthstack",
      "projects-emotecture",
      "projects-klinepilot",
    ]) {
      expect(slovak.graphs.projects.nodes.find((node) => node.id === projectId)?.title).toBe(
        portfolioData.graphs.projects.nodes.find((node) => node.id === projectId)?.title,
      );
    }

    for (const [key, action] of Object.entries(portfolioData.actions)) {
      expect(slovak.actions[key]?.href).toBe("href" in action ? action.href : undefined);
      expect(slovak.actions[key]?.value).toBe(action.value);
      expect(slovak.actions[key]?.download).toBe(
        "download" in action ? action.download : undefined,
      );
    }
  });

  it("provides localized status, evidence and accessible UI copy", () => {
    expect(formatPortfolioStatus("earned", "en")).toBe("Completed");
    expect(formatPortfolioStatus("earned", "sk")).toBe("Dokončené");
    expect(formatPortfolioProficiency("credential-backed", "sk")).toBe("Podložené osvedčením");
    expect(getPortfolioUiCopy("sk").controls.showList).toBe("Zobraziť prístupný zoznam");
    expect(getPortfolioUiCopy("sk").help.shortcuts).toHaveLength(4);
  });

  it("localizes the new positioning and credential-roadmap copy", () => {
    const slovak = localizePortfolioData(portfolioData, "sk");
    const englishSummary = portfolioData.graphs.about.nodes.find(
      ({ id }) => id === "about-professional-summary",
    );
    const slovakSummary = slovak.graphs.about.nodes.find(
      ({ id }) => id === "about-professional-summary",
    );
    const englishCredentialCenter = portfolioData.graphs.certifications.nodes.find(
      ({ id }) => id === "certifications-center",
    );
    const slovakCredentialCenter = slovak.graphs.certifications.nodes.find(
      ({ id }) => id === "certifications-center",
    );

    expect(slovak.identity.descriptor).not.toBe(portfolioData.identity.descriptor);
    expect(slovak.identity.status).not.toBe(portfolioData.identity.status);
    expect(slovakSummary?.descriptor).not.toBe(englishSummary?.descriptor);
    expect(slovakSummary?.detail?.description).not.toBe(englishSummary?.detail?.description);
    expect(slovak.graphs.certifications.description).not.toBe(
      portfolioData.graphs.certifications.description,
    );
    expect(slovakCredentialCenter?.descriptor).not.toBe(englishCredentialCenter?.descriptor);
    expect(slovakCredentialCenter?.descriptor).toContain("4 dokončené");
    expect(slovakCredentialCenter?.descriptor).toContain("14 plánovaných");

    const englishOpenAi = portfolioData.credentials.find(
      ({ id }) => id === "openai-ai-foundations",
    );
    const slovakOpenAi = slovak.credentials.find(({ id }) => id === "openai-ai-foundations");
    expect(slovakOpenAi?.title).toBe(englishOpenAi?.title);
    expect(slovakOpenAi?.issuer).toBe(englishOpenAi?.issuer);
    expect(slovakOpenAi?.description).not.toBe(englishOpenAi?.description);
  });

  it("formats machine-readable credential dates for both languages", () => {
    expect(formatPortfolioDate("2026-08-09", "en")).toBe("August 9, 2026");
    expect(formatPortfolioDate("2026-08-09", "sk")).toBe("9. augusta 2026");
    expect(formatPortfolioDate("not-a-date", "sk")).toBe("not-a-date");
  });
});
