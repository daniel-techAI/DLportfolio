# DLportfolio

A responsive, zero-dependency interactive portfolio for **Daniel Laky**. The site presents experience, projects, skills, planned credentials, education and contact information as a zoomable, navigable mind map.

## Live site

After GitHub Pages is enabled, the site will be available at:

**https://daniel-techai.github.io/DLportfolio/**

## Repository description

Use this as the GitHub repository description:

> Interactive portfolio mapping my experience, projects, skills and entrepreneurial work across business, operations, websites, AI systems and creative direction.

Use this in the repository **Website** field:

`https://daniel-techai.github.io/DLportfolio/`

## Upload to GitHub

1. Extract `DLportfolio.zip`.
2. Open the extracted `DLportfolio` folder.
3. In the GitHub repository, choose **Add file → Upload files**.
4. Upload the **contents of the folder**, so `index.html`, `styles.css`, `script.js`, `.nojekyll` and the `assets` folder sit directly in the repository root.
5. Commit the files to `main`.
6. Open **Settings → Pages**.
7. Under **Build and deployment**, select **Deploy from a branch**.
8. Choose `main` and `/ (root)`, then save.

GitHub normally publishes the page after the deployment finishes. Apparently websites need a small administrative ceremony before becoming visible.

## Files

- `index.html` — semantic page structure and portfolio interface
- `styles.css` — dark responsive visual system
- `script.js` — portfolio data, map navigation, zoom, pan and history
- `.nojekyll` — disables Jekyll processing on GitHub Pages
- LinkedIn profile badge — loaded from LinkedIn’s official badge script and shown on the main profile detail

## Optional personal changes

- The LinkedIn badge and profile links already point to Daniel Laky’s public LinkedIn profile.
- Add a public email to the Contact object in `script.js` only when you are comfortable publishing it.
- Never upload IDs, contracts, private certificates or documents containing personal identifiers.

## Local preview

Open `index.html` directly in a modern browser. No installation, build command or paid Codex ration is required.

## Updating certificates

When a course is completed, update its item in `script.js` only after keeping evidence of completion. Change `status` from `Planned` to `Completed`, replace the planned wording, add the issuer and completion date, and add a public credential URL when one exists. Do not upload certificates containing private identifiers directly into a public repository.
