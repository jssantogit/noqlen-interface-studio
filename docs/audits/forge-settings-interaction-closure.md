# Forge Settings — Interaction Closure Audit

## Tool Mode

`combo` — Browser MCP for validation, code edits for implementation, bash for build/test.

## Settings Surfaces Audited

1. **Settings entry points** — Home settings gear, Forge nav.
2. **Main Settings navigation** — category list (9 categories), back/close, save, reset, unsaved changes warning.
3. **Metadata Providers** — 10 provider cards, enable toggles, configure buttons, test buttons, fields chips, credential status indicators.
4. **API Keys** — 7 provider credential rows, secret fields (password type), show/hide toggle, clear button, test button, save credentials, reset credentials.
5. **Tags & Metadata** — confidence select, conflict policy select, identity protection toggle, trim/deduplicate toggles, multi-value separator select, rewrite rules (add/edit/delete), save/reset.
6. **Artwork** — enable fixes, embed, folder cover, filename input, min confidence, prefer front, max size.
7. **Lyrics** — enable fixes, prefer synced, allow unsynced, prefer local, preserve existing, embed, save LRC/TXT, cache, review conflicts, custom endpoint URL.
8. **Audio** — ReplayGain toggle, backend select, target LUFS input, track/album gain/peak toggles, key detection select, min confidence, advanced limits.
9. **Safety & Review** — dry-run first, require confirmation, conflict behavior, auto-apply safe fixes, protect identity fields, never overwrite lyrics, never replace artwork, hide/show advanced metadata, track provider/tag sync, job history, prune jobs.
10. **App Updates** — update channel select (stable/beta/nightly), check for updates, update available card, download mock, install mock, restart mock, retry/failure state, expandable release notes.
11. **Advanced** — auto-scan toggle, verbose/debug output toggles, enrich presets section with disabled/deferred controls.

## Interaction Gaps Found and Fixed

### 1. API Keys was a dead quick card
**Gap:** The "API Keys" entry on the main settings screen was a quick card that navigated to "Metadata Providers" instead of a dedicated panel. There was no place to manage credentials.
**Fix:** Added "API Keys" as a real category in `categoryOrder`. Created `ApiKeysPanel` with credential inputs per provider, show/hide, clear, test, save and reset actions.

### 2. Provider test steps were generic
**Gap:** Every provider test used the same two steps: "Preparing mock request" / "Simulating provider response".
**Fix:** Added `providerTestSteps` map with provider-specific mock steps:
- MusicBrainz: Preparing mock lookup → Checking identity rules → Mock provider reachable
- Discogs: Checking masked token → Testing catalog enrichment → Mock provider ready
- Last.fm: Checking tag source → Mock tags available
- AcoustID: Checking identifier settings → Fingerprint test skipped in Studio mock
- etc.

### 3. Secret input corrupted values
**Gap:** The `Control` component used `maskSecret()` to compute the `value` prop of password inputs. Because the masked characters became the actual input value, subsequent typing built on corrupted text.
**Fix:** For `type="password"` inputs, pass the raw `String(value)` directly; the browser handles masking natively.

### 4. No clear button for secret fields
**Gap:** Secret fields had show/hide but no clear.
**Fix:** Added an `X` clear button next to secret inputs that appears when the field has a value.

### 5. Save always showed progress even with no changes
**Gap:** `handleSave` always opened `ForgeProgressSheet` regardless of whether anything changed.
**Fix:** `handleSave` now checks `unsaved`; if false, it shows a toast: "No settings changes to save".

### 6. Enrich Mode controls were active but should be deferred
**Gap:** The Advanced panel had 9 `advanced.enrich_*` toggles that looked fully interactive but are planned for a future Enrich Mode block.
**Fix:** Created `AdvancedPanel` that separates enrich settings into a "Enrich presets" card. Enrich toggles render as `DeferredSettingRow` with:
- `opacity-50` visual reduction
- "Planned" badge
- Click opens a planned sheet: "Planned for Enrich Mode — This control will be configured in the next Forge block."

### 7. App Update flow lacked failed state
**Gap:** Update check only produced "up to date" or "available".
**Fix:** Added deterministic mock failure for `nightly` channel (cycles available / up_to_date / failed). Added failed-state card with "Retry check" button.

### 8. No back button inside category panels
**Gap:** After opening a category, there was no way to return to the main settings list without closing the entire sheet.
**Fix:** Added "Back to categories" button in every category panel.

### 9. No save/reset buttons inside category panels
**Gap:** Save and Reset were only on the main settings screen.
**Fix:** Added Save settings and Reset buttons inside every category panel.

### 10. No credential status in provider cards
**Gap:** Provider cards showed `hasCredential` but no indication of whether a credential was actually set.
**Fix:** Added a small dot indicator next to the provider name: green when the mapped credential has a non-empty value, dim when empty.

