# Aria Screen Contract

Aria is the Noqlen music player and library experience inside the Studio phone simulator.

## App purpose

Aria provides a high-fidelity mock-only music playback UI, library browsing, search, playlists, queue management and track metadata exploration. It is designed to feel like a polished native music player rather than a dashboard or configuration tool.

## Bloco 0 requirements

- Visible tab in the Studio app selector.
- Static now-playing card with visual-only controls.
- Static queue and library shelf content using fictional mock data.
- Bottom labels: Now Playing, Library, Playlists and Queue.
- No playback.
- No real music library access.
- No downloads, metadata reads, network calls or personal paths.

## Visual target

- Aria implementation must follow `docs/visual-targets/aria.md`.
- The definitive Aria references are `aria_reference1.png` and `aria_reference2.png` in `docs/references/aria/`.
- Older Aria references must not be used for future implementation.

## Primary screens

- **Listen (Home)** — discovery landing: recent listens, featured playlists, quick resume, editorial shelves. This is the tab that opens when "Listen" is active in the bottom nav.
- **Library** — browse categories: Albums, Artists, Songs, Genres, Folders. Grid and list views.
- **Playlists** — playlist grid/list, playlist detail with track list.
- **Explore** — search-first discovery tab with scoped results (All, Tracks, Albums, Artists, Playlists, Folders).
- **Album Detail** — large artwork, album title, artist, year, track count, duration, track list with play/shuffle CTAs.
- **Artist Detail** — artist image/banner, name, genre tags, discography, top tracks, related artists.
- **Track Details** — artwork thumbnail, track title, artist, album. Metadata rows (Album, Artist, Duration, Track, Genre, Year, Codec, Sample rate, Bit depth, Bitrate, Source, Path). Actions: Favorite, Add to playlist, Add to queue, Show in folder, Edit metadata.
- **Queue / Now Playing** — now playing card, up-next list, playback controls, queue actions (Shuffle, Repeat, Save as playlist, Clear queue).
- **Playlist Detail** — large header image, title, description, track count, play/shuffle, track list.
- **Metadata Review** — library health overview, issue counts, review safe fixes, open enrich mode. Integrates Forge-style review data into Aria context.
- **Lyrics** — plain or synced lyric display for the current track. Mock placeholder text only.
- **Search** — search bar, filter chips, scoped results with thumbnails and metadata chips.
- **Mini Player** — persistent compact player above bottom nav when a track is "active".

## Tab / navigation model

Bottom navigation (4 tabs):

1. **Listen** — home/discover landing.
2. **Library** — browsing categories and collections.
3. **Playlists** — user playlists and collections.
4. **Explore** — search and discovery.

Secondary navigation:

- Stack-based push navigation for detail screens (Album, Artist, Track, Playlist).
- Back button (chevron left) in screen headers.
- Mini player tap expands to full Now Playing / Queue.
- Now Playing can be collapsed back to mini player.

## Shared components

Planned reusable components (to be created across batches):

- `AriaBottomNav` — 4-tab navigation with active underline.
- `AriaMiniPlayer` — compact player bar above bottom nav.
- `AriaScreenHeader` — back button + title + optional trailing action.
- `AriaTrackRow` — thumbnail + title + artist + duration + more menu.
- `AriaAlbumRow` — thumbnail + title + artist + year + format chip + chevron.
- `AriaPlaylistRow` — thumbnail + title + track count + chevron.
- `AriaArtistRow` — circular avatar + name + genre subtitle.
- `AriaSectionHeader` — section title with optional "See all" action.
- `AriaFilterChips` — horizontal scrollable pill chips (All, Tracks, Albums, etc.).
- `AriaBottomSheet` — shared bottom sheet container.
- `AriaConfirmDialog` — shared confirmation dialog.
- `AriaToast` — shared toast.
- `AriaEmptyState` — empty/no-results state.
- `AriaArtwork` — CSS-gradient artwork placeholder with consistent sizing.
- `AriaPlayButton` — amber/gold pill play CTA.
- `AriaIconButton` — circular translucent icon button.
- `AriaMetadataBadge` — small pill badge (format, source, status).
- `AriaProgressBar` — track progress / seek bar.

## Mock-only boundaries

Aria must never:

