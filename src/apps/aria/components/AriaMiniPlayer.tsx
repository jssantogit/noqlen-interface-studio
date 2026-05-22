import { useRef, useState } from 'react'
import type { KeyboardEvent, PointerEvent } from 'react'
import { Pause, Play, SkipBack, SkipForward } from 'lucide-react'
import { nowPlaying } from '../ariaMockData'

type PlaybackContextChip = {
  id: string
  label: string
  hasStatusDot?: boolean
  description: string
}

const playbackContextChips: PlaybackContextChip[] = [
  {
    id: 'quality',
    label: 'FLAC 24/96',
    description: 'Track quality and resolution',
  },
  {
    id: 'output',
    label: 'BTR11 · LDAC',
    hasStatusDot: true,
    description: 'Active output device',
  },
  {
    id: 'source',
    label: 'Local library',
    description: 'Playback source',
  },
  {
    id: 'queue',
    label: 'Queue · 3 of 18',
    description: 'Queue position',
  },
]

function wrapChipIndex(index: number, direction: 1 | -1) {
  return (index + direction + playbackContextChips.length) % playbackContextChips.length
}

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
  const [activeChipIndex, setActiveChipIndex] = useState(0)
  const pointerStartX = useRef<number | null>(null)
  const activeChip = playbackContextChips[activeChipIndex]

  const switchContextChip = (direction: 1 | -1) => {
    setActiveChipIndex((current) => wrapChipIndex(current, direction))
  }

  const handleChipPointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    pointerStartX.current = event.clientX
  }

  const handleChipPointerUp = (event: PointerEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    const startX = pointerStartX.current
    pointerStartX.current = null

    if (startX === null) {
      switchContextChip(1)
      return
    }

    const deltaX = event.clientX - startX
    if (Math.abs(deltaX) < 18) {
      switchContextChip(1)
      return
    }

    switchContextChip(deltaX < 0 ? 1 : -1)
  }

  const handleChipKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    event.stopPropagation()

    if (event.key === 'ArrowRight') {
      event.preventDefault()
      switchContextChip(1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      switchContextChip(-1)
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      switchContextChip(1)
    }
  }

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
      <div className="min-w-0 pb-1">
        <p className="truncate text-[11px] font-semibold tracking-[-0.01em] text-[#fff3e4]">
          {nowPlaying.title}
        </p>
        <p className="truncate text-[10px] leading-[1.3] text-[#b9b1a7]">
          {nowPlaying.artist}
        </p>
        <button
          aria-label={`Playback info: ${activeChip.label}. Swipe horizontally or press arrow keys to switch.`}
          className="mt-1 flex max-w-full items-center gap-1 rounded-full border border-white/[0.07] bg-white/[0.04] px-2 py-[2px] text-[9px] font-medium leading-none text-[#d8cec3] transition hover:bg-white/[0.065] focus:outline-none focus:ring-2 focus:ring-[#f0a13d]/25"
          onClick={(event) => event.stopPropagation()}
          onKeyDown={handleChipKeyDown}
          onPointerDown={handleChipPointerDown}
          onPointerUp={handleChipPointerUp}
          title={`${activeChip.description}: ${activeChip.label}`}
          type="button"
        >
          {activeChip.hasStatusDot ? (
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#65e985] shadow-[0_0_0_2px_rgba(101,233,133,0.1),0_0_8px_rgba(101,233,133,0.45)]" />
          ) : null}
          <span className="truncate">{activeChip.label}</span>
        </button>
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
