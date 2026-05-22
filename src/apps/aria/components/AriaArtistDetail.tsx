import { ChevronRight, MoreHorizontal, Play } from 'lucide-react'
import type { AriaAlbum, AriaArtist, AriaDiscographyItem, AriaTrack } from '../ariaMockData'
import { ariaAlbums, ariaArtistTopSongs, ariaDiscography } from '../ariaMockData'
import { AriaDetailHeader } from './AriaDetailHeader'
import { AriaTrackRow } from './AriaTrackRow'

export function AriaArtistDetail({
  artist,
  onBack,
  onOpenAlbum,
  onOpenArtistOptions,
  onOpenArtistTopSongs,
  onOpenTrack,
  onOpenTrackOptions,
  onShowToast,
}: {
  artist: AriaArtist
  onBack: () => void
  onOpenAlbum: (album: AriaAlbum) => void
  onOpenArtistOptions: (artist: AriaArtist) => void
  onOpenArtistTopSongs: (artist: AriaArtist) => void
  onOpenTrack: (track: AriaTrack) => void
  onOpenTrackOptions: (track: AriaTrack) => void
  onShowToast: (message: string) => void
}) {
  const latest = ariaAlbums.find((album) => album.artist === artist.name) ?? ariaAlbums[0]

  return (
    <div className="min-h-full min-w-0 overflow-x-hidden px-4 pt-4 text-[#f5ecdf]">
      <div className="relative -mx-4 -mt-4 overflow-hidden px-4 pb-5 pt-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_24%,rgba(240,161,61,0.14),transparent_27%),linear-gradient(180deg,rgba(2,5,8,0.1),rgba(3,7,10,0.88)_74%,#05090e_100%)]" />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[390px] overflow-hidden bg-[radial-gradient(circle_at_56%_18%,rgba(255,255,255,0.10),transparent_18%),radial-gradient(circle_at_43%_50%,rgba(255,255,255,0.055),transparent_30%),linear-gradient(180deg,#080b0f_0%,#0a0d10_48%,rgba(5,9,14,0.18)_100%)]">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,9,14,0.84),transparent_30%,transparent_72%,rgba(5,9,14,0.62)),radial-gradient(circle_at_35%_18%,rgba(255,255,255,0.055),transparent_18%)]" />
          <svg className="absolute right-[-16px] top-10 h-[302px] w-[270px] opacity-90 grayscale" fill="none" viewBox="0 0 270 302" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="ariaArtistFace" x1="73" x2="190" y1="41" y2="154" gradientUnits="userSpaceOnUse">
                <stop stopColor="#d8d6d0" />
                <stop offset="0.34" stopColor="#747673" />
                <stop offset="0.7" stopColor="#24282a" />
                <stop offset="1" stopColor="#07090b" />
              </linearGradient>
              <linearGradient id="ariaArtistBody" x1="61" x2="230" y1="160" y2="282" gradientUnits="userSpaceOnUse">
                <stop stopColor="#303437" />
                <stop offset="0.45" stopColor="#14191c" />
                <stop offset="1" stopColor="#040608" />
              </linearGradient>
            </defs>
            <path d="M62 293c11-65 46-104 103-117 45 19 78 58 88 117H62Z" fill="url(#ariaArtistBody)" />
            <path d="M127 136c18 7 31 22 35 45l-18 57c-30-8-44-25-42-52l25-50Z" fill="#111518" />
            <path d="M72 81c11-29 38-47 79-50 30 6 50 24 58 54l-9 50-27 31-45-1-35-20-21-64Z" fill="url(#ariaArtistFace)" />
            <path d="M70 83c4-36 34-58 88-66 31 7 50 25 58 55-32-12-59-12-83-1-25 13-45 17-63 12Z" fill="#111315" />
            <path d="M176 86c22 5 34 18 35 40 1 20-10 34-31 41l-11-20 17-18-14-20 4-23Z" fill="#171b1e" />
            <path d="M89 115c23-3 47-10 72-22" stroke="#050607" strokeLinecap="round" strokeWidth="3" />
            <path d="M98 148c18 3 38-1 60-11" stroke="#070809" strokeLinecap="round" strokeWidth="3" />
            <path d="M88 131c9 2 18 2 27-1" stroke="#0d0f10" strokeLinecap="round" strokeWidth="2" />
            <path d="M124 39c20-11 46-10 70 1 14 7 24 17 31 31-40-12-80-9-120 8-16 7-30 7-43 0 11-18 32-31 62-40Z" fill="#4a4c4b" opacity="0.78" />
            <path d="M73 83c9-28 31-45 66-51" stroke="#d5d4cf" strokeLinecap="round" strokeWidth="3" opacity="0.34" />
          </svg>
        </div>
        <div className="relative z-10">
          <AriaDetailHeader onBack={onBack} />
          <div className="h-[256px]" />
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
            <button aria-label="More artist actions" className="grid h-12 w-12 place-items-center rounded-full bg-white/[0.06] text-[#fff3e4]" onClick={() => onOpenArtistOptions(artist)} type="button">
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
          <button className="text-[16px] text-[#f0a13d]" onClick={() => onOpenArtistTopSongs(artist)} type="button">See all</button>
        </div>
        <div className="mt-1">
          {ariaArtistTopSongs.map((track, index) => (
            <AriaTrackRow key={track.id} track={track} index={index} onOpen={onOpenTrack} onMore={onOpenTrackOptions} />
          ))}
        </div>
      </section>

      <section className="mt-5">
        <h2 className="font-serif text-[25px] text-[#fff3e4]">EPs & Singles</h2>
        <div className="mt-2 space-y-2">
          {ariaDiscography.map((item) => (
            <button className="flex w-full items-center gap-3 rounded-[17px] border border-white/[0.07] bg-white/[0.032] p-3 text-left" key={item.id} onClick={() => onOpenAlbum(discographyItemToAlbum(item, artist))} type="button">
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

function discographyItemToAlbum(item: AriaDiscographyItem, artist: AriaArtist): AriaAlbum {
  const year = Number(item.subtitle.match(/\d{4}/)?.[0]) || 2014
  const isEp = item.subtitle.includes('EP')

  return {
    id: `discography-${item.id}`,
    title: item.title,
    artist: artist.name,
    year,
    trackCount: isEp ? 5 : 10,
    duration: isEp ? '22m' : '48m',
    accent: item.accent,
    format: 'FLAC',
    source: 'Local',
  }
}
