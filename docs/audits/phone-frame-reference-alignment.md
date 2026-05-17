# Phone Frame Reference Alignment Audit

## Scope

- Block: Bloco 2.7.2 - Phone Frame Reference Alignment.
- Tool Mode: combo.
- Environment mode: local-dev.
- Commit target: `fix(studio): align phone frame with reference`.

## Reference Inspection

- Reference image: `docs/references/phone/phone-frame-reference.png`.
- `file` result: PNG image data, `879 x 1790`, 8-bit/color RGB, non-interlaced.
- PIL alpha inspection could not run because `PIL` is unavailable in this environment.
- Alpha/checkerboard result: `file` reports RGB with no alpha channel, so any checkerboard/background should be treated as baked image content. The image was used only as a visual reference, not as a runtime frame.

## Current Frame Issues Found

- The pre-fix frame had a layered rounded-card feeling from multiple borders, inset outlines, strong inner shadows and a bulky shell.
- The top camera area used a wide dynamic-island pill, while the reference points toward a centered punch-hole camera.
- Frame padding and bezel were visually heavier than the thin black hardware rim in the reference.
- Desktop sizing could reach about `392px` wide at `1920x1080`, making the device feel less slim.
- Current measured frame ratios were roughly `0.465`, but the visual details made the device feel bulkier than the reference silhouette.

## Changes Made

- Kept the frame CSS/component-based and fully interactive; no runtime image frame was introduced.
- Added phone sizing variables in `src/index.css` for width, aspect, radius, rim and bezel.
- Reduced desktop maximum width to `22.75rem` and tuned viewport-based sizing so the phone stays fully visible at requested sizes.
- Simplified the outer shell into a cleaner near-black hardware body with subtler shadows and rim highlights.
- Reduced rim and bezel thickness while preserving screen containment.
- Replaced the wide dynamic-island visual with a small centered punch-hole camera.
- Tightened the status bar and home indicator to reduce bulky top/bottom hardware feel.
- Refined side button hints into subtle dark hardware edges outside the left and right rails.
- Removed the extra app viewport side margin so content uses the screen inset more naturally.

## Final Strategy

- Width: `--studio-phone-width`, capped at `22.75rem` on desktop.
- Aspect: `--studio-phone-aspect: 9 / 19.7`.
- Outer radius: `--studio-phone-radius`.
- Screen radius: `--studio-phone-screen-radius`, smaller than the outer shell.
- Rim: `--studio-phone-rim`, thin and hardware-like.
- Bezel: `--studio-phone-bezel`, uniform and black.
- Camera: CSS punch-hole, centered in the top hardware/screen area.

## Responsive Validation Summary

- Browser measurements after the fix showed the phone fully visible at `360x800`, `390x844`, `430x932`, `768x1024`, `1366x768`, `1440x900` and `1920x1080`.
- Page overflow metrics stayed clean: `documentElement.scrollWidth` and `body.scrollWidth` matched viewport width at every tested size.
- App content remained inside the phone screen and the Studio app switcher continued to open Anchor, Forge, Aria and Flux.
- Chrome DevTools MCP could not launch because the environment has no X server; Playwright MCP validation passed.

## Known Gaps

- The frame is still an approximation of the reference, not a pixel-copy.
- The RGB reference image is not suitable as a transparent runtime overlay.
- Future refinement may tune the camera/sensor treatment and side-button positions after additional visual review.
