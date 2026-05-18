import { Home, Library, ListMusic, Compass } from 'lucide-react'
import type { AriaTabId } from '../ariaInteractionMap'

const tabs = [
  { id: 'listen' as AriaTabId, label: 'Listen', Icon: Home },
  { id: 'library' as AriaTabId, label: 'Library', Icon: Library },
  { id: 'playlists' as AriaTabId, label: 'Playlists', Icon: ListMusic },
  { id: 'explore' as AriaTabId, label: 'Explore', Icon: Compass },
]

export function AriaBottomNav({
  activeTab,
  onTabChange,
}: {
  activeTab: AriaTabId
  onTabChange: (tab: AriaTabId) => void
}) {
  return (
    <nav
      aria-label="Aria navigation"
      className="absolute bottom-0 left-0 right-0 z-30 min-w-0 max-w-full border-t border-white/[0.06] bg-[#0c0e12]/92 px-3 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl"
    >
      <div className="grid min-w-0 grid-cols-4 gap-1">
        {tabs.map((tab) => {
          const selected = activeTab === tab.id
          return (
            <button
              aria-pressed={selected}
              className="relative flex min-w-0 flex-col items-center gap-0.5 rounded-2xl py-1.5 text-[0.64rem] transition focus:outline-none focus:ring-2 focus:ring-amber-300/35"
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              type="button"
            >
              <tab.Icon
                size={20}
                strokeWidth={selected ? 2.25 : 1.65}
                className={selected ? 'text-amber-300' : 'text-slate-500'}
              />
              <span
                className={
                  selected
                    ? 'truncate font-medium text-amber-300'
                    : 'truncate text-slate-500'
                }
              >
                {tab.label}
              </span>
              {selected && (
                <span className="absolute bottom-0.5 left-1/2 h-[2px] w-5 -translate-x-1/2 rounded-full bg-amber-300/80" />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
