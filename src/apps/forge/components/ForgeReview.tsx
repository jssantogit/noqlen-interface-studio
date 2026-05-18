import { Check, ChevronDown, ChevronUp, Image, Music2, RotateCcw, Tags } from 'lucide-react'
import { useMemo, useState } from 'react'
import { reviewGroups, type ReviewItemStatus, type ReviewItemType } from '../forgeMockData'
import { CoverGradient } from './ForgeCard'
import { ForgeScreenHeader } from './ForgeCard'
import { ForgeBottomSheet } from './ForgeBottomSheet'

const iconMap = { Music2, Image, Tags }

const ignoreReasons = [
  'Not needed',
  'Wrong suggestion',
  'Review later',
  'Keep current metadata',
]

export type ReviewFilter = 'all' | 'lyrics' | 'covers' | 'genres'

export function ForgeReview({
  filter,
  itemStatuses,
  selectedIds,
  sessionFixed,
  sessionIgnored,
  showToast,
  showConfirm,
  onClearFilter,
  onOpenItemDetail,
  onResetQueue,
  onSetItemStatuses,
  onSetSelectedIds,
  onSetSessionFixed,
  onSetSessionIgnored,
}: {
  filter?: ReviewFilter
  itemStatuses: Record<string, ReviewItemStatus>
  selectedIds: Set<string>
  sessionFixed: number
  sessionIgnored: number
  showToast: (message: string, tone?: 'success' | 'info' | 'warning') => void
  showConfirm: (opts: {
    title: string
    description: string
    confirmLabel: string
    onConfirm: () => void
    tone?: 'amber' | 'danger'
  }) => void
  onClearFilter?: () => void
  onOpenItemDetail?: (itemId: string, type: ReviewItemType) => void
  onResetQueue?: () => void
  onSetItemStatuses: React.Dispatch<React.SetStateAction<Record<string, ReviewItemStatus>>>
  onSetSelectedIds: React.Dispatch<React.SetStateAction<Set<string>>>
  onSetSessionFixed: React.Dispatch<React.SetStateAction<number>>
  onSetSessionIgnored: React.Dispatch<React.SetStateAction<number>>
}) {
  const [openGroups, setOpenGroups] = useState<Set<string>>(
    () => new Set(['lyrics', 'covers', 'genres']),
  )
  const [ignoreSheetOpen, setIgnoreSheetOpen] = useState(false)
  const [ignoreReason, setIgnoreReason] = useState<string | null>(null)

  const allPendingIds = useMemo(() => {
    const ids: string[] = []
    reviewGroups.forEach((g) => {
      if (filter && filter !== 'all' && g.id !== filter) return
      g.items.forEach((i) => {
        if (itemStatuses[i.id] === 'pending') ids.push(i.id)
      })
    })
    return ids
  }, [filter, itemStatuses])

  const visibleGroups = useMemo(() => {
    const groups = filter && filter !== 'all'
      ? reviewGroups.filter((g) => g.id === filter)
      : reviewGroups
    return groups.map((g) => ({
      ...g,
      pendingItems: g.items.filter((i) => itemStatuses[i.id] === 'pending'),
    }))
  }, [filter, itemStatuses])

  const hasAnyPending = visibleGroups.some((g) => g.pendingItems.length > 0)
  const selectedCount = useMemo(() => {
    let count = 0
    selectedIds.forEach((id) => {
      if (itemStatuses[id] === 'pending') count++
    })
    return count
  }, [selectedIds, itemStatuses])

  const toggleItem = (id: string) => {
    if (itemStatuses[id] !== 'pending') return
    onSetSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleGroup = (groupId: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev)
      if (next.has(groupId)) next.delete(groupId)
      else next.add(groupId)
      return next
    })
  }

  const applyFixSelected = () => {
    if (selectedCount === 0) {
      showToast('Select review items first', 'warning')
      return
    }
    const idsToFix = Array.from(selectedIds).filter((id) => itemStatuses[id] === 'pending')
    const breakdown: Record<string, number> = {}
    idsToFix.forEach((id) => {
      const item = reviewGroups.flatMap((g) => g.items).find((i) => i.id === id)
      if (item) {
        breakdown[item.type] = (breakdown[item.type] || 0) + 1
      }
    })
    const summary = Object.entries(breakdown)
      .map(([type, count]) => `${count} ${type}`)
      .join(', ')

    showConfirm({
      title: 'Fix selected items?',
      description: `Forge will apply mock fixes to ${idsToFix.length} selected review items in this Studio preview.${summary ? ` (${summary})` : ''}`,
      confirmLabel: 'Fix selected',
      onConfirm: () => {
        onSetItemStatuses((prev) => {
          const next = { ...prev }
          idsToFix.forEach((id) => { next[id] = 'fixed' })
          return next
        })
        onSetSessionFixed((s) => s + idsToFix.length)
        onSetSelectedIds(new Set())
        showToast('Selected fixes applied in mock preview')
      },
    })
  }

  const applyFixAll = () => {
    const idsToFix = [...allPendingIds]
    if (idsToFix.length === 0) {
      showToast('No pending items to fix', 'warning')
      return
    }
    const filterLabel = filter && filter !== 'all' ? ` (${filter})` : ''
    showConfirm({
      title: 'Fix all review items?',
      description: `Forge will mark all ${idsToFix.length} pending items${filterLabel} in the current queue as fixed in the mock preview.`,
      confirmLabel: 'Fix all',
      onConfirm: () => {
        onSetItemStatuses((prev) => {
          const next = { ...prev }
          idsToFix.forEach((id) => { next[id] = 'fixed' })
          return next
        })
        onSetSessionFixed((s) => s + idsToFix.length)
        onSetSelectedIds(new Set())
        showToast('Review queue fixed in mock preview')
      },
    })
  }

  const openIgnoreSheet = () => {
    if (selectedCount === 0) {
      showToast('Select review items first', 'warning')
      return
    }
    setIgnoreReason(null)
    setIgnoreSheetOpen(true)
  }

  const applyIgnoreSelected = () => {
    const idsToIgnore = Array.from(selectedIds).filter((id) => itemStatuses[id] === 'pending')
    onSetItemStatuses((prev) => {
      const next = { ...prev }
      idsToIgnore.forEach((id) => { next[id] = 'ignored' })
      return next
    })
    onSetSessionIgnored((s) => s + idsToIgnore.length)
    onSetSelectedIds(new Set())
    setIgnoreSheetOpen(false)
    showToast('Selected items ignored in mock preview')
  }

  return (
    <div className="min-h-full px-7 pb-28 text-white">
      <ForgeScreenHeader title="Review" />
      <p className="-mt-5 mb-5 text-sm leading-5 text-white/52">
        Select items to fix or ignore.
      </p>

      {filter && filter !== 'all' && (
        <div className="mb-4 flex items-center gap-2">
          <span className="rounded-xl bg-[#e7a35f]/15 px-3 py-1.5 text-xs font-medium text-[#e7a35f]">
            {filter === 'lyrics' && 'Missing lyrics'}
            {filter === 'covers' && 'Better covers'}
            {filter === 'genres' && 'Missing genres'}
          </span>
          <span className="text-xs text-white/40">queue</span>
          {onClearFilter && (
            <button
              className="ml-auto text-xs text-white/55 transition hover:text-white"
              onClick={onClearFilter}
              type="button"
            >
              View all
            </button>
          )}
        </div>
      )}

      {(sessionFixed > 0 || sessionIgnored > 0) && (
        <div className="mb-4 rounded-2xl border border-white/[0.06] bg-white/[0.035] p-3">
          <p className="text-xs font-medium text-white/70">Session summary</p>
          <div className="mt-1.5 flex gap-3">
            {sessionFixed > 0 && (
              <span className="text-xs text-emerald-300">{sessionFixed} fixed</span>
            )}
            {sessionIgnored > 0 && (
              <span className="text-xs text-orange-300">{sessionIgnored} ignored</span>
            )}
          </div>
        </div>
      )}

      <div className="mb-4 grid grid-cols-3 gap-2">
        <button
          className={`min-h-11 rounded-xl px-2 text-[11px] font-semibold leading-tight transition ${selectedCount > 0 ? 'bg-[#e7a35f] text-black hover:bg-[#efad6c]' : 'bg-white/[0.07] text-white/40 cursor-not-allowed'}`}
          disabled={selectedCount === 0}
          onClick={applyFixSelected}
          type="button"
        >
          Fix selected{selectedCount > 0 ? ` (${selectedCount})` : ''}
        </button>
        <button
          className="min-h-11 rounded-xl bg-white/[0.07] px-2 text-[11px] font-medium leading-tight text-white/82 transition hover:bg-white/[0.1]"
          onClick={applyFixAll}
          type="button"
        >
          Fix all ({allPendingIds.length})
        </button>
        <button
          className={`min-h-11 rounded-xl px-2 text-[11px] font-medium leading-tight transition ${selectedCount > 0 ? 'bg-white/[0.07] text-white/82 hover:bg-white/[0.1]' : 'bg-white/[0.07] text-white/40 cursor-not-allowed'}`}
          disabled={selectedCount === 0}
          onClick={openIgnoreSheet}
          type="button"
        >
          Ignore selected
        </button>
      </div>

      {!hasAnyPending ? (
        <div className="mt-8 flex flex-col items-center gap-3 text-center">
          <p className="text-lg font-medium text-white">Review queue clear</p>
          <p className="max-w-[220px] text-sm leading-5 text-white/50">
            No pending items for this filter.
          </p>
          <div className="mt-2 flex gap-2">
            {onClearFilter && filter && filter !== 'all' && (
              <button
                className="h-9 rounded-lg bg-white/[0.07] px-4 text-xs font-medium text-white transition hover:bg-white/[0.1]"
                onClick={onClearFilter}
                type="button"
              >
                View all
              </button>
            )}
            {onResetQueue && (
              <button
                className="flex h-9 items-center gap-1.5 rounded-lg bg-white/[0.07] px-4 text-xs font-medium text-white transition hover:bg-white/[0.1]"
                onClick={onResetQueue}
                type="button"
              >
                <RotateCcw size={13} />
                Reset mock queue
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {visibleGroups.map((group) => {
            const Icon = iconMap[group.icon]
            const isOpen = openGroups.has(group.id)
            const pendingCount = group.pendingItems.length
            if (pendingCount === 0) return null
            return (
              <section
                className="rounded-2xl border border-white/[0.06] bg-white/[0.035] p-3"
                key={group.id}
              >
                <button
                  className="flex w-full items-center gap-3 text-left"
                  onClick={() => toggleGroup(group.id)}
                  type="button"
                >
                  <Icon className={`${group.accent} shrink-0`} size={18} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white">{group.title}</p>
                    <p className="text-[11px] text-white/45">
                      {pendingCount} pending
                    </p>
                  </div>
                  <span className="rounded-xl bg-white/[0.07] px-3 py-1.5 text-xs font-medium text-orange-200">
                    {isOpen ? 'Hide' : 'Show'}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="shrink-0 text-white/40" size={16} />
                  ) : (
                    <ChevronDown className="shrink-0 text-white/40" size={16} />
                  )}
                </button>

                {isOpen && (
                  <div className="mt-3 space-y-1">
                    {group.pendingItems.map((item) => {
                      const active = selectedIds.has(item.id)
                      return (
                        <div
                          className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition hover:bg-white/[0.045]"
                          key={item.id}
                        >
                          <button
                            className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border text-[10px] transition ${active ? 'border-[#e7a35f] bg-[#e7a35f] text-black' : 'border-white/25 text-transparent'}`}
                            onClick={() => toggleItem(item.id)}
                            type="button"
                          >
                            <Check size={13} />
                          </button>
                          <button
                            className="flex min-w-0 flex-1 items-center gap-3 text-left"
                            onClick={() => onOpenItemDetail?.(item.id, item.type)}
                            type="button"
                          >
                            <CoverGradient
                              className="h-9 w-9 shrink-0 rounded-lg"
                              gradient="from-stone-200 via-stone-500 to-stone-950"
                            />
                            <div className="min-w-0 flex-1 text-left">
                              <p className="truncate text-sm text-white/80">
                                {item.title}
                              </p>
                              <p className="truncate text-[11px] text-white/40">
                                {item.artist}
                                {item.album ? ` — ${item.album}` : ''}
                              </p>
                            </div>
                          </button>
                        </div>
                      )
                    })}
                  </div>
                )}
              </section>
            )
          })}
        </div>
      )}

      {ignoreSheetOpen && (
        <ForgeBottomSheet
          onClose={() => setIgnoreSheetOpen(false)}
          subtitle="Ignored items will be hidden from the active review queue in this mock preview."
          title="Ignore selected items?"
        >
          <div className="space-y-4">
            <p className="text-xs text-white/50">Optional reason</p>
            <div className="flex flex-wrap gap-2">
              {ignoreReasons.map((reason) => (
                <button
                  key={reason}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${ignoreReason === reason ? 'bg-[#e7a35f] text-black' : 'bg-white/[0.07] text-white/70 hover:bg-white/[0.1]'}`}
                  onClick={() => setIgnoreReason(reason)}
                  type="button"
                >
                  {reason}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <button
                className="h-10 rounded-lg border border-white/[0.075] bg-white/[0.045] text-sm font-medium text-white transition hover:bg-white/[0.075]"
                onClick={() => setIgnoreSheetOpen(false)}
                type="button"
              >
                Cancel
              </button>
              <button
                className="h-10 rounded-lg bg-amber-400 text-sm font-semibold text-[#211508] transition hover:bg-amber-300"
                onClick={applyIgnoreSelected}
                type="button"
              >
                Ignore selected
              </button>
            </div>
          </div>
        </ForgeBottomSheet>
      )}
    </div>
  )
}
