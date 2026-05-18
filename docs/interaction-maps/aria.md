# Aria Interaction Map

## Product role

Aria is the Noqlen music player and library experience inside the Studio phone simulator.

It manages visual/mock flows for:

- music playback UI (play, pause, next, previous, seek, shuffle, repeat).
- now playing and mini player.
- home/listen discovery screen.
- library browsing (albums, artists, songs, genres, folders).
- artist, album, song and playlist detail screens.
- search and discovery.
- playlists and collections.
- queue management.
- lyrics display.
- library health / metadata review.

Aria remains a complete interactive prototype target, not a real music player. Every interaction must stay mock-only and must avoid real audio playback, backend calls, library access, file reading, metadata fetching, streaming API calls and filesystem access.

## Navigation model

### Main Aria Bottom Navigation

- Listen.
- Library.
- Playlists.
- Explore.

### Secondary surfaces

- Album Detail.
- Artist Detail.
- Track Details.
- Playlist Detail.
- Now Playing / Queue (full-screen overlay or pushed screen).
- Lyrics sheet/screen.
- Search filter/sort sheet.
- Add to playlist sheet.
- More menu bottom sheet.
- Confirm dialog.
- Toast.
- Metadata Review screen.

Layout constraints:

- Aria screens and sheets must fit the stable `390px` virtual phone app viewport while the simulator itself may be visually scaled down.
- Detail screens and bottom sheets must not create phone-level horizontal overflow.
- List rows, metadata fields and filter chips should wrap or truncate gracefully inside the viewport.

## Listen (Home) Interaction Map

### Recent Listen Shelf

- Trigger: tap a recent listen album/playlist card.
- Result: navigates to Album Detail or Playlist Detail.
- Status: not implemented.

### Featured Playlist Card

- Trigger: tap a featured playlist card.
- Result: navigates to Playlist Detail.
- Status: not implemented.

### Quick Resume Row

- Trigger: tap a quick resume row.
- Result: sets mock queue and starts playback mock state; mini player appears.
- Status: not implemented.

### Home Search Affordance

- Trigger: tap search bar or search icon.
- Result: navigates to Explore tab with search focused.
- Status: not implemented.

## Library Interaction Map

### Category Tabs

- Trigger: tap Albums, Artists, Songs, Genres or Folders.
- Result: library list switches to the selected category.
- Status: not implemented.

### Album Row Tap

- Trigger: tap an album row.
- Result: pushes Album Detail.
- Status: not implemented.

### Artist Row Tap

- Trigger: tap an artist row.
- Result: pushes Artist Detail.
- Status: not implemented.

### Song Row Tap

- Trigger: tap a song row.
- Result: sets that song as current track; playback mock starts; mini player appears.
- Status: not implemented.

### Library Search

- Trigger: type in library search bar.
- Result: list filters in real time.
- Empty state: "No results found" when query yields nothing.
- Status: not implemented.

### Library Sort / Filter

- Trigger: tap sort/filter icon.
- Result: opens bottom sheet with sort and filter options.
- Status: not implemented.

## Playlists Interaction Map

### Playlist Row Tap

- Trigger: tap a playlist row.
- Result: pushes Playlist Detail.
- Status: not implemented.

### Create Playlist

- Trigger: tap "New playlist" or plus icon.
- Result: opens sheet to name a new playlist; adds to local mock list.
- Status: not implemented.

### Playlist Detail Play

- Trigger: tap Play button in Playlist Detail.
- Result: queue set to playlist tracks; playback mock starts.
- Status: not implemented.

### Playlist Detail Shuffle

- Trigger: tap Shuffle button in Playlist Detail.
- Result: queue set to shuffled tracks; playback mock starts.
- Status: not implemented.

## Explore (Search) Interaction Map

### Search Input

- Trigger: type in search bar.
- Result: results filter in real time across active scope.
- Status: not implemented.

### Search Filter Chips

- Trigger: tap All, Tracks, Albums, Artists, Playlists or Folders chip.
- Result: active chip highlights; results scope to that type.
- Status: not implemented.

### Search Result Tap

