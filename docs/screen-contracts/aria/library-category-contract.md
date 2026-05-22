# Aria Library Category Contract

Aria Library categories must feel like music-library browsing surfaces, not settings pages, admin lists or a file manager. Each category needs a treatment that matches its content type; do not force every Library destination into the same page model.

## Category Treatments

### Songs

- Use a dense track index/list.
- Do not use generic card lists as the primary treatment.
- Row density matters: this should feel scannable and music-player-native.
- Rows should show title, artist/album and duration.
- A small index or small artwork thumbnail is optional.
- Row tap may continue opening Track Details until playback row semantics are finalized in Bloco 7E.

### Albums

- Use an album shelf/grid or strong artwork-led view.
- Album art is primary.
- Title, artist, year and format are secondary.
- Do not make Albums look like Settings rows.

### Artists

- Use a compact artist index.
- Name is primary.
- Genre, location and release count are secondary.
- Do not make Artists look like an admin list.

### Genres

- Keep Genres lightweight unless a later reference justifies a full page.
- Use categorical chips/cards rather than a heavy generic list.
- A sheet or compact category view is acceptable.

### Folders

- Keep Folders low-emphasis and explicitly mock-only.
- Do not make Folders look like a real file manager.
- Do not imply filesystem access, scanning, opening files or real folder paths.
- A sheet or compact page is acceptable only if visually restrained.

### Compilations

- Treat Compilations as collections/shelves when promoted beyond a sheet.
- This category is not high priority.
- Avoid generic settings-style rows.

### Recently Added

- Treat Recently Added as a recent feed/shelf.
- It may mix albums, playlists and tracks.
- It should feel like music activity, not a generic list.

## Page Versus Sheet Decisions

Recommended destinations for the next implementation block:

- Songs: page/view.
- Albums: page/view.
- Artists: page/view.
- Recently Added: page/view or expanded shelf.
- Genres: sheet or lightweight view.
- Folders: sheet or low-emphasis view.
- Compilations: page/view only if designed as collections; otherwise sheet/list.

Do not force every category into a full page. Do not force every category into a sheet. Choose the smallest treatment that preserves a clear visual identity.

## Sheet Usage

Sheets are appropriate for:

- quick actions;
- contextual menus;
- selectors;
- temporary auxiliary flows;
- search preview;
- settings/source until redesigned.

Sheets are not appropriate for:

- major Library browsing sections that need their own visual identity;
- replacing Songs, Albums, Artists or a strong Recently Added feed with generic rows;
- hiding a missing category design behind a temporary list.

## 7D.1I Implementation Constraints

- Bloco 7D.1I-A restores safe lightweight category sheets/behavior and removes the failed generic category-page route. This is recovery/stabilization, not the final Library redesign.
- Bloco 7D.1I-B must implement final category treatments without one generic page template.
- Implement only category treatments approved by this contract.
- Do not create one generic page component for every Library category.
- Preserve the current Aria visual identity: large serif titles, warm amber controls, dark music-player surfaces, artwork-first content where appropriate and calm row density.
- Keep all behavior local-state-only and mock-only.
- Make the change reversible: limit scope, keep data static and avoid broad refactors.
- Update docs and commit/push the implementation separately.
- Do not touch playback overlays, Anchor, Forge, Flux, Studio shell or phone simulator files.
