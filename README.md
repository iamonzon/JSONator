# JSONator

Automatic JSON diff viewer for pull requests. When a PR changes `.json` files, a GitHub Action generates a visual diff and deploys it to GitHub Pages.

## How it works

1. Open a PR that changes any `.json` file
2. The GitHub Action detects the changes and builds a diff viewer
3. A comment is posted on the PR with a link to the viewer
4. The viewer shows a tree-based structural diff with expand/collapse, highlighting additions (green), removals (red), and modifications (yellow)

## Viewer features

- Side-by-side tree view with expand/collapse
- Structural diff highlighting (added/removed/modified)
- "Changes only" toggle to filter unchanged keys
- Synced scrolling between panels
- File tabs for PRs with multiple changed files
