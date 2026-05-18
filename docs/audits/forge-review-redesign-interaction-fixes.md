# Forge Review Redesign Interaction Fixes Audit

Block: Bloco 3.4.3 — Forge Review Redesign Interaction Fixes.

Tool Mode: combo.

Reference used: `docs/references/forge/forge_review_redesign.png`.

## Scope

- Fix missing/incorrect interactions introduced by the Bloco 3.4.2 Review redesign.
- Preserve the All / Artwork / Lyrics / Metadata architecture and Metadata subfilters.
- Do not start Forge Activity interactions, Aria or Flux work.

## Implementation Summary

- Added an All item repair overview sheet inside `ForgeReview`.
- Added grouped fix cards for Artwork, Lyrics, Metadata / Tags, Metadata / Identity, Metadata / Release and Metadata / Audio.
- Routed overview actions to existing artwork, lyrics and metadata preview sheets.
- Implemented a local sort sheet with deterministic queue ordering.
- Removed Safe / Review counters from All rows.
- Reworked metadata preview rows to show field-by-field Current and Suggested values without truncation.
- Added provider/source badges to artwork, lyrics and metadata preview flows.

## Behavior Fixed

- All item click no longer opens Artwork directly.
- All item click opens `Item repair overview` with all proposed fix groups.
- `Sort: Priority` opens a bottom sheet and updates the visible queue order.
- Metadata previews now show readable separate fields such as Genre, Mood, Style, Album MBID, Label, BPM and ReplayGain.
- All row display now shows title, artist, proposed fix count, compact chips and chevron only; Safe / Review row counters are removed.

## Provider Badges

- Artwork: Discogs.
- Lyrics: Lyrics provider mock.
- Tags: Last.fm.
- Identity: MusicBrainz / AcoustID.
- Release: Discogs / MusicBrainz.
- Audio: Audio analysis mock.

## Mock-Only Safety Result

- No real music files are edited.
- No real metadata, artwork or lyrics are edited.
- No real folders are scanned.
- No backend, Anchor Core, Navidrome, fetch/axios behavior, FileReader, filesystem, child process, auth, analytics or secret storage was added.
- All state changes remain local React mock state.

## Remaining Gaps

- Overview grouped fix content is static mock data, not generated from a backend or library scan.
- File info remains intentionally excluded from the main Review surface.
- Activity interactions remain unstarted by design.

## Raw Evidence Summary

- Inspected current Forge Review implementation, preview sheets and static mock data before editing.
- Build and lint passed after implementation.
- Final validation, browser checks, safety grep and hygiene evidence are recorded in the handoff for this block.
