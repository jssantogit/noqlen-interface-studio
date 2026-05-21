import { Disc3, ListMusic, Mic2, Music2, Radio, Search, Shapes } from 'lucide-react'

const categories = [
  { id: 'genres', label: 'Genres', icon: Shapes, art: 'aria-art-waves' },
  { id: 'albums', label: 'Albums', icon: Disc3, art: 'aria-art-stack' },
  { id: 'artists', label: 'Artists', icon: Mic2, art: 'aria-art-portrait' },
  { id: 'radios', label: 'Radio', icon: Radio, art: 'aria-art-radio' },
  { id: 'songs', label: 'Songs', icon: Music2, art: 'aria-art-lines' },
  { id: 'playlists', label: 'Playlists', icon: ListMusic, art: 'aria-art-playlist' },
]

const recentlyExplored = [
  { id: 'rx-1', label: 'Genres', art: 'aria-art-orb' },
  { id: 'rx-2', label: 'Artist', art: 'aria-art-violin' },
  { id: 'rx-3', label: 'Albums', art: 'aria-art-stack' },
  { id: 'rx-4', label: 'Recently Added', art: 'aria-art-clock' },
]

export function AriaExplore({ onShowToast }: { onShowToast: (message: string) => void }) {
  return (
    <div className="min-h-full min-w-0 overflow-x-hidden px-4 pt-6 text-[#f5ecdf]">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-serif text-[58px] leading-[0.92] text-[#fff3e4]">Explore</h1>
          <p className="mt-3 text-[18px] text-[#c9beb1]">Browse your local library</p>
        </div>
        <button
          aria-label="Explore queue status"
          className="relative mt-2 grid h-10 w-10 place-items-center rounded-xl border border-white/[0.16] bg-white/[0.035] text-[#f7eadb]"
          onClick={() => onShowToast('Explore status (mock)')}
          type="button"
        >
          <ListMusic size={25} strokeWidth={1.5} />
          <span className="absolute bottom-1.5 right-1.5 h-2 w-2 rounded-full bg-[#f0a13d] shadow-[0_0_0_2px_#071017]" />
        </button>
      </div>

      <button
        className="mt-7 flex h-14 w-full items-center gap-3 rounded-[24px] border border-white/[0.085] bg-white/[0.04] px-5 text-left text-[17px] text-[#b9b1a7] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition hover:bg-white/[0.055]"
        onClick={() => onShowToast('Explore search (mock)')}
        type="button"
      >
        <Search size={22} className="shrink-0 text-[#cfc4b8]" strokeWidth={1.7} />
        Search artists, albums, genres...
      </button>

      <section className="mt-6 grid grid-cols-2 gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon
          return (
            <button
              key={cat.id}
              className="aria-discovery-card group relative h-[137px] overflow-hidden rounded-[20px] border border-white/[0.08] bg-white/[0.035] p-4 text-left shadow-[0_14px_28px_rgba(0,0,0,0.28)] transition hover:border-white/[0.14]"
              onClick={() => onShowToast(`${cat.label} (mock)`)}
              type="button"
            >
              <div className={`aria-art aria-art-tile absolute inset-0 ${cat.art}`} />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_32%,rgba(2,5,9,0.74)_100%)]" />
              <Icon className="absolute right-4 top-4 text-[#f3b253]/70" size={22} strokeWidth={1.45} />
              <h3 className="absolute bottom-4 left-4 font-serif text-[26px] leading-none text-[#fff3e4] drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
                {cat.label}
              </h3>
            </button>
          )
        })}
      </section>

      <section className="mt-7">
        <div className="flex items-center justify-between">
          <h2 className="text-[19px] font-semibold text-[#f0a13d]">Recently Explored</h2>
          <button
            className="text-[16px] text-[#f0a13d] transition hover:text-[#ffb958]"
            onClick={() => onShowToast('See all explored (mock)')}
            type="button"
          >
            See all
          </button>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-2">
          {recentlyExplored.map((item) => (
            <button
              className="flex min-h-[58px] items-center gap-2 rounded-[15px] border border-white/[0.075] bg-white/[0.035] px-2 text-left transition hover:bg-white/[0.055]"
              key={item.id}
              onClick={() => onShowToast(`${item.label} (mock)`)}
              type="button"
            >
              <span className={`aria-art aria-art-chip ${item.art}`} />
              <span className="text-[12px] leading-tight text-[#f5ecdf]">{item.label}</span>
            </button>
          ))}
        </div>
      </section>

      <div className="h-8" />
    </div>
  )
}
