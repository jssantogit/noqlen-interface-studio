# Anchor Interaction Batch 3 Audit

## Scope

Bloco 2.5 implements Anchor Library interactions only.

Implemented interactions:

- Change folder.
- Refresh library from the Library screen.
- Verify access.
- Library settings.
- Stats details.
- Last scan / Duration scan history.

Out of scope:

- Activity filters, event details and startup failure details.
- Final state coverage batch.
- Forge, Aria and Flux interactions.

## Components Created

- `src/apps/anchor/components/AnchorFolderPickerMock.tsx`.
- `src/apps/anchor/components/AnchorAccessCheckSheet.tsx`.
- `src/apps/anchor/components/AnchorLibrarySettingsSheet.tsx`.
- `src/apps/anchor/components/AnchorLibraryStatsSheet.tsx`.
- `src/apps/anchor/components/AnchorScanHistorySheet.tsx`.

## Mock State Changes

- `mockLibraryPath` stores the selected fake folder display copy for the current preview session.
- `mockLibraryLastScan` starts as `12 min ago` and can update to `just now` after the mock scan completes.
- `mockLibrarySettings` stores local visual toggle values for the current preview session.
- `scanState` is reused for idle, scanning, complete and failed scan progress.
- Toasts are local UI feedback only.

## Fake Path Safety Note

The displayed folder paths are static fake copy for Studio preview only:

- `/storage/emulated/0/Music/Naqlen`.
- `/storage/emulated/0/Music/Albums`.
- `/storage/emulated/0/Download/Music`.
- `/sdcard/Music`.

These strings are never opened, probed, read, scanned or passed to browser file APIs.

## Mock-Only Confirmation

No real backend calls, Navidrome calls, server control, filesystem access, folder picker, `FileReader`, permission request, metadata read, analytics, auth, secrets or destructive behavior were added.

## Known Gaps

- Activity interactions remain not implemented.
- Final Anchor state coverage remains for the next batch, including empty, warning, denied, offline and broader disabled/loading variants.
- Stats, scan history and access checks are static mock values rather than stateful analysis.
