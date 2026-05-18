# Aria Visual Target

## Primary visual references

- `docs/references/aria/aria_reference1.png`
- `docs/references/aria/aria_reference2.png`

These are the only official Aria visual references. All previous Aria references are obsolete and must not be used for future implementation.

## Design identity

Aria is a dark-premium music player and library experience. It must feel:

- **Music-first** — artwork and track info are the heroes; UI recedes.
- **Immersive** — large artwork, full-bleed playlist headers, minimal chrome.
- **Editorial** — elegant typography, restrained color, generous whitespace.
- **Soft and refined** — rounded corners, gentle borders, subtle shadows, no hard edges.
- **Realistic mobile app** — behaves like a polished native music player, not a dashboard.
- **Closer to a polished music player than a dashboard** — avoid card-heavy layouts, stat grids and config panels.

## Visual principles

### Background style

- Very dark charcoal/near-black base with a subtle warm undertone.
- Avoid pure `#000000`; use deep warm darks like `#0a0b0f`, `#0c0e12` or `#0d0f14`.
- No noisy gradients across the entire background; keep surfaces calm and flat.
- Subtle radial or linear gradients are allowed only for hero artwork backdrops or large cover treatments.

### Surfaces / cards

- Extremely minimal surface differentiation.
- Cards use a near-imperceptible border (`border-white/[0.06]` to `border-white/[0.10]`) rather than strong background contrast.
- Large border radius: `1.4rem` to `2rem` for major cards; `0.75rem` to `1rem` for thumbnails.
- No heavy drop shadows; use only a soft, very subtle shadow for floating elements like the mini player.

### Typography

- Clean sans-serif system (default Tailwind sans).
- Album / playlist titles: large, medium-to-semibold weight, slight negative tracking (`tracking-[-0.02em]`).
- Track titles: medium weight, readable size (`text-sm` to `text-base`).
- Artist names and metadata: muted, lighter weight (`text-slate-300` to `text-slate-400`).
- Section headers: small uppercase or semibold with generous tracking.
- Avoid decorative or novelty fonts. Keep it clean and readable at small sizes.

### Accent colors

- Primary accent: **warm amber / muted gold** — not Forge orange, not neon yellow.
- Use for: active bottom nav, Play button, active filter chips, primary CTAs, waveform indicators.
- Example tones: `amber-200`, `amber-300`, `orange-200/90` — always muted and premium.
- Secondary accents: very subtle. Avoid competing accent colors.
- Do not copy Forge orange blindly. Aria must have its own amber/gold accent language.

### Spacing / density

- Generous padding around artwork and cards (`p-4` to `p-5` minimum).
- List rows need comfortable tap targets (`py-3` minimum).
- Avoid crowding; let the music content breathe.
- Maintain consistent rhythm between thumbnails, text blocks and metadata chips.

### Bottom navigation style

- 4 tabs: **Listen**, **Library**, **Playlists**, **Explore**.
- Icons: thin line style (Lucide), 20–24 px.
- Active tab: amber/gold icon + label + a short underline indicator.
- Inactive tab: muted gray (`text-slate-500`), no underline.
- Background: translucent dark with a subtle top border or shadow to separate from content.
- The mini player sits **above** the bottom nav, not replacing it.

### Player controls

- **Mini player**: compact bar above the bottom nav.
  - Small square album art thumbnail (~40 px).
  - Track title and artist name, truncated.
  - Play/pause and skip buttons.
  - Tap the body to expand into the full Now Playing / Queue view.
- **Full player**: large square artwork centered, track info below, playback controls, progress bar, shuffle/repeat/queue actions.
- Primary Play button: solid amber/gold pill with dark text.
- Secondary controls: circular translucent buttons (`bg-white/[0.07]`) with white icons.

### Artwork treatment

- Square aspect ratio for album covers.
- Slight rounded corners (`rounded-xl` to `rounded-2xl`).
- Use CSS gradients as placeholders; no real image fetching.
- Large artwork in Album Detail and Playlist Detail should dominate the upper half of the screen.
- Subtle inner shadow or gloss overlay on large artwork is acceptable for depth.
- Playlist/Album hero images may use a bottom gradient fade into the background so text remains readable.

### Image / blur usage

- Blurred artwork backdrops are allowed behind the full player or playlist header for immersion.
- Use `backdrop-blur` sparingly and with very low opacity so text remains crisp.
- Do not over-blur to the point of visual noise.

### List rows

- Horizontal row: thumbnail (square, rounded) + title + subtitle/metadata + trailing action.
- Metadata chips: small pills with dark background and muted border (e.g., `FLAC · Local`, `MP3 · Navidrome`).
- Trailing actions: duration text, more menu (vertical dots), or reorder handle (horizontal lines).
- Row tap targets must cover the full row body.

### Buttons / chips

- Primary CTA: amber/gold pill, dark text, generous horizontal padding.
- Secondary action: outlined pill or translucent circular button.
- Filter chips: small pill, dark bg, active state uses amber border/text.
- Avoid rectangular sharp-cornered buttons.

### Icon style

- Thin stroke, 1.5 px feel (Lucide defaults).
- Monochrome within rows; only the active nav and primary actions receive accent color.

### Motion expectations

- Tab switches should feel instant or use a very subtle fade/slide.
- Bottom sheets should slide up smoothly with a backdrop fade.
- Mini player expansion to full player should feel like a seamless scale/transition.
- Queue reorder handles imply future drag affordance but do not need to be fully draggable in early batches.

## What to avoid

- Neon or cyberpunk glow effects.
- Generic streaming-service clone layouts (overly dense grids, oversized promotional banners).
- Noisy gradients behind every element.
- Dashboard-style cards with stat grids everywhere.
- Raw mock/debug UI inside the phone viewport (keep Studio-only controls outside the app frame).
- Terminal or config language inside the music UI.
- Fake backend claims ("Syncing with server…", "Fetching your library…").
- Pure black backgrounds that feel hollow rather than immersive.
- Bright orange or Forge-like warm tones; Aria should feel more gold/amber.

## Implementation status

- Batch 1 (Visual Baseline & Navigation Shell) is implemented.
- The Aria visual system is active in the Studio simulator: dark warm charcoal backgrounds, amber/gold accents, minimal bordered surfaces, large radius, thin Lucide icons, editorial typography.
- Bottom navigation (Listen / Library / Playlists / Explore), mini player and full Now Playing overlay are wired with local React state.
- Static core screens (Listen Home, Library preview, Playlists, Explore/Search) render mock data with high visual fidelity to the final references.

## Mock-only limits

- No real audio playback.
- No real music file access.
- No folder scanning.
- No local library reading.
- No album art fetching.
- No lyric fetching.
- No streaming API calls.
- No backend calls.
- No Navidrome calls.
- No Forge Core calls.
- No `fetch`/`axios` for app behavior.
- No `FileReader`.
- No `fs`.
- No `child_process`.
- No filesystem access.
- No secrets, auth, analytics.
- No real playback engine.

All data remains static and fictional. All state changes remain local React state only.
