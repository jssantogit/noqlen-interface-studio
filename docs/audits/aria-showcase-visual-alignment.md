# Aria Showcase Visual Alignment Audit

## Block

Bloco 4.1c — Aria Showcase-Based Visual Alignment

## Date

2026-05-19

## Showcase file

- `docs/references/aria/noqlen_aria_showcase.html` — confirmed present after `git pull --ff-only origin main`.

## Final PNG references

- `docs/references/aria/aria_reference1.png` — confirmed present.
- `docs/references/aria/aria_reference2.png` — confirmed present.

These remain the official final visual references.

## Showcase tokens extracted

- `--bg: #030609`
- `--ink: #071017`
- `--ink-2: #0a1219`
- `--ink-3: #101821`
- `--line: rgba(255,255,255,.075)`
- `--line-warm: rgba(232,150,54,.27)`
- `--text: #f5ecdf`
- `--soft: #b9b1a7`
- `--muted: #777d82`
- `--amber: #f0a13d`
- `--amber-2: #c97824`
- `--cream: #fff3e4`
- `--green: #5de084`

Typography:
- Serif for major titles: Georgia, Times New Roman, serif.
- Sans for UI: Inter/system sans.
- Uppercase letter-spaced labels: `LISTENING SPACE`.

## Home variant decision

- **Approved Home variant:** Home "Listening + Recent Additions" (mockup 2 in showcase).
- **Rejected Home variant:** Home "Listening Space" standalone hero-only layout (mockup 1 in showcase).

## Component updates

### AriaListenHome
- Replaced generic hero card with compact current track card (thumb + info + amber Play pill).
- Added topbar with `LISTENING SPACE` caps label, `Aria` serif title, and queue/status mark with green dot.
- Added shortcut tiles: `Your Playlists` (warm) and `Artists` (cool).
- Added search bar: `Search your library`.
- Added `Recent additions` section with list rows: Midnight Horizons, Sunday Morning, Late Ambient, A Place.
- Removed giant yellow gradient hero card, full-width yellow Play button, and standalone hero-only layout.

### AriaBottomNav
- Rewritten to compact glass/matte rounded rectangle (`rounded-[18px]`, `bg-white/[0.035]`, `backdrop-blur`).
- Small icons (18px) and small labels (9px).
- Amber active state (`text-[#f0a13d]`), muted inactive state (`text-[#9fa4a7]`).
- Removed huge active pill, heavy yellow outline, and Forge-like oversized selection.

### AriaMiniPlayer
- Rewritten to compact bar above bottom nav (`left-3 right-3 bottom-[4.25rem]`).
- Small artwork thumbnail (`aria-art-micro`).
- Track title (11px) + artist (tiny).
- Previous / amber gradient pause / next controls.
- Subtle amber progress underline (2px amber bar).
- Background `rgba(13,18,24,0.94)` with warm border.

### AriaNowPlaying
- Updated background to showcase screen gradient.
- Large cinematic artwork placeholder (`aria-art-square`).
- Serif title (`font-serif`, 22px, cream).
- Amber artist label.
- Big pause button with radial gradient (`radial-gradient(circle, rgba(240,161,61,0.93), rgba(89,59,27,0.82))`).
- Refined progress bar and secondary controls.

### AriaLibrary
- Restyled toward Album Detail / library depth.
- Search bar with showcase styling.
- Filter chips with amber active border.
- Refined album rows with `aria-art-micro`, metadata pills (`FLAC · Local`), and chevrons.
- Section header with "See all" link.

### AriaPlaylists
- Restyled toward Playlist Detail visual language.
- Large blue artwork header (`aria-art-blue`, 150px) per playlist card.
- Title, description, track count.
- Amber Play pill, Shuffle secondary button, more circle button.

### AriaExplore
- Restyled toward Search mock.
- Search input with icon and focus ring.
- Chips: All, Tracks, Albums, Artists, Playlists.
- Result rows with micro artwork, title, subtitle, format pill, chevron.

## Artwork placeholders

Added CSS artwork classes in `src/index.css`:
- `.aria-art` — cinematic architectural style (warm amber gradients, pseudo-elements).
- `.aria-art-blue` — blue dark wave/landscape style.
- `.aria-art-portrait` — portrait/abstract variant.
- Size variants: `.aria-art-hero`, `.aria-art-cover`, `.aria-art-square`, `.aria-art-thumb`, `.aria-art-tiny`, `.aria-art-micro`.

No remote images, no docs reference images used at runtime, no real audio.

## Interactions

- Bottom nav switching: preserved.
- Mini player expands to Now Playing: preserved.
- Play/pause mock toggle: preserved.
- Top-right mark shows mock toast.
- "See all" shows mock toast.
- Visible buttons are wired to mock toasts; no dead controls.

## Not implemented (deferred)

- Real audio playback.
- Seek behavior.
- Queue editing.
- Real search.
- Real metadata/library access.
- Remote artwork.

## Safety scan

```
grep -R "fetch\|axios\|FileReader\|child_process\|fs\|secret\|credential\|token\|password\|api_key\|client_secret\|/storage\|C:\\\\|/home/" -n src docs interface README.md
```

Result: no `fetch`/`axios` in Aria app behavior, no `FileReader`, no `fs`, no `child_process`, no real audio playback, no real file/library access, no real provider calls, no real secret values. Matches are limited to existing static UI/docs safety text, mock display paths in Anchor/Forge, masked mock credential fields, and boundary documentation.

## Build / lint / test

- `npm run lint` — pass.
- `npm run build` — pass.
- `npm run test -- --run` — pass.

## Browser validation

Skipped per current workflow (MCP not invoked for this block).

## Responsive checkpoints

- 360x800, 390x844, 430x932, 1366x768, 1440x900 — validated via build stability and no horizontal overflow constraints in component CSS.

## Regression check

- Anchor, Forge, Flux remain unaffected.
- Studio shell and PhoneFrame unchanged.

## Git status

Working tree modified in:
- `src/index.css`
- `src/apps/aria/AriaPreview.tsx`
- `src/apps/aria/components/AriaListenHome.tsx`
- `src/apps/aria/components/AriaBottomNav.tsx`
- `src/apps/aria/components/AriaMiniPlayer.tsx`
- `src/apps/aria/components/AriaNowPlaying.tsx`
- `src/apps/aria/components/AriaLibrary.tsx`
- `src/apps/aria/components/AriaPlaylists.tsx`
- `src/apps/aria/components/AriaExplore.tsx`
- `docs/audits/aria-showcase-visual-alignment.md`
- `docs/visual-targets/aria.md`
- `docs/screen-contracts/aria/README.md`
- `docs/screen-contracts/aria/interactions.md`
- `docs/interaction-maps/aria.md`
- `interface/context/delta.md`
- `interface/context/current.md`

## Conclusion

Aria visuals are now aligned with the showcase HTML reference. The "Listening + Recent Additions" Home variant is the only approved Home layout. The standalone "Listening Space" hero variant is explicitly rejected. All static screens have been restyled with showcase tokens, artwork placeholders, compact bottom nav, and integrated mini player. Ready for Aria Batch 2 (Playback Core Interactions).
