# Aria Interaction Audit

## Summary

- Total controls audited: 198
- Working: 174
- Dead: 6
- Partial: 6
- Should not be clickable: 12
- Unknown / browser-check needed: 0
- Console errors: 0 runtime errors observed in Playwright. Browser console showed React DevTools info messages and one Vite reconnect/polling log while the dev server was restarted during audit.

Static inspection used `src/apps/aria/AriaPreview.tsx`, `ariaInteractionMap.ts`, `ariaMockData.ts`, all Aria component files, and the Aria screen contract/handoff docs. Browser inspection used the local app at `http://127.0.0.1:5173`, selected Aria, visited every top-level tab, opened Album Detail, Artist Detail, Playlist Detail, Track Details, Now Playing, Lyrics and Queue, and clicked the visible controls represented below. Chrome DevTools MCP could not start in this environment because the browser backend reported a missing X server, so console validation was performed with Playwright MCP.

## High-risk dead controls

- Listen Home recent addition `•••` glyphs look like row-level more buttons, but they are only text inside the row button; clicking the row opens the detail instead of opening options. Status: DEAD.
- Bottom nav visibility under full playback overlays was resolved in Bloco 7B. Full playback overlays now own the screen and bottom nav is not rendered while an overlay is open. Status: WORKING.
- Queue reorder handles are explicit grip buttons, but they only show a toast saying the handle is visual only. Status: PARTIAL, bordering on should-be-passive unless drag/reorder is added.
- Detail navigation was resolved in Bloco 7B. Nested details now use a local stack, so Back returns to the previous detail before returning to the active top-level tab. Status: WORKING.
- Many `More` / options buttons display menu affordances but only show toast feedback. They are not dead, but they are incomplete for the visual affordance. Status: PARTIAL.
- Playlist import/export cards use file/share language but only show mock toasts. They should either be clarified as mock-only/toast-only or restyled away from real file actions. Status: PARTIAL.

## Unexpected Screen Destinations

These are not necessarily dead controls. They are cases where the control responds, but the destination may be the wrong screen for the moment or interaction intent.

| Source | Element | Current destination | Concern | Likely expected destination/behavior | Status | Suggested fix block |
|---|---|---|---|---|---|---|
| Listen Home | Track recent addition rows: Sunday Morning, Late Ambient, A Place | Track Details | A music-player home row tap may be expected to start/open playback, not open metadata inspection. | Open Now Playing or set current mock track and open Now Playing; reserve Track Details for explicit info/more action. | PARTIAL | Aria top-level screen interactions |
| Explore | Songs category card | Track Details | Category card implies browsing Songs, not inspecting one arbitrary track. | Open local Songs category/list or a search result set. | PARTIAL | Aria top-level screen interactions |
| Album Detail | Track number/title rows | Track Details | In an album playback context, tapping a track commonly plays/selects it and opens Now Playing; current behavior opens metadata details. | Start/select local mock track and open Now Playing, or add a separate info affordance for Track Details. | PARTIAL | Aria detail screen interactions |
| Artist Detail | Top song number/title rows | Track Details | Top songs list reads as playback content; row tap likely should play/open Now Playing rather than metadata. | Start/select local mock track and open Now Playing; keep more/info for Track Details if needed. | PARTIAL | Aria detail screen interactions |
| Playlist Detail | Track artwork/title rows | Track Details | Playlist tracks usually play/select track; current behavior opens Track Details. | Start/select local mock track and open Now Playing. | PARTIAL | Aria detail screen interactions |
| Queue | Queue item rows | Toast only | Queue row responds but does not open Now Playing, change current item, or show Track Details. | Select local queue item and open/update Now Playing, or show row detail intentionally. | PARTIAL | Aria playback overlay interactions |
| Library | Albums category row | Album Detail | A category row with chevron implies browsing the Albums collection, but it opens one representative album. | Open local Albums category/list first, then album detail from an album row. | PARTIAL | Aria top-level screen interactions |
| Library | Artists category row | Artist Detail | A category row with chevron implies browsing the Artists collection, but it opens one representative artist. | Open local Artists category/list first, then artist detail from an artist row. | PARTIAL | Aria top-level screen interactions |
| Library | My Playlists shelf card | Playlist Detail | Shelf cards can reasonably open detail, but if treated as a shelf/category entry, they may be expected to open the Playlists collection. | Keep as detail if card is a concrete playlist; otherwise navigate to Playlists. | PARTIAL | Aria top-level screen interactions |
| Listen Home | Your Playlists shortcut card | Playlist Detail | Shortcut label is broad (`Your Playlists`) but opens one specific playlist. | Navigate to Playlists tab or label/card should represent the specific playlist. | PARTIAL | Aria top-level screen interactions |
| Listen Home | Artists shortcut card | Artist Detail | Shortcut label is broad (`Artists`) but opens one specific artist. | Navigate to Library/Artists category or label/card should represent the specific artist. | PARTIAL | Aria top-level screen interactions |
| Artist Detail | EPs & Singles rows | Toast only | Rows have chevrons and release artwork, but do not open release/album detail. | Open Album/Release detail using mock data, or remove chevron/action styling. | PARTIAL | Aria detail screen interactions |

