# Current Context

Bloco 0 bootstraps the interface studio with a responsive visual shell.

Current app state:

- Vite React TypeScript app.
- Tailwind CSS imported through `src/index.css` and enabled in Vite.
- Interactive tabs for Anchor, Flux, Forge and Aria.
- Anchor selected by default.
- Mock-only notice and status indicators.
- GitHub Pages deploy is configured through GitHub Actions for the static `dist` output.
- Production Pages builds use `GITHUB_PAGES=true` to set the Vite base path to `/noqlen-interface-studio/`; local development stays at `/`.
