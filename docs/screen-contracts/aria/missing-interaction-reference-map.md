# Aria Missing Interaction Reference Map

## Purpose

This document maps newly added reference images to missing Aria interactions. It exists because the audit became too optimistic after recent interaction blocks: several controls respond, but the response is still simpler than the visible affordance promises.

The next implementation blocks must follow this map before changing UI. References guide visual structure, hierarchy and flow type, not exact pixel-perfect cloning. Aria must remain app-facing: visible copy must not expose development language or internal implementation boundaries.

## Current problem

Several controls still open only simple feedback or incomplete local behavior. New references were added to define the missing screens and flows before the remaining Aria interaction work continues.

Before implementation, each reference needs an explicit map to its trigger, destination type, likely component ownership and follow-up block. This keeps Playlist, Library, Explore, Radio, Now Playing and Queue work scoped instead of repeating older broad cleanup passes.

## Global rules

- Use bottom sheets for compact actions, forms and selection flows.
- Use detail views only when the interaction represents a full browsing destination.
- Use confirmation panels for destructive actions.
- Keep flows local and reversible.
- Keep visible copy app-like.
- Do not use implementation or development language in visible UI.
- Do not reintroduce Explore/Library overlap.
- Library is organized collection browsing.
- Explore is discovery and rediscovery.
- Do not re-add Albums, Artists, Songs or Playlists as primary Explore cards.
- Explore may still open search or discovery sheets that contain album, artist, track or playlist result rows.
- Radio means user-added internet radio stations, not generated mixes.

## Reference inventory

| Reference image | Main area | Covers | Likely destination type | Implementation block |
|---|---|---|---|---|
| `aria_playlist_new-folder-export-folder-detail_reference.png` | Playlists | New Folder, Export Playlist, Folder Detail | bottom sheets + folder detail view/sheet | 7F.1 or 7F.2 |
| `aria_folder_add-edit-rename_reference.png` | Folders | Add folder, Edit folder, Rename folder | bottom sheet form | 7F.2 |
| `aria_folder_export-delete_reference.png` | Folders | Export folder, Delete folder | action sheet + confirmation | 7F.2 |
| `aria_library_folders_reference.png` | Library | Folders category/list/detail behavior | library sheet or category view | 7F.3 |
| `aria_library_genres-albums-artists_reference.png` | Library | Genres, Albums, Artists category behavior | category views/sheets | 7F.3 |
| `aria_library_radio-songs-playlists_reference.png` | Library / media browsing | Radio, Songs, Playlists category/list behavior | category views/sheets | 7F.3 and 7F.4, depending on Radio split |
| `aria_radio_add-preview-details_reference.png` | Radio | Add radio, radio preview, radio details | radio sheet/detail flow | 7F.4 |
| `aria_nowplaying_add-playlist-playback-info_reference.png` | Now Playing | Add to Playlist, Playback Info | compact option panel / bottom sheet | 7F.5 |
| `aria_queue_save-as-playlist_reference.png` | Queue | Save as Playlist | bottom sheet form | 7F.6 |

## Manual missing interaction matrix

Explore mapping must preserve Bloco 7E.1: Explore root no longer has Albums, Artists, Songs or Playlists cards. If those items still exist as search or discovery result rows/sheets, map them as Explore search/discovery interactions. Do not reintroduce old Explore root tabs. Library owns structural Songs, Albums, Artists, Genres, Folders and Compilations browsing.

