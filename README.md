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
- Every initial credential is marked `planned`; none is presented as earned.

### Screenshot placeholders

Production screenshots are pending Daniel's real profile and project imagery. The intended filenames
and capture sizes are documented in [`docs/screenshots/README.md`](docs/screenshots/README.md).

## Experience highlights

- Reusable radial and timeline graph layouts powered by React Flow.
- Recursive graph navigation with `?path=` URLs, history, breadcrumbs, Home, and Escape.
- Mouse, trackpad, keyboard, and touch navigation with automatic fit-to-view at every graph level.
- Continuous Motion transitions with a reduced-motion alternative.
- Accessible detail panels with focus management and a shared-data semantic list view.
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

Credential records support:

```ts
{
  id: "issuer-credential-slug",
  title: "Credential title",
  issuer: "Issuer",
  category: "Issuer",
  issueDate: "2026-07",
  expirationDate: null,
  credentialUrl: "https://issuer.example/verify/...",
  certificateImage: {
    id: "issuer-credential-image",
    src: "/images/certificates/issuer-credential.webp",
    alt: "Credential title certificate issued to Daniel Laky",
    placeholderLabel: "Credential image",
    availability: "available",
  },
  status: "earned",
  description: "A factual description of the verified credential.",
  skills: ["Relevant skill"],
  featured: false,
  verificationType: "verified digital credential",
}
```

Only change `status` to `earned` after the credential is actually awarded. Add the verification URL
and certificate image at the same time. Use `in progress` for active study and `planned` for intended
learning; the UI distinguishes all three with text and icons as well as colour. Planned and
in-progress credential cards remain visible but static: they cannot open details, images, or
verification actions until the credential is earned.

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

| Variable                          | Default                           | Purpose                                                                         |
| --------------------------------- | --------------------------------- | ------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`            | `https://example.com` placeholder | Absolute production origin for canonical and social metadata                    |
| `NEXT_PUBLIC_BASE_PATH`           | empty                             | Subdirectory prefix such as `/daniel-laky-portfolio`                            |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` | empty                             | Enables event forwarding only when a consent-aware `window.gtag` already exists |
| `PLAYWRIGHT_BASE_URL`             | local preview                     | Makes Playwright target an existing deployment                                  |

`NEXT_PUBLIC_BASE_PATH` is a build-time setting. Use a leading slash and no trailing slash. All
public-asset and navigation URLs must pass through the application's base-path helper.

## Analytics preparation and consent

`src/lib/analytics.ts` supports these typed events:

- `graph_opened`
- `project_viewed`
- `credential_viewed`
- `cv_downloaded`
- `linkedin_clicked`
- `github_clicked`
- `email_clicked`

The module is deliberately inert unless both `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` and an existing
`window.gtag` function are present. It never injects Google scripts, writes cookies, or stores consent.

To add Google Analytics later:

1. Determine the lawful basis and consent requirements for the visitor's jurisdiction with an
   appropriate privacy professional.
2. Add a consent interface and load Google's script only after the visitor makes the required choice.
3. Provide a privacy notice, retention settings, consent withdrawal, and any required regional
   defaults before collecting data.
4. Set `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` only in the deployment environment, rebuild, and verify that
   no network request or cookie occurs before consent.

Do not paste a measurement script directly into the root layout merely because the event abstraction
exists.

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
3. Optionally add the repository variable `NEXT_PUBLIC_SITE_URL` for a custom canonical origin.
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
inactive planned credentials, disabled manual zoom, and serious or critical automated accessibility
violations. It also exercises the narrow-screen list view and checks that the document does not
overflow horizontally. The CI workflow repeats these checks on pushes to `main` and pull requests.

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
- Add earned credential images and issuer verification links.
- Add visual regression snapshots after the real assets stabilise.
- Add a consent-managed analytics provider only if its value justifies the privacy cost.
- Revisit content and skill labels as Daniel gains evidence and experience.

## License

The website source code is available under the [MIT License](LICENSE). Daniel Laky's personal content,
CV, photography, project artwork, certificate images, names, and brand assets are excluded; see the
[content and asset notice](NOTICE.md).
