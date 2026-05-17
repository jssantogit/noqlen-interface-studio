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
import { AnchorActionRow } from './AnchorActionRow'
import { AnchorCard, AnchorScreenHeader } from './AnchorCard'

const actionIcons = [FolderOpen, RefreshCw, ShieldCheck, Settings]

export function AnchorLibrary({
  lastScan,
  onChangeFolder,
  onOpenScanHistory,
  onOpenStats,
  onRefreshLibrary,
  onVerifyAccess,
  onOpenSettings,
  path,
}: {
  lastScan: string
  onChangeFolder: () => void
  onOpenScanHistory: () => void
  onOpenSettings: () => void
  onOpenStats: () => void
  onRefreshLibrary: () => void
  onVerifyAccess: () => void
  path: string
}) {
  const actionHandlers = [onChangeFolder, onRefreshLibrary, onVerifyAccess, onOpenSettings]
  const footer = anchorLibrary.footer.map((item) =>
    item.label === 'Last scan' ? { ...item, value: lastScan } : item,
  )

  return (
    <div className="px-5 pt-5">
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
            <h2 className="truncate text-base font-semibold text-white">
              {anchorLibrary.name}
            </h2>
            <p className="mt-2 truncate text-xs font-medium text-emerald-300">
              <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-300" />
              {anchorLibrary.status}
            </p>
            <p className="mt-1 truncate text-[0.72rem] text-slate-300/72">
              Last updated {lastScan}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 border-t border-white/[0.055]">
          {anchorLibrary.stats.map((stat) => (
            <button
              className="border-r border-white/[0.045] px-2 py-4 text-center transition hover:bg-white/[0.035] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-300/30 last:border-r-0"
              key={stat.label}
              onClick={onOpenStats}
              type="button"
            >
              <p className="text-xl leading-none tracking-[-0.035em] text-white">
                {stat.value}
              </p>
              <p className="mt-2 text-[0.7rem] text-slate-300/72">{stat.label}</p>
            </button>
          ))}
        </div>
      </AnchorCard>

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
