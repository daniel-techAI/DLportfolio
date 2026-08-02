const SAFE_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function tryDecode(value: string): string | null {
  try {
    return decodeURIComponent(value);
  } catch {
    return null;
  }
}

/**
 * Parse a graph path from a raw value, query string, or full URL. Invalid URL
 * tokens are preserved for hierarchy validation where possible and rejected if
 * they are not URL-safe slugs.
 */
export function parseGraphPath(value: string | null | undefined): string[] {
  if (!value) {
    return [];
  }

  let raw = value.trim();

  if (raw.includes("?") || raw.startsWith("path=")) {
    const queryStart = raw.indexOf("?");
    const query = queryStart >= 0 ? raw.slice(queryStart + 1) : raw;
    raw = new URLSearchParams(query).get("path") ?? "";
  }

  raw = raw.replace(/^\/+|\/+$/g, "");

  if (!raw) {
    return [];
  }

  const decodedWholeValue = tryDecode(raw);
  const segments = (decodedWholeValue ?? raw).split("/");

  if (segments.some((segment) => segment.length === 0 || !SAFE_SLUG.test(segment))) {
    return [];
  }

  return segments[0] === "root" ? segments.slice(1) : segments;
}

export function parseGraphPathFromSearch(search: string | URLSearchParams): string[] {
  const parameters =
    typeof search === "string"
      ? new URLSearchParams(search.startsWith("?") ? search.slice(1) : search)
      : search;

  return parseGraphPath(parameters.get("path"));
}

/** Serialize URL segments without a leading slash or root identifier. */
export function serializeGraphPath(path: readonly string[]): string {
  const withoutRoot = path[0] === "root" ? path.slice(1) : path;

  if (withoutRoot.some((segment) => !SAFE_SLUG.test(segment))) {
    return "";
  }

  return withoutRoot.map(encodeURIComponent).join("/");
}

export function graphPathToSearch(path: readonly string[]): string {
  const serialized = serializeGraphPath(path);
  return serialized ? `?path=${serialized}` : "";
}

export function normalizeBasePath(value?: string | null): string {
  if (!value || value === "/") {
    return "";
  }

  return `/${value.trim().replace(/^\/+|\/+$/g, "")}`;
}

/** Prefix a same-origin public path with the configured static-host base path. */
export function withBasePath(
  pathname: string,
  basePath = process.env.NEXT_PUBLIC_BASE_PATH,
): string {
  if (!pathname || pathname.startsWith("#") || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(pathname)) {
    return pathname;
  }

  const base = normalizeBasePath(basePath);
  const normalizedPath = `/${pathname.replace(/^\/+/, "")}`;

  if (base && (normalizedPath === base || normalizedPath.startsWith(`${base}/`))) {
    return normalizedPath;
  }

  return `${base}${normalizedPath}`;
}

export function createGraphUrl(
  path: readonly string[],
  basePath = process.env.NEXT_PUBLIC_BASE_PATH,
): string {
  const root = `${withBasePath("/", basePath).replace(/\/$/, "")}/`;
  return `${root}${graphPathToSearch(path)}`;
}
