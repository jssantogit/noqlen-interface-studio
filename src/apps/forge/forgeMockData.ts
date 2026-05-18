export interface MockAlbum {
  id: string
  title: string
  artist: string
  artistId: string
  year: string
  coverGradient: string
  mood: string
  genres: string[]
  note: string
  tracks: string[]
  // Extended metadata
  albumArtist?: string
  date?: string
  originalDate?: string
  trackTotal?: string
  discTotal?: string
  style?: string
  lastFmTags?: string
  mbAlbumId?: string
  mbReleaseGroupId?: string
  label?: string
  catalogNumber?: string
  barcode?: string
  releaseCountry?: string
  media?: string
  releaseFormat?: string
  releaseType?: string
  edition?: string
  coverSize?: string
}

export interface MockSong {
  id: string
  title: string
  artist: string
  artistId: string
  album: string
  albumId: string
  year: string
  genres: string[]
  mood: string
  note: string
  // Extended metadata
  albumArtist?: string
  trackNumber?: string
  trackTotal?: string
  discNumber?: string
  discTotal?: string
  date?: string
  originalDate?: string
  style?: string
  lastFmTags?: string
  lyrics?: string
  syncedLyrics?: string
  sidecarLrc?: string
  mbTrackId?: string
  mbReleaseTrackId?: string
  acoustId?: string
  isrc?: string
  bpm?: string
  key?: string
  energy?: string
  danceability?: string
  replayGainTrackGain?: string
  replayGainTrackPeak?: string
  replayGainAlbumGain?: string
  replayGainAlbumPeak?: string
  // File info (read-only)
  filePath?: string
  fileFormat?: string
  codec?: string
  bitrate?: string
  sampleRate?: string
  duration?: string
}

export interface MockArtist {
  id: string
  name: string
  subtitle: string
  note: string
  genres: string[]
  mood: string
  // Extended metadata
  sortName?: string
  displayName?: string
  country?: string
  biography?: string
  style?: string
  lastFmTags?: string
  mbArtistId?: string
  imageSize?: string
}

export type ReviewItemType = 'lyrics' | 'covers' | 'genres'
export type ReviewItemStatus = 'pending' | 'fixed' | 'ignored'
export type ReviewProposalStatus = 'Safe' | 'Review' | 'Protected' | 'Conflict' | 'Applied' | 'Ignored' | 'Read-only'
export type ForgeReviewSection = 'all' | 'artwork' | 'lyrics' | 'metadata'
export type ForgeMetadataFilter = 'tags' | 'identity' | 'release' | 'audio'

export interface ReviewItem {
  id: string
  title: string
  artist: string
  album?: string
  type: ReviewItemType
  status: ReviewItemStatus
}

export interface ReviewGroup {
  id: string
  icon: 'Music2' | 'Image' | 'Tags'
  title: string
  subtitle: string
  action: string
  accent: string
  items: ReviewItem[]
  detail: string
}

export interface ForgeReviewQueueItem {
  id: string
  title: string
  artist: string
  album?: string
  type: ReviewItemType
  section: ForgeReviewSection
  metadataFilter?: ForgeMetadataFilter
  proposalStatus: ReviewProposalStatus
  proposedFixes?: number
  safeCount?: number
  reviewCount?: number
  chips: string[]
  extraCount?: number
  current?: string
  suggested?: string
  detail?: string
  actionLabel?: string
  gradient: string
}

export type ActivityType =
  | 'lyrics'
  | 'artwork'
  | 'tags'
  | 'identity'
  | 'release'
  | 'audio'
  | 'libraryEdit'
  | 'libraryCheck'
  | 'error'

export type ActivityStatus = 'completed' | 'pendingReview' | 'warning' | 'failed'
export type ActivityFilter = 'all' | 'lyrics' | 'artwork' | 'metadata' | 'libraryEdit' | 'warning' | 'failed' | 'completed'

export interface ActivityItem {
  id: string
  title: string
  subtitle: string
  time: string
  icon: 'CheckCircle2' | 'Image' | 'Tags' | 'Clock3' | 'Check' | 'AlertTriangle' | 'Music2'
  accent: string
  bgAccent: string
  summary: string[]
  detail: string
  activityType: ActivityType
  dateGroup: 'today' | 'yesterday'
  affectedCount: number
  affectedItems: string[]
  changedFields?: string[]
  provider?: string
  status: ActivityStatus
  relatedReviewTarget?:
    | 'all'
    | 'artwork'
    | 'lyrics'
    | 'metadata'
    | 'metadata/tags'
    | 'metadata/identity'
    | 'metadata/release'
    | 'metadata/audio'
  relatedLibraryTarget?: 'artist' | 'album' | 'track'
}

