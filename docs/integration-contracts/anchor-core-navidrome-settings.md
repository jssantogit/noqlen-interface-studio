# Anchor Core Navidrome Settings Contract

## Scope

This contract describes the future real integration shape for Navidrome settings surfaced by Anchor. The current Noqlen Interface Studio implementation is mock-only and does not call Anchor Core, Navidrome, the filesystem, local ports, network resources or real config files.

Future flow:

`Android App -> Anchor Core API -> NavidromeProvider -> Navidrome process/config -> final music library`

## Studio Boundary

- The Studio renders a visual/mock settings experience only.
- The Studio generates display-only `navidrome.toml` and `ND_` environment previews from local React state.
- The Studio never reads or writes `navidrome.toml`.
- The Studio never reads real paths, logs, secrets, tokens, credentials or environment variables.
- The Studio never starts, stops, restarts, probes or calls Navidrome.
- The Studio never bypasses Anchor Core by writing config files directly.

## Future Real API Concepts

Future real app code should use Anchor Core public API concepts equivalent to:

- `getNavidromeConfig()`
- `validateNavidromeConfigDraft()`
- `previewNavidromeConfigChanges()`
- `applyNavidromeConfigChanges()`
- `restartNavidromeProvider()`

The UI must not call provider internals or a CLI adapter directly.

## Safety Requirements

- Future real operations must use dry-run preview before mutation.
- Apply must be explicit and user-confirmed.
- Apply must validate again before mutation.
- All path fields require Anchor Core path safety validation.
- Secret fields must never be logged, displayed raw, serialized into public output or stored by the UI.
- Log output must be sanitized before app handoff.
- Generated config should support `navidrome.toml`.
- Environment variable mapping should support the `ND_` prefix.
- No direct UI file writes are allowed.
- Settings apply must not automatically restart Navidrome; restart should be a separate explicit lifecycle request.

## Modeled Studio Settings

The Studio catalog models curated settings across Basics, Network, Library Scanner, Artwork & Metadata, Playback & Transcoding, Features, Integrations, Security & Auth, Backup & Monitoring and Advanced.

The catalog is intentionally broader than the current Anchor Core allowlist so the Studio can explore the future configuration experience. Future real implementation must still defer to the Core schema and reject unsupported, restricted or unsafe fields.

## Anchor Core Evidence

Inspected external repository path: `/root/projects/noqlen/_core/noqlen-anchor-core`

Inspected commit: `34777e0a9916fd038de2b91bdeb041634127db85`

Relevant files inspected:

- `README.md`
- `AGENTS.md`
- `docs/safety.md`
- `docs/android-integration.md`
- `anchor/specs/features/safe-navidrome-settings-management/design.md`
- `anchor/specs/features/safe-navidrome-settings-management/requirements.md`
- `src/noqlen_anchor/navidrome_settings.py`
- `src/noqlen_anchor/services/navidrome_settings.py`

Key Core contracts found:

- Apps must consume `noqlen_anchor.api` and must not write `navidrome.toml` directly.
- Settings preview is dry-run and writes nothing.
- Apply requires explicit confirmation and validated workspace containment.
- Editable Core allowlist currently includes `LogLevel`, `Address`, `Port`, `BaseUrl`, `Scanner.Schedule`, `TranscodingCacheSize` and `EnableInsightsCollector`.
- Restricted settings include paths, TLS files, external service secrets, auth/security fields, reverse proxy trust fields and plugin paths.
- Public output must be sanitized and avoid personal paths, credentials, tokens, raw config and raw logs.

## Navidrome Docs Evidence

Docs inspected:

- `https://www.navidrome.org/docs/`
- `https://www.navidrome.org/docs/usage/configuration/`
- `https://www.navidrome.org/docs/usage/configuration/options/`
- `https://www.navidrome.org/docs/installation/linux/`

Configuration facts used:

- Navidrome settings can be loaded from a configuration file, command-line arguments or environment variables.
- Common config file name is `navidrome.toml`.
- Environment variables use the `ND_` prefix and uppercase option names.
- Linux package installs commonly use `/etc/navidrome/navidrome.toml`.
- Key documented options include `MusicFolder`, `DataFolder`, `CacheFolder`, `LogLevel`, `LogFile`, `Address`, `BaseUrl`, `Port`, `EnableInsightsCollector`, scanner options, artwork options, transcoding options, downloads/sharing, integrations, auth/security, backups and Prometheus monitoring.

## Gaps

- The Studio catalog is curated, not full coverage of every Navidrome option.
- The Studio does not perform real validation; it presents safety labels and future Core boundary copy.
- Future real option coverage must be generated or validated against Anchor Core/Navidrome schemas, not copied from this UI alone.
