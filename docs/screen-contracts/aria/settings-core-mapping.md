# Aria Settings Core Mapping Contract

## Purpose

Aria Settings must be grounded in Aria Core-supported capabilities, policies and preference-like concepts. Settings should not expose arbitrary UI ideas that do not map to Core.

This contract is internal grounding only. It is not visible UI copy and it is not the current source of truth for visible Settings root categories.

`settings-app-structure.md` is the current visible UI source of truth for Settings names, root categories, category structure and removal/merge rules. When this mapping and the app-structure contract conflict, the app-structure contract wins for visible UI.

Settings controls may represent desired behavior, display policy or safe interface visibility, but they must not imply playback, streaming, provider auth, filesystem/cache mutation, Android shell behavior or persistence.

## Rule: What becomes a setting

A Core concept may become a setting only if it represents:

- user preference;
- display choice;
- default behavior;
- policy mode;
- safe local control;
- app-like backup/restore flow choice;
- practical advanced preference.

## Rule: What does not become a setting

Do not turn these into Settings controls:

- content collections;
- library categories;
- current state snapshots;
- result objects;
- preview outputs;
- health/readiness badges as direct user controls;
- queue/now playing state;
- favorites as a category;
- recently added/recently played as raw categories;
- cache operation results;
- provider discovery results;
- smart playlist previews;
- snapshot diffs;
- fake flow results.

## Approved visible Settings categories

Final approved visible Settings categories are defined by `settings-app-structure.md`:

- Interface
- Library
- Playback
- Offline & Cache
- Media Sources
- Backup & Restore
- Advanced
- About

Do not include Radio, Smart Playlists, Queue, Now Playing, Favorites, Recently Added or Recently Played as top-level Settings categories for now.

Reason: these are content/player/library features or current state, not app settings.

## Legacy Core bucket mapping

Core analysis from Bloco 7D.2.1 used several technical buckets. They remain useful internally, but they no longer define visible root categories:

- Sources & Providers -> Media Sources.
- Audio Output & Quality -> Playback > Output and Playback > Audio Quality.
- Streaming & Network -> Offline & Cache, Playback > Decoding & Transcoding, and Advanced > Network.
- Offline, Cache & Storage -> Offline & Cache.
- Profiles & Backup -> Backup & Restore.
- Android & External Control -> not a root category; possible future media-button controls belong under Playback.
- Advanced diagnostics/lab concepts -> practical Advanced only.

## Current UI category status

Active in current UI:

- Interface: active controls.
- Media Sources: currently implemented under the older Sources & Providers name.
- Library: partial controls.
- Playback: partial controls.
- Offline & Cache: currently implemented under the older Offline, Cache & Storage name.
- Backup & Restore: currently implemented under the older Profiles & Backup name.
- About: partial status card.

Next UI block:

- Bloco 7D.2.3-I must refactor visible Settings to the app-like root and structure in `settings-app-structure.md`.
- Old Core-driven roots must be removed, merged or renamed.
- Smart Playlists remains retired from Settings UI.
- Advanced must stay practical and app-like.

Current active categories may be reorganized in Bloco 7D.2.3-I, but they must not expand into unsupported integration behavior.

## Internal bucket: Sources & Providers -> Media Sources

Core basis:

- media source identity;
- source availability;
- source capabilities;
- provider readiness;
- provider compatibility;
- provider boundary policies.

Allowed settings:

- active source display;
- preferred source behavior;
- show source badges;
- show source labels;
- source management entry point;
- sync status when supported by the local source flow.

Not settings:

- provider discovery result;
- source availability itself;
- provider readiness as visible Settings content;
- source capabilities as visible Settings content;
- login/auth;
- add server;
- network discovery;
- provider mutation.

Status:

- Current UI: partial.
- Integration: not implemented.

## Category: Library

Core basis:

- browse/search;
- filters;
- sort;
- recently added/recently played view states;
- favorites view state;
- readiness/health badges.

Allowed settings:

- default sort order;
- search scope;
- show source badges;
- prefer lossless labels;
- show folders;
- show compilations;
- hide empty categories;
- Recently Added mode fixed as Tracks-only for current product direction.

Not settings:

- Favorites;
- Recently Added as raw category;
- Recently Played as raw category;
- Artists;
- Albums;
- Songs;
- Genres;
- Playlists;
- Library health;
- Library readiness.

Important: Favorites is a library feature/view, not a setting. Recently Added is currently tracks-only by product decision.

## Category: Playback

Core basis:

- playback intents;
- queue operation intents;
- queue mode/repeat/shuffle state;
- now playing state;
- resume/unavailable media models.

Allowed settings:

- default repeat mode;
- default shuffle behavior;
- resume playback behavior;
- seek step duration;
- queue behavior;
- play-next behavior;
- unavailable media handling.

Not settings:

- current queue state;
- current now playing state;
- playback position;
- playback intent result;
- queue operation result.

