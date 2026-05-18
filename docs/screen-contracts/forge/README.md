# Forge Screen Contract

Forge is a mock-only library care preview inside the Studio phone simulator, adapted with high visual fidelity from the legacy Noqlen UI Lab Forge screens.

## Bloco 0 Requirements

- Visible tab in the Studio app selector.
- Home, Review, Library and Activity mock screens inside Forge.
- Home includes the legacy-style `Forge` header, gear affordance, greeting, editorial missing-library headline, amber Review now CTA and attention cards.
- Review uses the redesigned All / Artwork / Lyrics / Metadata architecture with local mock checkboxes, cover thumbnails, summary CTA and contextual selected-row actions.
- Library includes a search affordance, Artists/Albums/Songs segmented control, artwork/list rows, metadata attention badges and chevrons.
- Activity includes Today/Yesterday sections, colored icon circles, timestamps and Summary/Review pills.
- All actions are visual/mock-only.
- No real metadata is changed.
- No real files are touched.
- No backend, network calls, downloads, real library access, command execution, repository mutation or server mutation.

## Visual Target

- Forge implementation must follow `docs/visual-targets/forge.md`, `docs/references/forge/forge-screens-reference.png` and the Review redesign target `docs/references/forge/forge_review_redesign.png`.

## Primary Screens

- **ForgeHome** — editorial headline, greeting, amber CTA, attention summary cards, safety note.
- **ForgeReview** — All / Artwork / Lyrics / Metadata queues, Metadata subfilters, checkboxes, summary CTA, contextual apply/ignore actions and preview-before-apply sheets.
- **ForgeLibrary** — search affordance, segmented control (Artists/Albums/Songs), artwork rows, metadata badges.
- **ForgeActivity** — Today/Yesterday groups, activity cards with icons, timestamps, Summary/Review pills.

## Interactive Completion Model

Forge is planned to become a complete mock-only interactive prototype. The interaction map and implementation batches live in:

- `docs/interaction-maps/forge.md`
- `docs/screen-contracts/forge/interactions.md`

Completion is defined by:

1. Every visible actionable element responds.
2. Every response is mock-only.
3. Review actions change local mock state.
4. Before/after previews exist for key fix types.
5. No real files or metadata are changed.
6. No real external metadata is fetched.
7. All screens have state coverage (empty, loading, error, fixed, ignored, filtered, no-results).
8. Visual fidelity remains close to the reference.
9. Virtual phone viewport stays stable.
10. No page-level horizontal overflow.

## Mock-Only Boundaries

Forge must never:

- Edit real music files.
- Edit real metadata.
- Edit lyrics.
- Edit artwork.
- Scan real folders.
- Fetch metadata.
- Download covers.
- Call a backend.
- Call Anchor Core.
- Call Navidrome.
- Use `fetch`/`axios` for app behavior.
- Use `FileReader`.
- Use `fs`.
- Use `child_process`.
- Access the filesystem.
- Store secrets.
- Add auth.
- Add analytics.

All data is static and fictional. All state changes are local React state only.

## Batch Status

- **Batch 1 (Overlay foundation + Home):** implemented in Bloco 3.1.
  - Created `ForgeBottomSheet`, `ForgeConfirmDialog`, `ForgeToast`, `ForgeSettingsSheet`, `ForgeSafetyNoteSheet`.
  - Wired Home `Review now`, attention cards with Review filter navigation, settings gear and safety note card.
  - Added minimal review-filter awareness to `ForgeReview`.

- **Batch 2 (Review Queue Interactions):** implemented in Bloco 3.2.
  - Added `ReviewItem` data model with `id`, `title`, `artist`, `album`, `type`, `status`.
  - Wired item checkbox selection for pending items only.
  - Implemented `Fix selected` with confirmation dialog and type breakdown.
  - Implemented `Fix all` with confirmation dialog and filter-aware scope.
  - Implemented `Ignore selected` with reason bottom sheet and optional reason chips.
  - Added session summary card (`X fixed`, `Y ignored`).
  - Added empty queue state with `View all` and `Reset mock queue`.
  - Polished group expand/collapse with chevron icons and pending-count updates.
  - Preserved review filter compatibility from Home cards.

