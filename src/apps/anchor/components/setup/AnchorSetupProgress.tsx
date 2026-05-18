import type { AnchorSetupStep } from '../../anchorSetupState'
import { getSetupStepIndex, getTotalSteps } from '../../anchorSetupState'

export function AnchorSetupProgress({ step }: { step: AnchorSetupStep }) {
  if (step === 'complete') return null

  const currentIndex = getSetupStepIndex(step)
  const total = getTotalSteps()
  const progress = ((currentIndex + 1) / total) * 100

  return (
    <div className="px-4 pt-4 sm:px-5">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-amber-200/75">
          Step {currentIndex + 1} of {total}
        </span>
        <span className="text-[0.68rem] font-semibold text-slate-300/72">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.07]">
        <div
          className="h-full rounded-full bg-amber-300 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