Decision needed before implementation: define the primary row-tap rule for Aria music content. A consistent rule would avoid accidental metadata screens:

- Track row tap: play/select track and open Now Playing.
- Track row more/info button: open Track Details or options sheet.
- Album/artist/playlist concrete row/card tap: open detail.
- Category row/card tap: open category/list, not an arbitrary representative item.

## Interaction Map By Screen

| Screen | Element | Current behavior | Status | Expected mock behavior | Suggested fix block |
|---|---|---|---|---|---|
| Global / AriaPreview | Toast behavior | Local toast appears and clears after timeout. | WORKING | Keep local display-only toast feedback. | Aria global/navigation interactions |
| Global / AriaPreview | Overlay transitions | Now Playing, Lyrics and Queue mount as local animated overlays. | WORKING | Keep local overlay transitions. | Aria global/navigation interactions |
| Global / AriaPreview | Detail navigation stack | Details open locally with stack-style history; Back pops to the previous detail, then clears to the active tab from the first detail. | WORKING | Preserve previous detail when opening a nested detail. | Aria global/navigation interactions |
| Bottom Nav | Listen tab | Changes active tab and closes open detail/overlay when reachable. | WORKING | Navigate locally to Listen. | Aria global/navigation interactions |
| Bottom Nav | Library tab | Changes active tab and closes open detail/overlay when reachable. | WORKING | Navigate locally to Library. | Aria global/navigation interactions |
| Bottom Nav | Playlists tab | Changes active tab and closes open detail/overlay when reachable. | WORKING | Navigate locally to Playlists. | Aria global/navigation interactions |
| Bottom Nav | Explore tab | Changes active tab and closes open detail/overlay when reachable. | WORKING | Navigate locally to Explore. | Aria global/navigation interactions |
| Bottom Nav | Visible nav behind full overlays | Nav is not rendered while Now Playing, Lyrics or Queue overlays are open, and returns when the overlay closes. | WORKING | Hide nav under overlays so full playback surfaces own the screen. | Aria global/navigation interactions |
| Mini Player | Mini player body | Opens Now Playing overlay by click or keyboard Enter/Space. | WORKING | Expand Now Playing overlay. | Aria global/navigation interactions |
| Mini Player | Previous | Cycles the local static mock playback queue backward, wraps at the beginning, updates the mini player track copy and shows `Playing previous: <title> (mock)`. | WORKING | Cycle local mock queue only; no real playback. | Aria global/navigation interactions |
| Mini Player | Play/Pause | Toggles local playing visual state. | WORKING | Toggle local mock playback state. | Aria playback overlay interactions |
| Mini Player | Next | Cycles the local static mock playback queue forward, wraps at the end, updates the mini player track copy and shows `Playing next: <title> (mock)`. | WORKING | Cycle local mock queue only; no real playback. | Aria global/navigation interactions |
| Mini Player | Progress underline | Looks like progress but has `pointer-events-none` and no handler. | SHOULD_NOT_BE_CLICKABLE | Keep passive or make it an actual seek affordance. | Aria playback overlay interactions |
| Listen Home | Queue status icon button | Shows `Queue status (mock)` toast. | WORKING | Toast-only status is acceptable if this remains a status indicator. | Aria top-level screen interactions |
| Listen Home | Main Play CTA | Calls local play handler, sets playing true, shows playback toast. | WORKING | Start local mock playback state. | Aria top-level screen interactions |
| Listen Home | Your Playlists shortcut card | Opens Playlist Detail for the first mock playlist. | WORKING | Open playlist detail. | Aria top-level screen interactions |
| Listen Home | Artists shortcut card | Opens Artist Detail for the first mock artist. | WORKING | Open artist detail. | Aria top-level screen interactions |
| Listen Home | Search affordance | Navigates locally to Explore. | WORKING | Open Explore/search hub. | Aria top-level screen interactions |
| Listen Home | Recent additions See all | Shows `See all (mock)` toast. | PARTIAL | Open a local list view or clearly keep as toast-only. | Aria top-level screen interactions |
| Listen Home | Recent addition row: Midnight Horizons | Opens Album Detail. | WORKING | Open album detail. | Aria top-level screen interactions |
| Listen Home | Recent addition row: Sunday Morning | Opens Track Details. | WORKING | Open track detail. | Aria top-level screen interactions |
| Listen Home | Recent addition row: Late Ambient | Opens Track Details. | WORKING | Open track detail. | Aria top-level screen interactions |
| Listen Home | Recent addition row: A Place | Opens Track Details. | WORKING | Open track detail. | Aria top-level screen interactions |
| Listen Home | Recent addition row `•••` glyphs, 4 instances | Dots are not independent controls; row click opens detail. | DEAD | Add real row options or remove/passivate the dots. | Aria final no-dead-control sweep |
| Library | Library queue tools icon | Shows `Library tools (mock)` toast. | PARTIAL | Open local library tools/options sheet or clarify as toast-only. | Aria top-level screen interactions |
| Library | Library search icon | Shows `Library search (mock)` toast. | PARTIAL | Open local search/filter state or route to Explore. | Aria top-level screen interactions |
| Library | Songs category row | Opens dedicated Songs page. | WORKING | Open a local songs category/list or restyle as passive. | Aria top-level screen interactions |
| Library | Albums category row | Opens dedicated Albums page. | WORKING | Open albums category or representative album detail. | Aria top-level screen interactions |
| Library | Artists category row | Opens dedicated Artists page. | WORKING | Open artists category or representative artist detail. | Aria top-level screen interactions |
| Library | Genres category row | Opens dedicated Genres page. | WORKING | Open local genres category/list or restyle as passive. | Aria top-level screen interactions |
| Library | Folders category row | Opens dedicated Folders page with no-file-access folder preview rows. | WORKING | Mock folder category without filesystem access or restyle as passive. | Aria top-level screen interactions |
| Library | Compilations category row | Opens dedicated Compilations page. | WORKING | Open local category/list or restyle as passive. | Aria top-level screen interactions |
| Library | My Playlists See all | Navigates to the Playlists tab. | WORKING | Navigate to Playlists tab or open local playlist list. | Aria top-level screen interactions |
| Library | My Playlists cards, 3 instances | Open Playlist Detail. | WORKING | Open playlist detail. | Aria top-level screen interactions |
| Library | Recently Added See all | Opens dedicated Recently Added page. | WORKING | Open local recently-added list or clarify as toast-only. | Aria top-level screen interactions |
| Library | Recently Added album poster buttons, 3 instances | Open Album Detail. | WORKING | Open album detail. | Aria top-level screen interactions |
| Playlists | Create Playlist card | Shows `Create Playlist (mock)` toast. | WORKING | Toast-only mock creation is acceptable if no creation flow exists. | Aria top-level screen interactions |
| Playlists | New Folder card | Shows `New Folder (mock)` toast. | WORKING | Toast-only mock folder action is acceptable. | Aria top-level screen interactions |
| Playlists | Import Playlist card | Shows `Import Playlist (mock)` toast; wording implies file import. | PARTIAL | Keep mock-only and avoid real file implication, or show local mock modal. | Aria top-level screen interactions |
| Playlists | Export Playlist card | Shows `Export Playlist (mock)` toast; wording implies download/share. | PARTIAL | Keep mock-only and avoid real export/download implication, or show local mock modal. | Aria top-level screen interactions |
| Playlists | Filter chips: All, Folders, Created, Imported, Favorites | Each shows a toast; selected visual state does not change. | PARTIAL | Toggle local filter state and active chip, or restyle as passive chips. | Aria top-level screen interactions |
| Playlists | Folder rows, 3 instances | Each shows folder-specific toast. | PARTIAL | Open local folder contents or restyle row chevrons away. | Aria top-level screen interactions |
| Playlists | Sort control | Shows `Sort playlists (mock)` toast. | PARTIAL | Toggle local sort state or open local sort menu. | Aria top-level screen interactions |
| Playlists | Playlist artwork buttons, 5 instances | Open Playlist Detail. | WORKING | Open playlist detail. | Aria top-level screen interactions |
| Playlists | Playlist title rows, 5 instances | Open Playlist Detail. | WORKING | Open playlist detail. | Aria top-level screen interactions |
| Playlists | Playlist more buttons, 5 instances | Show `More options (mock)` toast. | PARTIAL | Open local options sheet/menu or clearly use toast-only affordance. | Aria top-level screen interactions |
| Explore | Explore queue/status icon | Shows `Explore status (mock)` toast. | WORKING | Toast-only status is acceptable if it remains status feedback. | Aria top-level screen interactions |
| Explore | Search affordance | Shows `Explore search (mock)` toast. | PARTIAL | Enter local search mode/filter state or clearly mark as preview-only. | Aria top-level screen interactions |
| Explore | Genres category card | Shows `Genres (mock)` toast. | PARTIAL | Open local genre category view or restyle as non-action preview. | Aria top-level screen interactions |
| Explore | Albums category card | Opens Album Detail. | WORKING | Open album detail or albums category. | Aria top-level screen interactions |
| Explore | Artists category card | Opens Artist Detail. | WORKING | Open artist detail or artists category. | Aria top-level screen interactions |
| Explore | Radio category card | Shows `Radio (mock)` toast. | PARTIAL | Open local radio preview/detail or restyle as passive. | Aria top-level screen interactions |
| Explore | Songs category card | Opens Track Details. | WORKING | Open track detail or songs category. | Aria top-level screen interactions |
| Explore | Playlists category card | Opens Playlist Detail. | WORKING | Open playlist detail or playlists category. | Aria top-level screen interactions |
| Explore | Recently Explored See all | Shows `See all explored (mock)` toast. | PARTIAL | Open local recent exploration list or clarify as toast-only. | Aria top-level screen interactions |
| Explore | Recently Explored Genres | Shows `Genres (mock)` toast. | PARTIAL | Open local genre view or restyle as passive. | Aria top-level screen interactions |
| Explore | Recently Explored Artist | Opens Artist Detail. | WORKING | Open artist detail. | Aria top-level screen interactions |
| Explore | Recently Explored Albums | Opens Album Detail. | WORKING | Open album detail. | Aria top-level screen interactions |
| Explore | Recently Explored Recently Added | Shows `Recently Added (mock)` toast. | PARTIAL | Open local list or restyle as passive. | Aria top-level screen interactions |
| Album Detail | Back | Returns to active top-level tab. | WORKING | Return from detail to previous top-level tab. | Aria detail screen interactions |
| Album Detail | Header more actions | Removed; header is navigation-only. | SHOULD_NOT_BE_CLICKABLE | Keep one album contextual menu entry point. | Aria detail screen interactions |
| Album Detail | Artist link | Opens matching Artist Detail when mock artist data exists; otherwise shows unavailable mock-data toast. | WORKING | Open Artist Detail or restyle as passive metadata. | Aria detail screen interactions |
| Album Detail | Play | Shows `Play album (mock)` toast. | WORKING | Mock-only playback feedback is acceptable. | Aria detail screen interactions |
| Album Detail | Shuffle | Shows `Shuffle album (mock)` toast. | WORKING | Mock-only shuffle feedback is acceptable. | Aria detail screen interactions |
| Album Detail | More action button | Opens Album Options bottom sheet. | WORKING | Open local options menu/sheet. | Aria detail screen interactions |
| Album Detail | Track number buttons, 6 instances | Open Track Details. | WORKING | Open track detail. | Aria detail screen interactions |
| Album Detail | Track title rows, 6 instances | Open Track Details. | WORKING | Open track detail. | Aria detail screen interactions |
| Album Detail | Track more buttons, 6 instances | Open Track Options bottom sheet. | WORKING | Open local track options menu/sheet. | Aria detail screen interactions |
| Artist Detail | Back | Returns to active top-level tab. | WORKING | Return from detail to previous top-level tab. | Aria detail screen interactions |
| Artist Detail | Header more actions | Removed; header is navigation-only. | SHOULD_NOT_BE_CLICKABLE | Keep one artist contextual menu entry point. | Aria detail screen interactions |
| Artist Detail | Tags: Electronic, Classical, Ambient | Tags are visually chip-like text but not buttons. | SHOULD_NOT_BE_CLICKABLE | Keep passive or style less like filters. | Aria detail screen interactions |
| Artist Detail | Play | Shows `Play artist top songs (mock)` toast. | WORKING | Mock-only playback feedback is acceptable. | Aria detail screen interactions |
| Artist Detail | More artist actions | Opens Artist Options bottom sheet. | WORKING | Open local artist options menu/sheet. | Aria detail screen interactions |
| Artist Detail | Latest Release row | Opens Album Detail. | WORKING | Open album detail. | Aria detail screen interactions |
| Artist Detail | Top Songs See all | Opens Top Songs bottom sheet. | WORKING | Open local top-songs list or clarify as toast-only. | Aria detail screen interactions |
| Artist Detail | Top song number buttons, 5 instances | Open Track Details. | WORKING | Open track detail. | Aria detail screen interactions |
| Artist Detail | Top song title rows, 5 instances | Open Track Details. | WORKING | Open track detail. | Aria detail screen interactions |
| Artist Detail | Top song more buttons, 5 instances | Open Track Options bottom sheet. | WORKING | Open local track options menu/sheet. | Aria detail screen interactions |
| Artist Detail | EPs & Singles rows, 2 instances | Open mock release Album Detail objects. | WORKING | Open album/release detail or remove chevron/action styling. | Aria detail screen interactions |
| Playlist Detail | Back | Returns to active top-level tab. | WORKING | Return from detail to previous top-level tab. | Aria detail screen interactions |
| Playlist Detail | Header more actions | Removed; header is navigation-only. | SHOULD_NOT_BE_CLICKABLE | Keep one playlist contextual menu entry point. | Aria detail screen interactions |
| Playlist Detail | Play | Shows `Play playlist (mock)` toast. | WORKING | Mock-only playback feedback is acceptable. | Aria detail screen interactions |
| Playlist Detail | Shuffle | Shows `Shuffle playlist (mock)` toast. | WORKING | Mock-only shuffle feedback is acceptable. | Aria detail screen interactions |
| Playlist Detail | More action button | Opens Playlist Options bottom sheet. | WORKING | Open local options menu/sheet. | Aria detail screen interactions |
| Playlist Detail | Track artwork buttons, 4 instances | Open Track Details. | WORKING | Open track detail. | Aria detail screen interactions |
| Playlist Detail | Track title rows, 4 instances | Open Track Details. | WORKING | Open track detail. | Aria detail screen interactions |
| Playlist Detail | Track more buttons, 4 instances | Open Track Options bottom sheet. | WORKING | Open local track options menu/sheet. | Aria detail screen interactions |
| Track Details | Back | Pops the local detail stack, returning to the previous detail when opened from one. | WORKING | Return to previous detail when opened from a detail, or document top-level return. | Aria detail screen interactions |
| Track Details | Header more actions | Opens Track Options bottom sheet. | WORKING | Open local track options menu/sheet. | Aria detail screen interactions |
| Track Details | Metadata rows | Static text only; not interactive. | SHOULD_NOT_BE_CLICKABLE | Keep passive. | Aria detail screen interactions |
| Track Details | Favorite action | Toggles visible local favorited state and shows added/removed mock toast. | WORKING | Toggle local favorite state or clarify as toast-only. | Aria detail screen interactions |
| Track Details | Add to playlist action | Opens Add to Playlist bottom sheet with mock playlist rows. | WORKING | Toast-only mock action is acceptable. | Aria detail screen interactions |
| Track Details | Add to queue action | Sets visible local queued state and shows mock queue toast; no queue persistence. | WORKING | Mutate local mock queue or clarify as toast-only. | Aria detail screen interactions |
| Track Details | Show in folder action | Shows folder location preview toast explicitly saying no file access. | WORKING | Toast-only mock feedback is acceptable and must remain no-file-access. | Aria detail screen interactions |
| Now Playing | Collapse | Closes overlay back to mini player. | WORKING | Collapse overlay. | Aria playback overlay interactions |
| Now Playing | More player options | Shows `Player options (mock)` toast. | PARTIAL | Open local options menu/sheet. | Aria playback overlay interactions |
| Now Playing | Favorite | Toggles local favorite visual state and toast. | WORKING | Toggle local mock favorite. | Aria playback overlay interactions |
| Now Playing | Seek/progress | Shows `Seek preview only (mock)` toast; no local position change. | PARTIAL | Set local progress preview/seek state or make it visually passive. | Aria playback overlay interactions |
| Now Playing | Shuffle | Toggles local shuffle state and toast. | WORKING | Toggle local shuffle. | Aria playback overlay interactions |
| Now Playing | Previous | Shows previous-track toast; no queue cycling. | PARTIAL | Cycle local mock queue or keep preview-only. | Aria playback overlay interactions |
| Now Playing | Play/Pause | Toggles local playing visual state. | WORKING | Toggle local mock playback. | Aria playback overlay interactions |
| Now Playing | Next | Shows next-track toast; no queue cycling. | PARTIAL | Cycle local mock queue or keep preview-only. | Aria playback overlay interactions |
| Now Playing | Repeat | Cycles local repeat state off/all/one and toast. | WORKING | Toggle local repeat. | Aria playback overlay interactions |
| Now Playing | Lyrics button | Opens Lyrics overlay. | WORKING | Open Lyrics overlay. | Aria playback overlay interactions |
| Now Playing | Queue button | Opens Queue overlay. | WORKING | Open Queue overlay. | Aria playback overlay interactions |
| Now Playing | Context pill tap | Shows active context toast. | WORKING | Show local context feedback. | Aria playback overlay interactions |
| Now Playing | Context pill keyboard | ArrowLeft/ArrowRight and Enter/Space rotate context label. | WORKING | Keep keyboard context cycling. | Aria playback overlay interactions |
| Now Playing | Context pill swipe | Pointer drag threshold rotates context item. | WORKING | Keep local swipe cycling. | Aria playback overlay interactions |
| Lyrics | Collapse lyrics | Closes overlay to mini player. | WORKING | Collapse overlay. | Aria playback overlay interactions |
| Lyrics | Header title/back to Now Playing | Returns to Now Playing overlay. | WORKING | Return to Now Playing. | Aria playback overlay interactions |
| Lyrics | Lyrics options | Shows `Lyrics options (mock)` toast. | PARTIAL | Open local lyrics options menu/sheet. | Aria playback overlay interactions |
| Lyrics | Lyric lines | Static text, no row handlers. | SHOULD_NOT_BE_CLICKABLE | Keep passive unless lyric line seek is added. | Aria playback overlay interactions |
| Lyrics | Timeline/progress | Shows `Lyric timeline preview only (mock)` toast; no local position change. | PARTIAL | Set local progress preview/seek state or make it visually passive. | Aria playback overlay interactions |
| Lyrics | Footer return/list button | Returns to Now Playing overlay. | WORKING | Return to Now Playing. | Aria playback overlay interactions |
| Lyrics | Previous | Shows previous-track toast; no queue cycling. | PARTIAL | Cycle local mock queue or keep preview-only. | Aria playback overlay interactions |
| Lyrics | Play/Pause | Toggles local playing visual state. | WORKING | Toggle local mock playback. | Aria playback overlay interactions |
| Lyrics | Next | Shows next-track toast; no queue cycling. | PARTIAL | Cycle local mock queue or keep preview-only. | Aria playback overlay interactions |
| Lyrics | Queue | Opens Queue overlay. | WORKING | Open Queue overlay. | Aria playback overlay interactions |
| Queue | Return to Now Playing | Returns to Now Playing overlay. | WORKING | Return to Now Playing. | Aria playback overlay interactions |
| Queue | Close queue overlay | Collapses to base screen/mini player. | WORKING | Close overlay. | Aria playback overlay interactions |
| Queue | Current track card | Shows `Current track is playing (mock)` toast. | WORKING | Toast-only current-track feedback is acceptable. | Aria playback overlay interactions |
| Queue | Shuffle | Toggles local shuffle state and toast. | WORKING | Toggle local shuffle. | Aria playback overlay interactions |
| Queue | Repeat | Cycles local repeat state off/all/one and toast. | WORKING | Toggle local repeat. | Aria playback overlay interactions |
| Queue | Save as playlist | Shows `Save queue as playlist (mock)` toast. | WORKING | Toast-only save mock is acceptable if no mutation is expected. | Aria playback overlay interactions |
| Queue | Clear | Shows `Clear queue confirmation (mock)` toast; no confirm dialog appears. | PARTIAL | Open local mock confirmation or relabel as preview-only. | Aria playback overlay interactions |
| Queue | Reorder handles, 6 instances | Show `Reorder handle is visual only`; no drag/reorder. | PARTIAL | Implement local reorder or remove/passivate drag affordance. | Aria playback overlay interactions |
| Queue | Queue rows, 6 instances | Show selected-track toast; do not open details or change now playing. | PARTIAL | Open track detail, set local current queue item, or restyle as passive. | Aria playback overlay interactions |
| Queue | Row more buttons, 6 instances | Show track action toast. | PARTIAL | Open local row options menu/sheet. | Aria playback overlay interactions |

