# Aria Detail Header Contract

Aria detail screens must feel like music-player surfaces led by artwork, title and playable context. Header controls support navigation and actions; they must not become a decorative bar that competes with the hero.

## Applies To

- Album Detail
- Artist Detail
- Playlist Detail
- Track Details

## Required Direction

- Detail screens should not use a full empty top header row after removing object-type labels.
- Back should be visually lightweight and should not compete with the hero artwork/card.
- Back should use either a compact floating/overlay control or a compact inline control with minimal vertical footprint.
- Album, Artist and Playlist details should have one contextual menu only.
- Album, Artist and Playlist details should not show redundant object-type labels such as `Album`, `Artist` or `Playlist` when the content already communicates the type through artwork, title, metadata and section structure.
- Track Details may keep one contextual menu if no duplicate menu exists.
- The hero/card remains the dominant top element on Album, Artist and Playlist detail screens.

## Forbidden Direction

- Do not add a large empty header bar above the hero.
- Do not add duplicate ellipsis/menu entry points on Album, Artist or Playlist details.
- Do not reintroduce `Album`, `Artist` or `Playlist` labels as decorative filler.
- Do not make the back button look like a primary action.
- Do not use header space to compensate for missing layout rhythm.

## Screen-Specific Notes

### Album Detail

- Artwork leads the page.
- Album title, artist, year/track-count/duration and Play/Shuffle/actions explain the object type without a decorative label.
- Keep one album options menu in the action area unless a future approved layout explicitly moves that single menu into the header.

### Artist Detail

- Portrait/hero treatment leads the page.
- Artist name, location/genre tags, Latest Release, Top Songs and discography sections explain the object type.
- Keep one artist options menu only.

### Playlist Detail

- Playlist artwork/hero and mood copy lead the page.
- Track count, description and track list explain the object type.
- Keep one playlist options menu only.

### Track Details

- Track Details is a metadata inspection surface, so a compact header can remain more explicit than other detail screens.
- One track contextual menu is acceptable if it does not duplicate another visible track-options control on the same screen.
- File/folder actions must remain mock-only and must not imply real filesystem access.

## Acceptance Criteria For 7D.1I

- Bloco 7D.1I-A applies the compact Back/hero spacing cleanup. Later detail work should preserve this tighter header behavior unless a new approved visual reference replaces it.
- Detail screens have no large empty header bar.
- Back is compact, readable and secondary to the hero.
- Album, Artist and Playlist details expose exactly one visible contextual menu each.
- Removed type labels are not replaced with decorative filler labels.
- Track Details keeps at most one contextual menu.
- No playback overlay, Studio shell, phone simulator, Anchor, Forge or Flux files are changed.
