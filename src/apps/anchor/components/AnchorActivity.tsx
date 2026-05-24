import { Filter } from 'lucide-react'
import type { AnchorActivityEvent, AnchorActivityFilter } from '../anchorMockData'
import type { AnchorActivityState } from '../anchorState'
import { AnchorActivityItem } from './AnchorActivityItem'
import { AnchorCard, AnchorIconButton, AnchorScreenHeader } from './AnchorCard'
import { AnchorActivityEmptyState } from './AnchorActivityEmptyState'

const filterLabels: Record<AnchorActivityFilter, string> = {
  all: 'All activity',
  server: 'Server',
  library: 'Library',
  errors: 'Errors',
  today: 'Today',
  yesterday: 'Yesterday',
}

function ActivitySection({
  events,
  title,
  onOpenEvent,
}: {
  events: AnchorActivityEvent[]
  title: string
  onOpenEvent: (eventId: string) => void
}) {
  if (events.length === 0) return null

  return (
    <section className="mt-5 first:mt-0">
      <h2 className="mb-3 text-sm font-semibold text-white">{title}</h2>
      <AnchorCard className="overflow-hidden">
        {events.map((item) => (
          <AnchorActivityItem
            category={item.category}
            description={item.description}
            key={item.id}
            onOpen={() => onOpenEvent(item.id)}
            severity={item.severity}
            time={item.time}
            title={item.title}
          />
        ))}
      </AnchorCard>
    </section>
  )
}

export function AnchorActivity({
  activeFilter,
  activityState,
  events,
  onFilterOpen,
  onOpenEvent,
  onResetFilter,
}: {
  activeFilter: AnchorActivityFilter
  activityState: AnchorActivityState
  events: AnchorActivityEvent[]
  onFilterOpen: () => void
  onOpenEvent: (eventId: string) => void
  onResetFilter: () => void
}) {
  const today = events.filter((event) => event.dayGroup === 'today')
  const yesterday = events.filter((event) => event.dayGroup === 'yesterday')
  const hasEvents = events.length > 0

  return (
    <div className="px-5 pb-8 pt-5">
      <AnchorScreenHeader
        action={
          <AnchorIconButton label="Filter activity" onClick={onFilterOpen}>
            <Filter size={21} />
          </AnchorIconButton>
        }
        subtitle="Recent events and system activity."
        title="Activity"
      />

      <div className="mb-4 flex items-center justify-between gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.035] px-3.5 py-2.5">
        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-slate-400/80">
          Filter
        </span>
        <span className="truncate text-xs font-semibold text-amber-100">
          {filterLabels[activeFilter]}
        </span>
      </div>

      {activityState === 'empty' ? (
        <div className="mb-4 rounded-2xl border border-white/[0.06] bg-white/[0.035] px-3.5 py-3">
          <p className="text-sm font-semibold text-white">No activity yet</p>
          <p className="mt-1 text-xs leading-5 text-slate-300/76">
            No activity has been recorded yet.
          </p>
        </div>
      ) : activityState === 'errorsOnly' ? (
        <div className="mb-4 rounded-2xl border border-red-300/16 bg-red-300/[0.055] px-3.5 py-3">
          <p className="text-sm font-semibold text-red-100">Errors only</p>
          <p className="mt-1 text-xs leading-5 text-red-50/76">
            Static error events remain available for diagnostic sheet testing.
          </p>
        </div>
      ) : activityState === 'filteredNoResults' ? (
        <div className="mb-4 rounded-2xl border border-amber-300/16 bg-amber-300/[0.055] px-3.5 py-3">
          <p className="text-sm font-semibold text-amber-100">Filtered no-results</p>
          <p className="mt-1 text-xs leading-5 text-amber-50/76">
            The selected filter returns no local events.
          </p>
        </div>
      ) : null}

      {hasEvents ? (
        <>
          <ActivitySection events={today} onOpenEvent={onOpenEvent} title="Today" />
          <ActivitySection
            events={yesterday}
            onOpenEvent={onOpenEvent}
            title="Yesterday"
          />
        </>
      ) : (
        <AnchorActivityEmptyState
          isErrorFilter={activeFilter === 'errors'}
          onReset={onResetFilter}
        />
      )}
    </div>
  )
}
