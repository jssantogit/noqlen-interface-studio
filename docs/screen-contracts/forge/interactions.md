# Forge Interaction Contract

This document defines every planned Forge interaction with trigger, resulting UI, mock state changes, data used, forbidden real behavior and completion status.

All behavior remains mock-only. No real metadata, files, network or backend behavior is permitted.

---

## Home

### HN-1: Review Now

- **Trigger:** tap the warm orange `Review now` CTA on Forge Home.
- **Resulting UI:** active tab changes to Review; Review scrolls to top.
- **Mock state changes:** `activeTab` set to `'review'`.
- **Data used:** none.
- **Forbidden real behavior:** no server scan, no library query, no backend call.
- **Status:** implemented (switches to Review tab, resets filter to all, shows toast).

### HN-2: Missing Lyrics Card

- **Trigger:** tap the `2 tracks are missing lyrics` attention card.
- **Resulting UI:** Review tab opens on Lyrics.
- **Mock state changes:** `activeTab = 'review'`, `reviewFilter = 'lyrics'`.
- **Data used:** static `reviewGroups`.
- **Forbidden real behavior:** no lyric search, no backend query.
- **Status:** implemented (switches to Review with lyrics filter and toast).

### HN-3: Better Covers Card

- **Trigger:** tap the `4 albums need better covers` attention card.
- **Resulting UI:** Review tab opens on Artwork.
- **Mock state changes:** `activeTab = 'review'`, `reviewFilter = 'artwork'`.
- **Data used:** static `reviewGroups`.
- **Forbidden real behavior:** no cover search, no download.
- **Status:** implemented (switches to Review with covers filter and toast).

### HN-4: Missing Genres Card

- **Trigger:** tap the `3 songs are missing genres` attention card.
- **Resulting UI:** Review tab opens on Metadata with Tags active.
- **Mock state changes:** `activeTab = 'review'`, `reviewFilter = 'metadata'`, `metadataFilter = 'tags'`.
- **Data used:** static `reviewGroups`.
- **Forbidden real behavior:** no genre lookup, no backend call.
- **Status:** implemented (switches to Review with genres filter and toast).

### HN-5: Settings Gear

- **Trigger:** tap the gear icon in the Home header.
- **Resulting UI:** `ForgeSettingsSheet` opens as a bottom sheet overlay.
- **Mock state changes:** `activeSheet = 'settings'`.
- **Data used:** static settings options.
- **Forbidden real behavior:** no real app or OS settings read/write.
- **Status:** implemented (opens ForgeSettingsSheet with local toggles and save toast).

### HN-6: Safety Note Card

- **Trigger:** tap the shield-check safety note card.
- **Resulting UI:** `ForgeSafetyNoteSheet` opens as a bottom sheet overlay.
- **Mock state changes:** `activeSheet = 'safetyNote'`.
- **Data used:** static copy.
- **Forbidden real behavior:** none.
- **Status:** implemented (opens ForgeSafetyNoteSheet with safety explainer sections).

---

## Review

### RV-1: Review Architecture Tabs

- **Trigger:** tap All, Artwork, Lyrics or Metadata segmented tab.
- **Resulting UI:** Review switches between the scalable main surfaces; Metadata also exposes Tags, Identity, Release and Audio subfilters.
- **Mock state changes:** `reviewFilter` updates locally; selection clears when switching tabs.
- **Data used:** static `forgeReviewItems`, `forgeArtworkReviewItems`, `forgeLyricsReviewItems`, `forgeMetadataReviewItems`.
- **Forbidden real behavior:** no backend, file scan, metadata write or network call.
- **Status:** implemented.

### RV-2: Review Safe Fixes

- **Trigger:** tap `Review safe fixes` in the All summary card.
- **Resulting UI:** `ForgeConfirmDialog` opens for safe proposals in the active view.
- **Mock state changes:** confirmed safe proposals increment `sessionFixed`; mixed rows remain visible when manual review proposals still exist; toast shown.
- **Data used:** static redesigned Review queues and `itemStatuses`.
- **Forbidden real behavior:** no metadata write, no file edit, no lyric fetch, no artwork download.
- **Status:** implemented.

