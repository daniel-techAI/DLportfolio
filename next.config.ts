import type { NextConfig } from "next";

function normaliseBasePath(value: string | undefined): string {
  const trimmed = value?.trim().replace(/^\/+|\/+$/g, "") ?? "";

  return trimmed ? `/${trimmed}` : "";
}

const basePath = normaliseBasePath(process.env.NEXT_PUBLIC_BASE_PATH);

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
