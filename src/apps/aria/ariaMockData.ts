export type AriaTrack = {
  id: string
  title: string
  artist: string
  album: string
  duration: string
  accent: string
  genre?: string
  year?: number
  codec?: string
  sampleRate?: string
  bitDepth?: string
  source?: string
  trackNumber?: number
}

export type AriaAlbum = {
  id: string
  title: string
  artist: string
  year: number
  trackCount: number
  duration: string
  accent: string
  format: string
  source: string
}

export type AriaArtist = {
  id: string
  name: string
  genre: string
  accent: string
  location?: string
  tags?: string[]
}

export type AriaPlaylist = {
  id: string
  title: string
  description: string
  trackCount: number
  duration: string
  accent: string
}

export type AriaDiscographyItem = {
  id: string
  title: string
  subtitle: string
  accent: string
  art: string
}

export type AriaShelf = {
  id: string
  title: string
  subtitle: string
  accent: string
  type: 'album' | 'playlist' | 'artist'
}

export const nowPlaying: AriaTrack = {
  id: 'golden-hour',
  title: 'Golden Hour',
  artist: 'Noqlen Ensemble',
  album: 'Amber Sessions',
  duration: '4:12',
  accent: 'from-amber-200 via-orange-300 to-slate-900',
}

export const ariaQueue: AriaTrack[] = [
  {
    id: 'in-passing',
    title: 'In Passing',
    artist: 'Asles',
    album: 'Wandering',
    duration: '5:21',
    accent: 'from-slate-300 via-slate-500 to-slate-900',
  },
  {
    id: 'bloom',
    title: 'Bloom',
    artist: 'Cory',
    album: 'Seasons',
    duration: '4:31',
    accent: 'from-rose-200 via-rose-400 to-slate-900',
  },
  {
    id: 'deep-calm',
    title: 'Deep Calm',
    artist: 'Playlist',
    album: 'A quiet collection',
    duration: '8:12',
    accent: 'from-sky-200 via-sky-500 to-slate-900',
  },
  {
    id: 'sunday-morning',
    title: 'Sunday Morning',
    artist: 'Cory',
    album: 'Seasons',
    duration: '4:32',
    accent: 'from-emerald-200 via-emerald-500 to-slate-900',
  },
  {
    id: 'late-ambient',
    title: 'Late Ambient',
    artist: 'Nils Frahm',
    album: 'All Melody',
    duration: '6:18',
    accent: 'from-violet-200 via-violet-500 to-slate-900',
  },
  {
    id: 'a-place',
    title: 'A Place',
    artist: 'Nils Frahm',
    album: 'All Melody',
    duration: '4:16',
    accent: 'from-amber-100 via-amber-400 to-slate-900',
  },
]

export const ariaAlbumTracks: AriaTrack[] = [
  { id: 'whole-universe', title: 'The Whole Universe Wants', artist: 'Nils Frahm', album: 'All Melody', duration: '6:03', accent: 'from-amber-100 via-amber-400 to-slate-900', genre: 'Modern Classical', year: 2018, codec: 'FLAC', sampleRate: '96 kHz', bitDepth: '24-bit', source: 'Local mock library', trackNumber: 1 },
  { id: 'sunson', title: 'Sunson', artist: 'Nils Frahm', album: 'All Melody', duration: '9:10', accent: 'from-stone-200 via-stone-500 to-slate-900', genre: 'Modern Classical', year: 2018, codec: 'FLAC', sampleRate: '96 kHz', bitDepth: '24-bit', source: 'Local mock library', trackNumber: 2 },
  { id: 'all-melody-track', title: 'All Melody', artist: 'Nils Frahm', album: 'All Melody', duration: '7:45', accent: 'from-amber-100 via-amber-400 to-slate-900', genre: 'Modern Classical', year: 2018, codec: 'FLAC', sampleRate: '96 kHz', bitDepth: '24-bit', source: 'Local mock library', trackNumber: 3 },
  { id: 'my-friend-forest', title: 'My Friend the Forest', artist: 'Nils Frahm', album: 'All Melody', duration: '8:20', accent: 'from-emerald-200 via-emerald-500 to-slate-900', genre: 'Piano', year: 2018, codec: 'FLAC', sampleRate: '96 kHz', bitDepth: '24-bit', source: 'Local mock library', trackNumber: 4 },
  { id: 'human-range', title: 'Human Range', artist: 'Nils Frahm', album: 'All Melody', duration: '6:59', accent: 'from-orange-200 via-orange-500 to-slate-900', genre: 'Ambient', year: 2018, codec: 'FLAC', sampleRate: '96 kHz', bitDepth: '24-bit', source: 'Local mock library', trackNumber: 5 },
  { id: 'forever-changeless', title: 'Forever Changeless', artist: 'Nils Frahm', album: 'All Melody', duration: '2:47', accent: 'from-violet-200 via-violet-500 to-slate-900', genre: 'Ambient', year: 2018, codec: 'FLAC', sampleRate: '96 kHz', bitDepth: '24-bit', source: 'Local mock library', trackNumber: 6 },
]

