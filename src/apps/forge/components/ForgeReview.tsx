import { Check, ChevronDown, ChevronRight, FileText, Image, Music2, RotateCcw, Tags } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'
import { useMemo, useState } from 'react'
import {
  forgeArtworkReviewItems,
  forgeLyricsReviewItems,
  forgeMetadataReviewItems,
  forgeReviewItems,
  type ForgeMetadataFilter,
  type ForgeReviewQueueItem,
  type ForgeReviewSection,
  type ReviewItemStatus,
  type ReviewItemType,
} from '../forgeMockData'
import { CoverGradient, ForgeCard, ForgeScreenHeader } from './ForgeCard'
import { ForgeBottomSheet } from './ForgeBottomSheet'

export type ReviewFilter = ForgeReviewSection

const tabs: { id: ForgeReviewSection; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'artwork', label: 'Artwork' },
  { id: 'lyrics', label: 'Lyrics' },
  { id: 'metadata', label: 'Metadata' },
]

const metadataFilters: { id: ForgeMetadataFilter; label: string }[] = [
  { id: 'tags', label: 'Tags' },
  { id: 'identity', label: 'Identity' },
  { id: 'release', label: 'Release' },
  { id: 'audio', label: 'Audio' },
]

const ignoreReasons = [
  'Not needed',
  'Wrong suggestion',
  'Review later',
  'Keep current metadata',
]

function getVisibleItems(filter: ReviewFilter, metadataFilter: ForgeMetadataFilter) {
  if (filter === 'artwork') return forgeArtworkReviewItems
  if (filter === 'lyrics') return forgeLyricsReviewItems
  if (filter === 'metadata') {
    return forgeMetadataReviewItems.filter((item) => item.metadataFilter === metadataFilter)
  }
  return forgeReviewItems
}

function sectionSubtitle(filter: ReviewFilter) {
  if (filter === 'artwork') return 'Artwork fixes'
  if (filter === 'lyrics') return 'Lyrics review'
  if (filter === 'metadata') return 'Metadata review'
  return 'Curate proposed repairs.'
}

function sectionQueueTitle(filter: ReviewFilter) {
  if (filter === 'artwork') return 'Artwork queue'
  if (filter === 'lyrics') return 'Lyrics queue'
  if (filter === 'metadata') return 'Metadata queue'
  return 'Review queue'
}

function summaryFor(filter: ReviewFilter) {
  if (filter === 'artwork') {
    return [
      { value: '12', label: 'artwork fixes', icon: Image },
      { value: '8', label: 'album covers', icon: Image },
      { value: '3', label: 'artist images', icon: Tags },
      { value: '1', label: 'missing cover', icon: Music2 },
    ]
  }
  if (filter === 'lyrics') {
    return [
      { value: '8', label: 'lyrics fixes', icon: FileText },
      { value: '5', label: 'missing', icon: FileText },
      { value: '2', label: 'incomplete', icon: Music2 },
      { value: '1', label: 'unsynced', icon: Tags },
    ]
  }
  if (filter === 'metadata') {
    return [
      { value: '22', label: 'metadata fixes', icon: Tags },
      { value: '14', label: 'safe', icon: Check },
      { value: '8', label: 'need review', icon: FileText },
    ]
  }
  return [
    { value: '17', label: 'items need review', icon: Tags },
    { value: '42', label: 'proposed fixes', icon: Check },
    { value: '9', label: 'need manual review', icon: FileText },
  ]
}

function statusTone(status: ForgeReviewQueueItem['proposalStatus']) {
  if (status === 'Safe') return 'bg-emerald-400/12 text-emerald-300'
  if (status === 'Protected') return 'bg-orange-300/12 text-orange-200'
  if (status === 'Conflict') return 'bg-red-300/12 text-red-200'
  if (status === 'Applied') return 'bg-white/[0.08] text-white/50'
  return 'bg-[#e7a35f]/12 text-[#e7a35f]'
}

