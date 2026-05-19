import { Pause, Play, SkipBack, SkipForward } from 'lucide-react'
import { nowPlaying } from '../ariaMockData'

export function AriaMiniPlayer({
  isPlaying,
  onPlayPause,
  onExpand,
  onNext,
  onPrevious,
}: {
  isPlaying: boolean
  onPlayPause: () => void
  onExpand: () => void
  onNext: () => void
  onPrevious: () => void
}) {
  return (
    <div
      className="absolute bottom-[5.25rem] left-3 right-3 z-20 grid cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-2 rounded-[13px] border border-white/[0.065] bg-[rgba(13,18,24,0.94)] p-2 shadow-[0_8px_18px_rgba(0,0,0,0.26)]"
      onClick={onExpand}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onExpand()
      }}
    >
      {/* Artwork */}
      <div className="aria-art aria-art-micro shrink-0" />

      {/* Info */}
      <div className="min-w-0">
        <p className="truncate text-[11px] font-semibold text-[#f5ecdf]">
          {nowPlaying.title}
        </p>
        <p className="truncate text-[10px] leading-[1.3] text-[#b9b1a7]">
          {nowPlaying.artist}
        </p>
      </div>

      {/* Controls */}
      <div className="flex shrink-0 items-center gap-2 text-[13px]">
        <button
          aria-label="Previous track"
          className="grid h-7 w-7 place-items-center text-[#b9b1a7] transition hover:text-white"
          onClick={(e) => {
            e.stopPropagation()
            onPrevious()
          }}
          type="button"
        >
          <SkipBack size={14} />
        </button>
        <button
          aria-label={isPlaying ? 'Pause' : 'Play'}
          className="grid h-[27px] w-[27px] place-items-center rounded-full bg-gradient-to-b from-[#ffb85a] to-[#d9892d] text-[#1b1108] shadow-[0_4px_10px_rgba(240,161,61,0.18)]"
          onClick={(e) => {
            e.stopPropagation()
            onPlayPause()
          }}
          type="button"
        >
          {isPlaying ? (
            <Pause size={12} fill="currentColor" />
          ) : (
            <Play size={12} fill="currentColor" className="ml-0.5" />
          )}
        </button>
        <button
          aria-label="Next track"
          className="grid h-7 w-7 place-items-center text-[#b9b1a7] transition hover:text-white"
          onClick={(e) => {
            e.stopPropagation()
            onNext()
          }}
          type="button"
        >
          <SkipForward size={14} />
        </button>
      </div>

      {/* Progress underline */}
      <div className="pointer-events-none absolute bottom-[5px] left-[53px] h-[2px] w-[76px] rounded-full bg-[#f0a13d]/80" />
    </div>
  )
}
