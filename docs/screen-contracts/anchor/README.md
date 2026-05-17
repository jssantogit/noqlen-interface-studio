# Anchor Screen Contract

Anchor is the first app developed in depth inside the Noqlen Interface Studio phone simulator.

Visual target:

- Anchor must follow `docs/visual-targets/anchor.md`.
- Anchor must use `docs/references/anchor/anchor-screens-reference.png` as the mandatory high-fidelity reference.
- Anchor must remain inside the current `PhoneFrame` and app viewport.
- Anchor must keep the dark premium mobile UI, serif-style titles, amber primary accent, green success states, red/orange failure states, dense cards and bottom navigation rhythm from the reference.

## Home Screen Contract

Required content:

- Header with `Anchor`, `Control your local media server.` and a settings gear action.
- Main Navidrome server card with `Server active`, uptime, library size and address.
- Amber `Stop server` button and secondary `Restart` button.
- Library card with folder icon, `Accessible`, `Updated 12 min ago` and chevron.
- Quick actions for `Copy address`, `Show QR code` and `Refresh library`.
- Anchor bottom nav with Home active.

## Servers Screen Contract

Required content:

- Header with `Servers`, `Manage your media servers.` and a plus action.
- Detailed Navidrome card with icon/avatar, running badge, menu icon, address, version, uptime, `Settings` and `View logs` buttons.
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
- Servers Jellyfin and Emby cards may open coming-soon sheets only.
- Buttons may show hover, active and focus styles.
- Details buttons may remain inert visual controls.
- Studio app switcher must continue selecting Anchor, Forge, Aria and Flux.

## Interactive Completion Model

The four reference screens are the base Anchor surfaces, not the full application scope. Anchor must be expanded through `docs/interaction-maps/anchor.md` and `docs/screen-contracts/anchor/interactions.md` until every visible action responds in a mock-only form.

Required expansion surfaces include settings, server details, server menus, mock logs, add-server flow, QR code preview, folder picker mock, library scan flow, access verification, activity filters, event details, startup failure details, confirmation dialogs, toasts and empty/loading/error states.

Batch 2 implements the Servers expansion surfaces with local-only state and static data.

Completion requires consistent Anchor-styled sheets, dialogs and state variants while preserving the no-backend, no-filesystem and no-real-server-control boundary.

## Disabled / Visual-Only Actions

- Stop server changes only the local mock server state after confirmation.
- Restart changes only the local mock server state after confirmation.
- Copy address shows a mock toast and does not require Clipboard API access.
- Show QR code displays a fake QR preview for the mock address only.
- Refresh library displays a mock scan progress sheet only.
- Server settings, server details, server menu, View logs and coming-soon sheets are visual-only.
- Change folder, Verify access, Library settings and Activity Details remain future visual-only work.

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
