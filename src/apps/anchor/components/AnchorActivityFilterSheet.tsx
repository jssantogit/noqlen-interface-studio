import { Check } from 'lucide-react'
import type { AnchorActivityFilter } from '../anchorMockData'
import { AnchorBottomSheet } from './AnchorBottomSheet'

const filterOptions: Array<{ id: AnchorActivityFilter; label: string; detail: string }> = [
  { id: 'all', label: 'All', detail: 'Show every mock event' },
  { id: 'server', label: 'Server', detail: 'Server starts, restarts and failures' },
  { id: 'library', label: 'Library', detail: 'Mock library scan and update events' },
  { id: 'errors', label: 'Errors', detail: 'Only failed mock events' },
  { id: 'today', label: 'Today', detail: 'Events grouped under Today' },
  { id: 'yesterday', label: 'Yesterday', detail: 'Events grouped under Yesterday' },
]

export function AnchorActivityFilterSheet({
  activeFilter,
  onChange,
  onClose,
}: {
  activeFilter: AnchorActivityFilter
  onChange: (filter: AnchorActivityFilter) => void
  onClose: () => void
}) {
  return (
    <AnchorBottomSheet
      onClose={onClose}
      subtitle="Choose which mock events are shown."
      title="Filter activity"
    >
      <div className="grid gap-2">
        {filterOptions.map((option) => {
          const selected = option.id === activeFilter
          return (
            <button
              className={`flex w-full items-center gap-3 rounded-2xl border px-3.5 py-3 text-left transition focus:outline-none focus:ring-2 focus:ring-amber-300/35 ${
                selected
                  ? 'border-amber-300/35 bg-amber-300/12 text-amber-50'
                  : 'border-white/[0.07] bg-white/[0.035] text-white hover:bg-white/[0.06]'
              }`}
              key={option.id}
              onClick={() => onChange(option.id)}
              type="button"
            >
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold">{option.label}</span>
                <span className="mt-1 block truncate text-[0.7rem] leading-4 text-slate-300/76">
                  {option.detail}
                </span>
              </span>
              {selected ? (
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-amber-300/18 text-amber-100">
                  <Check size={15} />
                </span>
              ) : null}
            </button>
          )
        })}
      </div>
    </AnchorBottomSheet>
  )
}
