import { ChevronRight, Search } from 'lucide-react'
import {
  ariaFeaturedPlaylists,
  ariaQuickResume,
  ariaRecentListens,
  nowPlaying,
} from '../ariaMockData'

export function AriaListenHome({
  onPlay,
  onNavigateToExplore,
}: {
  onPlay: () => void
  onNavigateToExplore: () => void
}) {
  return (
    <div className="min-h-full min-w-0 overflow-x-hidden px-5 pt-5 text-white">
      {/* Header */}
      <p className="text-xs uppercase tracking-[0.28em] text-amber-100/55">
        Listening space
      </p>
      <h1 className="mt-2 font-serif text-4xl tracking-[-0.05em]">Aria</h1>

      {/* Now Playing Card */}
      <section className="mt-6 rounded-[1.8rem] border border-white/[0.08] bg-gradient-to-br from-amber-100/[0.08] via-orange-200/[0.04] to-transparent p-4">
        <div className={`aspect-square rounded-[1.4rem] bg-gradient-to-br ${nowPlaying.accent} shadow-[0_0.5rem_1.5rem_rgba(0,0,0,0.3)]`} />
        <div className="mt-4 flex min-w-0 items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold tracking-[-0.02em]">
              {nowPlaying.title}
            </p>
            <p className="truncate text-sm text-slate-400">
              {nowPlaying.artist} · {nowPlaying.album}
            </p>
          </div>
          <span className="shrink-0 text-xs text-slate-500">{nowPlaying.duration}</span>
        </div>
        <button
          className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-amber-300 text-sm font-semibold text-[#0c0e12] shadow-[0_0.5rem_1rem_rgba(212,168,83,0.22)] transition hover:bg-amber-200 active:scale-[0.99]"
          onClick={onPlay}
          type="button"
        >
          Play
        </button>
      </section>

      {/* Recent Listens Shelf */}
      <section className="mt-5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-slate-300">Recent listens</h3>
          <button className="text-xs text-slate-500 transition hover:text-amber-300" type="button">
            See all
          </button>
        </div>
        <div className="mt-3 flex gap-3 overflow-x-auto pb-2 anchor-scrollbar-none">
          {ariaRecentListens.map((item) => (
            <article
              className="w-36 shrink-0 cursor-pointer"
              key={item.id}
            >
              <div
                className={`aspect-square rounded-[1.2rem] bg-gradient-to-br ${item.accent} shadow-[0_0.4rem_1rem_rgba(0,0,0,0.25)]`}
              />
              <p className="mt-2 truncate text-sm font-medium">{item.title}</p>
              <p className="truncate text-xs text-slate-500">{item.subtitle}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Quick Resume */}
      <section className="mt-4">
        <h3 className="text-sm font-medium text-slate-300">Quick resume</h3>
        <div className="mt-3 space-y-2">
          {ariaQuickResume.map((item) => (
            <button
              className="flex w-full min-w-0 items-center gap-3 rounded-[1.2rem] border border-white/[0.06] bg-white/[0.03] p-3 text-left transition hover:bg-white/[0.06]"
              key={item.id}
              type="button"
            >
              <div
                className={`h-12 w-12 shrink-0 rounded-xl bg-gradient-to-br ${item.accent}`}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{item.title}</p>
                <p className="truncate text-xs text-slate-500">{item.subtitle}</p>
              </div>
              <ChevronRight className="shrink-0 text-slate-600" size={16} />
            </button>
          ))}
        </div>
      </section>

      {/* Featured Playlists */}
      <section className="mt-5 pb-4">
        <h3 className="text-sm font-medium text-slate-300">Featured</h3>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {ariaFeaturedPlaylists.map((item) => (
            <article
              className="cursor-pointer rounded-[1.4rem] border border-white/[0.06] bg-white/[0.03] p-3.5 transition hover:bg-white/[0.06]"
              key={item.id}
            >
              <div
                className={`aspect-square rounded-[1rem] bg-gradient-to-br ${item.accent}`}
              />
              <p className="mt-2.5 truncate text-sm font-medium">{item.title}</p>
              <p className="truncate text-xs text-slate-500">{item.subtitle}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Search affordance */}
      <button
        className="mb-6 mt-2 flex w-full min-w-0 items-center gap-3 rounded-[1.4rem] border border-white/[0.06] bg-white/[0.035] p-3.5 text-left transition hover:bg-white/[0.05]"
        onClick={onNavigateToExplore}
        type="button"
      >
        <Search className="shrink-0 text-slate-500" size={18} />
        <span className="min-w-0 truncate text-sm text-slate-500">Search tracks, albums, artists…</span>
      </button>
    </div>
  )
}
