# Visual Targets

Visual target documents translate committed reference images into implementation rules for mock-only app UIs.

The images in `docs/references/` plus these target documents are the source of truth for app visual fidelity. App implementations must compare against both before declaring work done.

Reference images are design targets. They are not runtime assets, should not be imported by app code and should not ship as part of the app UI.

Future app UIs should be implemented with high visual fidelity to their references. Do not reinterpret references into generic placeholders, generic dashboards or unrelated design patterns.

All app behavior remains mock-only. Visual targets must not introduce real backend calls, server control, library access, downloads, playback, personal paths or app integration.
