# Delta

Bloco 3.6 delta:

- Added Forge mock state coverage with local `ForgeMockScenario` selection and derived `ForgeMockState` flags.
- Added the Studio-only Preview States panel in Forge Settings > Advanced.
- Added shared Forge state UI components for empty, warning, error and preview-state control patterns.
- Covered alternate states across Forge Home, Review, Library, Activity, Settings and Enrich Mode without adding real backend, filesystem, provider, download, gallery, update or metadata behavior.
- Documented the state matrix, cross-surface actions, mock-only safety result and deferred gaps in `docs/audits/forge-state-coverage.md`.

Workflow retrofit delta:

- Inspected latest `noqlen-playbook` outside this repository at commit `27d637f`.
- Updated local workflow guidance for the current loop: Plan -> Block -> Prompt -> Tool Mode -> Implement -> Validate -> Audit -> Fix -> Commit -> Handoff -> Next block.
- Added Tool Mode, optimized environment bootstrap, raw evidence and local tool hygiene guidance.
- Added prompt/spec template fields for Tool Mode, environment assumptions, validation evidence, repo hygiene evidence and handoff notes.
- Added repository hygiene validation helper for tracked local tooling/generated artifacts.
- No product UI or app behavior should change in this workflow retrofit block.

Initial repository delta for Bloco 0:

- Created app scaffold.
- Installed required UI, motion, routing and test dependencies.
- Added documentation, workflow context and review checklists.
- Added local Browser MCP configuration outside tracked files.

Bloco 0.1 delta:

- Added GitHub Actions Pages deployment for the static interface studio.
- Added `GITHUB_PAGES=true` Vite base switching for `/noqlen-interface-studio/` production deploys.
- Documented the public Pages URL, static/mock-only boundary and local/deployed validation steps.

Bloco 1 delta:

- Replaced the dashboard/landing-page shell with a premium mobile simulator shell.
- Added Studio top bar, app switcher, discreet inspector and phone frame components.
- Added static Anchor, Forge, Aria and Flux placeholders inside the simulated phone.
- Removed the giant hero, bootstrap badges, repeated mock-only cards and fake progress bars from the main UI.
- Documented that the Studio is a simulator and that app-specific interactive screens start only after this visual base is stable.

Bloco 1.1 delta:

- Hardened the responsive Studio shell with CSS sizing variables, dynamic viewport units and safe-area-aware padding.
- Constrained phone simulator width and height across mobile, tablet and desktop breakpoints.
- Preserved internal phone viewport scrolling while preventing horizontal page overflow.
- Kept mobile/tablet layouts centered and single-column, with desktop switching to a restrained side-rail/inspector layout.
- Added the responsive shell visual contract and kept app previews as static placeholders only.

Bloco 1.1 overflow audit delta:

- Audited computed mobile layout from `html` through the phone app viewport.
- Found the persistent visual bug in the inner phone screen: fixed height plus `aspect-ratio` caused a screen width narrower than the outer frame.
- Changed the phone screen to be width-driven so the outer frame, screen and app viewport align on mobile.
- Documented the root cause and validation viewport set in the responsive shell contract.

Bloco 1.3 delta:

- Refined the simulator phone frame into a taller, slimmer hardware-like silhouette.
- Reworked the outer chassis, bezel, embedded screen, dynamic island, status bar and home indicator with restrained shadows and near-black materials.
- Added subtle side-button hints without making the frame decorative or image-based.
- Kept Anchor as the default preview and kept Anchor, Forge, Aria and Flux as static placeholders only.
- Documented the phone frame realism rules and preserved the responsive no-horizontal-overflow contract.

Bloco 1.4 delta:

- Cloned and audited legacy `jssantogit/noqlen-ui-lab` outside the current repository at `/root/projects/noqlen/_legacy/noqlen-ui-lab`.
- Recorded inspected legacy commit `3e14d429cfbc9594b7a3c23fef1efa2fb4740b36`.
- Reused mature Forge UI Lab patterns for review groups, library rows, activity summaries and bottom navigation.
- Expanded Aria with static mock player, library shelves and queue content using the legacy planned tab taxonomy.
- Preserved the current Studio shell, app selector, phone frame, GitHub Pages deploy architecture and mock-only boundary.

Bloco 1.4.1 delta:

- Replaced the simplified Forge reinterpretation with high-fidelity legacy Forge mobile screens.
- Ported/adapted Forge Home, Review, Library and Activity into `src/apps/forge/components` while keeping the current Studio shell and `PhoneFrame`.
- Restored legacy Forge visual hierarchy: editorial Home screen, amber CTA, dense review groups, segmented Library, Activity sections and translucent bottom nav.
- Kept all Forge behavior local/mock-only with no metadata edits, file access, backend calls or network calls.

Bloco visual reference delta:

- Added committed visual references and visual target contracts for Anchor, Forge and Aria.
- Added the committed Flux visual reference and updated the Flux visual target contract.

Bloco 2 delta:

- Replaced the Anchor placeholder with a high-fidelity mock mobile UI inside the existing phone simulator.
- Added Anchor Home, Servers, Library and Activity screens with internal bottom navigation controlled by Anchor state.
- Added static Anchor mock data for Navidrome status, server list, library stats, mock folder display copy and activity history.
- Preserved the Studio shell, app switcher, `PhoneFrame`, Forge, Aria, Flux and GitHub Pages deployment architecture.
- Documented Anchor screen contracts, mock-only boundaries and the fidelity foundation audit.

Bloco 2.2 delta:

- Added the complete Anchor interaction coverage map for Home, Servers, Library and Activity.
- Added an implementation-oriented Anchor interaction contract with triggers, resulting UI, mock state changes, data sources, forbidden real behavior and completion status.
- Clarified that Anchor's four reference screens are base surfaces and that Anchor must become a complete mock-only interactive prototype before starting Forge, Aria or Flux expansion.
- Added static Anchor interaction metadata for future batches without wiring new behavior.
- Defined future Anchor implementation batches for overlays, Home interactions, Servers interactions, Library interactions, Activity interactions and state polish.

Bloco 2.3 delta:

- Added Anchor-local overlay primitives for bottom sheets, confirmation dialogs, toasts, fake QR previews, settings and scan progress.
- Wired Home settings, stop, restart, copy address, show QR code, refresh library and Library card navigation with local mock-only state.
- Added mock server states for active, stopped and restarting in the Home server card without backend, filesystem, network or server-control behavior.
- Kept Servers, Library deep interactions, Activity interactions, Forge, Aria and Flux outside this batch.

