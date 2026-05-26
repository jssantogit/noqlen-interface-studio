# Aria Interaction Audit

## Summary

- Total controls audited: 201
- Working: 190
- Dead: 6
- Partial: 0
- Should not be clickable: 12
- Unknown / browser-check needed: 0
- Reference-backed remaining interaction work: TODO, tracked under `Reference-backed Remaining Interaction Work`.
- Console errors: 0 runtime errors observed in Playwright. Browser console showed React DevTools info messages and one Vite reconnect/polling log while the dev server was restarted during audit.

Static inspection used `src/apps/aria/AriaPreview.tsx`, `ariaInteractionMap.ts`, `ariaMockData.ts`, all Aria component files, and the Aria screen contract/handoff docs. Browser inspection used the local app at `http://127.0.0.1:5173`, selected Aria, visited every top-level tab, opened Album Detail, Artist Detail, Playlist Detail, Track Details, Now Playing, Lyrics and Queue, and clicked the visible controls represented below. Chrome DevTools MCP could not start in this environment because the browser backend reported a missing X server, so console validation was performed with Playwright MCP.

## High-risk dead controls

- Listen Home recent addition `•••` glyphs look like row-level more buttons, but they are only text inside the row button; clicking the row opens the detail instead of opening options. Status: DEAD.
- Bottom nav visibility under full playback overlays was resolved in Bloco 7B. Full playback overlays now own the screen and bottom nav is not rendered while an overlay is open. Status: WORKING.
- Queue reorder handles now move tracks down in the local queue order and keep the current track stable. Status: WORKING.
- Detail navigation was resolved in Bloco 7B. Nested details now use a local stack, so Back returns to the previous detail before returning to the active top-level tab. Status: WORKING.
- Many `More` / options buttons display menu affordances but only show toast feedback. They are not dead, but they are incomplete for the visual affordance. Status: PARTIAL.
- Playlist import/export cards use file/share language but only show toasts. They should either use toast-only behavior or be restyled away from file actions. Status: PARTIAL.

## Unexpected Screen Destinations

These are not necessarily dead controls. They are cases where the control responds, but the destination may be the wrong screen for the moment or interaction intent.

| Source | Element | Current destination | Concern | Likely expected destination/behavior | Status | Suggested fix block |
|---|---|---|---|---|---|---|
| Listen Home | Track recent addition rows: Sunday Morning, Late Ambient, A Place | Track Details | A music-player home row tap may be expected to start/open playback, not open metadata inspection. | Open Now Playing or set current local track and open Now Playing; reserve Track Details for explicit info/more action. | PARTIAL | Aria top-level screen interactions |
| Explore | Discover cards | Search/discovery sheets or Random Album detail | Explore no longer mirrors Library category navigation. | Keep Explore focused on rediscovery: Forgotten Albums, Random Album, By Year, By Style, By Mood, By Genre and Radio. | WORKING | Aria Explore role realignment |
| Album Detail | Track number/title rows | Track Details | In an album playback context, tapping a track commonly plays/selects it and opens Now Playing; current behavior opens metadata details. | Start/select local track and open Now Playing, or add a separate info affordance for Track Details. | PARTIAL | Aria detail screen interactions |
| Artist Detail | Top song number/title rows | Track Details | Top songs list reads as playback content; row tap likely should play/open Now Playing rather than metadata. | Start/select local track and open Now Playing; keep more/info for Track Details if needed. | PARTIAL | Aria detail screen interactions |
| Playlist Detail | Track artwork/title rows | Track Details | Playlist tracks usually play/select track; current behavior opens Track Details. | Start/select local track and open Now Playing. | PARTIAL | Aria detail screen interactions |
| Queue | Queue item rows | Selects the local queue item as the current track and updates playback overlay copy. | Queue rows now behave as playback rows. | Keep selecting local queue items and updating Now Playing/Lyrics/Queue. | WORKING | Aria playback overlay interactions |
| Library | Albums category row | Album Detail | A category row with chevron implies browsing the Albums collection, but it opens one representative album. | Open local Albums category/list first, then album detail from an album row. | PARTIAL | Aria top-level screen interactions |
| Library | Artists category row | Artist Detail | A category row with chevron implies browsing the Artists collection, but it opens one representative artist. | Open local Artists category/list first, then artist detail from an artist row. | PARTIAL | Aria top-level screen interactions |
| Library | My Playlists shelf card | Playlist Detail | Shelf cards can reasonably open detail, but if treated as a shelf/category entry, they may be expected to open the Playlists collection. | Keep as detail if card is a concrete playlist; otherwise navigate to Playlists. | PARTIAL | Aria top-level screen interactions |
| Listen Home | Your Playlists shortcut card | Playlist Detail | Shortcut label is broad (`Your Playlists`) but opens one specific playlist. | Navigate to Playlists tab or label/card should represent the specific playlist. | PARTIAL | Aria top-level screen interactions |
| Listen Home | Artists shortcut card | Artist Detail | Shortcut label is broad (`Artists`) but opens one specific artist. | Navigate to Library/Artists category or label/card should represent the specific artist. | PARTIAL | Aria top-level screen interactions |
| Artist Detail | EPs & Singles rows | Toast only | Rows have chevrons and release artwork, but do not open release/album detail. | Open Album/Release detail using local data, or remove chevron/action styling. | PARTIAL | Aria detail screen interactions |

