export type ForgeIssue = {
  id: string
  title: string
  subtitle: string
  count: string
  items: string[]
}

export type ForgeAlbum = {
  id: string
  title: string
  artist: string
  year: string
  note: string
  gradient: string
}

export type ForgeActivity = {
  id: string
  title: string
  subtitle: string
  time: string
}

export const forgeIssues: ForgeIssue[] = [
  {
    id: 'lyrics',
    title: 'Missing lyrics',
    subtitle: '2 tracks need review copy',
    count: '02',
    items: ['The Whole Universe Wants', 'Says'],
  },
  {
    id: 'covers',
    title: 'Cover review',
    subtitle: '4 albums have stronger artwork options',
    count: '04',
    items: ['All Melody', 'Spaces', 'Felt', 'Empty'],
  },
  {
    id: 'genres',
    title: 'Genre cleanup',
    subtitle: '3 songs are missing genre context',
    count: '03',
    items: ['A Place', 'My Friend the Forest', 'The Bells'],
  },
]

export const forgeAlbums: ForgeAlbum[] = [
  {
    id: 'all-melody',
    title: 'All Melody',
    artist: 'Nils Frahm',
    year: '2018',
    note: 'Ready',
    gradient: 'from-stone-200 via-stone-500 to-stone-950',
  },
  {
    id: 'spaces',
    title: 'Spaces',
    artist: 'Nils Frahm',
    year: '2013',
    note: 'Missing lyrics',
    gradient: 'from-slate-200 via-slate-500 to-slate-950',
  },
  {
    id: 'felt',
    title: 'Felt',
    artist: 'Nils Frahm',
    year: '2011',
    note: 'Cover needs review',
    gradient: 'from-neutral-100 via-neutral-400 to-neutral-800',
  },
]

export const forgeActivity: ForgeActivity[] = [
  {
    id: 'lyrics-added',
    title: 'Lyrics previewed',
    subtitle: '2 tracks staged, nothing applied',
    time: '9:30',
  },
  {
    id: 'covers-compared',
    title: 'Covers compared',
    subtitle: '4 albums still need confirmation',
    time: '8:45',
  },
  {
    id: 'library-checked',
    title: 'Library checked',
    subtitle: 'Mock summary only',
    time: '7:15',
  },
]
