# Anchor Interaction Map

## Product Role

Anchor is a local media server control app mock inside Noqlen Interface Studio.

Anchor manages visual/mock flows for:

- Server status.
- Server controls.
- Server list.
- Library folder.
- Library scanning.
- Access verification.
- Activity logs/events.
- Settings/log previews.

Anchor remains a complete interactive prototype target, not a real media server client. Every interaction must stay mock-only and must avoid backend calls, Navidrome calls, server control, filesystem access, real logs, network calls, secrets and destructive behavior.

## Navigation Model

Main Anchor bottom navigation:

- Home.
- Servers.
- Library.
- Activity.

Secondary surfaces:

- Settings sheet.
- Server details sheet.
- Server menu sheet.
- Logs viewer.
- Navidrome Settings sheet.
- Navidrome dry-run preview sheet.
- Add server sheet.
- QR code sheet.
- Folder picker mock.
- Library settings sheet.
- Scan progress sheet.
- Verify access result sheet.
- Activity filter sheet.
- Activity detail sheet.
- Confirmation dialog for stop/restart.
- Error detail sheet for startup failed.

Layout constraints:

- Anchor screens and sheets must fit the stable `390px` virtual phone app viewport while the simulator itself may be visually scaled down.
- Critical server values, mock URLs, fake paths, config keys and env vars should wrap rather than become unreadable ellipses.
- Horizontal overflow is allowed only inside bounded code/config preview boxes; category navigation and cards must not create phone-level horizontal scroll.

## Home Interaction Map

### Settings Icon

- Trigger: settings icon in the Home header.
- Result: opens Anchor settings sheet.
- Sections: General, Network, Notifications, Safety, About.
- Safety: mock-only settings; no real app, server or OS settings are read or changed.
- Current status: implemented in Batch 1 with local visual toggles only.

### Stop Server

- Trigger: `Stop server` button on the server card.
- Result: opens a confirmation dialog.
- Confirm: changes mock server state to stopped.
- Cancel: closes dialog without changing mock state.
- Safety: must not stop a real process, service, server or Navidrome instance.
- Current status: implemented in Batch 1.

### Restart

- Trigger: `Restart` button on the server card.
- Result: opens restart confirmation, then starts a mock restart state.
- States: idle, restarting, active after restart.
- Safety: must not call real server control APIs or shell commands.
- Current status: implemented in Batch 1; failed restart state remains future coverage.

### Library Card

- Trigger: Library card on Home.
- Result: navigates to the Library tab.
- Safety: internal tab switch only.
- Current status: implemented in Batch 1.

### Copy Address

- Trigger: `Copy address` quick action.
- Result: shows visual `Address copied` toast.
- Optional behavior: Clipboard API may be used only if harmless, guarded and does not expose sensitive data. Otherwise, use mock toast only.
- Safety: no real network action and no sensitive address disclosure beyond visible mock copy.
- Current status: implemented in Batch 1 with toast-only behavior.

### Show QR Code

- Trigger: `Show QR code` quick action.
- Result: opens QR code sheet with mock QR visual, mock address and same-network note.
- QR content: visual-only; does not need to encode real data.
- Safety: must not expose sensitive info or real connection strings.
- Current status: implemented in Batch 1.

### Refresh Library

- Trigger: `Refresh library` quick action.
- Result: opens mock scan progress sheet.
- States: idle, scanning, complete, failed.
- Safety: must not read folders, scan media or call a backend.
- Current status: implemented in Batch 1 for Home quick action and Batch 3 for the Library tab row.

## Servers Interaction Map

### Add Server Plus Icon

- Trigger: plus icon in the Servers header.
- Result: opens Add server mock sheet.
- Fields: server type, display name, local address and port.
- Save behavior: validates empty display name, missing address and invalid port locally, then closes the sheet and shows `Mock server added`; no real connection is attempted.
- Safety: no real connection, validation request, discovery or credential handling.
- Current status: implemented in Batch 2.

### Home Server Menu Icon

- Trigger: menu icon on the Home server card.
- Result: opens the same local-only Server menu sheet used by the Servers tab.
- Safety: no real server config or control action is performed.
- Current status: implemented in Bloco 2.8 visible gap closure.

### Navidrome Card

- Trigger: Navidrome card body.
- Result: opens server details sheet or expands details.
- Data: static Navidrome mock data.
- Safety: no real status refresh or server query.
- Current status: implemented in Batch 2 with settings and logs actions inside the sheet.

### Server Menu

