# Forge Interaction Map

## Product Role

Forge is a mock library repair and review app inside Noqlen Interface Studio.

It manages visual/mock flows for:

- missing lyrics.
- artwork/cover review.
- metadata cleanup across Tags, Identity, Release and Audio.
- review safe fixes.
- contextual apply selected / ignore selected.
- item details.
- before/after previews.
- library browsing.
- activity history.

Forge remains a complete interactive prototype target, not a real metadata editor or library scanner. Every interaction must stay mock-only and must avoid backend calls, real metadata writes, file access, downloads, network calls, FileReader, real library scanning and destructive behavior.

## Navigation Model

### Main Forge Bottom Navigation

- Home.
- Review.
- Library.
- Activity.

### Secondary Surfaces

- Review item detail sheet.
- Batch action confirmation sheet.
- Cover comparison sheet.
- Lyrics editor/preview sheet.
- Genre picker sheet.
- Metadata diff sheet.
- Ignore reason sheet.
- Fix summary sheet.
- Library item detail sheet.
- Artist/album detail sheet.
- Activity detail sheet.
- Filter/sort sheet.
- Forge settings sheet.
- Mock state controls (Studio-only, inside Forge Settings).

Layout constraints:

- Forge screens and sheets must fit the stable `390px` virtual phone app viewport while the simulator itself may be visually scaled down.
- Before/after previews and detail sheets must not create phone-level horizontal overflow.
- Metadata fields and genre lists should wrap or truncate gracefully inside the viewport.

## Home Interaction Map

### Review Now

- Trigger: amber `Review now` CTA button.
- Result: navigates to the Review tab.
- Optionally focuses the first review queue or scrolls to the top of Review.
- Current status: implemented (switches to Review tab, resets filter to all, shows toast).

### Missing Lyrics Card

- Trigger: `2 tracks are missing lyrics` attention card.
- Result: navigates to Review / Lyrics.
- Current status: implemented (switches to Review / Lyrics with toast).

### Better Covers Card

- Trigger: `4 albums need better covers` attention card.
- Result: navigates to Review / Artwork.
- Current status: implemented (switches to Review / Artwork with toast).

### Missing Genres Card

- Trigger: `3 songs are missing genres` attention card.
- Result: navigates to Review / Metadata with Tags active.
- Current status: implemented (switches to Review / Metadata / Tags with toast).

### Settings Gear

- Trigger: gear icon in the Home header.
- Result: opens Forge settings sheet.
- Sections:
  1. Metadata Providers (provider cards, toggles, configure, test mock, credential status dot)
  2. API Keys (masked credential fields per provider, show/hide, clear, test, save, reset)
  3. Tags & Metadata (behavior, rewrite rules)
  4. Artwork (embed, folder cover, sources)
  5. Lyrics (synced, local, sidecar, cache)
  6. Audio (ReplayGain, key detection, limits)
  7. Safety & Review (dry-run, confirmation, conflict behavior)
  8. App Updates (version, channel, check/download/install/retry mock, expandable release notes)
  9. Advanced (database, verbosity/debug, deferred enrich presets with Planned badge)
- Safety: mock-only settings; no real app, server or library settings are read or changed.
- Current status: implemented (opens ForgeSettingsSheet with full categories, provider cards, API Keys panel, rewrite rules, app update mock flow including failed state, save/reset with progress, unsaved-changes guard, disabled enrich presets).

### Any Home Summary Card

- Trigger: any attention card body or the shield-check safety note card.
- Result: opens the relevant review queue or a safety explainer sheet.
- Current status: implemented (cards navigate to filtered Review; safety note opens ForgeSafetyNoteSheet).

## Review Interaction Map

### Review Architecture

- Main tabs: All, Artwork, Lyrics and Metadata.
- Excluded main tabs: Identity and Files.
- Identity belongs inside Metadata.
- File info is read-only and excluded from the main Review screen.
- Metadata subfilters: Tags, Identity, Release and Audio.
- Proposal statuses: Safe, Review, Protected, Conflict, Applied, Ignored and Read-only.
- Current status: implemented.

### Review Safe Fixes

- Trigger: `Review safe fixes` in the All summary card.
- Result: opens confirmation dialog for safe proposals in the active view; on confirm shows progress flow with steps: Preparing safe fixes / Applying local mock updates; completes with success state.
- Mock state: confirmed safe proposals increment local applied session state; mixed rows remain visible when manual review work still exists.
- Safety: must not write metadata, edit files, fetch lyrics or download covers.
- Current status: implemented.