| Manual item | Current known status | Reference image | Expected destination | Implementation block | Notes |
|---|---|---|---|---|---|
| Create Playlist | Toast-only action card in `AriaPlaylists` | `aria_playlist_new-folder-export-folder-detail_reference.png` | Bottom sheet creation form | 7F.1 | Trigger: Playlists `Create Playlist` card. Likely changes: `AriaPlaylists.tsx`, sheet state in `AriaPreview.tsx`. Avoid file or account flows. Expected behavior: create a local playlist row or show app-like confirmation. |
| Smart Playlist Expansion | Not represented as a complete flow; only Settings history mentions smart playlists | `aria_playlist_new-folder-export-folder-detail_reference.png` | Create-flow expansion or separate bottom sheet section | 7F.1 | Trigger: Smart option inside playlist creation/import flow. Likely changes: `AriaPlaylists.tsx`, `AriaPreview.tsx`. Avoid generated server mixes or scan rules. Expected behavior: local criteria preview and reversible confirmation. |
| Import Playlist | Toast-only action card in `AriaPlaylists` | `aria_playlist_new-folder-export-folder-detail_reference.png` | Bottom sheet with import source choices | 7F.1 | Trigger: Playlists `Import Playlist` card. Likely changes: `AriaPlaylists.tsx`, `AriaPreview.tsx`. Avoid file pickers, downloads or device access. Expected behavior: choose a local display source and show app-like imported result/confirmation. |
| New Folder | Toast-only action card in `AriaPlaylists` | `aria_playlist_new-folder-export-folder-detail_reference.png`; `aria_folder_add-edit-rename_reference.png` | Bottom sheet form | 7F.2 | Trigger: Playlists `New Folder` card. Likely changes: `AriaPlaylists.tsx`, `AriaPreview.tsx`. Avoid device-folder behavior. Expected behavior: enter name, description, content type, tags/color and locally show/confirm folder. |
| Export Playlist | Toast-only action card and playlist option row | `aria_playlist_new-folder-export-folder-detail_reference.png` | Bottom sheet/action sheet | 7F.2 | Trigger: Playlists `Export Playlist` card and playlist options. Likely changes: `AriaPlaylists.tsx`, `AriaPreview.tsx`. Avoid downloads, share sheets and device writes. Expected behavior: display export choices/status as an app-facing local flow. |
| Folder Detail | Folder rows filter local list and show feedback only | `aria_playlist_new-folder-export-folder-detail_reference.png`; `aria_folder_add-edit-rename_reference.png`; `aria_folder_export-delete_reference.png` | Folder detail view or sheet | 7F.2 | Trigger: Playlists folder rows. Likely changes: `AriaPlaylists.tsx`, `AriaPreview.tsx`. Avoid treating folders as device directories. Expected behavior: open folder contents/actions with add, edit, rename, export and delete confirmation. |
| Explore Genres | Discovery card opens By Genre sheet; still needs reference-backed reconciliation | `aria_library_genres-albums-artists_reference.png` | Explore discovery sheet, not Library category root | 7F.7 | Trigger: Explore `By Genre` card. Likely changes later: `AriaExplore.tsx`, `AriaPreview.tsx`. Avoid moving Library Genres back into Explore root. Expected behavior: genre discovery results may link to albums/tracks without becoming structural Library browsing. |
| Explore Albums | Removed as a primary Explore card; appears only inside search/discovery results | `aria_library_genres-albums-artists_reference.png` | Search/discovery result sheet rows | 7F.7 | Trigger: Explore Search or album discovery rows, not a root card. Likely changes later: `AriaExplore.tsx`, `AriaPreview.tsx`. Avoid re-adding an Albums root card. Expected behavior: discovery rows can open album detail. |
| Explore Artists | Removed as a primary Explore card; appears only inside search/discovery results | `aria_library_genres-albums-artists_reference.png` | Search/discovery result sheet rows | 7F.7 | Trigger: Explore Search result rows, not a root card. Likely changes later: `AriaExplore.tsx`, `AriaPreview.tsx`. Avoid re-adding an Artists root card. Expected behavior: discovery rows can open artist detail. |
| Explore Radio | Radio section opens a basic sheet with station rows | `aria_radio_add-preview-details_reference.png`; `aria_library_radio-songs-playlists_reference.png` | Radio sheet/detail flow | 7F.4 | Trigger: Explore Radio `Browse`, plus button and station rows. Likely changes: `AriaExplore.tsx`, `AriaPreview.tsx`. Avoid generated mix language. Expected behavior: user-added station list, add radio form, preview/details. |
| Explore Songs | Removed as a primary Explore card; appears only inside search/discovery results | `aria_library_radio-songs-playlists_reference.png` | Search/discovery result sheet rows | 7F.7 | Trigger: Explore Search track results, not a root card. Likely changes later: `AriaExplore.tsx`, `AriaPreview.tsx`. Avoid re-adding a Songs root card. Expected behavior: result rows open track detail or select local playback according to row-tap rules. |
| Explore Playlists | Removed as a primary Explore card; appears only inside search/discovery results | `aria_library_radio-songs-playlists_reference.png` | Search/discovery result sheet rows | 7F.7 | Trigger: Explore Search playlist results, not a root card. Likely changes later: `AriaExplore.tsx`, `AriaPreview.tsx`. Avoid re-adding a Playlists root card. Expected behavior: result rows open playlist detail. |
| Library Songs | Dedicated Songs view exists | `aria_library_radio-songs-playlists_reference.png` | Dedicated category view | 7F.3 | Trigger: Library `Songs` row. Likely changes: `AriaLibrary.tsx`, `AriaLibrarySongsView.tsx`, `AriaPreview.tsx`. Avoid generic category templates. Expected behavior: useful song list with app-like row actions. |
| Library Albums | Dedicated Albums view exists | `aria_library_genres-albums-artists_reference.png` | Dedicated category view | 7F.3 | Trigger: Library `Albums` row. Likely changes: `AriaLibrary.tsx`, `AriaLibraryAlbumsView.tsx`, `AriaPreview.tsx`. Avoid opening only a representative album from the category row. Expected behavior: browse albums, then open album detail. |
| Library Artists | Dedicated Artists view exists | `aria_library_genres-albums-artists_reference.png` | Dedicated category view | 7F.3 | Trigger: Library `Artists` row. Likely changes: `AriaLibrary.tsx`, `AriaLibraryArtistsView.tsx`, `AriaPreview.tsx`. Avoid opening only a representative artist from the category row. Expected behavior: browse artists, then open artist detail. |
| Library Genres | Lightweight sheet exists | `aria_library_genres-albums-artists_reference.png` | Category sheet or compact category view | 7F.3 | Trigger: Library `Genres` row. Likely changes: `AriaLibrary.tsx`, `AriaPreview.tsx`. Avoid Explore category overlap. Expected behavior: useful genre browsing with local results, not only feedback chips. |
| Library Folders | Lightweight sheet exists with folder rows | `aria_library_folders_reference.png` | Category sheet/view with folder details | 7F.3 | Trigger: Library `Folders` row. Likely changes: `AriaLibrary.tsx`, `AriaPreview.tsx`. Avoid device-folder browsing. Expected behavior: app-library folders with detail/action flow. |
| Library Compilations | Lightweight sheet exists | `aria_library_radio-songs-playlists_reference.png` | Category sheet or compact category view | 7F.3 | Trigger: Library `Compilations` row. Likely changes: `AriaLibrary.tsx`, `AriaPreview.tsx`. Avoid generic placeholder rows. Expected behavior: useful compilation collection browsing. |
| Now Playing Add to Playlist | Compact options panel item shows toast only | `aria_nowplaying_add-playlist-playback-info_reference.png` | Playlist selection bottom sheet | 7F.5 | Trigger: Now Playing `More player options` > `Add to playlist`. Likely changes: `AriaNowPlaying.tsx`, `AriaPreview.tsx`. Avoid persistence claims. Expected behavior: choose playlist and locally confirm. |
| Now Playing Playback Info | Compact options panel item shows basic toast only | `aria_nowplaying_add-playlist-playback-info_reference.png` | App-like info panel/bottom sheet | 7F.5 | Trigger: Now Playing `More player options` > `Playback info`. Likely changes: `AriaNowPlaying.tsx`, `AriaPreview.tsx`. Avoid implementation limitation copy. Expected behavior: show format, sample rate, source, output and queue position. |
| Save as Playlist | Queue action shows toast only | `aria_queue_save-as-playlist_reference.png` | Bottom sheet form | 7F.6 | Trigger: Queue `Save as playlist` action. Likely changes: `AriaQueue.tsx`, `AriaPreview.tsx`. Avoid downloads or persistence claims. Expected behavior: enter playlist name, choose include-current/upcoming behavior and locally confirm/update visible UI state. |

