# Legacy Forge Fidelity Audit

## Source

- Legacy repository: https://github.com/jssantogit/noqlen-ui-lab
- Local legacy path: `/root/projects/noqlen/_legacy/noqlen-ui-lab`
- Legacy commit inspected: `3e14d429cfbc9594b7a3c23fef1efa2fb4740b36`
- Current repository: `/root/projects/noqlen/noqlen-interface-studio`

## Legacy Forge Files Inspected

- `src/products/forge/ForgePrototype.tsx`
- `src/products/forge/components/ForgeBottomNav.tsx`
- `src/products/forge/components/ForgeSettingsSheet.tsx`
- `src/products/forge/data/forgeMockData.ts`
- `src/products/forge/flows/ForgeReviewNowFlow.tsx`
- `src/products/forge/screens/ForgeHomeScreen.tsx`
- `src/products/forge/screens/ForgeReviewScreen.tsx`
- `src/products/forge/screens/ForgeLibraryScreen.tsx`
- `src/products/forge/screens/ForgeActivityScreen.tsx`
- Shared legacy support files: `src/components/cards/Card.tsx`, `src/components/controls/SegmentedControl.tsx`, `src/components/navigation/ScreenHeader.tsx`, `src/components/phone/PhoneShell.tsx`

## Current Mismatch Found

Bloco 1.4 reused the legacy Forge idea but reduced it into a new simplified preview. The result changed the hierarchy, card density, typography scale, button style, review workflow and bottom navigation feel. It did not preserve the mature mobile screens from the legacy UI Lab.

Root cause: the previous port treated legacy Forge as inspiration instead of the primary visual source. It created a compact Studio-style reinterpretation rather than adapting the actual legacy Forge screen composition into the current `PhoneFrame`.

## Ported

- Forge Home screen hierarchy: `Forge` title, gear action, greeting, editorial headline, amber Review now CTA, attention cards and safety note.
- Forge Review workflow: title, `Select items to fix or ignore.`, Fix selected/Fix all/Ignore selected actions, grouped review cards, mock checkboxes, cover thumbnails and item counts.
- Forge Library screen: search affordance, Artists/Albums/Songs segmented control, artwork/list rows, metadata attention badges and chevrons.
- Forge Activity screen: Today/Yesterday group rhythm, activity cards, colored icon circles, timestamps and Summary/Review pills.
- Forge bottom navigation: Home, Review, Library and Activity with the legacy dark translucent bar and orange selected state.
- Legacy Forge mock data shape and fictional/static item names.

## Adapted

- Legacy screens were moved into `src/apps/forge/components/*` and hosted by the current `src/apps/forge/ForgePreview.tsx`.
- Legacy phone shell and scroll context were not ported. The current `PhoneFrame` and `AppViewport` remain the host environment.
- Legacy overlay flows and editable sheets were reduced to contained visual/mock behavior to avoid adding deeper app-specific metadata-edit interactions in this fidelity fix.
- Spacing was kept close to legacy but constrained to the current phone viewport, with internal vertical scrolling and bottom navigation inside the app preview.

## Not Ported

- Legacy external `ForgePrototype` desktop guide shell.
- Legacy `PhoneShell` hardware frame.
- Legacy settings sheet and full edit sheets.
- Any behavior implying real metadata edits, file changes, library scanning or backend work.

## Safety And Mock-Only Check

The required legacy source safety search found no executable backend/file/network behavior. Matches were mock-boundary text, product descriptions, or an unused static Vite asset. Ported Forge code uses static fictional data and local React state only.

Current Forge actions are visual/mock-only:

- Review now switches to the local Review tab.
- Fix selected, Fix all and Ignore selected only update local mock selection state.
- Library rows and activity cards do not read or write files.
- No metadata is changed.
- No network calls, backend calls, storage access, playback, downloads, secrets or personal paths were added.

## Visual Fidelity Notes

- The simplified `9 visual fixes` card and generic `Legacy review groups` copy were removed.
- The new Forge preview follows the legacy dark premium mobile styling, larger serif editorial home headline, dense review groups, artwork row rhythm and translucent bottom nav.
- The current Studio shell, app selector and realistic phone frame remain unchanged.

## Known Gaps

- The full legacy nested detail pages and edit sheets remain deferred for future app-specific Forge blocks.
- The settings gear is visual-only.
- The Review workflow keeps local mock selection state only and does not open the full legacy confirmation overlay.
