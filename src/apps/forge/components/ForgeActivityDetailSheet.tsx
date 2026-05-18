import { ArrowRight } from 'lucide-react'
import { ForgeBottomSheet } from './ForgeBottomSheet'
import type { ActivityItem } from '../forgeMockData'

export function ForgeActivityDetailSheet({
  item,
  onClose,
  onOpenRelatedReview,
  onOpenRelatedLibrary,
}: {
  item: ActivityItem
  onClose: () => void
  onOpenRelatedReview?: () => void
  onOpenRelatedLibrary?: () => void
}) {
  const statusColor =
    item.status === 'failed'
      ? 'text-red-300 bg-red-400/13'
      : item.status === 'warning'
        ? 'text-orange-300 bg-orange-400/13'
        : item.status === 'pendingReview'
          ? 'text-amber-300 bg-amber-400/13'
          : 'text-emerald-300 bg-emerald-400/13'

  return (
    <ForgeBottomSheet
      onClose={onClose}
      subtitle={`${item.time} · ${item.status}`}
      title={item.title}
    >
      <div className="space-y-5">
        {/* Type + Status */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-lg bg-white/[0.06] px-2.5 py-1 text-xs font-medium text-white/72">
            {item.activityType}
          </span>
          <span className={`rounded-lg px-2.5 py-1 text-xs font-medium ${statusColor}`}>
            {item.status}
          </span>
          {item.provider ? (
            <span className="rounded-lg bg-white/[0.06] px-2.5 py-1 text-xs font-medium text-orange-200/70">
              {item.provider}
            </span>
          ) : null}
        </div>

        {/* Affected count */}
        {item.affectedCount > 0 ? (
          <div className="rounded-xl bg-white/[0.04] p-3">
            <p className="text-xs font-medium text-white/50">Affected</p>
            <p className="mt-1 text-[15px] font-semibold text-white">{item.affectedCount} item{item.affectedCount === 1 ? '' : 's'}</p>
          </div>
        ) : null}

        {/* Affected items */}
        {item.affectedItems.length > 0 && !(item.affectedItems.length === 1 && item.affectedItems[0].startsWith('No ')) ? (
          <div>
            <p className="mb-2 text-xs font-medium text-white/50">Items</p>
            <div className="space-y-1.5">
              {item.affectedItems.map((name) => (
                <div
                  key={name}
                  className="flex items-center gap-2 rounded-lg bg-white/[0.04] px-3 py-2 text-sm text-white/82"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-300/70" />
                  {name}
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* Changed fields */}
        {item.changedFields && item.changedFields.length > 0 ? (
          <div>
            <p className="mb-2 text-xs font-medium text-white/50">Changed</p>
            <div className="flex flex-wrap gap-2">
              {item.changedFields.map((field) => (
                <span
                  key={field}
                  className="rounded-lg bg-white/[0.05] px-2.5 py-1 text-xs text-white/72"
                >
                  {field}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {/* Detail text */}
        <p className="text-sm leading-relaxed text-white/55">{item.detail}</p>

        {/* Mock-only note */}
        <p className="rounded-lg bg-white/[0.03] px-3 py-2 text-xs italic text-white/35">
          This is a mock-only preview. No real files or metadata were changed.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-2.5 pt-1">
          {onOpenRelatedReview ? (
            <button
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-400/13 py-3 text-sm font-medium text-orange-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition hover:bg-orange-400/20"
              onClick={onOpenRelatedReview}
              type="button"
            >
              View related review <ArrowRight size={15} />
            </button>
          ) : null}
          {onOpenRelatedLibrary ? (
            <button
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/[0.06] py-3 text-sm font-medium text-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition hover:bg-white/[0.1]"
              onClick={onOpenRelatedLibrary}
              type="button"
            >
              Open library item <ArrowRight size={15} />
            </button>
          ) : null}
          <button
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/[0.06] py-3 text-sm font-medium text-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition hover:bg-white/[0.1]"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </div>
      </div>
    </ForgeBottomSheet>
  )
}