## Suggested Implementation Blocks

1. Aria global/navigation interactions

Address detail-stack behavior, overlay/bottom-nav visibility or clickability, and any intended overlay-close-on-tab-change rule. Keep changes local-state-only.

2. Aria top-level screen interactions

Resolve top-level category rows, search affordances, See all buttons, playlist filters, sort controls, and misleading import/export labels. Prefer local mock state where useful; otherwise make visual affordances passive.

3. Aria detail screen interactions

Resolve menu affordances, artist/release links, track row option buttons, Track Details action toggles, and nested detail back behavior.

4. Aria playback overlay interactions

Resolve progress/seek behavior, previous/next queue cycling expectations, lyrics timeline, queue clear confirmation, queue row behavior, and reorder handles.

5. Aria final no-dead-control sweep

Remove or implement remaining fake option glyphs, especially Listen Home recent-row `•••`, and re-audit all repeated rows/buttons after fixes.

## Bloco 7B Resolution Notes

- Detail navigation now uses a local stack in `AriaPreview`: nested Album, Artist, Playlist and Track details preserve the previous detail and Back pops one level at a time.
- Bottom navigation is intentionally hidden while Now Playing, Lyrics or Queue overlays are open, then restored after overlay collapse.
- Mini player Previous / Next now rotate through the static mock playback queue in local React state, wrap at queue ends and update mini-player title/artist text without changing its visual styling.
- Full propagation of current-track state into the full playback overlays remains deferred to the playback overlay interaction block because those components were outside the Bloco 7B allowed file list.

