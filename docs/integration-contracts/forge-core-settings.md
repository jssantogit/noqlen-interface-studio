# Forge Core Settings Integration Contract

This document maps Forge Settings UI controls to Forge Core configuration sections.

## Mapping Philosophy

Forge Settings translates Forge Core TOML configuration into app-oriented controls. Not every config key has a UI equivalent, and not every UI setting maps 1:1 to a config key. The mapping documents the closest Core equivalent when known.

## Metadata Providers

| App Setting | Forge Core Section | Key | Notes |
|---|---|---|---|
| Enable metadata providers | `metadata_providers` | `enabled` | Global provider switch |
| Max active providers | `metadata_providers` | `max_active` | Does not count identifier providers |
| Allow more providers | `metadata_providers` | `allow_more_providers` | Advanced |
| MusicBrainz enabled | `metadata_providers.musicbrainz` | `enabled` | Role: identity authority |
| Discogs enabled | `metadata_providers.discogs` | `enabled` | Role: catalog enrichment |
| AcoustID enabled | `metadata_providers.acoustid` | `enabled` | Role: identifier |
| Deezer enabled | `metadata_providers.deezer` | `enabled` | Role: fallback |
| iTunes enabled | `metadata_providers.itunes` | `enabled` | Role: fallback |

Provider-specific field toggles (e.g., Discogs `use_for_genre`, `use_for_style`) are shown in the provider detail sheet but are not exposed as top-level settings rows.

## API Credentials

| App Credential | Forge Core Section | Key | Environment Variable |
|---|---|---|---|
| Last.fm API key | `apis` | `lastfm_api_key` | `LASTFM_API_KEY` |
| Discogs token | `apis` | `discogs_token` | `DISCOGS_TOKEN` |
| AcoustID API key | `apis` | `acoustid_api_key` | `ACOUSTID_KEY` / `ACOUSTID_API_KEY` |
| Deezer API key | `apis` | `deezer_api_key` | — |
| Spotify client ID | `apis` | `spotify_client_id` | — |
| Spotify client secret | `apis` | `spotify_client_secret` | — |
| Genius access token | `apis` | `genius_access_token` | — |
| Musixmatch API key | `apis` | `musixmatch_api_key` | — |
| AudD API key | `apis` | `audd_api_key` | — |

**Rules:**
- Secrets are never logged.
- Environment variables are preferred over config file values in Core.
- The app UI stores credentials in local React state only (mock preview).
- No real secret storage, clipboard access, or file write occurs.

## Tags & Metadata

| App Setting | Forge Core Section | Key | Notes |
|---|---|---|---|
| Prefer original date | `metadata` | `prefer_original_date` | — |
| Clean bad fields | `metadata` | `clean_bad_fields` | — |
| Write MusicBrainz IDs | `metadata` | `write_mbids` | — |
| Protect identity fields | `sync` | `protect_identity_fields` | Also safety behavior |
| Conflict policy | `sync` | `conflict_policy` | review / skip / prefer_current / prefer_provider |
| Minimum confidence | `metadata_providers` | `min_confidence` | low / medium / high |
| Multi-value separator | `rewrite.multi_value` | `separator` | ; / / , |
| Trim values | `rewrite.multi_value` | `trim_values` | — |
| Deduplicate values | `rewrite.multi_value` | `dedupe_values` | — |
| Normalize case | `rewrite` | `case_sensitive` | Inverted in UI |
| Review low-confidence | — | — | App behavior rule |
| Review existing mismatch | — | — | App behavior rule |

### Rewrite Rules

Rewrite rules map to `rewrite.genre`, `rewrite.style`, `rewrite.label`, `rewrite.artist`, `rewrite.albumartist` in Forge Core.

App UI stores rules as an array and would convert to TOML table keys if ever serialized.

## Artwork

| App Setting | Forge Core Section | Key | Notes |
|---|---|---|---|
| Enable artwork fixes | `cover` | `enabled` | — |
| Embed artwork | `cover` | `embed` | Write into tags |
| Save folder cover | `cover` | `save_folder_cover` | Sidecar file |
| Folder cover filename | `cover` | `filename` | Default: `cover` |
| Minimum confidence | `cover` | `min_confidence` | low / medium / high |
| Prefer front cover | `cover` | `prefer_front` | — |
| Max image size | `cover` | `max_size_mb` | In megabytes |

### Cover Sources

Forge Core default source order: `local`, `musicbrainz`, `itunes`, `deezer`.
The app UI shows source toggles but source priority reordering is simplified in this preview.

## Lyrics

