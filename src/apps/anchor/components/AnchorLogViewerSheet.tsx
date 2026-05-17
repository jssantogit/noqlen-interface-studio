import { useState } from 'react'
import { AnchorBottomSheet } from './AnchorBottomSheet'

const logs = [
  { level: 'INFO', message: 'Server started on port 4533' },
  { level: 'INFO', message: 'Library scan completed' },
  { level: 'WARN', message: 'Artwork cache missing for 3 albums' },
  { level: 'ERROR', message: 'Port 4533 already in use' },
] as const

const filters = ['All', 'Info', 'Warnings', 'Errors'] as const

export function AnchorLogViewerSheet({ onClose }: { onClose: () => void }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All')
  const visibleLogs = logs.filter((log) => {
    if (filter === 'All') return true
    if (filter === 'Info') return log.level === 'INFO'
    if (filter === 'Warnings') return log.level === 'WARN'
    return log.level === 'ERROR'
  })

  return (
    <AnchorBottomSheet
      onClose={onClose}
      subtitle="Mock recent server output"
      title="Navidrome logs"
    >
      <div className="space-y-4">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {filters.map((item) => {
            const selected = filter === item
            return (
              <button
                aria-pressed={selected}
                className={`h-8 shrink-0 rounded-full border px-3 text-[0.72rem] font-semibold transition focus:outline-none focus:ring-2 focus:ring-amber-300/35 ${
                  selected
                    ? 'border-amber-300/35 bg-amber-300/18 text-amber-100'
                    : 'border-white/[0.07] bg-white/[0.035] text-slate-300 hover:bg-white/[0.07]'
                }`}
                key={item}
                onClick={() => setFilter(item)}
                type="button"
              >
                {item}
              </button>
            )
          })}
        </div>

        <section className="max-h-64 space-y-2 overflow-y-auto rounded-2xl border border-white/[0.065] bg-[#071014]/70 p-3">
          {visibleLogs.map((log) => {
            const tone =
              log.level === 'ERROR'
                ? 'text-orange-300'
                : log.level === 'WARN'
                  ? 'text-amber-300'
                  : 'text-emerald-300'
            return (
              <div
                className="rounded-xl border border-white/[0.055] bg-white/[0.035] px-3 py-2 font-mono text-[0.68rem] leading-5"
                key={`${log.level}-${log.message}`}
              >
                <span className={`mr-2 font-bold ${tone}`}>{log.level}</span>
                <span className="text-slate-100/88">{log.message}</span>
              </div>
            )
          })}
        </section>
      </div>
    </AnchorBottomSheet>
  )
}
