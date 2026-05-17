# Anchor Screen Contract

Anchor is the first app developed in depth inside the Noqlen Interface Studio phone simulator.

Visual target:

- Anchor must follow `docs/visual-targets/anchor.md`.
- Anchor must use `docs/references/anchor/anchor-screens-reference.png` as the mandatory high-fidelity reference.
- Anchor must remain inside the current `PhoneFrame` and app viewport.
- Anchor must keep the dark premium mobile UI, serif-style titles, amber primary accent, green success states, red/orange failure states, dense cards and bottom navigation rhythm from the reference.
- Anchor content must fit the actual inner phone viewport at narrow mobile and desktop simulator sizes without page-level horizontal overflow, overlapping chips, or unreadable truncation of critical server values.

## Home Screen Contract

Required content:

- Header with `Anchor`, `Control your local media server.` and a settings gear action.
- Main Navidrome server card with `Server active`, uptime, library size and address.
- Uptime, library size and address must remain readable inside the narrow phone viewport; long address copy may wrap.
- Amber `Stop server` button and secondary `Restart` button.
- Library card with folder icon, `Accessible`, `Updated 12 min ago` and chevron.
- Quick actions for `Copy address`, `Show QR code` and `Refresh library`.
- Anchor bottom nav with Home active.

## Servers Screen Contract

Required content:

- Header with `Servers`, `Manage your media servers.` and a plus action.
- Detailed Navidrome card with icon/avatar, running badge, menu icon, address, version, uptime, `Settings` and `View logs` buttons.
- `Settings`, details `Configure Navidrome` and menu `Configure Navidrome` must open the dedicated `Navidrome Settings` mock configuration center.
- Navidrome Settings category navigation, setting fields and previews must stay inside the sheet width with wrapping chips and internal preview scrolling only.
- Jellyfin and Emby cards marked `Coming soon`.
- Bottom privacy note: `All servers run locally on your network.` and `No data leaves your device.`
- Anchor bottom nav with Servers active.

## Library Screen Contract

Required content:

- Header with `Library` and `Manage your media library.`
- Main library card for `Music / Naqlen`, `Accessible` and `Last updated 12 min ago`.
- Stats for `12,458 Songs`, `1,253 Albums` and `842 Artists`.
- Action rows for `Change folder`, `Refresh library`, `Verify access` and `Library settings`.
- Mock displayed folder path `/storage/emulated/0/Music/Naqlen`; this is display copy only and must not be read.
- Footer stats for `Last scan: 12 min ago` and `Duration: 1m 42s`.
- Anchor bottom nav with Library active.

## Activity Screen Contract

Required content:

- Header with `Activity`, `Recent events and system activity.` and a filter action.
- Today section with Navidrome started, Library updated, Server restarted and Startup failed rows.
- Yesterday section with Library updated and Navidrome started rows.
- Details buttons on rows specified by the reference contract.
- Anchor bottom nav with Activity active.

## Allowed Interactions

- Internal Anchor bottom nav may switch between Home, Servers, Library and Activity.
- Home settings may open a mock settings sheet with local visual toggles only.
- Home server controls may show confirmation dialogs and change mock-only server card state.
- Home quick actions may show toasts, a fake QR preview and a mock scan progress sheet.
- Home Library card may switch to the Library tab without reading the library path.
- Servers plus may open an Add server sheet and show toast-only add feedback.
- Servers Navidrome card may open details, settings, logs and a local mock menu.
- Navidrome Settings may switch settings categories, edit local draft values, show masked secret fields, search options, render display-only TOML/env previews, run a dry-run preview, apply mock changes and reset changes.
- Servers Jellyfin and Emby cards may open coming-soon sheets only.
- Library action rows may open mock folder picker, scan progress, access check and library settings sheets.
- Library stats and scan footer metrics may open static detail/history sheets.
- Activity filter may open a mock filter sheet for All, Server, Library, Errors, Today and Yesterday.
- Activity rows and Details buttons may open static event detail sheets.
- Startup failed may open a display-only error diagnostic sheet with copy-toast feedback and an existing Navidrome Settings shortcut.
- Buttons may show hover, active and focus styles.
- Studio app switcher must continue selecting Anchor, Forge, Aria and Flux.

## Interactive Completion Model

The four reference screens are the base Anchor surfaces, not the full application scope. Anchor must be expanded through `docs/interaction-maps/anchor.md` and `docs/screen-contracts/anchor/interactions.md` until every visible action responds in a mock-only form.

Required expansion surfaces include settings, server details, server menus, mock logs, add-server flow, QR code preview, folder picker mock, library scan flow, access verification, activity filters, event details, startup failure details, confirmation dialogs, toasts and empty/loading/error states.

Batch 2 implements the Servers expansion surfaces with local-only state and static data.

Batch 3 implements the Library expansion surfaces with local-only mock state, fake display paths and static library/stat/history data.

Bloco 2.6 implements the Navidrome Settings Center inside Servers with local-only mock state, a typed curated settings catalog, generated display-only `navidrome.toml` and `ND_` previews, dry-run/apply/reset behavior and secret/risky warnings.

Bloco 2.7 implements Activity filter, event detail, Startup failed error detail, Today/Yesterday filtering, errors-only filtering, empty filtered state handling and toast-only diagnostic copy feedback.

Completion requires consistent Anchor-styled sheets, dialogs and state variants while preserving the no-backend, no-filesystem and no-real-server-control boundary.

## Disabled / Visual-Only Actions

- Stop server changes only the local mock server state after confirmation.
- Restart changes only the local mock server state after confirmation.
- Copy address shows a mock toast and does not require Clipboard API access.
- Show QR code displays a fake QR preview for the mock address only.
- Refresh library displays a mock scan progress sheet only.
- Navidrome Settings, server details, server menu, View logs and coming-soon sheets are visual-only.
- Change folder displays fake path copy only and never opens a real picker or storage permission flow.
- Verify access, Library settings, Library stats and Scan history are visual-only and static/local.
- Activity filters, details and diagnostics are visual-only and use static mock event data.

## Anchor Does Not Do

- No real backend calls.
- No real Navidrome integration.
- No real server or process control.
- No real library access.
- No filesystem reads.
- No real log reads.
- No real downloads.
- No secrets, auth, analytics or credentials.
- No data leaves the mock UI.
