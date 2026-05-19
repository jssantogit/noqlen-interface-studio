# Aria Interaction Contract

This document defines every planned Aria interaction with trigger, resulting UI, mock state changes, data used, forbidden real behavior and completion status.

All behavior remains mock-only. No real audio, files, network or backend behavior is permitted.

---

## Status legend

- `not implemented` — no code exists for this interaction.
- `partial` — some UI exists but the full flow is not wired.
- `implemented` — interaction is fully wired and mock-safe.
- `deferred` — intentionally delayed to a later batch.

---

## Global / Shared

### GL-1: Bottom Navigation

- **Trigger:** tap Listen, Library, Playlists or Explore in the bottom nav.
- **Resulting UI:** active tab changes; corresponding screen renders; active icon and label update to amber.
- **Mock state changes:** `activeTab` updates locally.
- **Data used:** none.
- **Forbidden real behavior:** no backend call, no library sync, no server query.
- **Status:** implemented.

### GL-2: Mini Player Expand

- **Trigger:** tap the mini player body (artwork + track info area).
- **Resulting UI:** full Now Playing / Queue screen opens as an overlay or pushed screen.
- **Mock state changes:** `playerExpanded = true`.
- **Data used:** current track from mock queue.
- **Forbidden real behavior:** none.
- **Status:** implemented.

### GL-3: Now Playing Collapse

- **Trigger:** swipe down or tap collapse affordance on full player.
- **Resulting UI:** full player closes; mini player returns visible above bottom nav.
- **Mock state changes:** `playerExpanded = false`.
- **Data used:** none.
- **Forbidden real behavior:** none.
- **Status:** implemented.

### GL-4: Play / Pause

- **Trigger:** tap the play or pause button in mini player or full player.
- **Resulting UI:** button icon toggles between Play and Pause.
- **Mock state changes:** `isPlaying` toggles locally.
- **Data used:** none.
- **Forbidden real behavior:** no real audio playback, no media element API.
- **Status:** implemented (visual toggle only).

### GL-5: Next Track

- **Trigger:** tap next button in mini player or full player.
- **Resulting UI:** current track advances to next item in mock queue; mini player and full player update artwork and info.
- **Mock state changes:** `currentTrackIndex` increments (wraps to 0 at end if repeat is on, otherwise stops or wraps based on repeat/shuffle state).
- **Data used:** mock queue array.
- **Forbidden real behavior:** no real audio stream change.
- **Status:** partial (shows toast; no queue cycling yet).

### GL-6: Previous Track

- **Trigger:** tap previous button in mini player or full player.
- **Resulting UI:** current track goes to previous item in mock queue.
- **Mock state changes:** `currentTrackIndex` decrements (wraps to end if at start).
- **Data used:** mock queue array.
- **Forbidden real behavior:** no real audio stream change.
- **Status:** partial (shows toast; no queue cycling yet).

### GL-7: Seek / Progress Bar

- **Trigger:** drag or tap the progress bar in the full player.
- **Resulting UI:** progress fill updates to tapped position; time label updates.
- **Mock state changes:** `progress` percentage updates locally.
- **Data used:** current track duration.
- **Forbidden real behavior:** no real audio seeking.
- **Status:** not implemented.

### GL-8: Shuffle Toggle

- **Trigger:** tap shuffle button in full player or queue.
- **Resulting UI:** shuffle icon toggles active/inactive state (active = amber).
- **Mock state changes:** `shuffle` boolean toggles locally.
- **Data used:** none.
- **Forbidden real behavior:** none.
- **Status:** implemented.

### GL-9: Repeat Toggle

- **Trigger:** tap repeat button in full player or queue.
- **Resulting UI:** repeat icon cycles through off / all / one states.
- **Mock state changes:** `repeatMode` cycles locally.
- **Data used:** none.
- **Forbidden real behavior:** none.
- **Status:** implemented.

### GL-10: Like / Favorite

- **Trigger:** tap heart icon on a track row, track detail or full player.
- **Resulting UI:** heart toggles filled/outline and amber/gray.
- **Mock state changes:** `favorites` Set add/remove track id locally.
- **Data used:** track id.
- **Forbidden real behavior:** no real library write, no playlist mutation.
- **Status:** implemented.

### GL-11: Toast

- **Trigger:** any action that needs lightweight feedback (added to queue, playlist saved, track favorited).
- **Resulting UI:** `AriaToast` appears briefly at the top of the app viewport.
- **Mock state changes:** `toast` object with message and tone.
- **Data used:** static message strings.
- **Forbidden real behavior:** none.
- **Status:** implemented.

