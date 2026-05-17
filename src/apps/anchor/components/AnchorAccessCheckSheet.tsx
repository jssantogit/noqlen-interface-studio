import { AlertTriangle, CheckCircle2, Loader2, ShieldCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { AnchorBottomSheet } from './AnchorBottomSheet'

const checks = [
  { label: 'Folder exists', status: 'Passed', tone: 'success' },
  { label: 'Read permission', status: 'Passed', tone: 'success' },
  { label: 'Audio files visible', status: 'Passed', tone: 'success' },
  { label: 'Metadata readable', status: 'Warning', tone: 'warning' },
] as const

export function AnchorAccessCheckSheet({ onClose }: { onClose: () => void }) {
  const [checking, setChecking] = useState(false)

  useEffect(() => {
    if (!checking) return undefined
    const timeout = window.setTimeout(() => setChecking(false), 850)
    return () => window.clearTimeout(timeout)
  }, [checking])

  return (
    <AnchorBottomSheet
      onClose={onClose}
      subtitle="Mock permission check for the selected folder."
      title="Verify library access"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3 rounded-2xl border border-emerald-300/15 bg-emerald-300/[0.06] p-4">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-emerald-300/15 text-emerald-300">
            {checking ? <Loader2 className="animate-spin" size={21} /> : <ShieldCheck size={21} />}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white">Accessible</p>
            <p className="mt-1 text-xs leading-4 text-slate-300/76">
              {checking ? 'Replaying mock checks locally.' : 'Static Studio checks passed with one warning.'}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {checks.map((check) => (
            <div
              className="flex items-center gap-3 rounded-xl border border-white/[0.055] bg-white/[0.035] px-3 py-2.5"
              key={check.label}
            >
              {check.tone === 'success' ? (
                <CheckCircle2 className="shrink-0 text-emerald-300" size={17} />
              ) : (
                <AlertTriangle className="shrink-0 text-orange-300" size={17} />
              )}
              <span className="min-w-0 flex-1 truncate text-xs text-slate-100">{check.label}</span>
              <span className={check.tone === 'success' ? 'text-xs text-emerald-300' : 'text-xs text-orange-300'}>
                {checking ? 'Checking' : check.status}
              </span>
            </div>
          ))}
        </div>

        <p className="rounded-xl border border-orange-300/16 bg-orange-300/[0.055] px-3 py-2.5 text-xs leading-5 text-orange-100/88">
          Artwork cache has 3 missing entries.
        </p>

        <div className="grid grid-cols-2 gap-2">
          <button
            className="h-10 rounded-lg border border-white/[0.075] bg-white/[0.045] text-sm font-medium text-slate-100 transition hover:bg-white/[0.075] focus:outline-none focus:ring-2 focus:ring-amber-300/30 disabled:opacity-60"
            disabled={checking}
            onClick={() => setChecking(true)}
            type="button"
          >
            Run check again
          </button>
          <button
            className="h-10 rounded-lg bg-amber-300 text-sm font-semibold text-slate-950 transition hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-100/70"
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
