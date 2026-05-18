# Forge Enrich Mode UX Refinement Audit

**Tool Mode:** combo
**Block:** Bloco 3.5.3b
**Date:** 2026-05-18

## Summary

Refined the Step 1 (Rewrite options) experience of Forge Enrich Mode to reduce visual heaviness, clarify context, and improve selection status communication. The core 6-step flow and mock-only boundaries remain unchanged.

## Changes Applied

### A. Automatic Toast Removed

- **Before:** Enrich Mode showed an automatic `info` toast on screen load: `"Open Forge Settings from the Home gear icon"`.
- **After:** No toast fires automatically on entry. Toasts only appear after real user actions.
- Acceptable toasts preserved:
  - `"Forge Settings opened"` (when user taps Open Forge Settings)
  - `"Using current mock provider settings"` (not used automatically)
  - `"Rewrite options updated"` (implicit via UI state, no toast needed)
  - `"Enrich Mode completed in mock preview"` (after rewrite finishes)

### B. Header / Context Improved

- Title: `Enrich Mode` (unchanged).
- Subtitle updated: `"Choose what Forge should rewrite."` (was `"Choose which metadata Forge should reprocess and rewrite."`).
- Added small description line: `"Reprocess selected metadata using current provider settings."`
- Step indicator remains: `Options → Targets → Confirm → Dry-run → Apply`.
- Header block is now `sticky top-0` with a warm charcoal backdrop blur so step context stays visible while scrolling through collapsed cards.

### C. Compact / Collapsible Rewrite Option Cards

- Added `expandedCategories` state with **Tags expanded by default**; Covers, Lyrics, Advanced Metadata collapsed by default.
- Card header is a full-width tappable row with:
  - Category label
  - Selection count badge
  - Description
  - Expand/collapse chevron (`ChevronDown` with `rotate-180` when expanded)
- Collapsed card height is dramatically reduced; only header + provider chips are visible.
- Expanded card shows:
  - All sub-option checkboxes
  - Overwrite toggle row
  - Conditional extras (minimum image size chips for Covers; caution card for Advanced Metadata when overwrite enabled)
  - Provider hint chips
- Internal controls (checkboxes, toggles) use `stopPropagation` so they do not collapse the card.
- Card margin reduced from `mb-3 p-4` to `mb-2.5` with `p-3` header / `px-3 pb-3` body for tighter density.

### D. Selection Status Badge Replaced

- **Before:** `"Active"` / `"Off"` badge.
- **After:** Count-based badge:
  - `0 selected` — muted styling (`bg-white/[0.05] text-white/35`)
  - `N selected` (e.g., `2 selected`) — warm orange styling (`bg-[#e7a35f]/15 text-[#f0b879]`)
  - `All selected` — warm orange styling
- Badge updates live as checkboxes are toggled.

### E. Advanced Metadata Caution Improved

- **Before (toggle helper):** `"Caution: protected fields should stay unchanged unless necessary."`
- **After (toggle helper):** `"Advanced metadata can rewrite identity, release and audio fields. Protected fields should usually stay unchanged unless the source is verified."`
- **Before (conditional warning card):** `"Replacing protected identity fields can break library consistency. Only enable if you are rebuilding identity data."`
- **After (conditional warning card):** `"Only enable this when MusicBrainz or AcoustID identity is trusted."`
- Visual style remains calm orange-tinged border/background; no red alarm.

### F. Open Forge Settings — Discreet Helper Row

- **Before:** Large bordered card with two lines of text and a separate button.
- **After:** Compact single-row helper:
  - Left text: `"Using current mock provider settings"` (small, muted)
  - Right text: `"Open Forge Settings →"` (small, peach-orange link)
  - Minimal border (`border-white/[0.05]`), minimal background (`bg-white/[0.02]`), minimal padding (`px-3 py-2.5`).
- **Behavior:** Tapping opens Forge Settings sheet directly by calling the new `onOpenSettings` prop. The orchestrator (`ForgePreview.tsx`) closes Enrich Mode and opens the Settings sheet, then shows `"Forge Settings opened"` toast.
- If `onOpenSettings` is not provided (fallback), tapping shows `"Forge Settings opened"` toast only.

### G. Validation Copy Updated

- **Before:** `"Select at least one category to continue."`
- **After:** `"Select at least one rewrite option to continue."`
- Continue button disabled logic unchanged (at least one sub-option must be checked).

## Interaction Closure

All visible Enrich Mode controls respond after refinement:

- Category card expand/collapse works for all four categories.
- Category checkboxes toggle and update the count badge live.
- Replace existing toggles switch on/off.
- Provider/source chips remain decorative (non-tappable) but visually indicate sources.
- Open Forge Settings row opens Forge Settings sheet and closes Enrich Mode.
- Back button works on every step.
- Continue button validates correctly and transitions to Targets.
- Target selection still works (Library/Artists/Albums/Songs, search, select all, clear).
- Confirmation, dry-run, progress, and result steps still work.
- Review safe fixes behavior unchanged.
- Forge Settings still works.
- Forge Review regular tabs still work.
- Forge Library metadata editor still works.
- Forge Activity still works/renders.
- Anchor still opens.
- Aria still opens.
- Flux still opens.

## Mock-Only Safety

- No fetch/axios/fs/child_process/FileReader used.
- No real Forge Core called.
- No real metadata edited.
- No real files changed.
- No real credentials stored.
- All counts, progress steps and results remain deterministic mock data.

## Files Changed

- `src/apps/forge/components/ForgeEnrichMode.tsx`
- `src/apps/forge/ForgePreview.tsx`
- `docs/audits/forge-enrich-mode-app-flow.md`
- `docs/audits/forge-enrich-mode-ux-refinement.md` (this file)
- `docs/interaction-maps/forge.md`
- `docs/screen-contracts/forge/README.md`
- `docs/screen-contracts/forge/interactions.md`
- `docs/visual-targets/forge.md`
- `interface/context/delta.md`
- `interface/context/current.md`

## Remaining Gaps

- Minimum image size chips in Covers remain display-only (no functional selection).
- Provider chips remain decorative (no tappable provider info sheet yet).
- Activity → Library item navigation remains deferred.
- Enrich Mode does not persist its configuration between sessions (by design for mock preview).

## Raw Evidence Summary

- Component: `src/apps/forge/components/ForgeEnrichMode.tsx` (~1200 lines after refinement)
- Orchestrator: `src/apps/forge/ForgePreview.tsx`
- Build: passes
- Lint: passes
- Tests: passes
- Safety grep: no harmful matches (see safety scan results)
