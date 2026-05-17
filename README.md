# Noqlen Interface Studio

Noqlen Interface Studio is the visual-only workspace for exploring interface contracts across the Noqlen ecosystem.

Bloco 0 bootstraps a Vite, React, TypeScript and Tailwind CSS app with a minimal interactive shell for Anchor, Flux, Forge and Aria. Anchor is selected by default and is intentionally more developed than the other placeholder tabs.

## Core Rule

This repository must not implement real backend access, downloads, server control, playback, music library access, secrets, personal paths or real app integration. All UI states in Bloco 0 are mock-only.

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

1. Anchor
2. Flux
3. Forge
4. Aria

Stop after the current block scope. Bloco 1 is not part of this bootstrap.
