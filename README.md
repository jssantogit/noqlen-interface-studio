# Noqlen Interface Studio

Noqlen Interface Studio is the visual-only mobile simulator lab for exploring interface contracts across the Noqlen ecosystem.

Bloco 1 aligns the site around a premium simulator shell: a minimal external Studio UI, an app selector, and a responsive simulated phone frame where Anchor, Forge, Aria or Flux appears as a static visual placeholder. Anchor is selected by default.

## Core Rule

This repository must not implement real backend access, downloads, server control, playback, music library access, secrets, personal paths or real app integration. The Studio is not the app itself; it is a visual lab/simulator. App previews inside the phone remain mock-only placeholders.

## Simulator Model

- Minimal external lab shell.
- Direct app selector for Anchor, Forge, Aria and Flux.
- Simulated phone frame as the main stage.
- Responsive shell sizing documented in `docs/visual-contracts/responsive-shell.md`.
- Fake phone status bar and home indicator.
- Static app placeholders inside the phone.
- App-specific interactive screens start only after this visual base is stable.

## Stack

- Vite
- React
- TypeScript
- Tailwind CSS via `@tailwindcss/vite`
- lucide-react
- framer-motion
- clsx, tailwind-merge and class-variance-authority
- react-router-dom
- Vitest, jsdom and Testing Library

## Scripts

- `npm run dev`
- `npm run lint`
- `npm run build`
- `GITHUB_PAGES=true npm run build`
- `npm run test -- --run`

## Deploy

Public GitHub Pages URL: https://jssantogit.github.io/noqlen-interface-studio/

Deployment is static and mock-only through GitHub Actions Pages. The workflow lives at `.github/workflows/deploy-pages.yml`, builds with `GITHUB_PAGES=true npm run build`, uploads `./dist`, and does not commit generated build output.

See `docs/deploy.md` for local preview and deployed-page validation.

## Development Order

1. Stabilize Studio simulator shell.
2. Build app-specific mockups one app at a time.
3. Keep each block visual-only unless a future handoff explicitly changes scope.

Stop after the current block scope. Bloco 1 does not start Anchor, Forge, Aria or Flux screen development.
