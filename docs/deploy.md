# Deploy

Noqlen Interface Studio is deployed as a static, visual-only GitHub Pages site.

Public URL: https://jssantogit.github.io/noqlen-interface-studio/

## Boundaries

- Static deploy only.
- Mock-only UI states only.
- No backend, secrets, auth, analytics, downloads, server runtime or real Anchor/Flux/Forge/Aria behavior.
- Build output is `dist`.
- Deploy source is GitHub Actions, not a committed `dist` directory or a manual `gh-pages` branch.

## Workflow

The deploy workflow is `.github/workflows/deploy-pages.yml`.

It runs on pushes to `main` and on manual `workflow_dispatch`, installs dependencies with `npm ci`, builds with `GITHUB_PAGES=true npm run build`, uploads `./dist`, and deploys using GitHub Actions Pages.

If GitHub Pages is not enabled, configure:

GitHub repo -> Settings -> Pages -> Build and deployment -> Source -> GitHub Actions

## Local Preview Validation

Run:

```sh
npm run build
GITHUB_PAGES=true npm run build
npm run test -- --run
```

For a browser preview of the production bundle, run a local static preview command such as `npm run preview` after building, then verify that the visual shell loads and remains mock-only.

## Deployed Page Validation

After the Pages workflow succeeds, open:

https://jssantogit.github.io/noqlen-interface-studio/

Verify:

- The main interactive page loads.
- Anchor is selected by default.
- Anchor, Flux, Forge and Aria tabs remain visual placeholders or mock-only UI.
- No real backend calls, auth, analytics, downloads, playback, server control or external integrations are introduced.
