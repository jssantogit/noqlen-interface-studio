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
- **Resulting UI:** `ForgeSettingsSheet` opens as a bottom sheet overlay with 8 categories + API Keys.
- **Sections:**
  - Metadata Providers: provider cards with enable toggle, configure sheet, test mock action.
  - Tags & Metadata: behavior toggles, conflict policy, confidence, rewrite rule editor.
  - Artwork: embed, folder cover, confidence, front preference, max size.
  - Lyrics: synced, local, sidecar, cache, conflict review, custom endpoint.
  - Audio: ReplayGain, backend, LUFS, key detection, advanced limits.
  - Safety & Review: dry-run, confirmation, conflict behavior, auto-apply.
  - App Updates: version, channel, check/download/install mock flow.
  - Advanced: database auto-scan, enrich presets, verbosity.
  - API Keys: masked credential fields for 9 providers.
- **Mock state changes:** `activeSheet = 'settings'`; local `ForgeSettingsState` updated; unsaved changes tracked.
- **Data used:** `forgeSettingsCatalog`, `defaultForgeSettingsState`.
- **Forbidden real behavior:** no real app or OS settings read/write; no real credential storage; no real network calls.
- **Status:** implemented (full settings with categories, provider cards, rewrite rules, API keys, app update mock flow, save/reset progress).

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
- **Resulting UI:** `ForgeConfirmDialog` opens for safe proposals in the active view; on confirm, `ForgeProgressSheet` opens with steps: Preparing safe fixes / Applying local mock updates; completes with success state.
- **Mock state changes:** confirmed safe proposals increment `sessionFixed`; mixed rows remain visible when manual review proposals still exist; toast shown.
- **Data used:** static redesigned Review queues and `itemStatuses`.
- **Forbidden real behavior:** no metadata write, no file edit, no lyric fetch, no artwork download.
- **Status:** implemented.

### RV-3: Contextual Apply Selected

- **Trigger:** select one or more row checkboxes, then tap `Apply selected` in the compact contextual bar.
- **Resulting UI:** `ForgeConfirmDialog` opens for selected rows; on confirm, `ForgeProgressSheet` opens with steps: Preparing selected fixes / Applying mock changes; completes with success state.
- **Mock state changes:** selected rows move to `status = 'fixed'`; selected set clears; `sessionFixed` increments; toast shown.
- **Data used:** `selected` Set, redesigned Review queues, `itemStatuses`.
- **Forbidden real behavior:** same as RV-2.
- **Status:** implemented.

### RV-4: Ignore Selected

- **Trigger:** select one or more row checkboxes, then tap `Ignore` in the compact contextual bar.
- **Resulting UI:** `ForgeBottomSheet` opens as an ignore reason sheet with optional reason chips; on confirm, `ForgeProgressSheet` opens with step: Marking items ignored; completes with success state.
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
- **Shows:** song title, artist, album, provider badge (`Lyrics provider mock`), metadata rows, mock lyrics preview using placeholder text only (no real/copyrighted lyrics), `Preview changes` link.
- **Actions:** `Apply lyrics` shows progress flow (Preparing lyrics / Updating mock lyrics) then marks fixed; `Apply synced` shows progress flow (Preparing synced lyrics / Updating mock LRC) then marks fixed; `Ignore this item` shows progress flow (Marking item ignored) then marks ignored; `Close`, `Preview changes` (opens metadata diff).
- **Mock state changes:** item status becomes `fixed` or `ignored`; toast confirms; item removed from pending queue.
- **Data used:** `reviewGroups` item.
- **Forbidden real behavior:** no lyric API call, no lyric download, no file write, no copyrighted lyrics.
- **Status:** implemented.

### RV-6A: All Item Repair Overview

