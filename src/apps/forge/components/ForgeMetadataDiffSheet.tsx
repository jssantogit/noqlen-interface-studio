import { ArrowRight } from 'lucide-react'
import { ForgeBottomSheet } from './ForgeBottomSheet'

export interface DiffRow {
  label: string
  before: string
  after: string
}

export function ForgeMetadataDiffSheet({
  title,
  subtitle,
  rows,
  applyLabel = 'Apply change',
  onApply,
  onClose,
}: {
  title: string
  subtitle?: string
  rows: DiffRow[]
  applyLabel?: string
  onApply: () => void
  onClose: () => void
}) {
  return (
    <ForgeBottomSheet onClose={onClose} subtitle={subtitle} title={title}>
      <div className="space-y-5">
        {/* Diff rows */}
        <div className="space-y-2">
          {rows.map((row, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-white/[0.06] bg-white/[0.035] p-3"
            >
              <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-white/40">{row.label}</p>
              <div className="flex items-center gap-2">
                <span className="min-w-0 flex-1 truncate text-xs text-white/50 line-through">{row.before}</span>
                <ArrowRight className="shrink-0 text-white/20" size={12} />
                <span className="min-w-0 flex-1 truncate text-xs text-emerald-300">{row.after}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mock-only note */}
        <p className="text-center text-[11px] leading-4 text-white/35">
          This is a mock preview. No real metadata will be changed.
        </p>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <button
            className="h-10 rounded-lg border border-white/[0.075] bg-white/[0.045] text-sm font-medium text-white transition hover:bg-white/[0.075]"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
          <button
            className="h-10 rounded-lg bg-[#e7a35f] text-sm font-semibold text-[#211508] shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_0.5rem_1rem_rgba(234,154,92,0.12)] transition hover:bg-[#efad6c]"
            onClick={onApply}
            type="button"
          >
            {applyLabel}
          </button>
        </div>
      </div>
    </ForgeBottomSheet>
  )
}
