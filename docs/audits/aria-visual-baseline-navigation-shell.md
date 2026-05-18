# Aria Visual Baseline & Navigation Shell — Batch 1 Audit

**Tool Mode:** combo
**Block:** Bloco 4.1 — Aria Visual Baseline & Navigation Shell
**Date:** 2026-05-18

## Final references used

- `docs/references/aria/aria_reference1.png`
- `docs/references/aria/aria_reference2.png`
These are the only official Aria visual references. Older references were intentionally not used.

## Visual baseline summary

Implemented the final Aria visual system:

- **Background:** Very dark warm charcoal (`#0c0e12`) with a subtle radial amber glow at the top (`rgba(212,168,83,0.08)`), calm and immersive.
- **Surfaces / cards:** Minimal differentiation using `bg-white/[0.03–0.05]`, `border-white/[0.06–0.08]`, large radius (`rounded-[1.4rem]` to `rounded-[1.8rem]`). No heavy shadows.
- **Typography:** Clean sans-serif for body (`Inter` default), serif for large titles (`font-serif`), slight negative tracking on headings (`tracking-[-0.02em]` to `tracking-[-0.05em]`), muted slate for metadata.
- **Accent color:** Warm amber/gold (`amber-300`, `#d4a853`) for active nav, primary Play buttons, filter chips and favorite state. Distinct from Forge orange.
- **Bottom nav:** 4 tabs (Listen, Library, Playlists, Explore) with thin Lucide icons, amber active icon + label + short underline indicator, muted slate for inactive.
- **Mini player:** Compact bar above bottom nav with small square artwork (~40px), truncated track title/artist, play/pause and next buttons. Tapping body expands to full Now Playing.
- **Artwork treatment:** Square aspect ratio, CSS gradient placeholders only (`bg-gradient-to-br`), rounded corners (`rounded-xl` to `rounded-[1.4rem]`), no external image fetching.
- **List rows:** Thumbnail + title + subtitle + trailing metadata badge pill (`FLAC · Local`) or chevron. Comfortable tap targets.
- **Buttons/chips:** Amber pill for primary CTA (`Play`), dark outlined/translucent for secondary (`Shuffle`). Filter chips with amber active ring.
- **Icon style:** Thin stroke Lucide icons, monochrome within rows, accent only on active nav and primary actions.

## Screens implemented

1. **Listen (Home)** — Editorial greeting ("Listening space" / "Aria"), now playing hero card with large gradient artwork, Play CTA, Recent listens horizontal shelf, Quick resume rows, Featured playlists grid, Search affordance.
2. **Library** — Category filter chips (Albums, Artists, Songs, Genres, Folders), Albums list with artwork, title, artist, year, format/source badge, Artists circular avatar preview row.
3. **Playlists** — Playlist cards with large header artwork, title, description, track count, duration, Play and Shuffle buttons per card.
4. **Explore (Search)** — Search input with focus ring, filter chips (All, Tracks, Albums, Artists, Playlists, Folders), recent search pills, browse results list with metadata badges.
5. **Now Playing (full screen)** — Large square artwork, track title, artist name in amber, progress bar visual, play/pause primary amber button, previous/next secondary buttons, shuffle/repeat toggles, favorite heart toggle, Up Next queue preview.

## Navigation behavior

- `AriaBottomNav` with 4 tabs and active underline indicator.
- Tapping a tab switches the visible screen with a subtle fade/slide transition (`AnimatePresence`, `motion.div`).
- Active tab updates icon stroke width, label color, and underline visibility.
- No dead nav items; all 4 tabs render static screen shells.
- Nav stays inside the phone viewport; content bottom padding accounts for nav + mini player height.

## Mini player behavior

- Visible when a track is "active" (always visible in this baseline).
- Shows small artwork, track title, artist, play/pause and next buttons.
- Tapping the mini player body expands to the full Now Playing overlay.
- Play/pause toggles local visual state only (no real audio).
- Next shows a toast indicating mock behavior.

## Now Playing baseline

- Full-screen overlay that slides up from the bottom (`AnimatePresence` with `y: '100%'` → `y: 0`).
- Large artwork, track info, progress bar (static visual, 35% fill), playback controls.
- Secondary controls: shuffle toggle, repeat cycle (off → all → one), favorite toggle.
- Collapse affordance (chevron down) returns to the previous tab with mini player visible.
- Up Next preview shows first 3 queue items.

## Interactions deferred

- Seek / progress bar drag behavior (Batch 2).
- Full next/previous track cycling through mock queue (Batch 2).
- Library deep browsing beyond static preview (Batch 3).
- Album/Artist/Track/Playlist detail screens (Batch 4).
- Lyrics screen/sheet (Batch 5).
- Queue management (reorder, remove, save as playlist, clear) (Batch 5).
- Real-time search filtering logic beyond basic local string matching (Batch 6).
- Metadata Review & Library Health (Batch 7).
- Full state coverage (empty, loading, error) (Batch 8).
- Completion audit (Batch 9).

## Mock-only safety result

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
- No secrets, auth, or analytics.
- No real playback engine.
- All data is static and fictional.
- All state changes are local React state only.

## Remaining gaps

- Now Playing progress bar is static visual only (no timer/seek).
- Next/Previous do not cycle through the mock queue yet.
- Library category tabs are static (only Albums shows content; Artists shows preview row).
- Search results use basic local string filtering on static data.
- No empty states, loading states, or error states yet.
- No detail screens (Album, Artist, Track, Playlist) yet.
- No bottom sheets, confirm dialogs, or lyrics display yet.
- Mini player does not hide when queue is empty (no empty-track state yet).

## Raw evidence summary

- Final references exist and are committed as `docs/references/aria/aria_reference1.png` and `aria_reference2.png`.
- Aria final references are used in `docs/visual-targets/aria.md`, `docs/screen-contracts/aria/README.md`, and `docs/screen-contracts/aria/interactions.md`.
- No old Aria references (`aria_part_1_redesign`, `aria_part_2_redesign`, `aria_1.png`, `aria_2.png`) are referenced in docs or source.
- Build passes (`npm run build`).
- Lint passes (`npm run lint`).
- No TypeScript errors.
- No real audio, file, network or backend behavior exists in Aria source.