Decision needed before implementation: define the primary row-tap rule for Aria music content. A consistent rule would avoid accidental metadata screens:

- Track row tap: play/select track and open Now Playing.
- Track row more/info button: open Track Details or options sheet.
- Album/artist/playlist concrete row/card tap: open detail.
- Category row/card tap: open category/list, not an arbitrary representative item.

## Interaction Map By Screen

| Screen | Element | Current behavior | Status | Expected local behavior | Suggested fix block |
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
| Mini Player | Previous | Cycles the local static playback queue backward, wraps at the beginning, updates the mini player track copy and shows `Playing previous: <title>`. | WORKING | Cycle local queue only. | Aria global/navigation interactions |
| Mini Player | Play/Pause | Toggles local playing visual state. | WORKING | Toggle local playback state. | Aria playback overlay interactions |
| Mini Player | Next | Cycles the local static playback queue forward, wraps at the end, updates the mini player track copy and shows `Playing next: <title>`. | WORKING | Cycle local queue only. | Aria global/navigation interactions |
| Mini Player | Progress underline | Looks like progress but has `pointer-events-none` and no handler. | SHOULD_NOT_BE_CLICKABLE | Keep passive or make it an actual seek affordance. | Aria playback overlay interactions |
| Listen Home | Queue status icon button | Shows `Queue status` toast. | WORKING | Toast-only status is acceptable if this remains a status indicator. | Aria top-level screen interactions |
| Listen Home | Main Play CTA | Calls local play handler, sets playing true, shows playback toast. | WORKING | Start local playback state. | Aria top-level screen interactions |
| Listen Home | Your Playlists shortcut card | Opens Playlist Detail for the first playlist. | WORKING | Open playlist detail. | Aria top-level screen interactions |
| Listen Home | Artists shortcut card | Opens Artist Detail for the first artist. | WORKING | Open artist detail. | Aria top-level screen interactions |
| Listen Home | Search affordance | Navigates locally to Explore. | WORKING | Open Explore/search hub. | Aria top-level screen interactions |
| Listen Home | Recent additions See all | Shows `See all` toast. | PARTIAL | Open a local list view or clearly keep as toast-only. | Aria top-level screen interactions |
| Listen Home | Recent addition row: Midnight Horizons | Opens Album Detail. | WORKING | Open album detail. | Aria top-level screen interactions |
| Listen Home | Recent addition row: Sunday Morning | Opens Track Details. | WORKING | Open track detail. | Aria top-level screen interactions |
| Listen Home | Recent addition row: Late Ambient | Opens Track Details. | WORKING | Open track detail. | Aria top-level screen interactions |
| Listen Home | Recent addition row: A Place | Opens Track Details. | WORKING | Open track detail. | Aria top-level screen interactions |
| Listen Home | Recent addition row `•••` glyphs, 4 instances | Dots are not independent controls; row click opens detail. | DEAD | Add real row options or remove/passivate the dots. | Aria final no-dead-control sweep |
| Library | Library queue tools icon | Shows `Library tools` toast. | PARTIAL | Open local library tools/options sheet or clarify as toast-only. | Aria top-level screen interactions |
| Library | Library search icon | Shows `Library search` toast. | PARTIAL | Open local search/filter state or route to Explore. | Aria top-level screen interactions |
| Library | Songs category row | Opens dedicated Songs page. | WORKING | Open a local songs category/list or restyle as passive. | Aria top-level screen interactions |
| Library | Albums category row | Opens dedicated Albums page. | WORKING | Open albums category or representative album detail. | Aria top-level screen interactions |
| Library | Artists category row | Opens dedicated Artists page. | WORKING | Open artists category or representative artist detail. | Aria top-level screen interactions |
| Library | Genres category row | Opens lightweight Genres bottom sheet. | WORKING | Keep local genres sheet/chips until a stronger reference exists. | Aria top-level screen interactions |
| Library | Folders category row | Opens lightweight Folders bottom sheet with no-filesystem copy. | WORKING | Mock folder category without filesystem access or file-manager styling. | Aria top-level screen interactions |
| Library | Compilations category row | Opens lightweight Compilations bottom sheet. | WORKING | Keep local collection preview sheet unless a future contract promotes it. | Aria top-level screen interactions |
| Library | My Playlists See all | Navigates to the Playlists tab. | WORKING | Navigate to Playlists tab or open local playlist list. | Aria top-level screen interactions |
| Library | My Playlists cards, 3 instances | Open Playlist Detail. | WORKING | Open playlist detail. | Aria top-level screen interactions |
| Library | Recently Added See all | Opens dedicated Recently Added page. | WORKING | Open local recently-added list or clarify as toast-only. | Aria top-level screen interactions |
| Library | Recently Added album poster buttons, 3 instances | Open Album Detail. | WORKING | Open album detail. | Aria top-level screen interactions |
| Playlists | Create Playlist card | Shows `Create Playlist` toast. | WORKING | Toast-only creation is acceptable if no creation flow exists. | Aria top-level screen interactions |
| Playlists | New Folder card | Shows `New Folder` toast. | WORKING | Toast-only folder action is acceptable. | Aria top-level screen interactions |
| Playlists | Import Playlist card | Shows `Import Playlist` toast; wording implies file import. | PARTIAL | Avoid file implication, or show a local modal. | Aria top-level screen interactions |
| Playlists | Export Playlist card | Shows `Export Playlist` toast; wording implies download/share. | PARTIAL | Avoid export/download implication, or show a local modal. | Aria top-level screen interactions |
| Playlists | Filter chips: All, Folders, Created, Imported, Favorites | Each shows a toast; selected visual state does not change. | PARTIAL | Toggle local filter state and active chip, or restyle as passive chips. | Aria top-level screen interactions |
| Playlists | Folder rows, 3 instances | Each shows folder-specific toast. | PARTIAL | Open local folder contents or restyle row chevrons away. | Aria top-level screen interactions |
| Playlists | Sort control | Shows `Sort playlists` toast. | PARTIAL | Toggle local sort state or open local sort menu. | Aria top-level screen interactions |
| Playlists | Playlist artwork buttons, 5 instances | Open Playlist Detail. | WORKING | Open playlist detail. | Aria top-level screen interactions |
| Playlists | Playlist title rows, 5 instances | Open Playlist Detail. | WORKING | Open playlist detail. | Aria top-level screen interactions |
| Playlists | Playlist more buttons, 5 instances | Show `More options` toast. | PARTIAL | Open local options sheet/menu or clearly use toast-only affordance. | Aria top-level screen interactions |
| Explore | Explore queue/status icon | Shows `Explore status` toast. | WORKING | Toast-only status is acceptable if it remains status feedback. | Aria top-level screen interactions |
| Explore | Search affordance | Opens the Search sheet with local album, artist, track and playlist rows. | WORKING | Keep Search top-level in Explore. | Aria Explore role realignment |
| Explore | Forgotten Albums card | Opens a local album discovery sheet. | WORKING | Open rediscovery-oriented local album list. | Aria Explore role realignment |
| Explore | Random Album card | Opens one local album detail directly and shows Random Album feedback. | WORKING | Keep deterministic/local detail navigation. | Aria Explore role realignment |
| Explore | By Year card | Opens a local sheet with year chips. | WORKING | Keep year chips local and app-like. | Aria Explore role realignment |
| Explore | By Style card | Opens a local sheet with style chips. | WORKING | Keep style chips local and app-like. | Aria Explore role realignment |
| Explore | By Mood card | Opens a local sheet with mood chips. | WORKING | Keep mood chips local and app-like. | Aria Explore role realignment |
| Explore | By Genre card | Opens the existing local genre sheet under discovery context. | WORKING | Keep Genre discovery separate from Library category navigation. | Aria Explore role realignment |
| Explore | Radio Browse control | Opens the Radio sheet. | WORKING | Radio represents user-added internet radio stations. | Aria Explore role realignment |
| Explore | Radio station rows: Soma FM, Radio Paradise, NTS Radio | Open the Radio sheet with internet-radio framing. | WORKING | Keep station copy as internet radio, not generated mixes. | Aria Explore role realignment |
| Explore | Recently Explored Forgotten Albums | Opens the Forgotten Albums sheet. | WORKING | Keep recent shortcuts discovery-oriented. | Aria Explore role realignment |
| Explore | Recently Explored By Mood | Opens the By Mood sheet. | WORKING | Keep recent shortcuts discovery-oriented. | Aria Explore role realignment |
| Explore | Recently Explored By Year | Opens the By Year sheet. | WORKING | Keep recent shortcuts discovery-oriented. | Aria Explore role realignment |
| Explore | Recently Explored Radio | Opens the Radio sheet. | WORKING | Keep recent shortcuts discovery-oriented. | Aria Explore role realignment |
| Album Detail | Back | Returns to active top-level tab. | WORKING | Return from detail to previous top-level tab. | Aria detail screen interactions |
| Album Detail | Header more actions | Removed; header is navigation-only. | SHOULD_NOT_BE_CLICKABLE | Keep one album contextual menu entry point. | Aria detail screen interactions |
| Album Detail | Artist link | Opens matching Artist Detail when artist data exists; otherwise shows unavailable toast. | WORKING | Open Artist Detail or restyle as passive metadata. | Aria detail screen interactions |
| Album Detail | Play | Shows `Play album` toast. | WORKING | Playback feedback is acceptable. | Aria detail screen interactions |
| Album Detail | Shuffle | Shows `Shuffle album` toast. | WORKING | Shuffle feedback is acceptable. | Aria detail screen interactions |
| Album Detail | More action button | Opens Album Options bottom sheet. | WORKING | Open local options menu/sheet. | Aria detail screen interactions |
| Album Detail | Track number buttons, 6 instances | Open Track Details. | WORKING | Open track detail. | Aria detail screen interactions |
| Album Detail | Track title rows, 6 instances | Open Track Details. | WORKING | Open track detail. | Aria detail screen interactions |
| Album Detail | Track more buttons, 6 instances | Open Track Options bottom sheet. | WORKING | Open local track options menu/sheet. | Aria detail screen interactions |
| Artist Detail | Back | Returns to active top-level tab. | WORKING | Return from detail to previous top-level tab. | Aria detail screen interactions |
| Artist Detail | Header more actions | Removed; header is navigation-only. | SHOULD_NOT_BE_CLICKABLE | Keep one artist contextual menu entry point. | Aria detail screen interactions |
| Artist Detail | Tags: Electronic, Classical, Ambient | Tags are visually chip-like text but not buttons. | SHOULD_NOT_BE_CLICKABLE | Keep passive or style less like filters. | Aria detail screen interactions |
| Artist Detail | Play | Shows `Play artist top songs` toast. | WORKING | Playback feedback is acceptable. | Aria detail screen interactions |
| Artist Detail | More artist actions | Opens Artist Options bottom sheet. | WORKING | Open local artist options menu/sheet. | Aria detail screen interactions |
| Artist Detail | Latest Release row | Opens Album Detail. | WORKING | Open album detail. | Aria detail screen interactions |
| Artist Detail | Top Songs See all | Opens Top Songs bottom sheet. | WORKING | Open local top-songs list or clarify as toast-only. | Aria detail screen interactions |
| Artist Detail | Top song number buttons, 5 instances | Open Track Details. | WORKING | Open track detail. | Aria detail screen interactions |
| Artist Detail | Top song title rows, 5 instances | Open Track Details. | WORKING | Open track detail. | Aria detail screen interactions |
| Artist Detail | Top song more buttons, 5 instances | Open Track Options bottom sheet. | WORKING | Open local track options menu/sheet. | Aria detail screen interactions |
| Artist Detail | EPs & Singles rows, 2 instances | Open release Album Detail objects. | WORKING | Open album/release detail or remove chevron/action styling. | Aria detail screen interactions |
| Playlist Detail | Back | Returns to active top-level tab. | WORKING | Return from detail to previous top-level tab. | Aria detail screen interactions |
| Playlist Detail | Header more actions | Removed; header is navigation-only. | SHOULD_NOT_BE_CLICKABLE | Keep one playlist contextual menu entry point. | Aria detail screen interactions |
| Playlist Detail | Play | Shows `Play playlist` toast. | WORKING | Playback feedback is acceptable. | Aria detail screen interactions |
| Playlist Detail | Shuffle | Shows `Shuffle playlist` toast. | WORKING | Shuffle feedback is acceptable. | Aria detail screen interactions |
| Playlist Detail | More action button | Opens Playlist Options bottom sheet. | WORKING | Open local options menu/sheet. | Aria detail screen interactions |
| Playlist Detail | Track artwork buttons, 4 instances | Open Track Details. | WORKING | Open track detail. | Aria detail screen interactions |
| Playlist Detail | Track title rows, 4 instances | Open Track Details. | WORKING | Open track detail. | Aria detail screen interactions |
| Playlist Detail | Track more buttons, 4 instances | Open Track Options bottom sheet. | WORKING | Open local track options menu/sheet. | Aria detail screen interactions |
| Track Details | Back | Pops the local detail stack, returning to the previous detail when opened from one. | WORKING | Return to previous detail when opened from a detail, or document top-level return. | Aria detail screen interactions |
| Track Details | Header more actions | Opens Track Options bottom sheet. | WORKING | Open local track options menu/sheet. | Aria detail screen interactions |
| Track Details | Metadata rows | Static text only; not interactive. | SHOULD_NOT_BE_CLICKABLE | Keep passive. | Aria detail screen interactions |
| Track Details | Favorite action | Toggles visible local favorited state and shows added/removed toast. | WORKING | Toggle local favorite state or clarify as toast-only. | Aria detail screen interactions |
| Track Details | Add to playlist action | Opens Add to Playlist bottom sheet with playlist rows. | WORKING | Toast-only action is acceptable. | Aria detail screen interactions |
| Track Details | Add to queue action | Sets visible local queued state and shows queue toast; no queue persistence. | WORKING | Mutate local queue or clarify as toast-only. | Aria detail screen interactions |
| Track Details | Show in folder action | Shows folder location toast. | WORKING | Toast-only feedback is acceptable. | Aria detail screen interactions |
| Now Playing | Collapse | Closes overlay back to mini player. | WORKING | Collapse overlay. | Aria playback overlay interactions |
| Now Playing | More player options | Opens a compact local player options panel with track-specific actions. | WORKING | Open local options menu/sheet. | Aria playback overlay interactions |
| Now Playing | Favorite | Toggles local favorite visual state and toast. | WORKING | Toggle local favorite. | Aria playback overlay interactions |
| Now Playing | Seek/progress | Sets shared local progress and updates elapsed time/progress thumb. | WORKING | Set local progress/seek state. | Aria playback overlay interactions |
| Now Playing | Shuffle | Toggles local shuffle state and toast. | WORKING | Toggle local shuffle. | Aria playback overlay interactions |
| Now Playing | Previous | Cycles the local queue backward, resets progress and updates overlay track copy. | WORKING | Cycle local queue. | Aria playback overlay interactions |
| Now Playing | Play/Pause | Toggles local playing visual state. | WORKING | Toggle local playback. | Aria playback overlay interactions |
| Now Playing | Next | Cycles the local queue forward, resets progress and updates overlay track copy. | WORKING | Cycle local queue. | Aria playback overlay interactions |
| Now Playing | Repeat | Cycles local repeat state off/all/one and toast. | WORKING | Toggle local repeat. | Aria playback overlay interactions |
| Now Playing | Lyrics button | Opens Lyrics overlay. | WORKING | Open Lyrics overlay. | Aria playback overlay interactions |
| Now Playing | Queue button | Opens Queue overlay. | WORKING | Open Queue overlay. | Aria playback overlay interactions |
| Now Playing | Context pill tap | Shows active context toast. | WORKING | Show local context feedback. | Aria playback overlay interactions |
| Now Playing | Context pill keyboard | ArrowLeft/ArrowRight and Enter/Space rotate context label. | WORKING | Keep keyboard context cycling. | Aria playback overlay interactions |
| Now Playing | Context pill swipe | Pointer drag threshold rotates context item. | WORKING | Keep local swipe cycling. | Aria playback overlay interactions |
| Lyrics | Collapse lyrics | Closes overlay to mini player. | WORKING | Collapse overlay. | Aria playback overlay interactions |
| Lyrics | Header title/back to Now Playing | Returns to Now Playing overlay. | WORKING | Return to Now Playing. | Aria playback overlay interactions |
| Lyrics | Lyrics options | Opens a compact local lyrics options panel with line, credit and source actions. | WORKING | Open local lyrics options menu/sheet. | Aria playback overlay interactions |
| Lyrics | Lyric lines | Static text, no row handlers. | SHOULD_NOT_BE_CLICKABLE | Keep passive unless lyric line seek is added. | Aria playback overlay interactions |
| Lyrics | Timeline/progress | Sets shared local progress, updates elapsed time and shifts the highlighted lyric line. | WORKING | Set local progress/seek state. | Aria playback overlay interactions |
| Lyrics | Footer return/list button | Returns to Now Playing overlay. | WORKING | Return to Now Playing. | Aria playback overlay interactions |
| Lyrics | Previous | Cycles the local queue backward, resets progress and updates lyric header copy. | WORKING | Cycle local queue. | Aria playback overlay interactions |
| Lyrics | Play/Pause | Toggles local playing visual state. | WORKING | Toggle local playback. | Aria playback overlay interactions |
| Lyrics | Next | Cycles the local queue forward, resets progress and updates lyric header copy. | WORKING | Cycle local queue. | Aria playback overlay interactions |
| Lyrics | Queue | Opens Queue overlay. | WORKING | Open Queue overlay. | Aria playback overlay interactions |
| Queue | Return to Now Playing | Returns to Now Playing overlay. | WORKING | Return to Now Playing. | Aria playback overlay interactions |
| Queue | Close queue overlay | Collapses to base screen/mini player. | WORKING | Close overlay. | Aria playback overlay interactions |
| Queue | Current track card | Shows `Current track is playing` toast. | WORKING | Toast-only current-track feedback is acceptable. | Aria playback overlay interactions |
| Queue | Shuffle | Toggles local shuffle state and toast. | WORKING | Toggle local shuffle. | Aria playback overlay interactions |
| Queue | Repeat | Cycles local repeat state off/all/one and toast. | WORKING | Toggle local repeat. | Aria playback overlay interactions |
| Queue | Save as playlist | Shows `Save queue as playlist` toast. | WORKING | Toast-only save is acceptable if no mutation is expected. | Aria playback overlay interactions |
| Queue | Clear | Opens a local confirmation panel; confirm leaves only the current track in the queue. | WORKING | Open local confirmation. | Aria playback overlay interactions |
| Queue | Reorder handles, 6 instances | Move the selected row down in local queue order. | WORKING | Implement local reorder. | Aria playback overlay interactions |
| Queue | Queue rows, 6 instances | Select the local queue item as the current track and update playback overlays. | WORKING | Set local current queue item. | Aria playback overlay interactions |
| Queue | Row more buttons, 6 instances | Open a compact local row options panel with play-next, details feedback and remove. | WORKING | Open local row options menu/sheet. | Aria playback overlay interactions |

