export type NavidromeSettingCategory =
  | 'basics'
  | 'network'
  | 'scanner'
  | 'artwork'
  | 'playback'
  | 'features'
  | 'integrations'
  | 'security'
  | 'backup'
  | 'advanced'

export type NavidromeSettingType =
  | 'text'
  | 'number'
  | 'boolean'
  | 'select'
  | 'duration'
  | 'size'
  | 'path'
  | 'secret'
  | 'list'

export type NavidromeSafetyLevel = 'safe' | 'caution' | 'sensitive' | 'advanced'

export type NavidromeConfigOption = {
  key: string
  envVar: string | null
  label: string
  description: string
  category: NavidromeSettingCategory
  type: NavidromeSettingType
  defaultValue: string | number | boolean
  mockValue: string | number | boolean
  options?: string[]
  safetyLevel: NavidromeSafetyLevel
  restartRequired: boolean
  configFileOnly?: boolean
  notes: string
  docsUrl: string
}

export const navidromeSettingCategories: {
  key: NavidromeSettingCategory
  label: string
  shortLabel: string
  description: string
}[] = [
  { key: 'basics', label: 'Basics', shortLabel: 'Basics', description: 'Core identity, folders, logs, and privacy.' },
  { key: 'network', label: 'Network', shortLabel: 'Net', description: 'Bind address, proxy, share, and TLS settings.' },
  { key: 'scanner', label: 'Library Scanner', shortLabel: 'Scanner', description: 'Automatic library scan cadence and behavior.' },
  { key: 'artwork', label: 'Artwork & Metadata', shortLabel: 'Artwork', description: 'Artwork, lyric, sort-tag, and metadata preferences.' },
  { key: 'playback', label: 'Playback & Transcoding', shortLabel: 'Playback', description: 'FFmpeg, transcoding cache, replay gain, and UI playback defaults.' },
  { key: 'features', label: 'Features', shortLabel: 'Features', description: 'Downloads, sharing, ratings, scrobble history, and public defaults.' },
  { key: 'integrations', label: 'Integrations', shortLabel: 'Integrations', description: 'External metadata agents and masked provider credentials.' },
  { key: 'security', label: 'Security & Auth', shortLabel: 'Security', description: 'Rate limits, session timeout, redaction, external auth, and path exposure.' },
  { key: 'backup', label: 'Backup & Monitoring', shortLabel: 'Backup', description: 'Backup schedule and Prometheus endpoint settings.' },
  { key: 'advanced', label: 'Advanced', shortLabel: 'Advanced', description: 'Search, TOML review, environment mapping, dry-run, apply, and reset.' },
]

const docsBase = 'https://www.navidrome.org/docs/usage/configuration/options/'