export const ariaAlbums: AriaAlbum[] = [
  {
    id: 'all-melody',
    title: 'All Melody',
    artist: 'Nils Frahm',
    year: 2018,
    trackCount: 13,
    duration: '1h 14m',
    accent: 'from-amber-100 via-amber-400 to-slate-900',
    format: 'FLAC',
    source: 'Local',
  },
  {
    id: 'a-moment-apart',
    title: 'A Moment Apart',
    artist: 'Ólafur Arnalds',
    year: 2017,
    trackCount: 11,
    duration: '52m',
    accent: 'from-sky-200 via-sky-500 to-slate-900',
    format: 'MP3',
    source: 'Navidrome',
  },
  {
    id: 'saman',
    title: 'Saman',
    artist: 'Ólafur Arnalds',
    year: 2007,
    trackCount: 8,
    duration: '38m',
    accent: 'from-stone-200 via-stone-500 to-slate-900',
    format: 'AAC',
    source: 'Local',
  },
  {
    id: 'midnight-horizons',
    title: 'Midnight Horizons',
    artist: 'Ólafur Arnalds',
    year: 2020,
    trackCount: 9,
    duration: '48m',
    accent: 'from-orange-200 via-orange-500 to-slate-900',
    format: 'FLAC',
    source: 'Local',
  },
  {
    id: 'deep-calm-album',
    title: 'Deep Calm',
    artist: 'Various Artists',
    year: 2019,
    trackCount: 24,
    duration: '1h 56m',
    accent: 'from-teal-200 via-teal-500 to-slate-900',
    format: 'FLAC',
    source: 'Local',
  },
]

export const ariaArtists: AriaArtist[] = [
  { id: 'nils-frahm', name: 'Nils Frahm', genre: 'Modern Classical', accent: 'from-amber-100 via-amber-400 to-slate-900', location: 'Berlin, Germany', tags: ['Electronic', 'Classical', 'Ambient'] },
  { id: 'olafur-arnalds', name: 'Ólafur Arnalds', genre: 'Ambient / Neo-classical', accent: 'from-sky-200 via-sky-500 to-slate-900', location: 'Reykjavík, Iceland', tags: ['Piano', 'Strings', 'Ambient'] },
  { id: 'cory', name: 'Cory', genre: 'Indie Folk', accent: 'from-rose-200 via-rose-400 to-slate-900', location: 'Portland, Oregon', tags: ['Indie', 'Folk', 'Acoustic'] },
  { id: 'asles', name: 'Asles', genre: 'Ambient', accent: 'from-violet-200 via-violet-500 to-slate-900', location: 'Oslo, Norway', tags: ['Ambient', 'Drone', 'Piano'] },
]

export const ariaArtistTopSongs: AriaTrack[] = [
  ariaAlbumTracks[0],
  ariaAlbumTracks[2],
  { ...ariaQueue[5], trackNumber: 3, genre: 'Modern Classical', year: 2018, codec: 'FLAC', sampleRate: '96 kHz', bitDepth: '24-bit', source: 'Local mock library' },
  ariaAlbumTracks[3],
  { id: 'saysum', title: 'Saysum', artist: 'Nils Frahm', album: 'Screws', duration: '4:56', accent: 'from-stone-200 via-stone-500 to-slate-900', genre: 'Piano', year: 2014, codec: 'AAC', sampleRate: '44.1 kHz', bitDepth: '16-bit', source: 'Local mock library', trackNumber: 5 },
]

export const ariaDiscography: AriaDiscographyItem[] = [
  { id: 'screws', title: 'Screws', subtitle: 'EP · 2014', accent: 'from-stone-200 via-stone-500 to-slate-900', art: 'aria-art-mist' },
  { id: 'spaces', title: 'Spaces', subtitle: 'Album · 2013', accent: 'from-blue-200 via-sky-500 to-slate-900', art: 'aria-art-hall' },
]

