import { FileText } from 'lucide-react'
import { ForgeBottomSheet } from './ForgeBottomSheet'
import { CoverGradient } from './ForgeCard'

const mockLyricsPlaceholder = `Verse preview unavailable in Studio mock.

This is a placeholder to demonstrate the lyrics detail sheet.
In a real app, this area would show a generated lyrics preview.

Chorus preview unavailable in Studio mock.

Bridge preview unavailable in Studio mock.`

export function ForgeLyricsDetailSheet({
  item,
  onApply,
  onIgnore,
  onPreviewChanges,
  onClose,
}: {
  item: { id: string; title: string; artist: string; album?: string }
  onApply: () => void
  onIgnore: () => void
  onPreviewChanges?: () => void
  onClose: () => void
}) {
  return (
    <ForgeBottomSheet onClose={onClose} subtitle="Preview the suggested lyrics before applying." title="Missing lyrics">
      <div className="space-y-5">
        {/* Item header */}
        <div className="flex items-center gap-3">
          <CoverGradient className="h-12 w-12 shrink-0 rounded-xl" gradient="from-orange-100 via-orange-300 to-stone-700" />
          <div className="min-w-0">
            <p className="text-sm font-medium text-white">{item.title}</p>
            <p className="text-xs text-white/50">{item.artist}{item.album ? ` — ${item.album}` : ''}</p>
          </div>
        </div>

        {/* Metadata rows */}
        <div className="space-y-2 rounded-xl border border-white/[0.06] bg-white/[0.035] p-3">
          <div className="flex justify-between text-xs">
            <span className="text-white/40">Source</span>
            <span className="text-white/70">Studio mock suggestion</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-white/40">Confidence</span>
            <span className="text-emerald-300">High</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-white/40">Status</span>
            <span className="text-amber-300">Ready to apply</span>
          </div>
        </div>

        {/* Lyrics preview */}
        <div>
          <div className="mb-2 flex items-center gap-2">
            <FileText className="text-white/50" size={14} />
            <p className="text-xs font-medium text-white/60">Lyrics preview</p>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-black/30 p-3">
            <pre className="whitespace-pre-wrap text-xs leading-5 text-white/55">{mockLyricsPlaceholder}</pre>
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
            Close
          </button>
          <button
            className="h-10 rounded-lg bg-[#e7a35f] text-sm font-semibold text-[#211508] shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_0.5rem_1rem_rgba(234,154,92,0.12)] transition hover:bg-[#efad6c]"
            onClick={onApply}
            type="button"
          >
            Apply lyrics
          </button>
        </div>
        <button
          className="w-full rounded-lg border border-white/[0.075] bg-transparent py-2.5 text-xs font-medium text-white/55 transition hover:bg-white/[0.045] hover:text-white/80"
          onClick={onIgnore}
          type="button"
        >
          Ignore this item
        </button>
      </div>
    </ForgeBottomSheet>
  )
}
