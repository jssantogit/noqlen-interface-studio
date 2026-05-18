# Forge Visual Target

Reference image:

- `docs/references/forge/forge-screens-reference.png`

Goal: preserve legacy Forge visual fidelity when implementing Forge screens.

Screens:

- Home
- Review
- Library
- Activity

Visual rules:

- Preserve the editorial home screen.
- Preserve the warm orange Review Now button.
- Preserve review groups.
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

Must not:

- Collapse into generic review cards.
- Replace with a simplified "visual fixes" placeholder.
- Change real metadata.
- Touch files.
- Use backend behavior.
- Copy Anchor yellow directly.

All Forge behavior remains mock-only.
