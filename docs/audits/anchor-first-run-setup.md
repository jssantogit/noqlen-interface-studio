# Anchor First-Run Setup Flow Audit

## Scope

This audit covers the implementation of Bloco 2.9 — Anchor First-Run Setup Flow.

## What Was Added

### Setup State Model

- `src/apps/anchor/anchorSetupState.ts` with typed `AnchorSetupDraft`, `AnchorSetupStep`, permissions, library options and Navidrome draft defaults.
- Local-only React state in `AnchorPreview` with `hasCompletedSetup` and `setupStep` tracking.

### Setup Screens

All screens match the Anchor dark premium mobile UI with serif titles, amber primary CTA and compact cards.

1. **Welcome**
   - Introduces Anchor with "Local-first", "Navidrome-powered", "Mock-safe preview" cards.
   - "Start setup" and "Preview configured app" actions.

2. **Permissions**
   - Mock-only permission acknowledgement cards.
   - Required items must be acknowledged before Continue unlocks.
   - No real permission APIs are called.

3. **Library**
   - Mock folder selection via a "Choose folder" bottom sheet.
   - Starts with no selected folder; user must actively choose.
   - Pre-baked options inside the sheet: `/storage/emulated/0/Music`, `/storage/emulated/0/Music/Naqlen`, `/storage/emulated/0/Download/Music`, `/sdcard/Music`.
   - Custom mock path input option: "Use another folder...".
   - Fake song counts and accessibility status.
   - Continue disabled until a folder is selected.
   - No filesystem or storage access.

4. **Server**
   - Navidrome selected by default; Jellyfin and Emby disabled with "Coming soon".
   - Mock availability check with simulated pass result.
   - No port probing or backend calls.

5. **Navidrome Basics**
   - Editable fields: MusicFolder, DataFolder, Port, LogLevel, ScannerSchedule.
   - Toggles: EnableDownloads, EnableSharing, EnableLogRedacting.
   - "Advanced Navidrome Settings" opens the existing Navidrome Settings sheet from setup.
   - Advanced changes sync back to setup draft for the basic fields (MusicFolder, DataFolder, Port, LogLevel, ScannerSchedule, EnableDownloads, EnableSharing, EnableLogRedacting).
   - No real config writes.

6. **Review**
   - Summary cards for all setup choices.
   - "Preview TOML" opens a display-only navidrome.toml sheet.
   - "Finish setup" completes the flow.

### Setup Progress

- Step indicator showing "Step X of 6" and percentage.
- Amber progress bar at the top of each setup screen.

### Entry/Exit Behavior

- When `hasCompletedSetup === false`, the setup flow renders instead of the normal Anchor app.
- Bottom nav is hidden during setup.
- After finishing, `hasCompletedSetup` becomes true, a toast appears and the normal Home screen is shown.
- "Preview configured app" from Welcome bypasses setup for immediate preview.

### Replay/Reset

- "Replay setup" button added to Studio mock state controls inside Settings.
- Resets setup state and shows the Welcome screen again.
- Does not affect production behavior.

### State Links

- Selected library folder updates the Library display path.
- Server type/address/port updates displayed server info.
- Navidrome basics draft can feed into the existing Navidrome Settings sheet through Advanced Navidrome Settings.

## Mock-Only Safety

- No real permissions requested.
- No filesystem access, file picker or `FileReader`.
- No backend calls, port probing or server control.
- No config file writes, secret storage or credential handling.
- No `fetch`, `axios`, `fs`, `child_process` or real network behavior.

## Validation Results

- Build: passed (`tsc -b && vite build`).
- Lint: passed (`eslint .`).
- Tests: passed (2/2 vitest).
- GitHub Pages build: passed (`GITHUB_PAGES=true npm run build`).
- Console errors: none.
- Overflow check at 360x800, 390x844, 430x932, 1366x768, 1440x900: no page-level horizontal overflow.
- Browser MCP validation: setup flow completed end-to-end; existing Home/Servers/Library/Activity tabs work after setup; replay/reset works; preview configured app works.

## UX Fix (Bloco 2.9.1)

- Music Library step now starts empty and requires active folder selection via "Choose folder".
- Folder picker sheet includes pre-baked options and a custom mock path input.
- Continue is disabled until a folder is selected.
- Advanced Navidrome Settings button now opens the existing Navidrome Settings sheet from setup.
- Setup draft syncs basic Navidrome fields with Advanced Settings changes.
- See `docs/audits/anchor-first-run-setup-ux-fix.md` for detailed audit.

## Files Added

- `src/apps/anchor/anchorSetupState.ts`
- `src/apps/anchor/components/setup/AnchorSetupFlow.tsx`
- `src/apps/anchor/components/setup/AnchorSetupWelcome.tsx`
- `src/apps/anchor/components/setup/AnchorSetupPermissions.tsx`
- `src/apps/anchor/components/setup/AnchorSetupLibrary.tsx`
- `src/apps/anchor/components/setup/AnchorSetupServer.tsx`
- `src/apps/anchor/components/setup/AnchorSetupNavidrome.tsx`
- `src/apps/anchor/components/setup/AnchorSetupReview.tsx`
- `src/apps/anchor/components/setup/AnchorSetupProgress.tsx`
- `docs/audits/anchor-first-run-setup.md`
- `docs/audits/anchor-first-run-setup-ux-fix.md`
- `src/apps/anchor/components/setup/AnchorSetupFolderPicker.tsx`

## Files Modified

- `src/apps/anchor/AnchorPreview.tsx`
- `src/apps/anchor/components/AnchorMockStateControls.tsx`
- `src/apps/anchor/anchorSetupState.ts`
- `src/apps/anchor/components/setup/AnchorSetupLibrary.tsx`
- `src/apps/anchor/components/AnchorNavidromeSettingsSheet.tsx`
- `docs/interaction-maps/anchor.md`
- `docs/screen-contracts/anchor/interactions.md`
- `docs/screen-contracts/anchor/README.md`
- `interface/context/delta.md`
- `interface/context/current.md`

## Status

Complete and ready for Anchor State Coverage and Completion Audit.