- Trigger: tap a search result row.
- Result: navigates to detail or starts playback for tracks.
- Status: not implemented.

### Recent Searches

- Trigger: search submitted or result tapped.
- Result: term added to local recent list.
- Status: not implemented.

## Album Detail Interaction Map

### Play Album

- Trigger: tap Play button.
- Result: queue set to album tracks; playback mock starts; mini player appears.
- Status: not implemented.

### Shuffle Album

- Trigger: tap Shuffle button.
- Result: queue set to shuffled album tracks; playback mock starts.
- Status: not implemented.

### More Menu on Album

- Trigger: tap three dots on header.
- Result: bottom sheet with Add to library, Add to playlist, Share, Go to artist.
- Status: not implemented.

### Track Row Tap in Album

- Trigger: tap a track row.
- Result: sets that track as current; queue set to album tracks from selected index; playback starts.
- Status: not implemented.

### Track More Menu in Album

- Trigger: tap three dots on a track row.
- Result: bottom sheet: Play next, Add to queue, Add to playlist, Favorite, Show details.
- Status: not implemented.

## Artist Detail Interaction Map

### Play Top Tracks

- Trigger: tap Play on top tracks section.
- Result: queue set to top tracks; playback starts.
- Status: not implemented.

### Album Tap in Discography

- Trigger: tap an album in discography.
- Result: pushes Album Detail.
- Status: not implemented.

### More Menu on Artist

- Trigger: tap three dots on header.
- Result: bottom sheet: Follow/Unfollow, Share, Go to related artists.
- Status: not implemented.

## Track Details Interaction Map

### Favorite Action

- Trigger: tap Favorite in ACTIONS.
- Result: heart toggles; toast confirms.
- Status: not implemented.

### Add to Playlist

- Trigger: tap Add to playlist.
- Result: bottom sheet with mock playlist list; tap to add; toast confirms.
- Status: not implemented.

### Add to Queue

- Trigger: tap Add to queue.
- Result: track appended to queue; toast confirms.
- Status: not implemented.

### Show in Folder

- Trigger: tap Show in folder.
- Result: navigates to Library / Folders; toast shows mock path.
- Status: not implemented.

### Edit Metadata

- Trigger: tap Edit metadata.
- Result: opens metadata editor sheet.
- Status: not implemented.

### Metadata Row Info

- Trigger: tap tappable metadata row (Album, Artist).
- Result: navigates to corresponding detail. Read-only rows show toast or no action.
- Status: not implemented.

## Queue / Now Playing Interaction Map

### Reorder Queue

- Trigger: drag reorder handle on a queue row.
- Result: row moves to new position.
- Status: not implemented.

### Remove from Queue

- Trigger: swipe left or tap remove on a queue row.
- Result: row removed; queue updates.
- Status: not implemented.

### Save as Playlist

- Trigger: tap Save as playlist in queue actions.
- Result: sheet to name playlist; creates from queue; toast confirms.
- Status: not implemented.

### Clear Queue

- Trigger: tap Clear queue.
- Result: confirm dialog; on confirm queue empties; mini player may hide.
- Status: not implemented.

### Queue Shuffle Action

- Trigger: tap Shuffle in queue actions.
- Result: queue shuffled; toast confirms.
- Status: not implemented.

### Queue Repeat Action

- Trigger: tap Repeat in queue actions.
- Result: repeat mode cycles; toast shows label.
- Status: not implemented.

## Lyrics Interaction Map

### Open Lyrics

- Trigger: tap lyrics button in full player.
- Result: lyrics screen/sheet opens with placeholder text.
- Status: not implemented.

### Close Lyrics

- Trigger: tap close or swipe down.
- Result: lyrics closes; returns to full player.
- Status: not implemented.

## Metadata Review Interaction Map

### Review Safe Fixes

- Trigger: tap Review safe fixes card.
- Result: confirm dialog → progress sheet → success toast.
- Status: not implemented.

### Issue Category Tap

- Trigger: tap an issue category row.
- Result: navigates to filtered Library or Review view.
- Status: not implemented.

### Review Fixes CTA

- Trigger: tap Review fixes button.
- Result: navigates to review flow.
- Status: not implemented.

