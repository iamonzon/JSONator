# JSONator

Automatic JSON diff viewer for pull requests. Add this to any repo and get a visual diff viewer deployed to GitHub Pages whenever a PR changes JSON or Redis hset/set files.

## Setup

1. Copy these into your repo:
   - `.github/workflows/json-diff.yml`
   - `viewer/index.html`
   - `tools/parse-file.mjs`
2. Enable GitHub Pages from the `gh-pages` branch in repo settings
3. Open a PR — the action handles the rest

## How it works

1. A PR is opened or updated
2. The GitHub Action detects changed files and runs them through a smart parser (handles plain JSON and Redis hset/set command files)
3. Non-JSON files are skipped, files with no actual JSON difference are skipped
4. A diff viewer is deployed to GitHub Pages at `/pr/<number>/`
5. A comment is posted on the PR with the viewer link

## Viewer features

- Side-by-side tree view with expand/collapse
- Structural diff highlighting: added (green), removed (red), modified (yellow)
- Ancestor highlighting for collapsed nodes containing changes
- "Changes only" toggle to filter unchanged keys
- Synced scrolling between panels
- File tabs for PRs with multiple changed files

## Supported formats

- **Plain JSON** (`.json` files) — used directly
- **Redis hset/set commands** — parsed to JSON objects automatically
