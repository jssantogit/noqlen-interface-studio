export type AnchorServerState =
  | 'active'
  | 'stopped'
  | 'restarting'
  | 'degraded'
  | 'offline'
  | 'disabled'

export type AnchorServerListState =
  | 'normal'
  | 'noServers'
  | 'addingServer'
  | 'navidromeDisabled'
  | 'comingSoonOnly'

export type AnchorLibraryState =
  | 'accessible'
  | 'scanning'
  | 'empty'
  | 'permissionWarning'
  | 'accessDenied'
  | 'scanFailed'

export type AnchorActivityState = 'populated' | 'empty' | 'errorsOnly' | 'filteredNoResults'

export type AnchorMockState = {
  activity: AnchorActivityState
  globalDisabled: boolean
  globalLoading: boolean
  library: AnchorLibraryState
  server: AnchorServerState
  serverList: AnchorServerListState
}

export const initialAnchorMockState: AnchorMockState = {
  activity: 'populated',
  globalDisabled: false,
  globalLoading: false,
  library: 'accessible',
  server: 'active',
  serverList: 'normal',
}

export const anchorMockStateLabels = {
  activity: {
    populated: 'Populated',
    empty: 'Empty',
    errorsOnly: 'Errors only',
    filteredNoResults: 'Filtered no results',
  },
  library: {
    accessible: 'Accessible',
    scanning: 'Scanning',
    empty: 'Empty',
    permissionWarning: 'Permission warning',
    accessDenied: 'Access denied',
    scanFailed: 'Scan failed',
  },
  server: {
    active: 'Active',
    stopped: 'Stopped',
    restarting: 'Restarting',
    degraded: 'Degraded',
    offline: 'Offline',
    disabled: 'Disabled',
  },
  serverList: {
    normal: 'Normal list',
    noServers: 'No servers',
    addingServer: 'Adding server',
    navidromeDisabled: 'Navidrome disabled',
    comingSoonOnly: 'Coming soon only',
  },
} as const
