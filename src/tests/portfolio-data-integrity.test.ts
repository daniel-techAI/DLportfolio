import { describe, expect, it } from "vitest";

import { portfolioData } from "@/data/portfolio";
import { getGraphPathTo, validateGraphPath } from "@/lib/graph-navigation";
import { getCredentialVerificationUrl } from "@/lib/credential-status";

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

  it("keeps unfinished credential nodes visible but non-interactive", () => {
    const credentialNodes = Object.values(portfolioData.graphs)
      .flatMap((graph) => graph.nodes)
      .filter((node) => node.kind === "credential");

    expect(credentialNodes.length).toBe(portfolioData.credentials.length);
    for (const node of credentialNodes) {
      if (node.status !== "earned") {
        expect(node.detail, `${node.id} must not open a detail panel`).toBeUndefined();
        expect(node.action, `${node.id} must not expose an action`).toBeUndefined();
        expect(node.childGraphId, `${node.id} must not expand`).toBeUndefined();
      }
    }

    expect(portfolioData.graphs.certifications.description).toBe(
      "Professional certifications and course credentials are currently in progress. Verified credentials will be added after completion.",
    );
    expect(
      portfolioData.graphs.certifications.nodes.find((node) => node.id === "certifications-center")
        ?.descriptor,
    ).toBe("Work in progress");
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