## Internal bucket: Audio Output & Quality -> Playback

Core basis:

- gapless;
- loudness normalization;
- ReplayGain awareness;
- crossfade;
- fade;
- bit-perfect;
- USB DAC;
- exclusive output;
- route/device readiness;
- sample-rate/bit-depth/format support.

Allowed settings:

- gapless playback desired behavior;
- loudness normalization;
- ReplayGain mode;
- crossfade;
- fade behavior;
- prefer bit-perfect;
- prefer USB DAC when available;
- prefer exclusive output;
- sample-rate handling;
- format preference.

Not settings:

- actual output readiness state;
- actual device status;
- bit-perfect claim;
- USB DAC control.

Important: These are desired policies until playback/audio output exists.

## Internal bucket: Streaming & Network -> Offline & Cache / Playback / Advanced

Core basis:

- stream quality preference;
- bitrate limit;
- bandwidth budget;
- quality fallback;
- offline quality policy;
- transcoding policy;
- network condition/policy.

Allowed settings:

- stream quality preference;
- automatic quality;
- prefer original quality;
- bitrate limit;
- data saver behavior;
- metered network behavior;
- transcoding preference;
- offline quality preference.

Not settings:

- current network condition result;
- quality decision result;
- transcoding decision result.

## Internal bucket: Offline, Cache & Storage -> Offline & Cache

Core basis:

- offline availability;
- cache policy;
- cache eligibility;
- storage budget;
- storage pressure;
- cleanup policy;
- confirmation state.

Allowed settings:

- cache policy mode;
- storage budget preference;
- cleanup policy;
- require confirmation before cleanup;
- prefer offline media;
- offline quality preference.

Not settings:

- pending cache operation;
- cache operation result;
- cache eligibility result;
- storage pressure state as editable setting;
- actual download/delete.

## Retired Category: Smart Playlists

Core basis:

- smart playlist rules;
- smart mix;
- saved filters;
- sort rules;
- limits;
- metadata handling.

Allowed settings:

- default smart playlist limit;
- default smart mix strategy;
- default saved filter sort;
- allow missing metadata in smart rules;
- smart playlist preview behavior.

Not settings:

- smart playlist preview result;
- saved filter preview result;
- evaluation result;
- matched items.

## Internal bucket: Profiles & Backup -> Backup & Restore

Core basis:

- user profiles;
- active profile;
- preferences;
- backup/restore plans/previews;
- restore conflicts;
- safety checks.

Allowed settings:

- create backup entry point;
- restore from backup entry point;
- include/restore choices inside the relevant flow;
- restore conflict behavior inside restore flow if later needed.

Not settings:

- backup result;
- restore result;
- restore conflict object itself;
- static Included data root content;
- active profile;
- profile scope;
- filesystem backup/restore.

## Internal bucket: Android & External Control -> removed as root

Core basis:

- Android boundary contracts;
- MediaSession;
- Android Auto;
- notifications;
- lock-screen;
- headset/Bluetooth controls;
- foreground service;
- storage permissions.

Allowed settings:

- no visible root category for now;
- possible future headset/notification controls only under Playback > Media Buttons if designed as normal app settings.

Not settings:

- Android SDK integration;
- MediaSession implementation;
- Android Auto implementation;
- notification implementation;
- foreground service controls as visible Settings content.

Status: Limited.

## Category: Advanced

Core basis:

- snapshots;
- fake flows;
- redaction policy;
- diagnostics;
- provider boundary policies;
- automation safety.

Allowed settings:

- debug mode;
- rebuild library index;
- compact local index;
- treat Wi-Fi as metered;
- treat VPN as metered.

Not settings:

- fake flow result;
- snapshot diff output;
- raw debug dumps in normal UI.
- Visual Lab;
- Core diagnostics;
- provider boundary warnings;
- snapshot redaction;
- automation safety;
- strict mock mode;
- mock flow visibility.

## Category: About

Should show:

- Aria;
- version;
- library engine;
- licenses;
- credits.

Should not show app limitations as user-facing copy.

## Current UI implementation target

Define the next implementation block target from the internal Core mapping.

Implementation note: Bloco 7D.2.2-I implemented a filtered Core-mapped category hub. Bloco 7D.2.3-S supersedes that visible root with the app-like structure in `settings-app-structure.md`. Smart Playlists remains retired from the Settings tab set. Recently Added remains tracks-only info, Favorites remains excluded from Settings controls, and internal controls should be translated into app-facing settings names.

Settings root hub should show:

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

Controls may be limited, but visible copy must remain app-facing.

## Explicit exclusions for next UI block

Do not add as Settings category:

- Favorites
- Recently Added
- Recently Played
- Radio, for now
- Queue as top-level category
- Now Playing as top-level category
- Library Health
- Provider Discovery
- Snapshots
- Fake Flows

Some internal concepts can inform practical Advanced controls, but they must not appear as visible Core or diagnostics language.
