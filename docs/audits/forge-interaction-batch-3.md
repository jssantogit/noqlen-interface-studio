# Forge Interaction Batch 3 Audit

## Model

opencode-go/kimi-k2.6

## Tool Mode

combo

## Scope

Bloco 3.3 — Forge Review Item Detail Flows.

## What was implemented

### Item detail state architecture

- Lifted review item state from `ForgeReview` to `ForgePreview`:
  - `itemStatuses: Record<string, ReviewItemStatus>` — tracks pending/fixed/ignored per item.
  - `selectedIds: Set<string>` — tracks checkbox selection.
  - `sessionFixed: number` — count of items fixed in current session.
  - `sessionIgnored: number` — count of items ignored in current session.
- `ForgeReview` now receives these as props plus setter callbacks, making it a presentational component for review queue rendering.
- Added `activeDetailSheet: ForgeDetailSheet` and `selectedReviewItemId: string | null` in `ForgePreview` to manage open detail sheets.
- Added `itemGenres: Record<string, string[]>` in `ForgePreview` to store mock genre selections per item.

### Missing lyrics detail flow (RV-6)

- **Trigger:** tap a lyrics review item outside the checkbox.
- **Component:** `ForgeLyricsDetailSheet` (bottom sheet).
- **Content:**
  - Song title, artist, album.
  - Metadata rows: Source (Studio mock suggestion), Confidence (High), Status (Ready to apply).
  - Mock lyrics preview using placeholder text only (`Verse preview unavailable in Studio mock...`).
  - No real or copyrighted lyrics are included.
- **Actions:**
  - `Apply lyrics` — marks item as `fixed`, shows toast, closes sheet.
  - `Ignore this item` — marks item as `ignored`, shows toast, closes sheet.
  - `Close` — closes sheet without changes.
  - `Preview changes` — opens `ForgeMetadataDiffSheet`.

### Cover comparison flow (RV-7)

- **Trigger:** tap a cover review item outside the checkbox.
- **Component:** `ForgeCoverComparisonSheet` (bottom sheet).
- **Content:**
  - Album title, artist.
  - Side-by-side current/suggested cover placeholders using `CoverGradient`.
  - Metadata rows: Confidence (Medium), Status (Ready to apply).
- **Actions:**
  - `Use suggested cover` — marks item as `fixed`, shows toast, closes sheet.
  - `Keep current` — marks item as `ignored`, shows toast, closes sheet.
  - `Ignore` — marks item as `ignored`, shows toast, closes sheet.
  - `Close` — closes sheet without changes.
  - `Preview changes` — opens `ForgeMetadataDiffSheet`.

### Genre picker flow (RV-8)

- **Trigger:** tap a genre review item outside the checkbox.
- **Component:** `ForgeGenrePickerSheet` (bottom sheet).
- **Content:**
  - Song title, artist, album.
  - Current genres: None.
  - Suggested genre chips: Modern Classical, Ambient, Piano, Instrumental, Electronic, Progressive.
  - Selected preview panel showing chosen genres.
- **Actions:**
  - `Apply genre` — marks item as `fixed`, stores selected genres in `itemGenres`, shows toast, closes sheet.
  - `Ignore this item` — marks item as `ignored`, shows toast, closes sheet.
  - `Close` — closes sheet without changes.
  - `Preview changes` — opens `ForgeMetadataDiffSheet`.

### Metadata diff sheet

- **Component:** `ForgeMetadataDiffSheet` (bottom sheet).
- **Content:**
  - Before/after diff rows with label, old value (strikethrough) and new value (emerald).
  - Mock-only note: `This is a mock preview. No real metadata will be changed.`
- **Actions:**
  - `Apply change` — marks item as `fixed`, shows toast, closes sheet.
  - `Close` — closes sheet without changes.
- **Access:** opened via `Preview changes` from any detail sheet.

### Queue sync behavior

- After apply/ignore from detail sheets:
  - `itemStatuses` updated in `ForgePreview`.
  - Item removed from pending queue in `ForgeReview`.
  - Group pending counts update automatically.
  - `sessionFixed`/`sessionIgnored` counters increment.
  - If item was selected, selection is cleared.
  - Toast appears confirming the action.
  - Empty queue state renders if no pending items remain.

### Row interaction split

- `ForgeReview` item rows now have two interactive areas:
  - **Checkbox button** — toggles selection (left side).
  - **Item body button** — opens detail sheet (right side, excluding checkbox).

## Raw evidence

- Build: `tsc -b && vite build` passes.
- ESLint: no errors in `src/apps/forge`.
- Tests: `vitest --run` passes (2/2).
- Safety grep: matches limited to existing static UI/docs safety text, mock display paths, masked mock secret fields in Anchor, SVG/static reference assets and boundary documentation; no new app behavior uses network, filesystem, `FileReader`, or process access.
- No copyrighted lyrics were added; all lyrics text is clearly fake placeholder copy.

## Deferred / not implemented in this batch

- Review covers from Library (RV-9) — requires Library detail sheets first.
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
- No real lyrics fetching.
- No real artwork downloads.
- No real secret values.
- All data is static and fictional.
- All state changes are local React state only.

## Remaining gaps

- Batch 4: Library interactions (search, detail sheets, badge navigation, sort/filter).
- Batch 5: Activity interactions (card taps, summary/review pills).
- Batch 6: State coverage (empty/loading/error states for all screens, mock state controls).
- Batch 7: Completion audit.

## Ready for Forge Batch 4?

Yes — item detail flows are complete; Library interactions can start next.
