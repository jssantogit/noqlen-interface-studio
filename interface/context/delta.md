# Delta

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