### RV-3: Contextual Apply Selected

- **Trigger:** select one or more row checkboxes, then tap `Apply selected` in the compact contextual bar.
- **Resulting UI:** `ForgeConfirmDialog` opens for selected rows.
- **Mock state changes:** selected rows move to `status = 'fixed'`; selected set clears; `sessionFixed` increments; toast shown.
- **Data used:** `selected` Set, redesigned Review queues, `itemStatuses`.
- **Forbidden real behavior:** same as RV-2.
- **Status:** implemented.

### RV-4: Ignore Selected

- **Trigger:** select one or more row checkboxes, then tap `Ignore` in the compact contextual bar.
- **Resulting UI:** `ForgeBottomSheet` opens as an ignore reason sheet with optional reason chips.
- **Mock state changes:** selected items move to `status = 'ignored'`; selected set clears; `sessionIgnored` increments; toast shown.
- **Data used:** `selected` Set.
- **Forbidden real behavior:** no file deletion, no metadata deletion.
- **Status:** implemented.

### RV-5: Item Checkbox

- **Trigger:** tap the checkbox on a review item row.
- **Resulting UI:** checkbox toggles checked/unchecked state; contextual bar appears only while selection exists.
- **Mock state changes:** `selected` Set add/remove.
- **Data used:** item id.
- **Forbidden real behavior:** none.
- **Status:** implemented.

### RV-6: Lyrics Item Tap

- **Trigger:** tap a lyrics review item outside the checkbox.
- **Resulting UI:** `ForgeLyricsDetailSheet` opens as a bottom sheet.
- **Shows:** song title, artist, album, metadata rows (Source: Studio mock suggestion, Confidence: High, Status: Ready to apply), mock lyrics preview using placeholder text only (no real/copyrighted lyrics), `Preview changes` link.
- **Actions:** `Apply lyrics`, `Review lyrics` or `Apply synced` affordances open the same mock lyrics preview; sheet actions set fixed/ignored locally.
- **Mock state changes:** item status becomes `fixed` or `ignored`; toast confirms; item removed from pending queue.
- **Data used:** `reviewGroups` item.
- **Forbidden real behavior:** no lyric API call, no lyric download, no file write, no copyrighted lyrics.
- **Status:** implemented.

### RV-7: Artwork Item Tap / Apply Artwork

- **Trigger:** tap an artwork review item or its `Apply artwork` affordance.
- **Resulting UI:** `ForgeCoverComparisonSheet` opens as a bottom sheet.
- **Shows:** album title, artist, side-by-side current/suggested cover placeholders, current resolution, suggested resolution and `Preview changes` link.
- **List rule:** Review list rows show current-cover or missing-cover facts only; no confidence as primary artwork data and no list-level comparison.
- **Actions:** `Apply` (sets fixed), `Keep current` (sets ignored), `Ignore` (sets ignored), `Cancel`, `Preview changes` (navigates to `ForgeMetadataDiffSheet`).
- **Mock state changes:** item status becomes `fixed` or `ignored`; toast confirms; item removed from pending queue.
- **Data used:** `reviewGroups` item.
- **Forbidden real behavior:** no cover download, no image replacement, no file write.
- **Status:** implemented.

### RV-8: Metadata Item Tap / Specific Apply Actions

- **Trigger:** tap a Metadata row or its specific action affordance.
- **Resulting UI:** `ForgeMetadataDiffSheet` opens as a bottom sheet.
- **Shows:** current vs suggested values for Tags, Identity, Release or Audio.
- **Actions:** `Apply tags`, `Apply identity`, `Choose match`, `Apply release data` or `Apply audio data` depending on row type.
- **Mock state changes:** item status becomes `fixed`; toast confirms; item removed from pending queue.
- **Data used:** static `forgeMetadataReviewItems`.
- **Forbidden real behavior:** no genre API lookup, no metadata write.
- **Status:** implemented.

