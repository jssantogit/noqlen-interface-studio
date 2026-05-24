import { MoreHorizontal, Play, Shuffle } from 'lucide-react'
import type { AriaPlaylist, AriaTrack } from '../ariaMockData'
import { ariaPlaylistTracks } from '../ariaMockData'
import { AriaDetailHeader } from './AriaDetailHeader'
import { AriaTrackRow } from './AriaTrackRow'

const art = ['aria-art-waves', 'aria-art-mountain', 'aria-art-violet', 'aria-art-mist']

export function AriaPlaylistDetail({
  playlist,
  onBack,
  onOpenPlaylistOptions,
  onOpenTrack,
  onOpenTrackOptions,
  onShowToast,
}: {
  playlist: AriaPlaylist
  onBack: () => void
  onOpenPlaylistOptions: (playlist: AriaPlaylist) => void
  onOpenTrack: (track: AriaTrack) => void
  onOpenTrackOptions: (track: AriaTrack) => void
  onShowToast: (message: string) => void
}) {
  return (
    <div className="min-h-full min-w-0 overflow-x-hidden px-4 pt-4 text-[#f5ecdf]">
      <AriaDetailHeader onBack={onBack} />

      <section className="mt-2 overflow-hidden rounded-[26px] border border-white/[0.08] bg-white/[0.035] shadow-[0_22px_48px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.05)]">
        <div className="aria-art aria-art-hero aria-art-waves" />
        <div className="p-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#f0a13d]">{playlist.trackCount} tracks</p>
          <h1 className="mt-2 font-serif text-[42px] leading-[0.94] text-[#fff3e4]">{playlist.title}</h1>
          <p className="mt-3 max-w-[300px] text-[14px] leading-relaxed text-[#c9beb1]">{playlist.description}</p>
          <p className="mt-2 text-[13px] text-[#8f8982]">{playlist.duration} <span className="px-2 text-[#f0a13d]">•</span> Local playlist</p>
        </div>
      </section>

      <div className="mt-4 flex items-center gap-2.5">
        <button className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#ffbd63] to-[#f09a35] text-[15px] font-bold text-[#1a1008] shadow-[0_12px_24px_rgba(240,161,61,0.23)]" onClick={() => onShowToast('Play playlist')} type="button">
          <Play size={17} fill="currentColor" /> Play
        </button>
        <button className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.045] text-[15px] font-semibold text-[#fff3e4]" onClick={() => onShowToast('Shuffle playlist')} type="button">
          <Shuffle size={17} /> Shuffle
        </button>
        <button aria-label="More playlist actions" className="grid h-11 w-11 place-items-center rounded-full border border-white/[0.08] bg-white/[0.04] text-[#f5ecdf]" onClick={() => onOpenPlaylistOptions(playlist)} type="button">
          <MoreHorizontal size={21} />
        </button>
      </div>

      <section className="mt-5 overflow-hidden rounded-[20px] border border-white/[0.075] bg-white/[0.03] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        {ariaPlaylistTracks.map((track, index) => (
          <AriaTrackRow key={track.id} track={track} index={index} artClass={art[index % art.length]} showArtwork onOpen={onOpenTrack} onMore={onOpenTrackOptions} />
        ))}
      </section>

      <div className="h-8" />
    </div>
  )
}
