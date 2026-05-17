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
- Mobile phone width is parent-bounded: the simulator stage provides the available width and the frame uses `width: 100%` with a capped max width.
- Desktop phone width uses `clamp(21rem, 29vw, 24.875rem)`.
- The inner phone screen is width-driven with a realistic tall/slim `9 / 19.9` aspect ratio.
- Do not combine a fixed phone-screen height with `aspect-ratio` on mobile; that lets the browser derive a narrower screen width from height and visually desynchronizes the screen from the outer frame.

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
