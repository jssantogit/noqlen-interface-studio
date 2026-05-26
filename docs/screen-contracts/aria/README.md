# Aria Screen Contract

Aria is the Noqlen music player and library experience inside the Studio phone frame.

## App purpose

Aria provides a high-fidelity music playback UI, library browsing, playlists, detail screens, queue management and track metadata exploration. It is designed to feel like a polished native music player rather than a dashboard, file manager or configuration tool.

## Current implementation state

- **Persistent shell:** implemented.
- **Bottom navigation:** implemented.
- **Mini player:** implemented.
- **Top-level tabs:** implemented and visually aligned in Bloco 4 / Bloco 4.1.
- **Detail screens:** implemented and visually aligned in Bloco 5 / Bloco 5.1.
- **Now Playing:** existing baseline, pending visual alignment in Bloco 6.
- **Lyrics and Queue:** pending Bloco 6.
- **Tests:** pending later blocks.

## Visual source of truth

Use the current approved reference set in:

```txt
docs/references/aria/
```

Approved references:

```txt
aria_home_reference.png
aria_library_reference.png
aria_explore_reference.png
aria_playlist_reference.png
aria_artist_reference.png
aria_lyrics_reference.png
aria_nowplaying_reference.png
```

The old `aria_reference1.png`, `aria_reference2.png` and legacy showcase HTML are no longer the source of truth.

Future missing-interaction implementation blocks must also use:

```txt
docs/screen-contracts/aria/missing-interaction-reference-map.md
```

Reference images under `docs/references/aria/` are visual guidance for missing flows. The missing-interaction map defines which image covers each trigger, destination type, likely component ownership, implementation block, avoid list and expected app-facing behavior.

High-level Aria truth documents:

```txt
docs/product/aria-product-spec.md
docs/screen-contracts/aria/screen-map.md
docs/design.md
```

Active Aria reference breakdowns:

```txt
docs/screen-contracts/aria/playlist-create-import-reference-breakdown.md
```

`playlist-create-import-reference-breakdown.md` governs the next implementation attempt for 7F.1-I.

Future Aria implementation blocks must consult:

1. Product spec
2. Screen map
3. Relevant reference image
4. Relevant reference breakdown, if present
5. Existing component contracts

Additional chat-approved concepts guide future work:

```txt
Album Detail
Playlist Detail
Track Details
Queue / Up Next
Search
Bottom Nav isolated widget
```

## Home rule

The current approved Home is the newer **Listening Space + Recent Additions** composition:

- editorial identity area;
- dominant listening card;
- shortcut cards;
- search affordance;
- recent additions;
- persistent mini player;
- bottom navigation.

A standalone hero-only Home remains rejected. Home must not hide recent additions behind a single hero experience.

## Primary tabs

Bottom navigation has four tabs:

1. **Listen** — home/listening landing.
2. **Library** — music collection browser.
3. **Playlists** — playlist actions, folders and user playlist collection.
4. **Explore** — library discovery hub, not a plain Search page.

## Settings

- Bloco 7D.2 implements Aria Settings as a dedicated bottom-sheet settings surface with cards, toggles and segmented selectors.
- Bloco 7D.2.2-I implemented the Settings hub and internal category pages.
- Bloco 7D.2.3-S defines the final app-like Settings structure for the next implementation block.
- Bloco 7D.2.3-I implemented `settings-app-structure.md` in the Settings UI.
- Settings implementation must follow `settings-app-structure.md`.
- Visible Settings now follows the app-like category structure.
- `settings-app-structure.md` is the visible UI source of truth for root categories, category structure, copy rules and removal/merge rules.
- `settings-core-mapping.md` remains internal grounding, not visible UI language.
- `settings-visual-guide.md` remains visual guidance, but app-like structure supersedes Core-driven categories where they conflict.
- Integration was not added.
- Do not invent Settings categories unsupported by Aria product direction.
- Do not expose Core state/result objects as user settings.
- Favorites is a Library feature, not a Setting.
- Recently Added is tracks-only by current product decision.
- Settings must not be represented as generic navigation rows when the option is a toggle or selector.
- Settings remain English-only and local-state-only.
- Source management from Settings opens the existing Source sheet; it must not add server connection, sync, persistence or filesystem behavior.

## Top-level screens

### Listen / Home

Implemented in Bloco 4.

Must preserve:

- large serif Aria identity;
- dominant current listening card;
- amber play CTA;
- shortcut cards;
- search affordance;
- recent additions list;
- separation from mini player and bottom nav.

### Library

Implemented in Bloco 4.

Bloco 7D.1S added a dedicated category contract in:

```txt
docs/screen-contracts/aria/library-category-contract.md
```

Must preserve:

- large serif title;
- local library subtitle;
- category rows with icon, label, count and chevron;
- My Playlists shelf;
- Recently Added shelf;
- music-library feeling, not file-manager styling.

Category cleanup rules:

