# Forge Enrich Mode App Flow Audit

**Tool Mode:** combo
**Block:** Bloco 3.5.3
**Date:** 2026-05-18

## Summary

Implemented a dedicated app-style Enrich Mode workflow for Forge focused on forced metadata refresh/rewrite. Enrich Mode is a full-screen in-phone flow with 6 steps: Rewrite options → Target selection → Confirmation → Dry-run → Progress → Result.

## Enrich Mode Entry Point

- Located in **Review / All** summary card, below the `Review safe fixes` CTA.
- Helper row: `Open Enrich Mode →` with microcopy `Rewrite selected metadata using provider settings.`
- Styled as an understated secondary button with `Wand2` icon.
- **Review safe fixes** retains its existing behavior unchanged.

## Distinction from Review Safe Fixes

- **Review safe fixes:** applies only low-risk/safe proposals one by one or in batch. Does not overwrite existing values. Does not force reprocessing.
- **Enrich Mode:** force rewrite/reprocess workflow. Can overwrite existing metadata depending on toggle settings. Runs a dry-run before applying. Covers Tags, Covers, Lyrics and Advanced Metadata categories.

## Rewrite Option Behavior (Step 1)

- Four categories: **Tags**, **Covers**, **Lyrics**, **Advanced Metadata**.
- Each category has checkable sub-options (e.g., Genre, Style, Mood, Last.fm Tags for Tags).
- Overwrite toggles per category:
  - Tags: Replace existing tag values
  - Covers: Replace existing artwork
  - Lyrics: Replace existing lyrics
  - Advanced: Replace protected identity fields (shows warning when enabled)
- Covers category exposes minimum image size chips (600px, 1000px, 1400px) for display.
- Advanced overwrite shows a caution card when enabled.
- Provider hint chips appear below each category (Last.fm, Discogs, MusicBrainz, etc.).
- Continue disabled until at least one category option is selected.
- Settings integration hint: `Using current mock provider settings` with `Open Forge Settings →` link.

## Target Selection Behavior (Step 2)

- Four target modes: **Library**, **Artists**, **Albums**, **Songs**.
- Library mode shows an `Entire library` card with mock counts (1,248 tracks, 96 albums, 42 artists).
- Artists/Albums/Songs modes show selectable rows with checkboxes, compact metadata chips and counts.
- Search input filters rows in real time.
- Select all visible / Clear selection actions available.
- Continue disabled until entire library is selected or at least one item is chosen.

## Confirmation Behavior (Step 3)

- Shows summary cards for:
  - Selected categories (as chips)
  - Selected target
  - Overwrite options enabled/disabled
- Warning card: `This is a force rewrite workflow. Studio preview will not change real files. In the real app, this must run as dry-run before apply.`
- Primary action: `Run dry-run`
- Back button returns to target selection.

## Dry-run Behavior (Step 4)

- **Dry-run progress** shows 5 deterministic mock steps:
  1. Preparing selected targets
  2. Checking current metadata
  3. Comparing provider suggestions
  4. Finding fields that would be overwritten
  5. Building rewrite plan
- Steps animate with ~700ms timing each.
- **Dry-run result** shows mock counts:
  - 248 tracks scanned
  - 612 fields would be rewritten
  - 138 existing values replaced
  - 18 protected identity fields need review
  - 74 conflicts found
- Actions: `Start rewrite`, `Review conflicts`, `Back`.
- `Review conflicts` closes Enrich Mode and navigates to Review / All.

## Rewrite Progress Behavior (Step 5)

- Triggered by `Start rewrite`.
- Shows 7 deterministic mock steps:
  1. Preparing rewrite plan
  2. Rewriting tag values
  3. Updating artwork selections
  4. Updating lyrics data
  5. Processing advanced metadata
  6. Recording mock activity
  7. Finalizing result
- Steps animate with ~650ms timing each.
- No endless spinner; progress completes deterministically.

## Result Behavior (Step 6)

- Title: `Enrich Mode complete`
- Summary counts:
  - 438 mock changes applied
  - 138 existing values rewritten
  - 74 items sent to Review
  - 18 protected fields skipped
  - 0 real files changed
- Category result cards: Tags rewritten, Covers updated, Lyrics updated, Advanced metadata processed.
- Actions:
  - `View Review queue` → navigates to Review / All.
  - `View Activity` → navigates to Activity.
  - `Done` → closes Enrich Mode and returns to Review.

## Settings Integration

- Enrich Mode references current mock provider settings implicitly.
- Displays `Using current mock provider settings` with a link to open Forge Settings.
- Clicking opens a toast directing the user to the Home gear icon (non-blocking; full Settings sync is partial by design).

## Review Integration

- After Enrich Mode completes, `markSafeItemsApplied` marks all pending `Safe` review items as `fixed` locally and increments the session fixed counter.
- Conflicts remain in Review queue.
- Protected fields remain in Review queue.
- `View Review queue` action navigates to Review / All.

## Activity Integration

- After Enrich Mode completes, an activity entry is appended:
  - Title: `Enrich Mode completed`
  - Subtitle: `Source: Forge mock`
  - Changed fields: Tags, Covers, Lyrics, Metadata
  - Related review target: `all`
- `View Activity` action navigates to Activity.

## Interaction Closure

All visible Enrich Mode controls respond:

- `Open Enrich Mode` → opens Enrich Mode
- Back/close buttons work on every step
- Category toggles toggle
- Overwrite toggles toggle with warning states
- Target tabs switch
- Search filters rows
- Row select, select all visible, clear selection work
- Confirmation → dry-run works
- Dry-run progress completes
- Start rewrite, review conflicts, back work
- Result actions (view review, view activity, done) work
- Settings link shows toast

No dead controls remain.

## Mock-Only Safety

- No fetch/axios/fs/child_process/FileReader used.
- No real Forge Core called.
- No real metadata edited.
- No real files changed.
- No real credentials stored.
- All counts, progress steps and results are deterministic mock data.

## Remaining Gaps

- Minimum image size chips in Covers are display-only (no functional selection).
- Provider settings link is toast-only (full two-way sync with Settings would require deeper integration).
- Activity → Library item navigation remains deferred.
- Enrich Mode does not persist its configuration between sessions (by design for mock preview).

## Raw Evidence Summary

- Component: `src/apps/forge/components/ForgeEnrichMode.tsx` (~1150 lines)
- Entry point: `src/apps/forge/components/ForgeReview.tsx` SummaryCard
- Integration: `src/apps/forge/ForgePreview.tsx` state + overlay
- Build: passes (`tsc -b && vite build`)
- Lint: passes (`eslint .`)
- Tests: passes (`vitest --run`)
- Safety grep: no harmful matches (see safety scan results)