export const artistData: MockArtist[] = [
  {
    id: 'nils',
    name: 'Nils Frahm',
    subtitle: '6 albums',
    note: '2 items need attention',
    genres: ['Modern Classical', 'Ambient'],
    mood: 'Introspective',
    sortName: 'Frahm, Nils',
    displayName: 'Nils Frahm',
    country: 'DE',
    biography: 'German composer and pianist based in Berlin.',
    style: 'Modern Classical, Minimal, Piano',
    lastFmTags: 'piano, instrumental, ambient, modern classical',
    mbArtistId: 'mock-mbid-nils-frahm',
    imageSize: '600 x 600',
  },
  {
    id: 'vola',
    name: 'VOLA',
    subtitle: '4 albums',
    note: '',
    genres: ['Progressive Metal'],
    mood: 'Dense',
    sortName: 'VOLA',
    displayName: 'VOLA',
    country: 'DK',
    biography: 'Danish progressive metal band.',
    style: 'Progressive Metal, Djent',
    lastFmTags: 'progressive metal, danish, djent',
    mbArtistId: 'mock-mbid-vola',
    imageSize: '800 x 800',
  },
  {
    id: 'chon',
    name: 'CHON',
    subtitle: '3 albums',
    note: '',
    genres: ['Math Rock'],
    mood: 'Bright',
    sortName: 'CHON',
    displayName: 'CHON',
    country: 'US',
    biography: 'American math rock band from California.',
    style: 'Math Rock, Instrumental',
    lastFmTags: 'math rock, instrumental, progressive',
    mbArtistId: 'mock-mbid-chon',
    imageSize: '800 x 800',
  },
]

