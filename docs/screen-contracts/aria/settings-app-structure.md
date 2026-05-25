# Aria Settings App Structure Contract

## 1. Purpose

This document defines Aria Settings as a music app settings experience.

Aria Core remains the internal grounding for supported areas, but the visible Settings UI must speak like an app. It must not expose implementation language, internal validation terms or technical mapping as user-facing copy.

Existing technical contracts remain internal references. They help implementation stay grounded, but they do not define visible category names when this app-structure contract is more user-facing.

Implementation note: Bloco 7D.2.3-I implemented this structure in `AriaSettingsSheet.tsx`.

Polish note: Bloco 7D.2.3-P changed the visible root title to `Settings`, removed the root subtitle and required Accent color to use a compact color selector when more than four choices exist.

## 2. Core rule

The Settings UI starts from user-facing app needs, then maps to Core contracts where useful.

Correct:

```txt
User-facing app setting -> internal Core contract.
```

Incorrect:

```txt
Core capability -> visible Settings item.
```

## 3. Visible UI copy rule

Visible Settings copy must not use:

- mock
- mockup
- test
- visual-only
- preview-only
- simulator
- development
- visual lab
- Core mapping
- Core diagnostics
- boundary
- no real playback
- no backend
- no persistence
- no filesystem
- planned/mock-only

Acceptable visible copy:

- app-facing names
- settings names
- source names
- playback terms
- cache/download terms
- backup/restore terms
- advanced terms only where a normal app might use them

## 4. Approved Settings root

Aria Settings root must use this final app-like structure.

Main:

- Interface
- Library
- Playback
- Offline & Cache
- Media Sources

Tools:

- Backup & Restore

System:

- Advanced
- About

Do not include as root:

- Audio Output & Quality
- Streaming & Network
- Sources & Providers
- Profiles & Backup
- Android & External Control
- Smart Playlists
- Radio
- Queue
- Now Playing
- Favorites
- Recently Added
- Recently Played
- Visual Lab

## 5. Rename/merge rules

Sources & Providers -> Media Sources.

Audio Output & Quality -> merge into Playback > Output and Playback > Audio Quality.

Streaming & Network -> merge into Offline & Cache, Playback > Decoding & Transcoding, and Advanced > Network.

Profiles & Backup -> replace with Backup & Restore.

Android & External Control -> remove as root. If needed later, headset or notification controls can move under Playback > Media Buttons. Android Auto is not a root category for now.

Advanced Visual Lab -> remove entirely from UI.

## 6. Interface structure

Interface should feel like user-facing app appearance settings.

Theme:

- Appearance
  Options: System, Dark, Light
- Accent color
  Options: Amber, Blue, Red, Green, Pink
- Dynamic color
  Options: Off, Album artwork, System colors

Layout:

- Start screen
  Options: Listen, Library, Playlists, Explore
- Use compact lists
- Show library shortcuts

Music display:

- Album art size
  Options: Compact, Balanced, Large
- Show audio quality
- Show music source

Player:

- Mini player style
  Options: Compact, Expanded
- Show extra track info

Notes:

- Theme settings are visual preferences only in this site phase.
- Do not add full custom theme import/export.
- Do not add font picker.
- Do not add per-page deep customization yet.

## 7. Library structure

Browsing:

- Default sort
  Options: Recent, Title, Artist
- Search in
  Options: Library, Local files, Metadata
- Show folders
- Show compilations
- Hide empty sections

Metadata:

- Show format labels
- Show source labels

Rules:

- Favorites is not a setting.
- Recently Added is not a setting.
- Recently Played is not a setting.
- Songs, Albums, Artists, Genres and Playlists are library sections/screens, not Settings options.

## 8. Playback structure

Playback is a hub category with practical subgroups.

Output:

- Output device
- Prefer USB DAC
- Exclusive output

Playback:

- Resume playback
- Gapless playback
- Volume normalization
- ReplayGain

Transitions:

- Fade in
- Fade out
- Crossfade

