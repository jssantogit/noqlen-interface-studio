import { Pause, Play, SkipForward } from 'lucide-react'
import { nowPlaying } from '../ariaMockData'

export function AriaMiniPlayer({
  isPlaying,
  onPlayPause,
  onExpand,
  onNext,
}: {
  isPlaying: boolean
  onPlayPause: () => void
  onExpand: () => void
  onNext: () => void
}) {
  return (
    <div
      className="absolute bottom-[calc(3.25rem+env(safe-area-inset-bottom))] left-0 right-0 z-20 min-w-0 max-w-full cursor-pointer border-t border-white/[0.06] bg-[#0c0e12]/95 px-4 py-2.5 shadow-[0_-0.5rem_1.5rem_rgba(0,0,0,0.35)] backdrop-blur-xl"
      onClick={onExpand}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onExpand()
      }}
    >
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={`h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br ${nowPlaying.accent}`}
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium tracking-[-0.01em] text-white">
            {nowPlaying.title}
          </p>
          <p className="truncate text-xs text-slate-400">{nowPlaying.artist}</p>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button
            aria-label={isPlaying ? 'Pause' : 'Play'}
            className="grid h-8 w-8 place-items-center rounded-full text-white transition hover:bg-white/[0.08]"
            onClick={(e) => {
              e.stopPropagation()
              onPlayPause()
            }}
            type="button"
          >
            {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
          </button>
          <button
            aria-label="Next track"
            className="grid h-8 w-8 place-items-center rounded-full text-white transition hover:bg-white/[0.08]"
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
            type="button"
          >
            <SkipForward size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