function SummaryCard({ filter, onReviewSafeFixes }: { filter: ReviewFilter; onReviewSafeFixes: () => void }) {
  const stats = summaryFor(filter)
  return (
    <ForgeCard className="mb-5 p-5">
      <div className={`grid gap-3 ${stats.length === 4 ? 'grid-cols-4' : 'grid-cols-3'}`}>
        {stats.map(({ value, label, icon: Icon }) => (
          <div className="min-w-0 border-r border-white/[0.06] last:border-r-0" key={label}>
            <Icon className="mb-2 text-[#e7a35f]" size={15} />
            <p className="text-lg font-semibold leading-none text-white">{value}</p>
            <p className="mt-1 max-w-[58px] text-[10px] leading-3 text-white/58">{label}</p>
          </div>
        ))}
      </div>
      {filter === 'all' && (
        <>
          <div className="my-4 h-px bg-white/[0.07]" />
          <p className="text-[11px] text-white/44">Top areas</p>
          <p className="mt-1 text-xs font-semibold text-[#e7a35f]">Artwork · Lyrics · Metadata <span className="text-white/70">+3</span></p>
          <button
            className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#e7a35f] text-xs font-semibold text-[#211508] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_0.8rem_1.5rem_rgba(234,154,92,0.16)] transition hover:bg-[#efad6c]"
            onClick={onReviewSafeFixes}
            type="button"
          >
            Review safe fixes
            <ChevronRight size={15} />
          </button>
        </>
      )}
    </ForgeCard>
  )
}

