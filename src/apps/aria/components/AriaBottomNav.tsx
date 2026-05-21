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
      className="absolute bottom-3 left-3 right-3 z-30 h-14 rounded-[20px] border border-white/[0.075] bg-[rgba(7,12,17,0.78)] shadow-[0_10px_24px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.055)] backdrop-blur-xl"
    >
      <div className="grid h-full min-w-0 grid-cols-4 items-center">
        {tabs.map((tab) => {
          const selected = activeTab === tab.id
          return (
            <button
              aria-pressed={selected}
              className="flex min-w-0 flex-col items-center justify-center gap-[3px] py-1 text-[9px] leading-[1.12] transition focus:outline-none"
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              type="button"
            >
              <tab.Icon
                size={18}
                strokeWidth={selected ? 2 : 1.5}
                className={
                  selected
                    ? 'text-[#f0a13d] drop-shadow-[0_0_7px_rgba(240,161,61,0.18)]'
                    : 'text-[#9fa4a7]'
                }
              />
              <span
                className={
                  selected
                    ? 'truncate font-medium text-[#f0a13d]'
                    : 'truncate text-[#9fa4a7]'
                }
              >
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
