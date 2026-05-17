# Anchor Interaction Contract

This contract translates the Anchor interaction map into implementation-oriented requirements. Completion status values are `not implemented`, `partial`, `implemented` or `needs QA`.

## Global Rules

- All interactions are mock-only.
- Do not call real backends, Navidrome, Jellyfin, Emby, local servers or system processes.
- Do not read files, folders, real logs, device storage, personal paths or environment secrets.
- Do not add unguarded clipboard, network, file picker, `FileReader`, `fs` or server-control behavior.
- Static mock data may be imported from `src/apps/anchor/anchorMockData.ts` or future static metadata files.

## Home

| Interaction | Trigger | Resulting UI | Mock state changes | Data used | Forbidden real behavior | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Settings | Header settings icon | Anchor settings bottom sheet with General, Network, Notifications, Safety and About sections | Active overlay becomes settings; toggles mutate local visual state only | Static settings labels | Reading or writing real settings | implemented |
| Stop server | `Stop server` button | Confirmation dialog | On confirm, mock server status becomes stopped; on cancel, no change | `anchorServer` display copy | Stopping real server/process | implemented |
| Restart | `Restart` button, or `Start server` after stopped | Restart confirmation and temporary restarting card state | Mock restart state moves from restarting back to active | `anchorServer` display copy | Server control commands or API calls | implemented |
| Library card | Home Library card | Library tab becomes active | `activeTab` becomes `library` | `anchorLibrary` summary | Filesystem/library access | implemented |
| Copy address | `Copy address` quick action | `Address copied` toast | Toast state shows copy feedback | Visible mock address | Real network action; exposing non-mock address | implemented |
| Show QR code | `Show QR code` quick action | QR code bottom sheet with mock QR visual, mock address and same-network note | Active overlay becomes QR code | Mock address label and fake QR block | Encoding secrets or real connection details | implemented |
| Refresh library | `Refresh library` quick action | Scan progress bottom sheet | Mock scan state moves through idle, scanning, complete or manually simulated failed | `anchorLibrary` summary | Media scan, folder read, backend call | implemented |

## Servers

| Interaction | Trigger | Resulting UI | Mock state changes | Data used | Forbidden real behavior | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Add server | Servers plus icon | Add server bottom sheet with server type, name and address fields | Optional future pending mock server on save | Empty static form defaults | Connection attempt, discovery, credentials | not implemented |
| Navidrome card | Navidrome card body | Server details sheet or expanded details | Active selected server becomes `navidrome` | `anchorServers[0]` | Status refresh or server query | partial |
| Server menu | Server card menu icon | Server menu sheet with Rename, Duplicate config, Disable and Remove mock server | Future local mock rename/duplicate/disable/remove only | `anchorServers` | Deleting real config or server data | not implemented |
| Settings | Navidrome `Settings` button | Server settings sheet | Active overlay becomes server settings | Static server settings labels | Reading/writing real server config | not implemented |
| View logs | Navidrome `View logs` button | Mock log viewer | Active overlay becomes logs | Static mock log lines | Reading real logs, process output or files | not implemented |
| Jellyfin coming soon | Jellyfin card or menu | Coming-soon sheet or disabled tooltip | Active overlay becomes coming soon | `anchorServers` coming-soon copy | Jellyfin discovery or connection | not implemented |
| Emby coming soon | Emby card or menu | Coming-soon sheet or disabled tooltip | Active overlay becomes coming soon | `anchorServers` coming-soon copy | Emby discovery or connection | not implemented |

## Library

| Interaction | Trigger | Resulting UI | Mock state changes | Data used | Forbidden real behavior | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Change folder | `Change folder` row | Folder picker mock sheet | Selected mock path may change to another fake path | `anchorLibrary.path` and future fake path list | Filesystem access, file picker, `FileReader` | not implemented |
| Refresh library | `Refresh library` row | Scan progress sheet | Mock scan state moves through scanning, scanned or failed | `anchorLibrary` stats/footer | Media scan, metadata read, backend call | not implemented |
| Verify access | `Verify access` row | Access verification result sheet | Mock access state becomes accessible, warning or denied | Static permission result copy | Permission probing or path checks | not implemented |
| Library settings | `Library settings` row | Library settings sheet | Local mock settings update only if implemented later | Static settings: scan interval, metadata refresh, include hidden files, permission checks | Persisting real settings | not implemented |
| Stats detail | Songs, Albums or Artists stat | Optional stats detail sheet | Active overlay becomes stats detail | `anchorLibrary.stats` | Querying real library | not implemented |
| Scan history | Last scan or Duration footer item | Optional scan history sheet | Active overlay becomes scan history | `anchorLibrary.footer` | Reading real scan logs | not implemented |

## Activity

| Interaction | Trigger | Resulting UI | Mock state changes | Data used | Forbidden real behavior | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Filter | Activity filter icon | Filter sheet with All, Server, Library, Errors, Today and Yesterday | Active filter changes local visible list | `anchorActivity` | Real log filtering or server query | not implemented |
| Details buttons | Activity `Details` buttons | Event detail sheet | Selected mock event changes | `anchorActivity` item | Reading logs or diagnostics | not implemented |
| Startup failed | Startup failed row or Details button | Error detail sheet with port-in-use copy and suggested mock fixes | Selected mock error changes | Startup failed static event | Real port/process/network check | not implemented |
| Activity item tap | Activity item body | Event detail sheet | Selected mock event changes | `anchorActivity` item | Reading logs or diagnostics | not implemented |

## State Coverage Contract

Home states:

- Server active: current visual baseline.
- Server stopped: required.
- Restarting: required.
- Degraded: required.
- Offline: required.

Servers states:

- One running server: current visual baseline.
- No servers: required.
- Adding server: required.
- Coming soon server: current visual baseline, still needs interaction.
- Server disabled: required.

Library states:

- Accessible: current visual baseline.
- Scanning: required.
- Empty: required.
- Permission warning: required.
- Access denied: required.
- Scan failed: required.

Activity states:

- Populated: current visual baseline.
- Filtered: required.
- Empty: required.
- Errors only: required.

Global states:

- Loading: required.
- Disabled: required.
- Toast: required.
- Confirmation dialog: required.
- Bottom sheet: required.
- Detail sheet: required.

## Completion Tracking

- Current implementation has complete base surfaces for Home, Servers, Library and Activity.
- Current implementation has bottom nav and Home Batch 1 interactions.
- Servers, Library deep actions, Activity and remaining state coverage are incomplete until all rows above are implemented and QAed.
- No app-specific implementation should be considered complete unless its forbidden real behavior has also been checked.
