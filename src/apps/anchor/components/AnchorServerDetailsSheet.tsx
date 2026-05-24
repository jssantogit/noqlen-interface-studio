import { FileText, Settings } from 'lucide-react'
import { anchorServer } from '../anchorMockData'
import { AnchorBottomSheet } from './AnchorBottomSheet'

export function AnchorServerDetailsSheet({
  onClose,
  onOpenLogs,
  onOpenSettings,
  statusLabel,
}: {
  onClose: () => void
  onOpenLogs: () => void
  onOpenSettings: () => void
  statusLabel: string
}) {
  return (
    <AnchorBottomSheet
      onClose={onClose}
      subtitle={anchorServer.description}
      title={anchorServer.name}
    >
      <div className="space-y-4">
        <section className="rounded-2xl border border-white/[0.065] bg-white/[0.04] p-3.5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300/70">
              Status
            </span>
            <span className="rounded-full bg-emerald-400/14 px-2.5 py-1 text-[0.68rem] font-medium text-emerald-300">
              <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-300" />
              {statusLabel}
            </span>
          </div>
          <dl className="space-y-3 text-xs">
            {[
              ['Address', anchorServer.address],
              ['Version', anchorServer.version],
              ['Uptime', anchorServer.uptime],
              ['Library', anchorServer.librarySize],
              ['Last activity', '12 min ago'],
            ].map(([label, value]) => (
              <div className="grid grid-cols-[5.3rem_minmax(0,1fr)] gap-3" key={label}>
                <dt className="text-slate-300/74">{label}</dt>
                <dd className="truncate text-white">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <p className="rounded-2xl border border-amber-300/12 bg-amber-300/[0.055] px-3.5 py-3 text-xs leading-5 text-amber-50/82">
          Server details and status.
        </p>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            className="flex h-10 items-center justify-center gap-2 rounded-xl border border-white/[0.075] bg-white/[0.045] text-xs font-semibold text-white transition hover:bg-white/[0.075] focus:outline-none focus:ring-2 focus:ring-amber-300/30"
            onClick={onOpenSettings}
            type="button"
          >
            <Settings size={15} />
            Configure Navidrome
          </button>
          <button
            className="flex h-10 items-center justify-center gap-2 rounded-xl border border-white/[0.075] bg-white/[0.045] text-xs font-semibold text-white transition hover:bg-white/[0.075] focus:outline-none focus:ring-2 focus:ring-amber-300/30"
            onClick={onOpenLogs}
            type="button"
          >
            <FileText size={15} />
            View logs
          </button>
        </div>

        <button
          className="h-10 w-full rounded-xl bg-amber-400 text-sm font-semibold text-[#211508] transition hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-100/70"
          onClick={onClose}
          type="button"
        >
          Close
        </button>
      </div>
    </AnchorBottomSheet>
  )
}