### Open Enrich Mode

- Trigger: `Open Enrich Mode →` helper row under `Review safe fixes` in the All summary card.
- Result: opens the full-screen Enrich Mode flow with 6 steps: Rewrite options → Target selection → Confirmation → Dry-run → Progress → Result.
- Distinction: Enrich Mode is a force rewrite/reprocess workflow, not safe automatic repair. It can overwrite existing metadata and runs a dry-run before applying.
- Mock state: on completion, appends an activity entry, marks pending safe review items as fixed locally, increments session fixed counter.
- Safety: mock-only; no real metadata or files changed.
- Current status: implemented.

### Contextual Apply Selected

- Trigger: select row checkboxes, then tap `Apply selected` in the compact contextual bar.
- Requires: at least one selected item.
- Result: opens confirmation dialog for selected rows; on confirm shows progress flow with steps: Preparing selected fixes / Applying mock changes; completes with success state.
- Mock state: selected items move to fixed/applied local state; toast confirms.
- Safety: same as Review safe fixes.
- Current status: implemented.

### Ignore Selected

- Trigger: select row checkboxes, then tap `Ignore` in the compact contextual bar.
- Requires: at least one selected item.
- Result: opens ignore reason bottom sheet with optional reason chips; on confirm shows progress flow: Marking items ignored; completes with success state.
- Options: `Not needed`, `Wrong suggestion`, `Review later`, `Keep current metadata`.
- Mock state: selected items move to `ignored` status locally; toast confirms.
- Safety: must not delete, hide or modify real files or metadata.
- Current status: implemented.

### Item Checkbox

- Trigger: checkbox on a review item row.
- Result: toggles selection state for pending items only; the contextual bar appears only while rows are selected.
- Current status: implemented.

### Main Review Tabs

- Trigger: All / Artwork / Lyrics / Metadata segmented tabs.
- Result: switches scalable queue surfaces and clears row selection.
- Current status: implemented.

### All Item Tap

- Trigger: tap an All queue row.
- Result: opens a complete item repair overview bottom sheet showing grouped proposed fixes across Artwork, Lyrics and Metadata.
- Overview actions route to the relevant preview sheet: Review artwork, Review lyrics, Review tags, Review identity, Review release data and Review audio data.
- Mock state: overview `Apply safe fixes` shows confirmation → progress flow → increments local applied session state; `Ignore item` shows progress flow → hides the item locally; routed preview sheets keep their existing mock state behavior.
- Current status: implemented.

### Sort Review Queue

- Trigger: tap `Sort: Priority` or the active sort label.
- Result: opens an in-phone sort sheet with Priority, Most fixes, Needs review first, Artwork first, Lyrics first, Metadata first, Title A-Z and Recently found.
- Mock state: selected sort updates local `activeSort` and reorders the current visible queue deterministically.
- Current status: implemented.

### Lyrics Item Tap

- Trigger: tap a Lyrics row or its `Apply lyrics`, `Review lyrics` or `Apply synced` affordance.
- Result: opens `ForgeLyricsDetailSheet` with fake placeholder lyrics only.
- Actions: `Apply lyrics` shows progress flow: Preparing lyrics / Updating mock lyrics → marks fixed; `Apply synced` shows progress flow: Preparing synced lyrics / Updating mock LRC → marks fixed; `Ignore this item` shows progress flow: Marking item ignored → marks ignored; `Close`, `Preview changes` (opens metadata diff).
- Mock state: item status becomes `fixed` or `ignored`; toast confirms; item removed from pending queue.
- Current status: implemented.

### Artwork Item Tap / Apply Artwork

- Trigger: tap an Artwork row or its `Apply artwork` affordance.
- Result: opens `ForgeCoverComparisonSheet` before applying.
- Shows: album title, artist, current cover placeholder, suggested cover placeholder, current resolution and suggested resolution.
- List rule: artwork rows show current-cover facts only; no confidence as main artwork data and no direct list-level current-vs-suggested comparison.
- Provider badge: Discogs.
- Actions: `Apply artwork` shows progress flow: Preparing artwork update / Replacing mock artwork → marks fixed; `Keep current` shows progress flow: Marking item ignored → marks ignored; `Ignore` shows progress flow: Marking item ignored → marks ignored; `Cancel`, `Preview changes` (opens metadata diff).
- Mock state: item status becomes `fixed` or `ignored`; toast confirms; item removed from pending queue.
- Current status: implemented.

