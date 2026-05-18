# Forge Interaction Map

## Product Role

Forge is a mock library repair and review app inside Noqlen Interface Studio.

It manages visual/mock flows for:

- missing lyrics.
- better cover review.
- missing genres.
- metadata cleanup.
- batch review.
- fix selected.
- fix all.
- ignore selected.
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
- Current status: partially implemented (navigates to Review tab; no queue focus).

### Missing Lyrics Card

- Trigger: `2 tracks are missing lyrics` attention card.
- Result: navigates to Review tab filtered by missing lyrics queue.
- Current status: partially implemented (navigates to Review; no filter state).

### Better Covers Card

- Trigger: `4 albums need better covers` attention card.
- Result: navigates to Review tab filtered by cover review queue.
- Current status: partially implemented (navigates to Review; no filter state).

### Missing Genres Card

- Trigger: `3 songs are missing genres` attention card.
- Result: navigates to Review tab filtered by missing genres queue.
- Current status: partially implemented (navigates to Review; no filter state).

### Settings Gear

- Trigger: gear icon in the Home header.
- Result: opens Forge settings sheet.
- Sections: Preview before applying, Metadata behavior, Artwork, Reports, Mock state controls.
- Safety: mock-only settings; no real app, server or library settings are read or changed.
- Current status: not implemented (gear is visual-only).

### Any Home Summary Card

- Trigger: any attention card body or the shield-check safety note card.
- Result: opens the relevant review queue or a safety explainer sheet.
- Current status: partially implemented (cards navigate to Review; no safety explainer).

## Review Interaction Map

### Fix Selected

- Trigger: `Fix selected (N)` button.
- Requires: at least one selected item.
- Result: opens batch confirmation sheet showing selected items and a preview of changes.
- Mock state: selected items move to a `fixed` status locally; toast confirms `N changes applied in preview`.
- Safety: must not write metadata, edit files, fetch lyrics or download covers.
- Current status: partially implemented (Fix selected button exists but only counts selection; no confirmation or apply).

### Fix All

- Trigger: `Fix all (N)` button.
- Result: opens confirmation sheet for all current queue items.
- Mock state: all items in the current view move to `fixed` locally; toast confirms.
- Safety: same as Fix selected.
- Current status: partially implemented (Fix all button only selects all items locally; no confirmation or apply).

### Ignore Selected

- Trigger: `Ignore selected` button.
- Requires: at least one selected item.
- Result: opens ignore reason sheet or confirmation.
- Options: `Not relevant`, `Already correct`, `Skip for now`, `Other`.
- Mock state: selected items move to `ignored` status locally; toast confirms.
- Safety: must not delete, hide or modify real files or metadata.
- Current status: not implemented (Ignore selected button only clears selection).

### Item Checkbox

- Trigger: checkbox on a review item row.
- Result: toggles selection state.
- Current status: implemented (local React state toggle).

### Group Header Expand/Collapse

- Trigger: group header or `Show`/`Hide` pill.
- Result: toggles group open/closed.
- Current status: implemented (local React state toggle).

### Missing Lyrics Item Tap

- Trigger: tap on a lyrics review item (outside the checkbox).
- Result: opens lyrics detail/preview sheet.
- Shows: current missing state, mock generated lyrics preview or a `Search later` placeholder.
- Actions: `Use preview`, `Search again`, `Ignore`.
- Mock state: choosing `Use preview` marks the item as `fixed` locally.
- Current status: not implemented.

### Cover Item Tap

- Trigger: tap on a cover review item.
- Result: opens cover comparison sheet.
- Shows: current cover placeholder and suggested cover placeholder side by side.
- Actions: `Use suggested cover`, `Keep current cover`, `Ignore`.
- Mock state: choosing `Use suggested cover` marks the item as `fixed` locally.
- Current status: not implemented.

### Genre Item Tap

- Trigger: tap on a genre review item.
- Result: opens genre picker sheet.
- Shows: suggested genres as chips, a custom genre input and current empty state.
- Actions: `Apply selected genre`, `Skip`.
- Mock state: applying a genre marks the item as `fixed` locally and updates mock genre data.
- Current status: not implemented.

### Review Covers Button (from Library)

- Trigger: `Review covers` action in an album detail sheet.
- Result: opens cover review queue filtered to that album.
- Current status: not implemented.

### Clear/Fix/Ignore Status

- Trigger: after a fix or ignore action.
- Result: item should move to completed/ignored state or show a badge (checkmark or strikethrough).
- Empty queue state: when all items in a group are fixed or ignored, show an empty-group message.
- Current status: not implemented.