- **Batch 3 (Review Item Detail Flows):** implemented in Bloco 3.3.
  - Created `ForgeLyricsDetailSheet` with mock placeholder lyrics (no copyrighted text), metadata rows, `Apply lyrics`, `Ignore`, `Close` and `Preview changes` actions.
  - Created `ForgeCoverComparisonSheet` with side-by-side current/suggested cover placeholders, `Use suggested`, `Keep current`, `Ignore`, `Close` and `Preview changes` actions.
  - Created `ForgeGenrePickerSheet` with suggested genre chips, selected preview, `Apply genre`, `Ignore`, `Close` and `Preview changes` actions.
  - Created `ForgeMetadataDiffSheet` with before/after rows, used as a secondary preview from all detail sheets.
  - Lifted review item state (`itemStatuses`, `selectedIds`, `sessionFixed`, `sessionIgnored`) from `ForgeReview` to `ForgePreview` so detail sheets can mutate queue state consistently.
  - Wired item row tap (outside checkbox) to open the corresponding detail sheet based on item type.
  - Individual apply/ignore actions in detail sheets update item status, show toast, remove item from pending queue and clear selection.
  - Added `itemGenres` local state to store mock genre selections per item.

- **Batch 3.3.2 (Visual System Refinement):** implemented in Bloco 3.3.2.
  - Refined Forge orange visual system across Home, Review, Library, Activity, bottom nav, cards, buttons, badges, thumbnails, sheets and dialogs.
  - Updated `ForgeCard` with premium gradient surface, inner highlight and soft shadow.
  - Updated `CoverGradient` with richer gloss overlay, bottom fade and refined vinyl indicator.
  - Replaced generic gray thumbnails with warm, evocative CSS gradients per album and per review item type.
  - Added tinted icon backgrounds to Home attention cards and Activity icon circles.
  - Refined primary CTA and action buttons with inner highlight and warm orange shadow.
  - Updated bottom nav with warmer background and stronger active state.
  - Updated all overlays (bottom sheet, confirm dialog, toast) with warm charcoal gradients.
  - Updated `forgeMockData.ts` with richer album gradients and activity `bgAccent` fields.
  - Preserved all existing interactions; no new Library/Activity interactions added.

- **Bloco 3.5 (Forge Activity Interactions):** implemented.
  - Enhanced `ActivityItem` data model with `activityType`, `status`, `provider`, `affectedCount`, `affectedItems`, `changedFields`, `relatedReviewTarget`, `relatedLibraryTarget` and `dateGroup`.
  - Created `ForgeActivityDetailSheet` with title, status, provider badge, affected items, changed fields and mock-only note.
  - Created `ForgeActivitySummarySheet` with concise result, grouped changes and provider badge.
  - Created `ForgeActivityFilterSheet` with type filters (All, Lyrics, Artwork, Metadata, Library edits, Warnings, Failed, Completed) and sort (Newest/Oldest first).
  - Wired Activity card tap to detail sheet, Summary pill to summary sheet, Review pill to related Review tab/filter.
  - Added filter button to Activity header with active filter chip and no-results empty state.
  - Made Today/Yesterday grouping robust: filtered results still group correctly, empty groups hidden.
  - Implemented dynamic Review -> Activity history: Review apply actions append a new activity entry.
  - Implemented dynamic Library editor -> Activity history: Library metadata editor save appends a `libraryEdit` entry.
  - Deferred Activity -> Library item navigation (shows toast).
  - Updated `ForgePreview` with mutable `activityItems` state and `appendActivity` helper.
  - Preserved mock-only boundaries: no backend, network, filesystem, real metadata edits, downloads, FileReader, secrets or analytics.

