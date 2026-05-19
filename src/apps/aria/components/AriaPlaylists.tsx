import { Play, Shuffle } from 'lucide-react'
import { ariaPlaylists } from '../ariaMockData'

export function AriaPlaylists({ onShowToast }: { onShowToast: (message: string) => void }) {
  return (
    <div className="min-h-full min-w-0 overflow-x-hidden px-4 pt-4 text-[#f5ecdf]">
      <h1 className="font-serif text-[30px] leading-[1.05] text-[#fff3e4]">Playlists</h1>

      <section className="mt-5 space-y-4">
        {ariaPlaylists.map((playlist) => (
          <article
            className="cursor-pointer overflow-hidden rounded-[18px] border border-white/[0.07] bg-white/[0.03] transition hover:bg-white/[0.05]"
            key={playlist.id}
            onClick={() => onShowToast(`${playlist.title} (mock)`)}
          >
            <div className="aria-art aria-art-blue h-[150px] w-full rounded-t-[16px]" />
            <div className="p-3.5">
              <h3 className="font-serif text-[22px] leading-[1.05] text-[#fff3e4]">{playlist.title}</h3>
              <p className="mt-1 text-[10px] leading-[1.3] text-[#b9b1a7]">{playlist.description}</p>
              <div className="mt-2 flex items-center gap-2 text-[10px] text-[#777d82]">
                <span>{playlist.trackCount} tracks</span>
                <span>·</span>
                <span>{playlist.duration}</span>
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  className="flex h-[33px] items-center gap-1.5 rounded-full bg-gradient-to-b from-[#ffb958] to-[#ea912c] px-4 text-xs font-bold text-[#190f07] shadow-[0_8px_16px_rgba(240,161,61,0.16)] transition active:scale-[0.98]"
                  onClick={(e) => {
                    e.stopPropagation()
                    onShowToast(`Play ${playlist.title} (mock)`)
                  }}
                  type="button"
                >
                  <Play size={12} fill="currentColor" />
                  Play
                </button>
                <button
                  className="flex h-[33px] items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 text-xs font-medium text-[#f5ecdf] transition hover:bg-white/[0.07]"
                  onClick={(e) => {
                    e.stopPropagation()
                    onShowToast(`Shuffle ${playlist.title} (mock)`)
                  }}
                  type="button"
                >
                  <Shuffle size={12} />
                  Shuffle
                </button>
                <button
                  className="grid h-[33px] w-[33px] place-items-center rounded-full border border-white/[0.08] bg-white/[0.04] text-[#b9b1a7] transition hover:bg-white/[0.07]"
                  onClick={(e) => {
                    e.stopPropagation()
                    onShowToast('More options (mock)')
                  }}
                  type="button"
                >
                  <span className="text-xs">•••</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      <div className="pb-6 pt-4 text-center">
        <p className="text-[10px] text-[#777d82]">More playlists coming soon</p>
      </div>
    </div>
  )
}
