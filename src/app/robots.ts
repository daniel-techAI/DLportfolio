import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com").replace(/\/$/, "");
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/^\/+|\/+$/g, "");
  const root = `${siteUrl}${basePath ? `/${basePath}` : ""}`;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${root}/sitemap.xml`,
  };
}
