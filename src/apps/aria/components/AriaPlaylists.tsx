import { MoreHorizontal, Play } from 'lucide-react'
import { ariaPlaylists } from '../ariaMockData'

export function AriaPlaylists({ onShowToast }: { onShowToast: (message: string) => void }) {
  return (
    <div className="min-h-full min-w-0 overflow-x-hidden px-4 pt-4 text-[#f5ecdf]">
      <div className="mb-1">
        <h1 className="font-serif text-[30px] leading-[1.05] text-[#fff3e4]">Playlists</h1>
        <p className="mt-1 text-[10px] text-[#777d82]">{ariaPlaylists.length} collections · curated listening</p>
      </div>

      <section className="mt-5 space-y-3">
        {ariaPlaylists.map((playlist) => (
          <button
            className="flex w-full min-w-0 items-center gap-3 rounded-[16px] border border-white/[0.07] bg-white/[0.03] p-3 text-left transition hover:bg-white/[0.05]"
            key={playlist.id}
            onClick={() => onShowToast(`${playlist.title} (mock)`)}
            type="button"
          >
            <div className="aria-art h-14 w-14 shrink-0 rounded-xl" />
            <div className="min-w-0 flex-1">
              <h3 className="font-serif text-[16px] leading-[1.1] text-[#fff3e4]">{playlist.title}</h3>
              <p className="mt-0.5 text-[10px] leading-[1.3] text-[#b9b1a7]">{playlist.description}</p>
              <p className="mt-0.5 text-[10px] text-[#777d82]">{playlist.trackCount} tracks · {playlist.duration}</p>
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              <button
                className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-b from-[#ffb958] to-[#ea912c] text-[#190f07] shadow-[0_4px_10px_rgba(240,161,61,0.16)] transition active:scale-[0.98]"
                onClick={(e) => {
                  e.stopPropagation()
                  onShowToast(`Play ${playlist.title} (mock)`)
                }}
                type="button"
              >
                <Play size={12} fill="currentColor" />
              </button>
              <button
                className="grid h-8 w-8 place-items-center rounded-full border border-white/[0.08] bg-white/[0.04] text-[#b9b1a7] transition hover:bg-white/[0.07]"
                onClick={(e) => {
                  e.stopPropagation()
                  onShowToast('More options (mock)')
                }}
                type="button"
              >
                <MoreHorizontal size={14} />
              </button>
            </div>
          </button>
        ))}
      </section>

      <div className="h-6" />
    </div>
  )
}
