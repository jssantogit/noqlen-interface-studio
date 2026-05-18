# Forge Review Progress and Interaction Closure Audit

Block: Bloco 3.4.4 — Forge Review Progress Flows and Interaction Closure.

Tool Mode: combo.

Reference used: `docs/references/forge/forge_review_redesign.png`.

## Scope

- Add polished progress flows for every apply/fix action in Forge Review.
- Audit all visible Review interactions and close remaining gaps.
- Preserve the All / Artwork / Lyrics / Metadata architecture and Metadata subfilters.
- Do not start Forge Activity interactions, Aria or Flux work.

## Implementation Summary

### Progress Component

- Created `src/apps/forge/components/ForgeProgressSheet.tsx`:
  - Reusable progress flow sheet with step list, animated progress indicator and result state.
  - Uses `setTimeout` with deterministic ~650ms per step for local UI simulation only.
  - Shows source/provider badge when relevant.
  - Result state displays success icon, completion message, source badge and a `Done` button.
  - Matches Forge dark premium visual system: warm charcoal gradient, soft peach-orange accents, no generic loaders.

### Actions Covered by Progress

1. **Review safe fixes** (All summary CTA) — confirmation dialog → progress: Preparing safe fixes / Applying local mock updates → complete.
2. **Apply artwork** (Artwork tab and item overview) — comparison sheet → progress: Preparing artwork update / Replacing mock artwork → complete.
3. **Apply lyrics** (Lyrics tab and item overview) — lyrics preview → progress: Preparing lyrics / Updating mock lyrics → complete.
4. **Apply synced** (Lyrics / unsynced rows) — lyrics preview → progress: Preparing synced lyrics / Updating mock LRC → complete.
5. **Apply tags** (Metadata / Tags) — readable field-by-field preview → progress: Preparing tag update / Applying mock tags → complete.
6. **Apply identity** (Metadata / Identity) — protected field preview → progress: Validating identity choice / Applying protected mock identity → complete.
7. **Choose match** (Metadata / Identity conflicts) — match selection preview → progress: Resolving mock match → complete.
8. **Apply release data** (Metadata / Release) — release preview → progress: Preparing release metadata / Applying mock release fields → complete.
9. **Apply audio data** (Metadata / Audio) — audio preview → progress: Preparing audio analysis / Applying mock audio metadata → complete.
10. **Ignore item** (item overview and detail sheets) — confirmation/reason → progress: Marking item ignored → complete.
11. **Apply selected** (contextual selection bar) — confirmation → progress: Preparing selected fixes / Applying mock changes → complete.
12. **Ignore selected** (contextual selection bar) — reason sheet → progress: Marking items ignored → complete.

### All Item Overview Closure

- Overview sheet already opened from All row taps.
- Grouped fix cards render for Artwork, Lyrics, Metadata / Tags, Metadata / Identity, Metadata / Release and Metadata / Audio.
- Each card shows summary, source badge and a clear action button that routes to the correct preview sheet.
- `Apply safe fixes` now shows confirmation → progress → complete.
- `Ignore item` now shows progress → complete.
- `Close` dismisses the overview sheet.
- No action routes to the wrong tab.

### Sort Behavior

- Sort sheet opens from `Sort: {label}` control.
- Shows active option with checkmark.
- Applies selected sort and updates visible row order deterministically.
- Updates label after selection.
- Reset to Priority works.
- Closes correctly.
- Options available: Priority, Most fixes, Needs review first, Artwork first, Lyrics first, Metadata first, Title A-Z, Recently found.

### Tab and Filter Closure

- Main tabs All / Artwork / Lyrics / Metadata all switch correctly with clear active states.
- Metadata second-level filters Tags / Identity / Release / Audio all switch correctly.
- Row count updates per filter.
- No stale sheet remains open when switching tabs.
- Home navigation preserved:
  - Review Now → Review / All
  - Missing lyrics → Review / Lyrics
  - Better covers → Review / Artwork
  - Missing genres → Review / Metadata / Tags

### Row and Chevron Closure

- All tab row tap opens item repair overview.
- Artwork row tap opens cover comparison sheet.
- Lyrics row tap opens lyrics preview sheet.
- Metadata row tap opens appropriate metadata preview.
- Chevron is inside the same clickable row button — no dead chevrons.
- Checkbox toggles selection independently.

### Selection / Contextual Action Result

- Checkboxes exist and toggle selected state.
- Contextual bar appears only when items are selected.
- Actions: Apply selected, Ignore, Clear selection (implicit via cancel/dismiss).
- Apply selected shows confirmation → progress → complete.
- Ignore selected shows reason sheet → progress → complete.
- Selection count updates correctly.

### Metadata Preview Readability Result

- `ForgeMetadataDiffSheet` updated to support `afterChips` for suggested values.
- Tags preview shows separate rows: Genre, Mood, Style, Last.fm Tags.
- Each row shows Current and Suggested with wrapping text.
- Suggested values render as chips where appropriate (Genre, Mood, Style).
- Identity preview shows: Album MBID, Artist MBID, Release Group MBID, ISRC, AcoustID.
- Release preview shows: Label, Country, Catalog number, Barcode, Edition, Release type.
- Audio preview shows: BPM, Key, ReplayGain, Energy, Danceability.
- Protected field note visible on Identity rows.

### Provider/Source Badge Coverage

- Badges visible in: preview/apply sheets, progress sheets, item overview cards.
- Artwork: Discogs.
- Lyrics: Lyrics provider mock.
- Synced lyrics: LRC mock.
- Tags: Last.fm.
- Identity: MusicBrainz / AcoustID.
- Release: Discogs / MusicBrainz.
- Audio: Audio analysis mock.
- Identity conflict: MusicBrainz.

### Local Mock State Update Behavior

- After progress completes, item status updates to `fixed` or `ignored` locally.
- Fixed/ignored items are removed from the pending queue.
- Session summary counts (`sessionFixed`, `sessionIgnored`) increment.
- Toast confirms the action (e.g., "Artwork updated in mock preview").
- No global persistence; all state is local React state only.

## Remaining Review Gaps

- Overview grouped fix content remains static mock data, not generated from a backend.
- File info remains intentionally excluded from the main Review surface.
- Activity interactions remain unstarted by design.
- Library interactions remain unstarted by design.
- State coverage for empty/loading/error/all-clear inside Review is partially present but could be expanded in a future batch.

## Mock-Only Safety Result

- No real music files are edited.
- No real metadata, artwork or lyrics are edited.
- No real folders are scanned.
- No backend, Anchor Core, Navidrome, fetch/axios behavior, FileReader, filesystem, child process, auth, analytics or secret storage was added.
- All progress timing uses local `setTimeout` only; no network calls.
- All state changes remain local React mock state.

## Raw Evidence Summary

- Inspected current Forge Review implementation, preview sheets and static mock data before editing.
- Created checklist of all visible Review interactions.
- Implemented `ForgeProgressSheet` with deterministic step timing.
- Wrapped every apply/fix action in ForgePreview and ForgeReview with progress flow.
- Improved metadata preview readability with additional fields and chip rendering.
- Verified build and lint pass after implementation.
- Browser validation skipped per user request due to sandboxed environment limitations (Vite dev server `uv_interface_addresses` error).
- Safety grep confirms no fetch/axios/fs/child_process/FileReader in app behavior.
