# Handoff

Noqlen Interface Studio is a visual-only React mobile simulator lab for exploring mock interface contracts across the Noqlen ecosystem.

## Source of truth

- Repository slug: `noqlen-interface-studio`
- Public name: `Noqlen Interface Studio`
- Old reference repo: `https://github.com/jssantogit/noqlen-ui-lab`
- Workflow reference: `https://github.com/jssantogit/noqlen-playbook`

## Current project state

The initial simulator shell is no longer the only implemented layer. Current state:

- **Studio Shell** — stable responsive simulator shell with app selector, phone frame and side inspector.
- **Anchor** — high-fidelity interactive mock foundation for local media server control.
- **Forge** — advanced interactive mock preview for library repair, metadata review and activity flows.
- **Aria** — music player and library mock currently in interaction-completion work after visual alignment.
- **Flux** — intentionally neutral static placeholder until dedicated concepts are provided.

Anchor remains the default selected app in the Studio switcher.

## Active priority

The active product priority is completing Aria mock-only interactions before writing Aria tests.

Approved Aria reference images live in:

```txt
docs/references/aria/
```

Current approved image references include:

```txt
aria_home_reference.png
aria_library_reference.png
aria_explore_reference.png
aria_artist_reference.png
aria_lyrics_reference.png
aria_nowplaying_reference.png
```

Older Aria reference PNGs and the legacy showcase HTML are no longer the visual source of truth.

## Working rule

All work remains mock-only unless a future handoff explicitly changes that rule.

Interactive app previews may use local React state, static mock data, display-only sheets, dialogs, progress states and toasts. They must not call real backends, control real servers, play real audio, read real music libraries, access the filesystem, store secrets or depend on network behavior.

Before Aria tests, every visible Aria interaction must be audited and completed: no dead buttons, no dead rows, no fake menu affordances without response, and no clickable-looking elements left unexplained.

## Near-term roadmap

```txt
[x] Bloco 0 — Sincronizar verdade do repo
[x] Bloco 1 — Criar processo oficial de alinhamento visual
[x] Bloco 2 — Extrair o Aria Visual System das novas referências
[x] Bloco 3 — Alinhar Aria Shell: fundo, bottom nav e mini player
[x] Bloco 4 — Alinhar Home, Library e Explore
[x] Bloco 5 — Implementar/alinhar telas detail: Album, Artist, Track, Playlist
[x] Bloco 6 — Implementar/alinhar Now Playing, Lyrics e Queue
[x] Bloco 7A — Auditar interações do Aria
[x] Bloco 7B — Completar interações globais/navigation do Aria
[x] Bloco 7C — Completar interações das telas principais do Aria
[ ] Bloco 7D — Completar interações das telas detail do Aria
[ ] Bloco 7E — Completar interações de playback overlays do Aria
[ ] Bloco 7F — Varredura final: nenhum botão morto no Aria
[ ] Bloco 8 — Testes de Aria
[ ] Bloco 9 — Refatorar Anchor sem mudar aparência
[ ] Bloco 10 — Refatorar Forge sem mudar aparência
[ ] Bloco 11 — Testes de Anchor e Forge
[ ] Bloco 12 — Auditoria responsiva geral
[ ] Bloco 13 — Validação final
```

## Aria interaction completion checklist

Source audit:

```txt
docs/audits/aria-interaction-audit.md
```

Current audit summary:

```txt
Total controls audited: 201
Working: 140
Dead: 6
Partial: 43
Should not be clickable: 12
Unknown / browser-check needed: 0
```

### Bloco 7B — Global/navigation interactions

- [x] Fix or clarify detail-stack behavior.
- [x] Decide whether bottom nav should be hidden/disabled under full playback overlays.
- [x] Preserve tab changes closing detail/overlay when intended.
- [x] Keep mini player visual unchanged.
- [x] Decide whether previous/next remain toast-only or cycle local mock queue.
- [x] Keep all behavior local-state-only.

### Bloco 7C — Top-level screen interactions

- [x] Resolve Listen Home recent-row `•••` affordances.
- [x] Resolve Listen shortcut destinations that are too broad for specific details.
- [x] Add real local state for playlist filter chips or make them passive.
- [x] Resolve Library category rows that imply lists but open arbitrary items/toasts.
- [x] Resolve Explore category cards that imply category browsing.
- [x] Resolve Search / See all / Sort affordances with local mock behavior or passive styling.
- [x] Keep import/export strictly mock-only and avoid real file/download implication.

### Bloco 7D — Detail screen interactions

- [ ] Resolve Album Detail more/options buttons.
- [ ] Resolve Album artist link behavior.
- [ ] Resolve Artist Detail more/options buttons.
- [ ] Resolve Artist EPs & Singles rows with chevrons.
- [ ] Resolve Playlist Detail more/options buttons.
- [ ] Resolve Track Details favorite visible state.
- [ ] Resolve Add to Queue behavior or clarify as toast-only.
- [ ] Decide consistent track-row rule: play/open Now Playing vs Track Details.

### Bloco 7E — Playback overlay interactions

- [ ] Resolve Now Playing seek/progress behavior.
- [ ] Resolve Lyrics timeline behavior.
- [ ] Resolve Queue clear confirmation.
- [ ] Resolve Queue row behavior: select current item, open detail, or passive.
- [ ] Resolve Queue reorder handles: local reorder or passive styling.
- [ ] Resolve row more buttons with local options behavior or clearer toast-only behavior.
- [ ] Preserve Now Playing visual spacing as currently accepted.

### Bloco 7F — Final no-dead-control sweep

- [ ] Re-run browser audit across all Aria tabs.
- [ ] Re-open every detail screen.
- [ ] Re-open Now Playing, Lyrics and Queue.
- [ ] Verify every visible control responds or is visually passive.
- [ ] Confirm no new visual regressions.
- [ ] Confirm no real integration was added.
- [ ] Update `docs/audits/aria-interaction-audit.md` with final status.

## Row-tap rule to resolve during interaction completion

Use this rule unless a later block explicitly changes it:

```txt
Track row tap: select/play local mock track and open Now Playing.
Track more/info button: open Track Details or local options.
Album concrete row/card tap: open Album Detail.
Artist concrete row/card tap: open Artist Detail.
Playlist concrete row/card tap: open Playlist Detail.
Category row/card tap: open local category/list state, not an arbitrary representative item.
```

This rule keeps Aria feeling like a music player first, not a metadata inspector.
