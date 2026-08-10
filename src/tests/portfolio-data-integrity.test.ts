import { describe, expect, it } from "vitest";

import { portfolioData } from "@/data/portfolio";
import { getGraphPathTo, validateGraphPath } from "@/lib/graph-navigation";
import { getCredentialVerificationUrl } from "@/lib/credential-status";

const expectedCompletedCredentials = [
  {
    id: "openai-ai-foundations",
    title: "AI Foundations",
    issuer: "OpenAI Academy",
    status: "earned",
    verificationType: "Course Completion Certificate",
    issueDate: "2026-08-08",
    expirationDate: null,
    credentialId: "ee4dbt13hc",
    certificateUrl: "/documents/certificates/openai-ai-foundations-ee4dbt13hc.pdf",
  },
  {
    id: "openai-applied-ai-foundations",
    title: "Applied AI Foundations",
    issuer: "OpenAI Academy",
    status: "earned",
    verificationType: "Course Completion Certificate",
    issueDate: "2026-08-08",
    expirationDate: null,
    credentialId: "0ib8lgjtrv",
    certificateUrl: "/documents/certificates/openai-applied-ai-foundations-0ib8lgjtrv.pdf",
  },
  {
    id: "openai-agents-and-workflows",
    title: "Agents and Workflows",
    issuer: "OpenAI Academy",
    status: "earned",
    verificationType: "Course Completion Certificate",
    issueDate: "2026-08-08",
    expirationDate: null,
    credentialId: "77ariorgbi",
    certificateUrl: "/documents/certificates/openai-agents-and-workflows-77ariorgbi.pdf",
  },
  {
    id: "google-ai-powered-shopping-ads-certification",
    title: "AI-Powered Shopping ads Certification",
    issuer: "Skillshop / Google",
    status: "earned",
    verificationType: "Vendor Certification",
    issueDate: "2026-08-09",
    expirationDate: "2027-08-09",
    credentialId: "191040496",
    certificateUrl: "/documents/certificates/google-ai-powered-shopping-ads-191040496.pdf",
  },
] as const;

const expectedPlannedCredentialIds = [
  "anthropic-claude-101",
  "anthropic-ai-fluency-framework-and-foundations",
  "anthropic-claude-code-in-action",
  "google-analytics-certification",
  "google-ads-search-certification",
  "hubspot-digital-marketing-certification",
  "hubspot-inbound-sales-certification",
  "hubspot-revenue-operations-certification",
  "ibm-project-management-fundamentals",
  "ibm-data-fundamentals",
  "microsoft-create-and-manage-automated-processes-with-power-automate",
  "microsoft-streamline-business-workflows-with-ai-chat",
  "microsoft-generate-reports-with-ai-research-agents",
  "github-foundations-certification",
] as const;

const obsoleteCredentialIds = [
  "hubspot-inbound-certification",
  "ibm-customer-engagement-fundamentals",
  "ibm-artificial-intelligence-fundamentals",
  "ibm-agile-explorer",
  "github-introduction-to-github",
  "github-introduction-to-git",
  "hp-life-cash-flow",
  "hp-life-business-communications",
] as const;