- Trigger: menu icon on a server card.
- Result: opens server menu sheet.
- Menu items: Configure Navidrome, Rename, Duplicate config, Disable, Remove mock server.
- Safety: all actions mutate only local mock state when implemented.
- Current status: implemented in Batch 2 and Bloco 2.8. Rename and duplicate show mock toasts, disable changes local visual state, and remove requires confirmation before hiding the local card until the local restore action is used.

### Restore Mock Server

- Trigger: `Restore mock server` button after removing the Navidrome card from the local preview.
- Result: restores the static Navidrome card and active mock status.
- Safety: no discovery, config restore, filesystem access or server connection.
- Current status: implemented in Bloco 2.8 visible gap closure.

### Navidrome Settings

- Trigger: `Settings` button in the Navidrome card, `Configure Navidrome` in details, or `Configure Navidrome` in the server menu.
- Result: opens `Navidrome Settings` with category navigation for Basics, Network, Library Scanner, Artwork & Metadata, Playback & Transcoding, Features, Integrations, Security & Auth, Backup & Monitoring and Advanced.
- Local editing: text, number, duration, size, path, list, select, toggle and masked secret fields update local React draft state only.
- Advanced: searchable settings list, display-only generated TOML preview, display-only `ND_` environment variable mapping, reset changes, dry-run preview and mock apply.
- Dry-run preview: shows changed fields, old/new mock values, restart-required count, caution/sensitive warning count and diff-style TOML preview.
- Apply behavior: saves local mock draft state and shows `Navidrome settings saved in mock preview`; it never writes files or calls a backend.
- Reset behavior: restores the last saved mock draft and shows `Mock changes reset`.
- Safety: no real server settings are read or written; no Anchor Core, Navidrome, network, filesystem, port probing, secrets or config files are touched.
- Current status: implemented in Bloco 2.6.

### View Logs

- Trigger: `View logs` button in the Navidrome card.
- Result: opens mock log viewer.
- Safety: no real log files, process output or filesystem content are read.
- Current status: implemented in Batch 2 with static log rows and local filters.

### Jellyfin Coming Soon

- Trigger: Jellyfin coming-soon card or menu.
- Result: opens coming-soon sheet or disabled tooltip.
- Safety: no Jellyfin connection or discovery.
- Current status: implemented in Batch 2 as a coming-soon sheet.

### Emby Coming Soon

- Trigger: Emby coming-soon card or menu.
- Result: opens coming-soon sheet or disabled tooltip.
- Safety: no Emby connection or discovery.
- Current status: implemented in Batch 2 as a coming-soon sheet.

## Library Interaction Map

### Change Folder

- Trigger: `Change folder` action row.
- Result: opens folder picker mock.
- Folder copy: fake display paths only.
- Safety: must not access the filesystem, browser file picker, FileReader or real device storage.
- Current status: implemented in Batch 3 with fake display paths and local state only.

### Refresh Library

- Trigger: `Refresh library` action row.
- Result: starts mock scan flow.
- States: scanning, scanned, failed.
- Safety: no media scan, metadata read, filesystem access or backend call.
- Current status: implemented in Batch 3 with local scan state and static result copy.

### Verify Access

- Trigger: `Verify access` action row.
- Result: opens permission/access verification result.
- States: accessible, warning, denied.
- Safety: no real permission checks or path probing.
- Current status: implemented in Batch 3 with static passed/warning checks and local replay state.

### Library Settings

- Trigger: `Library settings` action row.
- Result: opens library settings sheet.
- Settings: scan interval, metadata refresh, include hidden files, permission checks.
- Safety: mock settings only; no persisted device or server configuration.
- Current status: implemented in Batch 3 with local visual toggles and save toast.

### Stats Row

- Trigger: Songs, Albums or Artists stat.
- Result: optional stats detail sheet.
- Safety: static counts only; no library query.
- Current status: implemented in Batch 3 with static Studio mock values.

### Last Scan / Duration

- Trigger: Last scan or Duration footer item.
- Result: optional scan history sheet.
- Safety: static scan history only; no real scan logs.
- Current status: implemented in Batch 3 with static scan rows and warning note.

## Activity Interaction Map

### Filter Icon

- Trigger: filter icon in the Activity header.
- Result: opens an Anchor-styled filter sheet.
- Filter options: All, Server, Library, Errors, Today, Yesterday.
- State: changes local `activityFilter` only and persists while staying inside Anchor.
- Empty state: if a filtered static result set is empty, the Activity screen shows `No events found` with Reset filter.
- Safety: filters static mock activity data only.
- Current status: implemented in Bloco 2.7.

### Details Buttons

