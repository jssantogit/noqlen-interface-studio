import { AlertTriangle, CheckCircle2 } from 'lucide-react'
import { AnchorBottomSheet } from './AnchorBottomSheet'

const scans = [
  { time: 'Today, 12 min ago', duration: '1m 42s', status: 'Completed' },
  { time: 'Yesterday, 8:41 PM', duration: '2m 08s', status: 'Completed' },
  { time: 'Yesterday, 9:03 AM', duration: '0m 14s', status: 'Failed' },
]

export function AnchorScanHistorySheet({ onClose }: { onClose: () => void }) {
  return (
    <AnchorBottomSheet onClose={onClose} subtitle="Recent mock scans for this Studio preview." title="Scan history">
      <div className="space-y-4">
        <div className="space-y-2">
          {scans.map((scan) => {
            const failed = scan.status === 'Failed'
            return (
              <div className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.035] p-3" key={`${scan.time}-${scan.duration}`}>
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${
                    failed ? 'bg-orange-300/14 text-orange-300' : 'bg-emerald-300/14 text-emerald-300'
                  }`}
                >
                  {failed ? <AlertTriangle size={18} /> : <CheckCircle2 size={18} />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-white">{scan.time}</p>
                  <p className="mt-1 truncate text-[0.7rem] text-slate-300/72">
                    {scan.duration} - {scan.status}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <p className="rounded-xl border border-orange-300/16 bg-orange-300/[0.055] px-3 py-2.5 text-xs leading-5 text-orange-100/88">
          Failed scan note: Port 4533 already in use.
        </p>

        <button
          className="h-10 w-full rounded-lg bg-amber-300 text-sm font-semibold text-slate-950 transition hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-100/70"
          onClick={onClose}
          type="button"
        >
          Close
        </button>
      </div>
    </AnchorBottomSheet>
  )
}
