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