export const albumData: MockAlbum[] = [
  {
    id: 'all-melody',
    title: 'All Melody',
    artist: 'Nils Frahm',
    artistId: 'nils',
    year: '2018',
    coverGradient: 'from-amber-100 via-orange-300 to-stone-700',
    note: '',
    mood: 'Introspective',
    genres: ['Classical', 'Ambient'],
    tracks: ['The Whole Universe Wants', 'Sunson', 'A Place', 'My Friend the Forest'],
    albumArtist: 'Nils Frahm',
    date: '2018-01-26',
    originalDate: '2018-01-26',
    trackTotal: '12',
    discTotal: '1',
    style: 'Modern Classical, Ambient, Minimal',
    lastFmTags: 'piano, ambient, modern classical, introspective',
    mbAlbumId: 'mock-mbid-all-melody-2018',
    mbReleaseGroupId: 'mock-rgid-all-melody-2018',
    label: 'Erased Tapes',
    catalogNumber: 'ERATP106',
    barcode: '4050486123456',
    releaseCountry: 'DE',
    media: 'CD',
    releaseFormat: 'Album',
    releaseType: 'Album',
    edition: 'Standard',
    coverSize: '320 x 320',
  },
  {
    id: 'spaces',
    title: 'Spaces',
    artist: 'Nils Frahm',
    artistId: 'nils',
    year: '2013',
    coverGradient: 'from-slate-300 via-slate-500 to-stone-900',
    note: 'Missing lyrics',
    mood: 'Live / Expansive',
    genres: ['Ambient', 'Modern Classical'],
    tracks: ['An Aborted Beginning', 'Says', 'Hammers'],
    albumArtist: 'Nils Frahm',
    date: '2013-11-19',
    originalDate: '2013-11-19',
    trackTotal: '8',
    discTotal: '1',
    style: 'Ambient, Live, Piano',
    lastFmTags: 'ambient, live, piano, modern classical',
    mbAlbumId: 'mock-mbid-spaces-2013',
    mbReleaseGroupId: 'mock-rgid-spaces-2013',
    label: 'Erased Tapes',
    catalogNumber: 'ERATP085',
    barcode: '4050486012345',
    releaseCountry: 'DE',
    media: 'CD',
    releaseFormat: 'Album',
    releaseType: 'Album',
    edition: 'Standard',
    coverSize: '600 x 600',
  },
  {
    id: 'the-bells',
    title: 'The Bells',
    artist: 'Nils Frahm',
    artistId: 'nils',
    year: '2009',
    coverGradient: 'from-zinc-800 via-zinc-600 to-amber-200',
    note: '',
    mood: 'Minimal',
    genres: ['Piano', 'Modern Classical'],
    tracks: ['In the Sky and on the Ground', 'I Would Like to Think', 'Over There'],
    albumArtist: 'Nils Frahm',
    date: '2009-02-17',
    originalDate: '2009-02-17',
    trackTotal: '9',
    discTotal: '1',
    style: 'Piano, Minimal, Modern Classical',
    lastFmTags: 'piano, minimal, modern classical',
    mbAlbumId: 'mock-mbid-the-bells-2009',
    mbReleaseGroupId: 'mock-rgid-the-bells-2009',
    label: 'Erased Tapes',
    catalogNumber: 'ERATP032',
    barcode: '4050486001234',
    releaseCountry: 'DE',
    media: 'CD',
    releaseFormat: 'Album',
    releaseType: 'Album',
    edition: 'Standard',
    coverSize: '800 x 800',
  },
  {
    id: 'music-for-animals',
    title: 'Music for Animals',
    artist: 'Nils Frahm',
    artistId: 'nils',
    year: '2022',
    coverGradient: 'from-stone-400 via-emerald-800 to-neutral-950',
    note: '',
    mood: 'Slow / Textural',
    genres: ['Ambient'],
    tracks: ['The Dog with 1000 Faces', 'Mussel Memory', 'Seagull Scene'],
    albumArtist: 'Nils Frahm',
    date: '2022-09-23',
    originalDate: '2022-09-23',
    trackTotal: '10',
    discTotal: '1',
    style: 'Ambient, Textural, Slow',
    lastFmTags: 'ambient, textural, piano',
    mbAlbumId: 'mock-mbid-music-for-animals-2022',
    mbReleaseGroupId: 'mock-rgid-music-for-animals-2022',
    label: 'LEITER',
    catalogNumber: 'LEITER001',
    barcode: '4050486999999',
    releaseCountry: 'DE',
    media: 'CD',
    releaseFormat: 'Album',
    releaseType: 'Album',
    edition: 'Standard',
    coverSize: '1200 x 1200',
  },
  {
    id: 'felt',
    title: 'Felt',
    artist: 'Nils Frahm',
    artistId: 'nils',
    year: '2011',
    coverGradient: 'from-neutral-200 via-stone-400 to-stone-800',
    note: 'Cover needs review',
    mood: 'Soft / Close',
    genres: ['Piano'],
    tracks: ['Keep', 'Less', 'Familiar'],
    albumArtist: 'Nils Frahm',
    date: '2011-10-07',
    originalDate: '2011-10-07',
    trackTotal: '8',
    discTotal: '1',
    style: 'Piano, Minimal, Intimate',
    lastFmTags: 'piano, minimal, intimate',
    mbAlbumId: 'mock-mbid-felt-2011',
    mbReleaseGroupId: 'mock-rgid-felt-2011',
    label: 'Erased Tapes',
    catalogNumber: 'ERATP051',
    barcode: '4050486111111',
    releaseCountry: 'DE',
    media: 'CD',
    releaseFormat: 'Album',
    releaseType: 'Album',
    edition: 'Standard',
    coverSize: '600 x 600',
  },
  {
    id: 'empty',
    title: 'Empty',
    artist: 'Nils Frahm',
    artistId: 'nils',
    year: '2020',
    coverGradient: 'from-neutral-700 via-stone-500 to-neutral-900',
    note: '',
    mood: 'Quiet',
    genres: ['Piano', 'Ambient'],
    tracks: ['First Defeat', 'No Step on Wing', 'Black Notes'],
    albumArtist: 'Nils Frahm',
    date: '2020-03-28',
    originalDate: '2020-03-28',
    trackTotal: '8',
    discTotal: '1',
    style: 'Piano, Ambient, Quiet',
    lastFmTags: 'piano, ambient, quiet',
    mbAlbumId: 'mock-mbid-empty-2020',
    mbReleaseGroupId: 'mock-rgid-empty-2020',
    label: 'LEITER',
    catalogNumber: 'LEITER002',
    barcode: '4050486222222',
    releaseCountry: 'DE',
    media: 'Digital',
    releaseFormat: 'Album',
    releaseType: 'Album',
    edition: 'Standard',
    coverSize: '1000 x 1000',
  },
]

