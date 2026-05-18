import { ChevronRight, Search } from 'lucide-react'
import { ariaAlbums, ariaLibraryCategories } from '../ariaMockData'

export function AriaLibrary() {
  return (
    <div className="min-h-full min-w-0 overflow-x-hidden px-5 pt-5 text-white">
      <h1 className="font-serif text-3xl tracking-[-0.04em]">Library</h1>

      {/* Search affordance */}
      <button
        className="mt-5 flex w-full min-w-0 items-center gap-3 rounded-[1.4rem] border border-white/[0.06] bg-white/[0.035] p-3.5 text-left transition hover:bg-white/[0.05]"
        type="button"
      >
        <Search className="shrink-0 text-slate-500" size={18} />
        <span className="min-w-0 truncate text-sm text-slate-500">Search your library…</span>
      </button>

      {/* Category tabs */}
      <div className="mt-5 flex gap-2 overflow-x-auto pb-1 anchor-scrollbar-none">
        {ariaLibraryCategories.map((cat, index) => (
          <button
            className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition ${
              index === 0
                ? 'bg-amber-300/15 text-amber-300 ring-1 ring-amber-300/30'
                : 'bg-white/[0.05] text-slate-400 hover:bg-white/[0.08] hover:text-slate-200'
            }`}
            key={cat.id}
            type="button"
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Albums list */}
      <section className="mt-5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-slate-300">Albums</h3>
          <button className="text-xs text-slate-500 transition hover:text-amber-300" type="button">
            See all
          </button>
        </div>
        <div className="mt-3 space-y-1">
          {ariaAlbums.map((album) => (
            <button
              className="flex w-full min-w-0 items-center gap-3 rounded-[1.1rem] px-2 py-2 text-left transition hover:bg-white/[0.04]"
              key={album.id}
              type="button"
            >
              <div
                className={`h-12 w-12 shrink-0 rounded-xl bg-gradient-to-br ${album.accent}`}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{album.title}</p>
                <p className="truncate text-xs text-slate-500">
                  {album.artist} · {album.year}
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-white/[0.06] px-2 py-0.5 text-[0.6rem] text-slate-400">
                {album.format} · {album.source}
              </span>
              <ChevronRight className="shrink-0 text-slate-600" size={16} />
            </button>
          ))}
        </div>
      </section>

      {/* Artists preview */}
      <section className="mt-6 pb-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-slate-300">Artists</h3>
          <button className="text-xs text-slate-500 transition hover:text-amber-300" type="button">
            See all
          </button>
        </div>
        <div className="mt-3 flex gap-3 overflow-x-auto pb-2 anchor-scrollbar-none">
          {[
            { name: 'Nils Frahm', accent: 'from-amber-100 via-amber-400 to-slate-900' },
            { name: 'Ólafur Arnalds', accent: 'from-sky-200 via-sky-500 to-slate-900' },
            { name: 'Cory', accent: 'from-rose-200 via-rose-400 to-slate-900' },
            { name: 'Asles', accent: 'from-violet-200 via-violet-500 to-slate-900' },
          ].map((artist) => (
            <article className="w-20 shrink-0 text-center" key={artist.name}>
              <div
                className={`mx-auto aspect-square w-full rounded-full bg-gradient-to-br ${artist.accent}`}
              />
              <p className="mt-2 truncate text-xs font-medium">{artist.name}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