function ReviewTabs({ active, onChange }: { active: ReviewFilter; onChange: (tab: ReviewFilter) => void }) {
  return (
    <div className="mb-5 grid grid-cols-4 rounded-2xl border border-white/[0.07] bg-black/18 p-1">
      {tabs.map((tab) => (
        <button
          className={`h-8 rounded-xl text-[12px] font-medium transition ${active === tab.id ? 'border border-[#e7a35f]/20 bg-[#e7a35f]/10 text-[#e7a35f]' : 'text-white/70 hover:bg-white/[0.05] hover:text-white'}`}
          key={tab.id}
          onClick={() => onChange(tab.id)}
          type="button"
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

function MetadataFilterChips({ active, onChange }: { active: ForgeMetadataFilter; onChange: (filter: ForgeMetadataFilter) => void }) {
  return (
    <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
      {metadataFilters.map((filter) => (
        <button
          className={`h-8 shrink-0 rounded-full px-4 text-xs font-medium transition ${active === filter.id ? 'border border-[#e7a35f]/35 bg-[#e7a35f]/12 text-[#e7a35f]' : 'border border-white/[0.07] bg-white/[0.035] text-white/66 hover:bg-white/[0.06]'}`}
          key={filter.id}
          onClick={() => onChange(filter.id)}
          type="button"
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}

function ReviewRow({
  filter,
  item,
  selected,
  onToggleSelected,
  onOpen,
}: {
  filter: ReviewFilter
  item: ForgeReviewQueueItem
  selected: boolean
  onToggleSelected: () => void
  onOpen: () => void
}) {
  const isAll = filter === 'all'
  const isMetadata = filter === 'metadata'
  const isArtwork = filter === 'artwork'
  return (
    <div className="flex gap-2 rounded-2xl border border-white/[0.06] bg-[linear-gradient(145deg,rgba(255,255,255,0.045),rgba(255,255,255,0.018))] p-3 shadow-[0_0.8rem_1.7rem_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.03)]">
      <button
        className={`mt-10 grid h-4 w-4 shrink-0 place-items-center rounded border text-[9px] transition ${selected ? 'border-[#e7a35f] bg-[#e7a35f] text-[#211508]' : 'border-white/25 text-transparent hover:border-white/45'}`}
        onClick={onToggleSelected}
        type="button"
      >
        <Check size={11} strokeWidth={2.5} />
      </button>
      <button className="flex min-w-0 flex-1 items-center gap-3 text-left" onClick={onOpen} type="button">
        <CoverGradient className="h-16 w-16 shrink-0 rounded-xl" gradient={item.gradient} />
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-2">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">{item.title}</p>
              <p className="mt-0.5 truncate text-xs text-white/50">{item.artist}</p>
            </div>
            {isMetadata && (
              <span className={`shrink-0 rounded-lg px-2 py-1 text-[10px] font-semibold ${statusTone(item.proposalStatus)}`}>
                {item.proposalStatus}
              </span>
            )}
          </div>

          {isAll && (
            <>
              <p className="mt-2 text-xs text-white/58">{item.proposedFixes} proposed fixes</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {item.chips.map((chip) => (
                  <span className="rounded-lg bg-[#e7a35f]/12 px-2 py-0.5 text-[10px] font-medium text-[#e7a35f]" key={chip}>{chip}</span>
                ))}
                {item.extraCount && <span className="rounded-lg bg-white/[0.07] px-2 py-0.5 text-[10px] text-white/65">+{item.extraCount}</span>}
              </div>
              <p className="mt-2 text-xs"><span className="text-emerald-300">Safe {item.safeCount}</span><span className="text-white/30"> · </span><span className="text-[#e7a35f]">Review {item.reviewCount}</span></p>
            </>
          )}

          {!isAll && (
            <>
              {item.detail && <p className="mt-2 text-xs font-medium text-white/78">{item.detail}</p>}
              <p className="mt-2 text-xs leading-4 text-white/62">{item.current}</p>
              <p className="text-xs leading-4 text-white/62">{item.suggested}</p>
              <div className="mt-3 flex items-center justify-between gap-3">
                {isArtwork ? <span className="text-[10px] text-white/35">Preview before applying</span> : <span className="text-[10px] text-white/35">Mock-only local change</span>}
                <span className="shrink-0 rounded-lg border border-[#e7a35f]/25 bg-[#e7a35f]/10 px-3 py-1.5 text-[11px] font-semibold text-[#f0b879]">
                  {item.actionLabel}
                </span>
              </div>
            </>
          )}
        </div>
        <ChevronRight className="shrink-0 text-white/38" size={16} />
      </button>
    </div>
  )
}

export function ForgeReview({
  filter = 'all',
  metadataFilter,
  itemStatuses,
  selectedIds,
  sessionFixed,
  sessionIgnored,
  showToast,
  showConfirm,
  onClearFilter,
  onOpenItemDetail,
  onResetQueue,
  onSetFilter,
  onSetMetadataFilter,
  onSetItemStatuses,
  onSetSelectedIds,
  onSetSessionFixed,
  onSetSessionIgnored,
}: {
  filter?: ReviewFilter
  metadataFilter: ForgeMetadataFilter
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
  onOpenItemDetail?: (itemId: string, type: ReviewItemType, section?: ForgeReviewSection) => void
  onResetQueue?: () => void
  onSetFilter: Dispatch<SetStateAction<ReviewFilter>>
  onSetMetadataFilter: Dispatch<SetStateAction<ForgeMetadataFilter>>
  onSetItemStatuses: Dispatch<SetStateAction<Record<string, ReviewItemStatus>>>
  onSetSelectedIds: Dispatch<SetStateAction<Set<string>>>
  onSetSessionFixed: Dispatch<SetStateAction<number>>
  onSetSessionIgnored: Dispatch<SetStateAction<number>>
}) {
  const [ignoreSheetOpen, setIgnoreSheetOpen] = useState(false)
  const [ignoreReason, setIgnoreReason] = useState<string | null>(null)

  const visibleItems = useMemo(
    () => getVisibleItems(filter, metadataFilter).filter((item) => itemStatuses[item.id] === 'pending'),
    [filter, metadataFilter, itemStatuses],
  )

  const safeFixCount = useMemo(
    () => visibleItems.reduce((total, item) => total + (item.safeCount ?? (item.proposalStatus === 'Safe' ? 1 : 0)), 0),
    [visibleItems],
  )

  const selectedCount = useMemo(() => {
    let count = 0
    selectedIds.forEach((id) => {
      if (itemStatuses[id] === 'pending') count++
    })
    return count
  }, [selectedIds, itemStatuses])

  const setFilter = (nextFilter: ReviewFilter) => {
    onSetFilter(nextFilter)
    if (nextFilter === 'metadata') onSetMetadataFilter('tags')
    onSetSelectedIds(new Set())
  }

  const applyIds = (ids: string[], message: string) => {
    onSetItemStatuses((prev) => {
      const next = { ...prev }
      ids.forEach((id) => { next[id] = 'fixed' })
      return next
    })
    onSetSessionFixed((s) => s + ids.length)
    onSetSelectedIds(new Set())
    showToast(message)
  }

  const applySafeFixes = () => {
    if (safeFixCount === 0) {
      showToast('No safe fixes in this view', 'warning')
      return
    }
    showConfirm({
      title: 'Review safe fixes?',
      description: `Forge will apply ${safeFixCount} safe mock fixes in this local Studio preview only. Protected and conflict fields stay untouched.`,
      confirmLabel: 'Apply safe fixes',
      onConfirm: () => {
        onSetSessionFixed((s) => s + safeFixCount)
        showToast('Safe fixes applied in mock preview')
      },
    })
  }

  const applySelected = () => {
    const idsToFix = Array.from(selectedIds).filter((id) => itemStatuses[id] === 'pending')
    if (idsToFix.length === 0) return
    showConfirm({
      title: 'Apply selected fixes?',
      description: `Forge will apply ${idsToFix.length} selected mock fixes locally. No files or metadata are changed.`,
      confirmLabel: 'Apply selected',
      onConfirm: () => applyIds(idsToFix, 'Selected fixes applied in mock preview'),
    })
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

  const toggleItem = (id: string) => {
    onSetSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="min-h-full px-7 pb-32 text-white">
      <ForgeScreenHeader title="Review" />
      <p className="-mt-5 mb-5 text-sm leading-5 text-white/52">{sectionSubtitle(filter)}</p>

      <SummaryCard filter={filter} onReviewSafeFixes={applySafeFixes} />

      {(sessionFixed > 0 || sessionIgnored > 0) && (
        <ForgeCard className="mb-4 flex items-center justify-between gap-3 p-3">
          <p className="text-xs font-medium text-white/65">Session summary</p>
          <div className="flex gap-2">
            {sessionFixed > 0 && <span className="rounded-lg bg-emerald-400/10 px-2 py-0.5 text-xs font-medium text-emerald-300">{sessionFixed} applied</span>}
            {sessionIgnored > 0 && <span className="rounded-lg bg-orange-400/10 px-2 py-0.5 text-xs font-medium text-orange-300">{sessionIgnored} ignored</span>}
          </div>
        </ForgeCard>
      )}

      <ReviewTabs active={filter} onChange={setFilter} />
      {filter === 'metadata' && <MetadataFilterChips active={metadataFilter} onChange={onSetMetadataFilter} />}

      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-white/82">{sectionQueueTitle(filter)}</p>
        {filter === 'all' && (
          <button className="flex items-center gap-1 text-[11px] text-white/48" type="button">
            Sort: Priority <ChevronDown size={12} />
          </button>
        )}
      </div>

      {visibleItems.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-3 text-center">
          <p className="text-lg font-medium text-white">Review queue clear</p>
          <p className="max-w-[230px] text-sm leading-5 text-white/50">No pending items for this view.</p>
          <div className="mt-2 flex gap-2">
            {onClearFilter && filter !== 'all' && (
              <button className="h-9 rounded-lg border border-white/[0.065] bg-white/[0.045] px-4 text-xs font-medium text-white transition hover:bg-white/[0.075]" onClick={onClearFilter} type="button">View all</button>
            )}
            {onResetQueue && (
              <button className="flex h-9 items-center gap-1.5 rounded-lg border border-white/[0.065] bg-white/[0.045] px-4 text-xs font-medium text-white transition hover:bg-white/[0.075]" onClick={onResetQueue} type="button">
                <RotateCcw size={13} />
                Reset mock queue
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-2.5">
          {visibleItems.map((item) => (
            <ReviewRow
              filter={filter}
              item={item}
              key={item.id}
              onOpen={() => onOpenItemDetail?.(item.id, item.type, item.section)}
              onToggleSelected={() => toggleItem(item.id)}
              selected={selectedIds.has(item.id)}
            />
          ))}
        </div>
      )}

      {selectedCount > 0 && (
        <div className="fixed inset-x-0 bottom-[76px] z-20 mx-auto flex w-[calc(100%-3.5rem)] max-w-[334px] items-center gap-2 rounded-2xl border border-white/[0.08] bg-[#14100d]/95 p-2 shadow-[0_1.2rem_2.2rem_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl">
          <span className="min-w-0 flex-1 pl-2 text-xs text-white/62">{selectedCount} selected</span>
          <button className="h-9 rounded-xl bg-[#e7a35f] px-3 text-xs font-semibold text-[#211508]" onClick={applySelected} type="button">Apply selected</button>
          <button className="h-9 rounded-xl border border-white/[0.075] bg-white/[0.045] px-3 text-xs font-medium text-white/75" onClick={() => setIgnoreSheetOpen(true)} type="button">Ignore</button>
        </div>
      )}

      {ignoreSheetOpen && (
        <ForgeBottomSheet onClose={() => setIgnoreSheetOpen(false)} subtitle="Ignored items will be hidden from the active review queue in this mock preview." title="Ignore selected items?">
          <div className="space-y-4">
            <p className="text-xs text-white/50">Optional reason</p>
            <div className="flex flex-wrap gap-2">
              {ignoreReasons.map((reason) => (
                <button
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${ignoreReason === reason ? 'bg-[#e7a35f] text-[#211508]' : 'border border-white/[0.065] bg-white/[0.045] text-white/70 hover:bg-white/[0.08]'}`}
                  key={reason}
                  onClick={() => setIgnoreReason(reason)}
                  type="button"
                >
                  {reason}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <button className="h-10 rounded-lg border border-white/[0.075] bg-white/[0.045] text-sm font-medium text-white transition hover:bg-white/[0.075]" onClick={() => setIgnoreSheetOpen(false)} type="button">Cancel</button>
              <button className="h-10 rounded-lg bg-[#e7a35f] text-sm font-semibold text-[#211508] shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_0.5rem_1rem_rgba(234,154,92,0.12)] transition hover:bg-[#efad6c]" onClick={applyIgnoreSelected} type="button">Ignore selected</button>
            </div>
          </div>
        </ForgeBottomSheet>
      )}
    </div>
  )
}
