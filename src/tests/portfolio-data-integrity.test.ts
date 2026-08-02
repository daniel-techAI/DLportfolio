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

  it("publishes distinct recruitment and project contacts from the central data source", () => {
    expect(portfolioData.actions.email).toMatchObject({
      value: "Daniellaky.uni@gmail.com",
      href: "mailto:Daniellaky.uni@gmail.com?subject=Remote%20opportunity%20for%20Daniel%20Laky",
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