## Global / Shared Interaction Map

### Bottom Navigation

- Trigger: tap Listen, Library, Playlists, Explore.
- Result: active tab and screen change; indicator updates.
- Status: not implemented.

### Mini Player Expand

- Trigger: tap mini player body.
- Result: full Now Playing / Queue opens.
- Status: not implemented.

### Now Playing Collapse

- Trigger: swipe down or tap collapse.
- Result: full player closes; mini player returns.
- Status: not implemented.

### Play / Pause

- Trigger: tap play/pause button.
- Result: icon toggles; `isPlaying` toggles locally.
- Status: not implemented.

### Next Track

- Trigger: tap next button.
- Result: current track advances in mock queue.
- Status: not implemented.

### Previous Track

- Trigger: tap previous button.
- Result: current track goes to previous in mock queue.
- Status: not implemented.

### Seek / Progress Bar

- Trigger: drag or tap progress bar.
- Result: progress fill and time label update.
- Status: not implemented.

### Shuffle Toggle

- Trigger: tap shuffle button.
- Result: shuffle icon toggles active/inactive.
- Status: not implemented.

### Repeat Toggle

- Trigger: tap repeat button.
- Result: repeat icon cycles off/all/one.
- Status: not implemented.

### Like / Favorite

- Trigger: tap heart icon.
- Result: heart toggles filled/outline; `favorites` Set updates.
- Status: not implemented.

### Toast

- Trigger: any action needing lightweight feedback.
- Result: `AriaToast` appears briefly at top.
- Status: not implemented.

### Confirm Dialog

- Trigger: destructive or batch actions.
- Result: `AriaConfirmDialog` overlay with Confirm/Cancel.
- Status: not implemented.

### Bottom Sheet

- Trigger: any secondary surface.
- Result: `AriaBottomSheet` slides up with backdrop.
- Status: not implemented.

### Back Navigation

- Trigger: tap back button (chevron left) in detail header.
- Result: navigates back in local stack.
- Status: not implemented.

## Required UI states

### Listen (Home)

- Populated (shelves visible): not implemented.
- Empty (no recent listens): not implemented.
- First-run onboarding: not implemented.

### Library

- Populated: not implemented.
- Searching: not implemented.
- No results: not implemented.
- Empty library: not implemented.
- Albums tab: not implemented.
- Artists tab: not implemented.
- Songs tab: not implemented.
- Genres tab: not implemented.
- Folders tab: not implemented.

### Playlists

- Populated: not implemented.
- Empty: not implemented.
- Playlist detail: not implemented.

### Explore (Search)

- Default (recent searches + suggestions): not implemented.
- Active search (filtered results): not implemented.
- No results: not implemented.

### Album Detail

- Populated: not implemented.
- Empty album (no tracks): not implemented.

### Artist Detail

- Populated: not implemented.
- Empty (no discography): not implemented.

### Track Details

- Populated: not implemented.
- Metadata read-only: not implemented.

### Queue / Now Playing

- Populated: not implemented.
- Empty queue: not implemented.
- Now playing visible: not implemented.
- Mini player visible: not implemented.

### Lyrics

- Available (placeholder text): not implemented.
- Unavailable: not implemented.

### Metadata Review

- Issues present: not implemented.
- All clear: not implemented.
- Review in progress: not implemented.

### Global

- Loading: not implemented.
- Disabled: not implemented.
- Toast: not implemented.
- Confirm dialog: not implemented.
- Bottom sheet: not implemented.

## Component inventory

### Existing components

- `AriaPreview` — basic placeholder with now playing card, shelves, search bar, queue and simple tab labels.
- `ariaMockData.ts` — static mock data for tracks, shelves and queue.

### Needed components

