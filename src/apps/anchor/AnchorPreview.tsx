import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { anchorActivity, anchorServer } from './anchorMockData'
import type { AnchorActivityFilter } from './anchorMockData'
import { initialAnchorMockState } from './anchorState'
import type { AnchorMockState } from './anchorState'
import { initialAnchorSetupDraft } from './anchorSetupState'
import type { AnchorSetupDraft } from './anchorSetupState'
import { AnchorActivity } from './components/AnchorActivity'
import { AnchorActivityDetailSheet } from './components/AnchorActivityDetailSheet'
import { AnchorActivityFilterSheet } from './components/AnchorActivityFilterSheet'
import { AnchorAccessCheckSheet } from './components/AnchorAccessCheckSheet'
import { AnchorAddServerSheet } from './components/AnchorAddServerSheet'
import { AnchorBottomNav } from './components/AnchorBottomNav'
import { AnchorBottomSheet } from './components/AnchorBottomSheet'
import { AnchorComingSoonSheet } from './components/AnchorComingSoonSheet'
import { AnchorConfirmDialog } from './components/AnchorConfirmDialog'
import { AnchorErrorDetailSheet } from './components/AnchorErrorDetailSheet'
import { AnchorFolderPickerMock } from './components/AnchorFolderPickerMock'
import { AnchorHome } from './components/AnchorHome'
import { AnchorLibrary } from './components/AnchorLibrary'
import { AnchorLibrarySettingsSheet } from './components/AnchorLibrarySettingsSheet'
import type { AnchorLibrarySettings } from './components/AnchorLibrarySettingsSheet'
import { AnchorLibraryStatsSheet } from './components/AnchorLibraryStatsSheet'
import { AnchorLogViewerSheet } from './components/AnchorLogViewerSheet'
import { AnchorMockQrCode } from './components/AnchorMockQrCode'
import { AnchorNavidromeSettingsSheet } from './components/AnchorNavidromeSettingsSheet'
import { createNavidromeMockDraft } from './navidromeConfigCatalog'
import type { NavidromeConfigDraft } from './navidromeConfigCatalog'
import { AnchorScanProgress } from './components/AnchorScanProgress'
import type { AnchorScanState } from './components/AnchorScanProgress'
import { AnchorScanHistorySheet } from './components/AnchorScanHistorySheet'
import { AnchorServerDetailsSheet } from './components/AnchorServerDetailsSheet'
import { AnchorServerMenuSheet } from './components/AnchorServerMenuSheet'
import { AnchorServerSettingsSheet } from './components/AnchorServerSettingsSheet'
import { AnchorSettingsSheet } from './components/AnchorSettingsSheet'
import { AnchorServers } from './components/AnchorServers'
import { AnchorSetupFlow } from './components/setup/AnchorSetupFlow'
import { AnchorToast } from './components/AnchorToast'
import type { AnchorToastTone } from './components/AnchorToast'

export type AnchorTab = 'home' | 'servers' | 'library' | 'activity'
export type { AnchorServerState } from './anchorState'
type AnchorSheet =
  | 'settings'
  | 'qr'
  | 'scan'
  | 'addServer'
  | 'serverDetails'
  | 'serverMenu'
  | 'serverSettings'
  | 'navidromeSettings'
  | 'logs'
  | 'comingSoon'
  | 'folderPicker'
  | 'accessCheck'
  | 'librarySettings'
  | 'libraryStats'
  | 'scanHistory'
  | 'activityFilter'
  | 'activityDetail'
  | 'errorDetail'
  | null
type AnchorDialog = 'stop' | 'restart' | 'removeServer' | null
type AnchorToastState = { message: string; tone: AnchorToastTone } | null

const initialLibrarySettings: AnchorLibrarySettings = {
  'Auto-scan on launch': true,
  'Watch library changes': false,
  'Include subfolders': true,
  'Refresh missing artwork': true,
  'Prefer embedded tags': true,
  'Keep original genre tags': true,
  'Confirm folder changes': true,
}