- Bloco 7D.1I-A is a stabilization block only: it removes the failed generic category-page model and restores safe lightweight sheets/behavior until final category treatments are implemented.
- Bloco 7D.1I-B implemented the approved split: Songs, Albums, Artists and Recently Added are dedicated views; Genres, Folders and Compilations remain lightweight sheets.
- Songs should be a dense track index/list, not generic cards.
- Albums should be an artwork-led shelf/grid, not Settings rows.
- Artists should be a compact artist index, not an admin list.
- Genres can stay lightweight as chips/cards, sheet or compact view.
- Folders must stay low-emphasis and not file-manager-like.
- Compilations should feel like collections/shelves if promoted beyond a sheet.
- Recently Added should feel like a recent tracks feed/shelf and remains tracks-only by current product decision.

### Explore

Implemented in Bloco 4.

Must preserve:

- discovery hub role;
- search as affordance only;
- visual discovery cards for Forgotten Albums, Random Album, By Year, By Style, By Mood and By Genre;
- Radio as user-added internet radio stations;
- Recently Explored section;
- distinction from Search.

Explore must not reintroduce Albums, Artists, Songs or Playlists as primary root cards. Those entities may appear inside search/discovery result sheets while Library owns structural collection browsing.

### Playlists

Implemented in Bloco 4.

Must preserve this order:

```txt
title/subtitle
action cards
filter chips
Folders
Your Playlists
```

The Playlists tab must not include a fake featured/music card unless a future reference explicitly adds one.

## Detail screens

Implemented in Bloco 5 / Bloco 5.1.

Bloco 7D.1S added a stricter detail header/hero contract in:

```txt
docs/screen-contracts/aria/detail-header-contract.md
```

Summary rules:

- Bloco 7D.1I-A applies compact Back/header cleanup as stabilization, not a full detail redesign.
- Detail screens must not use a large empty top header row after removing redundant type labels.
- Back should be compact and lightweight, either floating/overlay or inline with minimal vertical footprint.
- Back should not compete with album artwork, artist hero or playlist artwork.
- Album, Artist and Playlist details should expose one contextual menu only.
- Album, Artist and Playlist details should not reintroduce object-type labels as decorative filler.
- Track Details may keep one contextual menu if no duplicate menu exists.

### Album Detail

Purpose:

- focused album page with artwork, album metadata and track list.

Implemented structure:

```txt
back/action header
large album artwork
album title
artist
album metadata: type, year, track count, duration
Play / Shuffle / more actions
track list with number, title, duration, more action
```

Visual direction:

- artwork-led;
- serif title;
- calm track list;
- amber primary Play CTA;
- not a metadata table.

### Artist Detail

Reference:

```txt
aria_artist_reference.png
```

Implemented structure:

```txt
back/action header
large portrait/hero area
artist name
location / genre tags
Play / more actions
Latest Release
Top Songs
EPs & Singles / discography section
```

Visual direction:

- artist image/hero dominates the top;
- name has strong display hierarchy;
- top songs feel musical, not tabular;
- discography rows use artwork.

### Track Details

Purpose:

- inspect current track and metadata.

Implemented structure:

```txt
back/action header
small artwork + track title + artist
metadata grouped card
Actions section
```

Metadata rows:

```txt
Album
Artist
Duration
Track
Genre
Year
Codec
Sample rate
Bit depth
Source
```

Actions:

```txt
Favorite
Add to playlist
Add to queue
Show in folder
```

Visual direction:

- technical metadata is secondary;
- still feels like a music player;
- no filesystem access;
- no playback/progress bar inside Track Details.

### Playlist Detail

Purpose:

- focused page for one playlist and its tracks.

Implemented structure:

```txt
back/action header
large playlist hero artwork
playlist title
track count
description
Play / Shuffle / more actions
track list with artwork, title, artist, duration, more action
```

Visual direction:

- playlist artwork/hero dominates;
- title and description define the mood;
- list is readable and music-first.

## Secondary screens for Bloco 6

### Now Playing

Existing baseline, pending visual alignment.

Must provide:

- full player surface;
- large artwork;
- title and artist;
- progress;
- playback controls;
- shuffle/repeat/favorite states;
- collapse back to mini player.

### Lyrics

Reference:

```txt
aria_lyrics_reference.png
```

Must use placeholder lyric text only. No copyrighted lyrics.

### Queue

Pending Bloco 6.

Must provide:

- Now Playing row/card;
- Up Next list;
- queue actions: Shuffle, Repeat, Save as playlist, Clear;
- all actions local-state-only.

## Navigation model

