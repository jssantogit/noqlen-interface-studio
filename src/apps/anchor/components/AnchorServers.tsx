import {
  FileText,
  MoreVertical,
  Plus,
  Settings,
  Shield,
  Sparkles,
  Triangle,
  Zap,
} from 'lucide-react'
import { anchorServers } from '../anchorMockData'
import { AnchorCard, AnchorIconButton, AnchorScreenHeader } from './AnchorCard'

export function AnchorServers({
  navidromeVisible = true,
  onAddServer,
  onComingSoon,
  onOpenDetails,
  onOpenLogs,
  onOpenMenu,
  onOpenSettings,
  serverState = 'active',
}: {
  navidromeVisible?: boolean
  onAddServer: () => void
  onComingSoon: (server: 'Jellyfin' | 'Emby') => void
  onOpenDetails: () => void
  onOpenLogs: () => void
  onOpenMenu: () => void
  onOpenSettings: () => void
  serverState?: 'active' | 'stopped' | 'restarting' | 'disabled'
}) {
  const navidrome = anchorServers[0]
  const isDisabled = serverState === 'disabled'
  const statusBadge = isDisabled ? 'Disabled' : navidrome.badge
  const statusClass = isDisabled
    ? 'bg-slate-400/12 text-slate-300'
    : 'bg-emerald-400/14 text-emerald-300'
  const statusDotClass = isDisabled ? 'bg-slate-300' : 'bg-emerald-300'

  return (
    <div className="px-5 pt-5">
      <AnchorScreenHeader
        action={
          <AnchorIconButton label="Add server" onClick={onAddServer}>
            <Plus className="text-amber-300" size={24} />
          </AnchorIconButton>
        }
        subtitle="Manage your media servers."
        title="Servers"
      />

      {navidromeVisible ? (
        <AnchorCard className="overflow-hidden">
          <div className="flex items-start gap-3 p-4 transition hover:bg-white/[0.035]">
            <button
              className="flex min-w-0 flex-1 items-start gap-3 text-left focus:outline-none focus:ring-2 focus:ring-amber-300/25"
              onClick={onOpenDetails}
              type="button"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-300/12 text-amber-300 ring-1 ring-amber-300/18">
                <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-current font-serif text-base font-bold leading-none">
                  N
                </span>
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex min-w-0 items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h2 className="truncate text-base font-semibold text-white">
                      {navidrome.name}
                    </h2>
                    <p className="mt-1 truncate text-xs text-slate-300/76">
                      {navidrome.description}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[0.66rem] font-medium ${statusClass}`}
                  >
                    <span
                      className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${statusDotClass}`}
                    />
                    {statusBadge}
                  </span>
                </div>
              </div>
            </button>
            <button
              aria-label="Open server menu"
              className="-mr-1 grid h-8 w-8 shrink-0 place-items-center rounded-full text-slate-300/70 transition hover:bg-white/[0.07] hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-300/30"
              onClick={onOpenMenu}
              type="button"
            >
              <MoreVertical size={18} />
            </button>
          </div>
          <div className="border-t border-white/[0.055] px-4 py-4">
            <dl className="space-y-3 text-xs">
              {[
                ['Address', navidrome.address],
                ['Version', navidrome.version],
                ['Uptime', navidrome.uptime],
              ].map(([label, value]) => (
                <div className="grid grid-cols-[4.6rem_minmax(0,1fr)] gap-3" key={label}>
                  <dt className="text-slate-300/74">{label}</dt>
                  <dd className="truncate text-white">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <button
                className="flex h-10 items-center justify-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.035] text-xs font-medium text-white transition hover:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-amber-300/30"
                onClick={onOpenSettings}
                type="button"
              >
                <Settings size={15} />
                Settings
              </button>
              <button
                className="flex h-10 items-center justify-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.035] text-xs font-medium text-white transition hover:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-amber-300/30"
                onClick={onOpenLogs}
                type="button"
              >
                <FileText size={15} />
                View logs
              </button>
            </div>
          </div>
        </AnchorCard>
      ) : (
        <AnchorCard className="p-5 text-center">
          <p className="font-serif text-xl tracking-[-0.04em] text-white">No active servers</p>
          <p className="mt-2 text-xs leading-5 text-slate-300/78">
            Navidrome was removed from this local preview. Refresh the Studio to restore the baseline mock data.
          </p>
        </AnchorCard>
      )}

      <div className="mt-3.5 space-y-3">
        {anchorServers.slice(1).map((server, index) => {
          const Icon = index === 0 ? Triangle : Sparkles
          const iconClass = index === 0 ? 'text-violet-300' : 'text-emerald-300'
          return (
            <AnchorCard className="p-4" key={server.id}>
              <button
                className="flex w-full items-center gap-3 text-left focus:outline-none focus:ring-2 focus:ring-amber-300/30"
                onClick={() => onComingSoon(server.name as 'Jellyfin' | 'Emby')}
                type="button"
              >
                <span
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[0.045] ${iconClass}`}
                >
                  <Icon size={26} strokeWidth={2.4} />
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-base font-semibold text-white">{server.name}</h2>
                  <p className="mt-1 truncate text-xs text-slate-300/76">
                    {server.description}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-white/[0.07] px-2.5 py-1 text-[0.66rem] text-slate-200">
                  {server.badge}
                </span>
                <MoreVertical className="shrink-0 text-slate-300/70" size={18} />
              </button>
            </AnchorCard>
          )
        })}
      </div>

      <AnchorCard className="mt-12 p-4">
        <div className="flex gap-3">
          <Shield className="mt-0.5 shrink-0 text-slate-200" size={23} />
          <p className="text-xs leading-5 text-slate-300/80">
            All servers run locally on your network.
            <br />
            No data leaves your device.
          </p>
        </div>
      </AnchorCard>
      <Zap className="sr-only" />
    </div>
  )
}
