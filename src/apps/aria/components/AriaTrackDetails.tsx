import { useState } from 'react'
import { FolderOpen, Heart, ListPlus, Music2, Plus } from 'lucide-react'
import type { AriaTrack } from '../ariaMockData'
import { AriaDetailHeader } from './AriaDetailHeader'

const actions = [
  { id: 'favorite', label: 'Favorite', icon: Heart },
  { id: 'playlist', label: 'Add to playlist', icon: Plus },
  { id: 'queue', label: 'Add to queue', icon: ListPlus },
  { id: 'folder', label: 'Show in folder', icon: FolderOpen },
]

export function AriaTrackDetails({
  track,
  onBack,
  onAddTrackToQueue,
  onOpenAddTrackToPlaylist,
  onOpenTrackOptions,
  onShowToast,
}: {
  track: AriaTrack
  onBack: () => void
  onAddTrackToQueue: (track: AriaTrack) => void
  onOpenAddTrackToPlaylist: (track: AriaTrack) => void
  onOpenTrackOptions: (track: AriaTrack) => void
  onShowToast: (message: string) => void
}) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isQueued, setIsQueued] = useState(false)
  const metadata = [
    ['Album', track.album],
    ['Artist', track.artist],
    ['Duration', track.duration],
    ['Track', `${track.trackNumber ?? 3} of 13`],
    ['Genre', track.genre ?? 'Modern Classical'],
    ['Year', `${track.year ?? 2018}`],
    ['Codec', track.codec ?? 'FLAC'],
    ['Sample rate', track.sampleRate ?? '96 kHz'],
    ['Bit depth', track.bitDepth ?? '24-bit'],
    ['Source', track.source ?? 'Local mock library'],
  ]

  return (
    <div className="min-h-full min-w-0 overflow-x-hidden px-4 pt-4 text-[#f5ecdf]">
      <AriaDetailHeader onBack={onBack} onMore={() => onOpenTrackOptions(track)} />

      <section className="mt-5 rounded-[24px] border border-[rgba(240,161,61,0.14)] bg-[linear-gradient(145deg,rgba(58,36,18,0.34),rgba(255,255,255,0.03))] p-3.5 shadow-[0_18px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.05)]">
        <div className="flex items-center gap-4">
          <div className="aria-art aria-art-feature-sm aria-art-architecture shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#f0a13d]">Track details</p>
            <h1 className="mt-2 font-serif text-[30px] leading-[0.98] text-[#fff3e4]">{track.title}</h1>
            <p className="mt-2 truncate text-[15px] text-[#cfc4b8]">{track.artist}</p>
          </div>
        </div>
      </section>

      <section className="mt-5 rounded-[20px] border border-white/[0.075] bg-white/[0.032] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        {metadata.map(([label, value]) => (
          <div className="flex min-w-0 items-center gap-4 border-b border-white/[0.055] py-2.5 last:border-b-0" key={label}>
            <span className="w-[92px] shrink-0 text-[12px] text-[#8f8982]">{label}</span>
            <span className="min-w-0 flex-1 truncate text-right text-[13px] text-[#d9d0c7]">{value}</span>
          </div>
        ))}
      </section>

      <section className="mt-5">
        <h2 className="font-serif text-[25px] text-[#fff3e4]">Actions</h2>
        <div className="mt-2 grid grid-cols-2 gap-2.5">
          {actions.map((action) => {
            const Icon = action.icon
            const active = (action.id === 'favorite' && isFavorite) || (action.id === 'queue' && isQueued)
            const label = action.id === 'favorite' && isFavorite ? 'Favorited' : action.id === 'queue' && isQueued ? 'Queued' : action.label
            const handleClick = () => {
              if (action.id === 'favorite') {
                const next = !isFavorite
                setIsFavorite(next)
                onShowToast(next ? `Added ${track.title} to favorites (mock)` : `Removed ${track.title} from favorites (mock)`)
                return
              }

              if (action.id === 'playlist') {
                onOpenAddTrackToPlaylist(track)
                return
              }

              if (action.id === 'queue') {
                setIsQueued(true)
                onAddTrackToQueue(track)
                return
              }

              onShowToast(`Showing folder location preview for ${track.title} (mock - no file access)`)
            }

            return (
              <button className={`flex min-h-[72px] items-center gap-3 rounded-[17px] border p-3 text-left transition hover:bg-white/[0.055] ${active ? 'border-[#f0a13d]/40 bg-[#f0a13d]/12 text-[#fff3e4]' : 'border-white/[0.075] bg-white/[0.035] text-[#fff3e4]'}`} key={action.id} onClick={handleClick} type="button">
                <Icon className="shrink-0 text-[#f0a13d]" fill={action.id === 'favorite' && isFavorite ? 'currentColor' : 'none'} size={20} strokeWidth={1.7} />
                <span className="text-[14px] leading-tight">{label}</span>
              </button>
            )
          })}
        </div>
        <p className="mt-3 flex items-center gap-2 text-[12px] text-[#8f8982]">
          <Music2 size={14} /> Mock-only metadata and actions. No file access.
        </p>
      </section>

      <div className="h-8" />
    </div>
  )
}