- Four-tab bottom navigation remains persistent for top-level screens.
- Detail screens use stack-style local navigation inside Aria: opening a nested Album, Artist, Playlist or Track detail pushes a new detail entry, and Back returns to the previous detail before returning to the active top-level tab.
- Top-level category rows/cards open local category/list states. Broad shortcuts navigate to the relevant tab/category state instead of opening arbitrary representative details.
- Library category destinations must follow the dedicated visual contract in `docs/screen-contracts/aria/library-category-contract.md`. Songs, Albums and Artists are recommended as pages/views; Recently Added can become a page/view or expanded shelf; Genres and Folders should remain sheets or lightweight views unless later justified; Compilations should become a page/view only if designed as collections.
- Do not force every Library category into the same page model. The failed generic Library-pages approach was reverted and must not be repeated.
- Listen/Home top source control opens an active-source panel. Source panels must only display configured active sources; local sources expose `Refresh` and `Settings`, while server sources expose `Sync` and `Settings`. Green online status indicators are server/online-only and must not be shown for the default Local library source.
- Library top settings control opens Aria app settings. The bottom navigation Library tab icon remains a Library tab and must not be repurposed as Settings.
- Sheets are for context menus, quick actions, selectors, temporary auxiliary flows, search preview and settings/source until redesigned. They must not replace major Library browsing sections that need full visual identity.
- Top-level submenus open as Aria bottom-sheet/pop overlays, not inline debug panels. Source, Settings, Library Search and Explore category/search sheets follow an Aria-styled bottom-sheet pattern inspired by Anchor, with backdrop, handle, close button and internal scrolling.
- Detail headers should stay navigation-first: avoid redundant object-type labels and duplicate header/action-row ellipsis menus when one contextual menu is enough.
- Sheet titles should use app-facing labels such as `Search`, `Albums`, `Source` and `Aria Settings`; avoid unnecessary debug wording.
- Playlist Import/Export controls must stay away from file, download, share, or filesystem actions.
- Detail screens need a visible back control.
- Detail-screen more/actions must open Aria bottom sheets, not generic toasts.
- Album artist links should open matching Artist Detail screens when data exists, with clear unavailable feedback otherwise.
- Artist discography rows with chevrons should navigate to/open release detail rather than only toast.
- Track Details actions are local-state-only and must never access files or persist playlist/queue changes.
- Track-row playback semantics are finalized in Bloco 7E; until then, detail track rows may continue opening Track Details.
- Bottom nav tab changes close any open detail screen.
- Mini player remains visible on detail screens unless the active screen intentionally uses a full overlay.
- Now Playing remains an overlay expanded from the mini player.
- Full playback overlays own the screen: Now Playing, Lyrics and Queue hide bottom navigation while open, and bottom navigation returns after the overlay closes.

## Shared components to prefer

Use or create local Aria primitives only when useful:

```txt
AriaScreenHeader
AriaTrackRow
AriaAlbumRow
AriaPlaylistRow
AriaArtistRow
AriaSectionHeader
AriaFilterChips
AriaArtwork
AriaPlayButton
AriaIconButton
AriaMetadataBadge
AriaProgressBar
```

Avoid creating a large global design system in one block. Keep shared primitives local to `src/apps/aria/`.

## Boundaries

Aria must never:

- play audio;
- access music files;
- scan folders;
- read a local library;
- fetch album art;
- fetch lyrics;
- call streaming APIs;
- call a backend;
- call Navidrome;
- call Forge Core;
- perform sync or source/server connection behavior;
- use `fetch`/`axios` for app behavior;
- use `FileReader`;
- use `fs`;
- use `child_process`;
- access the filesystem;
- store secrets;
- add auth;
- add analytics;
- implement a playback engine;
- change the Studio shell;
- change the PhoneFrame;
- break Anchor;
- break Forge.

All data is static and fictional. All state changes are local React state only.

## Implementation batches

### Batch 1 — Visual Baseline & Navigation Shell

Status: implemented.

### Batch 2 — Playback Core Interactions

Status: partially implemented through mini player / Now Playing controls. Further visual alignment and queue work remains for Bloco 6.

### Batch 3 — Library Browsing

Status: top-level browsing implemented. Deeper browsing and search states remain future work.

### Batch 4 — Artist/Album/Song/Playlist Detail

Status: implemented in Bloco 5 / Bloco 5.1.

Implemented scope:

```txt
Album Detail
Artist Detail
Track Details
Playlist Detail
local stack navigation
local row/action feedback
```

### Batch 5 — Lyrics & Queue

Status: pending Bloco 6.

### Batch 6 — Search & Explore

Status: Explore visual hub implemented. Full Search behavior remains future work.

### Batch 7 — Metadata Review & Library Health

Status: deferred.

### Batch 8 — Aria State Coverage

Status: deferred.

### Batch 9 — Aria Completion Audit

Status: deferred.

## Acceptance criteria

Aria can be considered complete only when:

1. Every visible actionable element responds.
2. Every response uses local state.
3. Playback state changes are local React state only.
4. All core screens have state coverage.
5. Visual fidelity remains close to the approved references.
6. Virtual phone viewport stays stable.
7. No page-level horizontal overflow exists.
8. No audio, file, network or backend behavior exists.
9. Anchor and Forge remain unaffected.
10. Studio shell and PhoneFrame remain unchanged.
