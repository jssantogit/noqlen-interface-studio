import { Archive, CalendarDays, Heart, ListMusic, Radio, Search, Shapes, Shuffle, SlidersHorizontal } from 'lucide-react'

type ExploreMode = 'search' | 'forgottenAlbums' | 'randomAlbum' | 'year' | 'style' | 'mood' | 'genre' | 'radio'

const discoverCards: { id: ExploreMode; label: string; icon: typeof Archive; art: string }[] = [
  { id: 'forgottenAlbums', label: 'Forgotten Albums', icon: Archive, art: 'aria-art-stack' },
  { id: 'randomAlbum', label: 'Random Album', icon: Shuffle, art: 'aria-art-orb' },
  { id: 'year', label: 'By Year', icon: CalendarDays, art: 'aria-art-clock' },
  { id: 'style', label: 'By Style', icon: SlidersHorizontal, art: 'aria-art-lines' },
  { id: 'mood', label: 'By Mood', icon: Heart, art: 'aria-art-violet' },
  { id: 'genre', label: 'By Genre', icon: Shapes, art: 'aria-art-waves' },
]

const radioStations = ['Soma FM', 'Radio Paradise', 'NTS Radio']

const recentlyExplored = [
  { id: 'forgottenAlbums', label: 'Forgotten Albums', art: 'aria-art-stack' },
  { id: 'mood', label: 'By Mood', art: 'aria-art-violet' },
  { id: 'year', label: 'By Year', art: 'aria-art-clock' },
  { id: 'radio', label: 'Radio', art: 'aria-art-radio' },
]

export function AriaExplore({
  onOpenExploreMode,
  onShowToast,
}: {
  onOpenExploreMode: (mode: ExploreMode, label: string) => void
  onShowToast: (message: string) => void
}) {
  return (
    <div className="min-h-full min-w-0 overflow-x-hidden px-4 pt-6 text-[#f5ecdf]">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-serif text-[58px] leading-[0.92] text-[#fff3e4]">Explore</h1>
          <p className="mt-3 text-[18px] text-[#c9beb1]">Rediscover your music</p>
        </div>
        <button
          aria-label="Explore queue status"
          className="relative mt-2 grid h-10 w-10 place-items-center rounded-xl border border-white/[0.16] bg-white/[0.035] text-[#f7eadb]"
          onClick={() => onShowToast('Explore status')}
          type="button"
        >
          <ListMusic size={25} strokeWidth={1.5} />
          <span className="absolute bottom-1.5 right-1.5 h-2 w-2 rounded-full bg-[#f0a13d] shadow-[0_0_0_2px_#071017]" />
        </button>
      </div>

      <button
        className="mt-5 flex h-12 w-full items-center gap-3 rounded-[22px] border border-white/[0.085] bg-white/[0.04] px-5 text-left text-[16px] text-[#b9b1a7] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition hover:bg-white/[0.055]"
        onClick={() => onOpenExploreMode('search', 'Search')}
        type="button"
      >
        <Search size={22} className="shrink-0 text-[#cfc4b8]" strokeWidth={1.7} />
        Search your music
      </button>

      <section className="mt-5">
        <h2 className="text-[19px] font-semibold text-[#f0a13d]">Discover</h2>
        <div className="mt-2.5 grid grid-cols-2 gap-3">
          {discoverCards.map((cat) => {
            const Icon = cat.icon
            return (
              <button
                key={cat.id}
                className="aria-discovery-card group relative h-[110px] overflow-hidden rounded-[20px] border border-white/[0.08] bg-white/[0.035] p-4 text-left shadow-[0_14px_28px_rgba(0,0,0,0.28)] transition hover:border-white/[0.14]"
                onClick={() => onOpenExploreMode(cat.id, cat.label)}
                type="button"
              >
                <div className={`aria-art aria-art-tile absolute inset-0 ${cat.art}`} />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_32%,rgba(2,5,9,0.74)_100%)]" />
                <Icon className="absolute right-4 top-4 text-[#f3b253]/70" size={22} strokeWidth={1.45} />
                <h3 className="absolute bottom-4 left-4 font-serif text-[25px] leading-none text-[#fff3e4] drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
                  {cat.label}
                </h3>
              </button>
            )
          })}
        </div>
      </section>

      <section className="mt-5">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-[19px] font-semibold text-[#f0a13d]">Radio</h2>
            <p className="mt-0.5 text-[13px] text-[#b9b1a7]">Internet radio stations</p>
          </div>
          <button
            className="text-[16px] text-[#f0a13d] transition hover:text-[#ffb958]"
            onClick={() => onOpenExploreMode('radio', 'Radio')}
            type="button"
          >
            Browse
          </button>
        </div>
        <div className="mt-2.5 space-y-2">
          {radioStations.map((station) => (
            <button
              className="flex w-full items-center gap-3 rounded-[17px] border border-white/[0.075] bg-white/[0.035] px-3 py-2.5 text-left transition hover:bg-white/[0.055]"
              key={station}
              onClick={() => onOpenExploreMode('radio', station)}
              type="button"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#f0a13d]/12 text-[#f0a13d]">
                <Radio size={19} strokeWidth={1.55} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[15px] font-semibold text-[#fff3e4]">{station}</span>
                <span className="mt-0.5 block text-[12px] text-[#b9b1a7]">User-added station</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-5">
        <h2 className="text-[19px] font-semibold text-[#f0a13d]">Recently Explored</h2>
        <div className="mt-2.5 grid grid-cols-4 gap-2">
          {recentlyExplored.map((item) => (
            <button
              className="flex min-h-[52px] items-center gap-2 rounded-[15px] border border-white/[0.075] bg-white/[0.035] px-2 text-left transition hover:bg-white/[0.055]"
              key={item.id}
              onClick={() => onOpenExploreMode(item.id as ExploreMode, item.label)}
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
