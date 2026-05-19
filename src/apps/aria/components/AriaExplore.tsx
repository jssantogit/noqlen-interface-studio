import { Disc, LayoutGrid, ListMusic, Mic2, Music, Radio } from 'lucide-react'

const categories = [
  { id: 'genres', label: 'Genres', count: '14 genres', icon: LayoutGrid },
  { id: 'albums', label: 'Albums', count: '48 albums', icon: Disc },
  { id: 'artists', label: 'Artists', count: '23 artists', icon: Mic2 },
  { id: 'radios', label: 'Radios', count: '6 stations', icon: Radio },
  { id: 'songs', label: 'Songs', count: '312 songs', icon: Music },
  { id: 'playlists', label: 'Playlists', count: '3 playlists', icon: ListMusic },
]

export function AriaExplore({ onShowToast }: { onShowToast: (message: string) => void }) {
  return (
    <div className="min-h-full min-w-0 overflow-x-hidden px-4 pt-4 text-[#f5ecdf]">
      <h1 className="font-serif text-[30px] leading-[1.05] text-[#fff3e4]">Explore</h1>
      <p className="mt-1 text-[10px] text-[#777d82]">Browse your library by category.</p>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {categories.map((cat) => {
          const Icon = cat.icon
          return (
            <button
              key={cat.id}
              className="flex flex-col gap-3 rounded-[18px] border border-white/[0.075] bg-white/[0.03] p-4 text-left transition hover:bg-white/[0.05]"
              onClick={() => onShowToast(`${cat.label} (mock)`)}
              type="button"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-[#f0a13d]">
                <Icon size={18} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-serif text-[16px] leading-[1.1] text-[#f5ecdf]">{cat.label}</h3>
                <p className="mt-0.5 text-[10px] text-[#b9b1a7]">{cat.count}</p>
              </div>
            </button>
          )
        })}
      </div>

      <div className="h-6" />
    </div>
  )
}
