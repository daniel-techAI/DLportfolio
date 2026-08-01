#!/usr/bin/env bash
set -euo pipefail

REPO_URL="https://github.com/daniel-techAI/DLportfolio.git"
BRANCH="main"

command -v git >/dev/null 2>&1 || { echo "Git is required."; exit 1; }

if [ ! -d .git ]; then
  git init
fi

git branch -M "$BRANCH"
git add .
if ! git diff --cached --quiet; then
  git commit -m "Publish portfolio with LinkedIn badge"
fi

if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$REPO_URL"
else
  git remote add origin "$REPO_URL"
fi

git push -u origin "$BRANCH"

echo "Files pushed. Enable GitHub Pages from main / root if it is not already enabled."
echo "Live URL: https://daniel-techai.github.io/DLportfolio/"
