# Aria Visual Alignment Contract

Aria is the Noqlen music player and library experience inside the Studio phone simulator.

This document defines how the approved Aria reference images should guide implementation. It does not replace the screen contract; it turns the current visual references into a practical alignment process.

## Approved reference set

Approved Aria references live in:

```txt
docs/references/aria/
```

Current approved image references:

```txt
aria_home_reference.png
aria_library_reference.png
aria_explore_reference.png
aria_artist_reference.png
aria_lyrics_reference.png
aria_nowplaying_reference.png
```

Older Aria reference PNGs and the legacy showcase HTML are not the source of truth.

## Current visual direction

Aria should feel like a polished native music player, not a dashboard or admin panel.

The visual system is defined by:

- very dark navy/black background;
- restrained warm amber/gold accent;
- cinematic artwork surfaces;
- soft glow around important artwork and player surfaces;
- large serif display titles;
- small muted metadata labels;
- translucent cards with subtle borders;
- bottom navigation as a separate glass layer;
- compact persistent mini player above bottom navigation;
- strong vertical hierarchy;
- calm spacing with no crowded dashboard density.

## Global Aria rules

Aria must:

- stay inside the `390px x 844px` virtual phone viewport;
- preserve the Studio shell and phone simulator;
- keep all behavior mock-only and local-state-only;
- avoid real playback, audio, backend, filesystem, library scanning or network calls;
- keep player controls visual/mock only;
- preserve bottom navigation structure unless an explicit Aria navigation block changes it.

Aria must not become:

- a server control dashboard;
- a metadata repair dashboard;
- a generic settings app;
- a search-only interface;
- a dense admin list;
- a copy of Anchor or Forge.

## Screen source of truth

### Home / Listen

Reference:

```txt
aria_home_reference.png
```

Purpose:

- primary landing surface for listening;
- should communicate mood, current music context and recent additions.

Visual requirements:

- prominent top identity/title area;
- hero/listening card must dominate the upper screen;
- recent additions must be visible but secondary;
- search and shortcut controls must feel integrated, not like a separate dashboard;
- mini player and bottom nav must not collide.

### Library

Reference:

```txt
aria_library_reference.png
```

Purpose:

- browse the local music library in a music-player way.

Visual requirements:

- library categories should feel like music collection entry points;
- lists must be readable and calm;
- metadata should be secondary;
- avoid admin-table density.

### Explore

Reference:

```txt
aria_explore_reference.png
```

Purpose:

- discovery/browsing hub for the library.

Visual requirements:

- Explore is not just Search;
- category cards should feel intentional and visual;
- cards must represent library discovery surfaces such as genres, albums, artists, radios, songs and playlists;
- search may exist as an affordance, but the screen must not collapse into a plain search page unless a future contract explicitly changes it.

### Artist Detail

Reference:

```txt
aria_artist_reference.png
```

Purpose:

- focused artist profile and discography surface.

Visual requirements:

- artist image/banner or artwork area must dominate the top;
- artist name must have strong display hierarchy;
- top tracks and albums should feel musical, not tabular;
- back navigation must remain clear.

### Lyrics

Reference:

```txt
aria_lyrics_reference.png
```

Purpose:

- focused current-track lyrics surface.

Visual requirements:

- lyrics must be calm and highly readable;
- player context remains present but not distracting;
- use mock placeholder lyric text only;
- no copyrighted lyrics.

### Now Playing

Reference:

```txt
aria_nowplaying_reference.png
```

Purpose:

- full player surface for the current track.

Visual requirements:

- artwork must dominate;
- track title and artist must be readable and centered in hierarchy;
- controls must feel premium and spacious;
- shuffle/repeat/favorite states remain local mock state;
- collapse back to mini player must remain obvious.

## Shared surfaces

### Bottom navigation

Bottom navigation must:

- feel like a separate glass layer;
- sit at the bottom of the app viewport;
- use restrained amber active state;
- avoid heavy outlines;
- remain touch-friendly;
- not visually merge with the mini player.

### Mini player

Mini player must:

- float above bottom navigation;
- have clear separation from bottom navigation;
- include previous, play/pause and next controls;
- be compact and readable;
- avoid exaggerated shadow, border or film effects;
- tap/click expands to Now Playing.

### Cards and lists

Cards and list rows must:

- use soft borders and low-opacity surfaces;
- prioritize artwork and title hierarchy;
- use muted metadata;
- keep spacing calm;
- avoid crowded admin/dashboard density.

## Visual block rule

For any Aria visual block:

```txt
[ ] Identify target screen
[ ] Identify approved reference
[ ] List current visual gaps
[ ] Patch only Aria files allowed by the block
[ ] Preserve mock-only behavior
[ ] Validate screenshot when available
[ ] Report remaining differences
```

## Files usually allowed in Aria visual blocks

```txt
src/apps/aria/AriaPreview.tsx
src/apps/aria/components/AriaBottomNav.tsx
src/apps/aria/components/AriaMiniPlayer.tsx
src/apps/aria/components/AriaListenHome.tsx
src/apps/aria/components/AriaLibrary.tsx
src/apps/aria/components/AriaExplore.tsx
src/apps/aria/components/AriaPlaylists.tsx
src/apps/aria/components/AriaNowPlaying.tsx
src/apps/aria/ariaMockData.ts
src/index.css
```

Only touch files outside this list when the active block explicitly allows it.

## Files forbidden during normal Aria visual alignment

```txt
src/components/phone/PhoneFrame.tsx
src/components/phone/PhoneStage.tsx
src/components/phone/AppViewport.tsx
src/components/studio/StudioLayout.tsx
src/apps/anchor/**
src/apps/forge/**
src/apps/flux/**
.github/**
package.json
vite.config.ts
```

## Acceptance criteria for Aria visual alignment

Aria visual alignment is acceptable when:

- the approved references are documented as the source of truth;
- Home, Library, Explore, Artist, Lyrics and Now Playing follow the shared visual system;
- mini player and bottom nav spacing is correct;
- visual hierarchy feels like a music player;
- no screen resembles a generic dashboard unless intentionally specified;
- all visible controls remain mock-only;
- no real audio, backend, filesystem or library access is introduced;
- no page-level horizontal overflow appears.
