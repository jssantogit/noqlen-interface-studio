import { Check, ChevronLeft, Server, ShieldCheck, Zap } from 'lucide-react'
import type { AnchorSetupServerType } from '../../anchorSetupState'

export function AnchorSetupServer({
  serverType,
  serverAddress,
  serverPort,
  serverDataFolder,
  availabilityStatus,
  onSelectType,
  onCheckAvailability,
  onContinue,
  onBack,
}: {
  serverType: AnchorSetupServerType
  serverAddress: string
  serverPort: number
  serverDataFolder: string
  availabilityStatus: 'idle' | 'checking' | 'available' | 'warning'
  onSelectType: (type: AnchorSetupServerType) => void
  onCheckAvailability: () => void
  onContinue: () => void
  onBack: () => void
}) {
  const servers: { id: AnchorSetupServerType; label: string; description: string; soon: boolean }[] = [
    { id: 'navidrome', label: 'Navidrome', description: 'Local music server', soon: false },
    { id: 'jellyfin', label: 'Jellyfin', description: 'Media server', soon: true },
    { id: 'emby', label: 'Emby', description: 'Media server', soon: true },
  ]

  return (
    <div className="flex min-h-0 flex-1 flex-col px-4 pt-5 sm:px-5">
      <header className="mb-4">
        <h1 className="break-words font-serif text-[clamp(1.6rem,12vw,1.9rem)] leading-none tracking-[-0.055em] text-white">
          Server
        </h1>
        <p className="mt-2 text-[0.82rem] leading-4 text-slate-300/82">
          Set up your local media server.
        </p>
      </header>

      <div className="space-y-2">
        {servers.map((srv) => {
          const isSelected = serverType === srv.id
          return (
            <button
              aria-pressed={isSelected}
              className={`flex w-full min-w-0 items-center gap-3 rounded-2xl border p-3.5 text-left transition focus:outline-none focus:ring-2 focus:ring-amber-300/30 ${
                isSelected
                  ? 'border-amber-300/35 bg-amber-300/[0.065]'
                  : 'border-white/[0.065] bg-white/[0.04] hover:bg-white/[0.06]'
              }`}
              disabled={srv.soon}
              key={srv.id}
              onClick={() => onSelectType(srv.id)}
              type="button"
            >
              <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${
                isSelected ? 'bg-amber-300/16 text-amber-300' : 'bg-white/[0.06] text-slate-300'
              }`}>
                <Server size={20} />
              </span>
              <div className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-white">{srv.label}</span>
                <span className="block text-xs text-slate-300/72">{srv.description}</span>
                {srv.soon ? (
                  <span className="mt-0.5 block text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-slate-400/72">
                    Coming soon
                  </span>
                ) : null}
              </div>
              {isSelected ? (
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-amber-300 text-[#211508]">
                  <Check size={11} strokeWidth={2.8} />
                </span>
              ) : null}
            </button>
          )
        })}
      </div>

      {serverType === 'navidrome' ? (
        <div className="mt-4 rounded-2xl border border-white/[0.065] bg-white/[0.04] p-3.5">
          <h3 className="text-sm font-semibold text-white">Navidrome</h3>
          <dl className="mt-3 space-y-2.5 text-sm">
            {[
              ['Local address', `${serverAddress}:${serverPort}`],
              ['Port', String(serverPort)],
              ['Data folder', serverDataFolder],
            ].map(([label, value]) => (
              <div className="grid min-w-0 grid-cols-1 gap-1 rounded-xl border border-white/[0.045] bg-black/10 px-3 py-2" key={label}>
                <dt className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-slate-400/82">{label}</dt>
                <dd className="min-w-0 break-words text-[0.82rem] font-medium leading-5 text-white [overflow-wrap:anywhere]">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-3 flex items-center gap-2">
            {availabilityStatus === 'available' ? (
              <span className="rounded-full bg-emerald-300/16 px-2 py-1 text-xs font-semibold text-emerald-300">
                <ShieldCheck className="mr-1 inline" size={12} /> Mock check passed
              </span>
            ) : availabilityStatus === 'warning' ? (
              <span className="rounded-full bg-orange-300/16 px-2 py-1 text-xs font-semibold text-orange-300">
                Mock check warning
              </span>
            ) : availabilityStatus === 'checking' ? (
              <span className="rounded-full bg-amber-300/16 px-2 py-1 text-xs font-semibold text-amber-300">
                <Zap className="mr-1 inline" size={12} /> Checking...
              </span>
            ) : null}
          </div>

          <button
            className="mt-3 flex h-9 w-full items-center justify-center gap-1.5 rounded-lg border border-white/[0.065] bg-white/[0.045] text-xs font-medium text-white transition hover:bg-white/[0.075] focus:outline-none focus:ring-2 focus:ring-amber-300/30"
            onClick={onCheckAvailability}
            type="button"
          >
            <Zap size={13} />
            Check mock availability
          </button>
        </div>
      ) : null}

      <div className="mt-auto space-y-2.5 pb-6 pt-6">
        <button
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-amber-400 text-sm font-semibold text-[#211508] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_0.8rem_1.5rem_rgba(245,158,11,0.12)] transition hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-100/60"
          onClick={onContinue}
          type="button"
        >
          Continue
        </button>
        <button
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.065] bg-white/[0.045] text-sm font-medium text-white transition hover:bg-white/[0.075] focus:outline-none focus:ring-2 focus:ring-amber-300/30"
          onClick={onBack}
          type="button"
        >
          <ChevronLeft size={16} />
          Back
        </button>
      </div>
    </div>
  )
}