### Metadata Item Tap / Apply Metadata

- Trigger: tap a Metadata row or its specific action affordance.
- Result: opens `ForgeMetadataDiffSheet` with current vs suggested values.
- Preview readability: field-by-field vertical rows with wrapping Current and Suggested values; suggested values may render as chips; no important value is hidden by ellipsis.
- Provider badges: Tags use Last.fm; Identity uses MusicBrainz / AcoustID; Release uses Discogs / MusicBrainz; Audio uses Audio analysis mock.
- Tags rows use `Apply tags`; Identity rows use `Apply identity`; conflicts use `Choose match`; Release rows use `Apply release data`; Audio rows use `Apply audio data`.
- Protected identity fields require explicit confirmation through the preview sheet.
- Progress flow: each Apply action shows a progress sheet before completing (e.g., Preparing tag update / Applying mock tags for Tags; Validating identity choice / Applying protected mock identity for Identity).
- Mock state: item status becomes `fixed`; toast confirms; item removed from pending queue.
- Current status: implemented.

### Review Covers Button (from Library)

- Trigger: `Review covers` action in an album detail sheet.
- Result: opens cover review queue filtered to that album.
- Current status: not implemented.

### Clear/Fix/Ignore Status

- Trigger: after a fix or ignore action.
- Result: fixed/ignored items are removed from the active pending queue; session summary card appears; queue counts update.
- Empty queue state: when all items in a view are fixed or ignored, show an empty queue message with `View all` and `Reset mock queue` actions.
- Current status: implemented.

## Library Interaction Map

### Search Icon

- Trigger: search icon in the Library header or focus the search bar.
- Result: search field active; list filters in real time by title, artist, album.
- Empty state: `No results found` when query yields nothing.
- Current status: implemented.

### Segmented Control

- Trigger: Artists, Albums or Songs segment.
- Result: switches the library list to the selected section.
- Current status: implemented (local React state switch).

### Artist Row Tap

- Trigger: artist row in Artists tab.
- Result: opens `ForgeMetadataEditor` in artist mode.
- Shows: name, subtitle, genre chips, mood, Overview / Image / Metadata / Albums / Identity tabs.
- Actions: edit text fields, choose mock gallery/online image, save with preview/progress/toast.
- Current status: implemented.

### Album Row Tap

- Trigger: album row in Albums tab.
- Result: opens `ForgeMetadataEditor` in album mode.
- Shows: cover gradient, title, artist, year, Overview / Artwork / Metadata / Release / Tracks / File info tabs.
- Actions: edit text fields, choose mock gallery/online cover, save with preview/progress/toast.
- Current status: implemented.

### Song Row Tap

- Trigger: song row in Songs tab.
- Result: opens `ForgeMetadataEditor` in track mode.
- Shows: title, artist, album, year, Overview / Artwork / Lyrics / Metadata / Audio / File info tabs.
- Actions: edit text fields, lyrics, audio metadata, save with preview/progress/toast.
- Current status: implemented.

### Missing Metadata Badge Tap

- Trigger: orange dot + `Missing lyrics`, `Missing genre` or `Cover needs review` badge on a library row.
- Result: opens `ForgeMetadataEditor` focused on the relevant tab:
  - missing lyrics → Track editor → Lyrics tab
  - missing genre → Track editor → Metadata tab
  - cover needs review → Album editor → Artwork tab
- Current status: implemented.

### Chevron Rows

- Trigger: chevron on any library row.
- Result: opens the same metadata editor as the row body.
- Current status: implemented.

### Sort/Filter

- Trigger: optional sort/filter icon if added later.
- Result: opens filter/sort sheet.
- Options: sort by name, year, artist; filter by metadata issues.
- Current status: not implemented.

## Activity Interaction Map

### Activity Card Tap

- Trigger: tap on an activity card body.
- Result: opens `ForgeActivityDetailSheet`.
- Shows: title, subtitle, time, type badge, status badge, provider/source badge, affected count, affected item list, changed fields, detail text, mock-only note, action buttons.
- Current status: implemented.

### Summary Button

