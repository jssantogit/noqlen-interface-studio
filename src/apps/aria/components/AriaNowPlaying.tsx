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
    <div className="absolute inset-0 z-40 flex min-w-0 flex-col overflow-hidden bg-[radial-gradient(circle_at_50%_-6%,rgba(239,149,45,0.13),transparent_33%),radial-gradient(circle_at_14%_8%,rgba(69,106,128,0.11),transparent_30%),linear-gradient(180deg,#071018,#071016_48%,#05090e_100%)] text-[#f5ecdf]">
      {/* Header */}
      <header className="flex min-w-0 items-center justify-between px-5 pt-4">
        <button
          aria-label="Collapse player"
          className="grid h-9 w-9 place-items-center rounded-full text-[#b9b1a7] transition hover:bg-white/[0.07] hover:text-white"
          onClick={onCollapse}
          type="button"
        >
          <ChevronDown size={22} />
        </button>
        <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#777d82]">Now Playing</span>
        <button
          aria-label="Queue"
          className="grid h-9 w-9 place-items-center rounded-full text-[#b9b1a7] transition hover:bg-white/[0.07] hover:text-white"
          type="button"
        >
          <ListMusic size={20} />
        </button>
      </header>

      {/* Artwork */}
      <div className="flex flex-1 flex-col items-center justify-center px-8">
        <div className="aria-art aria-art-square w-full max-w-[280px] shadow-[0_1rem_2rem_rgba(0,0,0,0.35)]" />
      </div>

      {/* Track info */}
      <div className="px-6 pb-2">
        <div className="flex min-w-0 items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h2 className="truncate font-serif text-[22px] leading-[1.05] text-[#fff3e4]">
              {nowPlaying.title}
            </h2>
            <p className="mt-0.5 truncate text-sm text-[#f0a13d]">
              {nowPlaying.artist}
            </p>
          </div>
          <button
            aria-label={isFavorite ? 'Unfavorite' : 'Favorite'}
            className={`mt-1 shrink-0 transition ${isFavorite ? 'text-[#f0a13d]' : 'text-[#777d82] hover:text-[#b9b1a7]'}`}
            onClick={onToggleFavorite}
            type="button"
          >
            <Heart size={21} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-6 py-3">
        <div className="h-[3px] w-full rounded-full bg-white/[0.14]">
          <div className="h-full w-[35%] rounded-full bg-[#f0a13d]" />
        </div>
        <div className="mt-1.5 flex justify-between text-[10px] text-[#777d82]">
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
          className="grid h-12 w-12 place-items-center rounded-full text-[#fff3df] shadow-[0_8px_20px_rgba(240,161,61,0.16)] transition active:scale-[0.97]"
          onClick={onPlayPause}
          style={{ background: 'radial-gradient(circle, rgba(240,161,61,0.93), rgba(89,59,27,0.82))' }}
          type="button"
        >
          {isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" className="ml-0.5" />}
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
          className={`grid h-9 w-9 place-items-center rounded-full transition ${isShuffled ? 'text-[#f0a13d]' : 'text-[#777d82] hover:text-[#b9b1a7]'}`}
          onClick={onToggleShuffle}
          type="button"
        >
          <Shuffle size={18} />
        </button>
        <button
          aria-label={repeatLabel}
          className={`grid h-9 w-9 place-items-center rounded-full transition ${repeatMode !== 'off' ? 'text-[#f0a13d]' : 'text-[#777d82] hover:text-[#b9b1a7]'}`}
          onClick={onToggleRepeat}
          type="button"
        >
          <Repeat size={18} />
        </button>
      </div>

      {/* Up next preview */}
      <div className="border-t border-white/[0.06] px-5 py-3">
        <p className="text-[11px] font-medium text-[#b9b1a7]">Up next</p>
        <div className="mt-2 space-y-2">
          {ariaQueue.slice(0, 3).map((track) => (
            <div className="flex min-w-0 items-center gap-3" key={track.id}>
              <div className="aria-art aria-art-micro shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-[#f5ecdf]">{track.title}</p>
                <p className="truncate text-[10px] text-[#777d82]">{track.artist}</p>
              </div>
              <span className="shrink-0 text-[10px] text-[#777d82]">{track.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
