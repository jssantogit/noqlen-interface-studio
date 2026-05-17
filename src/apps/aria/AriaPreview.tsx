import { Library, ListMusic, Music2, Pause, PlayCircle, Search, SkipBack, SkipForward } from 'lucide-react'
import { ariaQueue, ariaShelves, nowPlaying } from './ariaMockData'

export function AriaPreview() {
  return (
    <div className="min-h-full min-w-0 overflow-x-hidden bg-[radial-gradient(circle_at_50%_0%,rgba(245,158,11,0.18),transparent_17rem),linear-gradient(180deg,#111318_0%,#080b10_100%)] px-5 py-5 text-white">
      <p className="text-xs uppercase tracking-[0.28em] text-amber-100/55">
        Listening space
      </p>
      <h2 className="mt-2 font-serif text-4xl tracking-[-0.05em]">Aria</h2>

      <section className="mt-7 rounded-[2rem] border border-white/10 bg-gradient-to-br from-amber-100/20 via-orange-200/10 to-slate-950 p-4">
        <div className={`aspect-square rounded-[1.55rem] border border-white/10 bg-gradient-to-br ${nowPlaying.accent}`}>
          <div className="h-full rounded-[inherit] bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,0.38),transparent_7rem),radial-gradient(circle_at_82%_78%,rgba(0,0,0,0.48),transparent_8rem)]" />
        </div>
        <div className="mt-4 flex min-w-0 items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold tracking-[-0.02em]">
              {nowPlaying.title}
            </p>
            <p className="truncate text-sm text-slate-300">{nowPlaying.artist} · {nowPlaying.album}</p>
          </div>
          <span className="shrink-0 text-xs text-slate-300">{nowPlaying.duration}</span>
        </div>
        <div className="mt-4 flex items-center justify-center gap-4 text-slate-200">
          <button aria-label="Previous mock track" className="rounded-full bg-white/[0.07] p-2" type="button"><SkipBack size={17} /></button>
          <button aria-label="Pause mock track" className="rounded-full bg-white px-4 py-3 text-slate-950" type="button"><Pause size={20} /></button>
          <button aria-label="Next mock track" className="rounded-full bg-white/[0.07] p-2" type="button"><SkipForward size={17} /></button>
        </div>
      </section>

      <div className="mt-4 grid min-w-0 grid-cols-2 gap-3">
        {ariaShelves.map((shelf, index) => {
          const Icon = index === 0 ? Library : Music2
          return (
          <article
            className="min-w-0 rounded-[1.5rem] border border-white/10 bg-black/24 p-4"
            key={shelf.id}
          >
            <Icon className="text-amber-100" size={22} />
            <div className={`mt-5 h-12 rounded-2xl bg-gradient-to-br ${shelf.accent}`} />
            <p className="mt-3 truncate text-lg font-medium">{shelf.title}</p>
            <p className="mt-1 truncate text-xs text-slate-400">{shelf.subtitle}</p>
          </article>
          )
        })}
      </div>

      <section className="mt-4 flex min-w-0 items-center gap-3 rounded-[1.4rem] border border-white/10 bg-white/[0.045] p-4">
        <Search className="shrink-0 text-slate-400" size={18} />
        <span className="min-w-0 truncate text-sm text-slate-400">Search remains visual only</span>
      </section>

      <section className="mt-4 rounded-[1.5rem] border border-white/10 bg-black/24 p-3">
        <p className="px-1 text-sm font-medium text-slate-200">Up next</p>
        <div className="mt-2 space-y-1">
          {ariaQueue.map((track) => (
            <div className="flex min-w-0 items-center gap-3 rounded-2xl px-1 py-2" key={track.id}>
              <div className={`h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br ${track.accent}`} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{track.title}</p>
                <p className="truncate text-xs text-slate-500">{track.artist}</p>
              </div>
              <span className="shrink-0 text-xs text-slate-500">{track.duration}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-5 flex min-w-0 items-center justify-between gap-2 overflow-hidden rounded-full border border-white/10 bg-black/30 px-4 py-3 text-[0.68rem] text-slate-400">
        {['Now Playing', 'Library', 'Playlists', 'Queue'].map((item, index) => (
          <span className={index === 0 ? 'truncate text-amber-100' : 'truncate'} key={item}>
            {item}
          </span>
        ))}
      </div>
      <PlayCircle className="sr-only" />
      <ListMusic className="sr-only" />
    </div>
  )
}
