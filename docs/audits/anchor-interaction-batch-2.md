# Anchor Interaction Batch 2 Audit

Scope: Bloco 2.4, Anchor Servers interactions only.

## Implemented Interactions

- Add server plus opens `AnchorAddServerSheet`.
- Add mock server closes the sheet and shows `Mock server added`.
- Navidrome card opens `AnchorServerDetailsSheet`.
- Details actions open Server settings and Navidrome logs.
- Navidrome menu opens `AnchorServerMenuSheet`.
- Rename shows visual-only toast feedback.
- Duplicate config shows `Mock configuration duplicated`.
- Disable mock server changes local visual state to disabled.
- Remove mock server opens `AnchorConfirmDialog` and, on confirm, hides the local Navidrome card until refresh.
- Navidrome `Settings` opens `AnchorServerSettingsSheet`.
- Navidrome `View logs` opens `AnchorLogViewerSheet`.
- Log filters switch static rows among All, Info, Warnings and Errors.
- Jellyfin and Emby cards open `AnchorComingSoonSheet`.

## Components Created

- `src/apps/anchor/components/AnchorAddServerSheet.tsx`.
- `src/apps/anchor/components/AnchorServerDetailsSheet.tsx`.
- `src/apps/anchor/components/AnchorServerMenuSheet.tsx`.
- `src/apps/anchor/components/AnchorServerSettingsSheet.tsx`.
- `src/apps/anchor/components/AnchorLogViewerSheet.tsx`.
- `src/apps/anchor/components/AnchorComingSoonSheet.tsx`.

## Mock State Changes

- `activeSheet` now covers add server, server details, server menu, server settings, logs and coming soon.
- `activeDialog` now covers remove-server confirmation.
- `serverState` includes a local disabled state for menu feedback.
- `navidromeVisible` hides the Navidrome card after confirmed mock removal until refresh.
- Toasts remain local and auto-dismissed.

## Mock-Only Confirmation

- No backend calls were added.
- No Navidrome, Jellyfin or Emby integration was added.
- No real server control, discovery, port probing or validation was added.
- No filesystem or real log reading was added.
- No persistence, secrets, credentials, analytics or auth were added.

## Known Gaps

- Add server is toast-only and does not append a pending card.
- Rename is toast-only and does not expose an inline rename editor.
- Removed mock server is restored only by refreshing/reloading the Studio.
- Library deep interactions remain outside this batch.
- Activity interactions remain outside this batch.
- Final empty/loading/error state coverage remains outside this batch.