export const songData: MockSong[] = [
  {
    id: 'whole-universe',
    title: 'The Whole Universe Wants',
    artist: 'Nils Frahm',
    artistId: 'nils',
    album: 'All Melody',
    albumId: 'all-melody',
    year: '2018',
    genres: [],
    mood: 'Warm',
    note: 'Missing lyrics',
    albumArtist: 'Nils Frahm',
    trackNumber: '1',
    trackTotal: '12',
    discNumber: '1',
    discTotal: '1',
    date: '2018-01-26',
    originalDate: '2018-01-26',
    style: 'Modern Classical, Ambient',
    lastFmTags: 'piano, ambient, modern classical',
    lyrics: '',
    syncedLyrics: '',
    sidecarLrc: '',
    mbTrackId: 'mock-mbid-track-whole-universe',
    mbReleaseTrackId: 'mock-mbid-release-track-whole-universe',
    acoustId: 'mock-acoustid-whole-universe',
    isrc: 'mock-isrc-2018-0001',
    bpm: '72',
    key: 'A minor',
    energy: 'Low',
    danceability: 'Very low',
    replayGainTrackGain: '-8.2 dB',
    replayGainTrackPeak: '0.98',
    replayGainAlbumGain: '-8.5 dB',
    replayGainAlbumPeak: '0.99',
    filePath: '/mock/music/Nils Frahm/All Melody/01 The Whole Universe Wants.flac',
    fileFormat: 'FLAC',
    codec: 'FLAC',
    bitrate: '1411 kbps',
    sampleRate: '44.1 kHz',
    duration: '4:32',
  },
  {
    id: 'says',
    title: 'Says',
    artist: 'Nils Frahm',
    artistId: 'nils',
    album: 'Spaces',
    albumId: 'spaces',
    year: '2013',
    genres: ['Ambient'],
    mood: 'Expansive',
    note: 'Missing lyrics',
    albumArtist: 'Nils Frahm',
    trackNumber: '2',
    trackTotal: '8',
    discNumber: '1',
    discTotal: '1',
    date: '2013-11-19',
    originalDate: '2013-11-19',
    style: 'Ambient, Live, Piano',
    lastFmTags: 'ambient, live, piano',
    lyrics: '',
    syncedLyrics: '',
    sidecarLrc: '',
    mbTrackId: 'mock-mbid-track-says',
    mbReleaseTrackId: 'mock-mbid-release-track-says',
    acoustId: 'mock-acoustid-says',
    isrc: 'mock-isrc-2013-0002',
    bpm: '120',
    key: 'A minor',
    energy: 'Medium',
    danceability: 'Low',
    replayGainTrackGain: '-7.8 dB',
    replayGainTrackPeak: '0.97',
    replayGainAlbumGain: '-8.1 dB',
    replayGainAlbumPeak: '0.98',
    filePath: '/mock/music/Nils Frahm/Spaces/02 Says.flac',
    fileFormat: 'FLAC',
    codec: 'FLAC',
    bitrate: '1411 kbps',
    sampleRate: '44.1 kHz',
    duration: '8:19',
  },
  {
    id: 'a-place',
    title: 'A Place',
    artist: 'Nils Frahm',
    artistId: 'nils',
    album: 'All Melody',
    albumId: 'all-melody',
    year: '2018',
    genres: [],
    mood: 'Quiet',
    note: 'Missing genre',
    albumArtist: 'Nils Frahm',
    trackNumber: '3',
    trackTotal: '12',
    discNumber: '1',
    discTotal: '1',
    date: '2018-01-26',
    originalDate: '2018-01-26',
    style: '',
    lastFmTags: '',
    lyrics: '',
    syncedLyrics: '',
    sidecarLrc: '',
    mbTrackId: 'mock-mbid-track-a-place',
    mbReleaseTrackId: 'mock-mbid-release-track-a-place',
    acoustId: 'mock-acoustid-a-place',
    isrc: 'mock-isrc-2018-0003',
    bpm: '65',
    key: 'C major',
    energy: 'Low',
    danceability: 'Very low',
    replayGainTrackGain: '-9.1 dB',
    replayGainTrackPeak: '0.95',
    replayGainAlbumGain: '-8.5 dB',
    replayGainAlbumPeak: '0.99',
    filePath: '/mock/music/Nils Frahm/All Melody/03 A Place.flac',
    fileFormat: 'FLAC',
    codec: 'FLAC',
    bitrate: '1411 kbps',
    sampleRate: '44.1 kHz',
    duration: '3:47',
  },
  {
    id: 'sunson',
    title: 'Sunson',
    artist: 'Nils Frahm',
    artistId: 'nils',
    album: 'All Melody',
    albumId: 'all-melody',
    year: '2018',
    genres: ['Ambient'],
    mood: 'Bright',
    note: '',
    albumArtist: 'Nils Frahm',
    trackNumber: '2',
    trackTotal: '12',
    discNumber: '1',
    discTotal: '1',
    date: '2018-01-26',
    originalDate: '2018-01-26',
    style: 'Ambient, Modern Classical',
    lastFmTags: 'ambient, piano, modern classical',
    lyrics: '',
    syncedLyrics: '',
    sidecarLrc: '',
    mbTrackId: 'mock-mbid-track-sunson',
    mbReleaseTrackId: 'mock-mbid-release-track-sunson',
    acoustId: 'mock-acoustid-sunson',
    isrc: 'mock-isrc-2018-0004',
    bpm: '88',
    key: 'F major',
    energy: 'Medium',
    danceability: 'Low',
    replayGainTrackGain: '-7.5 dB',
    replayGainTrackPeak: '0.99',
    replayGainAlbumGain: '-8.5 dB',
    replayGainAlbumPeak: '0.99',
    filePath: '/mock/music/Nils Frahm/All Melody/02 Sunson.flac',
    fileFormat: 'FLAC',
    codec: 'FLAC',
    bitrate: '1411 kbps',
    sampleRate: '44.1 kHz',
    duration: '6:12',
  },
  {
    id: 'hammers',
    title: 'Hammers',
    artist: 'Nils Frahm',
    artistId: 'nils',
    album: 'Spaces',
    albumId: 'spaces',
    year: '2013',
    genres: [],
    mood: 'Energetic',
    note: 'Missing genre',
    albumArtist: 'Nils Frahm',
    trackNumber: '3',
    trackTotal: '8',
    discNumber: '1',
    discTotal: '1',
    date: '2013-11-19',
    originalDate: '2013-11-19',
    style: '',
    lastFmTags: '',
    lyrics: '',
    syncedLyrics: '',
    sidecarLrc: '',
    mbTrackId: 'mock-mbid-track-hammers',
    mbReleaseTrackId: 'mock-mbid-release-track-hammers',
    acoustId: 'mock-acoustid-hammers',
    isrc: 'mock-isrc-2013-0005',
    bpm: '135',
    key: 'D minor',
    energy: 'High',
    danceability: 'Low',
    replayGainTrackGain: '-6.2 dB',
    replayGainTrackPeak: '0.99',
    replayGainAlbumGain: '-8.1 dB',
    replayGainAlbumPeak: '0.98',
    filePath: '/mock/music/Nils Frahm/Spaces/03 Hammers.flac',
    fileFormat: 'FLAC',
    codec: 'FLAC',
    bitrate: '1411 kbps',
    sampleRate: '44.1 kHz',
    duration: '4:55',
  },
  {
    id: 'my-friend',
    title: 'My Friend the Forest',
    artist: 'Nils Frahm',
    artistId: 'nils',
    album: 'All Melody',
    albumId: 'all-melody',
    year: '2018',
    genres: [],
    mood: 'Calm',
    note: 'Missing genre',
    albumArtist: 'Nils Frahm',
    trackNumber: '4',
    trackTotal: '12',
    discNumber: '1',
    discTotal: '1',
    date: '2018-01-26',
    originalDate: '2018-01-26',
    style: '',
    lastFmTags: '',
    lyrics: '',
    syncedLyrics: '',
    sidecarLrc: '',
    mbTrackId: 'mock-mbid-track-my-friend',
    mbReleaseTrackId: 'mock-mbid-release-track-my-friend',
    acoustId: 'mock-acoustid-my-friend',
    isrc: 'mock-isrc-2018-0006',
    bpm: '60',
    key: 'E minor',
    energy: 'Low',
    danceability: 'Very low',
    replayGainTrackGain: '-9.5 dB',
    replayGainTrackPeak: '0.94',
    replayGainAlbumGain: '-8.5 dB',
    replayGainAlbumPeak: '0.99',
    filePath: '/mock/music/Nils Frahm/All Melody/04 My Friend the Forest.flac',
    fileFormat: 'FLAC',
    codec: 'FLAC',
    bitrate: '1411 kbps',
    sampleRate: '44.1 kHz',
    duration: '5:21',
  },
]

