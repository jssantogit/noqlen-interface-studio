# AGENTS.md

Noqlen Interface Studio is visual-only. Do not add real backend calls, downloads, server control, playback, music library access, secrets, personal paths or real app integration.

The current implementation is not just the initial static shell anymore:

- Anchor is a high-fidelity interactive mock foundation.
- Forge is an advanced interactive mock preview.
- Aria is in visual alignment/refinement.
- Flux remains an intentionally neutral placeholder.

Interactive mock UI is allowed only when it stays local-state-only and display-only. Do not add real server control, real playback, real filesystem access, real library scanning, backend calls, auth, analytics or network-dependent app behavior.

When the user asks to verify the site in the browser, use Playwright MCP for navigation/interaction and Chrome DevTools MCP for console, network, DOM, CSS, screenshots and performance. For local web projects, first identify the dev server port or ask the user for the local URL.

For visual alignment work, treat references as visual contracts rather than loose inspiration:

1. Inspect the current screen.
2. Compare it against the approved reference.
3. List concrete visual gaps before editing.
4. Patch only the requested app/block.
5. Validate with screenshots when available.
6. Report remaining differences.

Prefer small, explicit changes. Never commit local OpenCode config, secrets, generated build output or scratch files. Do not use `git add .`.

- Work only on the requested block and stop after it.
- Every block must declare Tool Mode; use the smallest safe context.
- Environment bootstrap is separate from product implementation.
- Optional tooling supports the workflow; it never replaces validation, audit or human review.
- Preserve raw evidence for serious debugging, validation failures, audits, boundary/security-sensitive changes and release readiness.
- Do not commit local agent/tool configs, credentials, auth files, generated tool state or personal paths.
- Do not modify Studio shell, PhoneFrame, PhoneStage or AppViewport during app-specific visual alignment unless the active block explicitly allows it.
