# Anchor First-Run Setup UX Fix Audit

## Scope

This audit covers the implementation of Bloco 2.9.1 — Anchor First-Run Setup UX Fix.

## Tool Mode

Combo (Plan -> Block -> Prompt -> Implement -> Validate -> Audit -> Fix -> Commit -> Handoff).

## What Was Fixed

### Music Library Setup Step

**Previous issue:** The Music Library setup step showed several pre-baked folder options immediately on screen:
- `/storage/emulated/0/Music`
- `/storage/emulated/0/Music/Naqlen`
- `/storage/emulated/0/Download/Music`
- `/sdcard/Music`

This made the first-use flow feel like the app already knew the user's folders.

**Fix:**
- The Music Library step now starts with `libraryPath: ''` (empty selection).
- Shows a clear empty state: "No folder selected" with explanation text.
- A primary "Choose folder" button opens a mock folder picker bottom sheet.
- The pre-baked folder options live inside the picker sheet, not as always-visible choices.
- After selection, a folder card appears with name, path, fake accessible status and fake song count.
- Continue button is disabled until a folder is selected, with helper text explaining why.

**Files changed:**
- `src/apps/anchor/components/setup/AnchorSetupLibrary.tsx` — rewritten
- `src/apps/anchor/components/setup/AnchorSetupFolderPicker.tsx` — new
- `src/apps/anchor/anchorSetupState.ts` — `libraryPath` and `MusicFolder` initial values changed to `''`

### Custom/Manual Mock Folder Option

**Previous issue:** Only hardcoded folder choices were available.

**Fix:**
- Added "Use another folder..." option in the folder picker sheet.
- Tapping it reveals an inline input field for entering a custom mock path.
- Visual validation: must not be empty, should start with `/` for Android-like paths.
- Saved custom path appears as the selected folder in the setup step.
- No real file picker, storage access or path validation occurs.

**Files changed:**
- `src/apps/anchor/components/setup/AnchorSetupFolderPicker.tsx` — new

### Advanced Navidrome Settings Button

**Previous issue:** The "Advanced Navidrome Settings" button in setup step 5 was a visible clickable row that did nothing because the Navidrome Settings sheet was rendered inside the `!inSetup` branch only.

**Fix:**
- Moved all overlay sheets, dialogs and toasts outside the `inSetup` conditional in `AnchorPreview.tsx`.
- The Navidrome Settings sheet now opens during setup when the button is tapped.
- Added `initialDraft` and `onDraftChange` props to `AnchorNavidromeSettingsSheet`.
- When opened from setup, the sheet initializes with the current setup `navidromeDraft` values (bridged to catalog draft format).
- Changes in the advanced settings are synced back to the setup draft via `onDraftChange`.
- Closing the sheet returns to setup step 5.
- When opened from the normal app (Servers tab), behavior is unchanged.

**Files changed:**
- `src/apps/anchor/AnchorPreview.tsx` — overlays moved outside conditional; draft bridge helpers added
- `src/apps/anchor/components/AnchorNavidromeSettingsSheet.tsx` — added `initialDraft` and `onDraftChange` props

### Setup/Navidrome Draft Sync

**Behavior:**
- Music Library folder selection updates `libraryPath` and `navidromeDraft.MusicFolder` as before.
- Advanced Navidrome Settings now updates the setup draft in real time for the mapped basic fields:
  - `MusicFolder`, `DataFolder`, `Port`, `LogLevel`, `Scanner.Schedule`, `EnableDownloads`, `EnableSharing`, `EnableLogRedacting`.
- Changes made in Advanced Settings are reflected in the Navidrome Basics setup step when returning.
- Full two-way sync for all 80+ catalog options is not implemented; only the basic fields that overlap with the setup draft are bridged.

### Continue Behavior

**Music Library step:**
- Continue is disabled with clear disabled styling when no folder is selected.
- Helper text explains: "Choose a music folder before continuing."

**Navidrome step:**
- Continue remains available as long as required basic fields are present.
- No new validation was added; existing behavior preserved.

## Mock-Only Safety

- No real permissions requested.
- No filesystem access, file picker or `FileReader`.
- No backend calls, port probing or server control.
- No config file writes or secret storage.
- No `fetch`, `axios`, `fs`, `child_process` or real network behavior.
- Folder paths are display-only copy.
- Custom path input is visual-only; no path access or validation against real storage.

## Validation Results

- TypeScript: passed (`tsc -b --noEmit`).
- Build: pending.
- Lint: pending.
- Tests: pending.
- Browser MCP validation: pending.
- Overflow check: pending at 360x800, 390x844, 430x932, 1366x768, 1440x900.

## Files Added

- `src/apps/anchor/components/setup/AnchorSetupFolderPicker.tsx`
- `docs/audits/anchor-first-run-setup-ux-fix.md`

## Files Modified

- `src/apps/anchor/components/setup/AnchorSetupLibrary.tsx`
- `src/apps/anchor/anchorSetupState.ts`
- `src/apps/anchor/AnchorPreview.tsx`
- `src/apps/anchor/components/AnchorNavidromeSettingsSheet.tsx`
- `docs/audits/anchor-first-run-setup.md`
- `docs/interaction-maps/anchor.md`
- `docs/screen-contracts/anchor/interactions.md`
- `docs/screen-contracts/anchor/README.md`
- `interface/context/delta.md`

## Remaining Sync Gaps

- Full two-way sync between setup `navidromeDraft` and the catalog draft for all 80+ options is not implemented. Only the 8 basic fields that overlap are bridged.
- Changes to fields outside the basic 8 (e.g., `Scanner.ScanOnStartup`, `EnableTranscodingConfig`) in Advanced Settings do not sync back to the setup draft.
- The TOML preview in Review uses the setup draft, not the full catalog draft, so advanced changes outside the basic 8 won't appear in the Review TOML preview.
- This is documented as an acceptable partial sync for the mock preview.