describe("central portfolio data navigation", () => {
  it("gives every graph a valid, directly linkable canonical path", () => {
    for (const graph of Object.values(portfolioData.graphs)) {
      const path = getGraphPathTo(graph.id, portfolioData.graphs, portfolioData.rootGraphId);

      expect(path, `${graph.id} should be reachable from root`).not.toBeNull();
      expect(
        validateGraphPath(path ?? [], portfolioData.graphs, portfolioData.rootGraphId).graphId,
      ).toBe(graph.id);
    }
  });

  it("never exposes planned credentials as verifiable", () => {
    for (const credential of portfolioData.credentials) {
      if (credential.status === "planned") {
        expect(getCredentialVerificationUrl(credential)).toBeNull();
      }
    }
  });

  it("publishes the exact focused credential roadmap", () => {
    const completed = portfolioData.credentials.filter(({ status }) => status === "earned");
    const planned = portfolioData.credentials.filter(({ status }) => status === "planned");

    expect(portfolioData.credentials).toHaveLength(18);
    expect(completed).toHaveLength(4);
    expect(planned).toHaveLength(14);
    expect(completed).toMatchObject(expectedCompletedCredentials);
    expect(planned.map(({ id }) => id)).toEqual(expectedPlannedCredentialIds);
    expect(portfolioData.credentials.some(({ status }) => status === "in progress")).toBe(false);
  });

  it("keeps truthful credential classifications and official verification metadata", () => {
    const openAiCredentials = portfolioData.credentials.filter(
      ({ category }) => category === "OpenAI",
    );
    expect(openAiCredentials).toHaveLength(3);
    expect(
      openAiCredentials.every(
        ({ verificationType }) => verificationType === "Course Completion Certificate",
      ),
    ).toBe(true);

    const shoppingAds = portfolioData.credentials.find(
      ({ id }) => id === "google-ai-powered-shopping-ads-certification",
    );
    expect(shoppingAds).toMatchObject({
      title: "AI-Powered Shopping ads Certification",
      issuer: "Skillshop / Google",
      verificationType: "Vendor Certification",
      credentialUrl: "https://www.credential.net/d7037419-917a-4d37-93c6-cc8e809fb597",
    });

    const microsoft = portfolioData.credentials.filter(
      ({ category }) => category === "Microsoft Applied Skills",
    );
    expect(microsoft).toHaveLength(3);
    expect(
      microsoft.every(({ verificationType }) => verificationType === "Applied Skills Credential"),
    ).toBe(true);

    expect(
      portfolioData.credentials.find(({ id }) => id === "github-foundations-certification"),
    ).toMatchObject({
      status: "planned",
      verificationType: "GitHub Certification",
    });
  });

  it("does not restore obsolete roadmap entries or decorative issuer categories", () => {
    const ids = portfolioData.credentials.map(({ id }) => id);
    for (const obsoleteId of obsoleteCredentialIds) {
      expect(ids, `${obsoleteId} must remain outside the core roadmap`).not.toContain(obsoleteId);
    }

    expect(new Set(portfolioData.credentials.map(({ category }) => category))).toEqual(
      new Set([
        "OpenAI",
        "Anthropic",
        "Google",
        "HubSpot",
        "IBM",
        "Microsoft Applied Skills",
        "GitHub",
      ]),
    );
  });

  it("makes completed credentials interactive while planned credentials stay inert", () => {
    const credentialNodes = Object.values(portfolioData.graphs)
      .flatMap((graph) => graph.nodes)
      .filter((node) => node.kind === "credential");

    expect(credentialNodes.length).toBe(portfolioData.credentials.length);
    for (const node of credentialNodes) {
      if (node.status === "earned") {
        expect(node.detail, `${node.id} should open a completed-credential detail`).toBeDefined();
        expect(node.detail?.credential?.status).toBe("earned");
      } else {
        expect(node.detail, `${node.id} must not open a detail panel`).toBeUndefined();
        expect(node.action, `${node.id} must not expose an action`).toBeUndefined();
        expect(node.childGraphId, `${node.id} must not expand`).toBeUndefined();
      }
    }

    expect(portfolioData.graphs.certifications.description).toContain("Four completed credentials");
    expect(
      portfolioData.graphs.certifications.nodes.find((node) => node.id === "certifications-center")
        ?.descriptor,
    ).toBe("4 completed · 14 planned core credentials");
  });

  it("publishes both CV downloads from the central data source", () => {
    expect(portfolioData.actions.cv).toMatchObject({
      label: "Download CV — English",
      href: "/documents/Daniel_Laky_Remote_Roles_CV.pdf",
      download: "Daniel_Laky_Remote_Roles_CV.pdf",
    });
    expect(portfolioData.actions.cvSlovak).toMatchObject({
      label: "Stiahnuť CV — Slovensky",
      href: "/documents/Daniel_Laky_CV_Slovak.pdf",
      download: "Daniel_Laky_CV_Slovak.pdf",
    });
  });

  it("publishes distinct recruitment and project contacts from the central data source", () => {
    expect(portfolioData.actions.email).toMatchObject({
      value: "daniellaky.uni@gmail.com",
      href: "mailto:daniellaky.uni@gmail.com?subject=Remote%20opportunity%20for%20Daniel%20Laky",
      availability: "available",
    });
    expect(portfolioData.actions.businessEmail).toMatchObject({
      value: "r.creation.st@gmail.com",
      href: "mailto:r.creation.st@gmail.com?subject=Project%20enquiry%20for%20Daniel%20Laky",
      availability: "available",
    });
    expect(portfolioData.actions.phone).toMatchObject({
      value: "+421 949 093 583",
      href: "tel:+421949093583",
      availability: "available",
    });
    expect(portfolioData.actions.linkedin.href).toBe(
      "https://www.linkedin.com/in/daniel-laky-141a9b350/",
    );

    const emailNode = portfolioData.graphs.contact.nodes.find(
      (node) => node.id === "contact-email",
    );
    expect(emailNode?.action).toBeUndefined();
    expect(emailNode?.detail?.actions?.map((action) => action.id)).toEqual([
      "email",
      "business-email",
    ]);
  });
});
