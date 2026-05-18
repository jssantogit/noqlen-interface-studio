# Forge Interaction Batch 2 Audit

## Model

opencode-go/kimi-k2.6

## Tool Mode

combo

## Scope

Bloco 3.2 — Forge Review Queue Interactions.

## What was implemented

### Review data model

- Added `ReviewItem` and `ReviewItemStatus` types to `src/apps/forge/forgeMockData.ts`.
- Each review item now carries:
  - `id` — stable identifier for selection and status tracking.
  - `title` — item title (song or album name).
  - `artist` — artist name.
  - `album` — optional album name.
  - `type` — `lyrics` | `covers` | `genres`.
  - `status` — `pending` | `fixed` | `ignored`.
- Updated `reviewGroups` static data to use the new `ReviewItem[]` shape.
- Status state is kept local to `ForgeReview` as a `Record<string, ReviewItemStatus>`.
- Session counters (`sessionFixed`, `sessionIgnored`) track how many items were fixed or ignored in the current preview session.

### Selection behavior

- Item checkbox toggles selection for **pending** items only.
- Fixed/ignored items are not rendered in the pending queue, so they cannot be selected.
- Selected state is visually clear: amber checkbox with a checkmark.
- `Fix selected` and `Ignore selected` buttons are disabled when no items are selected.
- Disabled buttons use reduced opacity and `cursor-not-allowed`.
- Selected count appears on the `Fix selected` button label: `Fix selected (N)`.

### Fix selected

- Trigger: tap `Fix selected (N)` button.
- If no selection: button is disabled (no toast needed because disabled).
- If selection exists: opens `ForgeConfirmDialog` via `showConfirm` prop.
- Dialog content:
  - Title: `Fix selected items?`
  - Description: includes count and optional breakdown by type.
  - Primary: `Fix selected`
  - Secondary: `Cancel`
- On confirm:
  - Selected pending items status becomes `fixed`.
  - `sessionFixed` incremented.
  - Selection cleared.
  - Toast: `Selected fixes applied in mock preview`.

### Fix all

- Trigger: tap `Fix all (N)` button.
- Opens `ForgeConfirmDialog`.
- Dialog content:
  - Title: `Fix all review items?`
  - Description: includes total pending count and current filter label.
  - Primary: `Fix all`
  - Secondary: `Cancel`
- On confirm:
  - All pending items in the current filter become `fixed`.
  - If filter is `lyrics`, only lyrics pending items are fixed.
  - If filter is `all`, all pending items across all groups are fixed.
  - `sessionFixed` incremented.
  - Selection cleared.
  - Toast: `Review queue fixed in mock preview`.

### Ignore selected

- Trigger: tap `Ignore selected` button.
- If no selection: button is disabled.
- If selection exists: opens a `ForgeBottomSheet` (ignore reason sheet).
- Sheet content:
  - Title: `Ignore selected items?`
  - Description: `Ignored items will be hidden from the active review queue in this mock preview.`
  - Optional reason chips: `Not needed`, `Wrong suggestion`, `Review later`, `Keep current metadata`.
  - Primary: `Ignore selected`
  - Secondary: `Cancel`
- On confirm:
  - Selected pending items status becomes `ignored`.
  - `sessionIgnored` incremented.
  - Selection cleared.
  - Sheet closes.
  - Toast: `Selected items ignored in mock preview`.

### Fixed/ignored display behavior

- Fixed/ignored items are **removed** from the active pending group.
- Group headers show updated pending counts (e.g., `2 pending` instead of `2 items`).
- A session summary card appears above the action buttons when `sessionFixed > 0 || sessionIgnored > 0`.
  - Shows `X fixed` (emerald) and `Y ignored` (orange).
- Items that become fixed or ignored are never left selected.

### Empty queue behavior

- When all items in the current filter are fixed or ignored:
  - Title: `Review queue clear`
  - Message: `No pending items for this filter.`
  - Actions:
    - `View all` — clears the active filter (only visible when a filter is active).
    - `Reset mock queue` — resets all items back to `pending`, clears session counters, clears selection.
- Reset shows toast: `Mock review queue reset`.

### Group expand/collapse reliability

- Group headers are fully clickable buttons.
- Show/Hide pill still toggles state.
- Chevron icon added (`ChevronUp`/`ChevronDown`) for clearer affordance.
- State persists while on Review.
- Collapsed groups do not render item rows.
- Groups with zero pending items are hidden entirely.

### Review filter compatibility

- `ForgeReview` accepts `filter` prop from `ForgePreview`.
- When filter is active, only the matching group is shown.
- Active filter chip renders above action buttons with filter name and `queue` label.
- A `View all` link appears next to the filter chip to clear the filter.
- Home cards still navigate to Review with the correct filter:
  - Missing Lyrics → `lyrics`
  - Better Covers → `covers`
  - Missing Genres → `genres`
- `Fix all` respects the current filter.

### Toast behavior

- Uses existing `ForgeToast` via `showToast` prop.
- Success toasts for fix/ignore actions.
- Info toast for reset.
- Warning toast for no-selection cases (buttons are disabled, but defensive toasts exist in handler logic).

## Raw evidence

- Build: `tsc -b && vite build` passes.
- ESLint: no errors in `src/apps/forge`.
- Tests: `vitest --run` passes (2/2).
- Safety grep: matches limited to existing static UI/docs safety text, mock display paths, masked mock secret fields in Anchor, SVG/static reference assets and boundary documentation; no new app behavior uses network, filesystem, `FileReader`, or process access.

## Deferred / not implemented in this batch

- Missing lyrics item detail sheet (RV-6).
- Cover comparison sheet (RV-7).
- Genre picker sheet (RV-8).
- Review covers from Library (RV-9).
- Library interactions (Batch 4).
- Activity interactions (Batch 5).
- Forge state coverage / empty states for all screens (Batch 6).
- Mock state controls inside Forge Settings (GL-4).
- Aria, Flux and new Anchor features remain untouched.

## Mock-only safety result

- No real metadata or files changed.
- No fetch/axios in app behavior.
- No `FileReader`.
- No `fs`.
- No `child_process`.
- No real file access.
- No real secret values.
- All data is static and fictional.
- All state changes are local React state only.

## Remaining gaps

- Batch 3: Review item detail flows (lyrics detail, cover comparison, genre picker, metadata diff).
- Batch 4: Library interactions (search, detail sheets, badge navigation).
- Batch 5: Activity interactions (card taps, summary/review pills).
- Batch 6: State coverage (empty/loading/error states for all screens, mock state controls).
- Batch 7: Completion audit.

## Ready for Forge Batch 3?

Yes — queue-level interactions are complete; item detail sheets can start next.
