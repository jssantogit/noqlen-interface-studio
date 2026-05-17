import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { AnchorActivity } from './components/AnchorActivity'
import { AnchorAddServerSheet } from './components/AnchorAddServerSheet'
import { AnchorBottomNav } from './components/AnchorBottomNav'
import { AnchorBottomSheet } from './components/AnchorBottomSheet'
import { AnchorComingSoonSheet } from './components/AnchorComingSoonSheet'
import { AnchorConfirmDialog } from './components/AnchorConfirmDialog'
import { AnchorHome } from './components/AnchorHome'
import { AnchorLibrary } from './components/AnchorLibrary'
import { AnchorLogViewerSheet } from './components/AnchorLogViewerSheet'
import { AnchorMockQrCode } from './components/AnchorMockQrCode'
import { AnchorScanProgress } from './components/AnchorScanProgress'
import type { AnchorScanState } from './components/AnchorScanProgress'
import { AnchorServerDetailsSheet } from './components/AnchorServerDetailsSheet'
import { AnchorServerMenuSheet } from './components/AnchorServerMenuSheet'
import { AnchorServerSettingsSheet } from './components/AnchorServerSettingsSheet'
import { AnchorSettingsSheet } from './components/AnchorSettingsSheet'
import { AnchorServers } from './components/AnchorServers'
import { AnchorToast } from './components/AnchorToast'
import type { AnchorToastTone } from './components/AnchorToast'
import { anchorServer } from './anchorMockData'

export type AnchorTab = 'home' | 'servers' | 'library' | 'activity'
export type AnchorServerState = 'active' | 'stopped' | 'restarting' | 'degraded' | 'disabled'
type AnchorSheet =
  | 'settings'
  | 'qr'
  | 'scan'
  | 'addServer'
  | 'serverDetails'
  | 'serverMenu'
  | 'serverSettings'
  | 'logs'
  | 'comingSoon'
  | null
type AnchorDialog = 'stop' | 'restart' | 'removeServer' | null
type AnchorToastState = { message: string; tone: AnchorToastTone } | null