export const navidromeConfigCatalog: NavidromeConfigOption[] = [
  {
    key: 'ServerName',
    envVar: null,
    label: 'Server name',
    description: 'Display name for this Navidrome profile.',
    category: 'basics',
    type: 'text',
    defaultValue: 'Navidrome',
    mockValue: 'Navidrome',
    safetyLevel: 'safe',
    restartRequired: false,
    configFileOnly: true,
    notes: 'Anchor UI display metadata, not a Navidrome option.',
    docsUrl: docsBase,
  },
  {
    key: 'MusicFolder',
    envVar: 'ND_MUSICFOLDER',
    label: 'MusicFolder',
    description: 'Folder where the music library is stored.',
    category: 'basics',
    type: 'path',
    defaultValue: './music',
    mockValue: '<library>/Music/Naqlen',
    safetyLevel: 'caution',
    restartRequired: true,
    notes: 'Future app must validate through Anchor Core path safety before apply.',
    docsUrl: docsBase,
  },
  {
    key: 'DataFolder',
    envVar: 'ND_DATAFOLDER',
    label: 'DataFolder',
    description: 'Folder for Navidrome application data and database.',
    category: 'basics',
    type: 'path',
    defaultValue: './data',
    mockValue: '<anchor-workspace>/navidrome/data',
    safetyLevel: 'caution',
    restartRequired: true,
    notes: 'Path placeholder.',
    docsUrl: docsBase,
  },
  {
    key: 'CacheFolder',
    envVar: 'ND_CACHEFOLDER',
    label: 'CacheFolder',
    description: 'Folder for transcoding and image cache data.',
    category: 'basics',
    type: 'path',
    defaultValue: '<DataFolder>/cache',
    mockValue: '<anchor-workspace>/navidrome/cache',
    safetyLevel: 'caution',
    restartRequired: true,
    notes: 'Path fields stay sanitized and display-only in this repo.',
    docsUrl: docsBase,
  },
  {
    key: 'LogLevel',
    envVar: 'ND_LOGLEVEL',
    label: 'LogLevel',
    description: 'Log verbosity for troubleshooting.',
    category: 'basics',
    type: 'select',
    defaultValue: 'info',
    mockValue: 'info',
    options: ['error', 'warn', 'info', 'debug', 'trace'],
    safetyLevel: 'safe',
    restartRequired: true,
    notes: 'Trace/debug should be temporary.',
    docsUrl: docsBase,
  },
  {
    key: 'EnableInsightsCollector',
    envVar: 'ND_ENABLEINSIGHTSCOLLECTOR',
    label: 'EnableInsightsCollector',
    description: 'Controls Navidrome anonymous data collection.',
    category: 'basics',
    type: 'boolean',
    defaultValue: true,
    mockValue: false,
    safetyLevel: 'caution',
    restartRequired: true,
    notes: 'Privacy-sensitive; disabled by default.',
    docsUrl: 'https://www.navidrome.org/docs/usage/admin/insights/',
  },
  {
    key: 'Address',
    envVar: 'ND_ADDRESS',
    label: 'Address',
    description: 'Address the server would bind to.',
    category: 'network',
    type: 'text',
    defaultValue: '0.0.0.0',
    mockValue: '0.0.0.0',
    safetyLevel: 'advanced',
    restartRequired: true,
    notes: 'Future Core validation must reject unsafe addresses.',
    docsUrl: docsBase,
  },
  {
    key: 'Port',
    envVar: 'ND_PORT',
    label: 'Port',
    description: 'HTTP port Navidrome listens to.',
    category: 'network',
    type: 'number',
    defaultValue: 4533,
    mockValue: 4533,
    safetyLevel: 'safe',
    restartRequired: true,
    notes: 'Mock-only numeric input; the app does not probe ports.',
    docsUrl: docsBase,
  },
  {
    key: 'BaseUrl',
    envVar: 'ND_BASEURL',
    label: 'BaseUrl',
    description: 'Base URL for reverse proxy deployments.',
    category: 'network',
    type: 'text',
    defaultValue: '',
    mockValue: '/music',
    safetyLevel: 'safe',
    restartRequired: true,
    notes: 'Supports relative path or URL in Navidrome.',
    docsUrl: docsBase,
  },
  {
    key: 'ShareURL',
    envVar: 'ND_SHAREURL',
    label: 'ShareURL',
    description: 'Public base URL used for shared links.',
    category: 'network',
    type: 'text',
    defaultValue: '',
    mockValue: 'https://music.example.invalid',
    safetyLevel: 'caution',
    restartRequired: true,
    notes: 'Can affect links exposed outside the local network.',
    docsUrl: docsBase,
  },
  {
    key: 'TLSCert', envVar: 'ND_TLSCERT', label: 'TLSCert', description: 'Path to TLS certificate chain.', category: 'network', type: 'path', defaultValue: '', mockValue: '<anchor-workspace>/certs/navidrome.crt', safetyLevel: 'caution', restartRequired: true, notes: 'Future Core must validate certificate paths before apply.', docsUrl: docsBase,
  },
  {
    key: 'TLSKey', envVar: 'ND_TLSKEY', label: 'TLSKey', description: 'Path to TLS private key.', category: 'network', type: 'secret', defaultValue: '', mockValue: 'masked-secret-value', safetyLevel: 'sensitive', restartRequired: true, notes: 'Sensitive values are masked.', docsUrl: docsBase,
  },
  {
    key: 'UnixSocketPerm', envVar: 'ND_UNIXSOCKETPERM', label: 'UnixSocketPerm', description: 'File permissions for Unix socket mode.', category: 'network', type: 'text', defaultValue: '0660', mockValue: '0660', safetyLevel: 'advanced', restartRequired: true, notes: 'Relevant only when binding to a Unix socket.', docsUrl: docsBase,
  },
  {
    key: 'Scanner.Enabled', envVar: 'ND_SCANNER_ENABLED', label: 'Scanner.Enabled', description: 'Enable automatic library scanning.', category: 'scanner', type: 'boolean', defaultValue: true, mockValue: true, safetyLevel: 'safe', restartRequired: true, notes: 'Scanner setting.', docsUrl: docsBase,
  },
  {
    key: 'Scanner.Schedule', envVar: 'ND_SCANNER_SCHEDULE', label: 'Scanner.Schedule', description: 'Cron or duration schedule for automatic scans.', category: 'scanner', type: 'duration', defaultValue: '0', mockValue: '@every 24h', safetyLevel: 'safe', restartRequired: true, notes: 'Scanner schedule.', docsUrl: docsBase,
  },
  {
    key: 'Scanner.ScanOnStartup', envVar: 'ND_SCANNER_SCANONSTARTUP', label: 'Scanner.ScanOnStartup', description: 'Scan the library when Navidrome starts.', category: 'scanner', type: 'boolean', defaultValue: true, mockValue: true, safetyLevel: 'safe', restartRequired: true, notes: 'Future app should show restart implications.', docsUrl: docsBase,
  },
  {
    key: 'Scanner.WatcherWait', envVar: 'ND_SCANNER_WATCHERWAIT', label: 'Scanner.WatcherWait', description: 'Delay after filesystem changes before scanning.', category: 'scanner', type: 'duration', defaultValue: '5s', mockValue: '5s', safetyLevel: 'safe', restartRequired: true, notes: 'Duration string uses Navidrome syntax.', docsUrl: docsBase,
  },
  {
    key: 'Scanner.FollowSymlinks', envVar: 'ND_SCANNER_FOLLOWSYMLINKS', label: 'Scanner.FollowSymlinks', description: 'Follow symlinks while scanning directories.', category: 'scanner', type: 'boolean', defaultValue: true, mockValue: false, safetyLevel: 'caution', restartRequired: true, notes: 'Symlinks can escape intended library boundaries without Core path policy.', docsUrl: docsBase,
  },
  {
    key: 'Scanner.PurgeMissing', envVar: 'ND_SCANNER_PURGEMISSING', label: 'Scanner.PurgeMissing', description: 'When missing files are purged from the database.', category: 'scanner', type: 'select', defaultValue: 'never', mockValue: 'never', options: ['never', 'always', 'full'], safetyLevel: 'caution', restartRequired: true, notes: 'Deletion-like behavior should remain deliberate.', docsUrl: docsBase,
  },
  {
    key: 'Scanner.ArtistJoiner', envVar: 'ND_SCANNER_ARTISTJOINER', label: 'Scanner.ArtistJoiner', description: 'Text used to join multiple display artists.', category: 'scanner', type: 'text', defaultValue: ' • ', mockValue: ' • ', safetyLevel: 'safe', restartRequired: true, notes: 'Display preference only.', docsUrl: docsBase,
  },
  {
    key: 'PlaylistsPath', envVar: 'ND_PLAYLISTSPATH', label: 'PlaylistsPath', description: 'Relative folders/globs where playlists are imported.', category: 'scanner', type: 'list', defaultValue: '', mockValue: 'Playlists', safetyLevel: 'caution', restartRequired: true, notes: 'Navidrome requires paths relative to MusicFolder.', docsUrl: docsBase,
  },
  {
    key: 'CoverArtPriority', envVar: 'ND_COVERARTPRIORITY', label: 'CoverArtPriority', description: 'Priority order for album cover sources.', category: 'artwork', type: 'list', defaultValue: 'cover.*, folder.*, front.*, embedded, external', mockValue: 'cover.*, folder.*, front.*, embedded, external', safetyLevel: 'safe', restartRequired: true, notes: 'Curated list input.', docsUrl: docsBase,
  },
  {
    key: 'ArtistArtPriority', envVar: 'ND_ARTISTARTPRIORITY', label: 'ArtistArtPriority', description: 'Priority order for artist images.', category: 'artwork', type: 'list', defaultValue: 'artist.*, album/artist.*, external', mockValue: 'artist.*, album/artist.*, external', safetyLevel: 'safe', restartRequired: true, notes: 'External entries depend on integrations.', docsUrl: docsBase,
  },
  {
    key: 'ArtistImageFolder', envVar: 'ND_ARTISTIMAGEFOLDER', label: 'ArtistImageFolder', description: 'Central folder for artist image lookups.', category: 'artwork', type: 'path', defaultValue: '', mockValue: '<library>/Artists', safetyLevel: 'caution', restartRequired: true, notes: 'Path safety validation required.', docsUrl: docsBase,
  },
  {
    key: 'CoverArtQuality', envVar: 'ND_COVERARTQUALITY', label: 'CoverArtQuality', description: 'Quality percentage for resized WebP cover art.', category: 'artwork', type: 'number', defaultValue: 75, mockValue: 82, safetyLevel: 'safe', restartRequired: true, notes: 'Number input.', docsUrl: docsBase,
  },
  {
    key: 'EnableArtworkPrecache', envVar: 'ND_ENABLEARTWORKPRECACHE', label: 'EnableArtworkPrecache', description: 'Pre-cache artwork for newly added music.', category: 'artwork', type: 'boolean', defaultValue: true, mockValue: true, safetyLevel: 'safe', restartRequired: true, notes: 'Artwork cache preference.', docsUrl: docsBase,
  },
  {
    key: 'EnableArtworkUpload', envVar: 'ND_ENABLEARTWORKUPLOAD', label: 'EnableArtworkUpload', description: 'Allow artwork upload in the web UI.', category: 'artwork', type: 'boolean', defaultValue: true, mockValue: true, safetyLevel: 'caution', restartRequired: true, notes: 'Future UI must preserve permissions and upload boundaries.', docsUrl: docsBase,
  },
  {
    key: 'LyricsPriority', envVar: 'ND_LYRICSPRIORITY', label: 'LyricsPriority', description: 'Order and sources for lyrics lookup.', category: 'artwork', type: 'list', defaultValue: '.lrc,.txt,embedded', mockValue: '.lrc,.txt,embedded', safetyLevel: 'safe', restartRequired: true, notes: 'Lyrics source order.', docsUrl: docsBase,
  },
  {
    key: 'PreferSortTags', envVar: 'ND_PREFERSORTTAGS', label: 'PreferSortTags', description: 'Use Sort_* tags for UI sorting.', category: 'artwork', type: 'boolean', defaultValue: false, mockValue: true, safetyLevel: 'safe', restartRequired: true, notes: 'Metadata display behavior.', docsUrl: docsBase,
  },
  {
    key: 'RecentlyAddedByModTime', envVar: 'ND_RECENTLYADDEDBYMODTIME', label: 'RecentlyAddedByModTime', description: 'Use file modification time for recently added sorting.', category: 'artwork', type: 'boolean', defaultValue: false, mockValue: false, safetyLevel: 'safe', restartRequired: true, notes: 'No files are inspected by this UI.', docsUrl: docsBase,
  },
  {
    key: 'FFmpegPath', envVar: 'ND_FFMPEGPATH', label: 'FFmpegPath', description: 'Path to ffmpeg executable.', category: 'playback', type: 'path', defaultValue: '', mockValue: '<system-path>/ffmpeg', safetyLevel: 'caution', restartRequired: true, notes: 'Executable paths are restricted in Anchor Core and require validation.', docsUrl: docsBase,
  },
  {
    key: 'TranscodingCacheSize', envVar: 'ND_TRANSCODINGCACHESIZE', label: 'TranscodingCacheSize', description: 'Size of the transcoding cache.', category: 'playback', type: 'size', defaultValue: '100MB', mockValue: '150MiB', safetyLevel: 'safe', restartRequired: true, notes: 'Navidrome supports size strings such as 150MiB.', docsUrl: docsBase,
  },
  {
    key: 'DefaultDownsamplingFormat', envVar: 'ND_DEFAULTDOWNSAMPLINGFORMAT', label: 'DefaultDownsamplingFormat', description: 'Default format for client downsampling requests.', category: 'playback', type: 'select', defaultValue: 'opus', mockValue: 'opus', options: ['opus', 'mp3', 'aac'], safetyLevel: 'safe', restartRequired: true, notes: 'Curated common formats.', docsUrl: docsBase,
  },
  {
    key: 'EnableTranscodingConfig', envVar: 'ND_ENABLETRANSCODINGCONFIG', label: 'EnableTranscodingConfig', description: 'Enable transcoding configuration in the UI.', category: 'playback', type: 'boolean', defaultValue: false, mockValue: false, safetyLevel: 'caution', restartRequired: true, notes: 'Can expose advanced server behavior to users.', docsUrl: docsBase,
  },
  {
    key: 'EnableTranscodingCancellation', envVar: 'ND_ENABLETRANSCODINGCANCELLATION', label: 'EnableTranscodingCancellation', description: 'Cancel transcoding when clients disconnect.', category: 'playback', type: 'boolean', defaultValue: false, mockValue: true, safetyLevel: 'safe', restartRequired: true, notes: 'Resource-saving runtime behavior.', docsUrl: docsBase,
  },
  {
    key: 'DefaultUIVolume', envVar: 'ND_DEFAULTUIVOLUME', label: 'DefaultUIVolume', description: 'Default UI volume for new browser sessions.', category: 'playback', type: 'number', defaultValue: 100, mockValue: 72, safetyLevel: 'safe', restartRequired: true, notes: 'Expected range is 0 to 100.', docsUrl: docsBase,
  },
  {
    key: 'EnableReplayGain', envVar: 'ND_ENABLEREPLAYGAIN', label: 'EnableReplayGain', description: 'Enable ReplayGain options in the UI.', category: 'playback', type: 'boolean', defaultValue: true, mockValue: true, safetyLevel: 'safe', restartRequired: true, notes: 'Playback preference.', docsUrl: docsBase,
  },
  {
    key: 'EnableCoverAnimation', envVar: 'ND_ENABLECOVERANIMATION', label: 'EnableCoverAnimation', description: 'Animate album art in the player UI.', category: 'playback', type: 'boolean', defaultValue: true, mockValue: true, safetyLevel: 'safe', restartRequired: true, notes: 'Visual preference.', docsUrl: docsBase,
  },
  {
    key: 'EnableDownloads', envVar: 'ND_ENABLEDOWNLOADS', label: 'EnableDownloads', description: 'Enable downloading music from the server UI.', category: 'features', type: 'boolean', defaultValue: true, mockValue: false, safetyLevel: 'caution', restartRequired: true, notes: 'Controls whether users can export media from Navidrome.', docsUrl: docsBase,
  },
  {
    key: 'EnableSharing', envVar: 'ND_ENABLESHARING', label: 'EnableSharing', description: 'Enable public share links.', category: 'features', type: 'boolean', defaultValue: false, mockValue: false, safetyLevel: 'caution', restartRequired: true, notes: 'Can expose content through public links.', docsUrl: docsBase,
  },
  {
    key: 'EnableFavourites', envVar: 'ND_ENABLEFAVOURITES', label: 'EnableFavourites', description: 'Enable loved/starred interactions.', category: 'features', type: 'boolean', defaultValue: true, mockValue: true, safetyLevel: 'safe', restartRequired: true, notes: 'UI feature toggle.', docsUrl: docsBase,
  },
  {
    key: 'EnableStarRating', envVar: 'ND_ENABLESTARRATING', label: 'EnableStarRating', description: 'Enable five-star ratings.', category: 'features', type: 'boolean', defaultValue: true, mockValue: true, safetyLevel: 'safe', restartRequired: true, notes: 'UI feature toggle.', docsUrl: docsBase,
  },
  {
    key: 'EnableNowPlaying', envVar: 'ND_ENABLENOWPLAYING', label: 'EnableNowPlaying', description: 'Track currently playing songs.', category: 'features', type: 'boolean', defaultValue: true, mockValue: true, safetyLevel: 'caution', restartRequired: true, notes: 'Now Playing can expose listening activity.', docsUrl: docsBase,
  },
  {
    key: 'EnableScrobbleHistory', envVar: 'ND_ENABLESCROBBLEHISTORY', label: 'EnableScrobbleHistory', description: 'Enable scrobble history.', category: 'features', type: 'boolean', defaultValue: true, mockValue: true, safetyLevel: 'caution', restartRequired: true, notes: 'Listening history may be sensitive.', docsUrl: docsBase,
  },
  {
    key: 'DefaultPlaylistPublicVisibility', envVar: 'ND_DEFAULTPLAYLISTPUBLICVISIBILITY', label: 'DefaultPlaylistPublicVisibility', description: 'Set imported playlists public by default.', category: 'features', type: 'boolean', defaultValue: false, mockValue: false, safetyLevel: 'caution', restartRequired: true, notes: 'Public defaults should remain explicit.', docsUrl: docsBase,
  },
  {
    key: 'DefaultDownloadableShare', envVar: 'ND_DEFAULTDOWNLOADABLESHARE', label: 'DefaultDownloadableShare', description: 'New shares are downloadable by default.', category: 'features', type: 'boolean', defaultValue: false, mockValue: false, safetyLevel: 'caution', restartRequired: true, notes: 'Pairs with sharing and downloads risk.', docsUrl: docsBase,
  },
  {
    key: 'DefaultShareExpiration', envVar: 'ND_DEFAULTSHAREEXPIRATION', label: 'DefaultShareExpiration', description: 'Default duration for new public shares.', category: 'features', type: 'duration', defaultValue: '8760h', mockValue: '168h', safetyLevel: 'caution', restartRequired: true, notes: 'Shorter defaults reduce exposure.', docsUrl: docsBase,
  },
  {
    key: 'Agents', envVar: 'ND_AGENTS', label: 'Agents', description: 'Metadata agents priority list.', category: 'integrations', type: 'list', defaultValue: 'deezer,lastfm,listenbrainz', mockValue: 'deezer,lastfm,listenbrainz', safetyLevel: 'advanced', restartRequired: true, notes: 'Only enabled and configured agents are used.', docsUrl: docsBase,
  },
  {
    key: 'LastFM.Enabled', envVar: 'ND_LASTFM_ENABLED', label: 'LastFM.Enabled', description: 'Enable Last.fm integration.', category: 'integrations', type: 'boolean', defaultValue: true, mockValue: false, safetyLevel: 'caution', restartRequired: true, notes: 'External service integration.', docsUrl: docsBase,
  },
  {
    key: 'LastFM.ApiKey', envVar: 'ND_LASTFM_APIKEY', label: 'LastFM.ApiKey', description: 'Last.fm API key.', category: 'integrations', type: 'secret', defaultValue: '', mockValue: 'masked-secret-value', safetyLevel: 'sensitive', restartRequired: true, notes: 'Masked credential field.', docsUrl: docsBase,
  },
  {
    key: 'LastFM.Secret', envVar: 'ND_LASTFM_SECRET', label: 'LastFM.Secret', description: 'Last.fm API secret.', category: 'integrations', type: 'secret', defaultValue: '', mockValue: 'masked-secret-value', safetyLevel: 'sensitive', restartRequired: true, notes: 'Sensitive values are masked.', docsUrl: docsBase,
  },
  {
    key: 'LastFM.Language', envVar: 'ND_LASTFM_LANGUAGE', label: 'LastFM.Language', description: 'Two-letter language code for Last.fm biographies.', category: 'integrations', type: 'text', defaultValue: 'en', mockValue: 'en', safetyLevel: 'safe', restartRequired: true, notes: 'Language display value.', docsUrl: docsBase,
  },
  {
    key: 'ListenBrainz.Enabled', envVar: 'ND_LISTENBRAINZ_ENABLED', label: 'ListenBrainz.Enabled', description: 'Enable ListenBrainz integration.', category: 'integrations', type: 'boolean', defaultValue: true, mockValue: false, safetyLevel: 'caution', restartRequired: true, notes: 'External service integration.', docsUrl: docsBase,
  },
  {
    key: 'ListenBrainz.BaseURL', envVar: 'ND_LISTENBRAINZ_BASEURL', label: 'ListenBrainz.BaseURL', description: 'Override ListenBrainz base URL.', category: 'integrations', type: 'text', defaultValue: 'https://api.listenbrainz.org/1/', mockValue: 'https://api.listenbrainz.org/1/', safetyLevel: 'advanced', restartRequired: true, notes: 'Base URL override.', docsUrl: docsBase,
  },
  {
    key: 'Deezer.Enabled', envVar: 'ND_DEEZER_ENABLED', label: 'Deezer.Enabled', description: 'Enable Deezer integration for artist images.', category: 'integrations', type: 'boolean', defaultValue: true, mockValue: true, safetyLevel: 'caution', restartRequired: true, notes: 'External service integration.', docsUrl: docsBase,
  },
  {
    key: 'Deezer.Language', envVar: 'ND_DEEZER_LANGUAGE', label: 'Deezer.Language', description: 'Language used by Deezer integration.', category: 'integrations', type: 'text', defaultValue: 'en', mockValue: 'en', safetyLevel: 'safe', restartRequired: true, notes: 'Language display value.', docsUrl: docsBase,
  },
  {
    key: 'EnableExternalServices', envVar: 'ND_ENABLEEXTERNALSERVICES', label: 'EnableExternalServices', description: 'Enable all external integrations.', category: 'integrations', type: 'boolean', defaultValue: true, mockValue: false, safetyLevel: 'caution', restartRequired: true, notes: 'Also affects anonymous data collection and login backgrounds.', docsUrl: docsBase,
  },
  {
    key: 'EnableGravatar', envVar: 'ND_ENABLEGRAVATAR', label: 'EnableGravatar', description: 'Use Gravatar images for user profiles.', category: 'integrations', type: 'boolean', defaultValue: false, mockValue: false, safetyLevel: 'caution', restartRequired: true, notes: 'May depend on user email data.', docsUrl: docsBase,
  },
  {
    key: 'AuthRequestLimit', envVar: 'ND_AUTHREQUESTLIMIT', label: 'AuthRequestLimit', description: 'Login requests allowed per IP during the auth window.', category: 'security', type: 'number', defaultValue: 5, mockValue: 5, safetyLevel: 'safe', restartRequired: true, notes: 'Set to 0 only if rate limiting is intentionally disabled.', docsUrl: docsBase,
  },
  {
    key: 'AuthWindowLength', envVar: 'ND_AUTHWINDOWLENGTH', label: 'AuthWindowLength', description: 'Window length for auth rate limiting.', category: 'security', type: 'duration', defaultValue: '20s', mockValue: '20s', safetyLevel: 'safe', restartRequired: true, notes: 'Duration string.', docsUrl: docsBase,
  },
  {
    key: 'SessionTimeout', envVar: 'ND_SESSIONTIMEOUT', label: 'SessionTimeout', description: 'Web UI idle session timeout.', category: 'security', type: 'duration', defaultValue: '48h', mockValue: '24h', safetyLevel: 'safe', restartRequired: true, notes: 'Shorter values reduce stale session exposure.', docsUrl: docsBase,
  },
  {
    key: 'EnableLogRedacting', envVar: 'ND_ENABLELOGREDACTING', label: 'EnableLogRedacting', description: 'Redact sensitive information from logs.', category: 'security', type: 'boolean', defaultValue: true, mockValue: true, safetyLevel: 'safe', restartRequired: true, notes: 'Should stay enabled; disabling may expose tokens and passwords.', docsUrl: docsBase,
  },
  {
    key: 'PasswordEncryptionKey', envVar: 'ND_PASSWORDENCRYPTIONKEY', label: 'PasswordEncryptionKey', description: 'Passphrase used to encrypt passwords in the database.', category: 'security', type: 'secret', defaultValue: '', mockValue: 'masked-secret-value', safetyLevel: 'sensitive', restartRequired: true, notes: 'Sensitive values are masked.', docsUrl: docsBase,
  },
  {
    key: 'ExtAuth.TrustedSources', envVar: 'ND_EXTAUTH_TRUSTEDSOURCES', label: 'ExtAuth.TrustedSources', description: 'Allowed CIDRs or socket source for reverse proxy auth.', category: 'security', type: 'list', defaultValue: '', mockValue: '', safetyLevel: 'caution', restartRequired: true, notes: 'Misconfiguration may allow spoofed authenticated users.', docsUrl: docsBase,
  },
  {
    key: 'ExtAuth.UserHeader', envVar: 'ND_EXTAUTH_USERHEADER', label: 'ExtAuth.UserHeader', description: 'HTTP header containing the external auth user name.', category: 'security', type: 'text', defaultValue: 'Remote-User', mockValue: 'Remote-User', safetyLevel: 'advanced', restartRequired: true, notes: 'Only meaningful behind a trusted authenticating proxy.', docsUrl: docsBase,
  },
  {
    key: 'ExtAuth.LogoutURL', envVar: 'ND_EXTAUTH_LOGOUTURL', label: 'ExtAuth.LogoutURL', description: 'Redirect URL after logout from external auth.', category: 'security', type: 'text', defaultValue: '', mockValue: '', safetyLevel: 'advanced', restartRequired: true, notes: 'No URL is opened by this UI.', docsUrl: docsBase,
  },
  {
    key: 'Subsonic.DefaultReportRealPath', envVar: 'ND_SUBSONIC_DEFAULTREPORTREALPATH', label: 'Subsonic.DefaultReportRealPath', description: 'Report music file paths in Subsonic API responses.', category: 'security', type: 'boolean', defaultValue: false, mockValue: false, safetyLevel: 'caution', restartRequired: true, notes: 'May expose paths; should remain disabled unless explicitly required.', docsUrl: docsBase,
  },
  {
    key: 'Backup.Path', envVar: 'ND_BACKUP_PATH', label: 'Backup.Path', description: 'Path used to store automated backups.', category: 'backup', type: 'path', defaultValue: '', mockValue: '<anchor-workspace>/backups/navidrome', safetyLevel: 'caution', restartRequired: true, notes: 'Future Core must validate backup path containment.', docsUrl: docsBase,
  },
  {
    key: 'Backup.Schedule', envVar: 'ND_BACKUP_SCHEDULE', label: 'Backup.Schedule', description: 'Cron schedule for automatic backups.', category: 'backup', type: 'duration', defaultValue: '', mockValue: '0 3 * * *', safetyLevel: 'safe', restartRequired: true, notes: 'Backup schedule.', docsUrl: docsBase,
  },
  {
    key: 'Backup.Count', envVar: 'ND_BACKUP_COUNT', label: 'Backup.Count', description: 'Number of backups to retain.', category: 'backup', type: 'number', defaultValue: 0, mockValue: 7, safetyLevel: 'safe', restartRequired: true, notes: 'Backup retention setting.', docsUrl: docsBase,
  },
  {
    key: 'Prometheus.Enabled', envVar: 'ND_PROMETHEUS_ENABLED', label: 'Prometheus.Enabled', description: 'Enable Prometheus metrics endpoint.', category: 'backup', type: 'boolean', defaultValue: false, mockValue: false, safetyLevel: 'caution', restartRequired: true, notes: 'Metrics endpoints should be protected.', docsUrl: docsBase,
  },
  {
    key: 'Prometheus.MetricsPath', envVar: 'ND_PROMETHEUS_METRICSPATH', label: 'Prometheus.MetricsPath', description: 'Custom path for metrics endpoint.', category: 'backup', type: 'text', defaultValue: '/metrics', mockValue: '/metrics', safetyLevel: 'advanced', restartRequired: true, notes: 'Display-only path string.', docsUrl: docsBase,
  },
  {
    key: 'Prometheus.Password', envVar: 'ND_PROMETHEUS_PASSWORD', label: 'Prometheus.Password', description: 'Basic Auth password for Prometheus metrics.', category: 'backup', type: 'secret', defaultValue: '', mockValue: 'masked-secret-value', safetyLevel: 'sensitive', restartRequired: true, notes: 'Sensitive values are masked.', docsUrl: docsBase,
  },
]

