export const anchorServer = {
  name: 'Navidrome',
  description: 'Local music server',
  status: 'Server active',
  badge: 'Running',
  uptime: '3d 14h 28m',
  librarySize: '12,458 songs',
  address: 'http://192.168.1.156:4533',
  version: '0.51.0',
}

export const anchorLibrary = {
  name: 'Music / Naqlen',
  status: 'Accessible',
  updated: 'Updated 12 min ago',
  lastUpdated: 'Last updated 12 min ago',
  path: '/storage/emulated/0/Music/Naqlen',
  stats: [
    { label: 'Songs', value: '12,458' },
    { label: 'Albums', value: '1,253' },
    { label: 'Artists', value: '842' },
  ],
  footer: [
    { label: 'Last scan', value: '12 min ago' },
    { label: 'Duration', value: '1m 42s' },
  ],
}

export const anchorServers = [
  {
    id: 'navidrome',
    name: 'Navidrome',
    description: 'Local music server',
    badge: 'Running',
    address: anchorServer.address,
    version: anchorServer.version,
    uptime: anchorServer.uptime,
  },
  {
    id: 'jellyfin',
    name: 'Jellyfin',
    description: 'Media server',
    badge: 'Coming soon',
  },
  {
    id: 'emby',
    name: 'Emby',
    description: 'Media server',
    badge: 'Coming soon',
  },
]

export const anchorQuickActions = [
  'Copy address',
  'Show QR code',
  'Refresh library',
]

export const anchorLibraryActions = [
  {
    title: 'Change folder',
    detail: anchorLibrary.path,
  },
  {
    title: 'Refresh library',
    detail: 'Scan for new files and updated metadata',
  },
  {
    title: 'Verify access',
    detail: 'Check folder permissions',
  },
  {
    title: 'Library settings',
    detail: 'View and configure settings',
  },
]

export type AnchorActivityFilter =
  | 'all'
  | 'server'
  | 'library'
  | 'errors'
  | 'today'
  | 'yesterday'

export type AnchorActivityDayGroup = 'today' | 'yesterday'
export type AnchorActivityCategory = 'server' | 'library' | 'system' | 'settings'
export type AnchorActivitySeverity = 'success' | 'info' | 'warning' | 'error'

export type AnchorActivityEvent = {
  id: string
  title: string
  description: string
  time: string
  dayGroup: AnchorActivityDayGroup
  category: AnchorActivityCategory
  severity: AnchorActivitySeverity
  details: string[]
  relatedLabel?: string
  relatedAction?: 'navidromeSettings' | 'libraryScan' | 'serverRestart'
  diagnostic?: {
    message: string
    service: string
    port: string
    attempt: string
    result: string
    suggestedSource: string
    fixes: string[]
    note: string
  }
}

export const anchorActivity: AnchorActivityEvent[] = [
  {
    id: 'today-navidrome-started',
    title: 'Navidrome started',
    description: 'Server started successfully',
    time: '12:15 PM',
    dayGroup: 'today',
    category: 'server',
    severity: 'success',
    relatedLabel: 'Navidrome local server',
    details: [
      'Mock server state changed to running.',
      'Library index was already available in the preview.',
      'No service process was started by Studio.',
    ],
  },
  {
    id: 'today-library-updated',
    title: 'Library updated',
    description: 'Added 128 songs, 3 albums',
    time: '11:47 AM',
    dayGroup: 'today',
    category: 'library',
    severity: 'success',
    relatedLabel: 'Music / Naqlen',
    relatedAction: 'libraryScan',
    details: [
      'Static scan result added 128 songs and 3 albums.',
      'Artwork and embedded tag rows were refreshed visually.',
      'No folders, media files or metadata were read.',
    ],
  },
  {
    id: 'today-server-restarted',
    title: 'Server restarted',
    description: 'Restarted by user',
    time: '10:22 AM',
    dayGroup: 'today',
    category: 'server',
    severity: 'info',
    relatedLabel: 'Navidrome local server',
    relatedAction: 'serverRestart',
    details: [
      'Mock restart confirmation completed.',
      'Preview status returned to active after a short timer.',
      'No restart command or server request was sent.',
    ],
  },
  {
    id: 'today-startup-failed',
    title: 'Startup failed',
    description: 'Port 4533 already in use',
    time: '9:03 AM',
    dayGroup: 'today',
    category: 'server',
    severity: 'error',
    relatedLabel: 'Navidrome local server',
    relatedAction: 'navidromeSettings',
    details: [
      'Mock startup attempt was blocked by a display-only diagnostic.',
      'The preview uses static copy and did not inspect the device.',
      'Open Navidrome Settings to adjust the visual port field.',
    ],
    diagnostic: {
      message: 'Port 4533 already in use',
      service: 'Navidrome',
      port: '4533',
      attempt: 'Start server',
      result: 'Blocked',
      suggestedSource: 'diagnostic event',
      fixes: [
        'Choose another port',
        'Stop the conflicting service',
        'Restart Anchor',
        'Review Navidrome Settings',
      ],
      note: 'Review the conflicting port before restarting.',
    },
  },
  {
    id: 'yesterday-library-updated',
    title: 'Library updated',
    description: 'Added 56 songs, 4 albums',
    time: '8:41 PM',
    dayGroup: 'yesterday',
    category: 'library',
    severity: 'success',
    relatedLabel: 'Music / Naqlen',
    relatedAction: 'libraryScan',
    details: [
      'Static scan result added 56 songs and 4 albums.',
      'Library counters were updated.',
      'Metadata summary is ready for review.',
    ],
  },
  {
    id: 'yesterday-navidrome-started',
    title: 'Navidrome started',
    description: 'Server started successfully',
    time: '8:39 PM',
    dayGroup: 'yesterday',
    category: 'server',
    severity: 'success',
    relatedLabel: 'Navidrome local server',
    details: [
      'Mock server state entered running in the preview timeline.',
      'All status values came from static Anchor sample data.',
      'No local service, port or process was checked.',
    ],
  },
]