Queue:

- Repeat mode
- Shuffle style
- Save queue

Shuffle style:

- Standard: normal shuffle.
- Fresh: avoids recent repeats and predictable short loops.
- Deep: stronger reshuffle that varies artist/album more aggressively.

Notes:

- Queue means queue behavior, not current queue state.
- Now Playing is not a Settings category.
- Android media controls are not a root category. Headset/notification controls can be considered later under Playback > Media Buttons.

## 9. Offline & Cache structure

General:

- Offline mode
- Storage limit

Downloads:

- Download only on Wi-Fi
- Download quality
- Simultaneous downloads

Playback cache:

- Playback cache size
- Preload next tracks

Images:

- Image cache
- High quality artwork

Rules:

- Do not make it look like a file manager.
- Do not show storage paths in this phase.
- Do not add destructive cleanup actions until a real confirmation flow exists.

## 10. Media Sources structure

Current source:

- Active source
- Source type

Source:

- Manage source
- Sync library
- Show source labels

Rules:

- Do not show provider readiness.
- Do not show source capabilities.
- Do not show provider boundary language.
- Do not add auth/server form here unless the source flow supports it.
- Sync status may appear here, not as a top-level Settings root category.

## 11. Backup & Restore structure

Root page should show only:

Backup:

- Create backup

Restore:

- Restore from backup

Flow rule:

When user chooses Create backup:

- open/select backup flow
- then show "Choose what to include"
- Settings
- Media sources
- Playlists
- Playback history
- Offline rules

When user chooses Restore from backup:

- open/select restore flow
- then show "Choose what to restore"
- Settings
- Media sources
- Playlists
- Playback history
- Offline rules

Do not show Included data as static root content.

Do not show filesystem/development limitations in visible UI.

## 12. Advanced structure

Debug:

- Debug mode

Database:

- Rebuild library index
- Compact local index

Network:

- Treat Wi-Fi as metered
- Treat VPN as metered

Rules:

- Remove Visual Lab.
- Remove Show mock boundaries.
- Remove Show Core mapping.
- Remove Strict mock mode.
- Remove Mock flow visibility.
- Remove Provider boundary warnings.
- Remove Core diagnostics.
- Remove Snapshot redaction.
- Remove Automation safety.
- Keep Advanced practical and app-like.

## 13. About structure

Sections/content:

- Aria
- Version
- Library engine
- Licenses
- Credits

Rules:

- Do not list app limitations as user-facing copy.
- Do not mention no real playback, no backend, no filesystem, no persistence.
- About should read like an app About screen.

## 14. Current implementation removal list

For 7D.2.3-I, explicitly remove or replace:

Remove root pages:

- audioQuality
- streamingNetwork
- profilesBackup
- androidExternal

Rename:

- sources -> mediaSources
- offlineStorage -> offlineCache

Remove visible controls:

- Visual-only mode
- Show technical labels
- Show provider readiness
- Show source capabilities
- Unavailable media
- Bit-depth handling, unless simplified into Playback later
- Quality fallback
- Data saver if not under Offline & Cache
- Profile scope
- Active profile
- Android Auto visibility
- MediaSession controls
- Notification controls
- Lock-screen controls
- Foreground service
- Strict mock mode
- Mock flow visibility
- Provider boundary warnings
- Show core diagnostics
- Snapshot redaction
- Automation safety

Replace:

- Default shuffle -> Shuffle style
- Sources & Providers -> Media Sources
- Offline, Cache & Storage -> Offline & Cache
- Profiles & Backup -> Backup & Restore
- About facts list -> app-like About details

## 15. Implementation target

Bloco 7D.2.3-I must:

- rework `AriaSettingsSheet.tsx` only, unless tiny compatibility is needed.
- keep bottom sheet behavior.
- keep internal category pages.
- use the approved root categories.
- remove development-language remnants.
- implement app-like options listed above.
- keep state local/non-persistent.
- not add real functionality.
