import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Clock3,
  Image,
  Music2,
  SlidersHorizontal,
  Tags,
} from 'lucide-react'
import type { ActivityItem, ActivityFilter } from '../forgeMockData'
import { ForgeCard, ForgeScreenHeader } from './ForgeCard'

const iconMap = {
  CheckCircle2,
  Image,
  Tags,
  Clock3,
  Check,
  AlertTriangle,
  Music2,
}

export function ForgeActivity({
  items,
  activeFilter,
  onOpenDetail,
  onOpenSummary,
  onNavigateToReview,
  onOpenFilter,
  onResetFilters,
}: {
  items: ActivityItem[]
  activeFilter: ActivityFilter
  onOpenDetail: (item: ActivityItem) => void
  onOpenSummary: (item: ActivityItem) => void
  onNavigateToReview: (target: ActivityItem['relatedReviewTarget']) => void
  onOpenFilter: () => void
  onResetFilters: () => void
}) {
  const filtered = filterItems(items, activeFilter)
  const todayItems = filtered.filter((item) => item.dateGroup === 'today')
  const yesterdayItems = filtered.filter((item) => item.dateGroup === 'yesterday')

  const hasItems = todayItems.length > 0 || yesterdayItems.length > 0

  return (
    <div className="min-h-full px-7 pb-28 text-white">
      <ForgeScreenHeader
        title="Activity"
        rightAction={
          <button
            aria-label="Filter activity"
            className="grid h-9 w-9 place-items-center rounded-full bg-white/[0.06] text-white/70 transition hover:bg-white/[0.1] hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-300/35"
            onClick={onOpenFilter}
            type="button"
          >
            <SlidersHorizontal size={17} />
          </button>
        }
      />

      {/* Active filter chip */}
      {activeFilter !== 'all' ? (
        <div className="mb-4 flex items-center gap-2">
          <span className="rounded-lg bg-orange-400/13 px-2.5 py-1 text-xs font-medium text-orange-200">
            {filterLabel(activeFilter)}
          </span>
          <button
            className="text-xs text-white/45 transition hover:text-white/75"
            onClick={onResetFilters}
            type="button"
          >
            Clear
          </button>
        </div>
      ) : null}

      {!hasItems ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 grid h-14 w-14 place-items-center rounded-full bg-white/[0.05]">
            <Clock3 size={24} className="text-white/30" />
          </div>
          <p className="text-base font-medium text-white/80">No activity found</p>
          <p className="mt-1 text-sm text-white/45">Try another filter or reset the activity view.</p>
          <button
            className="mt-5 rounded-xl bg-white/[0.07] px-5 py-2.5 text-sm font-medium text-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition hover:bg-white/[0.11]"
            onClick={onResetFilters}
            type="button"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <>
          {todayItems.length > 0 ? (
            <>
              <h3 className="mb-3 text-sm font-semibold text-white/85">Today</h3>
              <div className="space-y-3">
                {todayItems.map((item) => (
                  <ActivityCard
                    item={item}
                    key={item.id}
                    onNavigateToReview={onNavigateToReview}
                    onOpenDetail={onOpenDetail}
                    onOpenSummary={onOpenSummary}
                  />
                ))}
              </div>
            </>
          ) : null}

          {yesterdayItems.length > 0 ? (
            <>
              <h3 className={`mb-3 text-sm font-semibold text-white/65 ${todayItems.length > 0 ? 'mt-7' : ''}`}>
                Yesterday
              </h3>
              <div className="space-y-3">
                {yesterdayItems.map((item) => (
                  <ActivityCard
                    item={item}
                    key={item.id}
                    onNavigateToReview={onNavigateToReview}
                    onOpenDetail={onOpenDetail}
                    onOpenSummary={onOpenSummary}
                  />
                ))}
              </div>
            </>
          ) : null}
        </>
      )}
    </div>
  )
}

function filterItems(items: ActivityItem[], filter: ActivityFilter): ActivityItem[] {
  if (filter === 'all') return items
  if (filter === 'metadata') {
    return items.filter((i) => ['tags', 'identity', 'release', 'audio'].includes(i.activityType))
  }
  if (filter === 'warning') return items.filter((i) => i.status === 'warning')
  if (filter === 'failed') return items.filter((i) => i.status === 'failed')
  if (filter === 'completed') return items.filter((i) => i.status === 'completed')
  return items.filter((i) => i.activityType === filter)
}

function filterLabel(filter: ActivityFilter): string {
  switch (filter) {
    case 'lyrics':
      return 'Lyrics'
    case 'artwork':
      return 'Artwork'
    case 'metadata':
      return 'Metadata'
    case 'libraryEdit':
      return 'Library edits'
    case 'warning':
      return 'Warnings'
    case 'failed':
      return 'Failed'
    case 'completed':
      return 'Completed'
    default:
      return 'All'
  }
}

function ActivityCard({
  item,
  onOpenDetail,
  onOpenSummary,
  onNavigateToReview,
}: {
  item: ActivityItem
  onOpenDetail: (item: ActivityItem) => void
  onOpenSummary: (item: ActivityItem) => void
  onNavigateToReview: (target: ActivityItem['relatedReviewTarget']) => void
}) {
  const Icon = iconMap[item.icon]
  const showReview = item.relatedReviewTarget != null

  return (
    <ForgeCard className="flex items-center gap-4 p-4" onClick={() => onOpenDetail(item)}>
      <div
        className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${item.bgAccent} shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]`}
      >
        <Icon className={item.accent} size={22} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[15px] font-medium text-white">{item.title}</p>
          <span className="shrink-0 text-xs text-white/46">{item.time}</span>
        </div>
        <p className="mt-1 text-sm text-white/52">{item.subtitle}</p>
      </div>
      <div className="flex shrink-0 flex-col gap-2">
        <button
          className="rounded-xl px-3 py-2 text-xs font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] bg-white/[0.07] text-white/82 transition hover:bg-white/[0.11]"
          onClick={(e) => {
            e.stopPropagation()
            onOpenSummary(item)
          }}
          type="button"
        >
          Summary
        </button>
        {showReview ? (
          <button
            className="rounded-xl px-3 py-2 text-xs font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] bg-orange-400/13 text-orange-200 transition hover:bg-orange-400/20"
            onClick={(e) => {
              e.stopPropagation()
              onNavigateToReview(item.relatedReviewTarget)
            }}
            type="button"
          >
            Review
          </button>
        ) : null}
      </div>
    </ForgeCard>
  )
}
