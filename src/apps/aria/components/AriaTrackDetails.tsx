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
  onShowToast,
}: {
  track: AriaTrack
  onBack: () => void
  onShowToast: (message: string) => void
}) {
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
      <AriaDetailHeader label="Track" onBack={onBack} onMore={() => onShowToast('Track options (mock)')} />

      <section className="mt-5 rounded-[24px] border border-[rgba(240,161,61,0.14)] bg-[linear-gradient(145deg,rgba(58,36,18,0.36),rgba(255,255,255,0.03))] p-4 shadow-[0_18px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.05)]">
        <div className="flex items-center gap-4">
          <div className="aria-art aria-art-feature-sm aria-art-architecture shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#f0a13d]">Track details</p>
            <h1 className="mt-2 font-serif text-[30px] leading-[0.98] text-[#fff3e4]">{track.title}</h1>
            <p className="mt-2 truncate text-[15px] text-[#cfc4b8]">{track.artist}</p>
          </div>
        </div>
        <div className="mt-5 h-1.5 rounded-full bg-white/[0.08]">
          <div className="h-full w-[42%] rounded-full bg-gradient-to-r from-[#f09a35] to-[#ffbd63]" />
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
            return (
              <button className="flex min-h-[72px] items-center gap-3 rounded-[17px] border border-white/[0.075] bg-white/[0.035] p-3 text-left text-[#fff3e4] transition hover:bg-white/[0.055]" key={action.id} onClick={() => onShowToast(`${action.label} (mock)`)} type="button">
                <Icon className="shrink-0 text-[#f0a13d]" size={20} strokeWidth={1.7} />
                <span className="text-[14px] leading-tight">{action.label}</span>
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