- Trigger: `Summary` pill on an activity card.
- Result: opens `ForgeActivitySummarySheet`.
- Shows: concise summary, affected count, grouped changes, provider/source badge, mock-only note, action buttons.
- Current status: implemented.

### Review Button

- Trigger: `Review` pill on an activity card with a related review target.
- Result: navigates to the related Review tab/filter.
- Mapping: Lyrics -> Review / Lyrics; Artwork -> Review / Artwork; Tags -> Review / Metadata / Tags; Identity -> Review / Metadata / Identity; Release -> Review / Metadata / Release; Audio -> Review / Metadata / Audio; Library checked -> Review / All.
- Current status: implemented.

### Today / Yesterday Grouping

- Trigger: visual group headers.
- Result: items are grouped by `dateGroup` field; filtered results still group correctly; empty groups are hidden.
- Current status: implemented.

### Activity Filters

- Trigger: filter icon in Activity header.
- Result: opens `ForgeActivityFilterSheet`.
- Options: All, Lyrics, Artwork, Metadata, Library edits, Warnings, Failed, Completed.
- Sort: Newest first, Oldest first.
- Behavior: filter applies locally; active filter chip visible; no-results state with reset action; reset clears filter.
- Current status: implemented.

## Required UI States

### Home

- Normal (attention cards visible): implemented.
- All clear (no issues): not implemented.
- Many issues (>9 items): not implemented.
- Loading summary: not implemented.
- Empty library (no mock data): not implemented.

### Review

- Populated (groups with items): implemented.
- No selected items: implemented.
- Selected items: implemented.
- Fixing (applying state): not implemented.
- Fixed (all items in group fixed): implemented (items hidden from queue, session summary visible).
- Ignored (all items in group ignored): implemented (items hidden from queue, session summary visible).
- Empty queue (no items remaining): implemented (empty state with `View all` and `Reset mock queue`).
- Group collapsed: implemented.
- Group expanded: implemented.
- Partial errors (mock failure state): not implemented.

### Library

- Populated: implemented.
- Searching: partially implemented (search affordance exists; no active state).
- No results: not implemented.
- Artists tab: implemented.
- Albums tab: implemented.
- Songs tab: implemented.
- Metadata warnings: partially implemented (badges render; not interactive).
- Empty library: not implemented.

### Activity

- Populated: implemented.
- Empty: implemented (empty state with icon, message and reset action).
- Filtered: implemented (active filter chip + filtered list).
- Errors only: implemented (via filter).
- Summary detail: implemented (`ForgeActivitySummarySheet`).
- Detail sheet: implemented (`ForgeActivityDetailSheet`).
- Filter sheet: implemented (`ForgeActivityFilterSheet`).

### Global

- Loading: not implemented.
- Disabled (buttons during apply): not implemented.
- Toast: implemented (ForgeToast in ForgePreview overlay).
- Confirmation dialog: implemented as foundation (ForgeConfirmDialog in ForgePreview overlay).
- Bottom sheet: implemented (ForgeBottomSheet used by settings and safety note).
- Mock state controls: not implemented.

## Component Inventory

### Existing Components

- `ForgeBottomNav`.
- `ForgeHome`.
- `ForgeReview`.
- `ForgeLibrary`.
- `ForgeActivity`.
- `ForgeCard`.
- `ForgeScreenHeader`.
- `CoverGradient`.
- `SegmentedControl`.
- `ForgeBottomSheet`.
- `ForgeConfirmDialog`.
- `ForgeToast`.
- `ForgeSettingsSheet` (full categories, provider cards, API keys, rewrite rules, app updates).
- `ForgeSafetyNoteSheet`.
- `ForgeEnrichMode` (full-screen 6-step force rewrite flow: options, targets, confirm, dry-run, progress, result).
- `forgeSettingsCatalog` (typed settings model and default state).

### Needed Components

- `ForgeActionButton` (consistent CTA style).
- `ForgeBottomSheet` (shared overlay container).
- `ForgeConfirmDialog` (shared confirmation).
- `ForgeToast` (shared toast).
- `ForgeReviewGroup` (extracted from inline review groups).
- `ForgeReviewItem` (extracted from inline review rows).
- `ForgeLyricsDetailSheet`.
- `ForgeCoverComparisonSheet`.
- `ForgeGenrePickerSheet`.
- `ForgeMetadataDiffSheet`.
- `ForgeIgnoreReasonSheet`.
- `ForgeFixSummarySheet`.
- `ForgeLibraryDetailSheet` (artist, album, song variants).
- `ForgeActivityDetailSheet` (implemented).
- `ForgeActivitySummarySheet` (implemented).
- `ForgeActivityFilterSheet` (implemented).
- `ForgeFilterSheet` (library filter deferred).
- `ForgeMockStateControls` (Studio-only state toggles inside Settings).