export function AnchorPreview() {
  const [activeTab, setActiveTab] = useState<AnchorTab>('home')
  const [mockState, setMockState] = useState<AnchorMockState>(initialAnchorMockState)
  const [activeSheet, setActiveSheet] = useState<AnchorSheet>(null)
  const [activeDialog, setActiveDialog] = useState<AnchorDialog>(null)
  const [scanState, setScanState] = useState<AnchorScanState>('idle')
  const [comingSoonServer, setComingSoonServer] = useState<'Jellyfin' | 'Emby'>('Jellyfin')
  const [navidromeVisible, setNavidromeVisible] = useState(true)
  const [mockLibraryPath, setMockLibraryPath] = useState('/storage/emulated/0/Music/Naqlen')
  const [mockLibraryLastScan, setMockLibraryLastScan] = useState('12 min ago')
  const [mockLibrarySettings, setMockLibrarySettings] = useState(initialLibrarySettings)
  const [activityFilter, setActivityFilter] = useState<AnchorActivityFilter>('all')
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null)
  const [toast, setToast] = useState<AnchorToastState>(null)
  const [setupDraft, setSetupDraft] = useState<AnchorSetupDraft>(() => ({ ...initialAnchorSetupDraft }))
  const [setupFromSettings, setSetupFromSettings] = useState(false)
  const serverState = mockState.server

  const inSetup = !setupDraft.hasCompletedSetup || setupFromSettings

  const showToast = (message: string, tone: AnchorToastTone = 'success') => {
    setToast({ message, tone })
  }

  useEffect(() => {
    if (!toast) return undefined
    const timeout = window.setTimeout(() => setToast(null), 2400)
    return () => window.clearTimeout(timeout)
  }, [toast])

  useEffect(() => {
    if (serverState !== 'restarting') return undefined
    const timeout = window.setTimeout(() => {
      setMockState((current) => ({ ...current, server: 'active' }))
      showToast('Server restarted')
    }, 2200)
    return () => window.clearTimeout(timeout)
  }, [serverState])

  useEffect(() => {
    if (scanState !== 'scanning') return undefined
    const timeout = window.setTimeout(() => {
      setScanState('complete')
      setMockLibraryLastScan('just now')
      showToast('Library refresh completed')
    }, 1500)
    return () => window.clearTimeout(timeout)
  }, [scanState])

  const startRestart = () => {
    setActiveDialog(null)
    setMockState((current) => ({ ...current, server: 'restarting' }))
  }

  const stateActivity =
    mockState.activity === 'empty' || mockState.activity === 'filteredNoResults'
      ? []
      : mockState.activity === 'errorsOnly'
        ? anchorActivity.filter((event) => event.severity === 'error')
        : anchorActivity

  const filteredActivity = stateActivity.filter((event) => {
    if (activityFilter === 'all') return true
    if (activityFilter === 'errors') return event.severity === 'error'
    if (activityFilter === 'today' || activityFilter === 'yesterday') {
      return event.dayGroup === activityFilter
    }
    return event.category === activityFilter
  })

  const selectedActivity = anchorActivity.find((event) => event.id === selectedActivityId)

  const openActivityEvent = (eventId: string) => {
    const event = anchorActivity.find((item) => item.id === eventId)
    if (!event) return
    setSelectedActivityId(event.id)
    setActiveSheet(event.severity === 'error' ? 'errorDetail' : 'activityDetail')
  }

  const screens: Record<AnchorTab, ReactNode> = {
    home: (
      <AnchorHome
        onCopyAddress={() => showToast('Address copied')}
        globalDisabled={mockState.globalDisabled}
        libraryState={mockState.library}
        onLibraryOpen={() => setActiveTab('library')}
        onRefreshLibrary={() => {
          setScanState('scanning')
          setActiveSheet('scan')
        }}
        onRestartServer={() => setActiveDialog('restart')}
        onServerMenuOpen={() => setActiveSheet('serverMenu')}
        onSettingsOpen={() => setActiveSheet('settings')}
        onShowQrCode={() => setActiveSheet('qr')}
        onStopServer={() => setActiveDialog('stop')}
        scanState={scanState}
        serverState={serverState}
      />
    ),
    servers: (
      <AnchorServers
        navidromeVisible={navidromeVisible}
        serverListState={mockState.serverList}
        onAddServer={() => setActiveSheet('addServer')}
        onComingSoon={(server) => {
          setComingSoonServer(server)
          setActiveSheet('comingSoon')
        }}
        onOpenDetails={() => setActiveSheet('serverDetails')}
        onOpenLogs={() => setActiveSheet('logs')}
        onOpenMenu={() => setActiveSheet('serverMenu')}
        onOpenSettings={() => setActiveSheet('navidromeSettings')}
        onRestoreServer={() => {
          setNavidromeVisible(true)
          setMockState((current) => ({ ...current, server: 'active', serverList: 'normal' }))
          showToast('Server restored')
        }}
        serverState={mockState.serverList === 'navidromeDisabled' ? 'disabled' : serverState}
      />
    ),
    library: (
      <AnchorLibrary
        lastScan={mockLibraryLastScan}
        libraryState={mockState.library}
        onChangeFolder={() => setActiveSheet('folderPicker')}
        onOpenScanHistory={() => setActiveSheet('scanHistory')}
        onOpenSettings={() => setActiveSheet('librarySettings')}
        onOpenStats={() => setActiveSheet('libraryStats')}
        onRefreshLibrary={() => {
          setScanState('scanning')
          setActiveSheet('scan')
        }}
        onVerifyAccess={() => setActiveSheet('accessCheck')}
        path={mockLibraryPath}
      />
    ),
    activity: (
      <AnchorActivity
        activeFilter={activityFilter}
        activityState={mockState.activity}
        events={filteredActivity}
        onFilterOpen={() => setActiveSheet('activityFilter')}
        onOpenEvent={openActivityEvent}
        onResetFilter={() => setActivityFilter('all')}
      />
    ),
  }

  const finishSetup = () => {
    setSetupDraft((current) => ({ ...current, step: 'complete', hasCompletedSetup: true }))
    setSetupFromSettings(false)
    setMockLibraryPath(setupDraft.libraryPath)
    setActiveTab('home')
    showToast('Anchor setup completed')
  }

  const buildCatalogDraftFromSetup = (navidromeDraft: AnchorSetupDraft['navidromeDraft']): NavidromeConfigDraft => {
    const base = createNavidromeMockDraft()
    return {
      ...base,
      MusicFolder: navidromeDraft.MusicFolder,
      DataFolder: navidromeDraft.DataFolder,
      Port: navidromeDraft.Port,
      LogLevel: navidromeDraft.LogLevel,
      'Scanner.Schedule': navidromeDraft.ScannerSchedule,
      EnableDownloads: navidromeDraft.EnableDownloads,
      EnableSharing: navidromeDraft.EnableSharing,
      EnableLogRedacting: navidromeDraft.EnableLogRedacting,
    }
  }

  const buildSetupDraftFromCatalog = (catalogDraft: NavidromeConfigDraft): Partial<AnchorSetupDraft['navidromeDraft']> => ({
    MusicFolder: String(catalogDraft['MusicFolder'] ?? ''),
    DataFolder: String(catalogDraft['DataFolder'] ?? ''),
    Port: Number(catalogDraft['Port'] ?? 4533),
    LogLevel: String(catalogDraft['LogLevel'] ?? 'info'),
    ScannerSchedule: String(catalogDraft['Scanner.Schedule'] ?? '@every 1h'),
    EnableDownloads: Boolean(catalogDraft['EnableDownloads'] ?? true),
    EnableSharing: Boolean(catalogDraft['EnableSharing'] ?? false),
    EnableLogRedacting: Boolean(catalogDraft['EnableLogRedacting'] ?? true),
  })

  return (
    <div className="relative flex h-full min-h-full w-full min-w-0 max-w-full flex-col overflow-x-hidden overflow-y-hidden bg-[radial-gradient(circle_at_24%_-8%,rgba(245,158,11,0.18),transparent_15rem),radial-gradient(circle_at_85%_4%,rgba(14,165,233,0.08),transparent_13rem),linear-gradient(180deg,#091217_0%,#071014_52%,#05090d_100%)] text-white">
      {inSetup ? (
        <AnchorSetupFlow
          draft={setupDraft}
          onChangeDraft={setSetupDraft}
          onComplete={finishSetup}
          onOpenNavidromeSettings={() => setActiveSheet('navidromeSettings')}
        />
      ) : (
        <>
          <AnimatePresence mode="wait">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="anchor-scrollbar-soft min-h-0 w-full min-w-0 max-w-full flex-1 overflow-y-auto overflow-x-hidden overscroll-contain pb-24"
              exit={{ opacity: 0, y: -8 }}
              initial={{ opacity: 0, y: 14 }}
              key={activeTab}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {screens[activeTab]}
            </motion.div>
          </AnimatePresence>
          {mockState.globalLoading ? (
            <div className="pointer-events-none absolute inset-0 z-30 grid place-items-center bg-black/42 backdrop-blur-[2px]">
              <div className="rounded-2xl border border-amber-300/18 bg-[#071014]/92 px-4 py-3 text-center shadow-2xl">
                <div className="mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-2 border-amber-300/25 border-t-amber-300" />
                <p className="text-sm font-semibold text-white">Loading</p>
              </div>
            </div>
          ) : null}
          <AnchorBottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        </>
      )}

      {activeSheet === 'settings' ? (
        <AnchorSettingsSheet onClose={() => setActiveSheet(null)} />
      ) : null}

      {activeSheet === 'qr' ? (
        <AnchorBottomSheet
          onClose={() => setActiveSheet(null)}
          subtitle="Scan this on the same local network."
          title="Server QR code"
        >
          <AnchorMockQrCode address={anchorServer.address} />
        </AnchorBottomSheet>
      ) : null}

      {activeSheet === 'scan' ? (
        <AnchorBottomSheet
          onClose={() => setActiveSheet(null)}
          title="Refresh library"
        >
          <AnchorScanProgress
            onFail={() => {
              setScanState('failed')
              showToast('Library refresh failed', 'warning')
            }}
            state={scanState}
          />
        </AnchorBottomSheet>
      ) : null}

      {activeSheet === 'folderPicker' ? (
        <AnchorFolderPickerMock
          currentPath={mockLibraryPath}
          onCancel={() => setActiveSheet(null)}
          onUseFolder={(path) => {
            setMockLibraryPath(path)
            setActiveSheet(null)
            showToast('Library folder updated')
          }}
        />
      ) : null}

      {activeSheet === 'accessCheck' ? (
        <AnchorAccessCheckSheet onClose={() => setActiveSheet(null)} />
      ) : null}

      {activeSheet === 'librarySettings' ? (
        <AnchorLibrarySettingsSheet
          onCancel={() => setActiveSheet(null)}
          onSave={(settings) => {
            setMockLibrarySettings(settings)
            setActiveSheet(null)
            showToast('Library settings saved')
          }}
          settings={mockLibrarySettings}
        />
      ) : null}

      {activeSheet === 'libraryStats' ? (
        <AnchorLibraryStatsSheet onClose={() => setActiveSheet(null)} />
      ) : null}

      {activeSheet === 'scanHistory' ? (
        <AnchorScanHistorySheet onClose={() => setActiveSheet(null)} />
      ) : null}

      {activeSheet === 'activityFilter' ? (
        <AnchorActivityFilterSheet
          activeFilter={activityFilter}
          onChange={setActivityFilter}
          onClose={() => setActiveSheet(null)}
        />
      ) : null}

      {activeSheet === 'activityDetail' && selectedActivity ? (
        <AnchorActivityDetailSheet
          event={selectedActivity}
          onClose={() => setActiveSheet(null)}
        />
      ) : null}

      {activeSheet === 'errorDetail' && selectedActivity ? (
        <AnchorErrorDetailSheet
          event={selectedActivity}
          onClose={() => setActiveSheet(null)}
          onCopyDiagnostic={() => showToast('Diagnostic summary copied', 'info')}
          onOpenNavidromeSettings={() => setActiveSheet('navidromeSettings')}
        />
      ) : null}

      {activeSheet === 'addServer' ? (
        <AnchorAddServerSheet
          onCancel={() => setActiveSheet(null)}
          onSave={() => {
            setActiveSheet(null)
            setNavidromeVisible(true)
            setMockState((current) => ({ ...current, serverList: 'normal' }))
            showToast('Server added')
          }}
        />
      ) : null}

      {activeSheet === 'serverDetails' ? (
        <AnchorServerDetailsSheet
          onClose={() => setActiveSheet(null)}
          onOpenLogs={() => setActiveSheet('logs')}
          onOpenSettings={() => setActiveSheet('navidromeSettings')}
          statusLabel={serverState === 'disabled' ? 'Disabled' : serverState === 'offline' ? 'Offline' : 'Running'}
        />
      ) : null}

      {activeSheet === 'serverMenu' ? (
        <AnchorServerMenuSheet
          onAction={(action) => {
            if (action === 'configure') {
              setActiveSheet('navidromeSettings')
              return
            }
            if (action === 'remove') {
              setActiveSheet(null)
              setActiveDialog('removeServer')
              return
            }
            if (action === 'disable') {
              setActiveSheet(null)
              setMockState((current) => ({ ...current, server: 'disabled', serverList: 'navidromeDisabled' }))
              showToast('Server disabled', 'warning')
              return
            }
            if (action === 'duplicate') {
              setActiveSheet(null)
              showToast('Configuration duplicated')
              return
            }
            setActiveSheet(null)
            showToast('Rename server', 'info')
          }}
          onClose={() => setActiveSheet(null)}
        />
      ) : null}

      {activeSheet === 'serverSettings' ? (
        <AnchorServerSettingsSheet
          onCancel={() => setActiveSheet(null)}
          onSave={() => {
            setActiveSheet(null)
            showToast('Server settings saved')
          }}
        />
      ) : null}

      {activeSheet === 'navidromeSettings' ? (
        <AnchorNavidromeSettingsSheet
          onClose={() => setActiveSheet(null)}
          onMockApply={() => showToast('Navidrome settings saved')}
          onMockReset={() => showToast('Changes reset', 'info')}
          onRestartRecommended={() => setMockState((current) => ({ ...current, server: 'degraded' }))}
          initialDraft={inSetup ? buildCatalogDraftFromSetup(setupDraft.navidromeDraft) : undefined}
          onDraftChange={inSetup ? (catalogDraft) => {
            setSetupDraft((current) => ({
              ...current,
              navidromeDraft: { ...current.navidromeDraft, ...buildSetupDraftFromCatalog(catalogDraft) },
            }))
          } : undefined}
        />
      ) : null}

      {activeSheet === 'logs' ? (
        <AnchorLogViewerSheet onClose={() => setActiveSheet(null)} />
      ) : null}

      {activeSheet === 'comingSoon' ? (
        <AnchorComingSoonSheet
          onClose={() => setActiveSheet(null)}
          serverName={comingSoonServer}
        />
      ) : null}

      {activeDialog === 'stop' ? (
        <AnchorConfirmDialog
          confirmLabel="Stop server"
          description="Stop the current Navidrome server card."
          onCancel={() => setActiveDialog(null)}
          onConfirm={() => {
            setActiveDialog(null)
            setMockState((current) => ({ ...current, server: 'stopped' }))
            showToast('Server stopped', 'warning')
          }}
          title="Stop Navidrome?"
          tone="danger"
        />
      ) : null}

      {activeDialog === 'restart' ? (
        <AnchorConfirmDialog
          confirmLabel="Restart"
          description="Restart the Navidrome server card."
          onCancel={() => setActiveDialog(null)}
          onConfirm={startRestart}
          title="Restart Navidrome?"
        />
      ) : null}

      {activeDialog === 'removeServer' ? (
        <AnchorConfirmDialog
          confirmLabel="Remove"
          description="Remove the Navidrome server card from the server list."
          onCancel={() => setActiveDialog(null)}
          onConfirm={() => {
            setActiveDialog(null)
            setNavidromeVisible(false)
            setMockState((current) => ({ ...current, serverList: 'noServers' }))
            showToast('Server removed', 'warning')
          }}
          title="Remove server?"
          tone="danger"
        />
      ) : null}

      {toast ? (
        <AnchorToast
          message={toast.message}
          onClose={() => setToast(null)}
          tone={toast.tone}
        />
      ) : null}
    </div>
  )
}