- **Trigger:** tap an All queue row outside its checkbox.
- **Resulting UI:** `ForgeReviewItemOverviewSheet` opens as a bottom sheet instead of jumping directly to Artwork or another category.
- **Shows:** item title, artist, album if present, thumbnail, total proposed fixes and grouped fix cards for Artwork, Lyrics and Metadata subcategories.
- **Actions:** `Review artwork`, `Review lyrics`, `Review tags`, `Review identity`, `Review release data`, `Review audio data` route to existing preview sheets; `Apply safe fixes` shows confirmation → progress flow → increments local session applied count; `Ignore item` shows progress flow → marks item ignored locally; `Close` dismisses sheet.
- **Mock state changes:** action buttons route to existing preview sheets; safe fixes increment local session applied count after progress completes; ignore marks the All item ignored locally.
- **Forbidden real behavior:** no metadata write, no file edit, no network call.
- **Status:** implemented.

### RV-6B: Sort Review Queue

- **Trigger:** tap the `Sort: ...` control in Review.
- **Resulting UI:** sort bottom sheet opens inside the phone viewport.
- **Options:** Priority, Most fixes, Needs review first, Artwork first, Lyrics first, Metadata first, Title A-Z, Recently found.
- **Mock state changes:** selected sort updates local `activeSort`; current visible queue order changes deterministically; active sort label updates.
- **Forbidden real behavior:** no backend query or persisted preference.
- **Status:** implemented.

### RV-7: Artwork Item Tap / Apply Artwork

- **Trigger:** tap an artwork review item or its `Apply artwork` affordance.
- **Resulting UI:** `ForgeCoverComparisonSheet` opens as a bottom sheet.
- **Shows:** album title, artist, side-by-side current/suggested cover placeholders, current resolution, suggested resolution and `Preview changes` link.
- **List rule:** Review list rows show current-cover or missing-cover facts only; no confidence as primary artwork data and no list-level comparison.
- **Provider:** Discogs source badge.
- **Actions:** `Apply artwork` shows progress flow (Preparing artwork update / Replacing mock artwork) then sets fixed; `Keep current` shows progress flow (Marking item ignored) then sets ignored; `Ignore` shows progress flow (Marking item ignored) then sets ignored; `Cancel`, `Preview changes` (navigates to `ForgeMetadataDiffSheet`).
- **Mock state changes:** item status becomes `fixed` or `ignored`; toast confirms; item removed from pending queue.
- **Data used:** `reviewGroups` item.
- **Forbidden real behavior:** no cover download, no image replacement, no file write.
- **Status:** implemented.

### RV-8: Metadata Item Tap / Specific Apply Actions

- **Trigger:** tap a Metadata row or its specific action affordance.
- **Resulting UI:** `ForgeMetadataDiffSheet` opens as a bottom sheet.
- **Shows:** readable field-by-field current vs suggested values for Tags, Identity, Release or Audio with wrapping text, chips for suggested values and provider/source badges.
- **Providers:** Tags use Last.fm; Identity uses MusicBrainz / AcoustID; Release uses Discogs / MusicBrainz; Audio uses Audio analysis mock.
- **Actions:** `Apply tags` shows progress (Preparing tag update / Applying mock tags); `Apply identity` shows progress (Validating identity choice / Applying protected mock identity); `Choose match` shows progress (Resolving mock match); `Apply release data` shows progress (Preparing release metadata / Applying mock release fields); `Apply audio data` shows progress (Preparing audio analysis / Applying mock audio metadata).
- **Protected identity fields require explicit confirmation through the preview sheet.**
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
- **Resulting UI:** search field active; list filters in real time by title/artist/album.
- **Mock state changes:** `query` string; filtered list derived from `query`.
- **Data used:** `artistData`, `albumData`, `songData`.
- **Forbidden real behavior:** no backend search, no filesystem scan.
- **Status:** implemented.

### LB-2: Segmented Control

- **Trigger:** tap Artists, Albums or Songs segment.
- **Resulting UI:** list switches to the chosen section.
- **Mock state changes:** `section` state changes.
- **Data used:** none.
- **Forbidden real behavior:** none.
- **Status:** implemented.

### LB-3: Artist Row Tap

