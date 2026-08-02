/** Pure graph hierarchy and path navigation helpers. */

export type NavigableNode = Readonly<{
  id: string;
  childGraphId?: string;
  targetGraphId?: string;
}>;

export type NavigableGraph = Readonly<{
  id: string;
  /** Canonical URL segment. Falls back to id for lightweight fixtures. */
  slug?: string;
  title: string;
  parentGraphId?: string;
  nodes?: readonly NavigableNode[];
}>;

export type GraphCollection<T extends NavigableGraph = NavigableGraph> =
  Readonly<Record<string, T>> | readonly T[];

export type ValidatedGraphPath<T extends NavigableGraph = NavigableGraph> = Readonly<{
  valid: boolean;
  /** URL segments, excluding the root graph. */
  path: readonly string[];
  /** Full navigation stack, including the root graph. */
  stack: readonly string[];
  graphId: string;
  graph: T;
  invalidSegment?: string;
}>;

export type GraphBreadcrumb = Readonly<{
  id: string;
  title: string;
  path: readonly string[];
}>;

export function graphMap<T extends NavigableGraph>(
  graphs: GraphCollection<T>,
): Readonly<Record<string, T>> {
  if (!Array.isArray(graphs)) {
    return graphs as Readonly<Record<string, T>>;
  }

  return Object.fromEntries(graphs.map((graph) => [graph.id, graph]));
}

function isDeclaredChild(parent: NavigableGraph, child: NavigableGraph): boolean {
  if (child.parentGraphId !== undefined) {
    return child.parentGraphId === parent.id;
  }

  return Boolean(
    parent.nodes?.some((node) => node.childGraphId === child.id || node.targetGraphId === child.id),
  );
}

/**
 * Validate a path segment-by-segment. Invalid paths safely resolve to root,
 * rather than exposing a partially valid and potentially misleading graph.
 */
export function validateGraphPath<T extends NavigableGraph>(
  path: readonly string[],
  graphs: GraphCollection<T>,
  rootGraphId = "root",
): ValidatedGraphPath<T> {
  const byId = graphMap(graphs);
  const root = byId[rootGraphId];

  if (!root) {
    throw new Error(`Root graph "${rootGraphId}" does not exist.`);
  }

  const withoutRoot = path[0] === rootGraphId ? path.slice(1) : [...path];
  let current = root;
  const stack = [rootGraphId];

  for (const segment of withoutRoot) {
    const next = Object.values(byId).find(
      (candidate) =>
        (candidate.slug === segment ||
          (candidate.slug === undefined && candidate.id === segment)) &&
        isDeclaredChild(current, candidate),
    );

    if (!next) {
      return {
        valid: false,
        path: [],
        stack: [rootGraphId],
        graphId: rootGraphId,
        graph: root,
        invalidSegment: segment,
      };
    }

    current = next;
    stack.push(next.id);
  }

  return {
    valid: true,
    path: stack.slice(1).map((id) => byId[id].slug ?? id),
    stack,
    graphId: current.id,
    graph: current,
  };
}

export const resolveGraphPath = validateGraphPath;

/** Return URL segments for the direct parent of the supplied path. */
export function getParentGraphPath(path: readonly string[]): string[] {
  if (path.length === 0) {
    return [];
  }

  if (path[0] === "root") {
    return path.length <= 2 ? [] : path.slice(1, -1);
  }

  return path.slice(0, -1);
}

/** Resolve a graph's canonical URL path by following parentGraphId links. */
export function getGraphPathTo<T extends NavigableGraph>(
  graphId: string,
  graphs: GraphCollection<T>,
  rootGraphId = "root",
): string[] | null {
  const byId = graphMap(graphs);

  if (!byId[rootGraphId] || !byId[graphId]) {
    return null;
  }

  if (graphId === rootGraphId) {
    return [];
  }

  const path: string[] = [];
  const visited = new Set<string>();
  let current: T | undefined = byId[graphId];

  while (current && current.id !== rootGraphId) {
    if (visited.has(current.id) || !current.parentGraphId) {
      return null;
    }

    visited.add(current.id);
    path.unshift(current.slug ?? current.id);
    current = byId[current.parentGraphId];
  }

  if (!current || current.id !== rootGraphId) {
    return null;
  }

  return validateGraphPath(path, byId, rootGraphId).valid ? path : null;
}

export function getParentGraphId<T extends NavigableGraph>(
  graphId: string,
  graphs: GraphCollection<T>,
  rootGraphId = "root",
): string | null {
  if (graphId === rootGraphId) {
    return null;
  }

  return graphMap(graphs)[graphId]?.parentGraphId ?? null;
}

export function buildGraphBreadcrumbs<T extends NavigableGraph>(
  path: readonly string[],
  graphs: GraphCollection<T>,
  rootGraphId = "root",
): GraphBreadcrumb[] {
  const resolution = validateGraphPath(path, graphs, rootGraphId);

  const byId = graphMap(graphs);

  return resolution.stack.map((id, index) => ({
    id,
    title: byId[id].title,
    path:
      index === 0
        ? []
        : resolution.stack.slice(1, index + 1).map((graphId) => byId[graphId].slug ?? graphId),
  }));
}

export const getBreadcrumbs = buildGraphBreadcrumbs;
