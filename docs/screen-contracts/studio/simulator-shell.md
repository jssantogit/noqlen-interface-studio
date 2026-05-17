# Studio Simulator Shell Screen Contract

## Purpose

Define the visual base for Noqlen Interface Studio as a mobile simulator shell.

## Required Elements

- `StudioTopBar`: compact Studio identity and subtle visual-only boundary.
- `AppSwitcher`: switches Anchor, Forge, Aria and Flux at Studio level.
- `PhoneFrame`: realistic rounded phone container.
- `PhoneStatusBar`: fake device status only.
- `AppViewport`: scrollable phone content area.
- `PhoneHomeIndicator`: fake device home indicator only.
- `ConceptPlaceholder`: app-specific placeholder content rendered by each preview component.

## Boundaries

- No backend calls.
- No real integrations.
- No downloads.
- No playback.
- No server controls.
- No secrets, auth or analytics.
- No full Anchor, Forge, Aria or Flux screens in this block.