export function AnchorPreview() {
  const [activeTab, setActiveTab] = useState<AnchorTab>('home')
  const [serverState, setServerState] = useState<AnchorServerState>('active')
  const [activeSheet, setActiveSheet] = useState<AnchorSheet>(null)
  const [activeDialog, setActiveDialog] = useState<AnchorDialog>(null)
  const [scanState, setScanState] = useState<AnchorScanState>('idle')
  const [comingSoonServer, setComingSoonServer] = useState<'Jellyfin' | 'Emby'>('Jellyfin')
  const [navidromeVisible, setNavidromeVisible] = useState(true)
  const [toast, setToast] = useState<AnchorToastState>(null)

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
      setServerState('active')
      showToast('Server restarted')
    }, 2200)
    return () => window.clearTimeout(timeout)
  }, [serverState])

  useEffect(() => {
    if (scanState !== 'scanning') return undefined
    const timeout = window.setTimeout(() => {
      setScanState('complete')
      showToast('Library refresh completed')
    }, 1500)
    return () => window.clearTimeout(timeout)
  }, [scanState])

  const startRestart = () => {
    setActiveDialog(null)
    setServerState('restarting')
  }

  const screens: Record<AnchorTab, ReactNode> = {
    home: (
      <AnchorHome
        onCopyAddress={() => showToast('Address copied')}
        onLibraryOpen={() => setActiveTab('library')}
        onRefreshLibrary={() => {
          setScanState('scanning')
          setActiveSheet('scan')
        }}
        onRestartServer={() => setActiveDialog('restart')}
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
        onAddServer={() => setActiveSheet('addServer')}
        onComingSoon={(server) => {
          setComingSoonServer(server)
          setActiveSheet('comingSoon')
        }}
        onOpenDetails={() => setActiveSheet('serverDetails')}
        onOpenLogs={() => setActiveSheet('logs')}
        onOpenMenu={() => setActiveSheet('serverMenu')}
        onOpenSettings={() => setActiveSheet('serverSettings')}
        serverState={serverState === 'degraded' ? 'active' : serverState}
      />
    ),
    library: <AnchorLibrary />,
    activity: <AnchorActivity />,
  }

  return (
    <div className="relative flex h-full min-h-full min-w-0 flex-col overflow-hidden bg-[radial-gradient(circle_at_24%_-8%,rgba(245,158,11,0.18),transparent_15rem),radial-gradient(circle_at_85%_4%,rgba(14,165,233,0.08),transparent_13rem),linear-gradient(180deg,#091217_0%,#071014_52%,#05090d_100%)] text-white">
      <AnimatePresence mode="wait">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden pb-28"
          exit={{ opacity: 0, y: -8 }}
          initial={{ opacity: 0, y: 14 }}
          key={activeTab}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {screens[activeTab]}
        </motion.div>
      </AnimatePresence>
      <AnchorBottomNav activeTab={activeTab} onTabChange={setActiveTab} />

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
          subtitle="A local-only preview of a library refresh."
          title="Refresh library"
        >
          <AnchorScanProgress
            onFail={() => {
              setScanState('failed')
              showToast('Library refresh failed in mock preview', 'warning')
            }}
            state={scanState}
          />
        </AnchorBottomSheet>
      ) : null}

      {activeSheet === 'addServer' ? (
        <AnchorAddServerSheet
          onCancel={() => setActiveSheet(null)}
          onSave={() => {
            setActiveSheet(null)
            showToast('Mock server added')
          }}
        />
      ) : null}

      {activeSheet === 'serverDetails' ? (
        <AnchorServerDetailsSheet
          onClose={() => setActiveSheet(null)}
          onOpenLogs={() => setActiveSheet('logs')}
          onOpenSettings={() => setActiveSheet('serverSettings')}
          statusLabel={serverState === 'disabled' ? 'Disabled' : 'Running'}
        />
      ) : null}

      {activeSheet === 'serverMenu' ? (
        <AnchorServerMenuSheet
          onAction={(action) => {
            if (action === 'remove') {
              setActiveSheet(null)
              setActiveDialog('removeServer')
              return
            }
            if (action === 'disable') {
              setActiveSheet(null)
              setServerState('disabled')
              showToast('Mock server disabled', 'warning')
              return
            }
            if (action === 'duplicate') {
              setActiveSheet(null)
              showToast('Mock configuration duplicated')
              return
            }
            setActiveSheet(null)
            showToast('Rename is visual-only in this preview', 'info')
          }}
          onClose={() => setActiveSheet(null)}
        />
      ) : null}

      {activeSheet === 'serverSettings' ? (
        <AnchorServerSettingsSheet
          onCancel={() => setActiveSheet(null)}
          onSave={() => {
            setActiveSheet(null)
            showToast('Server settings saved in mock preview')
          }}
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
          description="This only changes the mock server state in the Studio preview."
          onCancel={() => setActiveDialog(null)}
          onConfirm={() => {
            setActiveDialog(null)
            setServerState('stopped')
            showToast('Server stopped in mock preview', 'warning')
          }}
          title="Stop Navidrome?"
          tone="danger"
        />
      ) : null}

      {activeDialog === 'restart' ? (
        <AnchorConfirmDialog
          confirmLabel="Restart"
          description="Anchor will simulate a restart without contacting a real server."
          onCancel={() => setActiveDialog(null)}
          onConfirm={startRestart}
          title="Restart Navidrome?"
        />
      ) : null}

      {activeDialog === 'removeServer' ? (
        <AnchorConfirmDialog
          confirmLabel="Remove"
          description="This only removes the Navidrome card from the current local preview until refresh."
          onCancel={() => setActiveDialog(null)}
          onConfirm={() => {
            setActiveDialog(null)
            setNavidromeVisible(false)
            showToast('Mock server removed', 'warning')
          }}
          title="Remove mock server?"
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
