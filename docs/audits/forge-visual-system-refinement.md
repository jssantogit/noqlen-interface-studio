# Forge Visual System Refinement Audit

**Tool Mode:** combo (Playwright MCP + Chrome DevTools MCP conceptually; Playwright was primary due to X server limitation for Chrome DevTools MCP)

**Block:** Bloco 3.3.2

**Commit target:** `fix(forge): refine orange visual system across screens`

---

## Comparison Summary: Anchor Polish Benchmark vs Forge Orange Identity

Anchor uses a yellow/amber accent (`amber-300`/`amber-400`) with a server/local/control identity. Its polish comes from:
- Premium gradient card surfaces with inner highlights and soft shadows
- Disciplined spacing and typography
- Polished bottom nav with clear active states
- Subtle overlay depth

Forge must match this polish level while preserving its own orange identity. The key is not to copy Anchor's yellow but to apply the same surface, shadow, spacing, and hierarchy discipline using warm orange tones.

---

## Visual Issues Found

1. **Cards looked flat**: `bg-white/[0.045]` without gradient or inner highlight felt generic compared to Anchor's `linear-gradient(145deg,...)` surfaces.
2. **Thumbnails looked placeholder-like**: Gray stone/slate gradients were too similar and lacked the warmth of real album art placeholders.
3. **Buttons lacked premium finish**: No inner highlight or colored shadow on primary CTAs; disabled states were barely distinguishable.
4. **Bottom nav felt generic**: Background was cool-gray; active state was just text color change without background warmth.
5. **Activity icons lacked tint**: All used `bg-white/[0.055]` instead of colored backgrounds matching their accent.
6. **Overlays were cool-tinted**: Bottom sheets and dialogs used blue-gray gradients (`rgba(18,31,38,...)`) instead of warm charcoal.
7. **Library search was a static div**: No search icon or input-like affordance.
8. **Segmented control active state was flat**: Missing subtle shadow or warm tint.
9. **Session summary badges were plain text**: Needed pill/badge containers.
10. **Forge background was cool-tinted**: Needed a warm near-black base.

---

## Color/Accent Strategy

- **Primary accent:** `#e7a35f` (warm orange) — CTA buttons, active checkboxes, primary actions
- **Primary soft:** `#efad6c` (peach) — hover states
- **Primary dim:** `orange-300`, `orange-200` — labels, secondary accents
- **Success:** `emerald-300` — fixed counts, confidence indicators
- **Warning:** `orange-300` / `amber-300` — toasts, status labels
- **Danger:** `orange-500` / `orange-600` — destructive confirm tones
- **Surface base:** `linear-gradient(180deg,#0f0c0a,#080604_70%)` with warm radial gradient
- **Surface elevated:** `linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.025))` with `inset_0_1px_0_rgba(255,255,255,0.04)`
- **Border:** `white/[0.06]` with subtle warm variation
- **Bottom nav bg:** `#0a0c0e/92` (warmer than previous `#090b0d`)

---

## Screens Refined

- **ForgeHome** — attention cards with tinted icon backgrounds, premium CTA shadow, refined settings button
- **ForgeReview** — gradient group cards, premium action buttons, colored thumbnails per type, refined checkboxes, badge-style session summary
- **ForgeLibrary** — search icon affordance, richer album gradients, refined issue badges, cleaner row rhythm
- **ForgeActivity** — tinted icon circles, improved Summary/Review pills, stronger section headers
- **ForgeBottomNav** — warmer background, active state readability, focus ring
- **ForgeBottomSheet** — warm charcoal gradient background, warm subtitle text
- **ForgeConfirmDialog** — warm background, consistent orange primary button
- **ForgeToast** — warm charcoal background, orange-toned dismiss button
- **ForgeSettingsSheet** — consistent orange save button
- **Detail sheets** (Lyrics, Cover, Genre, MetadataDiff) — consistent orange primary actions, better thumbnails

---

## Components Changed

