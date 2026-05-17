# Current Context

Bloco 1 aligns the interface studio with the mobile simulator concept.

Current app state:

- Vite React TypeScript app.
- Tailwind CSS imported through `src/index.css` and enabled in Vite.
- Minimal external Studio shell with a direct app selector for Anchor, Forge, Aria and Flux.
- Anchor selected by default.
- Simulated phone frame is the main visual stage.
- Fake phone status bar and bottom home indicator are part of the simulator frame.
- Anchor, Forge, Aria and Flux render static visual placeholders inside the phone.
- Mock-only boundary remains active and visually subtle.
- GitHub Pages deploy is configured through GitHub Actions for the static `dist` output.
- Production Pages builds use `GITHUB_PAGES=true` to set the Vite base path to `/noqlen-interface-studio/`; local development stays at `/`.
