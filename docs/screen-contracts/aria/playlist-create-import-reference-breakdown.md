# Aria Playlist Create / Import Reference Breakdown

## Purpose

This document converts the playlist reference image into a literal implementation contract. It exists because the previous implementation drifted into generic UI.

The implementation must follow this breakdown before adding behavior. References guide structure, hierarchy, density, surfaces and copy.

This is not a pixel-perfect clone contract, but it is a strict anatomy contract.

## Source reference

- `docs/references/aria/aria_playlist_new-folder-export-folder-detail_reference.png`

This reference is the only visual source for 7F.1. Other playlist and folder references belong to 7F.2.

Do not borrow unrelated Settings patterns for this flow. Do not borrow account, social, provider or file-manager patterns.

## Product and navigation constraints

Required context:

- `docs/product/aria-product-spec.md`
- `docs/screen-contracts/aria/screen-map.md`
- `docs/design.md`

Product behavior comes from `aria-product-spec.md`. Destination behavior comes from `screen-map.md`. Visual rules come from `docs/design.md`. This breakdown controls the exact anatomy for 7F.1.

Relevant screen-map rows:

| Playlists control | Destination |
|---|---|
| Create Playlist | Create Playlist sheet |
| Import Playlist | Import Playlist sheet |
| New Folder | New Folder sheet |
| Export Playlist | Export Playlist sheet |
| Folder row | Folder Detail sheet/view |

7F.1 only covers Create Playlist and Import Playlist. New Folder, Export Playlist and Folder Detail remain 7F.2.

## What 7F.1 covers

Included:

- Create Playlist
- Smart Playlist expansion within the creation flow
- Import Playlist

Excluded:

- New Folder
- Export Playlist
- Folder Detail
- Folder add/edit/rename
- Folder export/delete
- Queue save as playlist
- Now Playing add to playlist

## Visual anatomy rules

- Use one `AriaBottomSheet` per flow.
- Sheet must be compact and vertically stacked.
- Avoid full-screen redesign.
- Avoid giant form feeling.
- Avoid settings-page feeling.
- Avoid generic card grids unless the reference uses that kind of card.
- Use existing dark sheet surface and amber accent.
- Use rounded field surfaces.
- Use pill/chip rows where the reference uses pills.
- Use one primary amber CTA at the bottom of the sheet.
- No extra explanatory notices.
- No limitation copy.
- No unrelated controls.

## Create Playlist Reference Anatomy

The Create Playlist sheet should adapt the left reference sheet anatomy: dark rounded sheet, title/subtitle, rounded fields, compact selectable cards, small pills, color preview/rail and one amber CTA.

### Header

- Title: `Create Playlist`
- Subtitle: `New listening space`

### Body Order

#### A. Name field surface

- Large rounded field.
- Label or placeholder: `Name`
- Default visible value can be `Focus Mix`.
- Must look like an editable field, not a settings row.

#### B. Description field surface

- Large rounded field.
- Label or placeholder: `Description`
- Default can be empty or short.
- Must sit directly below Name.

#### C. Playlist content/source selection

- A labeled area.
- Must use compact selectable cards or pills based on the reference.
- Allowed visible choices:
- `Empty`
- `From queue`
- `From liked tracks`

Do not include:

- visibility
- sharing
- account
- device
- server
- provider
- filesystem

#### D. Smart option placement

- Smart Playlist must not be a root action card.
- Smart mode must live inside the Create Playlist sheet.
- It may appear as a compact pill, small segmented choice or selectable option near the content/source selection.
- It must not create a separate full settings page.

#### E. Tags / mood pills

- A row or wrapped group of small pills.
- Visible examples:
- `Focus`
- `Collection`
- `Road`
- Selected pill may show a small remove glyph.
- There may be an `Add tag` pill.
- Must not become a large generic tag editor.

#### F. Color preview / color rail

- Include compact color preview or swatch.
- Include horizontal color rail or small color chips.
- Allowed colors:
- `Amber`
- `Violet`
- `Blue`
- `Green`
- Do not add advanced theme settings.

#### G. Primary action

- One large amber CTA: `Create Playlist`
- CTA at bottom of sheet content.
- No secondary destructive action.

### Expected Behavior For Future Implementation

- Opened from Playlists > Create Playlist.
- Selected controls update locally.
- CTA adds or confirms a local playlist row for current session.
- Sheet closes after action.

## Smart Playlist Expansion Anatomy

Smart must not become a completely different generic settings page.

Rule: Smart Playlist is a mode inside Create Playlist, not a separate root feature.

How Smart should appear:

- Same sheet title area.
- Same Name field.
- Same Description field.
- Same Tags/mood area.
- Same Color area.
- The middle content/source selection area is replaced by smart rules.

Required smart rule structure:

- Rule cards or compact rule rows.
- Visible examples:
- `Genre is Progressive Metal`
- `Year is 2020s`
- `Quality is Lossless`

Required smart controls:

