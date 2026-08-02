/**
 * Deterministic graph layout helpers.
 *
 * React Flow accepts any coordinate system, so these helpers deliberately keep
 * layout independent from the DOM and from React. The centre node always lives
 * at the origin; viewport controls can then fit or centre the resulting graph.
 */

export type GraphPosition = Readonly<{ x: number; y: number }>;

export type LayoutViewport = Readonly<{
  width: number;
  height: number;
}>;

export type LayoutNodeInput = Readonly<{
  id: string;
  width?: number;
  height?: number;
  featured?: boolean;
  /** Optional additional angular weight for unusually important nodes. */
  weight?: number;
  /** Portfolio nodes keep layout hints in presentation-agnostic metadata. */
  meta?: Readonly<{ layoutWeight?: number }>;
}>;

export type RadialLayoutOptions = Readonly<{
  viewport?: LayoutViewport;
  mobileBreakpoint?: number;
  startAngle?: number;
  baseRadius?: number;
  ringGap?: number;
  nodeGap?: number;
  maxNodesPerRing?: number;
}>;

export type TimelineLayoutOptions = Readonly<{
  viewport?: LayoutViewport;
  mobileBreakpoint?: number;
  horizontalGap?: number;
  verticalGap?: number;
}>;

export type GraphLayoutKind = "radial" | "timeline";

export type PositionedNode<T extends LayoutNodeInput> = T & {
  position: GraphPosition;
};

const DEFAULT_VIEWPORT: LayoutViewport = { width: 1280, height: 800 };
const DEFAULT_NODE_WIDTH = 240;
const DEFAULT_NODE_HEIGHT = 132;
const FEATURED_WIDTH_BONUS = 36;

const clamp = (value: number, minimum: number, maximum: number): number =>
  Math.min(maximum, Math.max(minimum, value));

const roundPosition = (value: number): number =>
  // Rounding avoids tiny platform-specific trigonometric differences and keeps
  // snapshot/debug output readable without making motion visibly less smooth.
  Math.round(value * 1000) / 1000;

const resolvedWidth = (node: LayoutNodeInput): number =>
  Math.max(1, node.width ?? DEFAULT_NODE_WIDTH) + (node.featured ? FEATURED_WIDTH_BONUS : 0);

const resolvedHeight = (node: LayoutNodeInput): number =>
  Math.max(1, node.height ?? DEFAULT_NODE_HEIGHT);

function splitIntoRings<T>(items: readonly T[], firstCapacity: number): T[][] {
  const rings: T[][] = [];
  let offset = 0;
  let capacity = firstCapacity;

  while (offset < items.length) {
    rings.push(items.slice(offset, offset + capacity));
    offset += capacity;
    // Outer rings have more circumference. The bounded increase avoids a very
    // dense outer ring when labels are long.
    capacity += Math.max(2, Math.floor(firstCapacity / 2));
  }

  return rings;
}

/**
 * Return a stable position lookup for a radial mind map.
 *
 * Input order is meaningful and is preserved clockwise, beginning at 12
 * o'clock. Nine or more desktop children and seven or more mobile children are
 * placed on multiple rings by default.
 */
