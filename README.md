# Noqlen Interface Studio

Noqlen Interface Studio is the visual-only mobile simulator lab for exploring mock interface contracts across the Noqlen ecosystem.

The project has moved beyond the first static shell phase. The Studio shell and phone simulator are stable enough to host app-specific mockups, while every app remains strictly visual-only and local-state-only.

## Current State

- **Studio Shell** — stable responsive simulator shell with app selector, phone frame and side inspector.
- **Anchor** — high-fidelity interactive mock foundation for local media server control.
- **Forge** — advanced interactive mock preview for library repair, metadata review and activity flows.
- **Aria** — music player and library mock currently in visual alignment/refinement.
- **Flux** — intentionally neutral static placeholder until dedicated concepts are provided.

## Core Rule

This repository must not implement real backend access, downloads, server control, playback, music library access, secrets, personal paths or real app integration.

The Studio is not the app itself. It is a visual lab/simulator. App previews inside the phone may be interactive, but interactions must stay mock-only: static data, local React state, display-only sheets/dialogs/toasts and no real integration.

## Simulator Model

- Minimal external lab shell.
- Direct app selector for Anchor, Forge, Aria and Flux.
- Simulated phone frame as the main stage.
- Responsive shell sizing documented in `docs/visual-contracts/responsive-shell.md`.
- Fake phone status bar and home indicator.
- App previews render inside a fixed virtual mobile viewport.
- App-specific work proceeds one scoped block at a time.
- Flux remains a placeholder until a dedicated concept block begins.

## Visual Alignment Model

Visual work must treat references as contracts, not loose inspiration.

For reference-driven UI work, use this loop:

1. Compare the current screen against the reference.
2. List concrete visual gaps before editing.
3. Patch only the active block scope.
4. Validate with browser screenshots when available.
5. Report remaining differences.

Do not redesign freely, change the Studio shell or modify unrelated apps during visual alignment blocks.

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

1. Keep repository truth, contracts and handoff docs aligned with the actual implementation state.
2. Preserve the Studio shell, PhoneFrame, PhoneStage and AppViewport unless a shell-specific block explicitly allows changes.
3. Align Aria visually against approved references before adding new Aria product depth.
4. Refactor Anchor and Forge only after their current behavior is protected and without changing appearance.
5. Add behavior tests for important mock flows.
6. Keep every block visual-only unless a future handoff explicitly changes scope.

Stop after the current block scope. Do not batch unrelated fixes into visual, architecture or documentation blocks.
