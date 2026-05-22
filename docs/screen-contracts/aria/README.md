# Aria Screen Contract

Aria is the Noqlen music player and library experience inside the Studio phone simulator.

## App purpose

Aria provides a high-fidelity mock-only music playback UI, library browsing, playlists, detail screens, queue management and track metadata exploration. It is designed to feel like a polished native music player rather than a dashboard, file manager or configuration tool.

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

Must preserve:

- large serif title;
- local library subtitle;
- category rows with icon, label, count and chevron;
- My Playlists shelf;
- Recently Added shelf;
- music-library feeling, not file-manager styling.

### Explore

Implemented in Bloco 4.

Must preserve:

- discovery hub role;
- search as affordance only;
- visual category cards for Genres, Albums, Artists, Radio, Songs and Playlists;
- Recently Explored section;
- distinction from Search.

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
- no real filesystem access;
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
- shuffle/repeat/favorite mock states;
- collapse back to mini player.

### Lyrics

Reference:

```txt
aria_lyrics_reference.png
```

Must use mock placeholder lyric text only. No copyrighted lyrics.

### Queue

Pending Bloco 6.

Must provide:

- Now Playing row/card;
- Up Next list;
- queue actions: Shuffle, Repeat, Save as playlist, Clear;
- all actions mock-only.

## Navigation model

- Four-tab bottom navigation remains persistent for top-level screens.
- Detail screens use stack-style local navigation inside Aria: opening a nested Album, Artist, Playlist or Track detail pushes a new detail entry, and Back returns to the previous detail before returning to the active top-level tab.
- Top-level category rows/cards open local mock category/list states. Broad shortcuts navigate to the relevant tab/category state instead of opening arbitrary representative details.
- Playlist Import/Export controls are preview-only and must never open files, create downloads or call share/filesystem APIs.
- Detail screens need a visible back control.
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

## Mock-only boundaries

Aria must never:

- play real audio;
- access real music files;
- scan folders;
- read a local library;
- fetch album art;
- fetch lyrics;
- call streaming APIs;
- call a backend;
- call Navidrome;
- call Forge Core;
- use `fetch`/`axios` for app behavior;
- use `FileReader`;
- use `fs`;
- use `child_process`;
- access the filesystem;
- store secrets;
- add auth;
- add analytics;
- implement a real playback engine;
- change the Studio shell;
- change the PhoneFrame;
- break Anchor;
- break Forge.

All data is static and fictional. All state changes are local React state only.

## Implementation batches

### Batch 1 — Visual Baseline & Navigation Shell

Status: implemented.

### Batch 2 — Playback Core Interactions

Status: partially implemented through mini player / Now Playing mock controls. Further visual alignment and queue work remains for Bloco 6.

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
mock-only row/action feedback
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
2. Every response is mock-only.
3. Playback state changes are local React state only.
4. All core screens have state coverage.
5. Visual fidelity remains close to the approved references.
6. Virtual phone viewport stays stable.
7. No page-level horizontal overflow exists.
8. No real audio, file, network or backend behavior exists.
9. Anchor and Forge remain unaffected.
10. Studio shell and PhoneFrame remain unchanged.
