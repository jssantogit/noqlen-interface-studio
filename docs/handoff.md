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
- **Aria** — music player and library mock currently in visual alignment/refinement.
- **Flux** — intentionally neutral static placeholder until dedicated concepts are provided.

Anchor remains the default selected app in the Studio switcher.

## Active priority

The active product priority is Aria visual alignment.

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

## Near-term roadmap

```txt
[ ] Bloco 0 — Sincronizar verdade do repo
[ ] Bloco 1 — Criar processo oficial de alinhamento visual
[ ] Bloco 2 — Extrair o Aria Visual System das novas referências
[ ] Bloco 3 — Alinhar Aria Shell: fundo, bottom nav e mini player
[ ] Bloco 4 — Alinhar Home, Library e Explore
[ ] Bloco 5 — Implementar/alinhar telas detail: Album, Artist, Track, Playlist
[ ] Bloco 6 — Implementar/alinhar Now Playing, Lyrics e Queue
[ ] Bloco 7 — Testes de Aria
[ ] Bloco 8 — Refatorar Anchor sem mudar aparência
[ ] Bloco 9 — Refatorar Forge sem mudar aparência
[ ] Bloco 10 — Testes de Anchor e Forge
[ ] Bloco 11 — Auditoria responsiva geral
[ ] Bloco 12 — Validação final
```