export const reviewGroups: ReviewGroup[] = [
  {
    id: 'lyrics',
    icon: 'Music2',
    title: 'Missing lyrics',
    subtitle: '2 songs need lyrics',
    action: 'Start',
    accent: 'text-orange-300',
    items: [
      { id: 'lyrics-1', title: 'The Whole Universe Wants', artist: 'Nils Frahm', album: 'All Melody', type: 'lyrics', status: 'pending' },
      { id: 'lyrics-2', title: 'Says', artist: 'Nils Frahm', album: 'Spaces', type: 'lyrics', status: 'pending' },
    ],
    detail: 'Select items to fix or ignore.',
  },
  {
    id: 'covers',
    icon: 'Image',
    title: 'Better covers',
    subtitle: '4 albums need cover review',
    action: 'Choose',
    accent: 'text-violet-300',
    items: [
      { id: 'covers-1', title: 'All Melody', artist: 'Nils Frahm', type: 'covers', status: 'pending' },
      { id: 'covers-2', title: 'Spaces', artist: 'Nils Frahm', type: 'covers', status: 'pending' },
      { id: 'covers-3', title: 'Felt', artist: 'Nils Frahm', type: 'covers', status: 'pending' },
      { id: 'covers-4', title: 'Empty', artist: 'Nils Frahm', type: 'covers', status: 'pending' },
    ],
    detail: 'Compare current artwork with suggested covers before replacing anything.',
  },
  {
    id: 'genres',
    icon: 'Tags',
    title: 'Missing genres',
    subtitle: '3 songs need genres',
    action: 'Review',
    accent: 'text-lime-300',
    items: [
      { id: 'genres-1', title: 'A Place', artist: 'Nils Frahm', album: 'All Melody', type: 'genres', status: 'pending' },
      { id: 'genres-2', title: 'My Friend the Forest', artist: 'Nils Frahm', album: 'All Melody', type: 'genres', status: 'pending' },
      { id: 'genres-3', title: 'The Bells', artist: 'Nils Frahm', album: 'The Bells', type: 'genres', status: 'pending' },
    ],
    detail: 'Complete missing genres using album, artist and track context.',
  },
]