- Match mode:
- `Match all`
- `Match any`
- Limit:
- `25`
- `50`
- `100`
- Auto update:
- small toggle or switch-like row

Primary action:

- `Create Smart Playlist`

Do not include:

- complex query builder
- nested boolean logic
- server/provider rules
- scan engine language
- database language
- large technical result block
- Settings-like toggles wall

Expected behavior for future implementation:

- Smart selection expands or replaces the content/source section.
- CTA confirms a local smart playlist row.
- It does not need real matching logic.

## Import Playlist Reference Anatomy

The Import Playlist sheet should adapt the middle reference sheet anatomy: dark rounded sheet, title/subtitle, a rounded subject row, compact format chips, compact option rows, destination row and one amber CTA.

### Header

- Title: `Import Playlist`
- Subtitle: `Bring in a saved collection`

### Body Order

#### A. Source row / playlist row

- Rounded row showing a source/playlist placeholder.
- Example visible label: `Saved playlist`
- It should look selectable.
- It must not open real file picker.

#### B. Format chips

- Compact chips:
- `M3U`
- `CSV`
- `Text`
- `Link`
- Selected chip must be visible.
- Link is only a visible choice, not a network flow.

#### C. Import options

- Path-mode-style or radio-row style options.
- Use compact rows, not a generic toggles wall.
- Options:
- `Keep order`
- `Skip duplicates`
- `Match local tracks`

#### D. Destination row

- Rounded row: `New playlist`
- Optional secondary state: `Existing playlist`
- If existing playlist is selected later, it may show a compact playlist list.

#### E. Primary action

- One large amber CTA: `Import Playlist`

### Expected Behavior For Future Implementation

- Opened from Playlists > Import Playlist.
- Choices update locally.
- CTA adds or confirms imported playlist row for current session.
- No file picker, FileReader, network, URL fetch or Android storage behavior.

## Forbidden Additions

- Visibility
- Shared/private
- Account selection
- Provider selection
- Device storage
- File picker
- URL fetch
- Backend import
- Source capabilities
- Debug/source readiness
- Generic Settings rows
- Multi-step wizard unless the reference visibly supports it
- Large helper notice cards
- Local-only or implementation limitation copy
- New Folder / Export / Folder Detail inside 7F.1

## Component Ownership For Future Implementation

Likely files for 7F.1-I:

- `src/apps/aria/components/AriaPlaylists.tsx`
- `src/apps/aria/AriaPreview.tsx`

Avoid:

- `src/apps/aria/components/AriaSettingsSheet.tsx`
- `src/apps/aria/components/AriaExplore.tsx`
- `src/apps/aria/components/AriaLibrary*.tsx`
- `src/apps/aria/components/AriaQueue.tsx`
- `src/apps/aria/components/AriaNowPlaying.tsx`

Expected routing:

- `AriaPlaylists` action cards call callbacks.
- `AriaPreview` owns sheet state.
- `AriaPreview` renders Create Playlist / Import Playlist sheets.
- `AriaPlaylists` may receive local visible playlists only if needed.
- Do not create a new global design system for this.

## Future Implementation Checklist

## 7F.1-I Implementation Note

7F.1-I implemented this contract in `src/apps/aria/AriaPreview.tsx` and `src/apps/aria/components/AriaPlaylists.tsx`.

Deliberate deviations:

- The source reference image shows folder/export-specific copy, so Create Playlist and Import Playlist use the exact 7F.1 copy defined in this breakdown while preserving the same compact sheet anatomy.
- The color rail is represented as compact color chips plus a swatch instead of a continuous slider, matching the allowed `small color chips` anatomy.

New Folder, Export Playlist and Folder Detail remain outside this implementation and stay governed by 7F.2.

### Create Playlist

- [ ] Create Playlist card opens sheet.
- [ ] Sheet title/subtitle match contract.
- [ ] Name field surface present.
- [ ] Description field surface present.
- [ ] Content/source selection follows reference.
- [ ] Smart mode is available inside the sheet.
- [ ] Tags/mood pills present.
- [ ] Add tag pill present if visually needed.
- [ ] Color preview/rail present.
- [ ] One amber CTA present.
- [ ] No visibility/share/account/device/provider controls.

### Smart Playlist

- [ ] Smart mode lives inside Create Playlist.
- [ ] Same outer sheet structure remains.
- [ ] Middle section becomes rule rows/cards.
- [ ] Match all / Match any exists.
- [ ] Limit exists.
- [ ] Auto update exists.
- [ ] Create Smart Playlist CTA exists.

### Import Playlist

- [ ] Import Playlist card opens sheet.
- [ ] Source/playlist row present.
- [ ] Format chips present.
- [ ] Import options rows present.
- [ ] Destination row present.
- [ ] One amber CTA present.
- [ ] No file picker/input type=file/FileReader/network behavior.

### General

- [ ] New Folder, Export Playlist and Folder Detail untouched.
- [ ] No visible development/prototype language.
- [ ] No unrelated components changed.
- [ ] Product spec, screen map and design guardrails are cited in the implementation prompt.