## Suggested Implementation Blocks

1. Aria global/navigation interactions

Address detail-stack behavior, overlay/bottom-nav visibility or clickability, and any intended overlay-close-on-tab-change rule. Keep changes local-state-only.

2. Aria top-level screen interactions

Resolve top-level category rows, search affordances, See all buttons, playlist filters, sort controls, and misleading import/export labels. Prefer local state where useful; otherwise make visual affordances passive.

3. Aria detail screen interactions

Resolve menu affordances, artist/release links, track row option buttons, Track Details action toggles, and nested detail back behavior.

4. Aria playback overlay interactions

Resolve progress/seek behavior, previous/next queue cycling expectations, lyrics timeline, queue clear confirmation, queue row behavior, and reorder handles.

5. Aria final no-dead-control sweep

Remove or implement remaining fake option glyphs, especially Listen Home recent-row `•••`, and re-audit all repeated rows/buttons after fixes.

## Bloco 7B Resolution Notes

- Detail navigation now uses a local stack in `AriaPreview`: nested Album, Artist, Playlist and Track details preserve the previous detail and Back pops one level at a time.
- Bottom navigation is intentionally hidden while Now Playing, Lyrics or Queue overlays are open, then restored after overlay collapse.
- Mini player Previous / Next now rotate through the static playback queue in local React state, wrap at queue ends and update mini-player title/artist text without changing its visual styling.
- Full propagation of current-track state into the full playback overlays remains deferred to the playback overlay interaction block because those components were outside the Bloco 7B allowed file list.