| App Setting | Forge Core Section | Key | Notes |
|---|---|---|---|
| Enable lyrics fixes | `lyrics` | `enabled` | — |
| Prefer synced lyrics | `lyrics` | `prefer_synced` | — |
| Allow unsynced fallback | `lyrics` | `allow_unsynced` | — |
| Prefer local lyrics | `lyrics` | `prefer_local` | — |
| Preserve existing lyrics | `lyrics` | `prefer_existing` | — |
| Embed lyrics | `lyrics` | `embed_lyrics` | Write into tags |
| Save sidecar .lrc | `lyrics` | `save_lrc` | Also `write_sidecar_lrc` |
| Save .txt | `lyrics` | `save_txt` | — |
| Cache lyrics lookups | `lyrics` | `cache_enabled` | — |
| Review conflicts | `lyrics` | `review_on_conflict` | — |
| Review existing mismatches | `lyrics` | `review_on_existing_mismatch` | — |
| Allow instrumental | `lyrics` | `allow_instrumental` | — |
| Custom lyrics endpoint | `lyrics.provider_settings.custom_http` | `enabled` | Advanced |
| Custom endpoint URL | `lyrics.provider_settings.custom_http` | `base_url` | Advanced |
| Custom endpoint API key env | `lyrics.provider_settings.custom_http` | `api_key_env` | `NOQLEN_FORGE_LYRICS_API_KEY` |

## Audio

| App Setting | Forge Core Section | Key | Notes |
|---|---|---|---|
| Enable ReplayGain | `audio` | `replaygain_enabled` | — |
| ReplayGain backend | `audio` | `replaygain_backend` | ffmpeg / portable |
| Target LUFS | `audio` | `target_lufs` | Default -18.0 |
| Write track gain | `audio` | `write_track_gain` | — |
| Write track peak | `audio` | `write_track_peak` | — |
| Write album gain | `audio` | `write_album_gain` | — |
| Write album peak | `audio` | `write_album_peak` | — |
| Write loudness | `audio` | `write_loudness` | — |
| Skip existing values | `audio` | `skip_existing` | — |
| Key detection mode | `audio.key_detection` | `backend` | disabled / auto / portable_basic |
| Minimum key confidence | `audio.key_detection` | `min_confidence` | low / medium / high |
| Write low-confidence key | `audio.key_detection` | `write_low_confidence` | Caution |
| Max analysis seconds | `audio.key_detection.portable_basic` | `max_seconds` | Default 90 |
| Analysis segments | `audio.key_detection.portable_basic` | `segments` | Default 6 |
| Analysis timeout | `audio.key_detection.portable_basic` | `timeout_seconds` | Default 30 |

## Safety & Review

| App Setting | Forge Core Section | Key | Notes |
|---|---|---|---|
| Dry-run first mode | — | — | App behavior / CLI default |
| Require confirmation | — | — | App UX rule |
| Send conflicts to review | `sync` | `conflict_policy` | When set to `review` |
| Never overwrite lyrics | `lyrics` | `overwrite_existing` | Inverted in UI |
| Never replace artwork | — | — | App UX rule |
| Hide advanced metadata | `audit` | `show_advanced_fields` | Inverted in UI |
| Show catalog fields | `audit` | `show_catalog_fields` | — |
| Show advanced fields | `audit` | `show_advanced_fields` | — |
| Track provider history | `database` | `track_provider_history` | — |
| Track tag sync | `database` | `track_tag_sync` | — |
| Job history days | `jobs` | `history_days` | Default 30 |
| Prune completed jobs | `jobs` | `prune_completed` | Mock-only in preview |
| Auto-apply safe fixes | — | — | App behavior rule |
| Conflict behavior | `sync` / `organize` | `conflict_policy` | review / prefer_current / prefer_provider / skip |

## Advanced

| App Setting | Forge Core Section | Key | Notes |
|---|---|---|---|
| Database auto-scan | `database` | `auto_scan` | — |
| Include cover in full enrich | `enrich` | `full_includes_cover` | — |
| Include lyrics in full enrich | `enrich` | `full_includes_lyrics` | — |
| Include Last.fm | `enrich` | `full_includes_lastfm` | — |
| Include mood | `enrich` | `full_includes_mood` | — |
| Include BPM | `enrich` | `full_includes_bpm` | — |
| Include features | `enrich` | `full_includes_features` | — |
| Include AcoustID | `enrich` | `full_includes_acoustid` | — |
| Include ReplayGain | `enrich` | `full_includes_replaygain` | — |
| Verbose output | `output` | `verbose` | Mock-only in preview |
| Debug output | `output` | `debug` | Mock-only in preview |

## App Update Mock Behavior

App Updates are fully mock-only. No real network call is made. The flow is:

1. **Check for updates** → deterministic mock progress → compares `updateChannel`:
   - `stable` → returns "up to date"
   - `beta` / `nightly` → returns "update available" with mock version `0.1.1`
2. **Download update** → mock progress → state becomes `ready`
3. **Install / Restart** → mock progress → state resets to `idle`
4. Copy: "Studio preview only. No update was downloaded or installed."

## Future Real App Rules

When Forge moves from mock preview to a real app integration:

1. **Secrets never logged** — Continue to avoid logging API keys, tokens, and secrets.
2. **Environment variables preferred** — Follow Forge Core's precedence: env vars override config values.
3. **Dry-run before apply** — All write-capable workflows must default to dry-run; explicit confirmation required.
4. **No direct write without explicit confirmation** — Protected identity fields and destructive actions require user confirmation.
5. **Provider tests must be safe** — Provider test actions should verify connectivity without writing data or exposing secrets.
6. **Update system must verify package/signature** — Before any real install, verify package integrity and optionally signature.