export type NavidromeConfigDraft = Record<string, string | number | boolean>

export const createNavidromeMockDraft = (): NavidromeConfigDraft =>
  Object.fromEntries(navidromeConfigCatalog.map((option) => [option.key, option.mockValue]))

export const formatNavidromeValue = (value: string | number | boolean, masked = false) => {
  if (masked) return '••••••••'
  if (typeof value === 'boolean') return value ? 'true' : 'false'
  return String(value)
}

export const getNavidromeChangedOptions = (
  saved: NavidromeConfigDraft,
  draft: NavidromeConfigDraft,
) => navidromeConfigCatalog.filter((option) => saved[option.key] !== draft[option.key])

export const renderNavidromeTomlPreview = (draft: NavidromeConfigDraft) => {
  const lines = [
    '# navidrome.toml',
    '# Review changes before applying.',
  ]

  navidromeSettingCategories
    .filter((category) => category.key !== 'advanced')
    .forEach((category) => {
      const options = navidromeConfigCatalog.filter((option) => option.category === category.key)
      lines.push('', `# ${category.label}`)
      options.forEach((option) => {
        if (option.key === 'ServerName') return
        const value = draft[option.key]
        if (option.type === 'secret') {
          lines.push(`${option.key} = '<masked value>'`)
          return
        }
        if (typeof value === 'boolean' || typeof value === 'number') {
          lines.push(`${option.key} = ${value}`)
          return
        }
        lines.push(`${option.key} = '${String(value).replace(/'/g, "\\'")}'`)
      })
    })

  return lines.join('\n')
}

export const renderNavidromeEnvPreview = (draft: NavidromeConfigDraft) =>
  navidromeConfigCatalog
    .filter((option) => option.envVar)
    .map((option) => ({
      key: option.key,
      envVar: option.envVar as string,
      value: option.type === 'secret' ? '<masked value>' : formatNavidromeValue(draft[option.key]),
      safetyLevel: option.safetyLevel,
    }))

export const renderNavidromeTomlDiff = (
  saved: NavidromeConfigDraft,
  draft: NavidromeConfigDraft,
) => {
  const changed = getNavidromeChangedOptions(saved, draft)
  if (changed.length === 0) return '# No changes.'
  return changed
    .flatMap((option) => {
      const oldValue = option.type === 'secret' ? '<masked old value>' : formatNavidromeValue(saved[option.key])
      const newValue = option.type === 'secret' ? '<masked new value>' : formatNavidromeValue(draft[option.key])
      return [`- ${option.key} = ${oldValue}`, `+ ${option.key} = ${newValue}`]
    })
    .join('\n')
}
