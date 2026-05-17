# Workflow

Work in block order and stop at the active block boundary.

Current Noqlen loop:

Plan -> Block -> Prompt -> Tool Mode -> Implement -> Validate -> Audit -> Fix -> Commit -> Handoff -> Next block

Every tool-assisted block must declare Tool Mode. Use `none` when no optional accelerator affects the block. Supported values for this repository are:

- `none`: no optional accelerator affects the block.
- `native`: OpenCode native capabilities only.
- `serena-ro`: Serena read-only semantic navigation.
- `rtk`: RTK / Rust Token Killer command output control for shell-heavy blocks.
- `context-mode`: Context Mode routing or long-session support during pilot use.
- `browser-mcp`: Playwright MCP and Chrome DevTools MCP for visual QA.
- `combo`: multiple accelerators; list each one and evidence rules.
- `combo-bootstrap`: environment/tooling bootstrap plus more than one accelerator check.

Environment bootstrap is separate from product implementation unless a prompt explicitly says otherwise. A bootstrap block reports tooling state before any implementation starts and prefers global/user-level setup over project-local config.

Raw evidence is required for serious debugging, validation failures, audits, release readiness, boundary changes and security-sensitive changes. Summaries or compressed output may help exploration, but they do not replace raw failures, touched files, validation commands or audit evidence.

Human review is required for risky changes, including destructive operations, deploy/release changes, public boundary changes, security-sensitive changes and any departure from the mock-only product boundary.

Workflow retrofit blocks must not implement product behavior, change app UI, or start Anchor, Navidrome settings, Activity, Forge, Aria or Flux work.

Current development order:

1. Stabilize the Studio simulator shell.
2. Build Anchor-specific visual mockups only when that block starts.
3. Build Forge-specific visual mockups only when that block starts.
4. Build Aria-specific visual mockups only when that block starts.
5. Build Flux-specific visual mockups only when that block starts.

Each block should update screen contracts, interface context and review checklists before implementation is considered complete.

The Studio shell is a simulator, not a dashboard. The phone frame is the main stage, and previews inside it are placeholders until app-specific blocks begin.

All work remains visual-only until a future handoff explicitly changes that rule.

Workflow and hygiene validation should include:

```bash
python3 scripts/check_repo_hygiene.py
```