## Bloco 7C Resolution Notes

- Listen Home broad shortcut cards no longer open arbitrary representative details: `Your Playlists` navigates to the Playlists tab, `Artists` navigates to Library with an artist-index toast, and search still navigates to Explore. Recent Additions `•••` glyphs are now independent option buttons with item-specific toasts, and `See all` toggles an expanded local recent list.
- Library category rows now open local category/list states instead of opening first album/artist details or generic toasts. Albums, Artists, Songs, Genres, Folders, Compilations, Playlists, Recent and Search all respond locally; concrete album, artist, playlist and track rows still open valid detail screens. Library tools now toggle a compact local tools panel.
- Playlists filter chips now own local selected state and change displayed content. Folder rows select a local folder state, Sort cycles local sort modes and order, Import/Export copy and toasts avoid file or download behavior, and playlist more buttons are item-specific.
- Explore search and category cards now open local modes instead of arbitrary first-item details. Genres, Albums, Artists, Radio, Songs, Playlists, Search and Recently Explored all expose local lists; concrete result rows open valid detail screens where appropriate.
- Deferred to Bloco 7D/7E: detail-screen menu/options completeness, detail track-row playback semantics, playback overlay progress/queue/reorder behavior and full no-dead-control re-audit across non-top-level surfaces.

