import type { StudioApp, StudioAppId } from '../../apps/apps'
import { cn } from '../../lib/cn'

type AppSwitcherProps = {
  apps: StudioApp[]
  selectedAppId: StudioAppId
  onSelectApp: (appId: StudioAppId) => void
}

export function AppSwitcher({
  apps,
  selectedAppId,
  onSelectApp,
}: AppSwitcherProps) {
  return (
    <nav
      aria-label="Select app preview"
      className="rounded-[1.5rem] border border-white/10 bg-black/20 p-2 backdrop-blur-xl"
    >
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-1">
        {apps.map((app) => {
          const isSelected = app.id === selectedAppId

          return (
            <button
              aria-pressed={isSelected}
              className={cn(
                'rounded-2xl border px-3 py-3 text-left transition',
                'focus:outline-none focus:ring-2 focus:ring-amber-200/40',
                isSelected
                  ? 'border-amber-200/35 bg-amber-200/10 text-white shadow-lg shadow-amber-950/20'
                  : 'border-transparent bg-white/[0.035] text-slate-300 hover:border-white/10 hover:bg-white/[0.06]',
              )}
              key={app.id}
              onClick={() => onSelectApp(app.id)}
              type="button"
            >
              <span className="block text-sm font-semibold">{app.name}</span>
              <span className="mt-1 block text-xs leading-4 text-slate-400">
                {app.mood}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
