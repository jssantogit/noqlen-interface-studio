# Legacy UI Lab Reuse Audit

## Source

- Legacy repository: https://github.com/jssantogit/noqlen-ui-lab
- Local audit path: `/root/projects/noqlen/_legacy/noqlen-ui-lab`
- Legacy commit inspected: `3e14d429cfbc9594b7a3c23fef1efa2fb4740b36`
- Current repository: `noqlen-interface-studio`
- Current source of truth: the Studio simulator shell and current `PhoneFrame`

## Folders And Files Inspected

- `package.json`, `package-lock.json`, `vite.config.ts`, `tailwind.config.ts`
- `README.md`
- `docs/component-guidelines.md`
- `docs/ecosystem-visual-direction.md`
- `docs/product-boundaries.md`
- `src/app/App.tsx`
- `src/app/LabShell.tsx`
- `src/components/cards/Card.tsx`
- `src/components/controls/SegmentedControl.tsx`
- `src/components/navigation/ScreenHeader.tsx`
- `src/components/phone/PhoneShell.tsx`
- `src/design/productIdentity.ts`
- `src/design/tokens.ts`
- `src/products/anchor/AnchorPrototype.tsx`
- `src/products/aria/AriaPrototype.tsx`
- `src/products/flux/FluxPrototype.tsx`
- `src/products/forge/ForgePrototype.tsx`
- `src/products/forge/components/ForgeBottomNav.tsx`
- `src/products/forge/components/ForgeSettingsSheet.tsx`
- `src/products/forge/data/forgeMockData.ts`
- `src/products/forge/flows/ForgeReviewNowFlow.tsx`
- `src/products/forge/screens/ForgeHomeScreen.tsx`
- `src/products/forge/screens/ForgeReviewScreen.tsx`
- `src/products/forge/screens/ForgeLibraryScreen.tsx`
- `src/products/forge/screens/ForgeActivityScreen.tsx`

## Legacy Safety Search

The required safety search found only mock-boundary text and product descriptions containing terms like server/download. No source file performed real network calls, file reads, server control, playback, secrets handling, child processes or destructive operations.

Matches inspected:

- `src/app/LabShell.tsx`: mock-only statement. Safe.
- `src/design/productIdentity.ts`: product copy for Flux and Anchor. Safe as description only.
- `src/products/flux/FluxPrototype.tsx`: mock-only warning. Safe.
- `src/products/anchor/AnchorPrototype.tsx`: mock-only warning. Safe.
- `src/assets/vite.svg`: static asset content. Not reused.

## Reusable Candidates

- Forge review task grouping, issue counts and mock copy.
- Forge library album rows, cover gradients and metadata attention states.
- Forge activity summary language and safety framing.
- Forge bottom navigation pattern for Home, Review, Library and Activity.
- Aria planned tab taxonomy: Now Playing, Library, Playlists and Queue.
- Shared glass cards, compact bottom navigation, warm accent buttons and album-cover gradient treatment.

## Reused

- Forge mock data concepts were ported into `src/apps/forge/forgeMockData.ts` as smaller static data shaped for the current Studio.
- Forge bottom-navigation behavior was adapted into `src/apps/forge/ForgePreview.tsx` while staying inside the current phone viewport.
- Forge Home, Review, Library and Activity preview concepts were adapted into one current-architecture preview component.
- Aria tab taxonomy from legacy product identity was reused for the current Aria bottom navigation labels.
- Aria gained static queue/library/player mock data in `src/apps/aria/ariaMockData.ts` to make the preview stronger than the old planned-tab placeholder.

## Rewritten Or Adapted

- Legacy Forge screens were not copied directly. They were rewritten into the current `src/apps/forge` structure to avoid importing the old `PhoneShell`, old lab shell and overlay flows.
- Legacy Forge review flow was reduced to static/mock decision cards because full overlay flow work belongs in a later app-specific block.
- Legacy card, segmented control and screen-header patterns were absorbed as visual patterns instead of imported as shared components.
- Aria was mostly rewritten because the legacy Aria file only contained planned-tab cards, not a mature player/library interface.

## Discarded

- Legacy `LabShell` and routing: discarded because the current Studio simulator shell is the source of truth.
- Legacy `PhoneShell`: discarded because the current `PhoneFrame` is more realistic and already responsive.
- Legacy global CSS, Tailwind config and design token files: discarded to avoid broad visual regression and architecture drift.
- Legacy Anchor and Flux prototypes: discarded because they were only planned-tab placeholders and did not improve the current previews.
- Legacy Forge settings sheet and full review overlay: deferred because they add deeper app-specific behavior beyond this selective reuse block.
- Legacy assets, Vite defaults and repo hygiene files: discarded.

## Acceptance Rationale

- Accepted Forge because it was the only legacy product with a mature, app-specific visual flow.
- Accepted Aria taxonomy because it clarified the player/library navigation without importing weak legacy UI.
- Rejected old shell and phone frame because they would overwrite recent simulator work and risk responsive regressions.
- Rejected direct copy of legacy architecture because current app previews must render inside the current phone viewport and app selector.

## Mock-Only Check

- Ported data is static and fictional.
- Player controls are visual buttons only.
- Forge review actions are visual/mock-only and do not edit metadata.
- No real backend calls, file access, playback, downloads, server controls, secrets or personal paths were added.

## Known Limitations

- Forge tabs are lightweight previews, not full nested screens.
- Forge review flow overlays and editable detail sheets remain deferred for app-specific blocks.
- Aria is improved, but the legacy repo did not contain a mature Aria player/library screen to port directly.
- Anchor and Flux remain current Studio previews because the legacy versions were not stronger.
