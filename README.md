# Daniel Laky — Interactive Portfolio

**Live site:** [daniel-techai.github.io/DLportfolio](https://daniel-techai.github.io/DLportfolio/)

An immersive, accessible portfolio for Daniel Laky, presented as a hierarchical professional mind
map rather than a scrolling résumé. Visitors can pan the automatically fitted canvas, enter nested graphs,
follow browser history and breadcrumbs, inspect details, switch to a semantic list, and reach
Daniel's professional contact actions.

The application is a statically exported Next.js site. It has no database, authentication, CMS,
contact-form backend, cookies, or third-party analytics by default.

## Current content status

The supplied professional content and confirmed contact details are implemented. Assets that have
not been supplied remain deliberately unavailable:

- Recruitment email, project-enquiry email, phone, LinkedIn, GitHub and the public Klinepilot app are
  configured; Klinepilot's private source-repository URL is not exposed.
- The profile photograph has a designed fallback until the real JPEG is added.
- Reviewed English and Slovak CVs are available as direct PDF downloads.
- Project galleries use labelled placeholders.
- The focused credential roadmap contains 4 completed credentials and 14 clearly separated planned
  credentials. Completed OpenAI course certificates are labelled as course completions; the completed
  Google Shopping Ads credential is labelled as a vendor certification.
- The four supporting credential PDFs and the issuer-supplied Google badge are available on demand;
  the private source credential JSON is not published.

### Screenshot placeholders

Production screenshots are pending Daniel's real profile and project imagery. The intended filenames
and capture sizes are documented in [`docs/screenshots/README.md`](docs/screenshots/README.md).

## Experience highlights

- Reusable radial and timeline graph layouts powered by React Flow.
- Recursive graph navigation with `?path=` URLs, history, breadcrumbs, Home, and Escape.
- Mouse, trackpad, keyboard, and touch navigation with automatic fit-to-view at every graph level.
- Continuous Motion transitions with a reduced-motion alternative.
- Accessible detail panels with focus management and a shared-data semantic list view.
- English and Slovak presentation layers backed by the same graph, credential, project and action data.
- Static metadata, Open Graph/Twitter metadata, robots, sitemap, and Person structured data.
- No-op analytics events that only forward to an already installed, consent-aware runtime.
- Unit tests for graph logic and Playwright smoke coverage for essential user journeys.

## Technology

- Next.js App Router and React
- TypeScript in strict mode
- Tailwind CSS
- `@xyflow/react`
- Motion for React (`motion/react`)
- Lucide React
- Vitest and Testing Library
- Playwright and axe-core
- ESLint and Prettier

Package versions are locked in `package-lock.json`.

## Requirements

- Node.js 24 LTS
- npm 11 or newer

The version requirement is also declared in `package.json`. Playwright additionally needs its
Chromium binary for browser tests.

## Installation and local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Local environment configuration is optional;
copy `.env.example` to `.env.local` when testing production metadata, a deployment subpath, or a
consent-aware analytics integration.

Do not set `NEXT_PUBLIC_BASE_PATH` for ordinary root-domain local development.

## Commands

| Command                 | Purpose                                           |
| ----------------------- | ------------------------------------------------- |
| `npm run dev`           | Start the Next.js development server              |
| `npm run build`         | Create the static production export in `out/`     |
| `npm run preview`       | Serve the existing `out/` directory at port 4173  |
| `npm start`             | Alias for the static production preview           |
| `npm run lint`          | Run ESLint without rewriting files                |
| `npm run typecheck`     | Run strict TypeScript checking                    |
| `npm test`              | Run the Vitest suite once                         |
| `npm run test:watch`    | Run Vitest in watch mode                          |
| `npm run test:e2e`      | Build, serve, and run the Chromium smoke suite    |
| `npm run test:e2e:only` | Run Playwright against an existing `out/` build   |
| `npm run format`        | Format supported repository files                 |
| `npm run check`         | Check formatting, lint, types, and unit tests     |
| `npm run quality`       | Run all checks, build, and Playwright smoke tests |

To test a deployed site instead of starting the local preview server, provide an absolute base URL:

```bash
PLAYWRIGHT_BASE_URL=https://example.com npm run test:e2e:only
```

In PowerShell, use `$env:PLAYWRIGHT_BASE_URL="https://example.com"` before the npm command.

## Project structure

```text
src/
  app/                  Next.js shell, metadata, error/loading states, and global theme
  components/           Canvas, nodes, navigation, panels, and shared UI
  data/portfolio.ts     The single source of truth for portfolio content and graph structure
  data/localization.ts  EN/SK presentation copy and non-destructive localization helpers
  lib/                  Layout, navigation, URL, asset, analytics, and status utilities
  types/portfolio.ts    Public content and graph contracts
  tests/                Unit tests
e2e/                    Playwright user-journey smoke tests
public/
  images/               Profile, project, certificate, and atmosphere assets
  documents/            Downloadable CV
```

Content must not be duplicated into components. Edit `src/data/portfolio.ts`; components consume its
typed nodes, graph definitions, credentials, details, actions, and image records.

## Updating Daniel's information

### Contact details

Recruitment, project-enquiry and phone actions are defined once in `portfolioActions` inside
`src/data/portfolio.ts`. Update both the visible `value` and matching `mailto:` or `tel:` target,
retain the relevant analytics event, and review the accessible label whenever a contact changes.

### Profile photo

1. Export a square, responsibly compressed JPEG; approximately 1,200 × 1,200 px is a useful source
   size.
2. Save it as `public/images/profile/daniel-laky.jpg`.
3. In the central data file, change the profile image availability to `available` if it is still
   marked as a placeholder.
4. Rebuild and verify the crop on desktop and mobile.

If the file is absent or cannot load, the UI uses Daniel's initials and never renders a broken-image
icon.

### CV

The bilingual source and approved one-page layout live in `scripts/build_cvs.py`. It requires Python
3 and ReportLab; run `python -m pip install reportlab` once, then `python scripts/build_cvs.py` to
regenerate both files. Visually review both pages after every content change.

1. Keep the English and Slovak content in the generator aligned with verified portfolio data.
2. Preserve the generated filenames `public/documents/Daniel_Laky_Remote_Roles_CV.pdf` and
   `public/documents/Daniel_Laky_CV_Slovak.pdf`, including exact casing.
3. Keep both central actions set to `asset-dependent`; the server page checks each file during the
   build.
4. Run `npm run build`, then confirm both automatically enabled controls download their respective
   documents rather than navigating to them.

Do not commit a renamed Word document or empty file with a `.pdf` extension. The asset directories
and format guidance are also documented in `public/ASSETS.md`.

### Add or edit a project

1. Add the project's content and action records to `src/data/portfolio.ts`. Use honest status wording
   such as `concept`, `prototype`, `in development`, `planned`, or `experimental`.
2. Add its project node to the Projects graph with a unique `id`, URL-safe `slug`, icon key, and
   `childGraphId`.
3. Add the child `GraphDefinition`, set `parentGraphId` and `parentNodeId`, choose `radial` or
   `timeline`, and connect each child with stable edge IDs.
4. Put optional images under `public/images/projects/<project-slug>/` and reference root-relative
   paths plus meaningful alternative text in the data file.
5. Add unit coverage if the change introduces new navigation or formatting behaviour.

Never add claimed customers, revenue, user counts, traction, or outcomes without verified evidence.

### Add or complete a credential

The core roadmap is deliberately narrow:

**Completed (4)**

| Issuer             | Official title                        | Classification                | Issued      | Expires     | ID         |
| ------------------ | ------------------------------------- | ----------------------------- | ----------- | ----------- | ---------- |
| OpenAI Academy     | AI Foundations                        | Course Completion Certificate | Aug 8, 2026 | —           | ee4dbt13hc |
| OpenAI Academy     | Applied AI Foundations                | Course Completion Certificate | Aug 8, 2026 | —           | 0ib8lgjtrv |
| OpenAI Academy     | Agents and Workflows                  | Course Completion Certificate | Aug 8, 2026 | —           | 77ariorgbi |
| Skillshop / Google | AI-Powered Shopping ads Certification | Vendor Certification          | Aug 9, 2026 | Aug 9, 2027 | 191040496  |

**Planned (14):** Anthropic — Claude 101, AI Fluency: Framework & Foundations, Claude Code in
Action; Google — Google Analytics Certification, Google Ads Search Certification; HubSpot —
Digital Marketing Certification, Inbound Sales Certification, Revenue Operations Certification;
IBM — Project Management Fundamentals, Data Fundamentals; Microsoft Applied Skills — Create and
manage automated processes by using Power Automate, Streamline business workflows with AI chat,
Generate reports with AI research agents; GitHub — GitHub Foundations Certification.

The three Microsoft entries are classified as **Applied Skills Credential**. GitHub Foundations is
classified as **GitHub Certification**, not as one of GitHub's beginner tutorial completions.

Do not restore superseded beginner entries or decorative issuer categories. Course completions,
learning badges, vendor certifications, Applied Skills credentials and professional certifications
must retain their truthful classification.

Credential records support:

```ts
{
  id: "issuer-credential-slug",
  title: "Credential title",
  issuer: "Issuer",
  category: "Issuer",
  issueDate: "2026-08-08",
  expirationDate: null,
  credentialId: "issuer-supplied-id",
  credentialUrl: "https://issuer.example/verify/...",
  certificateUrl: "/documents/certificates/semantic-certificate-name.pdf",
  certificateName: "Name printed by the issuer",
  certificateImage: null,
  status: "earned",
  description: "A factual description of the verified credential.",
  skills: ["Relevant skill"],
  featured: false,
  verificationType: "Course Completion Certificate",
}
```

Only change `status` to `earned` after the credential is actually awarded. Add issuer evidence as a
local `certificateUrl`, an official `credentialUrl`, or both. A certificate image is optional; do not
create a fake one. Use `in progress` only for active study and `planned` for intended learning. The UI
distinguishes status with text and icons as well as colour. Planned and in-progress credential cards
remain visible but static: they cannot open details, images, or verification actions until earned.

### English and Slovak content

English is the canonical content in `src/data/portfolio.ts`. `src/data/localization.ts` translates
presentation copy into Slovak while preserving official credential and project titles, issuer names,
IDs, slugs, URLs and file paths. When adding user-facing copy, add its Slovak equivalent through the
existing localization layer and run both localization unit tests and the language-switching browser
test. Do not create a second graph or credential source for Slovak.

### Edit graph structure

Every navigable level is a `GraphDefinition`. A parent node's `childGraphId` must match the child
graph's key, and the child points back with `parentGraphId` and `parentNodeId`. Slugs form the public
URL path—for example `projects/growthstack`—so changing a published slug breaks existing links.

The centre node must exist in the graph's `nodes` array. Positions are generated by layout utilities;
do not hardcode React Flow coordinates into content or enable permanent node dragging.

## Visual system

Global design tokens are defined near the top of `src/app/globals.css`. The primary variables include
canvas and surface colours, text and accent colours, status colours, borders, focus rings, node
shadows, corner radii, transition durations, and easing. Change tokens rather than introducing
one-off values in individual components, then check contrast in both map and list views.

Manrope and Newsreader are configured through `next/font` in `src/app/layout.tsx`. To change fonts,
replace those imports and assignments while keeping the `--font-manrope` and `--font-newsreader`
variables—or update the corresponding theme aliases in `globals.css`—so every component continues to
inherit the type system.

## Accessibility

The graph is enhanced interaction, not the only route to the content. The same central data renders
as semantic HTML in list view for small screens, screen readers, users who prefer linear navigation,
and search engines. Unfinished credentials render as static articles rather than expandable cards.

Keyboard controls:

| Key                 | Result                                                   |
| ------------------- | -------------------------------------------------------- |
| `Tab` / `Shift+Tab` | Move between controls and nodes                          |
| `Enter` or `Space`  | Open the focused node                                    |
| `Escape`            | Close a detail panel, otherwise move to the parent graph |
| `Home`              | Return to the root graph                                 |

The map fits each level automatically. Manual wheel, pinch, double-click, button, and keyboard zoom
are intentionally disabled; pointer and touch panning remain available when needed.

The interface includes visible focus indicators, non-colour status labels, reduced-motion support,
large touch targets, focus restoration after dialogs, and a keyboard-help dialog. Keep alternative
text concise and specific, and retest keyboard order after changing graph contents.

Automated checks are useful but not sufficient. Before release, manually test VoiceOver or NVDA,
200% browser zoom, keyboard-only operation, reduced motion, forced colours, and a narrow touch
viewport.

## URL and static-export behaviour

Graph state is encoded as a query on the exported root page:

```text
/?path=projects
/?path=projects/growthstack
/?path=certifications/openai
```

Query-based deep links continue to resolve to `index.html` on static hosts. Invalid graph chains are
replaced safely with the root graph. `next.config.ts` enables `output: "export"`, so `npm run build`
creates a host-agnostic `out/` directory and does not require a Node server in production.

## Environment configuration

| Variable                               | Default                           | Purpose                                                                                  |
| -------------------------------------- | --------------------------------- | ---------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                 | `https://example.com` placeholder | Absolute production origin for canonical and social metadata                             |
| `NEXT_PUBLIC_BASE_PATH`                | empty                             | Subdirectory prefix such as `/DLportfolio`                                               |
| `NEXT_PUBLIC_GTM_ID`                   | empty                             | Enables forwarding to an already installed, consent-aware GTM `dataLayer`                |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID`        | empty                             | Enables fallback forwarding to an already installed, consent-aware `window.gtag`         |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | empty                             | Search Console HTML-tag verification token only, without the surrounding `<meta>` markup |
| `PLAYWRIGHT_BASE_URL`                  | local preview                     | Makes Playwright target an existing deployment                                           |

`NEXT_PUBLIC_BASE_PATH` is a build-time setting. Use a leading slash and no trailing slash. All
public-asset and navigation URLs must pass through the application's base-path helper.

## Analytics preparation and consent

`src/lib/analytics.ts` supports these typed, evidence-oriented events:

- `graph_opened`
- `project_viewed`
- `project_link_clicked`
- `credential_viewed`
- `credential_verification_clicked`
- `contact_action`
- `cv_downloaded`
- `linkedin_clicked`
- `github_clicked`
- `email_clicked`

The module is deliberately inert unless an ID is configured **and** the matching consent-aware
runtime already exists. With `NEXT_PUBLIC_GTM_ID`, events go to `window.dataLayer`; with only
`NEXT_PUBLIC_GA_MEASUREMENT_ID`, they go to `window.gtag`. GTM is preferred when both are configured,
which avoids duplicate forwarding. The module never injects Google scripts, writes cookies, or
stores consent. Merely setting an ID does not install or activate Google Analytics.

To add Google Analytics later:

1. Determine the lawful basis and consent requirements for the visitor's jurisdiction with an
   appropriate privacy professional.
2. Add a consent interface and load Google's script only after the visitor makes the required choice.
3. Provide a privacy notice, retention settings, consent withdrawal, and any required regional
   defaults before collecting data.
4. Install either GTM or GA4 through that consent gate, set `NEXT_PUBLIC_GTM_ID` or
   `NEXT_PUBLIC_GA_MEASUREMENT_ID` in the deployment environment, rebuild, and verify that no Google
   request or cookie occurs before consent.

Do not paste a measurement script directly into the root layout merely because the event abstraction
exists.

## SEO and Google Search Console

The static export includes canonical metadata, Open Graph and X metadata, Person structured data,
`robots.txt`, and `sitemap.xml`. Set `NEXT_PUBLIC_SITE_URL` to the real HTTPS origin before a
production build; `NEXT_PUBLIC_BASE_PATH` supplies the GitHub Pages project path when required.

For Google Search Console HTML-tag verification, copy only the token from Google's
`content="..."` value into `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, rebuild, deploy, confirm the tag is
present in the exported page, then complete verification in Search Console. Submit the deployed
`sitemap.xml` after the canonical domain is final. No verification token is committed to this
repository.

## Firebase decision

**Firebase reviewed — not currently necessary for this repository.** The portfolio is a static
export with no authentication, database, uploads, messaging or server-side feature that Firebase
would solve. Reconsider it only when a concrete product requirement needs one of those services.

## Locriva and Emotecture follow-up

This update does not claim analytics or SEO work in another repository. The relevant next steps are
kept intentionally short. An adjacent Locriva checkout was reviewed; its own launch/privacy guidance
requires privacy and consent work before analytics activation. No Emotecture repository was available
in this workspace.

The remaining checklist is:

| Project    | Integration                                                                         | Required access/config                                                                                            | Next action                                                                                                                          |
| ---------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Locriva    | Consent-aware GTM/GA4, Search Console, technical SEO and real lead events           | Explicit repository scope, production domain, GTM/GA4 IDs, Search Console token and approved privacy/consent flow | Review its existing launch/privacy constraints, then implement only after consent requirements and real lead actions are confirmed   |
| Emotecture | Technical SEO, Search Console and commerce measurement only for features that exist | Repository/platform access, production URL, actual catalogue/funnel evidence, IDs and verification token          | Supply the repository and deployment context; map real product/contact/checkout actions before adding events or Merchant Center work |

Shopping Ads, Merchant Center, product feeds and Performance Max for Retail remain
credential-backed knowledge/future application paths. Neither project should claim active campaigns,
feeds, spend or results until those implementations can be verified.

## Deployment

### Vercel

1. Import the repository into Vercel.
2. Keep the detected framework as Next.js and the build command as `npm run build`.
3. Leave `NEXT_PUBLIC_BASE_PATH` empty.
4. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin.
5. Deploy and test a direct query URL, the CV, browser Back/Forward, and metadata.

The project is statically exported even on Vercel; no server functions are required.

### GitHub Pages

The `.github/workflows/deploy-pages.yml` workflow publishes automatically after a successful push to
`main` and can also be run manually.

1. Push the repository to GitHub with `main` as the default branch.
2. In **Settings → Pages**, choose **GitHub Actions** as the source.
3. Add the relevant repository variables from the environment table. Analytics IDs are optional and
   must not be set until the matching consent-aware runtime exists.
4. Push to `main`, or run **Deploy static export to GitHub Pages** manually from the Actions tab.

The workflow uses `https://<owner>.github.io` as the site origin, builds project sites with
`/<repository-name>` as the base path, uploads `out/`, and deploys it to the `github-pages`
environment. It automatically leaves the base path empty for a root repository named
`<owner>.github.io`. `NEXT_PUBLIC_SITE_URL` must contain the origin only; do not repeat the repository
path, because `NEXT_PUBLIC_BASE_PATH` adds it. For a custom domain, set the canonical site origin,
clear the base path when the site is served at `/`, and follow GitHub's domain/DNS instructions.

### Another static host

```bash
npm run build
```

Upload the contents of `out/` to the host's public directory. If the site lives below a path, build
with `NEXT_PUBLIC_BASE_PATH=/that-path`; otherwise leave it empty. Configure HTTPS, compression, cache
immutable `_next/static` files aggressively, and avoid caching HTML indefinitely. The host only needs
to serve the root `index.html`; graph deep links are query strings, not exported nested routes.

## Testing and release checklist

Run the full local gate:

```bash
npx playwright install chromium
npm run quality
```

The Playwright smoke suite verifies the root graph, Projects and Growthstack navigation, browser Back,
Escape to root, both CV controls, sequential keyboard entry, direct URLs, invalid-path recovery,
completed credential details, inactive planned credentials, EN/SK switching, disabled manual zoom,
and serious or critical automated accessibility violations. It also exercises narrow-screen list
view and checks that the document does not overflow horizontally. The CI workflow repeats these
checks on pushes to `main` and pull requests.

Dependency overrides keep the statically exported build on patched PostCSS and Sharp releases.
Dependabot and `npm audit` should remain clear before deployment; do not force incompatible framework
downgrades in response to an automated suggestion.

Before publishing new or revised content:

- Confirm every public contact target and manually open both CV PDFs.
- Review every credential status and verification link.
- Optimise and inspect every image at mobile and desktop sizes.
- Run Lighthouse against the production export and address practical regressions toward the stated
  performance, accessibility, best-practice, and SEO targets.
- Test a deployed deep link and base-path asset loading.

## Future improvements

- Add verified project demonstrations and case studies as they become real.
- Replace gallery placeholders with responsibly compressed, captioned photography.
- Add future credential evidence only after it is genuinely earned and verified.
- Add visual regression snapshots after the real assets stabilise.
- Add a consent-managed analytics provider only if its value justifies the privacy cost.
- Revisit content and skill labels as Daniel gains evidence and experience.

## License

The website source code is available under the [MIT License](LICENSE). Daniel Laky's personal content,
CV, photography, project artwork, certificate images, names, and brand assets are excluded; see the
[content and asset notice](NOTICE.md).