Bloco 2.4 delta:

- Added Anchor Servers mock interactions for add server, Navidrome details, server menu, server settings, log viewer and Jellyfin/Emby coming-soon sheets.
- Wired Servers actions through local React state only, including toast-only add/rename/duplicate feedback, local disabled state and confirmation-gated local removal until refresh.
- Added static mock log filtering without reading files, process output or terminal logs.
- Updated Anchor interaction contracts and created the Batch 2 audit while keeping Library deep interactions, Activity interactions, Forge, Aria and Flux untouched.

Bloco 2.5 delta:

- Added Anchor Library mock interactions for Change folder, Refresh library, Verify access, Library settings, Stats details and Scan history.
- Created Anchor-local Library sheets for fake folder selection, access checks, local visual settings, static stats and static scan history.
- Wired Library interactions through local React state only, including fake display path updates, Last scan text updates, local settings toggles and toast feedback.
- Documented that fake storage paths are display-only copy and are never used for filesystem, picker, permission, metadata, backend or network behavior.
- Kept Activity interactions, final state coverage, Forge, Aria and Flux outside this batch.

Bloco 2.6 delta:

- Added a dedicated Anchor > Servers Navidrome Settings Center for configuring a mock `navidrome.toml` profile.
- Created a typed curated Navidrome config catalog covering Basics, Network, Library Scanner, Artwork & Metadata, Playback & Transcoding, Features, Integrations, Security & Auth, Backup & Monitoring and Advanced.
- Wired settings entry points from the Navidrome card, details sheet and server menu to local-only draft editing with masked secret fields and risky setting warnings.
- Added searchable Advanced settings, display-only TOML preview, display-only `ND_` environment variable preview, dry-run diff preview, mock apply and reset behavior.
- Preserved the Studio boundary: no Anchor Core calls, no Navidrome calls, no backend, no config file reads/writes, no filesystem access, no port probing and no real secrets.

Bloco 2.7 delta:

- Added Anchor Activity mock interactions for filter sheet, Activity item taps, Details buttons, Startup failed error details, Today/Yesterday filtering, errors-only filtering, empty filtered state handling and diagnostic copy toast.
- Created Activity-local sheets for filtering, generic event details and display-only error diagnostics, plus an Anchor-styled empty state.
- Updated static `anchorActivity` mock data with ids, day groups, categories, severities, details, related actions and Startup failed diagnostic fields.
- Wired Activity state through `AnchorPreview` using local `activityFilter`, `selectedActivityId`, existing sheet state and existing toast state only.
- Kept all logs and diagnostics static/display-only: no Anchor Core, Navidrome, backend, filesystem, real log, process, port or network behavior was added.

Bloco 2.7.1 delta:

- Audited Anchor display regressions inside the actual simulated phone viewport and measured narrow app widths as low as about 206px at `360x800`.
- Fixed Home and Servers detail rows by replacing fixed label/value grids plus truncation with stacked readable rows and controlled wrapping for URLs and critical values.
- Fixed Navidrome Settings by replacing shrinkable horizontal category chips with wrapping chips and tightening summary/action layouts for narrow sheets.
- Added stronger width containment and softened internal scrollbars for Anchor root, cards, bottom sheets, dry-run sheets, code previews and the phone app viewport.
- Preserved mock-only behavior and did not add new product features or state coverage.

Phone frame reference delta:

- Added phone frame visual reference for future simulator frame refinement.

Bloco 2.7.2 delta:

- Aligned the CSS/component-based `PhoneFrame` closer to the committed reference with a thinner black rim, cleaner bezel, smaller desktop cap and subtler hardware shadows.
- Replaced the oversized dynamic-island visual treatment with a centered punch-hole camera.
- Refined side hardware buttons, status bar height, home indicator and app viewport inset while keeping app previews interactive.
- Added phone frame sizing/radius/bezel CSS variables and documented the reference alignment strategy.

Bloco 2.7.3 delta:

- Audited the simulator viewport squeeze after the frame reference alignment and confirmed app layouts were rendering at narrow logical widths instead of a stable phone viewport.
- Added `PhoneStage` to scale the full CSS/component phone frame responsively while preserving a fixed `390px x 844px` virtual app viewport.
- Updated `PhoneFrame`, `AppViewport` and phone CSS variables so frame dimensions derive from the virtual app viewport plus rim/bezel insets.
- Validated Anchor Home, Servers, Navidrome Settings, Library, Activity, Forge, Aria and Flux at the virtual viewport without adding backend, filesystem, playback or product integration behavior.

Bloco 2.8 delta:

- Audited visible Anchor interactive-looking controls across Home, Servers, Navidrome Settings, Add Server, Server details/menu/logs, Library, folder/access/settings/stats/history, Activity filter/details/error details and app switching.
- Wired the Home server-card menu icon to the existing Server menu sheet so it is no longer a silent decorative control.
- Added local Add Server validation for empty display name, missing address and invalid mock port before toast-only save feedback.
- Added a local `Restore mock server` action for the post-remove empty Servers state and made masked Navidrome secret fields editable in local draft state.
- Updated Anchor contracts and audit docs while preserving the no-backend, no-filesystem, no-real-server-control mock-only boundary.

Previous Bloco 2.9 delta (state coverage):

- Added a typed Anchor-local mock state model for server, server-list, library, activity and global UI coverage.
- Added Studio-only mock state controls inside Anchor Home -> Settings so state coverage is testable from inside the phone viewport.
- Implemented visible server states for active, stopped, restarting, degraded, offline and disabled.
- Implemented visible Servers states for normal list, no servers, adding server, Navidrome disabled and coming-soon only.
- Implemented visible Library states for accessible, scanning, empty, permission warning, access denied and scan failed.
- Implemented visible Activity states for populated, empty, errors-only and filtered no-results, plus global loading, disabled actions, toast and clear-overlays controls.

Bloco 2.9 delta (first-run setup flow):

