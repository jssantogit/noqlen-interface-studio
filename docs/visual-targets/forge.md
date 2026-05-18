# Forge Visual Target

Reference image:

- `docs/references/forge/forge-screens-reference.png`
- `docs/references/forge/forge_review_redesign.png` is the active Review architecture target for Bloco 3.4.2 and 3.4.3.

Goal: preserve legacy Forge visual fidelity when implementing Forge screens.

Screens:

- Home
- Review
- Library
- Activity

Visual rules:

- Preserve the editorial home screen.
- Preserve the warm orange Review Now button.
- Preserve the redesigned Review architecture: All / Artwork / Lyrics / Metadata.
- Keep Identity inside Metadata; do not expose Identity or Files as main Review tabs.
- Preserve Metadata subfilters: Tags / Identity / Release / Audio.
- Preserve checkboxes with orange accent.
- Preserve album thumbnails with rich CSS gradients.
- Preserve the library segmented control.
- Preserve activity cards with tinted icon circles.
- Preserve bottom navigation with orange active state.

Design identity:

- **Accent:** warm orange (`#e7a35f`, `orange-300`)
- **Surface:** near-black with warm tint, elevated cards use gradient + inner highlight
- **Shadow:** soft dark shadows with warm orange tint on primary actions
- **Thumbnails:** CSS gradient placeholders, no external images
- **Mood:** editorial, warm, careful, corrective

Review redesign rules:

- All tab is item-first with a summary card, `Review safe fixes` CTA and compact chips. Individual All rows must not show Safe / Review counters.
- Tapping an All row opens a complete item repair overview sheet; it must not jump directly into Artwork.
- Sort control opens an in-phone sort sheet and updates current queue order.
- Artwork tab lists current-cover facts only; list rows do not show confidence or side-by-side comparison. `Apply artwork` opens the comparison sheet before applying.
- Lyrics tab shows missing/incomplete/unsynced lyric fixes and opens mock placeholder previews before applying.
- Metadata tab groups non-artwork/non-lyrics changes under Tags, Identity, Release and Audio.
- Metadata actions use specific labels such as `Apply tags`, `Apply identity`, `Choose match`, `Apply release data` and `Apply audio data`.
- Metadata preview sheets show field-by-field current/suggested values with wrapping text and provider/source badges.
- Artwork, lyrics and metadata preview sheets show subtle provider/source badges.
- Progress sheets show step list, animated progress indicator, source badge and result state with Done button.
- File info is read-only and excluded from the main Review surface.
- Use soft peach-orange/warm amber accents only; avoid neon, cyan spill, blue glow and saturated orange.

Enrich Mode visual rules:

- Full-screen overlay inside the phone viewport with warm charcoal gradient background.
- Step indicator pill row at top: Options → Targets → Confirm → Dry-run → Apply.
- Category cards use `ForgeCard` with premium gradient surface and inner highlight.
- Cards are collapsible: header row shows title, description, count-based selection badge and expand chevron; body shows checkboxes, toggles and extras only when expanded.
- Tags expanded by default; other categories collapsed by default.
- Overwrite toggles use the same switch style as Settings toggles.
- Warning cards use calm orange-tinged border and background, not scary red.
- Target rows use compact checkbox + thumbnail + metadata pattern.
- Dry-run and progress steps use the same step-list pattern as `ForgeProgressSheet`.
- Result screen uses success emerald icon + summary stat grid + category result cards.
- Primary actions use the warm orange CTA with inner highlight.
- Secondary actions use bordered buttons with subtle background.
- Settings helper is a compact single-row link, not a large card.
- Sticky header with warm charcoal backdrop blur keeps step context visible while scrolling.
- No generic wizard feel; no terminal/config feel; no page-level overflow.

State coverage visual rules:

- Empty, warning, error and no-results cards use matte warm-charcoal surfaces with restrained peach-orange accents.
- Error states use subtle red only for local mock failure emphasis; avoid full-screen alarming red panels.
- Preview States controls live quietly in Settings > Advanced and must not dominate normal Forge flows.
- State actions must remain compact enough for the 390px phone viewport and must not imply real providers, files, galleries or updates were touched.

Must not:

- Collapse into generic review cards.
- Replace with a simplified "visual fixes" placeholder.
- Change real metadata.
- Touch files.
- Use backend behavior.
- Copy Anchor yellow directly.
- Present Enrich Mode as "automatic safe repair".

All Forge behavior remains mock-only.