### 11. No expandable release notes
**Gap:** Update available card showed release notes inline only.
**Fix:** Added a "Release notes" chevron toggle in the update available card.

## Provider Settings Behavior

- **Enable/disable toggles:** Update local `providers` state and mark settings dirty.
- **Configure button:** Opens provider detail sheet showing role, fields, credential info and actions.
- **Test mock button:** Triggers provider-specific mock progress steps in `ForgeProgressSheet`.
- **Credential status dot:** Shows green when the matching credential key in `credentials` record is non-empty.

## API Credentials Behavior

- **Secret fields:** `type="password"`, raw value stored in local React state only.
- **Show/hide:** Toggle between `type="text"` and `type="password"`.
- **Clear:** Sets the credential value to empty string.
- **Test:** Triggers provider-specific mock progress for the associated provider.
- **Save credentials:** Shows mock progress and toast.
- **Reset credentials:** Restores all credentials to defaults and toast.
- **No real secret storage, no console logging, no clipboard access, no file writes.**

## Tags & Metadata Behavior

- All toggles, selects and text inputs update local `settings` state and mark dirty.
- Rewrite rules: add/delete/edit inline; select field, from and to values.
- No real metadata rewrites.

## Artwork Settings Behavior

- Toggles and inputs update local state.
- Filename input is controlled text.
- Max size is controlled number.

## Lyrics Settings Behavior

- Toggles update local state.
- Custom endpoint URL is controlled text input.
- No real lyrics endpoints accessed.

## Audio Settings Behavior

- ReplayGain toggle, backend select, LUFS number input, gain/peak toggles all update local state.
- Key detection mode select and advanced limit numbers are controlled.

## Safety & Review Behavior

- All toggles and selects update local state.
- Auto-apply safe fixes is a select with Off/Ask/Empty only.
- Conflict behavior is a select with Always review/Prefer current/Prefer provider/Skip.

## App Updates Behavior

- **Channel select:** Stable, Beta, Nightly. Updates local state immediately.
- **Check for updates:**
  - Stable → up to date
  - Beta → update available
  - Nightly → cycles: available → up to date → failed (deterministic mock)
- **Download update:** Mock progress → ready state.
- **Install/Restart:** Mock progress → idle state with toast.
- **Retry check:** Available on failed state.
- **Release notes:** Expandable/collapsible via chevron.

## Advanced Behavior

- Auto-scan, verbose output, debug output toggles work normally.
- Enrich preset toggles are visually disabled, marked "Planned", and open a planned sheet on click.

## Enrich Mode Deferred Controls

- All `advanced.enrich_*` settings (cover, lyrics, lastfm, mood, bpm, features, acoustid, replaygain) are deferred.
- They are not removed from the UI; they render as disabled rows with a "Planned" badge.
- Clicking them opens a sheet explaining they will be configured in the next Forge block.
- This satisfies the "no dead controls" rule: they are either interactive (with a mock response) or clearly disabled.

## Unsaved Changes Behavior

- Any toggle, input, select, credential change, or rule edit sets `unsaved = true`.
- **Main close button (X or backdrop):** If unsaved, shows confirm dialog: "You have unsaved settings. Discard changes?" with Discard / Cancel.
- **Back to categories button:** Same unsaved guard.
- **Cancel** keeps the user on the current panel.
- **Discard** navigates back/closes and loses draft changes.
- Save settings clears unsaved flag.
- Reset settings restores defaults and clears unsaved flag.

## Mock-Only Safety Result

- ✅ No real metadata edits.
- ✅ No real file access.
- ✅ No real network calls.
- ✅ No real credential storage.
- ✅ No real config writes.
- ✅ No fetch/axios in app behavior.
- ✅ No FileReader.
- ✅ No fs.
- ✅ No child_process.
- ✅ All provider tests are local mock progress.
- ✅ All update flows are local mock progress.
- ✅ Secret fields are masked and stored in local React state only.
- ✅ No raw secrets logged to console.

## Remaining Settings Gaps

- None visible. Every control in Forge Settings either:
  1. works with a visible mock-only response, or
  2. is clearly disabled/deferred with a "Planned" badge and an explanatory sheet.

## Raw Evidence Summary

- Forge Core commit `27953ef` confirms provider roles, config sections, and safety model.
- `config.example.toml` shows all mapped sections.
- `metadata_providers.py` confirms provider classes and field authority mappings.
- `fields.py` confirms field categories, protected fields, and scope.
- `cover.py` confirms cover sources, embed behavior, and folder cover logic.
- Browser MCP validation confirms all 9 categories render, provider tests show correct steps, API Keys panel accepts secrets, app update flow cycles through states, Advanced enrich controls are disabled with planned sheet.
- TypeScript compiles without errors.
- Build succeeds.
- Safety grep shows no forbidden app behavior.