- Added a complete mock first-run setup/onboarding flow for Anchor.
- Created `anchorSetupState.ts` with typed setup draft, steps, permissions and library options.
- Created seven setup components: `AnchorSetupFlow`, `AnchorSetupWelcome`, `AnchorSetupPermissions`, `AnchorSetupLibrary`, `AnchorSetupServer`, `AnchorSetupNavidrome`, `AnchorSetupReview` and `AnchorSetupProgress`.
- Integrated setup flow into `AnchorPreview` so it replaces the normal app when `hasCompletedSetup === false`.
- Implemented Welcome, Permissions, Library, Server, Navidrome Basics and Review screens with Anchor dark premium styling.
- Added setup progress indicator (`Step X of 6` + amber progress bar) visible during setup.
- Implemented "Preview configured app" bypass on Welcome and "Replay setup" reset in Studio mock state controls.
- Connected setup draft to visible app mock state: selected library folder, server address/port and Navidrome basics.
- Added "Advanced Navidrome Settings" shortcut from the Navidrome Basics setup screen to the existing Navidrome Settings sheet.
- Added "Preview TOML" in Review that opens a display-only generated navidrome.toml bottom sheet.
- Preserved the mock-only boundary: no real permissions, filesystem access, port probing, config writes, backend calls or secret storage.

Bloco 2.9.1 delta (first-run setup UX fix):

- Rewrote `AnchorSetupLibrary` to start with an empty folder selection state and a "Choose folder" button.
- Created `AnchorSetupFolderPicker` bottom sheet with pre-baked folder options, selectable rows, fake counts/status and a "Use another folder..." custom mock path input.
- Changed `initialAnchorSetupDraft` so `libraryPath` and `navidromeDraft.MusicFolder` start empty.
- Continue button on Music Library step is disabled with clear styling until a folder is selected.
- Fixed "Advanced Navidrome Settings" button in setup by moving all overlay sheets outside the `inSetup` conditional in `AnchorPreview`.
- Added `initialDraft` and `onDraftChange` props to `AnchorNavidromeSettingsSheet` so it can initialize from and sync back to the setup draft.
- Added draft bridge helpers in `AnchorPreview` to map between setup `navidromeDraft` and catalog `NavidromeConfigDraft`.
- Partial two-way sync: basic fields (MusicFolder, DataFolder, Port, LogLevel, ScannerSchedule, EnableDownloads, EnableSharing, EnableLogRedacting) sync between setup and Advanced Settings.
- Updated audit docs, interaction maps, screen contracts and context delta.

Bloco 3.0 delta (Forge interaction map and completion plan):

- Audited current Forge implementation in `src/apps/forge`, legacy UI Lab Forge screens, visual targets and screen contracts.
- Created `docs/interaction-maps/forge.md` with complete Forge interaction coverage for Home, Review, Library and Activity.
- Created `docs/screen-contracts/forge/interactions.md` with per-interaction contracts including trigger, resulting UI, mock state changes, data used, forbidden real behavior and completion status.
- Updated `docs/screen-contracts/forge/README.md` with visual target, primary screens, interactive completion model, mock-only boundaries and future implementation batches.
- Updated `interface/context/delta.md` with Bloco 3.0 scope.
- Created optional static metadata `src/apps/forge/forgeInteractionMap.ts` exporting interaction lists, statuses and batch groupings with no runtime complexity.
- Documented seven future implementation batches: Overlay Foundation + Home, Review Queue Interactions, Review Item Detail Flows, Library Interactions, Activity Interactions, State Coverage and Completion Audit.
- Defined acceptance criteria: every visible action responds, all responses are mock-only, review actions change local mock state, before/after previews exist, no real files/metadata/network touched, all screens have state coverage, visual fidelity close to reference, stable viewport, no horizontal overflow.
- Did not implement any new Forge runtime interactions; this block is planning/spec only.
- Preserved Anchor, Aria, Flux and Studio shell unchanged.
- Preserved mock-only boundary: no backend, filesystem, metadata edits, downloads, FileReader, secrets or network behavior.

Bloco 3.1 delta (Forge interaction foundation and home actions):

- Created Forge overlay foundation components:
  - `ForgeBottomSheet` — dark premium bottom sheet with grab handle, close button, internal scrolling, backdrop dismissal.
  - `ForgeToast` — top-positioned toast with success/info/warning tones and manual dismiss.
  - `ForgeConfirmDialog` — styled confirmation dialog with amber/danger tones for future batch actions.
  - `ForgeSettingsSheet` — settings bottom sheet with Review behavior, Metadata safety, Visual previews, Mock mode, Reports and About sections. Toggle rows update local visual state only; Save shows toast.
  - `ForgeSafetyNoteSheet` — safety explainer bottom sheet opened from the shield-check card.
- Added local Forge state model in `ForgePreview`:
  - `activeTab`, `reviewFilter`, `activeSheet`, `toast`, `confirmDialog`.
  - All local React state; no global store.
- Wired Forge Home interactions:
  - `Review now` CTA switches to Review tab with filter=all and shows toast.
  - Missing Lyrics card switches to Review with filter=lyrics and toast.
  - Better Covers card switches to Review with filter=covers and toast.
  - Missing Genres card switches to Review with filter=genres and toast.
  - Settings gear opens `ForgeSettingsSheet`.
  - Safety note card opens `ForgeSafetyNoteSheet`.
- Added minimal review-filter awareness to `ForgeReview`:
  - Accepts optional `filter` prop.
  - Filters visible groups when filter is lyrics/covers/genres.
  - Shows active filter chip above action buttons.
  - Group expand/collapse and selection remain functional under filtered views.
- Updated docs:
  - `docs/interaction-maps/forge.md` status updates for implemented Home and global overlays.
  - `docs/screen-contracts/forge/interactions.md` status updates.
  - `docs/screen-contracts/forge/README.md` batch status.
  - `src/apps/forge/forgeInteractionMap.ts` status updates.
  - Created `docs/audits/forge-interaction-batch-1.md`.
- Preserved Anchor, Aria, Flux and Studio shell unchanged.
- Preserved mock-only boundary: no backend, filesystem, metadata edits, downloads, FileReader, secrets or network behavior.

Bloco 3.2 delta (Forge Review Queue Interactions):

- Added `ReviewItem` data model to `src/apps/forge/forgeMockData.ts` with `id`, `title`, `artist`, `album`, `type`, `status`.
- Refactored `ForgeReview` to manage local mock state:
  - `selectedIds` — Set of selected pending item ids.
  - `itemStatuses` — Record mapping item id to `pending` | `fixed` | `ignored`.
  - `sessionFixed` / `sessionIgnored` — counters for the current preview session.
  - `openGroups` — group expand/collapse state.