export function createRadialLayout(
  nodes: readonly LayoutNodeInput[],
  centerNodeId: string,
  options: RadialLayoutOptions = {},
): Record<string, GraphPosition> {
  const viewport = options.viewport ?? DEFAULT_VIEWPORT;
  const mobileBreakpoint = options.mobileBreakpoint ?? 640;
  const isMobile = viewport.width < mobileBreakpoint;
  const startAngle = options.startAngle ?? -Math.PI / 2;
  const nodeGap = options.nodeGap ?? (isMobile ? 48 : 72);
  const maxNodesPerRing = Math.max(1, options.maxNodesPerRing ?? (isMobile ? 6 : 8));
  const children = nodes.filter((node) => node.id !== centerNodeId);
  const result: Record<string, GraphPosition> = {
    [centerNodeId]: { x: 0, y: 0 },
  };

  if (children.length === 0) {
    return result;
  }

  const shortestViewportSide = Math.max(320, Math.min(viewport.width, viewport.height));
  const responsiveBaseRadius = isMobile
    ? clamp(shortestViewportSide * 0.76, 285, 390)
    : clamp(shortestViewportSide * 0.46, 320, 500);
  const baseRadius = Math.max(1, options.baseRadius ?? responsiveBaseRadius);
  const tallestNode = Math.max(...children.map(resolvedHeight));
  const ringGap = Math.max(1, options.ringGap ?? tallestNode + (isMobile ? 112 : 132));
  const rings = splitIntoRings(children, maxNodesPerRing);

  rings.forEach((ring, ringIndex) => {
    const angularWeights = ring.map((node) => {
      const explicitWeight = Math.max(0.25, node.weight ?? node.meta?.layoutWeight ?? 1);
      const featureWeight = node.featured ? 1.18 : 1;
      return (resolvedWidth(node) + nodeGap) * explicitWeight * featureWeight;
    });
    const totalWeight = angularWeights.reduce((total, value) => total + value, 0);
    const circumferenceRadius = totalWeight / (Math.PI * 2);
    const radius = Math.max(baseRadius + ringIndex * ringGap, circumferenceRadius);
    const firstSlice = (angularWeights[0] / totalWeight) * Math.PI * 2;
    // Offset by half the first slice so its midpoint, rather than its leading
    // edge, begins exactly at the configured angle.
    let cursor = startAngle - firstSlice / 2;

    ring.forEach((node, index) => {
      const slice = (angularWeights[index] / totalWeight) * Math.PI * 2;
      const angle = cursor + slice / 2;
      result[node.id] = {
        x: roundPosition(Math.cos(angle) * radius),
        y: roundPosition(Math.sin(angle) * radius),
      };
      cursor += slice;
    });
  });

  return result;
}

/**
 * Return deterministic timeline positions while retaining a mind-map centre.
 * Desktop timelines form a shallow arc; mobile timelines use a vertical rail.
 */
export function createTimelineLayout(
  nodes: readonly LayoutNodeInput[],
  centerNodeId: string,
  options: TimelineLayoutOptions = {},
): Record<string, GraphPosition> {
  const viewport = options.viewport ?? DEFAULT_VIEWPORT;
  const mobileBreakpoint = options.mobileBreakpoint ?? 720;
  const isMobile = viewport.width < mobileBreakpoint;
  const children = nodes.filter((node) => node.id !== centerNodeId);
  const result: Record<string, GraphPosition> = {
    [centerNodeId]: { x: 0, y: 0 },
  };

  if (isMobile) {
    const verticalGap = Math.max(180, options.verticalGap ?? 228);
    children.forEach((node, index) => {
      result[node.id] = {
        x: index % 2 === 0 ? -34 : 34,
        y: (index + 1) * verticalGap,
      };
    });
    return result;
  }

  const widestNode = children.length
    ? Math.max(...children.map(resolvedWidth))
    : DEFAULT_NODE_WIDTH;
  const horizontalGap = Math.max(widestNode + 72, options.horizontalGap ?? widestNode + 128);
  const baseline = Math.max(250, tallestHeight(children) + 126);
  const midpoint = (children.length - 1) / 2;

  children.forEach((node, index) => {
    const distanceFromMiddle = index - midpoint;
    const arcOffset = Math.abs(distanceFromMiddle) * 22;
    result[node.id] = {
      x: roundPosition(distanceFromMiddle * horizontalGap),
      y: roundPosition(baseline + arcOffset),
    };
  });

  return result;
}

function tallestHeight(nodes: readonly LayoutNodeInput[]): number {
  return nodes.length ? Math.max(...nodes.map(resolvedHeight)) : DEFAULT_NODE_HEIGHT;
}

/** Apply a pure layout to arbitrary React Flow-compatible node objects. */
export function applyGraphLayout<T extends LayoutNodeInput>(
  nodes: readonly T[],
  centerNodeId: string,
  kind: GraphLayoutKind = "radial",
  options: RadialLayoutOptions | TimelineLayoutOptions = {},
): Array<PositionedNode<T>> {
  const positions =
    kind === "timeline"
      ? createTimelineLayout(nodes, centerNodeId, options)
      : createRadialLayout(nodes, centerNodeId, options);

  return nodes.map((node) => ({
    ...node,
    position: positions[node.id] ?? { x: 0, y: 0 },
  }));
}

// Descriptive aliases keep call sites readable and ease migration from earlier
// prototypes without duplicating behavior.
export const calculateRadialLayout = createRadialLayout;
export const calculateTimelineLayout = createTimelineLayout;
