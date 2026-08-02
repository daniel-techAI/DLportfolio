import { describe, expect, it } from "vitest";

import {
  buildGraphBreadcrumbs,
  getGraphPathTo,
  getParentGraphId,
  getParentGraphPath,
  validateGraphPath,
  type NavigableGraph,
} from "@/lib/graph-navigation";
import {
  createGraphUrl,
  graphPathToSearch,
  normalizeBasePath,
  parseGraphPath,
  parseGraphPathFromSearch,
  serializeGraphPath,
  withBasePath,
} from "@/lib/url-state";

const graphs = {
  root: {
    id: "root",
    slug: "root",
    title: "Daniel Laky",
    nodes: [{ id: "projects-node", childGraphId: "projects" }],
  },
  projects: {
    id: "projects",
    slug: "projects",
    title: "Selected Projects",
    parentGraphId: "root",
    nodes: [{ id: "growth-node", childGraphId: "project-growthstack" }],
  },
  "project-growthstack": {
    id: "project-growthstack",
    slug: "growthstack",
    title: "Growthstack",
    parentGraphId: "projects",
    nodes: [],
  },
  skills: {
    id: "skills",
    slug: "skills",
    title: "Skills",
    parentGraphId: "root",
    nodes: [],
  },
} as const satisfies Record<string, NavigableGraph>;

describe("graph URL state", () => {
  it("parses plain, encoded, query-string, and full-URL paths", () => {
    expect(parseGraphPath("projects/growthstack")).toEqual(["projects", "growthstack"]);
    expect(parseGraphPath("?path=projects%2Fgrowthstack")).toEqual(["projects", "growthstack"]);
    expect(parseGraphPath("https://portfolio.example/?path=projects/growthstack")).toEqual([
      "projects",
      "growthstack",
    ]);
    expect(parseGraphPathFromSearch("path=projects%2Fgrowthstack")).toEqual([
      "projects",
      "growthstack",
    ]);
    expect(parseGraphPath("root/projects")).toEqual(["projects"]);
  });

  it("rejects malformed or unsafe path tokens", () => {
    expect(parseGraphPath("projects//growthstack")).toEqual([]);
    expect(parseGraphPath("projects/../contact")).toEqual([]);
    expect(parseGraphPath("projects/%ZZ")).toEqual([]);
    expect(serializeGraphPath(["projects", "Not Safe"])).toBe("");
  });

  it("serializes paths and supports static-host base paths", () => {
    expect(serializeGraphPath(["root", "projects", "growthstack"])).toBe("projects/growthstack");
    expect(graphPathToSearch(["projects", "growthstack"])).toBe("?path=projects/growthstack");
    expect(normalizeBasePath("/portfolio/")).toBe("/portfolio");
    expect(withBasePath("/images/profile.jpg", "/portfolio/")).toBe(
      "/portfolio/images/profile.jpg",
    );
    expect(withBasePath("https://example.com", "/portfolio")).toBe("https://example.com");
    expect(createGraphUrl(["projects"], "/portfolio")).toBe("/portfolio/?path=projects");
  });
});

describe("graph hierarchy navigation", () => {
  it("resolves a valid slug path to its graph id and full stack", () => {
    expect(validateGraphPath(["projects", "growthstack"], graphs)).toMatchObject({
      valid: true,
      graphId: "project-growthstack",
      path: ["projects", "growthstack"],
      stack: ["root", "projects", "project-growthstack"],
    });
  });

  it("returns to root for unknown and out-of-order paths", () => {
    expect(validateGraphPath(["projects", "missing"], graphs)).toMatchObject({
      valid: false,
      graphId: "root",
      path: [],
      stack: ["root"],
      invalidSegment: "missing",
    });
    expect(validateGraphPath(["growthstack"], graphs)).toMatchObject({
      valid: false,
      graphId: "root",
    });
    expect(validateGraphPath(["skills", "growthstack"], graphs)).toMatchObject({
      valid: false,
      graphId: "root",
    });
  });

  it("derives canonical parent navigation", () => {
    expect(getParentGraphPath(["projects", "growthstack"])).toEqual(["projects"]);
    expect(getParentGraphPath(["projects"])).toEqual([]);
    expect(getParentGraphPath([])).toEqual([]);
    expect(getParentGraphId("project-growthstack", graphs)).toBe("projects");
    expect(getParentGraphId("root", graphs)).toBeNull();
    expect(getGraphPathTo("project-growthstack", graphs)).toEqual(["projects", "growthstack"]);
  });

  it("builds breadcrumbs with URL slugs rather than internal ids", () => {
    expect(buildGraphBreadcrumbs(["projects", "growthstack"], graphs)).toEqual([
      { id: "root", title: "Daniel Laky", path: [] },
      { id: "projects", title: "Selected Projects", path: ["projects"] },
      {
        id: "project-growthstack",
        title: "Growthstack",
        path: ["projects", "growthstack"],
      },
    ]);
  });
});
