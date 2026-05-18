import {
  BarChart3,
  Folder,
  FolderOpen,
  RefreshCw,
  Settings,
  ShieldCheck,
  SignalHigh,
} from 'lucide-react'
import { anchorLibrary, anchorLibraryActions } from '../anchorMockData'
import type { AnchorLibraryState } from '../anchorState'
import { AnchorActionRow } from './AnchorActionRow'
import { AnchorCard, AnchorScreenHeader } from './AnchorCard'

const actionIcons = [FolderOpen, RefreshCw, ShieldCheck, Settings]

const libraryStateView: Record<AnchorLibraryState, {
  detail: string
  footer: string
  note?: string
  stats: Array<{ label: string; value: string }>
  status: string
  statusClass: string
}> = {
  accessible: {
    detail: 'Last updated',
    footer: '12 min ago',
    stats: anchorLibrary.stats,
    status: anchorLibrary.status,
    statusClass: 'text-emerald-300',
  },
  scanning: {
    detail: 'Scanning',
    footer: 'running now',
    note: 'Mock scan is in progress. Refresh is already active.',
    stats: anchorLibrary.stats,
    status: 'Scanning',
    statusClass: 'text-amber-200',
  },
  empty: {
    detail: 'No music indexed',
    footer: 'never',
    note: 'No music indexed. Choose a folder or refresh the library preview.',
    stats: anchorLibrary.stats.map((stat) => ({ ...stat, value: '0' })),
    status: 'Empty',
    statusClass: 'text-slate-300',
  },
  permissionWarning: {
    detail: 'Access warning',
    footer: 'needs review',
    note: 'Folder permissions should be reviewed in the mock access check.',
    stats: anchorLibrary.stats,
    status: 'Permission warning',
    statusClass: 'text-orange-300',
  },
  accessDenied: {
    detail: 'Access denied',
    footer: 'blocked',
    note: 'The selected folder cannot be read in this mock state. Change folder or verify access.',
    stats: anchorLibrary.stats.map((stat) => ({ ...stat, value: '0' })),
    status: 'Access denied',
    statusClass: 'text-red-300',
  },
  scanFailed: {
    detail: 'Scan failed',
    footer: 'failed',
    note: 'The last mock scan failed. Retry refresh to replay scan progress.',
    stats: anchorLibrary.stats,
    status: 'Scan failed',
    statusClass: 'text-red-300',
  },
}

export function AnchorLibrary({
  lastScan,
  libraryState,
  onChangeFolder,
  onOpenScanHistory,
  onOpenStats,
  onRefreshLibrary,
  onVerifyAccess,
  onOpenSettings,
  path,
}: {
  lastScan: string
  libraryState: AnchorLibraryState
  onChangeFolder: () => void
  onOpenScanHistory: () => void
  onOpenSettings: () => void
  onOpenStats: () => void
  onRefreshLibrary: () => void
  onVerifyAccess: () => void
  path: string
}) {
  const view = libraryStateView[libraryState]
  const actionHandlers = [onChangeFolder, onRefreshLibrary, onVerifyAccess, onOpenSettings]
  const footer = anchorLibrary.footer.map((item) =>
    item.label === 'Last scan' ? { ...item, value: libraryState === 'accessible' ? lastScan : view.footer } : item,
  )

  return (
    <div className="w-full min-w-0 max-w-full px-4 pt-5 sm:px-5">
      <AnchorScreenHeader
        subtitle="Manage your media library."
        title="Library"
      />

      <AnchorCard className="overflow-hidden">
        <div className="flex items-center gap-4 p-4">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-amber-300/18 text-amber-300 shadow-inner shadow-amber-950/30">
            <Folder size={36} fill="currentColor" strokeWidth={1.25} />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="break-words text-base font-semibold text-white">
              {anchorLibrary.name}
            </h2>
            <p className={`mt-2 break-words text-xs font-medium ${view.statusClass}`}>
              <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-current" />
              {view.status}
            </p>
            <p className="mt-1 break-words text-[0.72rem] text-slate-300/72">
              {view.detail} {libraryState === 'accessible' ? lastScan : ''}
            </p>
          </div>
        </div>
        <div className="grid min-w-0 grid-cols-3 border-t border-white/[0.055]">
          {view.stats.map((stat) => (
            <button
              className="border-r border-white/[0.045] px-2 py-4 text-center transition hover:bg-white/[0.035] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-300/30 last:border-r-0"
              key={stat.label}
              onClick={onOpenStats}
              type="button"
            >
              <p className="break-words text-[clamp(0.95rem,5vw,1.25rem)] leading-none tracking-[-0.035em] text-white">
                {stat.value}
              </p>
              <p className="mt-2 break-words text-[0.68rem] text-slate-300/72">{stat.label}</p>
            </button>
          ))}
        </div>
      </AnchorCard>

      {view.note ? (
        <AnchorCard className="mt-3.5 border-orange-300/16 bg-orange-300/[0.045] p-4">
          <p className="text-sm font-semibold text-orange-100">{view.status}</p>
          <p className="mt-1 text-xs leading-5 text-orange-50/82">{view.note}</p>
        </AnchorCard>
      ) : null}

      <AnchorCard className="mt-3.5 overflow-hidden">
        {anchorLibraryActions.map((action, index) => {
          const Icon = actionIcons[index]
          return (
            <AnchorActionRow
              detail={index === 0 ? path : action.detail}
              icon={<Icon size={22} />}
              key={action.title}
              onClick={actionHandlers[index]}
              title={action.title}
            />
          )
        })}
      </AnchorCard>

      <AnchorCard className="mt-3.5 p-4">
        <div className="grid grid-cols-2 divide-x divide-white/[0.06]">
          {footer.map((item, index) => (
            <button
              className="flex min-w-0 items-center justify-center gap-3 px-2 text-left transition hover:bg-white/[0.025] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-300/30"
              key={item.label}
              onClick={onOpenScanHistory}
              type="button"
            >
              {index === 0 ? (
                <SignalHigh className="text-amber-300" size={22} />
              ) : (
                <BarChart3 className="text-amber-300" size={22} />
              )}
              <div className="min-w-0">
                <p className="truncate text-[0.72rem] text-slate-300/76">{item.label}</p>
                <p className="mt-1 truncate text-xs font-semibold text-white">{item.value}</p>
              </div>
            </button>
          ))}
        </div>
      </AnchorCard>
    </div>
  )
}