## Bloco 7C Resolution Notes

- Listen Home broad shortcut cards no longer open arbitrary representative details: `Your Playlists` navigates to the Playlists tab, `Artists` navigates to Library with a mock artist-index toast, and search still navigates to Explore. Recent Additions `•••` glyphs are now independent option buttons with item-specific mock toasts, and `See all` toggles an expanded local recent list.
- Library category rows now open local category/list preview states instead of opening first album/artist details or generic toasts. Albums, Artists, Songs, Genres, Folders, Compilations, Playlists, Recent and Search previews all respond locally; concrete album, artist, playlist and track rows still open valid detail screens. Library tools now toggle a compact local mock tools panel.
- Playlists filter chips now own local selected state and change displayed mock content. Folder rows select a mock folder state, Sort cycles local sort modes and order, Import/Export copy and toasts explicitly stay preview-only with no file or download behavior, and playlist more buttons are item-specific.
- Explore search and category cards now open local preview modes instead of arbitrary first-item details. Genres, Albums, Artists, Radio, Songs, Playlists, Search and Recently Explored all expose local mock lists; concrete result rows open valid detail screens where appropriate.
- Deferred to Bloco 7D/7E: detail-screen menu/options completeness, detail track-row playback semantics, playback overlay progress/queue/reorder behavior and full no-dead-control re-audit across non-top-level surfaces.