- **Bloco 3.4.5 (Forge Library Metadata Editor):** implemented.
  - Created `ForgeMetadataEditor` reusable full-screen editor for Artist, Album and Track entities.
  - Organized tabs per entity: Track (Overview, Artwork, Lyrics, Metadata, Audio, File info), Album (Overview, Artwork, Metadata, Release, Tracks, File info), Artist (Overview, Image, Metadata, Albums, Identity).
  - Implemented editable field pattern: label, current value, input below, dirty indicator, optional source badge, protected-field warning.
  - Implemented mock gallery picker (`ForgeImagePickerSheet`) with fake local images and fake online search results from Discogs, MusicBrainz Cover Art, Deezer and iTunes.
  - Implemented save/apply flow: Save → preview sheet (changed fields, Current → New, source badges) → progress sheet (Preparing changes / Applying mock metadata) → toast → local mock data update.
  - Implemented unsaved changes confirmation on back/cancel.
  - Wired Library row taps (artist, album, song) and chevron taps to open the corresponding editor.
  - Wired issue badge taps to open editor focused on relevant tab (Lyrics, Metadata, Artwork).
  - Added live search filtering with empty results state.
  - Nested navigation: Album Tracks tab rows open Track editor; Artist Albums tab rows open Album editor.
  - File info tabs are read-only with no editable fields and no Apply button.
  - Extended `forgeMockData.ts` with comprehensive metadata fields for all entity types.
  - Added mutable local library state in `ForgePreview` so edits persist within the session.
  - Review ↔ Library sync is partial/deferred; Library edits update local rows and toast, but do not automatically mutate Review queue state.
  - Preserved mock-only boundaries: no backend, network, filesystem, real metadata edits or downloads.
  - Did not start Forge Activity, Aria or Flux implementation.

- **Bloco 3.4.2 (Forge Review Architecture Redesign):** implemented.
  - Used `docs/references/forge/forge_review_redesign.png` as the active Review composition target.
  - Replaced the old grouped Missing Lyrics / Better Covers / Missing Genres primary structure with All / Artwork / Lyrics / Metadata.
  - Kept Identity inside Metadata and excluded Files from the main Review tabs.
  - Added Metadata subfilters: Tags, Identity, Release and Audio.
  - Added static redesigned review data and proposal status labels: Safe, Review, Protected, Conflict, Applied, Ignored and Read-only.
  - Replaced the permanent top `Fix selected` / `Fix all` / `Ignore selected` bar with the All summary CTA `Review safe fixes` and a compact contextual row-selection bar.
  - Updated Artwork rows to show current-cover, resolution or missing-cover facts only; comparison appears only after `Apply artwork` opens the artwork sheet.
  - Updated Lyrics rows for missing, incomplete and unsynced preview flows using fake placeholder lyrics only.
  - Updated Metadata rows with specific action labels: `Apply tags`, `Apply identity`, `Choose match`, `Apply release data`, `Apply audio data`.
  - Preserved Home navigation into Review: Review Now -> All, missing lyrics -> Lyrics, better covers -> Artwork, missing genres -> Metadata / Tags.
  - Preserved existing Forge Home, Library and Activity rendering and did not start Activity interactions.
  - Preserved mock-only boundaries: no backend, fetch/axios behavior, filesystem, FileReader, downloads, real metadata writes, real lyrics or artwork changes.

- **Bloco 3.4.3 (Forge Review Redesign Interaction Fixes):** implemented.
  - Fixed All item click behavior so rows open a complete item repair overview sheet instead of routing directly to Artwork.
  - Added grouped overview fix cards and routing actions for artwork, lyrics, tags, identity, release and audio previews.
  - Implemented the Review sort control with Priority, Most fixes, Needs review first, Artwork first, Lyrics first, Metadata first, Title A-Z and Recently found.
  - Removed Safe / Review counters from All queue rows while keeping the summary card manual-review count.
  - Reworked metadata previews into readable field-by-field current/suggested rows with wrapping text.
  - Added provider/source badges to artwork, lyrics and metadata preview/apply flows.
  - Preserved mock-only local state and did not start Forge Activity, Aria or Flux implementation.

