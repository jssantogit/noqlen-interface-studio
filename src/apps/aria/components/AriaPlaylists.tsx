import { Play, Shuffle } from 'lucide-react'
import { ariaPlaylists } from '../ariaMockData'

export function AriaPlaylists() {
  return (
    <div className="min-h-full min-w-0 overflow-x-hidden px-5 pt-5 text-white">
      <h1 className="font-serif text-3xl tracking-[-0.04em]">Playlists</h1>

      <section className="mt-6 space-y-3">
        {ariaPlaylists.map((playlist) => (
          <article
            className="cursor-pointer overflow-hidden rounded-[1.5rem] border border-white/[0.07] bg-white/[0.03] transition hover:bg-white/[0.06]"
            key={playlist.id}
          >
            <div className={`h-36 w-full bg-gradient-to-br ${playlist.accent}`} />
            <div className="p-4">
              <h3 className="text-base font-semibold tracking-[-0.01em]">{playlist.title}</h3>
              <p className="mt-1 text-xs text-slate-400">{playlist.description}</p>
              <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                <span>{playlist.trackCount} tracks</span>
                <span>·</span>
                <span>{playlist.duration}</span>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  className="flex h-9 items-center gap-1.5 rounded-full bg-amber-300 px-4 text-xs font-semibold text-[#0c0e12] transition hover:bg-amber-200 active:scale-[0.98]"
                  type="button"
                >
                  <Play size={14} fill="currentColor" />
                  Play
                </button>
                <button
                  className="flex h-9 items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.05] px-4 text-xs font-medium text-slate-300 transition hover:bg-white/[0.08]"
                  type="button"
                >
                  <Shuffle size={14} />
                  Shuffle
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      <div className="pb-6 pt-4 text-center">
        <p className="text-xs text-slate-600">More playlists coming soon</p>
      </div>
    </div>
  )
}