## Bloco 7C.1 Resolution Notes

- Listen Home top-right control is now a source/server status control instead of a queue/status glyph. It uses a server-style icon and opens an inline Source panel.
- The Source panel shows only the active configured source. The default active source is `Local library`, marked active, with `Device storage preview` detail.
- Local source actions are `Atualizar` and `Configurações`; `Atualizar` shows a specific mock refresh toast and `Configurações` opens the shared Aria Settings panel.
- The source model supports a server source path mock-only: server sources would show `Sincronizar` and route sync feedback to a mock toast. No real sync, server connection, filesystem scan or persistence was added.
- Library top-right tools/ListMusic control was replaced by an app settings icon and now opens shared Aria Settings. Library search remains unchanged and still opens the local Library Search Preview.
- The shared settings panel is display-only/local-state-only with specific mock responses for every row. No settings persistence, backend calls, server calls, auth or network behavior was added.

## Bloco 7C.2 Resolution Notes

- Source and Aria Settings now render as Aria bottom-sheet overlays instead of inline/debug-like panels. The Source sheet remains active-source-only and Settings keeps the same mock-only rows.
- Library category and search previews now open in bottom sheets, so Songs, Albums, Artists, Genres, Folders, Compilations, Search and Recently Added no longer push Library content down.
- Explore search/category/recent previews now open in bottom sheets, preserving the discovery layout while keeping the same mock-only category/result behavior.
- Opening a concrete album, artist, playlist or track from a sheet closes the sheet before opening the detail screen, preserving the Bloco 7B detail stack behavior.
- Sheet titles now avoid unnecessary debug wording such as `Preview`; mock-only constraints remain in row copy/toasts where relevant. No real sync, search, filesystem, server or persistence behavior was added.

