# Anchor Interaction Contract

This contract translates the Anchor interaction map into implementation-oriented requirements. Completion status values are `not implemented`, `partial`, `implemented`, `needs QA`, `deferred` or `intentionally disabled`.

## Global Rules

- All interactions are mock-only.
- Do not call real backends, Navidrome, Jellyfin, Emby, local servers or system processes.
- Do not read files, folders, real logs, device storage, personal paths or environment secrets.
- Do not add unguarded clipboard, network, file picker, `FileReader`, `fs` or server-control behavior.
- Static mock data may be imported from `src/apps/anchor/anchorMockData.ts` or future static metadata files.
- Interactive sheets, rows and cards must remain readable inside the simulated phone viewport without page-level horizontal overflow; long static values should wrap where they are core content.

## Home

| Interaction | Trigger | Resulting UI | Mock state changes | Data used | Forbidden real behavior | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Settings | Header settings icon | Anchor settings bottom sheet with General, Network, Notifications, Safety and About sections | Active overlay becomes settings; toggles mutate local visual state only | Static settings labels | Reading or writing real settings | implemented |
| Home server menu | Server card menu icon | Existing Server menu sheet | Active overlay becomes server menu | Static Navidrome menu actions | Real config edits or server control | implemented |
| Stop server | `Stop server` button | Confirmation dialog | On confirm, mock server status becomes stopped; on cancel, no change | `anchorServer` display copy | Stopping real server/process | implemented |
| Restart | `Restart` button, or `Start server` after stopped | Restart confirmation and temporary restarting card state | Mock restart state moves from restarting back to active | `anchorServer` display copy | Server control commands or API calls | implemented |
| Library card | Home Library card | Library tab becomes active | `activeTab` becomes `library` | `anchorLibrary` summary | Filesystem/library access | implemented |
| Copy address | `Copy address` quick action | `Address copied` toast | Toast state shows copy feedback | Visible mock address | Real network action; exposing non-mock address | implemented |
| Show QR code | `Show QR code` quick action | QR code bottom sheet with mock QR visual, mock address and same-network note | Active overlay becomes QR code | Mock address label and fake QR block | Encoding secrets or real connection details | implemented |
| Refresh library | `Refresh library` quick action | Scan progress bottom sheet | Mock scan state moves through idle, scanning, complete or manually simulated failed | `anchorLibrary` summary | Media scan, folder read, backend call | implemented |

## Servers

| Interaction | Trigger | Resulting UI | Mock state changes | Data used | Forbidden real behavior | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Add server | Servers plus icon | Add server bottom sheet with server type, display name, local address and port fields | Local validation catches empty name, missing address and invalid port; valid save closes the sheet and shows `Mock server added` | Empty static form defaults | Connection attempt, discovery, credentials | implemented |
| Navidrome card | Navidrome card body | Server details sheet with status, address, version, uptime, library and last activity | Active sheet becomes server details | `anchorServers[0]`, `anchorServer` | Status refresh or server query | implemented |
| Server menu | Server card menu icon | Server menu sheet with Configure Navidrome, Rename, Duplicate config, Disable and Remove mock server | Configure opens Navidrome Settings; rename/duplicate show toasts; disable sets local state to disabled; remove opens confirmation | `anchorServers` | Deleting real config or server data | implemented |
| Navidrome Settings | Navidrome `Settings` button, details `Configure Navidrome` action or server menu `Configure Navidrome` action | Navidrome Settings sheet with categories, local draft fields, warnings and safe bottom actions | Active sheet becomes Navidrome Settings; draft mutates only local React state | `navidromeConfigCatalog` | Reading/writing `navidrome.toml`, calling Anchor Core/Navidrome, storing secrets, filesystem/network/port access | implemented |
| Configure Navidrome | Details/menu configure action | Same Navidrome Settings sheet | Opens same local mock draft surface | `navidromeConfigCatalog` | Real provider/config access | implemented |
| Navidrome category switching | Category chips in Navidrome Settings | Basics, Network, Scanner, Artwork, Playback, Features, Integrations, Security, Backup or Advanced content | Visible category changes locally | `navidromeSettingCategories` | Loading real settings | implemented |
| Navidrome local draft editing | Field inputs, selects and toggles | Updated compact setting rows | Draft object updates in component state only; secret fields remain masked | `navidromeConfigCatalog` | Persisting config or storing real secrets | implemented |
| Search settings | Advanced search input | Filtered settings list | Filters by label, key, env var and description | `navidromeConfigCatalog` | Querying external docs or config | implemented |
| TOML preview | Advanced preview toggle | Display-only generated `navidrome.toml` sample | Preview recomputes from draft | Local draft state | File writing or exposing private paths/secrets | implemented |
| Env var preview | Advanced preview toggle | Display-only `ND_` mapping | Preview recomputes from draft | Local draft state | Mutating environment variables | implemented |
| Dry-run preview | `Preview changes` button | Dry-run sheet with changed fields, old/new values, restart count, warnings and diff-style TOML | Computes diff from saved vs draft mock state | Saved/draft state | Writing files, API calls, real validation | implemented |
| Apply mock changes | `Apply mock changes` in dry-run sheet | Saved toast and optional restart recommendation state | Saved draft becomes current draft; no persistence | Local state | Real apply, restart or config write | implemented |
| Reset changes | `Reset changes` button | Reset toast | Draft resets to last saved mock draft | Local state | Reading disk config | implemented |
| Secret/risky warnings | Sensitive or caution setting rows | Inline warning notes | Static warnings render from catalog metadata | `navidromeConfigCatalog` | Logging or exposing secrets | implemented |
| View logs | Navidrome `View logs` button or details action | Mock log viewer with All, Info, Warnings and Errors filters | Filter changes visible static log rows only | Static mock log lines | Reading real logs, process output or files | implemented |
| Jellyfin coming soon | Jellyfin card | Coming-soon sheet | Active sheet becomes Jellyfin coming soon | `anchorServers` coming-soon copy | Jellyfin discovery or connection | implemented |
| Emby coming soon | Emby card | Coming-soon sheet | Active sheet becomes Emby coming soon | `anchorServers` coming-soon copy | Emby discovery or connection | implemented |
| Remove mock server | Server menu remove option | Confirmation dialog before local preview card removal | On confirm, Navidrome card is hidden until refresh; cancel leaves it visible | `anchorServers[0]` | Removing real config or server data | implemented |
| Restore mock server | Empty Servers state restore button | Navidrome card returns to the local preview | `navidromeVisible` returns true and mock server state returns active | `anchorServers[0]` | Server discovery, real config restore or connection | implemented |