## Bloco 7C.1 Resolution Notes

- Listen Home top-right control is now a source/server status control instead of a queue/status glyph. It uses a server-style icon and opens an inline Source panel.
- The Source panel shows only the active configured source. The default active source is `Local library`, marked active, with `Device storage preview` detail.
- Local source actions are `Atualizar` and `Configurações`; `Atualizar` shows a specific refresh toast and `Configurações` opens the shared Aria Settings panel.
- The source model supports a server source path: server sources would show `Sincronizar` and route sync feedback to a toast. Sync, server connection, filesystem scan or persistence was not added.
- Library top-right tools/ListMusic control was replaced by an app settings icon and now opens shared Aria Settings. Library search remains unchanged and still opens the local Library Search Preview.
- The shared settings panel is local-state-only with specific responses for every row. Settings persistence, backend calls, server calls, auth or network behavior was not added.

## Bloco 7C.2 Resolution Notes

- Source and Aria Settings now render as Aria bottom-sheet overlays instead of inline/debug-like panels. The Source sheet remains active-source-only and Settings keeps the same rows.
- Library category and search views now open in bottom sheets, so Songs, Albums, Artists, Genres, Folders, Compilations, Search and Recently Added no longer push Library content down.
- Explore search/category/recent views now open in bottom sheets, preserving the discovery layout while keeping the same category/result behavior.
- Opening a concrete album, artist, playlist or track from a sheet closes the sheet before opening the detail screen, preserving the Bloco 7B detail stack behavior.
- Sheet titles now avoid unnecessary debug wording. Sync, search, filesystem, server or persistence behavior was not added.