- Trigger: `Details` buttons on activity rows.
- Result: opens event detail sheet for normal events or error detail sheet for Startup failed.
- State: changes local `selectedActivityId` only; nested Details buttons stop propagation to avoid double handling.
- Safety: static event copy only; no real logs or diagnostics.
- Current status: implemented in Bloco 2.7.

### Startup Failed Event

- Trigger: `Startup failed` row or Details button.
- Result: opens error detail sheet.
- Error detail: port already in use, Service `Navidrome`, Port `4533`, Attempt `Start server`, Result `Blocked`, mock source, suggested mock fixes and note that no real port was checked.
- Actions: Copy diagnostic summary shows a toast only; Open Navidrome Settings switches to the existing Navidrome Settings sheet.
- Safety: no real port check, process check or network inspection.
- Current status: implemented in Bloco 2.7.

### Activity Item Tap

- Trigger: activity item body.
- Result: opens details for the selected static event.
- Safety: static event details only.
- Current status: implemented in Bloco 2.7.

## Required UI States

Access path: Anchor Home -> Settings -> Studio mock states. These controls are Studio-only, local and not part of a production Anchor feature.

Home:

- Server active: implemented.
- Server stopped: implemented.
- Restarting: implemented.
- Degraded: implemented.
- Offline: implemented.
- Disabled: implemented.

Servers:

- One running server: implemented.
- No servers: implemented.
- Adding server: implemented.
- Coming soon only: implemented.
- Server disabled: implemented.

Library:

- Accessible: implemented.
- Scanning: implemented.
- Empty: implemented.
- Permission warning: implemented.
- Access denied: implemented.
- Scan failed: implemented.

Activity:

- Populated: implemented.
- Filtered no-results: implemented.
- Empty: implemented.
- Errors only: implemented.

Global:

- Loading overlay: implemented.
- Disabled primary actions: implemented.
- Toast active: implemented.
- Dialog active: implemented through existing confirmation flows.
- Bottom sheet active: implemented through existing secondary surfaces.
- Detail sheet active: implemented through server, stats, scan and activity detail surfaces.

## Component Inventory

Existing components:

- `AnchorBottomNav`.
- `AnchorScreenHeader`.
- `AnchorCard`.
- `AnchorIconButton`.
- `AnchorActionRow`.
- `AnchorActivityItem`.

Batch 1 components now implemented:

- `AnchorBottomSheet`.
- `AnchorConfirmDialog`.
- `AnchorToast`.
- `AnchorMockQrCode`.
- `AnchorSettingsSheet`.
- `AnchorScanProgress`.

Batch 2 components now implemented:

- `AnchorAddServerSheet`.
- `AnchorServerDetailsSheet`.
- `AnchorServerMenuSheet`.
- `AnchorServerSettingsSheet`.
- `AnchorLogViewerSheet`.
- `AnchorComingSoonSheet`.

Batch 3 components now implemented:

- `AnchorFolderPickerMock`.
- `AnchorAccessCheckSheet`.
- `AnchorLibrarySettingsSheet`.
- `AnchorLibraryStatsSheet`.
- `AnchorScanHistorySheet`.

Bloco 2.9 components now implemented:

- `AnchorMockStateControls`.
- `anchorState.ts` typed local state model.

Batch 4 components now implemented:

- `AnchorActivityFilterSheet`.
- `AnchorActivityDetailSheet`.
- `AnchorErrorDetailSheet`.
- `AnchorActivityEmptyState`.

Needed components:

- `AnchorHeader`.
- `AnchorButton`.
- `AnchorStatusPill`.

## Implementation Batches

### Batch 1

- Common overlay system.
- Toast.
- Confirm dialog.
- Bottom sheet.
- Home interactions: Stop server, Restart, Copy address, Show QR code, Refresh library.

### Batch 2

- Servers interactions: Add server, Server details, Server menu, Settings, View logs, Coming soon sheets.

### Batch 3

- Library interactions: Change folder mock, Refresh scan flow, Verify access, Library settings, Scan history.
- Batch 3 also includes Library stats details.

### Batch 4

- Activity interactions: Filter, Event details, Error details, Today/Yesterday filters, errors-only state, empty filtered state and diagnostic copy toast.
- Current status: implemented in Bloco 2.7.

### Batch 5

- State polish: empty states, loading states, warning/error states, disabled states, final QA.

## Acceptance Criteria

Anchor can be considered complete only when:

- Every visible actionable element responds.
- Every response is mock-only.
- Every modal, sheet and dialog is styled consistently.
- Every screen has empty, loading and error variants.
- No real backend, filesystem or network behavior exists.
- Mobile and desktop shell still works.
- Bottom nav works.
- Interaction map is fully covered.
