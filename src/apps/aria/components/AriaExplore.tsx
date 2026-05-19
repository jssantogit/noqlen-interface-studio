import { ChevronRight, Search } from 'lucide-react'
import { useState } from 'react'
import { ariaSearchResults } from '../ariaMockData'

const filterChips = ['All', 'Tracks', 'Albums', 'Artists', 'Playlists']

export function AriaExplore({ onShowToast }: { onShowToast: (message: string) => void }) {
  const [query, setQuery] = useState('')
  const [activeChip, setActiveChip] = useState('All')

  const results = query.trim()
    ? ariaSearchResults.filter((r) =>
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.subtitle.toLowerCase().includes(query.toLowerCase())
      )
    : ariaSearchResults

  return (
    <div className="min-h-full min-w-0 overflow-x-hidden px-4 pt-4 text-[#f5ecdf]">
      <h1 className="font-serif text-[22px] leading-[1.05] text-[#fff3e4]">Search</h1>
      <p className="mt-1 text-[10px] text-[#777d82]">Find music in your library.</p>

      {/* Search input */}
      <div className="mt-4 flex h-9 items-center gap-2 rounded-xl border border-white/[0.075] bg-white/[0.035] px-3 text-[11px] shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] focus-within:border-[rgba(240,161,61,0.3)] focus-within:ring-1 focus-within:ring-[rgba(240,161,61,0.2)]">
        <Search size={14} className="shrink-0 text-[#b9b1a7]" />
        <input
          className="min-w-0 flex-1 bg-transparent text-[11px] text-[#f5ecdf] outline-none placeholder:text-[#777d82]"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tracks, albums, artists…"
          type="text"
          value={query}
        />
      </div>

      {/* Filter chips */}
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1 anchor-scrollbar-none">
        {filterChips.map((chip) => (
          <button
            className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-medium transition ${
              activeChip === chip
                ? 'border border-[rgba(240,161,61,0.5)] bg-[rgba(240,161,61,0.08)] text-[#f0a13d]'
                : 'border border-white/[0.075] bg-white/[0.035] text-[#b9b1a7] hover:bg-white/[0.05]'
            }`}
            key={chip}
            onClick={() => {
              setActiveChip(chip)
              onShowToast(`Filter: ${chip} (mock)`)
            }}
            type="button"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Results */}
      <section className="mt-4">
        <div className="flex items-center justify-between py-1 text-xs">
          <strong className="text-[#f0a13d]">{query ? 'Results' : 'Browse'}</strong>
        </div>
        <div className="space-y-0">
          {results.map((item) => (
            <button
              className="flex w-full min-w-0 items-center gap-2 border-b border-white/[0.045] py-2.5 text-left transition hover:bg-white/[0.02]"
              key={item.id}
              onClick={() => onShowToast(`${item.title} (mock)`)}
              type="button"
            >
              <div className="aria-art aria-art-micro shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold text-[#f5ecdf]">{item.title}</p>
                <p className="text-[10px] leading-[1.3] text-[#b9b1a7]">{item.subtitle}</p>
              </div>
              {item.format && (
                <span className="shrink-0 rounded-full border border-white/[0.075] bg-white/[0.035] px-2 py-0.5 text-[9px] text-[#bbb2a7]">
                  {item.format} · {item.source}
                </span>
              )}
              <ChevronRight className="shrink-0 text-[#777d82]" size={14} />
            </button>
          ))}
        </div>
        {results.length === 0 && (
          <p className="mt-4 text-center text-[11px] text-[#777d82]">No results found</p>
        )}
      </section>

      <div className="h-4" />
    </div>
  )
}
