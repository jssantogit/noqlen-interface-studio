# Tooling Bootstrap

Environment bootstrap is separate from product implementation. Report tooling state before implementation starts.

- OpenCode native is the baseline workflow tool.
- Serena read-only is optional semantic navigation and must not edit files unless a future block explicitly allows it.
- RTK / Rust Token Killer is optional shell-output control for command-heavy blocks; compressed output is not audit evidence.
- Context Mode is a pilot for long sessions and context/output routing.
- Caveman is disabled by default and must not be used for specs, ADRs, audits, handoffs, release notes or public docs.
- Browser MCP remains required for visual QA of this web project: Playwright MCP for navigation/interaction and Chrome DevTools MCP for console, network, DOM, CSS, screenshots and performance.
- Local configs, auth files and generated tool state are not committed.
- If a tool cannot be installed or configured, report the limitation and residual risk instead of guessing.

## Current Check

- Node, npm, npx, Python, Git and OpenCode are available locally.
- Browser MCP is configured locally with Playwright MCP and Chrome DevTools MCP connected through OpenCode.
- Serena CLI is available; use read-only mode unless a future block explicitly allows edits.
- RTK CLI is available; `rust-token-killer` alias is not available.
- Context Mode is not exposed as an OpenCode command in this environment and remains pilot/pending; current Node is below the playbook's Context Mode prerequisite.
- Caveman was not found in repository-local config search and remains disabled/not configured.
