# Anchor Visible Interaction Gap Closure Audit

Date: 2026-05-18

Block: Bloco 2.8

Tool Mode: combo

## Audited Surfaces

- Home: settings, server controls, server-card menu icon, Library card and quick actions.
- Servers: add server, server cards, Navidrome details, server menu, logs, coming-soon cards, remove confirmation and empty state.
- Navidrome Settings: category chips, search, local draft fields, masked secret fields, TOML/env preview, dry-run, apply, reset and close actions.
- Library: folder picker, refresh scan, access check, settings toggles, stats details and scan history.
- Activity: filter sheet, activity cards, Details buttons, Startup failed error details, diagnostic copy and Navidrome Settings shortcut.
- Regression: Studio app switcher for Anchor, Forge, Aria and Flux.

## Gaps Found

- Home server-card `MoreVertical` icon looked tappable but was decorative.
- Add Server accepted empty display name and invalid port without visible validation.
- Navidrome secret fields were masked but their displayed value was hardcoded, so local edits were not visible as draft state behavior.
- Removing the mock Navidrome card produced an empty Servers state with copy that suggested refresh, but no visible local restore action.

## Fixed

- Wired the Home server-card menu icon to the existing local-only Server menu sheet.
- Added local Add Server validation for empty name, missing address and invalid mock port.
- Kept Add Server save toast-only and local; valid save restores the static Navidrome card if it had been removed.
- Added `Restore mock server` in the empty Servers state.
- Made secret/password Navidrome fields use local draft values while remaining masked.

## Components Changed

- `AnchorPreview.tsx`
- `AnchorHome.tsx`
- `AnchorServers.tsx`
- `AnchorAddServerSheet.tsx`
- `AnchorNavidromeSettingField.tsx`
- `anchorInteractionMap.ts`

## Disabled Or Deferred

- Jellyfin and Emby remain planned integrations and open coming-soon sheets only.
- Rename and duplicate remain toast-only mock actions.
- Add Server does not persist a new real server card; it remains a local mock confirmation surface.
- Real Anchor Core apply, Navidrome calls, filesystem access, log reads, port checks, clipboard dependency and credential handling remain deferred/forbidden.

## Browser Evidence Summary

- Home settings toggles, Home server menu, copy toast, QR sheet and refresh scan sheet responded.
- Servers Add Server type chips, inputs, validation errors and valid save responded.
- Server details, Configure Navidrome, View logs, log filters, rename, duplicate, disable, remove confirmation and restore responded.
- Jellyfin and Emby cards opened and closed coming-soon sheets.
- Navidrome Settings category navigation, local field editing, advanced search, env/TOML preview, dry-run and apply responded.
- Library folder picker, access re-check, settings save, stats and scan history responded.
- Activity filters, error details, diagnostic copy, Navidrome Settings shortcut and normal event detail responded.
- Responsive overflow evidence covered `360x800`, `390x844`, `430x932`, `1366x768` and `1440x900`; document and body scroll widths stayed within `window.innerWidth`, and `.phone-app-viewport` computed width stayed `390px`.
- Chrome DevTools MCP could not launch because the environment lacks an X server; Playwright MCP was used for browser validation.

## Mock-Only Safety Result

- No backend, Navidrome, Anchor Core, filesystem, real log, process, port, download, playback, analytics, auth or credential behavior was added.
- All changes are React-local state, sheets, validation messages or toasts.

## Remaining Known Gaps

- Full Anchor State Coverage is still the next block.
- Some future product concepts remain intentionally represented as mock-only toasts or coming-soon sheets.
