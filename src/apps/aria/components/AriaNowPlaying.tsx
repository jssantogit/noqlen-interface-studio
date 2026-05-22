import { ChevronDown, Heart, MoreHorizontal, Pause, Play, Repeat, Shuffle, SkipBack, SkipForward, SlidersHorizontal, Volume2, WholeWord } from 'lucide-react'
import { nowPlaying } from '../ariaMockData'

export function AriaNowPlaying({
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  onCollapse,
  onOpenLyrics,
  onOpenQueue,
  onShowToast,
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
  onOpenLyrics: () => void
  onOpenQueue: () => void
  onShowToast: (message: string) => void
  onToggleShuffle: () => void
  onToggleRepeat: () => void
  onToggleFavorite: () => void
  isShuffled: boolean
  repeatMode: 'off' | 'all' | 'one'
  isFavorite: boolean
}) {
  const repeatLabel = repeatMode === 'off' ? 'Repeat off' : repeatMode === 'all' ? 'Repeat all' : 'Repeat one'

  return (
    <div className="absolute inset-0 z-40 flex min-w-0 flex-col overflow-hidden bg-[radial-gradient(circle_at_50%_54%,rgba(239,149,45,0.18),transparent_38%),radial-gradient(circle_at_80%_18%,rgba(211,121,34,0.11),transparent_28%),linear-gradient(180deg,#071018_0%,#05090f_45%,#030609_100%)] text-[#f5ecdf]">
      {/* Header */}
      <header className="flex min-w-0 items-center justify-between px-5 pt-5">
        <button
          aria-label="Collapse player"
          className="grid h-10 w-10 place-items-center rounded-full text-[#eadac4] transition hover:bg-white/[0.07] hover:text-white"
          onClick={onCollapse}
          type="button"
        >
          <ChevronDown size={22} />
        </button>
        <span className="text-[13px] font-medium uppercase tracking-[0.18em] text-[#f5ecdf]">Now Playing</span>
        <button
          aria-label="More player options"
          className="grid h-10 w-10 place-items-center rounded-full text-[#eadac4] transition hover:bg-white/[0.07] hover:text-white"
          onClick={() => onShowToast('Player options (mock)')}
          type="button"
        >
          <MoreHorizontal size={22} />
        </button>
      </header>

      {/* Artwork */}
      <div className="flex shrink-0 flex-col items-center px-7 pt-8">
        <div className="aria-art aria-art-architecture h-[256px] w-[256px] max-w-full rounded-[25px] shadow-[0_1.25rem_3rem_rgba(0,0,0,0.48),0_0_3.2rem_rgba(240,161,61,0.12)]" />
      </div>

      {/* Track info */}
      <div className="px-7 pt-6">
        <div className="flex min-w-0 items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h2 className="truncate font-serif text-[30px] leading-[1.03] text-[#fff3e4]">
              {nowPlaying.title}
            </h2>
            <p className="mt-1.5 truncate font-serif text-[19px] text-[#f0a13d]">
              {nowPlaying.artist}
            </p>
          </div>
          <button
            aria-label={isFavorite ? 'Unfavorite' : 'Favorite'}
            className={`mt-3 grid h-10 w-10 shrink-0 place-items-center rounded-full transition ${isFavorite ? 'text-[#f0a13d]' : 'text-[#f0a13d] hover:bg-white/[0.07]'}`}
            onClick={onToggleFavorite}
            type="button"
          >
            <Heart size={25} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-7 pt-5">
        <button
          aria-label="Seek through track"
          className="group relative block h-5 w-full rounded-full"
          onClick={() => onShowToast('Seek preview only (mock)')}
          type="button"
        >
          <span className="absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-white/[0.14]" />
          <span className="absolute left-0 top-1/2 h-[3px] w-[37%] -translate-y-1/2 rounded-full bg-[#f0a13d]" />
          <span className="absolute left-[37%] top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffad45] shadow-[0_0_0_4px_rgba(240,161,61,0.10)] transition group-active:scale-110" />
        </button>
        <div className="mt-2 flex items-start justify-between text-[13px] text-[#c9bdae]">
          <span>1:37</span>
          <span className="text-center text-xs leading-5 text-[#c9bdae]">
            Hi-Res Audio<br />FLAC · Local
          </span>
          <span>{nowPlaying.duration}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-5 px-6 pt-7">
        <button
          aria-label={isShuffled ? 'Shuffle on' : 'Shuffle off'}
          className={`grid h-10 w-10 place-items-center rounded-full transition ${isShuffled ? 'text-[#f0a13d]' : 'text-[#eadac4] hover:bg-white/[0.07]'}`}
          onClick={onToggleShuffle}
          type="button"
        >
          <Shuffle size={22} />
        </button>
        <button
          aria-label="Previous track"
          className="grid h-12 w-12 place-items-center rounded-full text-[#fff3e4] transition hover:bg-white/[0.07]"
          onClick={onPrevious}
          type="button"
        >
          <SkipBack size={29} fill="currentColor" />
        </button>
        <button
          aria-label={isPlaying ? 'Pause' : 'Play'}
          className="grid h-[72px] w-[72px] place-items-center rounded-full text-[#fff3df] shadow-[0_18px_34px_rgba(240,161,61,0.18)] transition active:scale-[0.97]"
          onClick={onPlayPause}
          style={{ background: 'radial-gradient(circle, rgba(240,161,61,0.93), rgba(68,43,18,0.88))' }}
          type="button"
        >
          {isPlaying ? <Pause size={34} fill="currentColor" /> : <Play size={34} fill="currentColor" className="ml-1" />}
        </button>
        <button
          aria-label="Next track"
          className="grid h-12 w-12 place-items-center rounded-full text-[#fff3e4] transition hover:bg-white/[0.07]"
          onClick={onNext}
          type="button"
        >
          <SkipForward size={29} fill="currentColor" />
        </button>
        <button
          aria-label={repeatLabel}
          className={`grid h-10 w-10 place-items-center rounded-full transition ${repeatMode !== 'off' ? 'text-[#f0a13d]' : 'text-[#eadac4] hover:bg-white/[0.07]'}`}
          onClick={onToggleRepeat}
          type="button"
        >
          <Repeat size={22} />
        </button>
      </div>

      {/* Secondary controls */}
      <div className="mt-12 flex items-center justify-between gap-4 px-9 pb-[max(1.65rem,env(safe-area-inset-bottom))]">
        <button
          aria-label="Open lyrics"
          className="grid h-10 w-10 place-items-center rounded-full text-[#eadac4] transition hover:bg-white/[0.07] hover:text-white"
          onClick={onOpenLyrics}
          type="button"
        >
          <WholeWord size={21} />
        </button>
        <button
          aria-label="Adjust volume"
          className="flex min-w-0 flex-1 items-center justify-center gap-3 rounded-full px-2 py-2 text-[#eadac4] transition hover:bg-white/[0.06] hover:text-white"
          onClick={() => onShowToast('Volume preview only (mock)')}
          type="button"
        >
          <Volume2 size={21} className="shrink-0" />
          <span className="relative h-4 w-full max-w-[118px] rounded-full" aria-hidden="true">
            <span className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-white/[0.16]" />
            <span className="absolute left-0 top-1/2 h-[2px] w-[46%] -translate-y-1/2 rounded-full bg-[#f0a13d]" />
            <span className="absolute left-[46%] top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffad45] shadow-[0_0_0_4px_rgba(240,161,61,0.08)]" />
          </span>
        </button>
        <button
          aria-label="Open queue"
          className="grid h-10 w-10 place-items-center rounded-full text-[#eadac4] transition hover:bg-white/[0.07] hover:text-white"
          onClick={onOpenQueue}
          type="button"
        >
          <SlidersHorizontal size={21} />
        </button>
      </div>
    </div>
  )
}
