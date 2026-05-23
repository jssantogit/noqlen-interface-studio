# Aria Settings Core Mapping Contract

## Purpose

Aria Settings must be based on Aria Core-supported capabilities, policies and preference-like concepts. Settings should not expose arbitrary UI ideas that do not map to Core.

Settings must remain mock-only and non-persistent until real integration exists. A Settings control may represent desired behavior, display policy or safe interface visibility, but it must not imply real playback, streaming, provider auth, filesystem/cache mutation, Android shell behavior or persistence.

## Rule: What becomes a setting

A Core concept may become a setting only if it represents:

- user preference;
- display choice;
- default behavior;
- policy mode;
- safe mock control;
- integration readiness visibility toggle;
- profile/preference scope.

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

## Approved Settings categories

Final approved Settings categories:

- Sources & Providers
- Library
- Playback
- Audio Output & Quality
- Streaming & Network
- Offline, Cache & Storage
- Smart Playlists
- Profiles & Backup
- Android & External Control
- Advanced
- About

Do not include Radio as a top-level Settings category for now.

Reason: Radio is a content/player feature. Settings may later include radio metadata, artwork or favorite preferences only if UI gains a Radio feature.

## Current UI category status

Active in current UI:

- Interface: active mock controls.
- Sources & Providers: partial active source card and source sheet entry point.
- Library: partial mock controls.
- Playback: partial mock controls.
- About: partial mock status card.

Planned or mock-only for later UI blocks:

- Audio Output & Quality: planned mock policies only.
- Streaming & Network: planned mock policies only.
- Offline, Cache & Storage: planned mock policies only.
- Smart Playlists: planned mock policies only.
- Profiles & Backup: planned mock policies only.
- Android & External Control: planned mock policies only.
- Advanced: planned diagnostics/developer policy area only.

Current active categories may be reorganized in Bloco 7D.2.2, but they must stay mock-only and must not expand into unsupported real integration behavior.

## Category: Sources & Providers

Core basis:

- media source identity;
- source availability;
- source capabilities;
- provider readiness;
- provider compatibility;
- provider boundary policies.

Allowed settings:

- active source display;
- preferred source behavior, mock-only;
- show source badges;
- show provider readiness;
- provider compatibility display;
- source capability visibility.

Not settings:

- provider discovery result;
- source availability itself;
- real login/auth;
- real add server;
- real network discovery;
- real provider mutation.

Status:

- Current UI: partial/mock.
- Real integration: not implemented.

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

## Category: Audio Output & Quality

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
- bit-depth handling;
- format preference.

Not settings:

- actual output readiness state;
- actual device status;
- real bit-perfect claim;
- real USB DAC control.

Important: These are desired/mock policies until real playback/audio output exists.

## Category: Streaming & Network

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

## Category: Offline, Cache & Storage

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

## Category: Smart Playlists

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

## Category: Profiles & Backup

Core basis:

- user profiles;
- active profile;
- preferences;
- backup/restore plans/previews;
- restore conflicts;
- safety checks.

Allowed settings:

- active profile;
- profile-specific preferences;
- backup scope;
- restore conflict behavior;
- backup safety confirmation.

Not settings:

- backup result;
- restore result;
- restore conflict object itself;
- real filesystem backup/restore.

## Category: Android & External Control

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

- Android Auto visibility, planned/mock;
- MediaSession controls, planned/mock;
- notification controls, planned/mock;
- lock-screen controls, planned/mock;
- headset/Bluetooth controls, planned/mock;
- foreground service behavior, planned/mock.

Not settings:

- real Android SDK integration;
- real MediaSession implementation;
- real Android Auto implementation;
- real notification implementation.

Status: Planned/mock-only.

## Category: Advanced

Core basis:

- snapshots;
- fake flows;
- redaction policy;
- diagnostics;
- provider boundary policies;
- automation safety.

Allowed settings:

- show core diagnostics;
- strict mock mode;
- snapshot redaction policy;
- fake flow visibility;
- automation safety level;
- developer overlay.

Not settings:

- fake flow result;
- snapshot diff output;
- raw debug dumps in normal UI.

## Category: About

Should show:

- Aria Core status;
- interface visual mock status;
- no real playback;
- no real streaming;
- no real provider auth;
- no real filesystem/cache mutation;
- no Android shell implementation;
- no persistence unless explicitly implemented later.

## Current UI implementation target

Define the next implementation block target.

Settings root hub should show:

Settings:

- Interface
- Sources & Providers
- Library
- Playback
- Audio Output & Quality
- Streaming & Network
- Offline, Cache & Storage

Advanced:

- Smart Playlists
- Profiles & Backup
- Android & External Control
- Advanced
- About

Controls may be mock-only and limited.

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

Some of these can appear inside Advanced/About as info or diagnostics, not primary settings.
