# AGENTS.md

Noqlen Interface Studio is visual-only. Do not add real backend calls, downloads, server control, playback, music library access, secrets, personal paths or real app integration.

When the user asks to verify the site in the browser, use Playwright MCP for navigation/interaction and Chrome DevTools MCP for console, network, DOM, CSS, screenshots and performance. For local web projects, first identify the dev server port or ask the user for the local URL.

Prefer small, explicit changes. Never commit local OpenCode config, secrets, generated build output or scratch files.
