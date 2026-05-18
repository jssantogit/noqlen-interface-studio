# Forge Visual Target

Reference image:

- `docs/references/forge/forge-screens-reference.png`
- `docs/references/forge/forge_review_redesign.png` is the active Review architecture target for Bloco 3.4.2.

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

- All tab is item-first with a summary card, `Review safe fixes` CTA, compact chips and safe/review counts.
- Artwork tab lists current-cover facts only; list rows do not show confidence or side-by-side comparison. `Apply artwork` opens the comparison sheet before applying.
- Lyrics tab shows missing/incomplete/unsynced lyric fixes and opens mock placeholder previews before applying.
- Metadata tab groups non-artwork/non-lyrics changes under Tags, Identity, Release and Audio.
- Metadata actions use specific labels such as `Apply tags`, `Apply identity`, `Choose match`, `Apply release data` and `Apply audio data`.
- File info is read-only and excluded from the main Review surface.
- Use soft peach-orange/warm amber accents only; avoid neon, cyan spill, blue glow and saturated orange.

Must not:

- Collapse into generic review cards.
- Replace with a simplified "visual fixes" placeholder.
- Change real metadata.
- Touch files.
- Use backend behavior.
- Copy Anchor yellow directly.

All Forge behavior remains mock-only.
