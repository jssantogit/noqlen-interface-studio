import { useState, type MouseEvent } from 'react'
import { ChevronDown, ListMusic, MoreHorizontal, Pause, Play, SkipBack, SkipForward } from 'lucide-react'
import type { AriaTrack } from '../ariaMockData'

const lyricLines = [
  'Dusk arrives so quietly,',
  'shadows stretch and stay,',
  'Time dissolves so lightly,',
  'I would still choose you',
  'in a hundred lifetimes,',
  'in a hundred worlds,',
  'in any version of reality.',
  'I would find you',
  'and I would choose you.',
]

export function AriaLyrics({
  currentTrack,
  isPlaying,
  onBack,
  onCollapse,
  onNext,
  onOpenQueue,
  onPlayPause,
  onPrevious,
  onSeek,
  onShowToast,
  progress,
}: {
  currentTrack: AriaTrack
  isPlaying: boolean
  onBack: () => void
  onCollapse: () => void
  onNext: () => void
  onOpenQueue: () => void
  onPlayPause: () => void
  onPrevious: () => void
  onSeek: (progress: number) => void
  onShowToast: (message: string) => void
  progress: number
}) {
  const [showOptions, setShowOptions] = useState(false)
  const activeLyricIndex = Math.min(lyricLines.length - 1, Math.floor((progress / 100) * lyricLines.length))
  const elapsedLabel = formatElapsed(currentTrack.duration, progress)
  const progressStyle = `${progress}%`

  const handleSeek = (event: MouseEvent<HTMLButtonElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    onSeek(((event.clientX - bounds.left) / bounds.width) * 100)
  }

  return (
    <div className="absolute inset-0 z-40 flex min-w-0 flex-col overflow-hidden bg-[radial-gradient(circle_at_50%_52%,rgba(240,161,61,0.22),transparent_42%),radial-gradient(circle_at_44%_28%,rgba(98,52,16,0.26),transparent_36%),linear-gradient(180deg,#060c10_0%,#05080c_50%,#030507_100%)] text-[#f5ecdf]">
      <header className="flex items-start justify-between px-5 pt-5">
        <button
          aria-label="Collapse lyrics"
          className="grid h-10 w-10 place-items-center rounded-full text-[#eadac4] transition hover:bg-white/[0.07] hover:text-white"
          onClick={onCollapse}
          type="button"
        >
          <ChevronDown size={22} />
        </button>
        <button
          aria-label="Return to Now Playing"
          className="min-w-0 px-4 text-center"
          onClick={onBack}
          type="button"
        >
          <p className="truncate text-[17px] font-medium text-[#f0a13d]">{currentTrack.title}</p>
          <p className="mt-1 truncate text-sm text-[#c9bdae]">{currentTrack.artist}</p>
        </button>
        <button
          aria-label="Lyrics options"
          className="grid h-10 w-10 place-items-center rounded-full text-[#eadac4] transition hover:bg-white/[0.07] hover:text-white"
          onClick={() => setShowOptions((visible) => !visible)}
          type="button"
        >
          <MoreHorizontal size={22} />
        </button>
      </header>

      {showOptions ? (
        <div className="absolute right-5 top-[4.2rem] z-10 w-48 overflow-hidden rounded-[22px] border border-white/[0.08] bg-[#101820]/95 p-2 shadow-[0_18px_36px_rgba(0,0,0,0.42)] backdrop-blur-md">
          <LyricsOption label="Highlight current line" onClick={() => onShowToast(`Line ${activeLyricIndex + 1} highlighted`)} />
          <LyricsOption label="Track credits" onClick={() => onShowToast(`${currentTrack.artist} credits`)} />
          <LyricsOption label="Lyrics source" onClick={() => onShowToast(`${currentTrack.album} lyrics`)} />
        </div>
      ) : null}

      <main className="min-h-0 flex-1 overflow-hidden px-9 pt-16">
        <div className="space-y-6 font-serif">
          {lyricLines.map((line, index) => {
            const active = index === activeLyricIndex
            const past = index < activeLyricIndex

            return (
              <p
                className={active ? 'text-[32px] leading-[1.28] text-[#fff3e4]' : past ? 'text-[23px] leading-[1.35] text-[#6f6255]/70' : 'text-[23px] leading-[1.35] text-[#7c7167]/70'}
                key={line}
              >
                {line}
              </p>
            )
          })}
        </div>
      </main>

      <footer className="px-8 pb-[max(1.7rem,env(safe-area-inset-bottom))] pt-4">
        <div className="mb-8 grid grid-cols-[3rem_1fr_3rem] items-center gap-4 text-sm text-[#eadac4]">
          <span>{elapsedLabel}</span>
          <button
            aria-label="Seek through lyrics timeline"
            className="group relative h-5 rounded-full"
            onClick={handleSeek}
            type="button"
          >
            <span className="absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-white/[0.14]" />
            <span className="absolute left-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-[#f0a13d]" style={{ width: progressStyle }} />
            <span className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffad45] transition group-active:scale-110" style={{ left: progressStyle }} />
          </button>
          <span className="text-right">{currentTrack.duration}</span>
        </div>

        <div className="grid grid-cols-[2.5rem_1fr_4.5rem_1fr_2.5rem] items-center gap-3">
          <button
            aria-label="Return to Now Playing"
            className="grid h-10 w-10 place-items-center rounded-full text-[#eadac4] transition hover:bg-white/[0.07] hover:text-white"
            onClick={onBack}
            type="button"
          >
            <ListMusic size={21} />
          </button>
          <button
            aria-label="Previous track"
            className="justify-self-end text-[#fff3e4] transition hover:text-[#f0a13d]"
            onClick={onPrevious}
            type="button"
          >
            <SkipBack size={31} fill="currentColor" />
          </button>
          <button
            aria-label={isPlaying ? 'Pause' : 'Play'}
            className="grid h-[72px] w-[72px] place-items-center rounded-full text-[#fff3df] shadow-[0_18px_34px_rgba(240,161,61,0.17)] transition active:scale-[0.97]"
            onClick={onPlayPause}
            style={{ background: 'radial-gradient(circle, rgba(240,161,61,0.92), rgba(67,42,18,0.88))' }}
            type="button"
          >
            {isPlaying ? <Pause size={34} fill="currentColor" /> : <Play size={34} fill="currentColor" className="ml-1" />}
          </button>
          <button
            aria-label="Next track"
            className="justify-self-start text-[#fff3e4] transition hover:text-[#f0a13d]"
            onClick={onNext}
            type="button"
          >
            <SkipForward size={31} fill="currentColor" />
          </button>
          <button
            aria-label="Open queue"
            className="grid h-10 w-10 place-items-center rounded-full text-[#eadac4] transition hover:bg-white/[0.07] hover:text-white"
            onClick={onOpenQueue}
            type="button"
          >
            <ListMusic size={21} />
          </button>
        </div>
      </footer>
    </div>
  )
}

function LyricsOption({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      className="block w-full rounded-2xl px-3 py-2 text-left text-[13px] font-medium text-[#f5ecdf] transition hover:bg-white/[0.06]"
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  )
}

function formatElapsed(duration: string, progress: number) {
  const [minutes = '0', seconds = '0'] = duration.split(':')
  const durationSeconds = Number(minutes) * 60 + Number(seconds)
  const elapsedSeconds = Math.round(durationSeconds * (progress / 100))
  const elapsedMinutes = Math.floor(elapsedSeconds / 60)
  const remainingSeconds = String(elapsedSeconds % 60).padStart(2, '0')

  return `${elapsedMinutes}:${remainingSeconds}`
}