### GL-12: Confirm Dialog

- **Trigger:** destructive or batch actions (clear queue, remove from playlist).
- **Resulting UI:** `AriaConfirmDialog` overlay with title, message, Confirm and Cancel.
- **Mock state changes:** confirmed actions proceed; canceled actions abort.
- **Data used:** action context.
- **Forbidden real behavior:** none.
- **Status:** not implemented.

### GL-13: Bottom Sheet

- **Trigger:** any secondary surface (more menu, add to playlist, filter/sort).
- **Resulting UI:** `AriaBottomSheet` slides up from the bottom with backdrop.
- **Mock state changes:** `activeSheet` state.
- **Data used:** sheet type and payload.
- **Forbidden real behavior:** none.
- **Status:** not implemented.

### GL-14: Back Navigation

- **Trigger:** tap back button (chevron left) in a detail screen header.
- **Resulting UI:** navigates back to previous screen in the local stack.
- **Mock state changes:** screen stack pops.
- **Data used:** none.
- **Forbidden real behavior:** none.
- **Status:** not implemented.

---

## Listen (Home)

### LS-1: Featured Current Track Card

- **Trigger:** tap the featured current track card or the Play button.
- **Resulting UI:** Play button triggers mock playback state; card displays large artwork, title, artist, album and shuffle CTA.
- **Mock state changes:** `isPlaying = true`.
- **Data used:** static now playing track.
- **Forbidden real behavior:** none.
- **Status:** implemented.

### LS-2: Shortcut Tiles

- **Trigger:** tap "Your Playlists" or "Artists" tile.
- **Resulting UI:** shows mock toast.
- **Mock state changes:** none.
- **Data used:** static tile data.
- **Forbidden real behavior:** none.
- **Status:** implemented.

### LS-3: Recent Additions Row

- **Trigger:** tap a recent addition row or the more menu (•••).
- **Resulting UI:** shows mock toast.
- **Mock state changes:** none.
- **Data used:** static recent additions data.
- **Forbidden real behavior:** none.
- **Status:** implemented.

### LS-4: Home Search Affordance

- **Trigger:** tap search bar.
- **Resulting UI:** navigates to Explore tab.
- **Mock state changes:** `activeTab = 'explore'`.
- **Data used:** none.
- **Forbidden real behavior:** none.
- **Status:** implemented.

### LS-5: Topbar Mark

- **Trigger:** tap the top-right queue/status mark.
- **Resulting UI:** shows mock toast.
- **Mock state changes:** none.
- **Data used:** none.
- **Forbidden real behavior:** none.
- **Status:** implemented.

---

## Library

### LB-1: Category Tabs

- **Trigger:** tap Albums, Artists, Songs, Genres or Folders in Library.
- **Resulting UI:** library list switches to the selected category.
- **Mock state changes:** `libraryCategory` updates locally.
- **Data used:** static category data.
- **Forbidden real behavior:** no backend query.
- **Status:** not implemented (static Albums preview visible; tab switching not wired).

### LB-2: Album Row Tap

- **Trigger:** tap an album row in Albums category.
- **Resulting UI:** pushes Album Detail screen.
- **Mock state changes:** push Album Detail with selected album id.
- **Data used:** static album data.
- **Forbidden real behavior:** none.
- **Status:** not implemented.

### LB-3: Artist Row Tap

- **Trigger:** tap an artist row in Artists category.
- **Resulting UI:** pushes Artist Detail screen.
- **Mock state changes:** push Artist Detail with selected artist id.
- **Data used:** static artist data.
- **Forbidden real behavior:** none.
- **Status:** not implemented.

### LB-4: Song Row Tap

- **Trigger:** tap a song row in Songs category.
- **Resulting UI:** sets that song as current track; starts playback mock; mini player appears.
- **Mock state changes:** `currentTrackIndex` set to selected song; `isPlaying = true`; queue set to album or library context.
- **Data used:** static song data.
- **Forbidden real behavior:** no real audio playback.
- **Status:** not implemented.

### LB-5: Library Search

- **Trigger:** type in library search bar.
- **Resulting UI:** list filters in real time by title/artist/album.
- **Mock state changes:** `libraryQuery` string updates; filtered list derived locally.
- **Data used:** static library data.
- **Forbidden real behavior:** no backend search.
- **Status:** not implemented.

