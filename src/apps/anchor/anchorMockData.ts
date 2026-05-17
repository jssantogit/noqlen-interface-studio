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

export const anchorActivity = {
  today: [
    {
      title: 'Navidrome started',
      detail: 'Server started successfully',
      time: '12:15 PM',
      tone: 'success',
      hasDetails: false,
    },
    {
      title: 'Library updated',
      detail: 'Added 128 songs, 3 albums',
      time: '11:47 AM',
      tone: 'library',
      hasDetails: true,
    },
    {
      title: 'Server restarted',
      detail: 'Restarted by user',
      time: '10:22 AM',
      tone: 'restart',
      hasDetails: true,
    },
    {
      title: 'Startup failed',
      detail: 'Port 4533 already in use',
      time: '9:03 AM',
      tone: 'failure',
      hasDetails: true,
    },
  ],
  yesterday: [
    {
      title: 'Library updated',
      detail: 'Added 56 songs, 4 albums',
      time: '8:41 PM',
      tone: 'library',
      hasDetails: true,
    },
    {
      title: 'Navidrome started',
      detail: 'Server started successfully',
      time: '8:39 PM',
      tone: 'success',
      hasDetails: false,
    },
  ],
} as const
