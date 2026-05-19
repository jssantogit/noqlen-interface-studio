import { ChevronRight, Search } from 'lucide-react'
import { ariaAlbums } from '../ariaMockData'

export function AriaLibrary({ onShowToast }: { onShowToast: (message: string) => void }) {
  return (
    <div className="min-h-full min-w-0 overflow-x-hidden px-4 pt-4 text-[#f5ecdf]">
      <h1 className="font-serif text-[30px] leading-[1.05] text-[#fff3e4]">Library</h1>

      {/* Search affordance */}
      <button
        className="mt-4 flex h-9 w-full items-center gap-2 rounded-xl border border-white/[0.075] bg-white/[0.035] px-3 text-left text-[11px] text-[#b9b1a7] shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] transition hover:bg-white/[0.045]"
        onClick={() => onShowToast('Library search (mock)')}
        type="button"
      >
        <Search size={14} className="shrink-0 text-[#b9b1a7]" />
        Search your library…
      </button>

      {/* Category chips */}
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1 anchor-scrollbar-none">
        {['Albums', 'Artists', 'Songs', 'Genres', 'Folders'].map((cat, index) => (
          <button
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-[10px] font-medium transition ${
              index === 0
                ? 'border border-[rgba(240,161,61,0.5)] bg-[rgba(240,161,61,0.08)] text-[#f0a13d]'
                : 'border border-white/[0.075] bg-white/[0.035] text-[#b9b1a7] hover:bg-white/[0.05]'
            }`}
            key={cat}
            onClick={() => onShowToast(`${cat} (mock)`)}
            type="button"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Albums list */}
      <section className="mt-4">
        <div className="flex items-center justify-between py-1 text-xs">
          <strong className="text-[#f0a13d]">Albums</strong>
          <button
            className="text-[10px] text-[#f0a13d] transition hover:text-[#ffb958]"
            onClick={() => onShowToast('See all albums (mock)')}
            type="button"
          >
            See all
          </button>
        </div>
        <div className="space-y-0">
          {ariaAlbums.map((album) => (
            <button
              className="flex w-full min-w-0 items-center gap-2 border-b border-white/[0.045] py-2.5 text-left transition hover:bg-white/[0.02]"
              key={album.id}
              onClick={() => onShowToast(`${album.title} (mock)`)}
              type="button"
            >
              <div className="aria-art aria-art-micro shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold text-[#f5ecdf]">{album.title}</p>
                <p className="text-[10px] leading-[1.3] text-[#b9b1a7]">
                  {album.artist} · {album.year}
                </p>
              </div>
              <span className="shrink-0 rounded-full border border-white/[0.075] bg-white/[0.035] px-2 py-0.5 text-[9px] text-[#bbb2a7]">
                {album.format} · {album.source}
              </span>
              <ChevronRight className="shrink-0 text-[#777d82]" size={14} />
            </button>
          ))}
        </div>
      </section>

      <div className="h-4" />
    </div>
  )
}