- **Trigger:** tap an artist row in Artists tab.
- **Resulting UI:** `ForgeMetadataEditor` opens in artist mode.
- **Shows:** name, subtitle, genres, mood, Overview / Image / Metadata / Albums / Identity tabs, editable fields, mock image picker.
- **Actions:** edit fields, choose mock image, save with preview/progress/toast.
- **Mock state changes:** `editorOpen = true`, `editorType = 'artist'`, `editorEntityId = id`.
- **Data used:** `artistData`, `albumData`.
- **Forbidden real behavior:** no backend query.
- **Status:** implemented.

### LB-4: Album Row Tap

- **Trigger:** tap an album row in Albums tab.
- **Resulting UI:** `ForgeMetadataEditor` opens in album mode.
- **Shows:** cover gradient, title, artist, year, Overview / Artwork / Metadata / Release / Tracks / File info tabs, editable fields, mock cover picker.
- **Actions:** edit fields, choose mock cover, save with preview/progress/toast.
- **Mock state changes:** `editorOpen = true`, `editorType = 'album'`, `editorEntityId = id`.
- **Data used:** `albumData`, `songData`.
- **Forbidden real behavior:** none.
- **Status:** implemented.

### LB-5: Song Row Tap

- **Trigger:** tap a song row in Songs tab.
- **Resulting UI:** `ForgeMetadataEditor` opens in track mode.
- **Shows:** title, artist, album, year, Overview / Artwork / Lyrics / Metadata / Audio / File info tabs, editable fields.
- **Actions:** edit fields, lyrics, audio metadata, save with preview/progress/toast.
- **Mock state changes:** `editorOpen = true`, `editorType = 'track'`, `editorEntityId = id`.
- **Data used:** `songData`.
- **Forbidden real behavior:** none.
- **Status:** implemented.

### LB-6: Missing Metadata Badge Tap

- **Trigger:** tap the orange metadata badge on a library row.
- **Resulting UI:** opens `ForgeMetadataEditor` focused on the relevant tab:
  - missing lyrics → Track editor → Lyrics tab
  - missing genre → Track editor → Metadata tab
  - cover needs review → Album editor → Artwork tab
- **Mock state changes:** `editorOpen = true`, `editorType` and `editorInitialTab` set by badge type.
- **Data used:** item note string.
- **Forbidden real behavior:** none.
- **Status:** implemented.

### LB-7: Chevron Rows

- **Trigger:** tap the chevron on a library row.
- **Resulting UI:** opens the same metadata editor as the row body.
- **Mock state changes:** same as LB-3, LB-4 or LB-5.
- **Data used:** same as LB-3, LB-4 or LB-5.
- **Forbidden real behavior:** none.
- **Status:** implemented.

### LB-8: Sort/Filter

- **Trigger:** tap optional sort/filter icon.
- **Resulting UI:** `ForgeFilterSheet` opens.
- **Options:** sort by name, year, artist; filter by metadata issues.
- **Mock state changes:** `librarySort`, `libraryFilter`.
- **Data used:** static options.
- **Forbidden real behavior:** none.
- **Status:** not implemented.

### LB-9: Direct Metadata Editing

- **Trigger:** tap any editable field input in `ForgeMetadataEditor`.
- **Resulting UI:** field shows current value and input below; typing updates draft state; Save becomes active; "Unsaved" badge appears.
- **Mock state changes:** `draft` object updated locally; dirty state tracked by comparing draft to original.
- **Data used:** entity fields.
- **Forbidden real behavior:** no real metadata write, no file edit.
- **Status:** implemented.

### LB-10: Image Picker Mock

- **Trigger:** tap "Choose from gallery" or "Search online" in Artwork/Image tab.
- **Resulting UI:** `ForgeImagePickerSheet` opens with Gallery / Online tabs.
- **Gallery:** 3 fake local images with CSS gradient placeholders and fake filenames.
- **Online:** local-only search input filtering 4 fake provider results (Discogs, MusicBrainz Cover Art, Deezer, iTunes).
- **Mock state changes:** `pendingImage` set with gradient and source badge.
- **Forbidden real behavior:** no real gallery access, no FileReader, no network call, no download.
- **Status:** implemented.

### LB-11: Save / Apply Changes