### LB-6: Library Sort / Filter

- **Trigger:** tap sort/filter icon in Library header.
- **Resulting UI:** opens bottom sheet with sort options (Name, Artist, Year, Date added) and filter options (Favorites, Downloaded).
- **Mock state changes:** `librarySort` and `libraryFilter` update locally.
- **Data used:** static options.
- **Forbidden real behavior:** none.
- **Status:** not implemented.

---

## Playlists

### PL-1: Playlist Row Tap

- **Trigger:** tap a playlist row.
- **Resulting UI:** pushes Playlist Detail.
- **Mock state changes:** push Playlist Detail with selected playlist id.
- **Data used:** static playlist data.
- **Forbidden real behavior:** none.
- **Status:** not implemented.

### PL-2: Create Playlist

- **Trigger:** tap "New playlist" or plus icon.
- **Resulting UI:** opens bottom sheet or inline input to name a new playlist.
- **Mock state changes:** new playlist added to local mock list with empty tracks.
- **Data used:** user-entered name.
- **Forbidden real behavior:** no real playlist creation.
- **Status:** not implemented.

### PL-3: Playlist Detail Play

- **Trigger:** tap Play button in Playlist Detail.
- **Resulting UI:** queue set to playlist tracks; playback starts; mini player appears.
- **Mock state changes:** `queue` = playlist tracks; `currentTrackIndex = 0`; `isPlaying = true`.
- **Data used:** playlist track list.
- **Forbidden real behavior:** no real audio playback.
- **Status:** not implemented.

### PL-4: Playlist Detail Shuffle

- **Trigger:** tap Shuffle button in Playlist Detail.
- **Resulting UI:** queue set to shuffled playlist tracks; playback starts.
- **Mock state changes:** `queue` = shuffled copy; `currentTrackIndex = 0`; `isPlaying = true`; `shuffle = true`.
- **Data used:** playlist track list.
- **Forbidden real behavior:** none.
- **Status:** not implemented.

---

## Explore (Category Hub)

### EX-1: Category Card Tap

- **Trigger:** tap a category card (Genres, Albums, Artists, Radios, Songs, Playlists).
- **Resulting UI:** shows mock toast confirming the selected category; future batches will push scoped browse screens.
- **Mock state changes:** none.
- **Data used:** static category metadata.
- **Forbidden real behavior:** none.
- **Status:** implemented.

### EX-2: Search Input (deferred)

- **Trigger:** type in search bar.
- **Resulting UI:** results filter in real time across active scope.
- **Mock state changes:** `searchQuery` updates; filtered results derived locally.
- **Data used:** static consolidated mock data.
- **Forbidden real behavior:** no backend search, no network call.
- **Status:** not implemented (deferred to Batch 6; Explore is now a category hub first).

---

## Album Detail

### AD-1: Play Album

- **Trigger:** tap Play button on Album Detail.
- **Resulting UI:** queue set to album tracks; playback starts; mini player appears.
- **Mock state changes:** `queue` = album tracks; `currentTrackIndex = 0`; `isPlaying = true`.
- **Data used:** album track list.
- **Forbidden real behavior:** no real audio playback.
- **Status:** not implemented.

### AD-2: Shuffle Album

- **Trigger:** tap Shuffle button on Album Detail.
- **Resulting UI:** queue set to shuffled album tracks; playback starts.
- **Mock state changes:** `queue` = shuffled copy; `currentTrackIndex = 0`; `isPlaying = true`; `shuffle = true`.
- **Data used:** album track list.
- **Forbidden real behavior:** none.
- **Status:** not implemented.

### AD-3: More Menu on Album

- **Trigger:** tap three dots on Album Detail header.
- **Resulting UI:** opens bottom sheet with actions: Add to library, Add to playlist, Share (copy), Go to artist.
- **Mock state changes:** local toast feedback only.
- **Data used:** static album data.
- **Forbidden real behavior:** no real sharing, no real library write.
- **Status:** not implemented.

### AD-4: Track Row Tap in Album

- **Trigger:** tap a track row in the album track list.
- **Resulting UI:** sets that track as current; queue set to album tracks starting from selected index; playback starts.
- **Mock state changes:** `queue` = album tracks; `currentTrackIndex` = selected index; `isPlaying = true`.
- **Data used:** album track list.
- **Forbidden real behavior:** no real audio playback.
- **Status:** not implemented.

