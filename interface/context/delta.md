# Delta

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