- Implemented item checkbox selection for pending items only; fixed/ignored items are removed from the queue and cannot be selected.
- Implemented `Fix selected` with `ForgeConfirmDialog` showing count and type breakdown; on confirm marks selected items as fixed, clears selection, increments session counter, shows toast.
- Implemented `Fix all` with `ForgeConfirmDialog` scoped to current filter; on confirm marks all pending items in current filter as fixed, clears selection, increments session counter, shows toast.
- Implemented `Ignore selected` with `ForgeBottomSheet` ignore reason sheet including optional reason chips (`Not needed`, `Wrong suggestion`, `Review later`, `Keep current metadata`); on confirm marks selected items as ignored, clears selection, increments session counter, shows toast.
- Added session summary card above action buttons showing `X fixed` and `Y ignored` counts.
- Added empty queue state when all items are fixed/ignored: `Review queue clear` message with `View all` (when filter active) and `Reset mock queue` actions.
- Polished group expand/collapse with `ChevronUp`/`ChevronDown` icons, pending-count updates and hidden empty groups.
- Preserved review filter compatibility from Home cards; `ForgeReview` accepts `filter`, `showToast`, `showConfirm` and `onClearFilter` props from `ForgePreview`.
- Disabled `Fix selected` and `Ignore selected` buttons when no items are selected, with clear visual state.
- Updated docs:
  - `docs/interaction-maps/forge.md` status updates for Review queue interactions.
  - `docs/screen-contracts/forge/interactions.md` status updates.
  - `docs/screen-contracts/forge/README.md` batch status.
  - `src/apps/forge/forgeInteractionMap.ts` status updates.
  - Created `docs/audits/forge-interaction-batch-2.md`.
- Preserved Anchor, Aria, Flux and Studio shell unchanged.
- Preserved mock-only boundary: no backend, filesystem, metadata edits, downloads, FileReader, secrets or network behavior.

Bloco 3.3 delta (Forge Review Item Detail Flows):

- Created `ForgeLyricsDetailSheet` component:
  - Mock placeholder lyrics text (no copyrighted/real lyrics).
  - Metadata rows: Source, Confidence, Status.
  - Actions: `Apply lyrics` (fixes item), `Ignore this item` (ignores item), `Close`, `Preview changes` (opens metadata diff).
- Created `ForgeCoverComparisonSheet` component:
  - Side-by-side current/suggested cover placeholders using `CoverGradient`.
  - Metadata rows: Confidence, Status.
  - Actions: `Use suggested cover` (fixes item), `Keep current` (ignores item), `Ignore`, `Close`, `Preview changes`.
- Created `ForgeGenrePickerSheet` component:
  - Suggested genre chips: Modern Classical, Ambient, Piano, Instrumental, Electronic, Progressive.
  - Selected preview panel.
  - Actions: `Apply genre` (fixes item and stores selected genres), `Ignore this item`, `Close`, `Preview changes`.
- Created `ForgeMetadataDiffSheet` component:
  - Before/after diff rows with label, old value (strikethrough) and new value (emerald).
  - Mock-only note.
  - Actions: `Apply change`, `Close`.
- Lifted review item state from `ForgeReview` to `ForgePreview`:
  - `itemStatuses`, `selectedIds`, `sessionFixed`, `sessionIgnored` now live in `ForgePreview`.
  - `ForgeReview` receives them as props plus setter callbacks.
  - This allows detail sheets (rendered in `ForgePreview`) to mutate queue state directly.
- Wired item row tap (outside checkbox) to open detail sheet based on item type.
- Added `itemGenres` local state in `ForgePreview` to store mock genre selections per item.
- Added `activeDetailSheet` and `selectedReviewItemId` state in `ForgePreview` to manage open detail sheets.
- Individual apply/ignore in detail sheets updates `itemStatuses`, shows toast, removes item from pending queue, clears selection if selected.
- Updated docs:
  - `docs/interaction-maps/forge.md` status updates for item detail flows.
  - `docs/screen-contracts/forge/interactions.md` status updates for RV-6, RV-7, RV-8.
  - `docs/screen-contracts/forge/README.md` batch status.
  - `src/apps/forge/forgeInteractionMap.ts` status updates.
  - Created `docs/audits/forge-interaction-batch-3.md`.
- Preserved Anchor, Aria, Flux and Studio shell unchanged.
- Preserved mock-only boundary: no backend, filesystem, metadata edits, downloads, FileReader, secrets or network behavior.
- Safety: no copyrighted lyrics were added; all lyrics text is clearly fake placeholder copy.

Bloco 3.3.2 delta (Forge Visual System Refinement):

- Refined Forge orange visual system across all existing screens: Home, Review, Library, Activity, bottom nav, cards, buttons, badges, thumbnails, overlays.
- Updated `ForgeCard` with premium gradient surface (`linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.025))`), inner highlight (`inset_0_1px_0_rgba(255,255,255,0.04)`) and soft shadow.
- Updated `CoverGradient` with stronger gloss overlay, bottom fade, refined vinyl indicator (`ring-1 ring-white/10`) and shadow.
- Updated `ForgeHome` with tinted icon backgrounds (`bg-orange-400/13`, `bg-violet-400/13`, `bg-amber-400/13`), premium CTA shadow, refined settings button.
- Updated `ForgeReview` with gradient group cards, premium action buttons (inner highlight + orange shadow), type-colored thumbnails (lyrics=orange, covers=violet, genres=amber), refined checkboxes, badge-style session summary pills.
- Updated `ForgeLibrary` with search icon affordance, richer album gradients, refined issue badges with orange dot, cleaner row rhythm.
- Updated `ForgeActivity` with tinted icon circles (`bgAccent` from mock data), improved Summary/Review pills, stronger section headers.
- Updated `ForgeBottomNav` with warmer background (`#0a0c0e/92`), clearer active state, focus ring.
- Updated `ForgeBottomSheet` with warm charcoal gradient (`rgba(22,18,14,0.98)`), warm subtitle text.
- Updated `ForgeConfirmDialog` with warm background, consistent orange primary button, inner highlight.
- Updated `ForgeToast` with warm charcoal background (`#140f0a/95`), orange-toned dismiss button.
- Updated `ForgeSettingsSheet` save button with premium orange shadow.
- Updated all detail sheets (`ForgeLyricsDetailSheet`, `ForgeCoverComparisonSheet`, `ForgeGenrePickerSheet`, `ForgeMetadataDiffSheet`) with consistent orange primary actions and warm thumbnails.
- Updated `ForgePreview` background to warm near-black (`#0f0c0a` base).
- Updated `forgeMockData.ts` with richer album cover gradients and activity `bgAccent` fields.
- Updated `docs/visual-targets/forge.md` with design identity and orange rules.
- Updated `docs/screen-contracts/forge/README.md` with Batch 3.3.2 status.
- Updated `docs/screen-contracts/forge/interactions.md` to reference warm orange CTA.
- Created `docs/audits/forge-visual-system-refinement.md` with full visual audit.
- Verified all existing interactions still work: Home cards, Review selection, Fix selected/all, Ignore selected, group expand/collapse, item detail sheets, individual apply/ignore.
- Verified no console errors, no horizontal overflow at 360x800/390x844/430x932/1366x768/1440x900.
- Verified Anchor, Aria, Flux still render correctly.
- Safety grep: no fetch/axios/fs/child_process/FileReader in app behavior; only static docs/UI text matches.
- Build, lint, and tests pass.

