# Aria Visual System

Aria is the Noqlen music player and library experience inside the Studio phone simulator.

This document extracts the shared visual language from the approved Aria reference set and turns it into implementation guidance. It is not a feature plan and does not authorize real playback, real library access or backend integration.

## Reference set

Approved references:

```txt
docs/references/aria/aria_home_reference.png
docs/references/aria/aria_library_reference.png
docs/references/aria/aria_explore_reference.png
docs/references/aria/aria_playlist_reference.png
docs/references/aria/aria_artist_reference.png
docs/references/aria/aria_lyrics_reference.png
docs/references/aria/aria_nowplaying_reference.png
```

Additional chat-approved concepts used to infer the system:

```txt
Album Detail
Playlist Detail
Track Details
Queue / Up Next
Search
Bottom Nav isolated widget
```

These references collectively define the Aria look. Future screens should extend this system instead of requiring a generated image for every minor surface.

## Product feeling

Aria should feel like:

```txt
premium local music player
cinematic dark listening space
warm amber playback interface
library-first but not administrative
minimal, calm, tactile and music-focused
```

Aria should not feel like:

```txt
server dashboard
metadata repair tool
settings panel
file manager
analytics dashboard
generic streaming clone
plain search app
```

## Core visual principles

### 1. Dark stage, warm focus

The screen is a dark listening room. The background must stay very dark, usually navy-black or near-black, with subtle amber/copper glow.

Use warmth for focus only:

```txt
primary actions
playback controls
active navigation
important progress
selected states
small glow behind artwork/player surfaces
```

Avoid spreading amber everywhere. The accent must feel intentional.

### 2. Artwork leads the emotion

Artwork is not decoration. It is the main emotional object of the UI.

Use artwork or artwork-like placeholders for:

```txt
home hero
now playing
album detail
artist detail
playlist list
playlist detail
queue rows
track details
recent additions
library collection rows
```

Artwork should often be larger than the text beside it, especially in music-focused surfaces.

### 3. Big serif titles, quiet metadata

Aria uses a strong editorial/music-magazine hierarchy:

```txt
large serif display title
medium serif/card title
small sans metadata
muted secondary copy
compact uppercase labels only when useful
```

Display titles should feel musical and premium, not app-dashboard generic.

### 4. Glass surfaces without overdoing glass

Cards, nav and mini player use translucent surfaces, but not heavy glassmorphism.

Preferred look:

```txt
low-opacity dark surface
thin soft border
small inner highlight
restrained shadow
subtle blur only where helpful
```

Avoid:

```txt
thick bright borders
excessive outer glow
milky/frosted panels
high-contrast outlines
heavy neon effects
```

### 5. Layered bottom system

Aria has two persistent lower layers:

```txt
Mini Player
Bottom Navigation
```

They must feel like two separate layers, never one merged block.

Rules:

```txt
mini player floats above bottom nav
there is visible breathing space between them
bottom nav anchors the app
mini player belongs to playback state
bottom nav belongs to app navigation
```

### 6. Calm density

Aria can show lists, but lists must remain music-player lists.

Rows should use:

```txt
artwork/avatar
main title
artist/album/metadata
small duration/status/action
soft separators or card grouping
```

Avoid admin-table density, cramped chips and long technical copy in primary surfaces.

## Suggested visual tokens

These are guidance values, not mandatory exact tokens. Implementation may tune them after screenshot validation.

### Background

```txt
app bg top:    #071018 / #081017
app bg base:   #05090e / #05070b
deep surface:  rgba(5, 9, 14, 0.96)
warm glow:     rgba(240, 161, 61, 0.10-0.22)
blue glow:     rgba(60, 100, 130, 0.06-0.14)
```

### Text

```txt
main text:     #f5ecdf / #fff3e4
muted text:    #b9b1a7
subtle text:   #777d82 / #7f858a
dim labels:    rgba(245, 236, 223, 0.45-0.60)
```

### Accent

```txt
accent:        #f0a13d
accent strong: #ffb85a
accent dark:   #d9892d
accent text:   #1b1108 / #190f07
```

### Surfaces

```txt
surface low:     rgba(255, 255, 255, 0.025-0.040)
surface medium:  rgba(255, 255, 255, 0.045-0.070)
surface raised:  rgba(13, 18, 24, 0.90-0.96)
border soft:     rgba(255, 255, 255, 0.060-0.090)
border warm:     rgba(240, 161, 61, 0.12-0.22)
```

### Radius

```txt
small controls:  10-12px
rows/cards:      14-18px
large cards:     20-26px
bottom nav:      22-28px / pill-like
now playing art: 22-30px
```

### Shadows

```txt
low shadow:      0 8px 18px rgba(0,0,0,0.22-0.32)
raised shadow:   0 16px 34px rgba(0,0,0,0.30-0.45)
warm glow:       0 12px 36px rgba(240,161,61,0.10-0.20)
```

## Layout rhythm

### Phone viewport

Aria renders inside the existing virtual phone viewport. Do not change Studio shell sizing.

```txt
logical viewport: 390px x 844px
horizontal padding: usually 16px
primary vertical gap: 12-18px
section gap: 20-28px
persistent bottom reserved space: mini player + nav + safe gap
```

### Vertical hierarchy

Common screen structure:

```txt
status bar space
screen header / identity
primary content surface
secondary collection/list
mini player if active
bottom navigation
home indicator
```

