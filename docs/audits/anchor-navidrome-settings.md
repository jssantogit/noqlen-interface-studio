# Anchor Navidrome Settings Audit

## Block

- Block: Bloco 2.6 — Anchor Navidrome Settings.
- Tool Mode: combo-bootstrap.
- Commit target: `feat(anchor): add navidrome configuration mock settings`.

## Research Evidence

Anchor Core repo inspected:

- Path: `/root/projects/noqlen/_core/noqlen-anchor-core`
- Commit: `34777e0a9916fd038de2b91bdeb041634127db85`

Anchor Core files inspected:

- `README.md`
- `AGENTS.md`
- `docs/safety.md`
- `docs/android-integration.md`
- `anchor/specs/features/safe-navidrome-settings-management/design.md`
- `anchor/specs/features/safe-navidrome-settings-management/requirements.md`
- `src/noqlen_anchor/navidrome_settings.py`
- `src/noqlen_anchor/services/navidrome_settings.py`

Useful contracts found:

- Future apps must use public Anchor Core APIs, not CLI/provider internals.
- Apps must not write `navidrome.toml` directly.
- Preview is dry-run and writes nothing.
- Apply requires explicit confirmation and validation.
- Path handling must use containment/safety validation.
- Logs and public output must be sanitized.
- Secrets, tokens and credentials must not leak.
- Current Core safe settings allowlist is narrower than this Studio exploration catalog.

Navidrome docs inspected:

- `https://www.navidrome.org/docs/`
- `https://www.navidrome.org/docs/usage/configuration/`
- `https://www.navidrome.org/docs/usage/configuration/options/`
- `https://www.navidrome.org/docs/installation/linux/`

Navidrome facts used:

- Config can be set by file, command-line args and environment variables.
- `navidrome.toml` is the common config file.
- Environment variables use `ND_` prefix.
- Linux package/manual setup documents `/etc/navidrome/navidrome.toml`.
- Options modeled include basics, network, scanner, artwork, playback/transcoding, features, integrations, auth/security, backups and monitoring.

## Settings Categories Implemented

- Basics.
- Network.
- Library Scanner.
- Artwork & Metadata.
- Playback & Transcoding.
- Features.
- Integrations.
- Security & Auth.
- Backup & Monitoring.
- Advanced.

## Options Modeled

Modeled curated settings include:

- `MusicFolder`, `DataFolder`, `CacheFolder`, `LogLevel`, `EnableInsightsCollector`.
- `Address`, `Port`, `BaseUrl`, `ShareURL`, `TLSCert`, `TLSKey`, `UnixSocketPerm`.
- `Scanner.Enabled`, `Scanner.Schedule`, `Scanner.ScanOnStartup`, `Scanner.WatcherWait`, `Scanner.FollowSymlinks`, `Scanner.PurgeMissing`, `Scanner.ArtistJoiner`, `PlaylistsPath`.
- `CoverArtPriority`, `ArtistArtPriority`, `ArtistImageFolder`, `CoverArtQuality`, `EnableArtworkPrecache`, `EnableArtworkUpload`, `LyricsPriority`, `PreferSortTags`, `RecentlyAddedByModTime`.
- `FFmpegPath`, `TranscodingCacheSize`, `DefaultDownsamplingFormat`, `EnableTranscodingConfig`, `EnableTranscodingCancellation`, `DefaultUIVolume`, `EnableReplayGain`, `EnableCoverAnimation`.
- `EnableDownloads`, `EnableSharing`, `EnableFavourites`, `EnableStarRating`, `EnableNowPlaying`, `EnableScrobbleHistory`, `DefaultPlaylistPublicVisibility`, `DefaultDownloadableShare`, `DefaultShareExpiration`.
- `Agents`, `LastFM.Enabled`, `LastFM.ApiKey`, `LastFM.Secret`, `LastFM.Language`, `ListenBrainz.Enabled`, `ListenBrainz.BaseURL`, `Deezer.Enabled`, `Deezer.Language`, `EnableExternalServices`, `EnableGravatar`.
- `AuthRequestLimit`, `AuthWindowLength`, `SessionTimeout`, `EnableLogRedacting`, `PasswordEncryptionKey`, `ExtAuth.TrustedSources`, `ExtAuth.UserHeader`, `ExtAuth.LogoutURL`, `Subsonic.DefaultReportRealPath`.
- `Backup.Path`, `Backup.Schedule`, `Backup.Count`, `Prometheus.Enabled`, `Prometheus.MetricsPath`, `Prometheus.Password`.

## Options Deferred

- Full exhaustive Navidrome option coverage.
- Plugins, jukebox, custom tags, persistent IDs, all HTTP headers, all search/inspect options and every Subsonic compatibility option as full first-class category rows.
- Real schema validation against Anchor Core.
- Real config read/write, backup listing, restore and lifecycle restart.

## Mock-Only Safety Result

- The UI stores only local React state.
- Generated TOML/env output is display-only.
- Secret-like fields are masked.
- Risky settings render inline warnings.
- There are no app fetch/axios calls, no filesystem APIs, no `FileReader`, no backend, no Anchor Core call and no Navidrome call.

## Known Gaps

- The catalog is curated manually and should be replaced or cross-checked by a future real Core schema.
- The Studio uses placeholder path strings to explain safety; they are static display copy only.
- Activity interactions remain unimplemented by request and are next-block work.

## Raw Evidence Summary

Commands and validation evidence are captured in the implementation handoff for this block, including repo state, lint/build/test output, safety grep, browser validation, overflow checks, repo hygiene and final git status.
