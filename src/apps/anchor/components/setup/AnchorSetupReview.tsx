import { Check, ChevronLeft, FileCode2, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { AnchorBottomSheet } from '../AnchorBottomSheet'

export function AnchorSetupReview({
  permissionsAcknowledged,
  libraryPath,
  serverType,
  serverAddress,
  serverPort,
  scannerSchedule,
  dryRunPassed,
  onFinish,
  onBack,
  onPreviewToml,
  tomlPreview,
}: {
  permissionsAcknowledged: boolean
  libraryPath: string
  serverType: string
  serverAddress: string
  serverPort: number
  scannerSchedule: string
  dryRunPassed: boolean
  onFinish: () => void
  onBack: () => void
  onPreviewToml: () => void
  tomlPreview: string
}) {
  const [showToml, setShowToml] = useState(false)

  const summaryItems = [
    { label: 'Permissions acknowledged', value: permissionsAcknowledged ? 'Yes' : 'No', ok: permissionsAcknowledged },
    { label: 'Library folder selected', value: libraryPath, ok: true },
    { label: 'Server type', value: serverType, ok: true },
    { label: 'Port and address', value: `${serverAddress}:${serverPort}`, ok: true },
    { label: 'Scanner schedule', value: scannerSchedule, ok: true },
    { label: 'Mock dry-run passed', value: dryRunPassed ? 'Yes' : 'No', ok: dryRunPassed },
  ]

  return (
    <div className="flex min-h-0 flex-1 flex-col px-4 pt-5 sm:px-5">
      <header className="mb-4">
        <h1 className="break-words font-serif text-[clamp(1.6rem,12vw,1.9rem)] leading-none tracking-[-0.055em] text-white">
          Review Setup
        </h1>
        <p className="mt-2 text-[0.82rem] leading-4 text-slate-300/82">
          Ready to start Anchor.
        </p>
      </header>

      <p className="mb-3 text-xs leading-5 text-amber-50/72">
        No real files will be changed in Studio. Future app will apply through Anchor Core.
      </p>

      <div className="space-y-2">
        {summaryItems.map((item) => (
          <div
            className="flex min-w-0 items-center justify-between gap-3 rounded-2xl border border-white/[0.065] bg-white/[0.04] p-3.5"
            key={item.label}
          >
            <div className="min-w-0">
              <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-slate-400/82">{item.label}</span>
              <span className="mt-0.5 block break-words text-sm font-medium text-white">{item.value}</span>
            </div>
            {item.ok ? (
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-300/16 text-emerald-300">
                <Check size={14} strokeWidth={2.8} />
              </span>
            ) : (
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-orange-300/16 text-orange-300">
                <ShieldCheck size={14} strokeWidth={2.8} />
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-auto space-y-2.5 pb-6 pt-6">
        <button
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-amber-400 text-sm font-semibold text-[#211508] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_0.8rem_1.5rem_rgba(245,158,11,0.12)] transition hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-100/60"
          onClick={onFinish}
          type="button"
        >
          Finish setup
        </button>
        <button
          className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.065] bg-white/[0.045] text-xs font-medium text-white transition hover:bg-white/[0.075] focus:outline-none focus:ring-2 focus:ring-amber-300/30"
          onClick={() => { onPreviewToml(); setShowToml(true); }}
          type="button"
        >
          <FileCode2 size={15} />
          Preview TOML
        </button>
        <button
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.065] bg-white/[0.045] text-sm font-medium text-white transition hover:bg-white/[0.075] focus:outline-none focus:ring-2 focus:ring-amber-300/30"
          onClick={onBack}
          type="button"
        >
          <ChevronLeft size={16} />
          Back
        </button>
      </div>

      {showToml ? (
        <AnchorBottomSheet onClose={() => setShowToml(false)} subtitle="Display-only preview" title="navidrome.toml">
          <pre className="anchor-scrollbar-soft max-h-72 overflow-auto rounded-xl border border-white/[0.075] bg-black/25 p-3 text-[0.72rem] leading-5 text-slate-200/90">
            {tomlPreview}
          </pre>
          <p className="mt-3 text-xs leading-5 text-amber-50/72">
            Studio does not write this file. Future app must apply through Anchor Core.
          </p>
        </AnchorBottomSheet>
      ) : null}
    </div>
  )
}
