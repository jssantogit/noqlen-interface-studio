# Visual Targets

Visual target documents describe how app UIs should map committed reference images into mock-only implementations.

Reference images are design targets. They are not runtime assets, should not be imported by app code and should not ship as part of the app UI.

Future app UIs should be implemented with high visual fidelity to their references. Do not reinterpret references into generic placeholders or unrelated design patterns.

All app behavior remains mock-only. Visual targets must not introduce real backend calls, server control, library access, downloads, playback, personal paths or app integration.
