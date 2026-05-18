# Current Context

Bloco 1 aligns the interface studio with the mobile simulator concept. Bloco 1.1 hardens the responsive shell around that simulator. Bloco 1.3 refines the simulator frame so it reads closer to premium smartphone hardware. Bloco 1.4 selectively reuses mature legacy UI Lab patterns without replacing the new simulator shell. Bloco 2 establishes Anchor's high-fidelity base screens, and Bloco 2.2 maps the complete Anchor interaction coverage required before moving to Forge, Aria or Flux expansion.

Workflow source is the latest inspected `noqlen-playbook` at `/root/projects/noqlen/_workflow/noqlen-playbook` commit `27d637f`. Tool Mode is now required in block planning. Current product work should pause until this workflow retrofit is complete.

Current app state:

- Vite React TypeScript app.
- Tailwind CSS imported through `src/index.css` and enabled in Vite.
- Minimal external Studio shell with a direct app selector for Anchor, Forge, Aria and Flux.
- Anchor selected by default.
- Simulated phone frame is the main visual stage and now uses a taller/slimmer hardware-like silhouette with a centered punch-hole camera.
- Responsive shell uses CSS variables, dynamic viewport units, safe-area-aware padding and `PhoneStage` scaling around a stable `390px x 844px` virtual app viewport.
- Mobile and tablet layouts remain single-column with a centered simulator; desktop uses a narrow switcher rail, centered simulator and subtle inspector.
- Horizontal page overflow is clipped at root/shell level while phone preview content scrolls internally.
- Integrated fake phone status bar, centered punch-hole camera and thin bottom home indicator are part of the simulator frame.
- Anchor renders high-fidelity mock Home, Servers, Library and Activity screens inside the phone with internal bottom navigation.
- Anchor has a documented interaction map and implementation contract for all visible mock-only actions, secondary surfaces and required state variants.
- Anchor has implemented Home, Servers, Library, dedicated Navidrome Settings, Activity mock interactions and a complete first-run setup/onboarding flow with UX fixes for folder selection and advanced settings; visible interaction gaps and mock state coverage are complete, and final Anchor completion audit remains the next Anchor block.
- Flux still renders a static visual placeholder inside the phone.
- Forge now has a legacy-informed mock preview with Home, Review, Library and Activity sections inside the phone, plus a full Settings surface with Metadata Providers, API Keys, Tags & Metadata, Artwork, Lyrics, Audio, Safety & Review, App Updates and Advanced categories. All visible Settings controls are wired: no dead toggles, buttons, inputs or selects remain.
- Aria now has a richer mock player, queue and library preview informed by the legacy planned tab taxonomy.
- Visual reference images and visual target contracts for Anchor, Forge, Aria and Flux are now part of the project source of truth for app fidelity.
- Mock-only boundary remains active and visually subtle.
- GitHub Pages deploy is configured through GitHub Actions for the static `dist` output.
- Production Pages builds use `GITHUB_PAGES=true` to set the Vite base path to `/noqlen-interface-studio/`; local development stays at `/`.
