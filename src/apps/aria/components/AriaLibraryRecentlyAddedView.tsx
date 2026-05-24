import { ChevronLeft, Search, SlidersHorizontal } from 'lucide-react'
import type { AriaTrack } from '../ariaMockData'

export function AriaLibraryRecentlyAddedView({
  onBack,
  onOpenTrack,
  onShowToast,
  tracks,
}: {
  onBack: () => void
  onOpenTrack: (track: AriaTrack) => void
  onShowToast: (message: string) => void
  tracks: AriaTrack[]
}) {
  return (
    <div className="min-h-full min-w-0 overflow-x-hidden px-4 pt-4 text-[#f5ecdf]">
      <button className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.045] px-3 py-2 text-[13px] font-semibold text-[#f0a13d] transition hover:bg-white/[0.075]" onClick={onBack} type="button">
        <ChevronLeft size={17} /> Library
      </button>

      <header className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="font-serif text-[40px] leading-[0.95] text-[#fff3e4]">Recently Added</h1>
          <p className="mt-1.5 text-[16px] text-[#b9b1a7]">Latest library updates</p>
        </div>
        <HeaderTools label="recently added" onShowToast={onShowToast} />
      </header>

      <section className="mt-5 overflow-hidden rounded-[20px] border border-white/[0.075] bg-white/[0.025] p-1.5">
        {tracks.map((track) => (
          <button className="flex w-full min-w-0 items-center gap-3 rounded-[15px] px-2.5 py-2.5 text-left transition hover:bg-white/[0.045]" key={track.id} onClick={() => onOpenTrack(track)} type="button">
            <span className={`h-8 w-8 shrink-0 rounded-[10px] bg-gradient-to-br ${track.accent}`} />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[14px] font-semibold text-[#fff3e4]">{track.title}</span>
              <span className="block truncate text-[12px] text-[#b9b1a7]">{track.artist} · {track.album}</span>
            </span>
            <span className="text-[12px] tabular-nums text-[#a79d91]">{track.duration}</span>
          </button>
        ))}
      </section>

      <div className="h-8" />
    </div>
  )
}

function HeaderTools({ label, onShowToast }: { label: string; onShowToast: (message: string) => void }) {
  return (
    <div className="flex shrink-0 items-center gap-2 pt-0.5">
      <button aria-label={`Filter ${label}`} className="grid h-9 w-9 place-items-center rounded-full bg-white/[0.055] text-[#f0a13d] transition hover:bg-white/[0.085]" onClick={() => onShowToast(`Filter ${label}`)} type="button">
        <SlidersHorizontal size={17} />
      </button>
      <button aria-label={`Search ${label}`} className="grid h-9 w-9 place-items-center rounded-full bg-white/[0.055] text-[#f0a13d] transition hover:bg-white/[0.085]" onClick={() => onShowToast(`Search ${label}`)} type="button">
        <Search size={18} />
      </button>
    </div>
  )
}
