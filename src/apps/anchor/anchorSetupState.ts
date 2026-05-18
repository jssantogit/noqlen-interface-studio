export type AnchorSetupStep =
  | 'welcome'
  | 'permissions'
  | 'library'
  | 'server'
  | 'navidrome'
  | 'review'
  | 'complete'

export type AnchorSetupPermission = {
  id: string
  label: string
  description: string
  required: boolean
  acknowledged: boolean
}

export type AnchorSetupLibraryOption = {
  path: string
  label: string
  songCount: string
  status: 'accessible' | 'unavailable'
}

export type AnchorSetupServerType = 'navidrome' | 'jellyfin' | 'emby'

export type AnchorSetupDraft = {
  step: AnchorSetupStep
  hasCompletedSetup: boolean
  permissions: AnchorSetupPermission[]
  libraryPath: string
  serverType: AnchorSetupServerType
  serverAddress: string
  serverPort: number
  serverDataFolder: string
  navidromeDraft: {
    MusicFolder: string
    DataFolder: string
    Port: number
    LogLevel: string
    ScannerSchedule: string
    EnableDownloads: boolean
    EnableSharing: boolean
    EnableLogRedacting: boolean
  }
}

export const anchorSetupPermissionDefaults: AnchorSetupPermission[] = [
  {
    id: 'musicLibrary',
    label: 'Music library access',
    description: 'Read and manage your local music collection',
    required: true,
    acknowledged: false,
  },
  {
    id: 'localServer',
    label: 'Local server control',
    description: 'Start, stop and configure the local media server',
    required: true,
    acknowledged: false,
  },
  {
    id: 'network',
    label: 'Network access on your device',
    description: 'Allow LAN access and discovery for local streaming',
    required: true,
    acknowledged: false,
  },
  {
    id: 'notifications',
    label: 'Notifications for scan/server status',
    description: 'Receive updates when scans complete or server state changes',
    required: false,
    acknowledged: false,
  },
]

export const anchorSetupLibraryOptions: AnchorSetupLibraryOption[] = [
  { path: '/storage/emulated/0/Music', label: 'Music', songCount: '23,891', status: 'accessible' },
  { path: '/storage/emulated/0/Music/Naqlen', label: 'Music / Naqlen', songCount: '12,458', status: 'accessible' },
  { path: '/storage/emulated/0/Download/Music', label: 'Download / Music', songCount: '3,204', status: 'accessible' },
  { path: '/sdcard/Music', label: 'SD Card / Music', songCount: '8,761', status: 'accessible' },
]

export const initialAnchorSetupDraft: AnchorSetupDraft = {
  step: 'welcome',
  hasCompletedSetup: false,
  permissions: anchorSetupPermissionDefaults.map((p) => ({ ...p })),
  libraryPath: '/storage/emulated/0/Music/Naqlen',
  serverType: 'navidrome',
  serverAddress: '192.168.1.156',
  serverPort: 4533,
  serverDataFolder: '/data/data/com.naqlen.anchor/navidrome',
  navidromeDraft: {
    MusicFolder: '/storage/emulated/0/Music/Naqlen',
    DataFolder: '/data/data/com.naqlen.anchor/navidrome',
    Port: 4533,
    LogLevel: 'info',
    ScannerSchedule: '@every 1h',
    EnableDownloads: true,
    EnableSharing: false,
    EnableLogRedacting: true,
  },
}

export const anchorSetupSteps: AnchorSetupStep[] = [
  'welcome',
  'permissions',
  'library',
  'server',
  'navidrome',
  'review',
]

export function getSetupStepIndex(step: AnchorSetupStep): number {
  if (step === 'complete') return anchorSetupSteps.length
  return anchorSetupSteps.indexOf(step)
}

export function getStepNumber(step: AnchorSetupStep): number {
  return getSetupStepIndex(step) + 1
}

export function getTotalSteps(): number {
  return anchorSetupSteps.length
}
