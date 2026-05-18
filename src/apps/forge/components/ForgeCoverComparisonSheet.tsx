import { ForgeBottomSheet } from './ForgeBottomSheet'
import { CoverGradient } from './ForgeCard'

export function ForgeCoverComparisonSheet({
  item,
  onApply,
  onKeepCurrent,
  onIgnore,
  onPreviewChanges,
  onClose,
}: {
  item: { id: string; title: string; artist: string; album?: string }
  onApply: () => void
  onKeepCurrent: () => void
  onIgnore: () => void
  onPreviewChanges?: () => void
  onClose: () => void
}) {
  return (
    <ForgeBottomSheet onClose={onClose} subtitle="Compare the current cover with the suggested replacement." title="Artwork preview">
      <div className="space-y-5">
        {/* Item header */}
        <div className="min-w-0">
          <p className="text-sm font-medium text-white">{item.title}</p>
          <p className="text-xs text-white/50">{item.artist}</p>
        </div>

        {/* Comparison */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <p className="text-center text-[10px] font-medium uppercase tracking-wider text-white/40">Current</p>
            <CoverGradient className="aspect-square w-full rounded-xl" gradient="from-stone-200 via-stone-500 to-stone-950" />
            <p className="text-center text-[10px] text-white/35">Current resolution: 320 x 320</p>
          </div>
          <div className="space-y-2">
            <p className="text-center text-[10px] font-medium uppercase tracking-wider text-orange-300/80">Suggested</p>
            <CoverGradient className="aspect-square w-full rounded-xl" gradient="from-amber-100 via-orange-400 to-stone-800" />
            <p className="text-center text-[10px] text-white/35">Suggested resolution: 1400 x 1400</p>
          </div>
        </div>

        {/* Metadata rows */}
        <div className="space-y-2 rounded-xl border border-white/[0.06] bg-white/[0.035] p-3">
          <div className="flex justify-between text-xs">
            <span className="text-white/40">Current</span>
            <span className="text-white/70">320 x 320</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-white/40">Suggested</span>
            <span className="text-amber-300">1400 x 1400</span>
          </div>
        </div>

        {/* Preview changes link */}
        {onPreviewChanges && (
          <button
            className="w-full rounded-lg border border-white/[0.075] bg-transparent py-2.5 text-xs font-medium text-white/55 transition hover:bg-white/[0.045] hover:text-white/80"
            onClick={onPreviewChanges}
            type="button"
          >
            Preview changes
          </button>
        )}

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <button
            className="h-10 rounded-lg border border-white/[0.075] bg-white/[0.045] text-sm font-medium text-white transition hover:bg-white/[0.075]"
            onClick={onClose}
            type="button"
          >
             Cancel
          </button>
          <button
            className="h-10 rounded-lg bg-[#e7a35f] text-sm font-semibold text-[#211508] shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_0.5rem_1rem_rgba(234,154,92,0.12)] transition hover:bg-[#efad6c]"
            onClick={onApply}
            type="button"
          >
            Apply
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            className="h-9 rounded-lg border border-white/[0.075] bg-transparent text-xs font-medium text-white/55 transition hover:bg-white/[0.045] hover:text-white/80"
            onClick={onKeepCurrent}
            type="button"
          >
            Keep current
          </button>
          <button
            className="h-9 rounded-lg border border-white/[0.075] bg-transparent text-xs font-medium text-white/55 transition hover:bg-white/[0.045] hover:text-white/80"
            onClick={onIgnore}
            type="button"
          >
            Ignore
          </button>
        </div>
      </div>
    </ForgeBottomSheet>
  )
}
