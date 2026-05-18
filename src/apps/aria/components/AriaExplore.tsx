import { ChevronRight, Search } from 'lucide-react'
import { useState } from 'react'
import { ariaRecentSearches, ariaSearchResults } from '../ariaMockData'

const filterChips = ['All', 'Tracks', 'Albums', 'Artists', 'Playlists', 'Folders']

export function AriaExplore() {
  const [query, setQuery] = useState('')
  const [activeChip, setActiveChip] = useState('All')

  const results = query.trim()
    ? ariaSearchResults.filter((r) =>
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.subtitle.toLowerCase().includes(query.toLowerCase())
      )
    : ariaSearchResults

  return (
    <div className="min-h-full min-w-0 overflow-x-hidden px-5 pt-5 text-white">
      <h1 className="font-serif text-3xl tracking-[-0.04em]">Search</h1>
      <p className="mt-1 text-sm text-slate-500">Find music in your library.</p>

      {/* Search input */}
      <div className="mt-5 flex items-center gap-3 rounded-[1.4rem] border border-white/[0.07] bg-white/[0.04] px-4 py-3 focus-within:border-amber-300/30 focus-within:ring-1 focus-within:ring-amber-300/20">
        <Search className="shrink-0 text-slate-500" size={18} />
        <input
          className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tracks, albums, artists…"
          type="text"
          value={query}
        />
      </div>

      {/* Filter chips */}
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1 anchor-scrollbar-none">
        {filterChips.map((chip) => (
          <button
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
              activeChip === chip
                ? 'bg-amber-300/15 text-amber-300 ring-1 ring-amber-300/30'
                : 'bg-white/[0.05] text-slate-400 hover:bg-white/[0.08] hover:text-slate-200'
            }`}
            key={chip}
            onClick={() => setActiveChip(chip)}
            type="button"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Recent searches */}
      {!query && (
        <section className="mt-5">
          <h3 className="text-sm font-medium text-slate-400">Recent</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {ariaRecentSearches.map((term) => (
              <button
                className="rounded-full bg-white/[0.05] px-3 py-1.5 text-xs text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
                key={term}
                onClick={() => setQuery(term)}
                type="button"
              >
                {term}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Results */}
      <section className="mt-5 pb-6">
        <h3 className="text-sm font-medium text-slate-400">
          {query ? 'Results' : 'Browse'}
        </h3>
        <div className="mt-3 space-y-1">
          {results.map((item) => (
            <button
              className="flex w-full min-w-0 items-center gap-3 rounded-[1.1rem] px-2 py-2.5 text-left transition hover:bg-white/[0.04]"
              key={item.id}
              type="button"
            >
              <div
                className={`h-11 w-11 shrink-0 rounded-xl bg-gradient-to-br ${item.accent}`}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{item.title}</p>
                <p className="truncate text-xs text-slate-500">{item.subtitle}</p>
              </div>
              {item.format && (
                <span className="shrink-0 rounded-full bg-white/[0.06] px-2 py-0.5 text-[0.6rem] text-slate-400">
                  {item.format} · {item.source}
                </span>
              )}
              <ChevronRight className="shrink-0 text-slate-600" size={16} />
            </button>
          ))}
        </div>
        {results.length === 0 && (
          <p className="mt-4 text-center text-sm text-slate-500">No results found</p>
        )}
      </section>
    </div>
  )
}
