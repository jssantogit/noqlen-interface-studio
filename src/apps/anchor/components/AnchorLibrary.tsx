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

export function AnchorLibrary() {
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
              {anchorLibrary.lastUpdated}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 border-t border-white/[0.055]">
          {anchorLibrary.stats.map((stat) => (
            <div
              className="border-r border-white/[0.045] px-2 py-4 text-center last:border-r-0"
              key={stat.label}
            >
              <p className="text-xl leading-none tracking-[-0.035em] text-white">
                {stat.value}
              </p>
              <p className="mt-2 text-[0.7rem] text-slate-300/72">{stat.label}</p>
            </div>
          ))}
        </div>
      </AnchorCard>

      <AnchorCard className="mt-3.5 overflow-hidden">
        {anchorLibraryActions.map((action, index) => {
          const Icon = actionIcons[index]
          return (
            <AnchorActionRow
              detail={action.detail}
              icon={<Icon size={22} />}
              key={action.title}
              title={action.title}
            />
          )
        })}
      </AnchorCard>

      <AnchorCard className="mt-3.5 p-4">
        <div className="grid grid-cols-2 divide-x divide-white/[0.06]">
          {anchorLibrary.footer.map((item, index) => (
            <div className="flex items-center justify-center gap-3 px-2" key={item.label}>
              {index === 0 ? (
                <SignalHigh className="text-amber-300" size={22} />
              ) : (
                <BarChart3 className="text-amber-300" size={22} />
              )}
              <div className="min-w-0">
                <p className="truncate text-[0.72rem] text-slate-300/76">{item.label}</p>
                <p className="mt-1 truncate text-xs font-semibold text-white">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </AnchorCard>
    </div>
  )
}
