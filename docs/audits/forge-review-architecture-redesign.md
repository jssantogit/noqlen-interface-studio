# Forge Review Architecture Redesign Audit

Block: Bloco 3.4.2 — Forge Review Architecture Redesign.

Tool Mode: combo.

Reference used: `docs/references/forge/forge_review_redesign.png`.

## Scope

- Reworked Forge Review to the scalable main architecture: All / Artwork / Lyrics / Metadata.
- Moved Identity under Metadata and kept Files out of the main Review tabs.
- Added Metadata subfilters: Tags / Identity / Release / Audio.
- Preserved Forge Home, Library and Activity rendering and did not start Forge Activity interactions.

## Implementation Summary

- Added static redesigned Review proposal data in `src/apps/forge/forgeMockData.ts`.
- Replaced the old grouped Review layout in `src/apps/forge/components/ForgeReview.tsx` with item-first queues, summary cards, main tabs and Metadata subfilters.
- Replaced the permanent heavy top batch action bar with `Review safe fixes` plus a compact contextual selection bar.
- Updated `ForgePreview` to route Home cards into Review / All, Lyrics, Artwork and Metadata / Tags.
- Reused existing mock-only detail sheets for artwork, lyrics and metadata preview flows.
- Updated `ForgeCoverComparisonSheet` so artwork comparison shows current/suggested resolution rather than confidence as primary data.
- Updated `ForgeMetadataDiffSheet` to support specific apply labels.

## Review Architecture

- All: summary card with `17 items need review`, `42 proposed fixes`, `9 need manual review`, top areas and `Review safe fixes` CTA.
- Artwork: `12 artwork fixes`, `8 album covers`, `3 artist images`, `1 missing cover`; rows show current cover or missing-cover facts and one `Apply artwork` affordance.
- Lyrics: `8 lyrics fixes`, `5 missing`, `2 incomplete`, `1 unsynced`; rows open mock placeholder lyric previews before applying.
- Metadata: `22 metadata fixes`, `14 safe`, `8 need review`; Tags, Identity, Release and Audio filters control rows.

## Status Model

- Safe.
- Review.
- Protected.
- Conflict.
- Applied.
- Ignored.
- Read-only.

Read-only is reserved for file info and is not exposed as a main Review tab.

## Behavior Notes

- `Review safe fixes` opens confirmation before local session state updates; mixed rows stay visible when manual-review work remains.
- `Apply artwork` opens comparison before local mock apply.
- Lyrics actions open preview/review sheets and use fake placeholder lyrics only.
- Metadata actions are specific: `Apply tags`, `Apply identity`, `Choose match`, `Apply release data`, `Apply audio data`.
- Protected identity fields are represented in Metadata and require explicit preview confirmation.
- Conflicts use `Choose match` only.

## Mock-Only Safety Result

- No real music files are edited.
- No real metadata, artwork or lyrics are edited.
- No real folders are scanned.
- No backend, Anchor Core, Navidrome, fetch/axios behavior, FileReader, filesystem, child process, auth, analytics or secret storage was added.
- All state changes remain local React mock state.

## Interactions Preserved

- Home `Review now` opens Review / All.
- Home missing lyrics card opens Review / Lyrics.
- Home better covers card opens Review / Artwork.
- Home missing genres card opens Review / Metadata / Tags.
- Existing toast, confirm dialog and bottom-sheet infrastructure remain in use.
- Forge Home, Library and Activity still render.
- Anchor, Aria and Flux remain outside this block.

## Remaining Gaps

- File info is intentionally not represented in the main Review screen; it remains future read-only item-detail content.
- Metadata previews are concise mock diffs rather than exhaustive field-by-field editors.
- Activity interactions remain unstarted by design.

## Raw Evidence Summary

- Confirmed reference exists with `test -f docs/references/forge/forge_review_redesign.png`.
- Inspected current Forge implementation, interaction map, screen contracts and visual targets before editing.
- Initial source build passed after implementation.
- Final lint/build/test, safety grep, browser validation and repo hygiene evidence are recorded in the handoff for this block.
