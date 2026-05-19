import { Play, Search, Shuffle } from 'lucide-react'
import { nowPlaying } from '../ariaMockData'

export function AriaListenHome({
  onPlay,
  onNavigateToExplore,
  onShowToast,
}: {
  onPlay: () => void
  onNavigateToExplore: () => void
  onShowToast: (message: string) => void
}) {
  const recentAdditions = [
    { id: 'ra-1', title: 'Midnight Horizons', artist: 'Ólafur Arnalds', type: 'Album', art: 'aria-art aria-art-micro aria-art-blue' },
    { id: 'ra-2', title: 'Sunday Morning', artist: 'Cory', type: 'Album', art: 'aria-art aria-art-micro' },
    { id: 'ra-3', title: 'Late Ambient', artist: 'Nils Frahm', type: 'Album', art: 'aria-art aria-art-micro aria-art-blue' },
    { id: 'ra-4', title: 'A Place', artist: 'Nils Frahm', type: 'Single', art: 'aria-art aria-art-micro' },
  ]

  return (
    <div className="min-h-full min-w-0 overflow-x-hidden px-4 pt-4 text-[#f5ecdf]">
      {/* Topbar */}
      <div className="mb-1 flex items-start justify-between">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.34em] text-[#f0a13d]">
            LISTENING SPACE
          </p>
          <h1 className="font-serif text-[35px] leading-[0.95] text-[#fff3e4]">
            Aria
          </h1>
        </div>
        <button
          aria-label="Queue status"
          className="relative mt-1 grid h-[25px] w-[25px] place-items-center rounded-lg border border-white/[0.22] text-[#f3e7d8]"
          onClick={() => onShowToast('Queue status (mock)')}
          type="button"
        >
          <span className="text-sm">▤</span>
          <span className="absolute -bottom-0.5 -right-0.5 h-[6px] w-[6px] rounded-full bg-[#5de084] shadow-[0_0_0_2px_#071017]" />
        </button>
      </div>

      {/* Featured current track card */}
      <div className="mt-5 overflow-hidden rounded-[20px] border border-white/[0.075] bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]">
        <div className="relative w-full aspect-square max-h-[280px]">
          <div className="aria-art absolute inset-0 rounded-t-[18px]" />
        </div>
        <div className="p-4">
          <h2 className="font-serif text-[24px] leading-[1.05] text-[#fff3e4]">{nowPlaying.title}</h2>
          <p className="mt-1 text-sm text-[#f0a13d]">{nowPlaying.artist}</p>
          <p className="mt-0.5 text-[10px] text-[#b9b1a7]">{nowPlaying.album} · {nowPlaying.duration}</p>
          <div className="mt-4 flex items-center gap-3">
            <button
              className="flex h-[36px] items-center gap-2 rounded-full bg-gradient-to-b from-[#ffb958] to-[#ea912c] px-5 text-xs font-bold text-[#190f07] shadow-[0_8px_16px_rgba(240,161,61,0.16)] transition active:scale-[0.98]"
              onClick={onPlay}
              type="button"
            >
              <Play size={14} fill="currentColor" />
              Play
            </button>
            <button
              className="flex h-[36px] items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-5 text-xs font-medium text-[#f5ecdf] transition hover:bg-white/[0.07]"
              onClick={() => onShowToast('Shuffle (mock)')}
              type="button"
            >
              <Shuffle size={14} />
              Shuffle
            </button>
          </div>
        </div>
      </div>

      {/* Shortcut tiles */}
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        <button
          className="flex flex-col gap-1.5 rounded-[16px] border border-white/[0.075] p-3.5 text-left transition hover:bg-white/[0.04]"
          onClick={() => onShowToast('Your Playlists (mock)')}
          style={{ background: 'linear-gradient(145deg, rgba(57,35,17,0.48), rgba(255,255,255,0.02))' }}
          type="button"
        >
          <span className="text-lg text-[#f0a13d]">♬</span>
          <strong className="font-serif text-[15px] font-normal text-[#f5ecdf]">Your Playlists</strong>
          <span className="text-[10px] leading-[1.3] text-[#b9b1a7]">12 playlists</span>
        </button>
        <button
          className="flex flex-col gap-1.5 rounded-[16px] border border-white/[0.075] p-3.5 text-left transition hover:bg-white/[0.04]"
          onClick={() => onShowToast('Artists (mock)')}
          style={{ background: 'linear-gradient(145deg, rgba(15,29,39,0.55), rgba(255,255,255,0.02))' }}
          type="button"
        >
          <span className="text-lg text-[#f0a13d]">♪</span>
          <strong className="font-serif text-[15px] font-normal text-[#f5ecdf]">Artists</strong>
          <span className="text-[10px] leading-[1.3] text-[#b9b1a7]">Local artist index</span>
        </button>
      </div>

      {/* Search bar */}
      <button
        className="mt-4 flex h-9 w-full items-center gap-2 rounded-xl border border-white/[0.075] bg-white/[0.035] px-3 text-left text-[11px] text-[#b9b1a7] shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] transition hover:bg-white/[0.045]"
        onClick={onNavigateToExplore}
        type="button"
      >
        <Search size={14} className="shrink-0 text-[#b9b1a7]" />
        Search your library
      </button>

      {/* Recent additions */}
      <div className="mt-5">
        <div className="flex items-center justify-between py-2 text-xs">
          <strong className="text-[#f0a13d]">Recent additions</strong>
          <button
            className="text-[10px] text-[#f0a13d] transition hover:text-[#ffb958]"
            onClick={() => onShowToast('See all (mock)')}
            type="button"
          >
            See all
          </button>
        </div>
        <div className="space-y-0">
          {recentAdditions.map((item) => (
            <button
              className="flex w-full min-w-0 items-center gap-2 border-b border-white/[0.045] py-2.5 text-left transition hover:bg-white/[0.02]"
              key={item.id}
              onClick={() => onShowToast(`${item.title} (mock)`)}
              type="button"
            >
              <div className={`${item.art} shrink-0`} />
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold text-[#f5ecdf]">{item.title}</p>
                <p className="text-[10px] leading-[1.3] text-[#b9b1a7]">{item.artist}</p>
              </div>
              <span className="shrink-0 text-[10px] text-[#b9b1a7]">{item.type}</span>
              <span className="shrink-0 text-[10px] text-[#777d82]">•••</span>
            </button>
          ))}
        </div>
      </div>

      <div className="h-6" />
    </div>
  )
}