## Bloco 7C.3 Resolution Notes

- Source sheet action copy is now English: local sources show `Refresh` and `Settings`; future server sources show `Sync` and `Settings`.
- The local Home source control no longer shows a green online dot. Green status remains reserved for future active server/online source states.
- The default Local library source now uses local-device iconography while preserving the server-source branch. Sync, server connection, filesystem access or persistence was not added.

## Bloco 7D Resolution Notes

- Album, Artist, Playlist and Track Detail more/options controls now open Aria bottom sheets instead of generic options toasts.
- Album artist links open matching Artist Detail screens when data exists; missing artists return a clear unavailable toast.
- Artist Top Songs `See all` opens a bottom sheet, and Artist EPs & Singles rows with chevrons now open release Album Detail screens instead of toast-only responses.
- Detail track-row more buttons open the shared Track Options sheet from Album, Artist and Playlist details.
- Track Details Favorite and Add to Queue actions now have visible local state, and Add to Playlist opens a local picker sheet. Show in folder remains toast-only.
- Track-row tap playback normalization remains deferred to Bloco 7E; in Bloco 7D, detail track rows continue opening Track Details.
- Playback, queue persistence, playlist persistence, filesystem access or network behavior was not added.

## Bloco 7D.1S Contract Notes

- The failed generic Library-pages approach from Bloco 7D.1 was reverted. It promoted all Library categories to a single broad page model, created generic list surfaces, and caused detail headers to gain empty top space where Back competed with the hero/card.
- The next implementation block must follow the visual contracts in `docs/screen-contracts/aria/library-category-contract.md` and `docs/screen-contracts/aria/detail-header-contract.md`.
- Songs, Albums, Artists and Recently Added need category-specific music-player treatments; Genres, Folders and Compilations should stay lightweight unless designed with their own visual identity.
- Detail cleanup must avoid large empty header bars, duplicate ellipsis menus and decorative Album/Artist/Playlist labels.
- Settings redesign remains deferred to Bloco 7D.2.
- Playback overlays remain deferred to Bloco 7E.

## Bloco 7D.1I-A Resolution Notes

- The failed generic Library category page implementation was removed/deactivated in code, including the rejected page route/component model.
- Library category rows now use temporary lightweight sheets/behavior until Bloco 7D.1I-B implements the final approved category treatments.
- Library Search remains a sheet, Library Settings remains a sheet, and My Playlists `See all` still navigates to the Playlists tab.
- Album, Artist and Playlist detail headers were tightened so Back no longer sits in a large empty header bar above the hero/artwork.
- Duplicate detail menus remain avoided: Album, Artist and Playlist details keep one visible contextual ellipsis menu each, while Track Details keeps at most one.
- Settings redesign remains deferred to Bloco 7D.2.
- Playback overlays remain deferred to Bloco 7E.

