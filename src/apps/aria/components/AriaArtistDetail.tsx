import { ChevronRight, MoreHorizontal, Play } from 'lucide-react'
import type { AriaAlbum, AriaArtist, AriaTrack } from '../ariaMockData'
import { ariaAlbums, ariaArtistTopSongs, ariaDiscography } from '../ariaMockData'
import { AriaDetailHeader } from './AriaDetailHeader'
import { AriaTrackRow } from './AriaTrackRow'

export function AriaArtistDetail({
  artist,
  onBack,
  onOpenAlbum,
  onOpenTrack,
  onShowToast,
}: {
  artist: AriaArtist
  onBack: () => void
  onOpenAlbum: (album: AriaAlbum) => void
  onOpenTrack: (track: AriaTrack) => void
  onShowToast: (message: string) => void
}) {
  const latest = ariaAlbums[0]

  return (
    <div className="min-h-full min-w-0 overflow-x-hidden px-4 pt-4 text-[#f5ecdf]">
      <div className="relative -mx-4 -mt-4 px-4 pb-6 pt-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_10%,rgba(255,255,255,0.12),transparent_22%),linear-gradient(180deg,rgba(0,0,0,0.1),rgba(3,7,10,0.90)_72%,#05090e_100%)]" />
        <div className="absolute left-12 right-1 top-11 h-[235px] opacity-80">
          <div className="aria-art aria-art-hero aria-art-portrait h-full rounded-[28px] border-white/[0.04] opacity-75 grayscale" />
        </div>
        <div className="relative z-10">
          <AriaDetailHeader label="Artist" onBack={onBack} onMore={() => onShowToast('Artist options (mock)')} />
          <div className="h-[260px]" />
          <h1 className="font-serif text-[47px] leading-[0.92] text-[#f0a13d] drop-shadow-[0_4px_16px_rgba(0,0,0,0.55)]">{artist.name}</h1>
          <p className="mt-3 text-[17px] text-[#c8bdb1]">{artist.location ?? 'Berlin, Germany'}</p>
          <p className="mt-2 text-[17px] text-[#b9b1a7]">
            {(artist.tags ?? [artist.genre]).map((tag, index) => (
              <span key={tag}>{index > 0 && <span className="px-2 text-[#f0a13d]">•</span>}{tag}</span>
            ))}
          </p>
          <div className="mt-6 flex items-center gap-3">
            <button className="flex h-12 w-[150px] items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#ffbd63] to-[#f09a35] text-[17px] font-bold text-[#1a1008] shadow-[0_12px_24px_rgba(240,161,61,0.24)]" onClick={() => onShowToast('Play artist top songs (mock)')} type="button">
              <Play size={18} fill="currentColor" /> Play
            </button>
            <button aria-label="More artist actions" className="grid h-12 w-12 place-items-center rounded-full bg-white/[0.06] text-[#fff3e4]" onClick={() => onShowToast('Artist more actions (mock)')} type="button">
              <MoreHorizontal size={24} />
            </button>
          </div>
        </div>
      </div>

      <section className="mt-1">
        <h2 className="font-serif text-[25px] text-[#fff3e4]">Latest Release</h2>
        <button className="mt-2 flex w-full items-center gap-3 rounded-[17px] border border-white/[0.08] bg-white/[0.035] p-3 text-left" onClick={() => onOpenAlbum(latest)} type="button">
          <span className="aria-art aria-art-thumb aria-art-architecture" />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[17px] text-[#fff3e4]">{latest.title}</span>
            <span className="mt-1 block text-[14px] text-[#b9b1a7]">Album <span className="px-2">•</span> {latest.year}</span>
          </span>
          <ChevronRight className="text-[#f0a13d]" size={24} />
        </button>
      </section>

      <section className="mt-5">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-[25px] text-[#fff3e4]">Top Songs</h2>
          <button className="text-[16px] text-[#f0a13d]" onClick={() => onShowToast('See all top songs (mock)')} type="button">See all</button>
        </div>
        <div className="mt-1">
          {ariaArtistTopSongs.map((track, index) => (
            <AriaTrackRow key={track.id} track={track} index={index} onOpen={onOpenTrack} onMore={(item) => onShowToast(`${item.title} options (mock)`)} />
          ))}
        </div>
      </section>

      <section className="mt-5">
        <h2 className="font-serif text-[25px] text-[#fff3e4]">EPs & Singles</h2>
        <div className="mt-2 space-y-2">
          {ariaDiscography.map((item) => (
            <button className="flex w-full items-center gap-3 rounded-[17px] border border-white/[0.07] bg-white/[0.032] p-3 text-left" key={item.id} onClick={() => onShowToast(`${item.title} (mock)`)} type="button">
              <span className={`aria-art aria-art-thumb ${item.art}`} />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[16px] text-[#fff3e4]">{item.title}</span>
                <span className="mt-1 block text-[13px] text-[#b9b1a7]">{item.subtitle}</span>
              </span>
              <ChevronRight className="text-[#f0a13d]" size={22} />
            </button>
          ))}
        </div>
      </section>

      <div className="h-8" />
    </div>
  )
}
