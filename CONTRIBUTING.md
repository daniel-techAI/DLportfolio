# Contributing

This repository is Daniel Laky's personal portfolio. Bug fixes, accessibility improvements, and
carefully scoped technical suggestions are welcome.

## Development

1. Use Node.js 24 and run `npm ci`.
2. Create a focused branch from `main`.
3. Keep portfolio content in `src/data/portfolio.ts`; do not scatter personal data through components.
4. Run `npx playwright install chromium` once, then `npm run quality`.
5. Open a pull request that explains the user-visible change and the validation performed.

Do not add invented achievements, credential claims, customer metrics, private contact details, or
unlicensed personal assets. Report security concerns privately as described in `SECURITY.md`.