## Proposed implementation blocks

### Bloco 7F.1 — Playlist create/import/smart flows

Covers:

- Create Playlist
- Smart Playlist Expansion
- Import Playlist

Expected:

- Create Playlist opens app-like bottom sheet form.
- Smart Playlist is either part of create flow or a separate expansion.
- Import Playlist opens import source choices.
- No file picker or real file access.

References:

- `aria_playlist_new-folder-export-folder-detail_reference.png`

### Bloco 7F.2 — Playlist folders/export/detail flows

Covers:

- New Folder
- Export Playlist
- Folder Detail
- Folder add/edit/rename
- Folder export/delete

Expected:

- New Folder opens form.
- Folder row opens detail/sheet, not just filter + toast.
- Folder detail exposes edit/rename/export/delete.
- Delete uses confirmation.

References:

- `aria_playlist_new-folder-export-folder-detail_reference.png`
- `aria_folder_add-edit-rename_reference.png`
- `aria_folder_export-delete_reference.png`

### Bloco 7F.3 — Library category flows

Covers:

- Songs
- Albums
- Artists
- Genres
- Folders
- Compilations

Expected:

- Every Library category opens a useful list/view/sheet.
- No category row should only show feedback.
- Songs, Albums, Artists can use existing full views if available.
- Genres/Folders/Compilations need useful sheets or category views.
- Library remains structural browsing.

