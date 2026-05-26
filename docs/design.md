# Noqlen Design Guardrails

## Purpose

This document defines practical visual rules for Noqlen interfaces. It prevents agents from creating generic UI when references already exist.

Full logo and brand exploration will happen later. For now, this document protects current app visual consistency.

## Noqlen visual direction

Noqlen interfaces should feel:

- minimal;
- premium;
- dark-first;
- calm but technical;
- media and interface focused;
- warm amber as the current Aria signature;
- glassy but not blurry chaos;
- rounded and tactile;
- dense enough for mobile, but not cramped.

## Aria visual identity

Aria is a dark cinematic music player with a warm amber accent. It should use album-art-driven mood, rounded cards, compact bottom sheets and full playback overlays.

Typography should pair serif display titles with clean small UI text. Visible UI must not expose implementation limitation copy.

## Sheet rules

- Bottom sheets are compact.
- Use a title and optional subtitle.
- Use rounded top corners.
- Use an amber CTA when there is one primary action.
- Avoid giant empty forms.
- Avoid Settings-like layout for creative or playlist flows.
- Avoid walls of toggles.
- If a reference shows pills, cards or rows, use that structure.

## Card rules

- Cards should have clear action meaning.
- Creation cards open creation flows.
- Category cards open category views.
- More buttons open action sheets.
- Status-only controls should look less prominent.

## Button and CTA rules

- Use one primary CTA per sheet when possible.
- Primary CTAs are amber.
- Destructive actions need confirmation.
- Secondary actions should be visually quieter.

## Form/flow rules

- Fields should match the reference.
- Do not invent social, account, provider or file concepts.
- Do not turn every flow into settings.
- Avoid generic form layouts when a visual reference exists.

## Copy rules

Visible UI must avoid:

- mock
- prototype
- visual-only
- preview-only
- development
- no real
- no backend
- no filesystem
- no persistence
- Core mapping
- visual lab

Visible UI should use:

- simple app words;
- direct action labels;
- music-player vocabulary;
- short subtitles.

## Forbidden generic patterns

- Generic dashboard cards
- SaaS account settings
- Social sharing UI
- Overly corporate admin panels
- Terminal or schema wording
- Oversized forms
- Dense developer diagnostics
- Random gradient blob logos
- Obvious headphone/play-button logo as default brand direction
- Using references loosely while inventing unrelated structure

## Reference-first rule

When `docs/references` contains an image for a flow:

- describe it first;
- implement only after breakdown;
- do not substitute a generic component pattern;
- exact pixel clone is not required, but hierarchy, density and visible anatomy are required.
