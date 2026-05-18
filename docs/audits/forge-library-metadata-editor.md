# Forge Library Metadata Editor Audit

**Bloco:** 3.4.5  
**Tool Mode:** combo  
**Date:** 2026-05-18  
**Status:** implemented

## Summary

Implemented a comprehensive, mock-only metadata editor for Forge Library. Artists, albums and tracks now open a full-screen editor with organized tabs, editable fields, mock image pickers and save/apply flows.

## What was implemented

### Components created

- `src/apps/forge/components/ForgeMetadataEditor.tsx`
  - Reusable full-screen editor for Artist, Album and Track entities.
  - Header with back button, entity title, dirty-state indicator ("Unsaved") and Save button.
  - Tab bar per entity type:
    - Track: Overview, Artwork, Lyrics, Metadata, Audio, File info
    - Album: Overview, Artwork, Metadata, Release, Tracks, File info
    - Artist: Overview, Image, Metadata, Albums, Identity
  - Internal sub-components:
    - `EditableField` — label, current value, input, dirty indicator, optional source badge, protected-field warning.
    - `ReadOnlyField` — label and value, no editing.
    - `ForgeImagePickerSheet` — mock gallery + online search tabs.
      - Gallery shows 3 fake local images.
      - Online search shows fake results from Discogs, MusicBrainz Cover Art, Deezer, iTunes with a local-only search input.
    - `ForgeSavePreviewSheet` — lists changed fields with Current → New values and source badges.
  - Nested navigation:
    - Album Tracks tab rows open Track editor.
    - Artist Albums tab rows open Album editor.

### Files updated

- `src/apps/forge/forgeMockData.ts`
  - Extended `MockArtist`, `MockAlbum`, `MockSong` with full metadata fields:
    - Track: albumArtist, trackNumber, trackTotal, discNumber, discTotal, date, originalDate, style, lastFmTags, lyrics, syncedLyrics, sidecarLrc, mbTrackId, mbReleaseTrackId, acoustId, isrc, bpm, key, energy, danceability, replayGain fields, file info (path, format, codec, bitrate, sampleRate, duration).
    - Album: albumArtist, date, originalDate, trackTotal, discTotal, style, lastFmTags, mbAlbumId, mbReleaseGroupId, label, catalogNumber, barcode, releaseCountry, media, releaseFormat, releaseType, edition, coverSize.
    - Artist: sortName, displayName, country, biography, style, lastFmTags, mbArtistId, imageSize.
  - All mock arrays populated with default extended values.

- `src/apps/forge/components/ForgeLibrary.tsx`
  - Added live search filtering by title/artist/album.
  - Added empty search results state.
  - Row taps open the corresponding metadata editor.
  - Issue badge taps open the editor focused on the relevant tab:
    - "Missing lyrics" → Track editor → Lyrics tab
    - "Missing genre" → Track editor → Metadata tab
    - "Cover needs review" → Album editor → Artwork tab
  - Chevron tap behavior is same as row tap (handled by the same button).

- `src/apps/forge/ForgePreview.tsx`
  - Added mutable local copies of `libraryArtists`, `libraryAlbums`, `librarySongs` state.
  - Added metadata editor state: `editorOpen`, `editorType`, `editorEntityId`, `editorInitialTab`.
  - Added `openArtistEditor`, `openAlbumEditor`, `openTrackEditor`, `closeEditor`, `handleSaveEntity` callbacks.
  - `handleSaveEntity` triggers `ForgeProgressSheet` with steps: Preparing changes / Applying mock metadata → completes with toast: "Metadata updated in mock preview".
  - Wired `ForgeLibrary` and `ForgeMetadataEditor` together with nested editor callbacks.

## Editor behavior

### Artist editor
- **Overview:** Artist, Sort Artist, Display Name, Country, Biography/Notes
- **Image:** placeholder artist photo, Choose from gallery, Search online, source badge
- **Metadata:** Genre, Style, Mood, Last.fm Tags
- **Albums:** compact album list; tap opens Album editor
- **Identity:** MusicBrainz Artist ID (protected warning), Provider info, ID Confidence

