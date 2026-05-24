# Aria Settings Visual Guide

## Purpose

This guide defines how Aria Settings should look and behave visually. It complements `settings-app-structure.md` and `settings-core-mapping.md`.

`settings-app-structure.md` defines the visible Settings root and category structure. `settings-core-mapping.md` remains internal grounding only. This visual guide defines how the approved app-like categories and controls are presented.

## Visual principles

- Settings is a structured control center, not a generic menu.
- Root is a category hub, not a long toggle list.
- Important player-facing areas get stronger visual weight.
- Limited areas must look secondary, not equally prominent.
- Controls must match semantics: toggles for boolean preferences, segmented controls for mode choices, info cards for status, action buttons for actions.
- No Portuguese copy.
- No `Preview` as a primary visible label.
- No generic rows everywhere.
- Visible Settings root now follows `settings-app-structure.md`.
- App-like structure supersedes Core-driven categories where they conflict.

## Root Settings hub layout

Root order:

Header:

- Title: `Aria Settings`
- Subtitle: `Player preferences`
- Compact status strip/card:
- Active source
- Interface status
- Local state

Primary group:

- Interface
- Library
- Playback
- Offline & Cache
- Media Sources

Tools group:

- Backup & Restore

System group:

- Advanced
- About

Important:

- Root should not show all toggles.
- Root should show categories only.
- Each category card opens an internal settings page.

## Category card visual rules

- Category cards are buttons.
- Left: icon badge.
- Center: title and one-line useful subtitle.
- Right: compact status chip, not large text.
- Cards must not all look equally urgent.
- Primary cards can use slightly stronger border/accent.
- Secondary cards use calmer surfaces.
- Limited cards use muted status chips such as `Local`, `Policy` or `Status`.
- Avoid chevrons if the whole card already reads as navigation, or use subtle chevron only.
- No giant cards.

## Category weights

Primary / active:

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

## Internal category page structure

Each internal page should have:

- compact internal back button;
- page title;
- one-line subtitle;
- optional status card;
- grouped controls;
- no giant vertical wall;
- no more than 2-3 groups per category.

Internal back returns to Settings root. Sheet close closes Settings entirely.

## Control semantics

Toggle:

- boolean preference.
- no chevron.
- visible switch state.

Segmented control:

- mode selection.
- 2-4 options.
- active state warm amber.

Info card:

- status/readiness/limitations.
- not clickable unless it has explicit action.

Action button:

- opens another sheet or triggers an action.
- examples: `Manage Source`, `Reset visual preferences`, `Review backup plan`.

Danger/blocked state:

- use restrained warning style.
- never imply destructive action is real.

## Category-specific visual notes

Interface:

- active and simple.
- visual preferences.
- should feel immediate.

Media Sources:

- status card first.
- active source visible.
- `Manage Source` action.

Library:

- display/browsing preferences only.
- must not include Favorites as setting.
- must not include Recently Added as category setting.
- Recently Added tracks-only decision appears as info, not editable mode.

Playback:

- behavior defaults.
- queue/repeat/shuffle/seek/resume.
- no current queue state.

Audio Output & Quality:

- no longer a root category.
- output and quality controls belong inside Playback.
- USB DAC/exclusive output must be desired policies, not active device claims.

Streaming & Network:

- no longer a root category.
- cache/download policies belong in Offline & Cache.
- decoding/transcoding policy belongs in Playback if exposed.
- metered network controls belong in Advanced.

Offline & Cache:

- policy/confirmation controls.
- no file manager look.
- no storage path.
- no delete/download implication.

Smart Playlists:

- retired from the Settings tab set in Bloco 7D.2.2-I.
- if reintroduced later, it must remain rules/defaults only and not preview results.

Backup & Restore:

- action-first page with Create backup and Restore from backup.
- included data appears only inside the chosen flow.

Android & External Control:

- no longer a root category.
- possible future media-button controls belong under Playback if they are designed as normal app settings.

Advanced:

- practical system tools.
- should not dominate normal Settings.

About:

- info-only.
- app details, licenses and credits.

## Forbidden visual patterns

Explicitly forbidden:

- one generic `SettingsRow` for every item;
- one giant scroll of toggles on root;
- every Core model as a category;
- Core-driven roots when they conflict with `settings-app-structure.md`;
- Favorites as Settings category;
- Recently Added as Settings category;
- Queue as top-level Settings category;
- Now Playing as top-level Settings category;
- Radio as top-level Settings category for now;
- Audio Output & Quality as top-level Settings category;
- Streaming & Network as top-level Settings category;
- Sources & Providers as top-level Settings category;
- Profiles & Backup as top-level Settings category;
- Android & External Control as top-level Settings category;
- Visual Lab as top-level Settings category;
- cards so large that only two categories fit;
- repeated limitation text in every row;
- planned features styled as active working features;
- settings that imply playback/streaming/cache/provider behavior.

## Implementation target for next block

Implementation note: Root hub and internal pages were implemented in Bloco 7D.2.2-I. Bloco 7D.2.3-S supersedes the Core-driven root with the app-like structure in `settings-app-structure.md`. Smart Playlists remains retired from the Settings tab set, and the generic root toggle wall remains forbidden.

Bloco 7D.2.3-I must implement:

- root category hub;
- internal pages;
- app-like categories from `settings-app-structure.md`;
- visual hierarchy from `settings-visual-guide.md`;
- existing source/settings behavior preserved;
- local state only.

It must not:

- touch playback overlays;
- touch Library views;
- touch details;
- touch mini player/nav;
- add integration.
