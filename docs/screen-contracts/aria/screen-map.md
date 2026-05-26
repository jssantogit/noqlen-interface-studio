# Aria Screen Map

## Purpose

This document is the navigation and interaction truth map for Aria. It defines which controls open which screens, sheets, overlays or details.

Implementation blocks must consult this document before coding. If a control is not in this map, do not invent destination behavior without updating the map first.

## Destination types

- Top-level tab
- Detail screen
- Bottom sheet
- Playback overlay
- Confirmation panel
- Local option panel
- Toast/status feedback
- Passive visual element

## Global navigation

| Control | Destination |
|---|---|
| Bottom nav Listen | Listen tab |
| Bottom nav Library | Library tab |
| Bottom nav Playlists | Playlists tab |
| Bottom nav Explore | Explore tab |
| Mini player tap | Now Playing overlay |
| Now Playing Lyrics | Lyrics overlay |
| Now Playing Queue | Queue overlay |
| Lyrics back | Now Playing overlay |
| Queue back | Now Playing overlay |
| Overlay collapse | Previous top-level context |

## Listen screen map

| Control | Destination |
|---|---|
| Recent track rows | Track Details or playback action depending current contract |
| Album cards | Album Detail |
| Artist cards | Artist Detail |
| Playlist cards | Playlist Detail |
| Source/server icon | Source sheet |
| Settings icon | Settings sheet |

The final track-row playback rule remains tied to the current row-tap contract. Broad shortcut cards should not open arbitrary representative details unless their label names a concrete item.

## Library screen map

| Control | Destination |
|---|---|
| Search | Search sheet |
| Songs | Library Songs view |
| Albums | Library Albums view |
| Artists | Library Artists view |
| Genres | Genres category sheet/view |
| Folders | Library folders sheet/view |
| Compilations | Compilations category sheet/view |
| Recently Added | Recently Added view |
| Playlists shortcut | Playlists tab or playlist section |

Rules:

- Library owns structural collection browsing.
- Library category rows must not be feedback-only.
- Folders are app-library folders, not device storage directories.

## Playlists screen map

| Control | Destination |
|---|---|
| Create Playlist | Create Playlist sheet |
| Import Playlist | Import Playlist sheet |
| New Folder | New Folder sheet |
| Export Playlist | Export Playlist sheet |
| Folder row | Folder Detail sheet/view |
| Playlist row | Playlist Detail |
| Playlist more | Playlist Options sheet |
| Sort | Local sort change |
| Filter chips | Local filter change |

Rules:

- Create, Import and Folders follow reference-backed docs.
- New Folder, Export Playlist and Folder Detail remain 7F.2 until implemented.
- Creation and import must not become account, social or device flows.

## Explore screen map

| Control | Destination |
|---|---|
| Search | Explore Search sheet |
| Forgotten Albums | Forgotten Albums sheet/list |
| Random Album | Album Detail |
| By Year | Year discovery sheet |
| By Style | Style discovery sheet |
| By Mood | Mood discovery sheet |
| By Genre | Genre discovery sheet |
| Radio Browse | Radio sheet |
| Radio station row | Radio Preview/Details flow |

Rules:

- Explore must not have primary Albums, Artists, Songs or Playlists root cards.
- Albums, Artists, Songs and Playlists may appear only inside search or discovery result sheets.
- Radio is user-added internet radio.

## Detail screen map

### Album Detail

| Control | Destination |
|---|---|
| Back | Previous context |
| Track row | Play/select track or Track Details according contract |
| Artist link | Artist Detail |
| More/options | Album Options sheet |

### Artist Detail

| Control | Destination |
|---|---|
| Back | Previous context |
| Top song row | Play/select track or Track Details according contract |
| Album/discography row | Album Detail |
| More/options | Artist Options sheet |

### Playlist Detail

| Control | Destination |
|---|---|
| Back | Previous context |
| Track row | Play/select track or Track Details according contract |
| More/options | Playlist Options sheet |

### Track Details

| Control | Destination |
|---|---|
| Back | Previous context |
| Add to Playlist | Add to Playlist sheet |
| Add to Queue | Local queue action |
| Go to Album | Album Detail |
| Go to Artist | Artist Detail |

## Now Playing screen map

| Control | Destination |
|---|---|
| More | Local option panel |
| Add to Playlist | Add to Playlist sheet |
| Playback Info | Playback Info sheet/panel |
| Favorite | Local toggle |
| Previous/Next | Local track change |
| Play/Pause | Local toggle |
| Progress bar | Local seek |
| Lyrics | Lyrics overlay |
| Queue | Queue overlay |

## Lyrics screen map

| Control | Destination |
|---|---|
| Timeline | Local seek |
| Options | Local lyrics options panel |
| Previous/Next | Local track change |
| Queue | Queue overlay |
| Back | Now Playing |

## Queue screen map

| Control | Destination |
|---|---|
| Save as Playlist | Save Queue as Playlist sheet |
| Clear | Confirmation panel |
| Queue row | Select current track |
| Row more | Queue row actions |
| Reorder handle | Local reorder behavior |
| Current track card | Now Playing |

## Settings screen map

Settings is governed by `docs/screen-contracts/aria/settings-app-structure.md`.

Do not duplicate all Settings destinations here.

## Source sheet map

| Control | Destination |
|---|---|
| Current source card | Source details/status |
| Manage Source | Source management area/sheet |
| Sync Library | Local sync feedback/action |
| Settings | Settings sheet if applicable |

## Remaining reference-backed TODOs

- 7F.1 — Playlist Create/Import/Smart
- 7F.2 — Playlist Folders/Export/Detail
- 7F.3 — Library Category Flows
- 7F.4 — Radio Flows
- 7F.5 — Now Playing Extra Actions
- 7F.6 — Queue Save as Playlist
- 7F.7 — Final Sweep

## Rule for future prompts

Every implementation prompt must include:

- relevant product spec section;
- relevant screen map rows;
- relevant reference image;
- exact allowed files;
- explicit avoid list.
