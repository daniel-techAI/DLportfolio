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
});
