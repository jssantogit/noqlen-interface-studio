# Aria Settings Visual Guide

## Purpose

This guide defines how Aria Settings should look and behave visually. It complements `settings-core-mapping.md`.

Core mapping defines what appears in Settings. This visual guide defines how those approved categories and controls are presented. Implementation must follow both documents.

## Visual principles

- Settings is a structured control center, not a generic menu.
- Root is a category hub, not a long toggle list.
- Important player-facing areas get stronger visual weight.
- Limited areas must look secondary, not equally prominent.
- Controls must match semantics: toggles for boolean preferences, segmented controls for mode choices, info cards for status, action buttons for actions.
- No Portuguese copy.
- No `Preview` as a primary visible label.
- No generic rows everywhere.

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
- Sources & Providers
- Library
- Playback
- Audio Output & Quality

Secondary group:

- Streaming & Network
- Offline, Cache & Storage
- Profiles & Backup

System / Lab group:

- Android & External Control
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
- Sources & Providers
- Library
- Playback
- Audio Output & Quality

Secondary / policy:

- Streaming & Network
- Offline, Cache & Storage
- Profiles & Backup

System / planned:

- Android & External Control
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

Sources & Providers:

- status card first.
- active source visible.
- provider readiness as display only.
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

- audiophile-oriented.
- bit-perfect/USB DAC/exclusive output must be desired policies, not active device claims.
- format/sample rate controls are policy controls.

Streaming & Network:

- quality/network/transcoding policies.
- show as limited if no streaming feature exists.

Offline, Cache & Storage:

- policy/confirmation controls.
- no file manager look.
- no storage path.
- no delete/download implication.

Smart Playlists:

- retired from the Settings tab set in Bloco 7D.2.2-I.
- if reintroduced later, it must remain rules/defaults only and not preview results.

Profiles & Backup:

- profile scope and backup policy only.
- backup/restore as review action.

Android & External Control:

- limited category.
- should look secondary.
- no Android integration claim.

Advanced:

- diagnostics/lab.
- should not dominate normal Settings.

About:

- info-only.
- limitations and status.

## Forbidden visual patterns

Explicitly forbidden:

- one generic `SettingsRow` for every item;
- one giant scroll of toggles on root;
- every Core model as a category;
- Favorites as Settings category;
- Recently Added as Settings category;
- Queue as top-level Settings category;
- Now Playing as top-level Settings category;
- Radio as top-level Settings category for now;
- cards so large that only two categories fit;
- repeated limitation text in every row;
- planned features styled as active working features;
- settings that imply playback/streaming/cache/provider behavior.

## Implementation target for next block

Implementation note: Root hub and internal pages were implemented in Bloco 7D.2.2-I. Smart Playlists was retired from the Settings tab set. Internal controls were tightened toward Core policy/preference terms, and the generic root toggle wall was avoided.

Bloco 7D.2.2-I must implement:

- root category hub;
- internal pages;
- filtered categories from `settings-core-mapping.md`;
- visual hierarchy from `settings-visual-guide.md`;
- existing source/settings behavior preserved;
- local state only;
- local state only.

It must not:

- touch playback overlays;
- touch Library views;
- touch details;
- touch mini player/nav;
- add integration.