## Bloco 7C.3 Resolution Notes

- Source sheet action copy is now English: local sources show `Refresh` and `Settings`; future server sources show `Sync` and `Settings`.
- The local Home source control no longer shows a green online dot. Green status remains reserved for future active server/online source states.
- The default Local library source now uses local-device iconography while preserving the mock-only server-source branch. No sync, server connection, filesystem access or persistence was added.

## Bloco 7D Resolution Notes

- Album, Artist, Playlist and Track Detail more/options controls now open Aria bottom sheets instead of generic options toasts.
- Album artist links open matching Artist Detail screens when mock data exists; missing artists return a clear unavailable mock-data toast.
- Artist Top Songs `See all` opens a bottom sheet, and Artist EPs & Singles rows with chevrons now open mock release Album Detail screens instead of toast-only responses.
- Detail track-row more buttons open the shared Track Options sheet from Album, Artist and Playlist details.
- Track Details Favorite and Add to Queue actions now have visible local state, and Add to Playlist opens a local picker sheet. Show in folder remains preview-only with explicit no-file-access copy.
- Track-row tap playback normalization remains deferred to Bloco 7E; in Bloco 7D, detail track rows continue opening Track Details.
- No real playback, queue persistence, playlist persistence, filesystem access or network behavior was added.

## Bloco 7D.1S Contract Notes

