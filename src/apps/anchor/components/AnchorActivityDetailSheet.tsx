import type { AnchorActivityEvent } from '../anchorMockData'
import { AnchorBottomSheet } from './AnchorBottomSheet'

const severityClasses = {
  success: 'border-emerald-300/25 bg-emerald-300/10 text-emerald-200',
  info: 'border-sky-300/25 bg-sky-300/10 text-sky-200',
  warning: 'border-amber-300/25 bg-amber-300/10 text-amber-100',
  error: 'border-red-300/25 bg-red-300/10 text-red-200',
} as const

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/[0.055] py-2.5 last:border-b-0">
      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-slate-400/80">
        {label}
      </span>
      <span className="max-w-[11rem] text-right text-xs leading-5 text-slate-100">
        {value}
      </span>
    </div>
  )
}

export function AnchorActivityDetailSheet({
  event,
  onClose,
}: {
  event: AnchorActivityEvent
  onClose: () => void
}) {
  return (
    <AnchorBottomSheet
      onClose={onClose}
      title={event.title}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-white/[0.08] bg-white/[0.045] px-3 py-1 text-[0.68rem] font-semibold capitalize text-slate-200">
            {event.category}
          </span>
          <span
            className={`rounded-full border px-3 py-1 text-[0.68rem] font-semibold capitalize ${severityClasses[event.severity]}`}
          >
            {event.severity}
          </span>
        </div>

        <p className="rounded-2xl border border-white/[0.07] bg-white/[0.035] px-3.5 py-3 text-sm leading-5 text-slate-100">
          {event.description}
        </p>

        <section className="rounded-2xl border border-white/[0.07] bg-black/14 px-3.5 py-1">
          <DetailRow label="Timestamp" value={`${event.dayGroup}, ${event.time}`} />
          <DetailRow label="Status" value={event.severity} />
          {event.relatedLabel ? (
            <DetailRow label="Related" value={event.relatedLabel} />
          ) : null}
        </section>

        <section>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400/80">
            Technical details
          </h3>
          <div className="space-y-2">
            {event.details.map((detail) => (
              <p
                className="rounded-xl border border-white/[0.06] bg-white/[0.032] px-3 py-2 text-xs leading-5 text-slate-300/82"
                key={detail}
              >
                {detail}
              </p>
            ))}
          </div>
        </section>

        <button
          className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.055] px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.085] focus:outline-none focus:ring-2 focus:ring-amber-300/35"
          onClick={onClose}
          type="button"
        >
          Close
        </button>
      </div>
    </AnchorBottomSheet>
  )
}
