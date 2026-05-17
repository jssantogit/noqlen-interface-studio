# Phone Frame References

This folder stores phone/device frame references for the Studio simulator.

References are design targets, not runtime assets. Future `PhoneFrame` work should compare against `phone-frame-reference.png` when refining the simulated device frame.

Do not blindly replace the CSS phone frame with a baked image unless explicitly approved.

Current inspection notes:

- `phone-frame-reference.png` is an RGB PNG (`879 x 1790`) according to `file`.
- Treat it as a baked visual reference, not as a transparent overlay or runtime asset.