- **Trigger:** tap Save button when dirty.
- **Resulting UI:** `ForgeSavePreviewSheet` opens showing changed fields (Current → New) with source badges; tap "Apply changes" → `ForgeProgressSheet` (Preparing changes / Applying mock metadata) → completes with toast.
- **Mock state changes:** local mutable entity array updated; toast shown.
- **Data used:** draft changes.
- **Forbidden real behavior:** no real metadata write, no file edit.
- **Status:** implemented.

### LB-12: Unsaved Changes Confirmation

- **Trigger:** tap back button in `ForgeMetadataEditor` with unsaved changes.
- **Resulting UI:** `ForgeConfirmDialog` asks "Discard changes?" with Keep editing / Discard options.
- **Mock state changes:** none if kept; editor closes if discarded.
- **Forbidden real behavior:** none.
- **Status:** implemented.

### LB-13: File Info Read-Only

- **Trigger:** open File info tab in Track or Album editor.
- **Resulting UI:** read-only fields with no editable inputs, no Apply button.
- **Mock state changes:** none.
- **Forbidden real behavior:** no filesystem access.
- **Status:** implemented.

### LB-14: Nested Editor Navigation

- **Trigger:** tap a track row in Album editor Tracks tab, or tap an album row in Artist editor Albums tab.
- **Resulting UI:** swaps to the relevant editor (Track or Album) preserving the same editor overlay.
- **Mock state changes:** `editorType` and `editorEntityId` updated.
- **Forbidden real behavior:** none.
- **Status:** implemented.

---

## Activity

### AC-1: Activity Card Tap

- **Trigger:** tap an activity card body.
- **Resulting UI:** `ForgeActivityDetailSheet` opens as a bottom sheet.
- **Shows:** title, subtitle, time, type badge, status badge, provider/source badge, affected count, affected item list, changed fields, detail text, mock-only note, action buttons.
- **Mock state changes:** `activeActivitySheet = 'detail'`, `selectedActivityId = item.id`.
- **Data used:** `activityItems`.
- **Forbidden real behavior:** no real log read, no undo of real changes.
- **Status:** implemented.

### AC-2: Summary Button

- **Trigger:** tap the `Summary` pill on an activity card.
- **Resulting UI:** `ForgeActivitySummarySheet` opens as a bottom sheet.
- **Shows:** concise summary, affected count, grouped changes, provider/source badge, mock-only note, action buttons.
- **Mock state changes:** `activeActivitySheet = 'summary'`, `selectedActivityId = item.id`.
- **Data used:** `activityItems`.
- **Forbidden real behavior:** same as AC-1.
- **Status:** implemented.

### AC-3: Review Button

- **Trigger:** tap the `Review` pill on an activity card with a related review target.
- **Resulting UI:** navigates to the related Review tab/filter with toast.
- **Mapping:** Lyrics -> Review / Lyrics; Artwork -> Review / Artwork; Tags -> Review / Metadata / Tags; Identity -> Review / Metadata / Identity; Release -> Review / Metadata / Release; Audio -> Review / Metadata / Audio; Library checked -> Review / All.
- **Mock state changes:** `activeTab = 'review'`, `reviewFilter` and `metadataFilter` updated.
- **Data used:** `activityItems`.
- **Forbidden real behavior:** none.
- **Status:** implemented.

### AC-4: Today / Yesterday Grouping

- **Trigger:** visual group headers.
- **Resulting UI:** items grouped by `dateGroup`; filtered results still group correctly; empty groups hidden.
- **Mock state changes:** none.
- **Data used:** `activityItems`.
- **Forbidden real behavior:** none.
- **Status:** implemented.

### AC-5: Activity Filters

- **Trigger:** tap filter icon in Activity header.
- **Resulting UI:** `ForgeActivityFilterSheet` opens with type options.
- **Options:** All, Lyrics, Artwork, Metadata, Library edits, Warnings, Failed, Completed.
- **Sort:** Newest first, Oldest first.
- **Mock state changes:** `activityFilter`, `activitySort`.
- **Data used:** static options.
- **Forbidden real behavior:** none.
- **Status:** implemented.

