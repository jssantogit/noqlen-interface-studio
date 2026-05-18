# Simulator Virtual Viewport Fix Audit

Date: 2026-05-18

Block: Bloco 2.7.3

Tool Mode: combo

## Scope

- Fix simulator viewport squeeze by keeping app layouts on a stable virtual phone viewport.
- Keep the phone frame CSS/component-based and interactive.
- Do not add Anchor features, backend calls, downloads, server control, playback, filesystem access, secrets or real app integration.

## Root Cause

- The outer simulator fit the responsive shell, but the app viewport inherited the available scaled space as its logical CSS width.
- Before this fix, `.phone-app-viewport` measured around `208px` wide at `360x800` and around `261px` wide at `1366x768`.
- Anchor screens therefore wrapped like an ultra-narrow layout even when the hardware frame itself looked plausible.

## Change

- Added `src/components/phone/PhoneStage.tsx` to measure available shell space and scale the whole phone frame.
- Defined virtual viewport variables in `src/index.css`: `--phone-virtual-width: 390px`, `--phone-virtual-height: 844px`, rim and bezel values.
- Updated `PhoneFrame` to use fixed frame dimensions derived from virtual viewport plus rim/bezel.
- Updated `AppViewport` to keep `width` and `min-width` at the virtual viewport width.
- Kept `.phone-app-viewport` children constrained without allowing the viewport element itself to shrink.

## Browser Evidence

Playwright validation against the local dev server confirmed:

- `.phone-app-viewport` computed CSS width stayed `390px` across tested viewports.
- Page scroll width stayed within the viewport width at `360x800`, `390x844`, `430x932`, `768x1024`, `1366x768`, `1440x900` and `1920x1080`.
- Visual scale was about `0.5768` at `360x800`, `0.6264` at `390x844`, `0.7429` at `430x932`, `0.8953` at `768x1024`, `0.7257` at `1366x768`, `0.8803` at `1440x900` and `1` at `1920x1080`.
- Anchor Home title stayed one line and bottom navigation labels remained present.
- Anchor Servers, Navidrome Settings, Library and Activity remained readable after waiting for transitions.
- Navidrome Settings category chips and environment preview remained usable without horizontal overflow.
- Forge, Aria, Flux and Anchor all opened at the `390px` virtual app viewport.

Chrome DevTools MCP could not be used in this environment because the headful browser lacked an X server. Playwright MCP was used for the browser evidence instead.

## Boundary

- The simulator remains visual-only.
- No real backend, network, filesystem, server-control, playback, library access or secret handling was added.
- The committed phone reference image remains a design target only, not a runtime asset.
