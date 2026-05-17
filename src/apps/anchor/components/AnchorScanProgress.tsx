import { AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react'

export type AnchorScanState = 'idle' | 'scanning' | 'complete' | 'failed'

const rows = [
  'Checking mock library folders',
  'Reading static album summary',
  'Updating preview counters',
]

export function AnchorScanProgress({
  onFail,
  state,
}: {
  onFail?: () => void
  state: AnchorScanState
}) {
  const complete = state === 'complete'
  const failed = state === 'failed'

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/[0.065] bg-white/[0.04] p-4">
        <div className="flex items-center gap-3">
          <span
            className={`grid h-10 w-10 place-items-center rounded-full ${
              failed
                ? 'bg-orange-400/15 text-orange-300'
                : complete
                  ? 'bg-emerald-300/15 text-emerald-300'
                  : 'bg-amber-300/15 text-amber-300'
            }`}
          >
            {failed ? (
              <AlertTriangle size={21} />
            ) : complete ? (
              <CheckCircle2 size={21} />
            ) : (
              <Loader2 className="animate-spin" size={21} />
            )}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white">
              {failed
                ? 'Mock scan failed'
                : complete
                  ? 'Library refresh complete'
                  : 'Scanning library preview'}
            </p>
            <p className="mt-1 text-xs leading-4 text-slate-300/75">
              {failed
                ? 'Failure was simulated locally.'
                : complete
                  ? 'Static library summary is up to date.'
                  : 'No files are opened or scanned.'}
            </p>
          </div>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.08]">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              failed ? 'w-2/3 bg-orange-400' : complete ? 'w-full bg-emerald-300' : 'w-2/3 bg-amber-300'
            }`}
          />
        </div>
      </div>

      <div className="space-y-2">
        {rows.map((row, index) => {
          const rowComplete = complete || index < 2 || failed
          return (
            <div
              className="flex items-center gap-2 rounded-xl border border-white/[0.055] bg-white/[0.03] px-3 py-2.5 text-xs text-slate-200/86"
              key={row}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  failed && index === 2
                    ? 'bg-orange-300'
                    : rowComplete
                      ? 'bg-emerald-300'
                      : 'bg-amber-300'
                }`}
              />
              <span className="min-w-0 flex-1 truncate">{row}</span>
            </div>
          )
        })}
      </div>

      {state === 'scanning' && onFail ? (
        <button
          className="h-10 w-full rounded-lg border border-white/[0.075] bg-white/[0.045] text-sm font-medium text-slate-100 transition hover:bg-white/[0.075] focus:outline-none focus:ring-2 focus:ring-amber-300/30"
          onClick={onFail}
          type="button"
        >
          Simulate failed scan
        </button>
      ) : null}
    </div>
  )
}
