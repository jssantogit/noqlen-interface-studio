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
import {
  anchorLibrary,
  anchorQuickActions,
  anchorServer,
} from '../anchorMockData'
import { AnchorCard, AnchorIconButton, AnchorScreenHeader } from './AnchorCard'

const quickActionIcons = [Copy, QrCode, RefreshCw]

export function AnchorHome() {
  return (
    <div className="px-5 pt-5">
      <AnchorScreenHeader
        action={
          <AnchorIconButton label="Settings">
            <Settings size={21} />
          </AnchorIconButton>
        }
        subtitle="Control your local media server."
        title="Anchor"
      />

      <AnchorCard className="p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-sm font-semibold text-amber-300">
            <span className="grid h-7 w-7 place-items-center rounded-full border border-amber-300 text-amber-300">
              <Check size={17} strokeWidth={2.4} />
            </span>
            <span>{anchorServer.status}</span>
          </div>
          <MoreVertical className="text-slate-300/70" size={18} />
        </div>
        <h2 className="mt-4 font-serif text-[1.85rem] leading-none tracking-[-0.052em] text-white">
          {anchorServer.name}
        </h2>
        <dl className="mt-6 space-y-3 text-sm">
          {[
            ['Uptime', anchorServer.uptime],
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
            className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-amber-400 text-sm font-semibold text-[#211508] shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_0.8rem_1.5rem_rgba(245,158,11,0.16)] transition hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-100/60"
            type="button"
          >
            Stop server
            <Square size={14} strokeWidth={2.5} />
          </button>
          <button
            className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-white/[0.065] bg-white/[0.045] text-sm font-medium text-white transition hover:bg-white/[0.075] focus:outline-none focus:ring-2 focus:ring-amber-300/30"
            type="button"
          >
            Restart
            <RotateCw size={16} />
          </button>
        </div>
      </AnchorCard>

      <AnchorCard className="mt-3.5">
        <button
          className="flex w-full items-center gap-3 p-3.5 text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-300/30"
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
                type="button"
              >
                <Icon className="text-white" size={22} />
                <span>{action}</span>
              </button>
            )
          })}
        </div>
      </section>
    </div>
  )
}
