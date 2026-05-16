# Browser MCP Workflow

Use Browser MCP only for local visual verification.

Recommended flow:

1. Identify the local dev server URL or ask the user.
2. Use Playwright MCP for navigation and interaction.
3. Use Chrome DevTools MCP for console, network, DOM, CSS, screenshots and performance.
4. Record findings in the active review notes.

Do not add MCP packages to project dependencies.
