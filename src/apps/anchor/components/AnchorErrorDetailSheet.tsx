import type { AnchorActivityEvent } from '../anchorMockData'
import { AnchorBottomSheet } from './AnchorBottomSheet'

function ErrorRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-red-100/[0.08] py-2.5 last:border-b-0">
      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-red-100/62">
        {label}
      </span>
      <span className="max-w-[11rem] text-right text-xs leading-5 text-red-50">
        {value}
      </span>
    </div>
  )
}

export function AnchorErrorDetailSheet({
  event,
  onClose,
  onCopyDiagnostic,
  onOpenNavidromeSettings,
}: {
  event: AnchorActivityEvent
  onClose: () => void
  onCopyDiagnostic: () => void
  onOpenNavidromeSettings: () => void
}) {
  const diagnostic = event.diagnostic

  if (!diagnostic) return null

  return (
    <AnchorBottomSheet
      onClose={onClose}
      title={event.title}
    >
      <div className="space-y-4">
        <div className="rounded-2xl border border-red-300/18 bg-red-500/10 px-3.5 py-3">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full border border-red-300/25 bg-red-300/12 px-3 py-1 text-[0.68rem] font-semibold text-red-100">
              Severity: Error
            </span>
            <span className="text-[0.68rem] text-red-100/68">{event.time}</span>
          </div>
          <p className="mt-3 text-sm font-semibold text-red-50">{diagnostic.message}</p>
        </div>

        <section className="rounded-2xl border border-red-200/[0.11] bg-black/18 px-3.5 py-1">
          <ErrorRow label="Service" value={diagnostic.service} />
          <ErrorRow label="Port" value={diagnostic.port} />
          <ErrorRow label="Attempt" value={diagnostic.attempt} />
          <ErrorRow label="Result" value={diagnostic.result} />
          <ErrorRow label="Source" value={diagnostic.suggestedSource} />
        </section>

        <section>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400/80">
            Suggested fixes
          </h3>
          <div className="space-y-2">
            {diagnostic.fixes.map((fix) => (
              <div
                className="rounded-xl border border-white/[0.06] bg-white/[0.032] px-3 py-2 text-xs leading-5 text-slate-200"
                key={fix}
              >
                {fix}
              </div>
            ))}
          </div>
        </section>

        <p className="rounded-2xl border border-amber-300/15 bg-amber-300/8 px-3.5 py-3 text-xs leading-5 text-amber-50/82">
          {diagnostic.note}
        </p>

        <div className="grid gap-2">
          <button
            className="rounded-2xl border border-amber-300/25 bg-amber-300/14 px-4 py-3 text-sm font-semibold text-amber-50 transition hover:bg-amber-300/20 focus:outline-none focus:ring-2 focus:ring-amber-300/35"
            onClick={onCopyDiagnostic}
            type="button"
          >
            Copy diagnostic summary
          </button>
          <button
            className="rounded-2xl border border-white/[0.08] bg-white/[0.055] px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.085] focus:outline-none focus:ring-2 focus:ring-amber-300/35"
            onClick={onOpenNavidromeSettings}
            type="button"
          >
            Open Navidrome Settings
          </button>
          <button
            className="rounded-2xl px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/[0.055] hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-300/35"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </div>
      </div>
    </AnchorBottomSheet>
  )
}
