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

## Responsive Rules

- On mobile, the selector stays usable and the phone fits the viewport width.
- Phone content scrolls internally when needed.
- The page must avoid horizontal overflow.
- On desktop, the phone remains centered with side UI secondary.
- Detailed responsive behavior is defined in `docs/visual-contracts/responsive-shell.md`.