### AD-5: Track More Menu in Album

- **Trigger:** tap three dots on a track row in album track list.
- **Resulting UI:** opens bottom sheet: Play next, Add to queue, Add to playlist, Favorite, Show details.
- **Mock state changes:** local queue/playlist/favorite state updates; toast confirms.
- **Data used:** track id.
- **Forbidden real behavior:** no real audio, no real playlist write.
- **Status:** not implemented.

---

## Artist Detail

### AR-1: Play Top Tracks

- **Trigger:** tap Play on artist top tracks section.
- **Resulting UI:** queue set to top tracks; playback starts.
- **Mock state changes:** `queue` = top tracks; `currentTrackIndex = 0`; `isPlaying = true`.
- **Data used:** static top tracks.
- **Forbidden real behavior:** no real audio playback.
- **Status:** not implemented.

### AR-2: Album Tap in Discography

- **Trigger:** tap an album in artist discography.
- **Resulting UI:** pushes Album Detail.
- **Mock state changes:** push Album Detail.
- **Data used:** album id.
- **Forbidden real behavior:** none.
- **Status:** not implemented.

### AR-3: More Menu on Artist

- **Trigger:** tap three dots on Artist Detail header.
- **Resulting UI:** bottom sheet: Follow/Unfollow, Share, Go to related artists.
- **Mock state changes:** `followedArtists` Set add/remove; toast confirms.
- **Data used:** artist id.
- **Forbidden real behavior:** no real social action, no backend call.
- **Status:** not implemented.

---

## Track Details

### TD-1: Favorite Action

- **Trigger:** tap Favorite in ACTIONS section.
- **Resulting UI:** heart toggles; toast confirms.
- **Mock state changes:** `favorites` Set add/remove.
- **Data used:** track id.
- **Forbidden real behavior:** none.
- **Status:** not implemented.

### TD-2: Add to Playlist

- **Trigger:** tap Add to playlist in ACTIONS section.
- **Resulting UI:** opens bottom sheet with mock playlist list; tap to add; toast confirms.
- **Mock state changes:** local playlist track list updated.
- **Data used:** track id, playlist id.
- **Forbidden real behavior:** no real playlist write.
- **Status:** not implemented.

### TD-3: Add to Queue

- **Trigger:** tap Add to queue in ACTIONS section.
- **Resulting UI:** track appended to queue; toast confirms.
- **Mock state changes:** mock queue array appended.
- **Data used:** track id.
- **Forbidden real behavior:** no real audio queue.
- **Status:** not implemented.

### TD-4: Show in Folder

- **Trigger:** tap Show in folder in ACTIONS section.
- **Resulting UI:** navigates to Library / Folders with the containing folder highlighted; toast shows mock path.
- **Mock state changes:** `activeTab = 'library'`; `libraryCategory = 'folders'`; `highlightedFolder` set.
- **Data used:** track folder path.
- **Forbidden real behavior:** no filesystem access.
- **Status:** not implemented.

### TD-5: Edit Metadata

- **Trigger:** tap Edit metadata in ACTIONS section.
- **Resulting UI:** opens metadata editor sheet or navigates to a mock editor.
- **Mock state changes:** local draft state for metadata fields.
- **Data used:** track metadata fields.
- **Forbidden real behavior:** no real metadata write, no file edit.
- **Status:** not implemented.

### TD-6: Metadata Row Info

- **Trigger:** tap any metadata row (Album, Artist, Codec, etc.).
- **Resulting UI:** if tappable (Album, Artist), navigates to corresponding detail screen. If read-only (Codec, Bitrate), no action or toast with info.
- **Mock state changes:** push detail screen if applicable.
- **Data used:** metadata field value.
- **Forbidden real behavior:** none.
- **Status:** not implemented.

---

## Queue / Now Playing

### QP-1: Reorder Queue

- **Trigger:** long-press or drag reorder handle on a queue row.
- **Resulting UI:** row moves to new position in list.
- **Mock state changes:** queue array reordered locally.
- **Data used:** queue array.
- **Forbidden real behavior:** no real audio queue change.
- **Status:** not implemented.

### QP-2: Remove from Queue

- **Trigger:** swipe left on a queue row or tap remove action.
- **Resulting UI:** row animates out; queue updates.
- **Mock state changes:** queue array filtered.
- **Data used:** track id.
- **Forbidden real behavior:** none.
- **Status:** not implemented.

### QP-3: Save as Playlist