export const forgeReviewItems: ForgeReviewQueueItem[] = [
  {
    id: 'all-melody-review',
    title: 'All Melody',
    artist: 'Nils Frahm',
    type: 'covers',
    section: 'all',
    proposalStatus: 'Review',
    proposedFixes: 5,
    safeCount: 3,
    reviewCount: 2,
    chips: ['Artwork', 'Tags', 'Identity'],
    extraCount: 2,
    gradient: 'from-stone-950 via-stone-800 to-orange-200',
  },
  {
    id: 'whole-universe-review',
    title: 'The Whole Universe Wants',
    artist: 'Nils Frahm',
    album: 'All Melody',
    type: 'lyrics',
    section: 'all',
    proposalStatus: 'Review',
    proposedFixes: 2,
    safeCount: 1,
    reviewCount: 1,
    chips: ['Lyrics', 'Style'],
    gradient: 'from-neutral-200 via-stone-400 to-stone-700',
  },
  {
    id: 'a-place-review',
    title: 'A Place',
    artist: 'Hammock',
    album: 'All Melody',
    type: 'genres',
    section: 'all',
    proposalStatus: 'Review',
    proposedFixes: 4,
    safeCount: 2,
    reviewCount: 2,
    chips: ['Genre', 'Mood', 'MBID'],
    extraCount: 1,
    gradient: 'from-stone-300 via-neutral-500 to-neutral-950',
  },
]

export const forgeArtworkReviewItems: ForgeReviewQueueItem[] = [
  {
    id: 'artwork-all-melody',
    title: 'All Melody',
    artist: 'Nils Frahm',
    type: 'covers',
    section: 'artwork',
    proposalStatus: 'Review',
    current: 'Current cover: 320 x 320',
    suggested: 'Suggested: 1400 x 1400',
    actionLabel: 'Apply artwork',
    chips: ['Album cover'],
    gradient: 'from-stone-950 via-stone-800 to-orange-200',
  },
  {
    id: 'artwork-spaces',
    title: 'Spaces',
    artist: 'Nils Frahm',
    type: 'covers',
    section: 'artwork',
    proposalStatus: 'Review',
    current: 'No cover found',
    suggested: 'Suggested artwork available',
    actionLabel: 'Apply artwork',
    chips: ['Missing cover'],
    gradient: 'from-neutral-800 via-neutral-700 to-neutral-950',
  },
  {
    id: 'artwork-felt',
    title: 'Felt',
    artist: 'Nils Frahm',
    type: 'covers',
    section: 'artwork',
    proposalStatus: 'Review',
    current: 'Current cover: 600 x 600',
    suggested: 'Low resolution',
    actionLabel: 'Apply artwork',
    chips: ['Low resolution'],
    gradient: 'from-neutral-500 via-stone-700 to-neutral-950',
  },
  {
    id: 'artwork-tripping',
    title: 'Tripping With Nils Frahm',
    artist: 'Nils Frahm',
    type: 'covers',
    section: 'artwork',
    proposalStatus: 'Safe',
    current: 'Current cover: 800 x 800',
    suggested: 'Suggested: 1600 x 1600',
    actionLabel: 'Apply artwork',
    chips: ['Album cover'],
    gradient: 'from-stone-200 via-zinc-500 to-stone-900',
  },
]

export const forgeLyricsReviewItems: ForgeReviewQueueItem[] = [
  {
    id: 'lyrics-whole-universe',
    title: 'The Whole Universe Wants',
    artist: 'Nils Frahm',
    album: 'All Melody',
    type: 'lyrics',
    section: 'lyrics',
    proposalStatus: 'Review',
    current: 'No lyrics found',
    suggested: 'Suggested plain lyrics available',
    actionLabel: 'Apply lyrics',
    chips: ['Missing'],
    gradient: 'from-purple-950 via-purple-700 to-stone-900',
  },
  {
    id: 'lyrics-says',
    title: 'Says',
    artist: 'Nils Frahm',
    album: 'Spaces',
    type: 'lyrics',
    section: 'lyrics',
    proposalStatus: 'Review',
    current: 'Lyrics incomplete',
    suggested: 'Missing final section',
    actionLabel: 'Review lyrics',
    chips: ['Incomplete'],
    gradient: 'from-purple-950 via-purple-700 to-stone-900',
  },
  {
    id: 'lyrics-a-place',
    title: 'A Place',
    artist: 'Hammock',
    album: 'All Melody',
    type: 'lyrics',
    section: 'lyrics',
    proposalStatus: 'Review',
    current: 'Unsynced lyrics',
    suggested: 'Synced LRC available',
    actionLabel: 'Apply synced',
    chips: ['Unsynced'],
    gradient: 'from-purple-950 via-purple-700 to-stone-900',
  },
  {
    id: 'lyrics-music-for-animals',
    title: 'Music for Animals',
    artist: 'Nils Frahm',
    type: 'lyrics',
    section: 'lyrics',
    proposalStatus: 'Safe',
    current: 'No lyrics found',
    suggested: 'Suggested plain lyrics available',
    actionLabel: 'Apply lyrics',
    chips: ['Missing'],
    gradient: 'from-purple-950 via-purple-700 to-stone-900',
  },
]