- **Bloco 3.4.4 (Forge Review Progress Flows and Interaction Closure):** implemented.
  - Created `ForgeProgressSheet` component with deterministic step timing, source badge and result state.
  - Added progress flows for every apply/fix action: Review safe fixes, Apply artwork, Apply lyrics, Apply synced, Apply tags, Apply identity, Choose match, Apply release data, Apply audio data, Ignore item, Apply selected, Ignore selected.
  - Completed All item overview interactions: every grouped card action routes correctly; Apply safe fixes and Ignore item show progress.
  - Verified Sort, tab/filter, row/chevron and selection/contextual interactions are fully functional.
  - Improved Metadata preview readability with additional fields and `afterChips` rendering for suggested values.
  - Ensured provider/source badges are visible in previews, progress sheets and overview cards.
  - Local mock state updates after progress completion: items move to fixed/ignored, session counters increment, toast confirms.
  - Preserved mock-only boundaries: no backend, network, filesystem, real metadata edits or downloads.
  - Did not start Forge Activity, Aria or Flux implementation.

- **Bloco 3.5.1 (Forge Settings — Metadata Providers, Tags & Updates):** implemented.
  - Created `forgeSettingsCatalog.ts` typed model with 70+ settings, 10 provider configs, rewrite rules, credentials, and app update state.
  - Redesigned `ForgeSettingsSheet` from simple toggles into a full 8-category settings surface:
    - Metadata Providers: provider cards with role, fields, enable toggle, configure sheet, test mock action.
    - API Keys: masked credential fields for 9 providers with mock-only storage.
    - Tags & Metadata: behavior toggles, conflict policy, confidence, separator, rewrite rule editor.
    - Artwork: embed, folder cover, confidence, front preference, max size.
    - Lyrics: synced, local, sidecar, cache, conflict review, custom endpoint.
    - Audio: ReplayGain, backend, LUFS, key detection mode, advanced limits.
    - Safety & Review: dry-run, confirmation, conflict behavior, auto-apply, prune jobs.
    - App Updates: version info, channel, check/download/install mock flow with progress.
    - Advanced: database auto-scan, enrich presets, verbosity/debug.
  - Added progress flows for Save settings, Test mock provider, Check updates, Download update, Install update, Reset settings.
  - Added unsaved-changes confirmation on back.
  - Preserved mock-only boundaries: no real network, no real credential storage, no real config writes.
  - Did not start Forge State Coverage, Aria or Flux.

- **Bloco 3.5.2 (Forge Settings — Interaction Closure):** implemented.
  - Audited every visible control in Forge Settings and closed all interaction gaps.
  - Added API Keys as a real category with dedicated panel: 7 provider credential rows, password inputs, show/hide, clear, test, save and reset.
  - Fixed provider test steps from generic 2-step to provider-specific mock progress (MusicBrainz, Discogs, Last.fm, AcoustID, etc.).
  - Fixed secret input bug: removed `maskSecret` from the `value` prop of `type="password"` inputs so typing does not corrupt values.
  - Added clear button for all secret fields.
  - Save settings now toasts "No settings changes to save" when there are no unsaved changes instead of always showing progress.
  - Added app update failed state for Nightly channel with deterministic mock cycle (available → up_to_date → failed) and a "Retry check" button.
  - Added expandable/collapsible release notes in update available card.
  - Added "Back to categories" button inside every category panel.
  - Added Save settings and Reset buttons inside every category panel.
  - Added credential status dot on provider cards (green when set, dim when empty).
  - Deferred Enrich Mode controls: all `advanced.enrich_*` toggles are visually disabled, show a "Planned" badge, and open a planned sheet explaining they will be configured in the next Forge block.
  - Updated docs: interaction maps, screen contracts, integration contracts, audit doc, and context files.
  - Verified no dead controls remain in Settings.
  - Preserved mock-only boundaries: no fetch/axios/fs/child_process/FileReader, no real network, no real credential storage, no real config writes.
  - Did not implement Enrich Mode, Forge State Coverage, Aria or Flux.

## Future Implementation Batches

Defined in `docs/interaction-maps/forge.md`:

- **Batch 2:** Review queue interactions (selection, fix selected, fix all, ignore selected, group expand/collapse).
- **Batch 3:** Review item detail flows (lyrics detail, cover comparison, genre picker, metadata diff, item status changes).
- **Batch 4:** Library interactions (search, tabs, item detail sheets, metadata badge navigation, sort/filter).
- **Batch 5:** Activity interactions (activity details, summary buttons, review navigation, filters).
- **Batch 6:** State coverage (empty/loading/error/ignored/fixed/filtered/no-results states).
- **Batch 7:** Completion audit.
