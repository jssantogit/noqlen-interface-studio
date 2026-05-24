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
import type { ForgeMockState } from '../forgeMockState'
import { ForgeCard, ForgeScreenHeader } from './ForgeCard'
import { ForgeEmptyState } from './ForgeEmptyState'
import { ForgeStateNotice } from './ForgeStateNotice'

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
  mockState,
  onOpenDetail,
  onOpenSummary,
  onNavigateToReview,
  onOpenFilter,
  onResetFilters,
}: {
  items: ActivityItem[]
  activeFilter: ActivityFilter
  mockState: ForgeMockState
  onOpenDetail: (item: ActivityItem) => void
  onOpenSummary: (item: ActivityItem) => void
  onNavigateToReview: (target: ActivityItem['relatedReviewTarget']) => void
  onOpenFilter: () => void
  onResetFilters: () => void
}) {
  const filtered = filterItems(items, activeFilter, mockState)
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

      {mockState.activityState === 'failedItem' && (
        <ForgeStateNotice
          actions={[{ label: 'View Review', onClick: () => onNavigateToReview('all'), tone: 'primary' }]}
          message="A recent operation failed. Check the failed activity card below for details."
          title="Recent failure"
          variant="error"
        />
      )}

      {mockState.activityState === 'warningItem' && (
        <ForgeStateNotice
          actions={[{ label: 'View Review', onClick: () => onNavigateToReview('all'), tone: 'primary' }]}
          message="Some protected fields were skipped during the last run."
          title="Protected fields skipped"
          variant="warning"
        />
      )}

      {!hasItems ? (
        mockState.activityState === 'empty' ? (
          <ForgeEmptyState
            actions={[{ label: 'Open Review', onClick: () => onNavigateToReview('all'), tone: 'primary' }]}
            title="No activity yet"
            message="Applied changes and Enrich Mode runs will appear here."
          />
        ) : (
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
        )
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

function filterItems(items: ActivityItem[], filter: ActivityFilter, mockState: ForgeMockState): ActivityItem[] {
  let result = items
  if (mockState.activityState === 'empty') return []
  if (mockState.activityState === 'filterNoResults') return []

  if (mockState.activityState === 'failedItem') {
    const failedItem: ActivityItem = {
      id: 'mock-failed',
      title: 'Enrich Mode failed',
      subtitle: 'Provider unreachable',
      time: 'Just now',
      icon: 'AlertTriangle',
      accent: 'text-red-300',
      bgAccent: 'bg-red-400/13',
      summary: ['Tags', 'Covers'],
      detail: 'Provider returned an error.',
      activityType: 'error',
      dateGroup: 'today',
      affectedCount: 0,
      affectedItems: ['No items changed'],
      changedFields: [],
      provider: 'Forge',
      status: 'failed',
      relatedReviewTarget: 'all',
    }
    result = [failedItem, ...result]
  }

  if (mockState.activityState === 'warningItem') {
    const warningItem: ActivityItem = {
      id: 'mock-warning',
      title: 'Protected fields skipped',
      subtitle: 'Identity rewrite skipped',
      time: 'Just now',
      icon: 'AlertTriangle',
      accent: 'text-orange-300',
      bgAccent: 'bg-orange-400/13',
      summary: ['Album MBID', 'Artist MBID'],
      detail: 'Protected identity fields were skipped during the Enrich Mode run. Review these items manually.',
      activityType: 'identity',
      dateGroup: 'today',
      affectedCount: 2,
      affectedItems: ['All Melody', 'Spaces'],
      changedFields: ['Album MBID', 'Artist MBID'],
      provider: 'MusicBrainz',
      status: 'warning',
      relatedReviewTarget: 'metadata/identity',
    }
    result = [warningItem, ...result]
  }

  if (filter === 'all') return result
  if (filter === 'metadata') {
    return result.filter((i) => ['tags', 'identity', 'release', 'audio'].includes(i.activityType))
  }
  if (filter === 'warning') return result.filter((i) => i.status === 'warning')
  if (filter === 'failed') return result.filter((i) => i.status === 'failed')
  if (filter === 'completed') return result.filter((i) => i.status === 'completed')
  return result.filter((i) => i.activityType === filter)
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
        {item.status === 'failed' && (
          <span className="mt-1.5 inline-block rounded-md bg-red-400/10 px-1.5 py-0.5 text-[10px] font-medium text-red-300">Failed</span>
        )}
        {item.status === 'warning' && (
          <span className="mt-1.5 inline-block rounded-md bg-orange-400/10 px-1.5 py-0.5 text-[10px] font-medium text-orange-300">Warning</span>
        )}
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