Bloco 3.4.2 delta (Forge Review Architecture Redesign):

- Used Tool Mode `combo` and reference `docs/references/forge/forge_review_redesign.png`.
- Reworked Forge Review from old grouped Missing Lyrics / Better Covers / Missing Genres architecture to All / Artwork / Lyrics / Metadata.
- Kept Identity inside Metadata and excluded Files from main Review; file info remains read-only and out of this main Review redesign.
- Added Metadata subfilters: Tags, Identity, Release and Audio.
- Added static redesigned review proposal data with statuses: Safe, Review, Protected, Conflict, Applied, Ignored and Read-only.
- Added the All summary card with `Review safe fixes`, item-first rows, proposal chips, safe/review counts and row detail affordances.
- Added Artwork rows with current-cover, resolution or missing-cover facts only; `Apply artwork` opens comparison before local mock apply.
- Added Lyrics rows for missing, incomplete and unsynced lyric review; previews use fake placeholder copy only.
- Added Metadata rows with specific actions: `Apply tags`, `Apply identity`, `Choose match`, `Apply release data`, `Apply audio data`.
- Demoted batch actions to a contextual selected-row bar with `Apply selected` and `Ignore`.
- Preserved Home navigation into Review / All, Review / Lyrics, Review / Artwork and Review / Metadata / Tags.
- Preserved Forge Home, Library and Activity rendering and did not start Forge Activity interactions, Aria or Flux work.
- Preserved mock-only safety boundaries: no real files, metadata, lyrics, artwork, backend, network, FileReader, filesystem, secrets or analytics behavior.

Bloco 3.4.3 delta (Forge Review Redesign Interaction Fixes):

- Used Tool Mode `combo` and kept `docs/references/forge/forge_review_redesign.png` as the Review visual target.
- Fixed All queue row taps so they open an item repair overview sheet instead of routing directly to Artwork.
- Added grouped overview cards for Artwork, Lyrics and Metadata repairs with specific routing actions.
- Implemented the Review sort sheet and deterministic local ordering for Priority, Most fixes, Needs review first, Artwork first, Lyrics first, Metadata first, Title A-Z and Recently found.
- Removed Safe / Review counters from All queue rows; rows now show proposed fix count, compact chips and optional conflict status only.
- Reworked metadata preview rows into readable field-by-field Current and Suggested values with wrapping text.
- Added provider/source badges to artwork, lyrics and metadata preview/apply sheets.
- Preserved Home deep links, Forge Library rendering, Forge Activity rendering and Anchor/Aria/Flux app switching.
- Preserved mock-only safety boundaries: no real files, metadata, lyrics, artwork, backend, network, FileReader, filesystem, secrets or analytics behavior.

Bloco 3.4.4 delta (Forge Review Progress Flows and Interaction Closure):

- Created `ForgeProgressSheet` component: reusable progress flow with animated step list, source/provider badge, deterministic ~650ms per step timing and result state with Done button.
- Added progress coverage for every apply/fix action in Forge Review:
  - Review safe fixes (All summary) → confirmation → progress: Preparing safe fixes / Applying local mock updates.
  - Apply artwork → comparison sheet → progress: Preparing artwork update / Replacing mock artwork.
  - Apply lyrics → lyrics preview → progress: Preparing lyrics / Updating mock lyrics.
  - Apply synced → lyrics preview → progress: Preparing synced lyrics / Updating mock LRC.
  - Apply tags → metadata preview → progress: Preparing tag update / Applying mock tags.
  - Apply identity → protected preview → progress: Validating identity choice / Applying protected mock identity.
  - Choose match → conflict preview → progress: Resolving mock match.
  - Apply release data → release preview → progress: Preparing release metadata / Applying mock release fields.
  - Apply audio data → audio preview → progress: Preparing audio analysis / Applying mock audio metadata.
  - Ignore item / Ignore selected → reason/confirmation → progress: Marking item(s) ignored.
  - Apply selected → confirmation → progress: Preparing selected fixes / Applying mock changes.
- Completed All item repair overview interactions: grouped fix cards route to correct previews; Apply safe fixes and Ignore item use progress flows.
- Verified Sort, tab/filter, row/chevron and selection/contextual bar interactions remain fully functional.
- Improved Metadata preview readability: added Artist MBID, Release Group MBID, Barcode, Edition, Release type, Energy, Danceability fields; added `afterChips` support in `ForgeMetadataDiffSheet` for suggested value chips.
- Ensured provider/source badges (Discogs, Last.fm, MusicBrainz, AcoustID, Lyrics provider mock, LRC mock, Audio analysis mock) are visible in previews, progress sheets and overview cards.
- Local mock state updates after progress: items become fixed/ignored, removed from pending queue, session counters increment, toast confirms.
- Preserved Forge Home, Library and Activity rendering; did not start Activity interactions, Aria or Flux.
- Preserved mock-only boundaries: no backend, network, filesystem, real metadata edits, downloads, FileReader, secrets or analytics.

Aria visual reference delta:

- Replaced all previous Aria visual references with final definitive references: `docs/references/aria/aria_reference1.png` and `docs/references/aria/aria_reference2.png`.
- These are now the only official Aria visual references.
- Updated `docs/references/aria/README.md`, `docs/visual-targets/aria.md` and `docs/screen-contracts/aria/README.md` to point to the new definitive references.
- No product UI or app behavior was changed.

