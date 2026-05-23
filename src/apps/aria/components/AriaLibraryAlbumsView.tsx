import { ChevronLeft, Search, SlidersHorizontal } from 'lucide-react'
import type { AriaAlbum } from '../ariaMockData'

const albumArt = ['aria-art-architecture', 'aria-art-blue', 'aria-art-mountain', 'aria-art-tree', 'aria-art-violet']

export function AriaLibraryAlbumsView({
  albums,
  onBack,
  onOpenAlbum,
  onShowToast,
}: {
  albums: AriaAlbum[]
  onBack: () => void
  onOpenAlbum: (album: AriaAlbum) => void
  onShowToast: (message: string) => void
}) {
  return (
    <div className="min-h-full min-w-0 overflow-x-hidden px-4 pt-4 text-[#f5ecdf]">
      <button className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.045] px-3 py-2 text-[13px] font-semibold text-[#f0a13d] transition hover:bg-white/[0.075]" onClick={onBack} type="button">
        <ChevronLeft size={17} /> Library
      </button>

      <header className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="font-serif text-[42px] leading-[0.95] text-[#fff3e4]">Albums</h1>
          <p className="mt-1.5 text-[16px] text-[#b9b1a7]">245 albums</p>
        </div>
        <HeaderTools label="albums" onShowToast={onShowToast} />
      </header>

      <section className="mt-5 grid grid-cols-2 gap-3.5">
        {albums.map((album, index) => (
          <button className="min-w-0 overflow-hidden rounded-[18px] border border-white/[0.075] bg-white/[0.035] p-2 text-left shadow-[0_14px_28px_rgba(0,0,0,0.22)] transition hover:bg-white/[0.06]" key={album.id} onClick={() => onOpenAlbum(album)} type="button">
            <div className={`aria-art aria-art-card ${albumArt[index % albumArt.length]}`} />
            <div className="mt-2 min-w-0 px-0.5 pb-1">
              <h2 className="truncate text-[15px] font-semibold leading-tight text-[#fff3e4]">{album.title}</h2>
              <p className="mt-1 truncate text-[12px] text-[#b9b1a7]">{album.artist}</p>
              <div className="mt-2 flex items-center justify-between gap-2 text-[11px] text-[#a79d91]">
                <span>{album.year}</span>
                <span className="rounded-full bg-[#f0a13d]/12 px-2 py-0.5 font-bold text-[#f0a13d]">{album.format}</span>
              </div>
            </div>
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
      <button aria-label={`Filter ${label}`} className="grid h-9 w-9 place-items-center rounded-full bg-white/[0.055] text-[#f0a13d] transition hover:bg-white/[0.085]" onClick={() => onShowToast(`Filter ${label} (mock)`)} type="button">
        <SlidersHorizontal size={17} />
      </button>
      <button aria-label={`Search ${label}`} className="grid h-9 w-9 place-items-center rounded-full bg-white/[0.055] text-[#f0a13d] transition hover:bg-white/[0.085]" onClick={() => onShowToast(`Search ${label} (mock)`)} type="button">
        <Search size={18} />
      </button>
    </div>
  )
}