- The failed generic Library-pages approach from Bloco 7D.1 was reverted. It promoted all Library categories to a single broad page model, created generic list surfaces, and caused detail headers to gain empty top space where Back competed with the hero/card.
- The next implementation block must follow the visual contracts in `docs/screen-contracts/aria/library-category-contract.md` and `docs/screen-contracts/aria/detail-header-contract.md`.
- Songs, Albums, Artists and Recently Added need category-specific music-player treatments; Genres, Folders and Compilations should stay lightweight unless designed with their own visual identity.
- Detail cleanup must avoid large empty header bars, duplicate ellipsis menus and decorative Album/Artist/Playlist labels.
- Settings redesign remains deferred to Bloco 7D.2.
- Playback overlays remain deferred to Bloco 7E.

## Notes

- Duplicated detail menu handlers from Bloco 7D remain governed by the Bloco 7D.1S detail header contract: album, artist and playlist details should keep one contextual menu and avoid duplicate header/action-row ellipsis controls.
- Duplicated navigation handlers: `AriaTrackRow` number/artwork and title buttons both open the same track detail. This works, but creates multiple focusable controls per row.
- Visual affordances that should probably become passive if not implemented: mini player progress underline, artist tags, static metadata rows, lyric lines, and possibly queue drag handles if local reorder is not planned.
- Interactions that can remain toast-only: mock create playlist, new folder, save queue as playlist, show in folder, static status buttons, and current-track feedback, provided copy stays clearly mock-only and does not imply real filesystem/download behavior.
- Interactions that should open detail: album cards/rows, artist cards/rows, playlist cards/rows, track rows, album artist link if it remains visually link-like, and artist discography rows with chevrons.
- Interactions that should toggle local state: playlist filter chips, sort selection if visible, favorite in Track Details, shuffle/repeat, play/pause, and possibly local queue item selection/current track.
- Interactions that should open overlay or sheet: global mini player, lyrics, queue, and all menu/more/options buttons if their ellipsis affordance remains.
- Behavior needing mock data/state: local search/filter results, category list screens for Songs/Genres/Folders/Compilations/Radio, playlist folders, local sort state, local queue mutation/reorder, local clear confirmation, local progress position, and nested detail history.
- Browser-observed behavior from Bloco 7A resolved in Bloco 7B: opening a track from Album Detail opens Track Details, and Back now returns to Album Detail before returning to the active top-level tab.
- Browser-observed behavior from Bloco 7A resolved in Bloco 7B: bottom nav is no longer visible behind Queue, Now Playing or Lyrics overlays.
