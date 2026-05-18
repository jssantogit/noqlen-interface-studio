# Forge Settings — Metadata Providers, Tags & Updates Audit

## Forge Core Inspection

- **Repo path inspected:** `/tmp/noqlen-forge-core`
- **Commit hash inspected:** `27953ef docs(dev): record final Forge Core readiness audit`
- **Files/docs inspected:**
  - `README.md`
  - `config.example.toml`
  - `noqlen_forge/config.py`
  - `noqlen_forge/fields.py`
  - `noqlen_forge/metadata_providers.py`
  - `noqlen_forge/cover.py`
  - `docs/usage/configuration-guide.md`
  - `docs/usage/manual-real-library-checklist.md`
  - `docs/reference/cli-reference.md`
  - `docs_site/docs/forge/reference/configuration.md`
  - `docs/release/public-surface-audit.md`

## Settings Implemented

### 1. Metadata Providers
- Provider cards: MusicBrainz, Discogs, AcoustID, Deezer, iTunes, Last.fm, LRCLIB, Genius, Musixmatch, AudD
- Enable/disable toggles per provider
- Role badges (identity, catalog, identifier, fallback, community enrichment, lyrics, advanced)
- Fields contributed per provider
- Credential status indicators
- Configure action (opens detail sheet)
- Test mock provider action with progress flow

### 2. API Keys (inside Metadata Providers quick access)
- Last.fm API key
- Discogs token
- AcoustID API key
- Deezer API key
- Spotify client ID / client secret
- Genius access token
- Musixmatch API key
- AudD API key
- All fields masked
- Mock-only: no real storage, no console logging

### 3. Tags & Metadata
- Prefer original date
- Clean bad fields
- Write MBIDs
- Protect identity fields
- Conflict policy (review/skip/prefer current/prefer provider)
- Minimum confidence (low/medium/high)
- Multi-value separator (semicolon/slash/comma)
- Trim values
- Deduplicate values
- Case normalization
- Review low-confidence matches
- Review existing mismatch
- Rewrite rules: editable cards for genre/style/label/artist/albumartist
  - Pre-seeded: kpop → K-pop, Prog Metal → Progressive Metal, technical death → Technical Death Metal
  - Add/delete/edit rules

### 4. Artwork
- Enable artwork fixes
- Embed artwork into tags
- Save folder cover file
- Folder cover filename
- Minimum confidence
- Prefer front cover
- Max image size

### 5. Lyrics
- Enable lyrics fixes
- Prefer synced lyrics
- Allow unsynced fallback
- Prefer local lyrics
- Preserve existing lyrics
- Embed lyrics
- Save sidecar .lrc
- Save .txt
- Cache lyrics lookups
- Review conflicts
- Review existing mismatches
- Allow instrumental results
- Custom lyrics endpoint (advanced)

### 6. Audio
- Enable ReplayGain
- Backend (ffmpeg / mock)
- Target LUFS
- Write track/album gain/peak
- Write loudness
- Skip existing values
- Key detection mode (disabled/auto/portable basic)
- Minimum key confidence
- Never write low-confidence key
- Advanced limits: max seconds, segments, timeout

### 7. Safety & Review
- Dry-run first mode
- Require confirmation
- Send conflicts to review
- Never overwrite lyrics without review
- Never replace valid artwork without comparison
- Hide advanced metadata by default
- Show catalog/advanced fields
- Track provider history
- Track tag sync
- Job history days
- Prune completed jobs (mock-only)
- Auto-apply safe fixes (off/ask/empty only)
- Conflict behavior (review/prefer current/prefer provider/skip)

### 8. App Updates
- Current version display (0.1.0 mock)
- Core compatibility display
- Last checked date
- Update channel (stable/beta/nightly)
- Check for updates with mock progress
- Update available state with release notes
- Download update mock
- Install update mock
- Restart app mock
- Copy: "Studio preview only. No update was downloaded or installed."

### 9. Advanced
- Database auto-scan
- Enrich presets (cover, lyrics, lastfm, mood, bpm, features, acoustid, replaygain)
- Output verbosity/debug (mock-only)

## Settings Intentionally Omitted

- **Library paths/root/incoming/template** — Not app-oriented; library path is a server/CLI concern.
- **Organize/import templates** — File-system operations are not suitable for a mobile settings UI.
- **Navidrome integration** — Server management belongs to Anchor, not Forge settings.
- **Real config file read/write** — Forge is mock-only; no `config.toml` access.
- **Real credential storage/persistence** — All credentials are local React state only.
- **Real network calls for provider tests** — All provider tests are local mock progress.
- **Real update checks/downloads** — App updates are fully mock-only.
- **Database path / SQLite path** — Not relevant to a preview app.
- **Tools paths (fpcalc)** — Local tool paths are CLI/server concerns.
- **Playlist/smart playlist config** — No global playlist config section exists in Forge Core yet.

## Reasons for Omissions

The goal is to translate Forge Core configuration into *useful mobile app settings*, not a terminal config dump. Path-based, filesystem-based, server-integration, and tool-path settings are excluded because they are CLI/server concerns that do not map naturally to a mobile app settings surface. The app remains mock-only, so real credential persistence, real network calls, and real config writes are all forbidden by design.

## Mock-Only Safety Result

- ✅ No real metadata edits
- ✅ No real file access
- ✅ No real network calls
- ✅ No real credential storage
- ✅ No real config writes
- ✅ No fetch/axios/FileReader/fs/child_process
- ✅ All provider tests are local mock progress
- ✅ All update flows are local mock progress

## Update Flow Result

- Check for updates → mock progress → up-to-date or update-available state
- Download update → mock progress → ready state
- Install/restart → mock progress → idle state
- Copy clearly states: "Studio preview only. No update was downloaded or installed."

## Remaining Gaps

- Source priority reordering for artwork is not yet implemented (toggle/enable only)
- Some advanced settings (e.g., custom HTTP lyrics endpoint URL input) are present but simplified
- Full "Mock state controls" for Studio QA empty/loading/error states are deferred to Forge State Coverage

## Raw Evidence Summary

- Forge Core commit `27953ef` confirms provider roles, config sections, and safety model.
- `config.example.toml` shows all mapped sections: `metadata_providers`, `metadata`, `cover`, `lyrics`, `audio`, `sync`, `rewrite`, `jobs`, `database`, `enrich`, `output`.
- `metadata_providers.py` confirms provider classes and field authority mappings.
- `fields.py` confirms field categories, protected fields, and scope.
- `cover.py` confirms cover sources, embed behavior, and folder cover logic.
- All app behavior stays within `src/apps/forge/components/ForgeSettingsSheet.tsx` and `src/apps/forge/forgeSettingsCatalog.ts`.
