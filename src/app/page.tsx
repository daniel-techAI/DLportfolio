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
  const cvSlovakAvailable = publicAssetExists(portfolioData.actions.cvSlovak.href);
  const profileAvailable = publicAssetExists(portfolioData.identity.profileImage.src);
  const linkedin = portfolioData.actions.linkedin.href;
  const recruitmentEmail = portfolioData.actions.email;
  const projectEmail = portfolioData.actions.businessEmail;
  const phone = portfolioData.actions.phone;
  const github =
    "href" in portfolioData.actions.github ? portfolioData.actions.github.href : undefined;
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com").replace(/\/$/, "");
  const publicRoot = `${siteUrl}${basePath}`;
  const completedCredentials = portfolioData.credentials.filter(
    (credential) => credential.status === "earned",
  );

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
    email: recruitmentEmail.value,
    telephone: phone.href.replace(/^tel:/, ""),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Senec",
      addressCountry: "SK",
    },
    sameAs: [linkedin, github].filter(Boolean),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "recruitment",
        email: recruitmentEmail.value,
        telephone: phone.href.replace(/^tel:/, ""),
        availableLanguage: ["Slovak", "Czech", "English"],
      },
      {
        "@type": "ContactPoint",
        contactType: "project enquiries",
        email: projectEmail.value,
        availableLanguage: ["Slovak", "Czech", "English"],
      },
    ],
    knowsAbout: [
      "Business and economics",
      "Practical AI workflows",
      "Web development and deployment",
      "Digital marketing and analytics",
      "Operations",
      "Sales support",
      "Project coordination",
      "Google Shopping ads concepts",
    ],
    hasCredential: completedCredentials.map((credential) => ({
      "@type": "EducationalOccupationalCredential",
      name: credential.title,
      credentialCategory: credential.verificationType,
      recognizedBy: {
        "@type": "Organization",
        name: credential.issuer,
      },
      dateCreated: credential.issueDate,
      ...(credential.expirationDate ? { expires: credential.expirationDate } : {}),
      ...(credential.credentialId ? { identifier: credential.credentialId } : {}),
      ...(credential.credentialUrl
        ? { url: credential.credentialUrl }
        : credential.certificateUrl
          ? { url: `${publicRoot}${credential.certificateUrl}` }
          : {}),
    })),
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
        cvSlovakAvailable={cvSlovakAvailable}
        profileAvailable={profileAvailable}
      />
      <noscript>
        <main>
          <h1>{portfolioData.identity.name}</h1>
          <p>{portfolioData.identity.descriptor}</p>
          <p>
            {portfolioData.identity.location}. {portfolioData.identity.status}.
          </p>
          <address>
            <a href={recruitmentEmail.href}>{recruitmentEmail.value}</a>
            {" · "}
            <a href={projectEmail.href}>{projectEmail.value}</a>
            {" · "}
            <a href={phone.href}>{phone.value}</a>
            {" · "}
            <a href={linkedin}>LinkedIn profile</a>
          </address>
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
