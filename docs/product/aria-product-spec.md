# Aria Product Spec

## Product identity

Aria is a music player interface inside Noqlen. It is focused on local library listening today and future server or media-source browsing when those flows are explicitly designed.

Aria is dark-first, music-centered and collection-oriented. The site defines a visual and product-flow reference for a future native implementation.

Aria is not a social music app, a streaming-store interface or a generic file manager.

## Product promise

Aria should help the user:

- listen to music;
- browse a collection;
- manage playlists;
- rediscover music;
- manage the current queue;
- inspect playback and media details;
- switch or view media sources;
- configure app settings.

## Product non-goals

Future implementation must not invent:

- account login;
- public sharing;
- social profiles;
- cloud collaboration;
- provider marketplace;
- device file picker flows;
- Android storage permissions;
- real imports, exports or downloads;
- payment or subscription UI;
- server authentication forms unless a source or provider flow explicitly asks for it;
- generic settings-like forms where a visual reference exists;
- generated radio or mixes when the product says internet radio;
- development or prototype limitation notices in visible UI.

## Product areas

### Listen

Listen is the current listening home. It owns recent music, resume points and discovery starting points that lead to playback or detail.

### Library

Library is organized collection browsing. It owns Songs, Albums, Artists, Genres, Folders, Compilations and Recently Added.

Library category rows should open useful views or sheets. Library is not discovery-first.

### Playlists

Playlists is playlist collection management. It owns Create Playlist, Import Playlist, New Folder, Export Playlist and Folder Detail.

Playlist action buttons must open flows when visually promised. Playlist folders are app-level organization, not device folders.

### Explore

Explore is discovery and rediscovery. It owns Search, Forgotten Albums, Random Album, By Year, By Style, By Mood, By Genre and Radio.

Explore must not reintroduce Albums, Artists, Songs or Playlists as primary root cards. Those items may appear inside search or discovery results.

### Radio

Radio means user-added internet radio stations. It is not generated mixes or artist radio unless a later contract explicitly adds that behavior.

Radio should support Add Radio, Preview and Details.

### Now Playing

Now Playing is the playback surface. It owns Add to Playlist and Playback Info actions.

Now Playing should not expose implementation limitations.

### Queue

Queue is the upcoming playback list. It owns Save as Playlist.

Queue actions can mutate local UI state.

### Settings

Settings are app-facing preferences. Settings follows `docs/screen-contracts/aria/settings-app-structure.md` and must not expose development or internal language.

## UI copy rule

Visible UI must speak like an app.

Allowed visible copy includes:

- Create Playlist
- Import Playlist
- Playback Info
- Add to Playlist
- Save as Playlist
- Radio Details
- Folder Details
- Sync Library
- Output Device

Forbidden visible UI language includes:

- mock
- prototype
- visual-only
- preview-only
- simulator
- development
- visual lab
- Core mapping
- no real playback
- no backend
- no filesystem
- no persistence
- implementation-only disclaimers

## Interaction rule

A visually clickable button must either perform a local UI action, open a sheet or view, or be visually passive.

- A creation button must open a creation flow.
- Import and export buttons must open a relevant sheet.
- Category rows must open useful category views or sheets.
- More buttons must open actions, not only feedback.
- Destructive actions require confirmation.
- Toast-only behavior is acceptable only for status feedback or tiny confirmations, not for major promised flows.

## Reference rule

When a reference image exists:

- implementation must follow its structure;
- do not invent a different generic UI;
- do not borrow unrelated Settings patterns;
- break the reference down into anatomy before implementation;
- exact pixels are not required, but hierarchy and component types are required.

## Local behavior rule

Current site behavior may remain local and session-only, but visible UI must not advertise implementation limitations.

Local session actions may:

- add visible rows;
- toggle local state;
- open sheets;
- show confirmation;
- reset on reload.

They must not:

- persist to disk;
- use localStorage or sessionStorage;
- use network calls;
- use file picker;
- claim device access.

## Aria vs Android Native

The site defines the visual and product-flow reference. Native Android implementation comes later.

Android-specific behavior such as MediaSession, storage permissions, notification player, lock screen and background service belongs to native implementation, not current site flows unless explicitly represented as interface-only UI.
