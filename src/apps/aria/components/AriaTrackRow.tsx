import { MoreHorizontal } from 'lucide-react'
import type { AriaTrack } from '../ariaMockData'

export function AriaTrackRow({
  track,
  index,
  artClass,
  showArtwork = false,
  onOpen,
  onMore,
}: {
  track: AriaTrack
  index: number
  artClass?: string
  showArtwork?: boolean
  onOpen: (track: AriaTrack) => void
  onMore: (track: AriaTrack) => void
}) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-2xl px-1.5 py-2 transition hover:bg-white/[0.035]">
      {showArtwork ? (
        <button
          aria-label={`${track.title} artwork`}
          className={`aria-art aria-art-micro ${artClass ?? 'aria-art-mountain'} shrink-0`}
          onClick={() => onOpen(track)}
          type="button"
        />
      ) : (
        <button
          className="w-7 shrink-0 text-center text-[15px] tabular-nums text-[#b9b1a7]"
          onClick={() => onOpen(track)}
          type="button"
        >
          {index + 1}
        </button>
      )}
      <button className="min-w-0 flex-1 text-left" onClick={() => onOpen(track)} type="button">
        <p className="truncate text-[15px] font-medium leading-tight text-[#fff3e4]">{track.title}</p>
        {showArtwork && <p className="mt-1 truncate text-[12px] text-[#b9b1a7]">{track.artist}</p>}
      </button>
      <span className="shrink-0 text-[13px] tabular-nums text-[#b9b1a7]">{track.duration}</span>
      <button
        aria-label={`More options for ${track.title}`}
        className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[#d8cec3] transition hover:bg-white/[0.06]"
        onClick={() => onMore(track)}
        type="button"
      >
        <MoreHorizontal size={18} />
      </button>
    </div>
  )
}
