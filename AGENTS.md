# AGENTS.md

Noqlen Interface Studio is visual-only. Do not add real backend calls, downloads, server control, playback, music library access, secrets, personal paths or real app integration.

When the user asks to verify the site in the browser, use Playwright MCP for navigation/interaction and Chrome DevTools MCP for console, network, DOM, CSS, screenshots and performance. For local web projects, first identify the dev server port or ask the user for the local URL.

Prefer small, explicit changes. Never commit local OpenCode config, secrets, generated build output or scratch files. Do not use `git add .`.

- Work only on the requested block and stop after it.
- Every block must declare Tool Mode; use the smallest safe context.
- Environment bootstrap is separate from product implementation.
- Optional tooling supports the workflow; it never replaces validation, audit or human review.
- Preserve raw evidence for serious debugging, validation failures, audits, boundary/security-sensitive changes and release readiness.
- Do not commit local agent/tool configs, credentials, auth files, generated tool state or personal paths.
