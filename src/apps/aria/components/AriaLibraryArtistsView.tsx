import { ChevronLeft, Search, SlidersHorizontal } from 'lucide-react'
import type { AriaArtist } from '../ariaMockData'

export function AriaLibraryArtistsView({
  artists,
  onBack,
  onOpenArtist,
  onShowToast,
}: {
  artists: AriaArtist[]
  onBack: () => void
  onOpenArtist: (artist: AriaArtist) => void
  onShowToast: (message: string) => void
}) {
  return (
    <div className="min-h-full min-w-0 overflow-x-hidden px-4 pt-4 text-[#f5ecdf]">
      <button className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.045] px-3 py-2 text-[13px] font-semibold text-[#f0a13d] transition hover:bg-white/[0.075]" onClick={onBack} type="button">
        <ChevronLeft size={17} /> Library
      </button>

      <header className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="font-serif text-[42px] leading-[0.95] text-[#fff3e4]">Artists</h1>
          <p className="mt-1.5 text-[16px] text-[#b9b1a7]">168 artists</p>
        </div>
        <HeaderTools label="artists" onShowToast={onShowToast} />
      </header>

      <section className="mt-5 space-y-1.5 rounded-[20px] border border-white/[0.075] bg-white/[0.025] p-1.5">
        {artists.map((artist, index) => (
          <button className="flex w-full min-w-0 items-center gap-3 rounded-[16px] px-2.5 py-2.5 text-left transition hover:bg-white/[0.045]" key={artist.id} onClick={() => onOpenArtist(artist)} type="button">
            <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br ${artist.accent} text-[15px] font-bold text-slate-950 shadow-[0_10px_20px_rgba(0,0,0,0.24)]`}>
              {artist.name.slice(0, 1)}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[16px] font-semibold leading-tight text-[#fff3e4]">{artist.name}</span>
              <span className="mt-0.5 block truncate text-[12px] text-[#b9b1a7]">{artist.location ?? artist.genre}</span>
            </span>
            <span className="shrink-0 rounded-full border border-white/[0.07] bg-white/[0.035] px-2 py-1 text-[11px] text-[#f0a13d]">{index + 2} releases</span>
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