export const forgeMetadataReviewItems: ForgeReviewQueueItem[] = [
  {
    id: 'metadata-tags-all-melody',
    title: 'All Melody',
    artist: 'Nils Frahm',
    type: 'genres',
    section: 'metadata',
    metadataFilter: 'tags',
    proposalStatus: 'Safe',
    current: 'Current: Genre Classical, Mood empty, Style empty',
    suggested: 'Suggested: Modern Classical, Ambient, Minimal, Introspective',
    detail: 'Tags + Style',
    actionLabel: 'Apply tags',
    chips: ['Tags'],
    gradient: 'from-emerald-950 via-lime-800 to-stone-950',
  },
  {
    id: 'metadata-tags-a-place',
    title: 'A Place',
    artist: 'Hammock',
    type: 'genres',
    section: 'metadata',
    metadataFilter: 'tags',
    proposalStatus: 'Safe',
    current: 'Current: Genre empty, Mood empty',
    suggested: 'Suggested: Post-rock, Ambient, Instrumental, Calm, Melancholic',
    detail: 'Genre + Mood',
    actionLabel: 'Apply tags',
    chips: ['Tags'],
    gradient: 'from-emerald-950 via-lime-800 to-stone-950',
  },
  {
    id: 'metadata-identity-all-melody',
    title: 'All Melody',
    artist: 'Nils Frahm',
    type: 'genres',
    section: 'metadata',
    metadataFilter: 'identity',
    proposalStatus: 'Protected',
    current: 'Album MBID found',
    suggested: 'Confidence: 96%',
    detail: 'Protected identity field',
    actionLabel: 'Apply identity',
    chips: ['Identity'],
    gradient: 'from-blue-950 via-slate-800 to-stone-950',
  },
  {
    id: 'metadata-release-all-melody',
    title: 'All Melody',
    artist: 'Nils Frahm',
    type: 'genres',
    section: 'metadata',
    metadataFilter: 'release',
    proposalStatus: 'Safe',
    current: 'Release data',
    suggested: 'Label, country and catalog found',
    actionLabel: 'Apply release data',
    chips: ['Release'],
    gradient: 'from-amber-950 via-yellow-700 to-stone-950',
  },
  {
    id: 'metadata-audio-says',
    title: 'Says',
    artist: 'Nils Frahm',
    type: 'genres',
    section: 'metadata',
    metadataFilter: 'audio',
    proposalStatus: 'Safe',
    current: 'Audio analysis',
    suggested: 'BPM, key and ReplayGain available',
    actionLabel: 'Apply audio data',
    chips: ['Audio'],
    gradient: 'from-teal-950 via-teal-800 to-stone-950',
  },
  {
    id: 'metadata-conflict-sunson',
    title: 'Sunson',
    artist: 'Nils Frahm',
    type: 'genres',
    section: 'metadata',
    metadataFilter: 'identity',
    proposalStatus: 'Conflict',
    current: 'Two MusicBrainz matches',
    suggested: 'Manual match selection required',
    detail: 'Match conflict',
    actionLabel: 'Choose match',
    chips: ['Identity'],
    gradient: 'from-blue-950 via-slate-800 to-stone-950',
  },
]

export const forgeAllReviewItems = [
  ...forgeReviewItems,
  ...forgeArtworkReviewItems,
  ...forgeLyricsReviewItems,
  ...forgeMetadataReviewItems,
]