## Bloco 7D.1I-B Resolution Notes

- Songs, Albums, Artists and Recently Added now use approved dedicated music-library views; Recently Added is intentionally focused on tracks only after visual review.
- Genres, Folders and Compilations intentionally remain lightweight sheets.
- The failed single generic category page model was not reintroduced.
- Track-row playback behavior remains deferred to Bloco 7E; track rows in the new views open Track Details for now.
- Playback, search or filesystem behavior was not added.

## Bloco 7D.2 Resolution Notes

- Aria Settings was redesigned as a dedicated bottom-sheet settings surface.
- Generic settings rows were replaced with cards, toggles and segmented controls.
- Settings remain local-state-only.
- Source management opens the existing Source sheet instead of stacking another panel.
- Playback overlays remain deferred to Bloco 7E.

## Bloco 7D.2.1 Resolution Notes

- Aria Core was reviewed to filter what should actually become Settings rather than copying every Core model into the Settings UI.
- Core support alone does not make a concept a setting; Settings are limited to user preferences, policy choices, default behavior, display options, safe local controls, integration-readiness visibility and profile/preference scope.
- Favorites, Recently Added, Recently Played, health/readiness badges, current queue state and now-playing state are not settings.
- Approved Settings categories were documented in `docs/screen-contracts/aria/settings-core-mapping.md`.
- UI implementation remains deferred to Bloco 7D.2.2.

## Bloco 7D.2.2-V Resolution Notes

- Settings visual guide created.
- Root Settings must be category hub, not toggle wall.
- Category hierarchy, visual weights, internal page rules and forbidden patterns documented.
- Implementation deferred to 7D.2.2-I.

## Bloco 7D.2.2-I Resolution Notes

- Settings root is now a category hub instead of a direct toggle wall.
- Internal Settings pages implement filtered Core-mapped categories for Interface, Sources & Providers, Library, Playback, Audio Output & Quality, Streaming & Network, Offline, Cache & Storage, Profiles & Backup, Android & External Control, Advanced and About.
- Smart Playlists was retired from the Settings tab set during implementation.
- Internal options were tightened toward Core terms: unavailable media handling, fade behavior, bit-depth handling, bitrate limit, quality fallback, flow visibility and provider boundary warnings are represented as local policy controls.
- Favorites, Recently Added, Recently Played, Queue, Now Playing and Radio were not added as top-level Settings categories.
- Recently Added remains tracks-only as a product decision and appears only as Library info, not as an editable selector.
- All controls remain local-state-only and non-persistent.
- Playback overlays remain deferred to Bloco 7E.

## Bloco 7D.2.3-S Resolution Notes

- Settings app-like structure contract was created in `docs/screen-contracts/aria/settings-app-structure.md`.
- Settings must now be user-facing first and Core-mapped internally.
- Current Core-driven root categories are marked for removal, merge or rename before Bloco 7D.2.3-I.
- Interface will gain Theme settings for appearance, accent color and dynamic color.
- Playback will gain Shuffle style with Standard, Fresh and Deep modes.
- Backup & Restore will become a flow instead of showing Included data as static root content.
- Advanced loses internal tooling controls and stays practical/app-like.

## Bloco 7D.2.3-I Resolution Notes

- Settings was refactored from Core-driven categories to app-facing categories.
- Audio Output & Quality, Streaming & Network, Profiles & Backup and Android & External Control were removed as root categories.
- Media Sources replaced Sources & Providers.
- Offline & Cache replaced Offline, Cache & Storage.
- Backup & Restore became an action-first flow with create and restore subpages.
- Interface gained Theme settings for appearance, accent color and dynamic color.
- Playback gained Shuffle style with Standard, Fresh and Deep modes.
- Advanced was simplified to Debug, Database and Network groups.
- No real functionality or persistence was added.

## Bloco 7D.2.3-P Resolution Notes

- Settings root header was simplified to `Settings`.
- Redundant root subtitle was removed.
- Accent color selector was changed to a compact color-chip layout.
- Settings structure from 7D.2.3-I was preserved.

## Bloco 7E Resolution Notes

- `AriaPreview.tsx` now owns playback queue order, current track and progress for Now Playing, Lyrics and Queue.
- Now Playing seek updates shared progress, player options open a compact panel and previous/next update the visible track.
- Lyrics timeline uses the same shared progress, updates elapsed time and derives the highlighted lyric line from the current position.
- Queue rows select the current track, row options expose play-next/details/remove actions, clear uses a local confirmation panel and grip controls move tracks down.
- Queue mutations stay in React state for the current session and do not add integration behavior.

## Bloco 7E.1 Resolution Notes

- Library and Explore roles were separated.
- Library remains collection navigation for Songs, Albums, Artists, Genres, Folders, Compilations, Playlists and Recently Added.
- Explore now focuses on discovery: Forgotten Albums, Random Album, By Year, By Style, By Mood, By Genre and Radio.
- Songs, Albums, Artists and Playlists were removed as primary Explore cards.
- Radio is treated as user-added internet radio, not generated mixes.

