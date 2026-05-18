import { Heart, ListMusic, Pause, Play, Repeat, Shuffle, SkipBack, SkipForward, ChevronDown } from 'lucide-react'
import { ariaQueue, nowPlaying } from '../ariaMockData'

export function AriaNowPlaying({
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  onCollapse,
  onToggleShuffle,
  onToggleRepeat,
  onToggleFavorite,
  isShuffled,
  repeatMode,
  isFavorite,
}: {
  isPlaying: boolean
  onPlayPause: () => void
  onNext: () => void
  onPrevious: () => void
  onCollapse: () => void
  onToggleShuffle: () => void
  onToggleRepeat: () => void
  onToggleFavorite: () => void
  isShuffled: boolean
  repeatMode: 'off' | 'all' | 'one'
  isFavorite: boolean
}) {
  const repeatLabel = repeatMode === 'off' ? 'Repeat off' : repeatMode === 'all' ? 'Repeat all' : 'Repeat one'

  return (
    <div className="absolute inset-0 z-40 flex min-w-0 flex-col overflow-hidden bg-[#0c0e12] text-white">
      {/* Header */}
      <header className="flex min-w-0 items-center justify-between px-5 pt-4">
        <button
          aria-label="Collapse player"
          className="grid h-9 w-9 place-items-center rounded-full text-slate-300 transition hover:bg-white/[0.07] hover:text-white"
          onClick={onCollapse}
          type="button"
        >
          <ChevronDown size={22} />
        </button>
        <span className="text-xs font-medium tracking-wide text-slate-400 uppercase">Now Playing</span>
        <button
          aria-label="Queue"
          className="grid h-9 w-9 place-items-center rounded-full text-slate-300 transition hover:bg-white/[0.07] hover:text-white"
          type="button"
        >
          <ListMusic size={20} />
        </button>
      </header>

      {/* Artwork */}
      <div className="flex flex-1 flex-col items-center justify-center px-8">
        <div
          className={`aspect-square w-full max-w-[280px] rounded-[1.5rem] bg-gradient-to-br ${nowPlaying.accent} shadow-[0_1rem_2rem_rgba(0,0,0,0.35)]`}
        />
      </div>

      {/* Track info */}
      <div className="px-6 pb-2">
        <div className="flex min-w-0 items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-xl font-semibold tracking-[-0.02em] text-white">
              {nowPlaying.title}
            </h2>
            <p className="mt-0.5 truncate text-sm text-amber-200/80">
              {nowPlaying.artist}
            </p>
          </div>
          <button
            aria-label={isFavorite ? 'Unfavorite' : 'Favorite'}
            className={`mt-1 shrink-0 transition ${isFavorite ? 'text-amber-300' : 'text-slate-500 hover:text-slate-300'}`}
            onClick={onToggleFavorite}
            type="button"
          >
            <Heart size={21} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-6 py-3">
        <div className="h-1 w-full rounded-full bg-white/[0.08]">
          <div className="h-full w-[35%] rounded-full bg-amber-300/80" />
        </div>
        <div className="mt-1.5 flex justify-between text-[0.65rem] text-slate-500">
          <span>1:28</span>
          <span>{nowPlaying.duration}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-5 px-6 pb-2">
        <button
          aria-label="Previous track"
          className="grid h-10 w-10 place-items-center rounded-full text-white transition hover:bg-white/[0.07]"
          onClick={onPrevious}
          type="button"
        >
          <SkipBack size={22} />
        </button>
        <button
          aria-label={isPlaying ? 'Pause' : 'Play'}
          className="grid h-14 w-14 place-items-center rounded-full bg-amber-300 text-[#0c0e12] shadow-[0_0.5rem_1rem_rgba(212,168,83,0.25)] transition hover:bg-amber-200 active:scale-[0.97]"
          onClick={onPlayPause}
          type="button"
        >
          {isPlaying ? <Pause size={26} fill="currentColor" /> : <Play size={26} fill="currentColor" className="ml-0.5" />}
        </button>
        <button
          aria-label="Next track"
          className="grid h-10 w-10 place-items-center rounded-full text-white transition hover:bg-white/[0.07]"
          onClick={onNext}
          type="button"
        >
          <SkipForward size={22} />
        </button>
      </div>

      {/* Secondary controls */}
      <div className="flex items-center justify-center gap-6 px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <button
          aria-label={isShuffled ? 'Shuffle on' : 'Shuffle off'}
          className={`grid h-9 w-9 place-items-center rounded-full transition ${isShuffled ? 'text-amber-300' : 'text-slate-500 hover:text-slate-300'}`}
          onClick={onToggleShuffle}
          type="button"
        >
          <Shuffle size={18} />
        </button>
        <button
          aria-label={repeatLabel}
          className={`grid h-9 w-9 place-items-center rounded-full transition ${repeatMode !== 'off' ? 'text-amber-300' : 'text-slate-500 hover:text-slate-300'}`}
          onClick={onToggleRepeat}
          type="button"
        >
          <Repeat size={18} />
        </button>
      </div>

      {/* Up next preview */}
      <div className="border-t border-white/[0.06] px-5 py-3">
        <p className="text-xs font-medium text-slate-400">Up next</p>
        <div className="mt-2 space-y-2">
          {ariaQueue.slice(0, 3).map((track) => (
            <div className="flex min-w-0 items-center gap-3" key={track.id}>
              <div className={`h-9 w-9 shrink-0 rounded-lg bg-gradient-to-br ${track.accent}`} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-white">{track.title}</p>
                <p className="truncate text-xs text-slate-500">{track.artist}</p>
              </div>
              <span className="shrink-0 text-xs text-slate-500">{track.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