## Library Interaction Map

### Search Icon

- Trigger: search icon in the Library header.
- Result: opens search field or focuses the existing search bar.
- Filters: local mock library by title, artist, album.
- Empty state: `No results found` when query yields nothing.
- Current status: partially implemented (static search affordance; no live filtering).

### Segmented Control

- Trigger: Artists, Albums or Songs segment.
- Result: switches the library list to the selected section.
- Current status: implemented (local React state switch).

### Artist Row Tap

- Trigger: artist row in Artists tab.
- Result: opens artist detail sheet.
- Shows: name, subtitle, genre chips, mood, related albums list, related songs list.
- Secondary tabs inside artist detail: Albums, Songs, Details.
- Current status: not implemented.

### Album Row Tap

- Trigger: album row in Albums tab.
- Result: opens album detail sheet.
- Shows: cover gradient, title, artist, year, genres, mood, track list, editable fields.
- Actions: `Review album` (navigates to review), `Edit metadata`.
- Current status: not implemented.

### Song Row Tap

- Trigger: song row in Songs tab.
- Result: opens song metadata detail sheet.
- Shows: title, artist, album, year, lyrics status, genres, mood, editable fields.
- Actions: `Review song` (navigates to review), `Edit metadata`.
- Current status: not implemented.

### Missing Metadata Badge Tap

- Trigger: orange dot + `Missing lyrics`, `Missing genre` or `Cover needs review` badge on a library row.
- Result: navigates to the relevant review queue or opens the item detail sheet.
- Current status: partially implemented (badge renders; not interactive).

### Chevron Rows

- Trigger: chevron on any library row.
- Result: must respond with a detail sheet or be clearly disabled.
- Current status: partially implemented (chevron renders; rows are not interactive except segment switching).

### Sort/Filter

- Trigger: optional sort/filter icon if added later.
- Result: opens filter/sort sheet.
- Options: sort by name, year, artist; filter by metadata issues.
- Current status: not implemented.

## Activity Interaction Map

### Activity Card Tap

- Trigger: tap on an activity card body.
- Result: opens activity detail sheet.
- Shows: title, subtitle, time, detail text, affected item list, undo/done actions.
- Current status: not implemented.

### Summary Button

- Trigger: `Summary` pill on an activity card.
- Result: opens the same activity detail sheet.
- Current status: not implemented (Summary pill renders; not wired).

### Review Button

- Trigger: `Review` pill on the `Library checked` or `Some items still need review` card.
- Result: navigates to the related review queue.
- Current status: not implemented.

### Today / Yesterday Grouping

- Trigger: visual group headers.
- Result: can be filtered or collapsed later.
- Current status: implemented (static grouping).

### Activity Filters (Future)

- Trigger: filter icon in Activity header.
- Result: opens filter sheet.
- Options: Lyrics, Covers, Genres, Checks, Errors.
- Current status: not implemented.

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
- Fixed (all items in group fixed): not implemented.
- Ignored (all items in group ignored): not implemented.
- Empty queue (no items remaining): not implemented.
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
- Empty: not implemented.
- Filtered: not implemented.
- Errors only: not implemented.
- Summary detail: not implemented.

### Global

- Loading: not implemented.
- Disabled (buttons during apply): not implemented.
- Toast: not implemented.
- Confirmation dialog: not implemented.
- Bottom sheet: not implemented.
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
- `ForgeActivityDetailSheet`.
- `ForgeFilterSheet` (library and activity filters).
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

- Selection system (refactor from inline to `ForgeReviewItem`).
- `Fix selected` with confirmation sheet.
- `Fix all` with confirmation sheet.
- `Ignore selected` with reason sheet.
- Group expand/collapse polish.
- Empty group states.

### Batch 3: Review Item Detail Flows

- Missing lyrics detail sheet with mock preview.
- Cover comparison sheet with before/after placeholders.
- Genre picker sheet with suggested genres.
- Metadata diff sheet (old vs new mock values).
- Item status changes: fixed, ignored, error.

### Batch 4: Library Interactions

- Live search filtering.
- Artist detail sheet with Albums/Songs/Details tabs.
- Album detail sheet with track list and metadata fields.
- Song detail sheet with lyrics status and metadata fields.
- Missing metadata badge navigation to review.
- Sort/filter sheet.
- Empty and no-results states.

### Batch 5: Activity Interactions

- Activity card tap opens detail sheet.
- `Summary` and `Review` pill wiring.
- Today/Yesterday grouping polish.
- Activity filter sheet.
- Empty and filtered states.

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
