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
}

export interface MockArtist {
  id: string
  name: string
  subtitle: string
  note: string
  genres: string[]
  mood: string
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

export interface ActivityItem {
  id: string
  title: string
  subtitle: string
  time: string
  icon: 'CheckCircle2' | 'Image' | 'Tags' | 'Clock3' | 'Check'
  accent: string
  bgAccent: string
  summary: string[]
  detail: string
}

export const artistData: MockArtist[] = [
  {
    id: 'nils',
    name: 'Nils Frahm',
    subtitle: '6 albums',
    note: '2 items need attention',
    genres: ['Modern Classical', 'Ambient'],
    mood: 'Introspective',
  },
  {
    id: 'vola',
    name: 'VOLA',
    subtitle: '4 albums',
    note: '',
    genres: ['Progressive Metal'],
    mood: 'Dense',
  },
  {
    id: 'chon',
    name: 'CHON',
    subtitle: '3 albums',
    note: '',
    genres: ['Math Rock'],
    mood: 'Bright',
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
  },
  {
    id: 'genres-completed',
    title: 'Genres completed',
    subtitle: '3 songs updated',
    time: '7:15 AM',
    icon: 'Tags',
    accent: 'text-amber-300',
    bgAccent: 'bg-amber-400/13',
    summary: ['A Place', 'My Friend the Forest', 'The Bells'],
    detail: 'Missing genre fields were completed from trusted matches.',
  },
  {
    id: 'still-review',
    title: 'Library checked',
    subtitle: 'Everything looks good',
    time: 'Yesterday',
    icon: 'Check',
    accent: 'text-orange-300',
    bgAccent: 'bg-orange-400/13',
    summary: ['No pending critical changes'],
    detail: 'Forge scanned the mock library and left everything unchanged.',
  },
]