- **Trigger:** tap Save as playlist in Queue actions.
- **Resulting UI:** opens bottom sheet to name new playlist; on confirm, creates playlist from current queue; toast confirms.
- **Mock state changes:** new playlist added to mock playlists.
- **Data used:** queue track list, user-entered name.
- **Forbidden real behavior:** no real playlist creation.
- **Status:** not implemented.

### QP-4: Clear Queue

- **Trigger:** tap Clear queue in Queue actions.
- **Resulting UI:** confirm dialog; on confirm, queue empties; mini player hides if no current track fallback.
- **Mock state changes:** queue cleared; `currentTrackIndex` reset or null.
- **Data used:** none.
- **Forbidden real behavior:** none.
- **Status:** not implemented.

### QP-5: Queue Shuffle Action

- **Trigger:** tap Shuffle in Queue actions.
- **Resulting UI:** queue shuffled; toast confirms.
- **Mock state changes:** queue array shuffled locally; `shuffle = true`.
- **Data used:** queue array.
- **Forbidden real behavior:** none.
- **Status:** not implemented.

### QP-6: Queue Repeat Action

- **Trigger:** tap Repeat in Queue actions.
- **Resulting UI:** repeat mode cycles; toast shows current mode label.
- **Mock state changes:** `repeatMode` cycles off/all/one.
- **Data used:** none.
- **Forbidden real behavior:** none.
- **Status:** not implemented.

---

## Lyrics

### LY-1: Open Lyrics

- **Trigger:** tap lyrics button in full player or artwork.
- **Resulting UI:** lyrics screen/sheet opens with placeholder text for current track.
- **Mock state changes:** `activeSheet = 'lyrics'` or `lyricsVisible = true`.
- **Data used:** static mock lyrics per track.
- **Forbidden real behavior:** no real lyric fetch, no copyrighted lyrics.
- **Status:** not implemented.

### LY-2: Close Lyrics

- **Trigger:** tap close or swipe down on lyrics sheet.
- **Resulting UI:** lyrics closes; returns to full player.
- **Mock state changes:** `activeSheet` cleared; `lyricsVisible = false`.
- **Data used:** none.
- **Forbidden real behavior:** none.
- **Status:** not implemented.

---

## Metadata Review

### MR-1: Review Safe Fixes

- **Trigger:** tap Review safe fixes card.
- **Resulting UI:** confirmation dialog; on confirm, progress sheet with mock steps; completes with success toast.
- **Mock state changes:** local review counts decremented; activity entry appended.
- **Data used:** static review counts.
- **Forbidden real behavior:** no real metadata write, no file edit.
- **Status:** not implemented.

### MR-2: Issue Category Tap

- **Trigger:** tap an issue category row (Missing covers, Incomplete tags, etc.).
- **Resulting UI:** navigates to filtered Library or Review view showing items in that category.
- **Mock state changes:** `activeTab` and filter updated.
- **Data used:** issue category id.
- **Forbidden real behavior:** none.
- **Status:** not implemented.

### MR-3: Review Fixes CTA

- **Trigger:** tap amber Review fixes button.
- **Resulting UI:** navigates to Forge Review or Aria-specific review flow.
- **Mock state changes:** `activeTab` and filter updated.
- **Data used:** none.
- **Forbidden real behavior:** none.
- **Status:** not implemented.

---

## Mini Player

### MP-1: Mini Player Play/Pause

- **Trigger:** tap play/pause button in mini player.
- **Resulting UI:** icon toggles.
- **Mock state changes:** `isPlaying` toggles.
- **Data used:** none.
- **Forbidden real behavior:** no real audio playback.
- **Status:** implemented.

### MP-2: Mini Player Next/Previous

- **Trigger:** tap next or previous in mini player.
- **Resulting UI:** track info updates.
- **Mock state changes:** `currentTrackIndex` increments/decrements.
- **Data used:** queue array.
- **Forbidden real behavior:** no real audio stream change.
- **Status:** partial (shows toast; no queue cycling yet).

---

## Safety requirements (all interactions)

Every interaction listed above must remain mock-only:

- No `fetch`/`axios` for app behavior.
- No `FileReader`.
- No `fs`.
- No `child_process`.
- No filesystem access.
- No real audio playback.
- No real music library access.
- No real metadata writes.
- No network calls to streaming APIs, backends, Navidrome or Forge Core.
- No secret storage, auth or analytics.

All data is static and fictional. All state changes are local React state only.
