import { existsSync } from "node:fs";
import { join } from "node:path";
import { PortfolioShell } from "@/components/portfolio/portfolio-shell";
import { portfolioData } from "@/data/portfolio";
import { normalizeBasePath } from "@/lib/url-state";

function publicAssetExists(assetPath?: string) {
  if (!assetPath) return false;
  const relativePath = assetPath.replace(/^\/+/, "");
  return existsSync(join(process.cwd(), "public", relativePath));
}

export default function Home() {
  const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);
  const cvAvailable = publicAssetExists(portfolioData.actions.cv.href);
  const profileAvailable = publicAssetExists(portfolioData.identity.profileImage.src);
  const linkedin = portfolioData.actions.linkedin.href;
  const github =
    "href" in portfolioData.actions.github ? portfolioData.actions.github.href : undefined;
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com").replace(/\/$/, "");
  const publicRoot = `${siteUrl}${basePath}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: portfolioData.identity.name,
    url: `${publicRoot}/`,
    ...(profileAvailable
      ? {
          image: `${publicRoot}${portfolioData.identity.profileImage.src}`,
        }
      : {}),
    description: portfolioData.identity.descriptor,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Senec",
      addressCountry: "SK",
    },
    sameAs: [linkedin, github].filter(Boolean),
    knowsAbout: [
      "Customer support",
      "Operations",
      "Sales support",
      "E-commerce",
      "Digital project coordination",
      "AI-assisted workflows",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PortfolioShell
        basePath={basePath}
        cvAvailable={cvAvailable}
        profileAvailable={profileAvailable}
      />
      <noscript>
        <main>
          <h1>{portfolioData.identity.name}</h1>
          <p>{portfolioData.identity.descriptor}</p>
          <p>
            {portfolioData.identity.location}. {portfolioData.identity.status}.
          </p>
          {Object.values(portfolioData.graphs)
            .filter((graph) => graph.id !== portfolioData.rootGraphId)
            .map((graph) => (
              <section key={graph.id}>
                <h2>{graph.title}</h2>
                {graph.description ? <p>{graph.description}</p> : null}
                <ul>
                  {graph.nodes
                    .filter((node) => node.id !== graph.centerNodeId)
                    .map((node) => (
                      <li key={node.id}>
                        <strong>{node.title}</strong>
                        {node.descriptor ? ` — ${node.descriptor}` : ""}
                        {node.detail?.description ? ` ${node.detail.description}` : ""}
                      </li>
                    ))}
                </ul>
              </section>
            ))}
        </main>
      </noscript>
    </>
  );
}
