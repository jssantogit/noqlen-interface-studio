import {
  Check,
  ChevronRight,
  Copy,
  Folder,
  MoreVertical,
  QrCode,
  RefreshCw,
  RotateCw,
  Settings,
  Square,
} from 'lucide-react'
import type { AnchorScanState } from './AnchorScanProgress'
import type { AnchorServerState } from '../AnchorPreview'
import {
  anchorLibrary,
  anchorQuickActions,
  anchorServer,
} from '../anchorMockData'
import { AnchorCard, AnchorIconButton, AnchorScreenHeader } from './AnchorCard'

const quickActionIcons = [Copy, QrCode, RefreshCw]

const serverView: Record<
  AnchorServerState,
  {
    actionLabel: string
    iconClass: string
    primaryButton: string
    status: string
    statusClass: string
    uptime: string
  }
> = {
  active: {
    actionLabel: 'Stop server',
    iconClass: 'border-amber-300 text-amber-300',
    primaryButton: 'bg-amber-400 text-[#211508] hover:bg-amber-300',
    status: anchorServer.status,
    statusClass: 'text-amber-300',
    uptime: anchorServer.uptime,
  },
  stopped: {
    actionLabel: 'Start server',
    iconClass: 'border-slate-400/70 text-slate-300',
    primaryButton: 'bg-white/[0.07] text-slate-200 hover:bg-white/[0.1]',
    status: 'Server stopped',
    statusClass: 'text-slate-300',
    uptime: 'Offline in preview',
  },
  restarting: {
    actionLabel: 'Stop server',
    iconClass: 'border-amber-300 text-amber-300',
    primaryButton: 'bg-amber-300/70 text-[#211508]',
    status: 'Restarting server',
    statusClass: 'text-amber-200',
    uptime: 'Restarting...',
  },
  degraded: {
    actionLabel: 'Stop server',
    iconClass: 'border-orange-300 text-orange-300',
    primaryButton: 'bg-orange-400 text-white hover:bg-orange-300',
    status: 'Server degraded',
    statusClass: 'text-orange-300',
    uptime: anchorServer.uptime,
  },
  disabled: {
    actionLabel: 'Start server',
    iconClass: 'border-slate-400/70 text-slate-300',
    primaryButton: 'bg-white/[0.07] text-slate-200 hover:bg-white/[0.1]',
    status: 'Server disabled',
    statusClass: 'text-slate-300',
    uptime: 'Disabled in preview',
  },
}

export function AnchorHome({
  onCopyAddress,
  onLibraryOpen,
  onRefreshLibrary,
  onRestartServer,
  onSettingsOpen,
  onShowQrCode,
  onStopServer,
  scanState,
  serverState,
}: {
  onCopyAddress: () => void
  onLibraryOpen: () => void
  onRefreshLibrary: () => void
  onRestartServer: () => void
  onSettingsOpen: () => void
  onShowQrCode: () => void
  onStopServer: () => void
  scanState: AnchorScanState
  serverState: AnchorServerState
}) {
  const server = serverView[serverState]
  const isRestarting = serverState === 'restarting'
  const isStopped = serverState === 'stopped' || serverState === 'disabled'

  const quickActionHandlers = [onCopyAddress, onShowQrCode, onRefreshLibrary]

  return (
    <div className="px-5 pt-5">
      <AnchorScreenHeader
        action={
          <AnchorIconButton label="Settings" onClick={onSettingsOpen}>
            <Settings size={21} />
          </AnchorIconButton>
        }
        subtitle="Control your local media server."
        title="Anchor"
      />

      <AnchorCard className="p-5">
        <div className="flex items-center justify-between gap-3">
          <div className={`flex items-center gap-3 text-sm font-semibold ${server.statusClass}`}>
            <span className={`grid h-7 w-7 place-items-center rounded-full border ${server.iconClass}`}>
              {isRestarting ? (
                <RefreshCw className="animate-spin" size={16} strokeWidth={2.4} />
              ) : (
                <Check size={17} strokeWidth={2.4} />
              )}
            </span>
            <span>{server.status}</span>
          </div>
          <MoreVertical className="text-slate-300/70" size={18} />
        </div>
        <h2 className="mt-4 font-serif text-[1.85rem] leading-none tracking-[-0.052em] text-white">
          {anchorServer.name}
        </h2>
        <dl className="mt-6 space-y-3 text-sm">
          {[
            ['Uptime', server.uptime],
            ['Library size', anchorServer.librarySize],
            ['Address', anchorServer.address],
          ].map(([label, value]) => (
            <div className="grid grid-cols-[5.6rem_minmax(0,1fr)] gap-2" key={label}>
              <dt className="text-slate-300/82">{label}</dt>
              <dd className="truncate font-medium text-white">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6 space-y-2.5">
          <button
            className={`flex h-10 w-full items-center justify-center gap-2 rounded-lg text-sm font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_0.8rem_1.5rem_rgba(245,158,11,0.12)] transition focus:outline-none focus:ring-2 focus:ring-amber-100/60 disabled:cursor-not-allowed disabled:opacity-60 ${server.primaryButton}`}
            disabled={isRestarting}
            onClick={isStopped ? onRestartServer : onStopServer}
            type="button"
          >
            {server.actionLabel}
            <Square size={14} strokeWidth={2.5} />
          </button>
          <button
            className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-white/[0.065] bg-white/[0.045] text-sm font-medium text-white transition hover:bg-white/[0.075] focus:outline-none focus:ring-2 focus:ring-amber-300/30"
            disabled={isRestarting}
            onClick={onRestartServer}
            type="button"
          >
            {isRestarting ? 'Restarting' : 'Restart'}
            <RotateCw className={isRestarting ? 'animate-spin' : ''} size={16} />
          </button>
        </div>
      </AnchorCard>

      <AnchorCard className="mt-3.5">
        <button
          className="flex w-full items-center gap-3 p-3.5 text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-300/30"
          onClick={onLibraryOpen}
          type="button"
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-amber-300/16 text-amber-300">
            <Folder size={25} fill="currentColor" strokeWidth={1.6} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold text-white">Library</span>
            <span className="mt-1 block truncate text-xs text-emerald-300">
              <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-300" />
              {anchorLibrary.status}
            </span>
            <span className="mt-1 block truncate text-[0.72rem] text-slate-300/72">
              {anchorLibrary.updated}
            </span>
          </span>
          <ChevronRight className="shrink-0 text-slate-300/75" size={19} />
        </button>
      </AnchorCard>

      <section className="mt-5">
        <h2 className="text-sm font-semibold text-white">Quick actions</h2>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {anchorQuickActions.map((action, index) => {
            const Icon = quickActionIcons[index]
            return (
              <button
                className="flex min-h-[5.2rem] min-w-0 flex-col items-center justify-center gap-2 rounded-xl border border-white/[0.065] bg-white/[0.045] px-2 py-3 text-center text-[0.7rem] leading-4 text-slate-200 transition hover:bg-white/[0.075] focus:outline-none focus:ring-2 focus:ring-amber-300/30"
                key={action}
                onClick={quickActionHandlers[index]}
                type="button"
              >
                <Icon
                  className={action === 'Refresh library' && scanState === 'scanning' ? 'animate-spin text-amber-200' : 'text-white'}
                  size={22}
                />
                <span>{action === 'Refresh library' && scanState === 'scanning' ? 'Refreshing' : action}</span>
              </button>
            )
          })}
        </div>
      </section>
    </div>
  )
}