export const activityItems: ActivityItem[] = [
  {
    id: 'lyrics-added',
    title: 'Lyrics added',
    subtitle: '2 tracks updated',
    time: '9:30 AM',
    icon: 'CheckCircle2',
    accent: 'text-emerald-300',
    bgAccent: 'bg-emerald-400/13',
    summary: ['The Whole Universe Wants', 'Says'],
    detail: 'Lyrics were added after preview. No other metadata changed.',
    activityType: 'lyrics',
    dateGroup: 'today',
    affectedCount: 2,
    affectedItems: ['The Whole Universe Wants', 'Says'],
    changedFields: ['Plain lyrics', 'Synced lyrics'],
    provider: 'Lyrics mock',
    status: 'completed',
    relatedReviewTarget: 'lyrics',
  },
  {
    id: 'covers-improved',
    title: 'Covers improved',
    subtitle: '4 albums updated',
    time: '8:45 AM',
    icon: 'Image',
    accent: 'text-violet-300',
    bgAccent: 'bg-violet-400/13',
    summary: ['All Melody', 'Spaces', 'Felt', 'Empty'],
    detail: 'Higher quality artwork was selected for each album.',
    activityType: 'artwork',
    dateGroup: 'today',
    affectedCount: 4,
    affectedItems: ['All Melody', 'Spaces', 'Felt', 'Empty'],
    changedFields: ['Cover image', 'Resolution upgrade'],
    provider: 'Discogs',
    status: 'completed',
    relatedReviewTarget: 'artwork',
  },
  {
    id: 'tags-applied',
    title: 'Tags applied',
    subtitle: '3 songs updated',
    time: '8:10 AM',
    icon: 'Tags',
    accent: 'text-amber-300',
    bgAccent: 'bg-amber-400/13',
    summary: ['A Place', 'Says', 'Music for Animals'],
    detail: 'Missing genre, mood and style fields were completed from Last.fm suggestions.',
    activityType: 'tags',
    dateGroup: 'today',
    affectedCount: 3,
    affectedItems: ['A Place', 'Says', 'Music for Animals'],
    changedFields: ['Genre', 'Mood', 'Style'],
    provider: 'Last.fm',
    status: 'completed',
    relatedReviewTarget: 'metadata/tags',
  },
  {
    id: 'identity-applied',
    title: 'Identity applied',
    subtitle: '1 album identity updated',
    time: '7:45 AM',
    icon: 'CheckCircle2',
    accent: 'text-sky-300',
    bgAccent: 'bg-sky-400/13',
    summary: ['All Melody'],
    detail: 'Protected identity fields were updated after explicit confirmation.',
    activityType: 'identity',
    dateGroup: 'today',
    affectedCount: 1,
    affectedItems: ['All Melody'],
    changedFields: ['Album MBID', 'Release Group MBID'],
    provider: 'MusicBrainz',
    status: 'completed',
    relatedReviewTarget: 'metadata/identity',
  },
  {
    id: 'release-data',
    title: 'Release metadata updated',
    subtitle: '1 album updated',
    time: '7:20 AM',
    icon: 'CheckCircle2',
    accent: 'text-orange-300',
    bgAccent: 'bg-orange-400/13',
    summary: ['All Melody'],
    detail: 'Label, country, catalog number and barcode were updated from Discogs.',
    activityType: 'release',
    dateGroup: 'today',
    affectedCount: 1,
    affectedItems: ['All Melody'],
    changedFields: ['Label', 'Country', 'Catalog number', 'Barcode'],
    provider: 'Discogs',
    status: 'completed',
    relatedReviewTarget: 'metadata/release',
  },
  {
    id: 'audio-data',
    title: 'Audio analysis applied',
    subtitle: '1 track updated',
    time: '7:15 AM',
    icon: 'Music2',
    accent: 'text-teal-300',
    bgAccent: 'bg-teal-400/13',
    summary: ['Says'],
    detail: 'BPM, key, energy and danceability were updated from mock audio analysis.',
    activityType: 'audio',
    dateGroup: 'today',
    affectedCount: 1,
    affectedItems: ['Says'],
    changedFields: ['BPM', 'Key', 'Energy', 'Danceability'],
    provider: 'Audio analysis mock',
    status: 'completed',
    relatedReviewTarget: 'metadata/audio',
  },
  {
    id: 'library-check',
    title: 'Library checked',
    subtitle: 'Everything looks good',
    time: 'Yesterday',
    icon: 'Check',
    accent: 'text-orange-300',
    bgAccent: 'bg-orange-400/13',
    summary: ['No pending critical changes'],
    detail: 'Forge scanned the mock library and left everything unchanged.',
    activityType: 'libraryCheck',
    dateGroup: 'yesterday',
    affectedCount: 0,
    affectedItems: ['No pending critical changes'],
    provider: 'Forge mock',
    status: 'completed',
    relatedReviewTarget: 'all',
  },
  {
    id: 'library-edit',
    title: 'Manual metadata edit',
    subtitle: '1 track edited',
    time: 'Yesterday',
    icon: 'CheckCircle2',
    accent: 'text-emerald-300',
    bgAccent: 'bg-emerald-400/13',
    summary: ['My Friend the Forest'],
    detail: 'Title, genre and lyrics were edited manually in the library metadata editor.',
    activityType: 'libraryEdit',
    dateGroup: 'yesterday',
    affectedCount: 1,
    affectedItems: ['My Friend the Forest'],
    changedFields: ['Title', 'Genre', 'Lyrics'],
    provider: 'Manual',
    status: 'completed',
    relatedLibraryTarget: 'track',
  },
]
