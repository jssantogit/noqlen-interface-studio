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
      aria-label="Select app"
      className="min-w-0 max-w-full overflow-hidden rounded-[1.35rem] border border-white/10 bg-black/20 p-1.5 backdrop-blur-xl sm:rounded-[1.5rem] sm:p-2"
    >
      <div className="grid min-w-0 grid-cols-[repeat(2,minmax(0,1fr))] gap-1.5 sm:grid-cols-[repeat(4,minmax(0,1fr))] sm:gap-2 lg:grid-cols-1">
        {apps.map((app) => {
          const isSelected = app.id === selectedAppId

          return (
            <button
              aria-pressed={isSelected}
              className={cn(
                'min-h-12 min-w-0 rounded-2xl border px-3 py-2.5 text-left transition sm:py-3',
                'focus:outline-none focus:ring-2 focus:ring-amber-200/40',
                isSelected
                  ? 'border-amber-200/35 bg-amber-200/10 text-white shadow-lg shadow-amber-950/20'
                  : 'border-transparent bg-white/[0.035] text-slate-300 hover:border-white/10 hover:bg-white/[0.06]',
              )}
              key={app.id}
              onClick={() => onSelectApp(app.id)}
              type="button"
            >
              <span className="block text-sm font-semibold leading-5">
                {app.name}
              </span>
              <span className="mt-0.5 block break-words text-xs leading-4 text-slate-400 sm:mt-1">
                {app.mood}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
