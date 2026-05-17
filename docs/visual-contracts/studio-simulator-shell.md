# Studio Simulator Shell

The Studio shell is a visual lab, not a product dashboard and not any Noqlen app itself.

## Structure

- Minimal external Studio top bar.
- Direct app selector for Anchor, Forge, Aria and Flux.
- Centered simulated phone frame as the main stage.
- Optional side inspector that remains secondary.
- App previews inside the phone viewport. Some apps may have lightweight mock navigation when adapted from accepted legacy patterns.

## Visual Rules

- The phone frame should dominate the composition.
- External Studio UI should stay quiet and not compete with app previews.
- Mock-only language should be present but subtle.
- App-specific interactions must remain contained inside the phone viewport and must not compete with the Studio-level selector.

## Bloco 1.3 Phone Frame Realism

- The simulator frame should read as premium phone hardware, not as a generic rounded card.
- The device silhouette stays tall and slim with a controlled maximum width and width-driven aspect ratio.
- The outer body uses a near-black chassis, subtle rim highlights and restrained physical shadow.
- Decorative glow is intentionally minimal; depth should come from hardware-like layering and inner shadows.
- Side hardware hints may appear only as tiny, low-contrast button edges.

## Bloco 2.7.2 Reference Alignment

- `docs/references/phone/phone-frame-reference.png` is the current device-frame visual reference.
- The frame remains CSS/component-based so app previews stay interactive; do not replace it with the reference image unless explicitly approved.
- The target is a thin black modern smartphone silhouette with a centered punch-hole camera, subtle side buttons, clean bezel and reduced card-like decoration.

## Bezel And Screen Rules

- The bezel is uniform, black and believable without becoming bulky.
- The screen is embedded inside the device body and uses a slightly smaller radius than the outer shell.
- App preview content remains inside the screen viewport and must not escape horizontally.
- The viewport may host static or lightweight mock app previews, but the current phone frame remains the host and source of truth.

## Status And Bottom Rules

- The top camera treatment should be a centered punch-hole or similarly minimal camera detail, not a bulky dynamic island.
- The status bar is small and believable: time on the left, simulated signal/wifi/battery indicators on the right.
- The selected app name does not appear in the status bar; app identity belongs to the switcher and placeholder content.
- The home indicator is thin, centered and low contrast with balanced bottom padding.

## Responsive Rules

- On mobile, the selector stays usable and the phone fits the viewport width.
- Phone content scrolls internally when needed.
- The page must avoid horizontal overflow.
- On desktop, the phone remains centered with side UI secondary.
- Detailed responsive behavior is defined in `docs/visual-contracts/responsive-shell.md`.

## Bloco 1.4 Legacy Reuse Rules

- Legacy UI Lab work can inform app previews only after audit.
- Legacy shell, routing, phone frame and global CSS must not replace the current simulator shell.
- Reused app UI must be adapted to the current dark premium phone visual language.
- Mock controls may change local visual state only; they must not perform real playback, downloads, server controls, metadata writes, file access or network calls.

## Not Implemented In Bloco 1.4

- No backend calls, downloads, server controls, playback, music library access, analytics, secrets or real integrations.
- No image-based phone mockup; the frame remains CSS/component-based so the internal app viewport can stay interactive later.
