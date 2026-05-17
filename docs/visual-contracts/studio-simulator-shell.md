# Studio Simulator Shell

The Studio shell is a visual lab, not a product dashboard and not any Noqlen app itself.

## Structure

- Minimal external Studio top bar.
- Direct app selector for Anchor, Forge, Aria and Flux.
- Centered simulated phone frame as the main stage.
- Optional side inspector that remains secondary.
- Static app placeholder inside the phone viewport.

## Visual Rules

- The phone frame should dominate the composition.
- External Studio UI should stay quiet and not compete with app previews.
- Mock-only language should be present but subtle.
- App-specific interactive screens are out of scope for this shell.

## Bloco 1.3 Phone Frame Realism

- The simulator frame should read as premium phone hardware, not as a generic rounded card.
- The device silhouette stays tall and slim with a controlled maximum width and width-driven aspect ratio.
- The outer body uses a near-black chassis, subtle rim highlights and restrained physical shadow.
- Decorative glow is intentionally minimal; depth should come from hardware-like layering and inner shadows.
- Side hardware hints may appear only as tiny, low-contrast button edges.

## Bezel And Screen Rules

- The bezel is uniform, black and believable without becoming bulky.
- The screen is embedded inside the device body and uses a slightly smaller radius than the outer shell.
- App preview content remains inside the screen viewport and must not escape horizontally.
- The viewport remains static/simple until app-specific screen work begins in a later block.

## Status And Bottom Rules

- The dynamic island is centered, compact and visually integrated with the top hardware area.
- The status bar is small and believable: time on the left, simulated signal/wifi/battery indicators on the right.
- The selected app name does not appear in the status bar; app identity belongs to the switcher and placeholder content.
- The home indicator is thin, centered and low contrast with balanced bottom padding.

## Responsive Rules

- On mobile, the selector stays usable and the phone fits the viewport width.
- Phone content scrolls internally when needed.
- The page must avoid horizontal overflow.
- On desktop, the phone remains centered with side UI secondary.
- Detailed responsive behavior is defined in `docs/visual-contracts/responsive-shell.md`.

## Not Implemented In Bloco 1.3

- No Anchor, Forge, Aria or Flux app-specific screens.
- No backend calls, downloads, server controls, playback, music library access, analytics, secrets or real integrations.
- No image-based phone mockup; the frame remains CSS/component-based so the internal app viewport can stay interactive later.