- `AriaBottomNav` — 4-tab navigation with active underline.
- `AriaMiniPlayer` — compact player bar above bottom nav.
- `AriaScreenHeader` — back button + title + optional trailing action.
- `AriaTrackRow` — thumbnail + title + artist + duration + more menu.
- `AriaAlbumRow` — thumbnail + title + artist + year + format chip + chevron.
- `AriaPlaylistRow` — thumbnail + title + track count + chevron.
- `AriaArtistRow` — circular avatar + name + genre subtitle.
- `AriaSectionHeader` — section title with optional "See all".
- `AriaFilterChips` — horizontal scrollable pill chips.
- `AriaBottomSheet` — shared bottom sheet container.
- `AriaConfirmDialog` — shared confirmation dialog.
- `AriaToast` — shared toast.
- `AriaEmptyState` — empty/no-results state.
- `AriaArtwork` — CSS-gradient artwork placeholder.
- `AriaPlayButton` — amber/gold pill play CTA.
- `AriaIconButton` — circular translucent icon button.
- `AriaMetadataBadge` — small pill badge.
- `AriaProgressBar` — track progress / seek bar.
- `AriaListenHome` — Listen tab screen.
- `AriaLibrary` — Library tab screen.
- `AriaPlaylists` — Playlists tab screen.
- `AriaExplore` — Explore tab screen.
- `AriaAlbumDetail` — Album detail screen.
- `AriaArtistDetail` — Artist detail screen.
- `AriaTrackDetails` — Track details screen.
- `AriaPlaylistDetail` — Playlist detail screen.
- `AriaNowPlaying` — Full player / queue screen.
- `AriaLyrics` — Lyrics screen/sheet.
- `AriaMetadataReview` — Library health review screen.

## Implementation batches

### Batch 1: Visual Baseline & Navigation Shell

- Final Aria visual style (dark warm charcoal, amber/gold accents, large radius, minimal borders).
- `AriaBottomNav` with 4 tabs and active underline.
- Core static screen shells: Listen, Library, Playlists, Explore.
- `AriaMiniPlayer` baseline.
- Responsive phone viewport compatibility.
- `AriaPreview` updated to manage `activeTab` and render correct screen.

### Batch 2: Playback Core Interactions

- Play/pause mock state.
- Next/previous track cycling.
- Seek/progress bar (visual only).
- Like/favorite toggle.
- Shuffle and repeat toggles.
- Queue display.
- Mini player expansion to full Now Playing.
- Now playing collapse.
- Artwork tap for lyrics toggle.

### Batch 3: Library Browsing

- Library categories: Albums, Artists, Songs, Genres, Folders.
- Search within Library.
- Grid and list views.
- Row taps navigate to detail.
- Empty library state.
- Filter/sort affordances.

### Batch 4: Artist/Album/Song/Playlist Detail

- Album detail with large artwork, track list, play/shuffle.
- Artist detail with discography and top tracks.
- Track detail with metadata rows and actions.
- Playlist detail with header, track list.
- More menu on rows.
- Play album/playlist from detail.

### Batch 5: Lyrics & Queue

- Lyrics screen (mock placeholder text only).
- Queue management: reorder affordance, remove.
- Save queue as playlist mock action.
- Clear queue confirmation.
- Repeat/shuffle state reflected in queue.

### Batch 6: Search & Explore

- Search bar with scoped filter chips.
- Real-time local filtering of static mock data.
- Empty search results state.
- Recent searches.
- Explore/discovery shelves.

### Batch 7: Metadata Review & Library Health

- Library health overview.
- Issue categories.
- Review safe fixes flow.
- Link to review context.

### Batch 8: Aria State Coverage

- Empty library, no search results, no current track, loading artwork placeholder, unavailable lyrics, playback error mock, queue empty, offline/mock unavailable, first-run onboarding empty state.

### Batch 9: Aria Completion Audit

- Full visible interaction audit.
- Responsive validation.
- Docs sync.
- Confirm no real audio, no network, no filesystem, no backend behavior.

## Acceptance criteria

Aria can be considered complete only when:

- Every visible actionable element responds.
- Every response is mock-only.
- Playback state changes are local React state only.
- All screens have state coverage (empty, loading, no-results, error).
- Visual fidelity remains close to the reference images.
- Virtual phone viewport stays stable.
- No page-level horizontal overflow.
- No real audio, file, network or backend behavior exists.
- Anchor and Forge remain unaffected.
- Studio shell and PhoneFrame remain unchanged.
