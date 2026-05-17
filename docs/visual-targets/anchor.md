# Anchor Visual Target

Reference image:

- `docs/references/anchor/anchor-screens-reference.png`

Goal: implement Anchor with high visual fidelity to the reference image.

Screens:

- Home
- Servers
- Library
- Activity

Visual rules:

- Preserve the dark premium mobile UI.
- Preserve serif-style large titles.
- Preserve the amber/orange primary accent.
- Use green only for online/success states.
- Use red/orange only for failures or warning states.
- Preserve card density similar to the reference.
- Preserve bottom navigation similar to the reference.
- Preserve soft borders.
- Preserve compact status/data rows.
- Keep UI inside the phone frame.

Must not:

- Simplify into placeholder cards.
- Reinterpret as a generic dashboard.
- Move UI outside the phone frame.
- Implement real server controls.
- Access real Navidrome.
- Access a real library.
- Read real logs.
- Add real backend behavior.

All Anchor behavior remains mock-only.
