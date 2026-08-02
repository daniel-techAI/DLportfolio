import { describe, expect, it } from "vitest";

import {
  applyGraphLayout,
  createRadialLayout,
  createTimelineLayout,
  type GraphPosition,
  type LayoutNodeInput,
} from "@/lib/graph-layout";

const makeNodes = (count: number): LayoutNodeInput[] => [
  { id: "center", width: 300, height: 220 },
  ...Array.from({ length: count }, (_, index) => ({
    id: `child-${index + 1}`,
    width: 240,
    height: 132,
  })),
];

const distanceFromOrigin = (position: GraphPosition): number => Math.hypot(position.x, position.y);

function boxesOverlap(
  first: GraphPosition,
  second: GraphPosition,
  width = 240,
  height = 132,
): boolean {
  return Math.abs(first.x - second.x) < width && Math.abs(first.y - second.y) < height;
}

describe("createRadialLayout", () => {
  it("keeps the centre at the origin and returns deterministic coordinates", () => {
    const nodes = makeNodes(7);
    const first = createRadialLayout(nodes, "center", {
      viewport: { width: 1280, height: 800 },
    });
    const second = createRadialLayout(nodes, "center", {
      viewport: { width: 1280, height: 800 },
    });

    expect(first.center).toEqual({ x: 0, y: 0 });
    expect(first).toEqual(second);
    expect(Object.keys(first)).toHaveLength(nodes.length);
    expect(first["child-1"].x).toBeCloseTo(0, 3);
    expect(first["child-1"].y).toBeLessThan(0);
  });

  it("uses multiple rings for dense graphs and leaves representative boxes apart", () => {
    const nodes = makeNodes(12);
    const positions = createRadialLayout(nodes, "center", {
      viewport: { width: 1366, height: 768 },
    });
    const radii = nodes.slice(1).map((node) => Math.round(distanceFromOrigin(positions[node.id])));
    const distinctRadii = new Set(radii);

    expect(distinctRadii.size).toBe(2);

    const firstRing = nodes.slice(1, 9);
    for (let index = 0; index < firstRing.length; index += 1) {
      const current = positions[firstRing[index].id];
      const next = positions[firstRing[(index + 1) % firstRing.length].id];
      expect(boxesOverlap(current, next)).toBe(false);
    }
  });

  it("adjusts ring radius for viewport size and reserves featured-node space", () => {
    const nodes = makeNodes(5);
    nodes[2] = {
      ...nodes[2],
      featured: true,
      meta: { layoutWeight: 1.4 },
    };

    const compact = createRadialLayout(nodes, "center", {
      viewport: { width: 390, height: 700 },
    });
    const spacious = createRadialLayout(nodes, "center", {
      viewport: { width: 1440, height: 1100 },
    });

    expect(distanceFromOrigin(spacious["child-1"])).toBeGreaterThan(
      distanceFromOrigin(compact["child-1"]),
    );
    expect(spacious["child-2"]).not.toEqual(spacious["child-3"]);
  });

  it("preserves arbitrary node data when applying a layout", () => {
    const nodes = [
      { id: "center", title: "Centre" },
      { id: "one", title: "One" },
    ];

    expect(
      applyGraphLayout(nodes, "center", "radial", {
        viewport: { width: 1200, height: 800 },
      }),
    ).toEqual([
      { id: "center", title: "Centre", position: { x: 0, y: 0 } },
      {
        id: "one",
        title: "One",
        position: expect.objectContaining({ x: expect.any(Number) }),
      },
    ]);
  });
});

describe("createTimelineLayout", () => {
  it("uses a shallow horizontal arc on desktop", () => {
    const positions = createTimelineLayout(makeNodes(3), "center", {
      viewport: { width: 1280, height: 800 },
    });

    expect(positions.center).toEqual({ x: 0, y: 0 });
    expect(positions["child-1"].x).toBeLessThan(0);
    expect(positions["child-3"].x).toBeGreaterThan(0);
    expect(positions["child-2"].y).toBeLessThan(positions["child-1"].y);
  });

  it("uses a touch-friendly vertical rail on mobile", () => {
    const positions = createTimelineLayout(makeNodes(3), "center", {
      viewport: { width: 390, height: 844 },
    });

    expect(positions["child-1"]).toEqual({ x: -34, y: 228 });
    expect(positions["child-2"]).toEqual({ x: 34, y: 456 });
    expect(positions["child-3"].y).toBeGreaterThan(positions["child-2"].y);
  });
});
