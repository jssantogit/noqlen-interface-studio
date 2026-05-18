# Responsive Studio Shell

Bloco 1.1 hardens the Studio shell around the mobile simulator. It does not start app-specific screen work.

## Mobile Behavior

- Target widths: 360px, 375px, 390px, 412px and 430px.
- The external Studio chrome stays minimal: compact top bar, touch-friendly app switcher, then the phone simulator.
- The shell uses dynamic viewport units and safe-area padding so browser UI bars do not force awkward clipping.
- The page may scroll vertically when space is limited.
- The page must not scroll horizontally.
- The phone frame fits within the viewport width and remains readable without browser zoom.

## Tablet Behavior

- Target widths: 768px, 820px and 1024px.
- The layout remains single-column until desktop width, with the simulator centered and proportionally sized.
- The switcher keeps a compact horizontal grid above the simulator.
- Spacing is controlled by responsive shell gap variables so tablet layouts do not feel like stretched mobile pages.

## Desktop Behavior

- Target widths: 1280px, 1366px, 1440px, 1536px and 1920px.
- The shell switches to a three-area grid: app switcher, central simulator and subtle inspector.
- The simulator remains the visual center and its maximum width is capped.
- The side inspector stays secondary and does not become a dashboard or hero panel.
- The app switcher is clear but constrained to a narrow rail.

## Simulator Sizing Rules

- Simulator dimensions are controlled through CSS variables in `src/index.css`.
- The app viewport uses a virtual mobile size, currently `--phone-virtual-width: 390px` and `--phone-virtual-height: 844px`.
- The full phone frame is derived from the virtual viewport plus rim/bezel variables and is currently `414px x 868px` before scaling.
- `PhoneStage` reserves the scaled frame footprint in layout and applies a transform to the whole frame so app content keeps a stable mobile layout while the simulator fits mobile, tablet and desktop shells.
- On small or short screens, the phone may be visually scaled below its virtual dimensions; this is expected and must not change the app viewport's computed CSS width.
- The frame uses CSS variables for outer radius, screen radius, rim and bezel so visual reference alignment can be refined without replacing the CSS/component frame.
- Do not return to sizing the app viewport from the available parent width; that reintroduces narrow logical widths and causes app screens to wrap as if they were rendered around 200px wide.

## Bloco 2.7.3 Virtual Viewport Audit

- Root cause found: the simulator fit the shell, but the app viewport's computed width was tied to the scaled/available space, producing logical app widths around `208px` on `360x800` and `261px` on `1366x768`.
- Effect: high-fidelity Anchor screens reflowed as ultra-narrow layouts even though the visual phone frame looked plausible.
- Fix: app layout now renders at a fixed `390px` virtual width and the entire phone scales responsively through `PhoneStage`.
- Validation viewports: `360x800`, `390x844`, `430x932`, `768x1024`, `1366x768`, `1440x900` and `1920x1080`.
- Evidence after fix: `.phone-app-viewport` computed width stayed `390px` in all validated viewports; page scroll width stayed within viewport width; visual scale ranged from about `0.5768` at `360x800` to `1` at `1920x1080`.

## Bloco 1.1 Overflow Audit

- Root cause found: the outer phone frame fit the mobile grid, but the inner phone screen used a definite viewport-based height plus `aspect-ratio` and no explicit `width: 100%`.
- Effect: on mobile, the screen/content width was computed from height instead of from the frame width, leaving the visible app viewport narrower and misaligned inside the shell.
- Fix: the phone screen now fills the frame width and lets the aspect ratio determine height.
- Validation viewports: 360x800, 375x812, 390x844, 412x915, 430x932, 768x1024, 1024x768, 1366x768 and 1440x900.

## Overflow Rules

- `html`, `body`, `#root` and the main shell clip horizontal overflow.
- The shell uses `min-height: 100dvh` rather than fixed `100vh`.
- The phone app viewport owns internal vertical scrolling via `overflow-y-auto`.
- External shell content can scroll naturally on short screens.
- Overflow hiding is only a safety net; the phone frame and inner screen must fit their parent dimensions naturally.

## App Switcher Behavior

- The switcher remains touch-friendly with at least 3rem button height.
- It renders as a compact two-column grid on mobile.
- It renders as a four-column grid on tablet widths.
- It becomes a vertical rail on desktop.
- It only changes which static placeholder appears inside the simulator.

## Side Panel Behavior

- The side inspector is hidden below desktop width.
- On desktop it is sticky, narrow and secondary.
- It may describe the selected placeholder and mock-only boundary.
- It must not become a dashboard, status center, marketing hero or app-specific control panel.

## Not Implemented In This Block

- No full Anchor screens.
- No full Forge screens.
- No full Aria screens.
- No full Flux screens.
- No backend calls, downloads, server controls, playback, music library access, analytics, secrets or real integrations.
- No large landing page, dashboard sections or progress/status decorations outside the phone.