### RV-9: Review Covers from Library

- **Trigger:** `Review covers` action inside an album detail sheet.
- **Resulting UI:** navigates to Review tab with `reviewFilter = 'covers'`.
- **Mock state changes:** `activeTab = 'review'`, `reviewFilter = 'covers'`.
- **Data used:** album id.
- **Forbidden real behavior:** no backend call.
- **Status:** not implemented.

### RV-10: Status After Fix/Ignore

- **Trigger:** after RV-1, RV-2 or RV-3 completes.
- **Resulting UI:** fixed/ignored items are removed from the active pending queue; session summary card appears; empty queue state renders when no pending items remain.
- **Mock state changes:** item `status` updated; group may become empty; `sessionFixed`/`sessionIgnored` updated.
- **Data used:** item ids and group ids.
- **Forbidden real behavior:** none.
- **Status:** implemented.

---

## Library

### LB-1: Search

- **Trigger:** tap search icon or focus the search bar.
- **Resulting UI:** search field active; list filters in real time.
- **Mock state changes:** `query` string; filtered list derived from `query`.
- **Data used:** `artistData`, `albumData`, `songData`.
- **Forbidden real behavior:** no backend search, no filesystem scan.
- **Status:** partially implemented (static affordance; no live filtering).

### LB-2: Segmented Control

- **Trigger:** tap Artists, Albums or Songs segment.
- **Resulting UI:** list switches to the chosen section.
- **Mock state changes:** `section` state changes.
- **Data used:** none.
- **Forbidden real behavior:** none.
- **Status:** implemented.

### LB-3: Artist Row Tap

- **Trigger:** tap an artist row in Artists tab.
- **Resulting UI:** `ForgeLibraryDetailSheet` opens in artist mode.
- **Shows:** name, subtitle, genres, mood, Albums/Songs/Details tabs, related content.
- **Mock state changes:** `libraryDetail = { type: 'artist', id }`.
- **Data used:** `artistData`, `albumData`, `songData`.
- **Forbidden real behavior:** no backend query.
- **Status:** not implemented.

### LB-4: Album Row Tap

- **Trigger:** tap an album row in Albums tab.
- **Resulting UI:** `ForgeLibraryDetailSheet` opens in album mode.
- **Shows:** cover gradient, title, artist, year, genres, mood, track list.
- **Actions:** `Review album`.
- **Mock state changes:** `libraryDetail = { type: 'album', id }`.
- **Data used:** `albumData`.
- **Forbidden real behavior:** none.
- **Status:** not implemented.

### LB-5: Song Row Tap

- **Trigger:** tap a song row in Songs tab.
- **Resulting UI:** `ForgeLibraryDetailSheet` opens in song mode.
- **Shows:** title, artist, album, year, lyrics status, genres, mood, editable fields.
- **Actions:** `Review song`.
- **Mock state changes:** `libraryDetail = { type: 'song', id }`.
- **Data used:** `songData`.
- **Forbidden real behavior:** none.
- **Status:** not implemented.

### LB-6: Missing Metadata Badge Tap

- **Trigger:** tap the orange metadata badge on a library row.
- **Resulting UI:** navigates to Review tab filtered by the relevant issue type.
- **Mock state changes:** `activeTab = 'review'`, `reviewFilter` set by badge type.
- **Data used:** item note string.
- **Forbidden real behavior:** none.
- **Status:** not implemented.

### LB-7: Chevron Rows

- **Trigger:** tap the chevron on a library row.
- **Resulting UI:** opens the same detail sheet as the row body.
- **Mock state changes:** same as LB-3, LB-4 or LB-5.
- **Data used:** same as LB-3, LB-4 or LB-5.
- **Forbidden real behavior:** none.
- **Status:** not implemented.

### LB-8: Sort/Filter