## Bloco 7F.0 Resolution Notes

- New reference images were mapped to the remaining missing interactions in `docs/screen-contracts/aria/missing-interaction-reference-map.md`.
- Manual review found controls that still need real local flows instead of simple feedback.
- The previous audit summary must not be treated as final.
- 7F is now split into reference-backed implementation blocks.
- Final no-dead-control sweep is deferred until 7F.7.

## Bloco 7F.P0 Resolution Notes

- Created the Aria product spec in `docs/product/aria-product-spec.md`.
- Created the Aria screen map in `docs/screen-contracts/aria/screen-map.md`.
- Created the Noqlen design guardrails in `docs/design.md`.
- These docs exist to prevent future implementation from inventing product behavior, navigation or generic UI.
- 7F.1 remains pending.
- The next block is 7F.1-S reference breakdown.

## Bloco 7F.1-S Resolution Notes

- The bad 7F.1 implementation was reverted before this block.
- Product spec, screen map and design guardrails are now required context.
- Playlist create/import reference now has a literal breakdown in `docs/screen-contracts/aria/playlist-create-import-reference-breakdown.md`.
- 7F.1 implementation remains pending.
- Future implementation must follow the breakdown, not invent generic form UI.
- New Folder, Export Playlist and Folder Detail remain 7F.2.

## Reference-backed Remaining Interaction Work

### Playlist interactions 1

- [ ] Create Playlist opens a creation flow.
- [ ] Smart Playlist Expansion opens or expands a local criteria flow.
- [ ] Import Playlist opens import source choices without file picker/device access.

### Playlist interactions 2

- [ ] New Folder opens a folder creation form.
- [ ] Export Playlist opens a relevant action sheet.
- [ ] Folder Detail opens folder contents/actions instead of only filtering plus feedback.
- [ ] Folder add/edit/rename/export/delete follow the new folder references.
- [ ] Delete folder uses confirmation.

### Library category interactions

- [ ] Songs remains a useful Library category view.
- [ ] Albums remains a useful Library category view.
- [ ] Artists remains a useful Library category view.
- [ ] Genres gains useful local browsing beyond feedback-only chips.
- [ ] Folders gains useful app-library folder browsing without device access.
- [ ] Compilations gains useful collection browsing.

### Explore discovery/search interactions requiring reconciliation

- [ ] Genres remains discovery-oriented in Explore.
- [ ] Albums appears only in search/discovery result rows or sheets, not as a primary Explore card.
- [ ] Artists appears only in search/discovery result rows or sheets, not as a primary Explore card.
- [ ] Songs appears only in search/discovery result rows or sheets, not as a primary Explore card.
- [ ] Playlists appears only in search/discovery result rows or sheets, not as a primary Explore card.
- [ ] Library continues to own structural Songs, Albums, Artists, Genres, Folders and Compilations browsing.

### Radio interactions

- [ ] Radio represents user-added internet radio stations.
- [ ] Add Radio opens a form.
- [ ] Radio station rows open preview/details.
- [ ] Radio does not become generated mixes.

### Now Playing extra actions

- [ ] Add to Playlist opens playlist selection.
- [ ] Playback Info opens an app-like info panel with format, sample rate, source, output and queue position.

### Queue save-as-playlist

- [ ] Save as Playlist opens a form.
- [ ] User can enter playlist name.
- [ ] Flow can include current track or upcoming queue.
- [ ] Save action updates local UI state or gives app-like confirmation.

## Notes

- Duplicated detail menu handlers from Bloco 7D remain governed by the Bloco 7D.1S detail header contract: album, artist and playlist details should keep one contextual menu and avoid duplicate header/action-row ellipsis controls.
- Duplicated navigation handlers: `AriaTrackRow` number/artwork and title buttons both open the same track detail. This works, but creates multiple focusable controls per row.
- Visual affordances that should probably become passive if not implemented: mini player progress underline, artist tags, static metadata rows, lyric lines, and possibly queue drag handles if local reorder is not planned.
- Interactions that can remain toast-only only if no reference-backed flow exists: show in folder, static status buttons and current-track feedback. Create playlist, new folder and save queue as playlist now have reference-backed TODOs and should not stay feedback-only.
- Interactions that should open detail: album cards/rows, artist cards/rows, playlist cards/rows, track rows, album artist link if it remains visually link-like, and artist discography rows with chevrons.
- Interactions that should toggle local state: playlist filter chips, sort selection if visible, favorite in Track Details, shuffle/repeat, play/pause, and possibly local queue item selection/current track.
- Interactions that should open overlay or sheet: global mini player, lyrics, queue, and all menu/more/options buttons if their ellipsis affordance remains.
- Behavior needing local data/state: local search/filter results, category list screens for Songs/Genres/Folders/Compilations/Radio, playlist folders, local sort state, local queue mutation/reorder, local clear confirmation, local progress position, and nested detail history.
- Browser-observed behavior from Bloco 7A resolved in Bloco 7B: opening a track from Album Detail opens Track Details, and Back now returns to Album Detail before returning to the active top-level tab.
- Browser-observed behavior from Bloco 7A resolved in Bloco 7B: bottom nav is no longer visible behind Queue, Now Playing or Lyrics overlays.
