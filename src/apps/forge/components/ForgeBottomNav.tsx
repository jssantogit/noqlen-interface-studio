import { Clock3, Home, ListChecks, Music2 } from 'lucide-react'
import type { ForgeTab } from '../ForgePreview'

const tabs = [
  { id: 'home', label: 'Home', Icon: Home },
  { id: 'review', label: 'Review', Icon: ListChecks },
  { id: 'library', label: 'Library', Icon: Music2 },
  { id: 'activity', label: 'Activity', Icon: Clock3 },
] as const

export function ForgeBottomNav({
  activeTab,
  onTabChange,
}: {
  activeTab: ForgeTab
  onTabChange: (tab: ForgeTab) => void
}) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/[0.06] bg-[#090b0d]/92 px-5 pb-5 pt-2 backdrop-blur-xl">
      <div className="grid grid-cols-4 gap-1">
        {tabs.map((tab) => {
          const selected = activeTab === tab.id
          return (
            <button
              aria-pressed={selected}
              className={`flex flex-col items-center gap-1 rounded-2xl py-1.5 text-[11px] transition ${
                selected ? 'text-orange-300' : 'text-white/48 hover:text-white/80'
              }`}
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              type="button"
            >
              <tab.Icon size={20} strokeWidth={selected ? 2.4 : 1.8} />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
