# Anchor Interaction Batch 1 Audit

## Scope

Implemented Bloco 2.3 for Anchor only:

- Shared Anchor overlay and feedback primitives.
- Home settings, server controls, quick actions and Library card navigation.
- Local mock state in `AnchorPreview`.

Not implemented in this batch:

- Servers interactions.
- Library deep interactions beyond Home Library card navigation.
- Activity interactions.
- Final state coverage batch.
- Forge, Aria or Flux interactions.

## Components Created

- `src/apps/anchor/components/AnchorBottomSheet.tsx`.
- `src/apps/anchor/components/AnchorConfirmDialog.tsx`.
- `src/apps/anchor/components/AnchorToast.tsx`.
- `src/apps/anchor/components/AnchorMockQrCode.tsx`.
- `src/apps/anchor/components/AnchorSettingsSheet.tsx`.
- `src/apps/anchor/components/AnchorScanProgress.tsx`.

## Home Interactions Implemented

- Settings gear opens `AnchorSettingsSheet` with General, Network, Notifications, Safety and About sections.
- Stop server opens a confirmation dialog and changes only local mock server state to stopped after confirmation.
- Restart opens a confirmation dialog, shows local restarting state and returns the mock server card to active.
- Copy address shows `Address copied` toast only.
- Show QR code opens a bottom sheet with fake QR art, `http://192.168.1.156:4533` and same-network copy.
- Refresh library opens a bottom sheet with mock scan progress and complete/failed local states.
- Library card switches the internal Anchor tab to Library.

## Mock State Changes

- `activeTab`: switches Home to Library from the Home Library card.
- `serverState`: supports active, stopped and restarting for Home display.
- `activeSheet`: supports settings, QR and scan sheets.
- `activeDialog`: supports stop and restart confirmations.
- `scanState`: supports idle, scanning, complete and manually simulated failed.
- `toast`: supports in-phone feedback for copy, stop, restart and refresh.

## Mock-Only Confirmation

- No backend calls were added.
- No Navidrome calls were added.
- No server or process control was added.
- No filesystem, file picker, metadata scan or real log access was added.
- No Clipboard API dependency was added; copy address uses toast-only feedback.
- The QR preview is fake visual art and does not call external QR services.

## Remaining Missing Actions

- Servers: Add server, Navidrome details interaction, server menu, settings, view logs, Jellyfin and Emby coming-soon sheets.
- Library: Change folder, Refresh library row, Verify access, Library settings, stats detail and scan history.
- Activity: Filter, Details buttons, Startup failed detail and item tap.
- State coverage: degraded/offline/no servers/empty/loading/error variants remain future work unless already present as static visuals.

## Known Gaps

- Restart failure is not implemented; restart returns to active after a short local timer.
- Stop state uses Restart/Start server path to return active rather than a separate start confirmation surface.
- Settings toggles are visual-only and reset when the sheet unmounts.
- Home refresh scan completion uses a short local timer; failed state is available only through the manual simulation button.
