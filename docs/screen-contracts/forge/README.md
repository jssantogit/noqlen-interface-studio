# Forge Screen Contract

Forge is a mock-only library care preview inside the Studio phone simulator, adapted with high visual fidelity from the legacy Noqlen UI Lab Forge screens.

## Bloco 0 Requirements

- Visible tab in the Studio app selector.
- Home, Review, Library and Activity mock screens inside Forge.
- Home includes the legacy-style `Forge` header, gear affordance, greeting, editorial missing-library headline, amber Review now CTA and attention cards.
- Review includes grouped review cards, local mock checkboxes, cover thumbnails and Fix selected/Fix all/Ignore selected visual actions.
- Library includes a search affordance, Artists/Albums/Songs segmented control, artwork/list rows, metadata attention badges and chevrons.
- Activity includes Today/Yesterday sections, colored icon circles, timestamps and Summary/Review pills.
- All actions are visual/mock-only.
- No real metadata is changed.
- No real files are touched.
- No backend, network calls, downloads, real library access, command execution, repository mutation or server mutation.

## Visual Target

- Forge implementation must follow `docs/visual-targets/forge.md` and `docs/references/forge/forge-screens-reference.png`.

## Primary Screens

- **ForgeHome** — editorial headline, greeting, amber CTA, attention summary cards, safety note.
- **ForgeReview** — grouped review queues, checkboxes, fix/ignore actions, cover thumbnails.
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

## Future Implementation Batches

Defined in `docs/interaction-maps/forge.md`:

- **Batch 2:** Review queue interactions (selection, fix selected, fix all, ignore selected, group expand/collapse).
- **Batch 3:** Review item detail flows (lyrics detail, cover comparison, genre picker, metadata diff, item status changes).
- **Batch 4:** Library interactions (search, tabs, item detail sheets, metadata badge navigation, sort/filter).
- **Batch 5:** Activity interactions (activity details, summary buttons, review navigation, filters).
- **Batch 6:** State coverage (empty/loading/error/ignored/fixed/filtered/no-results states).
- **Batch 7:** Completion audit.
