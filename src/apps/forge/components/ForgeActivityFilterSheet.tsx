import { Check } from 'lucide-react'
import { useState } from 'react'
import { ForgeBottomSheet } from './ForgeBottomSheet'
import type { ActivityFilter } from '../forgeMockData'

const filterOptions: { label: string; value: ActivityFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Lyrics', value: 'lyrics' },
  { label: 'Artwork', value: 'artwork' },
  { label: 'Metadata', value: 'metadata' },
  { label: 'Library edits', value: 'libraryEdit' },
  { label: 'Warnings', value: 'warning' },
  { label: 'Failed', value: 'failed' },
  { label: 'Completed', value: 'completed' },
]

const sortOptions = [
  { label: 'Newest first', value: 'newest' },
  { label: 'Oldest first', value: 'oldest' },
]

export function ForgeActivityFilterSheet({
  activeFilter,
  activeSort,
  onApply,
  onReset,
  onClose,
}: {
  activeFilter: ActivityFilter
  activeSort: 'newest' | 'oldest'
  onApply: (filter: ActivityFilter, sort: 'newest' | 'oldest') => void
  onReset: () => void
  onClose: () => void
}) {
  const [pendingFilter, setPendingFilter] = useState<ActivityFilter>(activeFilter)
  const [pendingSort, setPendingSort] = useState<'newest' | 'oldest'>(activeSort)

  return (
    <ForgeBottomSheet onClose={onClose} title="Filter activity">
      <div className="space-y-6">
        <div>
          <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-white/45">Type</p>
          <div className="space-y-1.5">
            {filterOptions.map((opt) => (
              <button
                key={opt.value}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition ${
                  pendingFilter === opt.value
                    ? 'bg-orange-400/10 text-orange-200'
                    : 'text-white/75 hover:bg-white/[0.05]'
                }`}
                onClick={() => setPendingFilter(opt.value)}
                type="button"
              >
                {opt.label}
                {pendingFilter === opt.value ? <Check size={16} className="text-orange-300" /> : null}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-white/45">Sort</p>
          <div className="space-y-1.5">
            {sortOptions.map((opt) => (
              <button
                key={opt.value}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition ${
                  pendingSort === opt.value
                    ? 'bg-orange-400/10 text-orange-200'
                    : 'text-white/75 hover:bg-white/[0.05]'
                }`}
                onClick={() => setPendingSort(opt.value as 'newest' | 'oldest')}
                type="button"
              >
                {opt.label}
                {pendingSort === opt.value ? <Check size={16} className="text-orange-300" /> : null}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2.5 pt-2">
          <button
            className="flex-1 rounded-xl bg-white/[0.07] py-3 text-sm font-medium text-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition hover:bg-white/[0.11]"
            onClick={onReset}
            type="button"
          >
            Reset
          </button>
          <button
            className="flex-1 rounded-xl bg-orange-400/13 py-3 text-sm font-medium text-orange-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition hover:bg-orange-400/20"
            onClick={() => onApply(pendingFilter, pendingSort)}
            type="button"
          >
            Apply
          </button>
        </div>
      </div>
    </ForgeBottomSheet>
  )
}
