import { MoreHorizontal, Play, Shuffle } from 'lucide-react'
import type { AriaAlbum, AriaTrack } from '../ariaMockData'
import { ariaAlbumTracks } from '../ariaMockData'
import { AriaDetailHeader } from './AriaDetailHeader'
import { AriaTrackRow } from './AriaTrackRow'

export function AriaAlbumDetail({
  album,
  onBack,
  onOpenAlbumOptions,
  onOpenArtistByName,
  onOpenTrack,
  onOpenTrackOptions,
  onShowToast,
}: {
  album: AriaAlbum
  onBack: () => void
  onOpenAlbumOptions: (album: AriaAlbum) => void
  onOpenArtistByName: (artistName: string) => void
  onOpenTrack: (track: AriaTrack) => void
  onOpenTrackOptions: (track: AriaTrack) => void
  onShowToast: (message: string) => void
}) {
  const albumTracks = ariaAlbumTracks.map((track) => ({
    ...track,
    album: album.title,
    artist: album.artist,
    year: album.year,
  }))

  return (
    <div className="min-h-full min-w-0 overflow-x-hidden px-4 pt-4 text-[#f5ecdf]">
      <AriaDetailHeader onBack={onBack} />

      <section className="mt-2 text-center">
        <div className="mx-auto w-[245px] rounded-[24px] bg-[radial-gradient(circle_at_50%_0%,rgba(240,161,61,0.18),transparent_58%)] p-2 shadow-[0_22px_50px_rgba(0,0,0,0.38)]">
          <div className="aria-art aria-art-square aria-art-architecture" />
        </div>
        <h1 className="mx-auto mt-5 max-w-[320px] font-serif text-[42px] leading-[0.94] text-[#fff3e4]">{album.title}</h1>
        <button className="mt-2 text-[16px] text-[#f0a13d]" onClick={() => onOpenArtistByName(album.artist)} type="button">
          {album.artist}
        </button>
        <p className="mx-auto mt-3 max-w-[310px] text-[13px] leading-relaxed text-[#b9b1a7]">
          Album <span className="px-2 text-[#f0a13d]">•</span> {album.year} <span className="px-2 text-[#f0a13d]">•</span> {album.trackCount} tracks <span className="px-2 text-[#f0a13d]">•</span> {album.duration}
        </p>
      </section>

      <div className="mt-5 flex items-center gap-2.5">
        <button className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#ffbd63] to-[#f09a35] text-[15px] font-bold text-[#1a1008] shadow-[0_12px_24px_rgba(240,161,61,0.23)]" onClick={() => onShowToast('Play album')} type="button">
          <Play size={17} fill="currentColor" /> Play
        </button>
        <button className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.045] text-[15px] font-semibold text-[#fff3e4]" onClick={() => onShowToast('Shuffle album')} type="button">
          <Shuffle size={17} /> Shuffle
        </button>
        <button aria-label="More album actions" className="grid h-11 w-11 place-items-center rounded-full border border-white/[0.08] bg-white/[0.04] text-[#f5ecdf]" onClick={() => onOpenAlbumOptions(album)} type="button">
          <MoreHorizontal size={21} />
        </button>
      </div>

      <section className="mt-5 overflow-hidden rounded-[20px] border border-white/[0.075] bg-white/[0.03] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        {albumTracks.map((track, index) => (
          <AriaTrackRow key={track.id} track={track} index={index} onOpen={onOpenTrack} onMore={onOpenTrackOptions} />
        ))}
      </section>

      <div className="h-8" />
    </div>
  )
}