Detail screen structure:

```txt
back/action header
large artwork or hero area
title block
primary actions
content list/metadata
optional persistent player/nav depending on screen mode
```

## Component patterns

### Screen header

Use for top-level screens:

```txt
large serif title
small muted subtitle or context line
optional trailing action
```

Tone:

```txt
editorial, calm, music-focused
```

Avoid oversized utility bars or app-dashboard headers.

### Hero / listening card

Used on Home.

Must:

```txt
visually dominate upper screen
include strong artwork or artwork-like surface
show current listening context
include one primary playback action
use warm accent sparingly
leave room for recent additions below
```

### Bottom nav

Must:

```txt
sit fixed near the bottom
look like a glass pill/card
use amber only for active tab
keep icons and labels readable
avoid heavy outlines
stay separate from mini player
```

Bottom nav is navigation, not playback.

### Mini player

Must:

```txt
float above bottom nav
show tiny artwork
show track title and artist
include previous, play/pause and next
include subtle progress indication
expand to Now Playing on tap/click
```

Must avoid:

```txt
touching bottom nav
huge border/shadow film
missing previous control
overpowering the content
```

### Now Playing

Must:

```txt
make artwork the dominant object
center playback emotion
show title/artist clearly
keep controls spacious
show progress calmly
show favorite/shuffle/repeat as local mock states
provide clear collapse affordance
```

Now Playing is the highest-emotion screen.

### Lyrics

Must:

```txt
be calm and readable
use large comfortable lyric lines
keep current-track context visible
use mock placeholder lyric text only
avoid copyrighted lyrics
```

Lyrics should feel like focus mode, not a dense text document.

### Library and Explore cards

Library and Explore must feel like music collection surfaces.

Cards may represent:

```txt
genres
albums
artists
radios
songs
playlists
folders
recent additions
```

Each card needs:

```txt
icon or artwork
clear label
small count/context
soft dark surface
subtle active/hover feedback
```

Explore may include search, but it must not become only a search screen unless a future contract changes that model.

### Playlist list screen

The Playlists tab is a top-level collection surface, not just a compact list.

It should include:

```txt
large serif title
playlist count/context
one visually dominant playlist or rich card area
secondary playlist collection rows/cards
artwork-led hierarchy
play action and more action as secondary controls
persistent mini player and bottom nav separation
```

It must not look like:

```txt
settings rows
plain admin list
small cramped playlist table
```

### Playlist / album / artist rows

Rows should include:

```txt
artwork/avatar
name/title
secondary metadata
optional duration/count
optional more/action button
```

The row should feel tappable and musical, not like a settings row.

### Track details / metadata

Track details may show technical metadata, but the visual hierarchy must still feel like a player.

Top should include:

```txt
artwork
track title
artist/album context
actions
```

Metadata rows should be secondary and grouped calmly.

## Screen-specific guidance

### Home / Listen

Priority:

```txt
listening context first
recent additions second
navigation/playback layers always clear
```

Do:

```txt
large hero
strong artwork
compact shortcuts
visible recent additions
```

Do not:

```txt
turn into a dashboard
make quick actions dominate
hide recent additions below excessive hero space
```

### Library

Priority:

```txt
browse collection calmly
```

Do:

```txt
category cards
recent/important shelves
album/artist/song entry points
```

Do not:

```txt
use file-manager styling
make it look like Anchor library management
```

### Explore

Priority:

```txt
discovery hub
```

Do:

```txt
visual category cards
search affordance if needed
library discovery sections
```

Do not:

```txt
make it identical to Search
make it a plain two-column utility grid without music character
```

### Playlists

Priority:

```txt
playlist collection with strong artwork presence
```

Do:

```txt
make playlists feel like curated music spaces
use rich artwork surfaces
show playlist context clearly
keep actions visible but secondary
```

Do not:

```txt
render only tiny compact rows
make playlists feel like folders/settings
```

### Detail screens

Priority:

```txt
large identity/artwork
clear play actions
secondary lists/metadata
```

Do not make detail screens feel like forms.

## Implementation strategy

Implement Aria visual alignment from the outside in:

```txt
1. background and global atmosphere
2. bottom nav
3. mini player
4. top-level screens: Home, Library, Explore, Playlists
5. detail screens: Album, Artist, Playlist Detail, Track
6. playback screens: Now Playing, Lyrics, Queue
7. tests and responsive audit
```

Do not start with rare detail screens before the shared shell feels correct.

## OpenCode handoff trigger

Use OpenCode for implementation blocks that require browser inspection and screenshots:

```txt
Bloco 3 — Aria Shell
Bloco 4 — Home, Library, Explore and Playlists
Bloco 5 — Detail screens
Bloco 6 — Now Playing, Lyrics and Queue
```

Chat/GitHub direct edits are acceptable for this document and other low-risk docs updates.

## Acceptance criteria

The Aria visual system is successfully applied when:

```txt
[ ] all Aria screens share the same dark/warm visual language
[ ] mini player and bottom nav are consistently separated
[ ] artwork has strong visual presence
[ ] typography hierarchy is clear
[ ] cards and lists feel musical, not administrative
[ ] technical metadata is secondary
[ ] Explore is distinct from Search
[ ] top-level screens do not feel like dashboards
[ ] all behavior remains mock-only
[ ] the virtual phone viewport remains stable
[ ] no page-level horizontal overflow appears
```
