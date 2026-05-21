# Workflow

Work in block order and stop at the active block boundary.

Current Noqlen loop:

Plan -> Block -> Prompt -> Tool Mode -> Inspect -> Implement -> Validate -> Audit -> Fix -> Commit -> Handoff -> Next block

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

## Current implementation state

The repository has moved beyond the initial static shell phase:

1. **Studio Shell** is a stable responsive simulator shell.
2. **Anchor** is a high-fidelity interactive mock foundation.
3. **Forge** is an advanced interactive mock preview.
4. **Aria** is in visual alignment/refinement using approved reference images.
5. **Flux** remains an intentionally neutral placeholder until a dedicated concept block begins.

The Studio shell is a simulator, not a dashboard. The phone frame is the main stage. App previews may be interactive, but every interaction must remain mock-only, local-state-only and display-only.

## Current development order

1. Keep repository truth, contracts and handoff docs aligned with the actual implementation state.
2. Use the visual alignment process before patching reference-driven UI.
3. Align Aria against the approved references before adding more Aria product depth.
4. Add or refine Aria screens one scoped batch at a time.
5. Refactor Anchor only after preserving its current behavior and without changing appearance.
6. Refactor Forge only after preserving its current behavior and without changing appearance.
7. Add behavior tests for important mock flows.
8. Run responsive and hygiene validation before release-ready handoff.

## Visual alignment workflow

Reference-driven UI work must treat images as visual contracts, not loose inspiration.

Before editing visual code:

1. Identify the approved reference image for the target screen.
2. Inspect the current implementation in browser when available.
3. List concrete visual gaps: layout, spacing, hierarchy, typography, color, border, blur, nav position and scroll behavior.
4. Declare allowed files and forbidden files.
5. Patch only the active block scope.
6. Validate with screenshots when available.
7. Report remaining differences honestly.

Do not redesign freely. Do not change StudioLayout, PhoneFrame, PhoneStage or AppViewport during app-specific alignment unless the active block explicitly allows it.

## Mock-only boundary

All work remains visual-only until a future handoff explicitly changes that rule.

Do not add:

- real backend calls;
- real downloads;
- real server or process control;
- real playback;
- real music library access;
- filesystem reads/writes;
- secrets, credentials, auth or analytics;
- network-dependent app behavior.

## Validation

Workflow and hygiene validation should include:

```bash
npm run lint
npm run test -- --run
npm run build
python3 scripts/check_repo_hygiene.py
```