- **Trigger:** tap optional sort/filter icon.
- **Resulting UI:** `ForgeFilterSheet` opens.
- **Options:** sort by name, year, artist; filter by metadata issues.
- **Mock state changes:** `librarySort`, `libraryFilter`.
- **Data used:** static options.
- **Forbidden real behavior:** none.
- **Status:** not implemented.

---

## Activity

### AC-1: Activity Card Tap

- **Trigger:** tap an activity card body.
- **Resulting UI:** `ForgeActivityDetailSheet` opens.
- **Shows:** title, subtitle, time, detail text, affected items, undo/done actions.
- **Mock state changes:** `activityDetailId = item.id`.
- **Data used:** `activityItems`.
- **Forbidden real behavior:** no real log read, no undo of real changes.
- **Status:** not implemented.

### AC-2: Summary Button

- **Trigger:** tap the `Summary` pill on an activity card.
- **Resulting UI:** same as AC-1.
- **Mock state changes:** same as AC-1.
- **Data used:** same as AC-1.
- **Forbidden real behavior:** same as AC-1.
- **Status:** not implemented.

### AC-3: Review Button

- **Trigger:** tap the `Review` pill on a `Library checked` or review-related activity card.
- **Resulting UI:** navigates to Review tab.
- **Mock state changes:** `activeTab = 'review'`.
- **Data used:** activity item type mapping.
- **Forbidden real behavior:** none.
- **Status:** not implemented.

### AC-4: Today / Yesterday Grouping

- **Trigger:** visual group headers.
- **Resulting UI:** groups remain static; future filter may collapse.
- **Mock state changes:** none currently.
- **Data used:** `time` field.
- **Forbidden real behavior:** none.
- **Status:** implemented (static grouping).

### AC-5: Activity Filters

- **Trigger:** tap filter icon in Activity header.
- **Resulting UI:** `ForgeFilterSheet` opens with type options.
- **Options:** All, Lyrics, Covers, Genres, Checks, Errors.
- **Mock state changes:** `activityFilter`.
- **Data used:** static options.
- **Forbidden real behavior:** none.
- **Status:** not implemented.

---

## Global / Shared

### GL-1: Toast

- **Trigger:** any action that needs lightweight feedback (fix applied, ignore reason chosen, search no results).
- **Resulting UI:** `ForgeToast` appears briefly at the top of the app viewport.
- **Mock state changes:** `toast` object with message and tone.
- **Data used:** static message strings.
- **Forbidden real behavior:** none.
- **Status:** implemented (ForgeToast rendered in ForgePreview overlay).

### GL-2: Confirm Dialog

- **Trigger:** destructive or batch actions (Fix selected, Fix all, Ignore selected).
- **Resulting UI:** `ForgeConfirmDialog` overlay with title, message, Confirm and Cancel.
- **Mock state changes:** confirmed actions proceed; canceled actions abort.
- **Data used:** action context.
- **Forbidden real behavior:** none.
- **Status:** implemented as foundation (ForgeConfirmDialog rendered in ForgePreview overlay).

### GL-3: Bottom Sheet

- **Trigger:** any secondary surface (settings, detail, filter, picker, comparison).
- **Resulting UI:** `ForgeBottomSheet` slides up from the bottom with backdrop.
- **Mock state changes:** `activeSheet` state.
- **Data used:** sheet type and payload.
- **Forbidden real behavior:** none.
- **Status:** implemented (ForgeBottomSheet used by ForgeSettingsSheet and ForgeSafetyNoteSheet).

### GL-4: Mock State Controls

- **Trigger:** inside `ForgeSettingsSheet`, a Studio-only section.
- **Resulting UI:** toggles for empty states, loading states, error states, all-clear states.
- **Mock state changes:** `forgeMockState` flags.
- **Data used:** static control definitions.
- **Forbidden real behavior:** none.
- **Status:** not implemented.

---

## Status Legend

- `not implemented` — no code exists for this interaction.
- `partial` — some UI exists but the full flow is not wired.
- `implemented` — interaction is fully wired and mock-safe.
- `deferred` — intentionally delayed to a later batch.
- `needs QA` — code exists but requires validation.