Bloco 3.4.5 delta (Forge Library Metadata Editor):

- Created `ForgeMetadataEditor` reusable full-screen editor for Artist, Album and Track entities.
- Organized tabs per entity:
  - Track: Overview, Artwork, Lyrics, Metadata, Audio, File info.
  - Album: Overview, Artwork, Metadata, Release, Tracks, File info.
  - Artist: Overview, Image, Metadata, Albums, Identity.
- Implemented editable field pattern: label, current value, input below, dirty indicator, optional source badge, protected-field warning for MBID/AcoustID/ISRC.
- Implemented `ForgeImagePickerSheet` with Gallery and Online tabs:
  - Gallery shows 3 fake local CSS-gradient images with fake filenames.
  - Online search is local-only input filtering 4 fake provider results (Discogs, MusicBrainz Cover Art, Deezer, iTunes).
- Implemented save/apply flow:
  - Save button activates when dirty; "Unsaved" badge appears.
  - Tap Save → `ForgeSavePreviewSheet` shows changed fields (Current → New) with source badges.
  - Tap "Apply changes" → `ForgeProgressSheet` (Preparing changes / Applying mock metadata) → toast "Metadata updated in mock preview".
- Implemented unsaved changes confirmation on back: "Discard changes?" dialog with Keep editing / Discard.
- Extended `forgeMockData.ts` with comprehensive metadata fields for all entities (genres, style, mood, dates, track/disc numbers, lyrics, audio analysis, ReplayGain, file info, release data, identity fields, etc.).
- Updated `ForgeLibrary.tsx`:
  - Live search filtering by title/artist/album with empty results state.
  - Row taps open the corresponding editor.
  - Issue badge taps open editor focused on relevant tab (Lyrics, Metadata, Artwork).
  - Chevron behavior same as row tap.
- Updated `ForgePreview.tsx`:
  - Added mutable local copies `libraryArtists`, `libraryAlbums`, `librarySongs`.
  - Added editor state and callbacks: `openArtistEditor`, `openAlbumEditor`, `openTrackEditor`, `closeEditor`, `handleSaveEntity`.
  - `handleSaveEntity` triggers progress flow then updates local mutable array and shows toast.
  - Nested navigation: Album Tracks → Track editor; Artist Albums → Album editor.
- File info tabs are read-only with no editable inputs and no Apply button.
- Review ↔ Library sync is partial/deferred: Library edits update local rows and toast, but do not automatically mutate Review queue state.
- Preserved mock-only boundaries: no backend, network, filesystem, real metadata edits, downloads, FileReader, secrets or analytics.
- Did not start Forge Activity interactions, Aria or Flux.
- Browser MCP validation was skipped per user request.
- Build, lint, tests pass.

Bloco 3.5 delta (Forge Activity Interactions):

- Enhanced `ActivityItem` data model with `activityType`, `status`, `provider`, `affectedCount`, `affectedItems`, `changedFields`, `relatedReviewTarget`, `relatedLibraryTarget` and `dateGroup`.
- Created `ForgeActivityDetailSheet` with title, status badge, provider/source badge, affected items list, changed fields, detail text, mock-only note and action buttons.
- Created `ForgeActivitySummarySheet` with concise result, affected count, grouped changes, provider badge and action buttons.
- Created `ForgeActivityFilterSheet` with type filters (All, Lyrics, Artwork, Metadata, Library edits, Warnings, Failed, Completed) and sort options (Newest first, Oldest first).
- Wired Activity card tap to open detail sheet.
- Wired Summary pill to open summary sheet.
- Wired Review pill to navigate to related Review tab/filter with toast feedback.
- Added filter button to Activity header with active filter chip and no-results empty state.
- Made Today/Yesterday grouping robust: filtered results still group correctly, empty groups hidden.
- Implemented dynamic Review -> Activity history: Review apply actions append a new activity entry to `activityItems` state.
- Implemented dynamic Library editor -> Activity history: Library metadata editor save appends a `libraryEdit` activity entry.
- Deferred Activity -> Library item navigation (shows toast: planned for a later Forge batch).
- Updated `ForgePreview` with mutable `activityItems` state, `activityFilter`, `activitySort`, `activeActivitySheet`, `selectedActivityId` and `appendActivity` helper.
- Updated `docs/interaction-maps/forge.md`, `docs/screen-contracts/forge/interactions.md` and `docs/screen-contracts/forge/README.md` with Batch 5 status.
- Preserved mock-only boundaries: no backend, network, filesystem, real metadata edits, downloads, FileReader, secrets or analytics.
- Browser MCP validation skipped per user request.
- Build, lint, tests pass.

Bloco 3.5.1 delta (Forge Settings — Metadata Providers, Tags & Updates):

- Cloned and inspected `noqlen-forge-core` at `/tmp/noqlen-forge-core` commit `27953ef`.
- Read `README.md`, `config.example.toml`, `noqlen_forge/config.py`, `noqlen_forge/fields.py`, `noqlen_forge/metadata_providers.py`, `noqlen_forge/cover.py` and docs.
- Created `src/apps/forge/forgeSettingsCatalog.ts` typed model with 70+ settings, 10 provider configs, rewrite rules, 9 API credentials, app update state and full Forge Core config mapping.
- Redesigned `ForgeSettingsSheet` from simple toggles into a full 8-category settings surface:
  - Metadata Providers: provider cards (MusicBrainz, Discogs, AcoustID, Deezer, iTunes, Last.fm, LRCLIB, Genius, Musixmatch, AudD) with role badges, enable toggle, fields chips, Configure sheet and Test mock action with progress.
  - API Keys: masked credential fields for all 9 providers with mock-only local state.
  - Tags & Metadata: Prefer original date, Clean bad fields, Write MBIDs, Protect identity, Conflict policy, Min confidence, Multi-value separator, Trim, Deduplicate, Case normalization, Review low-confidence/existing mismatch; plus editable rewrite rule cards (Add/Delete/Edit) with pre-seeded examples.
  - Artwork: Enable fixes, Embed, Save folder cover, Filename, Min confidence, Prefer front, Max size.
  - Lyrics: Enable fixes, Prefer synced, Allow unsynced, Prefer local, Preserve existing, Embed, Save sidecar .lrc, Save .txt, Cache, Review conflicts/mismatches, Allow instrumental, Custom endpoint.
  - Audio: Enable ReplayGain, Backend, Target LUFS, Write gain/peak, Skip existing, Key detection mode, Min confidence, Write low-confidence key, Advanced limits (max seconds, segments, timeout).
  - Safety & Review: Dry-run first, Require confirmation, Send conflicts, Never overwrite lyrics/artwork, Hide advanced metadata, Show catalog/advanced fields, Track provider history/tag sync, Job history days, Prune jobs, Auto-apply safe fixes, Conflict behavior.
  - App Updates: Current version (0.1.0 mock), Core compatibility, Last checked, Update channel (stable/beta/nightly), Check for updates with mock progress, Download update mock, Install/restart mock with clear "Studio preview only" copy.
  - Advanced: Database auto-scan, Enrich presets (cover, lyrics, lastfm, mood, bpm, features, acoustid, replaygain), Output verbosity/debug.
