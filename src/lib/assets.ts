import { withBasePath } from "@/lib/url-state";

export const EXPECTED_ASSETS = {
  profileImage: "/images/profile/daniel-laky.jpg",
  cv: "/documents/Daniel_Laky_Remote_Roles_CV.pdf",
  cvSlovak: "/documents/Daniel_Laky_CV_Slovak.pdf",
} as const;

export function getPublicAssetUrl(
  path: string,
  basePath = process.env.NEXT_PUBLIC_BASE_PATH,
): string {
  return withBasePath(path, basePath);
}

/** Values such as [IMAGE] intentionally render a fallback, not a broken image. */
export function hasUsableAssetPath(path?: string | null): path is string {
  return Boolean(path && !/^\s*\[[A-Z0-9_ -]+\]\s*$/.test(path) && !path.endsWith("/"));
}