### Album editor
- **Overview:** Album, Album Artist, Artist, Date, Original Date, Track Total, Disc Total
- **Artwork:** current cover preview, Choose from gallery, Search online, source badge
- **Metadata:** Genre, Style, Mood, Last.fm Tags, MusicBrainz Album ID, MusicBrainz Release Group ID (protected warnings)
- **Release:** Label, Catalog Number, Barcode, Release Country, Media, Release Format, Release Type, Edition
- **Tracks:** compact track list; tap opens Track editor
- **File info:** read-only summary (Album ID, Artist ID, Year, Tracks)

### Track editor
- **Overview:** Title, Artist, Album, Album Artist, Track Number, Track Total, Disc Number, Disc Total, Date, Original Date
- **Artwork:** cover preview, Choose from gallery, Search online, source badge
- **Lyrics:** Lyrics, Synced Lyrics, Sidecar LRC (multiline textareas)
- **Metadata:** Genre, Style, Mood, Last.fm Tags, MusicBrainz Track ID, MusicBrainz Release Track ID, AcoustID ID, ISRC (protected warnings)
- **Audio:** BPM, Key, Energy, Danceability, ReplayGain Track Gain, ReplayGain Track Peak, ReplayGain Album Gain, ReplayGain Album Peak
- **File info:** Path, Format, Codec, Bitrate, Sample Rate, Duration (read-only, no Apply button)

## Save / apply behavior

1. User edits any field → Save button becomes active, "Unsaved" badge appears.
2. Tap Save → `ForgeSavePreviewSheet` opens showing:
   - Changed fields with Current → New values
   - Source badges (Manual for text edits, provider name for image picks)
3. Tap "Apply changes" in preview → `ForgeProgressSheet` opens:
   - Step 1: Preparing changes
   - Step 2: Applying mock metadata
   - Complete: "Metadata updated in mock preview"
4. Parent updates local mutable mock array.
5. Toast: "Metadata updated in mock preview" appears.

### Unsaved changes confirmation
- Back button with unsaved changes triggers `ForgeConfirmDialog`:
  - Title: "Discard changes?"
  - Description: "You have unsaved changes. Discard them and close the editor?"
  - Actions: Discard / Cancel

## Provider / source badges

- Manual text edit → "Manual" (implied, no explicit badge shown on field but used in save preview)
- Gallery image pick → "Gallery mock"
- Online search results → "Discogs", "MusicBrainz Cover Art", "Deezer", "iTunes"
- Protected identity fields → "MusicBrainz", "AcoustID"

## File info read-only

- File info tabs contain only `ReadOnlyField` components.
- No editable inputs, no Apply button, no Save button activation from file info fields.

## Review sync

- **Result:** partial / deferred.
- Library editor updates its own local mutable arrays (`libraryArtists`, `libraryAlbums`, `librarySongs`).
- Review queue data (`forgeAllReviewItems`, etc.) remains separate static data.
- There is no automatic two-way sync between Library edits and Review queue status.
- If a user edits a track genre in Library, the related Review metadata item does not automatically move to "fixed".
- This is documented as deferred to avoid risky shared-state refactoring.
- At minimum, local Library rows update and toast confirms the change.

## Mock-only safety

- No `fetch` / `axios` / `FileReader` / `fs` / `child_process` used in Forge app code.
- Gallery picker is purely visual: shows CSS gradient placeholders with fake filenames.
- Online search is purely local: input filters a static list of 4 fake provider results.
- No real files, metadata, lyrics, artwork, or identity data is accessed or changed.
- All state is local React state inside `ForgePreview`.

## Remaining Library gaps

- Sort/filter sheet for Library (not required for this block).
- Activity interactions (explicitly out of scope).
- Empty library state (not required).
- Loading states for Library (not required).
- Full Review ↔ Library two-way sync (deferred).

## Raw evidence

- TypeScript build: 0 errors.
- Lint: 0 errors.
- Tests: 2 passed.
- Safety grep: no forbidden patterns in Forge app code.