### AC-6: Dynamic Review -> Activity History

- **Trigger:** Review apply/fix action completes.
- **Resulting UI:** new activity entry appears at the top of Activity list.
- **Mock state changes:** `activityItems` appended with entry derived from review item.
- **Data used:** completed review item.
- **Forbidden real behavior:** none.
- **Status:** implemented.

### AC-7: Dynamic Library Editor -> Activity History

- **Trigger:** Library metadata editor save completes.
- **Resulting UI:** new `libraryEdit` activity entry appears at the top of Activity list.
- **Mock state changes:** `activityItems` appended with `libraryEdit` entry.
- **Data used:** saved entity.
- **Forbidden real behavior:** none.
- **Status:** implemented.

### AC-8: Activity -> Library Navigation

- **Trigger:** tap "Open library item" in activity detail.
- **Resulting UI:** toast: "Library item focus is planned for a later Forge batch".
- **Mock state changes:** none.
- **Data used:** `relatedLibraryTarget`.
- **Forbidden real behavior:** none.
- **Status:** deferred.

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

### GL-4: Save Settings

- **Trigger:** tap Save settings in `ForgeSettingsSheet`.
- **Resulting UI:** `ForgeProgressSheet` with steps: Preparing settings / Applying mock preferences.
- **Mock state changes:** settings persisted to local state; unsaved flag cleared; toast confirms.
- **Data used:** `ForgeSettingsState`.
- **Forbidden real behavior:** no real config file write; no real server update.
- **Status:** implemented.

### GL-5: Reset Settings

- **Trigger:** tap Reset in `ForgeSettingsSheet`.
- **Resulting UI:** `ForgeConfirmDialog` asks for confirmation; on confirm, `ForgeProgressSheet` with steps: Preparing reset / Restoring defaults.
- **Mock state changes:** `ForgeSettingsState` restored to `defaultForgeSettingsState`.
- **Data used:** `defaultForgeSettingsState`.
- **Forbidden real behavior:** no real config file deletion.
- **Status:** implemented.

### GL-6: Test Mock Provider

- **Trigger:** tap Test mock on a provider card or provider detail sheet.
- **Resulting UI:** `ForgeProgressSheet` with steps: Preparing mock request / Simulating provider response.
- **Mock state changes:** none.
- **Data used:** provider name.
- **Forbidden real behavior:** no real network call; no real API request.
- **Status:** implemented.

### GL-7: App Update Check / Download / Install

- **Trigger:** tap Check for updates, Download update, or Restart app in App Updates.
- **Resulting UI:** `ForgeProgressSheet` with mock steps; result state updates (up_to_date / available / ready / idle).
- **Mock state changes:** `updateStatus`, `lastCheckedUpdate`, `availableVersion`, `updateReleaseNotes`.
- **Data used:** `updateChannel`.
- **Forbidden real behavior:** no real network call; no real download; no real install.
- **Status:** implemented.

### GL-8: Unsaved Changes Prompt

- **Trigger:** close `ForgeSettingsSheet` with unsaved changes.
- **Resulting UI:** `ForgeConfirmDialog` asks "Discard changes?" with Keep editing / Discard.
- **Mock state changes:** none if kept; sheet closes if discarded.
- **Data used:** unsaved flag.
- **Forbidden real behavior:** none.
- **Status:** implemented.

### GL-9: Mock State Controls

- **Trigger:** inside `ForgeSettingsSheet`, a Studio-only section.
- **Resulting UI:** toggles for empty states, loading states, error states, all-clear states.
- **Mock state changes:** `forgeMockState` flags.
- **Data used:** static control definitions.
- **Forbidden real behavior:** none.
- **Status:** not implemented (deferred to Forge State Coverage).

---

## Status Legend

- `not implemented` — no code exists for this interaction.
- `partial` — some UI exists but the full flow is not wired.
- `implemented` — interaction is fully wired and mock-safe.
- `deferred` — intentionally delayed to a later batch.
- `needs QA` — code exists but requires validation.