References:

- `aria_library_folders_reference.png`
- `aria_library_genres-albums-artists_reference.png`
- `aria_library_radio-songs-playlists_reference.png`

### Bloco 7F.4 — Radio flows

Covers:

- Radio
- Add Radio
- Radio Preview
- Radio Details

Expected:

- Radio represents user-added internet radio.
- Add Radio opens form.
- Radio station row opens preview/details.
- Radio should not be automatic generated mix.

References:

- `aria_radio_add-preview-details_reference.png`
- `aria_library_radio-songs-playlists_reference.png`

### Bloco 7F.5 — Now Playing extra actions

Covers:

- Add to Playlist
- Playback Info

Expected:

- Add to Playlist opens playlist selection sheet.
- Playback Info opens app-like info panel.
- Playback Info includes format, sample rate, source, output and queue position.
- Do not mention implementation limitations.

References:

- `aria_nowplaying_add-playlist-playback-info_reference.png`

### Bloco 7F.6 — Queue save as playlist

Covers:

- Save as Playlist

Expected:

- Queue `Save as playlist` opens form.
- User can enter playlist name.
- Can include current track or upcoming queue.
- Save action updates local UI state or gives app-like confirmation.

References:

- `aria_queue_save-as-playlist_reference.png`

### Bloco 7F.7 — Final no-dead-control sweep

Expected:

- Re-run manual and browser audit.
- Compare against this reference map.
- Only then mark no-dead-control sweep complete.

## Audit correction

The audit summary after 7E.1 is not enough. Manual review found remaining incomplete controls, and new reference images now back those TODOs.

Do not treat toast-only controls as complete when the visual affordance implies a screen or flow. Update audit status to reflect these missing interactions as TODO/reference-backed until the relevant 7F implementation block completes.

## Acceptance criteria for future implementation

- A button that visually promises creation must open a creation flow.
- A button that visually promises import/export must open a relevant sheet.
- A category row must open a useful list, view, or detail destination.
- A More button must open actions, not only feedback.
- Destructive actions need confirmation.
- Library and Explore roles must stay separated.
- No visible development/prototype language.
