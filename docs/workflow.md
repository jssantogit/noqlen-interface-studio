# Workflow

Work in block order and stop at the active block boundary.

Current development order:

1. Stabilize the Studio simulator shell.
2. Build Anchor-specific visual mockups only when that block starts.
3. Build Forge-specific visual mockups only when that block starts.
4. Build Aria-specific visual mockups only when that block starts.
5. Build Flux-specific visual mockups only when that block starts.

Each block should update screen contracts, interface context and review checklists before implementation is considered complete.

The Studio shell is a simulator, not a dashboard. The phone frame is the main stage, and previews inside it are placeholders until app-specific blocks begin.

All work remains visual-only until a future handoff explicitly changes that rule.