export const ariaPlaylistTracks: AriaTrack[] = [
  { ...ariaQueue[2], trackNumber: 1, genre: 'Ambient', year: 2019, codec: 'FLAC', sampleRate: '48 kHz', bitDepth: '24-bit', source: 'Local mock playlist' },
  { ...ariaAlbumTracks[3], trackNumber: 2 },
  { ...ariaQueue[4], trackNumber: 3, genre: 'Ambient', year: 2018, codec: 'FLAC', sampleRate: '44.1 kHz', bitDepth: '16-bit', source: 'Local mock playlist' },
  { ...ariaQueue[0], trackNumber: 4, genre: 'Ambient', year: 2020, codec: 'AAC', sampleRate: '44.1 kHz', bitDepth: '16-bit', source: 'Local mock playlist' },
]

export const ariaPlaylists: AriaPlaylist[] = [
  {
    id: 'deep-calm',
    title: 'Deep Calm',
    description: 'A quiet collection for late listening.',
    trackCount: 24,
    duration: '1h 56m',
    accent: 'from-teal-200 via-teal-500 to-slate-900',
  },
  {
    id: 'evening-amber',
    title: 'Evening Amber',
    description: 'Warm tones for winding down.',
    trackCount: 18,
    duration: '1h 32m',
    accent: 'from-amber-200 via-orange-400 to-slate-900',
  },
  {
    id: 'focus-flow',
    title: 'Focus Flow',
    description: 'Instrumental tracks for deep work.',
    trackCount: 32,
    duration: '2h 15m',
    accent: 'from-emerald-200 via-emerald-500 to-slate-900',
  },
]

export const ariaRecentListens: AriaShelf[] = [
  { id: 'recent-all-melody', title: 'All Melody', subtitle: 'Nils Frahm · Album', accent: 'from-amber-100 via-amber-400 to-slate-900', type: 'album' },
  { id: 'recent-midnight', title: 'Midnight Horizons', subtitle: 'Ólafur Arnalds · Album', accent: 'from-orange-200 via-orange-500 to-slate-900', type: 'album' },
  { id: 'recent-deep-calm', title: 'Deep Calm', subtitle: 'Playlist · 24 tracks', accent: 'from-teal-200 via-teal-500 to-slate-900', type: 'playlist' },
]

export const ariaFeaturedPlaylists: AriaShelf[] = [
  { id: 'feat-evening', title: 'Evening Amber', subtitle: 'Warm tones for winding down', accent: 'from-amber-200 via-orange-400 to-slate-900', type: 'playlist' },
  { id: 'feat-focus', title: 'Focus Flow', subtitle: 'Instrumental deep work', accent: 'from-emerald-200 via-emerald-500 to-slate-900', type: 'playlist' },
]

export const ariaQuickResume: AriaShelf[] = [
  { id: 'qr-all-melody', title: 'All Melody', subtitle: 'Track 3 of 13', accent: 'from-amber-100 via-amber-400 to-slate-900', type: 'album' },
  { id: 'qr-deep-calm', title: 'Deep Calm', subtitle: 'Track 7 of 24', accent: 'from-teal-200 via-teal-500 to-slate-900', type: 'playlist' },
]

export const ariaSearchResults = [
  { id: 'sr-all-melody', title: 'All Melody', subtitle: 'Nils Frahm · Album · 2018', accent: 'from-amber-100 via-amber-400 to-slate-900', format: 'FLAC', source: 'Local', type: 'album' as const },
  { id: 'sr-moment-apart', title: 'A Moment Apart', subtitle: 'Ólafur Arnalds · Album · 2017', accent: 'from-sky-200 via-sky-500 to-slate-900', format: 'MP3', source: 'Navidrome', type: 'album' as const },
  { id: 'sr-saman', title: 'Saman', subtitle: 'Ólafur Arnalds · Album · 2007', accent: 'from-stone-200 via-stone-500 to-slate-900', format: 'AAC', source: 'Local', type: 'album' as const },
  { id: 'sr-midnight', title: 'Midnight Horizons', subtitle: 'Ólafur Arnalds · Track', accent: 'from-orange-200 via-orange-500 to-slate-900', format: 'FLAC', source: 'Local', type: 'track' as const },
  { id: 'sr-deep-calm', title: 'Deep Calm', subtitle: 'Playlist · 24 tracks', accent: 'from-teal-200 via-teal-500 to-slate-900', format: '', source: 'Local', type: 'playlist' as const },
]

export const ariaLibraryCategories = [
  { id: 'albums', label: 'Albums', count: 48 },
  { id: 'artists', label: 'Artists', count: 23 },
  { id: 'songs', label: 'Songs', count: 312 },
  { id: 'genres', label: 'Genres', count: 14 },
  { id: 'folders', label: 'Folders', count: 6 },
]

export const ariaRecentSearches = ['Nils Frahm', 'ambient', 'Ólafur Arnalds', 'piano']