- Play real audio.
- Access real music files.
- Scan folders.
- Read a local library.
- Fetch album art.
- Fetch lyrics.
- Call streaming APIs.
- Call a backend.
- Call Navidrome.
- Call Forge Core.
- Use `fetch`/`axios` for app behavior.
- Use `FileReader`.
- Use `fs`.
- Use `child_process`.
- Access the filesystem.
- Store secrets.
- Add auth.
- Add analytics.
- Implement a real playback engine.
- Change the Studio shell.
- Change the PhoneFrame.
- Break Anchor.
- Break Forge.

All data is static and fictional. All state changes are local React state only.

## Implementation batches

### Batch 1 — Visual Baseline & Navigation Shell

- Implement the final Aria visual style (dark warm charcoal, amber/gold accents, large radius, minimal borders).
- Create `AriaBottomNav` with 4 tabs and active underline indicator.
- Create core static screen shells: Listen, Library, Playlists, Explore.
- Create `AriaMiniPlayer` baseline (compact bar above nav).
- Ensure responsive compatibility within the `390px x 844px` virtual phone viewport.
- Update `AriaPreview` to manage `activeTab` state and render the correct screen.

### Batch 2 — Playback Core Interactions

- Play/pause mock state (local React state only; no real audio).
- Next/previous track cycling through a static mock queue.
- Seek/progress bar (visual only; no real time updates required but can use a slow mock timer).
- Like/favorite toggle on tracks.
- Shuffle and repeat toggles (visual state only).
- Queue display and management.
- Mini player expansion to full Now Playing.
- Now playing collapse back to mini player.
- Artwork tap (can toggle between artwork and lyrics if applicable).

### Batch 3 — Library Browsing

- Library categories: Albums, Artists, Songs, Genres, Folders.
- Search within Library.
- Grid and list views.
- Row taps navigate to detail screens.
- Empty library state.
- Filter/sort affordances.

### Batch 4 — Artist/Album/Song/Playlist Detail

- Album detail screen with large artwork, track list, play/shuffle.
- Artist detail screen with discography and top tracks.
- Track detail screen with metadata rows and actions.
- Playlist detail screen with header, play/shuffle, track list.
- More menu on rows: add to playlist, add to queue, favorite, show details.
- Play album/playlist from detail.

### Batch 5 — Lyrics & Queue

- Lyrics screen for current track (mock placeholder text only; no copyrighted lyrics).
- Queue management: reorder handles (visual affordance), remove from queue.
- Save queue as playlist mock action.
- Clear queue confirmation.
- Repeat/shuffle state reflected in queue.

### Batch 6 — Search & Explore

- Search bar with scoped filter chips (All, Tracks, Albums, Artists, Playlists, Folders).
- Real-time local filtering of static mock data.
- Empty search results state.
- Recent searches.
- Explore/discovery shelves if desired.

### Batch 7 — Metadata Review & Library Health

- Library health overview (items need attention, safe fixes available).
- Issue categories: Missing covers, Incomplete tags, Duplicate tracks, Unmatched lyrics, Unknown source.
- Review safe fixes flow (confirmation → progress → toast).
- Link to Forge-style review if desired, or keep entirely within Aria mock context.

### Batch 8 — Aria State Coverage

- Empty library.
- No search results.
- No current track (mini player hidden).
- Loading artwork placeholder.
- Unavailable lyrics.
- Playback error mock.
- Queue empty.
- Offline/mock unavailable.
- First-run / onboarding empty state.

### Batch 9 — Aria Completion Audit

- Final no-dead-control audit across all visible actions.
- Responsive validation at all breakpoints.
- Docs sync: visual target, screen contracts, interaction map.
- Confirm no real audio, no network, no filesystem, no backend behavior exists.

## Acceptance criteria

Aria can be considered complete only when:

1. Every visible actionable element responds.
2. Every response is mock-only.
3. Playback state changes are local React state only.
4. All screens have state coverage (empty, loading, no-results, error).
5. Visual fidelity remains close to the reference images.
6. Virtual phone viewport stays stable.
7. No page-level horizontal overflow.
8. No real audio, file, network or backend behavior exists.
9. Anchor and Forge remain unaffected.
10. Studio shell and PhoneFrame remain unchanged.
