import { Eye, FileCheck2, ShieldCheck } from 'lucide-react'
import { ForgeBottomSheet } from './ForgeBottomSheet'

export function ForgeSafetyNoteSheet({ onClose }: { onClose: () => void }) {
  return (
    <ForgeBottomSheet
      onClose={onClose}
      subtitle="How Forge handles your library."
      title="Safety first"
    >
      <div className="space-y-3">
        <div className="rounded-2xl border border-white/[0.065] bg-white/[0.04] p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
            <ShieldCheck className="text-orange-300" size={17} />
            Nothing changes until you confirm
          </div>
          <p className="text-xs leading-5 text-slate-300/76">
            Forge shows each suggested change before it is applied.
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.065] bg-white/[0.04] p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
            <Eye className="text-orange-300" size={17} />
            All fixes are reviewed
          </div>
          <p className="text-xs leading-5 text-slate-300/76">
            When you review lyrics, covers or genres, Forge shows a suggested result. You choose to apply or ignore it.
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.065] bg-white/[0.04] p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
            <FileCheck2 className="text-orange-300" size={17} />
            Dry-run first
          </div>
          <p className="text-xs leading-5 text-slate-300/76">
            Metadata changes are presented as a dry-run diff before applying.
          </p>
        </div>
      </div>
    </ForgeBottomSheet>
  )
}
