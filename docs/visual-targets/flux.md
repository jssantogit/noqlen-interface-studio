# Flux Visual Target

Reference image:

- `docs/references/flux/flux-screens-reference.png`

Goal: implement Flux with high visual fidelity to the reference image.

Visual rules:

- Preserve the workflow/state visual language from the reference.
- Preserve the mobile app density, hierarchy and spacing shown in the reference.
- Preserve reference-specific navigation and card treatment.
- Preserve the intended accent colors and status treatments from the reference.
- Keep UI inside the phone frame.
- Use the reference image plus this document as the source of truth before declaring Flux implementation done.

Must not:

- Simplify into placeholder cards.
- Reinterpret as a generic workflow dashboard.
- Move UI outside the phone frame.
- Add real workflow execution.
- Add backend calls.
- Add downloads, server control, personal paths or app integration.

All Flux behavior remains mock-only.
