import { Pause, Play, SkipBack, SkipForward } from 'lucide-react'
import type { AriaTrack } from '../ariaMockData'

export function AriaMiniPlayer({
  currentTrack,
  isPlaying,
  onPlayPause,
  onExpand,
  onNext,
  onPrevious,
}: {
  currentTrack: AriaTrack
  isPlaying: boolean
  onPlayPause: () => void
  onExpand: () => void
  onNext: () => void
  onPrevious: () => void
}) {
  return (
    <div
      className="absolute bottom-[5.75rem] left-4 right-4 z-20 grid cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-2 rounded-[15px] border border-white/[0.075] bg-[linear-gradient(180deg,rgba(17,23,29,0.94),rgba(7,11,16,0.91))] p-2 shadow-[0_10px_22px_rgba(0,0,0,0.30),inset_0_1px_0_rgba(255,255,255,0.045)] backdrop-blur-md"
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
        <p className="truncate text-[11px] font-semibold tracking-[-0.01em] text-[#fff3e4]">
          {currentTrack.title}
        </p>
        <p className="truncate text-[10px] leading-[1.3] text-[#b9b1a7]">
          {currentTrack.artist}
        </p>
      </div>

      {/* Controls */}
      <div className="flex shrink-0 items-center gap-1.5 text-[13px]">
        <button
          aria-label="Previous track"
          className="grid h-7 w-7 place-items-center rounded-full text-[#b9b1a7] transition hover:bg-white/[0.045] hover:text-white"
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
          className="grid h-7 w-7 place-items-center rounded-full bg-[#f0a13d] text-[#1b1108] shadow-[0_4px_9px_rgba(0,0,0,0.22)]"
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
          className="grid h-7 w-7 place-items-center rounded-full text-[#b9b1a7] transition hover:bg-white/[0.045] hover:text-white"
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
      <div className="pointer-events-none absolute bottom-[5px] left-[54px] right-[98px] h-[2px] overflow-hidden rounded-full bg-white/[0.07]">
        <div className="h-full w-[42%] rounded-full bg-[#f0a13d]" />
      </div>
    </div>
  )
}
