# Aria Visual References

This folder stores Aria visual references.

## Current primary references

- `aria_part_1_redesign.png`
- `aria_part_2_redesign.png`

These redesigned images are the primary visual targets for future Aria implementation blocks. Future Aria implementation must use these redesigned references first.

## Legacy references

Older Aria references present in this directory are legacy only and should not be used for new implementation unless explicitly required for historical comparison:

- `aria-player-library-reference.png` (legacy)
- `aria-artist-library-reference.png` (legacy)

## Notes

- Reference images in this directory are committed documentation/spec assets and visual design targets for Aria UI implementation.
- They are not runtime app assets, should not be imported by app code and should not ship as part of the app UI.
- Aria screens should be implemented with high visual fidelity to provided reference images. Do not reinterpret the targets into generic placeholder panels, generic mobile cards or unrelated layout patterns.
- All Aria behavior remains mock-only. Do not add real backend calls, server control, library access, downloads, playback, personal paths or app integration.