- Added progress flows for Save settings, Test mock provider, Check for updates, Download update, Install update, Reset settings.
- Added unsaved-changes confirmation dialog on back/close.
- Updated `ForgePreview.tsx` to pass `showConfirm` and `showToast` into `ForgeSettingsSheet`.
- Updated docs:
  - `docs/interaction-maps/forge.md` — expanded Settings Gear description and component inventory.
  - `docs/screen-contracts/forge/interactions.md` — expanded HN-5 and added GL-4 through GL-9 global interactions.
  - `docs/screen-contracts/forge/README.md` — added Bloco 3.5.1 batch status.
  - `docs/visual-targets/forge.md` — no visual target changes; settings remain within Forge dark premium system.
  - Created `docs/audits/forge-settings-metadata-providers-updates.md`.
  - Created `docs/integration-contracts/forge-core-settings.md`.
  - Updated `interface/context/delta.md` and `interface/context/current.md`.
- Preserved mock-only boundaries: no fetch/axios/fs/child_process/FileReader; no real network calls; no real credential storage; no real config writes.
- Did not start Forge State Coverage, Aria or Flux.
- Build, lint, tests pass.

Bloco 3.5.2 delta (Forge Settings — Interaction Closure):

- Audited every visible control in Forge Settings and closed all interaction gaps.
- Added API Keys as a real category with dedicated `ApiKeysPanel`: 7 provider credential rows, password inputs, show/hide toggle, clear button, test button, save credentials and reset credentials actions.
- Fixed provider test steps from generic 2-step to provider-specific mock progress per provider (MusicBrainz, Discogs, Last.fm, AcoustID, etc.).
- Fixed secret input bug: removed `maskSecret()` from the `value` prop of `type="password"` inputs so typing does not corrupt values.
- Added clear button for all secret fields.
- Save settings now toasts "No settings changes to save" when there are no unsaved changes instead of always showing progress.
- Added app update failed state for Nightly channel with deterministic mock cycle (available → up_to_date → failed) and a "Retry check" button.
- Added expandable/collapsible release notes in update available card.
- Added "Back to categories" button inside every category panel.
- Added Save settings and Reset buttons inside every category panel.
- Added credential status dot on provider cards (green when credential is set, dim when empty).
- Deferred Enrich Mode controls: all `advanced.enrich_*` toggles are visually disabled, show a "Planned" badge, and open a planned sheet explaining they will be configured in the next Forge block.
- Updated docs: `docs/audits/forge-settings-interaction-closure.md`, interaction maps, screen contracts, integration contracts, and context files.
- Verified no dead controls remain in Settings.
- Preserved mock-only boundaries: no fetch/axios/fs/child_process/FileReader; no real network, no real credential storage, no real config writes.
  - Did not implement Enrich Mode, Forge State Coverage, Aria or Flux.
  - Build, lint, tests pass.

Bloco 3.5.3 delta (Forge Enrich Mode App Flow):

- Created `ForgeEnrichMode` full-screen in-phone flow with 6 steps: Rewrite options → Target selection → Confirmation → Dry-run → Progress → Result.
- Entry point: `Open Enrich Mode →` helper row under `Review safe fixes` in Review / All summary card.
- Step 1 (Rewrite options): Tags, Covers, Lyrics, Advanced Metadata categories with sub-options, overwrite toggles, provider hints, minimum image size display, protected field warning.
- Step 2 (Target selection): Library, Artists, Albums, Songs tabs with search, selectable rows, select all visible, clear selection.
- Step 3 (Confirmation): summary of categories, target, overwrite options; warning card; Run dry-run button.
- Step 4 (Dry-run): deterministic 5-step mock progress → result with mock counts (tracks scanned, fields rewritten, existing values replaced, protected fields, conflicts).
- Step 5 (Progress): deterministic 7-step mock rewrite progress.
- Step 6 (Result): mock applied counts, category cards, actions: View Review queue, View Activity, Done.
- Settings integration: shows "Using current mock provider settings" with link to Forge Settings (toast-only).
- Review integration: on completion marks pending safe items as fixed locally; conflicts/protected fields remain in Review.
- Activity integration: on completion appends `Enrich Mode completed` activity entry.
- Interaction closure: every visible Enrich Mode control responds; no dead controls.
- Updated docs: created `docs/audits/forge-enrich-mode-app-flow.md`; updated interaction maps, screen contracts, integration contracts, visual targets, and context files.
- Preserved mock-only boundaries: no fetch/axios/fs/child_process/FileReader; no real network, no real metadata edits, no real file changes.
- Build, lint, tests pass.

Bloco 3.5.3b delta (Forge Enrich Mode UX Refinement):

