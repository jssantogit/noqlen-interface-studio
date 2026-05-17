# Anchor Display Regression Fix Audit

## Scope

- Block: Bloco 2.7.1 - Anchor Display Regression Audit & Fix.
- Tool Mode: combo.
- Environment mode: local-dev.
- Commit target: `fix(anchor): repair phone viewport display regressions`.

## Reported Problems

- Anchor Home server values truncated too aggressively inside the simulated phone.
- The mock address was unreadable in the Home server card.
- Navidrome Settings category chips compressed or appeared overlapped.
- Navidrome Settings showed horizontal scroll noise and cramped summary/action areas.
- Bottom sheets and long previews needed stronger max-width and internal-scroll containment.

## Root Cause Found

- The phone viewport can be very narrow after simulator chrome and shell constraints. Measured inner app widths included about 206px at `360x800`, 226px at `390x844`, and 247px at `1366x768`.
- Home and Servers detail rows used fixed label columns (`5.6rem` and `4.6rem`) plus truncated value cells. At the smallest measured size, the Home value column had only about 29px, so `3d 14h 28m`, `12,458 songs`, and the address were clipped.
- Navidrome Settings category navigation used a horizontal row with shrinkable chip buttons. The scroller clipped the row, but individual chips could shrink/compress visually and browser diagnostics reported offscreen chip content.
- Several rows, cards, sheets and previews were missing consistent `w-full`, `max-w-full`, `min-w-0`, wrapping, or internal overflow containment.

## Areas Fixed

- Anchor root and scroll container now explicitly constrain width and use softened internal scrollbars.
- `AnchorCard` now enforces full-width, max-width and overflow containment.
- Anchor bottom nav uses slightly tighter spacing and no longer consumes as much vertical density.
- Bottom sheets and dry-run sheets now use narrower side padding on small phone widths, max-width containment and soft internal scrollbars.
- Home server details now stack label/value rows, and critical values wrap with `overflow-wrap:anywhere`.
- Servers detail rows now stack and wrap values, including address copy.
- Library text and stat rows now wrap more safely on narrow phone widths.
- Shared action row detail copy now wraps instead of truncating long paths.
- Navidrome category navigation now uses a wrapping chip layout instead of a horizontal overflow row.
- Navidrome summary cards, sticky actions, setting fields, key/env badges, TOML/env preview and dry-run preview are constrained to phone width.

## Responsive Rules Added

- Phone app content should treat 206px-310px inner widths as valid.
- Critical server values should wrap, not truncate.
- Long URLs, fake paths, config keys and env vars use controlled word breaking.
- Multi-card summaries use `minmax(0, 1fr)` and reduced small-width padding/letter spacing.
- Code previews may scroll internally, but parent sheets must not overflow horizontally.
- Category navigation must not rely on page-level or phone-level horizontal overflow.

## Known Gaps

- The simulator shell still produces a narrow phone at some desktop/mobile sizes by design; this block makes Anchor fit that actual width rather than changing the phone frame architecture.
- Some non-critical labels may still truncate where they are intentionally compact, such as bottom nav labels and transient toast text.
- Final Anchor state coverage and completion audit remain future work.

## Validation Evidence Summary

- Browser diagnostics before fix measured Home value cells as low as 29px wide at `360x800` and identified Navidrome category chips extending beyond the viewport inside the horizontal row.
- Browser diagnostics after fix confirmed Home value cells had readable row widths and no detected overflowing elements for Navidrome Settings at `360x800`, `390x844`, `430x932`, `1366x768`, and `1440x900`.
- Overflow metrics after fix remained at viewport width for `documentElement.scrollWidth` and `body.scrollWidth` in tested sizes.
- Full command, safety and repository hygiene evidence is recorded in the Bloco 2.7.1 handoff.