## Library

| Interaction | Trigger | Resulting UI | Mock state changes | Data used | Forbidden real behavior | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Change folder | `Change folder` row | Folder picker mock sheet | Selected mock path changes local display copy only | Static fake folder list | Filesystem access, file picker, `FileReader` | implemented |
| Refresh library | `Refresh library` row | Scan progress sheet with static result copy | Mock scan state moves through scanning, complete or manually simulated failed; Last scan can update to `just now` | `anchorLibrary` stats/footer and static scan rows | Media scan, metadata read, backend call | implemented |
| Verify access | `Verify access` row | Access verification result sheet | Run check again briefly toggles local checking state | Static permission result copy | Permission probing or path checks | implemented |
| Library settings | `Library settings` row | Library settings sheet | Local visual toggles save to component state and show toast | Static settings: scan behavior, metadata and safety | Persisting real settings | implemented |
| Stats detail | Songs, Albums or Artists stat | Stats detail sheet | Active overlay becomes stats detail | `anchorLibrary.stats` plus static extra counts | Querying real library | implemented |
| Scan history | Last scan or Duration footer item | Scan history sheet | Active overlay becomes scan history | Static mock scan rows | Reading real scan logs | implemented |

## Activity

| Interaction | Trigger | Resulting UI | Mock state changes | Data used | Forbidden real behavior | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Filter sheet | Activity filter icon | Filter sheet with All, Server, Library, Errors, Today and Yesterday | `activityFilter` changes local visible list and persists while staying inside Anchor | `anchorActivity` static events | Real log filtering or server query | implemented |
| Details buttons | Activity `Details` buttons | Activity detail sheet, or error detail sheet for Startup failed | `selectedActivityId` changes locally; nested button stops propagation | `anchorActivity` item | Reading logs or diagnostics | implemented |
| Startup failed details | Startup failed row or Details button | Error detail sheet with port-in-use copy, mock diagnostics, suggested mock fixes, copy summary toast and Navidrome Settings action | `selectedActivityId` changes locally; copy action shows toast only; settings action opens existing Navidrome Settings sheet | Startup failed static event | Real port/process/network check | implemented |
| Activity item tap | Activity item body | Activity detail sheet, or error detail sheet for Startup failed | `selectedActivityId` changes locally | `anchorActivity` item | Reading logs or diagnostics | implemented |
| Today / Yesterday filtering | Today or Yesterday filter option | Activity list shows only matching day group | `activityFilter` becomes `today` or `yesterday` | `anchorActivity.dayGroup` | Date queries or real log filtering | implemented |
| Empty filtered state | Any filter with no local results | Anchor-styled empty state with Reset filter action | Reset returns `activityFilter` to `all` | Filtered static event array | Real diagnostics, backend query or log reads | implemented |
| Errors-only state | Errors filter option | Activity list shows only error severity events, including Startup failed | `activityFilter` becomes `errors` | `anchorActivity.severity` | Real error/log query | implemented |
| Copy diagnostic summary | Error detail action | Toast-only copy feedback | Toast state changes to info message | Startup failed static diagnostic | Clipboard dependency, port probing or process inspection | implemented |
| Open Navidrome Settings from error detail | Error detail action | Existing Navidrome Settings sheet opens | Active sheet switches to `navidromeSettings` | Existing Navidrome Settings component | Duplicate settings implementation or real config access | implemented |

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
- Current implementation has bottom nav, Home Batch 1 interactions, Servers Batch 2 interactions and Library Batch 3 interactions.
- Activity interactions are implemented for filter, event detail, error detail, Today/Yesterday filtering, errors-only state, empty-state handling and diagnostic copy toast.
- Bloco 2.8 closes visible interaction gaps found after QA: Home server menu icon is wired, Add Server validation is visible, secret fields accept masked local draft edits, and the removed-server empty state has a restore action.
- Remaining Anchor work is state coverage polish and final completion audit.
- No app-specific implementation should be considered complete unless its forbidden real behavior has also been checked.