- Refined Step 1 (Rewrite options) experience of `ForgeEnrichMode`:
  - Removed automatic toast on Enrich Mode entry; toasts now only appear after real user actions.
  - Updated header subtitle to `"Choose what Forge should rewrite."` and added `"Reprocess selected metadata using current provider settings."` helper text.
  - Made category cards collapsible: Tags expanded by default; Covers, Lyrics, Advanced Metadata collapsed by default.
  - Replaced `"Active"`/"Off"` badge with count-based labels: `0 selected`, `N selected`, `All selected`.
  - Improved Advanced Metadata caution copy under toggle and in conditional warning card.
  - Replaced large Settings card with compact single-row helper: `"Using current mock provider settings"` + `"Open Forge Settings →"` that opens Forge Settings directly.
  - Added `onOpenSettings` prop to `ForgeEnrichMode`; `ForgePreview.tsx` closes Enrich Mode and opens Settings sheet when helper is tapped.
  - Added sticky header with warm charcoal backdrop blur to keep step context visible while scrolling.
  - Updated validation copy to `"Select at least one rewrite option to continue."`.
- Preserved full 6-step flow and all existing interactions: target selection, confirmation, dry-run, progress, result.
- Verified no regressions: Review safe fixes, Forge Settings, Forge Library, Forge Activity, Anchor, Aria, Flux all still work/render.
- Updated docs: created `docs/audits/forge-enrich-mode-ux-refinement.md`; updated `docs/audits/forge-enrich-mode-app-flow.md`, `docs/interaction-maps/forge.md`, `docs/screen-contracts/forge/README.md`, `docs/screen-contracts/forge/interactions.md`, `docs/visual-targets/forge.md`, `interface/context/delta.md`, `interface/context/current.md`.
- Preserved mock-only boundaries: no fetch/axios/fs/child_process/FileReader; no real network, no real metadata edits, no real file changes.
- Build, lint, tests pass.

Bloco 4.0 delta (Aria Visual Target and Interaction Map):

- Analyzed the final definitive Aria visual references (`docs/references/aria/aria_reference1.png` and `docs/references/aria/aria_reference2.png`).
- Documented the Aria visual system: dark warm charcoal backgrounds, minimal bordered surfaces, large radius, clean sans-serif typography, warm amber/gold accent (distinct from Forge orange), 4-tab bottom nav (Listen/Library/Playlists/Explore), mini player above nav, editorial artwork treatment, premium list rows with metadata chips, pill-shaped primary CTAs, thin Lucide icons.
- Identified visible screens from references: Album Detail, Search, Queue, Playlist Detail, Track Details, Metadata Review.
- Identified implied screens: Listen (Home), Library, Playlists, Explore, Artist Detail, Lyrics, Now Playing full screen, Settings.
- Created/updated `docs/visual-targets/aria.md` with comprehensive visual principles, color/accent guidance, layout principles, spacing, bottom nav, player/control guidance, what to avoid and mock-only limits.
- Created/updated `docs/screen-contracts/aria/README.md` with app purpose, primary screens, tab/navigation model, shared component inventory, mock-only boundaries and nine implementation batches.
- Created `docs/screen-contracts/aria/interactions.md` with full interaction contracts: trigger, resulting UI, mock state changes, data used, forbidden real behavior and completion status for every mapped interaction.
- Created `docs/interaction-maps/aria.md` with screen-by-screen interaction tables, visible actions, expected results, overlay/sheet/dialog usage, state updates, missing interactions, component inventory and implementation batch assignments.
- Created `src/apps/aria/ariaInteractionMap.ts` static metadata file exporting screen lists, nav items, interaction IDs, statuses, mock-only notes and batch groupings. No runtime behavior.
- Defined nine realistic Aria implementation batches.
- Updated `interface/context/current.md` and `interface/context/delta.md` with Bloco 4.0 scope.
- Confirmed final Aria references exist and older references are not referenced in docs or source.
- Did not implement any new Aria runtime UI or behavior; this block is planning/spec only.
- Preserved Anchor, Forge, Flux, Studio shell, PhoneFrame and app switching unchanged.
- Preserved mock-only boundary: no fetch/axios/fs/child_process/FileReader; no real audio, no real library access, no network calls.
- Build, lint, tests pass.
- Preserved Anchor, Forge, Flux, Studio shell, PhoneFrame unchanged.
- Preserved mock-only boundary: no fetch/axios/fs/child_process/FileReader; no real audio, no real library access, no network calls.

Bloco 4.1c delta (Aria Showcase Visual Alignment):

- Aligned Aria visuals with `docs/references/aria/noqlen_aria_showcase.html` as the primary implementation style guide.
- Final PNG references (`aria_reference1.png`, `aria_reference2.png`) remain official visual references.
- Extracted showcase tokens: dark navy/black backgrounds (`#071018`, `#05090e`), warm amber accent (`#f0a13d`), cream titles (`#fff3e4`), soft muted text (`#b9b1a7`), green status dot (`#5de084`).
- Approved Home variant: "Listening + Recent Additions". Rejected Home variant: standalone "Listening Space" hero-only layout.
- Rewrote `AriaListenHome` with showcase-aligned layout: topbar (`LISTENING SPACE` + `Aria` + queue mark with green dot), compact current track card (thumb + info + amber Play pill), shortcut tiles (Your Playlists / Artists), search bar, Recent additions list (Midnight Horizons, Sunday Morning, Late Ambient, A Place).
- Added cinematic CSS artwork placeholders in `src/index.css`: `.aria-art`, `.aria-art-blue`, `.aria-art-portrait` with size variants (hero, cover, square, thumb, tiny, micro).
- Rewrote `AriaBottomNav` to compact glass/matte rounded rectangle (`rounded-[18px]`, `bg-white/[0.035]`, `backdrop-blur`), small icons (18px) and labels (9px), amber active state, no huge active pill.
- Rewrote `AriaMiniPlayer` to compact bar above bottom nav (`left-3 right-3 bottom-[4.25rem]`), micro artwork, track title/artist, previous / amber gradient pause / next controls, subtle amber progress underline.
- Refined `AriaNowPlaying` with showcase screen background, cinematic square artwork, serif title, amber artist, radial-gradient big pause button, refined progress and secondary controls.
- Restyled `AriaLibrary` toward Album Detail depth: search bar, amber-bordered filter chips, refined album rows with micro artwork and metadata pills.
- Restyled `AriaPlaylists` toward Playlist Detail visual language: large blue artwork header per card, title, description, track count, Play/Shuffle/more buttons.
- Restyled `AriaExplore` toward Search: search input with focus ring, chips, result rows with artwork, title, subtitle, format pill, chevron.
- Updated `AriaPreview` background to showcase screen gradient and adjusted content padding for new mini player / bottom nav heights.
- Updated docs: `docs/visual-targets/aria.md`, `docs/screen-contracts/aria/README.md`, `docs/screen-contracts/aria/interactions.md`, `docs/interaction-maps/aria.md`.
- Created `docs/audits/aria-showcase-visual-alignment.md`.
- Safety grep confirms no fetch/axios/fs/child_process/FileReader in Aria app behavior.
- Build, lint, tests pass.
- Preserved Anchor, Forge, Flux, Studio shell, PhoneFrame unchanged.
- Preserved mock-only boundary: no fetch/axios/fs/child_process/FileReader; no real audio, no real library access, no network calls.
