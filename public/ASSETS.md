# Portfolio asset drop zones

These folders never use fake image or PDF files. The application renders designed fallbacks whenever
an optional asset is absent, so a missing file never becomes a broken-image icon.

## Required personal files

- Add Daniel's profile photo as `images/profile/daniel-laky.jpg`. Use a square, high-quality JPEG;
  1,200 × 1,200 px is a practical source size.
- The reviewed English CV is stored as `documents/Daniel_Laky_Remote_Roles_CV.pdf`, and the matching
  Slovak CV is stored as `documents/Daniel_Laky_CV_Slovak.pdf`. Keep both exact filenames when
  replacing them so their download controls continue to work.

## Optional project and credential files

- Put Growthstack images in `images/projects/growthstack/`.
- Put Emotecture Studio images in `images/projects/emotecture/`.
- Put Klinepilot images in `images/projects/klinepilot/`.
- Put custom clothing, shoes, photography, and other experiments in
  `images/projects/creative/`.
- Put certificate images in `images/certificates/` only when an issuer-provided image is available.

## Credential evidence

The four supplied credential PDFs are published intentionally under semantic filenames:

- `documents/certificates/openai-ai-foundations-ee4dbt13hc.pdf`
- `documents/certificates/openai-applied-ai-foundations-0ib8lgjtrv.pdf`
- `documents/certificates/openai-agents-and-workflows-77ariorgbi.pdf`
- `documents/certificates/google-ai-powered-shopping-ads-191040496.pdf`

Keep the three OpenAI entries classified as **Course Completion Certificate**, not professional
certification. The Google AI-Powered Shopping ads credential is a **Vendor Certification** and uses
both its supporting PDF and official Credential.net verification URL. Its issuer-supplied badge is stored as
`documents/certificates/google-ai-powered-shopping-ads-badge.png`; do not substitute a fabricated
certificate image.

Do not place the raw W3C credential JSON in `public/`. Treat it as source metadata; public visitors
should use the issuer's verification URL instead.

Adding a file to a folder does not publish it in the UI by itself. Reference its root-relative path
in `src/data/portfolio.ts`, for example `/images/projects/growthstack/homepage.webp`. Prefer WebP or
AVIF for gallery media, remove embedded location metadata, and write meaningful alternative text in
the central data file.

Do not replace `.gitkeep` with a fake file carrying a `.jpg` or `.pdf` extension. Invalid placeholder
assets create confusing browser and download failures.