## Implementation Batches

### Batch 1: Overlay Foundation + Home

- Forge overlay foundation:
  - `ForgeBottomSheet`.
  - `ForgeConfirmDialog`.
  - `ForgeToast`.
- Basic mock state model in `ForgePreview`.
- Home interactions:
  - `Review now` CTA.
  - Summary card navigation with filter state.
  - Settings gear opens `ForgeSettingsSheet`.

### Batch 2: Review Queue Interactions

- Selection system with checkbox toggles for pending items only.
- `Fix selected` with confirmation dialog.
- `Fix all` with confirmation dialog.
- `Ignore selected` with reason bottom sheet.
- Group expand/collapse polish with chevron icons and pending-count updates.
- Empty queue state with `View all` and `Reset mock queue`.
- Session summary card for fixed/ignored counts.
- Review filter compatibility from Home cards.

### Batch 3: Review Item Detail Flows

- Missing lyrics detail sheet with mock preview.
- Cover comparison sheet with before/after placeholders.
- Genre picker sheet with suggested genres.
- Metadata diff sheet (old vs new mock values).
- Item status changes: fixed, ignored, error.

### Batch 4: Library Interactions (Bloco 3.4.5)

- Live search filtering.
- Full-screen metadata editor for Artist, Album and Track with organized tabs.
- Editable field pattern: label, current value, input, dirty indicator, source badge, protected-field warning.
- Mock gallery image picker and mock online search picker.
- Save preview sheet with changed fields list (Current → New).
- Progress sheet for apply: Preparing changes / Applying mock metadata.
- Toast confirmation: "Metadata updated in mock preview".
- Missing metadata badge navigation to editor focused on relevant tab.
- Chevron rows open same editor as row body.
- Nested navigation: Album Tracks → Track editor; Artist Albums → Album editor.
- File info read-only tabs.
- Unsaved changes confirmation dialog on back.
- Partial/deferred Review ↔ Library sync.
- Empty and no-results states.

### Batch 5: Activity Interactions (Bloco 3.5)

- Activity card tap opens `ForgeActivityDetailSheet` with title, status, provider badge, affected items, changed fields and mock-only note.
- `Summary` pill opens `ForgeActivitySummarySheet` with concise result, grouped changes and provider badge.
- `Review` pill navigates to the related Review tab/filter with toast feedback.
- Today/Yesterday grouping is robust: filtered results still group correctly, empty groups are hidden.
- `ForgeActivityFilterSheet` with type options (All, Lyrics, Artwork, Metadata, Library edits, Warnings, Failed, Completed) and sort options (Newest first, Oldest first).
- Empty state with icon, message and reset action when filter yields no results.
- Dynamic Review -> Activity history: Review apply actions append a new activity entry to local state.
- Dynamic Library editor -> Activity history: Library metadata editor save appends a `libraryEdit` activity entry.
- Activity -> Library item navigation is deferred (shows toast: planned for a later batch).

### Batch 6: State Coverage

- Empty states for Home, Review, Library, Activity.
- Loading states for summary, search, fix apply.
- Error/ignored/fixed states for review items and groups.
- All-clear state for Home.
- Mock state controls inside Forge Settings for Studio QA.

### Batch 7: Completion Audit

- Full visible interaction audit.
- Phone viewport stability check.
- Horizontal overflow check.
- Visual fidelity comparison against reference.
- Accessibility review of interactive elements.

## Acceptance Criteria

Forge can be considered complete only when:

- Every visible actionable element responds.
- Every response is mock-only.
- Review actions change local mock state.
- Before/after previews exist for key fix types (lyrics, cover, genre, metadata).
- No real files or metadata are changed.
- No real external metadata is fetched.
- All screens have state coverage (empty, loading, error, fixed, ignored, filtered, no-results).
- Visual fidelity remains close to the reference image.
- Virtual phone viewport stays stable.
- No page-level horizontal overflow.
