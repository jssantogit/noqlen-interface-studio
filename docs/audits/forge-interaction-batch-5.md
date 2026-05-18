# Forge Interaction Batch 5 Audit — Activity Interactions

**Tool Mode:** combo
**Block:** Bloco 3.5
**Date:** 2026-05-18

## Scope

This block implements Forge Batch 5: Activity interactions.

- Activity card tap -> detail sheet.
- Summary button -> summary sheet.
- Review button -> navigate to related Review tab/filter.
- Activity filters with type and sort options.
- Today/Yesterday grouping robustness.
- Dynamic Review -> Activity history.
- Dynamic Library editor -> Activity history.

## What Changed

### Data Model

- `ActivityItem` interface extended with:
  - `activityType`: lyrics | artwork | tags | identity | release | audio | libraryEdit | libraryCheck | error
  - `status`: completed | pendingReview | warning | failed
  - `provider`: Discogs | Last.fm | MusicBrainz | AcoustID | Lyrics mock | LRC mock | Audio analysis mock | Gallery mock | Manual | Forge mock
  - `affectedCount`, `affectedItems`, `changedFields`
  - `relatedReviewTarget`, `relatedLibraryTarget`
  - `dateGroup`: today | yesterday
- `ActivityFilter` type added: all | lyrics | artwork | metadata | libraryEdit | warning | failed | completed
- `activityItems` mock data updated with 8 richer entries.

### Components Created

- `ForgeActivityDetailSheet.tsx` — bottom sheet with type/status/provider badges, affected items, changed fields, mock-only note, action buttons.
- `ForgeActivitySummarySheet.tsx` — bottom sheet with concise result, grouped changes, provider badge, action buttons.
- `ForgeActivityFilterSheet.tsx` — bottom sheet with type filters and sort options.

### Components Updated

- `ForgeActivity.tsx` — added props for callbacks, filter button, active filter chip, empty state, card tap, Summary/Review pill wiring, Today/Yesterday grouping.
- `ForgePreview.tsx` — added mutable `activityItems` state, filter/sort state, activity sheet state, `appendActivity` helper, Review/Library action wiring to append activities.

## Interaction Results

| Interaction | Status |
|---|---|
| Activity Card Tap (AC-1) | implemented |
| Summary Button (AC-2) | implemented |
| Review Button (AC-3) | implemented |
| Today/Yesterday Grouping (AC-4) | implemented |
| Activity Filters (AC-5) | implemented |
| Dynamic Review -> Activity History (AC-6) | implemented |
| Dynamic Library Editor -> Activity History (AC-7) | implemented |
| Activity -> Library Navigation (AC-8) | deferred |

## Review Button Navigation Mapping

- Lyrics activity -> Review / Lyrics
- Artwork activity -> Review / Artwork
- Tags activity -> Review / Metadata / Tags
- Identity activity -> Review / Metadata / Identity
- Release activity -> Review / Metadata / Release
- Audio activity -> Review / Metadata / Audio
- Library check -> Review / All

## Dynamic History

### Review -> Activity

When a Review item is fixed, `updateItemStatus` derives an `ActivityItem` from the review item and appends it via `appendActivity`. Entries include:
- Title mapped from action label (e.g., "Artwork updated", "Tags applied")
- Provider badge from action label mapping
- Changed fields from action label mapping
- `relatedReviewTarget` for future navigation
- `dateGroup: 'today'` with current time

### Library Editor -> Activity

When `handleSaveEntity` completes, it appends a `libraryEdit` activity entry with:
- Title: "Manual metadata edit"
- Provider: "Manual"
- `relatedLibraryTarget`: artist | album | track

## Visual Fidelity

- Activity cards use existing `ForgeCard` with gradient surface and inner highlight.
- Icon circles use existing tinted backgrounds (`bgAccent`) matching Forge visual system.
- Detail/summary sheets use existing `ForgeBottomSheet` with warm charcoal gradient.
- Filter sheet uses existing Forge bottom sheet pattern with orange accent selection.
- Empty state uses `Clock3` icon with subdued styling.
- No neon, no cyan/blue glow, no generic log table.

## Safety

- Safety grep result: matches limited to existing static UI/docs safety text, mock display paths in Anchor, SVG/static reference assets and boundary documentation. No new app behavior uses network, filesystem, `FileReader`, or process access.
- No `fetch` / `axios` / `FileReader` / `fs` / `child_process` used in Forge app code.
- No real secret values.
- No real metadata editing.
- No real log reading.

## Remaining Gaps

- Activity -> Library item navigation is deferred (AC-8).
- Library filter/sort sheet is not implemented (LB-8).
- Home all-clear state is not implemented.
- Review partial error state is not implemented.
- Loading states are not implemented.
- Mock state controls inside Forge Settings are not implemented.

## Build & Test

- `npm run lint` passes.
- `npm run build` passes.
- `npm run test -- --run` passes (2/2).
- `GITHUB_PAGES=true npm run build` passes.
- `git diff --check` passes.

## Raw Evidence

- Staged files: `src/apps/forge/ForgePreview.tsx`, `src/apps/forge/forgeMockData.ts`, `src/apps/forge/components/ForgeActivity.tsx`, `src/apps/forge/components/ForgeActivityDetailSheet.tsx`, `src/apps/forge/components/ForgeActivitySummarySheet.tsx`, `src/apps/forge/components/ForgeActivityFilterSheet.tsx`.
- Docs updated: `docs/interaction-maps/forge.md`, `docs/screen-contracts/forge/interactions.md`, `docs/screen-contracts/forge/README.md`, `interface/context/delta.md`.
- Audit created: `docs/audits/forge-interaction-batch-5.md`.
