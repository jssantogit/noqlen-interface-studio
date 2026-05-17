# Browser MCP

Local OpenCode Browser MCP support is configured through local `opencode.jsonc` or `opencode.json` only.

Declare Tool Mode `browser-mcp` when browser MCP meaningfully affects the block, or `combo` / `combo-bootstrap` when it is combined with other optional tooling.

Expected servers:

- Playwright MCP for navigation and interaction.
- Chrome DevTools MCP for console, network, DOM, CSS, screenshots and performance.

Do not add MCP packages to `package.json`. Local MCP commands use `npx -y` at runtime.

Local config files are excluded from git tracking unless the repository already tracks them.
