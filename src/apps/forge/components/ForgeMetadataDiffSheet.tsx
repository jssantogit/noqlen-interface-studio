import { ArrowRight, BadgeCheck } from 'lucide-react'
import { ForgeBottomSheet } from './ForgeBottomSheet'

export interface DiffRow {
  label: string
  before: string
  after: string
  afterChips?: string[]
  source?: string
  note?: string
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
        <div className="space-y-2.5">
          {rows.map((row, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-white/[0.06] bg-white/[0.035] p-3"
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <p className="text-[10px] font-medium uppercase tracking-wider text-white/42">{row.label}</p>
                {row.source && (
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#e7a35f]/18 bg-[#e7a35f]/10 px-2 py-1 text-[10px] font-semibold text-[#f0b879]">
                    <BadgeCheck size={10} />
                    {row.source}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <div className="rounded-lg bg-black/20 p-2">
                  <p className="text-[10px] uppercase tracking-wider text-white/34">Current</p>
                  <p className="mt-1 whitespace-normal break-words text-xs leading-4 text-white/55">{row.before}</p>
                </div>
                <div className="flex justify-center">
                  <ArrowRight className="text-white/22" size={13} />
                </div>
                <div className="rounded-lg border border-emerald-300/10 bg-emerald-300/[0.045] p-2">
                  <p className="text-[10px] uppercase tracking-wider text-emerald-200/55">Suggested</p>
                  {row.afterChips ? (
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {row.afterChips.map((chip) => (
                        <span
                          key={chip}
                          className="rounded-md bg-emerald-400/13 px-2 py-0.5 text-[11px] font-medium text-emerald-200"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-1 whitespace-normal break-words text-xs leading-4 text-emerald-200">{row.after}</p>
                  )}
                </div>
              </div>
              {row.note && <p className="mt-2 text-[11px] leading-4 text-[#f0b879]/75">{row.note}</p>}
            </div>
          ))}
        </div>

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
