import { useState } from 'react'
import { HardDrive, ListMusic, Mic2, Play, Search } from 'lucide-react'
import type { AriaAlbum, AriaTrack } from '../ariaMockData'
import { ariaAlbums, ariaQueue, nowPlaying } from '../ariaMockData'

export function AriaListenHome({
  onPlay,
  onOpenAlbum,
  onOpenTrack,
  onNavigateToLibrary,
  onNavigateToExplore,
  onNavigateToPlaylists,
  onOpenSourceSheet,
  onShowToast,
}: {
  onPlay: () => void
  onOpenAlbum: (album: AriaAlbum) => void
  onOpenTrack: (track: AriaTrack) => void
  onNavigateToLibrary: () => void
  onNavigateToExplore: () => void
  onNavigateToPlaylists: () => void
  onOpenSourceSheet: () => void
  onShowToast: (message: string) => void
}) {
  const [showAllRecent, setShowAllRecent] = useState(false)
  const recentAdditions = [
    { id: 'ra-1', title: 'Midnight Horizons', artist: 'Ólafur Arnalds', type: 'Album', art: 'aria-art aria-art-tiny aria-art-mist', onOpen: () => onOpenAlbum(ariaAlbums[3]) },
    { id: 'ra-2', title: 'Sunday Morning', artist: 'Cory', type: 'Track', art: 'aria-art aria-art-tiny aria-art-tree', onOpen: () => onOpenTrack(ariaQueue[3]) },
    { id: 'ra-3', title: 'Late Ambient', artist: 'Nils Frahm', type: 'Track', art: 'aria-art aria-art-tiny aria-art-violet', onOpen: () => onOpenTrack(ariaQueue[4]) },
    { id: 'ra-4', title: 'A Place', artist: 'Nils Frahm', type: 'Single', art: 'aria-art aria-art-tiny aria-art-mountain', onOpen: () => onOpenTrack(ariaQueue[5]) },
    { id: 'ra-5', title: 'All Melody', artist: 'Nils Frahm', type: 'Album', art: 'aria-art aria-art-tiny aria-art-waves', onOpen: () => onOpenAlbum(ariaAlbums[0]) },
    { id: 'ra-6', title: 'Bloom', artist: 'Cory', type: 'Track', art: 'aria-art aria-art-tiny aria-art-dune', onOpen: () => onOpenTrack(ariaQueue[1]) },
  ]
  const visibleRecentAdditions = showAllRecent ? recentAdditions : recentAdditions.slice(0, 4)

  return (
    <div className="min-h-full min-w-0 overflow-x-hidden px-4 pt-5 text-[#f5ecdf]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.42em] text-[#f0a13d]">
            LISTENING SPACE
          </p>
          <h1 className="mt-1 font-serif text-[45px] leading-[0.9] text-[#fff3e4]">
            Aria
          </h1>
        </div>
        <button
          aria-label="Library source status"
          className="relative mt-2 grid h-9 w-9 place-items-center rounded-xl border border-white/[0.18] bg-white/[0.035] text-[#f3e7d8] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
          onClick={onOpenSourceSheet}
          type="button"
        >
          <HardDrive size={19} strokeWidth={1.65} />
        </button>
      </div>

      <section className="mt-5 overflow-hidden rounded-[22px] border border-white/[0.08] bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-3 shadow-[0_18px_40px_rgba(0,0,0,0.26),inset_0_1px_0_rgba(255,255,255,0.06)]">
        <div className="flex gap-3.5">
          <div className="aria-art aria-art-feature aria-art-architecture shrink-0" />
          <div className="flex min-w-0 flex-1 flex-col justify-center py-1">
            <h2 className="font-serif text-[23px] leading-[1.02] text-[#fff3e4]">{nowPlaying.title}</h2>
            <p className="mt-2 text-[14px] leading-[1.25] text-[#ded1c2]">{nowPlaying.artist}</p>
            <p className="mt-1 text-[14px] leading-[1.25] text-[#c4b8aa]">{nowPlaying.album}</p>
            <p className="mt-2 text-[13px] text-[#9d968e]">{nowPlaying.duration}</p>
            <button
              className="mt-4 flex h-10 w-[120px] items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#ffbd63] to-[#f09a35] text-[15px] font-bold text-[#1a1008] shadow-[0_12px_24px_rgba(240,161,61,0.24)] transition active:scale-[0.98]"
              onClick={onPlay}
              type="button"
            >
              <Play size={17} fill="currentColor" />
              Play
            </button>
          </div>
        </div>
      </section>

      <div className="mt-3 grid grid-cols-2 gap-2.5">
        <button
          className="rounded-[20px] border border-[rgba(240,161,61,0.16)] bg-[linear-gradient(145deg,rgba(58,36,18,0.56),rgba(255,255,255,0.03))] p-3.5 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition hover:bg-white/[0.04]"
          onClick={onNavigateToPlaylists}
          type="button"
        >
          <ListMusic size={23} className="text-[#f0a13d]" strokeWidth={1.6} />
          <strong className="mt-6 block font-serif text-[19px] font-normal leading-none text-[#f5ecdf]">Your Playlists</strong>
          <span className="mt-2 block text-[13px] leading-[1.3] text-[#b9b1a7]">12 playlists</span>
        </button>
        <button
          className="rounded-[20px] border border-white/[0.08] bg-[linear-gradient(145deg,rgba(15,29,39,0.62),rgba(255,255,255,0.025))] p-3.5 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition hover:bg-white/[0.04]"
          onClick={() => {
            onNavigateToLibrary()
            onShowToast('Artists index')
          }}
          type="button"
        >
          <Mic2 size={23} className="text-[#f0a13d]" strokeWidth={1.6} />
          <strong className="mt-6 block font-serif text-[19px] font-normal leading-none text-[#f5ecdf]">Artists</strong>
          <span className="mt-2 block text-[13px] leading-[1.3] text-[#b9b1a7]">Local artist index</span>
        </button>
      </div>

      <button
        className="mt-3 flex h-12 w-full items-center gap-3 rounded-[22px] border border-white/[0.085] bg-white/[0.04] px-5 text-left text-[16px] text-[#b9b1a7] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition hover:bg-white/[0.055]"
        onClick={() => {
          onNavigateToExplore()
          onShowToast('Search in Explore')
        }}
        type="button"
      >
        <Search size={22} className="shrink-0 text-[#cfc4b8]" strokeWidth={1.7} />
        Search your library
      </button>

      <section className="mt-5">
        <div className="flex items-center justify-between py-1">
          <h2 className="text-[18px] font-semibold text-[#f0a13d]">Recent additions</h2>
          <button
            className="text-[16px] text-[#f0a13d] transition hover:text-[#ffb958]"
            onClick={() => {
              setShowAllRecent((current) => !current)
              onShowToast(showAllRecent ? 'Recent additions collapsed' : 'Recently Added list')
            }}
            type="button"
          >
            {showAllRecent ? 'Show less' : 'See all'}
          </button>
        </div>
        <div className="mt-2 space-y-1">
          {visibleRecentAdditions.map((item) => (
            <div
              className="flex w-full min-w-0 items-center gap-3 rounded-2xl px-1 py-1.5 transition hover:bg-white/[0.035]"
              key={item.id}
            >
              <button
                className="flex min-w-0 flex-1 items-center gap-3 text-left"
                onClick={item.onOpen}
                type="button"
              >
                <div className={`${item.art} shrink-0`} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[15px] font-semibold leading-tight text-[#f5ecdf]">{item.title}</p>
                  <p className="mt-1 truncate text-[13px] leading-tight text-[#b9b1a7]">{item.artist}</p>
                </div>
              </button>
              <span className="shrink-0 text-[14px] text-[#b9b1a7]">{item.type}</span>
              <button
                aria-label={`More options for ${item.title}`}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[15px] tracking-[0.12em] text-[#a69d94] transition hover:bg-white/[0.06]"
                onClick={(event) => {
                  event.stopPropagation()
                  onShowToast(`Options for ${item.title}`)
                }}
                type="button"
              >
                •••
              </button>
            </div>
          ))}
        </div>
      </section>

      <div className="h-8" />
    </div>
  )
}
