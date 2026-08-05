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
- Put certificate images in `images/certificates/`.

Adding a file to a folder does not publish it in the UI by itself. Reference its root-relative path
in `src/data/portfolio.ts`, for example `/images/projects/growthstack/homepage.webp`. Prefer WebP or
AVIF for gallery media, remove embedded location metadata, and write meaningful alternative text in
the central data file.

Do not replace `.gitkeep` with a fake file carrying a `.jpg` or `.pdf` extension. Invalid placeholder
assets create confusing browser and download failures.
