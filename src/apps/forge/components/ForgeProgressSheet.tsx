import { BadgeCheck, CheckCircle2, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ForgeBottomSheet } from './ForgeBottomSheet'

export interface ForgeProgressFlow {
  title: string
  subtitle?: string
  steps: string[]
  sourceBadge?: string
  completeMessage: string
  onComplete: () => void
}

export function ForgeProgressSheet({
  flow,
  onClose,
}: {
  flow: ForgeProgressFlow
  onClose: () => void
}) {
  const [currentStep, setCurrentStep] = useState(-1)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    flow.steps.forEach((_, idx) => {
      timers.push(setTimeout(() => setCurrentStep(idx), (idx + 1) * 650))
    })
    timers.push(
      setTimeout(() => {
        setFinished(true)
        flow.onComplete()
      }, (flow.steps.length + 1) * 650),
    )
    return () => timers.forEach(clearTimeout)
  }, [flow])

  if (finished) {
    return (
      <ForgeBottomSheet onClose={onClose} subtitle={flow.completeMessage} title="Complete">
        <div className="flex flex-col items-center gap-4 py-6">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-emerald-400/12">
            <CheckCircle2 className="text-emerald-300" size={28} />
          </div>
          <p className="text-center text-sm font-medium text-white">{flow.completeMessage}</p>
          {flow.sourceBadge && (
            <span className="inline-flex items-center gap-1 rounded-full border border-[#e7a35f]/18 bg-[#e7a35f]/10 px-2.5 py-1 text-[10px] font-semibold text-[#f0b879]">
              <BadgeCheck size={10} />
              {flow.sourceBadge}
            </span>
          )}
          <button
            className="mt-2 h-10 w-full rounded-lg bg-[#e7a35f] text-sm font-semibold text-[#211508] shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_0.5rem_1rem_rgba(234,154,92,0.12)] transition hover:bg-[#efad6c]"
            onClick={onClose}
            type="button"
          >
            Done
          </button>
        </div>
      </ForgeBottomSheet>
    )
  }

  return (
    <ForgeBottomSheet onClose={onClose} subtitle={flow.subtitle} title={flow.title}>
      <div className="space-y-5">
        {flow.sourceBadge && (
          <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#e7a35f]/18 bg-[#e7a35f]/10 px-3 py-1.5 text-[11px] font-semibold text-[#f0b879]">
            <BadgeCheck size={12} />
            Source: {flow.sourceBadge}
          </div>
        )}
        <div className="space-y-3">
          {flow.steps.map((step, idx) => {
            const isActive = idx === currentStep
            const isDone = idx < currentStep
            return (
              <div
                key={step}
                className={`flex items-center gap-3 rounded-xl border p-3 transition ${isActive ? 'border-[#e7a35f]/25 bg-[#e7a35f]/10' : isDone ? 'border-emerald-300/20 bg-emerald-300/[0.04]' : 'border-white/[0.05] bg-white/[0.02]'}`}
              >
                <div
                  className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[10px] font-bold ${isDone ? 'bg-emerald-400/15 text-emerald-300' : isActive ? 'bg-[#e7a35f]/15 text-[#e7a35f]' : 'bg-white/[0.06] text-white/30'}`}
                >
                  {isDone ? <CheckCircle2 size={12} /> : idx + 1}
                </div>
                <span
                  className={`text-sm ${isActive ? 'text-white' : isDone ? 'text-emerald-200/70' : 'text-white/35'}`}
                >
                  {step}
                </span>
                {isActive && <Loader2 className="ml-auto shrink-0 animate-spin text-[#e7a35f]" size={14} />}
              </div>
            )
          })}
        </div>
      </div>
    </ForgeBottomSheet>
  )
}
