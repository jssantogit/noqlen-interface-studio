import { Clock3, Folder, Home, Server } from 'lucide-react'
import type { AnchorTab } from '../AnchorPreview'

const tabs = [
  { id: 'home', label: 'Home', Icon: Home },
  { id: 'servers', label: 'Servers', Icon: Server },
  { id: 'library', label: 'Library', Icon: Folder },
  { id: 'activity', label: 'Activity', Icon: Clock3 },
] as const

export function AnchorBottomNav({
  activeTab,
  onTabChange,
}: {
  activeTab: AnchorTab
  onTabChange: (tab: AnchorTab) => void
}) {
  return (
    <nav
      aria-label="Anchor navigation"
      className="absolute bottom-0 left-0 right-0 z-20 min-w-0 max-w-full border-t border-white/[0.055] bg-[#071014]/92 px-3 pb-4 pt-2 backdrop-blur-xl"
    >
      <div className="grid min-w-0 grid-cols-4 gap-1">
        {tabs.map((tab) => {
          const selected = activeTab === tab.id
          return (
            <button
              aria-pressed={selected}
              className={`flex min-w-0 flex-col items-center gap-0.5 rounded-2xl py-1.5 text-[0.64rem] transition focus:outline-none focus:ring-2 focus:ring-amber-300/35 ${
                selected
                  ? 'text-amber-300'
                  : 'text-slate-300/72 hover:text-slate-100'
              }`}
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              type="button"
            >
              <tab.Icon size={18} strokeWidth={selected ? 2.5 : 1.85} />
              <span className="truncate">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
