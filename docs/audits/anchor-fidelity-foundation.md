# Anchor Fidelity Foundation Audit

Reference image used:

- `docs/references/anchor/anchor-screens-reference.png`

Visual target doc used:

- `docs/visual-targets/anchor.md`

Screens implemented:

- Home
- Servers
- Library
- Activity

Mock data used:

- Static Navidrome server status, address, version, uptime and library size.
- Static library folder label, displayed mock path, counts and scan duration.
- Static server list for Navidrome, Jellyfin and Emby.
- Static activity feed grouped into Today and Yesterday.

Mock-only safety boundary:

- Anchor uses static data from `src/apps/anchor/anchorMockData.ts`.
- Anchor does not fetch, read files, call a backend, control a server, open logs or access a real media library.
- The displayed `/storage/emulated/0/Music/Naqlen` value is mock copy only and is not used for filesystem access.

Actions that are visual only:

- Stop server
- Restart
- Copy address
- Show QR code
- Refresh library
- Settings
- View logs
- Change folder
- Verify access
- Library settings
- Details

Fidelity notes:

- The implementation follows the four-phone reference structure with large serif titles, dark near-black gradients, amber primary actions, green running/access indicators and compact stacked cards.
- The Home screen emphasizes the Navidrome status card, Library card and quick action grid.
- The Servers screen preserves the detailed running Navidrome card, coming-soon secondary servers and local-network privacy note.
- The Library screen preserves the folder hero card, three-column stats, dense action rows and scan summary.
- The Activity screen preserves section grouping, icon color semantics, right-aligned times and small Details buttons.
- Anchor bottom navigation is anchored inside the phone app viewport and switches only internal mock screens.

Known gaps:

- The UI uses lucide/vector icons rather than pixel-identical custom reference icons.
- Text and spacing are tuned to the current `PhoneFrame` dimensions, so exact screenshot parity may vary slightly from the standalone reference mockup.
- All controls are intentionally inert because this block is visual-only.
