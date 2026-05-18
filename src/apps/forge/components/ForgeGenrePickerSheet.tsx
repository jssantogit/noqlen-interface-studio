import { useState } from 'react'
import { ForgeBottomSheet } from './ForgeBottomSheet'
import { CoverGradient } from './ForgeCard'

const suggestedGenres = [
  'Modern Classical',
  'Ambient',
  'Piano',
  'Instrumental',
  'Electronic',
  'Progressive',
]

export function ForgeGenrePickerSheet({
  item,
  initialGenres,
  onApply,
  onIgnore,
  onPreviewChanges,
  onClose,
}: {
  item: { id: string; title: string; artist: string; album?: string }
  initialGenres?: string[]
  onApply: (genres: string[]) => void
  onIgnore: () => void
  onPreviewChanges?: () => void
  onClose: () => void
}) {
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(initialGenres ?? []),
  )

  const toggle = (genre: string) => {
    const next = new Set(selected)
    if (next.has(genre)) next.delete(genre)
    else next.add(genre)
    setSelected(next)
  }

  const hasSelection = selected.size > 0

  return (
    <ForgeBottomSheet onClose={onClose} subtitle="Select genres that match this track." title="Missing genre">
      <div className="space-y-5">
        {/* Item header */}
        <div className="flex items-center gap-3">
          <CoverGradient className="h-12 w-12 shrink-0 rounded-xl" gradient="from-amber-100 via-amber-300 to-stone-600" />
          <div className="min-w-0">
            <p className="text-sm font-medium text-white">{item.title}</p>
            <p className="text-xs text-white/50">{item.artist}{item.album ? ` — ${item.album}` : ''}</p>
          </div>
        </div>

        {/* Current state */}
        <div className="space-y-2 rounded-xl border border-white/[0.06] bg-white/[0.035] p-3">
          <div className="flex justify-between text-xs">
            <span className="text-white/40">Current genres</span>
            <span className="text-white/70">None</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-white/40">Confidence</span>
            <span className="text-emerald-300">High</span>
          </div>
        </div>

        {/* Genre chips */}
        <div>
          <p className="mb-2.5 text-xs font-medium text-white/60">Suggested genres</p>
          <div className="flex flex-wrap gap-2">
            {suggestedGenres.map((genre) => (
              <button
                key={genre}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${selected.has(genre) ? 'bg-[#e7a35f] text-black' : 'bg-white/[0.07] text-white/70 hover:bg-white/[0.1]'}`}
                onClick={() => toggle(genre)}
                type="button"
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Selected preview */}
        {hasSelection && (
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.035] p-3">
            <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-white/40">Selected</p>
            <div className="flex flex-wrap gap-1.5">
              {Array.from(selected).map((g) => (
                <span key={g} className="rounded-md bg-orange-400/13 px-2 py-0.5 text-xs font-medium text-orange-300">
                  {g}
                </span>
              ))}
            </div>
          </div>
        )}

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
            className={`h-10 rounded-lg text-sm font-semibold transition ${hasSelection ? 'bg-[#e7a35f] text-[#211508] shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_0.5rem_1rem_rgba(234,154,92,0.12)] hover:bg-[#efad6c]' : 'bg-white/[0.07] text-white/40 cursor-not-allowed'}`}
            disabled={!hasSelection}
            onClick={() => onApply(Array.from(selected))}
            type="button"
          >
            Apply genre{hasSelection ? ` (${selected.size})` : ''}
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