- `src/apps/forge/components/ForgeCard.tsx` — gradient surface, inner highlight, shadow; `CoverGradient` improved gloss overlay and vinyl indicator; `SegmentedControl` active shadow
- `src/apps/forge/components/ForgeHome.tsx` — tinted icon backgrounds, premium CTA shadow
- `src/apps/forge/components/ForgeReview.tsx` — gradient group cards, premium buttons, type-colored thumbnails, badge summary, refined ignore sheet chips
- `src/apps/forge/components/ForgeLibrary.tsx` — search affordance, richer thumbnails, refined badges
- `src/apps/forge/components/ForgeActivity.tsx` — tinted icon circles, colored pills
- `src/apps/forge/components/ForgeBottomNav.tsx` — warmer bg, readable active state, focus ring
- `src/apps/forge/components/ForgeBottomSheet.tsx` — warm gradient bg, warm subtitle
- `src/apps/forge/components/ForgeConfirmDialog.tsx` — warm bg, orange button, inner highlight
- `src/apps/forge/components/ForgeToast.tsx` — warm bg, orange dismiss
- `src/apps/forge/components/ForgeSettingsSheet.tsx` — orange save button with shadow
- `src/apps/forge/components/ForgeLyricsDetailSheet.tsx` — orange apply button, warm thumbnail
- `src/apps/forge/components/ForgeCoverComparisonSheet.tsx` — orange apply button, warm suggested label
- `src/apps/forge/components/ForgeGenrePickerSheet.tsx` — orange apply button, warm thumbnail, orange selected chips
- `src/apps/forge/components/ForgeMetadataDiffSheet.tsx` — orange apply button
- `src/apps/forge/ForgePreview.tsx` — warm background gradient
- `src/apps/forge/forgeMockData.ts` — richer album cover gradients, activity `bgAccent` fields

---

## Thumbnail/Artwork Strategy

- **No external images, no fetch, no downloads** — all thumbnails are CSS gradients.
- **Album data updated** with richer, more evocative gradients:
  - `All Melody`: `from-amber-100 via-orange-300 to-stone-700`
  - `Spaces`: `from-slate-300 via-slate-500 to-stone-900`
  - `The Bells`: `from-zinc-800 via-zinc-600 to-amber-200`
  - `Music for Animals`: `from-stone-400 via-emerald-800 to-neutral-950`
  - `Felt`: `from-neutral-200 via-stone-400 to-stone-800`
  - `Empty`: `from-neutral-700 via-stone-500 to-neutral-900`
- **Review item thumbnails** vary by type:
  - Lyrics: warm orange gradient
  - Covers: violet gradient
  - Genres: amber gradient
- **CoverGradient component** enhanced with:
  - Stronger gloss overlay (`rgba(255,255,255,.38)`)
  - Bottom gradient fade (`rgba(0,0,0,.25)`)
  - Better vinyl indicator (`ring-1 ring-white/10`)
  - Shadow for depth

---

## Interaction Regression Result

All existing interactions verified via Playwright MCP:

- Home `Review now` works ✅
- Home issue cards navigate to Review filters ✅
- Settings gear opens settings sheet ✅
- Safety note card opens safety sheet ✅
- Review selection works ✅
- Fix selected works (confirmation dialog → toast → queue update) ✅
- Fix all works ✅
- Ignore selected works ✅
- Group expand/collapse works ✅
- Item detail sheets open (lyrics, covers, genres) ✅
- Individual apply/ignore in detail sheets works ✅
- Library tab renders ✅
- Activity tab renders ✅
- Anchor still opens ✅
- Aria/Flux still accessible ✅
- No console errors ✅

---

## Remaining Visual Gaps

- **Library interactions** (search filtering, row taps, detail sheets) are not yet implemented; this block is visual-only.
- **Activity interactions** (card taps, filter sheet) are not yet implemented.
- **State coverage** (empty, loading, error states) is not yet implemented.
- Some detail sheet thumbnails could be further personalized per album, but the current type-based variation is sufficient for the visual pass.

---

## Raw Evidence Summary

- Playwright screenshots captured for Forge Home, Review, Library, Activity, detail sheets, and confirmation dialogs.
- Overflow checks passed at 360x800, 390x844, 430x932, 1366x768, 1440x900.
- Safety grep: no fetch/axios/fs/child_process/FileReader in app behavior; only static docs/UI text matches.
- Build: `npm run build` passes.
- Lint: `npm run lint` passes.
- Tests: `npm run test -- --run` passes (2/2).
- GitHub Pages build: `GITHUB_PAGES=true npm run build` passes.
