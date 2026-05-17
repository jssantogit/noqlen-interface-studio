# Current Context

Bloco 1 aligns the interface studio with the mobile simulator concept. Bloco 1.1 hardens the responsive shell around that simulator. Bloco 1.3 refines the simulator frame so it reads closer to premium smartphone hardware. Bloco 1.4 selectively reuses mature legacy UI Lab patterns without replacing the new simulator shell.

Current app state:

- Vite React TypeScript app.
- Tailwind CSS imported through `src/index.css` and enabled in Vite.
- Minimal external Studio shell with a direct app selector for Anchor, Forge, Aria and Flux.
- Anchor selected by default.
- Simulated phone frame is the main visual stage and now uses a taller/slimmer hardware-like silhouette.
- Responsive shell uses CSS variables, `clamp()`, dynamic viewport units and safe-area-aware padding.
- Mobile and tablet layouts remain single-column with a centered simulator; desktop uses a narrow switcher rail, centered simulator and subtle inspector.
- Horizontal page overflow is clipped at root/shell level while phone preview content scrolls internally.
- Integrated fake phone status bar, compact dynamic island and thin bottom home indicator are part of the simulator frame.
- Anchor and Flux render static visual placeholders inside the phone.
- Forge now has a legacy-informed mock preview with Home, Review, Library and Activity sections inside the phone.
- Aria now has a richer mock player, queue and library preview informed by the legacy planned tab taxonomy.
- Mock-only boundary remains active and visually subtle.
- GitHub Pages deploy is configured through GitHub Actions for the static `dist` output.
- Production Pages builds use `GITHUB_PAGES=true` to set the Vite base path to `/noqlen-interface-studio/`; local development stays at `/`.
